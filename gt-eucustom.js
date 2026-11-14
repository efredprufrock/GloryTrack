/* GloryTrack · Diğer Ligler: özel lig ekleme + lig adından logo arama (gt-eucustom.js)
   · Lig kartındaki açılır listeye "+ Özel lig ekle…" seçeneği
   · Grid sonunda "+ Lig kartı ekle" kutusu (yeni kart ekler), kartta × ile kaldırma
   · Kart logosuna tıklayınca Müsabaka Logosu penceresi açılır ve lig adıyla otomatik logo araması yapılır */
(function () {
    const L = (tr, en) => (typeof currentLang !== 'undefined' && currentLang === 'en') ? en : tr;
    const css = document.createElement('style');
    css.textContent = `
    .ss-tg button span{display:none}
    .ss-tg{padding:3px;gap:3px;border-radius:11px}.ss-tg button{padding:7px 15px;border-radius:8px}.ss-tg button i{font-size:15px}
    .fx-panel .ss-tg.gt-first{margin-right:12px}.fx-panel .ss-tg.gt-first + #ss-ttl{margin-right:auto}
    .gt-eu-hb{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;border-radius:6px;font-size:10px;color:#94a3b8;background:transparent;border:1px solid #334155;cursor:pointer}.gt-eu-hb:hover{color:#ccfbf1;border-color:#14b8a6;background:rgba(13,148,136,.15)}.fx-panel.ss-on .gt-eu-hb{display:none}
    .gt-eu-x{width:20px;height:20px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:#64748b;background:transparent;border:0;cursor:pointer;flex-shrink:0}
    .gt-eu-x:hover{color:#f87171;background:rgba(248,113,113,.14)}
    .eu-lglogo.gt-eu-lg{cursor:pointer;transition:transform .12s}.eu-lglogo.gt-eu-lg:hover{transform:scale(1.18)}
`;
    document.head.appendChild(css);

    // Özel ligin adı, yerleşik bir ligin takma adıyla (ör. "SuperLiga" ↔ Danish Superliga) çakışsa bile özel lig öncelikli çözülür
    if (typeof tourFind === 'function') {
        const _tf = tourFind;
        window.tourFind = tourFind = function (name) {
            if (name) { const k = tourNorm(name), c = (customCatalog || []).find(e => e && e.custom && tourNorm(e.n) === k); if (c) return c; }
            return _tf.apply(this, arguments);
        };
    }
    const esc = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s)) : String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));

    // Özel ligleri Kupalar sayfasının turnuva listesiyle eşler (sütun + logo)
    function gtEuSyncTrophyList() {
        let ch = false;
        (customCatalog || []).forEach(e => {
            if (!e || !e.custom || e.g !== 'Ulusal Ligler') return;
            const k = tourCanon(e.n), logo = (competitionLogos && competitionLogos[e.n]) || '';
            let t = tournamentsList.find(x => x && tourCanon(x.name) === k);
            if (!t) { tournamentsList.push({ id: 'lg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5), name: e.n, logoUrl: logo || tourLogoOf(e.n) || '', colorHex: e.c || '#475569' }); ch = true; }
            else if (logo && t.logoUrl !== logo) { t.logoUrl = logo; ch = true; }
        });
        if (ch) saveToLocalStorage();
        return ch;
    }
    window.gtEuSyncTrophyList = gtEuSyncTrophyList;
    // Adı kataloğa "Ulusal Ligler" grubunda ekler (varsa mevcut olanı döndürür)
    function gtEuRegister(raw) {
        const name = String(raw || '').trim().replace(/\s+/g, ' '); if (!name) return null;
        const ex = tourFind(name); if (ex && (ex.custom || tourNorm(ex.n) === tourNorm(name))) return ex.n;   // yalnızca takma adı çakışıyorsa yine de ayrı özel lig oluşturulur
        const pal = ['#0e7490', '#7c3aed', '#be185d', '#b45309', '#047857', '#4338ca', '#a21caf', '#0369a1'];
        let hs = 0; for (const ch of name) hs = (hs * 31 + ch.charCodeAt(0)) >>> 0;
        customCatalog.push({ g: 'Ulusal Ligler', n: name, s: (name.split(/\s+/).map(w => w.charAt(0)).join('').toUpperCase().slice(0, 4) || name.slice(0, 3).toUpperCase()), c: pal[hs % pal.length], custom: true });
        gtEuSyncTrophyList(); return name;
    }
    function gtEuAsk() { return gtEuRegister(prompt(L('Yeni lig adı (ör. Greek Super League):', 'New league name (e.g. Greek Super League):'))); }
    // Logo penceresini açıp lig adıyla otomatik arar
    window.gtEuLogo = function (name) {
        if (!name || typeof openCompetitionLogoModal !== 'function') return;
        openCompetitionLogoModal(name);
        if (typeof searchTeamLogos === 'function') setTimeout(() => { try { searchTeamLogos('cl', false); } catch (e) { } }, 60);
    };
    window.gtEuSet = function (season, idx, name) { setEuroSlot(season, idx, name); };
    window.gtEuAddCard = function () { window.gtclOpen({}); };
    window.gtEuRemove = function (season, idx) {
        const cur = euroSlots(season).slice(); if (cur.length <= 1) return;
        if (!confirm(L('Bu lig kartı kaldırılsın mı? (Girilen veriler silinmez.)', 'Remove this league card? (Entered data is kept.)'))) return;
        cur.splice(idx, 1); euroSlotsData[season] = cur; saveToLocalStorage(); renderFixturePanel();
    };

    // =================== ÖZEL LİG PENCERESİ (ad · logo · takım listesi · takım logoları) ===================
    const G = { open: false, mode: 'new', idx: null, entry: '', name: '', logo: '', logoAuto: true, teams: [], lcands: [], busy: false, stop: false };
    const gtclCss = document.createElement('style');
    gtclCss.textContent = `
    .gtcl-ov{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(2,6,23,.75);backdrop-filter:blur(4px)}
    .gtcl{width:min(680px,100%);max-height:92vh;display:flex;flex-direction:column;background:#0f172a;border:1px solid #334155;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.5);color:#e2e8f0;overflow:hidden}
    .gtcl-h{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #1e293b}.gtcl-h h3{font-size:16px;font-weight:800;flex:1;margin:0}
    .gtcl-x{width:30px;height:30px;border-radius:8px;border:0;background:transparent;color:#94a3b8;cursor:pointer}.gtcl-x:hover{background:#1e293b;color:#fff}
    .gtcl-b{padding:14px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px}
    .gtcl-sec>label,.gtcl-lb{display:block;font-size:10px;font-weight:900;letter-spacing:.1em;color:#64748b;text-transform:uppercase;margin-bottom:6px}
    .gtcl input[type=text],.gtcl textarea{width:100%;background:#0b1220;border:1px solid #334155;border-radius:9px;padding:8px 10px;font-size:13px;color:#e2e8f0;outline:none}
    .gtcl input[type=text]:focus,.gtcl textarea:focus{border-color:#14b8a6}.gtcl textarea{resize:vertical;min-height:70px;font-family:inherit}
    .gtcl-lg{display:flex;gap:12px;align-items:flex-start}.gtcl-prev{width:64px;height:64px;border-radius:12px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
    .gtcl-prev img{max-width:100%;max-height:100%;object-fit:contain}.gtcl-prev i{color:#64748b;font-size:22px}
    .gtcl-row{display:flex;gap:6px;align-items:center}.gtcl-grow{flex:1;min-width:0}
    .gtcl-btn{height:34px;padding:0 12px;border-radius:9px;font-size:12px;font-weight:800;border:1px solid #334155;background:#1e293b;color:#cbd5e1;cursor:pointer;white-space:nowrap}.gtcl-btn:hover{border-color:#14b8a6;color:#fff}
    .gtcl-btn.pri{background:#0d9488;border-color:#0d9488;color:#fff}.gtcl-btn.pri:hover{background:#14b8a6}.gtcl-btn:disabled{opacity:.5;cursor:default}
    .gtcl-cands{display:flex;gap:6px;overflow-x:auto;padding:6px 2px 0}.gtcl-cands img{width:44px;height:44px;object-fit:contain;background:#e2e8f0;border-radius:8px;padding:3px;cursor:pointer;border:2px solid transparent;flex-shrink:0}.gtcl-cands img:hover,.gtcl-cands img.on{border-color:#14b8a6}
    .gtcl-teams{display:flex;flex-direction:column;gap:5px;max-height:300px;overflow-y:auto;padding-right:2px}
    .gtcl-t{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:9px;background:#0b1220;border:1px solid #1e293b}
    .gtcl-t .n{width:20px;text-align:center;font-size:10px;font-weight:800;color:#475569;flex-shrink:0}
    .gtcl-t .lg{width:30px;height:30px;border-radius:7px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;cursor:pointer}.gtcl-t .lg img{max-width:100%;max-height:100%;object-fit:contain}.gtcl-t .lg i{font-size:11px;color:#94a3b8}
    .gtcl-t input[type=text]{padding:5px 8px;font-size:12px}.gtcl-t .nm{flex:1.1;min-width:0}.gtcl-t .ur{flex:1.5;min-width:0;color:#94a3b8}
    .gtcl-ib{width:28px;height:28px;border-radius:7px;border:0;background:transparent;color:#64748b;cursor:pointer;flex-shrink:0}.gtcl-ib:hover{background:#1e293b;color:#2dd4bf}.gtcl-ib.del:hover{color:#f87171}
    .gtcl-f{display:flex;gap:8px;align-items:center;padding:12px 18px;border-top:1px solid #1e293b}.gtcl-f .msg{flex:1;font-size:11.5px;color:#94a3b8}
    .gtcl-hint{font-size:11px;color:#64748b;margin-top:5px}.gtcl-empty{padding:14px;text-align:center;font-size:12px;color:#64748b;border:1px dashed #334155;border-radius:10px}
    .gt-eu-e{width:20px;height:20px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:#64748b;background:transparent;border:0;cursor:pointer;flex-shrink:0}.gt-eu-e:hover{color:#2dd4bf;background:rgba(45,212,191,.14)}
    body.theme-light .gtcl{background:#fffdf8;border-color:#d6cfc2;color:#2c2420}body.theme-light .gtcl-h{border-color:#e8e1d3}
    body.theme-light .gtcl input[type=text],body.theme-light .gtcl textarea,body.theme-light .gtcl-t{background:#fff;border-color:#d6cfc2;color:#2c2420}body.theme-light .gtcl-btn{background:#fff;border-color:#d6cfc2;color:#2c2420}body.theme-light .gtcl-btn.pri{background:#0d9488;color:#fff}
    body.theme-light .gtcl-f{border-color:#e8e1d3}body.theme-light .gtcl-prev,body.theme-light .gtcl-t .lg{background:#f1ece0}
    @media(max-width:560px){.gtcl-t .ur{display:none}}`;
    document.head.appendChild(gtclCss);
    window.__gtclG = G;
    const okLogo = u => typeof urOk === 'function' ? urOk(u) : !!u;
    const toast = (m, t) => { if (typeof gtToast === 'function') gtToast(m, t || 'info'); };
    // Dosyayı küçültüp data-URL'ye çevir (depolamayı şişirmesin)
    function gtclShrink(file, cb) {
        const fr = new FileReader();
        fr.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, 160 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.max(1, Math.round(im.width * s)); c.height = Math.max(1, Math.round(im.height * s)); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL('image/png')); }; im.onerror = () => cb(''); im.src = fr.result; };
        fr.readAsDataURL(file);
    }
    function gtclAutoLogo(name) { try { const u = getTeamLogoByName(name); return okLogo(u) ? u : ''; } catch (e) { return ''; } }
    function gtclTeamRow(t, i) {
        const lg = t.logo ? `<img src="${esc(t.logo)}" alt="" onerror="this.style.visibility='hidden'">` : '<i class="fa-solid fa-shield"></i>';
        return `<div class="gtcl-t"><span class="n">${i + 1}</span><span class="lg" title="${esc(L('Logo yükle', 'Upload logo'))}" onclick="gtclTeamFile(${i})">${lg}</span>
            <input type="text" class="nm" value="${esc(t.n)}" placeholder="${esc(L('Takım adı', 'Team name'))}" oninput="gtclTeamSet(${i},'n',this.value)">
            <input type="text" class="ur" value="${t.logo && !/^data:/.test(t.logo) ? esc(t.logo) : ''}" placeholder="${esc(t.logo ? L('(yüklenen logo)', '(uploaded logo)') : L('Logo URL', 'Logo URL'))}" oninput="gtclTeamSet(${i},'logo',this.value)" onchange="gtclRepaintRow(${i})">
            <button type="button" class="gtcl-ib" title="${esc(L('Logo ara (tekrar basınca sonraki sonuç)', 'Search logo (click again for next)'))}" onclick="gtclTeamSearch(${i},this)"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button type="button" class="gtcl-ib del" title="${esc(L('Sil', 'Delete'))}" onclick="gtclTeamDel(${i})"><i class="fa-solid fa-xmark"></i></button></div>`;
    }
    function gtclRender() {
        const ov = document.getElementById('gtcl-ov'); if (!ov) return;
        const edit = G.mode === 'edit';
        const prev = G.logo ? `<img src="${esc(G.logo)}" alt="" onerror="this.style.display='none'">` : '<i class="fa-solid fa-trophy"></i>';
        ov.querySelector('.gtcl').innerHTML = `
        <div class="gtcl-h"><i class="fa-solid fa-trophy" style="color:#2dd4bf"></i><h3>${edit ? L('Özel ligi düzenle', 'Edit custom league') : L('Özel lig ekle', 'Add custom league')}</h3><button type="button" class="gtcl-x" onclick="gtclClose()"><i class="fa-solid fa-xmark"></i></button></div>
        <div class="gtcl-b">
          <div class="gtcl-sec"><label>${L('Lig adı', 'League name')}</label>
            <input type="text" id="gtcl-name" value="${esc(G.name)}" ${edit ? 'readonly style="opacity:.7"' : ''} placeholder="${esc(L('ör. Greek Super League', 'e.g. Greek Super League'))}" oninput="gtclName(this.value)">
            ${edit ? `<div class="gtcl-hint">${L('Ad değiştirilemez (sezon verileri ada bağlı).', 'Name can’t be changed (season data is tied to it).')}</div>` : ''}</div>
          <div class="gtcl-sec"><label>${L('Lig logosu', 'League logo')}</label>
            <div class="gtcl-lg"><div class="gtcl-prev" id="gtcl-prev">${prev}</div>
              <div class="gtcl-grow"><div class="gtcl-row"><input type="text" class="gtcl-grow" id="gtcl-logo" value="${G.logo && !/^data:/.test(G.logo) ? esc(G.logo) : ''}" placeholder="${esc(G.logo ? L('(yüklenen logo)', '(uploaded logo)') : L('Logo URL', 'Logo URL'))}" oninput="gtclLogo(this.value)">
                <button type="button" class="gtcl-btn" onclick="gtclLogoSearch()"><i class="fa-solid fa-magnifying-glass"></i> ${L('Ada göre ara', 'Search by name')}</button>
                <button type="button" class="gtcl-btn" onclick="document.getElementById('gtcl-file').click()"><i class="fa-solid fa-upload"></i></button><input type="file" id="gtcl-file" accept="image/*" hidden onchange="gtclLogoFile(this)"></div>
                <div class="gtcl-cands" id="gtcl-lc">${G.lcands.map(u => `<img src="${esc(u)}" alt="" class="${u === G.logo ? 'on' : ''}" onclick="gtclLogo(this.getAttribute('src'),1)" onerror="this.remove()">`).join('')}</div></div></div></div>
          <div class="gtcl-sec"><label>${L('Takım listesi', 'Team list')} <span style="color:#14b8a6">(${G.teams.length})</span></label>
            <div class="gtcl-row"><input type="text" class="gtcl-grow" id="gtcl-add" placeholder="${esc(L('Takım adı yaz, Enter ile ekle', 'Type a team name, Enter to add'))}" onkeydown="if(event.key==='Enter'){event.preventDefault();gtclTeamAdd()}">
              <button type="button" class="gtcl-btn" onclick="gtclTeamAdd()"><i class="fa-solid fa-plus"></i></button></div>
            <details style="margin-top:8px"><summary style="cursor:pointer;font-size:11.5px;color:#94a3b8">${L('Toplu yapıştır', 'Paste a list')}</summary>
              <textarea id="gtcl-bulk" rows="4" placeholder="${esc(L('Her satıra bir takım. İstersen "Takım, logo URL" yaz.', 'One team per line. Optionally "Team, logo URL".'))}"></textarea>
              <div style="margin-top:6px"><button type="button" class="gtcl-btn" onclick="gtclBulk()">${L('Listeye ekle', 'Add to list')}</button></div></details>
            <div class="gtcl-row" style="margin:10px 0 6px"><button type="button" class="gtcl-btn" id="gtcl-all" onclick="gtclFindAll()"><i class="fa-solid fa-wand-magic-sparkles"></i> ${L('Eksik logoları otomatik bul', 'Auto-find missing logos')}</button><span class="gtcl-hint" id="gtcl-prog" style="margin:0"></span></div>
            <div class="gtcl-teams" id="gtcl-tl">${G.teams.length ? G.teams.map(gtclTeamRow).join('') : `<div class="gtcl-empty">${L('Henüz takım yok. Takımlar, ligin boş takım kutusuna tıklayınca öneri olarak çıkar.', 'No teams yet. They appear as suggestions when you click an empty team cell.')}</div>`}</div></div>
        </div>
        <div class="gtcl-f"><span class="msg" id="gtcl-msg"></span><button type="button" class="gtcl-btn" onclick="gtclClose()">${L('İptal', 'Cancel')}</button><button type="button" class="gtcl-btn pri" onclick="gtclSave()"><i class="fa-solid fa-check"></i> ${edit ? L('Kaydet', 'Save') : L('Lig ekle', 'Add league')}</button></div>`;
    }
    window.gtclOpen = function (o) {
        o = o || {}; gtclClose();
        const e = o.edit ? tourFind(o.edit) : null;
        Object.assign(G, { open: true, mode: e ? 'edit' : 'new', idx: o.idx == null ? null : o.idx, entry: e ? e.n : '', name: e ? e.n : '', logo: e ? ((competitionLogos && competitionLogos[e.n]) || '') : '', lcands: [], busy: false, stop: false,
            teams: e ? (e.teams || []).map(t => ({ n: t.n, logo: t.logo || '' })) : [] });
        const ov = document.createElement('div'); ov.id = 'gtcl-ov'; ov.className = 'gtcl-ov'; ov.innerHTML = '<div class="gtcl" role="dialog" aria-modal="true"></div>';
        ov.addEventListener('mousedown', ev => { if (ev.target === ov) gtclClose(); });
        document.body.appendChild(ov); gtclRender();
        document.addEventListener('keydown', gtclEsc, true);
        setTimeout(() => { const n = document.getElementById(e ? 'gtcl-add' : 'gtcl-name'); if (n) n.focus(); }, 30);
    };
    function gtclEsc(ev) { if (ev.key === 'Escape' && document.getElementById('gtcl-ov')) { ev.stopPropagation(); gtclClose(); } }
    window.gtclClose = function () { G.stop = true; G.open = false; const ov = document.getElementById('gtcl-ov'); if (ov) ov.remove(); document.removeEventListener('keydown', gtclEsc, true);
        // "+ Özel lig ekle…" ile açılıp iptal edilirse açılır liste eski değerine dönsün
        document.querySelectorAll('select.el-sel').forEach(s => { if (s.value === '__NEW__') s.value = s.dataset.gtName || ''; }); };
    let nameTimer = null;
    window.gtclName = function (v) { G.name = v; clearTimeout(nameTimer); if (!G.logo || G.logoAuto) nameTimer = setTimeout(() => { if (G.name.trim().length > 2 && (!G.logo || G.logoAuto)) gtclLogoSearch(true); }, 900); };
    function gtclPrevPaint() { const p = document.getElementById('gtcl-prev'); if (p) p.innerHTML = G.logo ? `<img src="${esc(G.logo)}" alt="" onerror="this.style.display='none'">` : '<i class="fa-solid fa-trophy"></i>'; }
    window.gtclLogo = function (v, fromPick) {
        G.logo = v; G.logoAuto = false; gtclPrevPaint();
        if (fromPick) { const i = document.getElementById('gtcl-logo'); if (i) i.value = /^data:/.test(v) ? '' : v; document.querySelectorAll('#gtcl-lc img').forEach(im => im.classList.toggle('on', im.getAttribute('src') === v)); }
    };
    window.gtclLogoSearch = async function (auto) {
        const q = (G.name || '').trim(); if (!q) { const n = document.getElementById('gtcl-name'); if (n) n.focus(); return; }
        const c = document.getElementById('gtcl-lc'); if (c) c.innerHTML = `<span class="gtcl-hint"><i class="fa-solid fa-spinner fa-spin"></i> ${L('Aranıyor…', 'Searching…')}</span>`;
        let urls = []; try { urls = (await tlFetchLogos(q + (/league|liga|lig|super|ligue|serie|division|cup/i.test(q) ? '' : ' league'))).slice(); const more = await tlFetchLogos(q); more.forEach(u => urls.indexOf(u) < 0 && urls.push(u)); } catch (e) { }
        const own = tourLogoOf(q); if (own && /^https?:/.test(own) && urls.indexOf(own) < 0) urls.unshift(own);
        if (!G.open || (G.name || '').trim() !== q) return;
        G.lcands = urls.slice(0, 10);
        if (c) c.innerHTML = G.lcands.length ? G.lcands.map(u => `<img src="${esc(u)}" alt="" onclick="gtclLogo(this.getAttribute('src'),1)" onerror="this.remove()">`).join('') : `<span class="gtcl-hint">${L('Logo bulunamadı. URL yapıştır ya da dosya yükle.', 'No logo found. Paste a URL or upload a file.')}</span>`;
        if (auto === true && G.logoAuto !== false && G.lcands[0] && !G.logo) { G.logo = G.lcands[0]; G.logoAuto = true; gtclPrevPaint(); const i = document.getElementById('gtcl-logo'); if (i) i.value = G.logo; document.querySelectorAll('#gtcl-lc img').forEach(im => im.classList.toggle('on', im.getAttribute('src') === G.logo)); }
    };
    window.gtclLogoFile = function (inp) { const f = inp.files && inp.files[0]; if (!f) return; gtclShrink(f, d => { if (d) { window.gtclLogo(d, 1); const i = document.getElementById('gtcl-logo'); if (i) { i.value = ''; i.placeholder = L('(yüklenen logo)', '(uploaded logo)'); } } }); inp.value = ''; };
    // ---- takım listesi ----
    function gtclListPaint() { const tl = document.getElementById('gtcl-tl'); if (tl) tl.innerHTML = G.teams.length ? G.teams.map(gtclTeamRow).join('') : `<div class="gtcl-empty">${L('Henüz takım yok.', 'No teams yet.')}</div>`; const l = document.querySelector('.gtcl-sec label span'); document.querySelectorAll('.gtcl-sec > label').forEach(x => { const s = x.querySelector('span'); if (s) s.textContent = '(' + G.teams.length + ')'; }); }
    window.gtclRepaintRow = function () { gtclListPaint(); };
    window.gtclTeamSet = function (i, k, v) { const t = G.teams[i]; if (!t) return; t[k] = v; if (k === 'logo') { t.cands = null; } };
    window.gtclTeamDel = function (i) { G.teams.splice(i, 1); gtclListPaint(); };
    function gtclPushTeam(n, logo) {
        n = String(n || '').trim(); if (!n) return false;
        const k = typeof urNorm === 'function' ? urNorm(n) : n.toLowerCase();
        if (G.teams.some(t => (typeof urNorm === 'function' ? urNorm(t.n) : t.n.toLowerCase()) === k)) return false;
        G.teams.push({ n, logo: logo || gtclAutoLogo(n) }); return true;
    }
    window.gtclTeamAdd = function () { const i = document.getElementById('gtcl-add'); if (!i) return; if (gtclPushTeam(i.value)) { i.value = ''; gtclListPaint(); const tl = document.getElementById('gtcl-tl'); if (tl) tl.scrollTop = tl.scrollHeight; } i.focus(); };
    window.gtclBulk = function () {
        const ta = document.getElementById('gtcl-bulk'); if (!ta) return; let n = 0;
        ta.value.split('\n').forEach(line => { const p = line.split(/[,;\t|]/).map(x => x.trim()).filter(Boolean); if (!p.length) return; const u = p.slice(1).find(x => /^https?:/i.test(x)) || ''; if (gtclPushTeam(p[0], u)) n++; });
        ta.value = ''; gtclListPaint(); toast(n + ' ' + L('takım eklendi', 'teams added'), 'success');
    };
    window.gtclTeamSearch = async function (i, btn) {
        const t = G.teams[i]; if (!t || !t.n.trim()) return;
        if (!t.cands) { if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; try { t.cands = (await tlFetchLogos(t.n)).slice(0, 8); } catch (e) { t.cands = []; } t.ci = -1; }
        if (!t.cands.length) { toast(L('Logo bulunamadı: ', 'No logo found: ') + t.n, 'warn'); gtclListPaint(); return; }
        t.ci = (t.ci + 1) % t.cands.length; t.logo = t.cands[t.ci]; const keep = t.cands, ci = t.ci; gtclListPaint(); G.teams[i].cands = keep; G.teams[i].ci = ci;
    };
    window.gtclTeamFile = function (i) { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = () => { const f = inp.files && inp.files[0]; if (f) gtclShrink(f, d => { if (d && G.teams[i]) { G.teams[i].logo = d; gtclListPaint(); } }); }; inp.click(); };
    window.gtclFindAll = async function () {
        if (G.busy) { G.stop = true; return; }
        const todo = G.teams.filter(t => !t.logo && t.n.trim()); if (!todo.length) { toast(L('Tüm takımların logosu var.', 'All teams already have a logo.'), 'info'); return; }
        G.busy = true; G.stop = false; const btn = document.getElementById('gtcl-all'), prog = document.getElementById('gtcl-prog'); if (btn) btn.innerHTML = '<i class="fa-solid fa-stop"></i> ' + L('Durdur', 'Stop');
        let done = 0, found = 0;
        for (const t of todo) {
            if (G.stop || !G.open) break;
            if (prog) prog.textContent = `${done + 1}/${todo.length} · ${t.n}`;
            try { const c = await tlFetchLogos(t.n); t.cands = c.slice(0, 8); t.ci = 0; if (c[0]) { t.logo = c[0]; found++; } } catch (e) { }
            done++;
        }
        G.busy = false; if (!G.open) return; if (btn) btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> ' + L('Eksik logoları otomatik bul', 'Auto-find missing logos'); if (prog) prog.textContent = `${found}/${todo.length} ${L('logo bulundu', 'logos found')}`;
        const keep = G.teams.map(t => [t.cands, t.ci]); gtclListPaint(); G.teams.forEach((t, i) => { t.cands = keep[i][0]; t.ci = keep[i][1]; });
    };
    window.gtclSave = function () {
        const msg = document.getElementById('gtcl-msg'), say = m => { if (msg) { msg.textContent = m; msg.style.color = '#f87171'; } };
        const name = (G.name || '').trim(); if (!name) { say(L('Lig adı gerekli.', 'League name is required.')); return; }
        let e;
        if (G.mode === 'edit') e = tourFind(G.entry);
        else {
            const ex = tourFind(name);
            if (ex && !ex.custom && tourNorm(ex.n) === tourNorm(name)) { say(L('Bu lig zaten kayıtlı: ', 'Already registered: ') + ex.n + L(' — açılır listeden seç.', ' — pick it from the dropdown.')); return; }
            gtEuRegister(name); e = tourFind(name);
        }
        if (!e) { say(L('Lig oluşturulamadı.', 'Could not create league.')); return; }
        e.g = 'Ulusal Ligler'; e.custom = true;
        const teams = G.teams.filter(t => t.n.trim()).map(t => ({ n: t.n.trim(), logo: t.logo || '' }));
        e.teams = teams;
        if (G.logo) competitionLogos[e.n] = G.logo; else delete competitionLogos[e.n];
        // takım logoları: kalıcı takım defterine → sitedeki her yerde (tablo, maçlar, kupalar) çözülür
        if (typeof teamBook !== 'undefined' && typeof urNorm === 'function') teams.forEach(t => { if (okLogo(t.logo)) teamBook[urNorm(t.n)] = { n: t.n, l: t.logo }; });
        const season = activeFixtureSeason, cur = euroSlots(season).slice();
        if (G.mode === 'new') {
            if (G.idx != null) { cur[G.idx] = e.n; euroSlotsData[season] = cur; }
            else if (cur.indexOf(e.n) < 0) { cur.push(e.n); euroSlotsData[season] = cur; }
        }
        gtEuSyncTrophyList(); saveToLocalStorage();
        const created = G.mode === 'new'; G.open = false; gtclClose();
        if (created && G.idx != null) { try { euroSyncTrophies(season, e.n); } catch (x) { } }
        renderFixturePanel();
        toast(created ? L('Lig eklendi: ', 'League added: ') + e.n : L('Lig güncellendi.', 'League updated.'), 'success');
    };
    // Kart başlığındaki ✎ → düzenle; boş takım kutusunda öneri = özel ligin takım listesi
    window.gtEuEdit = function (name) { window.gtclOpen({ edit: name }); };
    if (typeof euLeagueTeams === 'function') {
        const _lt = euLeagueTeams;
        window.euLeagueTeams = euLeagueTeams = function (lg) {
            try { const e = tourFind(lg); if (e && e.custom && Array.isArray(e.teams) && e.teams.length) return e.teams.map(t => ({ name: t.n, logo: t.logo || gtclAutoLogo(t.n) })).sort((a, b) => a.name.localeCompare(b.name)); } catch (x) { }
            return _lt.apply(this, arguments);
        };
    }

    function decorate() {
        const grid = document.querySelector('.eu-grid'); if (!grid) return;
        const season = activeFixtureSeason;
        grid.querySelectorAll('select.el-sel').forEach(sel => {
            if (!sel.querySelector('option[value="__NEW__"]')) { const o = document.createElement('option'); o.value = '__NEW__'; o.textContent = L('＋ Özel lig ekle…', '＋ Add custom league…'); sel.appendChild(o); }
            const m = /setEuroSlot\('([^']*)',\s*(\d+)/.exec(sel.getAttribute('onchange') || ''); if (!m) return;
            const head = sel.closest('.euro-head') || sel.parentElement, idx = +m[2];
            const lg = head.querySelector('.eu-lglogo');
            if (lg && !lg.classList.contains('gt-eu-lg')) { lg.classList.add('gt-eu-lg'); lg.title = L('Logoyu değiştir / ara', 'Change / search logo'); lg.onclick = e => { e.stopPropagation(); window.gtEuLogo(sel.dataset.gtName || (sel.options[sel.selectedIndex] || {}).value); }; }
            sel.dataset.gtName = sel.value;
            const ent = tourFind(sel.dataset.gtName || sel.value);
            if (ent && ent.custom && !head.querySelector('.gt-eu-e')) {
                const pe = document.createElement('button'); pe.type = 'button'; pe.className = 'gt-eu-e'; pe.title = L('Özel ligi düzenle (logo, takımlar)', 'Edit custom league (logo, teams)'); pe.innerHTML = '<i class="fa-solid fa-pen"></i>';
                pe.onclick = ev => { ev.stopPropagation(); window.gtEuEdit(ent.n); }; head.appendChild(pe);
            }
            if (!head.querySelector('.gt-eu-x')) {
                const x = document.createElement('button'); x.type = 'button'; x.className = 'gt-eu-x'; x.title = L('Kartı kaldır', 'Remove card'); x.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                x.onclick = e => { e.stopPropagation(); window.gtEuRemove(m[1], idx); };
                head.appendChild(x);
            }
        });
        const old = grid.querySelector('.gt-eu-add'); if (old) old.remove();
        const bulk = document.querySelector('button[onclick^="openEuroLeaguesBulkModal"]');
        if (bulk && bulk.parentElement && !bulk.parentElement.querySelector('.gt-eu-hb')) {
            const b = document.createElement('button'); b.type = 'button'; b.className = 'gt-eu-hb'; b.title = L('Yeni (özel) lig kartı ekle', 'Add a new (custom) league card');
            b.innerHTML = '<i class="fa-solid fa-plus"></i>'; b.onclick = () => window.gtEuAddCard();
            bulk.parentElement.insertBefore(b, bulk.parentElement.firstChild);
        }
        gtEuSyncTrophyList();
    }
    // İstatistik / Ligler anahtarı başlığın soluna taşınır
    function moveToggle() {
        document.querySelectorAll('.fx-panel .ss-tg').forEach(tg => {
            const h = document.getElementById('ss-ttl'); if (!h || !h.parentElement || !h.parentElement.contains(tg) || tg.classList.contains('gt-first')) return;
            tg.classList.add('gt-first'); h.parentElement.insertBefore(tg, h.parentElement.firstChild);
        });
    }
    // "+ Özel lig ekle…" seçildi → yeni lig oluştur, bu karta ata, logo ara
    document.addEventListener('change', e => {
        const sel = e.target; if (!sel || !sel.classList || !sel.classList.contains('el-sel') || sel.value !== '__NEW__') return;
        e.stopImmediatePropagation(); e.stopPropagation();
        const m = /setEuroSlot\('([^']*)',\s*(\d+)/.exec(sel.getAttribute('onchange') || '');
        if (!m) { sel.value = sel.dataset.gtName || ''; return; }
        window.gtclOpen({ idx: +m[2] });
    }, true);

    // Toplu ekleme: katalogda olmayan lig adları için onayla → özel lig olarak oluştur
    if (typeof processEuroLeaguesBulkInput === 'function') {
        const _b = processEuroLeaguesBulkInput;
        window.processEuroLeaguesBulkInput = processEuroLeaguesBulkInput = function () {
            try {
                const ta = document.getElementById('el-bulk-input'), fresh = [];
                String((ta && ta.value) || '').split('\n').forEach(line => {
                    const p = line.split(/[,;\t]/).map(x => x.trim()); if (p.length < 2 || !p[0] || !p[1]) return;
                    const e = tourFind(p[0]);
                    if (e) { if (e.custom && e.g !== 'Ulusal Ligler') e.g = 'Ulusal Ligler'; }
                    else if (!(EURO_LEAGUES_LIST || []).some(l => l.name.toLowerCase() === p[0].toLowerCase()) && fresh.indexOf(p[0]) < 0) fresh.push(p[0]);
                });
                if (fresh.length) {
                    if (!confirm(L('Şu lig adları kayıtlı değil, özel lig olarak eklensin mi?\n\n', 'These leagues are not registered. Add them as custom leagues?\n\n') + fresh.join('\n'))) return;
                    fresh.forEach(n => gtEuRegister(n));
                }
                if (ta) ta.value = ta.value.split('\n').map(l => l.replace(/;|\t/g, ',')).join('\n');
            } catch (e) { console.warn(e); }
            return _b.apply(this, arguments);
        };
    }
    if (typeof renderTrophiesGrid === 'function') {
        const _t = renderTrophiesGrid;
        window.renderTrophiesGrid = renderTrophiesGrid = function () { try { gtEuSyncTrophyList(); } catch (e) { } return _t.apply(this, arguments); };
    }
    if (typeof renderFixturePanel === 'function') {
        const _r = renderFixturePanel;
        window.renderFixturePanel = renderFixturePanel = function () { const r = _r.apply(this, arguments); try { decorate(); moveToggle(); } catch (e) { console.warn(e); } return r; };
    }
    // Kart başlığı sonradan yeniden çizilirse (sekme değişimi vb.)
    new MutationObserver(() => { const g = document.querySelector('.eu-grid'); if (g && !document.querySelector('.gt-eu-hb')) { decorate(); moveToggle(); } }).observe(document.body, { childList: true, subtree: true });
})();
