// =====================================================================
// GloryTrack · Kadro sayfası eklentileri
// script.js'ten SONRA yüklenir. renderSquadGrid() içindeki küçük kancalar
// (gtSq... çağrıları) bu dosyadaki fonksiyonları kullanır.
//  1) Geçmiş sezonlar tek "özet" sütununa katlanır (sezon başlığına tıkla: aç/katla)
//  2) Boş dönemler gizlenir; yalnızca sıradaki dönem görünür
//  3) OVR seyri (mini çizgi grafik) sütunu
//  4) Altta ortalama satırı (dönem başına ortalama OVR)
//  5) Hızlı giriş: sütun başlığındaki klavye simgesi → hücrelere doğrudan yaz
//     (63, +2, -1, = kabul eder; Enter/↓ alt satır, ↑ üst satır, Esc vazgeç)
//  6) "Değişmedi": boş kalanları önceki OVR ile doldur
//  7) Hazır filtreler ve trend renklendirme
// =====================================================================
const GTSQ_K = ['s2', 't2', 's1', 't1'];          // tablodaki sıra (yeni → eski)
const GTSQ_CHRONO = ['t1', 's1', 't2', 's2'];     // zaman sırası (eski → yeni)
const GTSQ = (() => {
    let s = {};
    try { s = JSON.parse(localStorage.getItem('gt_sq_ui') || '{}') || {}; } catch (e) {}
    return Object.assign({ fold: {}, all: false, trend: false, filter: 'all' }, s);
})();
let gtSqEntry = null;   // { season, key } → hızlı giriş açık olan sütun
let gtSqCtx = null;     // son çizimin bilgileri

function gtSqL(tr, en) { return (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr; }
function gtSqSave() { try { localStorage.setItem('gt_sq_ui', JSON.stringify(GTSQ)); } catch (e) {} }
function gtSqLabel(key) {
    return ({ t1: gtSqL('YAZ TR.', 'SUMMER TR.'), s1: gtSqL('ARA-EYL', 'DEC-SEP'), t2: gtSqL('KIŞ TR.', 'WINTER TR.'), s2: gtSqL('HAZ-ŞUB', 'JUN-FEB') })[key] || key;
}
function gtSqJs(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

// ---- Oyuncunun OVR geçmişi (zaman sırasıyla) ----
function gtSqSeries(p) {
    const out = [];
    const j = parseInt(p.joinOvr); if (j) out.push({ v: j, join: true });
    (seasonsList || []).forEach(s => {
        const d = p.history && p.history[s]; if (!d) return;
        GTSQ_CHRONO.forEach(k => { const v = parseInt(d[k + 'o']); if (v) out.push({ v, s, k }); });
    });
    return out;
}
// Son iki kayıt arasındaki fark (yoksa null)
function gtSqTrend(p) {
    const a = gtSqSeries(p); if (a.length < 2) return null;
    return a[a.length - 1].v - a[a.length - 2].v;
}
// Verilen dönemden ÖNCEKİ son değer (alan: 'o' = OVR, 'a' = yaş)
function gtSqBefore(p, season, key, field) {
    const si = seasonsList.indexOf(season), ki = GTSQ_CHRONO.indexOf(key);
    for (let i = si; i >= 0; i--) {
        const d = p.history && p.history[seasonsList[i]];
        if (d) for (let j = (i === si ? ki - 1 : 3); j >= 0; j--) { const v = d[GTSQ_CHRONO[j] + field]; if (v) return { v: parseInt(v), back: si - i }; }
    }
    const jv = parseInt(field === 'o' ? p.joinOvr : p.joinAge);
    return jv ? { v: jv, back: 0, join: true } : null;
}

// ---- 0) Dönem sütunları Özellikler sayfasına yüklenen veriden beslenir ----
// Özellik kayıtları kadro tablosuyla aynı dört döneme göre tutulur:
//   YAZ TR. (t1) · ARA-EYL (s1) · KIŞ TR. (t2) · HAZ-ŞUB (s2)
// Eski "sezon başı / ortası / sonu" kayıtları sırasıyla YAZ TR. / ARA-EYL / HAZ-ŞUB'a taşınır.
const GTSQ_PHASE_CELL = { t1: 't1', s1: 's1', t2: 't2', s2: 's2', start: 't1', mid: 's1', end: 's2' };
const GTSQ_OLD_PHASE = { start: 't1', mid: 's1', end: 's2' };
// script.js'teki dönem listesini dört döneme çevir (zaman sırasıyla) ve etiketleri kadro sütunlarıyla aynı yap
try {
    if (typeof ATTR_PHASES !== 'undefined' && typeof ATTR_PHASE_LBL !== 'undefined') {
        ATTR_PHASES.splice(0, ATTR_PHASES.length, 't1', 's1', 't2', 's2');
        Object.assign(ATTR_PHASE_LBL, { t1: ['YAZ TR.', 'SUMMER TR.'], s1: ['ARA-EYL', 'DEC-SEP'], t2: ['KIŞ TR.', 'WINTER TR.'], s2: ['HAZ-ŞUB', 'JUN-FEB'] });
    }
} catch (e) { console.warn(e); }
// Eski anahtarları ("25/26|end") yenisine ("25/26|s2") taşır
function gtSqMigrateAttrs() {
    let n = 0;
    try {
        Object.keys(squadData || {}).forEach(ctx => (Array.isArray(squadData[ctx]) ? squadData[ctx] : []).forEach(p => {
            if (!p || !p.attrs) return;
            Object.keys(p.attrs).forEach(key => {
                const parts = String(key).split('|'), np = GTSQ_OLD_PHASE[parts[1]]; if (!np) return;
                const nk = parts[0] + '|' + np, snap = p.attrs[key];
                if (!p.attrs[nk] && snap) { snap.phase = np; p.attrs[nk] = snap; }
                delete p.attrs[key]; n++;
            });
        }));
    } catch (e) { console.warn(e); }
    return n;
}
function gtSqSyncAttrs() {
    let changed = 0;
    try {
        Object.keys(squadData || {}).forEach(ctx => (Array.isArray(squadData[ctx]) ? squadData[ctx] : []).forEach(p => {
            if (!p || !p.attrs) return;
            Object.keys(p.attrs).forEach(key => {
                const snap = p.attrs[key]; if (!snap) return;
                const parts = String(key).split('|'), season = snap.season || parts[0], cell = GTSQ_PHASE_CELL[snap.phase || parts[1]];
                if (!cell || seasonsList.indexOf(season) === -1) return;
                const set = (field, val) => {
                    const v = parseInt(val); if (!v) return;
                    if (!p.history) p.history = {};
                    if (!p.history[season]) p.history[season] = {};
                    if (String(p.history[season][cell + field] || '') !== String(v)) { p.history[season][cell + field] = String(v); changed++; }
                };
                set('o', snap.ovr); set('a', snap.age);
            });
        }));
    } catch (e) { console.warn('Özellik verisi eşitlenemedi:', e); }
    return changed;
}
// Hücrenin değeri özellik kaydından mı geliyor?
function gtSqFromAttrs(p, season, key) {
    const snap = p.attrs && p.attrs[season + '|' + key];
    return !!(snap && parseInt(snap.ovr));
}
// ---- Yaşlar doğum tarihinden: doğum tarihi girilmiş oyuncunun tüm yaş alanları hesaplanıp üzerine yazılır ----
function gtSqSyncAges() {
    let changed = 0;
    try {
        // Kadroda veri girilmiş en son dönem (hiç geçmişi olmayan oyuncunun yaşı buna göre)
        let last = null;
        const everyone = Object.keys(squadData || {}).flatMap(c => Array.isArray(squadData[c]) ? squadData[c] : []);
        for (let i = seasonsList.length - 1; i >= 0 && !last; i--) for (let j = 3; j >= 0 && !last; j--) {
            const s = seasonsList[i], k = GTSQ_CHRONO[j];
            if (everyone.some(q => q && q.history && q.history[s] && q.history[s][k + 'o'])) last = { s, k };
        }
        if (!last && seasonsList.length) last = { s: seasonsList[seasonsList.length - 1], k: 't1' };
        everyone.forEach(p => {
            if (!p || !/^\d{4}-\d{2}-\d{2}$/.test(p.birthDate || '')) return;
            const put = (obj, field, val) => { if (val && String(obj[field] || '') !== String(val)) { obj[field] = typeof obj[field] === 'number' ? val : String(val); changed++; } };
            let first = null;
            seasonsList.forEach(s => {
                const d = p.history && p.history[s]; if (!d) return;
                GTSQ_CHRONO.forEach(k => {
                    if (!(d[k + 'o'] || d[k + 'a'] || (d[k + 'Type'] && d[k + 'Type'] !== 'none'))) return;
                    if (!first) first = { s, k };
                    put(d, k + 'a', gtSqAgeAt(p, s, k));
                });
            });
            Object.keys(p.attrs || {}).forEach(key => {
                const snap = p.attrs[key], parts = String(key).split('|'), cell = snap && GTSQ_PHASE_CELL[snap.phase || parts[1]]; if (!cell) return;
                const a = gtSqAgeAt(p, snap.season || parts[0], cell);
                if (a && snap.age !== a) { snap.age = a; changed++; }
            });
            // Katılış yaşı: takıma katıldığı sezon biliniyorsa o, yoksa ilk kaydı; hiç kaydı yoksa son dönem
            const jp = (p.joined && seasonsList.indexOf(p.joined.season) !== -1) ? { s: p.joined.season, k: 't1' } : (first || last);
            if (jp) put(p, 'joinAge', gtSqAgeAt(p, jp.s, jp.k));
        });
    } catch (e) { console.warn('Yaşlar hesaplanamadı:', e); }
    return changed;
}
// Tüm eşitlemeler: eski özellik anahtarları → özellik kayıtlarından OVR/yaş → doğum tarihinden yaş
function gtSqSyncAll() {
    const n = gtSqMigrateAttrs() + gtSqSyncAges() + gtSqSyncAttrs() + gtSqSyncAges();
    if (n) { try { saveToLocalStorage(); } catch (e) { console.warn(e); } }
    return n;
}
window.addEventListener('load', () => setTimeout(() => {
    if (gtSqSyncAll()) { try { if (typeof rerenderCurrentPanel === 'function') rerenderCurrentPanel(); } catch (e) { console.warn(e); } }
}, 0));
// Kadro sayfası (tablo ya da Özellikler) her çizildiğinde veriler eşitlenir
(function gtSqWrapRender() {
    if (window.__gtSqRenderWrapped || typeof renderSquadGrid !== 'function') return;
    window.__gtSqRenderWrapped = true;
    const orig = window.renderSquadGrid;
    window.renderSquadGrid = function () { try { gtSqSyncAll(); } catch (e) { console.warn(e); } return orig.apply(this, arguments); };
})();
// Toplu özellik ekleme penceresi: dönem listesi kadro sütunlarıyla aynı adları ve sırayı kullanır
(function gtSqWrapAttrImport() {
    if (window.__gtAiWrapped || typeof openAttrImport !== 'function') return;
    window.__gtAiWrapped = true;
    const oOpen = window.openAttrImport, oPrev = window.attrImportPreview;
    const fill = () => {
        const sel = document.getElementById('ai-phase'), se = document.getElementById('ai-season'); if (!sel) return;
        sel.innerHTML = GTSQ_K.map(k => `<option value="${k}">${gtSqLabel(k)}</option>`).join('');
        // Varsayılan: seçili sezonda veri girilmiş son dönem (yoksa YAZ TR.)
        const season = se ? se.value : '', all = Object.keys(squadData || {}).flatMap(c => Array.isArray(squadData[c]) ? squadData[c] : []);
        sel.value = GTSQ_K.find(k => all.some(p => p && p.history && p.history[season] && p.history[season][k + 'o'])) || 't1';
    };
    window.openAttrImport = function () { const r = oOpen.apply(this, arguments); try { fill();
        // Sezonu ya da dönemi elle seçtiysen, yapıştırılan verideki sezon/dönem bunu değiştiremez
        ['ai-season', 'ai-phase'].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('change', () => { el.dataset.user = '1'; }); }); const ta = document.getElementById('ai-text'); if (ta) ta.placeholder = '{"gt":"attrs","v":1,"season":"25/26","phase":"s2","players":[ ... ]}'; } catch (e) { console.warn(e); } return r; };
    // Yapıştırılan veride eski dönem adı ("start" / "mid" / "end") ya da sütun adı ("JUN-FEB") varsa karşılığını seç
    if (typeof oPrev === 'function') window.attrImportPreview = function () {
        const se = document.getElementById('ai-season'), ph = document.getElementById('ai-phase');
        const mine = { s: se && se.value, p: ph && ph.value, us: !!(se && se.dataset.user), up: !!(ph && ph.dataset.user) };
        const r = oPrev.apply(this, arguments);
        try {
            const d = JSON.parse(document.getElementById('ai-text').value.trim()), raw = String((d && d.phase) || '').trim().toLowerCase().replace(/[.\s_]+/g, '');
            const alias = { start: 't1', mid: 's1', end: 's2', summertr: 't1', yaztr: 't1', decsep: 's1', 'dec-sep': 's1', 'ara-eyl': 's1', araeyl: 's1', wintertr: 't2', 'kıştr': 't2', kistr: 't2', 'jun-feb': 's2', junfeb: 's2', 'haz-şub': 's2', 'haz-sub': 's2', 'hazşub': 's2', hazsub: 's2' };
            const k = GTSQ_K.indexOf(raw) !== -1 ? raw : alias[raw];
            if (ph) ph.value = mine.up ? mine.p : (k || mine.p);
            if (se && mine.us) se.value = mine.s;
            // Verideki sezon/dönem senin seçiminden farklıysa hangisinin kullanılacağını açıkça yaz
            const ds = d && d.season && seasonsList.indexOf(d.season) !== -1 ? d.season : '', msg = document.getElementById('ai-msg');
            const differs = (mine.us && ds && ds !== se.value) || (mine.up && k && k !== ph.value);
            if (msg && se && ph && /\bok\b/.test(msg.className)) {
                msg.textContent += ' ' + gtSqL(`Kaydedilecek dönem → ${se.value} · ${gtSqLabel(ph.value)}`, `Will be saved to → ${se.value} · ${gtSqLabel(ph.value)}`) +
                    (differs ? ' ' + gtSqL(`(Veride ${ds || se.value} · ${k ? gtSqLabel(k) : gtSqLabel(ph.value)} yazıyor; senin seçimin kullanılıyor.)`, `(The data says ${ds || se.value} · ${k ? gtSqLabel(k) : gtSqLabel(ph.value)}; your selection is used.)`) : '');
            }
        } catch (e) {}
        return r;
    };
})();

