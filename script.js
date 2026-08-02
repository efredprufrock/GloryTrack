// --- TEMA YÖNETİMİ ---
function toggleTheme() {
    document.body.classList.toggle('theme-light');
    localStorage.setItem('fc26_theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
}

// Sayfa ilk yüklendiğinde kayıtlı temayı uygula
if (localStorage.getItem('fc26_theme') === 'light') {
    document.body.classList.add('theme-light');
}

// --- DİL YÖNETİMİ (TR / EN) ---
// Uygulamanın "kaynak dili" Türkçe'dir: tüm render fonksiyonları hep Türkçe metin üretir.
// İngilizce moduna geçildiğinde, DOM üzerindeki metin düğümleri ve title/placeholder/
// aria-label değerleri bu sözlükle eşleştirilip yerinde değiştirilir. Bu sayede tek tek
// her render fonksiyonunu değiştirmeye gerek kalmaz; yeni oluşturulan (modal açma, tablo
// yeniden çizme vb.) içerikler bir MutationObserver ile otomatik olarak çevrilir.
const TR_EN = {
    // Sol menü / genel
    "FC26 Kariyer Paneli": "FC26 Career Panel",
    "Kupalar": "Trophies",
    "Maçlar": "Matches",
    "Kadro": "Squad",
    "Lig Tarihi": "League History",
    "Transfer": "Transfers",
    "Gol-Asist": "Goals-Assists",
    "Gol ve Asistler": "Goals and Assists",
    "Sezonlar": "Seasons",
    "Ayarlar": "Settings",
    "Bulut": "Cloud",
    "Bulut Senkronizasyonu / Giriş Yap": "Cloud Sync / Sign In",
    "Krem / Koyu Tema Geçişi": "Light / Dark Theme Toggle",
    "Tema Değiştir": "Change Theme",
    "Dil / Language": "Language / Dil",
    "Dil Değiştir / Switch Language": "Switch Language / Dil Değiştir",
    "Takımı Düzenle": "Edit Team",
    "Lütfen bir alt kategori seçin.": "Please select a sub-category.",

    // Alt menüler
    "Kulüp": "Club",
    "Milli": "National",
    "As Takım": "First Team",
    "Akademi": "Academy",
    "Yurtiçi": "Domestic",
    "Uluslararası": "International",

    // Senkron durum metinleri
    "Kaydediliyor...": "Saving...",
    "Kaydedildi": "Saved",
    "Senkronizasyon hatası": "Sync error",
    "Çevrimdışı": "Offline",
    "Veriler alınıyor...": "Fetching data...",
    "Google ile bağlanılıyor...": "Connecting with Google...",

    // Ortak buton / etiket metinleri
    "Ara": "Search",
    "Ekle": "Add",
    "Kaydet": "Save",
    "Güncelle": "Update",
    "Sil": "Delete",
    "İptal": "Cancel",
    "Düzenle": "Edit",
    "Facecard Ara": "Search Facecard",
    "Facecard / Fotoğraf Ara": "Search Facecard / Photo",
    "Football-Logos'ta Ara": "Search on Football-Logos",
    "Logoları Ara": "Search Logos",
    "Tablonun altındaki Arşiv bölümüne taşır / geri alır": "Moves to / restores from the Archive section below the table",
    "Kutuyu Temizle": "Clear Box",
    "Takım Ekle & Düzenle": "Add & Edit Team",
    "Şampiyon Takım": "Champion Team",
    "İkinci Takım": "Runner-up Team",
    "Turnuva Kutusunu Düzenle": "Edit Tournament Box",
    "Turnuva Adı": "Tournament Name",
    "Turnuva Logosu URL / Dosya": "Tournament Logo URL / File",
    "Sütun Rengi": "Column Color",
    "Bu renk sütun zeminine uygulanır.": "This color is applied to the column background.",
    "Sütunu Sil": "Delete Column",
    "Yönetilen Takımı Düzenle": "Edit Managed Team",
    "Ülke Kodu (Örn: TUR, ENG)": "Country Code (e.g. TUR, ENG)",
    "Takım Adı": "Team Name",
    "Logo URL / Dosya": "Logo URL / File",
    "Rakip Takım Bilgileri": "Opponent Team Info",
    "Ülke (Kısa Adı, Örn: ENG, ITA)": "Country (Short Name, e.g. ENG, ITA)",
    "Rakibi Düzenle": "Edit Opponent",
    "Grubu / Ülkeyi Düzenle": "Edit Group / Country",
    "Grup Adı (Örn: İNGİLTERE)": "Group Name (e.g. ENGLAND)",
    "Grup Rengi (Sütunlara tonlanarak yansır)": "Group Color (reflected as a tint on the columns)",
    "Tüm Grubu Sil": "Delete Entire Group",
    "TOPLAM BİLANÇO": "TOTAL RECORD",
    "Oynanan Maç": "Matches Played",
    "Galibiyet Oranı": "Win Rate",
    "Atılan": "Scored",
    "Yenilen": "Conceded",
    "Averaj": "Goal Diff.",
    "Oynanan": "Played",
    "Galibiyet": "Win",
    "Beraberlik": "Draw",
    "Mağlubiyet": "Loss",
    "Takım": "Team",
    "ULKE": "COUNTRY",
    "Sezon": "Season",
    "Sezon - Rakip": "Season - Opponent",
    "Maç Sonuçları": "Match Results",
    "Yeni Maç Ekle": "Add New Match",
    "Sonuçları Kaydet": "Save Results",
    "Oyuncu Ekle": "Add Player",
    "Mevki": "Position",
    "GK (Kaleci)": "GK (Goalkeeper)",
    "CB (Stoper)": "CB (Center Back)",
    "LB (Sol Bek)": "LB (Left Back)",
    "RB (Sağ Bek)": "RB (Right Back)",
    "DM (Ön Libero)": "DM (Defensive Mid)",
    "CM (Merkez Orta)": "CM (Center Mid)",
    "LM (Sol Orta)": "LM (Left Mid)",
    "RM (Sağ Orta)": "RM (Right Mid)",
    "AM (Ofansif Orta)": "AM (Attacking Mid)",
    "LW (Sol Açık)": "LW (Left Winger)",
    "RW (Sağ Açık)": "RW (Right Winger)",
    "ST (Santrfor)": "ST (Striker)",
    "İsim Soyisim": "Full Name",
    "Fotoğraf URL / Dosya": "Photo URL / File",
    "Ülke Kodu": "Country Code",
    "Yaş": "Age",
    "OVR": "OVR",
    "Potansiyel": "Potential",
    "Kategori": "Category",
    "Toplu Oyuncu Ekle": "Bulk Add Players",
    "kadrosuna eklenecektir.": "squad.",
    "Listeyi Ekle": "Add List",
    "Toplu Fikstür Ekle": "Bulk Add Fixtures",
    "Maç No": "Match No",
    "Müsabaka": "Competition",
    "Ev Sahibi": "Home",
    "Deplasman": "Away",
    "Ülke Kodu (Opsiyonel)": "Country Code (Optional)",
    "Listeyi İçe Aktar": "Import List",
    "Maç Sonucu Gir": "Enter Match Result",
    "Gol & Asist Detayları": "Goal & Assist Details",
    "Olay Ekle": "Add Event",
    "Sonucu Kaydet": "Save Result",
    "Lig Tarihine Takım Ekle": "Add Team to League History",
    "Lig Tarihine Toplu Takım Ekle": "Bulk Add Teams to League History",
    "Renkler otomatik atanacaktır. İsterseniz \"Takım Adı, #RenkKodu\" formatında da girebilirsiniz.": "Colors will be assigned automatically. You can optionally enter them in \"Team Name, #ColorCode\" format.",
    "Takım (Grafik) Rengi": "Team (Chart) Color",
    "Sıralama grafiğindeki çizgi rengi": "Line color on the ranking chart",
    "Takımı Sil": "Delete Team",
    "Sıralama": "Ranking",
    "Puan": "Points",
    "Sezon Verileri": "Season Data",
    "Oyuncu - Sezon": "Player - Season",
    "Rakip Ülke Kodu": "Opponent Country Code",
    "Bonservis Ücreti (€)": "Transfer Fee (€)",
    "Kiralık Gelen": "Incoming Loan",
    "Kiralık Giden": "Outgoing Loan",
    "Devam (Kadroda Kaldı)": "Continuing (Stayed in Squad)",
    "Sözleşme Yeniledi": "Renewed Contract",
    "Transfer Ekle": "Add Transfer",
    "Takıma Katıldı (Gelen)": "Joined Team (In)",
    "Takımdan Ayrıldı (Giden)": "Left Team (Out)",
    "Geldiği Takım": "From Club",
    "Geldiği Yaş": "Age Joined",
    "Geldiği OVR": "OVR Joined",
    "Yaş ve Genel Reyting (OVR) Güncellemesi": "Age and Overall Rating (OVR) Update",
    "Kadro Önemi": "Squad Role",
    "Durum / Aksiyon": "Status / Action",
    "Açıklama Notu": "Description Note",
    "Boş / Normal Not": "Blank / Normal Note",
    "Zemin": "Background",
    "Tarafsız": "Neutral",
    "İç Saha": "Home Side",
    "Skor": "Score",
    "Fikstür Planla": "Plan Fixture",
    "Planı Kaydet": "Save Plan",
    "Veriyi Kaydet": "Save Data",
    "Oyuncular": "Players",
    "Excel'den kopyaladığınız veya virgülle ayırdığınız maç listesini aşağıya yapıştırın.": "Paste the match list you copied from Excel or separated by commas below."
};

const EN_TR = Object.fromEntries(Object.entries(TR_EN).map(([tr, en]) => [en, tr]));

let currentLang = localStorage.getItem('fc26_lang') || 'tr';
const I18N_ATTRS = ['placeholder', 'title', 'aria-label'];

function i18nTranslateAttrs(el, dict) {
    I18N_ATTRS.forEach(attr => {
        const val = el.getAttribute && el.getAttribute(attr);
        if (val && dict[val]) el.setAttribute(attr, dict[val]);
    });
}

// root: bir DOM elemanı veya metin düğümü. Verilen sözlükle eşleşen tüm metinleri değiştirir.
function i18nTranslateTree(root, dict) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
        const trimmed = root.nodeValue.trim();
        if (trimmed && dict[trimmed]) root.nodeValue = root.nodeValue.replace(trimmed, dict[trimmed]);
        return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.tagName === 'SCRIPT' || root.tagName === 'STYLE') return;

    i18nTranslateAttrs(root, dict);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node;
    const hits = [];
    while ((node = walker.nextNode())) {
        const trimmed = node.nodeValue.trim();
        if (trimmed && dict[trimmed]) hits.push(node);
    }
    hits.forEach(n => { const trimmed = n.nodeValue.trim(); n.nodeValue = n.nodeValue.replace(trimmed, dict[trimmed]); });

    root.querySelectorAll(I18N_ATTRS.map(a => `[${a}]`).join(',')).forEach(el => i18nTranslateAttrs(el, dict));
}

// Yeni oluşturulan (innerHTML ile basılan) tüm panel/modal içerikleri otomatik çevrilsin diye
// gözlemci kuruyoruz. Sadece İngilizce moddayken devrededir; Türkçe moda dönüldüğünde
// render fonksiyonları zaten kaynak dilde (Türkçe) ürettiği için gözlemciye gerek kalmaz.
let i18nObserver = null;
function startI18nObserver() {
    if (i18nObserver) return;
    i18nObserver = new MutationObserver(mutations => {
        if (currentLang !== 'en') return;
        mutations.forEach(m => {
            m.addedNodes.forEach(n => i18nTranslateTree(n, TR_EN));
        });
    });
    i18nObserver.observe(document.body, { childList: true, subtree: true });
}
function stopI18nObserver() {
    if (i18nObserver) { i18nObserver.disconnect(); i18nObserver = null; }
}

function updateLangButton() {
    const el = document.getElementById('btn-lang-label');
    if (el) el.textContent = currentLang === 'en' ? 'EN' : 'TR';
    document.title = currentLang === 'en' ? 'FC26 Career Panel' : 'FC26 Kariyer Paneli';
    document.documentElement.lang = currentLang;
}

function applyStoredLanguage() {
    updateLangButton();
    if (currentLang === 'en') {
        i18nTranslateTree(document.body, TR_EN);
        startI18nObserver();
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    localStorage.setItem('fc26_lang', currentLang);
    updateLangButton();
    if (currentLang === 'en') {
        i18nTranslateTree(document.body, TR_EN);
        startI18nObserver();
    } else {
        stopI18nObserver();
        i18nTranslateTree(document.body, EN_TR);
    }
}

// --- GÜVENLİK (XSS ÖNLEME) ---
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

    // --- 1. VERİ YAPILARI (STATE) ---
        let currentScale = '1';

        const menuConfig = {
            kupalar: { title: "Kupalar", submenus: [] },
            maclar: { title: "Maçlar", submenus: [{ id: "maclar-kulup", label: "Kulüp" }, { id: "maclar-milli", label: "Milli" }]},
            kadro: { title: "Kadro", submenus: [{ id: "kadro-astakim", label: "As Takım" }, { id: "kadro-akademi", label: "Akademi" }, { id: "kadro-milli", label: "Milli" }]},
            ligtarihi: { title: "Lig Tarihi", submenus: [] },
            transfer: { title: "Transfer", submenus: [] },
            golasist: { title: "Gol ve Asistler", submenus: [] },
            sezonlar: { title: "Sezonlar", submenus: [] },
            ayarlar: { title: "Ayarlar", submenus: [] }
        };

        let seasonsList = ['25/26'];

        let activeMain = null;
        let isSetupComplete = false;
        let activeSub = null;
        let activeTertiary = null;
        let fileUploads = { champ: null, runner: null, tournament: null, managed: null, opp: null, setup: null, 'pi-photo': null, 'pi-team': null };

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
            akademi: ['A Takım Adayı', 'Kiralık Gelişecek', 'Gelecek Vadeden', 'Yetersiz'],
            milli: ['Kadroda', 'Yedek', 'Genç Milli', 'İzlemede']
        };
        let squadData = { astakim: [], akademi: [], milli: [] };
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
        let euroLeaguesData = {};
        let customTournamentsData = {};
        let activeFixtureSeason = null;
        let activeFixtureMatchId = null;
        let fixtureFilter = { tournament: '' };
        let expandedFixtureMatchIds = new Set(); // Inline açılan (expand edilen) maç satırlarının ID'lerini tutar

        
        
        // context: 'milli' -> sadece Milli Takım kadrosu, aksi halde (undefined/'kulup') -> sadece Kulüp (As Takım + Akademi) kadrosu
        function getSquadDatalistOptions(context) {
            let options = '';
            let allPlayers = [];

            if (context === 'milli') {
                allPlayers = squadData.milli || [];
            } else {
                allPlayers = [...(squadData.astakim || []), ...(squadData.akademi || [])];
            }

            // 'name', 'playerName' veya 'isim' gibi olası anahtarları kontrol ederek isimleri çek
            allPlayers.forEach(player => {
                let pName = player.name || player.playerName || player.isim; 
                if (pName) {
                    options += `<option value="${escapeHtml(pName)}"></option>`;
                }
            });
            
            return options;
        }

        // Bir fikstür maçının Kulüp mü yoksa Milli Takım maçı mı olduğunu ev sahibi/deplasman isimlerine bakarak belirler.
        function getFixtureMatchContext(match) {
            if (!match) return 'kulup';
            const clubName = managedTeams.kulup.name || '';
            const milliName = managedTeams.milli.name || '';

            if (milliName && (match.home === milliName || match.away === milliName)) return 'milli';
            if (match.home === clubName || match.away === clubName) return 'kulup';
            // Ne kulüp ne de milli isimle tam eşleşme yoksa, milli takım tanımlıysa milli kabul et (syncFixtureToMatches ile tutarlı)
            if (milliName) return 'milli';
            return 'kulup';
        }


// --- TÜRKÇE VE İNGİLİZCE TAM İSİM ÇEVİRMENİ ---
const COUNTRY_ALIASES = {
    'TÜRKİYE': 'TR', 'TURKEY': 'TR',
    'ALMANYA': 'DE', 'GERMANY': 'DE',
    'İNGİLTERE': 'EN', 'ENGLAND': 'EN',
    'İSPANYA': 'SP', 'SPAIN': 'SP',
    'İTALYA': 'IT', 'ITALY': 'IT',
    'FRANSA': 'FR', 'FRANCE': 'FR',
    'HOLLANDA': 'NL', 'NETHERLANDS': 'NL',
    'BELÇİKA': 'BE', 'BELGIUM': 'BE',
    'PORTEKİZ': 'PT', 'PORTUGAL': 'PT',
    'İSKOÇYA': 'SC', 'SCOTLAND': 'SC',
    'GALLER': 'WA', 'WALES': 'WA',
    'KUZEY İRLANDA': 'NI', 'NORTHERN IRELAND': 'NI',
    'İRLANDA': 'IE', 'IRELAND': 'IE',
    'İSVİÇRE': 'CH', 'SWITZERLAND': 'CH',
    'AVUSTURYA': 'AT', 'AUSTRIA': 'AT',
    'YUNANİSTAN': 'GR', 'GREECE': 'GR',
    'HIRVATİSTAN': 'HR', 'CROATIA': 'HR',
    'SIRBİSTAN': 'RS', 'SERBIA': 'RS',
    'ÇEKYA': 'CZ', 'ÇEK CUMHURİYETİ': 'CZ', 'CZECHIA': 'CZ', 'CZECH REPUBLIC': 'CZ',
    'POLONYA': 'PL', 'POLAND': 'PL',
    'İSVEÇ': 'SE', 'SWEDEN': 'SE',
    'DANİMARKA': 'DK', 'DENMARK': 'DK',
    'NORVEÇ': 'NO', 'NORWAY': 'NO',
    'FİNLANDİYA': 'FI', 'FINLAND': 'FI',
    'RUSYA': 'RU', 'RUSSIA': 'RU',
    'UKRAYNA': 'UA', 'UKRAINE': 'UA',
    'ROMANYA': 'RO', 'ROMANIA': 'RO',
    'MACARİSTAN': 'HU', 'HUNGARY': 'HU',
    'BREZİLYA': 'BR', 'BRAZIL': 'BR',
    'ARJANTİN': 'AR', 'ARGENTINA': 'AR',
    'URUGUAY': 'UY',
    'ŞİLİ': 'CL', 'CHILE': 'CL',
    'KOLOMBİYA': 'CO', 'COLOMBIA': 'CO',
    'MEKSİKA': 'MX', 'MEXICO': 'MX',
    'AMERİKA': 'US', 'ABD': 'US', 'AMERİKA BİRLEŞİK DEVLETLERİ': 'US', 'USA': 'US', 'UNITED STATES': 'US',
    'FAS': 'MA', 'MOROCCO': 'MA',
    'CEZAYİR': 'DZ', 'ALGERIA': 'DZ',
    'MISIR': 'EG', 'EGYPT': 'EG',
    'NİJERYA': 'NG', 'NIGERIA': 'NG',
    'SENEGAL': 'SN',
    'FİLDİŞİ SAHİLİ': 'CI', 'IVORY COAST': 'CI',
    'GAMBİYA': 'GM', 'GAMBIA': 'GM',
    'GANA': 'GH', 'GHANA': 'GH',
    'JAPONYA': 'JP', 'JAPAN': 'JP',
    'GÜNEY KORE': 'KR', 'KORE': 'KR', 'SOUTH KOREA': 'KR',
    'AVUSTRALYA': 'AU', 'AUSTRALIA': 'AU',
    'SUUDİ ARABİSTAN': 'SA', 'ARABİSTAN': 'SA', 'SAUDI ARABIA': 'SA',
    'İRAN': 'IR',
    'KATAR': 'QA', 'QATAR': 'QA',
    'ÇİN': 'CN', 'CHINA': 'CN'
};

function normalizeCountryInput(input) {
    if (!input) return '';
    let c = input.toUpperCase().trim();
    return COUNTRY_ALIASES[c] || c;
}
        
