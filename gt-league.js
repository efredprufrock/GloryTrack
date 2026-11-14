/* GloryTrack · Maçlar sayfası: güncel İngiliz ligi bandı + filtreler (gt-league.js)
   - Rakiplerin GÜNCEL ligi, Lig Tarihi > İngiltere Piramidi verisinden okunur (pyramidData).
     Her lig için verisi olan en yeni sezon esas alınır; bir takım birden çok listede geçiyorsa en yeni sezon kazanır.
   - Üst bantta (eskiden boş duran alan) ligler logolarıyla gösterilir.
   - Filtreler: lig, sezon rakipleri / kalan maçlar, bilanço durumu, takım arama.
   Panel yalnızca okur; hiçbir veriyi değiştirmez. */
const GTMF = { lg: 'all', season: 'all', st: 'all', q: '' };
let GTLG_IDX = null;

const gtMfEn = () => typeof currentLang !== 'undefined' && currentLang === 'en';
const gtMfL = (tr, en) => gtMfEn() ? en : tr;
const gtMfFold = s => String(s || '').toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').trim();
const gtMfE = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
const GTLG_OTHER = { k: 'OTHER', n: 'Diğer', c: '#64748b' };

// ---------------- Lig verisi ----------------
function gtLgBuild() {
    const out = {}, src = [];
    try {
        PYR_LG.forEach((l, i) => {
            for (let j = seasonsList.length - 1; j >= 0; j--) {
                const s = seasonsList[j], arr = (pyramidData[s] || {})[l.k];
                if (arr && arr.length) { src.push({ l, i, s, si: j }); break; }
            }
        });
        src.sort((a, b) => b.si - a.si || a.i - b.i);
        src.forEach(o => (pyramidData[o.s][o.l.k] || []).forEach((n, r) => {
            const key = pyrKey(typeof n === 'string' ? n : n && n.name);
            if (key && !out[key]) out[key] = { k: o.l.k, season: o.s, pos: r + 1 };
        }));
    } catch (e) { console.warn('gt-league', e); }
    return out;
}
function gtLgIdx() { return GTLG_IDX || (GTLG_IDX = gtLgBuild()); }
function gtLgOf(name) { try { return name ? (gtLgIdx()[pyrKey(name)] || null) : null; } catch (e) { return null; } }
// Sıralama için (script.js'teki takım sıralayıcıda kullanılır): PL < CH < L1 < L2 < diğer
function gtLgRank(name) { const o = gtLgOf(name); if (!o) return 9; const i = PYR_LG.findIndex(l => l.k === o.k); return i < 0 ? 9 : i; }
function gtLgMeta(k) { return PYR_LG.find(l => l.k === k) || GTLG_OTHER; }
const GTLG_NAMES = { PL: ['Premier League', 'English Premier League'], CH: ['EFL Championship', 'Championship', 'Sky Bet Championship'], L1: ['EFL League One', 'League One'], L2: ['EFL League Two', 'League Two'] };
const GTLG_LOGO = {};
function gtLgLogo(k) {
    if (k in GTLG_LOGO) return GTLG_LOGO[k];
    let u = '';
    try {
        for (const nm of (GTLG_NAMES[k] || [])) { u = (typeof tourLogoOf === 'function' && tourLogoOf(nm)) || ''; if (u) break; }
        if (!u && typeof FC26_TOURNAMENT_DATABASE !== 'undefined') {
            for (const nm of (GTLG_NAMES[k] || [])) {
                const h = FC26_TOURNAMENT_DATABASE.find(t => t && t.name && gtMfFold(t.name.replace(/:\s*$/, '')) === gtMfFold(nm));
                if (h && h.logo) { u = h.logo; break; }
            }
        }
    } catch (e) { }
    return GTLG_LOGO[k] = u;
}
function gtLgBadge(k, cls) {
    const m = gtLgMeta(k), u = k === 'OTHER' ? '' : gtLgLogo(k);
    return u ? `<img class="${cls || 'gtlg-lg'}" src="${gtMfE(u)}" alt="" loading="lazy" onerror="this.outerHTML='<span class=&quot;${cls || 'gtlg-lg'} gtlg-ab&quot; style=&quot;background:${m.c}&quot;>${k === 'OTHER' ? '·' : k}</span>'">`
        : `<span class="${cls || 'gtlg-lg'} gtlg-ab" style="background:${m.c}">${k === 'OTHER' ? '·' : k}</span>`;
}
function gtLgLabel(k) { return k === 'OTHER' ? gtMfL('Diğer / lig dışı', 'Other / non-league') : gtLgMeta(k).n; }
function gtLgTitle(o, name) { const m = gtLgMeta(o ? o.k : 'OTHER'); return o ? `${name || ''} · ${m.n} (${o.season} · #${o.pos})` : `${name || ''} · ${gtLgLabel('OTHER')}`; }