// ---- 1-2) Görünen sütunlar: katlama + boş dönemleri gizleme ----
function gtSqHas(players, season, key) {
    return players.some(p => {
        const d = p.history && p.history[season]; if (!d) return false;
        return d[key + 'a'] || d[key + 'o'] || (d[key + 'Type'] && d[key + 'Type'] !== 'none') || (d[key] && String(d[key]).trim() !== '') || d[key + '_acadPot'];
    });
}
function gtSqCols(map, seasons, players, staticCols) {
    if (!map || map.__gt) return;
    Object.defineProperty(map, '__gt', { value: true });
    gtSqCtx = { map, seasons, players, staticCols };
    if (gtSqEntry && seasons.indexOf(gtSqEntry.season) === -1) gtSqEntry = null;
    const latest = seasons.find(s => GTSQ_K.some(k => gtSqHas(players, s, k))); // veri olan en yeni sezon
    const li = latest ? seasonsList.indexOf(latest) : -1;
    seasons.forEach(season => {
        const arr = map[season]; if (!arr) return;
        const isEntry = gtSqEntry && gtSqEntry.season === season;
        const anyData = GTSQ_K.some(k => gtSqHas(players, season, k));
        const explicit = GTSQ.fold[season];
        const defFold = !GTSQ.all && li >= 0 && seasonsList.indexOf(season) < li;
        const fold = !isEntry && anyData && (explicit === undefined ? defFold : explicit);
        let next;
        if (fold) next = ['sum'];
        else if (GTSQ.all) next = arr.slice();
        else {
            const f = GTSQ_K.findIndex(k => gtSqHas(players, season, k));
            next = f === -1 ? ['t1'] : GTSQ_K.slice(Math.max(0, season === latest ? f - 1 : f));
        }
        if (isEntry && next.indexOf(gtSqEntry.key) === -1) next = GTSQ_K.slice(Math.min(GTSQ_K.indexOf(gtSqEntry.key), GTSQ_K.indexOf(next[0])));
        arr.splice(0, arr.length, ...next);
    });
    setTimeout(gtSqAfterRender, 0);
}
function gtSqToggleSeason(season) {
    if (typeof event !== 'undefined' && event && event.target && event.target.closest && event.target.closest('button')) return;
    const cur = !!(gtSqCtx && gtSqCtx.map[season] && gtSqCtx.map[season][0] === 'sum');
    GTSQ.fold[season] = !cur; gtSqSave();
    if (gtSqEntry && gtSqEntry.season === season) gtSqEntry = null;
    renderSquadGrid();
}
function gtSqSumHead(season) {
    return `<th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-400 min-w-[125px] w-[125px] max-w-[125px] cursor-pointer hover:text-white" onclick="gtSqToggleSeason('${gtSqJs(season)}')" title="${gtSqL('Dönemleri aç', 'Expand periods')}"><div class="flex items-center justify-center gap-1.5"><i class="fa-solid fa-up-right-and-down-left-from-center text-[8px]"></i> ${gtSqL('SEZON ÖZETİ', 'SEASON SUMMARY')}</div></th>`;
}
function gtSqSumCell(p, season, strip) {
    const d = (p.history && p.history[season]) || {};
    const pts = GTSQ_CHRONO.map(k => parseInt(d[k + 'o'])).filter(Boolean);
    const types = GTSQ_CHRONO.map(k => d[k + 'Type']).filter(t => t && t !== 'none' && t !== 'continue');
    const click = `onclick="gtSqToggleSeason('${gtSqJs(season)}')"`;
    const base = 'p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors min-w-[125px] w-[125px] max-w-[125px]';
    if (!pts.length && !types.length) return `<td class="${base} bg-transparent" ${click}></td>`;
    const ICON = { in: ['fa-arrow-right-to-bracket', '#22c55e'], academy: ['fa-graduation-cap', '#06b6d4'], out: ['fa-arrow-right-from-bracket', '#ef4444'], renew: ['fa-file-signature', '#a855f7'], loan_in: ['fa-handshake-angle', '#3b82f6'], loan_out: ['fa-paper-plane', '#f97316'] };
    const icons = [...new Set(types)].slice(0, 2).map(t => ICON[t] ? `<i class="fa-solid ${ICON[t][0]}" style="color:${ICON[t][1]}"></i>` : '').join('');
    let body = '';
    if (pts.length) {
        const before = gtSqBefore(p, season, 't1', 'o');
        const start = before ? before.v : pts[0], end = pts[pts.length - 1], diff = end - start;
        body = `<span class="gt-sum-a">${start}</span><i class="fa-solid fa-arrow-right-long gt-sum-ar"></i>${mbOvr(end, true)}` +
            (diff ? `<b class="${diff > 0 ? 'up' : 'dn'}">${diff > 0 ? '+' : ''}${diff}</b>` : '<b class="eq">=</b>');
    }
    return `<td class="${base} ${strip || ''}" ${click}><div class="gt-sum">${body}${icons ? `<span class="gt-sum-ic">${icons}</span>` : ''}</div></td>`;
}