// 1. Kıta haritası ve fonksiyonu ARTIK DIŞARIDA (Global alanda)
const COUNTRY_CONTINENT_MAP = {
    // UEFA (Avrupa)
    'TR':'AVRUPA','TUR':'AVRUPA','EN':'AVRUPA','ENG':'AVRUPA','SP':'AVRUPA','ESP':'AVRUPA',
    'GER':'AVRUPA','DE':'AVRUPA','IT':'AVRUPA','ITA':'AVRUPA','FR':'AVRUPA','FRA':'AVRUPA',
    'PT':'AVRUPA','POR':'AVRUPA','NL':'AVRUPA','NED':'AVRUPA','BE':'AVRUPA','BEL':'AVRUPA',
    'SC':'AVRUPA','SCO':'AVRUPA','WA':'AVRUPA','WAL':'AVRUPA','NI':'AVRUPA','NIR':'AVRUPA',
    'IE':'AVRUPA','IRL':'AVRUPA','HR':'AVRUPA','CRO':'AVRUPA','RS':'AVRUPA','SRB':'AVRUPA',
    'PL':'AVRUPA','POL':'AVRUPA','SE':'AVRUPA','SWE':'AVRUPA','DK':'AVRUPA','DEN':'AVRUPA',
    'NO':'AVRUPA','NOR':'AVRUPA','FI':'AVRUPA','FIN':'AVRUPA','CZ':'AVRUPA','CZE':'AVRUPA',
    'RO':'AVRUPA','ROU':'AVRUPA','HU':'AVRUPA','HUN':'AVRUPA','SK':'AVRUPA','SVK':'AVRUPA',
    'SI':'AVRUPA','SVN':'AVRUPA','IS':'AVRUPA','ISL':'AVRUPA','AL':'AVRUPA','ALB':'AVRUPA',
    'BA':'AVRUPA','BIH':'AVRUPA','ME':'AVRUPA','MNE':'AVRUPA','MK':'AVRUPA','MKD':'AVRUPA',
    'BG':'AVRUPA','BUL':'AVRUPA','GE':'AVRUPA','GEO':'AVRUPA','GR':'AVRUPA','GRE':'AVRUPA',
    'RU':'AVRUPA','RUS':'AVRUPA','UA':'AVRUPA','UKR':'AVRUPA','AT':'AVRUPA','AUT':'AVRUPA',
    'CH':'AVRUPA','SUI':'AVRUPA','IL':'AVRUPA','ISR':'AVRUPA','CY':'AVRUPA','CYP':'AVRUPA',
    'LU':'AVRUPA','LUX':'AVRUPA','KV':'AVRUPA','KOS':'AVRUPA',
    // CONMEBOL (Güney Amerika)
    'BR':'GÜNEY AMERİKA','BRA':'GÜNEY AMERİKA','AR':'GÜNEY AMERİKA','ARG':'GÜNEY AMERİKA',
    'UY':'GÜNEY AMERİKA','URU':'GÜNEY AMERİKA','CO':'GÜNEY AMERİKA','COL':'GÜNEY AMERİKA',
    'CL':'GÜNEY AMERİKA','CHI':'GÜNEY AMERİKA','EC':'GÜNEY AMERİKA','ECU':'GÜNEY AMERİKA',
    'PE':'GÜNEY AMERİKA','PER':'GÜNEY AMERİKA','VE':'GÜNEY AMERİKA','VEN':'GÜNEY AMERİKA',
    'PY':'GÜNEY AMERİKA','PAR':'GÜNEY AMERİKA','BO':'GÜNEY AMERİKA','BOL':'GÜNEY AMERİKA',
    // CONCACAF (Kuzey/Orta Amerika)
    'US':'KUZEY AMERİKA','USA':'KUZEY AMERİKA','MX':'KUZEY AMERİKA','MEX':'KUZEY AMERİKA',
    'CA':'KUZEY AMERİKA','CAN':'KUZEY AMERİKA','CR':'KUZEY AMERİKA','CRC':'KUZEY AMERİKA',
    'JM':'KUZEY AMERİKA','JAM':'KUZEY AMERİKA','PA':'KUZEY AMERİKA','PAN':'KUZEY AMERİKA',
    'HN':'KUZEY AMERİKA','HON':'KUZEY AMERİKA',
    // CAF (Afrika)
    'MA':'AFRİKA','MAR':'AFRİKA','EG':'AFRİKA','EGY':'AFRİKA','SN':'AFRİKA','SEN':'AFRİKA',
    'NG':'AFRİKA','NGA':'AFRİKA','CI':'AFRİKA','CIV':'AFRİKA','GH':'AFRİKA','GHA':'AFRİKA',
    'CM':'AFRİKA','CMR':'AFRİKA','DZ':'AFRİKA','ALG':'AFRİKA','ZA':'AFRİKA','RSA':'AFRİKA',
    'ML':'AFRİKA','MLI':'AFRİKA','CD':'AFRİKA','COD':'AFRİKA',
    // AFC (Asya & Avustralya)
    'SA':'ASYA','KSA':'ASYA','JP':'ASYA','JPN':'ASYA','KR':'ASYA','KOR':'ASYA',
    'AU':'ASYA','AUS':'ASYA','IR':'ASYA','IRN':'ASYA','QA':'ASYA','QAT':'ASYA',
    'AE':'ASYA','UAE':'ASYA','CN':'ASYA','CHN':'ASYA','UZ':'ASYA','UZB':'ASYA',
    'IQ':'ASYA','IRQ':'ASYA','NZ':'ASYA','NZL':'ASYA'
};

function getContinentForCountry(countryCode) {
    if (!countryCode) return 'DİĞER';
    // Girdiyi önce süzgeçten geçir
    const code = normalizeCountryInput(countryCode);
    return COUNTRY_CONTINENT_MAP[code] || 'DİĞER';
}

// 2. Bayrak fonksiyonu temizlenmiş halde aşağıda kalıyor
function getFlagIcon(countryCode) {
    if (!countryCode || countryCode === 'BİLİNMEYEN') return '';
    // Girdiyi önce süzgeçten geçir
    const c = normalizeCountryInput(countryCode);
    
    const flagMap = {
        'TR': 'tr', 'TUR': 'tr', 'TURKEY': 'tr',
        'EN': 'gb-eng', 'ENG': 'gb-eng', 'ENGLAND': 'gb-eng',
        'ES': 'es', 'SP': 'es', 'ESP': 'es', 'SPAIN': 'es',
        'GE': 'de', 'GER': 'de', 'DE': 'de', 'GERMANY': 'de',
        'IT': 'it', 'ITA': 'it', 'ITALY': 'it',
        'FR': 'fr', 'FRA': 'fr', 'FRANCE': 'fr',
        'PT': 'pt', 'POR': 'pt', 'PORTUGAL': 'pt',
        'NL': 'nl', 'NED': 'nl', 'NETHERLANDS': 'nl',
        'BE': 'be', 'BEL': 'be', 'BELGIUM': 'be',
        'SC': 'gb-sct', 'SCO': 'gb-sct', 'SCOTLAND': 'gb-sct',
        'WA': 'gb-wls', 'WAL': 'gb-wls', 'WALES': 'gb-wls',
        'NI': 'gb-nir', 'NIR': 'gb-nir', 'NORTHERN IRELAND': 'gb-nir',
        'IE': 'ie', 'IRL': 'ie', 'IRELAND': 'ie', 'REPUBLIC OF IRELAND': 'ie',
        'HR': 'hr', 'CRO': 'hr', 'CROATIA': 'hr',
        'RS': 'rs', 'SRB': 'rs', 'SERBIA': 'rs',
        'PL': 'pl', 'POL': 'pl', 'POLAND': 'pl',
        'SE': 'se', 'SWE': 'se', 'SWEDEN': 'se',
        'DK': 'dk', 'DEN': 'dk', 'DENMARK': 'dk',
        'NO': 'no', 'NOR': 'no', 'NORWAY': 'no',
        'FI': 'fi', 'FIN': 'fi', 'FINLAND': 'fi',
        'CZ': 'cz', 'CZE': 'cz', 'CZECH REPUBLIC': 'cz', 'CZECHIA': 'cz',
        'RO': 'ro', 'ROU': 'ro', 'ROMANIA': 'ro',
        'HU': 'hu', 'HUN': 'hu', 'HUNGARY': 'hu',
        'SK': 'sk', 'SVK': 'sk', 'SLOVAKIA': 'sk',
        'SI': 'si', 'SVN': 'si', 'SLOVENIA': 'si',
        'IS': 'is', 'ISL': 'is', 'ICELAND': 'is',
        'AL': 'al', 'ALB': 'al', 'ALBANIA': 'al',
        'BA': 'ba', 'BIH': 'ba', 'BOSNIA': 'ba', 'BOSNIA AND HERZEGOVINA': 'ba',
        'ME': 'me', 'MNE': 'me', 'MONTENEGRO': 'me',
        'MK': 'mk', 'MKD': 'mk', 'NORTH MACEDONIA': 'mk', 'MACEDONIA': 'mk',
        'BG': 'bg', 'BUL': 'bg', 'BULGARIA': 'bg',
        'GE': 'ge', 'GEO': 'ge', 'GEORGIA': 'ge',
        'GR': 'gr', 'GRE': 'gr', 'GREECE': 'gr',
        'RU': 'ru', 'RUS': 'ru', 'RUSSIA': 'ru',
        'UA': 'ua', 'UKR': 'ua', 'UKRAINE': 'ua',
        'AT': 'at', 'AUT': 'at', 'AUSTRIA': 'at',
        'CH': 'ch', 'SUI': 'ch', 'SWITZERLAND': 'ch',
        'IL': 'il', 'ISR': 'il', 'ISRAEL': 'il',
        'BR': 'br', 'BRA': 'br', 'BRAZIL': 'br',
        'AR': 'ar', 'ARG': 'ar', 'ARGENTINA': 'ar',
        'UY': 'uy', 'URU': 'uy', 'URUGUAY': 'uy',
        'CO': 'co', 'COL': 'co', 'COLOMBIA': 'co',
        'CL': 'cl', 'CHI': 'cl', 'CHILE': 'cl',
        'EC': 'ec', 'ECU': 'ec', 'ECUADOR': 'ec',
        'PE': 'pe', 'PER': 'pe', 'PERU': 'pe',
        'VE': 've', 'VEN': 've', 'VENEZUELA': 've',
        'PY': 'py', 'PAR': 'py', 'PARAGUAY': 'py',
        'BO': 'bo', 'BOL': 'bo', 'BOLIVIA': 'bo',
        'US': 'us', 'USA': 'us', 'UNITED STATES': 'us',
        'MX': 'mx', 'MEX': 'mx', 'MEXICO': 'mx',
        'CA': 'ca', 'CAN': 'ca', 'CANADA': 'ca',
        'CR': 'cr', 'CRC': 'cr', 'COSTA RICA': 'cr',
        'JM': 'jm', 'JAM': 'jm', 'JAMAICA': 'jm',
        'PA': 'pa', 'PAN': 'pa', 'PANAMA': 'pa',
        'HN': 'hn', 'HON': 'hn', 'HONDURAS': 'hn',
        'MA': 'ma', 'MAR': 'ma', 'MOROCCO': 'ma',
        'EG': 'eg', 'EGY': 'eg', 'EGYPT': 'eg',
        'SN': 'sn', 'SEN': 'sn', 'SENEGAL': 'sn',
        'NG': 'ng', 'NGA': 'ng', 'NIGERIA': 'ng',
        'CI': 'ci', 'CIV': 'ci', 'IVORY COAST': 'ci', 'COTE D IVOIRE': 'ci',
        'GH': 'gh', 'GHA': 'gh', 'GHANA': 'gh',
        'CM': 'cm', 'CMR': 'cm', 'CAMEROON': 'cm',
        'DZ': 'dz', 'ALG': 'dz', 'ALGERIA': 'dz',
        'ZA': 'za', 'RSA': 'za', 'SOUTH AFRICA': 'za',
        'ML': 'ml', 'MLI': 'ml', 'MALI': 'ml',
        'CD': 'cd', 'COD': 'cd', 'DR CONGO': 'cd',
        'SA': 'sa', 'KSA': 'sa', 'SAUDI ARABIA': 'sa',
        'JP': 'jp', 'JPN': 'jp', 'JAPAN': 'jp',
        'KR': 'kr', 'KOR': 'kr', 'SOUTH KOREA': 'kr', 'KOREA REPUBLIC': 'kr',
        'AU': 'au', 'AUS': 'au', 'AUSTRALIA': 'au',
        'IR': 'ir', 'IRN': 'ir', 'IRAN': 'ir',
        'QA': 'qa', 'QAT': 'qa', 'QATAR': 'qa',
        'AE': 'ae', 'UAE': 'ae', 'UNITED ARAB EMIRATES': 'ae',
        'CN': 'cn', 'CHN': 'cn', 'CHINA': 'cn', 'CHINA PR': 'cn',
        'UZ': 'uz', 'UZB': 'uz', 'UZBEKISTAN': 'uz',
        'IQ': 'iq', 'IRQ': 'iq', 'IRAQ': 'iq',
        'NZ': 'nz', 'NZL': 'nz', 'NEW ZEALAND': 'nz',
        'CY': 'cy', 'CYP': 'cy', 'CYPRUS': 'cy',
        'LU': 'lu', 'LUX': 'lu', 'LUXEMBOURG': 'lu',
        'KV': 'xk', 'KOS': 'xk', 'KOSOVO': 'xk'
    };

    const code = flagMap[c];
    if (code) {
        return `<img src="https://flagcdn.com/w20/${code}.png" alt="${c}" title="${c}" class="inline-block h-3.5 object-contain rounded-sm drop-shadow-md">`;
    }
    
    return `<span class="text-[9px] font-mono text-emerald-300 bg-slate-950/70 px-1 rounded">${c}</span>`;
}

        // --- YEREL VERİTABANI (LOCAL STORAGE) VE VERİ YÖNETİMİ ---
        function getAllData() {
            return {
                seasonsList, trophyData, tournamentsList, managedTeams, opponentsConfig,
                matchDataStore, playerRoles, squadData, leagueHistoryData, transferData, fixtureData, isSetupComplete,
                euroLeaguesData, customTournamentsData
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
            if (data.euroLeaguesData) euroLeaguesData = data.euroLeaguesData;
            if (data.customTournamentsData) customTournamentsData = data.customTournamentsData;
            if (data.isSetupComplete !== undefined) isSetupComplete = data.isSetupComplete;

            // Geriye dönük uyumluluk: eski yedeklerde "milli" kadrosu bulunmayabilir
            if (!squadData.milli) squadData.milli = [];
            if (!playerRoles.milli) playerRoles.milli = ['Kadroda', 'Yedek', 'Genç Milli', 'İzlemede'];

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
                offline: { icon: 'fa-cloud-arrow-down',       color: 'text-slate-500',   text: msg || 'Çevrimdışı' }
            };
            const s = map[state] || map.idle;
            // Hover ve cursor-pointer özelliklerini koruyan yeni className
            el.className = `fixed top-3 right-3 z-[250] flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-full px-3 py-1.5 text-xs font-bold ${s.color} shadow-lg backdrop-blur-sm transition-all cursor-pointer`;
            el.innerHTML = `<i class="fa-solid ${s.icon}"></i><span>${s.text}</span>`;
        }

        async function signInWithGoogle() {
            if (!firebaseReady && !initFirebase()) {
                setSyncStatus('error', 'Bulut bağlantısı kurulamadı. firebase-config.js dosyasını kontrol edin.');
                return;
            }
            setSyncStatus('saving', 'Google ile bağlanılıyor...');
            try {
                await fbAuth.signInWithPopup(googleProvider);
                // Gerisini onAuthStateChanged devralır
            } catch (e) {
                console.error('Google giriş hatası:', e);
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/cancelled-popup-request') {
                    try { await fbAuth.signInWithRedirect(googleProvider); return; } catch (e2) { console.error(e2); }
                }
                setSyncStatus('error', e.code === 'auth/unauthorized-domain'
                    ? 'Bu site adresi Firebase\'de yetkilendirilmemiş (Authorized domains).'
                    : 'Giriş hatası: ' + e.message);
            }
        }

