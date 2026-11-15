/* GloryTrack – Rakip paneli: lig durumu, sezon sezon sıralar, şampiyonluk / yükselme / düşme, aranızdaki geçmiş.
   script.js'ten SONRA yüklenir; oppH2HShow'u sarar. */
(function () {
    'use strict';
    if (window.__gtOpp) return; window.__gtOpp = 1;
    const orig = window.oppH2HShow;
    if (typeof orig !== 'function') return;

    const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const key = n => { try { return pyrKey(n); } catch (e) { return String(n || '').trim().toLowerCase(); } };
    const same = (a, b) => { if (!a || !b) return false; if (key(a) === key(b)) return true; try { return !!homeIsUs(a, b); } catch (e) { return false; } };
    const num = v => { const n = parseInt(v, 10); return isNaN(n) ? null : n; };
    const LV = [
        { k: 'PL', n: 'Premier League', rx: /premier\s*league(?!\s*2)/i },
        { k: 'CH', n: 'Championship', rx: /championship/i },
        { k: 'L1', n: 'League One', rx: /league\s*one/i },
        { k: 'L2', n: 'League Two', rx: /league\s*two/i }
    ];
    const lvByType = t => LV.findIndex(l => l.rx.test(String(t || '')));

    function pyrLevel(s, name) {
        const P = (typeof pyramidData !== 'undefined' && pyramidData && pyramidData[s]) || null;
        if (!P) return null;
        for (let i = 0; i < LV.length; i++) {
            const arr = P[LV[i].k] || [];
            const ix = arr.findIndex(n => same(typeof n === 'string' ? n : n && n.name, name));
            if (ix >= 0) return { lv: i, rank: ix + 1, size: arr.length };
        }
        return null;
    }

    function tableOf(s, name) {
        const tours = ((typeof customTournamentsData !== 'undefined' && customTournamentsData && customTournamentsData[s]) || []);
        let best = null;
        tours.forEach(t => {
            let rows = [];
            try { rows = homeTourRows(t); } catch (e) {}
            if (!rows.some(r => same(r.name, name))) return;
            let nat = false; try { const e = tourFind(t.type); nat = !!(e && e.g === 'Ulusal Ligler'); } catch (e) {}
            if (!best || (nat && !best.nat)) best = { t, rows, nat };
        });
        if (!best) return null;
        const hasRank = best.rows.every(r => num(r.rank) !== null);
        const sorted = best.rows.slice().sort(hasRank ? (a, b) => num(a.rank) - num(b.rank) : (a, b) => (num(b.pts) || 0) - (num(a.pts) || 0) || (num(b.gd) || 0) - (num(a.gd) || 0));
        const ix = sorted.findIndex(r => same(r.name, name));
        const need = 2 * (sorted.length - 1);
        return { type: best.t.type, rows: sorted, ix, row: sorted[ix], rank: hasRank ? num(sorted[ix].rank) : ix + 1, finished: sorted.length > 1 && sorted.every(r => (num(r.pld) || 0) >= need) };
    }

    function history(name, cur) {
        const S = (typeof seasonsList !== 'undefined' && Array.isArray(seasonsList)) ? seasonsList : [];
        const lh = (typeof leagueHistoryData !== 'undefined' && leagueHistoryData || []).find(t => t && same(t.name, name));
        const out = [];
        S.forEach(s => {
            const tb = tableOf(s, name), py = pyrLevel(s, name);
            const h = lh && lh.history && lh.history[s];
            const hRank = h && num(h.rank) > 0 ? num(h.rank) : null;
            if (!tb && !py && hRank === null) return;
            let lv = py ? py.lv : (tb ? lvByType(tb.type) : -1);
            if (lv === -1) lv = null;
            const e = {
                s, lv, tb,
                league: (tb && tb.type) || (py ? LV[py.lv].n : ''),
                rank: tb ? tb.rank : (py ? py.rank : hRank),
                size: tb ? tb.rows.length : (py ? py.size : null),
                pts: tb && tb.row ? num(tb.row.pts) : (h ? num(h.pts) : null)
            };
            e.done = s !== cur || (tb ? tb.finished : true);
            e.champ = e.rank === 1 && e.done;
            out.push(e);
        });
        out.forEach((e, i) => {
            const prev = out[i - 1];
            e.mv = 0;
            if (prev && e.lv !== null && prev.lv !== null && S.indexOf(prev.s) === S.indexOf(e.s) - 1) e.mv = e.lv < prev.lv ? 1 : e.lv > prev.lv ? -1 : 0;
        });
        return out;
    }

    function build(context, opp, hasMatches) {
        const T = managedTeams && managedTeams.kulup, our = (T && T.name) || '';
        const S = Array.isArray(seasonsList) ? seasonsList : [];
        const cur = S[S.length - 1];
        const H = history(opp.name, cur);
        const mine = our ? history(our, cur) : [];
        const shared = H.filter(e => mine.some(m => m.s === e.s && ((e.lv !== null && e.lv === m.lv) || (e.league && e.league === m.league))));
        const ordinal = n => n + '.';

        // ---- Lig durumu (en güncel veri olan sezon) ----
        const last = H.length ? H[H.length - 1] : null;
        let status;
        if (!last) {
            status = `<div class="op-none">${L('Bu rakip için lig verisi yok. Fikstür\'de lig tablosu ya da Lig Tarihi\'nde piramit girdiğinde burada görünür.', 'No league data for this opponent yet. It appears once a table or pyramid is entered.')}</div>`;
        } else {
            const tb = last.tb;
            let mini = '';
            if (tb) {
                const n = tb.rows.length, from = Math.max(0, Math.min(tb.ix - 2, n - 5)), part = tb.rows.slice(from, from + 5);
                mini = `<div class="op-mt">${part.map((r, i) => {
                    const me = same(r.name, opp.name), us = our && same(r.name, our);
                    const rk = tb.rows.indexOf(r) + 1;
                    return `<div class="op-mr${me ? ' me' : ''}${us ? ' us' : ''}"><span class="op-rk">${E(num(r.rank) !== null ? r.rank : rk)}</span><span class="op-tn">${E(r.name)}</span><span>${E(r.pld || '0')}</span><span class="op-gd">${num(r.gd) > 0 ? '+' : ''}${E(r.gd || '0')}</span><b>${E(r.pts || '0')}</b></div>`;
                }).join('')}</div>`;
            }
            const row = tb && tb.row;
            const rec = row && (row.w !== undefined && row.w !== '') ? `${E(row.w)}-${E(row.d || 0)}-${E(row.l || 0)}` : '';
            const pos = last.rank ? `<div class="op-big">${last.rank}<small>.</small>${last.size ? `<em>/ ${last.size}</em>` : ''}</div>` : '<div class="op-big">–</div>';
            status = `<div class="op-st">
                <div class="op-sh">${pos}<div class="op-si"><b>${E(last.league || L('Lig', 'League'))}</b><span>${E(last.s)}${last.s !== cur ? ' · ' + L('en son veri', 'latest data') : ''}${tb && !tb.finished && last.s === cur ? ' · ' + L('sezon sürüyor', 'in progress') : ''}</span></div></div>
                <div class="op-kv">${last.pts !== null ? `<div><small>${L('Puan', 'Pts')}</small><b>${last.pts}</b></div>` : ''}${row && num(row.pld) !== null ? `<div><small>${L('Maç', 'Pld')}</small><b>${E(row.pld)}</b></div>` : ''}${rec ? `<div><small>G-B-M</small><b>${rec}</b></div>` : ''}${row && num(row.gd) !== null ? `<div><small>${L('Averaj', 'GD')}</small><b class="${num(row.gd) > 0 ? 'p' : num(row.gd) < 0 ? 'n' : ''}">${num(row.gd) > 0 ? '+' : ''}${E(row.gd)}</b></div>` : ''}</div>
                ${mini}</div>`;
        }

        // ---- Sayaçlar ----
        const titles = H.filter(e => e.champ).length, ups = H.filter(e => e.mv > 0).length, downs = H.filter(e => e.mv < 0).length;
        const ranked = H.filter(e => e.rank && e.done);
        const best = ranked.length ? ranked.reduce((a, b) => (b.rank < a.rank ? b : a)) : null;
        const counters = `<div class="op-cn">
            <div class="g"><i class="fa-solid fa-trophy"></i><b>${titles}</b><small>${L('Şampiyonluk', 'Titles')}</small></div>
            <div class="u"><i class="fa-solid fa-arrow-trend-up"></i><b>${ups}</b><small>${L('Yükselme', 'Promotions')}</small></div>
            <div class="d"><i class="fa-solid fa-arrow-trend-down"></i><b>${downs}</b><small>${L('Düşme', 'Relegations')}</small></div>
            <div class="b"><i class="fa-solid fa-medal"></i><b>${best ? best.rank + '.' : '–'}</b><small>${best ? L('En iyi: ', 'Best: ') + E(best.s) : L('En iyi derece', 'Best finish')}</small></div></div>`;

        // ---- Sezon sezon ----
        const tiles = H.length ? `<div class="op-ss">${H.map(e => {
            const cls = e.champ ? 'c' : e.mv > 0 ? 'u' : e.mv < 0 ? 'd' : '';
            const vs = shared.includes(e);
            const mark = (e.champ ? '<i class="fa-solid fa-trophy c"></i>' : '') + (e.mv > 0 ? '<i class="fa-solid fa-caret-up u"></i>' : e.mv < 0 ? '<i class="fa-solid fa-caret-down d"></i>' : '');
            return `<div class="op-sz ${cls}" title="${E(e.s + ' · ' + (e.league || ''))}"><small>${E(e.s)}${vs ? `<span class="op-vs" title="${L('Aynı ligdeydiniz', 'Same league')}"></span>` : ''}</small><b>${e.rank ? e.rank + '.' : '–'}</b><em>${E(e.league || '')}</em>${mark ? `<span class="op-mk">${mark}</span>` : ''}</div>`;
        }).join('')}</div><div class="op-lg"><span><i class="fa-solid fa-trophy"></i>${L('Şampiyon', 'Champion')}</span><span><i class="fa-solid fa-caret-up"></i>${L('Yükseldi', 'Promoted')}</span><span><i class="fa-solid fa-caret-down"></i>${L('Düştü', 'Relegated')}</span><span><i class="dot"></i>${L('Aynı ligdeydiniz', 'Same league as you')}</span></div>` : `<div class="op-none">${L('Geçmiş sezon verisi yok.', 'No previous-season data.')}</div>`;

        // ---- Aranızdaki geçmiş (boş durum bilgisi) ----
        const sharedTxt = shared.length
            ? L(`Aynı ligde geçirdiğiniz sezonlar: ${shared.map(e => e.s + (e.league ? ' (' + e.league + ')' : '')).join(', ')}.`, `Seasons in the same league: ${shared.map(e => e.s + (e.league ? ' (' + e.league + ')' : '')).join(', ')}.`)
            : L('Şu ana kadar aynı ligde yer almadınız.', 'You have not shared a league so far.');

        return {
            html: `<section class="op-pf">
                <div class="op-r1"><div class="h2h-box"><div class="h2h-lab mb">${L('Lig durumu', 'League status')}</div>${status}</div><div class="h2h-box"><div class="h2h-lab mb">${L('Şampiyonluk · Yükselme · Düşme', 'Titles · Promotions · Relegations')}</div>${counters}</div></div>
                <div class="h2h-box"><div class="h2h-lab mb">${L('Önceki sezonlarda bitirdiği sıra', 'Finishing position by season')}</div>${tiles}</div>
            </section>`,
            empty: `<div class="op-first"><i class="fa-solid fa-handshake"></i><b>${L('İlk kez karşılaşıyorsunuz', 'First time meeting')}</b><span>${E(sharedTxt)}</span></div>`
        };
    }

    window.oppH2HShow = function (context, opp) {
        const r = orig.apply(this, arguments);
        try {
            if (context === 'milli' || !opp || !opp.name) return r;
            const modal = document.getElementById('opponent-stats-modal'), body = modal && modal.querySelector('.h2h-body');
            if (!body) return r;
            const empty = body.querySelector('.h2h-empty');
            const o = build(context, opp, !empty);
            const old = body.querySelector('.op-pf'); if (old) old.remove();
            const holder = document.createElement('div'); holder.innerHTML = o.html;
            const btns = body.querySelector('.h2h-btns');
            body.insertBefore(holder.firstElementChild, btns || null);
            if (empty) { empty.classList.add('op-emptyfx'); empty.innerHTML = o.empty; }
        } catch (e) { console.warn('gt-opponent', e); }
        return r;
    };
    window.GTOPP = { history, build };
})();