// ---------------- Rakip istatistikleri (filtre için) ----------------
function gtMfStats() {
    const ctx = matchContext === 'milli' ? 'milli' : 'kulup', S = {}, store = (matchDataStore && matchDataStore[ctx]) || {};
    Object.keys(store).forEach(season => {
        const sd = store[season] || {};
        Object.keys(sd).forEach(id => {
            const o = S[id] || (S[id] = { p: 0, w: 0, d: 0, l: 0, ss: {} }), cell = o.ss[season] || (o.ss[season] = { any: false, rem: false });
            (sd[id] || []).forEach(m => {
                if (!m) return;
                if (m.result) { o.p++; if (m.result === 'W') o.w++; else if (m.result === 'D') o.d++; else if (m.result === 'L') o.l++; }
                if (m.result || m.fixtureId) cell.any = true;
                if (m.fixtureId && !m.result) cell.rem = true;
            });
        });
    });
    return S;
}
function gtMfActive() { return GTMF.lg !== 'all' || GTMF.season !== 'all' || GTMF.st !== 'all' || !!GTMF.q.trim(); }
function gtMfPass(opp, ST) {
    if (!opp || !opp.name) return !gtMfActive();
    const ctx = matchContext === 'milli' ? 'milli' : 'kulup';
    if (GTMF.q.trim() && !gtMfFold(opp.name).includes(gtMfFold(GTMF.q))) return false;
    if (ctx === 'kulup' && GTMF.lg !== 'all') { const o = gtLgOf(opp.name); if ((o ? o.k : 'OTHER') !== GTMF.lg) return false; }
    const s = ST[opp.id] || { p: 0, w: 0, d: 0, l: 0, ss: {} };
    if (GTMF.season !== 'all') {
        const rem = GTMF.season.indexOf('rem:') === 0, sn = rem ? GTMF.season.slice(4) : GTMF.season, c = s.ss[sn];
        if (!c || !(rem ? c.rem : c.any)) return false;
    }
    switch (GTMF.st) {
        case 'played': if (!s.p) return false; break;
        case 'unplayed': if (s.p) return false; break;
        case 'nowin': if (!s.p || s.w) return false; break;
        case 'nolose': if (!s.p || s.l) return false; break;
        case 'good': if (!(s.w > s.l)) return false; break;
        case 'bad': if (!(s.l > s.w)) return false; break;
    }
    return true;
}

// ---------------- Tablo yardımcıları ----------------
function gtLgTable() { const a = document.querySelector('#content-area table'); return a || null; }
function gtLgIsHoriz(t) { return window.innerWidth >= 640; }   // uygulama da aynı eşikle yatay/dikey seçer
function gtLgOppFrom(onclick) {
    const m = /handleOpponentClick\('(\w+)',\s*(\d+),\s*(\d+)\)/.exec(onclick || ''); if (!m) return null;
    const cfg = opponentsConfig[matchContext]; if (!cfg) return null;
    const opp = m[1] === 'domestic' ? (cfg.domestic.teams || [])[+m[3]] : ((cfg.foreign[+m[2]] || {}).teams || [])[+m[3]];
    return opp ? { opp, g: m[1] } : null;
}
function gtLgRuns(items) {
    const runs = [];
    items.forEach(c => {
        const o = c.opp && c.opp.name ? gtLgOf(c.opp.name) : null, k = c.opp && c.opp.name ? (o ? o.k : 'OTHER') : 'EMPTY', last = runs[runs.length - 1];
        if (last && last.k === k) { last.n++; last.items.push(c); } else runs.push({ k, n: 1, items: [c] });
    });
    return runs;
}
const gtLgHasData = items => items.some(c => c.opp && c.opp.name && gtLgOf(c.opp.name));
const gtLgBg = c => `linear-gradient(180deg, ${c}70, ${c}2e)`;

