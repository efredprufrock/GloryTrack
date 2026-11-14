/* GloryTrack · Eleme aşamaları (gt-knockout.js)
   1) Yarı final sonuçları girilince kazananlar otomatik FİNAL satırına eklenir (yoksa final satırı oluşturulur).
   2) "Tur verisi" penceresi yeniden tasarlandı: tur seçimi, takım adı + logo (arama / yükleme), takım değiştirme,
      1. maç / rövanş / penaltı, canlı sonuç özeti — hepsi tek pencerede. "+" butonu da aynı pencereyi açar. */
(function () {
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const okLogo = u => typeof urOk === 'function' ? urOk(u) : !!u;
    const toast = (m, t) => { if (typeof gtToast === 'function') gtToast(m, t || 'info'); };
    const has = v => v !== undefined && v !== null && v !== '';
    const num = v => (!has(v) || isNaN(parseInt(v))) ? null : parseInt(v);

    // ===================== KAZANAN HESABI + OTOMATİK FİNAL =====================
    // Rövanşta takımlar yer değiştirir: homeScore2 = (ko.away) takımının, awayScore2 = (ko.home) takımının golü.
    function koWinner(ko) {
        const h1 = num(ko.homeScore), a1 = num(ko.awayScore), h2 = num(ko.homeScore2), a2 = num(ko.awayScore2);
        if (h1 === null || a1 === null) return '';
        const l2 = h2 !== null && a2 !== null;
        const H = h1 + (l2 ? a2 : 0), A = a1 + (l2 ? h2 : 0);
        if (H > A) return 'h'; if (A > H) return 'a';
        const ph = num(ko.penHome), pa = num(ko.penAway);
        if (ph !== null && pa !== null && ph !== pa) return ph > pa ? 'h' : 'a';
        return '';
    }
    function advance(tour) {
        const kos = tour && tour.knockouts; if (!Array.isArray(kos)) return false;
        const sfs = kos.filter(k => k && k.stage === 'Yarı Final').slice(0, 2); if (!sfs.length) return false;
        let fin = kos.find(k => k && k.stage === 'Final'), changed = false;
        sfs.forEach((sf, i) => {
            const slot = i === 0 ? 'home' : 'away', w = koWinner(sf), flag = slot + 'Auto', lg = slot + 'Logo';
            const name = w === 'h' ? sf.home : (w === 'a' ? sf.away : ''), logo = w === 'h' ? sf.homeLogo : (w === 'a' ? sf.awayLogo : '');
            if (w && name) {
                if (!fin) { fin = { id: 'ko_f_' + Date.now(), stage: 'Final', home: '', away: '', homeScore: '', awayScore: '' }; kos.push(fin); changed = true; }
                if (!fin[slot] || fin[flag]) {
                    if (fin[slot] !== name || (fin[lg] || '') !== (logo || '') || !fin[flag]) {
                        fin[slot] = name; if (logo) fin[lg] = logo; else delete fin[lg]; fin[flag] = true; changed = true;
                    }
                }
            } else if (fin && fin[flag]) {           // sonuç silindiyse otomatik eklenen takım da geri alınır
                fin[slot] = ''; delete fin[lg]; delete fin[flag]; changed = true;
            }
        });
        return changed;
    }
    window.gtKoAdvance = advance; window.gtKoWinner = koWinner;

    // ===================== TUR PENCERESİ =====================
    const STAGES = [['R1', 'R1', 'Tur 1', 'Round 1'], ['R2', 'R2', 'Tur 2', 'Round 2'], ['R3', 'R3', 'Tur 3', 'Round 3'], ['R4', 'R4', 'Tur 4', 'Round 4'], ['R5', 'R5', 'Tur 5', 'Round 5'],
        ['Play-Off', 'PO', 'Play-Off', 'Play-Off'], ['Play-Off Final', 'PF', 'Play-Off Finali', 'Play-Off Final'], ['Son 32', '32', 'Son 32', 'Round of 32'], ['Son 16', '16', 'Son 16', 'Round of 16'],
        ['Çeyrek Final', 'QF', 'Çeyrek Final', 'Quarter-final'], ['Yarı Final', 'SF', 'Yarı Final', 'Semi-final'], ['Final', 'F', 'Final', 'Final'], ['Üçüncülük', '3R', 'Üçüncülük', '3rd place']];
    const EXPECT = { 'Yarı Final': 2, 'Çeyrek Final': 4, 'Son 16': 8, 'Son 32': 16, 'Final': 1, 'Üçüncülük': 1, 'Play-Off Final': 1 };
    const NEXT = { 'Son 32': 'Son 16', 'Son 16': 'Çeyrek Final', 'Çeyrek Final': 'Yarı Final', 'Yarı Final': 'Final' };
    const G = { tour: null, koId: null, stage: 'Son 16', h: { n: '', logo: '', auto: true, cands: null, ci: -1 }, a: { n: '', logo: '', auto: true, cands: null, ci: -1 }, focus: 'h' };

    const css = document.createElement('style');
    css.textContent = `
    .gtko-ov{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(2,6,23,.78);backdrop-filter:blur(5px);animation:gtkoF .15s ease}
    @keyframes gtkoF{from{opacity:0}to{opacity:1}}
    .gtko{width:100%;max-width:520px;max-height:94vh;display:flex;flex-direction:column;background:linear-gradient(180deg,#131c2e,#0e1626);border:1px solid #26344d;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.6);color:#e2e8f0;overflow:hidden}
    .gtko-h{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px 10px}
    .gtko-t{font-weight:900;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#f5c542}.gtko-s{font-size:11px;color:#7d8aa3;margin-top:1px;max-width:380px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .gtko-x{width:30px;height:30px;border-radius:999px;background:#1b2740;border:1px solid #2b3a58;color:#9fb0cc;cursor:pointer}.gtko-x:hover{color:#fff;background:#25355a}
    .gtko-body{padding:4px 18px 8px;overflow-y:auto;display:flex;flex-direction:column;gap:12px}
    .gtko-stages{display:flex;gap:5px;overflow-x:auto;padding:2px 0 4px;scrollbar-width:none}.gtko-stages::-webkit-scrollbar{display:none}
    .gtko-chip{flex:none;min-width:36px;padding:6px 10px;border-radius:999px;border:1px solid #2b3a58;background:#141f35;color:#8ea0bf;font-weight:800;font-size:11px;letter-spacing:.06em;cursor:pointer;transition:.12s}
    .gtko-chip:hover{border-color:#4b6190;color:#dbe5f7}.gtko-chip.on{background:#f5c542;border-color:#f5c542;color:#1a1405;box-shadow:0 0 14px rgba(245,197,66,.3)}
    .gtko-teams{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:stretch}
    .gtko-team{background:#0b1220;border:1px solid #223049;border-radius:16px;padding:12px 10px 10px;display:flex;flex-direction:column;align-items:center;gap:7px;min-width:0;transition:.12s}
    .gtko-team:focus-within{border-color:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,.12)}
    .gtko-role{font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#6b7a96}
    .gtko-lg{position:relative;width:62px;height:62px;border-radius:18px;background:#131d31;border:1px dashed #2f4064;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4b5b7a;font-size:22px;transition:.12s}
    .gtko-lg:hover{border-color:#34d399;color:#34d399}.gtko-lg img{width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 3px 6px rgba(0,0,0,.45))}
    .gtko-lg .up{position:absolute;right:-5px;bottom:-5px;width:20px;height:20px;border-radius:999px;background:#1b2a47;border:1px solid #33466d;color:#9fb0cc;font-size:9px;display:flex;align-items:center;justify-content:center}
    .gtko-nm{width:100%;background:#131d31;border:1px solid #26344d;border-radius:10px;padding:8px 10px;color:#f1f5f9;font-weight:700;font-size:13px;text-align:center;outline:none}.gtko-nm:focus{border-color:#34d399}
    .gtko-act{display:flex;gap:6px}.gtko-ib{height:26px;min-width:26px;padding:0 8px;border-radius:8px;background:#16223a;border:1px solid #2b3a58;color:#9fb0cc;font-size:11px;cursor:pointer}.gtko-ib:hover{color:#fff;border-color:#4b6190}
    .gtko-swap{align-self:center;width:34px;height:34px;border-radius:999px;background:#16223a;border:1px solid #2b3a58;color:#9fb0cc;cursor:pointer;transition:.15s}.gtko-swap:hover{color:#34d399;border-color:#34d399;transform:rotate(180deg)}
    .gtko-chips{display:flex;flex-wrap:wrap;gap:5px;align-items:center}.gtko-chips:empty{display:none}.gtko-chips>b{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#6b7a96;font-weight:800;margin-right:2px}
    .gtko-tc{display:inline-flex;align-items:center;gap:5px;padding:3px 9px 3px 5px;border-radius:999px;background:#131d31;border:1px solid #26344d;color:#b9c6df;font-size:11px;font-weight:600;cursor:pointer}.gtko-tc:hover{border-color:#34d399;color:#fff}.gtko-tc img{width:16px;height:16px;object-fit:contain}
    .gtko-cd{display:flex;gap:6px;overflow-x:auto;padding:2px 0}.gtko-cd:empty{display:none}.gtko-cd img{flex:none;width:38px;height:38px;object-fit:contain;padding:4px;background:#131d31;border:1px solid #26344d;border-radius:10px;cursor:pointer}.gtko-cd img:hover{border-color:#34d399}.gtko-cd img.on{border-color:#34d399;box-shadow:0 0 0 2px rgba(52,211,153,.25)}
    .gtko-leg{background:#0b1220;border:1px solid #223049;border-radius:14px;padding:9px 12px 11px;transition:.15s}
    .gtko-leg.off{opacity:.38}.gtko-leg.off .gtko-row{pointer-events:none}
    .gtko-lb{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#7d8aa3;margin-bottom:8px}.gtko-lb em{margin-left:auto;font-style:normal;font-weight:600;letter-spacing:.04em;text-transform:none;color:#55627d;font-size:10px}
    .gtko-sw{position:relative;width:30px;height:17px;flex:none;border-radius:999px;background:#26344d;transition:.15s;cursor:pointer}.gtko-sw:after{content:'';position:absolute;top:2px;left:2px;width:13px;height:13px;border-radius:999px;background:#9fb0cc;transition:.15s}
    .gtko-lb input{display:none}.gtko-lb input:checked+.gtko-sw{background:#10b981}.gtko-lb input:checked+.gtko-sw:after{left:15px;background:#fff}
    .gtko-row{display:flex;align-items:center;justify-content:center;gap:10px}.gtko-row img.m{width:30px;height:30px;object-fit:contain;flex:none}.gtko-row .ph{width:30px;height:30px;flex:none;border-radius:9px;background:#131d31;display:flex;align-items:center;justify-content:center;color:#3c4c6b;font-size:12px}
    .gtko-sc{width:52px;height:46px;border-radius:12px;background:#131d31;border:1px solid #2b3a58;color:#fff;font-weight:900;font-size:22px;text-align:center;outline:none;font-family:inherit}.gtko-sc:focus{border-color:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,.14)}.gtko-row .c{color:#4a5a78;font-weight:900;font-size:18px}
    .gtko-res{min-height:40px;border-radius:12px;padding:9px 12px;font-size:12px;font-weight:700;display:flex;align-items:center;gap:9px;background:#0b1220;border:1px solid #223049;color:#7d8aa3}
    .gtko-res.win{background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.4);color:#6ee7b7}.gtko-res.warn{background:rgba(245,158,11,.1);border-color:rgba(245,158,11,.4);color:#fbbf24}
    .gtko-res img{width:22px;height:22px;object-fit:contain}.gtko-res .r{margin-left:auto;font-weight:800;font-size:10.5px;opacity:.9;text-align:right}
    .gtko-f{display:flex;gap:8px;padding:10px 18px 16px;border-top:1px solid #1d2a42;margin-top:4px}
    .gtko-btn{height:42px;border-radius:12px;font-weight:800;font-size:13px;cursor:pointer;border:1px solid #2b3a58;background:#16223a;color:#cbd5e1;padding:0 18px}.gtko-btn:hover{color:#fff;border-color:#4b6190}
    .gtko-btn.pri{flex:1;background:linear-gradient(180deg,#f5c542,#d9a521);border-color:#f5c542;color:#1a1405}.gtko-btn.pri:hover{filter:brightness(1.07)}
    .gtko-btn.del{background:rgba(127,29,29,.35);border-color:rgba(185,28,28,.5);color:#fca5a5;padding:0 14px}.gtko-btn.del:hover{background:rgba(185,28,28,.55);color:#fff}
    @media(max-width:480px){.gtko-teams{grid-template-columns:1fr 1fr}.gtko-swap{grid-column:1/3;grid-row:2;justify-self:center;width:100%;border-radius:10px;height:28px}.gtko-swap i{transform:rotate(90deg)}.gtko-sc{width:46px;height:42px;font-size:20px}}
    /* açık tema */
    body.theme-light .gtko-ov{background:rgba(60,50,40,.45)}body.theme-light .gtko{background:#fffdf8;border-color:#d6cfc2;color:#2c2420;box-shadow:0 30px 70px rgba(60,50,40,.3)}
    body.theme-light .gtko-s,body.theme-light .gtko-role,body.theme-light .gtko-lb,body.theme-light .gtko-chips>b{color:#7a6f63}body.theme-light .gtko-t{color:#a16207}
    body.theme-light .gtko-x,body.theme-light .gtko-ib,body.theme-light .gtko-swap,body.theme-light .gtko-btn{background:#fff;border-color:#d6cfc2;color:#5a4f45}
    body.theme-light .gtko-chip{background:#fff;border-color:#d6cfc2;color:#6b5f53}body.theme-light .gtko-chip.on{background:#d9a521;border-color:#d9a521;color:#fff}
    body.theme-light .gtko-team,body.theme-light .gtko-leg,body.theme-light .gtko-res{background:#f8f4ea;border-color:#e2dac9;color:#2c2420}
    body.theme-light .gtko-lg,body.theme-light .gtko-nm,body.theme-light .gtko-sc,body.theme-light .gtko-tc,body.theme-light .gtko-cd img,body.theme-light .gtko-row .ph{background:#fff;border-color:#d6cfc2;color:#2c2420}
    body.theme-light .gtko-sw{background:#d6cfc2}body.theme-light .gtko-f{border-color:#e8e1d3}body.theme-light .gtko-btn.pri{background:linear-gradient(180deg,#e8b72c,#c99512);color:#fff;border-color:#c99512}
    body.theme-light .gtko-btn.del{background:#fee2e2;border-color:#fca5a5;color:#b91c1c}body.theme-light .gtko-res.win{background:#ecfdf5;border-color:#6ee7b7;color:#047857}body.theme-light .gtko-res.warn{background:#fffbeb;border-color:#fcd34d;color:#b45309}
    `;
    css.textContent += `
    /* kendi takımımın oynamadığı eleme maçları: mavi skor kutusu + altın kazanan parıltısı */
    .ko-neu{background:#1e3a5f !important;border-color:#4a7bb7 !important;box-shadow:0 0 8px rgba(74,123,183,.3),inset 0 1px 0 rgba(255,255,255,.08) !important}
    .ko-neu:hover{border-color:#7aa2d6 !important}.ko-neu-t{color:#fff !important}
    img.ko-win-n{filter:drop-shadow(0 0 10px rgba(245,197,66,.95)) drop-shadow(0 0 3px rgba(245,197,66,.85)) drop-shadow(0 2px 3px rgba(0,0,0,.4)) !important;transform:scale(1.1) !important}
    body.theme-light .ko-neu{background:#2f5a8f !important;border-color:#1e3a5f !important}
    body.theme-light img.ko-win-n{filter:drop-shadow(0 0 9px rgba(217,165,33,.95)) drop-shadow(0 0 2px rgba(180,130,10,.7)) !important}`;
    document.head.appendChild(css);

    function findTour(id) { try { return (customTournamentsData[activeFixtureSeason] || []).find(t => t.id === id) || null; } catch (e) { return null; } }
    const $ = id => document.getElementById(id);
    const sideLogo = s => { const t = G[s]; if (t.logo) return t.logo; if (!t.n.trim()) return ''; try { const u = getTeamLogoByName(t.n.trim()); return okLogo(u) ? u : ''; } catch (e) { return ''; } };
    const imgOr = (u, cls, ic) => u ? `<img class="${cls}" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : `<span class="ph"><i class="fa-solid ${ic || 'fa-shield'}"></i></span>`;
    const stageName = v => { const s = STAGES.find(x => x[0] === v); return s ? L(s[2], s[3]) : v; };

    function defaultStage(tour) {
        const kos = (tour.knockouts || []).filter(Boolean); if (!kos.length) return 'Son 16';
        const order = STAGES.map(s => s[0]);
        let top = kos[kos.length - 1].stage || 'Son 16';
        kos.forEach(k => { if (order.indexOf(k.stage) > order.indexOf(top)) top = k.stage; });
        const cnt = kos.filter(k => k.stage === top).length;
        return (EXPECT[top] && cnt >= EXPECT[top] && NEXT[top]) ? NEXT[top] : top;
    }
    function tourTeams(tour) {
        const seen = new Map(); const add = (n, l) => { n = String(n || '').trim(); if (n && n !== '-' && n !== 'Takım Adı' && !seen.has(n.toLowerCase())) seen.set(n.toLowerCase(), { n, l: l || '' }); };
        (tour.knockouts || []).forEach(k => { if (k) { add(k.home, k.homeLogo); add(k.away, k.awayLogo); } });
        (Array.isArray(tour.table) ? tour.table : []).forEach(r => r && add(r.name, r.logo));
        (tour.groups || []).forEach(g => ((g && g.teams) || []).forEach(t => t && add(t.name || t.n, t.logo)));
        return Array.from(seen.values());
    }

    window.gtkoOpen = function (tourId, koId, opt) {
        const tour = findTour(tourId); if (!tour) return;
        opt = opt || {}; const ko = koId ? (tour.knockouts || []).find(k => k.id === koId) : null; if (koId && !ko) return;
        G.tour = tour; G.koId = ko ? ko.id : null; G.stage = ko ? (ko.stage || 'Son 16') : defaultStage(tour);
        G.h = { n: ko ? (ko.home || '') : '', logo: ko && ko.homeLogo || '', auto: !(ko && ko.homeLogo), cands: null, ci: -1 };
        G.a = { n: ko ? (ko.away || '') : '', logo: ko && ko.awayLogo || '', auto: !(ko && ko.awayLogo), cands: null, ci: -1 };
        const old = $('gtko-ov'); if (old) old.remove();
        const l2on = ko ? (has(ko.homeScore2) || has(ko.awayScore2)) : false, pon = ko ? (has(ko.penHome) || has(ko.penAway)) : false;
        const v = x => ko && has(ko[x]) ? esc(ko[x]) : '';
        const chips = STAGES.map(s => `<button type="button" class="gtko-chip${s[0] === G.stage ? ' on' : ''}" data-v="${esc(s[0])}" title="${esc(L(s[2], s[3]))}" onclick="gtkoStage(this)">${s[1]}</button>`).join('');
        const team = (s, role) => `<div class="gtko-team" data-s="${s}">
            <div class="gtko-role">${role}</div>
            <div class="gtko-lg" id="gtko-lg-${s}" title="${esc(L('Logo yükle', 'Upload logo'))}" onclick="gtkoFile('${s}')"></div>
            <input type="text" class="gtko-nm" id="gtko-n-${s}" list="global-team-datalist" autocomplete="off" placeholder="${esc(L('Takım adı', 'Team name'))}" value="${esc(G[s].n)}" oninput="gtkoName('${s}',this.value)" onchange="gtkoNameDone('${s}')" onfocus="G_focus('${s}')">
            <div class="gtko-act"><button type="button" class="gtko-ib" id="gtko-sr-${s}" title="${esc(L('Logo ara (tekrar basınca sonraki)', 'Search logo (click again for next)'))}" onclick="gtkoSearch('${s}')"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button type="button" class="gtko-ib" title="${esc(L('Logoyu sil', 'Clear logo'))}" onclick="gtkoClearLogo('${s}')"><i class="fa-solid fa-eraser"></i></button></div></div>`;
        const legRow = (idL, idR, dl, dr, vl, vr, lgL, lgR) => `<div class="gtko-row"><span id="${lgL}"></span><input type="text" inputmode="numeric" maxlength="2" class="gtko-sc" id="${idL}" placeholder="-" value="${vl}" oninput="gtkoSc(this)" onfocus="this.select()" onkeydown="gtkoKey(event,this)"><span class="c">:</span><input type="text" inputmode="numeric" maxlength="2" class="gtko-sc" id="${idR}" placeholder="-" value="${vr}" oninput="gtkoSc(this)" onfocus="this.select()" onkeydown="gtkoKey(event,this)"><span id="${lgR}"></span></div>`;
        const ov = document.createElement('div'); ov.id = 'gtko-ov'; ov.className = 'gtko-ov';
        ov.innerHTML = `<div class="gtko" role="dialog" aria-modal="true">
            <div class="gtko-h"><div><div class="gtko-t">${esc(L(ko ? 'Tur Verisi' : 'Yeni Tur', ko ? 'Round data' : 'New round'))}</div><div class="gtko-s">${esc(tour.type || tour.name || '')}</div></div><button type="button" class="gtko-x" onclick="gtkoClose()" aria-label="${esc(L('Kapat', 'Close'))}"><i class="fa-solid fa-xmark"></i></button></div>
            <div class="gtko-body">
                <div class="gtko-stages" id="gtko-stages">${chips}</div>
                <div class="gtko-teams">${team('h', L('Ev sahibi', 'Home'))}<button type="button" class="gtko-swap" title="${esc(L('Takımları değiştir', 'Swap teams'))}" onclick="gtkoSwap()"><i class="fa-solid fa-right-left"></i></button>${team('a', L('Deplasman', 'Away'))}</div>
                <div class="gtko-cd" id="gtko-cd"></div>
                <div class="gtko-chips" id="gtko-tc"></div>
                <div class="gtko-leg"><div class="gtko-lb">${L('1. Maç', '1st leg')}</div>${legRow('gtko-h1', 'gtko-a1', 0, 0, v('homeScore'), v('awayScore'), 'gtko-m1h', 'gtko-m1a')}</div>
                <div class="gtko-leg${l2on ? '' : ' off'}" id="gtko-leg2"><label class="gtko-lb"><input type="checkbox" id="gtko-l2" ${l2on ? 'checked' : ''} onchange="gtkoTog()"><span class="gtko-sw"></span>${L('2. Maç (rövanş)', '2nd leg (return)')}<em>${L('opsiyonel', 'optional')}</em></label>${legRow('gtko-h2', 'gtko-a2', 0, 0, v('homeScore2'), v('awayScore2'), 'gtko-m2h', 'gtko-m2a')}</div>
                <div class="gtko-leg${pon ? '' : ' off'}" id="gtko-legp"><label class="gtko-lb"><input type="checkbox" id="gtko-pn" ${pon ? 'checked' : ''} onchange="gtkoTog()"><span class="gtko-sw"></span>${L('Penaltılar', 'Penalties')}<em>${L('beraberlikte', 'if level')}</em></label>${legRow('gtko-ph', 'gtko-pa', 0, 0, v('penHome'), v('penAway'), 'gtko-mph', 'gtko-mpa')}</div>
                <div class="gtko-res" id="gtko-res"></div>
            </div>
            <div class="gtko-f">${ko ? `<button type="button" class="gtko-btn del" title="${esc(L('Turu sil', 'Delete round'))}" onclick="gtkoDel()"><i class="fa-solid fa-trash"></i></button>` : ''}<button type="button" class="gtko-btn" onclick="gtkoClose()">${L('İptal', 'Cancel')}</button><button type="button" class="gtko-btn pri" onclick="gtkoSave()"><i class="fa-solid fa-check mr-1"></i> ${L('Kaydet', 'Save')}</button></div></div>`;
        ov.addEventListener('mousedown', e => { if (e.target === ov) gtkoClose(); });
        document.body.appendChild(ov); document.addEventListener('keydown', escKey, true);
        paintAll(); { const on = ov.querySelector('.gtko-chip.on'), bx = $('gtko-stages'); if (on && bx) bx.scrollLeft = Math.max(0, on.offsetLeft - bx.clientWidth / 2 + on.offsetWidth / 2); }
        G.focus = opt.focus === 'away' || opt.focus === 'a' ? 'a' : 'h';
        setTimeout(() => { const t = (opt.focus === 'away' || opt.focus === 'a') ? $('gtko-n-a') : (opt.focus === 'home' || opt.focus === 'h') ? $('gtko-n-h') : (!G.h.n ? $('gtko-n-h') : !G.a.n ? $('gtko-n-a') : $('gtko-h1')); if (t) t.focus(); }, 60);
    };
    window.G_focus = s => { G.focus = s; paintChips(); };
    function escKey(e) { if (e.key === 'Escape' && $('gtko-ov')) { e.stopPropagation(); gtkoClose(); } }
    window.gtkoClose = function () { const ov = $('gtko-ov'); if (ov) ov.remove(); document.removeEventListener('keydown', escKey, true); };

    function paintLogos() {
        ['h', 'a'].forEach(s => { const u = sideLogo(s), el = $('gtko-lg-' + s); if (el) el.innerHTML = (u ? `<img src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '<i class="fa-solid fa-shield-halved"></i>') + '<span class="up"><i class="fa-solid fa-arrow-up-from-bracket"></i></span>'; });
        const hu = sideLogo('h'), au = sideLogo('a'), set = (id, u) => { const e = $(id); if (e) e.innerHTML = imgOr(u, 'm'); };
        set('gtko-m1h', hu); set('gtko-m1a', au); set('gtko-m2h', au); set('gtko-m2a', hu); set('gtko-mph', hu); set('gtko-mpa', au);
    }
    function paintChips() {
        const box = $('gtko-tc'); if (!box || !G.tour) return;
        const used = new Set([G.h.n.trim().toLowerCase(), G.a.n.trim().toLowerCase()]);
        const list = tourTeams(G.tour).filter(t => !used.has(t.n.toLowerCase())).slice(0, 14);
        box.innerHTML = list.length ? `<b>${esc(L('Turnuvadaki takımlar', 'Teams in this tournament'))}</b>` + list.map(t => { let u = t.l; if (!okLogo(u)) { try { u = getTeamLogoByName(t.n); } catch (e) { u = ''; } } return `<span class="gtko-tc" data-n="${esc(t.n)}" data-l="${esc(okLogo(t.l) ? t.l : '')}" onclick="gtkoPick(this)">${okLogo(u) ? `<img src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '<i class="fa-solid fa-shield" style="font-size:10px;margin-left:3px"></i>'}${esc(t.n)}</span>`; }).join('') : '';
    }
    function paintAll() { paintLogos(); paintChips(); updRes(); }
    window.gtkoPick = function (el) {
        const s = !G.h.n.trim() ? 'h' : !G.a.n.trim() ? 'a' : (G.focus || 'h');
        const n = el.getAttribute('data-n'), l = el.getAttribute('data-l');
        G[s].n = n; G[s].logo = l || ''; G[s].auto = !l; const inp = $('gtko-n-' + s); if (inp) inp.value = n;
        G[s].cands = null; paintAll(); const nx = s === 'h' && !G.a.n.trim() ? $('gtko-n-a') : $('gtko-h1'); if (nx) nx.focus(); G.focus = s === 'h' ? 'a' : 'h';
    };
    window.gtkoStage = function (b) { G.stage = b.getAttribute('data-v'); document.querySelectorAll('#gtko-stages .gtko-chip').forEach(c => c.classList.toggle('on', c === b)); updRes(); };

    // ---- takım adı / logo ----
    const timers = {};
    window.gtkoName = function (s, v) {
        G[s].n = v; G[s].cands = null;
        if (G[s].auto) { G[s].logo = ''; }
        clearTimeout(timers[s]); timers[s] = setTimeout(() => { paintLogos(); paintChips(); updRes(); }, 150);
    };
    window.gtkoNameDone = async function (s) {
        const t = G[s], n = t.n.trim(); if (!n) return; paintAll();
        if (t.auto && !sideLogo(s)) { await gtkoSearch(s, true); }   // bilinen logosu yoksa otomatik ara
    };
    window.gtkoSearch = async function (s, auto) {
        const t = G[s], n = t.n.trim(); if (!n) { const i = $('gtko-n-' + s); if (i) i.focus(); return; }
        const btn = $('gtko-sr-' + s);
        if (!t.cands) { if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; try { t.cands = (await tlFetchLogos(n)).slice(0, 8); } catch (e) { t.cands = []; } t.ci = -1; if (btn) btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>'; if (G[s].n.trim() !== n) return; }
        if (!t.cands.length) { if (!auto) toast(L('Logo bulunamadı: ', 'No logo found: ') + n, 'warn'); return; }
        t.ci = (t.ci + 1) % t.cands.length; t.logo = t.cands[t.ci]; t.auto = false; paintAll();
    };
    window.gtkoClearLogo = function (s) { G[s].logo = ''; G[s].auto = true; G[s].cands = null; paintAll(); };
    window.gtkoFile = function (s) {
        const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
        inp.onchange = () => {
            const f = inp.files && inp.files[0]; if (!f) return; const fr = new FileReader();
            fr.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 160 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k)); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); G[s].logo = c.toDataURL('image/png'); G[s].auto = false; paintAll(); }; im.src = fr.result; };
            fr.readAsDataURL(f);
        }; inp.click();
    };
    window.gtkoSwap = function () {
        const t = G.h; G.h = G.a; G.a = t;
        const sw = (x, y) => { const a = $(x), b = $(y); if (a && b) { const v = a.value; a.value = b.value; b.value = v; } };
        sw('gtko-n-h', 'gtko-n-a'); sw('gtko-h1', 'gtko-a1'); sw('gtko-h2', 'gtko-a2'); sw('gtko-ph', 'gtko-pa'); paintAll();
    };

    // ---- skorlar ----
    window.gtkoSc = function (el) { el.value = el.value.replace(/\D/g, '').slice(0, 2); updRes(); };
    window.gtkoTog = function () { $('gtko-leg2').classList.toggle('off', !$('gtko-l2').checked); $('gtko-legp').classList.toggle('off', !$('gtko-pn').checked); updRes(); };
    window.gtkoKey = function (e, el) {
        if (e.key !== 'Enter') return; e.preventDefault();
        const order = ['gtko-h1', 'gtko-a1'].concat($('gtko-l2').checked ? ['gtko-h2', 'gtko-a2'] : [], $('gtko-pn').checked ? ['gtko-ph', 'gtko-pa'] : []);
        const i = order.indexOf(el.id); if (i >= 0 && i < order.length - 1) $(order[i + 1]).focus(); else gtkoSave();
    };
    function readScores() {
        const g = id => { const e = $(id); return e ? e.value : ''; }, l2 = $('gtko-l2') && $('gtko-l2').checked, pn = $('gtko-pn') && $('gtko-pn').checked;
        return { homeScore: g('gtko-h1'), awayScore: g('gtko-a1'), homeScore2: l2 ? g('gtko-h2') : '', awayScore2: l2 ? g('gtko-a2') : '', penHome: pn ? g('gtko-ph') : '', penAway: pn ? g('gtko-pa') : '' };
    }
    function updRes() {
        const box = $('gtko-res'); if (!box) return; const sc = readScores(), w = koWinner(sc);
        const h1 = num(sc.homeScore), a1 = num(sc.awayScore);
        box.className = 'gtko-res';
        if (h1 === null || a1 === null) { box.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${esc(L('Skorları girince kazanan burada görünür.', 'Enter scores to see the winner here.'))}`; return; }
        const h2 = num(sc.homeScore2), a2 = num(sc.awayScore2), l2 = h2 !== null && a2 !== null, H = h1 + (l2 ? a2 : 0), A = a1 + (l2 ? h2 : 0);
        const agg = `${esc(L('Toplam', 'Agg.'))} ${H}–${A}`;
        if (!w) { box.classList.add('warn'); box.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> ${esc(L('Beraberlik — penaltı skorunu aç ve gir.', 'Level — enable and enter the penalty score.'))}<span class="r">${agg}</span>`; return; }
        const nm = (w === 'h' ? G.h.n : G.a.n).trim() || (w === 'h' ? L('Ev sahibi', 'Home') : L('Deplasman', 'Away')), u = sideLogo(w === 'h' ? 'h' : 'a');
        const pen = (num(sc.penHome) !== null && H === A) ? ` · ${esc(L('pen.', 'pens'))} ${sc.penHome}–${sc.penAway}` : '';
        const nxt = G.stage === 'Yarı Final' ? `<br>${esc(L('Finale otomatik eklenir', 'Auto-added to the final'))}` : '';
        box.classList.add('win'); box.innerHTML = `${u ? `<img src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '<i class="fa-solid fa-trophy"></i>'}<span>${esc(nm)} ${esc(L('turu geçti', 'advances'))}</span><span class="r">${agg}${pen}${nxt}</span>`;
    }

    // ---- kaydet / sil ----
    function refresh() {
        const y = window.scrollY, sc = document.querySelector('.overflow-y-auto') || document.querySelector('.overflow-auto'), st = sc ? sc.scrollTop : 0;
        renderFixturePanel(); requestAnimationFrame(() => { window.scrollTo(0, y); if (sc) sc.scrollTop = st; });
    }
    window.gtkoSave = function () {
        const tour = G.tour; if (!tour) return; const hn = G.h.n.trim(), an = G.a.n.trim(), sc = readScores();
        const empty = !hn && !an && !Object.values(sc).some(has);
        if (!G.koId && empty) { gtkoClose(); return; }
        if (!Array.isArray(tour.knockouts)) tour.knockouts = [];
        let ko = G.koId ? tour.knockouts.find(k => k.id === G.koId) : null;
        if (!ko) {
            ko = { id: 'ko_' + Date.now(), stage: G.stage, home: '', away: '', homeScore: '', awayScore: '' };
            const ord = STAGES.map(x => x[0]), mine = ord.indexOf(G.stage);      // tur sırasına göre doğru yere ekle (yarı finaller finalden önce)
            const at = tour.knockouts.findIndex(k => k && ord.indexOf(k.stage) > mine);
            if (at < 0) tour.knockouts.push(ko); else tour.knockouts.splice(at, 0, ko);
        }
        ko.stage = G.stage;
        if (ko.homeAuto && ko.home !== hn) delete ko.homeAuto;
        if (ko.awayAuto && ko.away !== an) delete ko.awayAuto;
        ko.home = hn; ko.away = an;
        if (G.h.logo && !G.h.auto) ko.homeLogo = G.h.logo; else delete ko.homeLogo;
        if (G.a.logo && !G.a.auto) ko.awayLogo = G.a.logo; else delete ko.awayLogo;
        Object.assign(ko, sc);
        advance(tour); saveToLocalStorage(); gtkoClose(); refresh();
    };
    window.gtkoDel = function () {
        if (!G.tour || !G.koId) return; if (!confirm(L('Bu tur silinsin mi?', 'Delete this round?'))) return;
        const t = G.tour.id, k = G.koId; gtkoClose(); removeKnockoutMatch(t, k);
    };


    // ===================== FİKSTÜRDEKİ TURNUVALAR → MÜSABAKALAR PANELİ =====================
    // Sezonun fikstüründe geçen her turnuva "Müsabakalar" paneline otomatik kart olarak eklenir.
    // Kartı sen silersen o sezon için bir daha otomatik eklenmez.
    const skipGet = () => { try { return JSON.parse(localStorage.getItem('gt_comp_skip') || '{}') || {}; } catch (e) { return {}; } };
    const skipAdd = (season, type) => { const o = skipGet(); (o[season] = o[season] || []); const k = tourCanon(type).toLowerCase(); if (o[season].indexOf(k) < 0) o[season].push(k); try { localStorage.setItem('gt_comp_skip', JSON.stringify(o)); } catch (e) { } };
    const skipDrop = (season, type) => { const o = skipGet(), k = tourCanon(type).toLowerCase(); o[season] = (o[season] || []).filter(x => x !== k); try { localStorage.setItem('gt_comp_skip', JSON.stringify(o)); } catch (e) { } };
    function syncComps() {
        const season = activeFixtureSeason; if (!season) return false;
        const fx = (fixtureData && fixtureData[season]) || []; if (!fx.length) return false;
        if (!customTournamentsData[season]) customTournamentsData[season] = [];
        const list = customTournamentsData[season], skip = (skipGet()[season] || []);
        const key = n => String(tourCanon(n) || '').trim().toLowerCase();
        const have = new Set(list.map(t => key(t && t.type))), seen = [], info = {}; let changed = false;
        const FR = /friendly|dostluk|hazırlık maçı/i;
        const ctxOf = m => { try { return getFixtureMatchContext(m); } catch (e) { return 'kulup'; } };
        fx.forEach(m => { const n = m && String(m.tournament || '').trim(); if (!n || n === '-') return; const k = key(n);
            if (!info[k]) { info[k] = { raw: n, club: false }; seen.push(k); } if (ctxOf(m) !== 'milli') info[k].club = true; });
        // yalnızca milli takım dostluk maçları Müsabakalar'a eklenmez
        const milliFriendly = k => FR.test(k) && !info[k].club;
        // daha önce otomatik eklenmiş, içi boş milli dostluk kartlarını temizle
        const emptyTour = t => !(t.knockouts || []).some(x => x && (x.home || x.away)) && !(t.table || []).some(r => r && r.name && r.name !== 'Takım Adı');
        for (let i = list.length - 1; i >= 0; i--) { const k = key(list[i] && list[i].type); if (info[k] && milliFriendly(k) && emptyTour(list[i])) { list.splice(i, 1); have.delete(k); changed = true; } }
        seen.forEach((k, i) => {
            if (have.has(k) || skip.indexOf(k) >= 0 || milliFriendly(k)) return;
            const raw = info[k].raw, known = !!tourFind(raw), type = tourCanon(raw);
            list.push({ id: 'ct_' + Date.now() + '_' + i, type, tableEnabled: true, knockoutEnabled: !known || KNOCKOUT_DEFAULT_TYPES.includes(type),
                table: [{ rank: '1', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }, { rank: '2', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }], knockouts: [] });
            have.add(k); changed = true;
        });
        return changed;
    }
    const _del = window.deleteCustomTournament;
    if (typeof _del === 'function') window.deleteCustomTournament = function (id) {
        const t = findTour(id), type = t && t.type, season = activeFixtureSeason;
        if (type) skipAdd(season, type);                 // silme sırasında yeniden çizim olacağı için önce kaydet
        const r = _del.apply(this, arguments);
        if (type && findTour(id)) skipDrop(season, type);   // vazgeçildiyse geri al
        return r;
    };

    // ===================== BAĞLANTILAR =====================
    window.openKoScoreModal = function (tourId, koId) { gtkoOpen(tourId, koId); };
    window.addKnockoutMatch = function (tourId) { gtkoOpen(tourId, null); };
    window.editKnockoutTeam = function (tourId, koId, side) { gtkoOpen(tourId, koId, { focus: side }); };
    // eski stage seçici / silme sonrası da final güncel kalsın
    const _upd = window.updateKnockoutField;
    if (typeof _upd === 'function') window.updateKnockoutField = function (tourId, koId, field, el) {
        const r = _upd.apply(this, arguments);
        if (field === 'stage') { const t = findTour(tourId); if (t && advance(t)) { saveToLocalStorage(); renderFixturePanel(); } }
        return r;
    };
    const _rem = window.removeKnockoutMatch;
    if (typeof _rem === 'function') window.removeKnockoutMatch = function (tourId, koId) {
        const t = findTour(tourId), ko = t && (t.knockouts || []).find(k => k.id === koId);
        const r = _rem.apply(this, arguments);
        if (t && advance(t)) { saveToLocalStorage(); renderFixturePanel(); }
        return r;
    };
    // Sayfa çizilirken (ve eski verilerde) yarı final → final taşıması uygula
    const _rfp = window.renderFixturePanel;
    if (typeof _rfp === 'function') window.renderFixturePanel = function () {
        try { let ch = syncComps(); (customTournamentsData[activeFixtureSeason] || []).forEach(t => { if (advance(t)) ch = true; }); if (ch) saveToLocalStorage(); } catch (e) { console.warn('gt-knockout', e); }
        return _rfp.apply(this, arguments);
    };
})();
