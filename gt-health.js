/* Veri sağlığı (Faz 1): boyut göstergesi · geri alma kapsamı · lig sözlüğü · eski nitelik budama · yedek hatırlatması */
(function () {
    'use strict';
    let LIMIT = 900 * 1024;
    const syncLimit = () => { LIMIT = (window.GT_RTDB ? 40960 : 900) * 1024; };
    const en = () => typeof currentLang !== 'undefined' && currentLang === 'en';
    const L = (tr, e) => (en() ? e : tr);
    const E = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s == null ? '' : s)) : String(s == null ? '' : s));
    const kb = n => (n / 1024 >= 100 ? Math.round(n / 1024) : (n / 1024).toFixed(1)) + ' KB';
    const bytes = v => { try { return new Blob([JSON.stringify(v) || '']).size; } catch (e) { return 0; } };

    // ---- 1) geri alma geçmişi: Veri Girişi alanları da izlensin ----
    try {
        if (typeof HIST_LABELS === 'object' && HIST_LABELS) {
            Object.assign(HIST_LABELS, { entryFlags: 'Veri girişi işaretleri', topPlayers: 'Gol/asist kralları', tablesSnap: 'Aralık tabloları', deletedCols: 'Silinen sütunlar', nameAlias: 'Oyuncu eşleştirmeleri', leagueAlias: 'Lig sözlüğü' });
        }
    } catch (e) {}

    // ---- ölçüm ----
    const LABEL = { fixtureData: 'Maçlar', matchDataStore: 'Maç detayları', squadData: 'Kadro', customTournamentsData: 'Turnuvalar', trophyData: 'Kupalar', transferData: 'Transferler', notebookData: 'Not defteri', leagueHistoryData: 'Lig tarihi', euroLeaguesData: 'Diğer ligler', pyramidData: 'Lig piramidi', opponentsConfig: 'Rakipler', tournamentsList: 'Kupa listesi', competitionLogos: 'Turnuva logoları', customCatalog: 'Katalog', tablesSnap: 'Aralık tabloları', entryFlags: 'Veri girişi işaretleri', topPlayers: 'Gol/asist kralları' };
    function attrBytes() {
        let all = 0, sub = 0;
        ['astakim', 'akademi', 'milli'].forEach(c => (squadData[c] || []).forEach(p => { if (p && p.attrs) Object.keys(p.attrs).forEach(k => { const s = p.attrs[k]; all += bytes(s); if (s && s.a) sub += bytes(s.a); }); }));
        return { all, sub };
    }
    function measure() {
        syncLimit();
        const d = window.getAllData(), total = bytes(d);
        const parts = Object.keys(d).map(k => [k, bytes(d[k])]).sort((a, b) => b[1] - a[1]).slice(0, 5);
        return { total, parts, attr: attrBytes() };
    }
    const pct = n => Math.round(n / LIMIT * 100);
    const tone = p => p >= 85 ? 'bad' : p >= 60 ? 'mid' : 'ok';

    // ---- 3) eski sezon alt niteliklerini budama ----
    function pruneTargets(keep) {
        const seasons = (seasonsList || []).slice(-Math.max(1, keep)), out = [];
        ['astakim', 'akademi', 'milli'].forEach(c => (squadData[c] || []).forEach(p => { if (p && p.attrs) Object.keys(p.attrs).forEach(k => { const sn = String(k).split('|')[0], s = p.attrs[k]; if (!seasons.includes(sn) && s && s.a && Object.keys(s.a).length) out.push(s); }); }));
        return out;
    }
    window.gtHealthPrunePreview = function () {
        const keep = parseInt((document.getElementById('gth-keep') || {}).value) || 2, t = pruneTargets(keep), n = t.reduce((a, s) => a + bytes(s.a), 0);
        const el = document.getElementById('gth-prune-info'); if (el) el.textContent = t.length ? L(`${t.length} kayıttan yaklaşık ${kb(n)} boşalır.`, `About ${kb(n)} freed from ${t.length} records.`) : L('Budanacak eski kayıt yok.', 'Nothing to prune.');
    };
    window.gtHealthPrune = function () {
        const keep = parseInt((document.getElementById('gth-keep') || {}).value) || 2, t = pruneTargets(keep);
        if (!t.length) { window.gtHealthPrunePreview(); return; }
        const n = t.reduce((a, s) => a + bytes(s.a), 0);
        if (!confirm(L(`Son ${keep} sezon dışındaki ${t.length} Development Plans kaydının alt nitelikleri silinecek (yaklaşık ${kb(n)}). Ana nitelikler, OVR ve yaş kalır. Önce yedek almanız önerilir. Devam edilsin mi?`, `Sub-attributes of ${t.length} Development Plans records outside the last ${keep} seasons will be deleted (about ${kb(n)}). Main attributes, OVR and age are kept. A backup is recommended first. Continue?`))) return;
        t.forEach(s => { delete s.a; });
        try { saveToLocalStorage(); } catch (e) {}
        refresh();
    };

    // ---- 4) lig sözlüğü ----
    const norm = n => String(n || '').toLowerCase().replace(/\s+/g, ' ').trim();
    window.gtHealthAliasAdd = function () {
        const a = document.getElementById('gth-al-a'), b = document.getElementById('gth-al-b'); if (!a || !b) return;
        const from = norm(a.value), to = String(b.value || '').trim();
        if (!from || !to || from === norm(to)) return;
        window.gtLeagueAlias = window.gtLeagueAlias || {}; window.gtLeagueAlias[from] = to;
        try { if (window.gtMergeLeagueNames) window.gtMergeLeagueNames(); saveToLocalStorage(); } catch (e) {}
        refresh();
    };
    window.gtHealthAliasDel = function (k) {
        if (window.gtLeagueAlias) delete window.gtLeagueAlias[k];
        try { saveToLocalStorage(); } catch (e) {}
        refresh();
    };

    // ---- 5) yedek hatırlatması ----
    window.gtHealthBackup = function () { if (typeof exportJSON === 'function') exportJSON(); };
    const LK = 'gt_last_export';
    const lastExport = () => { try { return parseInt(localStorage.getItem(LK)) || 0; } catch (e) { return 0; } };
    if (typeof window.exportJSON === 'function') {
        const o = window.exportJSON;
        window.exportJSON = function () { const r = o.apply(this, arguments); try { localStorage.setItem(LK, String(Date.now())); } catch (e) {} setTimeout(() => { chip(); refresh(); }, 50); return r; };
    }
    const days = () => { const t = lastExport(); return t ? Math.floor((Date.now() - t) / 864e5) : null; };
    function chip() {
        let c = document.getElementById('gth-chip');
        const home = typeof activeMain !== 'undefined' && activeMain === 'anasayfa';
        let msg = '', cls = '';
        try {
            const d = days(), m = measure(), p = pct(m.total), snooze = parseInt(localStorage.getItem('gt_bk_snooze')) || 0;
            if (Date.now() < snooze) { msg = ''; }
            else if (p >= 80) { msg = L(`Veri boyutu %${p}: bulut sınırına yaklaşıyor`, `Data size ${p}%: nearing the cloud limit`); cls = 'bad'; }
            else if (d === null) { msg = L('Henüz yedek indirmedin', 'No backup downloaded yet'); }
            else if (d >= 7) { msg = L(`Son yedek ${d} gün önce`, `Last backup ${d} days ago`); }
        } catch (e) {}
        if (!home || !msg) { if (c) c.remove(); return; }
        if (!c) { c = document.createElement('div'); c.id = 'gth-chip'; document.body.appendChild(c); }
        c.className = 'gth-chip ' + cls;
        c.innerHTML = `<i class="fa-solid ${cls ? 'fa-triangle-exclamation' : 'fa-floppy-disk'}"></i><span>${E(msg)}</span><button type="button" onclick="gtHealthBackup()">${L('Yedek indir', 'Back up')}</button><button type="button" class="gth-x" title="${L('Yarın hatırlat', 'Remind tomorrow')}" onclick="gtHealthSnooze()"><i class="fa-solid fa-xmark"></i></button>`;
    }
    window.gtHealthSnooze = function () { try { localStorage.setItem('gt_bk_snooze', String(Date.now() + 864e5)); } catch (e) {} chip(); };
    if (typeof window.selectMainMenu === 'function') {
        const o = window.selectMainMenu;
        window.selectMainMenu = function () { const r = o.apply(this, arguments); try { chip(); } catch (e) {} return r; };
    }
    setTimeout(() => { try { chip(); } catch (e) {} }, 1500);

    // ---- Ayarlar kartı ----
    function card() {
        const m = measure(), p = pct(m.total), t = tone(p), al = window.gtLeagueAlias || {}, d = days();
        const bar = `<div class="gth-bar"><div class="gth-fill ${t}" style="width:${Math.min(100, p)}%"></div></div>`;
        const rows = m.parts.map(([k, n]) => `<div class="gth-r"><span>${E(LABEL[k] || k)}</span><span>${kb(n)}</span></div>`).join('');
        const alRows = Object.keys(al).map(k => `<div class="gth-r"><span>${E(k)} <i class="fa-solid fa-arrow-right"></i> ${E(al[k])}</span><button type="button" class="gth-mini" onclick="gtHealthAliasDel('${E(k).replace(/'/g, '&#39;')}')"><i class="fa-solid fa-xmark"></i></button></div>`).join('') || `<div class="gth-note">${L('Tanımlı eşleme yok.', 'No mappings.')}</div>`;
        return `<div class="gth-head"><span><i class="fa-solid fa-heart-pulse"></i> ${L('Veri Sağlığı', 'Data Health')}</span><span class="gth-pct ${t}">%${p}</span></div>
            ${bar}
            <div class="gth-sub">${kb(m.total)} / ${kb(LIMIT)} · ${L('bulut sınırı', 'cloud limit')}</div>
            <div class="gth-sec">${L('En büyük veri grupları', 'Largest data groups')}</div>${rows}
            <div class="gth-r gth-dim"><span>${L('Development Plans (nitelikler)', 'Development Plans (attributes)')}</span><span>${kb(m.attr.all)}${m.attr.sub ? ` · ${L('alt nitelik', 'sub-attr')} ${kb(m.attr.sub)}` : ''}</span></div>
            <div class="gth-sec">${L('Eski sezon alt niteliklerini temizle', 'Prune old sub-attributes')}</div>
            <div class="gth-line"><span>${L('Son', 'Keep last')}</span><select id="gth-keep" onchange="gtHealthPrunePreview()"><option>1</option><option selected>2</option><option>3</option><option>4</option></select><span>${L('sezon kalsın', 'seasons')}</span><button type="button" class="gth-btn" onclick="gtHealthPrune()">${L('Temizle', 'Prune')}</button></div>
            <div class="gth-note" id="gth-prune-info"></div>
            <div class="gth-sec">${L('Lig sözlüğü', 'League name map')}</div>${alRows}
            <div class="gth-line"><input id="gth-al-a" placeholder="${L('Eski ad', 'Old name')}"><i class="fa-solid fa-arrow-right"></i><input id="gth-al-b" placeholder="${L('Kullanılacak ad', 'Use name')}"><button type="button" class="gth-btn" onclick="gtHealthAliasAdd()">${L('Ekle', 'Add')}</button></div>
            <div class="gth-sec">${L('Yedek', 'Backup')}</div>
            <div class="gth-line"><span class="gth-note">${d === null ? L('Henüz indirilmedi', 'Not downloaded yet') : d === 0 ? L('Bugün indirildi', 'Downloaded today') : L(`${d} gün önce indirildi`, `Downloaded ${d} days ago`)}</span><button type="button" class="gth-btn" onclick="gtHealthBackup()">${L('Yedek indir', 'Download')}</button></div>`;
    }
    function inject() {
        const c = document.querySelector('.st-c'); if (!c) return;
        let d = c.querySelector('.gth-card');
        if (!d) { d = document.createElement('div'); d.className = 'gth-card'; const e = c.querySelector('.gte-card'); c.insertBefore(d, e ? e.nextSibling : c.firstElementChild); }
        d.innerHTML = card(); window.gtHealthPrunePreview();
    }
    function refresh() { try { inject(); chip(); } catch (e) { console.warn('gt-health:', e); } }
    if (typeof window.renderSettingsPanel === 'function') {
        const o = window.renderSettingsPanel;
        window.renderSettingsPanel = function () { const r = o.apply(this, arguments); try { inject(); } catch (e) { console.warn('gt-health:', e); } return r; };
    }
})();
