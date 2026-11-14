/* GloryTrack · Ülke seçici (gt-country.js)
   Sitedeki tüm "ülke kodu" kutularını, aranabilir ülke listesine (dropdown) çevirir.
   - Eski kodlar (TR, TUR, ENG, EN, SP…) ve ülke adları okunur, bozulmaz.
   - Orijinal input gizli kalır; uygulamanın okuduğu/yazdığı .value aynen çalışır.
   - getFlagIcon ve kıta haritası tüm ülkeleri tanıyacak şekilde genişletilir. */
(function () {
    if (window.__gtCountry) return; window.__gtCountry = true;

    const EN_ = () => (typeof currentLang !== 'undefined' && currentLang === 'en');
    const L = (tr, en) => EN_() ? en : tr;

    // ---- Ülke tablosu ----
    const CONT = {
        'AVRUPA': 'AD AL AM AT AX AZ BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GE GG GI GR HR HU IE IL IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SK SM TR UA VA XK',
        'GÜNEY AMERİKA': 'AR BO BR CL CO EC FK GF GY PE PY SR UY VE',
        'KUZEY AMERİKA': 'AG AI AW BB BL BM BQ BS BZ CA CR CU CW DM DO GD GL GP GT HN HT JM KN KY LC MF MQ MS MX NI PA PM PR SV SX TC TT US VC VG VI',
        'AFRİKA': 'AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW',
        'ASYA': 'AE AF AS AU BD BH BN BT CC CK CN CX FJ FM GU HK ID IN IO IQ IR JO JP KG KH KI KP KR KW KZ LA LB LK MH MM MN MO MP MV MY NC NF NP NR NU NZ OM PF PG PH PK PS PW QA SA SB SG SY TH TJ TK TL TM TO TV TW UZ VN VU WF WS YE'
    };
    // Birleşik Krallık ülkeleri + kodları çakışan ülkeler için site kodu (SC/NI eski sistemde İskoçya/K.İrlanda demek)
    const SITE_CODE = { 'gb-eng': 'ENG', 'gb-sct': 'SCO', 'gb-wls': 'WAL', 'gb-nir': 'NIR', 'ni': 'NIC', 'sc': 'SEY' };
    const SPECIAL = { ENG: 'gb-eng', SCO: 'gb-sct', WAL: 'gb-wls', NIR: 'gb-nir', NIC: 'ni', SEY: 'sc' };
    const UK = [['gb-eng', 'İngiltere', 'England'], ['gb-sct', 'İskoçya', 'Scotland'], ['gb-wls', 'Galler', 'Wales'], ['gb-nir', 'Kuzey İrlanda', 'Northern Ireland']];

    const fold = s => String(s || '').toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    let dnTr = null, dnEn = null;
    try { dnTr = new Intl.DisplayNames(['tr'], { type: 'region' }); dnEn = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) { }
    const ALL = [], BYKEY = {}, NAMES = {};
    function add(k, iso, tr, en, cont) {
        const e = { k, iso, site: SITE_CODE[k] || iso, tr, en, cont };
        ALL.push(e); BYKEY[k] = e; NAMES[fold(tr)] = k; NAMES[fold(en)] = k;
    }
    Object.keys(CONT).forEach(cont => CONT[cont].split(' ').forEach(iso => {
        let tr = iso, en = iso;
        try { tr = dnTr.of(iso); en = dnEn.of(iso); } catch (e) { }
        if (iso === 'XK') { tr = 'Kosova'; en = 'Kosovo'; }
        if (iso === 'TR') tr = 'Türkiye';
        add(iso.toLowerCase(), iso, tr, en, cont);
    }));
    UK.forEach(u => add(u[0], 'GB', u[1], u[2], 'AVRUPA'));
    // Sık kullanılan takma adlar
    const ALIASES = { 'turkiye': 'tr', 'turkey': 'tr', 'abd': 'us', 'usa': 'us', 'amerika': 'us', 'uk': 'gb-eng', 'cek cumhuriyeti': 'cz', 'czech republic': 'cz', 'hollanda': 'nl', 'fildisi sahili': 'ci', 'ivory coast': 'ci', 'guney kore': 'kr', 'south korea': 'kr', 'kore': 'kr' };
    Object.keys(ALIASES).forEach(a => NAMES[a] = ALIASES[a]);

    // ---- Kıta haritasını tüm ülkeleri kapsayacak şekilde genişlet ----
    try {
        ALL.forEach(e => {
            [e.site, e.iso].forEach(c => { if (c && c !== 'GB' && typeof COUNTRY_CONTINENT_MAP[c] === 'undefined') COUNTRY_CONTINENT_MAP[c] = e.cont; });
        });
    } catch (e) { console.warn('gt-country: kıta haritası', e); }

    // ---- Kod / ad → bayrak anahtarı ----
    const origFlag = window.getFlagIcon;
    const origNorm = window.normalizeCountryInput;
    function flagFromOrig(s) {
        try { const m = String(origFlag(s) || '').match(/flagcdn\.com\/\w+\/([a-z-]+)\.png/); return m ? m[1] : ''; } catch (e) { return ''; }
    }
    // kind: 'site' (rakip/kulüp kodları: TR, ENG, SP…) | 'flag' (oyuncu: tr, gb-eng…)
    function keyOf(v, kind) {
        const s = String(v == null ? '' : v).trim(); if (!s) return '';
        const up = s.toUpperCase(), lo = s.toLowerCase();
        if (SPECIAL[up] && (kind === 'site' || up.length === 3)) return SPECIAL[up];
        if (kind === 'flag' && BYKEY[lo]) return lo;
        let n = s; try { n = origNorm(s); } catch (e) { }
        const o = flagFromOrig(n); if (o && BYKEY[o]) return o;
        if (BYKEY[lo]) return lo;
        const nm = NAMES[fold(s)]; if (nm) return nm;
        return '';
    }
    window.gtCountryKey = keyOf;
    const nameOf = e => e ? (EN_() ? e.en : e.tr) : '';
    const flagUrl = (k, w) => `https://flagcdn.com/${w || 'w20'}/${k}.png`;

    // Ülke adı yazılan her yerde (toplu fikstür vb.) kod olarak çözülsün
    window.normalizeCountryInput = function (input) {
        const r = origNorm(input);
        if (!input) return r;
        const t = String(input).trim();
        if (r !== t.toUpperCase() || /^[A-Za-z]{2,3}$/.test(t)) return r;
        const k = keyOf(t, 'site'); return k ? BYKEY[k].site : r;
    };
    // Tüm sitede bayrak: aynı ülke her zaman aynı çıktıyı verir (TR = TUR), bilinmeyen ülkeler artık bayraklı
    window.getFlagIcon = function (code) {
        const k = keyOf(code, 'site');
        if (!k) return origFlag.apply(this, arguments);
        const e = BYKEY[k];
        return `<img src="${flagUrl(k)}" alt="${e.site}" title="${nameOf(e)}" class="inline-block h-3.5 object-contain rounded-sm drop-shadow-md">`;
    };

    // ---- Stil ----
    const css = document.createElement('style');
    css.textContent = `
.gtc-btn{display:flex;align-items:center;gap:8px;width:100%;min-height:38px;padding:6px 10px;border-radius:8px;background:#0f172a;border:1px solid #475569;color:#fff;font-size:13px;font-weight:600;text-align:left;cursor:pointer;transition:border-color .15s}
.gtc-btn:hover,.gtc-btn.open{border-color:var(--gt-accent,#10b981)}
.gtc-btn img{width:20px;height:15px;object-fit:cover;border-radius:2px;flex-shrink:0}
.gtc-btn span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gtc-btn.empty span{color:#64748b;font-weight:500}
.gtc-btn i{font-size:10px;color:#64748b}
.gtc-btn.sm{min-height:30px;padding:3px 6px;gap:5px;font-size:11px;justify-content:center}
.gtc-btn.sm i{display:none} .gtc-btn.sm span{flex:0 1 auto}
.mt-cc .gtc-btn{min-height:30px;width:auto;min-width:92px;background:transparent;border-color:transparent}
#gtc-pop{position:fixed;z-index:2147483000;display:none;flex-direction:column;width:290px;max-height:340px;border-radius:14px;background:#0f172a;border:1px solid #334155;box-shadow:0 24px 60px -12px rgba(0,0,0,.75);overflow:hidden}
#gtc-pop.show{display:flex}
#gtc-pop .q{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #1e293b}
#gtc-pop .q i{color:#64748b;font-size:12px}
#gtc-pop input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#fff;font-size:13px}
#gtc-pop .l{overflow-y:auto;padding:4px}
#gtc-pop .o{display:flex;align-items:center;gap:10px;width:100%;padding:7px 10px;border-radius:8px;color:#e2e8f0;font-size:13px;font-weight:600;text-align:left}
#gtc-pop .o img{width:22px;height:16px;object-fit:cover;border-radius:2px;flex-shrink:0}
#gtc-pop .o span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#gtc-pop .o em{font-style:normal;font-size:10px;font-weight:800;color:#64748b;letter-spacing:.06em}
#gtc-pop .o.on,#gtc-pop .o:hover{background:rgba(var(--gt-accent-rgb,16,185,129),.16)}
#gtc-pop .o.clr{color:#94a3b8;font-weight:700}
#gtc-pop .h{padding:14px;text-align:center;font-size:12px;color:#64748b}
body.theme-light .gtc-btn{background:#fff;border-color:#d6cfc2;color:#2c2420}
body.theme-light #gtc-pop{background:#fffdf8;border-color:#d6cfc2}
body.theme-light #gtc-pop .q{border-color:#e8e2d5} body.theme-light #gtc-pop input{color:#2c2420}
body.theme-light #gtc-pop .o{color:#2c2420}`;
    document.head.appendChild(css);

    // ---- Açılır liste ----
    let pop = null, cur = null, items = [], sel = 0;
    function ensurePop() {
        if (pop) return;
        pop = document.createElement('div'); pop.id = 'gtc-pop';
        pop.innerHTML = `<div class="q"><i class="fa-solid fa-magnifying-glass"></i><input type="text" autocomplete="off" spellcheck="false"></div><div class="l"></div>`;
        document.body.appendChild(pop);
        const q = pop.querySelector('input');
        q.addEventListener('input', renderList);
        q.addEventListener('keydown', ev => {
            if (ev.key === 'ArrowDown') { sel = Math.min(items.length - 1, sel + 1); hi(); ev.preventDefault(); }
            else if (ev.key === 'ArrowUp') { sel = Math.max(0, sel - 1); hi(); ev.preventDefault(); }
            else if (ev.key === 'Enter') { if (items[sel]) pick(items[sel].k); ev.preventDefault(); ev.stopPropagation(); }
            else if (ev.key === 'Escape') { closePop(); ev.preventDefault(); ev.stopPropagation(); }
        });
        pop.addEventListener('mousedown', ev => { if (ev.target.tagName !== 'INPUT') ev.preventDefault(); });
        pop.querySelector('.l').addEventListener('click', ev => {
            const b = ev.target.closest('.o'); if (!b) return; pick(b.dataset.k);
        });
        document.addEventListener('mousedown', ev => { if (cur && !pop.contains(ev.target) && !ev.target.closest('.gtc-btn')) closePop(); }, true);
        window.addEventListener('resize', closePop);
        document.addEventListener('scroll', ev => { if (cur && !pop.contains(ev.target)) closePop(); }, true);
    }
    function renderList() {
        const q = fold(pop.querySelector('input').value), list = pop.querySelector('.l');
        const curK = keyOf(cur.inp.value, cur.kind);
        items = ALL.filter(e => !q || fold(e.tr).includes(q) || fold(e.en).includes(q) || e.iso.toLowerCase() === q || e.site.toLowerCase() === q).sort((a, b) => fold(nameOf(a)).localeCompare(fold(nameOf(b)), 'tr'));
        // Sık kullanılanlar yukarı (arama yokken)
        if (!q) { const top = ['tr', 'gb-eng', 'es', 'de', 'it', 'fr', 'pt', 'nl']; items = top.map(k => BYKEY[k]).concat(items.filter(e => !top.includes(e.k))); }
        sel = Math.max(0, items.findIndex(e => e.k === curK));
        let h = cur.clearable ? `<button type="button" class="o clr" data-k=""><i class="fa-solid fa-xmark" style="width:22px;text-align:center"></i><span>${cur.emptyText}</span></button>` : '';
        h += items.map(e => `<button type="button" class="o" data-k="${e.k}"><img src="${flagUrl(e.k)}" alt="" loading="lazy"><span>${nameOf(e)}</span><em>${e.iso === 'GB' ? e.site : e.iso}</em></button>`).join('');
        if (!items.length) h += `<div class="h">${L('Ülke bulunamadı', 'No country found')}</div>`;
        list.innerHTML = h; hi(true);
    }
    function hi(scroll) {
        const os = pop.querySelectorAll('.o:not(.clr)');
        os.forEach((o, i) => o.classList.toggle('on', i === sel));
        if (scroll && os[sel]) os[sel].scrollIntoView({ block: 'nearest' }); else if (os[sel]) os[sel].scrollIntoView({ block: 'nearest' });
    }
    function openPop(c) {
        if (!c.btn.getBoundingClientRect().width) return;
        ensurePop(); if (cur) cur.btn.classList.remove('open');
        cur = c; c.btn.classList.add('open');
        pop.querySelector('input').value = ''; pop.querySelector('input').placeholder = L('Ülke ara…', 'Search country…');
        renderList(); pop.classList.add('show');
        const r = c.btn.getBoundingClientRect(), w = Math.max(250, Math.min(300, window.innerWidth - 16));
        pop.style.width = w + 'px';
        let left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8), top = r.bottom + 6;
        const ph = Math.min(340, pop.scrollHeight || 340);
        if (top + ph > window.innerHeight - 8 && r.top > ph + 14) top = r.top - ph - 6;
        pop.style.left = left + 'px'; pop.style.top = Math.max(8, top) + 'px';
        setTimeout(() => { try { pop.querySelector('input').focus(); } catch (e) { } }, 0);
    }
    function closePop() { if (!pop) return; pop.classList.remove('show'); if (cur) cur.btn.classList.remove('open'); cur = null; }
    function pick(k) {
        const c = cur; if (!c) return;
        const e = k ? BYKEY[k] : null;
        const val = e ? (c.kind === 'flag' ? e.k.toUpperCase() : e.site) : '';
        c.set(val);
        c.inp.dispatchEvent(new Event('input', { bubbles: true })); c.inp.dispatchEvent(new Event('change', { bubbles: true }));
        closePop();
    }

    // ---- Input'u dönüştür ----
    const DESC = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    const TARGETS = [
        ['#managed-country-input', 'site', { sm: true }],
        ['#opp-country-input', 'site', {}],
        ['#fm-opp-country', 'site', { clearable: true, empty: ['Seçilmedi (Yurtiçi sayılır)', 'Not set (counts as domestic)'] }],
        ['.fb-country', 'site', { sm: true }],
        ['#pi-country', 'flag', { clearable: true }],
        ['#gt-trx-cc', 'flag', { clearable: true }]
    ];
    function enhance(inp, kind, o) {
        if (inp.__gtc) return;
        // Klonlanmış eski düğmeleri temizle
        const prev = inp.previousElementSibling; if (prev && prev.classList && prev.classList.contains('gtc-btn')) prev.remove();
        const labBefore = inp.previousElementSibling;
        const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'gtc-btn' + (o.sm ? ' sm' : '');
        const emptyText = o.empty ? L(o.empty[0], o.empty[1]) : L('Ülke seç…', 'Select country…');
        const c = { inp, btn, kind, clearable: o.clearable !== false && !!o.clearable, emptyText: o.empty ? L(o.empty[0], o.empty[1]) : L('Seçimi temizle', 'Clear'), set: v => { DESC.set.call(inp, v); refresh(); } };
        function refresh() {
            const v = DESC.get.call(inp), k = keyOf(v, kind), e = k ? BYKEY[k] : null;
            btn.classList.toggle('empty', !e && !v);
            if (e) btn.innerHTML = `<img src="${flagUrl(k)}" alt=""><span>${o.sm ? (e.iso === 'GB' ? e.site : e.iso) : nameOf(e)}</span><i class="fa-solid fa-chevron-down"></i>`;
            else if (v) btn.innerHTML = `<span>${String(v).replace(/</g, '&lt;')}</span><i class="fa-solid fa-chevron-down"></i>`;
            else btn.innerHTML = `<span>${o.sm ? '—' : emptyText}</span><i class="fa-solid fa-chevron-down"></i>`;
            if (e) btn.title = nameOf(e);
        }
        Object.defineProperty(inp, 'value', { get() { return DESC.get.call(inp); }, set(v) { DESC.set.call(inp, v); refresh(); }, configurable: true });
        btn.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); if (cur && cur.btn === btn) closePop(); else openPop(c); });
        inp.parentNode.insertBefore(btn, inp);
        inp.style.display = 'none'; inp.tabIndex = -1; inp.__gtc = true;
        // Etiketteki "kod" ifadesini kaldır
        try {
            const lab = inp.id === 'opp-country-input' ? document.getElementById('lbl-opp-country') : labBefore;
            if (lab && lab.tagName === 'LABEL') {
                const w = document.createTreeWalker(lab, NodeFilter.SHOW_TEXT); let t;
                while ((t = w.nextNode())) t.nodeValue = t.nodeValue.replace(/Ülke Adı veya Kodu[^\n]*|Ülke Kodu/g, 'Ülke').replace(/Rakip Ülke Kodu/g, 'Rakip Ülke');
                lab.removeAttribute('title');
            }
        } catch (e) { }
        refresh();
    }
    function scan() {
        TARGETS.forEach(([sel, kind, o]) => document.querySelectorAll(sel).forEach(inp => enhance(inp, kind, o)));
    }
    let raf = 0;
    new MutationObserver(() => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; scan(); }); }).observe(document.body, { childList: true, subtree: true });
    scan();
    window.gtCountryScan = scan;
})();
