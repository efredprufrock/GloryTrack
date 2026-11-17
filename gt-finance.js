/* GloryTrack · Sözleşme & Finans (gt-finance.js)
   Oyuncu başına dönem bazlı (sezon + dönem) finans/sözleşme kaydı: squad role, maaş, piyasa değeri (+değişim %),
   kalan sözleşme süresi, klozül, sell-on, imza bonusu, ek ücretler, pazarlık durumu.
   Veri oyuncunun içinde saklanır: p.fin['25/26|t1'] = { role, wage, value, valueChg, contractLeft, clause, sellOn, bonus, fees, status }
   Kadro sayfası araç çubuğundaki "sözleşme" düğmesinden açılır (gt-squad.js). */
const GTF = { snap: 'latest', sort: 'value', dir: -1, arch: false, only: false, q: '', addNew: true, f: {} };
const gtfL = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
const gtfE = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
const gtfFold = s => String(s || '').toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const GTF_CHRONO = ['t1', 's1', 't2', 's2'];
const GTF_REF = { t1: [0, 7], s1: [0, 10], t2: [1, 2], s2: [1, 5] };   // gt-squad.js'teki dönem tarihleriyle aynı
const GTF_FIELDS = ['role', 'wage', 'value', 'valueChg', 'contractLeft', 'clause', 'sellOn', 'bonus', 'fees', 'status'];
const GTF_ROLES = ['Star Player', 'Crucial', 'Important', 'Rotation', 'Sporadic', 'Hot Prospect', 'Prospect', 'Backup'];
const GTF_ROLE_CLS = r => { const f = gtfFold(r); return /star|crucial/.test(f) ? 'a' : /important|key/.test(f) ? 'b' : /rotation/.test(f) ? 'c' : /prospect/.test(f) ? 'd' : 'e'; };
const gtfPeriodLabel = k => (typeof gtfLabelFn === 'function' ? gtfLabelFn(k) : ({ t1: gtfL('YAZ TR.', 'SUMMER TR.'), s1: gtfL('EYL-ARA', 'SEP-DEC'), t2: gtfL('KIŞ TR.', 'WINTER TR.'), s2: gtfL('ŞUB-HAZ', 'FEB-JUN') })[k] || k);
const gtfLabelFn = typeof gtSqLabel === 'function' ? gtSqLabel : null;

// ---------------- Sayı / süre ayrıştırma ----------------
// "€325,000" "325K" "1.1M" "550" "None" "-" → sayı | null
function gtfNum(v) {
    if (v == null) return null; if (typeof v === 'number') return isFinite(v) ? v : null;
    let s = String(v).trim().replace(/[€$£\s]/g, ''); if (!s || /^(none|yok|-|—|n\/a|null)$/i.test(s)) return null;
    s = s.replace(/%/g, '');
    const m = s.match(/^([+-]?[\d.,]+)([kmb])?$/i); if (!m) return null;
    let n = m[1];
    if (m[2]) n = n.replace(/,/g, '.');                       // 1,1M → 1.1M
    else if (/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(n)) n = n.replace(/,/g, '');   // 325,000
    else if (/^[+-]?\d{1,3}(\.\d{3})+$/.test(n)) n = n.replace(/\./g, '');          // 325.000
    else n = n.replace(/,/g, '.');
    let x = parseFloat(n); if (isNaN(x)) return null;
    const mul = { k: 1e3, m: 1e6, b: 1e9 }[(m[2] || '').toLowerCase()] || 1;
    return Math.round(x * mul);
}
// "1y 11m" "2 Year(s)" "11m" "23" → ay | null
function gtfMonths(v) {
    if (v == null) return null; if (typeof v === 'number') return isFinite(v) ? Math.round(v) : null;
    const s = String(v).trim().toLowerCase(); if (!s || /^(none|yok|-)$/.test(s)) return null;
    if (/^\d+$/.test(s)) return parseInt(s);
    let mo = 0, hit = false, m;
    if ((m = s.match(/(\d+)\s*(y|yr|yıl|year)/))) { mo += +m[1] * 12; hit = true; }
    if ((m = s.match(/(\d+)\s*(m|ay|month)/))) { mo += +m[1]; hit = true; }
    return hit ? mo : null;
}
function gtfPct(v) { const n = gtfNum(v); return n == null ? null : n; }
const gtfDec = (x, d) => { const t = x.toFixed(d); return t.indexOf('.') >= 0 ? t.replace(/0+$/, '').replace(/\.$/, '') : t; };
const gtfMoney = n => n == null ? '' : (Math.abs(n) >= 1e6 ? gtfDec(n / 1e6, 2) + 'M' : Math.abs(n) >= 1e3 ? gtfDec(n / 1e3, 2) + 'K' : String(n));
const gtfMoneyE = n => n == null ? '—' : '€' + gtfMoney(n);
function gtfLeftTxt(mo) { if (mo == null) return '—'; const y = Math.floor(mo / 12), m = mo % 12; return ((y ? y + 'y ' : '') + ((m || !y) ? m + 'm' : '')).trim(); }

// Kayıt alanlarını (TR/EN takma adlarla) temizle
function gtfClean(rec) {
    const pick = (...ks) => { for (const k of ks) if (k in rec) return { has: true, v: rec[k] }; return { has: false }; };
    const out = {}, set = (key, o, fn) => { if (o.has) out[key] = fn(o.v); };
    set('role', pick('role', 'squadRole', 'rol'), v => (v == null || String(v).trim() === '' || /^none$/i.test(String(v))) ? null : String(v).trim());
    set('wage', pick('wage', 'maas', 'salary'), gtfNum);
    set('value', pick('value', 'marketValue', 'market', 'deger'), gtfNum);
    set('valueChg', pick('valueChg', 'valueChange', 'change', 'pct'), gtfPct);
    set('contractLeft', pick('contractLeft', 'contract', 'contractMonths', 'sozlesme'), gtfMonths);
    set('clause', pick('clause', 'releaseClause', 'kloz', 'klozul'), gtfNum);
    set('sellOn', pick('sellOn', 'sellOnClause'), gtfPct);
    set('bonus', pick('bonus', 'signingBonus', 'imzaBonusu'), gtfNum);
    set('fees', pick('fees', 'additionalFees', 'ekUcret'), gtfNum);
    set('status', pick('status', 'negStatus', 'negotiation', 'durum'), v => (v == null || String(v).trim() === '' || /^none$/i.test(String(v))) ? null : String(v).trim());
    return out;
}

