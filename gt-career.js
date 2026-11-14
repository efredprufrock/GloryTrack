// =====================================================================
// GloryTrack · Kariyer İstatistikleri paneli (Maçlar sayfası → "Kariyer" görünümü)
// script.js'ten SONRA yüklenir. Maçlar sayfasındaki tüm maç kayıtlarından
// (matchDataStore) kariyer boyu istatistikleri hesaplar; veri yazmaz, yalnızca okur.
// =====================================================================
const GTCR = (() => { let s = {}; try { s = JSON.parse(localStorage.getItem('gt_cr_ui') || '{}') || {}; } catch (e) {} return Object.assign({ on: false, tour: 'all' }, s); })();
function gtCrL(tr, en) { return (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr; }
function gtCrSave() { try { localStorage.setItem('gt_cr_ui', JSON.stringify(GTCR)); } catch (e) {} }
function gtCrE(s) { return escapeHtml(String(s == null ? '' : s)); }
function gtCrNum(v) { if (v === '' || v === null || v === undefined) return null; const n = parseInt(v); return isNaN(n) ? null : n; }
function gtCrSetView(on) { GTCR.on = !!on; gtCrSave(); renderMatchesGrid(); }
// Fikstür sayfasından açıldıysa (GTCR.fx) panel yerinde yenilenir, değilse Maçlar sayfası çizilir
function gtCrRefresh() { gtCrShowFx(); }
function gtCrShowFx() { GTCR.fx = true; window.__gtCrOwn = true; try { updateContentArea(gtCrRender()); } finally { window.__gtCrOwn = false; } }
function gtCrCloseFx() { GTCR.fx = false; if (typeof renderFixturePanel === 'function') renderFixturePanel(); }
function gtCrSetTour(t) { GTCR.tour = t; gtCrSave(); gtCrRefresh(); }
function gtCrSetCtx(c) { matchContext = c; GTCR.tour = 'all'; gtCrSave(); gtCrRefresh(); }

// ---------------- Veri ----------------
function gtCrMatches(ctx) {
    const cfg = opponentsConfig[ctx] || {}, oppMap = {};
    [cfg.domestic].concat(cfg.foreign || []).forEach(g => ((g && g.teams) || []).forEach(t => { if (t && t.id) oppMap[t.id] = t; }));
    const out = [];
    seasonsList.forEach((s, si) => {
        const sd = (matchDataStore[ctx] || {})[s] || {}, no = {};
        (fixtureData[s] || []).forEach(f => { if (f && f.id) no[f.id] = parseInt(f.matchNo) || 800; });
        Object.keys(sd).forEach(oid => (sd[oid] || []).forEach((m, i) => {
            if (!m) return;
            const tn = String(m.tournament || '');
            if (/pre-?season|hazırlık|friendly/i.test(tn)) return;
            const gf = gtCrNum(m.teamScore), ga = gtCrNum(m.oppScore);
            const r = (m.result === 'W' || m.result === 'D' || m.result === 'L') ? m.result : (gf !== null && ga !== null ? (gf > ga ? 'W' : gf < ga ? 'L' : 'D') : '');
            if (!r) return;
            const o = oppMap[oid] || {};
            let t = tn; try { t = tourCanon(tn) || tn; } catch (e) {}
            out.push({ s, si, ord: no[m.fixtureId] !== undefined ? no[m.fixtureId] : 900 + i, oid, opp: o.name || '?', gf, ga, r, loc: m.location === 'H' ? 'H' : m.location === 'A' ? 'A' : 'N', t: t || gtCrL('Diğer', 'Other'), ev: Array.isArray(m.events) ? m.events : [], lg: m.goals, la: m.assists });
        }));
    });
    return out.sort((a, b) => a.si - b.si || a.ord - b.ord);
}
function gtCrRec(a) {
    const w = a.filter(x => x.r === 'W').length, d = a.filter(x => x.r === 'D').length, l = a.filter(x => x.r === 'L').length, n = a.length, sc = a.filter(x => x.gf !== null && x.ga !== null);
    const gf = sc.reduce((s, x) => s + x.gf, 0), ga = sc.reduce((s, x) => s + x.ga, 0);
    return { n, w, d, l, gf, ga, gd: gf - ga, sn: sc.length, wp: n ? w * 100 / n : 0, ppg: n ? (3 * w + d) / n : 0, cs: sc.filter(x => x.ga === 0).length, fts: sc.filter(x => x.gf === 0).length, btts: sc.filter(x => x.gf > 0 && x.ga > 0).length };
}
function gtCrStreak(M, ok) {
    let best = 0, cur = 0, bestEnd = -1;
    M.forEach((x, i) => { cur = ok(x) ? cur + 1 : 0; if (cur > best) { best = cur; bestEnd = i; } });
    return { best, cur, from: best ? M[bestEnd - best + 1] : null, to: best ? M[bestEnd] : null };
}
function gtCrData(ctx, tour) {
    const team = String((managedTeams[ctx] || {}).name || '').trim(), all = gtCrMatches(ctx);
    const tours = [...new Set(all.map(x => x.t))];
    const M = tour && tour !== 'all' ? all.filter(x => x.t === tour) : all;
    const D = { team, tours, M, rec: gtCrRec(M) };
    // Sezonlar
    D.seasons = seasonsList.map(s => { const a = M.filter(x => x.s === s); return a.length ? Object.assign({ s }, gtCrRec(a)) : null; }).filter(Boolean);
    // İç saha / deplasman
    D.home = gtCrRec(M.filter(x => x.loc === 'H')); D.away = gtCrRec(M.filter(x => x.loc === 'A'));
    // Turnuvalar
    D.byTour = tours.map(t => Object.assign({ t }, gtCrRec(M.filter(x => x.t === t)))).filter(x => x.n).sort((a, b) => b.n - a.n);
    // Seriler
    D.st = {
        win: gtCrStreak(M, x => x.r === 'W'), unb: gtCrStreak(M, x => x.r !== 'L'), cs: gtCrStreak(M, x => x.ga === 0),
        sco: gtCrStreak(M, x => x.gf > 0), now: gtCrStreak(M, x => x.r !== 'W'), lose: gtCrStreak(M, x => x.r === 'L')
    };
    // Rekorlar
    const sc = M.filter(x => x.gf !== null && x.ga !== null), top = (a, f) => a.length ? a.slice().sort((x, y) => f(y) - f(x))[0] : null;
    D.records = {
        bigWin: top(sc.filter(x => x.r === 'W'), x => (x.gf - x.ga) * 100 + x.gf),
        bigLoss: top(sc.filter(x => x.r === 'L'), x => (x.ga - x.gf) * 100 + x.ga),
        goalFest: top(sc, x => (x.gf + x.ga) * 100 + x.gf),
        mostFor: top(sc, x => x.gf * 100 - x.ga)
    };
    // Rakipler
    const O = {};
    M.forEach(x => { (O[x.oid] = O[x.oid] || { opp: x.opp, a: [] }).a.push(x); });
    D.opps = Object.values(O).map(o => Object.assign({ opp: o.opp }, gtCrRec(o.a)));
    D.oppMost = D.opps.slice().sort((a, b) => b.n - a.n || b.w - a.w).slice(0, 8);
    D.oppFav = top(D.opps.filter(o => o.w > 0), o => o.w * 1000 + o.gd);
    D.oppNight = top(D.opps.filter(o => o.l > 0), o => o.l * 1000 - o.gd);
    D.oppPerfect = D.opps.filter(o => o.n >= 3 && o.w === o.n).sort((a, b) => b.n - a.n).slice(0, 3);
    // Gol / asist
    const G = {}, A = {}, PA = {}, hats = [], BK = [0, 0, 0, 0, 0, 0].map(() => ({ f: 0, a: 0 }));
    const bIdx = b => b <= 15 ? 0 : b <= 30 ? 1 : b <= 45 ? 2 : b <= 60 ? 3 : b <= 75 ? 4 : 5;
    let goalNo = 0, winNo = 0; const GM = [1, 50, 100, 250, 500, 1000], WM = [1, 50, 100, 250, 500], miles = [];
    M.forEach(x => {
        const per = {}, us = x.ev.filter(ev => ev && ev.type === 'US');
        const add = (s, a) => { s = String(s || '').trim(); a = String(a || '').trim(); if (s) { G[s] = (G[s] || 0) + 1; per[s] = (per[s] || 0) + 1; } if (a) A[a] = (A[a] || 0) + 1; if (s && a) { const k = a + ' → ' + s; PA[k] = (PA[k] || 0) + 1; } };
        if (us.length) us.forEach(ev => add(ev.scorer, ev.assist)); else { (x.lg || []).forEach(g => add(g, '')); (x.la || []).forEach(a => add('', a)); }
        Object.keys(per).forEach(n => { if (per[n] >= 3) hats.push({ n, c: per[n], x }); });
        x.ev.forEach(ev => { if (!ev || !/^(US|OPP|OG)$/.test(ev.type)) return; const m = String(ev.min == null ? '' : ev.min).match(/(\d+)/); if (m) BK[bIdx(parseInt(m[1]))][ev.type === 'US' ? 'f' : 'a']++; });
        if (x.gf) { const before = goalNo; goalNo += x.gf; GM.forEach(k => { if (before < k && goalNo >= k) { const ev = us.length === x.gf ? us[k - before - 1] : null; miles.push({ k, type: 'g', x, who: ev && ev.scorer }); } }); }
        if (x.r === 'W') { winNo++; if (WM.indexOf(winNo) !== -1) miles.push({ k: winNo, type: 'w', x }); }
    });
    const rank = (o, n) => Object.keys(o).map(k => ({ n: k, v: o[k] })).sort((a, b) => b.v - a.v).slice(0, n);
    D.scorers = rank(G, 8); D.assists = rank(A, 8); D.duos = rank(PA, 4); D.hats = hats; D.BK = BK; D.miles = miles;
    const GA = {}; Object.keys(G).forEach(k => GA[k] = (GA[k] || 0) + G[k]); Object.keys(A).forEach(k => GA[k] = (GA[k] || 0) + A[k]);
    D.contrib = rank(GA, 5).map(x => Object.assign(x, { g: G[x.n] || 0, a: A[x.n] || 0 }));
    D.nScorers = Object.keys(G).length;
    // Skor dağılımı
    const SL = {}; sc.forEach(x => { const k = x.gf + '-' + x.ga; (SL[k] = SL[k] || { k, n: 0, r: x.r }).n++; });
    D.scores = Object.values(SL).sort((a, b) => b.n - a.n).slice(0, 8);
    // Kupalar
    D.trophies = []; D.runner = 0;
    try {
        const our = team.toLowerCase();
        (tournamentsList || []).forEach(t => {
            const won = [];
            seasonsList.forEach(s => { const c = trophyData[s] && trophyData[s][t.id]; if (!c) return; if (c.champion && homeIsUs(c.champion.name, our)) won.push(s); else if (c.runnerUp && homeIsUs(c.runnerUp.name, our)) D.runner++; });
            if (won.length) D.trophies.push({ name: t.name, logo: t.logoUrl, color: t.colorHex, seasons: won });
        });
        D.trophies.sort((a, b) => b.seasons.length - a.seasons.length);
    } catch (e) {}
    D.nTrophy = D.trophies.reduce((s, t) => s + t.seasons.length, 0);
    // Transferler (yalnızca kulüp)
    if (ctx === 'kulup' && typeof transferData !== 'undefined') {
        const sum = a => (a || []).reduce((s, t) => s + (parseInt(t.fee) || 0), 0), big = a => (a || []).slice().sort((x, y) => (y.fee || 0) - (x.fee || 0))[0];
        D.tr = { inN: (transferData.in || []).length, outN: (transferData.out || []).length, spent: sum(transferData.in), earned: sum(transferData.out), bigIn: big(transferData.in), bigOut: big(transferData.out) };
    }
    return D;
}

// ---------------- Görünüm yardımcıları ----------------
function gtCrLogo(name, cls) { let u = ''; try { u = getTeamLogoByName(name) || ''; } catch (e) {} return u ? `<img class="${cls || 'cr-lg'}" src="${gtCrE(u)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : ''; }
function gtCrFace(name) { let u = ''; try { u = getPlayerPhotoByName(name) || ''; } catch (e) {} return u && !/ui-avatars/.test(u) ? `<img class="cr-face" src="${gtCrE(u)}" alt="" loading="lazy" onerror="this.outerHTML='<span class=&quot;cr-face&quot;>${gtCrE(String(name).charAt(0))}</span>'">` : `<span class="cr-face">${gtCrE(String(name).charAt(0))}</span>`; }
function gtCrMoney(n) { n = n || 0; const a = Math.abs(n); return (n < 0 ? '-' : '') + '€' + (a >= 1e9 ? (a / 1e9).toFixed(2) + 'B' : a >= 1e6 ? (a / 1e6).toFixed(a >= 1e7 ? 0 : 1) + 'M' : a >= 1e3 ? Math.round(a / 1e3) + 'K' : a); }
function gtCrWdl(r, h) { const n = r.n || 1; return `<span class="cr-wdl" style="height:${h || 6}px"><i class="w" style="width:${r.w * 100 / n}%"></i><i class="d" style="width:${r.d * 100 / n}%"></i><i class="l" style="width:${r.l * 100 / n}%"></i></span>`; }
function gtCrMatchLine(x) { return x ? `<span class="cr-ml">${gtCrLogo(x.opp)}<b>${gtCrE(x.opp)}</b><em>${gtCrE(x.s)} · ${x.loc === 'H' ? gtCrL('İç saha', 'Home') : x.loc === 'A' ? gtCrL('Deplasman', 'Away') : gtCrL('Tarafsız', 'Neutral')}</em></span>` : ''; }
function gtCrDonut(r) {
    const C = 2 * Math.PI * 42, n = r.n || 1; let off = 0;
    const seg = (v, c) => { const len = v / n * C, s = `<circle cx="50" cy="50" r="42" fill="none" stroke="${c}" stroke-width="11" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-off}" transform="rotate(-90 50 50)"/>`; off += len; return v ? s : ''; };
    return `<svg class="cr-donut" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(148,163,184,.14)" stroke-width="11"/>${seg(r.w, '#22c55e')}${seg(r.d, '#eab308')}${seg(r.l, '#ef4444')}<text x="50" y="49" text-anchor="middle" class="cr-dn">${Math.round(r.wp)}%</text><text x="50" y="63" text-anchor="middle" class="cr-dl">${gtCrL('GALİBİYET', 'WIN RATE')}</text></svg>`;
}
function gtCrSeasonChart(S) {
    if (S.length < 2) return '';
    const W = 560, H = 150, pl = 26, pr = 12, pt = 14, pb = 24, iw = W - pl - pr, ih = H - pt - pb, mx = Math.max(1, ...S.map(s => Math.max(s.gf, s.ga)));
    const x = i => pl + (S.length === 1 ? iw / 2 : i * iw / (S.length - 1)), y = v => pt + ih - v / 3 * ih, bw = Math.min(16, iw / S.length / 3);
    let g = '';
    [0, 1, 2, 3].forEach(v => { g += `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" class="cr-gl"/><text x="${pl - 6}" y="${y(v) + 3}" text-anchor="end" class="cr-ax">${v}</text>`; });
    S.forEach((s, i) => {
        const hf = s.gf / mx * ih * .55, ha = s.ga / mx * ih * .55;
        g += `<rect x="${x(i) - bw - 1}" y="${pt + ih - hf}" width="${bw}" height="${hf}" rx="2" class="cr-bf"><title>${s.s}: ${s.gf} ${gtCrL('attı', 'for')}</title></rect><rect x="${x(i) + 1}" y="${pt + ih - ha}" width="${bw}" height="${ha}" rx="2" class="cr-ba"><title>${s.s}: ${s.ga} ${gtCrL('yedi', 'against')}</title></rect>`;
        g += `<text x="${x(i)}" y="${H - 7}" text-anchor="middle" class="cr-ax">${gtCrE(s.s)}</text>`;
    });
    g += `<polyline points="${S.map((s, i) => x(i) + ',' + y(s.ppg)).join(' ')}" class="cr-ln"/>`;
    S.forEach((s, i) => { g += `<circle cx="${x(i)}" cy="${y(s.ppg)}" r="4" class="cr-pt"><title>${s.s}: ${s.ppg.toFixed(2)} ${gtCrL('puan/maç', 'pts/match')}</title></circle><text x="${x(i)}" y="${y(s.ppg) - 8}" text-anchor="middle" class="cr-pv">${s.ppg.toFixed(2)}</text>`; });
    return `<svg class="cr-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${g}</svg><div class="cr-leg"><span><i class="ln"></i>${gtCrL('Maç başı puan', 'Points per match')}</span><span><i class="bf"></i>${gtCrL('Atılan gol', 'Goals for')}</span><span><i class="ba"></i>${gtCrL('Yenen gol', 'Goals against')}</span></div>`;
}
function gtCrMinutes(BK) {
    const L = ["1–15'", "16–30'", "31–45'", "46–60'", "61–75'", "76–90+'"], mx = Math.max(1, ...BK.map(b => Math.max(b.f, b.a)));
    if (!BK.some(b => b.f || b.a)) return `<p class="cr-none">${gtCrL('Gol dakikası girilmiş maç yok.', 'No matches with goal minutes yet.')}</p>`;
    return `<div class="cr-min">${BK.map((b, i) => `<div><span class="f" style="height:${b.f / mx * 100}%"><b>${b.f || ''}</b></span><span class="a" style="height:${b.a / mx * 100}%"><b>${b.a || ''}</b></span><em>${L[i]}</em></div>`).join('')}</div><div class="cr-leg"><span><i class="bf"></i>${gtCrL('Attığımız', 'Scored')}</span><span><i class="ba"></i>${gtCrL('Yediğimiz', 'Conceded')}</span></div>`;
}

