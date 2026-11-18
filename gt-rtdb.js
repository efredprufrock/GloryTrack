// =====================================================================
// GloryTrack · Bulut deposunu Firestore'dan Firebase Realtime Database'e taşır
//  - Firestore'daki tek belge 1 MB sınırı kalkar (burada 8 MB'a kadar kayıt alınır)
//  - script.js'e dokunmadan çalışır: `fbDb` yerine Firestore uyumlu küçük bir katman koyar
//    (collection().doc().get/set/delete/onSnapshot ve runTransaction aynı şekilde çalışır)
//  - Eski veriler Firestore'dan ilk okunuşta OTOMATİK kopyalanır (Firestore'a dokunulmaz, yedek olarak kalır)
//  - firebase-config.js içinde databaseURL yoksa ya da database SDK'sı yüklenmemişse hiçbir şey değişmez
// =====================================================================
(function () {
    'use strict';
    const MAX_BYTES = 8 * 1024 * 1024;

    function build(fs, rdb) {
        const snapOf = (id, v) => ({
            id, exists: !!(v && typeof v.j === 'string'),
            metadata: { hasPendingWrites: false },
            data() { return v && typeof v.j === 'string' ? JSON.parse(v.j) : undefined; }
        });
        const nodeOf = d => ({ rev: (d && d._rev) || 0, j: JSON.stringify(d) });

        function Ref(id, dataPath, base, legacy, main) { this.id = id; this.dataPath = dataPath; this.base = base; this.legacy = legacy; this.main = main; }
        Ref.prototype.collection = function (name) {
            const me = this;
            return { doc(cid) { return new Ref(cid, me.base + '/' + name + '/' + cid, null, me.legacy.collection(name).doc(cid), false); } };
        };
        Ref.prototype.markDone = function () { return this.main ? rdb.ref(this.base + '/m').set(true) : Promise.resolve(); };
        Ref.prototype.get = async function () {
            const v = (await rdb.ref(this.dataPath).get()).val();
            if (v && typeof v.j === 'string') return snapOf(this.id, v);
            if (this.main && (await rdb.ref(this.base + '/m').get()).val()) return snapOf(this.id, null);
            // RTDB'de yok → eski Firestore kaydını bir kerelik kopyala (hata olursa yukarı fırlar: boş sanıp üzerine yazmayalım)
            const old = await this.legacy.get();
            if (old && old.exists) {
                const node = nodeOf(old.data());
                await rdb.ref(this.dataPath).set(node);
                await this.markDone();
                return snapOf(this.id, node);
            }
            await this.markDone();
            return snapOf(this.id, null);
        };
        Ref.prototype.set = async function (data) {
            await rdb.ref(this.dataPath).set(nodeOf(data));
            await this.markDone();
        };
        Ref.prototype.delete = async function () {
            await rdb.ref(this.dataPath).remove();
            await this.markDone(); // silinen kayıt Firestore'dan geri gelmesin
        };
        Ref.prototype.onSnapshot = function (cb, errCb) {
            const r = rdb.ref(this.dataPath), id = this.id;
            const h = r.on('value', s => cb(snapOf(id, s.val())), e => { if (errCb) errCb(e); });
            return () => r.off('value', h);
        };

        return {
            collection(name) {
                return { doc(id) { return new Ref(id, name + '/' + id + '/doc', name + '/' + id, fs.collection(name).doc(id), name === 'careers'); } };
            },
            // Sürüm (rev) kontrollü yazma: okurken görülen sürüm değiştiyse yeniden dener
            async runTransaction(fn) {
                for (let attempt = 0; attempt < 4; attempt++) {
                    const reads = new Map(), writes = [];
                    const t = {
                        async get(ref) { const s = await ref.get(); reads.set(ref, s.exists ? (s.data()._rev || 0) : 0); return s; },
                        set(ref, data) { writes.push([ref, data]); }
                    };
                    const result = await fn(t);
                    let ok = true;
                    for (const [ref, data] of writes) {
                        const node = nodeOf(data);
                        if (!reads.has(ref)) { await rdb.ref(ref.dataPath).set(node); continue; }
                        const expected = reads.get(ref);
                        const res = await rdb.ref(ref.dataPath).transaction(cur => {
                            if (cur === null) return node;              // yerel önbellekte yok: sunucu doğrulayıp gerekirse yeniden çağırır
                            if ((cur.rev || 0) !== expected) return;    // başka cihaz araya girdi → iptal
                            return node;
                        }, undefined, false);
                        if (!res.committed) { ok = false; break; }
                        await ref.markDone();
                    }
                    if (ok) return result;
                }
                throw new Error('Bulut kaydı çakıştı, tekrar denenecek');
            }
        };
    }

    const origInit = window.initFirebase;
    if (typeof origInit !== 'function') return;
    window.initFirebase = function () {
        const ok = origInit.apply(this, arguments);
        try {
            if (ok && !window.GT_RTDB && typeof firebase !== 'undefined' && typeof firebase.database === 'function' &&
                typeof firebaseConfig !== 'undefined' && firebaseConfig.databaseURL) {
                fbDb = build(fbDb, firebase.database());   // fbDb: script.js'teki Firestore bağlantısı
                window.GT_RTDB = true;
                // Firestore'un 900 KB sınırı yerine Realtime Database sınırı
                window.cloudSizeCheck = function (data) {
                    const size = new Blob([JSON.stringify(data)]).size;
                    if (size <= MAX_BYTES) return true;
                    setSyncStatus('error', 'Veri buluta sığmıyor (' + Math.round(size / 1024) + ' KB / 8192 KB)');
                    return false;
                };
            }
        } catch (e) { console.warn('gt-rtdb', e); }
        return ok;
    };
})();
