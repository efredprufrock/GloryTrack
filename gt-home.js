/* Ana sayfa düzeni (1. aşama): Kadro paneli ⇄ İlk 11 geçişi, Gol Kralları sol alta, alt orta panel boş */
(function () {
    'use strict';
    let on = false;
    try { on = localStorage.getItem('gtHomeXi') === '1'; } catch (e) {}
    const save = () => { try { localStorage.setItem('gtHomeXi', on ? '1' : '0'); } catch (e) {} };
    const active = () => on && !(typeof homeSquadEdit !== 'undefined' && homeSquadEdit);

    function sync() {
        const k = document.getElementById('hcontent-kadro'); if (!k) return;
        const xi = active();
        k.classList.toggle('gt-xi', xi);
        const box = k.querySelector('.gt-xi-view .home-xi-container');
        const ctx = box && box.dataset.ctx;
        const h = k.querySelector('.gt-kh4');
        if (h) h.innerHTML = xi
            ? `<i class="fa-solid fa-people-group text-emerald-400 mr-1.5"></i>${ctx === 'akademi' ? 'İlk 5' : 'İlk 11'}`
            : '<i class="fa-solid fa-users text-emerald-400 mr-1.5"></i>Kadro';
        const b = k.querySelector('.gt-xi-btn');
        if (b) {
            b.classList.toggle('gt-on', xi);
            b.title = xi ? 'Kadro listesine dön' : 'İlk 11 sahasını göster';
            b.innerHTML = `<i class="fa-solid ${xi ? 'fa-users' : 'fa-people-group'}"></i>`;
        }
        if (typeof homeFitPitches === 'function') { homeFitPitches(); requestAnimationFrame(homeFitPitches); }
    }

    function build() {
        const k = document.getElementById('hcontent-kadro'); if (!k || k.querySelector('.gt-xi-view')) return;
        const body = k.lastElementChild; if (body) body.classList.add('gt-kbody');
        // İlk 11 sahasını (yatay) Kadro paneline taşı
        const ilk = document.getElementById('hcontent-ilk11');
        const wrap = ilk && ilk.querySelector('.hidden.xl\\:block');
        const view = document.createElement('div'); view.className = 'gt-xi-view';
        if (wrap) view.appendChild(wrap);
        k.appendChild(view);
        // Başlık + geçiş butonu
        const head = k.firstElementChild;
        const h4 = head && head.querySelector('h4'); if (h4) h4.classList.add('gt-kh4');
        const right = head && head.lastElementChild;
        if (right && right !== h4) {
            const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'gt-xi-btn';
            btn.onclick = function (e) { e.stopPropagation(); on = !on; save(); sync(); };
            right.insertBefore(btn, right.firstChild);
        }
        // Gol Kralları -> sol alt; alt orta boş panel
        const g = document.getElementById('hcontent-goller');
        if (g && !document.getElementById('hcontent-bos')) {
            g.className = g.className.replace('xl:order-5', 'xl:order-4');
            const e = document.createElement('div'); e.id = 'hcontent-bos';
            e.className = g.className.replace('xl:order-4', 'xl:order-5');
            g.after(e);
        }
        try { fillOpp(); } catch (er) { console.warn('gt-home opp', er); }
        sync();
    }


    // ===== Alt orta panel: OPPONENT (sıradaki maçın rakibi) =====
    const E = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const nz = v => (v === '' || v === undefined || v === null || isNaN(parseInt(v, 10))) ? null : parseInt(v, 10);

    function findOpp(ctx, name) {            // kayıtlı rakip (id) varsa maç kayıtları oradan da okunur
        const cfg = opponentsConfig && opponentsConfig[ctx]; if (!cfg) return null;
        const d = ((cfg.domestic && cfg.domestic.teams) || []).find(t => t && t.name && homeIsUs(t.name, name));
        if (d) return d;
        for (const g of (cfg.foreign || [])) { const f = ((g && g.teams) || []).find(t => t && t.name && homeIsUs(t.name, name)); if (f) return f; }
        return null;
    }

    function oppData(m) {
        const club = (managedTeams.kulup && managedTeams.kulup.name) || '', nat = (managedTeams.milli && managedTeams.milli.name) || '';
        let ctx = 'kulup', our = club;
        if (homeIsUs(m.home, nat) || homeIsUs(m.away, nat)) { ctx = 'milli'; our = nat; }
        if (homeIsUs(m.home, club) || homeIsUs(m.away, club)) { ctx = 'kulup'; our = club; }
        const weHome = homeIsUs(m.home, our);
        const name = weHome ? m.away : m.home;
        const reg = findOpp(ctx, name);
        const store = (matchDataStore && matchDataStore[ctx]) || {};
        const fx = (typeof fixtureData !== 'undefined' && fixtureData) || {};
        const sl = Array.isArray(seasonsList) ? seasonsList : [];
        const ms = [];
        const push = (s, x) => {
            if (!x) return; const ts = nz(x.teamScore), os = nz(x.oppScore); let r = x.result;
            if (!r && ts !== null && os !== null) r = ts > os ? 'W' : ts < os ? 'L' : 'D';
            if (r === 'W' || r === 'D' || r === 'L') ms.push({ s, m: x, r, ts, os });
        };
        if (reg && reg.id) sl.filter(s => store[s]).forEach(s => ((store[s] && store[s][reg.id]) || []).forEach(x => push(s, x)));
        else sl.filter(s => fx[s]).forEach(s => (fx[s] || []).filter(f => f && ((homeIsUs(f.home, our) && homeIsUs(f.away, name)) || (homeIsUs(f.away, our) && homeIsUs(f.home, name)))).forEach(f => {
            const h = homeIsUs(f.home, our);
            push(s, { teamScore: h ? f.homeScore : f.awayScore, oppScore: h ? f.awayScore : f.homeScore, location: f.ground === 'neutral' ? 'N' : (h ? 'H' : 'A'), tournament: f.tournament, events: f.events });
        }));
        return { ctx, our, name, weHome, ms, reg };
    }

    function oppCard() {
        const m = typeof homeNextMatch === 'function' ? homeNextMatch() : null;
        if (!m) return `<div class="gt-op-none">${L('Sıradaki maç yok.', 'No upcoming match.')}</div>`;
        const o = oppData(m), ms = o.ms, n = ms.length;
        const cnt = r => ms.filter(x => x.r === r).length, w = cnt('W'), d = cnt('D'), l = cnt('L');
        const sc = ms.filter(x => x.ts !== null && x.os !== null);
        const gf = sc.reduce((a, x) => a + x.ts, 0), ga = sc.reduce((a, x) => a + x.os, 0), gd = gf - ga;
        const wr = n ? Math.round(w / n * 100) : 0;
        const logo = (typeof getTeamLogoByName === 'function' && getTeamLogoByName(o.name)) || (o.reg && o.reg.logoUrl && !/ui-avatars/.test(o.reg.logoUrl) ? o.reg.logoUrl : '');
        const tl = m.tournament && typeof tourLogoOf === 'function' ? tourLogoOf(m.tournament) : '';
        const locTxt = m.ground === 'neutral' ? L('Tarafsız', 'Neutral') : (o.weHome ? L('İç saha', 'Home') : L('Deplasman', 'Away'));
        const S = Array.isArray(seasonsList) ? seasonsList : [], cur = S[S.length - 1];
        let H = []; try { H = (window.GTOPP && GTOPP.history) ? GTOPP.history(o.name, cur) : []; } catch (e) {}
        const last = H.length ? H[H.length - 1] : null;
        const pts = last && last.pts !== null && last.pts !== undefined ? `<div class="gt-op-mut">${last.pts} ${L('puan', 'pts')}</div>` : '';
        const right = `<div class="gt-op-rt">${last && last.rank ? `<div class="gt-op-pos">${last.rank}.</div>` : ''}${pts}<div class="gt-op-mut">${E((last && last.league) || '')}</div></div>`;
        const wdl = n ? `<div class="gt-op-wdl"><span class="gt-op-t"><span class="g">${w}</span> <i>·</i> <span class="y">${d}</span> <i>·</i> <span class="rd">${l}</span></span><span class="gt-op-pb"><i class="W" style="width:${w / n * 100}%"></i><i class="D" style="width:${d / n * 100}%"></i><i class="L" style="width:${l / n * 100}%"></i></span><span class="gt-op-mut">${L('G · B · M', 'W · D · L')}</span></div>` : `<div class="gt-op-wdl"><span class="gt-op-mut">${L('İlk kez karşılaşıyorsunuz', 'First time meeting')}</span></div>`;
        const LT = L('GBM', 'WDL');
        const rec = ms.slice().reverse().slice(0, 3).map(x => {
            const tlg = x.m.tournament && typeof tourLogoOf === 'function' ? tourLogoOf(x.m.tournament) : '';
            const score = (x.ts !== null && x.os !== null) ? `${x.ts}-${x.os}` : LT[x.r === 'W' ? 0 : x.r === 'D' ? 1 : 2];
            const loc = x.m.location === 'A' ? L('Dep', 'A') : x.m.location === 'N' ? L('Tar', 'N') : L('İç', 'H');
            return `<div class="gt-op-rw"><span class="gt-op-mut">${E(x.s)}</span><span class="gt-op-tn">${tlg ? `<img src="${E(tlg)}" alt="">` : ''}${E(x.m.tournament || '')} · ${loc}</span><span class="gt-op-pill ${x.r}">${score}</span></div>`;
        }).join('') || `<div class="gt-op-mut">—</div>`;
        const split = (loc, lab) => {
            const g = ms.filter(x => (x.m.location || 'H') === loc), a = g.filter(x => x.r === 'W').length, b = g.filter(x => x.r === 'D').length, c = g.filter(x => x.r === 'L').length;
            return `<div class="gt-op-rw"><span class="gt-op-mut">${lab}</span><span class="gt-op-bar">${g.length ? `<i class="W" style="width:${a / g.length * 100}%"></i><i class="D" style="width:${b / g.length * 100}%"></i><i class="L" style="width:${c / g.length * 100}%"></i>` : ''}</span><b>${a}-${b}-${c}</b></div>`;
        };
        const tally = type => { const t = {}; ms.forEach(x => (x.m.events || []).forEach(ev => { if (ev && ev.type === type) { const nm = String(ev.scorer || '').trim(); if (nm) t[nm] = (t[nm] || 0) + 1; } })); return Object.entries(t).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); };
        const top = tally('US').slice(0, 1), oTop = tally('OPP').slice(0, 1);
        const topHtml = top.length ? top.map(([nm, g], i) => `<div class="gt-op-rw"><span class="gt-op-nm"><em>${i + 1}</em>${E(nm)}</span><b>${g}</b></div>`).join('') : `<div class="gt-op-mut">${L('Gol kaydı yok', 'No goals recorded')}</div>`;
        const oTopHtml = oTop.length ? `<div class="gt-op-rw"><span class="gt-op-nm"><em>1</em>${E(oTop[0][0])}</span><b>${oTop[0][1]}</b></div>` : `<div class="gt-op-mut">—</div>`;
        const best = sc.filter(x => x.ts > x.os).sort((a, b) => (b.ts - b.os) - (a.ts - a.os) || b.ts - a.ts)[0];
        const worst = sc.filter(x => x.ts < x.os).sort((a, b) => (b.os - b.ts) - (a.os - a.ts) || b.os - a.os)[0];
        const ev = (x, c) => x ? `<span class="${c}">${x.ts}-${x.os}</span> <small>${E(x.s)}</small>` : '<span class="gt-op-mut">—</span>';
        const fin = H.filter(e => e.rank && e.done).slice(-4).map(e => `<div class="gt-op-chip"><small>${E(e.s)}</small><b>${e.rank}.</b></div>`).join('')
            + (last && !last.done && last.rank ? `<div class="gt-op-chip on"><small>${E(last.s)}</small><b>${last.rank}.</b></div>` : '');
        return `<div class="gt-op">
            <div class="gt-op-hd"><div class="gt-op-hr" onclick="homeOpenTeam('${E(o.name).replace(/'/g, "\\'")}')" title="${L('Rakip profilini aç', 'Open opponent profile')}">
                <div class="gt-op-cp"><span class="gt-op-cl">${tl ? `<img src="${E(tl)}" alt="">` : '<i class="fa-solid fa-trophy"></i>'}</span><div><div class="gt-op-sc">${E(m.tournament || '')}</div><div class="gt-op-mut">${m.matchNo ? L('Maç ', 'Match ') + E(m.matchNo) + ' · ' : ''}${locTxt}</div></div></div>
                <div class="gt-op-mid"><span class="gt-op-cr">${logo ? `<img src="${E(logo)}" alt="" onerror="this.style.visibility='hidden'">` : E(String(o.name).slice(0, 2).toUpperCase())}</span><div class="gt-op-n">${E(o.name)}</div></div>
                ${right}</div>${wdl}</div>
            <div class="gt-op-bd">
              <div class="gt-op-t4"><div class="gt-op-tl"><div class="gt-op-k">${L('Oynanan', 'Played')}</div><div class="gt-op-v">${n}</div></div><div class="gt-op-tl"><div class="gt-op-k">${L('Galibiyet', 'Win')}</div><div class="gt-op-v ${wr >= 50 ? 'g' : n ? 'rd' : ''}">${n ? '%' + wr : '–'}</div></div><div class="gt-op-tl"><div class="gt-op-k">${L('G. A/Y', 'G. F/A')}</div><div class="gt-op-v">${n ? gf + ':' + ga : '–'}</div></div><div class="gt-op-tl"><div class="gt-op-k">${L('Averaj', 'G. Diff.')}</div><div class="gt-op-v ${gd > 0 ? 'g' : gd < 0 ? 'rd' : ''}">${n ? (gd > 0 ? '+' : '') + gd : '–'}</div></div></div>
              <div class="gt-op-c2">
                <div class="gt-op-col"><div class="gt-op-cd"><div class="gt-op-k">${L('Son karşılaşmalar', 'Recent meetings')}</div>${rec}</div>
                  <div class="gt-op-cd gt-op-grow"><div class="gt-op-k">${L('Sezon sonu sırası', 'Finishing position')}</div><div class="gt-op-chips">${fin || '<span class="gt-op-mut">—</span>'}</div></div></div>
                <div class="gt-op-col"><div class="gt-op-cd">${split('H', L('İç saha', 'Home'))}${split('A', L('Deplasman', 'Away'))}</div>
                  <div class="gt-op-cd"><div class="gt-op-k">${L('Lehimize golcüler', 'Scorers vs')}</div>${topHtml}<div class="gt-op-k" style="margin-top:3px">${L('Aleyhimize', 'Against us')}</div>${oTopHtml}</div>
                  <div class="gt-op-cd gt-op-2"><div><div class="gt-op-k">${L('En büyük galibiyet', 'Biggest win')}</div>${ev(best, 'g')}</div><div><div class="gt-op-k">${L('En ağır yenilgi', 'Heaviest defeat')}</div>${ev(worst, 'rd')}</div></div></div>
              </div>
            </div></div>`;
    }

    function fillOpp() {
        const e = document.getElementById('hcontent-bos'); if (!e) return;
        e.innerHTML = `<div class="hidden xl:flex bg-slate-800 border-b border-slate-700 px-3 h-10 shrink-0 justify-between items-center"><h4 class="text-sm font-bold text-white"><i class="fa-solid fa-user-shield text-emerald-400 mr-1.5"></i>Opponent</h4><span class="gt-op-mut">${L('Sıradaki maç', 'Next match')}</span></div><div class="gt-op-wrap">${oppCard()}</div>`;
    }

    // ===== Skor giriş penceresi: Maçlar panelinin içinde açılır (pop-up değil) =====
    const mrModal = () => document.getElementById('match-result-modal');
    const mrOpen = () => { const m = mrModal(); return !!m && !m.classList.contains('hidden'); };
    const mrHome = () => { const m = mrModal(); if (m && m.parentNode !== document.body) document.body.appendChild(m); if (m) m.classList.remove('gt-inline'); };
    const mrInline = () => {
        const p = document.getElementById('hcontent-maclar'), m = mrModal();
        if (!p || !m || typeof activeMain === 'undefined' || activeMain !== 'anasayfa' || !p.offsetParent) return false;
        p.appendChild(m); m.classList.add('gt-inline'); return true;
    };
    const origMrOpen = window.openMatchResultModal;
    if (typeof origMrOpen === 'function') window.openMatchResultModal = function () {
        const r = origMrOpen.apply(this, arguments);
        try { mrHome(); mrInline(); } catch (e) { console.warn('gt-home mr', e); }
        return r;
    };
    const origMrClose = window.closeMatchResultModal;
    if (typeof origMrClose === 'function') window.closeMatchResultModal = function () {
        const r = origMrClose.apply(this, arguments);
        try { mrHome(); } catch (e) {}
        return r;
    };

    const origRender = window.renderHomePanel;
    if (typeof origRender === 'function') window.renderHomePanel = function () {
        const wasOpen = mrOpen() && mrModal().classList.contains('gt-inline');
        mrHome();                                   // panel yeniden çizilirken pencere silinmesin
        const r = origRender.apply(this, arguments);
        try { build(); if (wasOpen) mrInline(); } catch (e) { console.warn('gt-home', e); }
        return r;
    };
    const origEdit = window.homeToggleSquadEdit;
    if (typeof origEdit === 'function') window.homeToggleSquadEdit = function () {
        if (on && !homeSquadEdit) { on = false; save(); }   // düzenleme kadro listesinde yapılır
        return origEdit.apply(this, arguments);
    };
})();