// ---------------- Yatay (masaüstü) tablo ----------------
function gtLgDecorateH(t) {
    const rows = t.querySelectorAll('thead tr'); if (rows.length < 3) return;
    const r1 = rows[0], r3 = rows[2], title = r1.children[1];
    const cols = []; r3.querySelectorAll('th[onclick^="handleOpponentClick"]').forEach(th => { const x = gtLgOppFrom(th.getAttribute('onclick')); if (x) cols.push({ th, opp: x.opp, g: x.g }); });
    const dom = cols.filter(c => c.g === 'domestic');
    if (!title || title.hidden || !dom.length || !gtLgHasData(dom)) return;
    const acts = title.querySelector('div.absolute'), runs = gtLgRuns(dom), frag = document.createDocumentFragment(), grpName = (title.textContent || '').trim();
    runs.forEach((r, ri) => {
        const th = document.createElement('th'), m = gtLgMeta(r.k);
        th.className = 'p-1 border-r border-b border-slate-700 gtlg-th group relative'; th.colSpan = r.n;
        th.style.background = gtLgBg(r.k === 'EMPTY' ? '#334155' : m.c); th.style.borderBottom = `2px solid ${r.k === 'EMPTY' ? '#334155' : m.c}`;
        th.title = r.k === 'EMPTY' ? grpName : `${gtLgLabel(r.k)} · ${r.items.length} ${gtMfL('takım', 'teams')}`;
        th.innerHTML = r.k === 'EMPTY' ? `<span class="gtlg-in"><b class="full">${gtMfE(grpName)}</b></span>`
            : `<span class="gtlg-in">${gtLgBadge(r.k)}<b class="full">${gtMfE(gtLgLabel(r.k))}</b><b class="abbr">${r.k === 'OTHER' ? gtMfL('Diğer', 'Other') : r.k}</b><i>${r.items.length}</i></span>`;
        if (ri === runs.length - 1 && acts) th.appendChild(acts.cloneNode(true));
        frag.appendChild(th);
    });
    title.replaceWith(frag);
}
function gtLgApplyH(t, ST) {
    const rows = t.querySelectorAll('thead tr'); if (rows.length < 3) return { vis: 0, tot: 0 };
    const r1 = rows[0], r2 = rows[1], r3 = rows[2];
    const cols = []; r3.querySelectorAll('th[onclick^="handleOpponentClick"]').forEach(th => { const x = gtLgOppFrom(th.getAttribute('onclick')); if (x) cols.push({ th, opp: x.opp }); });
    const N = cols.length, vis = cols.map(c => gtMfPass(c.opp, ST));
    cols.forEach((c, j) => { c.th.style.display = vis[j] ? '' : 'none'; });
    Array.from(t.tBodies[0].rows).forEach(tr => {
        const first = tr.cells[0]; if (!first || !/openSeasonStatsModal/.test(first.getAttribute('onclick') || '')) return;
        for (let j = 0; j < N; j++) { const td = tr.cells[j + 1]; if (td) td.style.display = vis[j] ? '' : 'none'; }
    });
    const fix = (row, startAt) => {
        let pos = 0;
        Array.from(row.children).slice(startAt).forEach(ch => {
            if (pos >= N || ch.hidden) return;
            const cs = +ch.dataset.ocs || ch.colSpan || 1; ch.dataset.ocs = cs;
            let v = 0; for (let j = pos; j < pos + cs && j < N; j++) if (vis[j]) v++;
            ch.colSpan = Math.max(v, 1); ch.style.display = v ? '' : 'none';
            if (ch.classList.contains('gtlg-th')) { ch.classList.toggle('n1', v <= 1); ch.classList.toggle('n2', v === 2); const i = ch.querySelector('i'); if (i) i.textContent = v; }
            pos += cs;
        });
    };
    fix(r1, 1); fix(r2, 0);
    const named = cols.filter(c => c.opp && c.opp.name);
    return { vis: named.filter(c => gtMfPass(c.opp, ST)).length, tot: named.length };
}