// ---- 3) OVR seyri ----
function gtSqSpark(p) {
    const a = gtSqSeries(p).map(x => x.v);
    if (a.length < 2) return '<span class="text-[10px] text-slate-600">-</span>';
    const W = 46, H = 18, pad = 2.5, mn = Math.min(...a), mx = Math.max(...a), rg = (mx - mn) || 1;
    const pt = a.map((v, i) => [(pad + i * (W - 2 * pad) / (a.length - 1)).toFixed(1), (H - pad - (v - mn) * (H - 2 * pad) / rg).toFixed(1)]);
    const net = a[a.length - 1] - a[0], c = net > 0 ? '#4ade80' : net < 0 ? '#f87171' : '#94a3b8';
    const last = pt[pt.length - 1];
    return `<svg class="gt-spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><title>${a.join(' → ')}</title><polyline points="${pt.map(q => q.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${last[0]}" cy="${last[1]}" r="2.2" fill="${c}"/></svg>`;
}

// ---- 7) Filtreler ve trend rengi ----
function gtSqOnLoan(p) {
    for (let i = seasonsList.length - 1; i >= 0; i--) {
        const d = p.history && p.history[seasonsList[i]]; if (!d) continue;
        for (let j = 3; j >= 0; j--) { const t = d[GTSQ_CHRONO[j] + 'Type']; if (t && t !== 'none' && t !== 'continue') return t === 'loan_out' || t === 'loan_in'; }
    }
    return false;
}
function gtSqFilter(list) {
    const f = GTSQ.filter;
    if (!f || f === 'all') return list;
    return list.filter(p => {
        const t = gtSqTrend(p), age = parseInt(p.currentAge) || 0;
        if (f === 'up') return t !== null && t > 0;
        if (f === 'down') return t !== null && t < 0;
        if (f === 'u21flat') return age > 0 && age <= 21 && t !== null && t <= 0;
        if (f === 'o30down') return age >= 30 && t !== null && t < 0;
        if (f === 'loan') return gtSqOnLoan(p);
        return true;
    });
}
function gtSqSetFilter(v) { GTSQ.filter = v; gtSqSave(); renderSquadGrid(); }
function gtSqToggle(k) { GTSQ[k] = !GTSQ[k]; gtSqSave(); renderSquadGrid(); }
function gtSqTrendCls(p) {
    if (!GTSQ.trend) return '';
    const t = gtSqTrend(p);
    return t > 0 ? ' gt-tr-up' : t < 0 ? ' gt-tr-dn' : ' gt-tr-eq';
}
function gtSqToolbar() {
    const opt = (v, tr, en) => `<option value="${v}"${GTSQ.filter === v ? ' selected' : ''}>${gtSqL(tr, en)}</option>`;
    // Hızlı giriş açıkken yalnızca giriş çubuğu görünür (yer açmak ve dikkat dağıtmamak için)
    if (gtSqEntry) {
        return `<span class="gt-sq-tools"><span class="gt-sq-ebar"><i class="fa-solid fa-keyboard"></i><b>${escapeHtml(gtSqEntry.season)} · ${gtSqLabel(gtSqEntry.key)}</b>
            <button type="button" onclick="gtSqFillSame()" title="${gtSqL('Boş kalanları önceki OVR ile doldur', 'Fill the empty ones with the previous OVR')}">= ${gtSqL('Değişmedi', 'Unchanged')}</button>
            <button type="button" class="ok" onclick="gtSqSetEntry()"><i class="fa-solid fa-check"></i> ${gtSqL('Bitti', 'Done')}</button></span></span>`;
    }
    let h = `<span class="gt-sq-tools">
        <select class="gt-sq-sel${GTSQ.filter !== 'all' ? ' on' : ''}" onchange="gtSqSetFilter(this.value)" title="${gtSqL('Oyuncu filtresi', 'Player filter')}">
            ${opt('all', 'Tüm oyuncular', 'All players')}${opt('up', 'Yükselenler', 'Rising')}${opt('down', 'Düşenler', 'Declining')}${opt('u21flat', '21 yaş altı · durgun', 'U21 · stalled')}${opt('o30down', '30+ · düşüşte', '30+ · declining')}${opt('loan', 'Kiralıklar', 'On loan')}
        </select>
        <button type="button" class="gt-sq-tb${GTSQ.trend ? ' on' : ''}" onclick="gtSqToggle('trend')" title="${gtSqL('Satırları trende göre renklendir (yeşil: yükseliyor, kırmızı: düşüyor)', 'Colour rows by trend (green: rising, red: declining)')}"><i class="fa-solid fa-arrow-trend-up"></i></button>
        <button type="button" class="gt-sq-tb" onclick="gtTrSyncAll()" title="${gtSqL('Transfer panelindeki kayıtları kadroya işle', 'Apply transfer panel records to the squad')}"><i class="fa-solid fa-right-left"></i></button>
        <button type="button" class="gt-sq-tb" onclick="gtSqBirthOpen()" title="${gtSqL('Doğum tarihlerini toplu gir', 'Enter birth dates in bulk')}"><i class="fa-solid fa-cake-candles"></i></button>
        <button type="button" class="gt-sq-tb${GTSQ.all ? ' on' : ''}" onclick="gtSqToggle('all')" title="${gtSqL('Tüm dönem sütunlarını göster (boşlar dahil)', 'Show every period column (including empty ones)')}"><i class="fa-solid fa-table-columns"></i></button>`;
    return h + '</span>';
}

