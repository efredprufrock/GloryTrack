        // --- 1. VERİ YAPILARI (STATE) ---
        let currentScale = '1';

        const menuConfig = {
            kupalar: { title: "Kupalar", submenus: [] },
            maclar: { title: "Maçlar", submenus: [{ id: "maclar-kulup", label: "Kulüp" }, { id: "maclar-milli", label: "Milli" }]},
            kadro: { title: "Kadro", submenus: [{ id: "kadro-astakim", label: "As Takım" }, { id: "kadro-akademi", label: "Akademi" }]},
            ligtarihi: { title: "Lig Tarihi", submenus: [] },
            transfer: { title: "Transfer", submenus: [] },
            golasist: { title: "Gol ve Asistler", submenus: [] },
            sezonlar: { title: "Sezonlar", submenus: [] },
            ayarlar: { title: "Ayarlar", submenus: [] }
        };

        let seasonsList = ['25/26'];

        let activeMain = null;
        let activeSub = null;
        let activeTertiary = null;
        let fileUploads = { champ: null, runner: null, tournament: null, managed: null, opp: null, setup: null, 'pi-photo': null };

        // Trophies State
        let trophyData = {}; 
        let currentModalSeason = null;
        let currentModalTournament = null;
        let editingTournamentId = null;
        let tournamentsList = [
            { id: 'ucl', name: 'Şampiyonlar Ligi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/UEFA_Champions_League_logo_2.svg', colorHex: '#1e3a8a' },
            { id: 'uel', name: 'Avrupa Ligi', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Europa_League_logo_2021.svg', colorHex: '#ea580c' },
            { id: 'uecl', name: 'Konferans Ligi', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f6/UEFA_Europa_Conference_League_logo.svg', colorHex: '#16a34a' },
            { id: 'usc', name: 'Süper Kupa', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/05/UEFA_Super_Cup_logo.svg', colorHex: '#475569' },
            { id: 'slig', name: 'Süper Lig', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/e/e0/Trendyol_S%C3%BCper_Lig_logo.svg', colorHex: '#b91c1c' },
            { id: 'tkupa', name: 'Türkiye Kupası', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/8/86/Ziraat_T%C3%BCrkiye_Kupas%C4%B1_logo.png', colorHex: '#7f1d1d' }
        ];

        // Matches State
        let matchContext = null; 
        let managedTeams = {
            kulup: { name: 'Kocaelispor', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/1/1a/Kocaelispor_logosu.png', country: 'TURKEY' },
            milli: { name: 'Türkiye', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/d/d4/T%C3%BCrkiye_Mill%C3%AE_Futbol_Tak%C3%ADm%C3%AD_logo.svg', country: 'TURKEY' }
        };

        let opponentsConfig = {
            kulup: {
                domestic: { name: 'YURTİÇİ', color: '#064e3b', teams: Array.from({length: 17}, (_, i) => ({ id: `kd_${i}`, name: '', logoUrl: '', country: 'TURKEY' })) },
                foreign: [
                    { id: 'grp_f0', name: 'YURTDIŞI / DİĞER', color: '#1e3a8a', teams: Array.from({length: 5}, (_, i) => ({ id: `kf_0_${i}`, name: '', logoUrl: '', country: '' })) }
                ]
            },
            milli: {
                domestic: { name: 'AVRUPA', color: '#1e3a8a', teams: Array.from({length: 15}, (_, i) => ({ id: `md_${i}`, name: '', logoUrl: '', country: 'EUR' })) },
                foreign: []
            }
        };

        const tournamentOptions = ["Süper Lig", "Türkiye Kupası", "Türkiye Süper Kupası", "Şampiyonlar Ligi", "Avrupa Ligi", "Konferans Ligi", "UEFA Süper Kupa", "Pre-Season Friendly"];
        let matchDataStore = { kulup: {}, milli: {} };
        let activeOppInfo = { context: null, groupType: null, groupIndex: null, index: null, id: null };
        let activeGroupInfo = { context: null, groupType: null, groupIndex: null };
        let activeMatchInfo = { season: null, oppId: null, oppName: null };
        let activeMatchesTemp = [];

        // Squad State
        let squadContext = 'astakim';
        let playerRoles = {
            astakim: ['Yıldız', 'İlk 11', 'Rotasyon', 'Gelecek Vadeden'],
            akademi: ['A Takım Adayı', 'Kiralık Gelişecek', 'Gelecek Vadeden', 'Yetersiz']
        };
        let squadData = { astakim: [], akademi: [] };
        let squadSort = { field: 'joinOvr', asc: false };
        
        let activePlayerId = null;
        let activePlayerSeason = null;
        let activeCellType = '';

        // League History State
        let leagueHistoryData = [
            { id: 'lh_1', name: 'Kocaelispor', color: '#10b981', history: {} }
        ];
        let leagueChartInstance = null;
        let activeLeagueTeamId = null;
        let activeLeagueSeason = null;
        let leagueSort = { field: 'total', asc: false };
        let highlightedLeagueTeamId = null;
        let currentSortedLeagueTeams = [];

        // Gol ve Asist State
        let statExpanded = { kulup: {}, milli: {} };
        let statSort = { 
            kulup: { field: 'overall_goals', asc: false }, 
            milli: { field: 'overall_goals', asc: false } 
        };

        // Transfer Panel State
        let transferData = { in: [], out: [] };
        let transferSort = { in: { field: 'season', asc: false }, out: { field: 'season', asc: false } };
        let activeTransferId = null;
        let activeTransferType = 'in';

        // Fixture Panel State
        // fixtureData[season] = [ { id, date, tournament, home, away, homeScore, awayScore, events:[{min,type,scorer,assist}] }, ... ]
        let fixtureData = {};
        let activeFixtureSeason = null;
        let activeFixtureMatchId = null;
        let fixtureFilter = { tournament: '' };

        // --- YEREL VERİTABANI (LOCAL STORAGE) VE VERİ YÖNETİMİ ---
        function getAllData() {
            return {
                seasonsList, trophyData, tournamentsList, managedTeams, opponentsConfig,
                matchDataStore, playerRoles, squadData, leagueHistoryData, transferData, fixtureData, isSetupComplete
            };
        }

        function saveToLocalStorage() {
            try {
                const dataStr = JSON.stringify(getAllData());
                // Warn if approaching the 5MB limit (warn at 4MB)
                if (dataStr.length > 4 * 1024 * 1024) {
                    console.warn('FC26: LocalStorage verisi 4MB sınırına yaklaşıyor. Yedek almanız önerilir.');
                }
                localStorage.setItem('fc26_career_data', dataStr);
            } catch(e) {
                if (e.name === 'QuotaExceededError') {
                    alert('⚠️ Tarayıcı depolama alanı doldu!\n\nAyarlar > Verileri Dışa Aktar ile yedek alın, ardından sayfayı yenileyip yedeği tekrar yükleyin.\n\nNot: Yerel olarak yüklenen büyük logo görselleri depolama alanını hızla doldurabilir. Mümkünse URL ile logo kullanın.');
                    console.error('LocalStorage QuotaExceededError:', e);
                } else {
                    console.error('LocalStorage kayıt hatası:', e);
                }
            }
            // Her kayıtta buluta da (debounce'lu) yaz - PIN bağlıysa
            queueCloudSave();
        }

        function applyLoadedData(data) {
            if (!data) return false;
            if (data.seasonsList) seasonsList = data.seasonsList;
            if (data.trophyData) trophyData = data.trophyData;
            if (data.tournamentsList) tournamentsList = data.tournamentsList;
            if (data.managedTeams) managedTeams = data.managedTeams;
            if (data.opponentsConfig) opponentsConfig = data.opponentsConfig;
            if (data.matchDataStore) matchDataStore = data.matchDataStore;
            if (data.playerRoles) playerRoles = data.playerRoles;
            if (data.squadData) squadData = data.squadData;
            if (data.leagueHistoryData) leagueHistoryData = data.leagueHistoryData;
            if (data.transferData) transferData = data.transferData;
            if (data.fixtureData) fixtureData = data.fixtureData;
            if (data.isSetupComplete !== undefined) isSetupComplete = data.isSetupComplete;
            return true;
        }

        function loadFromLocalStorage() {
            const dataStr = localStorage.getItem('fc26_career_data');
            if (!dataStr) return false;
            try {
                const data = JSON.parse(dataStr);
                return applyLoadedData(data);
            } catch (e) {
                console.error("Veri okuma hatası:", e);
                return false;
            }
        }

        // --- FIREBASE / BULUT SENKRONIZASYONU (Google Hesabı ile) ---
        let fbAuth = null, fbDb = null, firebaseReady = false, googleProvider = null;
        let currentUser = null, cloudDocRef = null, cloudUnsubscribe = null;
        let saveDebounceTimer = null, isApplyingRemoteData = false;

        function initFirebase() {
            try {
                if (typeof firebaseConfig === 'undefined' || !firebaseConfig.apiKey || firebaseConfig.apiKey.indexOf('PASTE_YOUR') !== -1) {
                    console.warn('FC26: firebase-config.js henüz doldurulmamış. Sadece bu cihazda (localStorage) çalışılacak.');
                    return false;
                }
                firebase.initializeApp(firebaseConfig);
                fbAuth = firebase.auth();
                fbDb = firebase.firestore();
                googleProvider = new firebase.auth.GoogleAuthProvider();
                firebaseReady = true;
                return true;
            } catch (e) {
                console.error('Firebase başlatma hatası:', e);
                return false;
            }
        }

        function setSyncStatus(state, msg) {
            const el = document.getElementById('sync-status');
            if (!el) return;
            const map = {
                idle:    { icon: 'fa-cloud',                  color: 'text-slate-400',   text: msg || 'Bulut' },
                saving:  { icon: 'fa-arrows-rotate fa-spin',  color: 'text-yellow-400',  text: msg || 'Kaydediliyor...' },
                saved:   { icon: 'fa-cloud-arrow-up',         color: 'text-emerald-400', text: msg || 'Kaydedildi' },
                error:   { icon: 'fa-triangle-exclamation',   color: 'text-red-400',     text: msg || 'Senkronizasyon hatası' },
                offline: { icon: 'fa-house-laptop',           color: 'text-slate-500',   text: msg || 'Sadece bu cihaz' }
            };
            const s = map[state] || map.idle;
            el.className = `fixed top-3 right-3 z-[250] flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-full px-3 py-1.5 text-xs font-bold ${s.color} shadow-lg backdrop-blur-sm transition-colors`;
            el.innerHTML = `<i class="fa-solid ${s.icon}"></i><span>${s.text}</span>`;
        }

        async function signInWithGoogle() {
            const statusEl = document.getElementById('login-status');
            if (!firebaseReady && !initFirebase()) {
                if (statusEl) statusEl.textContent = 'Bulut bağlantısı kurulamadı. firebase-config.js dosyasını kontrol edin.';
                return;
            }
            if (statusEl) statusEl.textContent = 'Google ile bağlanılıyor...';
            try {
                await fbAuth.signInWithPopup(googleProvider);
                // Gerisini onAuthStateChanged devralır
            } catch (e) {
                console.error('Google giriş hatası:', e);
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/cancelled-popup-request') {
                    try { await fbAuth.signInWithRedirect(googleProvider); return; } catch (e2) { console.error(e2); }
                }
                if (statusEl) statusEl.textContent = e.code === 'auth/unauthorized-domain'
                    ? 'Bu site adresi Firebase\'de yetkilendirilmemiş (Authorized domains).'
                    : 'Giriş hatası: ' + e.message;
            }
        }

        function continueOffline() {
            document.getElementById('login-modal').classList.add('hidden');
            setSyncStatus('offline');
        }

        function signOutOfCloud() {
            if (cloudUnsubscribe) { cloudUnsubscribe(); cloudUnsubscribe = null; }
            cloudDocRef = null;
            currentUser = null;
            if (fbAuth) fbAuth.signOut();
            document.getElementById('login-modal').classList.remove('hidden');
            setSyncStatus('offline');
            rerenderCurrentPanel();
        }

        async function connectToCloud(uid) {
            cloudDocRef = fbDb.collection('careers').doc(uid);
            setSyncStatus('saving', 'Veriler alınıyor...');
            try {
                const snap = await cloudDocRef.get();
                if (snap.exists) {
                    applyLoadedData(snap.data());
                    localStorage.setItem('fc26_career_data', JSON.stringify(snap.data()));
                } else {
                    const localStr = localStorage.getItem('fc26_career_data');
                    if (localStr) {
                        const upload = confirm('Google hesabınızla ilişkili bulut verisi bulunamadı.\n\nBu cihazdaki mevcut kariyer verinizi hesabınıza yüklemek ister misiniz?');
                        if (upload) {
                            const parsed = JSON.parse(localStr);
                            applyLoadedData(parsed);
                            await cloudDocRef.set(parsed);
                        }
                    }
                }
                attachCloudListener();
                setSyncStatus('saved', 'Bağlandı');
            } catch (e) {
                console.error('Buluttan veri alma hatası:', e);
                setSyncStatus('error', 'Buluttan veri alınamadı');
            }
            startAppAfterAuth();
        }

        function attachCloudListener() {
            if (cloudUnsubscribe) cloudUnsubscribe();
            cloudUnsubscribe = cloudDocRef.onSnapshot((snap) => {
                if (!snap.exists || snap.metadata.hasPendingWrites) return; // kendi yazdığımız veri geri yansıyor, atla
                isApplyingRemoteData = true;
                applyLoadedData(snap.data());
                localStorage.setItem('fc26_career_data', JSON.stringify(snap.data()));
                rerenderCurrentPanel();
                isApplyingRemoteData = false;
                setSyncStatus('saved', 'Başka cihazdan güncellendi');
            }, (err) => {
                console.error('Bulut dinleme hatası:', err);
                setSyncStatus('error');
            });
        }

        function rerenderCurrentPanel() {
            if (managedTeams.kulup && managedTeams.kulup.logoUrl) {
                document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;
            }
            if (activeMain === 'kupalar') renderTrophiesGrid();
            else if (activeMain === 'maclar') renderMatchesGrid();
            else if (activeMain === 'kadro') renderSquadGrid();
            else if (activeMain === 'ligtarihi') renderLeagueHistory();
            else if (activeMain === 'transfer') renderTransferPanel();
            else if (activeMain === 'golasist') renderStatsPanel();
            else if (activeMain === 'sezonlar') renderFixturePanel();
            else if (activeMain === 'ayarlar') renderSettingsPanel();
        }

        function queueCloudSave() {
            if (!cloudDocRef || isApplyingRemoteData) return;
            setSyncStatus('saving');
            clearTimeout(saveDebounceTimer);
            saveDebounceTimer = setTimeout(doCloudSave, 900);
        }

        async function doCloudSave() {
            if (!cloudDocRef) return;
            try {
                const data = getAllData();
                const size = new Blob([JSON.stringify(data)]).size;
                if (size > 900 * 1024) {
                    setSyncStatus('error', 'Veri >900KB, buluta sığmıyor');
                    console.warn('FC26: Bulut belge boyutu Firestore\'un 1MB sınırına yaklaşıyor. Büyük logoları dosya yerine URL olarak ekleyin.');
                    return;
                }
                await cloudDocRef.set(data);
                setSyncStatus('saved');
            } catch (e) {
                console.error('Bulut kayıt hatası:', e);
                setSyncStatus('error');
            }
        }

        let mockPlayers = [];
        function updateMockPlayers() {
            let astakim = squadData.astakim.map(p => p.name);
            let akademi = squadData.akademi.map(p => p.name);
            mockPlayers = [...new Set([...astakim, ...akademi])].sort();
        }
        
        // --- Custom Chart.js Plugin for Points inside Dots ---
        const pointLabelsPlugin = {
            id: 'pointLabels',
            afterDatasetsDraw(chart, args, pluginOptions) {
                const { ctx } = chart;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 9px sans-serif';

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (meta.hidden) return;
                    
                    const team = currentSortedLeagueTeams[i];
                    if (!team) return;
                    
                    let textAlpha = (highlightedLeagueTeamId && team.id !== highlightedLeagueTeamId) ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)';
                    ctx.fillStyle = textAlpha;

                    meta.data.forEach((element, index) => {
                        if (dataset.data[index] !== null) {
                            const season = chart.data.labels[index];
                            const pts = team.history[season]?.pts;
                            if(pts) {
                                ctx.fillText(pts, element.x, element.y);
                            }
                        }
                    });
                });
            }
        };
        Chart.register(pointLabelsPlugin);

        // --- CUSTOM AUTOCOMPLETE LOGIC ---
        let activeAutocompleteInput = null;
        let autocompleteFocusIndex = -1;

        function closeAutocomplete() {
            const dropdown = document.getElementById('custom-autocomplete-dropdown');
            dropdown.classList.add('hidden');
            dropdown.classList.remove('flex');
            activeAutocompleteInput = null;
            autocompleteFocusIndex = -1;
        }

        function triggerAutocomplete(inputElem) {
            updateMockPlayers();
            activeAutocompleteInput = inputElem;
            const dropdown = document.getElementById('custom-autocomplete-dropdown');
            const val = inputElem.value.toLowerCase();
            
            let matches = mockPlayers.filter(p => p.toLowerCase().includes(val));
            if(val.trim() === '') matches = mockPlayers.slice(0, 8);

            if(matches.length === 0) {
                closeAutocomplete();
                return;
            }

            dropdown.innerHTML = matches.map((match, idx) => `
                <div class="px-3 py-1.5 hover:bg-emerald-600 cursor-pointer transition-colors ac-item" data-val="${match}" onclick="selectAutocomplete('${match}')">
                    ${match}
                </div>
            `).join('');

            const rect = inputElem.getBoundingClientRect();
            dropdown.style.top = (rect.bottom + window.scrollY + 2) + 'px';
            dropdown.style.left = (rect.left + window.scrollX) + 'px';
            dropdown.style.width = rect.width + 'px';
            
            dropdown.classList.remove('hidden');
            dropdown.classList.add('flex');
            autocompleteFocusIndex = -1;
        }

        function selectAutocomplete(val) {
            if(activeAutocompleteInput) {
                activeAutocompleteInput.value = val;
                activeAutocompleteInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            closeAutocomplete();
        }

        document.addEventListener('input', function(e) {
            if(e.target && e.target.classList.contains('use-autocomplete')) {
                triggerAutocomplete(e.target);
            }
        });

        document.addEventListener('focusin', function(e) {
             if(e.target && e.target.classList.contains('use-autocomplete')) {
                triggerAutocomplete(e.target);
            }
        });

        document.addEventListener('click', function(e) {
            if(!e.target.closest('#custom-autocomplete-dropdown') && !e.target.classList.contains('use-autocomplete')) {
                closeAutocomplete();
            }
        });

        document.addEventListener('keydown', function(e) {
            const dropdown = document.getElementById('custom-autocomplete-dropdown');
            if(dropdown.classList.contains('hidden')) return;

            const items = dropdown.querySelectorAll('.ac-item');
            if(items.length === 0) return;

            if(e.key === 'ArrowDown') {
                e.preventDefault();
                autocompleteFocusIndex++;
                if(autocompleteFocusIndex >= items.length) autocompleteFocusIndex = 0;
                highlightAutocompleteItem(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                autocompleteFocusIndex--;
                if(autocompleteFocusIndex < 0) autocompleteFocusIndex = items.length - 1;
                highlightAutocompleteItem(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if(autocompleteFocusIndex > -1) {
                    items[autocompleteFocusIndex].click();
                } else if(items.length > 0) {
                     items[0].click();
                }
            } else if (e.key === 'Escape') {
                closeAutocomplete();
            }
        });

        function highlightAutocompleteItem(items) {
            items.forEach(i => i.classList.remove('bg-emerald-600', 'text-white'));
            if(autocompleteFocusIndex > -1 && items[autocompleteFocusIndex]) {
                items[autocompleteFocusIndex].classList.add('bg-emerald-600', 'text-white');
                items[autocompleteFocusIndex].scrollIntoView({ block: 'nearest' });
            }
        }
        // --- END CUSTOM AUTOCOMPLETE ---

        // --- MODAL CLOSE HELPERS (Escape key + backdrop click) ---
        const MODAL_IDS = [
            'trophy-modal', 'tournament-modal', 'managed-team-modal',
            'opponent-editor-modal', 'group-editor-modal', 'player-info-modal',
            'player-cell-modal', 'match-editor-modal', 'season-stats-modal',
            'league-team-modal', 'league-cell-modal', 'transfer-editor-modal', 'fixture-match-modal'
        ];
        const MODAL_CLOSE_FNS = {
            'trophy-modal': () => closeTrophyModal(),
            'tournament-modal': () => closeTournamentModal(),
            'managed-team-modal': () => closeManagedTeamModal(),
            'opponent-editor-modal': () => closeOpponentEditorModal(),
            'group-editor-modal': () => closeGroupEditorModal(),
            'player-info-modal': () => closePlayerInfoModal(),
            'player-cell-modal': () => closePlayerCellModal(),
            'match-editor-modal': () => closeMatchEditorModal(),
            'season-stats-modal': () => closeSeasonStatsModal(),
            'league-team-modal': () => closeLeagueTeamModal(),
            'league-cell-modal': () => closeLeagueCellModal(),
            'transfer-editor-modal': () => closeTransferModal(),
            'fixture-match-modal': () => closeFixtureModal(),
        };

        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Escape') return;
            for (const id of MODAL_IDS) {
                const el = document.getElementById(id);
                if (el && !el.classList.contains('hidden')) {
                    if (MODAL_CLOSE_FNS[id]) MODAL_CLOSE_FNS[id]();
                    break;
                }
            }
        });

        // Backdrop click closes modals
        document.addEventListener('click', function(e) {
            for (const id of MODAL_IDS) {
                const el = document.getElementById(id);
                if (el && !el.classList.contains('hidden') && e.target === el) {
                    if (MODAL_CLOSE_FNS[id]) MODAL_CLOSE_FNS[id]();
                    break;
                }
            }
        });
        // --- END MODAL CLOSE HELPERS ---

        function startAppAfterAuth() {
            // Bulut verisi (varsa) senkronize edildikten sonra arayüzü güncel veriyle yeniler
            if (isSetupComplete) {
                document.getElementById('setup-modal').classList.add('hidden');
            } else {
                document.getElementById('setup-modal').classList.remove('hidden');
            }
            if (!activeMain) selectMainMenu('kadro');
            else rerenderCurrentPanel();
        }

        window.onload = function() {
            // 1) Anında açılış için önce bu cihazdaki yerel kopyayı göster
            if (loadFromLocalStorage()) {
                document.getElementById('setup-modal').classList.add('hidden');
                if(managedTeams.kulup && managedTeams.kulup.logoUrl) {
                    document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;
                }
                selectMainMenu('kadro');
            } else {
                if(!isSetupComplete) document.getElementById('setup-modal').classList.remove('hidden');
                else selectMainMenu('kadro');
            }

            // 2) Ardından buluta bağlanmayı dene (firebase-config.js doldurulmuşsa)
            if (initFirebase()) {
                fbAuth.onAuthStateChanged(function(user) {
                    if (user) {
                        currentUser = { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL };
                        document.getElementById('login-modal').classList.add('hidden');
                        setSyncStatus('saving', 'Bağlanılıyor...');
                        connectToCloud(user.uid);
                    } else {
                        currentUser = null;
                        cloudDocRef = null;
                        if (cloudUnsubscribe) { cloudUnsubscribe(); cloudUnsubscribe = null; }
                        document.getElementById('login-modal').classList.remove('hidden');
                        setSyncStatus('offline');
                    }
                });
            } else {
                setSyncStatus('offline');
            }
        }

        function finishSetup() {
            const country = document.getElementById('setup-country').value.trim();
            const name = document.getElementById('setup-name').value.trim();
            const url = document.getElementById('setup-url-input').value.trim();
            const logo = fileUploads.setup || (url !== "Yerel Dosya Seçildi" && url !== "" ? url : null);

            if(name) {
                managedTeams.kulup.name = name;
                managedTeams.milli.country = country || 'TUR';
                if(country) managedTeams.kulup.country = country;
                managedTeams.kulup.logoUrl = logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
                
                leagueHistoryData[0].name = name;
            }

            document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;

            isSetupComplete = true;
            saveToLocalStorage();
            document.getElementById('setup-modal').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('setup-modal').classList.add('hidden');
                selectMainMenu('kadro');
            }, 500);
        }

        function changeScale(val) {
            currentScale = val;
            if(activeMain === 'kupalar') renderTrophiesGrid();
            if(activeMain === 'maclar') renderMatchesGrid();
            if(activeMain === 'kadro') renderSquadGrid();
        }

        function getScaleSelectorHtml() {
            return `
                <div class="flex items-center gap-1 bg-slate-900 rounded border border-slate-700 p-1">
                    <button onclick="changeScale('0.5')" class="px-2 py-1 rounded text-xs font-bold transition-colors ${currentScale === '0.5' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}" title="%50">50</button>
                    <button onclick="changeScale('0.75')" class="px-2 py-1 rounded text-xs font-bold transition-colors ${currentScale === '0.75' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}" title="%75">75</button>
                    <button onclick="changeScale('1')" class="px-2 py-1 rounded text-xs font-bold transition-colors ${currentScale === '1' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}" title="%100">100</button>
                </div>
            `;
        }

        function addNewSeason() {
            const lastSeason = seasonsList[seasonsList.length - 1];
            let nextSeason = "Yeni Sezon";
            if (lastSeason && lastSeason.includes('/')) {
                const parts = lastSeason.split('/');
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    nextSeason = (parseInt(parts[0]) + 1) + '/' + (parseInt(parts[1]) + 1);
                }
            }
            if(!seasonsList.includes(nextSeason)){
                seasonsList.push(nextSeason);
                saveToLocalStorage();
            }
            if(activeMain === 'kupalar') renderTrophiesGrid();
            if(activeMain === 'maclar') renderMatchesGrid();
            if(activeMain === 'kadro') renderSquadGrid();
            if(activeMain === 'ligtarihi') renderLeagueHistory();
            if(activeMain === 'golasist') renderStatsPanel();
            if(activeMain === 'sezonlar') renderFixturePanel();
        }

        function deleteSeason(season) {
            if(confirm(`"${season}" sezonunu tüm panellerden kalıcı olarak silmek istediğinize emin misiniz?`)) {
                seasonsList = seasonsList.filter(s => s !== season);
                saveToLocalStorage();
                if(activeMain === 'kupalar') renderTrophiesGrid();
                if(activeMain === 'maclar') renderMatchesGrid();
                if(activeMain === 'kadro') renderSquadGrid();
                if(activeMain === 'ligtarihi') renderLeagueHistory();
                if(activeMain === 'golasist') renderStatsPanel();
                if(activeMain === 'sezonlar') renderFixturePanel();
            }
        }

        function handleFileUpload(event, type) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                fileUploads[type] = e.target.result;
                const btn = document.getElementById(`${type}-upload-btn`);
                if(btn) { btn.classList.add('text-emerald-400'); btn.classList.remove('text-slate-300'); }
                const urlInput = document.getElementById(`${type}-url`);
                if(urlInput) urlInput.value = "Yerel Dosya Seçildi";
                const urlInputOld = document.getElementById(`${type}-url-input`);
                if(urlInputOld) urlInputOld.value = "Yerel Dosya Seçildi";
            };
            reader.readAsDataURL(file);
        }

        async function searchTeamLogos(type) {
            const nameInput = document.getElementById(`${type}-name${type==='setup'? '':'-input'}`).value.trim();
            const resultsContainer = document.getElementById(`${type}-logo-results`);
            if (!nameInput) { alert('Lütfen arama yapmak için bir ad girin!'); return; }

            resultsContainer.innerHTML = '<div class="text-xs text-slate-400 w-full text-center"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Logolar aranıyor...</div>';
            resultsContainer.classList.remove('hidden');

            try {
                const searchUrl = `https://football-logos.cc/search?q=${encodeURIComponent(nameInput)}`;
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(searchUrl)}`;
                let res = await fetch(proxyUrl);
                let data = await res.json();
                let parser = new DOMParser();
                let doc = parser.parseFromString(data.contents, "text/html");
                
                let results = [];
                let imgs = doc.querySelectorAll('img');
                imgs.forEach(img => {
                    let src = img.getAttribute('src');
                    if (src && src.includes('.png') && !src.includes('lazyload')) {
                        if (src.startsWith('/')) src = 'https://football-logos.cc' + src;
                        results.push(src);
                    }
                });

                results = [...new Set(results)].slice(0, 15); 
                if (results.length === 0) {
                    resultsContainer.innerHTML = '<div class="text-xs text-yellow-500 w-full text-center">Sonuç bulunamadı. Lütfen URL giriniz veya tarayıcıdan arayınız.</div>'; return;
                }
                resultsContainer.innerHTML = results.map(url => `
                    <div class="flex-shrink-0 relative group">
                        <img src="${url}" class="w-12 h-12 object-contain bg-slate-200/90 p-1 rounded cursor-pointer hover:scale-110 border-2 border-transparent ${type}-search-img" onclick="selectSearchedLogo('${type}', '${url}', this)" title="Seç">
                    </div>
                `).join('');
            } catch (e) {
                console.error("Arama hatası:", e);
                resultsContainer.innerHTML = '<div class="text-xs text-red-500 w-full text-center">Bağlantı hatası oluştu. Logo URL\'sini kendiniz girebilir veya sağdaki butona tıklayarak football-logos.cc sitesini açabilirsiniz.</div>';
            }
        }

        function selectSearchedLogo(type, url, imgElement) {
            document.querySelectorAll(`.${type}-search-img`).forEach(el => el.classList.remove('border-emerald-500', 'bg-emerald-100'));
            imgElement.classList.add('border-emerald-500', 'bg-emerald-100');
            document.getElementById(`${type}-url-input`).value = url;
            fileUploads[type] = null;
            document.getElementById(`${type}-upload-btn`).classList.replace('text-emerald-400', 'text-slate-300');
        }

        function selectMainMenu(menuId) {
            activeMain = menuId; activeSub = null; activeTertiary = null;
            document.querySelectorAll('.main-btn').forEach(btn => {
                btn.classList.remove('border-emerald-500', 'text-emerald-400', 'bg-slate-800');
                btn.classList.add('border-transparent', 'text-slate-100');
            });
            const activeBtn = document.getElementById(`btn-${menuId}`);
            activeBtn.classList.remove('border-transparent', 'text-slate-100');
            activeBtn.classList.add('border-emerald-500', 'text-emerald-400', 'bg-slate-800');

            renderSubmenus(); hideTertiaryMenu();
            
            if (menuId === 'kupalar') {
                renderTrophiesGrid();
            } else if (menuId === 'maclar') {
                matchContext = 'kulup';
                document.querySelectorAll('.sub-btn').forEach(btn => {
                    btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
                    btn.classList.add('bg-slate-800', 'text-slate-100', 'border-slate-700');
                });
                setTimeout(() => {
                    let cBtn = document.getElementById('btn-maclar-kulup');
                    if(cBtn) {
                        cBtn.classList.remove('bg-slate-800', 'text-slate-100', 'border-slate-700');
                        cBtn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
                    }
                }, 50);
                renderMatchesGrid();
            } else if (menuId === 'kadro') {
                squadContext = 'astakim';
                document.querySelectorAll('.sub-btn').forEach(btn => {
                    btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
                    btn.classList.add('bg-slate-800', 'text-slate-100', 'border-slate-700');
                });
                setTimeout(() => {
                    let cBtn = document.getElementById('btn-kadro-astakim');
                    if(cBtn) {
                        cBtn.classList.remove('bg-slate-800', 'text-slate-100', 'border-slate-700');
                        cBtn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
                    }
                }, 50);
                renderSquadGrid();
            } else if (menuId === 'ligtarihi') {
                renderLeagueHistory();
            } else if (menuId === 'transfer') {
                renderTransferPanel();
            } else if (menuId === 'golasist') {
                renderStatsPanel();
            } else if (menuId === 'sezonlar') {
                renderFixturePanel();
            } else if (menuId === 'ayarlar') {
                renderSettingsPanel();
            } else if (menuConfig[menuId].submenus.length === 0) {
                updateContentArea(`<h2 class="text-xl text-slate-300 font-medium">${menuConfig[menuId].title} paneli yapım aşamasında...</h2>`);
            } else {
                updateContentArea(`<h2 class="text-xl text-slate-300 font-medium">Lütfen bir alt kategori seçin.</h2>`);
            }
        }

        function renderSubmenus() {
            const submenuContainer = document.getElementById('submenu-container');
            const submenus = menuConfig[activeMain].submenus;
            if (submenus.length > 0) {
                submenuContainer.classList.remove('hidden');
                document.getElementById('submenu-buttons').innerHTML = submenus.map(sub => `
                    <button onclick="selectSubMenu('${sub.id}', ${sub.isSeason || false}, '${sub.label}')" id="btn-${sub.id}" class="sub-btn px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold border border-slate-700 hover:border-emerald-500/50 transition-all">${sub.label}</button>
                `).join('');
            } else { submenuContainer.classList.add('hidden'); }
        }

        function selectSubMenu(subId, isSeason, label) {
            activeSub = subId; activeTertiary = null;
            document.querySelectorAll('.sub-btn').forEach(btn => {
                btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
                btn.classList.add('bg-slate-800', 'text-slate-100', 'border-slate-700');
            });
            const activeBtn = document.getElementById(`btn-${subId}`);
            activeBtn.classList.remove('bg-slate-800', 'text-slate-100', 'border-slate-700');
            activeBtn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');

            if (isSeason) {
                renderTertiaryMenu(label);
                updateContentArea(`${label} Sezonu - Lütfen Yurtiçi veya Uluslararası seçimi yapın.`);
            } else if (activeMain === 'maclar') {
                matchContext = subId === 'maclar-kulup' ? 'kulup' : 'milli';
                renderMatchesGrid();
            } else if (activeMain === 'kadro') {
                squadContext = subId === 'kadro-astakim' ? 'astakim' : 'akademi';
                renderSquadGrid();
            } else {
                hideTertiaryMenu(); updateContentArea(`${menuConfig[activeMain].title} / ${label} verileri yükleniyor...`);
            }
        }

        function renderTertiaryMenu(seasonLabel) {
            const container = document.getElementById('tertiary-menu-container');
            container.classList.remove('hidden');
            document.getElementById('tertiary-buttons').innerHTML = `
                <button onclick="selectTertiaryMenu('yurtici', '${seasonLabel}')" id="btn-tertiary-yurtici" class="tertiary-btn px-4 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors border-b-2 border-transparent">Yurtiçi</button>
                <button onclick="selectTertiaryMenu('uluslararasi', '${seasonLabel}')" id="btn-tertiary-uluslararasi" class="tertiary-btn px-4 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors border-b-2 border-transparent">Uluslararası</button>
            `;
        }
        function hideTertiaryMenu() { document.getElementById('tertiary-menu-container').classList.add('hidden'); }
        function selectTertiaryMenu(type, seasonLabel) {
            activeTertiary = type;
            document.querySelectorAll('.tertiary-btn').forEach(btn => { btn.classList.remove('border-emerald-500', 'text-emerald-400'); btn.classList.add('border-transparent'); });
            const activeBtn = document.getElementById(`btn-tertiary-${type}`);
            activeBtn.classList.remove('border-transparent'); activeBtn.classList.add('border-emerald-500', 'text-emerald-400');
            const typeLabel = type === 'yurtici' ? 'Yurtiçi' : 'Uluslararası';
            updateContentArea(`<div class="space-y-4"><h3 class="text-3xl font-bold text-white">${seasonLabel} Sezonu</h3><div class="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-6">${typeLabel} İstatistikleri</div></div>`);
        }
        function updateContentArea(htmlContent) {
            const contentArea = document.getElementById('content-area');
            if(activeMain !== 'kupalar' && activeMain !== 'maclar' && activeMain !== 'kadro' && activeMain !== 'ligtarihi' && activeMain !== 'transfer' && activeMain !== 'golasist' && activeMain !== 'sezonlar' && activeMain !== 'ayarlar') {
                contentArea.classList.add('items-center', 'justify-center');
            } else {
                contentArea.classList.remove('items-center', 'justify-center');
            }
            contentArea.classList.remove('fade-in'); void contentArea.offsetWidth; contentArea.classList.add('fade-in');
            contentArea.innerHTML = htmlContent;
        }

        // --- AYARLAR VE VERİ YÖNETİMİ PANELİ ---
        function renderSettingsPanel() {
            // Calculate localStorage usage
            let usedBytes = 0;
            try {
                const dataStr = localStorage.getItem('fc26_career_data') || '';
                usedBytes = new Blob([dataStr]).size;
            } catch(e) {}
            const usedKB = (usedBytes / 1024).toFixed(1);
            const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
            const maxMB = 5;
            const pct = Math.min(100, ((usedBytes / (maxMB * 1024 * 1024)) * 100)).toFixed(1);
            const barColor = pct >= 80 ? 'bg-red-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-emerald-500';
            const storageDisplay = usedBytes > 1024 * 1024 ? `${usedMB} MB` : `${usedKB} KB`;

            let html = `
                <div class="w-full max-w-4xl mx-auto flex flex-col h-full">
                    <div class="mb-6 px-2 shrink-0">
                        <h3 class="text-2xl font-bold text-white text-left"><i class="fa-solid fa-gear text-emerald-500 mr-2"></i>Ayarlar ve Veritabanı</h3>
                        <p class="text-slate-400 text-sm mt-1 text-left">Tüm kariyer verileriniz anlık olarak tarayıcınıza kaydedilmektedir. Farklı bir tarayıcıya veya cihaza aktarmak için aşağıdaki yedekleme araçlarını kullanın.</p>
                    </div>
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg flex-1 overflow-auto hide-scrollbar">
                        <!-- Cloud Sync Card -->
                        <div class="mb-6 bg-slate-800 border border-slate-600 rounded-xl p-4">
                            <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                                <span class="text-sm font-bold text-slate-300"><i class="fa-solid fa-cloud mr-2 text-blue-400"></i>Bulut Senkronizasyonu</span>
                                ${currentUser
                                    ? `<span class="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">
                                         ${currentUser.photoURL ? `<img src="${currentUser.photoURL}" class="w-5 h-5 rounded-full" referrerpolicy="no-referrer">` : ''}
                                         ${currentUser.email || currentUser.displayName || 'Bağlı'}
                                       </span>`
                                    : `<span class="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded">Bağlı değil</span>`
                                }
                            </div>
                            <p class="text-xs text-slate-500 mb-3">${currentUser ? 'Bu Google hesabıyla giriş yaptığınız her cihazda aynı kariyer verisine ulaşırsınız.' : 'Verilerinizi diğer cihazlarınızdan da görmek için Google hesabınızla giriş yapın.'}</p>
                            <button onclick="${currentUser ? 'signOutOfCloud()' : 'document.getElementById(\'login-modal\').classList.remove(\'hidden\')'}" class="${currentUser ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-600 hover:bg-blue-500'} text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                                <i class="fa-solid ${currentUser ? 'fa-right-from-bracket' : 'fa-cloud-arrow-up'} mr-1"></i> ${currentUser ? 'Hesaptan Çık' : 'Buluta Bağlan'}
                            </button>
                        </div>
                        <!-- Storage Usage Bar -->
                        <div class="mb-6 bg-slate-800 border border-slate-600 rounded-xl p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm font-bold text-slate-300"><i class="fa-solid fa-database mr-2 text-emerald-500"></i>Tarayıcı Depolama Kullanımı</span>
                                <span class="text-sm font-mono font-bold ${pct >= 80 ? 'text-red-400' : pct >= 50 ? 'text-yellow-400' : 'text-emerald-400'}">${storageDisplay} / ${maxMB} MB</span>
                            </div>
                            <div class="w-full bg-slate-700 rounded-full h-2.5">
                                <div class="${barColor} h-2.5 rounded-full transition-all" style="width: ${pct}%"></div>
                            </div>
                            <p class="text-xs text-slate-500 mt-2">%${pct} kullanılıyor. ${pct >= 80 ? '⚠️ Depolama alanı dolmak üzere! Yedek alıp bazı verileri temizleyin.' : 'Yedek almayı unutmayın.'}</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div class="bg-slate-800 border border-slate-600 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                                <div class="absolute -bottom-4 -right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-download text-[150px] text-emerald-500"></i></div>
                                <div>
                                    <h4 class="text-lg font-bold text-emerald-400 mb-2 relative z-10">Verileri Dışa Aktar</h4>
                                    <p class="text-sm text-slate-400 mb-6 relative z-10">Mevcut kariyerinizin yedeğini <span class="text-emerald-300 font-bold">.json</span> formatında bilgisayarınıza indirebilirsiniz.</p>
                                </div>
                                <button onclick="exportJSON()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg">
                                    <i class="fa-solid fa-file-export"></i> Yedek İndir (.json)
                                </button>
                            </div>

                            <div class="bg-slate-800 border border-slate-600 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                                <div class="absolute -bottom-4 -right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-upload text-[150px] text-blue-500"></i></div>
                                <div>
                                    <h4 class="text-lg font-bold text-blue-400 mb-2 relative z-10">Verileri İçeri Aktar</h4>
                                    <p class="text-sm text-slate-400 mb-6 relative z-10">Daha önce aldığınız veya başka bir cihazdan taşıdığınız yedeği (.json) sisteme yükleyin.</p>
                                </div>
                                <input type="file" id="import-file" class="hidden" accept=".json" onchange="importJSON(event)">
                                <button onclick="document.getElementById('import-file').click()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg">
                                    <i class="fa-solid fa-file-import"></i> Yedekten Yükle (.json)
                                </button>
                            </div>
                            
                            <div class="bg-slate-800 border border-red-900/50 rounded-xl p-6 relative overflow-hidden md:col-span-2 mt-2">
                                <div class="absolute top-1/2 -translate-y-1/2 right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-triangle-exclamation text-[120px] text-red-500"></i></div>
                                <h4 class="text-lg font-bold text-red-500 mb-2 relative z-10">Kariyeri Sıfırla (Tehlikeli İşlem)</h4>
                                <p class="text-sm text-slate-400 mb-6 relative z-10 max-w-xl">Tarayıcıdaki tüm kariyer verilerini <span class="text-red-400 font-bold">geri dönülemez şekilde</span> siler. Sıfırlamadan önce yedek aldığınızdan emin olun.</p>
                                <button onclick="resetData()" class="bg-red-900/80 hover:bg-red-700 text-red-100 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 relative z-10 w-fit">
                                    <i class="fa-solid fa-trash"></i> Tüm Verileri Sil ve Başa Dön
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            `;
            updateContentArea(html);
        }

        function exportJSON() {
            const dataStr = JSON.stringify(getAllData(), null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            const teamName = managedTeams.kulup.name.replace(/\s+/g, '_');
            link.href = url;
            link.download = `FC26_${teamName}_Kariyer_Yedek.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        function importJSON(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (parsed.seasonsList && parsed.managedTeams) {
                        localStorage.setItem('fc26_career_data', JSON.stringify(parsed));
                        // Buluta bağlıysa yedeği buluta da yaz, aksi halde eski bulut verisi geri gelir
                        if (cloudDocRef) {
                            try { await cloudDocRef.set(parsed); } catch(err) { console.error('Yedek buluta yazılamadı:', err); }
                        }
                        alert("Yedek başarıyla yüklendi! Sistem yenileniyor...");
                        location.reload();
                    } else {
                        alert("Geçersiz veya bozuk yedek dosyası!");
                    }
                } catch (err) {
                    alert("Dosya okunurken bir hata oluştu!");
                }
            };
            reader.readAsText(file);
        }

        async function resetData() {
            if(confirm("TÜM verileriniz kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?")) {
                if(confirm("Sıfırlama işlemi geri alınamaz! Gerçekten tüm kariyeri sıfırlamak istiyor musunuz?")) {
                    localStorage.removeItem('fc26_career_data');
                    // Buluta bağlıysa, silinen veri geri indirilmesin diye bulut kaydını da temizle
                    if (cloudDocRef) {
                        try { await cloudDocRef.delete(); } catch(e) { console.error('Bulut verisi silinemedi:', e); }
                    }
                    location.reload();
                }
            }
        }

        // --- KUPALAR TABLOSU ---
        function renderTrophiesGrid() {
            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <h3 class="text-2xl font-bold text-white">Kupalar ve Şampiyonlar Tarihi</h3>
                    <div class="flex items-center gap-4">
                        <span class="text-sm text-slate-400 hidden md:inline"><i class="fa-solid fa-circle-info mr-1"></i>Hücrelerdeki + butonuna tıklayarak logo ekleyebilirsiniz</span>
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-full border-collapse text-sm" style="zoom: ${currentScale};">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <th class="p-2 sticky left-0 bg-slate-950 z-[50] border-r border-b border-slate-700 w-24 min-w-[96px] shadow-[2px_0_5px_rgba(0,0,0,0.2)] align-middle">
                                    <i class="fa-solid fa-calendar-days text-slate-500 text-2xl"></i>
                                </th>
            `;
            
            tournamentsList.forEach(t => {
                html += `
                    <th class="p-2 border-r border-b border-slate-700 min-w-[120px] bg-slate-900 group relative">
                        <div class="flex items-center justify-center h-16 w-full mx-auto" title="${t.name}">
                            <div class="bg-slate-200 p-1.5 rounded-xl flex items-center justify-center h-14 min-w-[3.5rem] shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-transform group-hover:scale-105">
                                <img src="${t.logoUrl}" alt="${t.name}" class="max-w-full max-h-full object-contain drop-shadow-sm">
                            </div>
                        </div>
                        <button onclick="openTournamentModal('${t.id}')" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-800 text-white rounded p-1.5 text-xs z-[45] transition-opacity hover:bg-blue-600" title="Turnuvayı Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </th>`;
            });

            html += `<th class="p-2 border-r border-b border-slate-700 bg-slate-900 align-middle w-12 min-w-[48px]">
                        <button onclick="addTournamentColumn()" class="text-emerald-500 hover:text-emerald-400" title="Kupa Ekle"><i class="fa-solid fa-plus-circle text-lg"></i></button>
                    </th>`;

            html += `</tr></thead><tbody>`;

            seasonsList.forEach(season => {
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">
                            <td class="p-2 py-4 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 font-bold text-slate-200 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-24 min-w-[96px] align-middle relative">
                                <span class="text-emerald-500">${season}</span>
                                <button onclick="deleteSeason('${season}')" class="absolute top-1 left-1 opacity-0 group-hover/srow:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                            </td>`;
                
                tournamentsList.forEach(t => {
                    const cellData = (trophyData[season] && trophyData[season][t.id]) ? trophyData[season][t.id] : null;
                    let logosHtml = '';
                    
                    if (cellData) {
                        logosHtml = `<div class="w-full h-full relative flex items-center justify-center p-2">`;
                        if (cellData.runnerUp && cellData.runnerUp.logoUrl) {
                            logosHtml += `
                                <div class="absolute bottom-1 right-1 w-[24%] h-[24%] flex items-center justify-center z-[1] group-hover:z-[10] transition-all">
                                    <img src="${cellData.runnerUp.logoUrl}" title="İkinci: ${cellData.runnerUp.name}" alt="${cellData.runnerUp.name}" class="w-full h-full object-contain drop-shadow-md">
                                </div>
                            `;
                        }
                        if (cellData.champion && cellData.champion.logoUrl) {
                            logosHtml += `<img src="${cellData.champion.logoUrl}" title="Şampiyon: ${cellData.champion.name}" alt="${cellData.champion.name}" class="w-[85%] h-[85%] object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105 z-[2] relative">`;
                        }
                        logosHtml += `</div>`;
                    }

                    html += `
                        <td class="p-0 dynamic-bg relative group h-28 w-28 align-middle" 
                            style="background-color: ${t.colorHex}22; border-color: ${t.colorHex}66;" 
                            id="cell-${season.replace('/','')}-${t.id}">
                            ${logosHtml}
                            <button onclick="openTrophyModal('${season}', '${t.id}', '${t.name}')" 
                                    class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-800 hover:bg-emerald-500 text-white border border-slate-600 hover:border-emerald-400 rounded-md w-7 h-7 flex items-center justify-center transition-all duration-200 z-[20]"
                                    title="${t.name} Takım Ekle">
                                <i class="fa-solid fa-plus text-xs"></i>
                            </button>
                        </td>
                    `;
                });
                html += `<td class="border-b border-slate-800 bg-slate-900/10"></td></tr>`;
            });
            
            html += `<tr>
                        <td colspan="100%" class="p-2 text-center bg-slate-900/50">
                            <button onclick="addNewSeason()" class="text-emerald-500 hover:text-white text-xs font-bold py-2 px-4 border border-emerald-600 rounded transition-colors"><i class="fa-solid fa-plus mr-1"></i> Yeni Sezon Ekle</button>
                        </td>
                    </tr>`;

            html += `</tbody></table></div>`;
            
            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        function clearTrophyCell() {
            if (trophyData[currentModalSeason] && trophyData[currentModalSeason][currentModalTournament]) {
                delete trophyData[currentModalSeason][currentModalTournament];
            }
            saveToLocalStorage();
            closeTrophyModal();
            renderTrophiesGrid();
        }

        function addTournamentColumn() {
            const newId = 'tour_' + Date.now();
            tournamentsList.push({ id: newId, name: 'Yeni Kupa', logoUrl: '', colorHex: '#475569' });
            saveToLocalStorage();
            renderTrophiesGrid();
            openTournamentModal(newId);
        }

        function openTrophyModal(season, tournamentId, tournamentName) {
            currentModalSeason = season;
            currentModalTournament = tournamentId;
            document.getElementById('modal-info').innerHTML = `<i class="fa-regular fa-calendar mr-1"></i> ${season} Sezonu - <i class="fa-solid fa-trophy mx-1"></i> ${tournamentName}`;
            
            fileUploads.champ = null; fileUploads.runner = null;
            document.getElementById('champ-file-input').value = '';
            document.getElementById('runner-file-input').value = '';
            document.getElementById('champ-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('runner-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            
            document.getElementById('champ-logo-results').innerHTML = '';
            document.getElementById('champ-logo-results').classList.add('hidden');
            document.getElementById('runner-logo-results').innerHTML = '';
            document.getElementById('runner-logo-results').classList.add('hidden');

            const existingData = (trophyData[season] && trophyData[season][tournamentId]) ? trophyData[season][tournamentId] : null;
            document.getElementById('champ-name-input').value = existingData?.champion?.name || '';
            document.getElementById('champ-url-input').value = existingData?.champion?.logoUrl || ''; 
            document.getElementById('runner-name-input').value = existingData?.runnerUp?.name || ''; 
            document.getElementById('runner-url-input').value = existingData?.runnerUp?.logoUrl || ''; 

            const modal = document.getElementById('trophy-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeTrophyModal() {
            document.getElementById('trophy-modal').classList.add('hidden');
            document.getElementById('trophy-modal').classList.remove('flex');
        }

        async function saveTrophyTeam() {
            const champName = document.getElementById('champ-name-input').value.trim();
            const runnerName = document.getElementById('runner-name-input').value.trim();
            const champUrl = document.getElementById('champ-url-input').value.trim();
            const runnerUrl = document.getElementById('runner-url-input').value.trim();
            
            if (!champName && !runnerName && !champUrl && !runnerUrl && !fileUploads.champ && !fileUploads.runner) {
                alert('Lütfen en az bir takım bilgisi girin!'); return;
            }

            const saveBtn = document.getElementById('save-trophy-btn');
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Kaydediliyor...';
            saveBtn.disabled = true;

            try {
                let champLogo = fileUploads.champ || (champUrl !== "Yerel Dosya Seçildi" ? champUrl : null);
                let runnerLogo = fileUploads.runner || (runnerUrl !== "Yerel Dosya Seçildi" ? runnerUrl : null);

                if (!champLogo && champName) champLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(champName)}&background=random&color=fff&bold=true&size=300`;
                if (!runnerLogo && runnerName) runnerLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(runnerName)}&background=random&color=fff&bold=true&size=300`;

                if (!trophyData[currentModalSeason]) trophyData[currentModalSeason] = {};
                
                trophyData[currentModalSeason][currentModalTournament] = {
                    champion: (champName || champLogo) ? { name: champName || 'Şampiyon', logoUrl: champLogo } : null,
                    runnerUp: (runnerName || runnerLogo) ? { name: runnerName || 'İkinci', logoUrl: runnerLogo } : null
                };

                saveToLocalStorage();
                closeTrophyModal();
                renderTrophiesGrid();
            } catch (error) {
                console.error("Hata:", error); alert("İşlem sırasında hata oluştu.");
            } finally {
                saveBtn.innerHTML = originalText; saveBtn.disabled = false;
            }
        }

        function openTournamentModal(tId) {
            editingTournamentId = tId;
            const tObj = tournamentsList.find(t => t.id === tId);
            
            document.getElementById('tour-name-input').value = tObj.name;
            document.getElementById('tour-url-input').value = tObj.logoUrl;
            document.getElementById('tour-color-input').value = tObj.colorHex;
            
            document.getElementById('tour-logo-results').innerHTML = '';
            document.getElementById('tour-logo-results').classList.add('hidden');
            
            fileUploads.tournament = null;
            document.getElementById('tour-file-input').value = '';
            document.getElementById('tour-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');

            const modal = document.getElementById('tournament-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeTournamentModal() {
            document.getElementById('tournament-modal').classList.add('hidden');
            document.getElementById('tournament-modal').classList.remove('flex');
        }

        function saveTournament() {
            const name = document.getElementById('tour-name-input').value.trim();
            const url = document.getElementById('tour-url-input').value.trim();
            const color = document.getElementById('tour-color-input').value;
            const finalLogo = fileUploads.tournament || url;

            const tObj = tournamentsList.find(t => t.id === editingTournamentId);
            if (name) tObj.name = name;
            if (finalLogo) tObj.logoUrl = finalLogo;
            if (color) tObj.colorHex = color;

            saveToLocalStorage();
            closeTournamentModal();
            renderTrophiesGrid();
        }

        function deleteTournament() {
            if(confirm("Bu kupayı/turnuvayı tablodan silmek istediğinize emin misiniz?")) {
                tournamentsList = tournamentsList.filter(t => t.id !== editingTournamentId);
                saveToLocalStorage();
                closeTournamentModal();
                renderTrophiesGrid();
            }
        }

        // --- MAÇLAR TABLOSU ---
        function renderMatchesGrid() {
            const team = managedTeams[matchContext];
            const opps = opponentsConfig[matchContext];
            const isKulup = matchContext === 'kulup';
            
            const getWinRate = (oppId) => {
                let w=0, played=0;
                const contextData = matchDataStore[matchContext] || {};
                Object.values(contextData).forEach(seasonData => {
                    if(seasonData[oppId]) {
                        seasonData[oppId].forEach(match => {
                            if(match && match.result) {
                                played++;
                                if(match.result === 'W') w++;
                            }
                        });
                    }
                });
                if(played === 0) return null;
                return Math.round((w / played) * 100);
            };

            const getWinRateColorClass = (rate) => {
                if(rate === null) return 'text-slate-500';
                if(rate === 100) return 'text-indigo-400'; 
                if(rate >= 75) return 'text-green-500';
                if(rate >= 50) return 'text-orange-500';
                return 'text-red-500';
            };
            
            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <h3 class="text-2xl font-bold text-white">${isKulup ? 'Kulüp' : 'Milli Takım'} Fikstür & Sonuçlar</h3>
                    <div class="flex items-center gap-4">
                        <button onclick="addNewForeignGroup()" class="bg-blue-900/50 hover:bg-blue-800 text-blue-300 px-3 py-1.5 rounded text-xs border border-blue-800 transition-colors"><i class="fa-solid fa-plus mr-1"></i>${isKulup ? 'Yeni Ülke Grubu' : 'Yeni Kıta Grubu'}</button>
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-full border-collapse text-sm" style="zoom: ${currentScale};">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <th rowspan="2" class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-950 z-[60] min-w-[96px] w-24 align-middle shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                                    <div class="relative group cursor-pointer" onclick="openManagedTeamModal()">
                                        <img src="${team.logoUrl}" alt="${team.name}" class="w-16 h-16 mx-auto object-contain drop-shadow-lg" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=random&color=fff'">
                                        <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded transition-opacity"><i class="fa-solid fa-pen text-white"></i></div>
                                    </div>
                                </th>
            `;

            if (isKulup) {
                html += `<th colspan="${opps.domestic.teams.length}" class="p-1 border-r border-b border-slate-700 text-center font-bold text-xs tracking-widest text-white group relative" style="background-color: ${opps.domestic.color}90">
                            ${opps.domestic.name}
                            <div class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
                                <button onclick="openGroupEditorModal('domestic', 0)" class="bg-slate-800 p-1 rounded text-[10px] text-white" title="Grubu Düzenle/Sil"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="addOpponentColumn('domestic', 0)" class="bg-emerald-600 p-1 rounded text-[10px] text-white" title="Takım Ekle"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </th>`;
                opps.foreign.forEach((grp, gIdx) => {
                    html += `<th colspan="${grp.teams.length}" class="p-1 border-r border-b border-slate-700 text-center font-bold text-xs tracking-widest text-white group relative" style="background-color: ${grp.color}90">
                                ${grp.name}
                                <div class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
                                    <button onclick="openGroupEditorModal('foreign', ${gIdx})" class="bg-slate-800 p-1 rounded text-[10px] text-white" title="Grubu Düzenle/Sil"><i class="fa-solid fa-pen"></i></button>
                                    <button onclick="addOpponentColumn('foreign', ${gIdx})" class="bg-emerald-600 p-1 rounded text-[10px] text-white" title="Takım Ekle"><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </th>`;
                });
            } else {
                html += `<th colspan="${opps.domestic.teams.length}" class="p-1 border-r border-b border-slate-700 text-center font-bold text-xs tracking-widest text-white group relative" style="background-color: ${opps.domestic.color}90">
                            ${opps.domestic.name}
                            <div class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1">
                                <button onclick="openGroupEditorModal('domestic', 0)" class="bg-slate-800 p-1 rounded text-[10px] text-white"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="addOpponentColumn('domestic', 0)" class="bg-emerald-600 p-1 rounded text-[10px] text-white"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </th>`;
            }
            html += `</tr><tr>`;

            const renderOpponentHeader = (opp, groupType, groupIndex, index, grpColor) => {
                if (opp.logoUrl || opp.name) {
                    const winRate = getWinRate(opp.id);
                    const winRateStr = winRate !== null ? `%${winRate}` : '-';
                    const winRateColor = getWinRateColorClass(winRate);
                    return `
                        <th class="p-2 border-r border-b border-slate-700 min-w-[84px] w-[84px] relative group cursor-pointer hover:bg-slate-800 transition-colors" style="background-color: ${grpColor}40" onclick="handleOpponentClick('${groupType}', ${groupIndex}, ${index})">
                            <div class="h-12 w-12 mx-auto bg-slate-200/90 rounded p-1 shadow hover:scale-110 transition-transform">
                                <img src="${opp.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(opp.name)}`}" title="${opp.name}" class="w-full h-full object-contain">
                            </div>
                            <div class="text-[11px] font-bold mt-1 text-center ${winRateColor}" title="Galibiyet Yüzdesi">${winRateStr}</div>
                        </th>`;
                } else {
                    return `
                        <th class="p-2 border-r border-b border-slate-700 min-w-[84px] w-[84px] relative group" style="background-color: ${grpColor}40">
                            <button onclick="handleOpponentClick('${groupType}', ${groupIndex}, ${index})" class="h-12 w-12 mx-auto bg-slate-800 hover:bg-emerald-600 rounded flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-dashed border-slate-600">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </th>`;
                }
            };

            if (isKulup) {
                opps.domestic.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'domestic', 0, i, opps.domestic.color));
                opps.foreign.forEach((grp, gIdx) => {
                    grp.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'foreign', gIdx, i, grp.color));
                });
            } else {
                opps.domestic.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'domestic', 0, i, opps.domestic.color));
            }
            html += `</tr></thead><tbody>`;

            seasonsList.forEach((season, sIdx) => {
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">
                            <td class="p-0 py-4 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 font-bold text-slate-200 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-24 min-w-[96px] align-middle cursor-pointer hover:bg-slate-800 transition-colors relative" onclick="openSeasonStatsModal('${season}')" title="Sezon İstatistikleri">
                                <div class="mx-auto text-sm tracking-widest whitespace-nowrap text-emerald-500">${season}</div>
                                <button onclick="event.stopPropagation(); deleteSeason('${season}')" class="absolute top-1 left-1 opacity-0 group-hover/srow:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                            </td>`;

                const renderMatchCell = (opp, grpColor) => {
                    if (!opp.name) return `<td class="p-2 border-r border-b border-slate-800/50" style="background-color: ${grpColor}10"></td>`;
                    
                    if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};
                    let cellData = matchDataStore[matchContext][season][opp.id] || [];
                    
                    let hasData = cellData.some(m => m && m.result);
                    
                    if (!hasData) {
                        return `<td class="p-1 border-r border-b border-slate-700 align-middle cursor-pointer hover:bg-slate-700 transition-colors" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')"></td>`;
                    }

                    let boxesHtml = cellData.map(match => {
                        if (!match || !match.result) return '';
                        let loc = match.location === 'H' ? 'E' : (match.location === 'A' ? 'D' : 'T');
                        let scoreStr = (match.teamScore !== '' && match.oppScore !== '') ? `${match.teamScore}-${match.oppScore}` : '';
                        
                        let eventStr = '';
                        if (match.events && match.events.length > 0) {
                            eventStr = '\n\nOlaylar:\n' + match.events.map(ev => {
                                let icon = ev.type === 'US' ? '⚽' : '🔴';
                                let ast = ev.assist ? ` (Ast: ${ev.assist})` : '';
                                let min = ev.min ? `${ev.min}' ` : '';
                                return `${icon} ${min}${ev.scorer}${ast}`;
                            }).join('\n');
                        } else {
                            let oldGoals = match.goals && match.goals.length > 0 ? '\n⚽ Biz: ' + match.goals.join(', ') : '';
                            let oldAst = match.assists && match.assists.length > 0 ? '\n👟 Asist: ' + match.assists.join(', ') : '';
                            let oldOpp = match.oppGoals && match.oppGoals.length > 0 ? '\n🔴 Rakip: ' + match.oppGoals.join(', ') : '';
                            eventStr = oldGoals + oldAst + oldOpp;
                        }

                        return `<div class="match-box match-${match.result}" title="${loc} | ${match.tournament}\nSkor: ${scoreStr}${eventStr}">
                                    <span class="score-display">${scoreStr}</span>
                                </div>`;
                    }).join('');

                    return `
                        <td class="p-1 border-r border-b border-slate-700 align-middle cursor-pointer hover:bg-slate-700 transition-colors" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')">
                            <div class="flex flex-wrap justify-center gap-1 w-full mx-auto p-1 rounded">
                                ${boxesHtml}
                            </div>
                        </td>
                    `;
                };

                if (isKulup) {
                    opps.domestic.teams.forEach(opp => html += renderMatchCell(opp, opps.domestic.color));
                    opps.foreign.forEach(grp => {
                        grp.teams.forEach(opp => html += renderMatchCell(opp, grp.color));
                    });
                } else {
                    opps.domestic.teams.forEach(opp => html += renderMatchCell(opp, opps.domestic.color));
                }
                html += `</tr>`;
            });

            html += `<tr>
                        <td colspan="100%" class="p-2 text-center bg-slate-900/50">
                            <button onclick="addNewSeason()" class="text-emerald-500 hover:text-white text-xs font-bold py-2 px-4 border border-emerald-600 rounded transition-colors"><i class="fa-solid fa-plus mr-1"></i> Yeni Sezon Ekle</button>
                        </td>
                    </tr>`;

            html += `</tbody></table></div>`;
            
            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        function addNewForeignGroup() {
            const grpId = `grp_f${Date.now()}`;
            const defaultName = matchContext === 'kulup' ? 'YENİ ÜLKE GRUBU' : 'YENİ KITA GRUBU';
            const teamPrefix = matchContext === 'kulup' ? 'kf' : 'mf';
            
            opponentsConfig[matchContext].foreign.push({
                id: grpId, name: defaultName, color: '#1e3a8a', 
                teams: [{ id: `${teamPrefix}_${grpId}_0`, name: '', logoUrl: '', country: '' }]
            });
            saveToLocalStorage();
            renderMatchesGrid();
        }

        function openGroupEditorModal(groupType, groupIndex) {
            activeGroupInfo = { context: matchContext, groupType, groupIndex };
            let grp = groupType === 'domestic' ? opponentsConfig[matchContext].domestic : opponentsConfig[matchContext].foreign[groupIndex];
            
            const groupNameLbl = document.getElementById('lbl-group-name');
            if (matchContext === 'milli') {
                groupNameLbl.innerText = "Kıta Adı (Örn: AVRUPA, AFRİKA)";
            } else {
                groupNameLbl.innerText = "Grup / Ülke Adı (Örn: İNGİLTERE)";
            }

            document.getElementById('group-name-input').value = grp.name;
            document.getElementById('group-color-input').value = grp.color;
            
            if(groupType === 'domestic') document.getElementById('btn-delete-group').classList.add('hidden');
            else document.getElementById('btn-delete-group').classList.remove('hidden');

            const modal = document.getElementById('group-editor-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeGroupEditorModal() {
            document.getElementById('group-editor-modal').classList.add('hidden');
            document.getElementById('group-editor-modal').classList.remove('flex');
        }

        function saveGroupInfo() {
            const { context, groupType, groupIndex } = activeGroupInfo;
            const name = document.getElementById('group-name-input').value.trim().toUpperCase();
            const color = document.getElementById('group-color-input').value;
            
            let grp = groupType === 'domestic' ? opponentsConfig[context].domestic : opponentsConfig[context].foreign[groupIndex];
            if(name) grp.name = name;
            grp.color = color;

            saveToLocalStorage();
            closeGroupEditorModal();
            renderMatchesGrid();
        }

        function deleteGroup() {
            if(confirm("Tüm grubu ve içindeki takımları silmek istediğinize emin misiniz?")) {
                const { context, groupIndex } = activeGroupInfo;
                opponentsConfig[context].foreign.splice(groupIndex, 1);
                saveToLocalStorage();
                closeGroupEditorModal();
                renderMatchesGrid();
            }
        }

        function openManagedTeamModal() {
            const team = managedTeams[matchContext];
            document.getElementById('managed-name-input').value = team.name;
            document.getElementById('managed-url-input').value = team.logoUrl;
            fileUploads.managed = null;
            document.getElementById('managed-file-input').value = '';
            document.getElementById('managed-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('managed-logo-results').classList.add('hidden');
            
            const modal = document.getElementById('managed-team-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeManagedTeamModal() {
            document.getElementById('managed-team-modal').classList.add('hidden');
            document.getElementById('managed-team-modal').classList.remove('flex');
        }

        function saveManagedTeam() {
            const name = document.getElementById('managed-name-input').value.trim();
            const url = document.getElementById('managed-url-input').value.trim();
            const logo = fileUploads.managed || (url !== "Yerel Dosya Seçildi" ? url : null);

            if(name) {
                managedTeams[matchContext].name = name;
                if(matchContext === 'kulup') leagueHistoryData[0].name = name;
            }
            if(logo) managedTeams[matchContext].logoUrl = logo;

            if(matchContext === 'kulup' || matchContext === null) {
                document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;
            }

            saveToLocalStorage();
            closeManagedTeamModal();
            renderMatchesGrid();
            if(activeMain === 'ligtarihi') renderLeagueHistory();
        }

        function addOpponentColumn(groupType, groupIndex) {
            const newId = `${matchContext === 'kulup' ? 'k' : 'm'}_${groupType.charAt(0)}_${Date.now()}`;
            if(groupType === 'domestic') opponentsConfig[matchContext].domestic.teams.push({ id: newId, name: '', logoUrl: '', country: 'TURKEY' });
            else opponentsConfig[matchContext].foreign[groupIndex].teams.push({ id: newId, name: '', logoUrl: '', country: '' });
            saveToLocalStorage();
            renderMatchesGrid();
        }

        function handleOpponentClick(groupType, groupIndex, index) {
            let opp;
            if(groupType === 'domestic') opp = opponentsConfig[matchContext].domestic.teams[index];
            else opp = opponentsConfig[matchContext].foreign[groupIndex].teams[index];

            if (opp.name) openOpponentStatsModal(matchContext, groupType, groupIndex, index);
            else openOpponentEditorModal(matchContext, groupType, groupIndex, index);
        }

        function openOpponentEditorModal(context, groupType, groupIndex, index) {
            let opp;
            if(groupType === 'domestic') opp = opponentsConfig[context].domestic.teams[index];
            else opp = opponentsConfig[context].foreign[groupIndex].teams[index];

            activeOppInfo = { context, groupType, groupIndex, index, id: opp.id };

            const countryLbl = document.getElementById('lbl-opp-country');
            const countryDiv = document.getElementById('opp-country-container');
            
            if (context === 'milli') {
                countryLbl.innerText = "Kıta Kodu (Örn: EUR, AFR)";
                countryDiv.classList.remove('hidden');
                document.getElementById('opp-country-input').value = opp.country;
            } else {
                countryLbl.innerText = "Ülke (Kısa Adı, Örn: ENG, ITA)";
                if(groupType === 'domestic') {
                    countryDiv.classList.add('hidden');
                    document.getElementById('opp-country-input').value = managedTeams[context].country;
                } else {
                    countryDiv.classList.remove('hidden');
                    document.getElementById('opp-country-input').value = opp.country;
                }
            }

            document.getElementById('opp-name-input').value = opp.name;
            document.getElementById('opp-url-input').value = opp.logoUrl;
            
            fileUploads.opp = null;
            document.getElementById('opp-file-input').value = '';
            document.getElementById('opp-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('opp-logo-results').classList.add('hidden');

            const delBtn = document.getElementById('btn-delete-opp');
            delBtn.classList.remove('hidden');
            if (opp.name) delBtn.innerText = "Takımı Sil";
            else delBtn.innerText = "Sütunu Sil";

            closeOpponentStatsModal();
            const modal = document.getElementById('opponent-editor-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeOpponentEditorModal() {
            document.getElementById('opponent-editor-modal').classList.add('hidden');
            document.getElementById('opponent-editor-modal').classList.remove('flex');
        }

        function saveOpponent() {
            const { context, groupType, groupIndex, index } = activeOppInfo;
            const country = document.getElementById('opp-country-input').value.trim().toUpperCase();
            const name = document.getElementById('opp-name-input').value.trim();
            const url = document.getElementById('opp-url-input').value.trim();
            let logo = fileUploads.opp || (url !== "Yerel Dosya Seçildi" ? url : null);

            if(!name) { alert("Takım adı zorunludur!"); return; }
            if(!logo) logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

            if(groupType === 'domestic') {
                opponentsConfig[context].domestic.teams[index] = { ...opponentsConfig[context].domestic.teams[index], name, logoUrl: logo, country };
            } else {
                opponentsConfig[context].foreign[groupIndex].teams[index] = { ...opponentsConfig[context].foreign[groupIndex].teams[index], name, logoUrl: logo, country };
            }

            saveToLocalStorage();
            closeOpponentEditorModal();
            renderMatchesGrid();
        }

        function deleteOpponent() {
            if(confirm("Bu rakibi/sütunu tablodan tamamen silmek istediğinize emin misiniz?")) {
                const { context, groupType, groupIndex, index } = activeOppInfo;
                if(groupType === 'domestic') opponentsConfig[context].domestic.teams.splice(index, 1);
                else opponentsConfig[context].foreign[groupIndex].teams.splice(index, 1);
                saveToLocalStorage();
                closeOpponentEditorModal();
                renderMatchesGrid();
            }
        }

        function openOpponentStatsModal(context, groupType, groupIndex, index) {
            let opp;
            if(groupType === 'domestic') opp = opponentsConfig[context].domestic.teams[index];
            else opp = opponentsConfig[context].foreign[groupIndex].teams[index];

            activeOppInfo = { context, groupType, groupIndex, index, id: opp.id };

            document.getElementById('stat-opp-logo').src = opp.logoUrl;
            document.getElementById('stat-opp-name').innerText = opp.name;
            document.getElementById('stat-opp-country').innerText = opp.country || '-';

            let w=0, d=0, l=0;
            const contextData = matchDataStore[context] || {};
            Object.values(contextData).forEach(seasonData => {
                if(seasonData[opp.id]) {
                    seasonData[opp.id].forEach(match => {
                        if(match && match.result) {
                            if(match.result === 'W') w++;
                            if(match.result === 'D') d++;
                            if(match.result === 'L') l++;
                        }
                    });
                }
            });

            const played = w + d + l;
            const winRate = played > 0 ? Math.round((w / played) * 100) : 0;

            document.getElementById('stat-played').innerText = played;
            document.getElementById('stat-winrate').innerText = `%${winRate}`;
            document.getElementById('stat-w').innerText = w;
            document.getElementById('stat-d').innerText = d;
            document.getElementById('stat-l').innerText = l;

            const modal = document.getElementById('opponent-stats-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeOpponentStatsModal() {
            document.getElementById('opponent-stats-modal').classList.add('hidden');
            document.getElementById('opponent-stats-modal').classList.remove('flex');
        }

        function editOpponentFromStats() {
            const { context, groupType, groupIndex, index } = activeOppInfo;
            openOpponentEditorModal(context, groupType, groupIndex, index);
        }

        function deleteOpponentFromStats() {
            const { context, groupType, groupIndex, index } = activeOppInfo;
            if(confirm("Bu rakibi/sütunu tablodan tamamen silmek istediğinize emin misiniz?")) {
                if(groupType === 'domestic') opponentsConfig[context].domestic.teams.splice(index, 1);
                else opponentsConfig[context].foreign[groupIndex].teams.splice(index, 1);
                saveToLocalStorage();
                closeOpponentStatsModal();
                renderMatchesGrid();
            }
        }

        function openSeasonStatsModal(season) {
            let w=0, d=0, l=0, gf=0, ga=0;
            const seasonData = matchDataStore[matchContext][season] || {};
            
            Object.values(seasonData).forEach(matches => {
                matches.forEach(match => {
                    if(match && match.result) {
                        if(match.result === 'W') w++;
                        if(match.result === 'D') d++;
                        if(match.result === 'L') l++;
                        if(match.teamScore) gf += parseInt(match.teamScore);
                        if(match.oppScore) ga += parseInt(match.oppScore);
                    }
                });
            });

            const played = w+d+l;
            const winRate = played > 0 ? Math.round((w/played)*100) : 0;

            document.getElementById('ss-title').innerText = `${season} Sezonu`;
            document.getElementById('ss-played').innerText = played;
            document.getElementById('ss-winrate').innerText = `%${winRate}`;
            document.getElementById('ss-w').innerText = w;
            document.getElementById('ss-d').innerText = d;
            document.getElementById('ss-l').innerText = l;
            document.getElementById('ss-gf').innerText = gf;
            document.getElementById('ss-ga').innerText = ga;
            
            const gd = gf - ga;
            const gdElem = document.getElementById('ss-gd');
            gdElem.innerText = gd > 0 ? `+${gd}` : gd;
            gdElem.className = gd > 0 ? 'text-lg font-bold text-green-400' : (gd < 0 ? 'text-lg font-bold text-red-400' : 'text-lg font-bold text-slate-300');

            const modal = document.getElementById('season-stats-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeSeasonStatsModal() {
            document.getElementById('season-stats-modal').classList.add('hidden');
            document.getElementById('season-stats-modal').classList.remove('flex');
        }

        function autoCalcResult(index) {
            let tScore = document.getElementById(`m_tscore_${index}`).value;
            let oScore = document.getElementById(`m_oscore_${index}`).value;
            let resSelect = document.getElementById(`m_res_${index}`);

            if(tScore !== "" && oScore !== "") {
                let ts = parseInt(tScore);
                let os = parseInt(oScore);
                if(ts > os) resSelect.value = "W";
                else if(ts === os) resSelect.value = "D";
                else resSelect.value = "L";
            }
        }

        function openMatchEditor(season, oppId, oppName) {
            activeMatchInfo = { season, oppId, oppName };
            document.getElementById('match-editor-subtitle').innerText = `${season} Sezonu - ${oppName}`;
            
            if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};
            let savedMatches = matchDataStore[matchContext][season][oppId];
            
            if (savedMatches && savedMatches.length > 0) {
                activeMatchesTemp = JSON.parse(JSON.stringify(savedMatches));
                activeMatchesTemp.forEach(m => { 
                    if(!m.events) m.events = []; 
                });
            } else {
                activeMatchesTemp = [{ result: '', location: 'H', teamScore: '', oppScore: '', tournament: '', events: [] }]; 
            }

            renderMatchSlotsUI();

            const modal = document.getElementById('match-editor-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function syncMatchSlotsToTemp() {
            let newData = [];
            for(let i=0; i<activeMatchesTemp.length; i++) {
                if(document.getElementById(`m_res_${i}`)) {
                    let mEvents = [];
                    let evIdx = 0;
                    while(document.getElementById(`m_${i}_ev_${evIdx}_min`)) {
                        mEvents.push({
                            min: document.getElementById(`m_${i}_ev_${evIdx}_min`).value.trim(),
                            type: document.getElementById(`m_${i}_ev_${evIdx}_type`).value,
                            scorer: document.getElementById(`m_${i}_ev_${evIdx}_scorer`).value.trim(),
                            assist: document.getElementById(`m_${i}_ev_${evIdx}_assist`).value.trim(),
                        });
                        evIdx++;
                    }

                    newData.push({
                        result: document.getElementById(`m_res_${i}`).value,
                        location: document.getElementById(`m_loc_${i}`).value,
                        tournament: document.getElementById(`m_tour_${i}`).value,
                        teamScore: document.getElementById(`m_tscore_${i}`).value,
                        oppScore: document.getElementById(`m_oscore_${i}`).value,
                        events: mEvents,
                        goals: activeMatchesTemp[i].goals || [],
                        assists: activeMatchesTemp[i].assists || [],
                        oppGoals: activeMatchesTemp[i].oppGoals || []
                    });
                }
            }
            activeMatchesTemp = newData;
        }

        function addMatchSlot() {
            syncMatchSlotsToTemp();
            activeMatchesTemp.push({ result: '', location: 'H', teamScore: '', oppScore: '', tournament: '', events: [] });
            renderMatchSlotsUI();
        }

        function removeMatchSlot(index) {
            syncMatchSlotsToTemp();
            activeMatchesTemp.splice(index, 1);
            renderMatchSlotsUI();
        }

        function addMatchEvent(mIndex) {
            syncMatchSlotsToTemp();
            if(!activeMatchesTemp[mIndex].events) activeMatchesTemp[mIndex].events = [];
            activeMatchesTemp[mIndex].events.push({ min: '', type: 'US', scorer: '', assist: '' });
            renderMatchSlotsUI();
        }

        function removeMatchEvent(mIndex, evIndex) {
            syncMatchSlotsToTemp();
            activeMatchesTemp[mIndex].events.splice(evIndex, 1);
            renderMatchSlotsUI();
        }

        function renderMatchSlotsUI() {
            let html = '';
            const optionsList = matchContext === 'milli' ? ["Dostluk Maçı", "Dünya Kupası", "Avrupa Şampiyonası"] : tournamentOptions;

            activeMatchesTemp.forEach((m, i) => {
                let tourOptionsHtml = optionsList.map(t => `<option value="${t}" ${m.tournament === t ? 'selected' : ''}>${t}</option>`).join('');
                let eventsHtml = '';
                if (m.events && m.events.length > 0) {
                    m.events.forEach((ev, evIdx) => {
                        eventsHtml += `
                            <div class="flex gap-2 items-center mt-2 bg-slate-950 p-2 rounded border border-slate-700 relative">
                                <input type="number" id="m_${i}_ev_${evIdx}_min" value="${ev.min}" placeholder="Dk" class="w-14 bg-slate-900 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 hide-scrollbar appearance-none" min="1" max="120" autocomplete="off">
                                <select id="m_${i}_ev_${evIdx}_type" class="bg-slate-900 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500">
                                    <option value="US" ${ev.type==='US'?'selected':''}>Biz</option>
                                    <option value="OPP" ${ev.type==='OPP'?'selected':''}>Rakip</option>
                                </select>
                                <input type="text" id="m_${i}_ev_${evIdx}_scorer" value="${ev.scorer}" autocomplete="off" placeholder="Gol (Örn: Icardi)" class="flex-1 bg-slate-900 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 use-autocomplete">
                                <input type="text" id="m_${i}_ev_${evIdx}_assist" value="${ev.assist}" autocomplete="off" placeholder="Asist (Örn: Mertens)" class="flex-1 bg-slate-900 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 use-autocomplete">
                                <button onclick="removeMatchEvent(${i}, ${evIdx})" class="text-slate-500 hover:text-red-500 transition-colors px-1" title="Golu Sil"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        `;
                    });
                }

                html += `
                    <div class="bg-slate-900 p-3 rounded-lg border border-slate-700 relative group/slot">
                        <button onclick="removeMatchSlot(${i})" class="absolute top-2 right-2 text-slate-500 hover:text-red-500 opacity-0 group-hover/slot:opacity-100 transition-opacity" title="Maçı Sil"><i class="fa-solid fa-trash"></i></button>
                        <div class="flex flex-wrap items-center gap-2 pr-6 border-b border-slate-700/50 pb-3">
                            <span class="text-xs text-slate-400 font-bold w-12 border-b border-slate-700 pb-1">Maç ${i+1}</span>
                            <select id="m_tour_${i}" class="bg-slate-800 text-xs text-white p-1.5 rounded border border-slate-600 outline-none w-32 focus:border-emerald-500">
                                <option value="">Müsabaka Seç</option>
                                ${tourOptionsHtml}
                            </select>
                            <select id="m_loc_${i}" class="bg-slate-800 text-xs text-white p-1.5 rounded border border-slate-600 outline-none w-[80px] focus:border-emerald-500">
                                <option value="H" ${m.location==='H'?'selected':''}>Ev</option>
                                <option value="A" ${m.location==='A'?'selected':''}>Dep</option>
                                <option value="N" ${m.location==='N'?'selected':''}>Tarafsız</option>
                            </select>
                            <div class="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-600 focus-within:border-emerald-500">
                                <input type="number" id="m_tscore_${i}" value="${m.teamScore}" oninput="autoCalcResult(${i})" placeholder="Biz" class="w-8 bg-transparent text-center text-xs text-white outline-none font-bold hide-scrollbar appearance-none" min="0" autocomplete="off">
                                <span class="text-slate-500 font-bold">:</span>
                                <input type="number" id="m_oscore_${i}" value="${m.oppScore}" oninput="autoCalcResult(${i})" placeholder="Rakip" class="w-8 bg-transparent text-center text-xs text-white outline-none font-bold hide-scrollbar appearance-none" min="0" autocomplete="off">
                            </div>
                            <select id="m_res_${i}" class="bg-slate-800 text-xs font-bold p-1.5 rounded border border-slate-600 outline-none ml-auto min-w-[110px] focus:border-emerald-500">
                                <option value="">Sonuç</option>
                                <option value="W" class="text-green-500" ${m.result==='W'?'selected':''}>W (Galibiyet)</option>
                                <option value="D" class="text-orange-500" ${m.result==='D'?'selected':''}>D (Berabere)</option>
                                <option value="L" class="text-red-500" ${m.result==='L'?'selected':''}>L (Mağlup)</option>
                            </select>
                        </div>
                        <div class="mt-2">
                            ${eventsHtml}
                            <button onclick="addMatchEvent(${i})" class="text-emerald-500 text-xs mt-2 hover:text-emerald-400 transition-colors font-bold"><i class="fa-solid fa-plus mr-1"></i> Gol Detayı Ekle</button>
                        </div>
                    </div>
                `;
            });

            if(activeMatchesTemp.length === 0) {
                html = `<div class="text-center text-slate-500 text-sm py-4">Kayıtlı maç bulunmuyor. Yeni maç ekleyin.</div>`;
            }

            document.getElementById('match-slots-container').innerHTML = html;
        }

        function closeMatchEditorModal() {
            document.getElementById('match-editor-modal').classList.add('hidden');
            document.getElementById('match-editor-modal').classList.remove('flex');
        }

        function saveMatchData() {
            syncMatchSlotsToTemp();
            const { season, oppId } = activeMatchInfo;
            matchDataStore[matchContext][season][oppId] = activeMatchesTemp;
            saveToLocalStorage();
            closeMatchEditorModal();
            renderMatchesGrid();
        }

        // --- KADRO TABLOSU ---
        function renderSquadGrid() {
            updateMockPlayers();
            let players = squadData[squadContext];
            let squadSeasons = [...seasonsList].reverse();
            
            const groups = [
                { id: 'GK', label: 'KALECİLER', strip: 'bg-yellow-600/30' },
                { id: 'DEF', label: 'DEFANSLAR', strip: 'bg-blue-600/30' },
                { id: 'MID', label: 'ORTA SAHALAR', strip: 'bg-green-600/30' },
                { id: 'FWD', label: 'FORVETLER', strip: 'bg-red-600/30' }
            ];

            const getGroupForPos = (pos) => {
                if (pos === 'GK') return 'GK';
                if (['CB', 'LB', 'RB', 'DEF'].includes(pos)) return 'DEF';
                if (['DM', 'CM', 'LM', 'RM', 'AM', 'MID'].includes(pos)) return 'MID';
                if (['LW', 'RW', 'ST', 'FWD'].includes(pos)) return 'FWD';
                return 'MID';
            };

            const staticCols = [
                { id: 'pos', label: 'Mevki', w: 40, align: 'center' },
                { id: 'role', label: 'Önem', w: 60, align: 'center' },
                { id: 'name', label: 'İsim Soyisim', w: 180, align: 'left', pl: 'pl-3' },
                { id: 'countryCode', label: 'Ülke', w: 40, align: 'center' },
                { id: 'joinAge', label: 'G.Yaş', w: 35, align: 'center' },
                { id: 'joinOvr', label: 'G.OVR', w: 35, align: 'center' }
            ];
            
            if (squadContext === 'akademi') {
                staticCols.push({ id: 'pot', label: 'POT', w: 45, align: 'center' });
            }
            
            let accW = 0;
            staticCols.forEach(c => { c.left = accW; accW += c.w; });
            const btnLeft = accW;
            const btnW = 35;

            const renderOvrBadge = (ovr) => {
                if(!ovr) return '';
                let colorClass = 'ovr-low';
                if(ovr >= 80) colorClass = 'ovr-high';
                else if(ovr >= 70) colorClass = 'ovr-med';
                return `<span class="ovr-badge ${colorClass}">${ovr}</span>`;
            };

            const getTrBadge = (type, text) => {
                if (type === 'continue') return '';
                if(!text) return '';
                let bg = 'bg-slate-700 text-slate-300 border-slate-600';
                if (type === 'in') bg = 'bg-emerald-600 text-white border-emerald-500 shadow-sm';
                if (type === 'out') bg = 'bg-red-600 text-white border-red-500 shadow-sm';
                if (type === 'renew') bg = 'bg-purple-600 text-white border-purple-500 shadow-sm';
                if (type === 'loan_in') bg = 'bg-blue-600 text-white border-blue-500 shadow-sm';
                if (type === 'loan_out') bg = 'bg-orange-600 text-white border-orange-500 shadow-sm';
                return `<div class="inline-block px-1.5 py-[1px] rounded font-bold border truncate text-[9px] max-w-full ${bg}">${text}</div>`;
            };

            const getTdBackground = (type, text, stripColor) => {
                if (type === 'continue') return stripColor;
                return 'bg-transparent';
            };

            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <div class="flex items-center gap-3">
                        <h3 class="text-2xl font-bold text-white">${squadContext === 'astakim' ? 'As Takım' : 'Akademi'} Gelişim Takibi</h3>
                        <button onclick="openPlayerInfoModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-user-plus mr-1"></i>Oyuncu Ekle</button>
                    </div>
                    <div class="flex items-center gap-4">
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-full border-collapse text-sm" style="zoom: ${currentScale}; min-width: max-content;">
                        <thead class="bg-slate-950 sticky top-0 z-[60] shadow-md">
                            <tr>
            `;
            
            staticCols.forEach(c => {
                let borderRight = (c.id === 'joinOvr' && squadContext !== 'akademi') || c.id === 'pot' ? 'border-r-2 border-slate-500' : 'border-r border-slate-700';
                html += `<th rowspan="2" class="p-1 ${borderRight} border-b border-slate-700 sticky bg-slate-950 z-[70] text-[10px] font-bold text-slate-400 cursor-pointer hover:text-white transition-colors" onclick="sortSquad('${c.id}')" style="left: ${c.left}px; width: ${c.w}px; min-width: ${c.w}px; max-width: ${c.w}px;">
                            ${c.label} <i class="fa-solid fa-sort ml-0.5 opacity-50"></i>
                         </th>`;
            });

            html += `<th rowspan="2" class="p-1 border-r-2 border-b border-slate-500 sticky bg-slate-950 z-[70] text-center shadow-[2px_0_5px_rgba(0,0,0,0.3)]" style="left: ${btnLeft}px; width: ${btnW}px; min-width: ${btnW}px;">
                        <button onclick="addNewSeason()" class="text-emerald-500 hover:text-emerald-400" title="Sola Yeni Sezon Ekle"><i class="fa-solid fa-plus-circle text-lg"></i></button>
                     </th>`;

            squadSeasons.forEach(season => {
                html += `<th colspan="4" class="p-1 border-r border-b border-slate-700 text-center font-black tracking-widest bg-slate-800 text-emerald-500 relative group/season">
                            ${season}
                            <button onclick="deleteSeason('${season}')" class="absolute top-1 right-1 opacity-0 group-hover/season:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                         </th>`;
            });
            html += `</tr><tr>`;

            squadSeasons.forEach(season => {
                html += `
                    <th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[70px]">ŞUB-HAZ</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-orange-900/30 text-[9px] font-bold text-orange-300 min-w-[90px]">KIŞ TR.</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[70px]">EYL-ARA</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-blue-900/30 text-[9px] font-bold text-blue-300 min-w-[90px]">YAZ TR.</th>
                `;
            });
            html += `</tr></thead><tbody>`;

            if (players.length === 0) {
                html += `<tr><td colspan="100%" class="p-4 text-center text-slate-500">Kayıtlı oyuncu bulunmuyor.</td></tr>`;
            } else {
                groups.forEach(group => {
                    let groupPlayers = players.filter(p => getGroupForPos(p.pos) === group.id);
                    if (groupPlayers.length === 0) return;

                    groupPlayers.sort((a, b) => {
                        let valA = a[squadSort.field]; let valB = b[squadSort.field];
                        if (squadSort.field === 'joinOvr' || squadSort.field === 'joinAge') {
                            valA = Number(valA || 0); valB = Number(valB || 0);
                        } else {
                            valA = (valA || '').toString().toLowerCase(); valB = (valB || '').toString().toLowerCase();
                        }
                        if (valA < valB) return squadSort.asc ? -1 : 1;
                        if (valA > valB) return squadSort.asc ? 1 : -1;
                        return 0;
                    });

                    html += `<tr><td colspan="100%" class="h-3 bg-slate-950 border-y border-slate-700 shadow-inner"></td></tr>`;

                    groupPlayers.forEach(p => {
                        let roleColor = 'text-slate-300';
                        if(p.role.includes('Yıldız') || p.role.includes('Adayı')) roleColor = 'text-yellow-400';
                        if(p.role.includes('İlk 11')) roleColor = 'text-blue-400';
                        if(p.role.includes('Rotasyon') || p.role.includes('Gelişecek')) roleColor = 'text-green-400';
                        if(p.role.includes('Gelecek')) roleColor = 'text-purple-400';
                        if(p.role.includes('Yetersiz')) roleColor = 'text-red-400';

                        let photoHtml = p.photoUrl ? `<img src="${p.photoUrl}" class="w-6 h-6 rounded-full inline-block mr-1.5 object-cover bg-slate-800">` : `<div class="w-6 h-6 rounded-full inline-flex items-center justify-center bg-slate-700 text-xs font-bold mr-1.5">${p.name.charAt(0)}</div>`;
                        let flagHtml = p.countryCode ? `<img src="https://flagcdn.com/24x18/${p.countryCode.toLowerCase()}.png" alt="${p.countryCode}" title="${p.countryCode.toUpperCase()}" class="w-5 h-auto mx-auto shadow-sm">` : '-';

                        let rowBgClass = `bg-row-${getGroupForPos(p.pos)}`;

                        html += `<tr class="group/row group-row hover:bg-slate-800/30 transition-colors">`;
                        
                        staticCols.forEach(c => {
                            let content = '';
                            if(c.id === 'pos') content = `<span class="pos-${p.pos} font-black text-[10px]">${p.pos}</span>`;
                            else if(c.id === 'role') content = `<span class="${roleColor} text-[9px] font-bold truncate block w-full">${p.role}</span>`;
                            else if(c.id === 'name') content = `<div class="flex items-center justify-start w-full overflow-hidden hover:text-emerald-400 cursor-pointer" onclick="openPlayerInfoModal('${p.id}')" title="Düzenle">${photoHtml}<span class="truncate text-xs font-bold">${p.name}</span></div>`;
                            else if(c.id === 'countryCode') content = flagHtml;
                            else if(c.id === 'joinAge') content = `<span class="text-[10px] font-mono text-slate-300">${p.joinAge || ''}</span>`;
                            else if(c.id === 'joinOvr') content = renderOvrBadge(p.joinOvr);
                            else if(c.id === 'pot') content = `<span class="text-[10px] font-bold text-emerald-300">${p.pot || '-'}</span>`;
                            
                            let extraClasses = (c.id === 'joinOvr' && squadContext !== 'akademi') || c.id === 'pot' ? 'border-r-2 border-slate-500 shadow-[2px_0_5px_rgba(0,0,0,0.4)]' : 'border-r border-slate-700/50';

                            html += `<td class="p-1 ${extraClasses} border-b border-slate-700/50 sticky z-[50] ${rowBgClass} transition-colors text-${c.align} ${c.pl || ''}" style="left: ${c.left}px; width: ${c.w}px; min-width: ${c.w}px; max-width: ${c.w}px;">
                                        ${content}
                                     </td>`;
                        });
                        
                        html += `<td class="p-1 border-r-2 border-b border-slate-500 sticky z-[50] ${rowBgClass} transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.4)]" style="left: ${btnLeft}px; width: ${btnW}px; min-width: ${btnW}px;"></td>`;

                        squadSeasons.forEach(season => {
                            const sData = (p.history && p.history[season]) ? p.history[season] : {};
                            
                            let s2CellBg = sData.s2a || sData.s2o ? group.strip : 'bg-transparent';
                            let t2CellBg = getTdBackground(sData.t2Type, sData.t2, group.strip);
                            let s1CellBg = sData.s1a || sData.s1o ? group.strip : 'bg-transparent';
                            let t1CellBg = getTdBackground(sData.t1Type, sData.t1, group.strip);

                            // ŞUB-HAZ (s2)
                            let s2Str = (sData.s2a || sData.s2o) ? `
                                <div class="flex items-center justify-center gap-1.5 w-full h-full">
                                    <span class="text-[10px] text-slate-100 font-mono drop-shadow-md">${sData.s2a || ''}</span>
                                    <i class="fa-solid fa-caret-right text-[9px] text-emerald-400 drop-shadow-md"></i>
                                    ${renderOvrBadge(sData.s2o)}
                                </div>` : '';
                            html += `<td class="p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors ${s2CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 's2')">${s2Str}</td>`;

                            // KIŞ TR (t2)
                            html += `<td class="p-1 text-center border-r border-b border-slate-700/50 align-middle cursor-pointer transition-colors hover:bg-slate-800/80 ${t2CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 't2')" title="${sData.t2 || ''}">
                                        ${getTrBadge(sData.t2Type, sData.t2)}
                                     </td>`;
                                     
                            // EYL-ARA (s1)
                            let s1Str = (sData.s1a || sData.s1o) ? `
                                <div class="flex items-center justify-center gap-1.5 w-full h-full">
                                    <span class="text-[10px] text-slate-100 font-mono drop-shadow-md">${sData.s1a || ''}</span>
                                    <i class="fa-solid fa-caret-right text-[9px] text-emerald-400 drop-shadow-md"></i>
                                    ${renderOvrBadge(sData.s1o)}
                                </div>` : '';
                            html += `<td class="p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors ${s1CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 's1')">${s1Str}</td>`;
                            
                            // YAZ TR (t1)
                            html += `<td class="p-1 text-center border-r border-b border-slate-700/50 align-middle cursor-pointer transition-colors hover:bg-slate-800/80 ${t1CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 't1')" title="${sData.t1 || ''}">
                                        ${getTrBadge(sData.t1Type, sData.t1)}
                                     </td>`;
                        });
                        html += `</tr>`;
                    });
                });
            }

            html += `</tbody></table></div>`;
            
            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        function sortSquad(field) {
            if (squadSort.field === field) {
                squadSort.asc = !squadSort.asc;
            } else {
                squadSort.field = field;
                squadSort.asc = (field === 'name' || field === 'countryCode' || field === 'pos' || field === 'role') ? true : false;
            }
            renderSquadGrid();
        }

        function populateRolesDropdown(selectId, selectedValue) {
            const select = document.getElementById(selectId);
            const rolesArr = playerRoles[squadContext];
            select.innerHTML = rolesArr.map(r => `<option value="${r}">${r}</option>`).join('');
            select.innerHTML += `<option value="NEW" class="text-emerald-400 font-bold">+ Yeni Ekle...</option>`;
            if(rolesArr.includes(selectedValue)) select.value = selectedValue;
            else select.value = rolesArr[0];
        }

        function checkCustomRole(selectObj) {
            if(selectObj.value === 'NEW') {
                const newRole = prompt("Yeni rol/önem adı girin:");
                if(newRole && newRole.trim() !== '') {
                    playerRoles[squadContext].push(newRole.trim());
                    saveToLocalStorage();
                    populateRolesDropdown(selectObj.id, newRole.trim());
                } else {
                    selectObj.value = playerRoles[squadContext][0]; 
                }
            }
        }

        function openPlayerInfoModal(id = null) {
            activePlayerId = id;
            if(squadContext === 'akademi') document.getElementById('pi-pot-container').classList.remove('hidden');
            else document.getElementById('pi-pot-container').classList.add('hidden');

            if(id) {
                const p = squadData[squadContext].find(pl => pl.id === id);
                document.getElementById('player-info-title').innerText = "Oyuncu Düzenle";
                document.getElementById('pi-pos').value = p.pos;
                populateRolesDropdown('pi-role', p.role);
                document.getElementById('pi-name').value = p.name;
                document.getElementById('pi-photo-url').value = p.photoUrl || '';
                document.getElementById('pi-country').value = p.countryCode || '';
                document.getElementById('pi-age').value = p.joinAge;
                document.getElementById('pi-ovr').value = p.joinOvr;
                if(squadContext === 'akademi') document.getElementById('pi-pot').value = p.pot || '';
                document.getElementById('btn-delete-player').classList.remove('hidden');
            } else {
                document.getElementById('player-info-title').innerText = "Yeni Oyuncu Ekle";
                document.getElementById('pi-pos').value = 'CM';
                populateRolesDropdown('pi-role', squadContext === 'akademi' ? 'A Takım Adayı' : 'Rotasyon');
                document.getElementById('pi-name').value = '';
                document.getElementById('pi-photo-url').value = '';
                document.getElementById('pi-country').value = '';
                document.getElementById('pi-age').value = '18';
                document.getElementById('pi-ovr').value = '60';
                if(squadContext === 'akademi') document.getElementById('pi-pot').value = '80-85';
                document.getElementById('btn-delete-player').classList.add('hidden');
            }
            fileUploads['pi-photo'] = null;
            document.getElementById('pi-photo-file').value = '';
            document.getElementById('pi-photo-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');

            const modal = document.getElementById('player-info-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closePlayerInfoModal() {
            document.getElementById('player-info-modal').classList.add('hidden');
            document.getElementById('player-info-modal').classList.remove('flex');
        }

        function savePlayerInfo() {
            const pos = document.getElementById('pi-pos').value;
            const role = document.getElementById('pi-role').value;
            const name = document.getElementById('pi-name').value.trim();
            const url = document.getElementById('pi-photo-url').value.trim();
            const photo = fileUploads['pi-photo'] || (url !== "Yerel Dosya Seçildi" ? url : '');
            const countryCode = document.getElementById('pi-country').value.trim().toLowerCase();
            const age = document.getElementById('pi-age').value;
            const ovr = document.getElementById('pi-ovr').value;
            const pot = document.getElementById('pi-pot').value.trim();

            if(!name) { alert("İsim zorunludur!"); return; }

            if(activePlayerId) {
                let p = squadData[squadContext].find(pl => pl.id === activePlayerId);
                p.pos = pos; p.role = role; p.name = name; p.photoUrl = photo; p.countryCode = countryCode; p.joinAge = age; p.joinOvr = ovr;
                if(squadContext === 'akademi') p.pot = pot;
            } else {
                let newPlayer = { id: 'p_' + Date.now(), pos, role, name, photoUrl: photo, countryCode, joinAge: age, joinOvr: ovr, history: {} };
                if(squadContext === 'akademi') newPlayer.pot = pot;
                squadData[squadContext].push(newPlayer);
            }
            saveToLocalStorage();
            closePlayerInfoModal();
            renderSquadGrid();
        }

        function deletePlayer() {
            if(confirm("Oyuncuyu silmek istediğinize emin misiniz?")) {
                squadData[squadContext] = squadData[squadContext].filter(pl => pl.id !== activePlayerId);
                saveToLocalStorage();
                closePlayerInfoModal();
                renderSquadGrid();
            }
        }

        function openPlayerCellModal(id, season, type) {
            activePlayerId = id;
            activePlayerSeason = season;
            activeCellType = type;
            
            const p = squadData[squadContext].find(pl => pl.id === id);
            let sData = (p.history && p.history[season]) ? p.history[season] : {};
            
            const titles = {
                't1': 'YAZ Transfer Dönemi',
                's1': 'Eylül - Aralık Gelişimi',
                't2': 'KIŞ Transfer Dönemi',
                's2': 'Şubat - Haziran Gelişimi'
            };
            
            document.getElementById('pc-title').innerText = titles[type];
            document.getElementById('pc-subtitle').innerText = `${p.name} - ${season} Sezonu`;
            
            document.getElementById('pc-form-transfer').classList.add('hidden');
            document.getElementById('pc-form-stat').classList.add('hidden');
            
            if (type === 't1' || type === 't2') {
                document.getElementById('pc-form-transfer').classList.remove('hidden');
                document.getElementById('pc-tr-type').value = sData[`${type}Type`] || 'none';
                document.getElementById('pc-tr-note').value = sData[type] || '';
            } else {
                document.getElementById('pc-form-stat').classList.remove('hidden');
                document.getElementById('pc-st-age').value = sData[`${type}a`] || '';
                document.getElementById('pc-st-ovr').value = sData[`${type}o`] || '';
            }
            
            const modal = document.getElementById('player-cell-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closePlayerCellModal() {
            document.getElementById('player-cell-modal').classList.add('hidden');
            document.getElementById('player-cell-modal').classList.remove('flex');
        }

        function savePlayerCell() {
            const p = squadData[squadContext].find(pl => pl.id === activePlayerId);
            if(!p.history) p.history = {};
            if(!p.history[activePlayerSeason]) p.history[activePlayerSeason] = {};
            
            let sData = p.history[activePlayerSeason];
            
            if (activeCellType === 't1' || activeCellType === 't2') {
                sData[`${activeCellType}Type`] = document.getElementById('pc-tr-type').value;
                sData[activeCellType] = document.getElementById('pc-tr-note').value.trim();
            } else {
                sData[`${activeCellType}a`] = document.getElementById('pc-st-age').value;
                sData[`${activeCellType}o`] = document.getElementById('pc-st-ovr').value;
            }
            
            saveToLocalStorage();
            closePlayerCellModal();
            renderSquadGrid();
        }

        // --- LİG TARİHİ TABLOSU VE GRAFİĞİ ---
        function sortLeague(field) {
            if(leagueSort.field === field) {
                leagueSort.asc = !leagueSort.asc;
            } else {
                leagueSort.field = field;
                leagueSort.asc = (field === 'name') ? true : false; 
            }
            renderLeagueHistory();
        }

        function highlightLeagueTeam(teamId) {
            highlightedLeagueTeamId = teamId;
            updateLeagueChart();
        }

        function unhighlightLeagueTeam() {
            highlightedLeagueTeamId = null;
            updateLeagueChart();
        }

        function renderLeagueHistory() {
            leagueHistoryData.forEach(t => {
                t.total = 0;
                seasonsList.forEach(s => {
                    if(t.history[s] && t.history[s].pts) {
                        t.total += parseInt(t.history[s].pts);
                    }
                });
            });

            currentSortedLeagueTeams = [...leagueHistoryData].sort((a, b) => {
                let valA, valB;
                if (leagueSort.field === 'name') {
                    valA = a.name.toLowerCase(); valB = b.name.toLowerCase();
                } else if (leagueSort.field === 'total') {
                    valA = a.total || 0; valB = b.total || 0;
                } else { 
                    valA = (a.history[leagueSort.field] && a.history[leagueSort.field].pts) ? parseInt(a.history[leagueSort.field].pts) : -1;
                    valB = (b.history[leagueSort.field] && b.history[leagueSort.field].pts) ? parseInt(b.history[leagueSort.field].pts) : -1;
                }
                
                if (valA < valB) return leagueSort.asc ? -1 : 1;
                if (valA > valB) return leagueSort.asc ? 1 : -1;
                return 0;
            });

            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <h3 class="text-2xl font-bold text-white">Lig Tarihi Paneli</h3>
                    <div class="flex items-center gap-4">
                        <button onclick="openLeagueTeamModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-plus mr-1"></i>Takım Ekle</button>
                    </div>
                </div>
                
                <div class="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden">
                    
                    <div class="w-full lg:w-1/2 flex flex-col h-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg relative">
                        <div class="w-full overflow-auto table-scroll flex-1 h-full">
                            <table class="w-full border-collapse text-sm min-w-max">
                                <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                                    <tr>
                                        <th class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-900 z-[50] w-12 text-center text-slate-400">#</th>
                                        <th class="p-2 border-r border-b border-slate-700 sticky left-[48px] bg-slate-900 z-[50] text-left text-white min-w-[150px] cursor-pointer hover:text-emerald-400 transition-colors" onclick="sortLeague('name')">TAKIMLAR <i class="fa-solid fa-sort ml-1 opacity-50 text-[10px]"></i></th>
            `;
            
            seasonsList.forEach(season => {
                html += `<th class="p-2 border-r border-b border-slate-700 text-center font-bold text-emerald-400 cursor-pointer hover:text-white transition-colors" onclick="sortLeague('${season}')">${season} <i class="fa-solid fa-sort ml-1 opacity-50 text-[10px]"></i></th>`;
            });

            html += `                   <th class="p-2 border-b border-slate-700 text-center font-black text-emerald-500 bg-emerald-900/20 cursor-pointer hover:text-emerald-300 transition-colors" onclick="sortLeague('total')">TOTAL <i class="fa-solid fa-sort ml-1 opacity-50 text-[10px]"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
            `;

            if (currentSortedLeagueTeams.length === 0) {
                html += `<tr><td colspan="100%" class="p-4 text-center text-slate-500">Takım bulunmuyor. Yeni takım ekleyin.</td></tr>`;
            } else {
                currentSortedLeagueTeams.forEach((team, idx) => {
                    html += `<tr class="hover:bg-slate-800/50 transition-colors cursor-pointer group" onmouseenter="highlightLeagueTeam('${team.id}')" onmouseleave="unhighlightLeagueTeam()">
                                <td class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-950 z-[30] text-center font-bold text-slate-400">${idx + 1}</td>
                                <td class="p-2 border-r border-b border-slate-700 sticky left-[48px] bg-slate-950 z-[30] text-left font-bold" style="color: ${team.color}">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="flex items-center gap-2">
                                            <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${team.color}"></div>
                                            <span class="truncate">${team.name}</span>
                                        </div>
                                        <button onclick="openLeagueTeamModal('${team.id}'); event.stopPropagation();" class="text-slate-500 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"><i class="fa-solid fa-pen text-xs"></i></button>
                                    </div>
                                </td>`;
                    
                    seasonsList.forEach(season => {
                        let pts = team.history[season]?.pts || '-';
                        html += `<td class="p-2 border-r border-b border-slate-700 text-center hover:bg-slate-700 transition-colors" onclick="openLeagueCellModal('${team.id}', '${season}')">${pts}</td>`;
                    });

                    html += `<td class="p-2 border-b border-slate-700 text-center font-black text-white bg-emerald-900/30">${team.total}</td>
                             </tr>`;
                });
            }

            html += `           </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 flex flex-col h-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg p-4 relative min-h-[300px]">
                        <h4 class="text-sm font-bold text-slate-300 mb-2 text-left uppercase tracking-widest">Sıralama Grafiği (1-18)</h4>
                        <div class="flex-1 relative w-full h-full">
                            <canvas id="leagueChart"></canvas>
                        </div>
                    </div>
                </div>
            `;
            
            updateContentArea(html);
            setTimeout(updateLeagueChart, 50);
        }

        function updateLeagueChart() {
            const ctx = document.getElementById('leagueChart');
            if(!ctx) return;
            
            if(leagueChartInstance) {
                leagueChartInstance.destroy();
            }

            const datasets = currentSortedLeagueTeams.map(team => {
                const dataPoints = seasonsList.map(season => {
                    const h = team.history[season];
                    return (h && h.rank && parseInt(h.rank) > 0) ? parseInt(h.rank) : null;
                });
                
                let isFaded = highlightedLeagueTeamId && team.id !== highlightedLeagueTeamId;
                let lineColor = team.color;
                let bgColor = team.color;
                
                if (isFaded) {
                    lineColor = team.color + '22';
                    bgColor = team.color + '11';
                }

                return {
                    label: team.name,
                    data: dataPoints,
                    borderColor: lineColor,
                    backgroundColor: bgColor,
                    borderWidth: isFaded ? 1 : 3,
                    pointBackgroundColor: bgColor,
                    pointBorderColor: isFaded ? 'transparent' : '#0f172a',
                    pointBorderWidth: isFaded ? 0 : 2,
                    pointRadius: isFaded ? 3 : 10,
                    pointHoverRadius: isFaded ? 4 : 12,
                    tension: 0.2, 
                    spanGaps: true
                };
            });

            leagueChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: seasonsList,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleColor: '#34d399',
                            bodyColor: '#e2e8f0',
                            borderColor: '#334155',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            reverse: true,
                            min: 1,
                            max: 18,
                            ticks: {
                                stepSize: 1,
                                color: '#94a3b8',
                                font: { size: 10 }
                            },
                            grid: {
                                color: '#334155',
                                drawBorder: false
                            }
                        },
                        x: {
                            ticks: {
                                color: '#94a3b8',
                                font: { size: 10 }
                            },
                            grid: {
                                color: '#1e293b',
                                drawBorder: false
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }

        function openLeagueTeamModal(teamId = null) {
            if(teamId) {
                activeLeagueTeamId = teamId;
                const team = leagueHistoryData.find(t => t.id === teamId);
                document.getElementById('lt-modal-title').innerText = "Takımı Düzenle";
                document.getElementById('lt-name').value = team.name;
                document.getElementById('lt-color').value = team.color;
                document.getElementById('btn-delete-league-team').classList.remove('hidden');
            } else {
                activeLeagueTeamId = null;
                document.getElementById('lt-modal-title').innerText = "Lig Tarihine Takım Ekle";
                document.getElementById('lt-name').value = '';
                document.getElementById('lt-color').value = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                document.getElementById('btn-delete-league-team').classList.add('hidden');
            }

            const modal = document.getElementById('league-team-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeLeagueTeamModal() {
            document.getElementById('league-team-modal').classList.add('hidden');
            document.getElementById('league-team-modal').classList.remove('flex');
        }

        function saveLeagueTeam() {
            const name = document.getElementById('lt-name').value;
            const color = document.getElementById('lt-color').value;

            if (name && name.trim() !== '') {
                if(activeLeagueTeamId) {
                    const team = leagueHistoryData.find(t => t.id === activeLeagueTeamId);
                    team.name = name.trim();
                    team.color = color;
                } else {
                    leagueHistoryData.push({
                        id: 'lh_' + Date.now(),
                        name: name.trim(),
                        color: color,
                        history: {}
                    });
                }
                saveToLocalStorage();
                closeLeagueTeamModal();
                renderLeagueHistory();
            } else {
                alert("Lütfen takım adını girin!");
            }
        }
        
        function deleteLeagueTeam() {
            if(confirm("Bu takımı lig tarihinden kalıcı olarak silmek istediğinize emin misiniz?")) {
                leagueHistoryData = leagueHistoryData.filter(t => t.id !== activeLeagueTeamId);
                saveToLocalStorage();
                closeLeagueTeamModal();
                renderLeagueHistory();
            }
        }

        function openLeagueCellModal(teamId, season) {
            activeLeagueTeamId = teamId;
            activeLeagueSeason = season;
            
            const team = leagueHistoryData.find(t => t.id === teamId);
            const sData = team.history[season] || {};

            document.getElementById('lc-title').innerText = team.name;
            document.getElementById('lc-subtitle').innerText = `${season} Sezonu Verileri`;
            
            document.getElementById('lc-pts').value = sData.pts || '';
            document.getElementById('lc-rank').value = sData.rank || '';

            const modal = document.getElementById('league-cell-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeLeagueCellModal() {
            document.getElementById('league-cell-modal').classList.add('hidden');
            document.getElementById('league-cell-modal').classList.remove('flex');
        }

        function saveLeagueCell() {
            const team = leagueHistoryData.find(t => t.id === activeLeagueTeamId);
            if (!team.history) team.history = {};
            
            const ptsVal = document.getElementById('lc-pts').value;
            const rankVal = document.getElementById('lc-rank').value;

            team.history[activeLeagueSeason] = {
                pts: ptsVal,
                rank: rankVal
            };

            saveToLocalStorage();
            closeLeagueCellModal();
            renderLeagueHistory();
        }

        // --- TRANSFER PANELİ ---
        function formatCurrency(input) {
            let value = input.value.replace(/[^0-9]/g, '');
            if (value !== '') {
                value = parseInt(value, 10).toLocaleString('tr-TR');
                input.value = value;
            }
        }

        function renderTransferPanel() {
            let totalIn = 0;
            let totalOut = 0;

            transferData.in.forEach(t => totalIn += (t.fee || 0));
            transferData.out.forEach(t => totalOut += (t.fee || 0));

            let netBalance = totalOut - totalIn;
            let balanceColor = netBalance >= 0 ? 'text-emerald-400' : 'text-red-400';
            let balanceSign = netBalance >= 0 ? '+' : '';

            const getSortIcon = (type, field) => {
                if (transferSort[type].field === field) return transferSort[type].asc ? '<i class="fa-solid fa-chevron-up text-[10px] ml-1 opacity-100"></i>' : '<i class="fa-solid fa-chevron-down text-[10px] ml-1 opacity-100"></i>';
                return '<i class="fa-solid fa-sort text-[10px] ml-1 opacity-30 group-hover:opacity-100 transition-opacity"></i>';
            };

            const renderTransferList = (type) => {
                const tData = [...transferData[type]];
                const tSort = transferSort[type];

                tData.sort((a, b) => {
                    let valA = a[tSort.field]; let valB = b[tSort.field];
                    if(tSort.field === 'fee' || tSort.field === 'age' || tSort.field === 'ovr') {
                        valA = Number(valA || 0); valB = Number(valB || 0);
                    } else {
                        valA = (valA || '').toString().toLowerCase(); valB = (valB || '').toString().toLowerCase();
                    }
                    if (valA < valB) return tSort.asc ? -1 : 1;
                    if (valA > valB) return tSort.asc ? 1 : -1;
                    return 0;
                });

                let listHTML = '';
                if (tData.length === 0) {
                    listHTML = `<div class="text-center p-4 text-slate-500 text-sm">Kayıtlı transfer bulunmuyor.</div>`;
                } else {
                    tData.forEach(t => {
                        let photoHtml = t.photoUrl ? `<img src="${t.photoUrl}" class="w-8 h-8 rounded-full object-cover shadow-sm bg-slate-800">` : `<div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 font-bold text-xs shadow-sm">${t.name.charAt(0)}</div>`;
                        let feeText = t.fee > 0 ? `€${t.fee.toLocaleString('tr-TR')}` : 'Bedelsiz';
                        let feeColor = type === 'in' ? (t.fee > 0 ? 'text-red-400' : 'text-emerald-400') : (t.fee > 0 ? 'text-emerald-400' : 'text-slate-400');
                        
                        listHTML += `
                            <div class="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-lg border border-slate-700/50 transition-colors cursor-pointer group" onclick="openTransferModal('${type}', '${t.id}')">
                                ${photoHtml}
                                <div class="flex-1 min-w-0">
                                    <div class="flex justify-between items-start">
                                        <h4 class="font-bold text-white text-sm truncate">${t.name} <span class="text-[10px] text-slate-400 font-normal ml-1 border border-slate-600 rounded px-1">${t.season}</span></h4>
                                        <span class="font-bold text-sm ${feeColor} whitespace-nowrap">${feeText}</span>
                                    </div>
                                    <div class="flex justify-between items-end mt-1 text-[11px] text-slate-400">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold pos-${t.pos}">${t.pos}</span>
                                            <span>•</span>
                                            <span>${t.age} Yaş</span>
                                            <span>•</span>
                                            <span class="text-emerald-500 font-bold">${t.ovr} OVR</span>
                                        </div>
                                        <div class="truncate text-right max-w-[120px]" title="${t.team}">
                                            ${type === 'in' ? '<i class="fa-solid fa-arrow-right-to-bracket text-emerald-500 mr-1"></i>' : '<i class="fa-solid fa-arrow-right-from-bracket text-red-500 mr-1"></i>'}
                                            ${t.team || 'Bilinmiyor'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                }
                return listHTML;
            };

            let html = `
                <div class="w-full max-w-5xl mx-auto flex flex-col h-full overflow-hidden">
                    <!-- Bilanço Kartı -->
                    <div class="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6 mb-4 shadow-lg shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 class="text-2xl font-black text-white tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-money-bill-transfer text-emerald-500"></i>
                                TRANSFER PANELİ
                            </h3>
                            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gelen ve Giden Oyuncu Bilançosu</p>
                        </div>
                        <div class="flex gap-4 sm:gap-8 items-center bg-slate-950 px-6 py-3 rounded-xl border border-slate-800">
                            <div class="text-center">
                                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Gider</div>
                                <div class="text-lg font-black text-red-500">€${totalIn.toLocaleString('tr-TR')}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Gelir</div>
                                <div class="text-lg font-black text-emerald-500">€${totalOut.toLocaleString('tr-TR')}</div>
                            </div>
                            <div class="w-px h-10 bg-slate-700"></div>
                            <div class="text-center">
                                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Net Bilanço</div>
                                <div class="text-2xl font-black ${balanceColor}">${balanceSign}€${netBalance.toLocaleString('tr-TR')}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Transfer Listeleri -->
                    <div class="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden">
                        
                        <!-- Gelenler -->
                        <div class="flex-1 flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg min-h-0 relative">
                            <div class="bg-emerald-900/30 border-b border-emerald-800 p-3 shrink-0 flex justify-between items-center">
                                <h4 class="font-bold text-emerald-400 flex items-center gap-2">
                                    <i class="fa-solid fa-arrow-down text-sm"></i> GELENLER
                                </h4>
                                <div class="flex gap-1">
                                    <button onclick="sortTransfers('in', 'season')" class="text-emerald-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Sezona Göre Sırala">
                                        <i class="fa-solid fa-calendar-days text-sm"></i>${getSortIcon('in', 'season')}
                                    </button>
                                    <button onclick="sortTransfers('in', 'name')" class="text-emerald-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="İsme Göre Sırala">
                                        <i class="fa-solid fa-font text-sm"></i>${getSortIcon('in', 'name')}
                                    </button>
                                    <button onclick="sortTransfers('in', 'pos')" class="text-emerald-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Mevkiye Göre Sırala">
                                        <i class="fa-solid fa-street-view text-sm"></i>${getSortIcon('in', 'pos')}
                                    </button>
                                    <button onclick="sortTransfers('in', 'ovr')" class="text-emerald-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="OVR'a Göre Sırala">
                                        <i class="fa-solid fa-star text-sm"></i>${getSortIcon('in', 'ovr')}
                                    </button>
                                    <button onclick="sortTransfers('in', 'fee')" class="text-emerald-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Bedele Göre Sırala">
                                        <i class="fa-solid fa-sack-dollar text-sm"></i>${getSortIcon('in', 'fee')}
                                    </button>
                                    <button onclick="openTransferModal('in')" class="ml-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-bold shadow transition-colors">
                                        <i class="fa-solid fa-plus"></i> EKLE
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto p-3 space-y-2 hide-scrollbar">
                                ${renderTransferList('in')}
                            </div>
                        </div>

                        <!-- Gidenler -->
                        <div class="flex-1 flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg min-h-0 relative">
                            <div class="bg-red-900/30 border-b border-red-800 p-3 shrink-0 flex justify-between items-center">
                                <h4 class="font-bold text-red-400 flex items-center gap-2">
                                    <i class="fa-solid fa-arrow-up text-sm"></i> GİDENLER
                                </h4>
                                <div class="flex gap-1">
                                    <button onclick="sortTransfers('out', 'season')" class="text-red-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Sezona Göre Sırala">
                                        <i class="fa-solid fa-calendar-days text-sm"></i>${getSortIcon('out', 'season')}
                                    </button>
                                    <button onclick="sortTransfers('out', 'name')" class="text-red-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="İsme Göre Sırala">
                                        <i class="fa-solid fa-font text-sm"></i>${getSortIcon('out', 'name')}
                                    </button>
                                    <button onclick="sortTransfers('out', 'pos')" class="text-red-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Mevkiye Göre Sırala">
                                        <i class="fa-solid fa-street-view text-sm"></i>${getSortIcon('out', 'pos')}
                                    </button>
                                    <button onclick="sortTransfers('out', 'ovr')" class="text-red-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="OVR'a Göre Sırala">
                                        <i class="fa-solid fa-star text-sm"></i>${getSortIcon('out', 'ovr')}
                                    </button>
                                    <button onclick="sortTransfers('out', 'fee')" class="text-red-400 hover:text-white p-1.5 rounded transition-colors group flex items-center" title="Bedele Göre Sırala">
                                        <i class="fa-solid fa-sack-dollar text-sm"></i>${getSortIcon('out', 'fee')}
                                    </button>
                                    <button onclick="openTransferModal('out')" class="ml-2 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs font-bold shadow transition-colors">
                                        <i class="fa-solid fa-plus"></i> EKLE
                                    </button>
                                </div>
                            </div>
                            <div class="flex-1 overflow-y-auto p-3 space-y-2 hide-scrollbar">
                                ${renderTransferList('out')}
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;
            updateContentArea(html);
        }

        function sortTransfers(type, field) {
            if(transferSort[type].field === field) {
                transferSort[type].asc = !transferSort[type].asc;
            } else {
                transferSort[type].field = field;
                transferSort[type].asc = (field === 'fee' || field === 'ovr') ? false : true; 
            }
            renderTransferPanel();
        }

        function openTransferModal(type, id = null) {
            activeTransferType = type;
            activeTransferId = id;
            
            const seasonSelect = document.getElementById('tr-season');
            seasonSelect.innerHTML = seasonsList.map(s => `<option value="${s}">${s}</option>`).join('');

            const modalTitle = document.getElementById('tr-modal-title');
            const teamLabel = document.getElementById('tr-team-label');
            const deleteBtn = document.getElementById('btn-delete-transfer');

            modalTitle.innerText = id ? "Transferi Düzenle" : (type === 'in' ? "Gelen Transfer Ekle" : "Giden Transfer Ekle");
            teamLabel.innerText = type === 'in' ? "Geldiği Takım" : "Gittiği Takım";

            if(id) {
                const t = transferData[type].find(x => x.id === id);
                seasonSelect.value = t.season;
                document.getElementById('tr-name').value = t.name;
                document.getElementById('tr-pos').value = t.pos;
                document.getElementById('tr-age').value = t.age;
                document.getElementById('tr-ovr').value = t.ovr;
                document.getElementById('tr-team').value = t.team;
                document.getElementById('tr-fee').value = t.fee > 0 ? t.fee.toLocaleString('tr-TR') : '';
                deleteBtn.classList.remove('hidden');
            } else {
                seasonSelect.value = seasonsList[seasonsList.length - 1];
                document.getElementById('tr-name').value = '';
                document.getElementById('tr-pos').value = 'CM';
                document.getElementById('tr-age').value = '';
                document.getElementById('tr-ovr').value = '';
                document.getElementById('tr-team').value = '';
                document.getElementById('tr-fee').value = '';
                deleteBtn.classList.add('hidden');
            }

            const modal = document.getElementById('transfer-editor-modal', 'fixture-match-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeTransferModal() {
            document.getElementById('transfer-editor-modal', 'fixture-match-modal').classList.add('hidden');
            document.getElementById('transfer-editor-modal', 'fixture-match-modal').classList.remove('flex');
        }

        function saveTransfer() {
            const season = document.getElementById('tr-season').value;
            const name = document.getElementById('tr-name').value.trim();
            const pos = document.getElementById('tr-pos').value;
            const age = document.getElementById('tr-age').value;
            const ovr = document.getElementById('tr-ovr').value;
            const team = document.getElementById('tr-team').value.trim();
            const feeStr = document.getElementById('tr-fee').value.replace(/[^0-9]/g, '');
            const fee = feeStr ? parseInt(feeStr, 10) : 0;

            if(!name) { alert("Oyuncu adı zorunludur!"); return; }

            let photoUrl = '';
            let allSquadPlayers = [...squadData.astakim, ...squadData.akademi];
            let p = allSquadPlayers.find(pl => pl.name.toLowerCase() === name.toLowerCase());
            if(p) photoUrl = p.photoUrl;

            if (activeTransferId) {
                let tr = transferData[activeTransferType].find(x => x.id === activeTransferId);
                tr.season = season;
                tr.name = name;
                tr.pos = pos;
                tr.age = age;
                tr.ovr = ovr;
                tr.team = team;
                tr.fee = fee;
                tr.photoUrl = photoUrl || tr.photoUrl; 
            } else {
                transferData[activeTransferType].push({
                    id: 'tr_' + Date.now(),
                    season, name, pos, age, ovr, team, fee, photoUrl
                });
            }
            
            saveToLocalStorage();
            closeTransferModal();
            renderTransferPanel();
        }

        function deleteTransfer() {
            if(confirm("Bu transfer kaydını silmek istediğinize emin misiniz?")) {
                transferData[activeTransferType] = transferData[activeTransferType].filter(x => x.id !== activeTransferId);
                saveToLocalStorage();
                closeTransferModal();
                renderTransferPanel();
            }
        }

        // --- GOL VE ASİST PANELİ ---
        function toggleStatsExpand(context, season) {
            if (!statExpanded[context]) statExpanded[context] = {};
            statExpanded[context][season] = !statExpanded[context][season];
            renderStatsPanel();
        }

        function sortStats(context, field) {
            if (statSort[context].field === field) {
                statSort[context].asc = !statSort[context].asc;
            } else {
                statSort[context].field = field;
                statSort[context].asc = (field === 'name' || field === 'pos' || field === 'countryCode') ? true : false;
            }
            renderStatsPanel();
        }

        function getStatsData(context) {
            let playersMap = {};
            let seasonsData = {}; // { "25/26": ["Süper Lig", "Türkiye Kupası"] }

            seasonsList.forEach(season => {
                const seasonMatches = matchDataStore[context]?.[season] || {};
                const tournaments = new Set();

                const processScorer = (name, tName) => {
                    if(!name) return;
                    let s = name.trim();
                    if(!playersMap[s]) playersMap[s] = { name: s, overallGoals: 0, overallAssists: 0, seasons: {} };
                    if(!playersMap[s].seasons[season]) playersMap[s].seasons[season] = { totalGoals: 0, totalAssists: 0, tournaments: {} };
                    if(!playersMap[s].seasons[season].tournaments[tName]) playersMap[s].seasons[season].tournaments[tName] = { goals: 0, assists: 0 };
                    
                    playersMap[s].overallGoals++;
                    playersMap[s].seasons[season].totalGoals++;
                    playersMap[s].seasons[season].tournaments[tName].goals++;
                };

                const processAssist = (name, tName) => {
                    if(!name) return;
                    let a = name.trim();
                    if(!playersMap[a]) playersMap[a] = { name: a, overallGoals: 0, overallAssists: 0, seasons: {} };
                    if(!playersMap[a].seasons[season]) playersMap[a].seasons[season] = { totalGoals: 0, totalAssists: 0, tournaments: {} };
                    if(!playersMap[a].seasons[season].tournaments[tName]) playersMap[a].seasons[season].tournaments[tName] = { goals: 0, assists: 0 };
                    
                    playersMap[a].overallAssists++;
                    playersMap[a].seasons[season].totalAssists++;
                    playersMap[a].seasons[season].tournaments[tName].assists++;
                };

                Object.values(seasonMatches).forEach(matches => {
                    matches.forEach(m => {
                        if (!m || m.tournament === 'Pre-Season Friendly' || m.tournament === 'Sezon Öncesi Hazırlık') return;
                        const tName = m.tournament || 'Diğer';
                        tournaments.add(tName);
                        
                        if (m.events && m.events.length > 0) {
                            m.events.forEach(ev => {
                                if (ev.type === 'US') {
                                    processScorer(ev.scorer, tName);
                                    processAssist(ev.assist, tName);
                                }
                            });
                        } else {
                            if(m.goals) m.goals.forEach(g => processScorer(g, tName));
                            if(m.assists) m.assists.forEach(a => processAssist(a, tName));
                        }
                    });
                });
                
                seasonsData[season] = Array.from(tournaments).sort();
            });

            let allSquadPlayers = [...squadData.astakim, ...squadData.akademi];
            let stats = Object.values(playersMap).map(p => {
                let squadP = allSquadPlayers.find(sp => sp.name.toLowerCase() === p.name.toLowerCase());
                if (squadP) {
                    p.pos = squadP.pos;
                    p.photoUrl = squadP.photoUrl;
                    p.countryCode = squadP.countryCode;
                } else {
                    p.pos = 'UNK';
                    p.photoUrl = '';
                    p.countryCode = '';
                }
                return p;
            });

            return { stats, seasonsData };
        }

        function renderStatsPanel() {
            const kulupData = getStatsData('kulup');
            const milliData = getStatsData('milli');

            let html = `
                <div class="w-full flex justify-between items-center mb-4 px-2 shrink-0">
                    <h3 class="text-2xl font-bold text-white"><i class="fa-solid fa-chart-simple text-emerald-500 mr-2"></i>Tüm Zamanlar Gol ve Asist Krallığı</h3>
                    <div class="text-sm text-slate-400 font-bold hidden sm:block"><i class="fa-solid fa-circle-info mr-1"></i>Sütun başlıklarındaki oklara tıklayarak ilgili sezondaki turnuvalara göz atabilirsiniz.</div>
                </div>
                <div class="w-full flex-1 flex flex-col xl:flex-row gap-4 overflow-hidden px-2">
                    ${renderStatTableHTML('kulup', 'Kulüp İstatistikleri', kulupData.stats, kulupData.seasonsData, statSort.kulup)}
                    ${renderStatTableHTML('milli', 'Milli Takım İstatistikleri', milliData.stats, milliData.seasonsData, statSort.milli)}
                </div>
            `;
            updateContentArea(html);
        }

        function renderStatTableHTML(context, title, players, seasonsData, sortInfo) {
            const isKulup = context === 'kulup';
            if(!statExpanded[context]) statExpanded[context] = {};
            
            // Sıralama Algoritması
            players.sort((a, b) => {
                let valA = 0, valB = 0;
                let f = sortInfo.field;
                if (f === 'name' || f === 'pos' || f === 'countryCode') {
                    valA = (a[f] || '').toString().toLowerCase();
                    valB = (b[f] || '').toString().toLowerCase();
                } else if (f === 'overall_goals') {
                    valA = a.overallGoals; valB = b.overallGoals;
                } else if (f === 'overall_assists') {
                    valA = a.overallAssists; valB = b.overallAssists;
                } else if (f.startsWith('s_')) {
                    let parts = f.split('_'); let s = parts[1]; let type = parts[2];
                    valA = a.seasons[s] ? a.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                    valB = b.seasons[s] ? b.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                } else if (f.startsWith('t_')) {
                    let parts = f.split('_'); let s = parts[1]; let t = parts[2]; let type = parts[3];
                    valA = a.seasons[s] && a.seasons[s].tournaments[t] ? a.seasons[s].tournaments[t][type] : 0;
                    valB = b.seasons[s] && b.seasons[s].tournaments[t] ? b.seasons[s].tournaments[t][type] : 0;
                }
                
                if (valA < valB) return sortInfo.asc ? -1 : 1;
                if (valA > valB) return sortInfo.asc ? 1 : -1;
                return 0;
            });

            const getSortIcon = (field) => {
                if (sortInfo.field === field) return sortInfo.asc ? '<i class="fa-solid fa-chevron-up text-[10px] ml-1 text-emerald-400"></i>' : '<i class="fa-solid fa-chevron-down text-[10px] ml-1 text-emerald-400"></i>';
                return '<i class="fa-solid fa-sort text-[10px] ml-1 opacity-30 group-hover/th:opacity-100 transition-opacity"></i>';
            };

            // Sol sabit (sticky) sütunların yatay koordinat hesaplamaları
            const wNo = 40, wPos = 60, wName = 200, wCountry = 60;
            const lPos = wNo, lName = wNo + wPos, lCountry = wNo + wPos + wName;

            let th1 = `
                <tr>
                    <th rowspan="2" class="p-2 border-r border-b border-slate-700 bg-slate-950 z-[20] text-center text-slate-500 sticky" style="left: 0px; width: ${wNo}px; min-width: ${wNo}px; max-width: ${wNo}px;">#</th>
                    <th rowspan="2" class="p-2 border-r border-b border-slate-700 bg-slate-950 z-[20] cursor-pointer hover:text-white transition-colors sticky group/th" style="left: ${lPos}px; width: ${wPos}px; min-width: ${wPos}px; max-width: ${wPos}px;" onclick="sortStats('${context}', 'pos')">Mevki ${getSortIcon('pos')}</th>
                    <th rowspan="2" class="p-2 border-r border-b border-slate-700 bg-slate-950 z-[20] cursor-pointer hover:text-white transition-colors text-left sticky group/th" style="left: ${lName}px; width: ${wName}px; min-width: ${wName}px; max-width: ${wName}px;" onclick="sortStats('${context}', 'name')">Oyuncu ${getSortIcon('name')}</th>
                    ${isKulup ? `<th rowspan="2" class="p-2 border-r border-b border-slate-700 bg-slate-950 z-[20] cursor-pointer hover:text-white transition-colors text-center sticky group/th" style="left: ${lCountry}px; width: ${wCountry}px; min-width: ${wCountry}px; max-width: ${wCountry}px;" onclick="sortStats('${context}', 'countryCode')">Ülke ${getSortIcon('countryCode')}</th>` : ''}
            `;
            
            let th2 = `<tr>`;

            seasonsList.forEach(season => {
                const isExp = statExpanded[context][season];
                const tours = seasonsData[season] || [];
                const colspan = isExp ? 2 + (tours.length * 2) : 2;
                
                th1 += `
                    <th colspan="${colspan}" class="p-2 border-r border-b ${isExp ? 'border-slate-700' : 'border-slate-500 border-r-2'} bg-slate-900 text-emerald-400">
                        <div class="flex items-center justify-center gap-2">
                            <span>${season}</span>
                            <button onclick="toggleStatsExpand('${context}', '${season}')" class="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1 px-2 rounded border border-slate-700 hover:border-emerald-500" title="${isExp ? 'Daralt' : 'Turnuva Detayları'}">
                                <i class="fa-solid ${isExp ? 'fa-angles-left' : 'fa-angles-right'} text-xs"></i>
                            </button>
                        </div>
                    </th>
                `;

                th2 += `<th class="p-2 border-r border-b border-slate-700 bg-slate-800 text-[10px] cursor-pointer hover:text-white text-green-400 group/th" onclick="sortStats('${context}', 's_${season}_goals')">G ${getSortIcon('s_'+season+'_goals')}</th>`;
                th2 += `<th class="p-2 border-r border-b ${isExp ? 'border-slate-700' : 'border-slate-500 border-r-2'} bg-slate-800 text-[10px] cursor-pointer hover:text-white text-blue-400 group/th" onclick="sortStats('${context}', 's_${season}_assists')">A ${getSortIcon('s_'+season+'_assists')}</th>`;
                
                if (isExp) {
                    tours.forEach((t, i) => {
                        const isLast = (i === tours.length - 1);
                        th2 += `<th class="p-2 border-r border-b border-slate-700 bg-slate-900 text-[9px] cursor-pointer hover:text-white text-green-400/80 group/th" onclick="sortStats('${context}', 't_${season}_${t}_goals')"><div class="max-w-[70px] truncate mx-auto" title="${t}">${t}</div>G ${getSortIcon('t_'+season+'_'+t+'_goals')}</th>`;
                        th2 += `<th class="p-2 border-r border-b ${isLast ? 'border-slate-500 border-r-2' : 'border-slate-700'} bg-slate-900 text-[9px] cursor-pointer hover:text-white text-blue-400/80 group/th" onclick="sortStats('${context}', 't_${season}_${t}_assists')"><div class="max-w-[70px] truncate mx-auto" title="${t}">${t}</div>A ${getSortIcon('t_'+season+'_'+t+'_assists')}</th>`;
                    });
                }
            });

            // Genel Toplam Sütunları
            th1 += `<th colspan="2" class="p-2 border-b border-slate-700 bg-emerald-900/30 text-emerald-400">GENEL TOPLAM</th></tr>`;
            th2 += `<th class="p-2 border-r border-b border-slate-700 bg-emerald-900/20 text-[10px] cursor-pointer hover:text-white text-green-400 group/th" onclick="sortStats('${context}', 'overall_goals')">G ${getSortIcon('overall_goals')}</th>`;
            th2 += `<th class="p-2 border-b border-slate-700 bg-emerald-900/20 text-[10px] cursor-pointer hover:text-white text-blue-400 group/th" onclick="sortStats('${context}', 'overall_assists')">A ${getSortIcon('overall_assists')}</th></tr>`;

            let rowsHTML = '';
            let sums = { overallGoals: 0, overallAssists: 0, seasons: {} };

            if(players.length === 0) {
                rowsHTML = `<tr><td colspan="100%" class="text-center p-8 text-slate-500">Resmi bir gol veya asist verisi bulunmuyor.</td></tr>`;
            } else {
                players.forEach((p, idx) => {
                    sums.overallGoals += p.overallGoals;
                    sums.overallAssists += p.overallAssists;
                    
                    let photoHtml = p.photoUrl ? `<img src="${p.photoUrl}" class="w-7 h-7 rounded-full inline-block mr-2 object-cover bg-slate-800 shadow-sm border border-slate-700">` : `<div class="w-7 h-7 rounded-full inline-flex items-center justify-center bg-slate-700 border border-slate-600 shadow-sm text-xs font-bold mr-2">${p.name.charAt(0)}</div>`;
                    let flagHtml = p.countryCode ? `<img src="https://flagcdn.com/24x18/${p.countryCode.toLowerCase()}.png" class="w-5 h-auto mx-auto shadow-sm rounded-sm">` : '-';
                    
                    rowsHTML += `<tr class="hover:bg-slate-800/80 transition-colors group">`;
                    // Sticky columns setup
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center text-slate-500 font-bold bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: 0px; width: ${wNo}px; min-width: ${wNo}px; max-width: ${wNo}px;">${idx + 1}</td>`;
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center pos-${p.pos} font-black text-xs bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: ${lPos}px; width: ${wPos}px; min-width: ${wPos}px; max-width: ${wPos}px;">${p.pos === 'UNK' ? '-' : p.pos}</td>`;
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-left font-bold text-sm flex items-center bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: ${lName}px; width: ${wName}px; min-width: ${wName}px; max-width: ${wName}px;">${photoHtml}<span class="truncate">${p.name}</span></td>`;
                    if (isKulup) {
                        rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: ${lCountry}px; width: ${wCountry}px; min-width: ${wCountry}px; max-width: ${wCountry}px;">${flagHtml}</td>`;
                    }
                    
                    seasonsList.forEach(season => {
                        if(!sums.seasons[season]) sums.seasons[season] = { goals: 0, assists: 0, tours: {} };
                        const isExp = statExpanded[context][season];
                        const tours = seasonsData[season] || [];
                        const pSeason = p.seasons[season] || { totalGoals: 0, totalAssists: 0, tournaments: {} };
                        
                        sums.seasons[season].goals += pSeason.totalGoals;
                        sums.seasons[season].assists += pSeason.totalAssists;
                        
                        rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center font-bold text-green-400 bg-green-900/10">${pSeason.totalGoals || '-'}</td>`;
                        rowsHTML += `<td class="p-2 border-r border-b ${isExp ? 'border-slate-700/50' : 'border-slate-500 border-r-2'} text-center font-bold text-blue-400 bg-blue-900/10">${pSeason.totalAssists || '-'}</td>`;
                        
                        if (isExp) {
                            tours.forEach((t, i) => {
                                const isLast = (i === tours.length - 1);
                                if(!sums.seasons[season].tours[t]) sums.seasons[season].tours[t] = { goals: 0, assists: 0 };
                                
                                const tGoals = pSeason.tournaments[t] ? pSeason.tournaments[t].goals : 0;
                                const tAssists = pSeason.tournaments[t] ? pSeason.tournaments[t].assists : 0;
                                
                                sums.seasons[season].tours[t].goals += tGoals;
                                sums.seasons[season].tours[t].assists += tAssists;
                                
                                rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center text-green-400/80 bg-green-900/5 hover:bg-green-900/30 transition-colors">${tGoals || '-'}</td>`;
                                rowsHTML += `<td class="p-2 border-b border-r ${isLast ? 'border-slate-500 border-r-2' : 'border-slate-700/50'} text-center text-blue-400/80 bg-blue-900/5 hover:bg-blue-900/30 transition-colors">${tAssists || '-'}</td>`;
                            });
                        }
                    });
                    
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center font-black text-green-500 bg-emerald-900/20">${p.overallGoals}</td>`;
                    rowsHTML += `<td class="p-2 border-b border-slate-700/50 text-center font-black text-blue-500 bg-emerald-900/20">${p.overallAssists}</td>`;
                    rowsHTML += `</tr>`;
                });
            }

            // Footer (Genel Toplamlar)
            let footerHTML = `
                <tr class="bg-slate-950 font-black shadow-[0_-4px_6px_rgba(0,0,0,0.3)]">
                    <td class="p-3 border-r border-slate-700 sticky left-0 z-[20] bg-slate-950" style="left: 0px; width: ${wNo}px;"></td>
                    <td class="p-3 border-r border-slate-700 sticky bg-slate-950 z-[20]" style="left: ${lPos}px; width: ${wPos}px;"></td>
                    <td class="p-3 border-r border-slate-700 sticky bg-slate-950 text-right text-emerald-500 tracking-widest uppercase z-[20]" style="left: ${lName}px; width: ${wName}px;">TOPLAM</td>
                    ${isKulup ? `<td class="p-3 border-r border-slate-700 sticky bg-slate-950 z-[20]" style="left: ${lCountry}px; width: ${wCountry}px;"></td>` : ''}
            `;

            seasonsList.forEach(season => {
                const isExp = statExpanded[context][season];
                const tours = seasonsData[season] || [];
                const sumS = sums.seasons[season] || { goals: 0, assists: 0, tours: {} };
                
                footerHTML += `<td class="p-3 border-r border-slate-700 text-center text-green-500 text-lg bg-slate-900">${sumS.goals}</td>`;
                footerHTML += `<td class="p-3 border-r ${isExp ? 'border-slate-700' : 'border-slate-500 border-r-2'} text-center text-blue-500 text-lg bg-slate-900">${sumS.assists}</td>`;
                
                if (isExp) {
                    tours.forEach((t, i) => {
                        const isLast = (i === tours.length - 1);
                        const tGoals = sumS.tours[t] ? sumS.tours[t].goals : 0;
                        const tAssists = sumS.tours[t] ? sumS.tours[t].assists : 0;
                        
                        footerHTML += `<td class="p-3 border-r border-slate-700 text-center text-green-500/80 bg-slate-900">${tGoals}</td>`;
                        footerHTML += `<td class="p-3 border-r ${isLast ? 'border-slate-500 border-r-2' : 'border-slate-700'} text-center text-blue-500/80 bg-slate-900">${tAssists}</td>`;
                    });
                }
            });

            footerHTML += `<td class="p-3 border-r border-slate-700 text-center text-green-400 text-xl bg-emerald-950">${sums.overallGoals}</td>`;
            footerHTML += `<td class="p-3 border-slate-700 text-center text-blue-400 text-xl bg-emerald-950">${sums.overallAssists}</td>`;
            footerHTML += `</tr>`;

            return `
                <div class="flex-1 bg-slate-900 border border-slate-700 rounded-xl flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] h-full">
                    <div class="p-3 bg-slate-950 border-b border-slate-700 flex justify-between items-center shrink-0">
                        <h4 class="font-bold text-white text-base md:text-lg flex items-center gap-2">
                            ${isKulup ? '<i class="fa-solid fa-shield-halved text-emerald-500"></i>' : '<i class="fa-solid fa-flag text-red-500"></i>'}
                            ${title}
                        </h4>
                    </div>
                    <div class="flex-1 overflow-auto table-scroll relative">
                        <table class="w-max border-collapse text-sm">
                            <thead class="text-slate-400 text-[11px] uppercase tracking-wider">
                                ${th1}
                                ${th2}
                            </thead>
                            <tbody>
                                ${rowsHTML}
                            </tbody>
                            <tfoot class="sticky bottom-0 z-[40]">
                                ${footerHTML}
                            </tfoot>
                        </table>
                    </div>
                </div>
            `;
        }


        // =====================================================================
        // --- FİKSTÜR PANELİ ---
        // =====================================================================

        let fixtureEventsTemp = [];

        const allTournamentOptions = [
            "Süper Lig", "Türkiye Kupası", "Türkiye Süper Kupası",
            "Şampiyonlar Ligi", "Avrupa Ligi", "Konferans Ligi",
            "UEFA Süper Kupa", "Pre-Season Friendly",
            "Dünya Kupası", "Avrupa Şampiyonası", "Dostluk Maçı"
        ];

        function getFixtureTournaments() {
            const custom = new Set();
            Object.values(fixtureData).forEach(matches => {
                matches.forEach(m => { if (m.tournament) custom.add(m.tournament); });
            });
            return [...new Set([...allTournamentOptions, ...custom])].sort();
        }

        function getFixtureResultBadge(match) {
            const hs = parseInt(match.homeScore);
            const as = parseInt(match.awayScore);
            const teamName = managedTeams.kulup.name || '';
            if (isNaN(hs) || isNaN(as)) return '<span class="text-slate-500 text-xs font-bold px-2 py-0.5 rounded bg-slate-700">-</span>';
            const isHome = match.home === teamName;
            const isAway = match.away === teamName;
            let result = '';
            if (isHome) result = hs > as ? 'W' : hs < as ? 'L' : 'D';
            else if (isAway) result = as > hs ? 'W' : as < hs ? 'L' : 'D';
            else result = 'N'; // neither team matches (neutral display)
            const map = { W: 'bg-green-600 text-white', D: 'bg-orange-500 text-white', L: 'bg-red-600 text-white', N: 'bg-slate-600 text-white' };
            const lbl = { W: 'G', D: 'B', L: 'M', N: '-' };
            return `<span class="text-xs font-black px-2 py-0.5 rounded ${map[result]}">${lbl[result]}</span>`;
        }

        function getGroundLabel(g) {
            return g === 'home' ? '<span class="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 px-1.5 py-0.5 rounded">İÇ</span>'
                 : g === 'away' ? '<span class="text-[10px] font-bold text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded">DEP</span>'
                 : '<span class="text-[10px] font-bold text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">TAR</span>';
        }

        function renderFixturePanel() {
            updateMockPlayers();

            // If no active season, default to last
            if (!activeFixtureSeason || !seasonsList.includes(activeFixtureSeason)) {
                activeFixtureSeason = seasonsList[seasonsList.length - 1];
            }

            const matches = fixtureData[activeFixtureSeason] || [];
            const tours = getFixtureTournaments();

            // Filter
            const filterTour = fixtureFilter.tournament || '';
            let filtered = filterTour ? matches.filter(m => m.tournament === filterTour) : matches;

            // Stats summary
            let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
            const teamName = managedTeams.kulup.name || '';
            filtered.forEach(m => {
                const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
                if (!isNaN(hs) && !isNaN(as)) {
                    const isHome = m.home === teamName;
                    const isAway = m.away === teamName;
                    if (isHome)      { gf += hs; ga += as; hs > as ? wins++ : hs < as ? losses++ : draws++; }
                    else if (isAway) { gf += as; ga += hs; as > hs ? wins++ : as < hs ? losses++ : draws++; }
                }
            });
            const played = wins + draws + losses;
            const pts = wins * 3 + draws;

            // Season tabs
            const seasonTabsHtml = seasonsList.map(s => `
                <button onclick="switchFixtureSeason('${s}')"
                    class="px-4 py-1.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap
                           ${s === activeFixtureSeason ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-white'}">
                    ${s}
                </button>
            `).join('');

            // Tournament filter pills
            const filterHtml = `
                <button onclick="setFixtureFilter('')"
                    class="px-3 py-1 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                           ${!filterTour ? 'bg-slate-500 text-white border-slate-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                    Tümü (${matches.length})
                </button>
                ${[...new Set(matches.map(m => m.tournament).filter(Boolean))].map(t => {
                    const cnt = matches.filter(m => m.tournament === t).length;
                    const safeTour = t.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
                    return `<button onclick="setFixtureFilter('${safeTour}')"
                        class="px-3 py-1 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                               ${filterTour === t ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                        ${t} (${cnt})
                    </button>`;
                }).join('')}
            `;

            // Match rows
            let matchRowsHtml = '';
            if (filtered.length === 0) {
                matchRowsHtml = `
                    <tr>
                        <td colspan="8" class="p-10 text-center text-slate-500">
                            <i class="fa-solid fa-calendar-xmark text-3xl mb-3 block text-slate-700"></i>
                            Bu sezon için henüz maç kaydı bulunmuyor.<br>
                            <span class="text-xs mt-1 block">Sağ üstteki "+ Maç Ekle" butonuyla başlayın.</span>
                        </td>
                    </tr>`;
            } else {
                // Sort by date
                const sorted = [...filtered].sort((a, b) => {
                    if (!a.date && !b.date) return 0;
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return a.date.localeCompare(b.date);
                });
                sorted.forEach((m, idx) => {
                    const dateStr = m.date ? new Date(m.date).toLocaleDateString('tr-TR', { day:'2-digit', month:'short', year:'2-digit' }) : '-';
                    const hsDisplay = m.homeScore !== '' && m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : '-';
                    const asDisplay = m.awayScore !== '' && m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : '-';
                    const scoreClass = (hsDisplay === '-' || asDisplay === '-') ? 'text-slate-500' : 'text-white';

                    // Goal scorers from events
                    let scorersList = '';
                    if (m.events && m.events.length > 0) {
                        const ourGoals = m.events.filter(ev => ev.type === 'US');
                        if (ourGoals.length) {
                            scorersList = ourGoals.map(ev => {
                                const min = ev.min ? `${ev.min}'` : '';
                                const ast = ev.assist ? ` <span class="text-blue-400/70">(${ev.assist})</span>` : '';
                                return `<span class="text-green-400/80 text-[10px]">⚽ ${min} ${ev.scorer}${ast}</span>`;
                            }).join(' ');
                        }
                    }

                    matchRowsHtml += `
                        <tr class="hover:bg-slate-800/60 transition-colors group cursor-pointer border-b border-slate-700/40" onclick="openFixtureModal('${activeFixtureSeason}', '${m.id}')">
                            <td class="p-3 text-slate-400 text-xs font-mono whitespace-nowrap">${dateStr}</td>
                            <td class="p-3">${getGroundLabel(m.ground)}</td>
                            <td class="p-3 text-xs text-slate-400 font-medium max-w-[120px] truncate" title="${m.tournament || ''}">${m.tournament || '-'}</td>
                            <td class="p-3 text-right font-bold text-white text-sm">${m.home || '-'}</td>
                            <td class="p-3 text-center">
                                <span class="inline-flex items-center justify-center gap-1.5 font-black text-lg ${scoreClass} bg-slate-950 rounded-lg px-3 py-1 border border-slate-700 min-w-[70px]">
                                    ${hsDisplay}<span class="text-slate-600 font-normal text-sm">:</span>${asDisplay}
                                </span>
                            </td>
                            <td class="p-3 font-bold text-white text-sm">${m.away || '-'}</td>
                            <td class="p-3 text-center">${getFixtureResultBadge(m)}</td>
                            <td class="p-3 text-[10px] text-slate-500 max-w-[200px]">${scorersList}</td>
                        </tr>`;
                });
            }

            const html = `
                <div class="w-full flex flex-col h-full min-h-0 overflow-hidden">
                    <!-- Header -->
                    <div class="flex flex-wrap justify-between items-center mb-3 gap-3 px-1 shrink-0">
                        <div>
                            <h3 class="text-2xl font-bold text-white flex items-center gap-2">
                                <i class="fa-solid fa-calendar-days text-emerald-500"></i>
                                Fikstür & Maç Listesi
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Sezon bazlı maç kayıtları, sonuçlar ve istatistikler</p>
                        </div>
                        <button onclick="openFixtureModal('${activeFixtureSeason}', null)"
                            class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors shadow-lg flex items-center gap-2">
                            <i class="fa-solid fa-plus"></i> Maç Ekle
                        </button>
                    </div>

                    <!-- Season Tabs -->
                    <div class="flex gap-2 mb-3 overflow-x-auto hide-scrollbar shrink-0 pb-1">
                        ${seasonTabsHtml}
                    </div>

                    <!-- Stats Summary Bar -->
                    ${played > 0 ? `
                    <div class="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-3 shrink-0">
                        <div class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Oynanan</div>
                            <div class="text-xl font-black text-white">${played}</div>
                        </div>
                        <div class="bg-slate-900 border border-green-900/50 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-green-500 font-bold uppercase tracking-widest">Galibiyet</div>
                            <div class="text-xl font-black text-green-400">${wins}</div>
                        </div>
                        <div class="bg-slate-900 border border-orange-900/50 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Beraberlik</div>
                            <div class="text-xl font-black text-orange-400">${draws}</div>
                        </div>
                        <div class="bg-slate-900 border border-red-900/50 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-red-500 font-bold uppercase tracking-widest">Mağlubiyet</div>
                            <div class="text-xl font-black text-red-400">${losses}</div>
                        </div>
                        <div class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gol (A/Y)</div>
                            <div class="text-xl font-black text-white">${gf}<span class="text-slate-500 font-normal text-sm">/${ga}</span></div>
                        </div>
                        <div class="bg-slate-900 border border-emerald-900/50 rounded-lg p-2 text-center">
                            <div class="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Puan</div>
                            <div class="text-xl font-black text-emerald-400">${pts}</div>
                        </div>
                    </div>` : ''}

                    <!-- Tournament Filter Pills -->
                    <div class="flex gap-2 mb-3 overflow-x-auto hide-scrollbar shrink-0 pb-1">
                        ${filterHtml}
                    </div>

                    <!-- Match Table -->
                    <div class="flex-1 overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 min-h-0">
                        <table class="w-full border-collapse text-sm">
                            <thead class="bg-slate-950 sticky top-0 z-10">
                                <tr class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    <th class="p-3 text-left border-b border-slate-700 w-24">Tarih</th>
                                    <th class="p-3 text-left border-b border-slate-700 w-12">Zemin</th>
                                    <th class="p-3 text-left border-b border-slate-700">Müsabaka</th>
                                    <th class="p-3 text-right border-b border-slate-700">Ev Sahibi</th>
                                    <th class="p-3 text-center border-b border-slate-700 w-24">Skor</th>
                                    <th class="p-3 text-left border-b border-slate-700">Deplasman</th>
                                    <th class="p-3 text-center border-b border-slate-700 w-10">S</th>
                                    <th class="p-3 text-left border-b border-slate-700">Goller</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${matchRowsHtml}
                            </tbody>
                        </table>
                    </div>
                </div>`;

            updateContentArea(html);
        }

        function switchFixtureSeason(season) {
            activeFixtureSeason = season;
            fixtureFilter.tournament = '';
            renderFixturePanel();
        }

        function setFixtureFilter(tournament) {
            fixtureFilter.tournament = tournament;
            renderFixturePanel();
        }

        // --- FİKSTÜR MODAL ---
        function openFixtureModal(season, matchId) {
            activeFixtureSeason = season;
            activeFixtureMatchId = matchId;

            // Populate tournament datalist
            const dl = document.getElementById('fm-tournament-list');
            if (dl) dl.innerHTML = getFixtureTournaments().map(t => `<option value="${t}">`).join('');

            document.getElementById('fm-modal-subtitle').textContent = season + ' Sezonu';
            const deleteBtn = document.getElementById('fm-delete-btn');

            if (matchId) {
                // Edit mode
                document.getElementById('fm-modal-title').textContent = 'Maçı Düzenle';
                deleteBtn.classList.remove('hidden');
                const match = (fixtureData[season] || []).find(m => m.id === matchId);
                if (match) {
                    document.getElementById('fm-date').value = match.date || '';
                    document.getElementById('fm-tournament').value = match.tournament || '';
                    document.getElementById('fm-ground').value = match.ground || 'home';
                    document.getElementById('fm-home').value = match.home || '';
                    document.getElementById('fm-away').value = match.away || '';
                    document.getElementById('fm-home-score').value = match.homeScore !== '' && match.homeScore !== null && match.homeScore !== undefined ? match.homeScore : '';
                    document.getElementById('fm-away-score').value = match.awayScore !== '' && match.awayScore !== null && match.awayScore !== undefined ? match.awayScore : '';
                    fixtureEventsTemp = match.events ? JSON.parse(JSON.stringify(match.events)) : [];
                }
            } else {
                // Add mode
                document.getElementById('fm-modal-title').textContent = 'Maç Ekle';
                deleteBtn.classList.add('hidden');
                document.getElementById('fm-date').value = '';
                document.getElementById('fm-tournament').value = '';
                document.getElementById('fm-ground').value = 'home';
                const teamName = managedTeams.kulup.name || '';
                document.getElementById('fm-home').value = teamName;
                document.getElementById('fm-away').value = '';
                document.getElementById('fm-home-score').value = '';
                document.getElementById('fm-away-score').value = '';
                fixtureEventsTemp = [];
            }

            renderFixtureEvents();

            const modal = document.getElementById('fixture-match-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureModal() {
            document.getElementById('fixture-match-modal').classList.add('hidden');
            document.getElementById('fixture-match-modal').classList.remove('flex');
            fixtureEventsTemp = [];
        }

        function addFixtureEvent() {
            fixtureEventsTemp.push({ min: '', type: 'US', scorer: '', assist: '' });
            renderFixtureEvents();
        }

        function removeFixtureEvent(idx) {
            fixtureEventsTemp.splice(idx, 1);
            renderFixtureEvents();
        }

        function syncFixtureEvents() {
            fixtureEventsTemp.forEach((ev, i) => {
                const minEl = document.getElementById(`fev_min_${i}`);
                const typeEl = document.getElementById(`fev_type_${i}`);
                const scorerEl = document.getElementById(`fev_scorer_${i}`);
                const assistEl = document.getElementById(`fev_assist_${i}`);
                if (minEl) ev.min = minEl.value;
                if (typeEl) ev.type = typeEl.value;
                if (scorerEl) ev.scorer = scorerEl.value;
                if (assistEl) ev.assist = assistEl.value;
            });
        }

        function renderFixtureEvents() {
            const container = document.getElementById('fm-events-container');
            if (!container) return;
            if (fixtureEventsTemp.length === 0) {
                container.innerHTML = '<div class="text-center text-slate-600 text-xs py-4"><i class="fa-solid fa-futbol mr-1"></i>Henüz olay eklenmedi.</div>';
                return;
            }
            container.innerHTML = fixtureEventsTemp.map((ev, i) => `
                <div class="flex gap-2 items-center bg-slate-900 border border-slate-700 rounded-lg p-2.5">
                    <input type="number" id="fev_min_${i}" value="${ev.min}" placeholder="Dk"
                        class="w-14 bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 appearance-none text-center" min="1" max="120">
                    <select id="fev_type_${i}" class="bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500">
                        <option value="US" ${ev.type==='US'?'selected':''}>⚽ Biz</option>
                        <option value="OPP" ${ev.type==='OPP'?'selected':''}>⚽ Rakip</option>
                        <option value="OG" ${ev.type==='OG'?'selected':''}>↩ Kendi Kalesine</option>
                    </select>
                    <input type="text" id="fev_scorer_${i}" value="${ev.scorer}" placeholder="Gol atan"
                        class="flex-1 bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 use-autocomplete" autocomplete="off">
                    <input type="text" id="fev_assist_${i}" value="${ev.assist}" placeholder="Asist (opsiyonel)"
                        class="flex-1 bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 use-autocomplete" autocomplete="off">
                    <button onclick="syncFixtureEvents(); removeFixtureEvent(${i})" class="text-slate-500 hover:text-red-500 transition-colors px-1 shrink-0" title="Sil">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `).join('');
        }

        function saveFixtureMatch() {
            syncFixtureEvents();

            const date = document.getElementById('fm-date').value;
            const tournament = document.getElementById('fm-tournament').value.trim();
            const ground = document.getElementById('fm-ground').value;
            const home = document.getElementById('fm-home').value.trim();
            const away = document.getElementById('fm-away').value.trim();
            const homeScore = document.getElementById('fm-home-score').value;
            const awayScore = document.getElementById('fm-away-score').value;

            if (!home && !away) { alert('En az ev sahibi veya deplasman takımı girilmelidir!'); return; }

            if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];

            const matchObj = {
                id: activeFixtureMatchId || ('fx_' + Date.now()),
                date, tournament, ground, home, away,
                homeScore: homeScore !== '' ? parseInt(homeScore) : '',
                awayScore: awayScore !== '' ? parseInt(awayScore) : '',
                events: fixtureEventsTemp.filter(ev => ev.scorer || ev.type === 'OPP' || ev.type === 'OG')
            };

            if (activeFixtureMatchId) {
                const idx = fixtureData[activeFixtureSeason].findIndex(m => m.id === activeFixtureMatchId);
                if (idx !== -1) fixtureData[activeFixtureSeason][idx] = matchObj;
                else fixtureData[activeFixtureSeason].push(matchObj);
            } else {
                fixtureData[activeFixtureSeason].push(matchObj);
            }

            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
        }

        function deleteFixtureMatch() {
            if (!confirm('Bu maç kaydını silmek istediğinize emin misiniz?')) return;
            if (fixtureData[activeFixtureSeason]) {
                fixtureData[activeFixtureSeason] = fixtureData[activeFixtureSeason].filter(m => m.id !== activeFixtureMatchId);
            }
            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
        }