// ---------------- Dikey (mobil) tablo ----------------
function gtLgDecorateV(t) {
    const body = t.tBodies[0]; if (!body) return;
    const rows = Array.from(body.rows); let colSpan = 1, prevK = null;
    rows.forEach(tr => { const c = tr.cells[0]; if (c && c.colSpan > 1) colSpan = Math.max(colSpan, c.colSpan); });
    const domRows = [];
    rows.forEach(tr => {
        const c = tr.cells[0]; if (!c || c.colSpan > 1) return;
        const x = gtLgOppFrom(c.getAttribute('onclick')); if (x && x.g === 'domestic' && x.opp.name) domRows.push({ tr, opp: x.opp });
    });
    if (!domRows.length || !gtLgHasData(domRows)) return;
    domRows.forEach(d => {
        const o = gtLgOf(d.opp.name), k = o ? o.k : 'OTHER';
        if (k !== prevK) {
            const sep = document.createElement('tr'), m = gtLgMeta(k); sep.className = 'gtlg-sep'; sep.dataset.lg = k;
            sep.innerHTML = `<td colspan="${colSpan}" class="p-0 border-b border-slate-700" style="background:${gtLgBg(m.c)}"><div class="gtlg-sepin">${gtLgBadge(k)}<b>${gtMfE(gtLgLabel(k))}</b></div></td>`;
            d.tr.parentNode.insertBefore(sep, d.tr); prevK = k;
        }
    });
}
function gtLgApplyV(t, ST) {
    const rows = Array.from(t.tBodies[0].rows); let vis = 0, tot = 0, hdr = null, hdrV = false, sep = null, sepV = false;
    const endSep = () => { if (sep) sep.style.display = sepV ? '' : 'none'; sep = null; sepV = false; };
    const endHdr = () => { endSep(); if (hdr) hdr.style.display = hdrV ? '' : 'none'; hdr = null; hdrV = false; };
    rows.forEach(tr => {
        const c = tr.cells[0]; if (!c) return;
        if (tr.classList.contains('gtlg-sep')) { endSep(); sep = tr; sepV = false; return; }
        if (c.colSpan > 1) { endHdr(); hdr = tr; hdrV = false; return; }
        const x = gtLgOppFrom(c.getAttribute('onclick')); if (!x) return;
        const ok = gtMfPass(x.opp, ST); tr.style.display = ok ? '' : 'none';
        if (x.opp.name) { tot++; if (ok) vis++; }
        if (ok) { hdrV = true; sepV = true; }
    });
    endHdr();
    return { vis, tot };
}

// ---------------- Filtre çubuğu ----------------
function gtMfBarHtml(counts) {
    const club = matchContext !== 'milli', ST = gtMfStats();
    const seasons = (seasonsList || []).slice().reverse(), cur = seasonsList && seasonsList.length ? seasonsList[seasonsList.length - 1] : null;
    let hasRem = false; if (cur) Object.keys(ST).forEach(id => { if (ST[id].ss[cur] && ST[id].ss[cur].rem) hasRem = true; });
    const lgCnt = { all: 0 }; const cfg = opponentsConfig[matchContext], all = [].concat(cfg.domestic.teams || [], ...(cfg.foreign || []).map(g => g.teams || [])).filter(t => t && t.name);
    all.forEach(t => { lgCnt.all++; const o = gtLgOf(t.name), k = o ? o.k : 'OTHER'; lgCnt[k] = (lgCnt[k] || 0) + 1; });
    const chip = (k, inner, title) => `<button type="button" class="gtmf-chip${GTMF.lg === k ? ' on' : ''}${(lgCnt[k] || 0) === 0 && k !== 'all' ? ' dim' : ''}" ${k !== 'all' && k !== 'OTHER' ? `style="--lc:${gtLgMeta(k).c}"` : ''} title="${gtMfE(title)}" onclick="gtMfSet('lg','${k}')">${inner}<em>${lgCnt[k] || 0}</em></button>`;
    const chips = club && PYR_LG ? `<div class="gtmf-grp">${chip('all', `<span>${gtMfL('Tümü', 'All')}</span>`, gtMfL('Tüm takımlar', 'All teams'))}${PYR_LG.map(l => chip(l.k, `${gtLgBadge(l.k, 'gtmf-lg')}<span>${l.k}</span>`, l.n)).join('')}${chip('OTHER', `${gtLgBadge('OTHER', 'gtmf-lg')}<span>${gtMfL('Diğer', 'Other')}</span>`, gtLgLabel('OTHER'))}</div>` : '';
    const sOpts = [`<option value="all">${gtMfL('Tüm sezonlar', 'All seasons')}</option>`].concat(seasons.map(s => `<option value="${s}"${GTMF.season === s ? ' selected' : ''}>${s} ${gtMfL('rakipleri', 'opponents')}</option>`));
    if (cur && hasRem) sOpts.splice(1, 0, `<option value="rem:${cur}"${GTMF.season === 'rem:' + cur ? ' selected' : ''}>${cur} ${gtMfL('kalan maçlar', 'remaining')}</option>`);
    const stList = [['all', gtMfL('Tüm durumlar', 'Any record')], ['played', gtMfL('Oynadıklarım', 'Played')], ['unplayed', gtMfL('Hiç oynamadıklarım', 'Never played')], ['nowin', gtMfL('Hiç yenemediklerim', 'Never beaten')], ['nolose', gtMfL('Hiç kaybetmediklerim', 'Never lost to')], ['good', gtMfL('Üstün olduklarım', 'Winning record')], ['bad', gtMfL('Kabus rakipler', 'Losing record')]];
    return `${chips}
        <select class="gtmf-sel" onchange="gtMfSet('season',this.value)" title="${gtMfL('Sezon filtresi', 'Season filter')}">${sOpts.join('')}</select>
        <select class="gtmf-sel" onchange="gtMfSet('st',this.value)" title="${gtMfL('Bilanço filtresi', 'Record filter')}">${stList.map(([v, l]) => `<option value="${v}"${GTMF.st === v ? ' selected' : ''}>${l}</option>`).join('')}</select>
        <label class="gtmf-q"><i class="fa-solid fa-magnifying-glass"></i><input type="text" value="${gtMfE(GTMF.q)}" placeholder="${gtMfL('Takım ara…', 'Find team…')}" oninput="gtMfQuery(this.value)" autocomplete="off"></label>
        <button type="button" class="gtmf-rst" onclick="gtMfReset()" ${gtMfActive() ? '' : 'hidden'} title="${gtMfL('Filtreleri temizle', 'Clear filters')}"><i class="fa-solid fa-xmark"></i></button>
        <span class="gtmf-cnt"></span>`;
}
function gtMfCount(r) { const el = document.querySelector('.gtmf .gtmf-cnt'); if (el && r) el.textContent = gtMfActive() ? `${r.vis} / ${r.tot} ${gtMfL('takım', 'teams')}` : `${r.tot} ${gtMfL('takım', 'teams')}`; const b = document.querySelector('.gtmf .gtmf-rst'); if (b) b.hidden = !gtMfActive(); }
function gtMfApply() {
    const t = gtLgTable(); if (!t) return;
    const ST = gtMfStats(), r = gtLgIsHoriz(t) ? gtLgApplyH(t, ST) : gtLgApplyV(t, ST);
    gtMfCount(r);
    if (gtLgIsHoriz(t) && typeof mgFitCols === 'function') mgFitCols();
}
function gtMfPaint() { const bar = document.querySelector('.gtmf'); if (bar) bar.innerHTML = gtMfBarHtml(); gtMfApply(); }
function gtMfSet(k, v) { GTMF[k] = (k === 'lg' && GTMF.lg === v) ? 'all' : v; gtMfPaint(); }
function gtMfQuery(v) { GTMF.q = v; gtMfApply(); }
function gtMfReset() { GTMF.lg = 'all'; GTMF.season = 'all'; GTMF.st = 'all'; GTMF.q = ''; gtMfPaint(); }