// ---- 5-6) Hızlı giriş ----
function gtSqEntryBtn(season, key) {
    const on = gtSqEntry && gtSqEntry.season === season && gtSqEntry.key === key;
    return `<button onclick="event.stopPropagation(); gtSqSetEntry('${gtSqJs(season)}', '${key}')" class="${on ? 'text-amber-300' : 'text-slate-400'} hover:text-amber-300 transition-colors" title="${gtSqL('Hızlı giriş: OVR değerlerini tabloda yaz', 'Quick entry: type OVR values in the table')}"><i class="fa-solid fa-keyboard text-[9px]"></i></button>`;
}
function gtSqSetEntry(season, key) {
    const same = gtSqEntry && gtSqEntry.season === season && gtSqEntry.key === key;
    gtSqEntry = (!season || same) ? null : { season, key, focus: true };
    renderSquadGrid();
}
function gtSqEntryCell(p, season, key, bg, archived) {
    if (!gtSqEntry || archived || gtSqEntry.season !== season || gtSqEntry.key !== key) return '';
    const d = (p.history && p.history[season]) || {};
    const cur = d[key + 'o'] || '', before = gtSqBefore(p, season, key, 'o'), prev = before ? before.v : '';
    const diff = cur && prev ? parseInt(cur) - prev : 0;
    const lock = gtSqFromAttrs(p, season, key);
    return `<td class="p-0 border-r border-b border-slate-700/50 align-middle text-center min-w-[125px] w-[125px] max-w-[125px] gt-sq-ecell ${bg}">
        <div class="gt-sq-e"><span class="gt-sq-prev" title="${gtSqL('Önceki OVR', 'Previous OVR')}">${prev}</span>
        <input class="gt-sq-in" type="text" inputmode="text" maxlength="3" autocomplete="off" placeholder="–" value="${escapeHtml(String(cur))}" data-pid="${escapeHtml(String(p.id))}" data-prev="${prev}" data-orig="${escapeHtml(String(cur))}" onfocus="this.select()" onkeydown="gtSqKey(event, this)" onblur="gtSqCommit(this)"${lock ? ` readonly title="${gtSqL('Özellikler sayfasındaki kayıttan geliyor', 'Comes from the Attributes page record')}"` : ''}>
        <span class="gt-sq-d ${diff > 0 ? 'up' : diff < 0 ? 'dn' : ''}">${diff ? (diff > 0 ? '+' : '') + diff : ''}</span>
        <button type="button" tabindex="-1" class="gt-sq-more" onclick="openPlayerCellModal('${gtSqJs(p.id)}', '${gtSqJs(season)}', '${key}')" title="${gtSqL('Transfer / not', 'Transfer / note')}"><i class="fa-solid fa-ellipsis"></i></button></div></td>`;
}
// Yazılanı OVR'a çevir: "63", "+2", "-1", "=" → sayı; boş → ''; anlaşılmazsa null
function gtSqParse(raw, prev) {
    const s = String(raw || '').trim().replace(',', '.');
    if (s === '') return '';
    const pv = parseInt(prev);
    if (s === '=') return pv || null;
    if (/^[+-]\d{1,2}$/.test(s)) return pv ? pv + parseInt(s) : null;
    if (/^\d{1,3}$/.test(s)) return parseInt(s);
    return null;
}
function gtSqCommit(inp, noSave) {
    if (!gtSqEntry || !inp || inp._busy || inp.readOnly) return false;
    const p = (squadData[squadContext] || []).find(x => String(x.id) === inp.dataset.pid); if (!p) return false;
    const v = gtSqParse(inp.value, inp.dataset.prev);
    if (v === null || (v !== '' && (v < 1 || v > 99))) { inp.classList.add('bad'); return false; }
    inp.classList.remove('bad');
    const { season, key } = gtSqEntry, next = v === '' ? '' : String(v);
    inp.value = next;
    const dEl = inp.parentElement.querySelector('.gt-sq-d'), pv = parseInt(inp.dataset.prev), diff = next && pv ? v - pv : 0;
    if (dEl) { dEl.textContent = diff ? (diff > 0 ? '+' : '') + diff : ''; dEl.className = 'gt-sq-d ' + (diff > 0 ? 'up' : diff < 0 ? 'dn' : ''); }
    if (next === inp.dataset.orig) return false;
    if (!p.history) p.history = {};
    if (!p.history[season]) p.history[season] = {};
    const d = p.history[season];
    if (next === '') delete d[key + 'o'];
    else {
        d[key + 'o'] = next;
        // Yaş boşsa kendiliğinden doldur: bilinen son yaş + aradan geçen sezon sayısı
        if (!d[key + 'a']) {
            const byBirth = gtSqAgeAt(p, season, key);
            if (byBirth) d[key + 'a'] = String(byBirth);
            else { const a = gtSqBefore(p, season, key, 'a'); if (a) d[key + 'a'] = String(a.v + (a.join ? 0 : a.back)); }
        }
    }
    inp.dataset.orig = next;
    if (!noSave) { try { saveToLocalStorage(); } catch (e) { console.warn(e); } }
    return true;
}
function gtSqKey(e, inp) {
    const move = (dir) => {
        const all = [...document.querySelectorAll('.gt-sq-in')], i = all.indexOf(inp), n = all[i + dir];
        gtSqCommit(inp);
        if (n) { n.focus(); n.scrollIntoView({ block: 'nearest' }); } else inp.blur();
    };
    if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); inp.value = inp.dataset.orig; inp.classList.remove('bad'); inp._busy = true; inp.blur(); inp._busy = false; }
}
function gtSqFillSame() {
    let n = 0;
    document.querySelectorAll('.gt-sq-in').forEach(inp => {
        if (inp.value.trim() !== '' || !inp.dataset.prev) return;
        inp.value = '='; if (gtSqCommit(inp, true)) n++;
    });
    if (n) { try { saveToLocalStorage(); } catch (e) { console.warn(e); } }
    if (typeof gtToast === 'function') gtToast(n ? gtSqL(`${n} oyuncu önceki OVR ile dolduruldu.`, `${n} players filled with their previous OVR.`) : gtSqL('Doldurulacak boş hücre yok.', 'No empty cells to fill.'), n ? 'ok' : 'info');
}

// Ülke kodunu bayrak koduna çevirir (TUR → tr, ENG → gb-eng); tanınmazsa küçük harfli hâli
function gtSqCC(code) {
    const c = String(code || '').trim(); if (!c) return '';
    if (/^[a-z]{2}(-[a-z]{2,3})?$/i.test(c)) return c.toLowerCase();
    try { const m = String(getFlagIcon(c.toUpperCase()) || '').match(/flagcdn\.com\/[^/]+\/([a-z-]+)\.png/); if (m) return m[1]; } catch (e) {}
    return c.toLowerCase();
}
// ---- Yerli / yabancı kuralı ----
//  1) Oyuncuda elle seçilmiş statü varsa (p.natStatus = 'dom' | 'for') o geçerlidir.
//  2) Yoksa oyuncunun ülkesi kulübün ülkesiyle karşılaştırılır; aynıysa yerli, farklıysa yabancı.
//     Birleşik Krallık ülkeleri (İngiltere, İskoçya, Galler, Kuzey İrlanda) tek ülke sayılır.
//  3) Ülke kodu boşsa ya da tanınmıyorsa oyuncu "belirsiz"dir ve yüzdeye katılmaz.
function gtSqNatGroup(code) {
    const c = gtSqCC(code);
    if (!/^[a-z]{2}(-[a-z]{2,3})?$/.test(c)) return '';      // tanınmayan kod
    return c === 'gb' || c.indexOf('gb-') === 0 ? 'gb' : c;
}
function gtSqNatAuto(p, home) { const g = gtSqNatGroup(p && p.countryCode); return !home || !g ? null : (g === home ? 'dom' : 'for'); }
function gtSqNatStatus(p, home) { return p && (p.natStatus === 'dom' || p.natStatus === 'for') ? p.natStatus : gtSqNatAuto(p, home); }

