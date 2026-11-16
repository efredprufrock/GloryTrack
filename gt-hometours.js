/* GloryTrack – Ana sayfa "Turnuvalar" paneli: takımın fikstürde yer aldığı turnuvalar (tablo/eleme verisi girilmemiş olsa bile) listelenir.
   Tablo ve eleme turları Müsabakalar sayfasındaki veriyi canlı okur; veri yoksa fikstürden hesaplanan özet gösterilir.
   script.js'ten SONRA yüklenir. */
(function () {
    'use strict';
    if (window.__gtHT) return; window.__gtHT = 1;
    if (typeof window.homeTeamTours !== 'function' || typeof window.renderHomeLeagueTable !== 'function') return;
    const origTours = window.homeTeamTours, origRender = window.renderHomeLeagueTable;
    const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const canon = n => { try { return String(tourCanon(n) || '').trim().toLowerCase(); } catch (e) { return String(n || '').trim().toLowerCase(); } };
    const has = v => v !== '' && v !== null && v !== undefined && !isNaN(parseInt(v));
    const ctxWanted = () => (typeof homeGlobalContext !== 'undefined' && homeGlobalContext === 'milli') ? 'milli' : 'kulup';

    function ourMatches(season) {
        const our = homeOurTeamName(), want = ctxWanted();
        return ((typeof fixtureData !== 'undefined' && fixtureData && fixtureData[season]) || []).filter(m => {
            if (!m || !m.tournament || m.tournament === '-') return false;
            let c = 'kulup'; try { c = getFixtureMatchContext(m); } catch (e) { }
            return c === want && (homeIsUs(m.home, our) || homeIsUs(m.away, our));
        });
    }

    window.homeTeamTours = function (season) {
        const base = origTours.apply(this, arguments);
        try {
            const all = ((customTournamentsData && customTournamentsData[season]) || []).filter(Boolean);
            const act = new Set(ourMatches(season).map(m => canon(m.tournament)));
            if (!act.size) return base;
            const inBase = new Set(base.map(t => t.id));
            const extra = all.filter(t => act.has(canon(t.type)) && !inBase.has(t.id));
            if (!extra.length) return base;
            const order = new Map(all.map((t, i) => [t.id, i]));
            return base.concat(extra).sort((a, b) => order.get(a.id) - order.get(b.id));
        } catch (e) { console.warn('gt-hometours', e); return base; }
    };

    function injectCss() {
        if (document.getElementById('gt-ht-css')) return;
        const s = document.createElement('style'); s.id = 'gt-ht-css';
        s.textContent = `.hts{display:flex;flex-direction:column;gap:10px;padding:2px}
.hts-k{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.hts-k>div{background:rgba(2,6,23,.35);border:1px solid rgba(71,85,105,.45);border-radius:10px;padding:7px 4px;text-align:center;display:flex;flex-direction:column;gap:2px}
.hts-k small{font-size:9px;font-weight:800;letter-spacing:.08em;color:#64748b;text-transform:uppercase}
.hts-k b{font-size:17px;font-weight:900;color:#f1f5f9}
.hts-k b.p{color:#4ade80}.hts-k b.n{color:#f87171}
.hts-nx{display:flex;align-items:center;gap:8px;font-size:11px;color:#94a3b8;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.3);border-radius:10px;padding:8px 10px}
.hts-nx b{color:#e2e8f0}.hts-nx .r{font-weight:800;color:#fbd34d;border:1px solid rgba(251,211,77,.4);border-radius:6px;padding:0 5px;font-size:10px}
.hts-fm{display:flex;gap:4px;flex-wrap:wrap}
.hts-fm i{font-style:normal;width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#fff}
.hts-fm .W{background:#16a34a}.hts-fm .D{background:#ca8a04}.hts-fm .L{background:#dc2626}
.hts-h{font-size:10.5px;color:#64748b;line-height:1.45;text-align:center}
body.theme-light .hts-k b,body.theme-light .hts-nx b{color:#1e293b}
body.theme-light .hts-k>div{background:rgba(255,255,255,.6);border-color:#d6cfc2}
body.theme-light .hts-nx,body.theme-light .hts-h{color:#7a6d63}`;
        document.head.appendChild(s);
    }

    function summary(tour, season) {
        const our = homeOurTeamName(), k = canon(tour.type);
        const ms = ourMatches(season).filter(m => canon(m.tournament) === k);
        let w = 0, d = 0, l = 0, gf = 0, ga = 0; const form = [];
        ms.forEach(m => {
            if (!has(m.homeScore) || !has(m.awayScore)) return;
            const h = parseInt(m.homeScore), a = parseInt(m.awayScore), us = homeIsUs(m.home, our), f = us ? h : a, g = us ? a : h;
            gf += f; ga += g; const r = f > g ? 'W' : f < g ? 'L' : 'D'; if (r === 'W') w++; else if (r === 'L') l++; else d++; form.push(r);
        });
        const pld = w + d + l, nx = ms.find(m => !has(m.homeScore) || !has(m.awayScore));
        const showPts = tour.tableEnabled !== false;
        const gd = gf - ga;
        let nxHtml = '';
        if (nx) {
            const opp = homeIsUs(nx.home, our) ? nx.away : nx.home, ground = nx.ground === 'away' ? L('Deplasman', 'Away') : nx.ground === 'neutral' ? L('Tarafsız', 'Neutral') : L('İç saha', 'Home');
            nxHtml = `<div class="hts-nx"><i class="fa-solid fa-forward-step"></i><span>${L('Sıradaki', 'Next')}: <b>${E(opp || '?')}</b> · ${ground}</span>${nx.round ? `<span class="r">${E(nx.round)}</span>` : ''}</div>`;
        }
        return `<div class="hts">
            <div class="hts-k"><div><small>${L('Maç', 'Pld')}</small><b>${pld}</b></div><div><small>${L('G-B-M', 'W-D-L')}</small><b>${w}-${d}-${l}</b></div><div><small>${L('A-Y', 'GF-GA')}</small><b>${gf}-${ga}</b></div><div><small>${L('Averaj', 'GD')}</small><b class="${gd > 0 ? 'p' : gd < 0 ? 'n' : ''}">${gd > 0 ? '+' : ''}${gd}</b></div>${showPts ? `<div><small>${L('Puan', 'Pts')}</small><b>${w * 3 + d}</b></div>` : `<div><small>${L('Kalan', 'Left')}</small><b>${ms.length - pld}</b></div>`}</div>
            ${form.length ? `<div class="hts-fm">${form.slice(-10).map(r => `<i class="${r}">${r}</i>`).join('')}</div>` : ''}
            ${nxHtml}
            <div class="hts-h">${L('Lig tablosu veya eleme turları Müsabakalar sayfasında girildiğinde burada tam olarak görünür; o zamana kadar özet fikstürdeki sonuçlarından hesaplanır.', 'The full table or knockout rounds appear here once entered on the Competitions page; until then this summary is computed from your fixture results.')}</div>
        </div>`;
    }

    window.renderHomeLeagueTable = function () {
        try {
            const season = seasonsList[seasonsList.length - 1];
            const tour = season ? homePickLeagueTour(season) : null;
            if (tour && !homeTourRows(tour).length && !homeTourKos(tour).length) { injectCss(); return summary(tour, season); }
        } catch (e) { console.warn('gt-hometours', e); }
        return origRender.apply(this, arguments);
    };
})();