// ---------------- Oyuncular & kayıtlar ----------------
function gtfPlayers(arch) {
    const all = [];
    (squadData.astakim || []).forEach(p => { if (p && p.name && (arch || !p.isArchived)) all.push({ p, ctx: 'astakim' }); });   // yalnızca As Takım
    return all;
}
function gtfKeyOrder(k) { const [s, ph] = k.split('|'), si = seasonsList.indexOf(s); return (si < 0 ? -1 : si) * 10 + GTF_CHRONO.indexOf(ph); }
function gtfKeys(p) { return Object.keys((p && p.fin) || {}).sort((a, b) => gtfKeyOrder(a) - gtfKeyOrder(b)); }
function gtfLatestKey(p) { const k = gtfKeys(p); return k.length ? k[k.length - 1] : null; }
function gtfSnapOf(p, snap) { const key = snap === 'latest' ? gtfLatestKey(p) : (p.fin && p.fin[snap] ? snap : null); return key ? { key, d: p.fin[key] } : null; }
function gtfAllSnapKeys() { const s = new Set(); gtfPlayers(true).forEach(x => gtfKeys(x.p).forEach(k => s.add(k))); return Array.from(s).sort((a, b) => gtfKeyOrder(b) - gtfKeyOrder(a)); }
// Kalan süreden bitiş ayı (kayıt tarihine göre)
function gtfExpiry(key, mo) {
    if (mo == null || !key) return '';
    const [s, ph] = key.split('|'), sy = typeof gtSqSeasonYear === 'function' ? gtSqSeasonYear(s) : null, ref = GTF_REF[ph]; if (!sy || !ref) return '';
    const tot = (sy + ref[0]) * 12 + (ref[1] - 1) + mo, y = Math.floor(tot / 12), m = tot % 12 + 1;
    return String(m).padStart(2, '0') + '.' + y;
}
// Dışarıdan kullanım için: oyuncunun son finans kaydı
function gtFinLatest(p) { const k = gtfLatestKey(p); return k ? Object.assign({ key: k }, p.fin[k]) : null; }

// Oyuncu eşleştirme (tam ad, "J. Eastwood" ↔ "Jake Eastwood", benzersiz soyad)
function gtfFind(rec, ctxPref) {
    const all = gtfPlayers(true);
    if (rec.id != null && rec.id !== '') { const h = all.find(x => String(x.p.id) === String(rec.id)); if (h) return { hit: h }; }
    const n = gtfFold(rec.name); if (!n) return {};
    const prefer = list => { if (list.length <= 1) return list; const a = list.filter(x => !x.p.isArchived); const b = (a.length ? a : list).filter(x => x.ctx === ctxPref); return b.length ? b : (a.length ? a : list); };
    let m = prefer(all.filter(x => gtfFold(x.p.name) === n)); if (m.length === 1) return { hit: m[0] }; if (m.length > 1) return { amb: m.length };
    const parts = n.split(' '), last = parts[parts.length - 1], ini = parts[0][0];
    const lastOf = x => { const q = gtfFold(x.p.name).split(' '); return q[q.length - 1]; }, iniOf = x => gtfFold(x.p.name)[0];
    m = prefer(all.filter(x => lastOf(x) === last && iniOf(x) === ini)); if (m.length === 1) return { hit: m[0], loose: true }; if (m.length > 1) return { amb: m.length };
    m = prefer(all.filter(x => lastOf(x) === last)); if (m.length === 1 && parts.length > 0) return { hit: m[0], loose: true }; if (m.length > 1) return { amb: m.length };
    return {};
}

// ---------------- Giriş verisini oku (JSON veya başlıklı CSV) ----------------
function gtfParseInput(text) {
    const t = String(text || '').trim(); if (!t) return { recs: [] };
    try {
        const j = JSON.parse(t), arr = Array.isArray(j) ? j : (j.players || j.records || []);
        return { recs: arr, season: Array.isArray(j) ? '' : (j.season || ''), phase: Array.isArray(j) ? '' : (j.phase || '') };
    } catch (e) { }
    // CSV / sekmeli: ilk satır başlık
    const lines = t.split(/\r?\n/).filter(l => l.trim()); if (lines.length < 2) return { recs: [], err: gtfL('Biçim anlaşılamadı (JSON ya da başlıklı satırlar bekleniyor).', 'Unrecognised format (JSON or a header row expected).') };
    const sep = lines[0].indexOf('\t') >= 0 ? '\t' : (lines[0].indexOf(';') >= 0 ? ';' : ',');
    const head = lines[0].split(sep).map(h => h.trim()), recs = lines.slice(1).map(l => { const c = l.split(sep), o = {}; head.forEach((h, i) => { if (h) o[h] = (c[i] || '').trim(); }); return o; });
    return { recs };
}