// ---- 4) Kadro özeti çubuğu (tablonun altında) + hızlı girişte ilk boş hücreye odak ----
function gtSqAfterRender() {
    const table = document.querySelector('#content-area table[data-sq]');
    if (!table || !gtSqCtx) return;
    const wrap = table.closest('.table-scroll'), host = wrap && wrap.parentElement;
    if (host && !host.querySelector('.gt-sq-sumbar')) {
        const act = gtSqFilter((gtSqCtx.players || []).filter(p => !p.isArchived && !p.isPromoted));
        if (act.length) {
            const avg = (vals) => { const a = vals.map(x => parseInt(x)).filter(Boolean); return a.length ? (a.reduce((x, y) => x + y, 0) / a.length) : null; };
            const fmt = (n) => n === null ? '–' : n.toFixed(1);
            // Veri girilmiş dönemler (eski → yeni) ve kadro ortalamaları
            const per = [];
            seasonsList.forEach(s => GTSQ_CHRONO.forEach(k => { const a = avg(act.map(p => ((p.history && p.history[s]) || {})[k + 'o'])); if (a !== null) per.push({ s, k, a }); }));
            const chips = per.map((x, i) => {
                const d = i ? x.a - per[i - 1].a : 0, r = Math.round(d * 10) / 10;
                return `<span class="gt-sb-p${i === per.length - 1 ? ' cur' : ''}"><em>${escapeHtml(x.s)} · ${gtSqLabel(x.k)}</em><b>${fmt(x.a)}</b>${i && r ? `<i class="${r > 0 ? 'up' : 'dn'}">${r > 0 ? '▲' : '▼'}${Math.abs(r).toFixed(1)}</i>` : ''}</span>`;
            }).slice(-6).reverse().join('');
            const ovr = avg(act.map(p => p.currentOvr)), age = avg(act.map(p => p.currentAge));
            // Yerli / yabancı: oyuncunun ülke kodu kulübün ülkesiyle karşılaştırılır (milli takımda gösterilmez)
            let natHtml = '';
            const home = squadContext === 'milli' ? '' : gtSqNatGroup(managedTeams && managedTeams.kulup && managedTeams.kulup.country);
            if (home) {
                const st = act.map(p => gtSqNatStatus(p, home)), dom = st.filter(x => x === 'dom').length, forn = st.filter(x => x === 'for').length, unk = st.length - dom - forn;
                if (dom + forn) {
                    const pd = Math.round(dom * 100 / (dom + forn)), pf = 100 - pd;
                    natHtml = `<span class="gt-sb-k gt-sb-nat" role="button" tabindex="0" onclick="gtSqNatOpen()" onkeydown="if(event.key==='Enter')gtSqNatOpen()" title="${gtSqL(`Yerli ${dom} · Yabancı ${forn}` + (unk ? ` · Belirsiz ${unk}` : '') + ' · Ayrıntı ve düzeltme için tıkla', `Domestic ${dom} · Foreign ${forn}` + (unk ? ` · Unknown ${unk}` : '') + ' · Click for details and corrections')}"><em>${gtSqL('Yerli', 'Domestic')}</em><b>%${pd}</b><span class="gt-sb-bar"><i class="a" style="width:${pd}%"></i><i class="b" style="width:${pf}%"></i></span><b>%${pf}</b><em>${gtSqL('Yabancı', 'Foreign')}</em>${unk ? `<em class="q">+${unk} ?</em>` : ''}</span>`;
                } else {
                    natHtml = `<span class="gt-sb-k gt-sb-nat" role="button" tabindex="0" onclick="gtSqNatOpen()" onkeydown="if(event.key==='Enter')gtSqNatOpen()"><em>${gtSqL('Yerli / yabancı: ülke kodu girilmemiş', 'Domestic / foreign: no country codes yet')}</em></span>`;
                }
            }
            // Yaş grupları
            const G = [['≤21', a => a <= 21, '#4ade80'], ['22–25', a => a >= 22 && a <= 25, '#a3e635'], ['26–29', a => a >= 26 && a <= 29, '#facc15'], ['30+', a => a >= 30, '#fb923c']];
            const ages = act.map(p => parseInt(p.currentAge)).filter(Boolean);
            const ageHtml = ages.length ? `<span class="gt-sb-k gt-sb-age"><em>${gtSqL('Yaş', 'Age')}</em>${G.map(g => { const n = ages.filter(g[1]).length; return `<span class="gt-sb-g" title="${g[0]}: ${n} ${gtSqL('oyuncu', 'players')} (%${Math.round(n * 100 / ages.length)})"><u style="background:${g[2]}"></u><em>${g[0]}</em><b>${n}</b></span>`; }).join('')}<span class="gt-sb-bar w">${G.map(g => `<i style="width:${ages.filter(g[1]).length * 100 / ages.length}%;background:${g[2]}"></i>`).join('')}</span></span>` : '';
            const bar = document.createElement('div');
            bar.className = 'gt-sq-sumbar';
            bar.innerHTML = `<span class="gt-sb-k"><i class="fa-solid fa-users"></i><b>${act.length}</b><em>${gtSqL('oyuncu', 'players')}</em></span>
                <span class="gt-sb-k"><em>${gtSqL('Yaş ort.', 'Avg age')}</em><b>${fmt(age)}</b></span>
                <span class="gt-sb-k ovr"><em>${gtSqL('OVR ort.', 'Avg OVR')}</em>${ovr === null ? '<b>–</b>' : `<b style="color:${typeof mbOvrColor === 'function' ? mbOvrColor(Math.round(ovr)) : '#fff'}">${fmt(ovr)}</b>`}</span>
                ${natHtml}${ageHtml}
                ${chips ? `<span class="gt-sb-sep"></span><span class="gt-sb-t">${gtSqL('Dönem ortalamaları', 'Period averages')}</span>${chips}` : ''}`;
            host.appendChild(bar);
            try { if (typeof sqFitScale === 'function') sqFitScale(); } catch (e) {}
        }
    }
    if (gtSqEntry && gtSqEntry.focus) {
        gtSqEntry.focus = false;
        const all = [...table.querySelectorAll('.gt-sq-in')], f = all.find(i => !i.value) || all[0];
        if (f) { f.focus(); f.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    }
}

// =====================================================================
// DOĞUM TARİHLERİ (p.birthDate = 'YYYY-AA-GG') ve yaş hesabı
// =====================================================================
// Yaşın hesaplandığı tarih (25/26 sezonu için): YAZ TR. 01.07.2025 · ARA-EYL 01.10.2025 · KIŞ TR. 01.02.2026 · HAZ-ŞUB 01.05.2026
const GTSQ_REF = { t1: [0, 7, 1], s1: [0, 10, 1], t2: [1, 2, 1], s2: [1, 5, 1] };
function gtSqSeasonYear(season) { const m = String(season || '').match(/\d+/); if (!m) return null; const n = parseInt(m[0]); return n < 100 ? 2000 + n : n; }
function gtSqParseDate(raw) {
    const s = String(raw || '').trim(); if (!s) return '';
    let y, m, d, x;
    if ((x = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) { y = +x[1]; m = +x[2]; d = +x[3]; }
    else if ((x = s.match(/^(\d{1,2})[./\-\s](\d{1,2})[./\-\s](\d{2}|\d{4})$/))) { d = +x[1]; m = +x[2]; y = +x[3]; if (y < 100) y += y > 40 ? 1900 : 2000; }
    else return null;
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (y < 1950 || y > 2100 || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
    return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}
function gtSqFmtDate(iso) { const x = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/); return x ? x[3] + '.' + x[2] + '.' + x[1] : ''; }
// Oyuncunun verilen sezon/dönemdeki yaşı (doğum tarihi yoksa null)
function gtSqAgeAt(p, season, key, birth) {
    const iso = birth !== undefined ? birth : (p && p.birthDate), x = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/), sy = gtSqSeasonYear(season), ref = GTSQ_REF[key];
    if (!x || !sy || !ref) return null;
    const ry = sy + ref[0], age = ry - (+x[1]) - ((ref[1] < +x[2] || (ref[1] === +x[2] && ref[2] < +x[3])) ? 1 : 0);
    return age > 0 && age < 70 ? age : null;
}
// Güncel yaş: veri girilmiş son dönemin tarihine göre
function gtSqCurrentAge(p, birth) {
    for (let i = seasonsList.length - 1; i >= 0; i--) {
        const s = seasonsList[i], any = (squadData[squadContext] || []).some(q => q.history && q.history[s] && GTSQ_K.some(k => q.history[s][k + 'o']));
        if (!any) continue;
        const k = GTSQ_K.find(key => (squadData[squadContext] || []).some(q => q.history && q.history[s] && q.history[s][key + 'o']));
        return gtSqAgeAt(p, s, k, birth);
    }
    return gtSqAgeAt(p, seasonsList[seasonsList.length - 1], 't1', birth);
}
// Özellikler sayfası: OVR'ın solundaki yaş (seçili kaydın yaşı; yoksa doğum tarihinden, o da yoksa güncel yaş)
function gtSqAttrAge(p, pr) {
    let age = null;
    try {
        const snap = pr && pr.to;
        if (snap) age = parseInt(snap.age) || gtSqAgeAt(p, snap.season, GTSQ_PHASE_CELL[snap.phase]) || null;
        if (!age) { const b = gtSqBefore(p, seasonsList[seasonsList.length - 1], 's2', 'a'); age = (b && b.v) || parseInt(p.joinAge) || null; }
    } catch (e) {}
    if (!age) return '<span class="gt-aa none">–</span>';
    const c = age <= 18 ? '#93c5fd' : age <= 21 ? '#4ade80' : age <= 24 ? '#86efac' : age <= 26 ? '#d9f99d' : age <= 29 ? '#fde047' : age <= 32 ? '#fdba74' : age <= 35 ? '#fca5a5' : '#d8b4fe';
    return `<span class="mb-age gt-aa" style="--c:${c}" title="${gtSqL('Yaş', 'Age')}">${age}</span>`;
}

// ---- Toplu doğum tarihi penceresi ----
function gtSqNorm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
function gtSqBirthOpen() {
    gtSqBirthClose();
    const list = (squadData[squadContext] || []).filter(p => p && p.name).sort((a, b) => (a.isArchived ? 1 : 0) - (b.isArchived ? 1 : 0));
    if (!list.length) { alert(gtSqL('Bu kadroda oyuncu bulunmuyor.', 'There are no players in this squad.')); return; }
    const ctxName = { astakim: gtSqL('As Takım', 'First Team'), akademi: gtSqL('Akademi', 'Academy'), milli: gtSqL('Milli', 'National') }[squadContext] || '';
    const ov = document.createElement('div'); ov.id = 'gt-bd-ov'; ov.className = 'cpw-modal open';
    ov.innerHTML = `<div class="cpw-box gt-bd-box" role="dialog" aria-modal="true">
        <button type="button" class="cpw-x" onclick="gtSqBirthClose()" aria-label="${gtSqL('Kapat', 'Close')}"><i class="fa-solid fa-xmark"></i></button>
        <h3><i class="fa-solid fa-cake-candles"></i> ${gtSqL('Doğum tarihleri', 'Birth dates')} · ${ctxName}</h3>
        <p>${gtSqL('Tarihi GG.AA.YYYY biçiminde yaz; Enter alt satıra geçer. Doğum tarihi girilen oyuncunun tüm yaşları bu tarihten hesaplanır ve mevcut yaşların üzerine yazılır.', 'Type dates as DD.MM.YYYY; Enter moves to the next row. All ages of a player with a birth date are calculated from it and overwrite the existing ones.')}</p>
        <details class="gt-bd-paste"><summary>${gtSqL('Listeden yapıştır', 'Paste from a list')}</summary>
            <textarea id="gt-bd-text" rows="5" placeholder="${gtSqL('Her satıra bir oyuncu:', 'One player per line:')}&#10;Victor Osimhen, 29.12.1998&#10;Leroy Sané, 11.01.1996"></textarea>
            <button type="button" onclick="gtSqBirthPaste()">${gtSqL('Listeye işle', 'Apply to list')}</button><span id="gt-bd-pmsg"></span>
        </details>
        <div class="gt-bd-list">${list.map(p => `<label class="gt-bd-row${p.isArchived ? ' arch' : ''}"><i class="pos-${escapeHtml(String(p.pos || ''))}">${escapeHtml(String(p.pos || ''))}</i><span>${escapeHtml(p.name)}</span>
            <input type="text" class="gt-bd-in" inputmode="numeric" autocomplete="off" maxlength="10" placeholder="${gtSqL('GG.AA.YYYY', 'DD.MM.YYYY')}" data-pid="${escapeHtml(String(p.id))}" value="${gtSqFmtDate(p.birthDate)}" oninput="gtSqBirthPreview(this)" onkeydown="gtSqBirthKey(event, this)"><em></em></label>`).join('')}</div>
        <div class="gt-bd-foot"><span id="gt-bd-msg"></span><button type="button" class="gt-bd-cancel" onclick="gtSqBirthClose()">${gtSqL('İptal', 'Cancel')}</button><button type="button" class="gt-bd-save" onclick="gtSqBirthSave()">${gtSqL('Kaydet', 'Save')}</button></div></div>`;
    document.body.appendChild(ov);
    ov.addEventListener('mousedown', e => { if (e.target === ov) gtSqBirthClose(); });
    ov.querySelectorAll('.gt-bd-in').forEach(gtSqBirthPreview);
    const first = [...ov.querySelectorAll('.gt-bd-in')].find(i => !i.value) || ov.querySelector('.gt-bd-in');
    if (first && window.matchMedia('(pointer: fine)').matches) first.focus();
}
function gtSqBirthClose() { const ov = document.getElementById('gt-bd-ov'); if (ov) ov.remove(); }
function gtSqBirthPreview(inp) {
    const iso = gtSqParseDate(inp.value), em = inp.parentElement.querySelector('em');
    inp.classList.toggle('bad', iso === null);
    const p = (squadData[squadContext] || []).find(x => String(x.id) === inp.dataset.pid);
    const age = iso && p ? gtSqCurrentAge(p, iso) : null;
    if (em) em.textContent = age ? age + ' ' + gtSqL('yaş', 'yrs') : '';
}
function gtSqBirthKey(e, inp) {
    if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const all = [...document.querySelectorAll('#gt-bd-ov .gt-bd-in')], n = all[all.indexOf(inp) + (e.key === 'ArrowUp' ? -1 : 1)];
        if (n) { n.focus(); n.select(); }
    } else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); gtSqBirthClose(); }
}
function gtSqBirthPaste() {
    const ta = document.getElementById('gt-bd-text'), msg = document.getElementById('gt-bd-pmsg'); if (!ta) return;
    const inputs = [...document.querySelectorAll('#gt-bd-ov .gt-bd-in')];
    const players = inputs.map(inp => { const p = (squadData[squadContext] || []).find(x => String(x.id) === inp.dataset.pid); const n = gtSqNorm(p && p.name); return { inp, n, last: n.split(' ').pop() }; });
    let ok = 0; const miss = [];
    ta.value.split(/\n/).map(l => l.trim()).filter(Boolean).forEach(line => {
        const m = line.match(/^(.*?)[\s,;:\t\-–]+(\d{1,4}[./\-]\d{1,2}[./\-]\d{2,4})\s*$/);
        const iso = m && gtSqParseDate(m[2]), name = m ? gtSqNorm(m[1]) : '';
        if (!iso || !name) { miss.push(line); return; }
        let hit = players.filter(x => x.n === name);
        if (hit.length !== 1) hit = players.filter(x => x.last === name.split(' ').pop() && (x.n.includes(name) || name.includes(x.n) || x.n[0] === name[0]));
        if (hit.length !== 1) { miss.push(line); return; }
        hit[0].inp.value = gtSqFmtDate(iso); gtSqBirthPreview(hit[0].inp); ok++;
    });
    if (msg) msg.textContent = gtSqL(`${ok} oyuncu eşleşti`, `${ok} matched`) + (miss.length ? gtSqL(` · ${miss.length} satır eşleşmedi: `, ` · ${miss.length} lines not matched: `) + miss.slice(0, 3).join(' | ') + (miss.length > 3 ? ' …' : '') : '');
}
function gtSqBirthSave() {
    const inputs = [...document.querySelectorAll('#gt-bd-ov .gt-bd-in')], msg = document.getElementById('gt-bd-msg');
    const bad = inputs.filter(i => gtSqParseDate(i.value) === null);
    if (bad.length) { if (msg) msg.textContent = gtSqL(`${bad.length} tarih anlaşılamadı (kırmızı alanlar).`, `${bad.length} dates could not be read (red fields).`); bad[0].focus(); return; }
    let n = 0;
    inputs.forEach(inp => {
        const p = (squadData[squadContext] || []).find(x => String(x.id) === inp.dataset.pid); if (!p) return;
        const iso = gtSqParseDate(inp.value);
        if ((p.birthDate || '') === iso) return;
        if (iso) p.birthDate = iso; else delete p.birthDate;
        n++;
    });
    if (n) { try { gtSqSyncAges(); saveToLocalStorage(); } catch (e) { console.warn(e); } }
    gtSqBirthClose();
    if (typeof gtToast === 'function') gtToast(n ? gtSqL(`${n} oyuncunun doğum tarihi kaydedildi.`, `Birth dates saved for ${n} players.`) : gtSqL('Değişiklik yok.', 'No changes.'), n ? 'ok' : 'info');
    if (n) renderSquadGrid();
}