function handleSyncClick() {
            if (!currentUser) {
                // Giriş yapılmamışsa doğrudan Google Login'i tetikle
                signInWithGoogle();
            } else {
                // Giriş yapılmışsa durumu görmek için Ayarlar paneline yönlendir
                selectMainMenu('ayarlar');
            }
        }

        function signOutOfCloud() {
            if (cloudUnsubscribe) { cloudUnsubscribe(); cloudUnsubscribe = null; }
            cloudDocRef = null;
            currentUser = null;
            if (fbAuth) fbAuth.signOut();
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
            let milli = (squadData.milli || []).map(p => p.name);

            // Milli takım maçları için gol/asist girerken SADECE Milli kadrosunu göster.
            // Kulüp maçlarında ise SADECE kulüp (As Takım + Akademi) kadrosunu göster.
            if (activeMain === 'maclar' && matchContext === 'milli') {
                mockPlayers = [...new Set(milli)].sort();
            } else {
                mockPlayers = [...new Set([...astakim, ...akademi])].sort();
            }
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
            'league-team-modal', 'league-team-bulk-modal', 'league-cell-modal', 'transfer-editor-modal', 'fixture-match-modal', 'match-result-modal',
            'fixture-bulk-modal', 'squad-bulk-modal', 'tournament-table-bulk-modal'
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
            'league-team-bulk-modal': () => closeLeagueTeamBulkModal(),
            'league-cell-modal': () => closeLeagueCellModal(),
            'transfer-editor-modal': () => closeTransferModal(),
            'fixture-match-modal': () => closeFixtureModal(),
            'match-result-modal': () => closeMatchResultModal(),
            'fixture-bulk-modal': () => closeFixtureBulkModal(),
            'squad-bulk-modal': () => closeSquadBulkModal(),
            'tournament-table-bulk-modal': () => closeTournamentTableBulkModal()
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

        // --- PREVENT CONTENTEDITABLE LINE BREAKS ---
        document.addEventListener('keydown', function(e) {
            if (e.target && e.target.isContentEditable && e.key === 'Enter') {
                e.preventDefault();
                e.target.blur(); // Blur the element to trigger the onblur save event
            }
        });

        function startAppAfterAuth() {
            // Başlangıç ekranını zorla kapat ve tamamlandı say
            const setupModal = document.getElementById('setup-modal');
            if(setupModal) setupModal.classList.add('hidden');
            isSetupComplete = true;
            
            if (!activeMain) selectMainMenu('kadro');
            else rerenderCurrentPanel();
        }

        window.onload = function() {
            if (loadFromLocalStorage()) {
                if(managedTeams.kulup && managedTeams.kulup.logoUrl) {
                    document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;
                }
            } else {
                // İlk defa giren birini kurulum ekranı yerine direkt içeri al
                isSetupComplete = true;
            }
            selectMainMenu('sezonlar'); // <--- YENİ: Varsayılan açılış artık Fikstür (Sezonlar) paneli oldu
            applyStoredLanguage();
            
            if (initFirebase()) {
                fbAuth.onAuthStateChanged(function(user) {
                    if (user) {
                        currentUser = { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL };
                        setSyncStatus('saving', 'Bağlanılıyor...');
                        connectToCloud(user.uid);
                    } else {
                        currentUser = null;
                        cloudDocRef = null;
                        if (cloudUnsubscribe) { cloudUnsubscribe(); cloudUnsubscribe = null; }
                        setSyncStatus('offline');
                    }
                });
            } else {
                setSyncStatus('offline');
            }
        }

        // NOT: Bu fonksiyon artık kullanılan bir "setup-modal" öğesine sahip değil
        // (eski kurulum sihirbazı arayüzden kaldırıldı). Elemanlar bulunamazsa
        // sessizce çıkar; ileride kurulum ekranı geri eklenirse çalışmaya devam eder.
        function finishSetup() {
            const countryEl = document.getElementById('setup-country');
            const nameEl = document.getElementById('setup-name');
            const urlEl = document.getElementById('setup-url-input');
            const setupModal = document.getElementById('setup-modal');
            if (!countryEl || !nameEl || !urlEl || !setupModal) return;

            const country = countryEl.value.trim();
            const name = nameEl.value.trim();
            const url = urlEl.value.trim();
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
            setupModal.style.opacity = '0';
            setTimeout(() => {
                setupModal.classList.add('hidden');
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

                // Bağımlı verileri temizle (hayalet veri kalmasın)
                delete trophyData[season];
                delete fixtureData[season];
                delete euroLeaguesData[season];
                delete customTournamentsData[season];
                ['kulup', 'milli'].forEach(ctx => {
                    if (matchDataStore[ctx]) delete matchDataStore[ctx][season];
                });
                leagueHistoryData.forEach(t => { if (t.history) delete t.history[season]; });
                ['astakim', 'akademi'].forEach(ctx => {
                    (squadData[ctx] || []).forEach(p => { if (p.history) delete p.history[season]; });
                });

                saveToLocalStorage();
                if(activeMain === 'kupalar') renderTrophiesGrid();
                if(activeMain === 'maclar') renderMatchesGrid();
                if(activeMain === 'kadro') renderSquadGrid();
                if(activeMain === 'ligtarihi') renderLeagueHistory();
                if(activeMain === 'golasist') renderStatsPanel();
                if(activeMain === 'sezonlar') renderFixturePanel();
            }
        }

// Compress uploaded images before storing in state
function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 128; // Reduced to 128px for optimal thumbnail compression & storage efficiency
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDim) {
                    height *= maxDim / width;
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width *= maxDim / height;
                    height = maxDim;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to WebP / JPEG format
            const compressedDataUrl = canvas.toDataURL('image/webp', 0.8);
            fileUploads[type] = compressedDataUrl;

            const btn = document.getElementById(`${type}-upload-btn`);
            if (btn) { 
                btn.classList.add('text-emerald-400'); 
                btn.classList.remove('text-slate-300'); 
            }
            const urlInput = document.getElementById(`${type}-url`) || document.getElementById(`${type}-url-input`);
            if (urlInput) urlInput.value = "Yerel Dosya Yüklendi (Sıkıştırıldı)";
        };
    };
    reader.readAsDataURL(file);
}

        async function searchTeamLogos(type) {
            const nameInput = document.getElementById(`${type}-name${type==='setup'? '':'-input'}`).value.trim();
            const resultsContainer = document.getElementById(`${type}-logo-results`);
            
            if (!nameInput) { 
                alert('Lütfen aramak için bir takım adı girin!'); 
                return; 
            }

            if(resultsContainer) {
                resultsContainer.innerHTML = '<div class="text-xs text-slate-400 w-full text-center py-2"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Sayfadaki tüm görseller taranıyor...</div>';
                resultsContainer.classList.remove('hidden');
            }

            let logoUrls = [];

            try {
                // 1. Adım: Türkçe Wikipedia'da arama yap ve eşleşen sayfaları bul
                const searchApi = `https://tr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(nameInput)}&format=json&origin=*`;
                const searchRes = await fetch(searchApi);
                const searchData = await searchRes.json();

                if (searchData.query && searchData.query.search.length > 0) {
                    // İlk 2 Wikipedia sayfasını tara
                    for (let i = 0; i < Math.min(2, searchData.query.search.length); i++) {
                        const pageTitle = searchData.query.search[i].title;

                        // 2. Adım: O sayfada kullanılan TÜM görsellerin listesini çek
                        const imagesApi = `https://tr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=images&imlimit=50&format=json&origin=*`;
                        const imgRes = await fetch(imagesApi);
                        const imgData = await imgRes.json();

                        const pages = imgData.query.pages;
                        for (let pageId in pages) {
                            if (pages[pageId].images) {
                                // Sadece uzantısı .png veya .svg olan tüm dosyaları al (hiçbir kelime filtresi yok)
                                const fileList = pages[pageId].images
                                    .map(img => img.title)
                                    .filter(title => {
                                        const t = title.toLowerCase();
                                        return t.endsWith('.png') || t.endsWith('.svg');
                                    });

                                // 3. Adım: Bu görselleri tek seferde (toplu/batched) CDN URL'leri ile çek
                                if (fileList.length > 0) {
                                    const batchTitles = fileList.slice(0, 30).map(t => encodeURIComponent(t)).join('|');
                                    const fileInfoApi = `https://tr.wikipedia.org/w/api.php?action=query&titles=${batchTitles}&prop=imageinfo&iiprop=url&format=json&origin=*`;
                                    const fileRes = await fetch(fileInfoApi);
                                    const fileData = await fileRes.json();
                                    const filePages = fileData.query?.pages || {};
                                    
                                    for (let fPageId in filePages) {
                                        if (filePages[fPageId].imageinfo && filePages[fPageId].imageinfo[0].url) {
                                            logoUrls.push(filePages[fPageId].imageinfo[0].url);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Eğer Türkçe kaynakta bulunamazsa İngilizce Wikipedia'da (en.wikipedia) aynısını süzmeden tekrar dene
                if (logoUrls.length === 0) {
                    const enSearchApi = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(nameInput)}&format=json&origin=*`;
                    const enRes = await fetch(enSearchApi);
                    const enData = await enRes.json();

                    if (enData.query && enData.query.search.length > 0) {
                        const pageTitle = enData.query.search[0].title;
                        const enImgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=images&imlimit=50&format=json&origin=*`);
                        const enImgData = await enImgRes.json();
                        const pages = enImgData.query.pages;
                        
                        for (let pageId in pages) {
                            if (pages[pageId].images) {
                                const fileList = pages[pageId].images
                                    .map(img => img.title)
                                    .filter(t => t.toLowerCase().endsWith('.png') || t.toLowerCase().endsWith('.svg'));

                                if (fileList.length > 0) {
                                    const batchTitles = fileList.slice(0, 30).map(t => encodeURIComponent(t)).join('|');
                                    const fileInfoApi = `https://en.wikipedia.org/w/api.php?action=query&titles=${batchTitles}&prop=imageinfo&iiprop=url&format=json&origin=*`;
                                    const fileRes = await fetch(fileInfoApi);
                                    const fileData = await fileRes.json();
                                    const filePages = fileData.query?.pages || {};
                                    
                                    for (let fPageId in filePages) {
                                        if (filePages[fPageId].imageinfo && filePages[fPageId].imageinfo[0].url) {
                                            logoUrls.push(filePages[fPageId].imageinfo[0].url);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            } catch (err) {
                console.error("Görsel arama hatası:", err);
            }

            // Benzersiz hale getir
            logoUrls = [...new Set(logoUrls)];

            if (resultsContainer) {
                if (logoUrls.length === 0) {
                    resultsContainer.innerHTML = '<div class="text-xs text-yellow-500 w-full text-center py-2">Bu arama için Wikipedia\'da görsel bulunamadı.</div>';
                    return;
                }

                // Bulunan TÜM PNG ve SVG görsellerini aşağıda yan yana sırala
                resultsContainer.innerHTML = logoUrls.map(url => `
                    <div class="flex-shrink-0 relative group">
                        <img src="${url}" class="w-12 h-12 object-contain bg-slate-900/90 p-1 rounded-lg cursor-pointer hover:scale-110 border-2 border-transparent ${type}-search-img transition-transform" onclick="selectSearchedLogo('${type}', '${url}', this)" title="Seçmek için tıkla">
                    </div>
                `).join('');
            }
        }

        function selectSearchedLogo(type, url, imgElement) {
            document.querySelectorAll(`.${type}-search-img`).forEach(el => el.classList.remove('border-emerald-500', 'bg-emerald-100'));
            imgElement.classList.add('border-emerald-500', 'bg-emerald-100');
            document.getElementById(`${type}-url-input`).value = url;
            fileUploads[type] = null;
            document.getElementById(`${type}-upload-btn`).classList.replace('text-emerald-400', 'text-slate-300');
        }

        // --- OYUNCU FACECARD / FOTOĞRAF ARAMA ---
        async function searchPlayerPhotos() {
            const nameInput = document.getElementById('pi-name').value.trim();
            const resultsContainer = document.getElementById('pi-photo-results');
            if (!nameInput) { alert('Lütfen arama yapmak için oyuncunun adını girin!'); return; }

            resultsContainer.innerHTML = '<div class="text-xs text-slate-400 w-full text-center"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Facecard Taranıyor...</div>';
            resultsContainer.classList.remove('hidden');

            let results = [];

            // --- 1. MOTOR: TheSportsDB API (Şeffaf PNG "Facecard" Kesimi - strCutout) ---
            try {
                const sdbUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nameInput)}`;
                let sdbRes = await fetch(sdbUrl);
                let sdbData = await sdbRes.json();
                if (sdbData && sdbData.player) {
                    sdbData.player.forEach(p => {
                        if (p.strCutout) results.push(p.strCutout); // Şeffaf facecard kesimi (öncelikli)
                        if (p.strThumb) results.push(p.strThumb);   // Normal fotoğraf (yedek)
                        if (p.strRender) results.push(p.strRender); // FIFA tarzı render (varsa)
                    });
                }
            } catch (e) {
                console.warn("TheSportsDB oyuncu motoru hata verdi:", e);
            }

            // --- 2. MOTOR: Wikipedia (Yedek - Gerçek Fotoğraf) ---
            try {
                const wikiUrl = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nameInput)}`;
                let wikiRes = await fetch(wikiUrl);
                if (wikiRes.ok) {
                    let wikiData = await wikiRes.json();
                    if (wikiData.thumbnail && wikiData.thumbnail.source) {
                        results.push(wikiData.thumbnail.source.replace(/\/\d+px-/, '/300px-'));
                    }
                }
            } catch (e) {
                console.warn("Wikipedia motoru hata verdi:", e);
            }

            results = [...new Set(results)].slice(0, 15);

            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="text-xs text-yellow-500 w-full text-center">Sonuç bulunamadı. İsmi kontrol edip tekrar deneyin veya URL/Dosya ile manuel ekleyin.</div>';
                return;
            }

            resultsContainer.innerHTML = results.map(url => `
                <div class="flex-shrink-0 relative group">
                    <img src="${url}" class="w-12 h-14 object-contain bg-slate-200/90 p-1 rounded cursor-pointer hover:scale-110 border-2 border-transparent pi-photo-search-img" onclick="selectSearchedPlayerPhoto('${url}', this)" title="Seç">
                </div>
            `).join('');
        }

        function selectSearchedPlayerPhoto(url, imgElement) {
            document.querySelectorAll('.pi-photo-search-img').forEach(el => el.classList.remove('border-emerald-500', 'bg-emerald-100'));
            imgElement.classList.add('border-emerald-500', 'bg-emerald-100');
            document.getElementById('pi-photo-url').value = url;
            fileUploads['pi-photo'] = null;
            document.getElementById('pi-photo-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
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
                squadContext = subId === 'kadro-astakim' ? 'astakim' : (subId === 'kadro-akademi' ? 'akademi' : 'milli');
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
                            <button onclick="${currentUser ? 'signOutOfCloud()' : 'signInWithGoogle()'}" class="${currentUser ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-600 hover:bg-blue-500'} text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
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
                    <table class="w-full border-separate border-spacing-0 text-sm origin-top-left" style="transform: scale(${currentScale}); transform-origin: top left; width: calc(100% / ${currentScale});">
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

            // --- YENİ: Takımları Ülkelere Göre Gruplama ve Sıralama Motoru ---
            const sortTeamsByCountry = (teamsArr) => {
                // Boş hücreleri (ismi olmayanları) ayır
                const emptyTeams = teamsArr.filter(t => !t.name || t.name.trim() === '');
                const filledTeams = teamsArr.filter(t => t.name && t.name.trim() !== '');

                // Dolu takımları ülkesine göre grupla
                const countryMap = {};
                filledTeams.forEach(t => {
                    const c = (t.country || '').trim().toUpperCase() || 'BİLİNMEYEN';
                    if(!countryMap[c]) countryMap[c] = [];
                    countryMap[c].push(t);
                });

                // Ülkeleri, sahip oldukları takım sayısına göre ÇOKTAN AZA doğru sırala
                const sortedCountries = Object.keys(countryMap).sort((a, b) => {
                    const countDiff = countryMap[b].length - countryMap[a].length;
                    if (countDiff !== 0) return countDiff; // Çok olan sola geçer
                    if (a === 'BİLİNMEYEN') return 1; // Bilinmeyenler sağa atılır
                    if (b === 'BİLİNMEYEN') return -1;
                    return a.localeCompare(b, 'tr', { sensitivity: 'base' }); // Eşitse alfabetik
                });

                // Sıralanmış ülkelerin içindeki takımları da kendi içinde alfabetik diz
                let sortedFilled = [];
                sortedCountries.forEach(c => {
                    const sortedInCountry = countryMap[c].sort((a, b) => a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' }));
                    sortedFilled.push(...sortedInCountry);
                });

                // Mevcut diziyi (referansını bozmadan) yeni sırayla güncelle
                teamsArr.length = 0;
                
                if (sortedFilled.length === 0) {
                    // HATA ÇÖZÜMÜ: Eğer kıtada hiç takım kalmadıysa tablonun (colspan="0") kaymasını 
                    // önlemek ve ekranda görünmesini sağlamak için 1 adet boş (hayalet) slot bırakıyoruz.
                    teamsArr.push({ id: `empty_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, name: '', logoUrl: '', country: '' });
                } else {
                    teamsArr.push(...sortedFilled);
                }
            };

            // Tabloyu çizmeden önce grupları yukarıdaki kurala göre sırala (Milli takımda da çalışması için isKulup kontrolü kaldırıldı)
            sortTeamsByCountry(opps.domestic.teams);
            opps.foreign.forEach(grp => sortTeamsByCountry(grp.teams));
            
            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <h3 class="text-2xl font-bold text-white">${isKulup ? 'Kulüp' : 'Milli Takım'} Fikstür & Sonuçlar</h3>
                    <div class="flex items-center gap-4">
                        <button onclick="addNewForeignGroup()" class="bg-blue-900/50 hover:bg-blue-800 text-blue-300 px-3 py-1.5 rounded text-xs border border-blue-800 transition-colors"><i class="fa-solid fa-plus mr-1"></i>Yeni Kıta Grubu</button>
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-full border-separate border-spacing-0 text-sm origin-top-left" style="transform: scale(${currentScale}); transform-origin: top left; width: calc(100% / ${currentScale});">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <!-- Sol Sabit Logo Hücresi -->
                                <th rowspan="3" class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-950 z-[60] min-w-[96px] w-24 align-middle shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                                    <div class="relative group cursor-pointer" onclick="openManagedTeamModal()">
                                        <img src="${team.logoUrl}" alt="${team.name}" class="w-16 h-16 mx-auto object-contain drop-shadow-lg" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=random&color=fff'">
                                        <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded transition-opacity"><i class="fa-solid fa-pen text-white"></i></div>
                                    </div>
                                </th>
            `;

            // 1. SATIR: ÜST BÖLGELER / KITALAR (Milli Takım da foreign destekleyecek)
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
            html += `</tr><tr>`;

            // 2. SATIR: BAYRAKLAR (ÜLKE BLOKLARI)
            const renderCountryRow = (teamsArr, grpColor) => {
                if (teamsArr.length === 0) return '';
                let countryRuns = [];
                let currentCountry = (teamsArr[0].name && teamsArr[0].name.trim() !== '') ? ((teamsArr[0].country || '').trim().toUpperCase() || 'BİLİNMEYEN') : '';
                let currentCount = 1;

                for (let i = 1; i < teamsArr.length; i++) {
                    let tCountry = (teamsArr[i].name && teamsArr[i].name.trim() !== '') ? ((teamsArr[i].country || '').trim().toUpperCase() || 'BİLİNMEYEN') : '';
                    if (tCountry === currentCountry) {
                        currentCount++;
                    } else {
                        countryRuns.push({ country: currentCountry, count: currentCount });
                        currentCountry = tCountry;
                        currentCount = 1;
                    }
                }
                countryRuns.push({ country: currentCountry, count: currentCount });

                let countryHtml = '';
                countryRuns.forEach(run => {
                    const flagContent = (run.country && run.country !== 'BİLİNMEYEN') ? getFlagIcon(run.country) : '';
                    countryHtml += `<th colspan="${run.count}" class="p-1 border-r border-b border-slate-700 text-center shadow-inner" style="background-color: ${grpColor}70">${flagContent}</th>`;
                });
                return countryHtml;
            };

            html += renderCountryRow(opps.domestic.teams, opps.domestic.color);
            opps.foreign.forEach(grp => {
                html += renderCountryRow(grp.teams, grp.color);
            });
            html += `</tr><tr>`;

            // 3. SATIR: TAKIM LOGOLARI
            const renderOpponentHeader = (opp, groupType, groupIndex, index, grpColor) => {
                const winRate = getWinRate(opp.id);
                const winRateStr = winRate !== null ? `%${winRate}` : '-';
                const winRateColor = getWinRateColorClass(winRate);
                return `
                    <th class="p-2 border-r border-b border-slate-700 min-w-[84px] w-[84px] relative group cursor-pointer hover:bg-slate-800 transition-colors align-top" style="background-color: ${grpColor}40" onclick="handleOpponentClick('${groupType}', ${groupIndex}, ${index})">
                        <div class="h-12 w-12 mx-auto bg-slate-200/90 rounded p-1 shadow hover:scale-110 transition-transform">
                            <img src="${opp.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(opp.name)}`}" title="${opp.name}" class="w-full h-full object-contain">
                        </div>
                        <div class="text-[11px] font-bold mt-1 text-center ${winRateColor}" title="Galibiyet Yüzdesi">${winRateStr}</div>
                    </th>`;
            };

            opps.domestic.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'domestic', 0, i, opps.domestic.color));
            opps.foreign.forEach((grp, gIdx) => {
                grp.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'foreign', gIdx, i, grp.color));
            });
            html += `</tr></thead><tbody>`;

            // 4. SATIRLAR: MAÇ SONUÇLARI KUTULARI
            seasonsList.forEach((season, sIdx) => {
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">
                            <td class="p-0 py-4 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 font-bold text-slate-200 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-24 min-w-[96px] align-middle cursor-pointer hover:bg-slate-800 transition-colors relative" onclick="openSeasonStatsModal('${season}')" title="Sezon İstatistikleri">
                                <div class="mx-auto text-sm tracking-widest whitespace-nowrap text-emerald-500">${season}</div>
                                <button onclick="event.stopPropagation(); deleteSeason('${season}')" class="absolute top-1 left-1 opacity-0 group-hover/srow:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                            </td>`;

                const renderMatchCell = (opp, grpColor) => {
                    if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};
                    let cellData = matchDataStore[matchContext][season][opp.id] || [];
                    
                    let hasData = cellData.some(m => m && (m.result || m.fixtureId)); 
                    
                    if (!hasData) {
                        return `<td class="p-1 border-r border-b border-slate-700 align-middle cursor-pointer hover:bg-slate-700 transition-colors" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')"></td>`;
                    }

                    let boxesHtml = cellData.map(match => {
                        if (!match || (!match.result && !match.fixtureId)) return ''; 
                        let loc = match.location === 'H' ? 'E' : (match.location === 'A' ? 'D' : 'T');
                        
                        let hasScore = (match.teamScore !== '' && match.teamScore !== undefined && match.oppScore !== '' && match.oppScore !== undefined);
                        let scoreStr = hasScore ? `${match.teamScore}-${match.oppScore}` : '-';
                        let resultClass = match.result ? `match-${match.result}` : 'bg-slate-600 border-slate-500 opacity-70';

                        return `<div class="match-box ${resultClass}" title="${loc} | ${match.tournament}\nSkor: ${scoreStr}">
                                    <span class="score-display">${scoreStr}</span>
                                </div>`;
                    }).join('');

                    return `<td class="p-1 border-r border-b border-slate-700 align-middle cursor-pointer hover:bg-slate-700 transition-colors" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')">
                                <div class="flex flex-wrap justify-center gap-1 w-full mx-auto p-1 rounded">${boxesHtml}</div>
                            </td>`;
                };

                opps.domestic.teams.forEach(opp => html += renderMatchCell(opp, opps.domestic.color));
                opps.foreign.forEach(grp => {
                    grp.teams.forEach(opp => html += renderMatchCell(opp, grp.color));
                });
                
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
            // Kulüp verilerini doldur
            const club = managedTeams.kulup;
            document.getElementById('managed-name-input').value = club.name || '';
            document.getElementById('managed-url-input').value = club.logoUrl || '';
            document.getElementById('managed-country-input').value = club.country || 'TUR';
            
            // Milli takım verilerini doldur
            const national = managedTeams.milli;
            document.getElementById('national-name-input').value = national.name || '';
            document.getElementById('national-url-input').value = national.logoUrl || '';
            
            // Dosya yükleme statülerini sıfırla
            fileUploads.managed = null;
            document.getElementById('managed-file-input').value = '';
            document.getElementById('managed-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('managed-logo-results').classList.add('hidden');
            
            fileUploads.national = null;
            document.getElementById('national-file-input').value = '';
            document.getElementById('national-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('national-logo-results').classList.add('hidden');
            
            const modal = document.getElementById('managed-team-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeManagedTeamModal() {
            document.getElementById('managed-team-modal').classList.add('hidden');
            document.getElementById('managed-team-modal').classList.remove('flex');
        }

        function saveManagedTeam() {
            // Kulüp Takımı Değerleri
            const clubName = document.getElementById('managed-name-input').value.trim();
            const clubUrl = document.getElementById('managed-url-input').value.trim();
            const clubCountry = document.getElementById('managed-country-input').value.trim().toUpperCase();
            const clubLogo = fileUploads.managed || (clubUrl !== "Yerel Dosya Seçildi" ? clubUrl : null);

            // Milli Takım Değerleri
            const natName = document.getElementById('national-name-input').value.trim();
            const natUrl = document.getElementById('national-url-input').value.trim();
            const natLogo = fileUploads.national || (natUrl !== "Yerel Dosya Seçildi" ? natUrl : null);

            // Kulüp Takımını Kaydet
            if(clubName) {
                managedTeams.kulup.name = clubName;
                managedTeams.kulup.country = clubCountry || 'TUR';
                leagueHistoryData[0].name = clubName;
            }
            if(clubLogo) managedTeams.kulup.logoUrl = clubLogo;

            // Milli Takımı Kaydet
            if(natName) {
                managedTeams.milli.name = natName;
                managedTeams.milli.country = clubCountry || 'TUR'; // Ana ülke kodu aynı kalır
            }
            if(natLogo) managedTeams.milli.logoUrl = natLogo;

            // Sol taraftaki sidebar logosunu güncelle (Her zaman kulüp kalır)
            document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;

            saveToLocalStorage();
            closeManagedTeamModal();
            
            // Eğer maçlar veya lig tarihi açıksa tabloyu yenile
            if(activeMain === 'maclar') renderMatchesGrid();
            if(activeMain === 'ligtarihi') renderLeagueHistory();
        }

        function addOpponentColumn(groupType, groupIndex) {
            const newId = `${matchContext === 'kulup' ? 'k' : 'm'}_${groupType.charAt(0)}_${Date.now()}`;
            // Boş görünmemesi ve anında listeye girmesi için geçici bir isim veriyoruz
            const newOpp = { id: newId, name: 'Yeni Takım', logoUrl: '', country: groupType === 'domestic' ? 'TURKEY' : '' };
            
            let targetArray = groupType === 'domestic' ? opponentsConfig[matchContext].domestic.teams : opponentsConfig[matchContext].foreign[groupIndex].teams;
            targetArray.push(newOpp);
            
            saveToLocalStorage();
            renderMatchesGrid();
            
            // Tablo çizildikten sonra, eklenen takımı bul ve anında düzenleme penceresini aç
            const newIndex = targetArray.findIndex(t => t.id === newId);
            if (newIndex !== -1) {
                openOpponentEditorModal(matchContext, groupType, groupIndex, newIndex);
                
                // Kullanıcıya kolaylık olması için inputu temizle ve odakla
                setTimeout(() => {
                    const nameInput = document.getElementById('opp-name-input');
                    if (nameInput) {
                        nameInput.value = '';
                        nameInput.focus();
                    }
                }, 50);
            }
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
            const continentDiv = document.getElementById('opp-continent-container');
            const continentInput = document.getElementById('opp-continent-input');

            countryLbl.innerText = "Ülke Adı veya Kodu (Örn: Türkiye, Spain, TR)";

            // Hem kulüp hem milli takımlar için ülke ve kıta alanlarını göster
            countryDiv.classList.remove('hidden');
            document.getElementById('opp-country-input').value = opp.country || '';

            continentDiv.classList.remove('hidden');
            if (groupType === 'domestic') {
                continentInput.value = opponentsConfig[context].domestic.name;
            } else {
                continentInput.value = opponentsConfig[context].foreign[groupIndex].name;
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
            
            // Kullanıcının girdiği metni alıp süzgeçten (Çevirmen) geçiriyoruz
            const rawCountry = document.getElementById('opp-country-input').value;
            const country = normalizeCountryInput(rawCountry);
            // ...
            const name = document.getElementById('opp-name-input').value.trim();
            const url = document.getElementById('opp-url-input').value.trim();
            let logo = fileUploads.opp || (url !== "Yerel Dosya Seçildi" ? url : null);

            if(!name) { alert("Takım adı zorunludur!"); return; }
            if(!logo) logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

            const typedContinent = document.getElementById('opp-continent-input').value.trim();
            // Kıta/Grup yazılmamışsa, ülke kodundan otomatik bul
            const targetContinent = typedContinent || getContinentForCountry(country);

            // Mevcut takımı güncelle
            let updatedOpp;
            if(groupType === 'domestic') {
                updatedOpp = { ...opponentsConfig[context].domestic.teams[index], name, logoUrl: logo, country };
            } else {
                updatedOpp = { ...opponentsConfig[context].foreign[groupIndex].teams[index], name, logoUrl: logo, country };
            }

            // --- TAŞIMA MANTIĞI (Hem Kulüp Hem Milli İçin Ortak) ---
            if (targetContinent.toUpperCase() === opponentsConfig[context].domestic.name.toUpperCase()) {
                // Ana gruba (Yurtiçi/Avrupa) taşı
                if (groupType !== 'domestic') {
                    opponentsConfig[context].foreign[groupIndex].teams.splice(index, 1);
                    opponentsConfig[context].domestic.teams.push(updatedOpp);
                } else {
                    opponentsConfig[context].domestic.teams[index] = updatedOpp;
                }
            } else {
                // Alt gruplara (Kıtalar/Ülkeler) taşı
                let targetGroup = opponentsConfig[context].foreign.find(g => g.name.toUpperCase() === targetContinent.toUpperCase());
                
                // Grup yoksa yeni oluştur
                if (!targetGroup) {
                    targetGroup = { id: 'f_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5), name: targetContinent, color: '#1e3a8a', teams: [] };
                    opponentsConfig[context].foreign.push(targetGroup);
                }
                
                if (groupType === 'domestic') {
                    opponentsConfig[context].domestic.teams.splice(index, 1);
                    targetGroup.teams.push(updatedOpp);
                } else if (targetGroup === opponentsConfig[context].foreign[groupIndex]) {
                    opponentsConfig[context].foreign[groupIndex].teams[index] = updatedOpp;
                } else {
                    opponentsConfig[context].foreign[groupIndex].teams.splice(index, 1);
                    targetGroup.teams.push(updatedOpp);
                }
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
                    
                    // YENİ EKLENEN KOD: Eski gol ve asistleri yeni sisteme otomatik taşı (Migration)
                    if (m.events.length === 0 && (m.goals?.length > 0 || m.assists?.length > 0)) {
                        let maxLen = Math.max(m.goals?.length || 0, m.assists?.length || 0);
                        for (let j = 0; j < maxLen; j++) {
                            m.events.push({
                                min: '',
                                type: 'US', // Golün bizim takım (US) tarafından atıldığını belirtir
                                scorer: m.goals && m.goals[j] ? m.goals[j] : '',
                                assist: m.assists && m.assists[j] ? m.assists[j] : ''
                            });
                        }
                        // Taşınan eski verileri temizle ki çakışma yapmasın
                        m.goals = [];
                        m.assists = [];
                    }
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
                        oppGoals: activeMatchesTemp[i].oppGoals || [],
                        fixtureId: activeMatchesTemp[i].fixtureId || null
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

        // Sezonlar panelindeki bir maçı Maçlar (fikstür) panelindeki karşılığıyla eşler.
        // Daha önce eşlenmişse (fixtureId varsa) mevcut fikstür kaydını günceller, yoksa yenisini oluşturur.
        function syncSeasonMatchToFixture(m, season, oppName) {
            const teamName = managedTeams.kulup.name || '';
            if (!fixtureData[season]) fixtureData[season] = [];
            const seasonFixtures = fixtureData[season];

            const isHome = m.location !== 'A'; // 'H' veya 'N' -> takım "home" alanına yazılır
            const homeName = isHome ? teamName : oppName;
            const awayName = isHome ? oppName : teamName;
            const ground = m.location === 'H' ? 'home' : (m.location === 'A' ? 'away' : 'neutral');

            const toScore = (v) => (v !== '' && v !== undefined && v !== null && !isNaN(parseInt(v))) ? parseInt(v) : '';
            const teamScoreVal = toScore(m.teamScore);
            const oppScoreVal = toScore(m.oppScore);
            const homeScore = isHome ? teamScoreVal : oppScoreVal;
            const awayScore = isHome ? oppScoreVal : teamScoreVal;
            const events = JSON.parse(JSON.stringify(m.events || []));

            let fixture = m.fixtureId ? seasonFixtures.find(f => f.id === m.fixtureId) : null;

            if (fixture) {
                fixture.tournament = m.tournament;
                fixture.ground = ground;
                fixture.home = homeName;
                fixture.away = awayName;
                fixture.homeScore = homeScore;
                fixture.awayScore = awayScore;
                fixture.events = events;
            } else {
                const maxNo = seasonFixtures.reduce((max, f) => Math.max(max, parseInt(f.matchNo) || 0), 0);
                fixture = {
                    id: 'fx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                    matchNo: (maxNo + 1).toString(),
                    tournament: m.tournament || '',
                    ground: ground,
                    home: homeName,
                    away: awayName,
                    homeScore: homeScore,   // Skor girilmediyse '' kalır -> Maçlar panelinde boş (-) görünür
                    awayScore: awayScore,
                    events: events
                };
                seasonFixtures.push(fixture);
                m.fixtureId = fixture.id; // Sezonlar panelindeki maçı bu fikstür kaydına bağla
            }
        }

        function saveMatchData() {
            syncMatchSlotsToTemp();
            const { season, oppId, oppName } = activeMatchInfo;
            if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};

            // Sadece kulüp maçlarını Maçlar (fikstür) paneline senkronize et
            if (matchContext === 'kulup') {
                const prevMatches = matchDataStore[matchContext][season][oppId] || [];
                const prevFixtureIds = prevMatches.map(m => m.fixtureId).filter(Boolean);

                activeMatchesTemp.forEach(m => syncSeasonMatchToFixture(m, season, oppName));

                // Sezonlar panelinden silinen maçları Maçlar panelinden de kaldır
                const currentFixtureIds = activeMatchesTemp.map(m => m.fixtureId).filter(Boolean);
                const removedFixtureIds = prevFixtureIds.filter(id => !currentFixtureIds.includes(id));
                if (removedFixtureIds.length && fixtureData[season]) {
                    fixtureData[season] = fixtureData[season].filter(f => !removedFixtureIds.includes(f.id));
                }
            }

            matchDataStore[matchContext][season][oppId] = activeMatchesTemp;
            saveToLocalStorage();
            closeMatchEditorModal();
            renderMatchesGrid();
        }

        // --- OYUNCU GELİŞİM VE YAŞ HESAPLAMA MOTORU ---
        function getPrevOvr(player, season, type) {
            const sIdx = seasonsList.indexOf(season);
            if (sIdx === -1) return parseInt(player.joinOvr) || 0;

            if (type === 's2') {
                // Aynı sezonun s1 (İlk Yarı) değerine bak
                if (player.history && player.history[season] && player.history[season].s1o) {
                    return parseInt(player.history[season].s1o);
                }
            }

            // Önceki sezonlara doğru geriye git
            for (let i = sIdx - 1; i >= 0; i--) {
                const prevS = seasonsList[i];
                if (player.history && player.history[prevS]) {
                    if (player.history[prevS].s2o) return parseInt(player.history[prevS].s2o);
                    if (player.history[prevS].s1o) return parseInt(player.history[prevS].s1o);
                }
            }
            return parseInt(player.joinOvr) || 0;
        }

        function getExpectedAge(player, season, type) {
            const targetIdx = seasonsList.indexOf(season);
            if (targetIdx === -1) return parseInt(player.joinAge) || 18;

            if (type === 's2') {
                if (player.history && player.history[season] && player.history[season].s1a) {
                    return parseInt(player.history[season].s1a); 
                }
            }

            for (let i = targetIdx; i >= 0; i--) {
                const checkS = seasonsList[i];
                if (player.history && player.history[checkS]) {
                    if (i === targetIdx && type === 's1') continue;
                    if (player.history[checkS].s2a) return parseInt(player.history[checkS].s2a) + (targetIdx - i);
                    if (player.history[checkS].s1a) return parseInt(player.history[checkS].s1a) + (targetIdx - i);
                }
            }

            // Hiç geçmiş bulunamadıysa giriş yılına göre hesapla
            let joinSeasonIdx = -1;
            for (let i = 0; i < seasonsList.length; i++) {
                if (player.history && player.history[seasonsList[i]] && Object.keys(player.history[seasonsList[i]]).length > 0) {
                    joinSeasonIdx = i; break;
                }
            }
            if (joinSeasonIdx === -1 || targetIdx < joinSeasonIdx) return parseInt(player.joinAge) || 18;

            return parseInt(player.joinAge) + (targetIdx - joinSeasonIdx);
        }

        function getDeltaHtml(current, prev) {
            if (!current || !prev) return '';
            const diff = parseInt(current) - parseInt(prev);
            if (diff > 0) return `<span class="text-[10px] font-black text-emerald-400 ml-1.5 drop-shadow-md">+${diff}</span>`;
            if (diff < 0) return `<span class="text-[10px] font-black text-red-400 ml-1.5 drop-shadow-md">${diff}</span>`;
            return ''; // Fark sıfırsa bir şey göstermiyoruz, kalabalık yapmasın
        }
        // ----------------------------------------------

        // --- KADRO TABLOSU ---
        function renderSquadGrid() {
            updateMockPlayers();
            let players = squadData[squadContext];
            let squadSeasons = [...seasonsList].reverse();
            
            // Kulüp bağlamında (astakim/akademi) 'kulup' istatistiklerini, Milli'de 'milli' istatistiklerini kullan
            const statsCtx = squadContext === 'milli' ? 'milli' : 'kulup';
            const goalAssistMap = {};
                getStatsData(statsCtx).stats.forEach(s => { goalAssistMap[s.name.toLowerCase()] = s; });

            // İstediğiniz kesin sıraya ve gruplara göre mevki tanımları
            const groups = [
                { id: 'GK', label: 'KALECİLER', strip: 'bg-orange-600/30' },
                { id: 'CB', label: 'STOPERLER', strip: 'bg-blue-600/30' },
                { id: 'LB', label: 'SOL BEKLER', strip: 'bg-blue-600/30' },
                { id: 'RB', label: 'SAĞ BEKLER', strip: 'bg-blue-600/30' },
                { id: 'DM', label: 'ÖN LİBEROLAR', strip: 'bg-green-600/30' },
                { id: 'CM', label: 'MERKEZ ORTA SAHALAR', strip: 'bg-green-600/30' },
                { id: 'AM', label: 'OFANSİF ORTA SAHALAR', strip: 'bg-green-600/30' },
                { id: 'LM', label: 'SOL ORTA SAHALAR', strip: 'bg-green-600/30' },
                { id: 'RM', label: 'SAĞ ORTA SAHALAR', strip: 'bg-green-600/30' },
                { id: 'LW', label: 'SOL AÇIKLAR', strip: 'bg-red-600/30' },
                { id: 'RW', label: 'SAĞ AÇIKLAR', strip: 'bg-red-600/30' },
                { id: 'ST', label: 'SANTRFORLAR', strip: 'bg-red-600/30' }
            ];

            const getGroupForPos = (pos) => {
                const upperPos = (pos || '').toUpperCase().trim();
                // Oyuncunun mevkisini doğrudan ilgili gruba eşle
                const validGroups = ['GK', 'CB', 'LB', 'RB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'];
                return validGroups.includes(upperPos) ? upperPos : 'CM';
            };

            // Satır arkaplanı için 12 mevkiyi 4 ana kategoriye (GK/DEF/MID/FWD) indirger.
            // style.css'te sadece bu 4 sınıf (.bg-row-GK/.DEF/.MID/.FWD) tanımlı olduğundan
            // rowBgClass'ı doğrudan getGroupForPos() sonucuyla değil, bununla oluşturuyoruz.
            const macroGroupMap = {
                GK: 'GK',
                CB: 'DEF', LB: 'DEF', RB: 'DEF',
                DM: 'MID', CM: 'MID', AM: 'MID', LM: 'MID', RM: 'MID',
                LW: 'FWD', RW: 'FWD', ST: 'FWD'
            };
            const getMacroGroupForPos = (pos) => macroGroupMap[getGroupForPos(pos)] || 'MID';

            const staticCols = [
                { id: 'pos', label: 'Mevki', w: 40, align: 'center' },
                { id: 'name', label: 'İsim Soyisim', w: 180, align: 'left', pl: 'pl-3' },
                { id: 'countryCode', label: 'Ülke', w: 40, align: 'center' },
                { id: 'joinAge', label: 'Yaş', w: 35, align: 'center' },
                { id: 'joinOvr', label: 'OVR', w: 40, align: 'center' },
                { id: 'growth', label: '+/-', w: 45, align: 'center' } // YENİ: Gelişim sütunu
            ];
            
            if (squadContext === 'akademi') {
                staticCols.push({ id: 'pot', label: 'POT', w: 45, align: 'center' });
            } else if (squadContext === 'milli') {
                staticCols.push({ id: 'teamName', label: 'Kulüp', w: 55, align: 'center' });
                staticCols.push({ id: 'caps', label: 'Forma', w: 45, align: 'center' });
            }
            // ↓↓↓ these two lines must be OUTSIDE/AFTER the if/else, unindented from it
                staticCols.push({ id: 'totalGoals', label: 'Gol', w: 40, align: 'center' });
                staticCols.push({ id: 'totalAssists', label: 'Asist', w: 40, align: 'center' });
            
            let accW = 0;
            staticCols.forEach(c => { c.left = accW; accW += c.w; });
            const btnLeft = accW;
            const btnW = 35;

            const renderOvrBadge = (ovr) => {
                if(!ovr) return '';
                const n = parseInt(ovr);
                let colorClass = 'ovr-t11';
                if (n >= 95) colorClass = 'ovr-t1';
                else if (n >= 90) colorClass = 'ovr-t2';
                else if (n >= 85) colorClass = 'ovr-t3';
                else if (n >= 80) colorClass = 'ovr-t4';
                else if (n >= 75) colorClass = 'ovr-t5';
                else if (n >= 70) colorClass = 'ovr-t6';
                else if (n >= 65) colorClass = 'ovr-t7';
                else if (n >= 60) colorClass = 'ovr-t8';
                else if (n >= 55) colorClass = 'ovr-t9';
                else if (n >= 50) colorClass = 'ovr-t10';
                return `<span class="ovr-badge ${colorClass}">${ovr}</span>`;
            };

            const renderAgeBadge = (age) => {
                if(!age) return '';
                const n = parseInt(age);
                let colorClass = 'age-t9'; // fallback (36-50)
                if (n <= 15) colorClass = 'age-t1';
                else if (n <= 18) colorClass = 'age-t2';
                else if (n <= 21) colorClass = 'age-t3';
                else if (n <= 24) colorClass = 'age-t4';
                else if (n <= 26) colorClass = 'age-t5';
                else if (n <= 29) colorClass = 'age-t6';
                else if (n <= 32) colorClass = 'age-t7';
                else if (n <= 35) colorClass = 'age-t8';
                return `<span class="age-badge ${colorClass}">${age}</span>`;
            };

            const getTrBadge = (type, text) => {
                if (type === 'continue') return '';
                if (!text) return '';
                let bg = 'bg-slate-700 text-slate-300 border-slate-600';
                let icon = '';
                
                if (type === 'in') { bg = 'bg-emerald-600 text-white border-emerald-500 shadow-sm'; icon = '<i class="fa-solid fa-arrow-right-to-bracket mr-1"></i>'; }
                if (type === 'out') { bg = 'bg-red-600 text-white border-red-500 shadow-sm'; icon = '<i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>'; }
                if (type === 'renew') { bg = 'bg-purple-600 text-white border-purple-500 shadow-sm'; icon = '<i class="fa-solid fa-file-signature mr-1"></i>'; }
                if (type === 'loan_in') { bg = 'bg-blue-600 text-white border-blue-500 shadow-sm'; icon = '<i class="fa-solid fa-handshake-angle mr-1"></i>'; }
                if (type === 'loan_out') { bg = 'bg-orange-600 text-white border-orange-500 shadow-sm'; icon = '<i class="fa-solid fa-paper-plane mr-1"></i>'; }
                
                return `<div class="inline-block px-1.5 py-[1px] rounded font-bold border truncate text-[9px] max-w-full ${bg}">${icon}${text}</div>`;
            };

            const getTdBackground = (type, text, stripColor) => {
                // "none" (Boş) seçeneği haricindeki TÜM işlemlerde veya manuel not girildiğinde şerit rengini uygula
                if (type && type !== 'none') return stripColor;
                if (text && text.trim() !== '') return stripColor;
                return 'bg-transparent';
            };

            let html = `
                <div class="w-full flex justify-between items-center mb-3 px-2 shrink-0">
                    <div class="flex items-center gap-3">
                        <h3 class="text-2xl font-bold text-white">${squadContext === 'astakim' ? 'As Takım' : (squadContext === 'akademi' ? 'Akademi' : 'Milli Takım')} Gelişim Takibi</h3>
                        <button onclick="openPlayerInfoModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-user-plus mr-1"></i>Oyuncu Ekle</button>
                        <button onclick="openSquadBulkModal()" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-list-ol mr-1"></i>Toplu Ekle</button>
                    </div>
                    <div class="flex items-center gap-4">
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-full border-separate border-spacing-0 text-sm origin-top-left" style="transform: scale(${currentScale}); transform-origin: top left; width: calc(100% / ${currentScale}); min-width: max-content;">
                        <thead class="bg-slate-950 sticky top-0 z-[60] shadow-md">
                            <tr>
            `;
            
            staticCols.forEach(c => {
                let borderRight = c.id === 'totalAssists' ? 'border-r-2 border-slate-500' : 'border-r border-slate-700';
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
                    <th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[70px]">HAZ-ŞUB</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-orange-900/30 text-[9px] font-bold text-orange-300 min-w-[90px]">KIŞ TR.</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[70px]">ARA-EYL</th>
                    <th class="p-1 border-r border-b border-slate-700 bg-blue-900/30 text-[9px] font-bold text-blue-300 min-w-[90px]">YAZ TR.</th>
                `;
            });
            html += `</tr></thead><tbody>`;

            if (players.length === 0) {
                html += `<tr><td colspan="100%" class="p-4 text-center text-slate-500">Kayıtlı oyuncu bulunmuyor.</td></tr>`;
            } else {
                let activePlayers = players.filter(p => !p.isArchived);
                let archivedPlayers = players.filter(p => p.isArchived);

                const renderPlayerList = (list, isArchivedSection) => {
                    // YENİ: Listeyi render etmeden önce her oyuncunun "güncel" yaşını ve OVR'sini geçmişe bakarak hesapla
                    list.forEach(p => {
                        p.currentAge = p.joinAge;
                        p.currentOvr = p.joinOvr;
                        const gs = goalAssistMap[(p.name || '').toLowerCase()];
p.totalGoals = gs ? gs.overallGoals : 0;
p.totalAssists = gs ? gs.overallAssists : 0;
                        // Geçmişten günümüze (sondan başa) doğru tarama yap
                        for (let i = seasonsList.length - 1; i >= 0; i--) {
                            let s = seasonsList[i];
                            if (p.history && p.history[s]) {
                                if (p.history[s].s2o || p.history[s].s2a) {
                                    if (p.history[s].s2a) p.currentAge = p.history[s].s2a;
                                    if (p.history[s].s2o) p.currentOvr = p.history[s].s2o;
                                    break;
                                }
                                if (p.history[s].s1o || p.history[s].s1a) {
                                    if (p.history[s].s1a) p.currentAge = p.history[s].s1a;
                                    if (p.history[s].s1o) p.currentOvr = p.history[s].s1o;
                                    break;
                                }
                            }
                        }
                    });

                    let resultHtml = '';
                    groups.forEach(group => {
                        let groupPlayers = list.filter(p => getGroupForPos(p.pos) === group.id);
                        if (groupPlayers.length === 0) return;

                        groupPlayers.sort((a, b) => {
                            let valA = a[squadSort.field]; let valB = b[squadSort.field];
                            
                            // YENİ: Sıralama yapılırken "Geldiği" değil, dinamik hesaplanan "Güncel" değerleri baz al
                            if (squadSort.field === 'joinOvr') {
                                valA = Number(a.currentOvr || 0); valB = Number(b.currentOvr || 0);
                            } else if (squadSort.field === 'joinAge') {
                                valA = Number(a.currentAge || 0); valB = Number(b.currentAge || 0);
                            } else if (squadSort.field === 'caps') {
    valA = Number(a.caps || 0); valB = Number(b.caps || 0);
} else if (squadSort.field === 'totalGoals') {
    valA = Number(a.totalGoals || 0); valB = Number(b.totalGoals || 0);
} else if (squadSort.field === 'totalAssists') {
    valA = Number(a.totalAssists || 0); valB = Number(b.totalAssists || 0);
} else {
                                valA = (valA || '').toString().toLowerCase(); valB = (valB || '').toString().toLowerCase();
                            }
                            
                            if (valA < valB) return squadSort.asc ? -1 : 1;
                            if (valA > valB) return squadSort.asc ? 1 : -1;
                            return 0;
                        });

                        resultHtml += `<tr><td colspan="100%" class="h-3 bg-slate-950 border-y border-slate-700 shadow-inner"></td></tr>`;

                        groupPlayers.forEach(p => {
                            const safeName = escapeHtml(p.name); // XSS Koruması
                            let photoHtml = p.photoUrl ? `<img src="${p.photoUrl}" class="w-6 h-6 rounded-full inline-block mr-1.5 object-cover bg-slate-800">` : `<div class="w-6 h-6 rounded-full inline-flex items-center justify-center bg-slate-700 text-xs font-bold mr-1.5">${safeName.charAt(0)}</div>`;
                            let flagHtml = p.countryCode ? `<img src="https://flagcdn.com/24x18/${p.countryCode.toLowerCase()}.png" alt="${p.countryCode}" title="${p.countryCode.toUpperCase()}" class="w-5 h-auto mx-auto shadow-sm">` : '-';

                            let rowBgClass = `bg-row-${getMacroGroupForPos(p.pos)}`;
                            let archiveStyles = isArchivedSection ? 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0' : '';

                            resultHtml += `<tr class="group/row group-row hover:bg-slate-800/30 transition-colors ${archiveStyles}">`;
                            
                            staticCols.forEach(c => {
                                let content = '';
                                if(c.id === 'pos') content = `<span class="pos-${p.pos} font-black text-[10px]">${p.pos}</span>`;
                                else if(c.id === 'name') content = `<div class="flex items-center justify-start w-full overflow-hidden hover:text-emerald-400 cursor-pointer" onclick="openPlayerInfoModal('${p.id}')" title="Düzenle">${photoHtml}<span class="truncate text-xs font-bold">${safeName}</span></div>`;
                                else if(c.id === 'countryCode') content = flagHtml;
                                else if(c.id === 'joinAge') content = `<div class="flex items-center justify-center w-full h-full">${renderAgeBadge(p.currentAge)}</div>`;
                                else if(c.id === 'joinOvr') {
                                    // OVR sütunu artık sadece rozeti gösteriyor
                                    content = `<div class="flex items-center justify-center w-full h-full">${renderOvrBadge(p.currentOvr)}</div>`;
                                }
                                else if(c.id === 'growth') {
                                    // YENİ: Yeni gelişim sütunu mantığı
                                    let delta = (parseInt(p.currentOvr) || 0) - (parseInt(p.joinOvr) || 0);
                                    let deltaHtml = `<span class="text-[10px] text-slate-500 font-medium">-</span>`; // Gelişim yoksa "-" görünsün
                                    
                                    if (delta > 0) {
                                        deltaHtml = `<div class="flex items-center justify-center bg-emerald-950/60 border border-emerald-800/80 rounded-full px-1.5 py-[1px] text-emerald-400 shadow-inner"><span class="text-[6px] mr-0.5">▲</span><span class="text-[9px] font-black leading-none">${delta}</span></div>`;
                                    } else if (delta < 0) {
                                        deltaHtml = `<div class="flex items-center justify-center bg-red-950/60 border border-red-800/80 rounded-full px-1.5 py-[1px] text-red-400 shadow-inner"><span class="text-[6px] mr-0.5">▼</span><span class="text-[9px] font-black leading-none">${Math.abs(delta)}</span></div>`;
                                    }
                                    
                                    content = `<div class="flex items-center justify-center w-full h-full">${deltaHtml}</div>`;
                                }
                                else if(c.id === 'pot') content = `<span class="text-[10px] font-bold text-emerald-300">${p.pot || '-'}</span>`;
                                else if(c.id === 'teamName') content = p.teamLogo ? `<img src="${p.teamLogo}" title="${escapeHtml(p.teamName||'')}" class="w-7 h-7 object-contain mx-auto rounded bg-slate-200/10 p-0.5">` : `<span class="text-[9px] text-slate-500">-</span>`;
                                else if(c.id === 'caps') content = `<span class="text-[10px] font-bold text-blue-300">${p.caps || 0}</span>`;
                                else if(c.id === 'totalGoals') content = `<span class="text-[10px] font-bold text-emerald-400">${p.totalGoals}</span>`;
                                else if(c.id === 'totalAssists') content = `<span class="text-[10px] font-bold text-sky-400">${p.totalAssists}</span>`;
                                
                                let extraClasses = c.id === 'totalAssists' ? 'border-r-2 border-slate-500 shadow-[2px_0_5px_rgba(0,0,0,0.4)]' : 'border-r border-slate-700/50';

                                resultHtml += `<td class="p-1 ${extraClasses} border-b border-slate-700/50 sticky z-[50] ${rowBgClass} transition-colors text-${c.align} ${c.pl || ''}" style="left: ${c.left}px; width: ${c.w}px; min-width: ${c.w}px; max-width: ${c.w}px;">
                                            ${content}
                                         </td>`;
                            });
                            
                            resultHtml += `<td class="p-1 border-r-2 border-b border-slate-500 sticky z-[50] ${rowBgClass} transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.4)]" style="left: ${btnLeft}px; width: ${btnW}px; min-width: ${btnW}px;"></td>`;

                            squadSeasons.forEach(season => {
                                const sData = (p.history && p.history[season]) ? p.history[season] : {};
                                
                                let s2CellBg = sData.s2a || sData.s2o ? group.strip : 'bg-transparent';
                                let t2CellBg = getTdBackground(sData.t2Type, sData.t2, group.strip);
                                let s1CellBg = sData.s1a || sData.s1o ? group.strip : 'bg-transparent';
                                let t1CellBg = getTdBackground(sData.t1Type, sData.t1, group.strip);

                                // YENİ: S2 (İkinci Yarı) için OVR Farkı Hesaplama
                                let s2Prev = getPrevOvr(p, season, 's2');
                                let s2Delta = getDeltaHtml(sData.s2o, s2Prev);
                                let s2Str = (sData.s2a || sData.s2o) ? `
                                    <div class="flex items-center justify-center w-full h-full">
                                        <span class="text-[10px] text-slate-300 font-mono drop-shadow-md mr-1.5">${sData.s2a || ''}</span>
                                        ${renderOvrBadge(sData.s2o)}
                                        ${s2Delta}
                                    </div>` : '';
                                resultHtml += `<td class="p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors ${s2CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 's2')">${s2Str}</td>`;

                                resultHtml += `<td class="p-1 text-center border-r border-b border-slate-700/50 align-middle cursor-pointer transition-colors hover:bg-slate-800/80 ${t2CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 't2')" title="${sData.t2 || ''}">
                                            ${getTrBadge(sData.t2Type, sData.t2)}
                                         </td>`;
                                         
                                // YENİ: S1 (İlk Yarı) için OVR Farkı Hesaplama
                                let s1Prev = getPrevOvr(p, season, 's1');
                                let s1Delta = getDeltaHtml(sData.s1o, s1Prev);
                                let s1Str = (sData.s1a || sData.s1o) ? `
                                    <div class="flex items-center justify-center w-full h-full">
                                        <span class="text-[10px] text-slate-300 font-mono drop-shadow-md mr-1.5">${sData.s1a || ''}</span>
                                        ${renderOvrBadge(sData.s1o)}
                                        ${s1Delta}
                                    </div>` : '';
                                resultHtml += `<td class="p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors ${s1CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 's1')">${s1Str}</td>`;
                                
                                resultHtml += `<td class="p-1 text-center border-r border-b border-slate-700/50 align-middle cursor-pointer transition-colors hover:bg-slate-800/80 ${t1CellBg}" onclick="openPlayerCellModal('${p.id}', '${season}', 't1')" title="${sData.t1 || ''}">
                                            ${getTrBadge(sData.t1Type, sData.t1)}
                                         </td>`;
                            });
                            resultHtml += `</tr>`;
                        });
                    });
                    return resultHtml;
                };

                html += renderPlayerList(activePlayers, false);

                if (archivedPlayers.length > 0) {
                    html += `
                        <tr>
                            <td colspan="100%" class="h-14 bg-slate-900 border-y-2 border-slate-600 shadow-inner align-middle text-center relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
                                <span class="relative z-10 text-sm font-black text-slate-400 tracking-[0.3em]"><i class="fa-solid fa-box-archive mr-2"></i>TAKIMDAN AYRILANLAR / ARŞİV</span>
                            </td>
                        </tr>
                    `;
                    html += renderPlayerList(archivedPlayers, true);
                }
            }

            html += `</tbody></table></div>`;
            
            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        // Toplu Ekleme Modalını Aç
        function openSquadBulkModal() {
            const textarea = document.getElementById('squad-bulk-input');
            textarea.value = ''; // İçeriği temizle

            document.getElementById('squad-bulk-target-name').innerText =
                squadContext === 'astakim' ? 'As Takım' : (squadContext === 'akademi' ? 'Akademi' : 'Milli Takım');

            if (squadContext === 'milli') {
                document.getElementById('squad-bulk-format-hint').innerText = 'Pozisyon, İsim Soyisim, Yaş, Reyting, Kulübü, Forma Sayısı';
                textarea.placeholder = 'Örnek:\nGK, Uğurcan Çakır, 26, 80, Galatasaray, 5\nCB, Merih Demiral, 26, 82, Al-Ahli, 45\nST, Kerem Aktürkoğlu, 26, 79, Benfica, 30';
            } else {
                document.getElementById('squad-bulk-format-hint').innerText = 'Pozisyon, İsim Soyisim, Ülke, Yaş, Reyting';
                textarea.placeholder = 'Örnek:\nST, Victor Osimhen, NGA, 25, 88\nCAM, Dries Mertens, BEL, 37, 84\nCM, Gabriel Sara, BRA, 25, 79';
            }

            const modal = document.getElementById('squad-bulk-modal');
            modal.classList.remove('hidden'); 
            modal.classList.add('flex');
        }

        // Toplu Ekleme Modalını Kapat
        function closeSquadBulkModal() {
            const modal = document.getElementById('squad-bulk-modal');
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
        }

        // Metni Ayrıştır, Fotoğrafları Otomatik Bul ve Oyuncuları Kaydet
        async function processSquadBulkInput() {
            const text = document.getElementById('squad-bulk-input').value;
            if (!text.trim()) { alert('Lütfen eklenecek oyuncu listesini girin!'); return; }

            const lines = text.split('\n');
            let addedCount = 0;

            if (!squadData[squadContext] || !Array.isArray(squadData[squadContext])) {
                squadData[squadContext] = [];
            }

            // Show a brief loading indicator alert or change button text if desired
            const btn = document.querySelector('#squad-bulk-modal button.bg-emerald-600');
            const originalHtml = btn ? btn.innerHTML : '';
            if (btn) {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Fotoğraflar taranıyor...';
                btn.disabled = true;
            }

            for (let line of lines) {
                if (!line.trim()) continue; 
                
                const parts = line.split(',').map(s => s.trim());
                
                if (parts.length >= 5) {
                    const pos = parts[0].toUpperCase();
                    const name = parts[1];
                    const countryCode = parts[2].toLowerCase();
                    const age = parseInt(parts[3]) || 18;
                    const ovr = parseInt(parts[4]) || 50;

                    let photoUrl = '';
                    
                    // Automatically scrape/fetch facecard from TheSportsDB API
                    try {
                        const sdbUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`;
                        let sdbRes = await fetch(sdbUrl);
                        let sdbData = await sdbRes.json();
                        if (sdbData && sdbData.player && sdbData.player.length > 0) {
                            const p = sdbData.player[0];
                            photoUrl = p.strCutout || p.strThumb || p.strRender || '';
                        }
                    } catch (e) {
                        console.warn(`Could not fetch photo for ${name}:`, e);
                    }

                    const newPlayer = {
                        id: 'p_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
                        pos: pos,
                        role: playerRoles[squadContext][0] || 'Rotasyon',
                        name: name,
                        photoUrl: photoUrl,
                        countryCode: countryCode,
                        joinAge: age,
                        joinOvr: ovr,
                        history: {}
                    };

                    if (squadContext === 'akademi') {
                        newPlayer.pot = (ovr + 5).toString();
                    }

                    squadData[squadContext].push(newPlayer);
                    addedCount++;
                }
            }

            if (btn) {
                btn.innerHTML = originalHtml;
                btn.disabled = false;
            }

            if (addedCount > 0) {
                saveToLocalStorage();
                renderSquadGrid();
                closeSquadBulkModal();
                alert(`${addedCount} oyuncu ve mevcut yüz fotoğrafları başarıyla kadroya eklendi!`);
            } else {
                alert('Geçerli formatta oyuncu bulunamadı. Lütfen "Pozisyon, İsim, Ülke, Yaş, Reyting" formatına uyduğunuzdan emin olun.');
            }
        }

        // Automatically fetch and assign a player photo by name if URL is empty
async function autoFetchPlayerPhoto(playerName, urlInputId) {
    if (!playerName) return;
    const urlInput = document.getElementById(urlInputId);
    if (urlInput && urlInput.value.trim() !== '') return; // Don't overwrite if already filled

    try {
        const sdbUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`;
        let sdbRes = await fetch(sdbUrl);
        let sdbData = await sdbRes.json();
        
        if (sdbData && sdbData.player && sdbData.player.length > 0) {
            const p = sdbData.player[0];
            const photoUrl = p.strCutout || p.strThumb || p.strRender;
            if (photoUrl && urlInput) {
                urlInput.value = photoUrl;
            }
        }
    } catch (e) {
        console.warn("Auto facecard fetch failed:", e);
    }
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

        function openStatsPlayerProfile(el) {
           const name = el.getAttribute('data-pname');
            if (!name) return;
            const contexts = ['astakim', 'akademi', 'milli'];
            for (const ctx of contexts) {
            const found = (squadData[ctx] || []).find(p => (p.name || '').toLowerCase() === name.toLowerCase());
            if (found) {
                squadContext = ctx;
                openPlayerInfoModal(found.id);
                return;
                }
            }
            alert('Bu oyuncu artık kadroda kayıtlı değil.');
        }

        function openPlayerInfoModal(id = null) {
            activePlayerId = id;
            
            const viewSection = document.getElementById('pi-view-section');
            const editSection = document.getElementById('pi-edit-section');
            
            // Akademi/As Takım potansiyel alanı görünürlüğü (Edit modu için)
            if(squadContext === 'akademi') document.getElementById('pi-pot-container-edit').classList.remove('hidden');
            else document.getElementById('pi-pot-container-edit').classList.add('hidden');

            if(squadContext === 'milli') document.getElementById('pi-milli-container-edit').classList.remove('hidden');
            else document.getElementById('pi-milli-container-edit').classList.add('hidden');

            // 1. Form alanlarını her ihtimale karşı temizle (Yeni ekleme için hazırlık)
            document.getElementById('player-info-title').innerText = "Yeni Oyuncu Ekle";
            document.getElementById('pi-pos').value = 'CM';
            populateRolesDropdown('pi-role', squadContext === 'akademi' ? 'A Takım Adayı' : (squadContext === 'milli' ? 'Kadroda' : 'Rotasyon'));
            document.getElementById('pi-name').value = '';
            document.getElementById('pi-photo-url').value = '';
            document.getElementById('pi-country').value = '';
            document.getElementById('pi-age').value = '18';
            document.getElementById('pi-ovr').value = '60';
            if(squadContext === 'akademi') document.getElementById('pi-pot').value = '80-85';
            document.getElementById('btn-delete-player').classList.add('hidden');
            
            fileUploads['pi-photo'] = null;
            document.getElementById('pi-photo-file').value = '';
            document.getElementById('pi-photo-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('pi-photo-results').innerHTML = '';
            document.getElementById('pi-photo-results').classList.add('hidden');

            if (squadContext === 'milli') {
                document.getElementById('pi-team-name-input').value = '';
                document.getElementById('pi-team-url-input').value = '';
                document.getElementById('pi-caps').value = '0';
                fileUploads['pi-team'] = null;
                document.getElementById('pi-team-file-input').value = '';
                document.getElementById('pi-team-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
                document.getElementById('pi-team-logo-results').innerHTML = '';
                document.getElementById('pi-team-logo-results').classList.add('hidden');
            }

            if (id) {
                // 2A. VAROLAN OYUNCU (PROFIL MODUNDA AÇ)
                const p = squadData[squadContext].find(pl => pl.id === id);
                
                // Profil (Görüntüleme) bölümünü doldur
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&color=fff&size=256`;
                document.getElementById('pi-view-photo').src = p.photoUrl || avatarUrl;
                document.getElementById('pi-view-name').innerText = p.name;
                
                // Mevkiye göre renkli badge atanıyor
                const posBadge = document.getElementById('pi-view-pos');
                posBadge.innerText = p.pos;
                posBadge.className = `font-black px-2 py-0.5 rounded border border-slate-700 bg-slate-900/80 pos-${p.pos}`;
                
                document.getElementById('pi-view-role').innerText = p.role;
                
                // --- YENİ: Profil için güncel gelişim hesaplamaları ---
                let currentAge = p.joinAge;
                let currentOvr = p.joinOvr;
                
                // Oyuncunun geçmişini tarayarak en güncel verilerini bulalım
                for (let i = seasonsList.length - 1; i >= 0; i--) {
                    let s = seasonsList[i];
                    if (p.history && p.history[s]) {
                        if (p.history[s].s2a || p.history[s].s2o) {
                            if (p.history[s].s2a) currentAge = p.history[s].s2a;
                            if (p.history[s].s2o) currentOvr = p.history[s].s2o;
                            break;
                        }
                        if (p.history[s].s1a || p.history[s].s1o) {
                            if (p.history[s].s1a) currentAge = p.history[s].s1a;
                            if (p.history[s].s1o) currentOvr = p.history[s].s1o;
                            break;
                        }
                    }
                }

                // Gelişim farkını hesapla ve görsel rozeti (pill) oluştur
                let ovrDelta = (parseInt(currentOvr) || 0) - (parseInt(p.joinOvr) || 0);
                let deltaPill = `<span class="text-[11px] text-slate-500 font-medium">-</span>`;
                
                if (ovrDelta > 0) {
                    deltaPill = `<div class="flex items-center justify-center bg-emerald-950/60 border border-emerald-800/80 rounded-full px-2 py-[2px] text-emerald-400 shadow-inner"><span class="text-[7px] mr-0.5">▲</span><span class="text-[11px] font-black leading-none">${ovrDelta}</span></div>`;
                } else if (ovrDelta < 0) {
                    deltaPill = `<div class="flex items-center justify-center bg-red-950/60 border border-red-800/80 rounded-full px-2 py-[2px] text-red-400 shadow-inner"><span class="text-[7px] mr-0.5">▼</span><span class="text-[11px] font-black leading-none">${Math.abs(ovrDelta)}</span></div>`;
                }

                // Modal içeriğine verileri bas
                document.getElementById('pi-view-current-ovr').innerText = currentOvr;
                document.getElementById('pi-view-delta-container').innerHTML = deltaPill;
                document.getElementById('pi-view-join-ovr').innerText = `Geliş OVR: ${p.joinOvr}`;
                
                document.getElementById('pi-view-current-age').innerText = currentAge;
                document.getElementById('pi-view-join-age').innerText = `Geliş Yaşı: ${p.joinAge}`;
                // ------------------------------------------------------
                
                // Ülke bayrağını küçük köşede göstermek için
                const flagContainer = document.getElementById('pi-view-flag-container');
                flagContainer.innerHTML = p.countryCode ? `<img src="https://flagcdn.com/w40/${p.countryCode.toLowerCase()}.png" class="w-8 h-auto block" onerror="this.style.display='none'">` : '';

                if(squadContext === 'akademi') {
                    document.getElementById('pi-view-pot-container').classList.remove('hidden');
                    document.getElementById('pi-view-pot').innerText = p.pot || '-';
                } else {
                    document.getElementById('pi-view-pot-container').classList.add('hidden');
                }

                // Arşiv butonu durumu (Görüntüleme Ekranı)
                const archBtnView = document.getElementById('btn-view-archive');
                if(p.isArchived) {
                    archBtnView.innerHTML = '<i class="fa-solid fa-box-open mr-1"></i> Arşivden Çıkar';
                    archBtnView.className = 'px-4 py-2.5 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-medium text-sm flex-1 transition-colors';
                } else {
                    archBtnView.innerHTML = '<i class="fa-solid fa-box-archive mr-1"></i> Arşive Taşı';
                    archBtnView.className = 'px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium text-sm flex-1 transition-colors';
                }
             

                // Düzenle tuşuna basıldığında kullanılmak üzere formu arka planda doldur
                document.getElementById('player-info-title').innerText = "Oyuncu Düzenle";
                document.getElementById('pi-pos').value = p.pos;
                populateRolesDropdown('pi-role', p.role);
                document.getElementById('pi-name').value = p.name;
                document.getElementById('pi-photo-url').value = p.photoUrl || '';
                document.getElementById('pi-country').value = p.countryCode || '';
                document.getElementById('pi-age').value = p.joinAge;
                document.getElementById('pi-ovr').value = p.joinOvr;
                if(squadContext === 'akademi') document.getElementById('pi-pot').value = p.pot || '';
                if(squadContext === 'milli') {
                    document.getElementById('pi-team-name-input').value = p.teamName || '';
                    document.getElementById('pi-team-url-input').value = p.teamLogo || '';
                    document.getElementById('pi-caps').value = p.caps || 0;
                }
                document.getElementById('btn-delete-player').classList.remove('hidden');

                // Sadece Profil kısmını göster, Form'u gizle
                viewSection.classList.remove('hidden'); viewSection.classList.add('flex');
                editSection.classList.add('hidden');
            } else {
                // 2B. YENİ OYUNCU (DİREKT DÜZENLEME MODUNDA AÇ)
                // Profil gösterecek veri olmadığı için direkt formu gösteriyoruz
                viewSection.classList.add('hidden'); viewSection.classList.remove('flex');
                editSection.classList.remove('hidden');
            }

            const modal = document.getElementById('player-info-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        // Profil Modu ile Düzenleme Modu (Form) arasında geçiş yapmayı sağlayan fonksiyon
        function togglePlayerEditMode() {
            const viewSection = document.getElementById('pi-view-section');
            const editSection = document.getElementById('pi-edit-section');
            
            if (editSection.classList.contains('hidden')) {
                // "Düzenle"ye basıldı: Profili gizle, formu göster
                viewSection.classList.add('hidden'); viewSection.classList.remove('flex');
                editSection.classList.remove('hidden');
            } else {
                // "İptal"e basıldı: Formu gizle, Profile dön (Sadece mevcut oyuncu ise)
                if (activePlayerId) {
                    editSection.classList.add('hidden');
                    viewSection.classList.remove('hidden'); viewSection.classList.add('flex');
                } else {
                    closePlayerInfoModal();
                }
            }
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

            let teamName = '', teamLogo = '', caps = 0;
            if (squadContext === 'milli') {
                teamName = document.getElementById('pi-team-name-input').value.trim();
                const teamUrl = document.getElementById('pi-team-url-input').value.trim();
                teamLogo = fileUploads['pi-team'] || (teamUrl !== "Yerel Dosya Yüklendi (Sıkıştırıldı)" ? teamUrl : '');
                if (!teamLogo && teamName) teamLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=random&color=fff`;
                caps = parseInt(document.getElementById('pi-caps').value) || 0;
            }

            if(!name) { alert("İsim zorunludur!"); return; }

            if(activePlayerId) {
                let p = squadData[squadContext].find(pl => pl.id === activePlayerId);
                p.pos = pos; p.role = role; p.name = name; p.photoUrl = photo; p.countryCode = countryCode; p.joinAge = age; p.joinOvr = ovr;
                if(squadContext === 'akademi') p.pot = pot;
                if(squadContext === 'milli') { p.teamName = teamName; p.teamLogo = teamLogo; p.caps = caps; }
            } else {
                let newPlayer = { id: 'p_' + Date.now(), pos, role, name, photoUrl: photo, countryCode, joinAge: age, joinOvr: ovr, history: {} };
                if(squadContext === 'akademi') newPlayer.pot = pot;
                if(squadContext === 'milli') { newPlayer.teamName = teamName; newPlayer.teamLogo = teamLogo; newPlayer.caps = caps; }
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

        function toggleArchivePlayer() {
            if(confirm("Oyuncunun arşiv durumunu değiştirmek istediğinize emin misiniz?")) {
                let p = squadData[squadContext].find(pl => pl.id === activePlayerId);
                if(p) {
                    p.isArchived = !p.isArchived;
                    saveToLocalStorage();
                    closePlayerInfoModal();
                    renderSquadGrid();
                }
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
                
                // YENİ: Eğer yaş daha önce kaydedilmemişse, otomatik hesaplayıp kutuya yerleştiriyoruz.
                let ageVal = sData[`${type}a`];
                if (!ageVal) ageVal = getExpectedAge(p, season, type);
                
                document.getElementById('pc-st-age').value = ageVal || '';
                document.getElementById('pc-st-ovr').value = sData[`${type}o`] || '';
                
                // OVR kutusuna otomatik odaklan (Kullanıcı yaşla uğraşmadan direkt reytingi yazabilsin)
                setTimeout(() => document.getElementById('pc-st-ovr').focus(), 50);
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
                    <div class="flex items-center gap-2 sm:gap-4">
                        <button onclick="openLeagueTeamBulkModal()" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-list-ol mr-1"></i>Toplu Ekle</button>
                        <button onclick="openLeagueTeamModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-plus mr-1"></i>Takım Ekle</button>
                    </div>
                </div>
                
                <div class="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden">
                    
                    <div class="w-full lg:w-1/2 flex flex-col h-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg relative">
                        <div class="w-full overflow-auto table-scroll flex-1 h-full">
                            <table class="w-full border-separate border-spacing-0 text-sm min-w-max">
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
                                <td class="p-2 border-r border-b border-slate-700 sticky left-[48px] bg-slate-950 z-[30] text-left font-bold text-white">
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
        
        function openLeagueTeamBulkModal() {
            document.getElementById('lt-bulk-input').value = '';
            const modal = document.getElementById('league-team-bulk-modal');
            modal.classList.remove('hidden'); 
            modal.classList.add('flex');
        }

        function closeLeagueTeamBulkModal() {
            const modal = document.getElementById('league-team-bulk-modal');
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
        }

        function processLeagueTeamBulkInput() {
            const text = document.getElementById('lt-bulk-input').value;
            if (!text.trim()) { alert('Lütfen eklenecek takımları girin!'); return; }

            const lines = text.split('\n');
            let addedCount = 0;

            lines.forEach(line => {
                if (!line.trim()) return;
                
                // Virgülle ayrılmışsa rengi al, yoksa otomatik oluştur
                let parts = line.split(',');
                let name = parts[0].trim();
                let color = parts[1] ? parts[1].trim() : '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                
                if (name) {
                    // Aynı isimde takım varsa ekleme yapma (Büyük/Küçük harf duyarsız)
                    const exists = leagueHistoryData.find(t => t.name.toLowerCase() === name.toLowerCase());
                    if (!exists) {
                        leagueHistoryData.push({
                            id: 'lh_' + Date.now() + '_' + addedCount, // Benzersiz ID
                            name: name,
                            color: color,
                            history: {}
                        });
                        addedCount++;
                    }
                }
            });

            if (addedCount > 0) {
                saveToLocalStorage();
                renderLeagueHistory();
                closeLeagueTeamBulkModal();
            } else {
                alert('Geçerli veya listede olmayan yeni takım bulunamadı.');
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
                                        <h4 class="font-bold text-white text-sm truncate">${escapeHtml(t.name)} <span class="text-[10px] text-slate-400 font-normal ml-1 border border-slate-600 rounded px-1">${escapeHtml(t.season)}</span></h4>
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

    if (id) {
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

    // FIXED: Passed single element ID
    const modal = document.getElementById('transfer-editor-modal');
    modal.classList.remove('hidden'); 
    modal.classList.add('flex');
}

function closeTransferModal() {
    // FIXED: Passed single element ID
    const modal = document.getElementById('transfer-editor-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
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
                        
                        // Yeni sistemdeki detaylı olayları ekle
                if (m.events && m.events.length > 0) {
                    m.events.forEach(ev => {
                        if (ev.type === 'US') {
                            processScorer(ev.scorer, tName);
                            processAssist(ev.assist, tName);
                        }
                    });
                }
                
                // ESKİ sistemde kalmış (henüz detaylı olaya çevrilmemiş) verileri GÜVENLİ şekilde ekle
                let hasUsEvent = m.events && m.events.some(ev => ev.type === 'US');
                if (!hasUsEvent) {
                    if(m.goals) m.goals.forEach(g => processScorer(g, tName));
                    if(m.assists) m.assists.forEach(a => processAssist(a, tName));
                }
                    });
                });
                
                seasonsData[season] = Array.from(tournaments).sort();
            });

            let allSquadPlayers = context === 'milli' ? (squadData.milli || []) : [...squadData.astakim, ...squadData.akademi];
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
                    
                    let photoHtml = p.photoUrl ? `<img src="${p.photoUrl}" class="w-8 h-8 rounded-full inline-block mr-2.5 object-cover bg-slate-800 shadow-sm border-2 border-slate-700">` : `<div class="w-8 h-8 rounded-full inline-flex items-center justify-center bg-slate-700 border-2 border-slate-600 shadow-sm text-xs font-bold mr-2.5">${p.name.charAt(0)}</div>`;
                    let flagHtml = p.countryCode ? `<img src="https://flagcdn.com/24x18/${p.countryCode.toLowerCase()}.png" class="w-5 h-auto mx-auto shadow-sm rounded-sm">` : '-';
                    
                    rowsHTML += `<tr class="hover:bg-slate-800/80 transition-colors group">`;
                    // Sticky columns setup
                    const rankCls = idx === 0 ? 'stats-rank-1' : idx === 1 ? 'stats-rank-2' : idx === 2 ? 'stats-rank-3' : '';
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: 0px; width: ${wNo}px; min-width: ${wNo}px; max-width: ${wNo}px;"><span class="stats-rank-badge ${rankCls}">${idx + 1}</span></td>`;
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: ${lPos}px; width: ${wPos}px; min-width: ${wPos}px; max-width: ${wPos}px;">${p.pos === 'UNK' ? '<span class="text-slate-600">-</span>' : `<span class="stats-pos-pill pos-${p.pos}">${p.pos}</span>`}</td>`;
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-left font-bold text-sm bg-slate-900 group-hover:bg-slate-800 sticky z-[10]" style="left: ${lName}px; width: ${wName}px; min-width: ${wName}px; max-width: ${wName}px;">
    <div class="flex items-center cursor-pointer hover:text-emerald-400 transition-colors" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="Profili Görüntüle">${photoHtml}<span class="truncate">${p.name}</span></div>
</td>`;
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
                        
                        rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-green-900/5">${pSeason.totalGoals ? `<span class="stats-chip stats-chip-goal">${pSeason.totalGoals}</span>` : '<span class="text-slate-700">-</span>'}</td>`;
                        rowsHTML += `<td class="p-2 border-r border-b ${isExp ? 'border-slate-700/50' : 'border-slate-500 border-r-2'} text-center bg-blue-900/5">${pSeason.totalAssists ? `<span class="stats-chip stats-chip-assist">${pSeason.totalAssists}</span>` : '<span class="text-slate-700">-</span>'}</td>`;
                        
                        if (isExp) {
                            tours.forEach((t, i) => {
                                const isLast = (i === tours.length - 1);
                                if(!sums.seasons[season].tours[t]) sums.seasons[season].tours[t] = { goals: 0, assists: 0 };
                                
                                const tGoals = pSeason.tournaments[t] ? pSeason.tournaments[t].goals : 0;
                                const tAssists = pSeason.tournaments[t] ? pSeason.tournaments[t].assists : 0;
                                
                                sums.seasons[season].tours[t].goals += tGoals;
                                sums.seasons[season].tours[t].assists += tAssists;
                                
                                rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-green-900/5 hover:bg-green-900/30 transition-colors">${tGoals ? `<span class="stats-chip stats-chip-goal" style="min-width:20px;font-size:10px;">${tGoals}</span>` : '<span class="text-slate-700">-</span>'}</td>`;
                                rowsHTML += `<td class="p-2 border-b border-r ${isLast ? 'border-slate-500 border-r-2' : 'border-slate-700/50'} text-center bg-blue-900/5 hover:bg-blue-900/30 transition-colors">${tAssists ? `<span class="stats-chip stats-chip-assist" style="min-width:20px;font-size:10px;">${tAssists}</span>` : '<span class="text-slate-700">-</span>'}</td>`;
                            });
                        }
                    });
                    
                    rowsHTML += `<td class="p-2 border-r border-b border-slate-700/50 text-center bg-emerald-900/10"><span class="stats-chip stats-chip-goal-total">${p.overallGoals}</span></td>`;
                    rowsHTML += `<td class="p-2 border-b border-slate-700/50 text-center bg-emerald-900/10"><span class="stats-chip stats-chip-assist-total">${p.overallAssists}</span></td>`;
                    rowsHTML += `</tr>`;
                });
            }

            // Footer (Genel Toplamlar)
            let footerHTML = `
                <tr class="bg-slate-950 font-black shadow-[0_-4px_6px_rgba(0,0,0,0.3)]">
                    <td class="p-3 border-r border-slate-700 sticky left-0 z-[20] bg-slate-950" style="left: 0px; width: ${wNo}px;"></td>
                    <td class="p-3 border-r border-slate-700 sticky bg-slate-950 z-[20]" style="left: ${lPos}px; width: ${wPos}px;"></td>
                    <td class="p-3 border-r border-slate-700 sticky bg-slate-950 text-right text-emerald-400 tracking-widest uppercase z-[20] font-black" style="left: ${lName}px; width: ${wName}px;"><i class="fa-solid fa-trophy text-yellow-500 mr-2"></i>TOPLAM</td>
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
                        <table class="modern-stats-table w-max border-separate border-spacing-0 text-sm">
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

        function getGroundLabel(g) {
            return g === 'home' ? '<span class="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 px-1.5 py-0.5 rounded">İÇ</span>'
                 : g === 'away' ? '<span class="text-[10px] font-bold text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded">DEP</span>'
                 : '<span class="text-[10px] font-bold text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">TAR</span>';
        }

        // YENİ: Turnuva isimlerini kısaltmalara çeviren motor (filtre butonlarında yer kazanmak için)
        const TOURNAMENT_ABBR = {
            'Tümü': 'T',
            'Süper Lig': 'SL',
            'Türkiye Kupası': 'TK',
            'Türkiye Süper Kupası': 'TSK',
            'Şampiyonlar Ligi': 'ŞL',
            'Avrupa Ligi': 'AL',
            'Konferans Ligi': 'KL',
            'UEFA Süper Kupa': 'USK',
            'Pre-Season Friendly': 'PF',
            'Sezon Öncesi Hazırlık': 'SÖH',
            'Dünya Kupası': 'DK',
            'Avrupa Şampiyonası': 'AŞ',
            'Dostluk Maçı': 'DM'
        };

        function getTournamentAbbr(name) {
            if (!name) return '-';
            if (TOURNAMENT_ABBR[name]) return TOURNAMENT_ABBR[name];
            // Bilinmeyen/özel turnuva isimleri için: her kelimenin baş harfini al (örn. "Yaz Kupası" -> "YK")
            const initials = name.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase()).join('');
            return initials.slice(0, 4) || name.slice(0, 3).toUpperCase();
        }

// Takım isminden logosunu bulan yardımcı motor
        function getTeamLogoByName(name) {
            if (!name || name === '-') return '';
            
            // Önce kendi yönettiğimiz takımlara (Kulüp/Milli) bakalım
            if (managedTeams.kulup && managedTeams.kulup.name === name) return managedTeams.kulup.logoUrl;
            if (managedTeams.milli && managedTeams.milli.name === name) return managedTeams.milli.logoUrl;
            
            // Bulamazsak kayıtlı tüm rakipleri tarayalım
            let foundLogo = null;
            ['kulup', 'milli'].forEach(ctx => {
                if (opponentsConfig[ctx]) {
                    if (opponentsConfig[ctx].domestic && opponentsConfig[ctx].domestic.teams) {
                        let t = opponentsConfig[ctx].domestic.teams.find(x => x.name === name);
                        if (t && t.logoUrl) foundLogo = t.logoUrl;
                    }
                    if (!foundLogo && opponentsConfig[ctx].foreign) {
                        opponentsConfig[ctx].foreign.forEach(grp => {
                            let t = grp.teams.find(x => x.name === name);
                            if (t && t.logoUrl) foundLogo = t.logoUrl;
                        });
                    }
                }
            });
            
            // Eğer hiçbir yerde yoksa, ismin baş harflerinden otomatik bir logo üret
            return foundLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
        }

        function toggleFixtureRowExpand(matchId) {
            const detailsRow = document.getElementById(`fx-details-${matchId}`);
            const chevron = document.getElementById(`fx-chevron-${matchId}`);
            const mainRow = document.getElementById(`fx-row-${matchId}`);
            if (!detailsRow) return;

            const nowHidden = detailsRow.classList.toggle('hidden');

            if (nowHidden) {
                expandedFixtureMatchIds.delete(matchId);
                if (chevron) { chevron.classList.remove('fa-chevron-down'); chevron.classList.add('fa-chevron-right'); }
                if (mainRow) mainRow.classList.remove('bg-slate-800/40');
            } else {
                expandedFixtureMatchIds.add(matchId);
                if (chevron) { chevron.classList.remove('fa-chevron-right'); chevron.classList.add('fa-chevron-down'); }
                if (mainRow) mainRow.classList.add('bg-slate-800/40');
            }
        }

        // Fikstür/gol detaylarında oyuncu fotoğrafını bulmak için: kulüp veya milli, hangi kadroda kayıtlıysa oradan çeker
        function getPlayerPhotoByName(name) {
            if (!name) return null;
            const all = [...(squadData.astakim || []), ...(squadData.akademi || []), ...(squadData.milli || [])];
            const p = all.find(pl => (pl.name || '').toLowerCase() === name.trim().toLowerCase());
            return p ? p.photoUrl : null;
        }

        // "Victor Osimhen" -> "V. OSIMHEN"
function formatShortPlayerName(name) {
    if (!name) return '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].toUpperCase();
    const last = parts[parts.length - 1];
    return `${parts[0].charAt(0).toUpperCase()}. ${last.toUpperCase()}`;
}

        // Turnuva ismine göre satır arka plan rengini belirleyen fonksiyon
        function getTournamentBgClass(tournamentName) {
            if (!tournamentName) return 'hover:bg-slate-800/80'; 
            
            // Büyük/küçük harf duyarlılığını ortadan kaldırmak için
            const name = tournamentName.toLowerCase();
            
            // Sıralama önemlidir: İçinde daha spesifik kelimeler geçenleri (örn: Süper Kupa) önce kontrol ediyoruz.
            if (name.includes('türkiye süper kupası')) return 'bg-teal-900/30 hover:bg-teal-800/50'; // Turkuaz
            if (name.includes('süper lig')) return 'bg-red-950/40 hover:bg-red-900/60'; // Koyu kırmızı
            if (name.includes('türkiye kupası')) return 'bg-red-900/40 hover:bg-red-800/60'; // Kırmızı
            if (name.includes('şampiyonlar ligi')) return 'bg-blue-950/50 hover:bg-blue-900/70'; // Koyu mavi
            if (name.includes('avrupa ligi')) return 'bg-orange-900/30 hover:bg-orange-800/50'; // Turuncu
            if (name.includes('konferans ligi')) return 'bg-emerald-900/30 hover:bg-emerald-800/50'; // Yeşil
            if (name.includes('uefa süper kupa')) return 'bg-yellow-700/20 hover:bg-yellow-600/40'; // Altın
            if (name.includes('pre-season friendly')) return 'bg-slate-700/30 hover:bg-slate-600/50'; // Gri
            if (name.includes('dünya kupası')) return 'bg-purple-950/50 hover:bg-purple-900/70'; // Koyu mor
            if (name.includes('avrupa şampiyonası')) return 'bg-purple-800/40 hover:bg-purple-700/60'; // Açık mor
            if (name.includes('dostluk maçı')) return 'bg-fuchsia-900/30 hover:bg-fuchsia-800/50'; // Lila
            
            return 'hover:bg-slate-800/80'; // Listede olmayan turnuvalar için varsayılan arka plan
        }

        // --- MÜSABAKA & AVRUPA LİGLERİ DÜZENLEME MOTORU ---
        
        function updateEuroLeague(season, league, index, field, element) {
            if (!euroLeaguesData[season]) euroLeaguesData[season] = {};
            if (!euroLeaguesData[season][league]) euroLeaguesData[season][league] = [{},{},{},{}];
            euroLeaguesData[season][league][index][field] = element.innerText.trim();
            saveToLocalStorage(); // Sayfayı yenilemeden sessizce kaydeder (Kullanıcının imleç odağı bozulmaz)
        }

        const KNOCKOUT_DEFAULT_TYPES = ['Şampiyonlar Ligi', 'Avrupa Ligi', 'Konferans Ligi', 'Dünya Kupası', 'Avrupa Şampiyonası', 'Türkiye Kupası'];

        function addCustomTournament() {
            const type = document.getElementById('custom-tour-select').value;
            if(!customTournamentsData[activeFixtureSeason]) customTournamentsData[activeFixtureSeason] = [];
            
            customTournamentsData[activeFixtureSeason].push({
                id: 'ct_' + Date.now(),
                type: type,
                tableEnabled: true,
                knockoutEnabled: KNOCKOUT_DEFAULT_TYPES.includes(type),
                table: [
                    { rank: '1', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' },
                    { rank: '2', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }
                ],
                knockouts: [] // Sabit alanlar yerine dinamik diziye geçildi
            });
            saveToLocalStorage();
            renderFixturePanel();
        }

        function toggleTournamentTable(tourId, enable) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if (!tour) return;
            if (enable) {
                tour.tableEnabled = true;
                if (!tour.table || tour.table.length === 0) {
                    tour.table = [
                        { rank: '1', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' },
                        { rank: '2', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }
                    ];
                }
            } else {
                if (!confirm('Grup / Lig tablosu bölümünü silmek istediğinize emin misiniz?')) return;
                tour.tableEnabled = false;
            }
            saveToLocalStorage();
            renderFixturePanel();
        }

        function toggleTournamentKnockouts(tourId, enable) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if (!tour) return;
            if (enable) {
                tour.knockoutEnabled = true;
                if (!tour.knockouts) tour.knockouts = [];
            } else {
                if (!confirm('Eleme Aşamaları bölümünü silmek istediğinize emin misiniz?')) return;
                tour.knockoutEnabled = false;
            }
            saveToLocalStorage();
            renderFixturePanel();
        }

        function removeCustomTournament(id) {
            if(confirm("Bu müsabaka tablosunu silmek istediğinize emin misiniz?")) {
                customTournamentsData[activeFixtureSeason] = customTournamentsData[activeFixtureSeason].filter(t => t.id !== id);
                saveToLocalStorage();
                renderFixturePanel();
            }
        }

        function addRowToCustomTournament(id) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === id);
            if(tour) {
                tour.table.push({ rank: (tour.table.length+1).toString(), name: 'Yeni Takım', pld: '0', gd: '0', pts: '0' });
                saveToLocalStorage();
                renderFixturePanel();
            }
        }

        let activeBulkTournamentId = null;

        function openTournamentTableBulkModal(tourId) {
            activeBulkTournamentId = tourId;
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            document.getElementById('tt-bulk-title').innerText = `${tour ? tour.type : ''} - Toplu Ekle`;
            document.getElementById('tt-bulk-input').value = '';

            const modal = document.getElementById('tournament-table-bulk-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeTournamentTableBulkModal() {
            const modal = document.getElementById('tournament-table-bulk-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function processTournamentTableBulkInput() {
            const text = document.getElementById('tt-bulk-input').value;
            if (!text.trim()) { alert('Lütfen eklenecek takım listesini girin!'); return; }

            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === activeBulkTournamentId);
            if (!tour) { alert('Tablo bulunamadı!'); return; }

            const lines = text.split('\n');
            const newRows = [];

            lines.forEach(line => {
                if (!line.trim()) return;
                const parts = line.split(',').map(s => s.trim());
                if (parts.length >= 10) {
                    newRows.push({
                        rank: parts[0],
                        name: parts[1],
                        pts: parts[2],
                        pld: parts[3],
                        w: parts[4],
                        d: parts[5],
                        l: parts[6],
                        gf: parts[7],
                        ga: parts[8],
                        gd: parts[9]
                    });
                }
            });

            if (newRows.length > 0) {
                tour.table = newRows; // Toplu ekleme mevcut tabloyu tamamen yeni listeyle değiştirir
                saveToLocalStorage();
                closeTournamentTableBulkModal();
                renderFixturePanel();
            } else {
                alert('Geçerli formatta takım bulunamadı. Lütfen "Sıra, Takım Adı, Puan, Oynanan, Galibiyet, Beraberlik, Mağlubiyet, Atılan, Yenilen, Averaj" formatına uyduğunuzdan emin olun.');
            }
        }

        function updateCustomTournament(id, index, field, element) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === id);
            if(tour) {
                if (index === -1) {
                    tour[field] = element.innerText.trim();
                } else {
                    tour.table[index][field] = element.innerText.trim();
                }
                saveToLocalStorage();
            }
        }

        function addKnockoutMatch(tourId) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour) {
                if(!tour.knockouts) tour.knockouts = [];
                tour.knockouts.push({ id: 'ko_' + Date.now(), stage: 'Yeni Tur', result: 'Sonuç girin...' });
                saveToLocalStorage();
                renderFixturePanel();
            }
        }

        function removeKnockoutMatch(tourId, koId) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                tour.knockouts = tour.knockouts.filter(k => k.id !== koId);
                saveToLocalStorage();
                renderFixturePanel();
            }
        }

        function updateKnockoutMatch(tourId, koId, field, element) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if(ko) {
                    ko[field] = element.innerText.trim();
                    saveToLocalStorage();
                }
            }
        }

        function renderFixturePanel() {
            updateMockPlayers();

            if (!activeFixtureSeason || !seasonsList.includes(activeFixtureSeason)) {
                activeFixtureSeason = seasonsList[seasonsList.length - 1];
            }

            const matches = fixtureData[activeFixtureSeason] || [];
            const filterTour = fixtureFilter.tournament || '';
            let filtered = filterTour ? matches.filter(m => m.tournament === filterTour) : matches;

            let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
            const teamName = managedTeams.kulup.name || '';
            const nationalTeamName = managedTeams.milli.name || '';
            const isOurTeam = (name) => name === teamName || (nationalTeamName && name === nationalTeamName);
            filtered.forEach(m => {
                const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
                if (!isNaN(hs) && !isNaN(as)) {
                    const isHome = isOurTeam(m.home);
                    const isAway = isOurTeam(m.away);
                    if (isHome)      { gf += hs; ga += as; hs > as ? wins++ : hs < as ? losses++ : draws++; }
                    else if (isAway) { gf += as; ga += hs; as > hs ? wins++ : as < hs ? losses++ : draws++; }
                }
            });
            const played = wins + draws + losses;
            const pts = wins * 3 + draws;

            const seasonTabsHtml = seasonsList.map(s => `
                <button onclick="switchFixtureSeason('${s}')"
                    class="px-3 py-1 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                           ${s === activeFixtureSeason ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-white'}">
                    ${s}
                </button>
            `).join('');

            const filterHtml = `
                <button onclick="setFixtureFilter('')" title="Tümü"
                    class="px-3 py-1 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                           ${!filterTour ? 'bg-slate-500 text-white border-slate-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                    ${getTournamentAbbr('Tümü')} (${matches.length})
                </button>
                ${[...new Set(matches.map(m => m.tournament).filter(Boolean))].map(t => {
                    const cnt = matches.filter(m => m.tournament === t).length;
                    const safeTour = t.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
                    return `<button onclick="setFixtureFilter('${safeTour}')" title="${t}"
                        class="px-3 py-1 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                               ${filterTour === t ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                        ${getTournamentAbbr(t)} (${cnt})
                    </button>`;
                }).join('')}
            `;

            let matchRowsHtml = '';
            if (filtered.length === 0) {
                matchRowsHtml = `
                    <tr>
                        <td colspan="8" class="p-10 text-center text-slate-500">
                            <i class="fa-solid fa-calendar-xmark text-3xl mb-3 block text-slate-700"></i>
                            Bu sezon için henüz maç kaydı bulunmuyor.<br>
                            <span class="text-xs mt-1 block">Sağ üstteki "Maç Ekle" butonuyla başlayın.</span>
                        </td>
                    </tr>`;
            } else {
                const sorted = [...filtered].sort((a, b) => {
                    const numA = parseInt(a.matchNo) || 999;
                    const numB = parseInt(b.matchNo) || 999;
                    return numA - numB;
                });
                sorted.forEach((m, idx) => {
                    const hsDisplay = m.homeScore !== '' && m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : '-';
                    const asDisplay = m.awayScore !== '' && m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : '-';

                    let resultLetter = '';
                    const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
                    if (!isNaN(hs) && !isNaN(as)) {
                        const isHome = isOurTeam(m.home);
                        const isAway = isOurTeam(m.away);
                        if (isHome) resultLetter = hs > as ? 'W' : (hs < as ? 'L' : 'D');
                        else if (isAway) resultLetter = as > hs ? 'W' : (as < hs ? 'L' : 'D');
                    }
                    
                    const rowResultClass = resultLetter ? `frow-${resultLetter}` : '';
                    
                    const scoreBgClass = resultLetter === 'W' ? 'bg-green-600 border-green-500 text-white shadow-sm' : 
                                         resultLetter === 'D' ? 'bg-orange-500 border-orange-400 text-white shadow-sm' : 
                                         resultLetter === 'L' ? 'bg-red-600 border-red-500 text-white shadow-sm' : 
                                         'bg-slate-900 border-slate-700 text-slate-400';

                    let scorersList = '';
                    let scorersPlain = '';
                    if (m.events && m.events.length > 0) {
                        const namedGoals = m.events.filter(ev => ev.scorer);
                        if (namedGoals.length) {
                            scorersPlain = namedGoals.map(ev => formatShortPlayerName(ev.scorer)).join(', ');
                            scorersList = namedGoals.map(ev => {
                                const isUs = ev.type === 'US';
                                // Bize aitse yeşil top ikonu, rakibe aitse kırmızı top ikonu
                                const icon = isUs
                                    ? '<i class="fa-solid fa-futbol text-emerald-500 text-[8px] mr-0.5"></i>'
                                    : '<i class="fa-solid fa-futbol text-red-500 text-[8px] mr-0.5"></i>';
                                const colorClass = isUs ? 'goal-text' : 'text-red-400';
                                return `<span class="${colorClass} text-[10px] font-bold whitespace-nowrap">${icon}${escapeHtml(formatShortPlayerName(ev.scorer))}</span>`;
                            }).join('<span class="text-slate-600 mx-1">·</span>');
                        }
                    }

                    const homeLogo = getTeamLogoByName(m.home);
                    const awayLogo = getTeamLogoByName(m.away);
                    const tournamentBg = getTournamentBgClass(m.tournament);
                    const isExpanded = expandedFixtureMatchIds.has(m.id);

                    // Detay içeriği artık her satır için önceden üretiliyor (expanded olsun olmasın)
                    let eventsListHtml = '';
                    if (m.events && m.events.length > 0) {
                        const isHomeUs = isOurTeam(m.home);
                        const ourLogo = isHomeUs ? homeLogo : awayLogo;
                        const oppLogo = isHomeUs ? awayLogo : homeLogo;

                        eventsListHtml = m.events.map(ev => {
                            const eventTeamLogo = ev.type === 'US' ? ourLogo : oppLogo;
                            const scorerPhoto = getPlayerPhotoByName(ev.scorer);
                            const scorerImg = scorerPhoto
                                    ? `<img src="${scorerPhoto}" class="w-6 h-6 rounded-full object-cover border border-slate-700 shrink-0">`
                                    : `<div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold shrink-0">${escapeHtml((ev.scorer || '?').charAt(0))}</div>`;

                            return `
                                <div class="flex items-center gap-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg px-1.5 py-1 min-w-0">
                                    <div class="relative shrink-0 w-5 h-5">
                                        ${eventTeamLogo ? `<img src="${eventTeamLogo}" class="w-5 h-5 object-contain">` : '<div class="w-5 h-5"></div>'}
                                        <span class="absolute -bottom-1 -right-1.5 text-[7px] font-black text-white bg-slate-950 border border-slate-700 rounded px-[3px] leading-tight">${ev.min ? ev.min + "'" : '-'}</span>
                                    </div>
                                    ${scorerImg}
                                    <div class="flex-1 min-w-0">
                                        <div class="text-[10px] font-black text-white truncate leading-tight">${formatShortPlayerName(ev.scorer) || 'BİLİNMİYOR'}</div>
                                        ${ev.assist ? `<div class="text-[8px] font-bold text-blue-400 truncate leading-tight">${formatShortPlayerName(ev.assist)}</div>` : ''}
                                    </div>
                                </div>`;
                        }).join('');
                    } else {
                        eventsListHtml = `<div class="text-center text-slate-500 text-xs py-3 col-span-2"><i class="fa-solid fa-circle-info mr-1"></i>Bu maç için henüz gol/asist detayı girilmedi.</div>`;
                    }

                    matchRowsHtml += `
                        <tr id="fx-row-${m.id}" class="fixture-compact-row ${tournamentBg} transition-colors group cursor-pointer border-b border-slate-700/40 ${rowResultClass} ${isExpanded ? 'bg-slate-800/40' : ''}" onclick="toggleFixtureRowExpand('${m.id}')">
                            <td class="p-1 text-center w-8">
                                <div class="flex items-center justify-center gap-1">
                                    <i id="fx-chevron-${m.id}" class="fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} text-[8px] text-slate-500 group-hover:text-emerald-400 transition-transform"></i>
                                    <span class="text-emerald-500 text-xs font-black">${m.matchNo || '-'}</span>
                                </div>
                            </td>
                            <td class="p-1 text-slate-300 text-[10px] font-bold w-24 truncate" title="${m.tournament || ''}">
                                ${m.tournament || '-'}
                                <button onclick="event.stopPropagation(); openFixtureModal('${activeFixtureSeason}', '${m.id}')" class="ml-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-blue-400 transition-opacity" title="Fikstürü Düzenle"><i class="fa-solid fa-pen text-[9px]"></i></button>
                            </td>
                            <td class="p-1 w-10 text-center">${getGroundLabel(m.ground)}</td>
                            <td class="p-1 text-right" title="${m.home || ''}">
                                <div class="flex justify-end items-center h-full">
                                    ${homeLogo ? `<img src="${homeLogo}" alt="${m.home}" class="w-6 h-6 object-contain">` : '-'}
                                </div>
                            </td>
                            <td class="p-1 text-center w-16 hover:bg-slate-700/60 transition-colors" onclick="event.stopPropagation(); openMatchResultModal('${activeFixtureSeason}', '${m.id}')" title="Skoru gir / düzenle">
                                <span class="score-display ${scoreBgClass} pointer-events-none inline-flex items-center justify-center font-black text-[11px] rounded px-1.5 py-0.5 border min-w-[44px] transition-colors">
                                    ${hsDisplay}<span class="px-0.5 opacity-50">:</span>${asDisplay}
                                </span>
                            </td>
                            <td class="p-1 text-left" title="${m.away || ''}">
                                <div class="flex justify-start items-center h-full">
                                    ${awayLogo ? `<img src="${awayLogo}" alt="${m.away}" class="w-6 h-6 object-contain">` : '-'}
                                </div>
                            </td>
                            <td class="p-1 text-left text-[9px] text-slate-400 min-w-[120px]" title="${scorersPlain}">
                                <div class="goal-events-cell text-left">${scorersList}</div>
                            </td>
                        </tr>
                        <tr id="fx-details-${m.id}" class="bg-slate-950/60 fade-in ${isExpanded ? '' : 'hidden'}">
                            <td colspan="7" class="p-3 border-b border-slate-700/60">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="fa-solid fa-futbol mr-1 text-emerald-500"></i>Gol & Asist Detayları</span>
                                    <button onclick="event.stopPropagation(); openMatchResultModal('${activeFixtureSeason}', '${m.id}')" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded transition-colors"><i class="fa-solid fa-pen mr-1"></i>Düzenle</button>
                                </div>
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                    ${eventsListHtml}
                                </div>
                            </td>
                        </tr>`;
                });
            }

            const html = `
                <div class="w-full flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6 pb-4 overflow-y-auto xl:overflow-hidden hide-scrollbar">
                    
                    <!-- 1. SOL PANEL: FİKSTÜR -->
                    <div class="flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg h-full min-h-[550px] xl:min-h-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-2 sm:p-3 shrink-0 flex justify-between items-center flex-wrap gap-2">
                            <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-calendar-days text-emerald-400 mr-2"></i>Fikstür</h3>
                            <div class="flex gap-1.5">
                                <button onclick="openFixtureBulkModal('${activeFixtureSeason}')" class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs transition-colors shadow flex items-center gap-1.5">
                                    <i class="fa-solid fa-list-check"></i><span class="hidden sm:inline"> Toplu Ekle</span>
                                </button>
                                <button onclick="openFixtureModal('${activeFixtureSeason}', null)" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs transition-colors shadow flex items-center gap-1.5">
                                    <i class="fa-solid fa-plus"></i><span class="hidden sm:inline"> Ekle</span>
                                </button>
                                <button onclick="deleteBulkFixtures()" class="bg-red-900/50 hover:bg-red-800 text-red-200 font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs transition-colors" title="Toplu Sil">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex flex-col p-3 h-full overflow-hidden gap-2">

                            <!-- Season Tabs -->
                            <div class="flex gap-2 overflow-x-auto hide-scrollbar shrink-0 pb-1">
                                ${seasonTabsHtml}
                            </div>

                            <!-- Stats Summary Bar -->
                            ${played > 0 ? `
                            <div class="grid grid-cols-3 gap-2 shrink-0">
                                <div class="bg-slate-950 border border-slate-700 rounded p-1.5 text-center">
                                    <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">O / G / B / M</div>
                                    <div class="text-xs font-black text-white">${played} / <span class="text-green-400">${wins}</span> / <span class="text-orange-400">${draws}</span> / <span class="text-red-400">${losses}</span></div>
                                </div>
                                <div class="bg-slate-950 border border-slate-700 rounded p-1.5 text-center">
                                    <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Gol (A/Y)</div>
                                    <div class="text-xs font-black text-white">${gf} <span class="text-slate-500 font-normal">/ ${ga}</span></div>
                                </div>
                                <div class="bg-slate-950 border border-emerald-900/50 rounded p-1.5 text-center">
                                    <div class="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mb-0.5">Puan</div>
                                    <div class="text-xs font-black text-emerald-400">${pts}</div>
                                </div>
                            </div>` : ''}

                            <!-- Tournament Filter Pills -->
                            <div class="flex gap-2 overflow-x-auto hide-scrollbar shrink-0 pb-1">
                                ${filterHtml}
                            </div>

                            <!-- Match Table -->
                            <div class="flex-1 overflow-auto table-scroll border border-slate-700 rounded-lg bg-slate-950 min-h-0">
                                <table class="w-full border-separate border-spacing-0 text-xs min-w-[500px]">
                                    <thead class="bg-slate-900 sticky top-0 z-10">
                                        <tr class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                            <th class="p-2 text-center border-b border-slate-700 w-8">#</th>
                                            <th class="p-2 text-left border-b border-slate-700 w-24">Müsabaka</th>
                                            <th class="p-2 text-center border-b border-slate-700 w-10">Zemin</th>
                                            <th class="p-2 text-right border-b border-slate-700">Ev</th>
                                            <th class="p-2 text-center border-b border-slate-700 w-16">Skor</th>
                                            <th class="p-2 text-left border-b border-slate-700">Dep</th>
                                            <th class="p-2 text-left border-b border-slate-700">Goller</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${matchRowsHtml}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- 2. ORTA PANEL: MÜSABAKA TABLOLARI -->
                    <div class="flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg h-full min-h-[550px] xl:min-h-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-3 shrink-0 flex justify-between items-center">
                            <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-trophy mr-2 text-yellow-500"></i>Müsabaka Tabloları</h3>
                            
                            <div class="flex gap-2">
                                <select id="custom-tour-select" class="bg-slate-900 border border-slate-600 text-[10px] text-slate-300 rounded p-1 outline-none focus:border-emerald-500">
                                    <option value="Süper Lig">Süper Lig</option>
                                    <option value="Türkiye Kupası">Türkiye Kupası</option>
                                    <option value="Şampiyonlar Ligi">Şampiyonlar Ligi</option>
                                    <option value="Avrupa Ligi">Avrupa Ligi</option>
                                    <option value="Konferans Ligi">Konferans Ligi</option>
                                    <option value="Sezon Öncesi Hazırlık">Sezon Öncesi Hazırlık</option>
                                    <option value="Dünya Kupası">Dünya Kupası</option>
                                    <option value="Avrupa Şampiyonası">Avrupa Şampiyonası</option>
                                </select>
                                <button onclick="addCustomTournament()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold transition-colors">
                                    <i class="fa-solid fa-plus mr-1"></i>Ekle
                                </button>
                            </div>
                        </div>
                        <div class="p-4 overflow-y-auto custom-scrollbar h-full flex flex-col gap-6">
                            
                            ${(() => {
                                const cTours = customTournamentsData[activeFixtureSeason] || [];
                                if (cTours.length === 0) return `<div class="text-center text-slate-500 text-sm mt-10">Henüz bu sezon için müsabaka tablosu eklenmedi.<br>Yukarıdan seçip ekleyebilirsiniz.</div>`;
                                
                                return cTours.map(tour => {
                                    // Geriye dönük uyumluluk: eski kayıtlarda bu bayraklar yoksa, mevcut veriye göre makul bir varsayılan uygula
                                    const tableOn = tour.tableEnabled !== false;
                                    const knockoutOn = tour.knockoutEnabled !== undefined
                                        ? tour.knockoutEnabled
                                        : (KNOCKOUT_DEFAULT_TYPES.includes(tour.type) || (tour.knockouts && tour.knockouts.length > 0));

                                    // --- GRUP / LİG TABLOSU BÖLÜMÜ ---
                                    let tableSectionHtml = '';
                                    if (tableOn) {
                                        let tableRows = (tour.table || []).map((row, idx) => `
                                            <tr class="border-b border-slate-800 bg-slate-800/20 hover:bg-slate-800/50 transition-colors">
                                                <td class="p-1.5 text-slate-400 font-bold w-8 text-center outline-none focus:bg-slate-700 cursor-text rounded" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'rank', this)">${row.rank}</td>
                                                <td class="p-1.5 font-bold text-white outline-none focus:bg-slate-700 cursor-text rounded" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'name', this)">${row.name}</td>
                                                <td class="p-1.5 text-center text-slate-300 w-8 outline-none focus:bg-slate-700 cursor-text rounded" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'pld', this)">${row.pld}</td>
                                                <td class="p-1.5 text-center text-slate-300 w-10 outline-none focus:bg-slate-700 cursor-text rounded" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'gd', this)">${row.gd}</td>
                                                <td class="p-1.5 text-center font-bold text-emerald-400 w-10 outline-none focus:bg-slate-700 cursor-text rounded" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'pts', this)">${row.pts}</td>
                                            </tr>
                                        `).join('');

                                        tableSectionHtml = `
                                            <div class="mb-1">
                                                <div class="flex justify-between items-center mb-1 gap-2">
                                                    <span class="text-[10px] text-slate-400 font-bold uppercase truncate"><i class="fa-solid fa-table-list mr-1"></i>Grup / Lig Tablosu</span>
                                                    <div class="flex gap-1 shrink-0">
                                                        <button onclick="openTournamentTableBulkModal('${tour.id}')" class="text-[9px] bg-indigo-900/50 hover:bg-indigo-800 text-indigo-300 px-2 py-0.5 rounded transition-colors" title="Toplu Ekle"><i class="fa-solid fa-list-ol mr-1"></i>Toplu</button>
                                                        <button onclick="addRowToCustomTournament('${tour.id}')" class="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors" title="Satır Ekle"><i class="fa-solid fa-plus"></i></button>
                                                        <button onclick="toggleTournamentTable('${tour.id}', false)" class="text-[9px] bg-red-900/40 hover:bg-red-800 text-red-300 px-2 py-0.5 rounded transition-colors" title="Bu Bölümü Sil"><i class="fa-solid fa-trash"></i></button>
                                                    </div>
                                                </div>
                                                <table class="w-full text-[11px] text-left text-slate-300 mb-1">
                                                    <thead class="text-[9px] text-slate-400 uppercase bg-slate-900">
                                                        <tr>
                                                            <th class="p-1 border-slate-700 text-center">Sıra</th>
                                                            <th class="p-1 border-slate-700">Takım</th>
                                                            <th class="p-1 border-slate-700 text-center">O</th>
                                                            <th class="p-1 border-slate-700 text-center">Av</th>
                                                            <th class="p-1 border-slate-700 text-center font-bold text-white">P</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${tableRows}
                                                    </tbody>
                                                </table>
                                            </div>
                                        `;
                                    } else {
                                        tableSectionHtml = `
                                            <button onclick="toggleTournamentTable('${tour.id}', true)" class="w-full text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-dashed border-slate-700 rounded py-2 mb-2 transition-colors">
                                                <i class="fa-solid fa-plus mr-1"></i>Grup / Lig Tablosu Ekle
                                            </button>
                                        `;
                                    }

                                    // --- ELEME AŞAMALARI BÖLÜMÜ ---
                                    let knockoutHtml = '';
                                    if (knockoutOn) {
                                        // Eski statik verileri yeni dinamik yapıya geçirme (Geriye dönük uyumluluk)
                                        if (!tour.knockouts) {
                                            tour.knockouts = [];
                                            if (tour.round32) tour.knockouts.push({ id: 'ko_r32', stage: 'Son 32', result: tour.round32 });
                                            if (tour.round16) tour.knockouts.push({ id: 'ko_r16', stage: 'Son 16', result: tour.round16 });
                                            if (tour.quarterFinal) tour.knockouts.push({ id: 'ko_qf', stage: 'Çeyrek Final', result: tour.quarterFinal });
                                            if (tour.semiFinal) tour.knockouts.push({ id: 'ko_sf', stage: 'Yarı Final', result: tour.semiFinal });
                                            if (tour.final) tour.knockouts.push({ id: 'ko_f', stage: 'Final', result: tour.final });
                                        }

                                        let koRows = tour.knockouts.map(ko => `
                                            <div class="flex justify-between items-center border-b border-slate-800/50 pb-1.5 group/ko relative gap-2">
                                                
                                                <!-- Tur İsmi (Düzenlenebilir) -->
                                                <div class="text-slate-400 font-bold uppercase tracking-widest text-[9px] w-24 shrink-0 flex items-center outline-none focus:bg-slate-800 cursor-text rounded px-1" contenteditable="true" onblur="updateKnockoutMatch('${tour.id}', '${ko.id}', 'stage', this)">
                                                    <i class="fa-solid fa-bolt text-blue-500 mr-1"></i>${ko.stage}
                                                </div>
                                                
                                                <!-- Maç Sonucu (Düzenlenebilir) -->
                                                <div class="text-white font-medium bg-slate-900 px-2 py-1 rounded border border-slate-800 w-full outline-none focus:bg-slate-700 cursor-text truncate" contenteditable="true" onblur="updateKnockoutMatch('${tour.id}', '${ko.id}', 'result', this)">${ko.result}</div>
                                                
                                                <!-- Silme Butonu -->
                                                <button onclick="removeKnockoutMatch('${tour.id}', '${ko.id}')" class="text-slate-500 hover:text-red-500 opacity-0 group-hover/ko:opacity-100 transition-opacity p-1 shrink-0" title="Turu Sil"><i class="fa-solid fa-trash"></i></button>
                                            </div>
                                        `).join('');

                                        knockoutHtml = `
                                        <div class="bg-slate-950 rounded-lg border border-slate-700 p-2 text-xs mt-3 shadow-inner">
                                            <div class="flex justify-between items-center mb-2 border-b border-slate-800 pb-1 gap-2">
                                                <span class="text-[10px] text-slate-400 font-bold uppercase truncate"><i class="fa-solid fa-sitemap mr-1"></i>Eleme Aşamaları</span>
                                                <div class="flex gap-1 shrink-0">
                                                    <button onclick="addKnockoutMatch('${tour.id}')" class="text-[9px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded transition-colors"><i class="fa-solid fa-plus mr-1"></i>Tur Ekle</button>
                                                    <button onclick="toggleTournamentKnockouts('${tour.id}', false)" class="text-[9px] bg-red-900/40 hover:bg-red-800 text-red-300 px-2 py-0.5 rounded transition-colors" title="Bu Bölümü Sil"><i class="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div class="space-y-2">
                                                ${koRows}
                                                ${tour.knockouts.length === 0 ? '<div class="text-[10px] text-slate-500 italic px-2">Henüz eleme maçı eklenmedi.</div>' : ''}
                                            </div>
                                        </div>`;
                                    } else {
                                        knockoutHtml = `
                                            <button onclick="toggleTournamentKnockouts('${tour.id}', true)" class="w-full text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-dashed border-slate-700 rounded py-2 mt-2 transition-colors">
                                                <i class="fa-solid fa-plus mr-1"></i>Eleme Aşamaları Ekle
                                            </button>
                                        `;
                                    }

                                    return `
                                    <div class="relative group/tour bg-slate-950 p-2 rounded-lg border border-slate-700 shadow-sm">
                                        <button onclick="removeCustomTournament('${tour.id}')" class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover/tour:opacity-100 transition-opacity z-10 shadow-lg" title="Tüm Kartı Sil"><i class="fa-solid fa-times"></i></button>
                                        <h4 class="text-sm font-bold text-emerald-400 mb-2 border-b border-slate-800 pb-1 truncate">
                                            ${tour.type}
                                        </h4>
                                        ${tableSectionHtml}
                                        ${knockoutHtml}
                                    </div>`;
                                }).join('');
                            })()}

                        </div>
                    </div>

                    <!-- 3. SAĞ PANEL: DİĞER LİGLER (İlk 4) -->
                    <div class="flex flex-col bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-lg h-full min-h-[550px] xl:min-h-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-3 shrink-0 flex justify-between items-center">
                            <h3 class="text-lg font-bold text-white"><i class="fa-solid fa-globe mr-2 text-blue-400"></i>Avrupa Ligleri (İlk 4)</h3>
                            <span class="text-[9px] text-slate-400 font-bold uppercase"><i class="fa-solid fa-pen mr-1"></i>Tıkla ve Düzenle</span>
                        </div>
                        <div class="p-4 overflow-y-auto custom-scrollbar h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 content-start">
                            
                            ${[
                                { name: 'Premier League', flag: 'gb-eng' },
                                { name: 'Serie A', flag: 'it' },
                                { name: 'La Liga', flag: 'es' },
                                { name: 'Bundesliga', flag: 'de' },
                                { name: 'Ligue 1', flag: 'fr' },
                                { name: 'Liga Portugal', flag: 'pt' },
                                { name: 'Eredivisie', flag: 'nl' },
                                { name: 'Belgian 1A Pro League', flag: 'be' },
                                { name: 'Scottish Premiership', flag: 'gb-sct' },
                                { name: 'Norwegian Eliteserien', flag: 'no' },
                                { name: 'Swedish Allsvenskan', flag: 'se' },
                                { name: 'Romanian Liga I', flag: 'ro' }
                            ].map(league => {
                                const lData = (euroLeaguesData[activeFixtureSeason] && euroLeaguesData[activeFixtureSeason][league.name]) ? euroLeaguesData[activeFixtureSeason][league.name] : [{},{},{},{}];
                                
                                return `
                                <div class="bg-slate-950 p-3 rounded-lg border border-slate-700 shadow-sm">
                                    <h4 class="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2 border-b border-slate-800 pb-2">
                                        <img src="https://flagcdn.com/24x18/${league.flag}.png" class="w-4 h-3 rounded-sm drop-shadow"> ${league.name}
                                    </h4>
                                    <div class="space-y-1">
                                        ${[0,1,2,3].map(i => {
                                            const tName = lData[i].name || 'Takım Adı';
                                            const tPts = lData[i].pts || '0 P';
                                            const colors = ['emerald', 'blue', 'blue', 'orange'];
                                            return `
                                            <div class="flex justify-between items-center text-xs p-1.5 hover:bg-slate-800 rounded transition-colors border-l-2 border-${colors[i]}-500">
                                                <div class="flex gap-2 items-center w-full min-w-0 pr-2">
                                                    <span class="w-4 text-center text-${colors[i]}-400 font-bold shrink-0">${i+1}</span>
                                                    <span class="font-bold text-slate-300 w-full text-left outline-none focus:bg-slate-700 px-1 rounded cursor-text truncate" contenteditable="true" onblur="updateEuroLeague('${activeFixtureSeason}', '${league.name}', ${i}, 'name', this)" title="Takım Adını Düzenle">${tName}</span>
                                                </div>
                                                <span class="font-bold text-${colors[i]}-400 outline-none focus:bg-slate-700 px-1 rounded cursor-text whitespace-nowrap shrink-0" contenteditable="true" onblur="updateEuroLeague('${activeFixtureSeason}', '${league.name}', ${i}, 'pts', this)" title="Puanı Düzenle">${tPts}</span>
                                            </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                                `;
                            }).join('')}

                        </div>
                    </div>

                </div>`;

            updateContentArea(html);

            // En son oynanan maçı bul ve otomatik olarak ekranda ortala
            setTimeout(() => {
                const tableContainer = document.querySelector('#content-area .table-scroll');
                if (tableContainer) {
                    const rows = tableContainer.querySelectorAll('tbody tr');
                    let lastPlayedRow = null;
                    
                    rows.forEach(row => {
                        const scoreSpan = row.querySelector('.score-display');
                        if (scoreSpan) {
                            // textContent ignores CSS formatting. Replace any whitespace to be 100% safe.
                            const cleanText = scoreSpan.textContent.replace(/\s+/g, '');
                            
                            // Skor girilmişse (boş ' -:- ' veya sadece ' - ' değilse)
                            if (cleanText !== '-:-' && cleanText !== '-') {
                                lastPlayedRow = row;
                            }
                        }
                    });

                    if (lastPlayedRow) {
                        lastPlayedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }, 100);            
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

        function openFixtureModal(season, matchId) {
            activeFixtureSeason = season;
            activeFixtureMatchId = matchId;

            const dl = document.getElementById('fm-tournament-list');
            if (dl) dl.innerHTML = getFixtureTournaments().map(t => `<option value="${t}">`).join('');

            document.getElementById('fm-modal-subtitle').textContent = season + ' Sezonu';
            const deleteBtn = document.getElementById('fm-delete-btn');

            if (matchId) {
                document.getElementById('fm-modal-title').textContent = 'Fikstürü Düzenle';
                deleteBtn.classList.remove('hidden');
                const match = (fixtureData[season] || []).find(m => m.id === matchId);
                if (match) {
                    document.getElementById('fm-matchno').value = match.matchNo || '';
                    document.getElementById('fm-tournament').value = match.tournament || '';
                    document.getElementById('fm-ground').value = match.ground || 'home';
                    document.getElementById('fm-home').value = match.home || '';
                    document.getElementById('fm-away').value = match.away || '';
                    document.getElementById('fm-opp-country').value = match.oppCountry || '';
                }
            } else {
                document.getElementById('fm-modal-title').textContent = 'Fikstür Planla';
                deleteBtn.classList.add('hidden');
                document.getElementById('fm-matchno').value = '';
                document.getElementById('fm-tournament').value = '';
                document.getElementById('fm-ground').value = 'home';
                document.getElementById('fm-home').value = managedTeams.kulup.name || '';
                document.getElementById('fm-away').value = '';
                document.getElementById('fm-opp-country').value = '';
            }

            const modal = document.getElementById('fixture-match-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureModal() {
            document.getElementById('fixture-match-modal').classList.add('hidden');
            document.getElementById('fixture-match-modal').classList.remove('flex');
        }

        function saveFixtureMatch() {
            const matchNo = parseInt(document.getElementById('fm-matchno').value);
            const tournament = document.getElementById('fm-tournament').value.trim();
            const ground = document.getElementById('fm-ground').value;
            const home = document.getElementById('fm-home').value.trim();
            const away = document.getElementById('fm-away').value.trim();
            const oppCountry = document.getElementById('fm-opp-country').value.trim().toUpperCase();

            if (isNaN(matchNo)) { alert('Lütfen geçerli bir Maç No girin!'); return; }
            if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];

            const existingMatches = fixtureData[activeFixtureSeason];
            const isNew = !activeFixtureMatchId;
            const oldMatch = isNew ? null : existingMatches.find(m => m.id === activeFixtureMatchId);
            
            if (isNew || oldMatch.matchNo != matchNo) {
                existingMatches.forEach(m => {
                    if (parseInt(m.matchNo) >= matchNo) {
                        m.matchNo = (parseInt(m.matchNo) + 1).toString();
                    }
                });
            }

            if (activeFixtureMatchId) {
                const match = existingMatches.find(m => m.id === activeFixtureMatchId);
                if (match) {
                    match.matchNo = matchNo.toString();
                    match.tournament = tournament;
                    match.ground = ground;
                    match.home = home;
                    match.away = away;
                    match.oppCountry = oppCountry;
                    syncFixtureToMatches(match, activeFixtureSeason);
                }
            } else {
                const newMatch = {
                    id: 'fx_' + Date.now(),
                    matchNo: matchNo.toString(),
                    tournament: tournament,
                    ground: ground,
                    home: home,
                    away: away,
                    oppCountry: oppCountry,
                    homeScore: '',
                    awayScore: '',
                    events: []
                };
                existingMatches.push(newMatch);
                syncFixtureToMatches(newMatch, activeFixtureSeason);
            }

            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
        }

        function deleteFixtureMatch() {
            if (!confirm('Bu maç kaydını ve (varsa) içindeki skorları silmek istediğinize emin misiniz?')) return;
            removeFixtureFromMatches(activeFixtureMatchId, activeFixtureSeason);
            if (fixtureData[activeFixtureSeason]) {
                fixtureData[activeFixtureSeason] = fixtureData[activeFixtureSeason].filter(m => m.id !== activeFixtureMatchId);
            }
            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
        }

        function openMatchResultModal(season, matchId) {
            activeFixtureSeason = season;
            activeFixtureMatchId = matchId;
            
            const match = (fixtureData[season] || []).find(m => m.id === matchId);
            if (!match) return;

            document.getElementById('mr-modal-subtitle').textContent = `${season} Sezonu - ${match.tournament || 'Diğer'} Müsabakası`;
            document.getElementById('mr-home-label').textContent = match.home;
            document.getElementById('mr-away-label').textContent = match.away;

            document.getElementById('mr-home-score').value = match.homeScore !== '' ? match.homeScore : '';
            document.getElementById('mr-away-score').value = match.awayScore !== '' ? match.awayScore : '';
            
            // Modal açılırken datalist'i, maçın Kulüp mü Milli Takım mı olduğuna göre filtrelenmiş kadroyla doldurur
            const datalist = document.getElementById('squad-players-list');
            if(datalist) datalist.innerHTML = getSquadDatalistOptions(getFixtureMatchContext(match));
            
            fixtureEventsTemp = match.events ? JSON.parse(JSON.stringify(match.events)) : [];
            renderFixtureEvents();

            const modal = document.getElementById('match-result-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeMatchResultModal() {
            document.getElementById('match-result-modal').classList.add('hidden');
            document.getElementById('match-result-modal').classList.remove('flex');
            fixtureEventsTemp = [];
        }

        function saveMatchResult() {
            syncFixtureEvents();
            
            const homeScore = document.getElementById('mr-home-score').value;
            const awayScore = document.getElementById('mr-away-score').value;
            const match = fixtureData[activeFixtureSeason].find(m => m.id === activeFixtureMatchId);

            if (match) {
                match.homeScore = homeScore !== '' ? parseInt(homeScore) : '';
                match.awayScore = awayScore !== '' ? parseInt(awayScore) : '';
                match.events = fixtureEventsTemp.filter(ev => ev.scorer || ev.type === 'OPP' || ev.type === 'OG');
                syncFixtureToMatches(match, activeFixtureSeason);
            }

            saveToLocalStorage();
            closeMatchResultModal();
            renderFixturePanel();
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
                        <option value="OG" ${ev.type==='OG'?'selected':''}>↩ K.Kalesine</option>
                    </select>
                    <input type="text" id="fev_scorer_${i}" value="${ev.scorer}" list="squad-players-list" placeholder="Gol atan"
                        class="flex-1 bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500" autocomplete="off">
                    <input type="text" id="fev_assist_${i}" value="${ev.assist}" list="squad-players-list" placeholder="Asist (opsiyonel)"
                        class="flex-1 bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500" autocomplete="off">
                    <button onclick="syncFixtureEvents(); removeFixtureEvent(${i})" class="text-slate-500 hover:text-red-500 transition-colors px-1 shrink-0" title="Sil">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `).join('');
        }

        function openFixtureBulkModal(season) {
            activeFixtureSeason = season;
            document.getElementById('fb-modal-subtitle').textContent = season + ' Sezonu';
            document.getElementById('fb-textarea').value = '';
            
            const modal = document.getElementById('fixture-bulk-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureBulkModal() {
            const modal = document.getElementById('fixture-bulk-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function deleteBulkFixtures() {
           if(!confirm("Toplu olarak eklenen TÜM maçları silmek istediğinize emin misiniz? (Tek tek eklenenler silinmeyecektir.)")) return;
            if(fixtureData[activeFixtureSeason]) {
                const toRemove = fixtureData[activeFixtureSeason].filter(m => m.id.startsWith('fx_bulk_'));
                toRemove.forEach(m => removeFixtureFromMatches(m.id, activeFixtureSeason));
                fixtureData[activeFixtureSeason] = fixtureData[activeFixtureSeason].filter(m => !m.id.startsWith('fx_bulk_'));
            }
            saveToLocalStorage();
            renderFixturePanel();
        }

        function saveBulkFixtures() {
            const text = document.getElementById('fb-textarea').value.trim();
            if (!text) { alert('Lütfen eklenecek maçları girin!'); return; }

            // YENİ: Sistemin donmadığını göstermek için butona yükleniyor efekti ver
            const btn = document.querySelector('#fixture-bulk-modal button.bg-blue-600');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Ekleniyor...';
            btn.disabled = true;

            // YENİ: Ağır işlemi setTimeout içine alarak tarayıcıya nefes aldırıyoruz
            setTimeout(() => {
                const lines = text.split('\n');
                let addedCount = 0;
                
                if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];
                const teamName = managedTeams.kulup.name || '';

                lines.forEach(line => {
                    if (!line.trim()) return;
                    const parts = line.split(',').map(s => s.trim());
                    
                    if (parts.length >= 4) {
                        const matchNo = parts[0];
                        const tournament = parts[1];
                        const home = parts[2];
                        const away = parts[3];
                        const oppCountry = parts[4] ? normalizeCountryInput(parts[4]) : ''; 
                        
                        let ground = 'neutral';
                        if (home === teamName) ground = 'home';
                        else if (away === teamName) ground = 'away';

                        const newMatch = {
                            id: 'fx_bulk_' + Date.now() + '_' + addedCount,
                            matchNo: matchNo, 
                            tournament: tournament,
                            ground: ground,
                            home: home,
                            away: away,
                            oppCountry: oppCountry, 
                            homeScore: '',
                            awayScore: '',
                            events: []
                        };
                        fixtureData[activeFixtureSeason].push(newMatch);
                        syncFixtureToMatches(newMatch, activeFixtureSeason);
                        addedCount++;
                    }
                });

                // İşlem bitince butonu eski haline getir
                btn.innerHTML = originalHtml;
                btn.disabled = false;

                if (addedCount > 0) {
                    saveToLocalStorage();
                    closeFixtureBulkModal();
                    renderFixturePanel();
                } else {
                    alert('Geçerli formatta maç bulunamadı. Lütfen "Maç No, Müsabaka, Ev, Deplasman" formatında girin.');
                }
            }, 50); // 50 milisaniye bekle, "Ekleniyor" yazısının ekranda belirmesine izin ver
        }

        // --- SENKRONİZASYON MOTORU ---
        function syncFixtureToMatches(match, season) {
            // 1. Maçın Kulüp mü Milli Takım mı olduğunu güvenli bir şekilde tespit et
            const clubName = managedTeams.kulup.name || '';
            const milliName = managedTeams.milli.name || '';
            
            let isMilli = false;
            let teamName = clubName;
            
            if (match.home === milliName || match.away === milliName) {
                isMilli = true;
                teamName = milliName;
            } else if (match.home !== clubName && match.away !== clubName && milliName) {
                // Eğer ne tam eşleşme varsa ne de kulüp adı geçiyorsa ve milli isim tanımlıysa milli ihtimalini değerlendir
                isMilli = true;
                teamName = milliName;
            }

            const context = isMilli ? 'milli' : 'kulup';
            const isHome = match.home === teamName;
            const isAway = match.away === teamName;
            
            // Eğer maçta bizim aktif takımımız (kulüp veya milli) oynamıyorsa işlem yapma
            if (!isHome && !isAway) return;

            const oppName = isHome ? match.away : match.home;
            if (!oppName) return;

            let oppCountryCode = (match.oppCountry || '').toUpperCase().trim();
            let targetContinent = getContinentForCountry(oppCountryCode);

            let isDomestic = false;
            if (context === 'kulup' && (oppCountryCode === 'TR' || oppCountryCode === 'TUR' || targetContinent === opponentsConfig.kulup.domestic.name || !oppCountryCode)) {
                isDomestic = true;
            } else if (context === 'milli' && targetContinent === opponentsConfig.milli.domestic.name) {
                // HATA ÇÖZÜMÜ: Sadece rakibin kıtası gerçekten AVRUPA ise yerel (domestic) kabul et.
                isDomestic = true; 
            }

            let foundOpp = null;
            const safeOppName = (oppName || '').toLowerCase();
            
            // 1. Ana (Yurtiçi/Avrupa) grupta ara (Hata vermemesi için name koruması eklendi)
            if (opponentsConfig[context].domestic && opponentsConfig[context].domestic.teams) {
                foundOpp = opponentsConfig[context].domestic.teams.find(o => (o.name || '').toLowerCase() === safeOppName);
            }
            
            // 2. Bulunamadıysa yabancı (Kıta) gruplarında ara (Performans için flatMap iptal edildi, normal döngüye geçildi)
            if (!foundOpp && opponentsConfig[context].foreign) {
                for (let i = 0; i < opponentsConfig[context].foreign.length; i++) {
                    let grp = opponentsConfig[context].foreign[i];
                    foundOpp = grp.teams.find(o => (o.name || '').toLowerCase() === safeOppName);
                    if (foundOpp) break; // Rakibi bulur bulmaz döngüyü kır (Müthiş hız kazandırır)
                }
            }

            if (!foundOpp) {
                if (isDomestic || context === 'milli') {
                    let domGroup = context === 'milli' ? opponentsConfig.milli.domestic : opponentsConfig.kulup.domestic;
                    let slot = domGroup.teams.find(o => !o.name);
                    if (slot) { 
                        foundOpp = slot; 
                        foundOpp.name = oppName; 
                        foundOpp.logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(oppName)}`;
                        foundOpp.country = oppCountryCode;
                    } else {
                        foundOpp = { id: `${context.charAt(0)}_d_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, name: oppName, logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(oppName)}`, country: oppCountryCode };
                        domGroup.teams.push(foundOpp);
                    }
                } else {
                    let grp = opponentsConfig[context].foreign.find(g => g.name === targetContinent);
                    if (!grp) { 
                        grp = { id: 'f_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5), name: targetContinent, color: '#1e3a8a', teams: [] }; 
                        opponentsConfig[context].foreign.push(grp); 
                    }
                    foundOpp = { id: `f_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, name: oppName, logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(oppName)}`, country: oppCountryCode };
                    grp.teams.push(foundOpp);
                }
            } else {
                if(!foundOpp.country && oppCountryCode) foundOpp.country = oppCountryCode;
            }

            if (!matchDataStore[context][season]) matchDataStore[context][season] = {};
            if (!matchDataStore[context][season][foundOpp.id]) matchDataStore[context][season][foundOpp.id] = [];
            
            let matchResult = '';
            if (match.homeScore !== '' && match.awayScore !== '' && match.homeScore !== undefined && match.awayScore !== undefined) {
                const tScore = parseInt(isHome ? match.homeScore : match.awayScore);
                const oScore = parseInt(isHome ? match.awayScore : match.homeScore);
                if (!isNaN(tScore) && !isNaN(oScore)) {
                    if (tScore > oScore) matchResult = 'W';
                    else if (tScore < oScore) matchResult = 'L';
                    else matchResult = 'D';
                }
            }

            const mData = { 
                fixtureId: match.id, 
                result: matchResult, 
                location: isHome ? 'H' : 'A', 
                teamScore: isHome ? match.homeScore : match.awayScore, 
                oppScore: isHome ? match.awayScore : match.homeScore, 
                tournament: match.tournament || '',
                events: match.events ? JSON.parse(JSON.stringify(match.events)) : []
            };
            
            const idx = matchDataStore[context][season][foundOpp.id].findIndex(m => m.fixtureId === match.id);
            if (idx !== -1) matchDataStore[context][season][foundOpp.id][idx] = mData;
            else matchDataStore[context][season][foundOpp.id].push(mData);
        }

        // DÜZELTME: Sadece kulüp maçlarını değil, silinen milli maçları da temizle
        function removeFixtureFromMatches(fixtureId, season) {
            ['kulup', 'milli'].forEach(context => {
                if (matchDataStore[context] && matchDataStore[context][season]) {
                    Object.keys(matchDataStore[context][season]).forEach(oppId => {
                        matchDataStore[context][season][oppId] = matchDataStore[context][season][oppId].filter(m => m.fixtureId !== fixtureId);
                    });
                }
            });
        }