// ---------------- Arayüz ----------------
function gtfClose() { ['gtf-ov', 'gtf-ed', 'gtf-im'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); }); document.removeEventListener('keydown', gtfEsc, true); }
function gtfEsc(e) { if (e.key !== 'Escape') return; const top = ['gtf-ed', 'gtf-im', 'gtf-ov'].map(i => document.getElementById(i)).find(Boolean); if (top) { top.remove(); e.stopPropagation(); } if (!document.getElementById('gtf-ov')) document.removeEventListener('keydown', gtfEsc, true); }
function gtfOpen() {
    gtfClose();
    const ov = document.createElement('div'); ov.id = 'gtf-ov'; ov.className = 'gtf-ov';
    ov.innerHTML = '<div class="gtf-box" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(ov);
    ov.addEventListener('mousedown', e => { if (e.target === ov) gtfClose(); });
    document.addEventListener('keydown', gtfEsc, true);
    gtfPaint();
}
function gtfRows() {
    const q = gtfFold(GTF.q);
    return gtfPlayers(GTF.arch).filter(x => !q || gtfFold(x.p.name).includes(q)).map(x => {
        const s = gtfSnapOf(x.p, GTF.snap);
        const age = (typeof gtSqCurrentAge === 'function' ? gtSqCurrentAge(x.p) : null) || x.p.age || null;
        return { p: x.p, ctx: x.ctx, key: s && s.key, d: s && s.d, age };
    }).filter(r => !GTF.only || r.d).filter(gtfPass);
}
// ---- Filtreler ----
const GTF_GRP = { GK: ['GK'], DEF: ['CB', 'LB', 'RB', 'LWB', 'RWB'], MID: ['CDM', 'CM', 'CAM', 'LM', 'RM'], FWD: ['ST', 'CF', 'LW', 'RW'] };
const gtfPosGrp = pos => { const p = String(pos || '').toUpperCase().split(/[ ,\/·]+/)[0]; return Object.keys(GTF_GRP).find(g => GTF_GRP[g].indexOf(p) >= 0) || ''; };
const gtfNeg = st => { const t = String(st || '').toLowerCase(); return !t ? '' : /not willing|unwilling|istemiyor/.test(t) ? 'no' : /willing|open|istekli/.test(t) ? 'yes' : 'other'; };
function gtfPass(r) {
    const f = GTF.f || {}, d = r.d;
    if (f.pos && gtfPosGrp(r.p.pos) !== f.pos) return false;
    if (f.age) { const a = r.age; if (a == null) return false; if (f.age === 'u21' ? a > 21 : f.age === 'm' ? (a < 22 || a > 28) : a < 29) return false; }
    const need = f.role || f.ct || f.neg || f.clause || f.sell || f.bonus || f.fees || f.up || f.dn;
    if (!need) return true; if (!d) return false;
    if (f.role && gtfFold(d.role) !== gtfFold(f.role)) return false;
    if (f.ct) { const m = d.contractLeft; if (m == null) return false; if (f.ct === '6' ? m > 6 : f.ct === '12' ? m > 12 : f.ct === '24' ? m > 24 : m <= 24) return false; }
    if (f.neg && gtfNeg(d.status) !== f.neg) return false;
    if (f.clause && d.clause == null) return false; if (f.sell && d.sellOn == null) return false; if (f.bonus && d.bonus == null) return false; if (f.fees && d.fees == null) return false;
    if (f.up && !(d.valueChg > 0)) return false; if (f.dn && !(d.valueChg < 0)) return false;
    return true;
}
function gtfSetF(k, v) { if (!GTF.f) GTF.f = {}; GTF.f[k] = v; gtfPaint(); }
function gtfResetF() { GTF.f = {}; GTF.q = ''; GTF.only = false; gtfPaint(); }
function gtfFilterBar(total) {
    const f = GTF.f || {}, n = Object.keys(f).filter(k => f[k]).length + (GTF.q ? 1 : 0) + (GTF.only ? 1 : 0);
    const sel = (k, opts) => `<select class="${f[k] ? 'on' : ''}" onchange="gtfSetF('${k}',this.value)">${opts.map(o => `<option value="${gtfE(o[0])}"${(f[k] || '') === o[0] ? ' selected' : ''}>${gtfE(o[1])}</option>`).join('')}</select>`;
    const tg = (k, tr, en) => `<button type="button" class="gtf-fc${f[k] ? ' on' : ''}" onclick="gtfSetF('${k}',${f[k] ? 'false' : 'true'})">${gtfL(tr, en)}</button>`;
    const roles = GTF_ROLES.filter(x => true);
    return `<div class="gtf-fil">
        ${sel('pos', [['', gtfL('Tüm mevkiler', 'All positions')], ['GK', gtfL('Kaleci', 'Goalkeepers')], ['DEF', gtfL('Defans', 'Defenders')], ['MID', gtfL('Orta saha', 'Midfielders')], ['FWD', gtfL('Forvet', 'Forwards')]])}
        ${sel('role', [['', gtfL('Tüm roller', 'All roles')]].concat(roles.map(x => [x, x])))}
        ${sel('ct', [['', gtfL('Tüm sözleşmeler', 'Any contract')], ['6', gtfL('≤ 6 ay kaldı', '≤ 6 months left')], ['12', gtfL('≤ 12 ay kaldı', '≤ 12 months left')], ['24', gtfL('≤ 24 ay kaldı', '≤ 24 months left')], ['long', gtfL('24 aydan uzun', 'Over 24 months')]])}
        ${sel('age', [['', gtfL('Tüm yaşlar', 'All ages')], ['u21', '≤ 21'], ['m', '22 – 28'], ['o', '29+']])}
        ${sel('neg', [['', gtfL('Pazarlık: hepsi', 'Negotiation: any')], ['yes', gtfL('Pazarlığa açık', 'Willing')], ['no', gtfL('Pazarlığa kapalı', 'Not willing')]])}
        ${tg('clause', 'Klozüllü', 'Has clause')}${tg('sell', 'Sell-on\'lu', 'Has sell-on')}${tg('bonus', 'İmza bonuslu', 'Signing bonus')}${tg('fees', 'Ek ücretli', 'Add. fees')}${tg('up', '▲ Değeri artan', '▲ Value up')}${tg('dn', '▼ Değeri düşen', '▼ Value down')}
        <span class="gtf-cnt">${total} ${gtfL('oyuncu', 'players')}</span>${n ? `<button type="button" class="gtf-fc rs" onclick="gtfResetF()"><i class="fa-solid fa-rotate-left"></i> ${gtfL('Sıfırla', 'Reset')} (${n})</button>` : ''}</div>`;
}
const GTF_POS = ['GK', 'RB', 'RWB', 'CB', 'LB', 'LWB', 'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'CF', 'ST'];
function gtfSortVal(r, k) {
    const d = r.d || {};
    switch (k) {
        case 'pos': { const i = GTF_POS.indexOf(String(r.p.pos || '').toUpperCase()); return i < 0 ? 99 : i; }
        case 'name': return gtfFold(r.p.name);
        case 'age': return r.age; case 'role': return d.role ? GTF_ROLES.findIndex(x => gtfFold(x) === gtfFold(d.role)) : null;
        case 'contractLeft': return d.contractLeft; default: return d[k];
    }
}
function gtfPaint() {
    const box = document.querySelector('#gtf-ov .gtf-box'); if (!box) return;
    const rows = gtfRows();
    rows.sort((a, b) => {
        const x = gtfSortVal(a, GTF.sort), y = gtfSortVal(b, GTF.sort);
        if (x == null && y == null) return gtfFold(a.p.name).localeCompare(gtfFold(b.p.name)); if (x == null) return 1; if (y == null) return -1;
        return (typeof x === 'string' ? x.localeCompare(y) : x - y) * GTF.dir || gtfFold(a.p.name).localeCompare(gtfFold(b.p.name));
    });
    const withD = rows.filter(r => r.d), sum = k => withD.reduce((a, r) => a + (r.d[k] || 0), 0);
    const cl = withD.filter(r => r.d.contractLeft != null), avgC = cl.length ? cl.reduce((a, r) => a + r.d.contractLeft, 0) / cl.length : null;
    const expiring = cl.filter(r => r.d.contractLeft <= 12).length, clauseN = withD.filter(r => r.d.clause != null).length, sellN = withD.filter(r => r.d.sellOn != null).length;
    const keys = gtfAllSnapKeys();
    const th = (k, tr, en, cls) => `<th class="${cls || ''}${GTF.sort === k ? ' on' : ''}" onclick="gtfSortBy('${k}')">${gtfL(tr, en)}${GTF.sort === k ? `<i class="fa-solid fa-caret-${GTF.dir > 0 ? 'up' : 'down'}"></i>` : ''}</th>`;
    const chg = v => v == null ? '' : `<em class="${v > 0 ? 'up' : v < 0 ? 'dn' : 'eq'}">${v > 0 ? '+' : ''}${v}%</em>`;
    box.innerHTML = `
    <button type="button" class="gtf-x" onclick="gtfClose()" aria-label="${gtfL('Kapat', 'Close')}"><i class="fa-solid fa-xmark"></i></button>
    <div class="gtf-head"><h3><i class="fa-solid fa-file-contract"></i> ${gtfL('Sözleşme & Finans', 'Contracts & Finance')}</h3>
        <div class="gtf-tools">
            <select onchange="GTF.snap=this.value;gtfPaint()" title="${gtfL('Hangi dönemin kaydı', 'Which snapshot')}"><option value="latest">${gtfL('Güncel (son kayıt)', 'Latest record')}</option>${keys.map(k => { const [s, ph] = k.split('|'); return `<option value="${gtfE(k)}"${GTF.snap === k ? ' selected' : ''}>${gtfE(s)} · ${gtfPeriodLabel(ph)}</option>`; }).join('')}</select>
            <label class="gtf-q"><i class="fa-solid fa-magnifying-glass"></i><input type="text" value="${gtfE(GTF.q)}" placeholder="${gtfL('Oyuncu ara…', 'Find player…')}" oninput="GTF.q=this.value;gtfPaintBody()"></label>
            <label class="gtf-chk"><input type="checkbox" ${GTF.only ? 'checked' : ''} onchange="GTF.only=this.checked;gtfPaint()"> ${gtfL('Sadece verisi olanlar', 'With data only')}</label>
            <label class="gtf-chk"><input type="checkbox" ${GTF.arch ? 'checked' : ''} onchange="GTF.arch=this.checked;gtfPaint()"> ${gtfL('Ayrılanlar', 'Departed')}</label>
            <button type="button" class="gtf-btn" onclick="gtfImportOpen()"><i class="fa-solid fa-file-import"></i> ${gtfL('Veri yükle', 'Import')}</button>
            <button type="button" class="gtf-btn ghost" onclick="gtfCopyList()" title="${gtfL('Oyuncu listesini (id, ad, mevki) JSON olarak kopyalar', 'Copies the player list (id, name, pos) as JSON')}"><i class="fa-regular fa-copy"></i> ${gtfL('Oyuncu listesi', 'Player list')}</button>
        </div></div>
    ${gtfFilterBar(rows.length)}
    <div class="gtf-sum">
        <div><span>${gtfL('Toplam piyasa değeri', 'Squad value')}</span><b>${gtfMoneyE(withD.length ? sum('value') : null)}</b></div>
        <div><span>${gtfL('Maaş toplamı', 'Wage bill')}</span><b>${gtfMoneyE(withD.length ? sum('wage') : null)}</b></div>
        <div><span>${gtfL('Ort. kalan sözleşme', 'Avg. contract left')}</span><b>${avgC == null ? '—' : gtfLeftTxt(Math.round(avgC))}</b></div>
        <div class="${expiring ? 'warn' : ''}"><span>${gtfL('12 ay içinde biten', 'Expiring ≤12m')}</span><b>${expiring}</b></div>
        <div><span>${gtfL('Klozüllü / sell-on', 'Clause / sell-on')}</span><b>${clauseN} / ${sellN}</b></div>
        <div><span>${gtfL('Veri girilen', 'With data')}</span><b>${withD.length} / ${rows.length}</b></div>
    </div>
    <div class="gtf-scroll"><table class="gtf-tb"><thead><tr>
        ${th('pos', 'Mevki', 'Pos', 'p')}${th('name', 'Oyuncu', 'Player', 'n')}${th('age', 'Yaş', 'Age')}${th('role', 'Rol', 'Role')}${th('value', 'Değer', 'Value')}${th('wage', 'Maaş', 'Wage')}${th('contractLeft', 'Sözleşme', 'Contract')}${th('clause', 'Klozül', 'Clause')}${th('sellOn', 'Sell-on', 'Sell-on')}${th('bonus', 'İmza bonusu', 'Signing bonus')}<th></th>
    </tr></thead><tbody>${rows.map(r => {
        const d = r.d, dash = '<span class="no">—</span>';
        return `<tr class="${d ? '' : 'miss'}${r.p.isArchived ? ' arch' : ''}" onclick="gtfEdit('${gtfJs(String(r.p.id))}','${r.ctx}')">
            <td class="p"><i class="pos-${gtfE(String(r.p.pos || ''))}">${gtfE(r.p.pos || '')}</i></td><td class="n">${gtfE(r.p.name)}</td><td>${r.age || dash}</td>
            <td>${d && d.role ? `<span class="gtf-role r-${GTF_ROLE_CLS(d.role)}">${gtfE(d.role)}</span>` : dash}</td>
            <td>${d && d.value != null ? gtfMoneyE(d.value) + chg(d.valueChg) : dash}</td>
            <td>${d && d.wage != null ? gtfMoneyE(d.wage) : dash}</td>
            <td>${d && d.contractLeft != null ? `<span class="gtf-ct${d.contractLeft <= 12 ? ' soon' : ''}">${gtfLeftTxt(d.contractLeft)}</span><small>${gtfExpiry(r.key, d.contractLeft)}</small>` : dash}</td>
            <td>${d && d.clause != null ? gtfMoneyE(d.clause) : dash}</td>
            <td>${d && d.sellOn != null ? d.sellOn + '%' : dash}</td>
            <td>${d && d.bonus != null ? gtfMoneyE(d.bonus) : dash}</td>
            <td class="e"><i class="fa-solid fa-pen"></i></td></tr>`;
    }).join('') || `<tr><td colspan="11" class="gtf-empty">${gtfL('Bu kadroda oyuncu yok.', 'No players.')}</td></tr>`}</tbody></table></div>
    <p class="gtf-note">${gtfL('Satıra tıklayınca o oyuncunun kaydını düzenlersin. Değerler seçili dönemin kaydıdır; "Güncel" her oyuncunun son kaydını gösterir.', 'Click a row to edit that player. Values come from the selected snapshot; "Latest" shows each player’s most recent record.')}</p>`;
}
function gtfJs(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
// Arama kutusunda odağı kaybetmeden yalnızca gövdeyi yenile
function gtfPaintBody() {
    const f = document.querySelector('#gtf-ov .gtf-q input'), pos = f ? f.selectionStart : 0; gtfPaint();
    const n = document.querySelector('#gtf-ov .gtf-q input'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) { } }
}
function gtfSortBy(k) { if (GTF.sort === k) GTF.dir *= -1; else { GTF.sort = k; GTF.dir = (k === 'name' || k === 'pos' || k === 'role') ? 1 : -1; } gtfPaint(); }

// ---------------- Oyuncu kaydını düzenle ----------------
function gtfEdit(id, ctx) {
    const p = (squadData[ctx] || []).find(x => String(x.id) === String(id)); if (!p) return;
    const keys = gtfKeys(p), def = GTF.snap !== 'latest' ? GTF.snap : (gtfLatestKey(p) || (seasonsList[seasonsList.length - 1] + '|t1'));
    gtfEditPaint(p, ctx, def);
}
function gtfEditPaint(p, ctx, key) {
    let ed = document.getElementById('gtf-ed'); if (ed) ed.remove();
    ed = document.createElement('div'); ed.id = 'gtf-ed'; ed.className = 'gtf-ov top';
    const [s0, ph0] = key.split('|'), d = (p.fin && p.fin[key]) || {}, months = d.contractLeft;
    const num = v => v == null ? '' : v;
    ed.innerHTML = `<div class="gtf-box sm" role="dialog" aria-modal="true">
        <button type="button" class="gtf-x" onclick="document.getElementById('gtf-ed').remove()"><i class="fa-solid fa-xmark"></i></button>
        <div class="gtf-head"><h3><i class="pos-${gtfE(String(p.pos || ''))}">${gtfE(p.pos || '')}</i> ${gtfE(p.name)}</h3></div>
        <div class="gtf-form">
            <label>${gtfL('Sezon', 'Season')}<select id="gtfe-s">${seasonsList.map(s => `<option${s === s0 ? ' selected' : ''}>${gtfE(s)}</option>`).join('')}</select></label>
            <label>${gtfL('Dönem', 'Period')}<select id="gtfe-ph">${['s2', 't2', 's1', 't1'].map(k => `<option value="${k}"${k === ph0 ? ' selected' : ''}>${gtfPeriodLabel(k)}</option>`).join('')}</select></label>
            <label class="w2">${gtfL('Squad role', 'Squad role')}<input id="gtfe-role" list="gtfe-roles" value="${gtfE(d.role || '')}" placeholder="Important"><datalist id="gtfe-roles">${GTF_ROLES.map(r => `<option>${r}</option>`).join('')}</datalist></label>
            <label>${gtfL('Piyasa değeri (€)', 'Market value (€)')}<input id="gtfe-value" inputmode="numeric" value="${num(d.value)}" placeholder="325000"></label>
            <label>${gtfL('Değişim (%)', 'Change (%)')}<input id="gtfe-chg" inputmode="decimal" value="${num(d.valueChg)}" placeholder="0"></label>
            <label>${gtfL('Maaş (€)', 'Wage (€)')}<input id="gtfe-wage" inputmode="numeric" value="${num(d.wage)}" placeholder="550"></label>
            <label>${gtfL('Kalan sözleşme', 'Contract left')}<input id="gtfe-ct" value="${months == null ? '' : gtfLeftTxt(months)}" placeholder="1y 11m"></label>
            <label>${gtfL('Klozül (€)', 'Clause (€)')}<input id="gtfe-clause" inputmode="numeric" value="${num(d.clause)}" placeholder="${gtfL('yoksa boş', 'blank if none')}"></label>
            <label>${gtfL('Sell-on (%)', 'Sell-on (%)')}<input id="gtfe-sell" inputmode="decimal" value="${num(d.sellOn)}" placeholder="${gtfL('yoksa boş', 'blank if none')}"></label>
            <label>${gtfL('İmza bonusu (€)', 'Signing bonus (€)')}<input id="gtfe-bonus" inputmode="numeric" value="${num(d.bonus)}" placeholder="${gtfL('yoksa boş', 'blank if none')}"></label>
            <label>${gtfL('Ek ücretler (€)', 'Additional fees (€)')}<input id="gtfe-fees" inputmode="numeric" value="${num(d.fees)}" placeholder="${gtfL('yoksa boş', 'blank if none')}"></label>
            <label class="w2">${gtfL('Pazarlık durumu', 'Negotiation status')}<input id="gtfe-status" value="${gtfE(d.status || '')}" placeholder="willing to negotiate new terms"></label>
        </div>
        <div class="gtf-foot"><span id="gtfe-msg"></span>${p.fin && p.fin[key] ? `<button type="button" class="gtf-btn del" onclick="gtfDel('${gtfJs(String(p.id))}','${ctx}')"><i class="fa-regular fa-trash-can"></i></button>` : ''}
            <button type="button" class="gtf-btn ghost" onclick="document.getElementById('gtf-ed').remove()">${gtfL('İptal', 'Cancel')}</button><button type="button" class="gtf-btn" onclick="gtfEditSave('${gtfJs(String(p.id))}','${ctx}')"><i class="fa-solid fa-check"></i> ${gtfL('Kaydet', 'Save')}</button></div></div>`;
    document.body.appendChild(ed);
    ed.addEventListener('mousedown', e => { if (e.target === ed) ed.remove(); });
    // Sezon/dönem değişince o dönemin kaydını yükle
    const sw = () => { const k = document.getElementById('gtfe-s').value + '|' + document.getElementById('gtfe-ph').value; gtfEditPaint(p, ctx, k); };
    document.getElementById('gtfe-s').onchange = sw; document.getElementById('gtfe-ph').onchange = sw;
}
function gtfEditSave(id, ctx) {
    const p = (squadData[ctx] || []).find(x => String(x.id) === String(id)); if (!p) return;
    const v = i => document.getElementById(i).value, key = v('gtfe-s') + '|' + v('gtfe-ph');
    const rec = gtfClean({ role: v('gtfe-role'), value: v('gtfe-value'), valueChg: v('gtfe-chg'), wage: v('gtfe-wage'), contractLeft: v('gtfe-ct'), clause: v('gtfe-clause'), sellOn: v('gtfe-sell'), bonus: v('gtfe-bonus'), fees: v('gtfe-fees'), status: v('gtfe-status') });
    if (!p.fin) p.fin = {};
    p.fin[key] = Object.assign({ season: key.split('|')[0], phase: key.split('|')[1] }, rec);
    saveToLocalStorage(); document.getElementById('gtf-ed').remove(); gtfPaint();
}
function gtfDel(id, ctx) {
    const p = (squadData[ctx] || []).find(x => String(x.id) === String(id)); if (!p || !p.fin) return;
    const key = document.getElementById('gtfe-s').value + '|' + document.getElementById('gtfe-ph').value;
    delete p.fin[key]; if (!Object.keys(p.fin).length) delete p.fin;
    saveToLocalStorage(); document.getElementById('gtf-ed').remove(); gtfPaint();
}

// ---------------- Toplu veri yükle ----------------
const GTF_SAMPLE = `{
  "season": "26/27", "phase": "t1",
  "players": [
    { "name": "Jake Eastwood", "role": "Important", "wage": 550, "value": 325000, "valueChg": 0,
      "contractLeft": "1y 11m", "clause": null, "sellOn": null, "bonus": null, "fees": null,
      "status": "willing to negotiate new terms" }
  ]
}`;
function gtfImportOpen() {
    const old = document.getElementById('gtf-im'); if (old) old.remove();
    const cur = seasonsList[seasonsList.length - 1] || '';
    const im = document.createElement('div'); im.id = 'gtf-im'; im.className = 'gtf-ov top';
    im.innerHTML = `<div class="gtf-box md" role="dialog" aria-modal="true">
        <button type="button" class="gtf-x" onclick="document.getElementById('gtf-im').remove()"><i class="fa-solid fa-xmark"></i></button>
        <div class="gtf-head"><h3><i class="fa-solid fa-file-import"></i> ${gtfL('Finans verisi yükle', 'Import finance data')}</h3></div>
        <p class="gtf-p">${gtfL('JSON ya da başlıklı satırları (CSV / sekmeli) yapıştır. Oyuncular ada göre eşleşir ("J. Eastwood" = "Jake Eastwood"). Yalnızca verdiğin alanlar yazılır; boş (null) verirsen o alan temizlenir.', 'Paste JSON or header-row text (CSV / tab). Players are matched by name ("J. Eastwood" = "Jake Eastwood"). Only the fields you supply are written; null clears a field.')}</p>
        <div class="gtf-row">
            <label>${gtfL('Sezon', 'Season')}<select id="gtfi-s">${seasonsList.map(s => `<option${s === cur ? ' selected' : ''}>${gtfE(s)}</option>`).join('')}</select></label>
            <label>${gtfL('Dönem', 'Period')}<select id="gtfi-ph">${['s2', 't2', 's1', 't1'].map(k => `<option value="${k}"${k === 't1' ? ' selected' : ''}>${gtfPeriodLabel(k)}</option>`).join('')}</select></label>
        </div>
        <textarea id="gtfi-text" rows="9" spellcheck="false" placeholder='{"season":"26/27","phase":"t1","players":[ … ]}'></textarea>
        <details class="gtf-det"><summary>${gtfL('Örnek biçim', 'Sample format')}</summary><pre>${gtfE(GTF_SAMPLE)}</pre>
            <small>${gtfL('Alan adları: role, wage, value, valueChg, contractLeft ("1y 11m" ya da ay sayısı), clause, sellOn, bonus, fees, status. Sayılar 325000, "325K", "€1.1M" gibi yazılabilir.', 'Fields: role, wage, value, valueChg, contractLeft ("1y 11m" or months), clause, sellOn, bonus, fees, status. Numbers may be 325000, "325K", "€1.1M".')}</small></details>
        <div id="gtfi-prev" class="gtf-prev"></div>
        <div class="gtf-foot"><span id="gtfi-msg"></span><button type="button" class="gtf-btn ghost" onclick="document.getElementById('gtf-im').remove()">${gtfL('İptal', 'Cancel')}</button><button type="button" class="gtf-btn" id="gtfi-go" onclick="gtfImportApply()" disabled><i class="fa-solid fa-check"></i> ${gtfL('Kaydet', 'Save')}</button></div></div>`;
    document.body.appendChild(im);
    im.addEventListener('mousedown', e => { if (e.target === im) im.remove(); });
    const ta = document.getElementById('gtfi-text'); ta.addEventListener('input', gtfImportPreview);
    ['gtfi-s', 'gtfi-ph'].forEach(i => document.getElementById(i).addEventListener('change', e => { e.target.dataset.user = '1'; }));
    ta.focus();
}
// Çözümlenen kayıtlar (önizleme ve uygulama aynı sonucu kullanır)
function gtfImportResolve() {
    const inp = gtfParseInput(document.getElementById('gtfi-text').value), out = { ok: [], miss: [], amb: [], loose: [], fresh: [], err: inp.err, inp };
    inp.recs.forEach(r => {
        if (!r || typeof r !== 'object') return;
        const f = gtfFind(r, (typeof squadContext !== 'undefined' ? squadContext : 'astakim')), fields = gtfClean(r);
        if (f.hit) { out.ok.push({ hit: f.hit, fields, rec: r }); if (f.loose) out.loose.push(String(r.name) + ' → ' + f.hit.p.name); }
        else if (f.amb) out.amb.push(String(r.name));
        else { out.miss.push(String(r.name || r.id || '?')); if (r.name) out.fresh.push({ rec: r, fields }); }
    });
    return out;
}
function gtfImportPreview() {
    const r = gtfImportResolve(), s = document.getElementById('gtfi-s'), ph = document.getElementById('gtfi-ph');
    // JSON içindeki sezon/dönem, kullanıcı elle seçmediyse seçime yansır
    if (r.inp.season && !s.dataset.user && seasonsList.includes(r.inp.season)) s.value = r.inp.season;
    if (r.inp.phase && !ph.dataset.user && GTF_CHRONO.includes(r.inp.phase)) ph.value = r.inp.phase;
    const prev = document.getElementById('gtfi-prev'), go = document.getElementById('gtfi-go');
    const chip = (n, tr, en, cls) => n ? `<span class="gtf-chip ${cls}">${n} ${gtfL(tr, en)}</span>` : '';
    prev.innerHTML = r.err ? `<span class="gtf-chip bad">${gtfE(r.err)}</span>` : (r.ok.length || r.miss.length || r.amb.length ? chip(r.ok.length, 'oyuncu eşleşti', 'matched', 'ok') + chip(GTF.addNew ? 0 : r.miss.length, 'eşleşmedi', 'unmatched', 'bad') + chip(GTF.addNew ? r.fresh.length : 0, 'yeni oyuncu eklenecek', 'new players to add', 'warn') + chip(r.amb.length, 'belirsiz (aynı ad)', 'ambiguous', 'warn')
        + `<div class="gtf-list">${r.loose.length ? `<div><b>${gtfL('Yaklaşık eşleşme', 'Loose match')}:</b> ${gtfE(r.loose.join(', '))}</div>` : ''}${r.miss.length ? `<div><b>${GTF.addNew ? gtfL('Yeni eklenecek (kadroda yok)', 'Will be added (not in squad)') : gtfL('Bulunamayan', 'Not found')}:</b> ${gtfE(r.miss.join(', '))}</div><label class="gtf-chk"><input type="checkbox" ${GTF.addNew ? 'checked' : ''} onchange="GTF.addNew=this.checked;gtfImportPreview()"> ${gtfL('Kadroda olmayanları As Takım\'a yeni oyuncu olarak ekle', 'Add players missing from the squad to the First Team')}</label>` : ''}${r.amb.length ? `<div><b>${gtfL('Belirsiz', 'Ambiguous')}:</b> ${gtfE(r.amb.join(', '))}</div>` : ''}</div>
        <div class="gtf-tgt">${gtfL('Kaydedilecek dönem', 'Target period')}: <b>${gtfE(s.value)} · ${gtfPeriodLabel(ph.value)}</b></div>` : '');
    go.disabled = !(r.ok.length || (GTF.addNew && r.fresh.length));
}
function gtfImportApply() {
    const r = gtfImportResolve(), key = document.getElementById('gtfi-s').value + '|' + document.getElementById('gtfi-ph').value;
    const [season, phase] = key.split('|'); let n = 0, added = 0;
    if (GTF.addNew) r.fresh.forEach((f, i) => {
        const rc = f.rec, name = String(rc.name).trim(); if (!name) return;
        if (!squadData.astakim) squadData.astakim = [];
        const p = { id: 'p_' + Date.now() + '_' + i + Math.random().toString(36).slice(2, 5), pos: String(rc.pos || rc.position || 'CM').split(/[ ,\/·]+/)[0].toUpperCase(), role: '', name, photoUrl: '', countryCode: String(rc.cc || rc.countryCode || rc.country || '').trim(), joinAge: rc.age || '', joinOvr: rc.ovr || '', history: {} };
        if (typeof normalizeCountryInput === 'function' && p.countryCode) { try { p.countryCode = normalizeCountryInput(p.countryCode) || p.countryCode; } catch (e) { } }
        if (rc.birth) p.birthDate = rc.birth;
        p.joined = { season, team: '', kind: 'sale' };
        squadData.astakim.push(p); r.ok.push({ hit: { p, ctx: 'astakim' }, fields: f.fields, rec: rc }); added++;
    });
    if (!r.ok.length) return;
    r.ok.forEach(o => {
        const p = o.hit.p; if (!p.fin) p.fin = {};
        const cur = p.fin[key] || { season, phase };
        p.fin[key] = Object.assign({}, cur, o.fields, { season, phase }); n++;
    });
    saveToLocalStorage();
    const im = document.getElementById('gtf-im'); if (im) im.remove();
    GTF.snap = 'latest'; gtfPaint();
    if (typeof gtToast === 'function') gtToast(gtfL(`${n} oyuncunun finans verisi kaydedildi${added ? ` (${added} yeni oyuncu eklendi)` : ''} (${season} · ${gtfPeriodLabel(phase)}).`, `Finance data saved for ${n} players${added ? ` (${added} new added)` : ''} (${season} · ${gtfPeriodLabel(phase)}).`), 'success');
}
function gtfCopyList() {
    const list = gtfPlayers(true).map(x => ({ id: x.p.id, name: x.p.name, pos: x.p.pos || '', ctx: x.ctx, age: (typeof gtSqCurrentAge === 'function' ? gtSqCurrentAge(x.p) : null) || x.p.age || null, archived: !!x.p.isArchived }));
    const txt = JSON.stringify(list);
    const done = () => { if (typeof gtToast === 'function') gtToast(gtfL(`${list.length} oyuncu kopyalandı.`, `${list.length} players copied.`), 'success'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => window.prompt(gtfL('Kopyala:', 'Copy:'), txt)); else window.prompt(gtfL('Kopyala:', 'Copy:'), txt);
}

// =====================================================================
//  OYUNCU KARTI · "Finans" sekmesi (yalnızca As Takım oyuncuları)
// =====================================================================
let GTF_CARD = { pid: null, key: null };
function gtfCardPlayer() { return (squadData.astakim || []).find(x => x && String(x.id) === String(GTF_CARD.pid)); }
function gtfCardHtml(p) {
    const keys = gtfKeys(p).reverse(), en = gtfL('', 'x') === 'x';
    if (!keys.length) return `<div class="gtc-empty"><i class="fa-solid fa-file-contract"></i><b>${gtfL('Bu oyuncunun finans kaydı yok', 'No finance record for this player')}</b>
        <button type="button" class="gtc-btn" onclick="gtfCardEdit()"><i class="fa-solid fa-plus"></i> ${gtfL('Kayıt ekle', 'Add record')}</button></div>`;
    if (!GTF_CARD.key || !p.fin[GTF_CARD.key]) GTF_CARD.key = keys[0];
    const key = GTF_CARD.key, d = p.fin[key], prevKey = keys[keys.indexOf(key) + 1], pd = prevKey ? p.fin[prevKey] : null;
    const chip = k => { const [s, ph] = k.split('|'); return `<button type="button" class="gtc-chip${k === key ? ' on' : ''}" onclick="gtfCardPick('${k}')">${gtfE(s)} · ${gtfE(gtfPeriodLabel(ph))}</button>`; };
    const dash = '<span class="gtc-no">—</span>';
    const chg = v => v == null ? '' : `<em class="${v > 0 ? 'up' : v < 0 ? 'dn' : 'eq'}">${v > 0 ? '+' : ''}${v}%</em>`;
    const delta = (a, b) => (a != null && b != null && a !== b) ? `<small class="${a > b ? 'up' : 'dn'}">${a > b ? '▲' : '▼'} ${gtfMoneyE(Math.abs(a - b))}</small>` : '';
    const cell = (l, v, cls) => `<div class="gtc-c ${cls || ''}"><span>${l}</span><b>${v}</b></div>`;
    const ct = d.contractLeft != null ? `<span class="${d.contractLeft <= 12 ? 'gtc-soon' : ''}">${gtfLeftTxt(d.contractLeft)}</span> <small>${gtfExpiry(key, d.contractLeft) ? gtfL('bitiş ', 'ends ') + gtfExpiry(key, d.contractLeft) : ''}</small>` : dash;
    // değer geçmişi (en eskiden yeniye)
    const hist = gtfKeys(p).filter(k => p.fin[k].value != null), mx = Math.max.apply(null, hist.map(k => p.fin[k].value).concat([1]));
    const bars = hist.length > 1 ? `<div class="gtc-hist"><span class="gtc-h">${gtfL('PİYASA DEĞERİ GEÇMİŞİ', 'MARKET VALUE HISTORY')}</span><div>${hist.map(k => `<button type="button" class="gtc-bar${k === key ? ' on' : ''}" title="${gtfE(k.replace('|', ' · '))}: ${gtfMoneyE(p.fin[k].value)}" onclick="gtfCardPick('${k}')"><i style="height:${Math.max(6, Math.round(p.fin[k].value / mx * 100))}%"></i><small>${gtfE(k.split('|')[0])}</small></button>`).join('')}</div></div>` : '';
    return `<div class="gtc">
        <div class="gtc-tl"><span>${gtfL('DÖNEM', 'PERIOD')}</span><div>${keys.map(chip).join('')}</div></div>
        <div class="gtc-top">${d.role ? `<span class="gtf-role r-${GTF_ROLE_CLS(d.role)}">${gtfE(d.role)}</span>` : ''}${d.status ? `<span class="gtc-st">${gtfE(d.status)}</span>` : ''}</div>
        <div class="gtc-grid">
            ${cell(gtfL('Piyasa değeri', 'Market value'), d.value != null ? gtfMoneyE(d.value) + chg(d.valueChg) + delta(d.value, pd && pd.value) : dash, 'big')}
            ${cell(gtfL('Maaş (haftalık)', 'Wage (weekly)'), d.wage != null ? gtfMoneyE(d.wage) + delta(d.wage, pd && pd.wage) : dash, 'big')}
            ${cell(gtfL('Kalan sözleşme', 'Contract left'), ct)}
            ${cell(gtfL('Klozül', 'Clause'), d.clause != null ? gtfMoneyE(d.clause) : dash)}
            ${cell('Sell-on', d.sellOn != null ? d.sellOn + '%' : dash)}
            ${cell(gtfL('İmza bonusu', 'Signing bonus'), d.bonus != null ? gtfMoneyE(d.bonus) : dash)}
            ${cell(gtfL('Ek ücretler', 'Additional fees'), d.fees != null ? gtfMoneyE(d.fees) : dash)}
        </div>${bars}
        <button type="button" class="gtc-btn ghost" onclick="gtfCardEdit()"><i class="fa-solid fa-pen"></i> ${gtfL('Kaydı düzenle', 'Edit record')}</button></div>`;
}
function gtfCardPrepare(p) {
    const tabs = document.getElementById('pi-tabs'); if (!tabs) return;
    let b = tabs.querySelector('[data-t="finans"]');
    const ok = typeof squadContext !== 'undefined' && squadContext === 'astakim' && p && (squadData.astakim || []).indexOf(p) >= 0;
    if (!ok) { if (b) b.remove(); delete piTabHtml.finans; return; }
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'pi-tab'; b.dataset.t = 'finans'; b.onclick = () => piSetTab('finans'); tabs.appendChild(b); }
    b.textContent = gtfL('Finans', 'Finance');
    if (GTF_CARD.pid !== p.id) GTF_CARD = { pid: p.id, key: null };
    piTabHtml.finans = gtfCardHtml(p);
}
function gtfCardRefresh() {
    const p = gtfCardPlayer(); if (!p || !document.getElementById('pi-tabs')) return;
    piTabHtml.finans = gtfCardHtml(p);
    if (typeof piTab !== 'undefined' && piTab === 'finans') piSetTab('finans');
}
function gtfCardPick(k) { GTF_CARD.key = k; gtfCardRefresh(); }
function gtfCardEdit() { const p = gtfCardPlayer(); if (p) gtfEdit(String(p.id), 'astakim'); }
if (typeof piAttrPrepare === 'function') {
    const _gtfPAP = piAttrPrepare;
    piAttrPrepare = function (p) { const r = _gtfPAP.apply(this, arguments); try { gtfCardPrepare(p); } catch (e) { } return r; };
}
['gtfEditSave', 'gtfDel'].forEach(n => { const o = window[n]; if (typeof o === 'function') window[n] = function () { const r = o.apply(this, arguments); try { gtfCardRefresh(); } catch (e) { } return r; }; });