// =====================================================================
// TRANSFER → KADRO: transfer panelinden girilen her kayıt kadro tablosuna işlenir
//  · Gelen: oyuncu kadroda yoksa eklenir; ilgili sezonun transfer dönemi hücresine
//    "geldi / kiralık geldi" rozeti, takım adı ve logosu yazılır
//  · Giden: oyuncu kadroda hiç yoksa arşive eklenir; hücresine "gitti / kiralık gitti" yazılır
//  · Transfer penceresine eklenen alanlar: Dönem (Yaz / Kış), Ülke kodu, Doğum tarihi, Kadro (As Takım / Akademi)
// =====================================================================
function gtTrFind(name) {
    const low = String(name || '').trim().toLowerCase(); if (!low) return null;
    for (const ctx of ['astakim', 'akademi']) { const p = (squadData[ctx] || []).find(x => x && x.name && x.name.trim().toLowerCase() === low); if (p) return { p, ctx }; }
    return null;
}
function gtTrLogo(team) {
    try { const u = getTeamLogoByName(team); return u && u.indexOf('ui-avatars.com') === -1 ? u : ''; } catch (e) { return ''; }
}
// Tek bir transfer kaydını kadroya işler. Dönüş: { created, cell }
function gtTrApply(tr, type, opts) {
    opts = opts || {};
    const name = String(tr.name || '').trim(); if (!name || !tr.season) return {};
    const win = tr.win === 't2' ? 't2' : 't1', out = { created: false, cell: false };
    let hit = gtTrFind(name);
    if (!hit && opts.create) {
        const ctx = type === 'in' && tr.ctx === 'akademi' ? 'akademi' : 'astakim';
        if (!squadData[ctx]) squadData[ctx] = [];
        const p = { id: 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), pos: tr.pos || 'CM', role: '', name, photoUrl: tr.photoUrl || '', countryCode: tr.cc || '', joinAge: tr.age || '', joinOvr: tr.ovr || '', history: {} };
        if (type === 'in') p.joined = { season: tr.season, team: tr.team || '', kind: tr.kind || 'sale' };
        else { p.isArchived = true; p.leftClub = { season: tr.season, team: tr.team || '', kind: tr.kind || 'sale' }; }
        squadData[ctx].push(p); hit = { p, ctx }; out.created = true;
    }
    if (!hit) return out;
    const p = hit.p;
    if (tr.cc && !p.countryCode) p.countryCode = tr.cc;
    if (tr.birth && !p.birthDate) p.birthDate = tr.birth;
    if (seasonsList.indexOf(tr.season) === -1) return out;
    if (!p.history) p.history = {};
    if (!p.history[tr.season]) p.history[tr.season] = {};
    const d = p.history[tr.season];
    const cellType = type === 'in' ? (tr.kind === 'loan' ? 'loan_in' : 'in') : (tr.kind === 'loan' ? 'loan_out' : 'out');
    const text = String(tr.team || '').toLocaleUpperCase('tr'), logo = gtTrLogo(tr.team);
    if (d[win + 'Type'] !== cellType || (d[win] || '') !== text || (d[win + 'Logo'] || '') !== logo) out.cell = true;
    d[win + 'Type'] = cellType; d[win] = text;
    if (logo) d[win + 'Logo'] = logo; else delete d[win + 'Logo'];
    if (tr.ovr && !d[win + 'o']) d[win + 'o'] = String(tr.ovr);
    if (!d[win + 'a']) { const a = tr.age || gtSqAgeAt(p, tr.season, win); if (a) d[win + 'a'] = String(a); }
    return out;
}
// Bir kaydın kadro hücresindeki izini siler (dönem ya da sezon değiştiğinde)
function gtTrClearCell(name, season, win, type, ovr, age) {
    const hit = gtTrFind(name), d = hit && hit.p.history && hit.p.history[season]; if (!d) return;
    const t = d[win + 'Type'];
    if ((type === 'in' && (t === 'in' || t === 'loan_in')) || (type === 'out' && (t === 'out' || t === 'loan_out'))) {
        delete d[win + 'Type']; delete d[win]; delete d[win + 'Logo'];
        // Hücreye transferle birlikte yazılmış OVR / yaş da (değiştirilmemişse) kalkar
        if (ovr && String(d[win + 'o'] || '') === String(ovr)) delete d[win + 'o'];
        if (age && String(d[win + 'a'] || '') === String(age)) delete d[win + 'a'];
    }
}
// Transfer penceresindeki ek alanlar
function gtTrExtraRead() {
    const g = id => document.getElementById(id);
    if (!g('gt-trx-win')) return null;
    const birth = gtSqParseDate(g('gt-trx-birth').value);
    return { win: g('gt-trx-win').value === 't2' ? 't2' : 't1', cc: g('gt-trx-cc').value.trim().toUpperCase(), birth: birth || '', badBirth: birth === null, ctx: g('gt-trx-ctx') ? g('gt-trx-ctx').value : 'astakim' };
}
function gtTrExtraSetup(type, id) {
    const box = document.querySelector('#transfer-editor-modal > div'), list = box && box.querySelector('.space-y-4'); if (!list) return;
    let x = document.getElementById('gt-trx-extra');
    if (!x) { x = document.createElement('div'); x.id = 'gt-trx-extra'; }
    const chk = document.getElementById('trx-chk-row');
    if (chk) list.insertBefore(x, chk); else list.appendChild(x);
    const t = id ? (transferData[type] || []).find(r => r.id === id) : null, hit = t ? gtTrFind(t.name) : null;
    const v = { win: (t && t.win) || 't1', cc: (t && t.cc) || (hit && hit.p.countryCode) || '', birth: (t && t.birth) || (hit && hit.p.birthDate) || '', ctx: (t && t.ctx) || (hit && hit.ctx) || 'astakim' };
    const lab = 'block text-left text-xs font-bold text-slate-400 mb-1', inp = 'w-full bg-slate-900 border border-slate-600 rounded p-2 text-white outline-none focus:border-emerald-500';
    x.className = 'gt-trx-extra' + (type === 'in' ? ' in' : '');
    x.innerHTML = `
        <div><label class="${lab}">${gtSqL('Dönem', 'Window')}</label><select id="gt-trx-win" class="${inp}"><option value="t1"${v.win === 't1' ? ' selected' : ''}>${gtSqL('Yaz transfer dönemi', 'Summer window')}</option><option value="t2"${v.win === 't2' ? ' selected' : ''}>${gtSqL('Kış transfer dönemi', 'Winter window')}</option></select></div>
        ${type === 'in' ? `<div><label class="${lab}">${gtSqL('Kadro', 'Squad')}</label><select id="gt-trx-ctx" class="${inp}"><option value="astakim"${v.ctx !== 'akademi' ? ' selected' : ''}>${gtSqL('As Takım', 'First Team')}</option><option value="akademi"${v.ctx === 'akademi' ? ' selected' : ''}>${gtSqL('Akademi', 'Academy')}</option></select></div>` : ''}
        <div><label class="${lab}" title="${gtSqL('İki harfli ülke kodu: TR, BR, AR, FR…', 'Two-letter country code: TR, BR, AR, FR…')}">${gtSqL('Ülke kodu', 'Country')}</label><input id="gt-trx-cc" type="text" maxlength="6" placeholder="TR" value="${escapeHtml(v.cc)}" class="${inp} uppercase text-center" autocomplete="off"></div>
        <div><label class="${lab}">${gtSqL('Doğum tarihi', 'Birth date')}</label><input id="gt-trx-birth" type="text" inputmode="numeric" maxlength="10" placeholder="${gtSqL('GG.AA.YYYY', 'DD.MM.YYYY')}" value="${gtSqFmtDate(v.birth)}" class="${inp} text-center" autocomplete="off"></div>`;

    // Mevcut onay kutusu metinleri: yeni davranışı anlat
    const sub = document.querySelector('#trx-chk-row em'), ttl = document.querySelector('#trx-chk-row b');
    if (ttl && type === 'in') ttl.textContent = gtSqL('Kadroya ekle', 'Add to squad');
    if (sub && type === 'in') sub.textContent = gtSqL('Kadroda yoksa eklenir; transfer rozeti kadro tablosuna işlenir', 'Added if missing; the transfer badge is written to the squad table');
}
(function gtTrWrap() {
    if (window.__gtTrWrapped || typeof trxSetup !== 'function' || typeof trxApplySquad !== 'function' || typeof saveTransfer !== 'function') return;
    window.__gtTrWrapped = true;
    const oSetup = window.trxSetup, oApply = window.trxApplySquad, oSave = window.saveTransfer, oChoose = window.trxChoose;
    let pending = null; // kaydetme sırasında ek alanlar
    window.trxSetup = function (type, id) { const r = oSetup.apply(this, arguments); try { gtTrExtraSetup(type, id); } catch (e) { console.warn(e); } return r; };
    // Kadrodan oyuncu seçilince ülke kodu ve doğum tarihi de dolsun
    if (typeof oChoose === 'function') window.trxChoose = function (ctx, id) {
        const r = oChoose.apply(this, arguments);
        try {
            const p = (squadData[ctx] || []).find(x => x.id === id), cc = document.getElementById('gt-trx-cc'), bd = document.getElementById('gt-trx-birth');
            if (p && cc) cc.value = p.countryCode || '';
            if (p && bd) bd.value = gtSqFmtDate(p.birthDate);
        } catch (e) {}
        return r;
    };
    window.trxApplySquad = function (name, pos, age, ovr, team, season) {
        const type = activeTransferType, ex = pending || {};
        const tr = { name, pos, age, ovr, team, season, kind: trxKind, win: ex.win, cc: ex.cc, birth: ex.birth, ctx: ex.ctx };
        try {
            const addCb = document.getElementById('trx-add');
            // Gelen: kutu işaretliyse seçilen kadroya (As Takım / Akademi) ekle · Giden: kadroda hiç yoksa arşive ekle
            if (type === 'in' ? (addCb && addCb.checked) : true) {
                const hit = gtTrFind(name);
                if (!hit) gtTrApply(tr, type, { create: true });
                else if (type === 'in' && hit.p.isArchived) hit.p.isArchived = false;
            }
        } catch (e) { console.warn(e); }
        const r = oApply.apply(this, arguments);
        try { gtTrApply(tr, type, {}); } catch (e) { console.warn(e); }
        return r;
    };
    window.saveTransfer = function () {
        const type = activeTransferType, id = activeTransferId, list = transferData[type] || [];
        const ex = gtTrExtraRead();
        if (ex && ex.badBirth) { alert(gtSqL('Doğum tarihi anlaşılamadı. GG.AA.YYYY biçiminde yaz ya da boş bırak.', 'The birth date could not be read. Use DD.MM.YYYY or leave it empty.')); return; }
        const old = id ? list.find(x => x.id === id) : null, before = old ? { name: old.name, season: old.season, win: old.win === 't2' ? 't2' : 't1', ovr: old.ovr, age: old.age } : null, n0 = list.length;
        pending = ex;
        let r; try { r = oSave.apply(this, arguments); } finally { pending = null; }
        const modal = document.getElementById('transfer-editor-modal');
        if (!ex || !modal || !modal.classList.contains('hidden')) return r; // kaydedilmedi (ör. isim boş)
        const rec = id ? (transferData[type] || []).find(x => x.id === id) : ((transferData[type] || []).length > n0 ? transferData[type][transferData[type].length - 1] : null);
        if (rec) {
            rec.win = ex.win; rec.cc = ex.cc; rec.birth = ex.birth; if (type === 'in') rec.ctx = ex.ctx;
            if (before && (before.name !== rec.name || before.season !== rec.season || before.win !== rec.win)) { gtTrClearCell(before.name, before.season, before.win, type, before.ovr, before.age); gtTrApply(rec, type, {}); }
            try { saveToLocalStorage(); } catch (e) { console.warn(e); }
        }
        return r;
    };
})();
// Transfer panelindeki tüm kayıtları kadroya işle (eski kayıtlar için)
function gtTrSyncAll() {
    const all = [['in', transferData.in || []], ['out', transferData.out || []]], total = all[0][1].length + all[1][1].length;
    if (!total) { alert(gtSqL('Transfer panelinde kayıt bulunmuyor.', 'There are no records in the transfer panel.')); return; }
    if (!confirm(gtSqL(`Transfer panelindeki ${total} kayıt kadroya işlensin mi?\n\nKadroda olmayan gelen oyuncular eklenir, gidenler arşive eklenir ve transfer rozetleri kadro tablosuna yazılır.`, `Apply the ${total} records in the transfer panel to the squad?\n\nMissing incoming players are added, departed players are added to the archive, and transfer badges are written to the squad table.`))) return;
    let created = 0, cells = 0;
    all.forEach(([type, list]) => list.slice().sort((a, b) => seasonsList.indexOf(a.season) - seasonsList.indexOf(b.season)).forEach(tr => { const r = gtTrApply(tr, type, { create: true }); if (r.created) created++; if (r.cell) cells++; }));
    if (created || cells) { try { saveToLocalStorage(); } catch (e) { console.warn(e); } }
    if (typeof gtToast === 'function') gtToast(gtSqL(`${cells} transfer rozeti işlendi, ${created} oyuncu kadroya eklendi.`, `${cells} transfer badges written, ${created} players added to the squad.`), 'ok');
    renderSquadGrid();
}