// ---------------- Panel ----------------
function gtCrRender() {
    const ctx = matchContext === 'milli' ? 'milli' : 'kulup', L = gtCrL;
    let D; try { D = gtCrData(ctx, GTCR.tour); } catch (e) { console.error(e); return `<div class="cr"><p class="cr-none">${L('İstatistikler hesaplanamadı.', 'Stats could not be calculated.')}</p></div>`; }
    if (GTCR.tour !== 'all' && D.tours.indexOf(GTCR.tour) === -1) { GTCR.tour = 'all'; D = gtCrData(ctx, 'all'); }
    const R = D.rec, f1 = n => (Math.round(n * 10) / 10).toFixed(1), f2 = n => n.toFixed(2), per = (a, b) => b ? f2(a / b) : '–';
    const head = `<div class="cr-top">
        <div class="cr-id">${gtCrLogo(D.team, 'cr-crest')}<div><span>${L('Kariyer istatistikleri', 'Career statistics')}</span><h2>${gtCrE(D.team || L('Takım seçilmedi', 'No team set'))}</h2></div></div>
        <div class="cr-ctl">
            <select onchange="gtCrSetTour(this.value)" title="${L('Turnuva filtresi', 'Competition filter')}"><option value="all">${L('Tüm turnuvalar', 'All competitions')}</option>${D.tours.map(t => `<option value="${gtCrE(t)}"${GTCR.tour === t ? ' selected' : ''}>${gtCrE(t)}</option>`).join('')}</select>
            <div class="cr-seg"><button type="button" class="${ctx === 'kulup' ? 'on' : ''}" onclick="gtCrSetCtx('kulup')">${L('Kulüp', 'Club')}</button><button type="button" class="${ctx === 'milli' ? 'on' : ''}" onclick="gtCrSetCtx('milli')">${L('Milli', 'National')}</button></div>
            <button type="button" class="cr-back" onclick="gtCrCloseFx()"><i class="fa-solid fa-arrow-left"></i>${L('Fikstür', 'Fixtures')}</button>
        </div></div>`;
    if (!R.n) return `<div class="cr">${head}<div class="cr-empty"><i class="fa-solid fa-chart-line"></i><b>${L('Henüz oynanmış maç yok', 'No played matches yet')}</b><span>${L('Fikstürden ya da Maçlar sayfasından skor girdikçe bu panel dolacak.', 'This panel fills up as you enter results from the fixtures or the Matches page.')}</span></div></div>`;

    const st = D.st, stCard = (ic, lbl, s, unit) => `<div class="cr-st"><i class="fa-solid ${ic}"></i><b>${s.best}</b><span>${lbl}</span><em>${s.best && s.from ? gtCrE(s.from.s === s.to.s ? s.from.s : s.from.s + ' → ' + s.to.s) : '–'}${s.cur > 1 && s.cur === s.best ? ` · <u>${L('sürüyor', 'ongoing')}</u>` : ''}</em></div>`;
    const cur = st.win.cur ? [st.win.cur, L('maçtır kazanıyor', 'wins in a row'), 'w'] : st.unb.cur ? [st.unb.cur, L('maçtır yenilmiyor', 'unbeaten'), 'd'] : [st.lose.cur, L('maçtır kaybediyor', 'losses in a row'), 'l'];
    const last = D.M.slice(-12), rc = D.records;
    const recRow = (ic, lbl, x, cls) => x ? `<div class="cr-rr"><i class="fa-solid ${ic} ${cls}"></i><div><span>${lbl}</span>${gtCrMatchLine(x)}</div><b class="${x.r}">${x.gf}–${x.ga}</b></div>` : '';
    const split = (lbl, ic, r) => `<div class="cr-sp"><h4><i class="fa-solid ${ic}"></i>${lbl}<em>${r.n} ${L('maç', 'matches')}</em></h4>${r.n ? `${gtCrWdl(r, 8)}<div class="cr-sp3"><span><b class="W">${r.w}</b>${L('G', 'W')}</span><span><b class="D">${r.d}</b>${L('B', 'D')}</span><span><b class="L">${r.l}</b>${L('M', 'L')}</span></div><div class="cr-kv"><span>${L('Galibiyet', 'Win rate')}<b>%${Math.round(r.wp)}</b></span><span>${L('Puan/maç', 'Pts/match')}<b>${f2(r.ppg)}</b></span><span>${L('Gol', 'Goals')}<b>${r.gf}–${r.ga}</b></span><span>${L('Gol yemeden', 'Clean sheets')}<b>${r.cs}</b></span></div>` : `<p class="cr-none">–</p>`}</div>`;
    const bar = (list, cls) => { const mx = Math.max(1, ...list.map(x => x.v)); return list.length ? list.map((x, i) => `<div class="cr-pl"><em>${i + 1}</em>${gtCrFace(x.n)}<span>${gtCrE(x.n)}</span><i><u class="${cls}" style="width:${x.v * 100 / mx}%"></u></i><b>${x.v}</b></div>`).join('') : `<p class="cr-none">${L('Kayıt yok.', 'No records.')}</p>`; };
    const mileTxt = m => m.type === 'g' ? `<b>${m.k}.</b> ${L('gol', m.k === 1 ? 'st goal' : 'th goal')}${m.who ? ' · ' + gtCrE(m.who) : ''}` : `<b>${m.k}.</b> ${L('galibiyet', m.k === 1 ? 'st win' : 'th win')}`;

    return `<div class="cr custom-scrollbar">${head}
    <section class="cr-hero">
        <div class="cr-hd">${gtCrDonut(R)}<div class="cr-hw"><div><b class="W">${R.w}</b><span>${L('Galibiyet', 'Wins')}</span></div><div><b class="D">${R.d}</b><span>${L('Beraberlik', 'Draws')}</span></div><div><b class="L">${R.l}</b><span>${L('Mağlubiyet', 'Losses')}</span></div></div></div>
        <div class="cr-kpis">
            <div class="cr-kpi"><span>${L('Maç', 'Matches')}</span><b>${R.n}</b><em>${D.seasons.length} ${L('sezon', 'seasons')}</em></div>
            <div class="cr-kpi"><span>${L('Maç başı puan', 'Points per match')}</span><b>${f2(R.ppg)}</b><em>${3 * R.w + R.d} ${L('puan', 'points')}</em></div>
            <div class="cr-kpi"><span>${L('Atılan gol', 'Goals for')}</span><b>${R.gf}</b><em>${per(R.gf, R.sn)} ${L('maç başı', 'per match')}</em></div>
            <div class="cr-kpi"><span>${L('Yenen gol', 'Goals against')}</span><b>${R.ga}</b><em>${per(R.ga, R.sn)} ${L('maç başı', 'per match')}</em></div>
            <div class="cr-kpi"><span>${L('Averaj', 'Goal difference')}</span><b class="${R.gd > 0 ? 'W' : R.gd < 0 ? 'L' : ''}">${R.gd > 0 ? '+' : ''}${R.gd}</b><em>${L('gol farkı', 'goal diff.')}</em></div>
            <div class="cr-kpi"><span>${L('Gol yemeden', 'Clean sheets')}</span><b>${R.cs}</b><em>%${R.sn ? Math.round(R.cs * 100 / R.sn) : 0} ${L('maçların', 'of matches')}</em></div>
            <div class="cr-kpi"><span>${L('Gol atamadan', 'Failed to score')}</span><b>${R.fts}</b><em>%${R.sn ? Math.round(R.fts * 100 / R.sn) : 0} ${L('maçların', 'of matches')}</em></div>
            <div class="cr-kpi gold"><span>${L('Kupa', 'Trophies')}</span><b>${D.nTrophy}</b><em>${D.runner} ${L('ikincilik', 'runner-up')}</em></div>
        </div>
    </section>
    <div class="cr-grid">
        <section class="cr-card c7"><h3><i class="fa-solid fa-chart-line"></i>${L('Sezon sezon', 'Season by season')}</h3>${gtCrSeasonChart(D.seasons)}
            <div class="cr-tw"><table class="cr-tb"><thead><tr><th>${L('Sezon', 'Season')}</th><th>${L('M', 'P')}</th><th>${L('G', 'W')}</th><th>${L('B', 'D')}</th><th>${L('M', 'L')}</th><th>${L('A', 'GF')}</th><th>${L('Y', 'GA')}</th><th>±</th><th>%</th><th>${L('P/M', 'PPG')}</th><th></th></tr></thead><tbody>
            ${D.seasons.slice().reverse().map(s => `<tr><td class="s">${gtCrE(s.s)}</td><td>${s.n}</td><td class="W">${s.w}</td><td class="D">${s.d}</td><td class="L">${s.l}</td><td>${s.gf}</td><td>${s.ga}</td><td class="${s.gd > 0 ? 'W' : s.gd < 0 ? 'L' : ''}">${s.gd > 0 ? '+' : ''}${s.gd}</td><td>${Math.round(s.wp)}</td><td><b>${f2(s.ppg)}</b></td><td class="b">${gtCrWdl(s)}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="cr-card c5"><h3><i class="fa-solid fa-fire"></i>${L('Seriler ve form', 'Streaks and form')}</h3>
            <div class="cr-now ${cur[2]}"><b>${cur[0]}</b><span>${cur[1]}</span><div class="cr-form">${last.map(x => `<i class="${x.r}" title="${gtCrE(x.s + ' · ' + x.opp + (x.gf !== null ? ' ' + x.gf + '–' + x.ga : ''))}">${x.r === 'W' ? L('G', 'W') : x.r === 'D' ? L('B', 'D') : L('M', 'L')}</i>`).join('')}</div></div>
            <div class="cr-sts">${stCard('fa-trophy', L('Galibiyet serisi', 'Winning run'), st.win)}${stCard('fa-shield-halved', L('Yenilmezlik serisi', 'Unbeaten run'), st.unb)}${stCard('fa-lock', L('Gol yemeden seri', 'Clean-sheet run'), st.cs)}${stCard('fa-futbol', L('Üst üste gol atılan maç', 'Scoring run'), st.sco)}${stCard('fa-hourglass-half', L('Galibiyetsiz seri', 'Winless run'), st.now)}${stCard('fa-arrow-trend-down', L('Mağlubiyet serisi', 'Losing run'), st.lose)}</div></section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-medal"></i>${L('Rekor maçlar', 'Record matches')}</h3>
            ${recRow('fa-bolt', L('En farklı galibiyet', 'Biggest win'), rc.bigWin, 'W')}${recRow('fa-skull', L('En ağır yenilgi', 'Heaviest defeat'), rc.bigLoss, 'L')}${recRow('fa-fire-flame-curved', L('En gollü maç', 'Highest-scoring match'), rc.goalFest, 'D')}${rc.mostFor && rc.mostFor !== rc.bigWin ? recRow('fa-futbol', L('Bir maçta en çok gol', 'Most goals in a match'), rc.mostFor, 'W') : ''}
            ${(rc.bigWin || rc.bigLoss) ? '' : `<p class="cr-none">${L('Skoru girilmiş maç yok.', 'No matches with scores.')}</p>`}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-house"></i>${L('İç saha / deplasman', 'Home / away')}</h3><div class="cr-sps">${split(L('İç saha', 'Home'), 'fa-house', D.home)}${split(L('Deplasman', 'Away'), 'fa-plane', D.away)}</div></section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-clock"></i>${L('Gol dakikaları', 'Goal minutes')}</h3>${gtCrMinutes(D.BK)}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-futbol"></i>${L('Gol krallığı', 'Top scorers')}<em>${D.nScorers} ${L('farklı oyuncu', 'different scorers')}</em></h3>${bar(D.scorers, 'g')}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-shoe-prints"></i>${L('Asist krallığı', 'Top assists')}</h3>${bar(D.assists, 'a')}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-star"></i>${L('Gol katkısı ve ikililer', 'Goal involvement and duos')}</h3>
            ${D.contrib.length ? D.contrib.map(x => `<div class="cr-pl"><em></em>${gtCrFace(x.n)}<span>${gtCrE(x.n)}</span><small>${x.g}G + ${x.a}A</small><b>${x.v}</b></div>`).join('') : `<p class="cr-none">${L('Kayıt yok.', 'No records.')}</p>`}
            ${D.duos.length ? `<h5>${L('En verimli ikililer (asist → gol)', 'Best duos (assist → goal)')}</h5>${D.duos.map(d => `<div class="cr-duo"><span>${gtCrE(d.n)}</span><b>${d.v}</b></div>`).join('')}` : ''}
            ${D.hats.length ? `<h5>${L('Hat-trick', 'Hat-tricks')} · ${D.hats.length}</h5>${D.hats.slice(-4).reverse().map(h => `<div class="cr-duo"><span>${gtCrE(h.n)} <em>${gtCrE(h.x.s)} · ${gtCrE(h.x.opp)}</em></span><b>${h.c}</b></div>`).join('')}` : ''}</section>
        <section class="cr-card c7"><h3><i class="fa-solid fa-people-arrows"></i>${L('Rakipler', 'Opponents')}<em>${D.opps.length} ${L('farklı rakip', 'different opponents')}</em></h3>
            <div class="cr-ops">${D.oppFav ? `<div class="cr-op w"><span>${L('En çok yendiğin', 'Favourite opponent')}</span>${gtCrLogo(D.oppFav.opp)}<b>${gtCrE(D.oppFav.opp)}</b><em>${D.oppFav.w} ${L('galibiyet', 'wins')} · ${D.oppFav.n} ${L('maç', 'matches')}</em></div>` : ''}${D.oppNight ? `<div class="cr-op l"><span>${L('Kâbus rakip', 'Bogey team')}</span>${gtCrLogo(D.oppNight.opp)}<b>${gtCrE(D.oppNight.opp)}</b><em>${D.oppNight.l} ${L('yenilgi', 'losses')} · ${D.oppNight.n} ${L('maç', 'matches')}</em></div>` : ''}${D.oppPerfect[0] ? `<div class="cr-op p"><span>${L('Kusursuz kayıt', 'Perfect record')}</span>${gtCrLogo(D.oppPerfect[0].opp)}<b>${gtCrE(D.oppPerfect[0].opp)}</b><em>${D.oppPerfect[0].n}/${D.oppPerfect[0].n} ${L('galibiyet', 'wins')}</em></div>` : ''}</div>
            <div class="cr-tw"><table class="cr-tb"><thead><tr><th>${L('En çok oynanan', 'Most played')}</th><th>${L('M', 'P')}</th><th>${L('G', 'W')}</th><th>${L('B', 'D')}</th><th>${L('M', 'L')}</th><th>${L('Gol', 'Goals')}</th><th>%</th><th></th></tr></thead><tbody>
            ${D.oppMost.map(o => `<tr><td class="s t">${gtCrLogo(o.opp)}${gtCrE(o.opp)}</td><td>${o.n}</td><td class="W">${o.w}</td><td class="D">${o.d}</td><td class="L">${o.l}</td><td>${o.gf}–${o.ga}</td><td>${Math.round(o.wp)}</td><td class="b">${gtCrWdl(o)}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="cr-card c5"><h3><i class="fa-solid fa-layer-group"></i>${L('Turnuvalar', 'Competitions')}</h3>
            ${D.byTour.map(t => { let lg = ''; try { lg = tourLogoOf(t.t) || ''; } catch (e) {} return `<div class="cr-tr">${lg ? `<img src="${gtCrE(lg)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : '<i class="fa-solid fa-trophy"></i>'}<div><b>${gtCrE(t.t)}</b>${gtCrWdl(t)}<em>${t.n} ${L('maç', 'matches')} · ${t.w}-${t.d}-${t.l} · ${t.gf}–${t.ga}</em></div><strong>%${Math.round(t.wp)}</strong></div>`; }).join('')}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-table-cells"></i>${L('En sık skorlar', 'Most common scores')}</h3>
            ${D.scores.length ? `<div class="cr-scs">${D.scores.map(s => `<div class="${s.r}"><b>${s.k.replace('-', '–')}</b><span>${s.n}×</span></div>`).join('')}</div><div class="cr-kv"><span>${L('İki takım da gol attı', 'Both teams scored')}<b>${R.btts}</b></span><span>${L('Maç başı toplam gol', 'Goals per match')}<b>${per(R.gf + R.ga, R.sn)}</b></span></div>` : `<p class="cr-none">${L('Skoru girilmiş maç yok.', 'No matches with scores.')}</p>`}</section>
        <section class="cr-card c4 gold"><h3><i class="fa-solid fa-trophy"></i>${L('Kupa dolabı', 'Trophy cabinet')}<em>${D.nTrophy}</em></h3>
            ${D.trophies.length ? D.trophies.map(t => `<div class="cr-tr">${t.logo ? `<img src="${gtCrE(t.logo)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : '<i class="fa-solid fa-trophy"></i>'}<div><b>${gtCrE(t.name)}</b><em>${t.seasons.map(gtCrE).join(' · ')}</em></div><strong>${t.seasons.length}×</strong></div>`).join('') : `<p class="cr-none">${L('Henüz kupa yok. İlki yolda.', 'No trophies yet. The first one is on its way.')}</p>`}</section>
        <section class="cr-card c4"><h3><i class="fa-solid fa-flag-checkered"></i>${L('Kilometre taşları', 'Milestones')}</h3>
            ${D.miles.length ? `<div class="cr-mls">${D.miles.slice(-7).reverse().map(m => `<div class="cr-mi ${m.type}"><i class="fa-solid ${m.type === 'g' ? 'fa-futbol' : 'fa-check'}"></i><div><span>${mileTxt(m)}</span><em>${gtCrE(m.x.s)} · ${gtCrE(m.x.opp)}${m.x.gf !== null ? ' ' + m.x.gf + '–' + m.x.ga : ''}</em></div></div>`).join('')}</div>` : `<p class="cr-none">–</p>`}</section>
        ${D.tr ? `<section class="cr-card c12"><h3><i class="fa-solid fa-right-left"></i>${L('Transfer bilançosu', 'Transfer balance')}</h3><div class="cr-trb">
            <div><span>${L('Harcanan', 'Spent')}</span><b class="L">${gtCrMoney(D.tr.spent)}</b><em>${D.tr.inN} ${L('gelen', 'signings')}</em></div>
            <div><span>${L('Kazanılan', 'Earned')}</span><b class="W">${gtCrMoney(D.tr.earned)}</b><em>${D.tr.outN} ${L('giden', 'departures')}</em></div>
            <div><span>${L('Net', 'Net')}</span><b class="${D.tr.earned - D.tr.spent >= 0 ? 'W' : 'L'}">${gtCrMoney(D.tr.earned - D.tr.spent)}</b><em>${L('gelir − gider', 'income − spend')}</em></div>
            <div><span>${L('En pahalı gelen', 'Record signing')}</span><b>${D.tr.bigIn && D.tr.bigIn.fee ? gtCrMoney(D.tr.bigIn.fee) : '–'}</b><em>${D.tr.bigIn && D.tr.bigIn.fee ? gtCrE(D.tr.bigIn.name) + ' · ' + gtCrE(D.tr.bigIn.season) : ''}</em></div>
            <div><span>${L('En pahalı giden', 'Record sale')}</span><b>${D.tr.bigOut && D.tr.bigOut.fee ? gtCrMoney(D.tr.bigOut.fee) : '–'}</b><em>${D.tr.bigOut && D.tr.bigOut.fee ? gtCrE(D.tr.bigOut.name) + ' · ' + gtCrE(D.tr.bigOut.season) : ''}</em></div></div></section>` : ''}
    </div></div>`;
}
function gtCrSwitch() {
    return `<div class="cr-seg cr-sw"><button type="button" class="${GTCR.on ? '' : 'on'}" onclick="gtCrSetView(false)"><i class="fa-solid fa-table-cells-large"></i>${gtCrL('Rakipler', 'Opponents')}</button><button type="button" class="${GTCR.on ? 'on' : ''}" onclick="gtCrSetView(true)"><i class="fa-solid fa-chart-pie"></i>${gtCrL('Kariyer', 'Career')}</button></div>`;
}
// Panel yalnızca Fikstür sayfasından açılır
(function gtCrWrap() {
    if (window.__gtCrWrapped) return;
    window.__gtCrWrapped = true;
    // Başka sayfaya geçince işaret sınıfını kaldır
    if (typeof updateContentArea === 'function') { const u = window.updateContentArea; window.updateContentArea = function () { const ca = document.getElementById('content-area'); if (ca) ca.classList.remove('gt-cr-has'); if (!window.__gtCrOwn) GTCR.fx = false; return u.apply(this, arguments); }; }
    // Fikstür sayfası: sezon rozetlerinin soluna "Kariyer" düğmesi
    if (typeof renderFixturePanel === 'function') {
        const fo = window.renderFixturePanel;
        window.renderFixturePanel = function () {
            const r = fo.apply(this, arguments);
            try {
                const ca = document.getElementById('content-area'), b = ca && ca.querySelector('button[onclick^="switchFixtureSeason"]'), row = b && b.parentElement;
                if (row && !row.querySelector('.gt-cr-fxbtn')) {
                    const k = document.createElement('button'); k.type = 'button'; k.className = 'gt-cr-fxbtn'; k.title = gtCrL('Kariyer istatistikleri', 'Career statistics');
                    k.innerHTML = '<i class="fa-solid fa-chart-pie"></i><span>' + gtCrL('Kariyer', 'Career') + '</span>';
                    k.onclick = function () { gtCrShowFx(); };
                    row.insertBefore(k, row.firstChild);
                }
            } catch (e) { console.warn(e); }
            return r;
        };
    }
})();
