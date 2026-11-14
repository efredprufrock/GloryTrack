// GloryTrack service worker
//  · Uygulama dosyaları: ağ öncelikli (her zaman en güncel sürüm), çevrimdışıyken önbellekten açılır
//  · Yazı tipi, ikon ve kütüphane dosyaları (CDN): önbellekten anında, arka planda tazelenir
//    → çevrimdışıyken de ikonlar, yazı tipleri ve grafikler çalışır
//  · Firebase / bulut istekleri ve logolar: dokunulmaz (doğrudan ağa gider)
const CACHE = 'glorytrack-v2';
const CDN_CACHE = 'glorytrack-cdn-v1';
const KEEP = [CACHE, CDN_CACHE];

// İlk kurulumda önbelleğe alınan uygulama kabuğu (biri eksikse kurulum yine tamamlanır)
const SHELL = [
    './', 'index.html', 'style.css', 'tailwind.css?v=1', 'gt-modern.css?v=1',
    'script.js', 'gt-enhance.js?v=1', 'gt-squad.js?v=1', 'gt-squad.css?v=1', 'gt-career.js?v=1', 'gt-country.js?v=1', 'gt-career.css?v=1', 'team-tournament-data.js', 'firebase-config.js',
    'manifest.json', 'favicon.svg?v=3', 'icons/icon-192.png'
];

const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];
const isCdnAsset = (url) => CDN_HOSTS.includes(url.hostname) || (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/'));

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE)
            .then(c => Promise.allSettled(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// CDN dosyası: CORS ile yeniden iste (okunabilir yanıt → önbellek kotasını şişirmez); olmazsa özgün istek
function fetchCdn(req) {
    return fetch(req.url, { mode: 'cors', credentials: 'omit' }).catch(() => fetch(req));
}

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // 1) Kendi dosyalarımız: ağ öncelikli
    if (url.origin === self.location.origin) {
        e.respondWith(
            fetch(req).then(res => {
                if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
                return res;
            }).catch(() =>
                caches.match(req)
                    .then(r => r || caches.match(req, { ignoreSearch: true }))
                    .then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()))
            )
        );
        return;
    }

    // 2) CDN dosyaları: önce önbellek, arka planda tazele
    if (isCdnAsset(url)) {
        e.respondWith(
            caches.open(CDN_CACHE).then(cache =>
                cache.match(req.url).then(hit => {
                    const fresh = fetchCdn(req).then(res => {
                        if (res && (res.ok || res.type === 'opaque')) cache.put(req.url, res.clone());
                        return res;
                    });
                    if (hit) { e.waitUntil(fresh.catch(() => {})); return hit; }
                    return fresh;
                })
            )
        );
    }
    // 3) Diğer her şey (Firebase, logolar, bayraklar…): tarayıcının kendi akışı
});