// ---- Yerli / yabancı ayrıntı penceresi: her oyuncunun nasıl sayıldığını gösterir, elle düzeltmeye izin verir ----
function gtSqNatOpen() {
    gtSqNatClose();
    const home = gtSqNatGroup(managedTeams && managedTeams.kulup && managedTeams.kulup.country);
    const list = (squadData[squadContext] || []).filter(p => p && p.name && !p.isArchived && !p.isPromoted);
    if (!list.length) return;
    const rawHome = String((managedTeams && managedTeams.kulup && managedTeams.kulup.country) || '').toUpperCase();
    const lbl = { dom: gtSqL('Yerli', 'Domestic'), for: gtSqL('Yabancı', 'Foreign'), unk: gtSqL('Belirsiz', 'Unknown') };
    const ov = document.createElement('div'); ov.id = 'gt-nat-ov'; ov.className = 'cpw-modal open';
    ov.innerHTML = `<div class="cpw-box gt-bd-box gt-nat-box" role="dialog" aria-modal="true">
        <button type="button" class="cpw-x" onclick="gtSqNatClose()" aria-label="${gtSqL('Kapat', 'Close')}"><i class="fa-solid fa-xmark"></i></button>
        <h3><i class="fa-solid fa-earth-europe"></i> ${gtSqL('Yerli / yabancı', 'Domestic / foreign')}</h3>
        <p>${home
            ? gtSqL(`Kulüp ülkesi: <b>${escapeHtml(rawHome)}</b>${home === 'gb' ? ' (Birleşik Krallık)' : ''}. Ülkesi kulüple aynı olan oyuncu yerli sayılır; İngiltere, İskoçya, Galler ve Kuzey İrlanda tek ülke kabul edilir. "Otomatik" bu kuralı uygular; ligin kuralı farklıysa oyuncuyu elle Yerli ya da Yabancı yap.`, `Club country: <b>${escapeHtml(rawHome)}</b>${home === 'gb' ? ' (United Kingdom)' : ''}. A player from the club's country counts as domestic; England, Scotland, Wales and Northern Ireland count as one country. "Auto" applies this rule; set a player to Domestic or Foreign by hand if your league's rule differs.`)
            : gtSqL('Kulübün ülke kodu girilmemiş ya da tanınmıyor; takım ayarlarından düzelt. O zamana kadar yalnızca elle seçtiklerin sayılır.', 'The club country code is missing or not recognised; fix it in team settings. Until then only manual choices count.')}</p>
        <div class="gt-bd-list">${list.map(p => {
            const auto = gtSqNatAuto(p, home), cur = p.natStatus === 'dom' || p.natStatus === 'for' ? p.natStatus : 'auto', cc = gtSqCC(p.countryCode), okcc = !!gtSqNatGroup(p.countryCode);
            const flag = okcc ? `<img src="https://flagcdn.com/24x18/${escapeHtml(cc)}.png" alt="" onerror="this.style.visibility='hidden'">` : '';
            const b = (v, t) => `<button type="button" data-v="${v}" class="${cur === v ? 'on' : ''}" onclick="gtSqNatPick(this)">${t}</button>`;
            return `<div class="gt-bd-row gt-nat-row" data-pid="${escapeHtml(String(p.id))}"><i class="pos-${escapeHtml(String(p.pos || ''))}">${escapeHtml(String(p.pos || ''))}</i><span>${escapeHtml(p.name)}</span>
                <span class="gt-nat-cc${okcc ? '' : ' bad'}" title="${okcc ? '' : gtSqL('Ülke kodu boş ya da tanınmıyor', 'Country code missing or not recognised')}">${flag}${escapeHtml(String(p.countryCode || '–').toUpperCase())}</span>
                <span class="gt-nat-seg">${b('auto', gtSqL('Otomatik', 'Auto') + ' · ' + lbl[auto || 'unk'])}${b('dom', lbl.dom)}${b('for', lbl.for)}</span></div>`;
        }).join('')}</div>
        <div class="gt-bd-foot"><span id="gt-nat-msg"></span><button type="button" class="gt-bd-cancel" onclick="gtSqNatClose()">${gtSqL('İptal', 'Cancel')}</button><button type="button" class="gt-bd-save" onclick="gtSqNatSave()">${gtSqL('Kaydet', 'Save')}</button></div></div>`;
    document.body.appendChild(ov);
    ov.addEventListener('mousedown', e => { if (e.target === ov) gtSqNatClose(); });
    ov.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); gtSqNatClose(); } });
}
function gtSqNatClose() { const ov = document.getElementById('gt-nat-ov'); if (ov) ov.remove(); }
function gtSqNatPick(btn) { btn.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn)); }
function gtSqNatSave() {
    let n = 0;
    document.querySelectorAll('#gt-nat-ov .gt-nat-row').forEach(row => {
        const p = (squadData[squadContext] || []).find(x => String(x.id) === row.dataset.pid), on = row.querySelector('.gt-nat-seg button.on'); if (!p || !on) return;
        const v = on.dataset.v === 'auto' ? '' : on.dataset.v;
        if ((p.natStatus || '') === v) return;
        if (v) p.natStatus = v; else delete p.natStatus;
        n++;
    });
    if (n) { try { saveToLocalStorage(); } catch (e) { console.warn(e); } }
    gtSqNatClose();
    if (n) renderSquadGrid();
}

// =====================================================================
// Defter düğmesi: masaüstünde sağ alt köşe yerine sol şeridin en altında durur
// =====================================================================
(function gtNbDock() {
    function dock() {
        const b = document.getElementById('nb-fab'), nav = document.getElementById('main-nav');
        if (!b || !nav || b.parentElement === nav) return;
        nav.appendChild(b);
        if (!b.title) b.title = gtSqL('Defter', 'Notebook');
        b.setAttribute('aria-label', gtSqL('Defter', 'Notebook'));
        document.body.classList.add('gt-nb-docked');
    }
    // Düğme script.js tarafından sonradan oluşturulabilir; görününce şeride taşı
    const run = () => { dock(); new MutationObserver(dock).observe(document.body, { childList: true }); };
    if (document.readyState === 'complete') setTimeout(run, 0); else window.addEventListener('load', () => setTimeout(run, 0));
})();
