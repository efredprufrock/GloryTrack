/* GloryTrack · Futbolcu veri tabanı + isim önerisi (gt-players.js)
   Oyuncu adı kutularında (rakip/kendi gol-asist, transfer, kadro, takip listesi) birkaç harf yazınca
   önce sitedeki bilinen isimler, sonra FC 26 oyuncu veri tabanı (gt-players-data.js, ilk kullanımda yüklenir) önerilir.
   Veri tabanından seçilince boş alanlar (mevki, OVR, yaş, ülke, doğum tarihi) otomatik dolar. */
(function () {
    const DB = { rows: null, loading: false, cbs: [] };
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const fold = s => String(s || '').toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/ø/g, 'o').replace(/ł/g, 'l').replace(/đ/g, 'd').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

    const css = document.createElement('style');
    css.textContent = `#custom-autocomplete-dropdown{max-height:300px}
    #custom-autocomplete-dropdown .ac-item{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
    #custom-autocomplete-dropdown .gtp-n{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    #custom-autocomplete-dropdown .gtp-m{font-size:10.5px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60%}
    #custom-autocomplete-dropdown .ac-item.bg-emerald-600 .gtp-m{color:#d1fae5}
    #custom-autocomplete-dropdown .gtp-sep{padding:5px 12px 2px;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#64748b}
    #custom-autocomplete-dropdown .gtp-ld{padding:6px 12px;font-size:11px;color:#94a3b8}`;
    document.head.appendChild(css);

    // ---- veri ----
    function parse() {
        const raw = window.GT_PLAYERS_DB; if (typeof raw !== 'string') return [];
        const rows = raw.split('\n').map(l => { const p = l.split('|'); return { n: p[0], c: p[1] || '', p: p[2] || '', o: +p[3] || 0, nat: p[4] || '', d: p[5] || '', x: p[6] || '', k: ' ' + fold(p[0] + ' ' + (p[6] || '')) }; }).filter(r => r.n);
        window.GT_PLAYERS_DB = null; return rows;
    }
    function load(cb) {
        if (DB.rows) { cb && cb(); return; }
        if (cb) DB.cbs.push(cb);
        if (DB.loading) return; DB.loading = true;
        const done = () => { DB.rows = parse(); DB.loading = false; const c = DB.cbs.splice(0); c.forEach(f => { try { f(); } catch (e) { } }); };
        if (typeof window.GT_PLAYERS_DB === 'string') { done(); return; }
        const s = document.createElement('script'); s.src = 'gt-players-data.js?v=1'; s.onload = done; s.onerror = () => { DB.loading = false; DB.failed = true; };
        document.head.appendChild(s);
    }
    function search(q, limit) {
        const toks = fold(q).split(' ').filter(Boolean); if (!toks.length || !DB.rows) return [];
        const own = (typeof managedTeams !== 'undefined' && managedTeams.kulup && managedTeams.kulup.name) ? fold(managedTeams.kulup.name) : '';
        const out = [];
        for (const r of DB.rows) {
            let ok = true; for (const t of toks) { if (r.k.indexOf(' ' + t) < 0) { ok = false; break; } }
            if (!ok) continue;
            const startsFull = r.k.indexOf(' ' + toks.join(' ')) === 0 ? 0 : 1;
            const lastTok = toks[toks.length - 1];
            const sur = r.k.trim().split(' ').pop() === lastTok ? 0 : 1;
            out.push({ r, s: startsFull * 400 + sur * 200 - r.o - (own && fold(r.c) === own ? 150 : 0) });
        }
        out.sort((a, b) => a.s - b.s);
        return out.slice(0, limit).map(x => x.r);
    }
    // sitede daha önce girilmiş gol/asist isimleri (rakip golcüler dahil)
    function learned(oppOnly) {
        const set = new Map();
        const add = (e) => { if (!e || typeof e !== 'object') return; const isOpp = e.type === 'OPP'; if (oppOnly === true && !isOpp) return; if (oppOnly === false && isOpp) return; [e.scorer, e.assist].forEach(n => { n = String(n || '').trim(); if (n && n.length > 1) set.set(n, (set.get(n) || 0) + 1); }); };
        const walk = (o, d) => { if (!o || d > 5) return; if (Array.isArray(o)) { o.forEach(x => walk(x, d + 1)); return; } if (typeof o !== 'object') return; if (Array.isArray(o.events)) o.events.forEach(add); Object.keys(o).forEach(k => { if (k !== 'events') walk(o[k], d + 1); }); };
        try { walk(typeof matchDataStore !== 'undefined' ? matchDataStore : null, 0); walk(typeof fixtureData !== 'undefined' ? fixtureData : null, 0); } catch (e) { }
        return Array.from(set.entries()).sort((a, b) => b[1] - a[1]).map(x => x[0]);
    }


    // ---- rakip takım ↔ veri tabanı eşleşmesi ----
    const STOP = new Set(['fc','afc','sk','cf','ac','as','sc','cd','ud','sd','sv','fk','bk','if','club','the','de','of','1','kv','rc','ssc','us','ca','real'].filter(x => x !== 'real'));
    const toks = s => fold(s).split(' ').filter(t => t && !STOP.has(t));
    let IDX = null;
    function buildIdx() {
        if (IDX || !DB.rows) return IDX;
        const clubs = new Map(), nats = new Map();
        DB.rows.forEach(r => { if (r.c) { let a = clubs.get(r.c); if (!a) clubs.set(r.c, a = []); a.push(r); } if (r.nat) { let a = nats.get(r.nat); if (!a) nats.set(r.nat, a = []); a.push(r); } });
        IDX = { clubs: Array.from(clubs.entries()).map(([n, rows]) => ({ n, t: toks(n), rows })), nats };
        return IDX;
    }
    const clubCache = {};
    function clubRowsFor(name) {
        const key = fold(name); if (!key || !buildIdx()) return null;
        if (key in clubCache) return clubCache[key];
        const st = toks(name); let best = null, bs = 0;
        if (st.length) IDX.clubs.forEach(c => {
            const a = new Set(st), b = new Set(c.t); let inter = 0; a.forEach(x => { if (b.has(x)) inter++; });
            if (!inter) return;
            const j = inter / (a.size + b.size - inter);
            const sub = (inter === a.size || inter === b.size);
            const sc = j + (sub ? 0.3 : 0) + (fold(c.n) === key ? 1 : 0);
            if (sc > bs && (j >= 0.5 || fold(c.n) === key)) { bs = sc; best = c; }
        });
        return (clubCache[key] = best ? { label: best.n, rows: best.rows.slice().sort((x, y) => (x.p === 'GK') - (y.p === 'GK') || y.o - x.o) } : null);
    }
    function natRowsFor(name) {
        if (!buildIdx()) return null; const code = (() => { try { return normalizeCountryInput(name) || ''; } catch (e) { return ''; } })(); if (!code) return null;
        const k = 'nat:' + code; if (k in clubCache) return clubCache[k];
        let rows = null, label = '';
        IDX.nats.forEach((arr, nat) => { if (cc(nat) === code) { rows = (rows || []).concat(arr); label = nat; } });
        return (clubCache[k] = rows ? { label, rows: rows.sort((x, y) => (x.p === 'GK') - (y.p === 'GK') || y.o - x.o).slice(0, 60) } : null);
    }
    // açık maç penceresindeki rakip takım (kulüp ya da milli)
    function oppSquad() {
        try {
            const m = (fixtureData[activeFixtureSeason] || []).find(x => x.id === activeFixtureMatchId); if (!m) return null;
            const ctx = getFixtureMatchContext(m), our = ctx === 'milli' ? (managedTeams.milli.name || '') : (managedTeams.kulup.name || '');
            const opp = m.home === our ? m.away : m.home; if (!opp) return null;
            return ctx === 'milli' ? natRowsFor(opp) : clubRowsFor(opp);
        } catch (e) { return null; }
    }


    // ---- isim biçimi: "Ahmet MEHMET" (soyadı büyük harf; McLOUGHLIN, VAN DIJK, VINI Jr.) ----
    const PART = new Set(['van', 'von', 'de', 'der', 'den', 'da', 'das', 'do', 'dos', 'di', 'del', 'della', 'dal', 'du', 'la', 'le', 'el', 'al', 'bin', 'ter', 'ten', 'ben', 'zu', 'op', 'dos', 'des', 'af', 'av', 'mac', 'san', 'santa', 'st.']);
    const SUFX = new Set(['jr', 'jr.', 'junior', 'júnior', 'sr', 'sr.', 'ii', 'iii', 'filho', 'neto']);
    function upperSur(t, tr) {
        const up = x => x.toLocaleUpperCase(tr ? 'tr' : 'en');
        const m = /^(Mc|Mac)(?=[A-ZÀ-Ý])(.+)$/.exec(t);      // McLoughlin → McLOUGHLIN, MacAllister → MacALLISTER
        if (m) return m[1] + up(m[2]);
        return up(t);
    }
    function fmtName(r) {
        if (!r || localStorage.getItem('gt_pl_upper') === '0') return r ? r.n : '';
        const tr = /türkiye|turkey/i.test(r.nat || '');
        const tk = String(r.n).trim().split(/\s+/); if (!tk.length) return r.n;
        let end = tk.length; const suf = [];
        while (end > 1 && SUFX.has(tk[end - 1].toLowerCase())) suf.unshift(tk[--end]);
        let st = end - 1;
        while (st > 0 && PART.has(tk[st - 1].toLowerCase())) st--;   // van / de / dos … soyadına dahil
        const first = tk.slice(0, st), sur = tk.slice(st, end).map(t => upperSur(t, tr));
        return first.concat(sur, suf).join(' ');
    }

    // ---- açılır liste ----
    let shown = [];
    function evType(inp) { let m = /^fev_(scorer|assist)_(\d+)$/.exec(inp.id || ''); if (m) { const t = document.getElementById('fev_type_' + m[2]); return t ? t.value : null; } m = /^(.*)_(scorer|assist)$/.exec(inp.id || ''); if (!m) return null; const t = document.getElementById(m[1] + '_type'); return t ? t.value : null; }
    const meta = r => [r.p, r.o || '', r.c].filter(Boolean).join(' · ');
    function triggerAutocomplete(inp) {
        try { updateMockPlayers(); } catch (e) { }
        activeAutocompleteInput = inp; autocompleteFocusIndex = -1;
        const dd = document.getElementById('custom-autocomplete-dropdown');
        const q = inp.value.trim(), fq = fold(q), type = evType(inp);
        const known = (typeof mockPlayers !== 'undefined' ? mockPlayers : []);
        let local;
        if (type === 'OPP') local = learned(true); else if (type === 'US') local = known; else local = known.concat(learned(null).filter(n => known.indexOf(n) < 0));
        local = local.filter(n => !fq || (' ' + fold(n)).indexOf(' ' + fq.split(' ')[0]) >= 0 && fold(n).includes(fq)).slice(0, fq ? 8 : 8);
        let html = '', n = 0; shown = [];
        const row = (name, r) => { if (r) name = fmtName(r); shown.push(r || null); const i = r ? shown.length - 1 : -1; n++; return `<div class="px-3 py-1.5 hover:bg-emerald-600 cursor-pointer transition-colors ac-item" data-val="${esc(name)}" data-i="${i}" onclick="gtPlPick(this)"><span class="gtp-n">${esc(name)}</span>${r ? `<span class="gtp-m">${esc(meta(r))}</span>` : ''}</div>`; };
        const isFev = /^fev_(scorer|assist)_\d+$/.test(inp.id || '');
        const needOpp = isFev && (type === 'OPP' || type === 'OG') && !/_assist_/.test(inp.id);
        const fqt = fq.split(' ').filter(Boolean);
        const hit = r => !fq || fqt.every(t => r.k.indexOf(' ' + t) >= 0);
        const uk = n => fold(n);
        let used = new Set(); let localHtml = '';
        const flushLocal = () => { local.forEach(name => { if (!used.has(uk(name))) { used.add(uk(name)); localHtml += row(name, null); } }); };
        if ((fq.length >= 2 || needOpp) && !DB.rows && !DB.failed) {
            load(() => { if (activeAutocompleteInput === inp && document.activeElement === inp) triggerAutocomplete(inp); });
            flushLocal(); html += localHtml; localHtml = '';
            html += `<div class="gtp-ld"><i class="fa-solid fa-spinner fa-spin"></i> ${L('Oyuncu veri tabanı yükleniyor…', 'Loading player database…')}</div>`;
        } else if (DB.rows) {
            if (needOpp) {
                const sq = oppSquad();
                if (sq) {
                    const rs = sq.rows.filter(r => hit(r) && !used.has(uk(r.n))).slice(0, fq ? 12 : 16);
                    if (rs.length) { html += `<div class="gtp-sep">${esc(sq.label)} · ${L('rakip kadro', 'opponent squad')}</div>`; rs.forEach(r => { used.add(uk(r.n)); html += row(r.n, r); }); }
                }
            }
            flushLocal(); html += localHtml; localHtml = '';
            if (fq.length >= 2) {
                const dbRows = search(q, 40).filter(r => !used.has(uk(r.n)));
                if (dbRows.length) html += `<div class="gtp-sep">${L('FC 26 veri tabanı', 'FC 26 database')}</div>`;
                dbRows.forEach(r => { html += row(r.n, r); });
            }
        }
        if (!DB.rows && !html) { flushLocal(); html += localHtml; }
        if (!n && !html) { closeAutocomplete(); return; }
        dd.innerHTML = html;
        const rect = inp.getBoundingClientRect(), w = Math.max(rect.width, 320);
        dd.style.top = (rect.bottom + window.scrollY + 2) + 'px';
        dd.style.left = Math.max(6, Math.min(rect.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - w - 6)) + 'px';
        dd.style.width = w + 'px';
        dd.classList.remove('hidden'); dd.classList.add('flex');
    }
    // ---- seçim + otomatik doldurma ----
    const refDate = Date.UTC(2025, 8, 19);
    const ageOf = d => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || ''); if (!m) return ''; return String(Math.floor((refDate - Date.UTC(+m[1], +m[2] - 1, +m[3])) / 31557600000)); };
    function cc(nat) { try { const v = normalizeCountryInput(nat === 'Türkiye' ? 'Turkey' : nat); return v || ''; } catch (e) { return ''; } }
    function setV(id, v, force) { const el = document.getElementById(id); if (!el || v === '' || v == null) return; if (el.tagName === 'SELECT') { if (![...el.options].some(o => o.value === v)) return; if (!force) return; } else if (!force && String(el.value).trim()) return; el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }
    function fill(inp, r) {
        if (inp.id === 'tr-name') {
            setV('tr-pos', r.p, true); setV('tr-age', ageOf(r.d)); setV('tr-ovr', String(r.o || ''));
            setV('gt-trx-cc', cc(r.nat)); const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(r.d); if (m) setV('gt-trx-birth', m[3] + '.' + m[2] + '.' + m[1]);
        } else if (inp.id === 'pi-name') {
            setV('pi-pos', r.p, true); setV('pi-age', ageOf(r.d)); setV('pi-ovr', String(r.o || '')); setV('pi-country', cc(r.nat));
        }
    }
    window.gtPlPick = function (el) {
        const inp = activeAutocompleteInput; if (!inp) return;
        const name = el.getAttribute('data-val'), i = +el.getAttribute('data-i'), r = i >= 0 ? shown[i] : null;
        inp.value = name; inp.dispatchEvent(new Event('input', { bubbles: true }));
        if (r) { try { fill(inp, r); } catch (e) { console.warn(e); } }
        closeAutocomplete();
    };
    window.triggerAutocomplete = triggerAutocomplete;
    // Maç penceresindeki olay kutuları (fev_scorer_N / fev_assist_N) sonradan çiziliyor: odaklanınca sisteme dahil et
    document.addEventListener('focusin', e => { const t = e.target; if (t && t.id && /^fev_(scorer|assist)_\d+$/.test(t.id)) { t.classList.add('use-autocomplete'); t.removeAttribute('list'); } }, true);
    // Veri tabanını boşta (sayfa açıldıktan sonra) önceden yükle → ilk öneri anında gelir
    const idle = window.requestIdleCallback || (f => setTimeout(f, 4000));
    window.addEventListener('load', () => idle(() => load()));
    window.GTPL = { fmt: fmtName, oppSq: oppSquad, load, search, opp: n => clubRowsFor(n), clubs: q => (buildIdx() ? IDX.clubs.filter(c => fold(c.n).includes(q)).map(c => c.n + ':' + c.rows.length) : []), ready: () => !!DB.rows };
})();
