/* GloryTrack – Fikstür maçı eklerken "Müsabakalar sayfasına da ekle" seçeneği.
   Seçilirse maç, ilgili turnuvanın eleme turlarına (R1, Çeyrek Final…) eklenir; fikstürdeki skor ona otomatik yansır.
   script.js ve gt-knockout.js'ten SONRA yüklenir. */
(function () {
    'use strict';
    if (window.__gtFxc) return; window.__gtFxc = 1;
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const ORDER = ['R1', 'R2', 'R3', 'R4', 'R5', 'Play-Off', 'Play-Off Final', 'Son 32', 'Son 16', 'Çeyrek Final', 'Yarı Final', 'Final', 'Üçüncülük'];
    const stageOf = r => {
        const s = String(r || '').trim(); if (!s) return null;
        const low = s.toLowerCase().replace(/\s+/g, ' ');
        let m = /^(?:r|round\s*|tur\s*)(\d)$/i.exec(low); if (m && +m[1] >= 1 && +m[1] <= 5) return 'R' + m[1];
        m = /^(\d)\.?\s*tur$/i.exec(low); if (m && +m[1] >= 1 && +m[1] <= 5) return 'R' + m[1];
        const map = { 'play-off': 'Play-Off', 'playoff': 'Play-Off', 'play off': 'Play-Off', 'play-off final': 'Play-Off Final', 'po': 'Play-Off', 'son 32': 'Son 32', 'round of 32': 'Son 32', 'son 16': 'Son 16', 'round of 16': 'Son 16', 'çeyrek final': 'Çeyrek Final', 'quarter-final': 'Çeyrek Final', 'quarterfinal': 'Çeyrek Final', 'qf': 'Çeyrek Final', 'yarı final': 'Yarı Final', 'semi-final': 'Yarı Final', 'semifinal': 'Yarı Final', 'sf': 'Yarı Final', 'final': 'Final', 'f': 'Final', 'üçüncülük': 'Üçüncülük', '3rd place': 'Üçüncülük' };
        return map[low] || null;
    };
    const stageName = st => { const o = { 'R1': 'Tur 1', 'R2': 'Tur 2', 'R3': 'Tur 3', 'R4': 'Tur 4', 'R5': 'Tur 5' }; return L(o[st] || st, st); };
    const key = n => String(tourCanon(n) || '').trim().toLowerCase();
    const toast = m => { try { gtToast(m); } catch (e) { } };
    const has = v => v !== '' && v !== null && v !== undefined;

    function allTours(season) { return (customTournamentsData && customTournamentsData[season]) || []; }
    function findLinked(season, fxId) {
        for (const t of allTours(season)) { const i = (t.knockouts || []).findIndex(k => k && k.fxId === fxId); if (i >= 0) return { tour: t, i, ko: t.knockouts[i] }; }
        return null;
    }
    function ensureTour(season, type) {
        if (!customTournamentsData[season]) customTournamentsData[season] = [];
        const list = customTournamentsData[season];
        let t = list.find(x => x && key(x.type) === key(type));
        if (!t) {
            t = { id: 'ct_' + Date.now(), type: tourCanon(type), tableEnabled: true, knockoutEnabled: true, table: [{ rank: '1', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }, { rank: '2', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }], knockouts: [] };
            list.push(t);
            try { const o = JSON.parse(localStorage.getItem('gt_comp_skip') || '{}'); const k = key(type); if (o[season]) { o[season] = o[season].filter(x => x !== k); localStorage.setItem('gt_comp_skip', JSON.stringify(o)); } } catch (e) { }
        }
        t.knockoutEnabled = true;
        if (!Array.isArray(t.knockouts)) t.knockouts = [];
        return t;
    }
    function insertKo(tour, ko) {
        const mine = ORDER.indexOf(ko.stage), at = tour.knockouts.findIndex(k => k && ORDER.indexOf(k.stage) > mine);
        if (at < 0) tour.knockouts.push(ko); else tour.knockouts.splice(at, 0, ko);
    }
    function adv(t) { try { return window.gtKoAdvance ? window.gtKoAdvance(t) : false; } catch (e) { return false; } }

    // Fikstür maçı ↔ Müsabakalar eleme satırı. on=false → bağlantıyı kaldır. Döner: 'added' | 'updated' | 'removed' | 'nostage' | 'none'
    function link(m, season, on) {
        const cur = findLinked(season, m.id);
        if (!on) { if (cur) { cur.tour.knockouts.splice(cur.i, 1); adv(cur.tour); return 'removed'; } return 'none'; }
        const type = String(m.tournament || '').trim(); if (!type || type === '-') return 'none';
        const stage = stageOf(m.round);
        if (!stage) { if (cur) { cur.tour.knockouts.splice(cur.i, 1); adv(cur.tour); } return 'nostage'; }
        const tour = ensureTour(season, type);
        if (cur && cur.tour === tour) {
            const ko = cur.ko; let moved = false;
            if (ko.stage !== stage) { ko.stage = stage; tour.knockouts.splice(cur.i, 1); insertKo(tour, ko); moved = true; }
            ko.home = m.home || ''; ko.away = m.away || '';
            if (has(m.homeScore)) ko.homeScore = String(m.homeScore); if (has(m.awayScore)) ko.awayScore = String(m.awayScore);
            adv(tour); return 'updated';
        }
        if (cur) { cur.tour.knockouts.splice(cur.i, 1); adv(cur.tour); }
        const ko = { id: 'ko_fx_' + m.id, stage, home: m.home || '', away: m.away || '', homeScore: has(m.homeScore) ? String(m.homeScore) : '', awayScore: has(m.awayScore) ? String(m.awayScore) : '', fxId: m.id };
        insertKo(tour, ko); adv(tour);
        return 'added';
    }

    // Bağlı satırların skorunu fikstürden tazele (render sırasında)
    function pull() {
        const season = activeFixtureSeason; if (!season) return false;
        let ch = false;
        (fixtureData[season] || []).forEach(m => {
            if (!m || !m.addComp) return;
            const cur = findLinked(season, m.id); if (!cur) return;
            const ko = cur.ko, hs = has(m.homeScore) ? String(m.homeScore) : null, as = has(m.awayScore) ? String(m.awayScore) : null;
            if (m.home && ko.home !== m.home) { ko.home = m.home; ch = true; }
            if (m.away && ko.away !== m.away) { ko.away = m.away; ch = true; }
            if (hs !== null && ko.homeScore !== hs) { ko.homeScore = hs; ch = true; }
            if (as !== null && ko.awayScore !== as) { ko.awayScore = as; ch = true; }
        });
        if (ch) (allTours(season)).forEach(t => adv(t));
        return ch;
    }

    // ---- Modal: onay kutusu ----
    function box() {
        let w = document.getElementById('fm-addcomp-wrap'); if (w) return w;
        const r = document.getElementById('fm-round'); if (!r) return null;
        w = document.createElement('div'); w.id = 'fm-addcomp-wrap'; w.className = 'sm:col-span-2 fxc-box';
        w.innerHTML = `<label class="fxc-row"><input type="checkbox" id="fm-addcomp"><span class="fxc-t"><b data-k="t"></b><small id="fm-addcomp-hint"></small></span></label>`;
        const host = r.parentElement; host.parentElement.insertBefore(w, host.nextSibling);
        w.querySelector('[data-k="t"]').textContent = L('Müsabakalar sayfasına da ekle', 'Also add to Competitions');
        ['fm-round', 'fm-tournament'].forEach(id => { const el = document.getElementById(id); if (el) { el.addEventListener('input', hint); el.addEventListener('change', hint); } });
        const cb = w.querySelector('input'); cb.addEventListener('change', hint);
        return w;
    }
    function hint() {
        const h = document.getElementById('fm-addcomp-hint'), cb = document.getElementById('fm-addcomp'); if (!h || !cb) return;
        const t = (document.getElementById('fm-tournament') || {}).value || '', st = stageOf((document.getElementById('fm-round') || {}).value);
        const w = document.getElementById('fm-addcomp-wrap'); if (w) w.classList.toggle('off', !cb.checked);
        if (!cb.checked) { h.textContent = L('Sadece fikstüre eklenir.', 'Only added to the fixture.'); return; }
        if (!t || t === '-') h.textContent = L('Önce turnuvayı seç.', 'Pick a tournament first.');
        else if (st) h.textContent = L(`${t} · ${stageName(st)} eleme turu olarak eklenir; skor fikstürden otomatik gelir.`, `Added to ${t} as ${stageName(st)}; the score follows the fixture.`);
        else h.textContent = L('Aşama (R1, Çeyrek Final, Yarı Final, Final…) yazarsan eleme turu olarak eklenir. Yoksa sadece turnuva kartı oluşur.', 'Enter a round (R1, Quarter-final, Final…) to add it as a knockout round. Otherwise only the tournament card is created.');
    }
    const _open = window.openFixtureModal;
    if (typeof _open === 'function') window.openFixtureModal = function (season, matchId) {
        const r = _open.apply(this, arguments);
        try {
            if (!box()) return r;
            const m = matchId ? (fixtureData[season] || []).find(x => x.id === matchId) : null;
            let pref = true; try { const v = localStorage.getItem('gt_fx_addcomp'); if (v !== null) pref = v === '1'; } catch (e) { }
            document.getElementById('fm-addcomp').checked = m ? (m.addComp !== undefined ? !!m.addComp : !!findLinked(season, m.id)) : pref;
            hint();
        } catch (e) { console.warn('gt-fxcomp', e); }
        return r;
    };

    const _save = window.saveFixtureMatch;
    if (typeof _save === 'function') window.saveFixtureMatch = function () {
        const season = activeFixtureSeason, editId = activeFixtureMatchId, cb = document.getElementById('fm-addcomp');
        const want = cb ? cb.checked : null, before = new Set((fixtureData[season] || []).map(m => m.id));
        const r = _save.apply(this, arguments);
        try {
            if (want === null) return r;
            const modal = document.getElementById('fixture-match-modal');
            if (modal && !modal.classList.contains('hidden')) return r; // doğrulama hatası, kaydedilmedi
            const m = editId ? (fixtureData[season] || []).find(x => x.id === editId) : (fixtureData[season] || []).find(x => !before.has(x.id));
            if (!m) return r;
            if (!editId) { try { localStorage.setItem('gt_fx_addcomp', want ? '1' : '0'); } catch (e) { } }
            m.addComp = want;
            const res = link(m, season, want);
            saveToLocalStorage(); renderFixturePanel();
            if (res === 'added') toast(L('Müsabakalar sayfasına eklendi', 'Added to Competitions'));
            else if (res === 'nostage' && want) toast(L('Aşama tanınmadı; sadece turnuva kartı eklendi', 'Round not recognised; only the tournament card was added'));
        } catch (e) { console.warn('gt-fxcomp', e); }
        return r;
    };

    const _del = window.deleteFixtureMatch;
    if (typeof _del === 'function') window.deleteFixtureMatch = function () {
        const season = activeFixtureSeason, id = activeFixtureMatchId;
        const r = _del.apply(this, arguments);
        try {
            if (id && !(fixtureData[season] || []).some(m => m.id === id) && link({ id }, season, false) === 'removed') { saveToLocalStorage(); renderFixturePanel(); }
        } catch (e) { console.warn('gt-fxcomp', e); }
        return r;
    };

    const _rfp = window.renderFixturePanel;
    if (typeof _rfp === 'function') window.renderFixturePanel = function () {
        try { if (pull()) saveToLocalStorage(); } catch (e) { console.warn('gt-fxcomp', e); }
        return _rfp.apply(this, arguments);
    };
    window.GTFXC = { stageOf, link, pull };
})();