// ---------------- Render sonrası ----------------
function gtLgPost() {
    if (typeof activeMain === 'undefined' || activeMain !== 'maclar') return;
    const t = gtLgTable(); if (!t) return;
    if (matchContext !== 'milli') { if (gtLgIsHoriz(t)) gtLgDecorateH(t); else gtLgDecorateV(t); }
    const wrap = t.closest('#content-area > div') || document.querySelector('#content-area > div'), top = wrap && wrap.firstElementChild;
    if (top && !wrap.querySelector('.gtmf')) { const bar = document.createElement('div'); bar.className = 'gtmf'; bar.innerHTML = gtMfBarHtml(); top.after(bar); }
    gtMfApply();
}
(function gtLgWrap() {
    if (window.__gtLgWrapped || typeof renderMatchesGrid !== 'function') return; window.__gtLgWrapped = true;
    const orig = window.renderMatchesGrid;
    window.renderMatchesGrid = function () { GTLG_IDX = null; const r = orig.apply(this, arguments); try { gtLgPost(); } catch (e) { console.warn('gt-league', e); } return r; };
    // Gizlenen sütunlar sayılmadan sığdır
    if (typeof mgFitCols === 'function') {
        window.mgFitCols = function () {
            if (window.innerWidth < 640) return;
            const anchor = document.querySelector('th div[onclick="openManagedTeamModal()"]');
            const tbl = anchor && anchor.closest('table'); if (!tbl) return;
            const wrap = tbl.parentElement;
            const n = Array.from(tbl.querySelectorAll('thead th.max-w-\\[46px\\]')).filter(th => th.style.display !== 'none').length; if (!n) return;
            const sc = (typeof currentScale === 'number' && currentScale > 0) ? currentScale : 1;
            const avail = wrap.clientWidth / sc - 96 - 4;
            let size = Math.max(46, Math.min(160, avail / n));
            tbl.style.setProperty('--mcol', size + 'px');
            const gap = wrap.clientWidth - tbl.getBoundingClientRect().width;
            if (Math.abs(gap) > 0.5) size = Math.max(46, Math.min(160, size + gap / sc / n));
            tbl.classList.add('mg-fit');
            tbl.style.setProperty('--mcol', size + 'px');
        };
    }
})();
