/* GloryTrack – Akademi panosu (yeni arayüz). Eski tablo görünümü korunur; düğmeyle geçiş yapılır. */
(function () {
    const MODE_KEY = 'gt_ac_mode2';
    const CH = ['t1', 's1', 't2', 's2'];
    const en = () => typeof currentLang !== 'undefined' && currentLang === 'en';
    const L = (tr, e) => en() ? e : tr;
    const E = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s == null ? '' : s)) : String(s == null ? '' : s));
    const cl = (x, a, b) => Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, x));
    let mode = 'old';
    try { mode = localStorage.getItem(MODE_KEY) === 'new' ? 'new' : 'old'; } catch (e) {}
    const ST = { filter: 'all', sort: 'score' };

    // ---------- veri ----------
    function snap(p) {
        for (let i = seasonsList.length - 1; i >= 0; i--) {
            const h = p.history && p.history[seasonsList[i]];
            if (!h) continue;
            for (let j = 3; j >= 0; j--) {
                const c = CH[j];
                if (h[c + 'o']) return { season: seasonsList[i], cell: c, ovr: parseInt(h[c + 'o']) || 0, age: parseInt(h[c + 'a']) || 0 };
            }
        }
        return null;
    }
    function latestPot(p) {
        for (let i = seasonsList.length - 1; i >= 0; i--) {
            const h = p.history && p.history[seasonsList[i]];
            if (!h) continue;
            for (let j = 3; j >= 0; j--) { const v = parseInt(h[CH[j] + '_acadPot']); if (v) return v; }
        }
        return parseInt(p.pot) || 0;
    }
    function teamMedian() /* A takımın rotasyon seviyesi: OVR'ların alt %30 dilimi */ {
        const a = (squadData.astakim || []).filter(p => p && p.name && !p.isArchived && !p.isPromoted).map(p => { const s = snap(p); return s ? s.ovr : (parseInt(p.joinOvr) || 0); }).filter(x => x > 0).sort((x, y) => x - y);
        if (!a.length) return 70;
        return a[Math.floor((a.length - 1) * 0.3)];
    }
    function macro(p) { const ps = String(p.pos || '').toUpperCase(); return ps === 'GK' ? 'GK' : /^(CB|LB|RB|LWB|RWB)$/.test(ps) ? 'DEF' : /^(ST|CF|LW|RW)$/.test(ps) ? 'FWD' : 'MID'; }
    function evalP(p, med) {
        const s = snap(p);
        const ovr = s ? s.ovr : (parseInt(p.joinOvr) || 0);
        let age = s ? s.age : 0;
        if (!age) { try { age = s ? getExpectedAge(p, s.season, s.cell) : 0; } catch (e) {} }
        if (!age) age = parseInt(p.joinAge) || 17;
        const pot = Math.max(latestPot(p), ovr);
        let prev = ovr;
        try { if (s) prev = getPrevOvr(p, s.season, 't1') || ovr; } catch (e) {}
        const g = ovr - prev;
        const s1 = 55 * cl((ovr - (med - 18)) / 18), s2 = 20 * cl(((ovr / (pot || 1)) - 0.7) / 0.3), s3 = age >= 19 ? 10 : age === 18 ? 8 : age === 17 ? 5 : 2, s4 = 15 * cl(g / 6);
        const score = Math.round(s1 + s2 + s3 + s4);
        let st = 'gelisiyor';
        if (score >= 70) st = 'hazir';
        else if (age >= 19 && pot - ovr <= 5 && score < 60) st = 'satis';
        else if (age >= 18 && score >= 45 && pot - ovr >= 6) st = 'kiralik';
        return { p, ovr, pot, age, g, score, st, grp: macro(p) };
    }
    const STT = {
        hazir: ['Hazır', 'Ready', 'ok'], gelisiyor: ['Gelişiyor', 'Developing', 'dev'],
        kiralik: ['Kiralık öner', 'Loan suggested', 'loan'], satis: ['Satış adayı', 'Sell candidate', 'sell']
    };
    const GRP = { GK: ['Kaleci', 'Goalkeepers'], DEF: ['Defans', 'Defenders'], MID: ['Orta saha', 'Midfielders'], FWD: ['Forvet', 'Forwards'] };

    function build() {
        const med = teamMedian();
        const all = (squadData.akademi || []).filter(p => p && p.name);
        const rows = all.filter(p => !p.isArchived && !p.isPromoted).map(p => evalP(p, med));
        const promoted = all.filter(p => p.isPromoted);
        return { med, rows, promoted };
    }

    // ---------- görünüm ----------
    function tile(lbl, val, sub, cls) { return `<div class="gtac-t"><span>${lbl}</span><b class="${cls || ''}">${val}</b><em>${sub || ''}</em></div>`; }

    function balance(rows) {
        const a = (squadData.astakim || []).filter(p => p && p.name && !p.isArchived && !p.isPromoted);
        const total = Math.max(1, rows.length);
        return ['GK', 'DEF', 'MID', 'FWD'].map(g => {
            const n = rows.filter(r => r.grp === g).length, an = a.filter(p => macro(p) === g).length;
            const lo = Math.max(1, Math.round(an * 0.3)), hi = Math.max(2, Math.round(an * 0.8) + 1);
            const st = n < lo ? ['bad', L('açık', 'gap')] : n > hi ? ['warn', L('fazla', 'surplus')] : ['ok', L('iyi', 'ok')];
            return `<div class="gtac-bl"><span>${L(GRP[g][0], GRP[g][1])}</span><div class="gtac-bar"><i style="width:${Math.round(n / total * 100)}%"></i></div><b class="gtac-b ${st[0]}">${n} · ${st[1]}</b></div>`;
        }).join('');
    }

    function card(r) {
        const p = r.p, s = STT[r.st], ini = String(p.name).trim().split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase();
        const ph = p.photoUrl ? `<img src="${E(p.photoUrl)}" alt="" loading="lazy" onerror="this.remove()">` : '';
        const fl = p.countryCode ? `<img class="gtac-fl" src="https://flagcdn.com/w40/${E(String(p.countryCode).toLowerCase())}.png" alt="" onerror="this.remove()">` : '';
        const why = L(`OVR ${r.ovr} · POT ${r.pot} · ${r.age} yaş · bu sezon ${r.g >= 0 ? '+' : ''}${r.g}`, `OVR ${r.ovr} · POT ${r.pot} · age ${r.age} · this season ${r.g >= 0 ? '+' : ''}${r.g}`);
        const id = E(p.id);
        return `<div class="gtac-c" onclick="openPlayerInfoModal('${id}')" title="${E(why)}">
            <div class="gtac-h"><div class="gtac-av"><span>${E(ini)}</span>${ph}</div>
                <div class="gtac-nm"><b>${E(p.name)}</b><span>${E(p.pos || '')} · ${r.age} ${L('yaş', 'y/o')} ${fl}</span></div>
                <button type="button" class="gtac-up" title="${L('A Takıma yükselt', 'Promote to first team')}" onclick="event.stopPropagation();activePlayerId='${id}';promotePlayer()"><i class="fa-solid fa-angles-up"></i></button></div>
            <div class="gtac-tr"><i style="width:${cl(r.ovr / 100, 0, 1) * 100}%"></i><u style="left:${cl(r.pot / 100, 0, 1) * 100}%"></u></div>
            <div class="gtac-ln"><span>OVR <b>${r.ovr}</b> → POT <b>${r.pot}</b></span><span class="${r.g > 0 ? 'up' : r.g < 0 ? 'dn' : ''}">${r.g > 0 ? '+' : ''}${r.g} ${L('bu sezon', 'this season')}</span></div>
            <div class="gtac-ft"><span class="gtac-b ${s[2]}">${L(s[0], s[1])}</span><span class="gtac-sc">${L('Hazırlık', 'Readiness')} <b>${r.score}</b>/100</span></div>
            ${p.role ? `<div class="gtac-rl">${E(typeof TR_EN !== 'undefined' && en() && TR_EN[p.role] ? TR_EN[p.role] : p.role)}</div>` : ''}</div>`;
    }

    function sorted(rows) {
        const k = ST.sort, r = rows.slice();
        const f = { score: (a, b) => b.score - a.score, ovr: (a, b) => b.ovr - a.ovr, pot: (a, b) => b.pot - a.pot, age: (a, b) => a.age - b.age, growth: (a, b) => b.g - a.g, pos: (a, b) => (typeof attrPosIdx === 'function' ? attrPosIdx(a.p) - attrPosIdx(b.p) : 0) || b.ovr - a.ovr }[k] || ((a, b) => b.score - a.score);
        return r.sort(f);
    }

    function header() {
        const ctx = c => `<button onclick="squadContext='${c[0]}'; renderSquadGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${squadContext === c[0] ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">${c[1]}</button>`;
        return `<div class="w-full flex flex-wrap justify-between items-center mb-3 px-2 shrink-0 relative gap-y-3">
            <div class="flex flex-nowrap items-center gap-2 w-max shrink-0 overflow-x-auto hide-scrollbar">
                <button type="button" class="gtac-sw" onclick="GTAC.setMode('old')" title="${L('Eski tablo görünümüne geç', 'Switch to the classic table view')}"><i class="fa-solid fa-table"></i> ${L('Klasik', 'Classic')}</button>
                ${typeof sqViewToggleHtml === 'function' ? sqViewToggleHtml() : ''}
                <button onclick="openPlayerInfoModal()" class="gtac-act" title="${L('Oyuncu ekle', 'Add player')}"><i class="fa-solid fa-user-plus"></i></button>
                <button onclick="openSquadBulkModal()" class="gtac-act" title="${L('Toplu ekle', 'Bulk add')}"><i class="fa-solid fa-list-check"></i></button>
                <button onclick="openPlayerBulkEdit()" class="gtac-act" title="${L('Toplu düzenle', 'Bulk edit')}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="openFormationModal('ilk11')" class="gtac-act" title="${L('Dizilim', 'Formation')}"><i class="fa-solid fa-chess-board"></i></button>
            </div>
            <div class="flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shadow-lg z-10 w-full sm:w-auto justify-center order-last xl:order-none">
                ${ctx(['astakim', 'As Takım'])}${ctx(['akademi', 'Akademi'])}${ctx(['milli', 'Milli'])}
            </div>
            <div class="flex items-center justify-end gap-3 ml-auto xl:ml-0 w-full sm:w-auto"></div></div>`;
    }

    function render() {
        const d = build(), rows = d.rows, n = rows.length;
        const avg = f => n ? Math.round(rows.reduce((s, r) => s + f(r), 0) / n * 10) / 10 : 0;
        const ready = rows.filter(r => r.st === 'hazir').length;
        const top = rows.slice().sort((a, b) => b.g - a.g)[0];
        const cnt = k => rows.filter(r => r.st === k).length;
        const shown = sorted(ST.filter === 'all' ? rows : rows.filter(r => r.st === ST.filter));
        const chip = (k, lbl, c) => `<button type="button" class="gtac-chip${ST.filter === k ? ' on' : ''}" onclick="GTAC.setFilter('${k}')">${lbl}${c !== undefined ? ` <em>${c}</em>` : ''}</button>`;
        const so = [['score', L('Hazırlık puanı', 'Readiness')], ['ovr', 'OVR'], ['pot', 'POT'], ['age', L('Yaş', 'Age')], ['growth', L('Gelişim', 'Growth')], ['pos', L('Mevki', 'Position')]];
        const body = n ? `<div class="gtac-tiles">
                ${tile(L('Oyuncu', 'Players'), n, d.promoted.length ? L(d.promoted.length + ' yükseltilen', d.promoted.length + ' promoted') : '')}
                ${tile(L('Ortalama yaş', 'Average age'), avg(r => r.age), '')}
                ${tile('OVR → POT', avg(r => r.ovr) + ' → ' + avg(r => r.pot), L('A takım rotasyon seviyesi ' + d.med, 'First-team rotation level ' + d.med))}
                ${tile(L('Yükselmeye hazır', 'Ready to step up'), ready, top && top.g > 0 ? L('En çok gelişen: ', 'Top riser: ') + E(top.p.name) + ' +' + top.g : '', ready ? 'ok' : '')}
            </div>
            <div class="gtac-box"><div class="gtac-bt"><b>${L('Mevki dengesi', 'Position balance')}</b><span>${L('A takım ihtiyacına göre', 'vs. first-team needs')}</span></div>${balance(rows)}</div>
            <div class="gtac-bar2"><div class="gtac-chips">${chip('all', L('Tümü', 'All'), n)}${chip('hazir', L('Hazır', 'Ready'), cnt('hazir'))}${chip('gelisiyor', L('Gelişiyor', 'Developing'), cnt('gelisiyor'))}${chip('kiralik', L('Kiralık öner', 'Loan'), cnt('kiralik'))}${chip('satis', L('Satış adayı', 'Sell'), cnt('satis'))}</div>
                <label class="gtac-so">${L('Sırala', 'Sort')}<select onchange="GTAC.setSort(this.value)">${so.map(o => `<option value="${o[0]}"${ST.sort === o[0] ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label></div>
            ${shown.length ? `<div class="gtac-g">${shown.map(card).join('')}</div>` : `<div class="gtac-empty">${L('Bu filtrede oyuncu yok.', 'No players in this filter.')}</div>`}
            <p class="gtac-note">${L('Hazırlık puanı: OVR (A takım rotasyon seviyesine yakınlık), POT\'a yakınlık, yaş ve bu sezonki gelişimden hesaplanır. Rozetler bu puana göre otomatik belirlenir; kart üzerine gelince ayrıntı görürsün.', 'Readiness combines OVR vs. the first-team rotation level, closeness to POT, age and this season\'s growth. Badges are automatic; hover a card for details.')}</p>`
            : `<div class="gtac-empty big"><i class="fa-solid fa-graduation-cap"></i><b>${L('Akademide henüz oyuncu yok', 'No academy players yet')}</b><span>${L('İlk oyuncuyu ekleyerek takibe başla.', 'Add your first player to start tracking.')}</span><button onclick="openPlayerInfoModal()" class="gtac-sw"><i class="fa-solid fa-user-plus"></i> ${L('Oyuncu ekle', 'Add player')}</button></div>`;
        const promo = d.promoted.length ? `<div class="gtac-box gtac-pr"><div class="gtac-bt"><b>${L('Yükseltilenler', 'Promoted')}</b><span>${d.promoted.length}</span></div><div class="gtac-pl">${d.promoted.map(p => `<span onclick="openPlayerInfoModal('${E(p.id)}')">${E(p.name)}</span>`).join('')}</div></div>` : '';
        updateContentArea(`<div class="w-full flex flex-col h-full min-h-0">${header()}<div class="gtac">${body}${promo}</div></div>`);
    }

    function injectBack() {
        const bar = document.querySelector('#content-area .flex-nowrap.items-center');
        if (!bar || bar.querySelector('.gtac-back')) return;
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'gtac-sw gtac-back'; b.onclick = () => GTAC.setMode('new');
        b.title = L('Yeni akademi panosuna geç', 'Switch to the new academy dashboard');
        b.innerHTML = '<i class="fa-solid fa-table-cells-large"></i> ' + L('Yeni', 'New');
        bar.insertBefore(b, bar.firstChild);
    }

    // Yeni eklenen akademi oyuncusunun yaş / OVR / POT değerlerini klasik tablodaki güncel sütuna da işle
    function targetCell() {
        const season = seasonsList[seasonsList.length - 1];
        let cell = 't1';
        (squadData.akademi || []).forEach(p => {
            const h = p && p.history && p.history[season];
            if (!h) return;
            CH.forEach(c => { if (h[c + 'o'] && CH.indexOf(c) > CH.indexOf(cell)) cell = c; });
        });
        return { season, cell };
    }
    function stampNew(before, forced, opt) {
        const t = forced || targetCell();
        let n = 0;
        (squadData.akademi || []).forEach(p => {
            if (!p || before.has(p.id) || snap(p)) return;
            const ovr = parseInt(p.joinOvr), age = parseInt(p.joinAge);
            let pot = parseInt(p.pot);
            if (opt && opt.pots && opt.pots.has(p.name)) { const pv = opt.pots.get(p.name); if (pv) { p.pot = String(pv); pot = pv; } else pot = 0; }
            if (!ovr) return;
            p.history = p.history || {};
            const h = p.history[t.season] = p.history[t.season] || {};
            if (age) h[t.cell + 'a'] = String(age);
            h[t.cell + 'o'] = String(ovr);
            if (pot) h[t.cell + '_acadPot'] = String(pot);
            n++;
        });
        if (n) { try { saveToLocalStorage(); } catch (e) {} renderSquadGrid(); }
    }
    const PL = { t1: ['Yaz transfer dönemi', 'Summer window'], s1: ['Eylül – Aralık', 'Sep – Dec'], t2: ['Kış transfer dönemi', 'Winter window'], s2: ['Şubat – Haziran', 'Feb – Jun'] };
    function fillPeriod() {
        const ref = document.getElementById('pi-milli-container-edit');
        if (!ref) return;
        let w = document.getElementById('gtac-period');
        if (!w) { w = document.createElement('div'); w.id = 'gtac-period'; w.className = 'gtac-pw'; ref.parentNode.insertBefore(w, ref); }
        const show = squadContext === 'akademi' && !activePlayerId;
        w.style.display = show ? '' : 'none';
        if (!show) return;
        const t = targetCell(), opts = [`<option value="auto">${L('Otomatik', 'Automatic')} (${E(t.season)} · ${L(PL[t.cell][0], PL[t.cell][1])})</option>`];
        seasonsList.slice(-2).reverse().forEach(sn => CH.slice().reverse().forEach(c => opts.push(`<option value="${E(sn)}|${c}">${E(sn)} · ${L(PL[c][0], PL[c][1])}</option>`)));
        w.innerHTML = `<label>${L('Hangi dönem sütununa işlensin?', 'Which period column should it go to?')}</label><select id="gtac-period-sel">${opts.join('')}</select>`;
    }
    const origOpen = window.openPlayerInfoModal;
    if (typeof origOpen === 'function') window.openPlayerInfoModal = function () {
        const r = origOpen.apply(this, arguments);
        try { fillPeriod(); } catch (e) { console.warn('GTAC', e); }
        return r;
    };
    const idsBefore = () => new Set((squadData.akademi || []).map(p => p && p.id));
    const origSave = window.savePlayerInfo;
    if (typeof origSave === 'function') window.savePlayerInfo = function () {
        const isNew = squadContext === 'akademi' && !activePlayerId, before = idsBefore();
        const sel = document.getElementById('gtac-period-sel'), v = sel && sel.value !== 'auto' ? sel.value.split('|') : null;
        const r = origSave.apply(this, arguments);
        if (isNew) stampNew(before, v ? { season: v[0], cell: v[1] } : null);
        return r;
    };
    const origBulk = window.processSquadBulkInput;
    if (typeof origBulk === 'function') window.processSquadBulkInput = async function () {
        const isAk = squadContext === 'akademi', before = idsBefore(), pots = new Map(), ta = document.getElementById('squad-bulk-input');
        if (isAk && ta) ta.value.split('\n').forEach(line => { const q = line.split(',').map(x => x.trim()); if (q.length >= 5 && q[1]) { const pv = parseInt(q[5]); pots.set(q[1], pv > 0 ? pv : null); } });
        const r = await origBulk.apply(this, arguments);
        if (isAk) stampNew(before, null, { pots });
        return r;
    };

    // Toplu ekle: akademide isteğe bağlı 6. sütun = POT
    const origBulkOpen = window.openSquadBulkModal;
    if (typeof origBulkOpen === 'function') window.openSquadBulkModal = function () {
        const r = origBulkOpen.apply(this, arguments);
        if (squadContext === 'akademi') {
            const h = document.getElementById('squad-bulk-format-hint'), t = document.getElementById('squad-bulk-input');
            if (h) h.innerText = L('Pozisyon, İsim Soyisim, Ülke, Yaş, Reyting, POT (isteğe bağlı)', 'Position, Full name, Country, Age, Rating, POT (optional)');
            if (t) t.placeholder = 'Örnek:\nST, Lamine Yamal, ESP, 17, 78, 94\nCM, Pau Cubarsi, ESP, 18, 77, 90\nCB, Genç Oyuncu, TUR, 16, 62';
        }
        return r;
    };

    // Toplu düzenle: akademide Max POT ve dönem POT sütunları
    function pbPotCols() {
        const box = document.getElementById('pb-box'), table = box && box.querySelector('table.pb');
        if (!table || table.dataset.gtac) return;
        table.dataset.gtac = '1';
        const sea = pbSeason, rows = table.querySelectorAll('tbody tr[data-pb-name]');
        const heads = table.querySelectorAll('thead tr');
        const r1 = heads[0], r2 = heads[1];
        const th = document.createElement('th'); th.rowSpan = 2; th.className = 'pb-h'; th.textContent = 'Max POT';
        r1.insertBefore(th, r1.children[3]);
        r1.querySelectorAll('th[colspan="2"]').forEach(x => x.colSpan = 3);
        Array.from(r2.children).forEach(c => { if (c.textContent.trim() === 'OVR') { const n = document.createElement('th'); n.className = c.className; n.textContent = 'POT'; c.after(n); } });
        const cell = (id, k) => {
            const cur = String((((pbDraft[id].h || {})[sea]) || {})[k + '_acadPot'] || ''), orig = String((((pbOrig[id].h || {})[sea]) || {})[k + '_acadPot'] || '');
            return `<td class="pb-n"><input class="pb-in pb-num pb-pot ${cur.trim() !== orig.trim() ? 'pb-chg' : ''}" data-col="${k}_acadPot" inputmode="numeric" value="${E(cur)}" oninput="pbSetH('${id}','${k}_acadPot',this)" onkeydown="pbKey(event,this)"></td>`;
        };
        rows.forEach(tr => {
            const inp = tr.querySelector('input[oninput^="pbSet("]'), m = inp && inp.getAttribute('oninput').match(/pbSet\('([^']+)'/);
            if (!m) return;
            const id = m[1], pl = (squadData.akademi || []).find(x => x.id === id);
            if (pbOrig[id].mp === undefined) { pbOrig[id].mp = pbDraft[id].mp = String((pl && pl.pot) || ''); }
            const mp = document.createElement('td'); mp.className = 'pb-n';
            mp.innerHTML = `<input class="pb-in pb-num pb-pot ${String(pbDraft[id].mp).trim() !== String(pbOrig[id].mp).trim() ? 'pb-chg' : ''}" data-col="mp" inputmode="numeric" value="${E(pbDraft[id].mp)}" oninput="GTAC.pbMp('${id}',this)" onkeydown="pbKey(event,this)">`;
            tr.insertBefore(mp, tr.children[3]);
            PB_PERIODS.forEach(([k]) => { const o = tr.querySelector(`input[data-col="${k}o"]`); if (o) o.closest('td').insertAdjacentHTML('afterend', cell(id, k)); });
        });
        const note = box.querySelector('p.text-\\[11px\\]');
        if (note) note.insertAdjacentText('beforeend', ' ' + L('POT sütunları dönem kutularındaki potansiyeldir; Max POT oyuncunun genel potansiyelidir.', 'POT columns are the per-period potential boxes; Max POT is the player\'s overall potential.'));
    }
    const origPbRender = window.pbRender;
    if (typeof origPbRender === 'function') window.pbRender = function () {
        const r = origPbRender.apply(this, arguments);
        if (pbCtx === 'akademi') { try { pbPotCols(); } catch (e) { console.warn('GTAC', e); } }
        return r;
    };
    const origPbCount = window.pbChangedCount;
    if (typeof origPbCount === 'function') window.pbChangedCount = function () {
        let n = origPbCount.apply(this, arguments);
        if (pbCtx === 'akademi') Object.keys(pbDraft).forEach(id => {
            const d = pbDraft[id], o = pbOrig[id];
            if (o.mp !== undefined && String(d.mp || '').trim() !== String(o.mp || '').trim()) n++;
            const seas = new Set([...Object.keys(d.h || {}), ...Object.keys(o.h || {})]);
            seas.forEach(sn => PB_PERIODS.forEach(([k]) => {
                const dv = String((((d.h || {})[sn]) || {})[k + '_acadPot'] || '').trim(), ov = String((((o.h || {})[sn]) || {})[k + '_acadPot'] || '').trim();
                if (dv !== ov) n++;
            }));
        });
        return n;
    };
    const origPbSave = window.savePlayerBulkEdit;
    if (typeof origPbSave === 'function') window.savePlayerBulkEdit = function () {
        if (pbCtx === 'akademi') (squadData.akademi || []).forEach(p => {
            const d = pbDraft[p.id], o = pbOrig[p.id];
            if (!d || !o) return;
            if (o.mp !== undefined && String(d.mp || '').trim() !== String(o.mp || '').trim()) p.pot = String(d.mp || '').trim();
            Object.keys(p.history || {}).forEach(sn => PB_PERIODS.forEach(([k]) => {
                const key = k + '_acadPot', dv = (((d.h || {})[sn]) || {})[key];
                if (p.history[sn][key] !== undefined && (dv === undefined || dv === '')) delete p.history[sn][key];
            }));
        });
        return origPbSave.apply(this, arguments);
    };


    // ===== ⚡ Toplu giriş ve klavye hızlı girişine POT desteği (yalnızca akademi) =====
    const isAc = () => squadContext === 'akademi';
    const potBefore = (p, season, key) /* verilen dönemden ÖNCEKİ son POT */ => {
        const si = seasonsList.indexOf(season), ki = CH.indexOf(key); let v = 0;
        for (let i = 0; i <= si && i < seasonsList.length; i++) {
            const h = p.history && p.history[seasonsList[i]]; if (!h) continue;
            for (let j = 0; j < 4; j++) { if (i === si && j >= ki) break; const x = parseInt(h[CH[j] + '_acadPot']); if (x) v = x; }
        }
        return v || parseInt(p.pot) || 0;
    };
    const syncPot = p => { const v = latestPot(p); if (v) p.pot = String(v); };

    // -- ⚡ modal
    const origRows = window.renderBulkStatRows;
    window.renderBulkStatRows = function () {
        const r = origRows.apply(this, arguments);
        if (!isAc()) return r;
        const sn = activeBulkStatSeason, ck = activeBulkStatCellKey;
        document.querySelectorAll('#bs-players-container [data-player-id]').forEach(row => {
            const p = (squadData.akademi || []).find(x => String(x.id) === row.getAttribute('data-player-id')); if (!p) return;
            const cur = ((p.history || {})[sn] || {})[ck + '_acadPot'] || '', pv = potBefore(p, sn, ck);
            const inp = document.createElement('input');
            inp.type = 'number'; inp.className = 'bs-pot-input w-14 bg-slate-950 border border-slate-600 rounded p-1 sm:p-1.5 text-center font-bold outline-none focus:border-amber-400 appearance-none';
            inp.style.color = '#fbbf24'; inp.placeholder = pv ? String(pv) : 'POT'; inp.title = 'POT'; inp.value = cur; inp.min = 1; inp.max = 99;
            row.appendChild(inp);
        });
        return r;
    };
    const origOpenBs = window.openBulkStatModal;
    window.openBulkStatModal = function () {
        const r = origOpenBs.apply(this, arguments);
        if (isAc()) { const t = document.getElementById('bs-modal-title'); if (t) t.innerText = 'Toplu Yaş / OVR / POT Girişi'; }
        return r;
    };
    const origSaveBs = window.saveBulkStatModal;
    window.saveBulkStatModal = function () {
        if (!isAc()) return origSaveBs.apply(this, arguments);
        const sn = activeBulkStatSeason, ck = activeBulkStatCellKey; let potN = 0, other = false;
        document.querySelectorAll('#bs-players-container [data-player-id]').forEach(row => {
            const p = (squadData.akademi || []).find(x => String(x.id) === row.getAttribute('data-player-id')); if (!p) return;
            if (row.querySelector('.bs-age-input').value.trim() || row.querySelector('.bs-ovr-input').value.trim()) other = true;
            const el = row.querySelector('.bs-pot-input'); if (!el) return;
            const v = el.value.trim(), old = String(((p.history || {})[sn] || {})[ck + '_acadPot'] || '');
            if (v === old) return;
            if (v !== '' && !(parseInt(v) >= 1 && parseInt(v) <= 99)) return;
            if (!p.history) p.history = {}; if (!p.history[sn]) p.history[sn] = {};
            if (v === '') delete p.history[sn][ck + '_acadPot']; else p.history[sn][ck + '_acadPot'] = String(parseInt(v));
            syncPot(p); potN++;
        });
        if (other) return origSaveBs.apply(this, arguments);       // yaş/OVR kaydı + yeniden çizim
        if (potN) { saveToLocalStorage(); closeBulkStatModal(); renderSquadGrid(); return; }
        alert('Hiçbir oyuncu için yaş, OVR veya POT girilmedi.');
    };

    // -- Klavye hızlı girişi: OVR / POT geçişi
    let entryMode = 'o';
    const potOn = () => isAc() && entryMode === 'p' && typeof gtSqEntry !== 'undefined' && gtSqEntry;
    const origEC = window.gtSqEntryCell;
    window.gtSqEntryCell = function (p, season, key, bg, archived) {
        if (!potOn() || archived || gtSqEntry.season !== season || gtSqEntry.key !== key) return origEC.apply(this, arguments);
        const cur = ((p.history || {})[season] || {})[key + '_acadPot'] || '', prev = potBefore(p, season, key) || '';
        const diff = cur && prev ? parseInt(cur) - prev : 0;
        return `<td class="p-0 border-r border-b border-slate-700/50 align-middle text-center min-w-[125px] w-[125px] max-w-[125px] gt-sq-ecell ${bg}">
        <div class="gt-sq-e"><span class="gt-sq-prev" title="Önceki POT">${prev}</span>
        <input class="gt-sq-in gtac-potin" type="text" inputmode="text" maxlength="3" autocomplete="off" placeholder="POT" value="${escapeHtml(String(cur))}" data-pot="1" data-pid="${escapeHtml(String(p.id))}" data-prev="${prev}" data-orig="${escapeHtml(String(cur))}" onfocus="this.select()" onkeydown="gtSqKey(event, this)" onblur="gtSqCommit(this)">
        <span class="gt-sq-d ${diff > 0 ? 'up' : diff < 0 ? 'dn' : ''}">${diff ? (diff > 0 ? '+' : '') + diff : ''}</span><span></span></div></td>`;
    };
    const origCommit = window.gtSqCommit;
    window.gtSqCommit = function (inp, noSave) {
        if (!inp || !inp.dataset || !inp.dataset.pot) return origCommit.apply(this, arguments);
        if (!gtSqEntry || inp._busy) return false;
        const p = (squadData.akademi || []).find(x => String(x.id) === inp.dataset.pid); if (!p) return false;
        const v = gtSqParse(inp.value, inp.dataset.prev);
        if (v === null || (v !== '' && (v < 1 || v > 99))) { inp.classList.add('bad'); return false; }
        inp.classList.remove('bad');
        const { season, key } = gtSqEntry, next = v === '' ? '' : String(v); inp.value = next;
        const dEl = inp.parentElement.querySelector('.gt-sq-d'), pv = parseInt(inp.dataset.prev), diff = next && pv ? v - pv : 0;
        if (dEl) { dEl.textContent = diff ? (diff > 0 ? '+' : '') + diff : ''; dEl.className = 'gt-sq-d ' + (diff > 0 ? 'up' : diff < 0 ? 'dn' : ''); }
        if (next === inp.dataset.orig) return false;
        if (!p.history) p.history = {}; if (!p.history[season]) p.history[season] = {};
        if (next === '') delete p.history[season][key + '_acadPot']; else p.history[season][key + '_acadPot'] = next;
        syncPot(p); inp.dataset.orig = next;
        if (!noSave) { try { saveToLocalStorage(); } catch (e) {} }
        return true;
    };
    const origTb = window.gtSqToolbar;
    window.gtSqToolbar = function () {
        const h = origTb.apply(this, arguments);
        if (!isAc() || typeof gtSqEntry === 'undefined' || !gtSqEntry) return h;
        const sw = `<span class="gtac-emode"><button type="button" class="${entryMode === 'o' ? 'on' : ''}" onclick="GTAC.setEntryMode('o')">OVR</button><button type="button" class="${entryMode === 'p' ? 'on' : ''}" onclick="GTAC.setEntryMode('p')">POT</button></span>`;
        return h.replace('<button type="button" onclick="gtSqFillSame()"', sw + '<button type="button" onclick="gtSqFillSame()"');
    };
    const origSetEntry = window.gtSqSetEntry;
    window.gtSqSetEntry = function (season) { if (!season) entryMode = 'o'; return origSetEntry.apply(this, arguments); };

    window.GTAC = {
        pbMp(id, el) { pbDraft[id].mp = el.value; el.classList.toggle('pb-chg', el.value.trim() !== String(pbOrig[id].mp).trim()); pbUpdateCount(); },
        get mode() { return mode; },
        setMode(m) { mode = m === 'old' ? 'old' : 'new'; try { localStorage.setItem(MODE_KEY, mode); } catch (e) {} renderSquadGrid(); },
        setFilter(f) { ST.filter = f; render(); },
        setSort(s) { ST.sort = s; render(); },
        setEntryMode(m) { entryMode = m === 'p' ? 'p' : 'o'; if (typeof gtSqEntry !== 'undefined' && gtSqEntry) gtSqEntry.focus = true; renderSquadGrid(); },
        build, evalP
    };

    // ===== Akademiden As Takıma yükseltilen oyuncuya otomatik "Altyapıdan Geldi" (kep) ikonu =====
    const origPromote = window.promotePlayer;
    window.promotePlayer = function () {
        if (squadContext !== 'akademi') return origPromote.apply(this, arguments);
        const before = new Set((squadData.astakim || []).map(x => x.id));
        const src = (squadData.akademi || []).find(pl => pl.id === activePlayerId);
        const r = origPromote.apply(this, arguments);            // onay penceresi + kopyalama burada
        try {
            const np = (squadData.astakim || []).find(x => !before.has(x.id));
            if (np && src && src.isPromoted) {
                let last = null;
                seasonsList.forEach(sn => { const h = np.history && np.history[sn]; if (h) CH.forEach(c => { if (h[c + 'o'] || h[c + 'a']) last = { sn, c }; }); });
                if (!last) { const t = targetCell(); last = { sn: t.season, c: t.cell }; }
                np.history = np.history || {}; const h = np.history[last.sn] = np.history[last.sn] || {};
                const cur = h[last.c + 'Type'];
                if (!cur || cur === 'none' || cur === 'continue') { h[last.c + 'Type'] = 'academy'; saveToLocalStorage(); renderSquadGrid(); }
            }
        } catch (e) { console.warn('GTAC promote', e); }
        return r;
    };

    // ===== Akademi rolleri: Future Star ★ · First Team (4 çubuk) · To Loan (3) · To Sell (2) · Release (1) =====
    const AC_ROLES = ['Future Star', 'First Team', 'To Loan', 'To Sell', 'Release'];
    const AC_OLD = { 'Yıldız Adayı': 'Future Star', 'A Takım Adayı': 'First Team', 'Kiralık Gelişecek': 'To Loan', 'Satış Adayı': 'To Sell', 'Serbest Bırakılacak': 'Release',
                     'Gelecek Vadeden': 'Future Star', 'Yetersiz': 'Release',
                     'First Team Candidate': 'First Team', 'Develop on Loan': 'To Loan', 'Sell Candidate': 'To Sell', 'Release Candidate': 'Release' };
    function migrateRoles() {
        const cur = playerRoles.akademi || [];
        if (AC_ROLES.every(r => cur.includes(r)) && !cur.some(r => AC_OLD[r])) return false;
        const used = new Set(); let moved = false;
        (squadData.akademi || []).forEach(p => { if (AC_OLD[p.role]) { p.role = AC_OLD[p.role]; moved = true; } if (p.role) used.add(p.role); });
        const extra = cur.filter(r => !AC_ROLES.includes(r) && !AC_OLD[r] && used.has(r));      // oyuncuda kullanılan özel roller korunur
        playerRoles.akademi = AC_ROLES.concat(extra);
        return true;
    }
    const origRoleIcon = window.sqRoleIcon;
    window.sqRoleIcon = function (role, ctx) {
        if (ctx === 'akademi') {
            const safe = escapeHtml(role || '');
            if (role === 'Future Star') return `<span class="sq-role sq-role-star" title="${safe}"><i class="fa-solid fa-star"></i></span>`;
            const n = { 'First Team': 4, 'To Loan': 3, 'To Sell': 2, 'Release': 1 }[role];
            if (n) {
                const col = { 4: '#f87171', 3: '#60a5fa', 2: '#fbbf24', 1: '#94a3b8' }[n];
                return `<span class="sq-role" title="${safe}"><svg viewBox="0 0 15 12" width="15" height="12">${[0, 1, 2, 3].map(k => `<rect x="${k * 4}" y="${9 - k * 3}" width="3" height="${3 + k * 3}" rx="1" fill="${k < n ? col : '#334155'}"/>`).join('')}</svg></span>`;
            }
        }
        return origRoleIcon.apply(this, arguments);
    };
    const origPop = window.populateRolesDropdown;
    window.populateRolesDropdown = function (id, sel) {
        const ac = squadContext === 'akademi';
        if (ac) { try { if (migrateRoles()) saveToLocalStorage(); } catch (e) {} }
        const r = origPop.call(this, id, sel);
        // Akademi: varsayılan rol boş (ilk seçenek "—")
        if (ac) {
            const el = document.getElementById(id);
            if (el && !el.querySelector('option[value=""]')) {
                const o = document.createElement('option'); o.value = ''; o.textContent = '—'; el.insertBefore(o, el.firstChild);
                el.value = (playerRoles.akademi || []).includes(sel) ? sel : '';
            }
        }
        return r;
    };
    // Toplu düzenleme (akademi): rol listesine boş seçenek ekler
    if (typeof window.pbRender === 'function') {
        const origPb = window.pbRender;
        window.pbRender = function () {
            const r = origPb.apply(this, arguments);
            try {
                if (pbCtx === 'akademi') document.querySelectorAll('#pb-box select[data-col="role"]').forEach(el => {
                    if (el.querySelector('option[value=""]')) return;
                    const m = /pbSet\('([^']+)','role'/.exec(el.getAttribute('onchange') || ''), d = m && pbDraft[m[1]];
                    const o = document.createElement('option'); o.value = ''; o.textContent = '—'; el.insertBefore(o, el.firstChild);
                    el.value = d && d.role ? d.role : '';
                });
            } catch (e) { console.warn(e); }
            return r;
        };
    }

    // Klasik tablodaki POT kutularını ve "güncel POT" sütunundaki sayıyı seviyesine göre renklendirir: 90+ mavi, 80–89 yeşil, 75–79 sarı, 70–74 turuncu, ≤69 kırmızı
    function tierPots() {
        document.querySelectorAll('span[class*="border-emerald-600/70"], span[class="text-[10px] font-bold text-emerald-300"]').forEach(el => {
            const v = parseInt(el.textContent); if (!v) return;
            if (el.className.indexOf('text-emerald-300') !== -1 || el.classList.contains('gtac-col')) el.classList.add('gtac-col');   // "güncel POT" sütunu: daha büyük rozet
            el.classList.remove('gtac-t-hi', 'gtac-t-mid', 'gtac-t-lo', 'gtac-t-b', 'gtac-t-g', 'gtac-t-y', 'gtac-t-o', 'gtac-t-r');
            el.classList.add(v >= 90 ? 'gtac-t-b' : v >= 80 ? 'gtac-t-g' : v >= 75 ? 'gtac-t-y' : v >= 70 ? 'gtac-t-o' : 'gtac-t-r');
        });
    }

    const orig = window.renderSquadGrid;
    window.renderSquadGrid = function () {
        try { if (migrateRoles()) saveToLocalStorage(); } catch (e) { console.warn('GTAC roles', e); }
        const home = typeof activeMain !== 'undefined' && activeMain === 'anasayfa';
        if (squadContext === 'akademi' && !home && mode === 'new' && sqView !== 'attrs') {
            try { render(); return; } catch (e) { console.warn('GTAC', e); }
        }
        const r = orig.apply(this, arguments);
        if (squadContext === 'akademi' && !home && sqView !== 'attrs') { try { injectBack(); } catch (e) {} try { tierPots(); } catch (e) {} }
        return r;
    };
})();
