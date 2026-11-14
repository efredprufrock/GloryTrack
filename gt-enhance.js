// =====================================================================
// GloryTrack · kullanım iyileştirmeleri
// script.js'ten SONRA yüklenir; mevcut fonksiyonları değiştirmez, sarar.
//  1) alert() kutuları yerine uygulama içi bildirim / pencere
//  2) Adres çubuğunda sayfa (#kadro vb.): yenileyince aynı sayfa, geri tuşu çalışır
//  3) Klavye kısayolları: 1-9 sayfalar, / arama, ? yardım, Ctrl+Enter kaydet
//  4) Pencere açılınca ilk alana odak, kapanınca eski yere dönüş
//  5) Çevrimdışı / yeni sürüm bildirimleri
// =====================================================================
(function () {
    'use strict';
    if (window.__gtEnhance) return; window.__gtEnhance = true;

    const isEn = () => { try { return typeof currentLang !== 'undefined' && currentLang === 'en'; } catch (e) { return false; } };
    const L = (tr, en) => (isEn() ? en : tr);
    const PAGES = ['anasayfa', 'kupalar', 'maclar', 'kadro', 'ligtarihi', 'transfer', 'golasist', 'sezonlar', 'ayarlar'];

    // ---------------- 1) Bildirimler ----------------
    const ICONS = { info: 'fa-circle-info', ok: 'fa-circle-check', warn: 'fa-triangle-exclamation', err: 'fa-circle-xmark' };
    const recent = []; // yenileme öncesi gösterilen son bildirimler (yenilemeden sonra tekrar gösterilir)

    function toastHost() {
        let h = document.getElementById('gt-toasts');
        if (!h) { h = document.createElement('div'); h.id = 'gt-toasts'; h.setAttribute('role', 'status'); h.setAttribute('aria-live', 'polite'); document.body.appendChild(h); }
        return h;
    }
    function gtToast(text, type, opts) {
        type = ICONS[type] ? type : 'info'; opts = opts || {};
        const host = toastHost();
        while (host.children.length >= 4) host.firstChild.remove();
        const el = document.createElement('div');
        el.className = 'gt-toast ' + type;
        const ic = document.createElement('i'); ic.className = 'fa-solid ' + ICONS[type];
        const sp = document.createElement('span'); sp.textContent = String(text);
        el.append(ic, sp);
        const close = () => { if (el._gone) return; el._gone = true; clearTimeout(el._tm); el.classList.add('out'); setTimeout(() => el.remove(), 220); };
        if (opts.action) {
            const a = document.createElement('button'); a.type = 'button'; a.className = 'gt-act'; a.textContent = opts.action.label;
            a.onclick = () => { close(); try { opts.action.run(); } catch (e) { console.warn(e); } };
            el.append(a);
        }
        const x = document.createElement('button'); x.type = 'button'; x.className = 'gt-x'; x.setAttribute('aria-label', L('Kapat', 'Close'));
        x.innerHTML = '<i class="fa-solid fa-xmark"></i>'; x.onclick = close; el.append(x);
        host.appendChild(el);
        const ms = opts.sticky ? 0 : (opts.ms || (type === 'err' ? 8000 : type === 'warn' ? 6000 : 4200));
        if (ms) {
            el._tm = setTimeout(close, ms);
            el.addEventListener('mouseenter', () => clearTimeout(el._tm));
            el.addEventListener('mouseleave', () => { el._tm = setTimeout(close, 1800); });
        }
        if (!opts.action && !opts.replay) { recent.push({ t: String(text), k: type, at: Date.now() }); if (recent.length > 4) recent.shift(); }
        return close;
    }
    function gtDialog(title, body, type, html) {
        const prev = document.activeElement;
        const ov = document.createElement('div'); ov.className = 'gt-dlg-ov';
        const box = document.createElement('div'); box.className = 'gt-dlg ' + (type || ''); box.setAttribute('role', 'alertdialog'); box.setAttribute('aria-modal', 'true');
        const h = document.createElement('h3'); h.innerHTML = '<i class="fa-solid ' + (ICONS[type] || ICONS.info) + '"></i>';
        const ht = document.createElement('span'); ht.textContent = title; h.append(ht);
        const b = document.createElement('div'); b.className = 'gt-dlg-body';
        if (html) b.innerHTML = body; else b.textContent = body;
        const f = document.createElement('div'); f.className = 'gt-dlg-foot';
        const ok = document.createElement('button'); ok.type = 'button'; ok.textContent = L('Tamam', 'OK'); f.append(ok);
        box.append(h, b, f); ov.append(box); document.body.appendChild(ov);
        const close = () => { ov.remove(); document.removeEventListener('keydown', onKey, true); if (prev && prev.focus && document.contains(prev)) { try { prev.focus(); } catch (e) {} } };
        const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); close(); } else if (e.key === 'Tab') { e.preventDefault(); ok.focus(); } };
        document.addEventListener('keydown', onKey, true);
        ok.onclick = close;
        ov.addEventListener('mousedown', e => { if (e.target === ov) close(); });
        ok.focus();
    }
    function classify(msg) {
        const s = msg.toLowerCase();
        if (/⚠|hata|başarısız|geçersiz|bozuk|doldu|kaydedilem|indirilem|yüklenem|error|failed|invalid|corrupt|could not|couldn't/.test(s)) return 'err';
        if (/başarıyla|kopyalandı|eklendi|küçültüldü|artırıldı|güncellendi|success|copied|added|updated/.test(s)) return 'ok';
        if (/zorunlu|lütfen|please|required|boş olamaz|bulunamadı|bulunmuyor|seçilmedi|girilmedi|zaten var|yok\.|not found|no players|already/.test(s)) return 'warn';
        return 'info';
    }
    function gtAlert(msg) {
        let text = msg == null ? '' : String(msg);
        try { if (typeof i18nDialogText === 'function') text = i18nDialogText(text); } catch (e) {}
        const type = classify(text);
        const clean = text.replace(/^[⚠️\s]+/, '');
        if (clean.indexOf('\n') !== -1 || clean.length > 150) {
            const nl = clean.indexOf('\n');
            const title = nl > 0 && nl <= 70 ? clean.slice(0, nl).trim() : ({ err: L('Bir sorun var', 'Something went wrong'), warn: L('Dikkat', 'Heads up'), ok: L('Tamamlandı', 'Done'), info: L('Bilgi', 'Info') })[type];
            const body = nl > 0 && nl <= 70 ? clean.slice(nl + 1).replace(/^\n+/, '') : clean;
            gtDialog(title, body, type);
        } else {
            gtToast(clean, type);
        }
    }
    window.alert = gtAlert;
    window.gtToast = gtToast;
    // Bildirimden hemen sonra sayfa yenilenirse (ör. yedek yükleme) mesaj kaybolmasın
    window.addEventListener('pagehide', () => {
        try { const keep = recent.filter(r => Date.now() - r.at < 2500); if (keep.length) sessionStorage.setItem('gt_toasts', JSON.stringify(keep)); } catch (e) {}
    });
    function replayToasts() {
        try {
            const raw = sessionStorage.getItem('gt_toasts'); if (!raw) return;
            sessionStorage.removeItem('gt_toasts');
            JSON.parse(raw).forEach(r => gtToast(r.t, r.k, { replay: true }));
        } catch (e) {}
    }

    // ---------------- Açık pencere tespiti ----------------
    const OPEN_SEL = 'div.fixed.inset-0[id$="-modal"]:not(.hidden), .pyr-ov, .lo-ov, .cpw-modal.open, .qs-ov.open, .fm2.on, #tc-ov, #xc-ov, .gt-dlg-ov';
    const anyOverlayOpen = () => !!document.querySelector(OPEN_SEL);
    const isTyping = (t) => !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    const pressEscape = () => document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

    // ---------------- 2) Sayfa adresi (#sayfa) + geri tuşu ----------------
    let navLock = false, booted = false;
    const hashPage = () => { let h = ''; try { h = decodeURIComponent((location.hash || '').slice(1)); } catch (e) {} return fromSlug(h); };
    const SLUG = { anasayfa: 'home', kupalar: 'trophies', maclar: 'matches', kadro: 'squad', ligtarihi: 'league-history', transfer: 'transfers', golasist: 'goals-assists', sezonlar: 'seasons', ayarlar: 'settings' };
    function fromSlug(s) { return PAGES.find(p => p === s || SLUG[p] === s) || null; }
    // Açılışta istenen sayfa (script.js ana sayfayı açmadan önce okunur): #kadro ya da ?p=kadro
    let initialWant = hashPage();
    try { const q = new URLSearchParams(location.search).get('p'); if (!initialWant && fromSlug(q)) initialWant = fromSlug(q); } catch (e) {}
    if (typeof window.selectMainMenu === 'function') {
        const orig = window.selectMainMenu;
        window.selectMainMenu = function (id) {
            const r = orig.apply(this, arguments);
            try {
                if (!navLock && PAGES.includes(id) && hashPage() !== id) {
                    const url = id === 'anasayfa' && !location.hash ? location.href : '#' + SLUG[id];
                    if (booted) history.pushState({ gt: id }, '', url); else history.replaceState({ gt: id }, '', url);
                }
            } catch (e) {}
            return r;
        };
        window.addEventListener('popstate', () => {
            let cur = null; try { cur = activeMain; } catch (e) {}
            // Geri tuşu önce açık pencereyi kapatır (telefonda uygulamadan çıkmak yerine)
            if (anyOverlayOpen()) { pressEscape(); try { history.pushState({ gt: cur }, '', '#' + SLUG[cur || 'anasayfa']); } catch (e) {} return; }
            const target = hashPage() || 'anasayfa';
            if (target === cur) return;
            navLock = true; try { window.selectMainMenu(target); } finally { navLock = false; }
        });
    }
    function bootNav() {
        const want = initialWant;
        let cur = null; try { cur = activeMain; } catch (e) {}
        if (want && want !== cur) { try { window.selectMainMenu(want); } catch (e) { console.warn('Sayfa açılamadı:', e); } }
        booted = true;
    }

    // ---------------- 3) Klavye kısayolları ----------------
    function showShortcuts() {
        if (document.querySelector('.gt-dlg-ov')) return;
        const k = (...keys) => keys.map(x => '<kbd>' + x + '</kbd>').join('');
        const rows = [
            [k('1') + '…' + k('9'), L('Sayfalar arasında geç (menü sırasıyla)', 'Jump between pages (in menu order)')],
            [k('Ctrl', 'K') + ' / ' + k('/'), L('Hızlı arama: oyuncu, sezon, sayfa, eylem', 'Quick search: players, seasons, pages, actions')],
            [k('Ctrl', 'Enter'), L('Açık penceredeki formu kaydet', 'Save the form in the open window')],
            [k('Esc'), L('Pencereyi kapat', 'Close the window')],
            [k('?'), L('Bu listeyi göster', 'Show this list')]
        ];
        gtDialog(L('Klavye kısayolları', 'Keyboard shortcuts'), '<div class="gt-keys">' + rows.map(r => '<div>' + r[0] + '</div><div>' + r[1] + '</div>').join('') + '</div>', 'info', true);
    }
    window.gtShowShortcuts = showShortcuts;
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter: açık penceredeki birincil "kaydet" düğmesi
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !e.defaultPrevented) {
            const modals = document.querySelectorAll('div.fixed.inset-0[id$="-modal"]:not(.hidden)');
            const m = modals[modals.length - 1]; if (!m) return;
            const btns = [...m.querySelectorAll('button[onclick^="save"], button[onclick^="process"]')].filter(b => b.offsetParent !== null && !b.disabled);
            if (btns.length) { e.preventDefault(); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); btns[btns.length - 1].click(); }
            return;
        }
        if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented || isTyping(e.target) || anyOverlayOpen()) return;
        if (e.key >= '1' && e.key <= '9') {
            const id = PAGES[+e.key - 1];
            if (id && document.getElementById('btn-' + id)) { e.preventDefault(); window.selectMainMenu(id); }
        } else if (e.key === '/') {
            if (typeof qsOpen === 'function') { e.preventDefault(); qsOpen(); }
        } else if (e.key === '?') {
            e.preventDefault(); showShortcuts();
        }
    });

    // ---------------- 4) Pencere odağı ----------------
    function watchModals() {
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        document.querySelectorAll('div.fixed.inset-0[id$="-modal"]').forEach(m => {
            let wasOpen = !m.classList.contains('hidden'), prev = null;
            m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
            new MutationObserver(() => {
                const open = !m.classList.contains('hidden');
                if (open === wasOpen) return; wasOpen = open;
                if (open) {
                    prev = document.activeElement && document.activeElement !== document.body ? document.activeElement : null;
                    if (!finePointer) return; // telefonda klavyeyi kendiliğinden açma
                    setTimeout(() => {
                        if (m.classList.contains('hidden') || m.contains(document.activeElement)) return;
                        const vis = (sel) => [...m.querySelectorAll(sel)].find(x => x.offsetParent !== null);
                        // Önce yazı alanı (isim vb.), yoksa ilk seçim kutusu
                        const f = vis('input:not([type="hidden"]):not([type="file"]):not([type="color"]):not([type="checkbox"]):not([type="radio"]):not([disabled]):not([readonly]), textarea:not([disabled])') || vis('select:not([disabled])');
                        // Odaklanınca öneri listesi açan alanlarda pencereyi listeyle kapatmamak için odak verilmez
                        if (f && f.classList.contains('use-autocomplete')) return;
                        if (f) { try { f.focus({ preventScroll: true }); if (f.select && f.type !== 'number' && f.tagName === 'INPUT') f.select(); } catch (e) {} }
                    }, 80);
                } else {
                    // Pencere kapanınca açık kalmış öneri listesini de kapat
                    try { if (typeof closeAutocomplete === 'function') closeAutocomplete(); } catch (e) {}
                    if (prev && document.contains(prev) && !anyOverlayOpen()) { try { prev.focus({ preventScroll: true }); } catch (e) {} }
                    prev = null;
                }
            }).observe(m, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // ---------------- 5) Çevrimdışı / yeni sürüm ----------------
    function netStatus(announce) {
        const off = navigator.onLine === false;
        document.body.classList.toggle('gt-offline', off);
        if (!announce) return;
        if (off) gtToast(L('Çevrimdışısın. Değişiklikler bu cihaza kaydedilir, bağlantı gelince buluta gönderilir.', 'You are offline. Changes are saved on this device and sync when you are back online.'), 'warn', { ms: 7000 });
        else gtToast(L('Bağlantı geri geldi.', 'Back online.'), 'ok');
    }
    window.addEventListener('online', () => netStatus(true));
    window.addEventListener('offline', () => netStatus(true));
    if ('serviceWorker' in navigator) {
        const hadController = !!navigator.serviceWorker.controller;
        let told = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!hadController || told) return; told = true;
            gtToast(L('GloryTrack güncellendi. Yeni sürümü görmek için yenile.', 'GloryTrack was updated. Reload to see the new version.'), 'info', { sticky: true, action: { label: L('Yenile', 'Reload'), run: () => location.reload() } });
        });
    }

    // ---------------- Başlangıç ----------------
    function start() { netStatus(false); watchModals(); bootNav(); replayToasts(); }
    // script.js sayfayı window.onload içinde kurar; onun ardından çalış
    if (document.readyState === 'complete') setTimeout(start, 0);
    else window.addEventListener('load', () => setTimeout(start, 0));
})();
