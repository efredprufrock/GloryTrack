/* Veri Girişi modülü: Ayarlar > Veri Girişi. 4 ölçüm noktası (31 Ağu / 31 Ara / 31 Oca / 30 Haz) için eksik veri matrisi + kontrol listesi.
   Mevcut editörleri yeniden kullanır; yeni bir giriş formu içermez. "Bu sezon yok" işaretleri kariyer verisiyle birlikte kaydedilir. */
(function () {
    'use strict';
    const CPS = [['t1', 'Yaz', '31 Ağu', 'Summer', '31 Aug'], ['s1', 'Aralık', '31 Ara', 'December', '31 Dec'], ['t2', 'Kış', '31 Oca', 'Winter', '31 Jan'], ['s2', 'Sezon sonu', '30 Haz', 'Season end', '30 Jun']];
    const PRESENT = ['continue', 'in', 'free_in', 'renew', 'loan_in', 'academy'];
    const en = () => typeof currentLang !== 'undefined' && currentLang === 'en';
    const L = (tr, e) => (en() ? e : tr);
    const E = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s == null ? '' : s)) : String(s == null ? '' : s));

    window.gtEntryFlags = window.gtEntryFlags || {}; window.gtDeletedCols = window.gtDeletedCols || [];
    window.gtTopPlayers = window.gtTopPlayers || {};
    window.gtTables = window.gtTables || {}; window.gtNameAlias = window.gtNameAlias || {};
    let sel = { s: null, c: 's2' };
    let openKey = null, aiKey = null, aiTxt = '', aiPrev = null, aiMsg = '';

    // ---- kalıcılık: kariyer verisine ve buluta eşlik eder ----
    if (typeof window.getAllData === 'function') {
        const o = window.getAllData;
        window.getAllData = function () { const d = o.apply(this, arguments); try { d.entryFlags = window.gtEntryFlags; d.topPlayers = window.gtTopPlayers; d.tablesSnap = window.gtTables; d.deletedCols = window.gtDeletedCols; d.leagueAlias = window.gtLeagueAlias; d.nameAlias = window.gtNameAlias; } catch (e) {} return d; };
    }
    if (typeof window.applyLoadedData === 'function') {
        const o = window.applyLoadedData;
        window.applyLoadedData = function (data) { const r = o.apply(this, arguments); try { window.gtNameAlias = (data && data.nameAlias && typeof data.nameAlias === 'object' && !Array.isArray(data.nameAlias)) ? data.nameAlias : {}; window.gtLeagueAlias = (data && data.leagueAlias && typeof data.leagueAlias === 'object' && !Array.isArray(data.leagueAlias)) ? data.leagueAlias : { 'superliga': 'Romanian Superliga', 'swiss super league': 'Swiss League' }; window.gtEntryFlags = (data && data.entryFlags && typeof data.entryFlags === 'object') ? data.entryFlags : {}; window.gtTopPlayers = (data && data.topPlayers && typeof data.topPlayers === 'object') ? data.topPlayers : {}; window.gtTables = (data && data.tablesSnap && typeof data.tablesSnap === 'object') ? data.tablesSnap : {}; ; window.gtDeletedCols = Array.isArray(data && data.deletedCols) ? data.deletedCols : [] } catch (e) {} return r; };
    }
    const flagged = (s, c, k) => !!(window.gtEntryFlags[s] && window.gtEntryFlags[s][c] && window.gtEntryFlags[s][c][k]);
    function toggleFlag(s, c, k) {
        const f = window.gtEntryFlags; f[s] = f[s] || {}; f[s][c] = f[s][c] || {};
        if (f[s][c][k]) delete f[s][c][k]; else f[s][c][k] = 1;
        try { saveToLocalStorage(); } catch (e) {}
    }

    // ---- kontroller ----
    function squadCheck(ctx, s, c) {
        const list = (squadData && squadData[ctx]) || [];
        let exp = 0; const miss = [];
        list.forEach(p => {
            const h = p.history && p.history[s]; if (!h) return;
            if (!PRESENT.includes(h[c + 'Type'])) return;
            exp++;
            if (!(parseInt(h[c + 'o']) > 0) || !(parseInt(h[c + 'a']) > 0)) miss.push(p.name || '?');
        });
        return { exp, miss };
    }
    // Panelden girilebilecek oyuncular: bu ölçümde kadroda görünenler + henüz hiçbir türü seçilmemiş aktif oyuncular
    function editable(ctx, s, c) {
        return ((squadData && squadData[ctx]) || []).filter(p => {
            if (p.isArchived && !(p.history && p.history[s] && PRESENT.includes(p.history[s][c + 'Type']))) return false;
            const t = p.history && p.history[s] && p.history[s][c + 'Type'];
            return PRESENT.includes(t) || (!t && !p.isArchived && !p.isPromoted);
        });
    }
    const ORDER = ['t1', 's1', 't2', 's2'];
    function prevVals(p, s, c) {
        const ss = seasonsList || []; let si = ss.indexOf(s), ci = ORDER.indexOf(c);
        while (si >= 0) {
            ci--; if (ci < 0) { si--; ci = 3; if (si < 0) break; }
            const h = p.history && p.history[ss[si]];
            if (h && (parseInt(h[ORDER[ci] + 'o']) > 0 || parseInt(h[ORDER[ci] + 'a']) > 0)) return { o: parseInt(h[ORDER[ci] + 'o']) || '', a: parseInt(h[ORDER[ci] + 'a']) || '' };
        }
        const o = parseInt(p.joinOvr) || '', a = parseInt(p.joinAge) || '';
        return si < 0 || (ss.indexOf(s) === 0) ? { o, a } : { o: '', a: '' };
    }
    const SNAP_KEYS = ['dev', 'dev_ac', 'fin', 'tables', 'others', 'euro'];
    const DOM = ['PL', 'CH', 'L1', 'L2'], EUC = [['UCL', 'UEFA Champions League'], ['UEL', 'UEFA Europa League'], ['UECL', 'UEFA Conference League']];
    function snapItems(s, c) {
        const out = itemsFor0(s, c).filter(o => ['dev', 'dev_ac', 'fin', 'birth', 'birth_milli', 'acadpot'].includes(o.key));
        const T = (window.gtTables[s] && window.gtTables[s][c]) || {};
        const dh = DOM.filter(k => T.domestic && T.domestic[k]).length;
        out.push({ key: 'tables', ai: 1, act: 'ai', view: 1, label: L('Domestic League Tables (PL, CH, L1, L2)', 'Domestic League Tables (PL, CH, L1, L2)'), state: dh === 4 ? 'ok' : 'wr', n: 4 - dh, sub: L(`${dh} / 4 lig girildi`, `${dh} / 4 leagues entered`) });
        const slots = typeof euroSlots === 'function' ? euroSlots(s) : [], oh = slots.filter(n => T.others && T.others[n]).length;
        if (slots.length) out.push({ key: 'others', ai: 1, act: 'ai', view: 1, label: L('Other leagues · ilk 6', 'Other leagues · first 6'), state: oh >= slots.length ? 'ok' : 'wr', n: slots.length - oh, sub: L(`${oh} / ${slots.length} lig girildi`, `${oh} / ${slots.length} leagues entered`) });
        const eh = EUC.filter(x => T.euro && T.euro[x[0]]).length;
        out.push({ key: 'euro', ai: 1, act: 'ai', view: 1, label: L('Champions, Europa, Conference League · güncel tablolar', 'Champions, Europa, Conference League · current tables'), state: eh === 3 ? 'ok' : 'wr', n: 3 - eh, sub: L(`${eh} / 3 turnuva girildi`, `${eh} / 3 competitions entered`) });
        out.forEach(o => { if (o.state === 'wr' && flagged(s, c, o.key)) { o.state = 'flag'; o.sub = L('Bu sezon yok olarak işaretli', 'Marked as none this season'); } });
        return out;
    }
    const B = ['dev', 'dev_ac', 'birth', 'birth_milli'];
    const LISTS = {
        t1: B.concat(['fin', 'acadpot', 'fixtures']),
        s1: B.concat(['fin', 'acadpot', 'tables', 'others', 'euro']),
        t2: B.concat(['acadpot', 'fin']),
        s2: B.concat(['acadpot', 'fin', 'others', 'tables', 'cups'])
    };
    function itemsFor(s, c) {
        const LST = LISTS[c];
        const out = (c === 's1' ? snapItems(s, c) : itemsFor0(s, c)).filter(o => LST.includes(o.key)).sort((a, b) => LST.indexOf(a.key) - LST.indexOf(b.key));
        out.forEach(o => { if (o.state === 'wr' && flagged(s, c, o.key)) { o.state = 'flag'; o.sub = L('Bu sezon yok olarak işaretli', 'Marked as none this season'); } });
        return out;
    }
    function itemsFor0(s, c) {
        const out = [];
        const sq = (key, ctx, tr, e, act) => {
            const r = squadCheck(ctx, s, c);
            const o = { key, label: L(tr, e), act, ai: 1 };
            o.ctx = ctx;
            if (!r.exp) { o.state = 'na'; o.sub = L('Bu ölçümde giriş yok', 'No entries for this checkpoint'); if (s === (seasonsList || [])[(seasonsList || []).length - 1] && editable(ctx, s, c).length) { o.state = 'wr'; o.n = 1; o.sub = L('Bu ölçüm için henüz giriş yok', 'Nothing entered for this checkpoint yet'); o.pending = 1; } }
            else if (r.miss.length) { o.state = 'wr'; o.n = r.miss.length; o.sub = L(`${r.miss.length} oyuncunun OVR/yaşı eksik`, `${r.miss.length} players missing OVR/age`) + ' · ' + r.miss.slice(0, 3).join(', ') + (r.miss.length > 3 ? '…' : ''); }
            else { o.state = 'ok'; o.sub = L(`${r.exp} / ${r.exp} oyuncu girildi`, `${r.exp} / ${r.exp} players entered`); }
            out.push(o);
        };
        const PH = c;
        sq('squad', 'astakim', 'Kadro OVR ve yaş', 'Squad OVR and age', 'inline');
        sq('academy', 'akademi', 'Akademi oyuncuları', 'Academy players', 'inline');
        if (c === 't1' || c === 's2') sq('milli', 'milli', 'Milli takım OVR ve yaş', 'National team OVR and age', 'inline');
        if (PH) [['dev', 'astakim', 'Development Plans · Kadro', 'Development Plans · First team'], ['dev_ac', 'akademi', 'Development Plans · Akademi', 'Development Plans · Academy']].forEach(([key, ctx, tr, e]) => {
            const lst = editable(ctx, s, c), have = lst.filter(p => p.attrs && p.attrs[s + '|' + PH]).length, o = { key, ctx, ai: 1, act: 'dev', label: L(tr, e), ph: PH };
            if (!lst.length) return;
            o.state = have >= lst.length ? 'ok' : 'wr'; o.n = lst.length - have;
            o.sub = have >= lst.length ? L(`${have} / ${lst.length} oyuncunun özellikleri girildi`, `${have} / ${lst.length} players have attributes`) : L(`${lst.length - have} oyuncunun özellikleri eksik`, `${lst.length - have} players missing attributes`);
            out.push(o);
        });
        if (c === 't1' || c === 's1' || c === 't2' || c === 's2') {
            const lst = editable('astakim', s, c), have = lst.filter(p => p.fin && p.fin[s + '|' + c] && p.fin[s + '|' + c].value).length;
            if (lst.length) out.push({ key: 'fin', ai: 1, act: 'ai', label: L('Squad Hub - Financial · First team', 'Squad Hub - Financial · First team'), state: have >= lst.length ? 'ok' : 'wr', n: lst.length - have, sub: have >= lst.length ? L(`${have} / ${lst.length} oyuncu girildi`, `${have} / ${lst.length} players entered`) : L(`${lst.length - have} oyuncunun değeri/maaşı eksik`, `${lst.length - have} players missing value/wage`) });
        }
        {
            if (c === 't1') {
            const fxl = (fixtureData && fixtureData[s]) || [], mt = (typeof managedTeams !== 'undefined' && managedTeams) || {};
            const cnt = nmT => nmT ? fxl.filter(m => (typeof homeSameTeam === 'function' ? (homeSameTeam(m.home, nmT) || homeSameTeam(m.away, nmT)) : (norm(m.home) === norm(nmT) || norm(m.away) === norm(nmT)))).length : null;
            const nk = cnt(mt.kulup && mt.kulup.name), nmi = cnt(mt.milli && mt.milli.name), fxOk = (nk === null ? fxl.length > 0 : nk > 0) && (nmi === null || nmi > 0);
            out.push({ key: 'fixtures', label: L('Seasonal Fixtures · Kulüp ve Milli Takım', 'Seasonal Fixtures · Club and National Team'), act: 'fxbulk', state: fxOk ? 'ok' : 'wr', n: fxOk ? 0 : 1, sub: L(`Kulüp: ${nk === null ? fxl.length : nk} maç`, `Club: ${nk === null ? fxl.length : nk} matches`) + (nmi === null ? '' : L(` · Milli takım: ${nmi} maç`, ` · National: ${nmi} matches`)) });
            }
            [['birth', 'astakim', 'Birth dates · First team'], ['birth_milli', 'milli', 'Birth dates · National team']].forEach(([key, ctx, lab]) => {
                const all = ((squadData && squadData[ctx]) || []).filter(p => !p.isArchived && !p.isPromoted), nb = all.filter(p => !p.birthDate);
                if (all.length) out.push({ key, ctx, act: 'birthopen', label: lab, state: nb.length ? 'wr' : 'ok', n: nb.length, sub: nb.length ? L(`${nb.length} oyuncunun doğum tarihi yok`, `${nb.length} players without a birth date`) : L(`${all.length} / ${all.length} oyuncu girildi`, `${all.length} / ${all.length} players entered`) });
            });
        }
        {
            const lst = editable('akademi', s, c), have = lst.filter(p => parseInt(((p.history || {})[s] || {})[c + '_acadPot'])).length;
            if (lst.length) out.push({ key: 'acadpot', ctx: 'akademi', label: L('Akademi potansiyeli', 'Academy Potential'), act: 'ai', ai: 1, state: have >= lst.length ? 'ok' : 'wr', n: lst.length - have, sub: have >= lst.length ? L(`${have} / ${lst.length} oyuncunun potansiyeli girildi`, `${have} / ${lst.length} players have potential`) : L(`${lst.length - have} oyuncunun potansiyeli eksik`, `${lst.length - have} players missing potential`) });
        }
        if (c === 's2') {
            const slots = typeof euroSlots === 'function' ? euroSlots(s) : [], ed = (euroLeaguesData && euroLeaguesData[s]) || {}, have = slots.filter(n => ed[n] && ed[n][0] && ed[n][0].name).length;
            if (slots.length) out.push({ key: 'others', ai: 1, act: 'ai', label: L('Diğer ligler (ilk 6)', 'Other leagues (top 6)'), state: have >= slots.length ? 'ok' : 'wr', n: slots.length - have, sub: L(`${have} / ${slots.length} lig girildi`, `${have} / ${slots.length} leagues entered`) });
            const ex = topExpected(s), tp = window.gtTopPlayers[s] || {}, th = ex.filter(t => tp[t]).length;
            if (ex.length) out.push({ key: 'top', ai: 1, act: 'ai', label: L('Gol ve asist krallıkları', 'Top scorers and assisters'), state: th >= ex.length ? 'ok' : 'wr', n: ex.length - th, sub: L(`${th} / ${ex.length} turnuva girildi`, `${th} / ${ex.length} tournaments entered`) });
        }
        if (c === 't1' || c === 't2') {
            const n = ((transferData && transferData.in) || []).concat((transferData && transferData.out) || []).filter(t => t.season === s).length;
            out.push({ key: 'transfer', ai: 1, label: L('Transferler', 'Transfers'), act: 'transfer', state: n ? 'ok' : 'wr', n: n ? 0 : 1, sub: n ? L(`${n} kayıt (sezon geneli)`, `${n} records (whole season)`) : L('Bu sezon için transfer kaydı yok', 'No transfers recorded this season') });
        }
        if (c === 's2') {
            const fx = (fixtureData && fixtureData[s]) || [];
            const nos = fx.filter(m => m.homeScore === undefined || m.homeScore === null || m.homeScore === '' || m.awayScore === undefined || m.awayScore === null || m.awayScore === '').length;
            out.push({ key: 'scores', label: L('Maç skorları ve gol/asist', 'Match scores and goals/assists'), act: 'fixture', state: !fx.length ? 'na' : nos ? 'wr' : 'ok', n: nos, sub: !fx.length ? L('Bu sezonda maç yok', 'No matches this season') : nos ? L(`${nos} maçın skoru girilmedi`, `${nos} matches without a score`) : L(`${fx.length} maçın tamamı girildi`, `All ${fx.length} matches entered`) });
            const have = pyramidData && pyramidData[s] ? ['PL', 'CH', 'L1', 'L2'].filter(k => (pyramidData[s][k] || []).length).length : 0;
            out.push({ key: 'tables', ai: 1, label: L('Lig tabloları', 'League tables'), act: 'tables', state: have === 4 ? 'ok' : 'wr', n: have === 4 ? 0 : 1, sub: have === 4 ? L('4 / 4 lig girildi', '4 / 4 leagues entered') : L(`${have} / 4 lig girildi`, `${have} / 4 leagues entered`) });
            const tc = (typeof trophyData !== 'undefined' && trophyData && trophyData[s]) ? Object.keys(trophyData[s]).length : 0;
            out.push({ key: 'cups', ai: 1, label: L('Kupa ve turnuva sonuçları', 'Cups and tournament results'), act: 'ai', state: tc ? 'ok' : 'wr', n: tc ? 0 : 1, sub: tc ? L(`${tc} turnuva girildi`, `${tc} tournaments entered`) : L('Henüz girilmedi', 'Not entered yet') });
        }
        out.forEach(o => { if (o.state === 'wr' && flagged(s, c, o.key)) { o.state = 'flag'; o.sub = L('Bu sezon yok olarak işaretli', 'Marked as none this season'); } });
        return out;
    }
    function topExpected(s) {
        const set = [];
        ((fixtureData && fixtureData[s]) || []).forEach(m => { const t = m.tournament; if (t && !set.includes(t) && !/friend|hazırlık|hazirlik/i.test(t)) set.push(t); });
        (typeof euroSlots === 'function' ? euroSlots(s) : []).forEach(t => { if (!set.includes(t)) set.push(t); });
        return set;
    }
    function summary(s, c) {
        const it = itemsFor(s, c).filter(x => x.state !== 'na');
        if (!it.length) return { pct: null, miss: 0, it };
        const done = it.filter(x => x.state === 'ok' || x.state === 'flag').length;
        return { pct: Math.round(100 * done / it.length), miss: it.length - done, it };
    }
    function pendingCount() {
        const s = (seasonsList || [])[(seasonsList || []).length - 1]; if (!s) return 0;
        return CPS.reduce((a, cp) => a + summary(s, cp[0]).miss, 0);
    }

    // ---- ekran ----
    function cpLabel(c) { const x = CPS.find(v => v[0] === c); return en() ? x[3] : x[1]; }
    function render() {
        const ov = document.getElementById('gte-ov'); if (!ov) return;
        const seasons = (seasonsList || []).slice().reverse();
        if (!sel.s || !seasons.includes(sel.s)) sel.s = seasons[0];
        const head = CPS.map(cp => `<th>${E(en() ? cp[3] : cp[1])}<small>${E(en() ? cp[4] : cp[2])}</small></th>`).join('');
        const rows = seasons.map(s => `<tr><th class="gte-sn">${E(s)}</th>${CPS.map(cp => {
            const r = summary(s, cp[0]);
            const cls = r.pct === null ? 'c' : r.miss ? 'b' : 'a';
            const on = sel.s === s && sel.c === cp[0] ? ' on' : '';
            const txt = r.pct === null ? '—' : r.miss ? `${r.pct}%<small>${L(r.miss + ' eksik', r.miss + ' missing')}</small>` : '100%';
            return `<td><button class="gte-cell ${cls}${on}" onclick="gtEntrySel('${E(s)}','${cp[0]}')">${txt}</button></td>`;
        }).join('')}</tr>`).join('');
        const r = summary(sel.s, sel.c);
        const act = (a, k, ctx) => a === 'birthopen' ? `<button class="gte-btn g" onclick="gtEntryBirth('${ctx}')">${L('Gir', 'Enter')}</button>` : ['ai', 'dev'].includes(a) ? `<button class="gte-btn g" onclick="gtEntryAi('${k}')">${aiKey === k ? L('Kapat', 'Close') : L('Gir', 'Enter')}</button>` : a === 'inline' ? `<button class="gte-btn g" onclick="gtEntryOpenItem('${k}')">${openKey === k ? L('Kapat', 'Close') : L('Gir', 'Enter')}</button>` : `<button class="gte-btn g" onclick="gtEntryGo('${a}')">${L('Doldur', 'Fill in')}</button>`;
        const list = r.it.length ? r.it.map(o => {
            const dot = o.state === 'ok' ? 'ok' : o.state === 'flag' ? 'no' : 'wr';
            const right = o.state === 'ok' ? `<span class="gte-pill ok">${L('Tamam', 'Done')}</span>`
                : o.state === 'flag' ? `<button class="gte-btn" onclick="gtEntryFlag('${o.key}')">${L('Geri al', 'Undo')}</button>`
                    : `${act(o.act, o.key, o.ctx)}<button class="gte-btn" onclick="gtEntryFlag('${o.key}')" title="${E(L('Eksik sayma', 'Do not count as missing'))}">${L('Bu sezon yok', 'None')}</button>`;
            const okInline = o.act === 'inline' && o.state !== 'flag';
            const aib = o.ai ? `<button class="gte-btn ai${aiKey === o.key ? ' on' : ''}" onclick="gtEntryAi('${o.key}')" title="${E(L('Ekran görüntüsünden yapay zeka ile aktar', 'Import from screenshots with AI'))}"><i class="fa-solid fa-wand-magic-sparkles"></i> ${o.noprompt ? L('Toplu', 'Bulk') : L('YZ', 'AI')}</button>` : '';
            const vw = o.view && o.state !== 'wr' || (o.view && ((window.gtTables[sel.s] || {})[sel.c] || {})[SNAPK[o.key]]) ? `<button class="gte-btn" onclick="gtEntryView('${o.key}')"><i class="fa-solid fa-table"></i></button>` : '';
            const tog = okInline && o.state === 'ok' ? `<button class="gte-btn" onclick="gtEntryOpenItem('${o.key}')">${openKey === o.key ? L('Kapat', 'Close') : L('Düzenle', 'Edit')}</button>` : '';
            return `<div class="gte-row"><span class="gte-dot ${dot}">●</span><div class="gte-grow"><div>${E(o.label)}</div><div class="gte-sub">${E(o.sub)}</div></div><div class="gte-act">${right}${tog}${vw}${aib}</div></div>${aiKey === o.key ? aiHtml(o) : ''}${okInline && openKey === o.key ? editorHtml(o) : ''}`;
        }).join('') : `<div class="gte-sub" style="padding:10px 2px">${L('Bu ölçüm için henüz kayıt yok. Kadro tablosundan veya toplu düzenleme ekranından ilk girişi yap.', 'No records for this checkpoint yet.')}</div>`;
        ov.querySelector('.gte-body').innerHTML = `
            <div class="gte-sub" style="margin:0 2px 8px">${L('Bir hücreye tıklayınca o ölçümün kontrol listesi açılır.', 'Click a cell to open that checkpoint\'s checklist.')}</div>
            <table class="gte-mx"><tr><th></th>${head}</tr>${rows}</table>
            <div class="gte-h">${E(sel.s)} · ${E(cpLabel(sel.c))} <span class="gte-sub">${E((CPS.find(v => v[0] === sel.c) || [])[en() ? 4 : 2] || '')}</span></div>
            ${list}`;
    }
    function editorHtml(o) {
        const list = editable(o.ctx, sel.s, sel.c);
        if (!list.length) return '';
        const rows = list.map(p => {
            const h = (p.history && p.history[sel.s]) || {}, pv = prevVals(p, sel.s, sel.c);
            const ov = parseInt(h[sel.c + 'o']) || '', ag = parseInt(h[sel.c + 'a']) || '';
            const bad = !ov || !ag;
            return `<div class="gte-pr${bad ? ' bad' : ''}" data-id="${E(p.id)}"><span class="gte-pn" title="${E(p.name)}">${E(p.name)}</span><span class="gte-pp">${E(p.pos || '')}</span><input class="gte-in" inputmode="numeric" data-f="a" value="${ag}" placeholder="${pv.a}" aria-label="${E(L('Yaş', 'Age'))}" onchange="gtEntrySet('${o.ctx}','${E(p.id)}','a',this)" onkeydown="gtEntryKey(event,this)"><input class="gte-in" inputmode="numeric" data-f="o" value="${ov}" placeholder="${pv.o}" aria-label="OVR" onchange="gtEntrySet('${o.ctx}','${E(p.id)}','o',this)" onkeydown="gtEntryKey(event,this)"></div>`;
        }).join('');
        return `<div class="gte-ed"><div class="gte-eh"><span>${L('Oyuncu', 'Player')}</span><span></span><span>${L('Yaş', 'Age')}</span><span>OVR</span></div>${rows}<div class="gte-ef"><span class="gte-sub">${L('Soluk rakamlar önceki ölçümdür. Enter alttaki alana geçer.', 'Faded numbers are the previous checkpoint. Enter moves down.')}</span><button class="gte-btn" onclick="gtEntryCopyPrev('${o.ctx}')">${L('Boşları önceki ölçümle doldur', 'Fill blanks from previous')}</button></div></div>`;
    }
    function setVal(ctx, id, f, v) {
        const p = ((squadData && squadData[ctx]) || []).find(x => x.id === id); if (!p) return;
        p.history = p.history || {}; const h = p.history[sel.s] = p.history[sel.s] || {};
        const n = parseInt(v);
        if (n > 0) { h[sel.c + f] = n; if (!PRESENT.includes(h[sel.c + 'Type'])) h[sel.c + 'Type'] = 'continue'; }
        else delete h[sel.c + f];
    }
    window.gtEntrySet = (ctx, id, f, el) => {
        setVal(ctx, id, f, el.value);
        try { saveToLocalStorage(); } catch (e) {}
        const row = el.closest('.gte-pr'); if (row) row.classList.toggle('bad', !(parseInt(row.querySelector('[data-f=o]').value) > 0) || !(parseInt(row.querySelector('[data-f=a]').value) > 0));
        refreshTop();
    };
    window.gtEntryKey = (e, el) => {
        if (e.key !== 'Enter') return; e.preventDefault();
        const all = [...document.querySelectorAll('.gte-ed .gte-in')]; const i = all.indexOf(el);
        const f = el.dataset.f; const nxt = all.slice(i + 1).find(x => x.dataset.f === f) || all[i + 1];
        el.blur(); if (nxt) { nxt.focus(); nxt.select(); }
    };
    window.gtEntryCopyPrev = ctx => {
        editable(ctx, sel.s, sel.c).forEach(p => {
            const h = (p.history && p.history[sel.s]) || {}, pv = prevVals(p, sel.s, sel.c);
            if (!(parseInt(h[sel.c + 'o']) > 0) && pv.o) setVal(ctx, p.id, 'o', pv.o);
            if (!(parseInt(h[sel.c + 'a']) > 0) && pv.a) setVal(ctx, p.id, 'a', pv.a);
        });
        try { saveToLocalStorage(); } catch (e) {}
        render();
    };
    window.gtEntryOpenItem = k => { openKey = openKey === k ? null : k; render(); };
    // yazarken odak kaybolmasın: sadece matris ve satır özetlerini tazele
    function refreshTop() {
        const keep = openKey, ae = document.activeElement, id = ae && ae.closest && ae.closest('.gte-pr') && ae.closest('.gte-pr').dataset.id, f = ae && ae.dataset && ae.dataset.f;
        const sc = document.querySelector('.gte-body') ? document.querySelector('.gte-body').scrollTop : 0;
        render(); openKey = keep;
        const b = document.querySelector('.gte-body'); if (b) b.scrollTop = sc;
        if (id) { const n = document.querySelector(`.gte-pr[data-id="${id}"] [data-f=${f}]`); if (n) n.focus(); }
    }

    // ================= YAPAY ZEKA İLE İÇE AKTARMA =================
    const norm = x => String(x || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const POS = 'GK, CB, LB, RB, DM, CM, AM, LM, RM, LW, RW, ST';
    let unmatched = [];
    function findPlayer(list, name) {
        const n = norm(name); if (!n) return null;
        const al = window.gtNameAlias[n]; if (al) { const ap = list.find(x => x.id === al); if (ap) return ap; }
        const hit = findPlayer0(list, n); if (!hit && !unmatched.some(u => u.n === n)) unmatched.push({ n, name: String(name || '').trim(), list });
        return hit;
    }
    function findPlayer0(list, name) {
        const n = norm(name); if (!n) return null;
        let m = list.filter(p => norm(p.name) === n); if (m.length === 1) return m[0];
        const last = n.split(' ').pop();
        m = list.filter(p => norm(p.name).split(' ').pop() === last && (n.split(' ').length === 1 || norm(p.name).split(' ')[0].charAt(0) === n.charAt(0))); if (m.length === 1) return m[0];
        m = list.filter(p => norm(p.name).includes(n) || n.includes(norm(p.name))); if (m.length === 1) return m[0];
        return null;
    }
    const SNAPK = { tables: 'domestic', others: 'others', euro: 'euro' };
    const WANT = { squad: 'squad', academy: 'academy', milli: 'national', tables: 'league_tables', transfer: 'transfers', fin: 'finance', acadpot: 'academy_pot', others: 'other_leagues', cups: 'cup_results', top: 'top_players', birth: 'birth_dates', birth_milli: 'birth_dates' };
    function snapPrompt(o, head) {
        const kind = SNAPK[o.key];
        const row = '{ "team": "Takım", "p": 17, "w": 10, "d": 4, "l": 3, "gf": 30, "ga": 15, "pts": 34 }';
        if (kind === 'domestic') return `${head('Ekteki EA FC 26 kariyer modu ekran görüntülerinden Premier League, Championship, League One ve League Two güncel puan tablolarını oku.')}\n- Her lig için tüm takımları 1. sıradan başlayarak yaz. p: oynanan, w/d/l: galibiyet/beraberlik/mağlubiyet, gf/ga: atılan/yenilen gol, pts: puan. Okuyamadığın sayıyı yazma, sadece takım ve pts zorunlu.\n- Ekranda görmediğin ligi çıkar. Lig anahtarları: PL, CH, L1, L2.\n\nBeklenen biçim (örnek):\n{\n  "type": "snapshot_tables",\n  "kind": "domestic",\n  "season": "${sel.s}",\n  "checkpoint": "s1",\n  "leagues": { "PL": [ ${row}, "..." ], "CH": [ "..." ], "L1": [ "..." ], "L2": [ "..." ] }\n}`;
        if (kind === 'others') { const sl = typeof euroSlots === 'function' ? euroSlots(sel.s) : []; return `${head('Ekteki EA FC 26 kariyer modu ekran görüntülerinden diğer liglerin güncel puan tablosunda ilk 6 takımı oku.')}\n- Her lig için tam 6 takım, 1. sıradan başlayarak. p: oynanan (varsa), pts: puan.\n- Lig adlarını listedeki gibi yaz. Görmediğin ligi çıkar.\n\nBeklenen biçim (örnek):\n{\n  "type": "snapshot_tables",\n  "kind": "others",\n  "season": "${sel.s}",\n  "checkpoint": "s1",\n  "leagues": { "${sl[0] || 'La Liga'}": [ { "team": "Takım", "p": 17, "pts": 40 }, "...6 takım" ] }\n}\n\nLig listesi: ${sl.join('; ')}`; }
        return `${head('Ekteki EA FC 26 kariyer modu ekran görüntülerinden UEFA Champions League, Europa League ve Conference League güncel tablolarını oku (lig aşaması).')}\n- Her turnuva için tüm takımları 1. sıradan başlayarak yaz. Alanlar: team, p, w, d, l, gf, ga, pts (team ve pts zorunlu).\n- Anahtarlar: UCL, UEL, UECL. Görmediğin turnuvayı çıkar.\n\nBeklenen biçim (örnek):\n{\n  "type": "snapshot_tables",\n  "kind": "euro",\n  "season": "${sel.s}",\n  "checkpoint": "s1",\n  "leagues": { "UCL": [ ${row}, "..." ], "UEL": [ "..." ], "UECL": [ "..." ] }\n}`;
    }
    function aiPrompt(o) {
        const cp = CPS.find(v => v[0] === sel.c), when = `${cp[1]} (${cp[2]})`;
        const head = (g) => `Görev: ${g}\nSezon: ${sel.s} · Ölçüm: ${when}\n\nKurallar:\n- Yalnızca aşağıdaki biçimde TEK bir JSON döndür. Başka açıklama, yorum veya metin yazma.\n- Okuyamadığın veya emin olmadığın değeri tahmin etme, o kaydı çıkar.\n- Sayıları tam sayı olarak yaz, tırnak içine alma.`;
        if (sel.c === 's1' && SNAPK[o.key]) return snapPrompt(o, head);
        const nm = ctx => ((squadData && squadData[ctx]) || []).filter(p => !p.isArchived).map(p => p.name).filter(Boolean);
        if (o.key === 'dev' || o.key === 'dev_ac') {
            const names = nm(o.ctx), phase = o.ph;
            const m = ATTR_OUT.map(g => `"${g.k}": 0`).join(', '), a = ATTR_OUT.reduce((x, g) => x.concat(g.a.map(y => `"${y[0]}": 0`)), []).join(', '), ga = ATTR_GK.reduce((x, g) => x.concat(g.a.map(y => `"${y[0]}": 0`)), []).join(', ');
            return `${head('Ekteki EA FC 26 kariyer modu "Development Plans" ekranlarından oyuncuların genel değerini ve özelliklerini oku. Her oyuncu için ayrı ekran olabilir.')}\n- name: oyuncunun adı; aşağıdaki kadro listesindeki yazımla birebir kullan (ekranda çoğu zaman sadece soyadı yazar).\n- ovr: ekranda büyük görünen genel değer. age: ekranda yoksa null yaz.\n- pos: mevki kodu, role: oyuncu rolü (ör. Inside Forward), sm: teknik hareket yıldızı (1-5), wf: zayıf ayak yıldızı (1-5), foot: "R" veya "L".\n- m: 6 ana özellik (pac, sho, pas, dri, def, phy). a: alt özellikler (aşağıdaki anahtarlarla). Kaleciler için kaleci anahtarlarını kullan. Göremediğin özelliği yazma.\n\nBeklenen biçim (örnek, tek oyuncu için):\n${JSON.stringify({ gt: 'attrs', v: 1, season: sel.s, phase, ctx: o.ctx, players: [{ name: names[0] || 'Oyuncu Adı', pos: 'LM', role: 'Inside Forward', age: null, ovr: 58, sm: 3, wf: 4, foot: 'R', m: { pac: 71, sho: 46, pas: 52, dri: 59, def: 35, phy: 52 }, a: { acc: 67, spr: 75, fin: 43 } }] }, null, 2)}\n\nAlt özellik anahtarları (oyuncular): ${a}\nKaleci alt özellik anahtarları: ${ga}\n\nKadro listesi:\n${names.join('; ')}`;
        }
        if (o.key === 'cups') {
            const ts = cupList().map(t => t.name);
            return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan bu sezon bitmiş kupa ve turnuvaların şampiyon ve finalisti (ikinci) takımını oku.')}\n- tournament: aşağıdaki listedeki ada birebir uy.\n- champion ve runnerUp: takım adı; bilmiyorsan runnerUp null.\n- Yalnızca ekranda sonucu görünen turnuvaları yaz, tahmin etme.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'cup_results', season: sel.s, results: [{ tournament: ts[0] || 'Turnuva Adı', champion: 'Takım A', runnerUp: 'Takım B' }] }, null, 2)}\n\nTurnuva listesi:\n${ts.join('; ')}`;
        }
        if (o.key === 'acadpot') {
            const names = nm('akademi');
            return `${head('Ekteki EA FC 26 kariyer modu "Youth Squad" (akademi) ekran görüntüleri/videosundan akademi oyuncularının potansiyelini (POT) oku.')}\n- name: aşağıdaki akademi listesindeki yazımla birebir (ekranda çoğu zaman "P. Xhoma" gibi kısaltılmış yazar, listedeki tam adı kullan).\n- pot: POT sütunu veya oyuncu detayındaki "Potential" aralığının ÜST değeri (örn. "55 - 84" veya "79-94" için 84 ve 94). Tek sayı yazıyorsa onu kullan.\n- potMin: aralığın alt değeri, yoksa null.\n- ovr ve age: ekranda görünüyorsa yaz, yoksa null.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'academy_pot', season: sel.s, checkpoint: sel.c, players: [{ name: names[0] || 'Oyuncu Adı', pot: 84, potMin: 55, ovr: 55, age: 16 }, { name: names[1] || 'Diğer Oyuncu', pot: 94, potMin: 79, ovr: 47, age: 14 }] }, null, 2)}\n\nAkademi listesi:\n${names.join('; ')}`;
        }
        if (o.key === 'fin') { const names = nm('astakim'); return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan kadro oyuncularının piyasa değerini, maaşını ve sözleşme bilgisini oku.')}\n- name: aşağıdaki kadro listesindeki yazımla birebir.\n- value: piyasa değeri, euro cinsinden tam sayı (örn. 2,5 milyon € için 2500000).\n- wage: maaş, euro cinsinden tam sayı. wagePer: ekranda hangi periyotta yazıyorsa "week" veya "year".\n- until: sözleşme bitiş yılı (örn. 2028), yoksa null. clause: serbest kalma bedeli (euro) yoksa null.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'finance', season: sel.s, checkpoint: sel.c, players: [{ name: names[0] || 'Oyuncu Adı', value: 2500000, wage: 18000, wagePer: 'week', until: 2028, clause: null }] }, null, 2)}\n\nKadro listesi:\n${names.join('; ')}`; }
        if (o.key === 'others') { const sl = typeof euroSlots === 'function' ? euroSlots(sel.s) : []; return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan diğer liglerin puan tablosunda ilk 6 takımı (sıra ve puan) oku.')}\n- Her lig için tam 6 takım yaz, 1. sıradan başlayarak. pts: puan (tam sayı).\n- Lig adlarını aşağıdaki listedeki gibi yaz. Görmediğin ligi çıkar.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'other_leagues', season: sel.s, leagues: { [sl[0] || 'La Liga']: [{ name: 'Takım 1', pts: 78 }, { name: 'Takım 2', pts: 74 }, '...6 takım'] } }, null, 2)}\n\nLig listesi: ${sl.join('; ')}`; }
        if (o.key === 'top') { const ex = topExpected(sel.s); return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan her turnuvanın en çok gol atan ve en çok asist yapan birer oyuncusunu oku.')}\n- tournament: aşağıdaki listedeki ad ile birebir. Görmediğin turnuvayı çıkar. Gol veya asistten birini göremediysen o alanı null yaz.\n- team: oyuncunun takımı.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'top_players', season: sel.s, tournaments: [{ tournament: ex[0] || 'Turnuva Adı', topScorer: { name: 'Oyuncu', team: 'Takım', goals: 21 }, topAssist: { name: 'Oyuncu', team: 'Takım', assists: 14 } }] }, null, 2)}\n\nTurnuva listesi: ${ex.join('; ')}`; }
        if (o.key === 'squad' || o.key === 'academy' || o.key === 'milli') {
            const ac = o.key === 'academy', ml = o.key === 'milli', names = nm(ml ? 'milli' : ac ? 'akademi' : 'astakim');
            return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan ' + (ml ? 'milli takım' : ac ? 'akademi' : 'kadro') + ' oyuncularının yaşını ve genel (OVR) değerini oku.')}\n- Oyuncu adlarını aşağıdaki kadro listesindeki yazımla birebir kullan. Listede olmayan bir oyuncu görürsen okuduğun adı yaz.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: ml ? 'national' : ac ? 'academy' : 'squad', season: sel.s, checkpoint: sel.c, players: [{ name: names[0] || 'Oyuncu Adı', age: 24, ovr: 78 }, { name: names[1] || 'Diğer Oyuncu', age: 31, ovr: 81 }] }, null, 2)}\n\nKadro listesi:\n${names.join('; ')}`;
        }
        if (o.key === 'tables') return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan lig puan tablolarını oku. Her lig için takımları 1. sıradan sonuncuya doğru sırayla yaz.')}\n- Takım adlarını oyunda göründüğü gibi (resmi, kısaltmasız) yaz.\n- Ekranda görmediğin ligi "leagues" içine koyma.\n- Lig anahtarları: PL = Premier League, CH = Championship, L1 = League One, L2 = League Two.\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'league_tables', season: sel.s, leagues: { PL: ['Takım 1', 'Takım 2', '...'], CH: ['Takım 1', 'Takım 2', '...'], L1: ['Takım 1', 'Takım 2', '...'], L2: ['Takım 1', 'Takım 2', '...'] } }, null, 2)}`;
        if (o.key === 'transfer') return `${head('Ekteki EA FC 26 kariyer modu ekran görüntüleri/videosundan kendi takımımın yaptığı transferleri oku (gelenler ve gidenler).')}\n- direction: "in" (gelen) veya "out" (giden).\n- kind: "sale" (satış/alım), "loan" (kiralık) veya "free" (bedelsiz).\n- fee: euro cinsinden tam sayı (örn. 1,65 milyon € için 1650000). Bedelsiz veya kiralık ise 0.\n- pos: ${POS} değerlerinden biri.\n- team: karşı takımın adı (gelen oyuncunun geldiği, giden oyuncunun gittiği takım).\n\nBeklenen biçim (örnek):\n${JSON.stringify({ type: 'transfers', season: sel.s, transfers: [{ direction: 'in', name: 'Oyuncu Adı', pos: 'CM', age: 24, ovr: 72, team: 'Eski Takım', fee: 350000, kind: 'sale' }, { direction: 'out', name: 'Diğer Oyuncu', pos: 'ST', age: 29, ovr: 70, team: 'Yeni Takım', fee: 0, kind: 'free' }] }, null, 2)}`;
        return '';
    }
    function parseAi(txt) {
        let t = String(txt || '').trim().replace(/^```[a-z]*\s*/i, '').replace(/```\s*$/, '');
        const i = t.indexOf('{'), j = t.lastIndexOf('}'); if (i < 0 || j <= i) throw new Error(L('JSON bulunamadı. Yapay zekanın cevabını olduğu gibi yapıştır.', 'No JSON found.'));
        return JSON.parse(t.slice(i, j + 1));
    }
    function prevPot(p, s, c) {
        const ss = seasonsList || []; let si = ss.indexOf(s), ci = ORDER.indexOf(c);
        while (si >= 0) { ci--; if (ci < 0) { si--; ci = 3; if (si < 0) break; } const h = p.history && p.history[ss[si]]; const v = h && parseInt(h[ORDER[ci] + '_acadPot']); if (v > 0) return v; }
        return 0;
    }
    function prevFin(p, s, c) {
        const ss = seasonsList || []; let si = ss.indexOf(s), ci = ORDER.indexOf(c);
        while (si >= 0) { ci--; if (ci < 0) { si--; ci = 3; if (si < 0) break; } const f = p.fin && p.fin[ss[si] + '|' + ORDER[ci]]; if (f && (f.value || f.wage)) return f; }
        return null;
    }
    function cupList() { return (tournamentsList || []).filter(t => t && t.name && !/^lg_/.test(String(t.id))); }
    const okOvr = v => Number.isInteger(v) && v >= 1 && v <= 99, okAge = v => Number.isInteger(v) && v >= 14 && v <= 50;
    function buildPrev(o, d) {
        const warn = [], rows = [], skip = [];
        const want = sel.c === 's1' && SNAPK[o.key] ? 'snapshot' : WANT[o.key];
        if (want !== 'snapshot' && !o.noprompt && d.type !== want) throw new Error(L(`Bu satır için "${want}" türünde veri bekleniyordu.`, `Expected type "${want}".`));
        if (d.season && d.season !== sel.s) warn.push(L(`JSON'daki sezon (${d.season}) seçili sezondan (${sel.s}) farklı. Seçili sezona işlenecek.`, `JSON season differs from selected.`));
        if ((want === 'squad' || want === 'academy' || want === 'national' || want === 'finance') && d.checkpoint && d.checkpoint !== sel.c) warn.push(L(`JSON'daki ölçüm (${d.checkpoint}) seçili ölçümden (${sel.c}) farklı. Seçili ölçüme işlenecek.`, `JSON checkpoint differs.`));
        const money = v => '€' + Number(v || 0).toLocaleString('tr-TR');
        if (want === 'snapshot') {
            const kind = SNAPK[o.key]; if (d.type !== 'snapshot_tables' || d.kind !== kind) throw new Error(L(`Bu satır için "snapshot_tables" / kind "${kind}" bekleniyordu.`, 'Wrong data type.'));
            const known = kind === 'domestic' ? DOM : kind === 'euro' ? EUC.map(x => x[0]) : (typeof EURO_LEAGUES_LIST !== 'undefined' ? EURO_LEAGUES_LIST.map(l => l.name) : []).concat(typeof euroSlots === 'function' ? euroSlots(sel.s) : []);
            const exp = { PL: 20, CH: 24, L1: 24, L2: 24, UCL: 36, UEL: 36, UECL: 36 };
            Object.keys(d.leagues || {}).forEach(k => {
                const key = known.find(x => norm(x) === norm(k)); if (!key) { skip.push(`${k} · ${L('bilinmeyen ad', 'unknown name')}`); return; }
                let t = (d.leagues[k] || []).filter(x => x && x.team && Number.isFinite(Number(x.pts))).map(x => { const r = { team: String(x.team).trim(), pts: Math.round(Number(x.pts)) }; ['p', 'w', 'd', 'l', 'gf', 'ga'].forEach(f => { if (Number.isFinite(Number(x[f])) && x[f] !== null && x[f] !== '') r[f] = Math.round(Number(x[f])); }); return r; });
                if (kind === 'others') t = t.slice(0, 6);
                if (!t.length) return;
                if (exp[key] && t.length !== exp[key]) warn.push(`${key}: ${t.length} ${L('takım var,', 'teams,')} ${exp[key]} ${L('bekleniyordu.', 'expected.')}`);
                if (kind === 'others' && t.length < 6) warn.push(`${key}: ${t.length} / 6`);
                if (t.length - new Set(t.map(x => norm(x.team))).size) warn.push(`${key}: ${L('tekrar eden takım adı var.', 'duplicate team names.')}`);
                for (let i = 1; i < t.length; i++) if (t[i].pts > t[i - 1].pts) { warn.push(`${key}: ${L('puanlar sıralı değil, sıra kontrol et.', 'points are not in order.')}`); break; }
                rows.push({ key, t, txt: key, chg: `${t.length} ${L('takım', 'teams')} · ${t[0].team} ${t[0].pts}` });
            });
            if (!rows.length && !skip.length) throw new Error(L('Hiç tablo bulunamadı.', 'No tables found.'));
        } else if (want === 'academy_pot') {
            const list = ((squadData && squadData.akademi) || []).filter(p => !p.isArchived && !p.isPromoted), seen = new Set();
            (d.players || []).forEach(x => {
                const p = findPlayer(list, x.name), pot = Math.round(Number(x.pot));
                if (!p) { skip.push(`${x.name || '?'} · ${L('akademide eşleşmedi', 'no match in academy')}`); return; }
                if (!Number.isFinite(pot) || pot < 40 || pot > 99) { skip.push(`${x.name} · ${L('geçersiz POT', 'invalid POT')}`); return; }
                if (seen.has(p)) { warn.push(`${p.name}: ${L('birden fazla kez geçiyor, sonuncusu işlenecek.', 'listed more than once; last one used.')}`); }
                seen.add(p);
                const min = Math.round(Number(x.potMin)), ov = parseInt(((p.history || {})[sel.s] || {})[sel.c + '_acadPot']) || 0;
                if (Number.isFinite(min) && min > pot) warn.push(`${p.name}: ${L('alt değer üst değerden büyük.', 'min above max.')}`);
                const cov = Math.round(Number(x.ovr)) || prevVals(p, sel.s, sel.c).o || 0;
                if (cov && pot < cov) warn.push(`${p.name}: POT ${pot}, OVR ${cov}${L("'den düşük.", ' is higher than POT.')}`);
                const pp = prevPot(p, sel.s, sel.c); if (pp && pot < pp - 5) warn.push(`${p.name}: POT ${pp} → ${pot} (${L('geçen ölçümden 5+ düştü', 'dropped 5+')}).`);
                rows.push({ p, pot, same: ov === pot, txt: E(p.name), chg: `POT ${pot}${ov && ov !== pot ? ' (' + L('önceki', 'was') + ' ' + ov + ')' : ''}${ov === pot ? ' · ' + L('aynı', 'same') : ''}` });
            });
            const nm0 = list.filter(p => !seen.has(p)).length; if (nm0) warn.push(L(`${nm0} akademi oyuncusu sonuçta yok, bu oyuncuların POT'u boş kalacak.`, `${nm0} academy players missing from the result.`));
        } else if (want === 'finance') {
            const list = (squadData && squadData.astakim) || [];
            (d.players || []).forEach(x => {
                const p = findPlayer(list, x.name), value = Math.round(Number(x.value)) || 0, wage = Math.round(Number(x.wage)) || 0;
                if (!p) { skip.push(`${x.name || '?'} · ${L('kadroda eşleşmedi', 'no match')}`); return; }
                if (!value && !wage) { skip.push(`${x.name} · ${L('değer ve maaş yok', 'no value or wage')}`); return; }
                const pf = prevFin(p, sel.s, sel.c);
                if (pf) {
                    if (pf.value && value && (value > pf.value * 3 || value < pf.value / 3)) warn.push(`${p.name}: ${L('değer', 'value')} ${money(pf.value)} → ${money(value)}`);
                    if (pf.wage && wage && (wage > pf.wage * 3 || wage < pf.wage / 3) && (pf.per || 'week') === (x.wagePer === 'year' ? 'year' : 'week')) warn.push(`${p.name}: ${L('maaş', 'wage')} ${money(pf.wage)} → ${money(wage)}`);
                }
                const un = parseInt(x.until), sy = 2000 + (parseInt(String(sel.s).slice(0, 2)) || 0);
                if (un && un < sy) warn.push(`${p.name}: ${L('sözleşme bitişi', 'contract end')} ${un}, ${L('sezon başından önce', 'before season start')}.`);
                rows.push({ p, value, wage, per: x.wagePer === 'year' ? 'year' : 'week', until: parseInt(x.until) || null, clause: Math.round(Number(x.clause)) || null, txt: E(p.name), chg: `${money(value)} · ${money(wage)}/${x.wagePer === 'year' ? L('yıl', 'yr') : L('hf', 'wk')}${x.until ? ' · ' + x.until : ''}` });
            });
        } else if (want === 'other_leagues') {
            const known = (typeof EURO_LEAGUES_LIST !== 'undefined' ? EURO_LEAGUES_LIST.map(l => l.name) : []).concat(typeof euroSlots === 'function' ? euroSlots(sel.s) : []);
            Object.keys(d.leagues || {}).forEach(k => {
                const nmK = known.find(x => norm(x) === norm(k)), t = (d.leagues[k] || []).filter(x => x && x.name).slice(0, 6);
                if (!nmK) { skip.push(`${k} · ${L('bilinmeyen lig adı', 'unknown league')}`); return; }
                if (!t.length) return;
                if (t.length < 6) warn.push(`${nmK}: ${t.length} / 6`);
                rows.push({ league: nmK, t, txt: nmK, chg: t.map(x => x.name).slice(0, 3).join(', ') + '…' });
            });
            if (!rows.length && !skip.length) throw new Error(L('Hiç lig bulunamadı.', 'No leagues found.'));
        } else if (want === 'cup_results') {
            const ts = cupList();
            (d.results || []).forEach(x => {
                const t = ts.find(z => norm(z.name) === norm(x.tournament) || (typeof tourCanon === 'function' && norm(tourCanon(z.name)) === norm(tourCanon(x.tournament))));
                const ch = String(x.champion || '').trim(), ru = String(x.runnerUp || '').trim();
                if (!t) { skip.push(`${x.tournament || '?'} · ${L('turnuva listesinde yok', 'not in the tournament list')}`); return; }
                if (!ch) { skip.push(`${t.name} · ${L('şampiyon yok', 'no champion')}`); return; }
                const cur = (trophyData[sel.s] && trophyData[sel.s][t.id]) || {};
                const cc = cur.champion && cur.champion.name, cr = cur.runnerUp && cur.runnerUp.name;
                if ((cc && norm(cc) !== norm(ch)) || (cr && ru && norm(cr) !== norm(ru))) warn.push(`${t.name}: ${L('mevcut kayıt değişecek', 'existing entry will change')} (${cc || '–'} / ${cr || '–'}).`);
                rows.push({ t, ch, ru, same: cc && norm(cc) === norm(ch) && (!ru || (cr && norm(cr) === norm(ru))), txt: E(t.name), chg: `🏆 ${ch}${ru ? ' · ' + ru : ''}` });
            });
            if (!rows.length && !skip.length) throw new Error(L('Hiç sonuç bulunamadı.', 'No results found.'));
        } else if (want === 'top_players') {
            const ex = topExpected(sel.s);
            (d.tournaments || []).forEach(x => {
                const t = ex.find(e => norm(e) === norm(x.tournament));
                if (!t) { skip.push(`${x.tournament || '?'} · ${L('bu sezonun turnuvaları arasında yok', 'not among this season\'s tournaments')}`); return; }
                const g = x.topScorer && x.topScorer.name ? { name: String(x.topScorer.name), team: String(x.topScorer.team || ''), n: Math.round(Number(x.topScorer.goals)) || 0 } : null, a = x.topAssist && x.topAssist.name ? { name: String(x.topAssist.name), team: String(x.topAssist.team || ''), n: Math.round(Number(x.topAssist.assists)) || 0 } : null;
                if (!g && !a) { skip.push(`${t} · ${L('gol ve asist yok', 'no data')}`); return; }
                rows.push({ t, g, a, txt: E(t), chg: `${g ? '⚽ ' + g.name + ' ' + g.n : '–'} · ${a ? '👟 ' + a.name + ' ' + a.n : '–'}` });
            });
        } else if (want === 'birth_dates') {
            const all = ((squadData && squadData[o.ctx || 'astakim']) || []).filter(p => !p.isArchived);
            let blank = 0;
            String(d.text || '').split(/\r?\n/).forEach(line => {
                line = line.trim(); if (!line) return;
                if (!/\d/.test(line)) { blank++; return; }
                const mm = line.match(/^(.*?)[;\t|,:-]\s*(\d{1,4})[./-](\d{1,2})[./-](\d{1,4})\s*$/); if (!mm) { skip.push(`${line} · ${L('okunamadı', 'unreadable')}`); return; }
                let y, mo, da; if (mm[2].length === 4) { y = +mm[2]; mo = +mm[3]; da = +mm[4]; } else { da = +mm[2]; mo = +mm[3]; y = +mm[4]; }
                const p = findPlayer(all, mm[1]);
                if (!p) { skip.push(`${mm[1]} · ${L('kadroda eşleşmedi', 'no match')}`); return; }
                if (!(y >= 1960 && y <= 2013 && mo >= 1 && mo <= 12 && da >= 1 && da <= 31)) { skip.push(`${mm[1]} · ${L('geçersiz tarih', 'invalid date')}`); return; }
                const iso = `${y}-${String(mo).padStart(2, '0')}-${String(da).padStart(2, '0')}`;
                const ag = ageAt(iso, sel.s, 't1');
                if (ag !== null && (ag < 15 || ag > 42)) warn.push(`${p.name}: ${L('bu tarihle yaş', 'age would be')} ${ag}.`);
                const hs = (p.history && p.history[sel.s]) || {}; const kn = ORDER.map(cc => ({ cc, a: parseInt(hs[cc + 'a']) })).find(z => z.a > 0);
                if (kn) { const ac = ageAt(iso, sel.s, kn.cc); if (ac !== null && Math.abs(ac - kn.a) > 1) warn.push(`${p.name}: ${L('girilmiş yaş', 'recorded age')} ${kn.a}, ${L('tarihten hesaplanan', 'computed')} ${ac}.`); }
                rows.push({ p, iso, same: p.birthDate === iso, txt: E(p.name), chg: `${p.birthDate ? p.birthDate + ' → ' : ''}${iso}` });
            });
            if (blank) warn.push(L(`${blank} oyuncunun tarihi boş bırakıldı, işlenmeyecek.`, `${blank} players left blank, skipped.`));
            if (!rows.length && !skip.length) throw new Error(L('Girilmiş tarih bulunamadı.', 'No dates entered.'));
        } else if (want === 'squad' || want === 'academy' || want === 'national') {
            const list = (squadData && squadData[want === 'academy' ? 'akademi' : want === 'national' ? 'milli' : 'astakim']) || [];
            (d.players || []).forEach(x => {
                const p = findPlayer(list, x.name), ovr = Math.round(Number(x.ovr)), age = Math.round(Number(x.age));
                if (!p) { skip.push(`${x.name || '?'} · ${L('kadroda eşleşmedi', 'no match')}`); return; }
                if (!okOvr(ovr) || !okAge(age)) { skip.push(`${x.name} · ${L('geçersiz yaş/OVR', 'invalid age/OVR')} (${x.age}/${x.ovr})`); return; }
                const h = (p.history && p.history[sel.s]) || {}, po = parseInt(h[sel.c + 'o']) || null, pa = parseInt(h[sel.c + 'a']) || null;
                rows.push({ p, ovr, age, po, pa, txt: `${E(p.name)}`, chg: `${pa || '–'} → ${age} · ${po || '–'} → ${ovr}`, same: po === ovr && pa === age });
            });
            const done = new Set(rows.map(r => r.p.id)), missing = list.filter(p => !p.isArchived && !done.has(p.id) && PRESENT.includes(p.history && p.history[sel.s] && p.history[sel.s][sel.c + 'Type']));
            if (missing.length) warn.push(L(`${missing.length} oyuncu sonuçta yok: `, `${missing.length} players missing: `) + missing.slice(0, 5).map(p => p.name).join(', ') + (missing.length > 5 ? '…' : ''));
        } else if (want === 'league_tables') {
            const lg = d.leagues || {};
            ['PL', 'CH', 'L1', 'L2'].forEach(k => {
                if (!Array.isArray(lg[k]) || !lg[k].length) return;
                const t = lg[k].map(x => String(x || '').trim()).filter(Boolean), exp = { PL: 20, CH: 24, L1: 24, L2: 24 }[k];
                const dup = t.length - new Set(t.map(norm)).size;
                rows.push({ k, t, txt: `${k} · ${t.length} ${L('takım', 'teams')}`, chg: `${t[0]} … ${t[t.length - 1]}` });
                if (t.length !== exp) warn.push(L(`${k}: ${t.length} takım var, ${exp} bekleniyordu.`, `${k}: ${t.length} teams, expected ${exp}.`));
                if (dup) warn.push(L(`${k}: tekrar eden takım adı var.`, `${k}: duplicate team names.`));
            });
            if (!rows.length) throw new Error(L('Hiç lig bulunamadı.', 'No leagues found.'));
        } else {
            const all = ((transferData.in || []).concat(transferData.out || []));
            (d.transfers || []).forEach(x => {
                const dir = x.direction === 'out' ? 'out' : x.direction === 'in' ? 'in' : '', name = String(x.name || '').trim(), kind = ['sale', 'loan', 'free'].includes(x.kind) ? x.kind : (Number(x.fee) > 0 ? 'sale' : 'free');
                const ovr = Math.round(Number(x.ovr)) || 0, age = Math.round(Number(x.age)) || 0, fee = Math.max(0, Math.round(Number(x.fee) || 0));
                if (!dir || !name) { skip.push(`${name || '?'} · ${L('yön veya ad eksik', 'direction or name missing')}`); return; }
                const dupe = all.some(t => t.season === sel.s && norm(t.name) === norm(name) && (transferData.in || []).includes(t) === (dir === 'in'));
                if (dupe) { skip.push(`${name} · ${L('zaten kayıtlı', 'already recorded')}`); return; }
                rows.push({ dir, name, pos: String(x.pos || '').toUpperCase(), age, ovr, team: String(x.team || '').trim(), fee, kind, txt: `${dir === 'in' ? '↓' : '↑'} ${E(name)}`, chg: `${E(String(x.team || ''))} · ${kind === 'loan' ? L('Kiralık', 'Loan') : fee ? '€' + fee.toLocaleString('tr-TR') : L('Bedelsiz', 'Free')}` });
            });
            if (!rows.length && !skip.length) throw new Error(L('Hiç transfer bulunamadı.', 'No transfers found.'));
        }
        return { want, rows, skip, warn };
    }
    function aiHtml(o) {
        const prm = o.noprompt ? '' : aiPrompt(o);
        const pv = aiPrev;
        const prev = pv ? `<div class="gte-pv">
            ${pv.warn.map(w => `<div class="gte-w">⚠ ${E(w)}</div>`).join('')}
            <div class="gte-ph">${L(`${pv.rows.length} kayıt işlenecek`, `${pv.rows.length} records will be applied`)}${pv.skip.length ? L(` · ${pv.skip.length} atlanacak`, ` · ${pv.skip.length} skipped`) : ''}</div>
            ${pv.rows.slice(0, 60).map(r => `<div class="gte-pl${r.same ? ' same' : ''}"><span>${r.txt}</span><span class="gte-sub">${E(r.chg)}</span></div>`).join('')}
            ${pv.rows.length > 60 ? `<div class="gte-sub">+${pv.rows.length - 60}…</div>` : ''}
            ${pv.skip.map(x => `<div class="gte-pl sk"><span>${E(x)}</span></div>`).join('')}
            ${(pv.unm || []).length ? `<div class="gte-ph">${L('Eşleşmeyen isimleri bağla', 'Link unmatched names')}</div>` + pv.unm.map((u, i) => `<div class="gte-pl"><span>${E(u.name)}</span><select class="gte-sel" onchange="gtEntryLink(${i},this.value)"><option value="">${L('— oyuncu seç', '— pick player')}</option>${u.list.filter(p => p && p.name && !p.isArchived && !p.isPromoted).sort((a, b) => String(a.name).localeCompare(String(b.name))).map(p => `<option value="${E(p.id)}">${E(p.name)}</option>`).join('')}</select></div>`).join('') : ''}
            <div class="gte-ef"><span></span><button class="gte-btn g" onclick="gtEntryAiApply()" ${pv.rows.length ? '' : 'disabled'}>${L('Uygula', 'Apply')}</button></div></div>` : '';
        const step1 = o.noprompt
            ? `<div class="gte-st"><b>1</b> ${L('Kadrodaki oyuncular listelendi. Doğum tarihlerini GG.AA.YYYY olarak ; işaretinden sonra doldur, boş bıraktıkların atlanır.', 'Players are listed. Fill in DD.MM.YYYY after the semicolon; blank lines are skipped.')}</div>`
            : `<div class="gte-st"><b>1</b> ${L('Prompt\'u kopyala, oyundan aldığın fotoğraf/videoyla birlikte yapay zekaya yükle.', 'Copy the prompt and upload it with your screenshots/video to an AI.')} <button class="gte-btn g" onclick="gtEntryAiCopy()"><i class="fa-regular fa-copy"></i> ${L('Prompt\'u kopyala', 'Copy prompt')}</button></div>
            <details class="gte-det"><summary>${L('Prompt\'u göster', 'Show prompt')}</summary><textarea class="gte-ta" readonly rows="8">${E(prm)}</textarea></details>
            <div class="gte-st"><b>2</b> ${L('Yapay zekanın verdiği sonucu buraya yapıştır.', 'Paste the AI result here.')}</div>`;
        const isDev = o.key === 'dev' || o.key === 'dev_ac';
        return `<div class="gte-ai-box">
            ${step1}
            <textarea id="gte-ai-in" class="gte-ta" rows="${o.noprompt ? 14 : 6}" placeholder='${o.noprompt ? 'Mario Lemina; 01.09.1993' : '{ "type": ... }'}' oninput="gtEntryAiIn(this.value)">${E(aiTxt)}</textarea>
            ${aiMsg ? `<div class="gte-w">⚠ ${E(aiMsg)}</div>` : ''}
            <div class="gte-ef"><span></span><button class="gte-btn" onclick="gtEntryAiPreview()">${isDev ? L('Aktarma penceresinde aç', 'Open in import window') : L('Önizle', 'Preview')}</button></div>
            ${prev}</div>`;
    }
    let bdPrev = null;
    window.gtEntryBirth = ctx => {
        const prev = squadContext, ov = document.getElementById('gte-ov'); squadContext = ctx;
        if (ov) ov.style.display = 'none';
        try { gtSqBirthOpen(); bdPrev = prev; } catch (e) { squadContext = prev; if (ov) ov.style.display = ''; }
    };
    if (typeof window.gtSqBirthClose === 'function') {
        const o = window.gtSqBirthClose;
        window.gtSqBirthClose = function () {
            const r = o.apply(this, arguments);
            if (bdPrev !== null) { squadContext = bdPrev; bdPrev = null; const ov = document.getElementById('gte-ov'); if (ov) { ov.style.display = ''; render(); } }
            return r;
        };
    }
    window.gtEntryAi = k => {
        aiKey = aiKey === k ? null : k; aiPrev = null; aiTxt = ''; aiMsg = '';
        const o = aiKey && itemsFor(sel.s, sel.c).find(x => x.key === aiKey);
        if (o && o.noprompt) aiTxt = ((squadData && squadData[o.ctx]) || []).filter(p => !p.isArchived && !p.isPromoted).map(p => `${p.name}; ${p.birthDate ? p.birthDate.split('-').reverse().join('.') : ''}`).join('\n');
        render();
    };
    window.gtEntryAiIn = v => { aiTxt = v; };
    window.gtEntryLink = (i, id) => {
        const u = aiPrev && aiPrev.unm && aiPrev.unm[i]; if (!u || !id) return;
        window.gtNameAlias[u.n] = id;
        try { saveToLocalStorage(); } catch (e) {}
        window.gtEntryAiPreview();
    };
    window.gtEntryAiCopy = () => {
        const o = itemsFor(sel.s, sel.c).find(x => x.key === aiKey); if (!o) return;
        const t = aiPrompt(o);
        const done = () => { const b = document.querySelector('.gte-ai-box .gte-btn.g'); if (b) { const h = b.innerHTML; b.textContent = L('Kopyalandı', 'Copied'); setTimeout(() => { b.innerHTML = h; }, 1500); } };
        try { navigator.clipboard.writeText(t).then(done, () => { fallback(t); done(); }); } catch (e) { fallback(t); done(); }
        function fallback(x) { const a = document.createElement('textarea'); a.value = x; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); }
    };
    window.gtEntryAiPreview = () => {
        const o = itemsFor(sel.s, sel.c).find(x => x.key === aiKey); if (!o) return;
        aiMsg = ''; aiPrev = null; unmatched = [];
        if (o.key === 'dev' || o.key === 'dev_ac') {
            try {
                const d = parseAi(aiTxt); if (!Array.isArray(d.players)) throw new Error(L('"players" listesi bulunamadı.', 'No "players" list.'));
                d.gt = 'attrs'; d.v = 1; d.season = sel.s; d.phase = o.ph; d.ctx = o.ctx;
                const txt = JSON.stringify(d), cx = o.ctx, ss = sel.s, ph = o.ph;
                close(); openAttrImport();
                const set = (id, v) => { const el = document.getElementById(id); if (el) { el.value = v; el.dataset.user = '1'; } };
                set('ai-ctx', cx); set('ai-season', ss); set('ai-phase', ph); set('ai-text', txt);
                attrImportPreview();
                return;
            } catch (e) { aiMsg = e.message || String(e); render(); return; }
        }
        try { aiPrev = buildPrev(o, o.noprompt ? { text: aiTxt } : parseAi(aiTxt)); aiPrev.unm = unmatched.slice(); } catch (e) { aiMsg = e.message || String(e); }
        const sc = document.querySelector('.gte-body').scrollTop; render(); document.querySelector('.gte-body').scrollTop = sc;
    };
    window.gtEntryAiApply = () => {
        const pv = aiPrev; if (!pv || !pv.rows.length) return;
        if (pv.want === 'snapshot') {
            const o = itemsFor(sel.s, sel.c).find(x => x.key === aiKey), kind = SNAPK[aiKey];
            const g = window.gtTables[sel.s] = window.gtTables[sel.s] || {}, h = g[sel.c] = g[sel.c] || {}, k = h[kind] = h[kind] || {};
            pv.rows.forEach(r => { k[r.key] = r.t; });
        } else if (pv.want === 'finance') {
            pv.rows.forEach(r => { r.p.fin = r.p.fin || {}; r.p.fin[sel.s + '|' + sel.c] = { value: r.value, wage: r.wage, per: r.per, until: r.until, clause: r.clause }; });
        } else if (pv.want === 'other_leagues') {
            euroLeaguesData[sel.s] = euroLeaguesData[sel.s] || {};
            pv.rows.forEach(r => { euroLeaguesData[sel.s][r.league] = r.t.map(x => ({ name: String(x.name).trim(), pts: String(x.pts == null ? '' : x.pts) })).concat([{}, {}, {}, {}, {}, {}]).slice(0, 6); try { euroSyncTrophies(sel.s, r.league); } catch (e) {} });
        } else if (pv.want === 'top_players') {
            window.gtTopPlayers[sel.s] = window.gtTopPlayers[sel.s] || {};
            pv.rows.forEach(r => { window.gtTopPlayers[sel.s][r.t] = { goals: r.g, assists: r.a }; });
        } else if (pv.want === 'cup_results') {
            const logo = n => (typeof getTeamLogoByName === 'function' && getTeamLogoByName(n)) || `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=random&color=fff`;
            trophyData[sel.s] = trophyData[sel.s] || {};
            pv.rows.forEach(r => { const cell = trophyData[sel.s][r.t.id] || { champion: null, runnerUp: null }; cell.champion = { name: r.ch, logoUrl: logo(r.ch) }; if (r.ru) cell.runnerUp = { name: r.ru, logoUrl: logo(r.ru) }; trophyData[sel.s][r.t.id] = cell; });
        } else if (pv.want === 'academy_pot') {
            pv.rows.forEach(r => { r.p.history = r.p.history || {}; const h = r.p.history[sel.s] = r.p.history[sel.s] || {}; h[sel.c + '_acadPot'] = String(r.pot); });
        } else if (pv.want === 'birth_dates') {
            pv.rows.forEach(r => { r.p.birthDate = r.iso; fillAges(r.p); });
        } else if (pv.want === 'squad' || pv.want === 'academy' || pv.want === 'national') {
            pv.rows.forEach(r => { r.p.history = r.p.history || {}; const h = r.p.history[sel.s] = r.p.history[sel.s] || {}; h[sel.c + 'o'] = r.ovr; h[sel.c + 'a'] = r.age; if (!PRESENT.includes(h[sel.c + 'Type'])) h[sel.c + 'Type'] = 'continue'; });
        } else if (pv.want === 'league_tables') {
            const cur = Object.assign({}, pyramidData[sel.s] || {});
            pv.rows.forEach(r => { cur[r.k] = r.t.map(x => (typeof pyrName === 'function' ? pyrName(x) : x)).filter(Boolean); });
            pyramidData[sel.s] = cur;
            syncSeasonTrophies(sel.s);
        } else {
            pv.rows.forEach(r => { transferData[r.dir].push({ id: 'tr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), season: sel.s, name: r.name, pos: r.pos, age: r.age, ovr: r.ovr, team: r.team, fee: r.fee, photoUrl: '', kind: r.kind }); });
        }
        try { saveToLocalStorage(); } catch (e) {}
        const n = pv.rows.length; aiPrev = null; aiTxt = ''; aiKey = null; aiMsg = '';
        try { if (typeof activeMain !== 'undefined') { if (activeMain === 'ligtarihi' && typeof renderLeagueHistory === 'function') renderLeagueHistory(); else if (activeMain === 'transfer' && typeof renderTransferPanel === 'function') renderTransferPanel(); } } catch (e) {}
        render();
        const b = document.querySelector('.gte-body'); if (b) b.insertAdjacentHTML('afterbegin', `<div class="gte-ok">✓ ${L(n + ' kayıt işlendi', n + ' records applied')}</div>`);
    };


    // ================= GÖRÜNÜM: profilde değer/maaş/doğum, Gol-Asist sayfasında turnuva kralları =================
    const money = v => '€' + Number(v || 0).toLocaleString('tr-TR');
    const short = v => v >= 1e6 ? (Math.round(v / 1e5) / 10).toLocaleString('tr-TR') + 'M €' : v >= 1e3 ? Math.round(v / 1e3) + 'K €' : v + ' €';
    function lastFin(p) {
        const f = p && p.fin; if (!f) return null;
        const ks = Object.keys(f).sort((a, b) => { const [sa, ca] = a.split('|'), [sb, cb] = b.split('|'); return ((seasonsList || []).indexOf(sa) - (seasonsList || []).indexOf(sb)) || (ORDER.indexOf(ca) - ORDER.indexOf(cb)); });
        const k = ks[ks.length - 1]; return k ? Object.assign({ key: k }, f[k]) : null;
    }
    function ageOn(iso) { const t = new Date(), b = new Date(iso); if (isNaN(b)) return ''; let a = t.getFullYear() - b.getFullYear(); if (t < new Date(t.getFullYear(), b.getMonth(), b.getDate())) a--; return a; }
    if (typeof window.piFillHero === 'function') {
        const o = window.piFillHero;
        window.piFillHero = function (p) {
            const r = o.apply(this, arguments);
            try {
                const hero = document.getElementById('pi-hero'); if (!hero || !p) return r;
                document.querySelectorAll('.gte-pf').forEach(x => x.remove());
                const f = lastFin(p), bits = [];
                if (p.birthDate) bits.push(`<span><i class="fa-solid fa-cake-candles"></i> ${E(p.birthDate.split('-').reverse().join('.'))} (${ageOn(p.birthDate)})</span>`);
                if (f && f.value) bits.push(`<span title="${E(L('Piyasa değeri', 'Market value'))}"><i class="fa-solid fa-tag"></i> ${E(short(f.value))}</span>`);
                if (f && f.wage) bits.push(`<span title="${E(L('Maaş', 'Wage'))}"><i class="fa-solid fa-money-bill-wave"></i> ${E(short(f.wage))}/${f.per === 'year' ? L('yıl', 'yr') : L('hf', 'wk')}</span>`);
                if (f && f.until) bits.push(`<span title="${E(L('Sözleşme', 'Contract'))}"><i class="fa-solid fa-file-signature"></i> ${E(f.until)}</span>`);
                if (bits.length) hero.insertAdjacentHTML('afterend', `<div class="gte-pf">${bits.join('')}</div>`);
            } catch (e) { console.warn('gt-entry hero:', e); }
            return r;
        };
    }
    let tkSeason = null;
    function tkOpen() {
        let ov = document.getElementById('gte-tk'); if (!ov) { ov = document.createElement('div'); ov.id = 'gte-tk'; ov.className = 'gte-ov'; ov.addEventListener('mousedown', e => { if (e.target === ov) ov.remove(); }); document.body.appendChild(ov); }
        const ss = (seasonsList || []).slice().reverse(); if (!tkSeason || !ss.includes(tkSeason)) tkSeason = ss.find(x => Object.keys(window.gtTopPlayers[x] || {}).length) || ss[0];
        const d = window.gtTopPlayers[tkSeason] || {}, ks = Object.keys(d);
        const lg = t => { try { return (typeof tourLogoOf === 'function' && tourLogoOf(t)) || (typeof getCompetitionLogo === 'function' && getCompetitionLogo(t)) || ''; } catch (e) { return ''; } };
        const cell = (x, ico) => x ? `<div class="gte-tkc"><b>${E(x.name)}</b><span class="gte-sub">${E(x.team || '')}</span><em>${ico} ${x.n}</em></div>` : '<div class="gte-tkc gte-sub">–</div>';
        ov.innerHTML = `<div class="gte-box"><div class="gte-hd"><b><i class="fa-solid fa-crown" style="color:#fbbf24;margin-right:8px"></i>${L('Turnuva Kralları', 'Tournament Leaders')}</b><select class="gte-sel" onchange="gteTkSeason(this.value)">${ss.map(x => `<option ${x === tkSeason ? 'selected' : ''}>${E(x)}</option>`).join('')}</select><button class="gte-x" onclick="document.getElementById('gte-tk').remove()" aria-label="${L('Kapat', 'Close')}"><i class="fa-solid fa-xmark"></i></button></div><div class="gte-body">${ks.length ? `<div class="gte-tkh"><span></span><span>${L('Gol kralı', 'Top scorer')}</span><span>${L('Asist kralı', 'Top assister')}</span></div>` + ks.map(t => `<div class="gte-tkr">${lg(t) ? `<img src="${E(lg(t))}" alt="" onerror="this.style.visibility='hidden'">` : '<i class="fa-solid fa-trophy"></i>'}<div class="gte-tkt">${E(t)}</div>${cell(d[t].goals, '⚽')}${cell(d[t].assists, '👟')}</div>`).join('') : `<div class="gte-sub" style="padding:14px 2px">${L('Bu sezon için kayıt yok. Ayarlar > Veri Girişi > Sezon sonu bölümünden ekle.', 'No records yet. Add them in Settings > Data Entry.')}</div>`}</div></div>`;
    }
    window.gteTkSeason = v => { tkSeason = v; tkOpen(); };
    window.gtEntryTk = tkOpen;
    if (typeof window.renderStatsPanel === 'function') {
        const o = window.renderStatsPanel;
        window.renderStatsPanel = function () {
            const r = o.apply(this, arguments);
            try {
                const root = document.getElementById('content-area'); if (!root || root.querySelector('.gte-tk-btn')) return r;
                const h = [...root.querySelectorAll('h1,h2,h3')].find(x => /İstatistik|Statistics/i.test(x.textContent));
                if (h) { h.insertAdjacentHTML('afterend', `<button class="gte-btn gte-tk-btn" onclick="gtEntryTk()"><i class="fa-solid fa-crown" style="color:#fbbf24"></i> ${L('Turnuva Kralları', 'Leaders')}</button>`); h.parentElement.style.alignItems = 'center'; }
            } catch (e) {}
            return r;
        };
    }


    let vwSel = null;
    window.gtEntryView = (key, which) => {
        const kind = SNAPK[key], T = (((window.gtTables[sel.s] || {})[sel.c]) || {})[kind] || {}, names = Object.keys(T);
        let ov = document.getElementById('gte-vw'); if (!ov) { ov = document.createElement('div'); ov.id = 'gte-vw'; ov.className = 'gte-ov'; ov.style.zIndex = 95; ov.addEventListener('mousedown', e => { if (e.target === ov) ov.remove(); }); document.body.appendChild(ov); }
        const cur = which && T[which] ? which : names[0];
        const t = T[cur] || [], f = (r, k) => r[k] === undefined ? '' : r[k];
        ov.innerHTML = `<div class="gte-box"><div class="gte-hd"><b>${E(sel.s)} · ${E(cpLabel(sel.c))}</b><select class="gte-sel" onchange="gtEntryView('${key}', this.value)">${names.map(n => `<option ${n === cur ? 'selected' : ''}>${E(n)}</option>`).join('')}</select><button class="gte-x" onclick="document.getElementById('gte-vw').remove()"><i class="fa-solid fa-xmark"></i></button></div><div class="gte-body">${t.length ? `<table class="gte-tb"><tr><th>#</th><th>${L('Takım', 'Team')}</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th></tr>${t.map((r, i) => `<tr><td>${i + 1}</td><td>${E(r.team)}</td><td>${f(r, 'p')}</td><td>${f(r, 'w')}</td><td>${f(r, 'd')}</td><td>${f(r, 'l')}</td><td>${f(r, 'gf')}</td><td>${f(r, 'ga')}</td><td><b>${r.pts}</b></td></tr>`).join('')}</table>` : `<div class="gte-sub">${L('Kayıt yok', 'No data')}</div>`}</div></div>`;
    };

    function open() {
        let ov = document.getElementById('gte-ov');
        if (!ov) {
            ov = document.createElement('div'); ov.id = 'gte-ov'; ov.className = 'gte-ov';
            ov.innerHTML = `<div class="gte-box"><div class="gte-hd"><b><i class="fa-solid fa-clipboard-check" style="color:#34d399;margin-right:8px"></i>${L('Veri Girişi', 'Data Entry')}</b><button class="gte-x" onclick="gtEntryClose()" aria-label="${L('Kapat', 'Close')}"><i class="fa-solid fa-xmark"></i></button></div><div class="gte-body"></div></div>`;
            ov.addEventListener('mousedown', e => { if (e.target === ov) close(); });
            document.body.appendChild(ov);
            document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.getElementById('gte-ov') && !document.querySelector('#pb-modal.flex')) close(); });
        }
        if (!sel.s) {
            const s = (seasonsList || [])[(seasonsList || []).length - 1];
            sel.s = s; const inc = CPS.find(cp => summary(s, cp[0]).miss); sel.c = inc ? inc[0] : 's2';
        }
        render();
    }
    function close() { const ov = document.getElementById('gte-ov'); if (ov) ov.remove(); if (typeof activeMain !== 'undefined' && activeMain === 'ayarlar' && typeof renderSettingsPanel === 'function') renderSettingsPanel(); }

    function go(a) {
        const s = sel.s, c = sel.c;
        if (a === 'squad' || a === 'academy') {
            const prev = squadContext; squadContext = a === 'academy' ? 'akademi' : 'astakim';
            try { openPlayerBulkEdit(); if (typeof pbSetSeason === 'function') pbSetSeason(s); } finally { squadContext = prev; }
            return;
        }
        close();
        if (a === 'fxbulk') { selectMainMenu('sezonlar'); try { if (typeof switchFixtureSeason === 'function') switchFixtureSeason(s); } catch (e) {} setTimeout(() => { try { openFixtureBulkModal(s); } catch (e) {} }, 200); return; }
        if (a === 'transfer') selectMainMenu('transfer');
        else if (a === 'cups') selectMainMenu('kupalar');
        else if (a === 'fixture') { selectMainMenu('sezonlar'); try { if (typeof switchFixtureSeason === 'function') switchFixtureSeason(s); } catch (e) {} }
        else if (a === 'tables') { try { pyrOpenEditor(s); } catch (e) { selectMainMenu('ligtarihi'); } }
    }

    window.gtEntryOpen = open; window.gtEntryClose = close;
    window.gtEntrySel = (s, c) => { sel = { s, c }; openKey = null; aiKey = null; aiPrev = null; aiTxt = ''; aiMsg = ''; render(); };
    window.gtEntryFlag = k => { toggleFlag(sel.s, sel.c, k); render(); };
    window.gtEntryGo = go;

    // toplu düzenleme kapanınca listeyi tazele
    if (typeof window.closePlayerBulkEdit === 'function') {
        const o = window.closePlayerBulkEdit;
        window.closePlayerBulkEdit = function () { const r = o.apply(this, arguments); if (document.getElementById('gte-ov')) render(); return r; };
    }

    // Ayarlar sayfasına kart ekle
    function inject() {
        const c = document.querySelector('.st-c'); if (!c || c.querySelector('.gte-card')) return;
        const n = pendingCount();
        const d = document.createElement('div');
        d.className = 'gte-card flex-1 sm:flex-none flex flex-col justify-center sm:block sm:mb-6 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-4';
        d.innerHTML = `<div class="flex justify-between items-center mb-1.5 sm:mb-2 flex-wrap gap-1 sm:gap-2"><span class="text-[10px] sm:text-sm font-bold text-slate-300"><i class="fa-solid fa-clipboard-check mr-2 text-emerald-400"></i>${L('Veri Girişi', 'Data Entry')}</span><span class="text-[9px] sm:text-xs font-mono font-bold ${n ? 'text-amber-300' : 'text-emerald-400'} bg-slate-900 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">${n ? L(n + ' eksik', n + ' missing') : L('Tamam', 'Complete')}</span></div><p class="hidden sm:block text-[10px] sm:text-xs text-slate-500 mb-2 sm:mb-3">${L('31 Ağu · 31 Ara · 31 Oca · 30 Haz ölçümlerini tek yerden takip et, eksikleri gör.', 'Track the four checkpoints in one place and see what is missing.')}</p><button onclick="gtEntryOpen()" class="bg-slate-700 hover:bg-slate-600 text-white text-[10px] sm:text-sm font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg transition-colors w-full"><i class="fa-solid fa-list-check mr-1"></i> ${L('Veri Girişini Aç', 'Open Data Entry')}</button>`;
        c.insertBefore(d, c.firstElementChild);
    }
    if (typeof window.renderSettingsPanel === 'function') {
        const o = window.renderSettingsPanel;
        window.renderSettingsPanel = function () { const r = o.apply(this, arguments); try { inject(); } catch (e) { console.warn('gt-entry:', e); } return r; };
    }

    // ================= KUPALAR: lig 1.-2.'leri sezon sonu girilene kadar yansımasın =================
    // Son sezonda 4 ligin sezon sonu tablosu (30 Haz) girilmediyse, lig tablolarından gelen otomatik şampiyon/ikinci kupa kutularına yazılmaz.
    // Eski sezonlar ve elle girilmiş kutular etkilenmez.
    const lastSeason = () => { const l = seasonsList || []; return l[l.length - 1]; };
    const seasonEndDone = s => { if (s !== lastSeason()) return true; try { return !!pyrFull(s); } catch (e) { return false; } };
    window.gtSeasonEndDone = seasonEndDone;
    if (typeof window.euroSyncTrophies === 'function') {
        const oE = window.euroSyncTrophies;
        window.euroSyncTrophies = function (season, league) {
            if (seasonEndDone(season)) return oE.apply(this, arguments);
            try {
                const canon = typeof tourCanon === 'function' ? tourCanon(league) : league, t = (tournamentsList || []).find(x => tourCanon(x.name) === canon);
                const cell = t && trophyData[season] && trophyData[season][t.id];
                if (cell) { ['champion', 'runnerUp'].forEach(r => { if (cell[r] && cell[r].auto && cell[r].src !== 'ct') cell[r] = null; }); if (!cell.champion && !cell.runnerUp) delete trophyData[season][t.id]; }
            } catch (e) {}
        };
    }
    if (typeof window.ctSyncTrophies === 'function' && typeof window.ctTourResult === 'function') {
        const oC = window.ctSyncTrophies, oT = window.ctTourResult;
        window.ctSyncTrophies = function () {
            const ls = lastSeason();
            if (!ls || seasonEndDone(ls)) return oC.apply(this, arguments);
            const gated = new Set((customTournamentsData && customTournamentsData[ls]) || []);
            const isLeague = t => { const kos = Array.isArray(t.knockouts) ? t.knockouts : []; return !kos.find(k => k && (k.stage === 'Final' || k.stage === 'F')) && !(t.knockoutEnabled !== undefined ? t.knockoutEnabled : kos.length > 0); };
            window.ctTourResult = function (t) { return gated.has(t) && isLeague(t) ? null : oT.apply(this, arguments); };
            try {
                const r = oC.apply(this, arguments);
                Object.keys((euroLeaguesData && euroLeaguesData[ls]) || {}).forEach(l => window.euroSyncTrophies(ls, l));
                return r;
            } finally { window.ctTourResult = oT; }
        };
    }
    function syncSeasonTrophies(se) {
        try { Object.keys((euroLeaguesData && euroLeaguesData[se]) || {}).forEach(l => window.euroSyncTrophies(se, l)); window.ctSyncTrophies(); } catch (e) { console.warn('gt-entry trophies:', e); }
    }
    window.gtSyncSeasonTrophies = syncSeasonTrophies;
    if (typeof window.pyrEdSave === 'function') {
        const oS = window.pyrEdSave;
        window.pyrEdSave = function () { const se = typeof pyrEd !== 'undefined' && pyrEd && pyrEd.season; const r = oS.apply(this, arguments); if (se) { syncSeasonTrophies(se); try { saveToLocalStorage(); } catch (e) {} } return r; };
    }

    // ================= KUPALAR: silinen sütun otomatik geri gelmesin =================
    // Lig/özel lig senkronları sütunu yeniden oluşturabiliyor; kullanıcının sildiği otomatik sütunlar kara listeye alınır.
    window.gtDeletedCols = window.gtDeletedCols || [];
    const colKey = n => { try { return String(tourCanon(n) || n).toLowerCase().trim(); } catch (e) { return String(n || '').toLowerCase().trim(); } };
    if (typeof window.deleteTournament === 'function') {
        const oD = window.deleteTournament;
        window.deleteTournament = function () {
            const id = typeof editingTournamentId !== 'undefined' ? editingTournamentId : null, t = (tournamentsList || []).find(x => x.id === id), n = t && t.name;
            const r = oD.apply(this, arguments);
            try { if (n && !(tournamentsList || []).some(x => x.id === id)) { const k = colKey(n); if (!window.gtDeletedCols.includes(k)) window.gtDeletedCols.push(k); saveToLocalStorage(); } } catch (e) {}
            return r;
        };
    }
    function purgeAutoCols() {
        const del = window.gtDeletedCols || []; if (!del.length || !Array.isArray(tournamentsList)) return false;
        const used = id => Object.keys(trophyData || {}).some(se => { const c = trophyData[se] && trophyData[se][id]; return c && (c.champion || c.runnerUp); });
        const n0 = tournamentsList.length;
        tournamentsList = tournamentsList.filter(t => !(/^(lg_|ct_)/.test(String(t.id)) && del.includes(colKey(t.name)) && !used(t.id)));
        return tournamentsList.length !== n0;
    }
    if (typeof window.renderTrophiesGrid === 'function') {
        const oR = window.renderTrophiesGrid;
        window.renderTrophiesGrid = function () {
            // silinmiş özel lig sütunu, veri yoksa yeniden oluşturulmasın: oluşturma sırasında katalogdan geçici çıkar
            const full = customCatalog; let swapped = false;
            try {
                if (purgeAutoCols()) saveToLocalStorage();
                const del = window.gtDeletedCols || [];
                if (del.length && Array.isArray(customCatalog)) {
                    const used = nm => (tournamentsList || []).some(t => colKey(t.name) === colKey(nm));
                    const keep = customCatalog.filter(e => !(e && e.custom && del.includes(colKey(e.n)) && !used(e.n)));
                    if (keep.length !== customCatalog.length) { customCatalog = keep; swapped = true; }
                }
            } catch (e) {}
            try { return oR.apply(this, arguments); } finally { if (swapped) customCatalog = full; }
        };
    }

    // ================= LİG ADI BİRLEŞTİRME: tek ad, otomatik =================
    // Aynı lig iki farklı adla kayıtlıysa (ör. "SuperLiga" ↔ "Romanian Superliga") tek ada toplanır:
    // Diğer ligler verisi, sezon slotları, özel lig kaydı, logo ve Kupalar sütunu. Elle açılmış sütunlara dokunulmaz.
    window.gtLeagueAlias = window.gtLeagueAlias || { 'superliga': 'Romanian Superliga', 'swiss super league': 'Swiss League' };
    const AL = () => window.gtLeagueAlias || {};
    const lgNorm = n => String(n || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const lgCanonOf = n => AL()[lgNorm(n)] || null;
    window.gtLeagueCanon = n => lgCanonOf(n) || n;
    function mergeLeagueNames() {
        let ch = false;
        try {
            Object.keys(AL()).forEach(ak => {
                const NEW = AL()[ak];
                // 1) Diğer ligler verisi + sezon slotları
                Object.keys(euroLeaguesData || {}).forEach(se => {
                    const o = euroLeaguesData[se]; if (!o) return;
                    Object.keys(o).filter(k => lgNorm(k) === ak).forEach(k => {
                        const has = a => (a || []).some(x => x && String(x.name || '').trim());
                        if (!has(o[NEW])) o[NEW] = o[k];
                        delete o[k]; ch = true;
                    });
                });
                Object.keys(euroSlotsData || {}).forEach(se => {
                    const a = euroSlotsData[se]; if (!Array.isArray(a)) return;
                    const m = a.map(n => lgNorm(n) === ak ? NEW : n), u = m.filter((n, i) => m.indexOf(n) === i);
                    if (m.some((n, i) => n !== a[i]) || u.length !== m.length) { euroSlotsData[se] = u; ch = true; }
                });
                // 2) Özel lig kaydı ve logo
                if (Array.isArray(customCatalog)) {
                    const dup = customCatalog.filter(e => e && lgNorm(e.n) === ak);
                    if (dup.length) {
                        if (!customCatalog.some(e => e && e.n === NEW)) { dup[0].n = NEW; dup.shift(); }
                        customCatalog = customCatalog.filter(e => !dup.includes(e)); ch = true;
                    }
                }
                if (typeof competitionLogos === 'object' && competitionLogos) Object.keys(competitionLogos).filter(k => lgNorm(k) === ak).forEach(k => { if (!competitionLogos[NEW]) competitionLogos[NEW] = competitionLogos[k]; delete competitionLogos[k]; ch = true; });
                // 3) Kupalar sütunu (yalnızca otomatik açılanlar: lg_ / ct_)
                const cols = (tournamentsList || []).filter(t => lgNorm(t.name) === ak && /^(lg_|ct_)/.test(String(t.id)));
                cols.forEach(c => {
                    let dst = tournamentsList.find(t => t !== c && lgNorm(t.name) === lgNorm(NEW));
                    if (!dst) { c.name = NEW; ch = true; return; }
                    Object.keys(trophyData || {}).forEach(se => { const m = trophyData[se]; if (m && m[c.id]) { if (!m[dst.id]) m[dst.id] = m[c.id]; delete m[c.id]; } });
                    tournamentsList = tournamentsList.filter(t => t !== c); ch = true;
                });
            });
            // 4) Verisi olmayan ligin otomatik kupa kutusu (ör. Romanya şampiyonu Danimarka sütununda) temizlenir
            const hasData = {};
            Object.keys(euroLeaguesData || {}).forEach(se => Object.keys(euroLeaguesData[se] || {}).forEach(k => { if ((euroLeaguesData[se][k] || []).some(x => x && String(x.name || '').trim())) { (hasData[se] = hasData[se] || new Set()).add(colKey(k)); } }));
            (tournamentsList || []).filter(t => /^lg_/.test(String(t.id))).forEach(t => {
                Object.keys(trophyData || {}).forEach(se => {
                    const c = trophyData[se] && trophyData[se][t.id]; if (!c) return;
                    if (hasData[se] && hasData[se].has(colKey(t.name))) return;
                    const mine = (customTournamentsData && customTournamentsData[se] || []).some(x => x && x.type && colKey(x.type) === colKey(t.name));
                    if (mine) return;
                    ['champion', 'runnerUp'].forEach(r => { if (c[r] && c[r].auto && c[r].src !== 'ct') { c[r] = null; ch = true; } });
                    if (!c.champion && !c.runnerUp) delete trophyData[se][t.id];
                });
            });
            // 4b) Otomatik açılmış, hiçbir sezonda verisi kalmayan ve özel lig kaydı olmayan sütun kaldırılır
            if (ch) {
                const used = id => Object.keys(trophyData || {}).some(se => { const c = trophyData[se] && trophyData[se][id]; return c && (c.champion || c.runnerUp); });
                const cat = (customCatalog || []).map(e => colKey(e.n));
                const n0 = (tournamentsList || []).length;
                tournamentsList = tournamentsList.filter(t => !(/^lg_/.test(String(t.id)) && !used(t.id) && !cat.includes(colKey(t.name)) && !Object.keys(euroLeaguesData || {}).some(se => Object.keys(euroLeaguesData[se] || {}).some(k => colKey(k) === colKey(t.name)))));
                if (tournamentsList.length !== n0) ch = true;
            }
            // 5) Doğru ad altında kupa kutularını yeniden üret
            if (ch) Object.keys(euroLeaguesData || {}).forEach(se => Object.keys(euroLeaguesData[se] || {}).forEach(k => { try { window.euroSyncTrophies(se, k); } catch (e) {} }));
        } catch (e) { console.warn('gt-entry lig birleştirme:', e); }
        if (ch) { try { saveToLocalStorage(); } catch (e) {} }
        return ch;
    }
    window.gtMergeLeagueNames = mergeLeagueNames;
    if (typeof window.applyLoadedData === 'function') {
        const oA = window.applyLoadedData;
        window.applyLoadedData = function () { const r = oA.apply(this, arguments); mergeLeagueNames(); return r; };
    }
    // Yeni girişlerde de otomatik: slot seçimi ve toplu ekleme eski adı yazsa bile tek ada çevrilir
    if (typeof window.setEuroSlot === 'function') {
        const oS = window.setEuroSlot;
        window.setEuroSlot = function (season, idx, name) { return oS.call(this, season, idx, lgCanonOf(name) || name); };
    }
    if (typeof window.processEuroLeaguesBulkInput === 'function') {
        const oB = window.processEuroLeaguesBulkInput;
        window.processEuroLeaguesBulkInput = function () {
            try { const ta = document.getElementById('el-bulk-input'); if (ta) ta.value = ta.value.split('\n').map(l => { const p = l.split(/([,;\t])/); const c = lgCanonOf((p[0] || '').trim()); if (c) p[0] = c; return p.join(''); }).join('\n'); } catch (e) {}
            const r = oB.apply(this, arguments); mergeLeagueNames(); return r;
        };
    }
    if (typeof window.renderTrophiesGrid === 'function') {
        const oG = window.renderTrophiesGrid;
        window.renderTrophiesGrid = function () { mergeLeagueNames(); return oG.apply(this, arguments); };
    }
    setTimeout(mergeLeagueNames, 0);

    // ================= YAŞ: doğum tarihinden otomatik =================
    const CP_DATE = { t1: [8, 31, 0], s1: [12, 31, 0], t2: [1, 31, 1], s2: [6, 30, 1] };
    function ageAt(iso, season, cp) {
        const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/), sy = parseInt(String(season || '').slice(0, 2)), d = CP_DATE[cp];
        if (!m || !(sy >= 0) || !d) return null;
        const y = 2000 + sy + d[2]; let a = y - (+m[1]);
        if (d[0] < +m[2] || (d[0] === +m[2] && d[1] < +m[3])) a--;
        return a;
    }
    function fillAges(p) {
        let ch = false;
        if (!p || !p.birthDate || !p.history) return ch;
        Object.keys(p.history).forEach(sn => {
            const h = p.history[sn]; if (!h) return;
            ORDER.forEach(c => {
                const have = parseInt(h[c + 'a']) > 0, auto = h[c + 'aA'] === 1;
                if (have && !auto) return;
                if (!(parseInt(h[c + 'o']) > 0 || ['in', 'free_in', 'loan_in', 'academy'].includes(h[c + 'Type']))) return;
                const a = ageAt(p.birthDate, sn, c); if (a === null || a < 10 || a > 55) return;
                if (h[c + 'a'] !== a) { h[c + 'a'] = a; h[c + 'aA'] = 1; ch = true; }
            });
        });
        return ch;
    }
    function fillAgesAll() {
        let ch = false;
        try { ['astakim', 'akademi', 'milli'].forEach(c => (squadData[c] || []).forEach(p => { if (fillAges(p)) ch = true; })); } catch (e) {}
        return ch;
    }
    window.gtFillAges = fillAgesAll;
    if (typeof window.gtSqBirthSave === 'function') {
        const oB = window.gtSqBirthSave;
        window.gtSqBirthSave = function () { const r = oB.apply(this, arguments); try { if (fillAgesAll()) { saveToLocalStorage(); if (typeof renderSquadGrid === 'function') renderSquadGrid(); } } catch (e) {} return r; };
    }
    if (typeof window.applyLoadedData === 'function') {
        const oL = window.applyLoadedData;
        window.applyLoadedData = function () { const r = oL.apply(this, arguments); fillAgesAll(); return r; };
    }
    setTimeout(fillAgesAll, 0);

    // ================= Development Plans önizlemesi: OVR sıçraması uyarısı =================
    if (typeof window.attrImportPreview === 'function') {
        const oP = window.attrImportPreview;
        window.attrImportPreview = function () {
            const r = oP.apply(this, arguments);
            try {
                const old = document.getElementById('gte-aw'); if (old) old.remove();
                const msg = document.getElementById('ai-msg'); if (!msg || typeof attrImportRows === 'undefined' || !attrImportRows.length) return r;
                const cx = document.getElementById('ai-ctx').value, squad = (squadData[cx] || []);
                const big = [];
                attrImportRows.forEach(row => {
                    const p = squad.find(x => x.id === row.pick); if (!p) return;
                    const last = typeof attrPair === 'function' ? attrPair(p) : null, oldO = parseInt(last ? last.to.ovr : (p.currentOvr || p.joinOvr)), nu = parseInt(row.v.ovr);
                    if (oldO && nu && Math.abs(nu - oldO) > 10) big.push(`${p.name} ${oldO} → ${nu}`);
                });
                if (big.length) { const w = document.createElement('div'); w.id = 'gte-aw'; w.className = 'gte-w'; w.style.margin = '6px 0'; w.textContent = '⚠ ' + L(`OVR değişimi 10'dan büyük: ${big.join(', ')}. Videoyu kontrol et.`, `OVR change over 10: ${big.join(', ')}. Check the video.`); msg.insertAdjacentElement('afterend', w); }
            } catch (e) { console.warn('gt-entry uyarı:', e); }
            return r;
        };
    }
})();
