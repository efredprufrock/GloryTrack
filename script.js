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
    "Ana Sayfa": "Home",
    "Kupalar": "Trophies",
    "Maçlar": "Matches",
    "Kadro": "Squad",
    "Ulusal Ligler": "Domestic Leagues",
    "Ulusal Kupalar": "Domestic Cups",
    "Avrupa / Kıtalararası": "Europe / Intercontinental",
    "Milli Takım": "National Team",
    "Özel": "Custom",
    "Eşlenmemiş": "Unmatched",
    "Ana Takım": "Main",
    "Müsabaka Seç": "Select Competition",
    "Turnuva Seç": "Select Tournament",
    "Renk, seçilen turnuvaya göre otomatik belirlenir.": "Color is set automatically from the selected tournament.",
    "Vitrin": "Showcase",
    "Izgara": "Grid",
    "Yeni Kupa Ekle": "Add New Cup",
    "Zaman Çizelgesi": "Timeline",
    "Henüz gol yok.": "No goals yet.",
    "Henüz asist yok.": "No assists yet.",
    "Kadroyu Düzenle": "Edit Squad",
    "Düzenlemeyi Bitir": "Finish Editing",
    "Yedek Oyuncular": "Substitutes",
    "Rezerv Oyuncular": "Reserved",
    "Henüz oyuncu seçilmedi.": "No players selected yet.",
    "İlk 11 henüz seçilmedi.": "Starting 11 not selected yet.",
    "Sağ üstteki kalem simgesine tıklayarak oyuncuları ve mevkileri seçin.": "Click the pencil icon at the top right to choose players and positions.",
    "Tümünü Aç / Kapat": "Expand / Collapse All",
    "Maç detayı girilmemiş": "No match detail entered",
    "Altyapı": "Youth",
    "Lig Tablosu": "League Table",
    "Turnuvalar": "Tournaments",
    "Şampiyon": "Champion",
    "Bu kadroda oyuncu yok.": "No players in this squad.",
    "Bu sezon için lig tablosu yok.": "No league table for this season.",
    "Bu sezon için turnuva yok.": "No tournaments for this season.",
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
    "Tema Rengi": "Theme Color",
    "Her renk için hem koyu hem açık tema mevcuttur. Sol menüdeki gündüz/gece butonuyla ikisi arasında geçiş yapabilirsiniz.": "Each color has both a dark and a light theme. Use the day/night button in the left menu to switch between them.",
    "Kırmızı": "Red",
    "Sarı": "Yellow",
    "Mavi": "Blue",
    "Turuncu": "Orange",
    "Bej - Kahve": "Beige - Brown",
    "Gri - Antrasit": "Gray - Anthracite",
    "Yeşil": "Green",
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
    "Başka cihazdan güncellendi": "Updated from another device",
    "Bağlandı": "Connected",
    "Buluttan veri alınamadı": "Could not fetch data from cloud",

    // --- ANA SAYFA (HOME) ---
    "İlk 11": "Starting 11",
    "İlk 5": "Starting 5",
    "Tümü": "All",
    "Yurt İçi": "Domestic",
    "Avrupa": "Europe",
    "Son 4 Maç": "Last 4 Matches",
    "Sıradaki Maç": "Next Match",
    "Küçült": "Zoom Out",
    "Büyüt": "Zoom In",
    "Fikstür Şeridini Aç/Kapat": "Show/Hide Fixture Strip",
    "Seçilen / Özel Logo URL": "Selected / Custom Logo URL",
    "Örn: Türkiye": "e.g. Turkey",
    "Kıta (Örn: AVRUPA, ASYA, AFRİKA, Asia, Europe...)": "Continent (e.g. EUROPE, ASIA, AFRICA...)",
    "Serbest metin - hangi grupta görünsün istiyorsan onu yaz": "Free text - type the group it should appear in",
    "Ülke Adı veya Kodu (Örn: Türkiye, Spain, TR)": "Country Name or Code (e.g. Turkey, Spain, TR)",
    "Kıta Adı (Örn: AVRUPA, AFRİKA)": "Continent Name (e.g. EUROPE, AFRICA)",
    "Grup / Ülke Adı (Örn: İNGİLTERE)": "Group / Country Name (e.g. ENGLAND)",
    "Güncel OVR": "Current OVR",
    "Geliş OVR: -": "Joining OVR: -",
    "Güncel Yaş": "Current Age",
    "Geliş Yaşı: -": "Joining Age: -",
    "Arşive Taşı": "Move to Archive",
    "Fotoğraf URL": "Photo URL",
    "Toplu Düzenle": "Bulk Edit",
    "değişiklik": "changes",
    "Değişiklik yok": "No changes",
    "Sezon (yaş / OVR)": "Season (age / OVR)",
    "Hücreleri doğrudan düzenleyin; Enter alttaki oyuncuya geçer. Değişen hücreler turuncu işaretlenir. Yaş/OVR hücresini boşaltmak o değeri siler. Oyuncu adını değiştirmek geçmiş maç istatistiklerindeki eski adı güncellemez.": "Edit cells directly; Enter moves to the player below. Changed cells are highlighted in orange. Clearing an age/OVR cell deletes that value. Renaming a player does not update the old name in past match stats.",
    "Genel": "Overview",
    "Gelişim": "Progress",
    "İstatistik": "Stats",
    "Takımda": "At Club",
    "sezon": "seasons",
    "Kariyer Öne Çıkanlar": "Career Highlights",
    "En golcü sezon": "Top Scoring Season",
    "En verimli turnuva": "Most Productive Tournament",
    "En çok gelişim": "Biggest Improvement",
    "Takım OVR sırası": "Squad OVR Rank",
    "Milli takım maçı": "National Team Caps",
    "forma sayısı": "appearances",
    "Henüz öne çıkan veri yok.": "No highlights yet.",
    "Bu oyuncu için henüz gol/asist verisi yok.": "No goal/assist data for this player yet.",
    "Geliş": "Joined",
    "Yaz": "Summer",
    "Aralık": "December",
    "Aral": "Dec",
    "Kış": "Winter",
    "Sezon sonu": "Season End",
    "Son": "End",
    "Dönem": "Period",
    "OVR & Yaş": "OVR & Age",
    "● Yaş": "● Age",
    "Fark": "Change",
    "Toplam Gol": "Total Goals",
    "Toplam Asist": "Total Assists",
    "Turnuvaya Göre Gol": "Goals by Tournament",
    "gol ·": "goals ·",
    "asist": "assists",
    "Yükselt": "Promote",
    "Örn: TR, BR, AR, FR, GB-ENG": "e.g. TR, BR, AR, FR, GB-ENG",
    "Oynadığı Kulüp": "Club",
    "Örn: Galatasaray": "e.g. Galatasaray",
    "Kulüp Logosu URL": "Club Logo URL",
    "Kalıcı Olarak Sil": "Delete Permanently",
    "Akademi Max Potansiyel Güncellemesi": "Academy Max Potential Update",
    "Fikstürü Sil": "Delete Fixture",
    "Logoyu Kaldır": "Remove Logo",
    "Örnek 1:": "Example 1:",
    "Örnek 2:": "Example 2:",
    "Toplu Yaş / OVR Girişi": "Bulk Age / OVR Entry",
    "Sezon - Dönem": "Season - Period",
    "Her satıra bir takım gelecek şekilde, aşağıdaki sıraya göre virgülle ayırarak yapıştırın:": "Paste one team per line, comma-separated in the following order:",
    "Sıra, Takım Adı, Oynanan, Galibiyet, Beraberlik, Mağlubiyet, Atılan, Yenilen, Averaj, Puan": "Rank, Team Name, Played, Won, Drawn, Lost, GF, GA, GD, Points",
    "Bu liste, tablodaki mevcut tüm satırların yerine geçer.": "This list replaces all existing rows in the table.",
    "Takım Seç": "Select Team",
    "Oyuncu": "Player",
    "Ara...": "Search...",
    "Oyuncuları Listele ve Kopyala": "List and Copy Players",
    "Rol": "Role",
    "Max Potansiyel": "Max Potential",
    "Temizle": "Clear",
    "Otomatik dolar veya URL girin": "Auto-fills, or enter a URL",
    "Goller & Asistler": "Goals & Assists",
    "Seçmek için tıkla": "Click to select",
    "Skor / gol-asist girmek için tıklayın": "Click to enter score / goals-assists",
    "Yukarı Taşı": "Move Up",
    "Aşağı Taşı": "Move Down",
    "Logo Ekle/Değiştir": "Add/Change Logo",
    "Fikstürü Düzenle": "Edit Fixture",
    "Toplu Sil": "Bulk Delete",
    "Satır Ekle": "Add Row",
    "Skorları Düzenle": "Edit Scores",
    "Turu Sil": "Delete Round",
    "Gol Kralını Düzenle": "Edit Top Scorer",
    "Asist Kralını Düzenle": "Edit Top Assist Provider",
    "Tüm Kartı Sil": "Delete Entire Card",
    "Turnuva ismini düzenlemek için tıklayın": "Click to edit tournament name",
    "Daralt/Genişlet": "Collapse/Expand",
    "Takım Adını Düzenle": "Edit Team Name",
    "Puanı Düzenle": "Edit Points",
    "+ Yeni / Özel Turnuva": "+ New / Custom Tournament",
    "Dışa Aktar": "Export",
    "İçeri Aktar": "Import",
    "Fikstür Özeti": "Fixture Summary",
    "İstatistikler": "Statistics",
    "Bu arama için Wikipedia'da görsel bulunamadı.": "No image found on Wikipedia for this search.",
    "Sonuç bulunamadı. İsmi kontrol edip tekrar deneyin veya URL/Dosya ile manuel ekleyin.": "No results found. Check the name and try again, or add it manually via URL/File.",
    "Sayfadaki tüm görseller taranıyor...": "Scanning all images on the page...",
    "Facecard Taranıyor...": "Scanning Facecard...",
    "Arayüz ve Dil": "Interface & Language",
    "Dil Değiştir": "Change Language",
    "Switch Language / Dil Değiştir": "Switch Language",
    "Switch Language": "Switch Language",
    "ŞU AN:": "CURRENT:",
    "Yeni Kupa Ekle": "Add New Cup",
    "Yeni Kupa": "New Cup",
    "Yeni Sezon": "New Season",
    "Yerel Dosya Seçildi": "Local File Selected",
    "Yerel Dosya Yüklendi (Sıkıştırıldı)": "Local File Uploaded (Compressed)",
    "Bağlanılıyor...": "Connecting...",
    "Bağlı": "Connected",
    "İkinci": "Runner-up",
    "UEFA Süper Kupa": "UEFA Super Cup",
    "UEFA Avrupa Şampiyonası": "UEFA European Championship",
    "BİLİNMEYEN": "UNKNOWN",
    "BİLİNMİYOR": "UNKNOWN",
    "Bu maç için henüz gol/asist detayı girilmedi.": "No goal/assist details entered for this match yet.",
    "Gol & Asist Detayları": "Goal & Assist Details",
    "Eleme Aşamaları Ekle": "Add Knockout Stages",
    "- Toplu Ekle": "- Bulk Add",
    "Son Maç": "Last Match",
    "Milli Takım": "National Team",
    "Kadroları": "Squads",
    "İsimsiz Turnuva": "Unnamed Tournament",
    "⚽ Rak": "⚽ Opp",
    "Örnek:\nPremier League, Liverpool, 45 P\nPremier League, Arsenal, 42 P\nLa Liga, Real Madrid, 40 P\nLa Liga, Barcelona, 38 P": "Example:\nPremier League, Liverpool, 45 P\nPremier League, Arsenal, 42 P\nLa Liga, Real Madrid, 40 P\nLa Liga, Barcelona, 38 P",
    "Örnek:\nST, Victor Osimhen, NGA, 25, 88\nCAM, Dries Mertens, BEL, 37, 84\nCM, Gabriel Sara, BRA, 25, 79": "Example:\nST, Victor Osimhen, NGA, 25, 88\nCAM, Dries Mertens, BEL, 37, 84\nCM, Gabriel Sara, BRA, 25, 79",
    "Örnek:\n1, Galatasaray, 34, 28, 6, 0, 85, 55, 30, 90\n2, Fenerbahçe, 34, 25, 7, 2, 78, 40, 38, 82": "Example:\n1, Galatasaray, 34, 28, 6, 0, 85, 55, 30, 90\n2, Fenerbahçe, 34, 25, 7, 2, 78, 40, 38, 82",
    "Örnek:\nArda Güler\nHakan Çalhanoğlu\nKenan Yıldız": "Example:\nArda Güler\nHakan Çalhanoğlu\nKenan Yıldız",
    "Örnek:\nGalatasaray\nFenerbahçe, #00004c\nBeşiktaş, #000000": "Example:\nGalatasaray\nFenerbahçe, #00004c\nBeşiktaş, #000000",
    "Son Maçlar": "Last Matches",
    "Sonraki Maçlar": "Next Matches",
    "Sonraki 4 Maç": "Next 4 Matches",
    "Gol Kralları": "Top Scorers",
    "İSTATİSTİKLER": "STATISTICS",
    "FİKSTÜR ÖZETİ": "FIXTURE SUMMARY",
    "GOL": "GLS",
    "ASİST": "AST",
    "Oynanmış maç yok.": "No matches played.",
    "Planlanmış maç yok.": "No scheduled matches.",
    "Bu kadro için henüz İlk 11 belirlenmedi.": "No Starting 11 has been set for this squad yet.",
    "Kadro panelinden \"Kadrolar\" ikonuna tıklayarak oluşturabilirsiniz.": "You can create one by clicking the \"Squads\" icon in the Squad panel.",
    "sezonu için gol/asist verisi bulunmuyor.": "season has no goal/assist data.",
    "Kayıtlı sezon bulunmuyor.": "No saved seasons.",

    // --- KUPALAR (TROPHIES) ---
    "Hücrelerdeki + butonuna tıklayarak logo ekleyebilirsiniz": "You can add a logo by clicking the + button in the cells",
    "Yeni Sezon Ekle": "Add New Season",
    "Kupa Ekle": "Add Trophy",
    "Turnuvayı Düzenle": "Edit Tournament",
    "Sezonu Sil": "Delete Season",

    // --- MAÇLAR (MATCHES) ---
    "YURTİÇİ": "DOMESTIC",
    "YURTDIŞI / DİĞER": "ABROAD / OTHER",
    "AVRUPA": "EUROPE",
    "ASYA": "ASIA",
    "AFRİKA": "AFRICA",
    "KUZEY AMERİKA": "NORTH AMERICA",
    "GÜNEY AMERİKA": "SOUTH AMERICA",
    "DİĞER": "OTHER",
    "YENİ ÜLKE GRUBU": "NEW COUNTRY GROUP",
    "YENİ KITA GRUBU": "NEW CONTINENT GROUP",
    "Yeni Kıta Grubu Ekle": "Add New Continent Group",
    "Grubu Düzenle/Sil": "Edit/Delete Group",
    "Sezon İstatistikleri": "Season Stats",
    "Galibiyet Yüzdesi": "Win Percentage",
    "G / B / M": "W / D / L",
    "Yeni Takım": "New Team",

    // --- KADRO (SQUAD) ---
    "HAZ-ŞUB": "JUN-FEB",
    "KIŞ TR.": "WINTER TR.",
    "ARA-EYL": "DEC-SEP",
    "YAZ TR.": "SUMMER TR.",
    "TAKIMDAN AYRILANLAR / ARŞİV": "DEPARTED PLAYERS / ARCHIVE",
    "Ülke/Yaş/OVR/Gelişim/Gol/Asist sütunlarını gizle veya göster": "Hide or show Country/Age/OVR/Growth/Goal/Assist columns",
    "Kadrolar": "Squads",
    "Ülke": "Country",
    "Gelişim (+/-)": "Growth (+/-)",
    "Potansiyel (POT)": "Potential (POT)",
    "Forma Sayısı (Caps)": "Caps",
    "Gol": "Goals",
    "Asist": "Assists",
    "Kariyer İstatistikleri": "Career Statistics",
    "Goller": "Goals",
    "Asistler": "Assists",
    "Takım Toplamı": "Team Total",
    "Toplam": "Total",
    "Lider": "Leader",
    "Kayıtlı oyuncu bulunmuyor.": "No registered players.",
    "Yeni Oyuncu Ekle": "Add New Player",
    "Oyuncu Adı": "Player Name",
    "Değişiklikleri Kaydet": "Save Changes",
    "Oyuncuları aşağıdaki formatta, aralarına virgül koyarak her satıra bir oyuncu gelecek şekilde yapıştırın:": "Paste the players in the following format, separated by commas, one player per line:",
    "Pozisyon, İsim Soyisim, Ülke, Yaş, Reyting": "Position, Full Name, Country, Age, Rating",
    "Örnek:": "Example:",
    "As Takım Kadroları": "First Team Squads",
    "Akademi Kadroları": "Academy Squads",
    "Milli Takım Kadroları": "National Team Squads",
    "İlk 11": "Starting 11",
    "İlk 5": "Starting 5",
    "YEDEK": "SUB",
    "REZERV": "RESERVE",
    "Oyuncuları sahada sürükleyerek dizebilirsiniz. İsim atamak için oyuncu noktasının yanındaki kalem ikonuna tıklayın.": "You can drag and drop players on the pitch. Click the pencil icon next to the player node to assign a name.",
    "Seç": "Select",
    "Sıfırla": "Reset",
    "Liste": "List",
    "Şubat - Haziran Gelişimi": "February - June Growth",
    "Takım Adı / Açıklama Notu": "Team Name / Description Note",
    "Örn: WATFORD": "e.g. WATFORD",
    "Logo URL (Varsa metin yerine logo görünür)": "Logo URL (If provided, logo will be shown instead of text)",

    // --- LİG TARİHİ (LEAGUE HISTORY) ---
    "Lig Tarihi Paneli": "League History Panel",
    "TAKIMLAR": "TEAMS",
    "Sıralama Grafiği (1-18)": "Ranking Chart (1-18)",
    "Toplu Puan Gir": "Bulk Enter Points",
    "Toplu Puan Girişi": "Bulk Points Entry",
    "Takım bulunmuyor. Yeni takım ekleyin.": "No teams found. Add a new team.",
    "Kayıtlı takım bulunmuyor.": "No registered teams.",
    "Her satıra bir takım adı gelecek şekilde listeyi yapıştırın.": "Paste the list with one team name per line.",

    // --- TRANSFER PANELİ (TRANSFERS) ---
    "TRANSFER PANELİ": "TRANSFER PANEL",
    "Gelen ve Giden Oyuncu Bilançosu": "Incoming and Outgoing Player Balance",
    "Gider": "Expenses",
    "Gelir": "Income",
    "Net Bilanço": "Net Balance",
    "GELENLER": "INCOMING",
    "GİDENLER": "OUTGOING",
    "EKLE": "ADD",
    "Kayıtlı transfer bulunmuyor.": "No registered transfers.",
    "Bedelsiz": "Free",
    "Sezona Göre Sırala": "Sort by Season",
    "İsme Göre Sırala": "Sort by Name",
    "Mevkiye Göre Sırala": "Sort by Position",
    "OVR'a Göre Sırala": "Sort by OVR",
    "Bedele Göre Sırala": "Sort by Fee",
    "Profili Görüntüle": "View Profile",
    "Bilinmiyor": "Unknown",
    "Gelen Transfer Ekle": "Add Incoming Transfer",
    "Giden Transfer Ekle": "Add Outgoing Transfer",
    "Gittiği Takım": "To Club",
    "Örn: 15.000.000 (Boşsa Bedelsiz)": "e.g. 15,000,000 (Empty for Free Transfer)",
    "SHORTLIST": "SHORTLIST",
    "Hedef Ekle": "Add Target",
    "Hedefi Düzenle": "Edit Target",
    "Aranan Oyuncu Profili / Notlar": "Player Profile / Notes",
    "Öncelik Seviyesi": "Priority Level",
    "Yüksek (Acil)": "High (Urgent)",
    "Orta": "Medium",
    "Düşük (Fırsat)": "Low (Opportunity)",
    "Kayıtlı hedef bulunmuyor.": "No registered targets.",
    "Örn: Hızlı, bitiriciliği yüksek, pivot özellikli...": "e.g. Fast, clinical finisher, target man traits...",

    // --- GOL VE ASİST PANELİ (GOALS & ASSISTS) ---
    "Kulüp İstatistikleri": "Club Statistics",
    "Milli Takım İstatistikleri": "National Team Statistics",
    "GENEL TOPLAM": "OVERALL TOTAL",
    "TOPLAM": "TOTAL",
    "Daralt": "Collapse",
    "Turnuva Detayları": "Tournament Details",
    "Resmi bir gol veya asist verisi bulunmuyor.": "No official goal or assist data found.",
    "Ülkeye Göre Sırala": "Sort by Country",

    // --- SEZONLAR / FİKSTÜR PANELİ (SEASONS / FIXTURES / COMPETITION TABLES) ---
    "Grup / Lig Tablosu": "Group / League Table",
    "Sıra": "Rank",
    "Fikstür": "Fixtures",
    "O / G / B / M": "P / W / D / L",
    "En Büyük G / M": "Biggest W / L",
    "Gol (A/Y)": "GOALS (F/A)",
    "İÇ": "HOME",
    "DEP": "AWAY",
    "TAR": "NEUTRAL",
    "Müsabaka Tabloları": "Competition Tables",
    "GRUP / LİG TABLOSU": "GROUP / LEAGUE TABLE",
    "SIRA": "RANK",
    "Gol Kralı ekle": "Add Top Scorer",
    "Asist Kralı ekle": "Add Top Assist",
    "ELEME AŞAMALARI": "KNOCKOUT STAGES",
    "+ Tur Ekle": "+ Add Round",
    "Diğer Ligler": "Other Leagues",
    "TIKLA VE DÜZENLE": "CLICK AND EDIT",
    "Tıkla ve Düzenle": "Click and Edit",
    "Toplu": "Bulk",
    "Grup / Lig Tablosu Ekle": "Add Group / League Table",
    "+ Grup / Lig Tablosu Ekle": "+ Add Group / League Table",
    "+ Eleme Aşamaları Ekle": "+ Add Knockout Stages",
    "Lig Tablosunu Toplu Ekle": "Bulk Add League Table",
    "Avrupa Ligleri Toplu Ekle": "Bulk Add European Leagues",
    "Takım ve Logoyu Düzenle": "Edit Team and Logo",
    "Eleme Aşaması Takım Seçici": "Knockout Stage Team Selector",
    "Skorları Gir": "Enter Scores",
    "1. Maç": "1st Leg",
    "2. Maç (Rövanş)": "2nd Leg (Return)",
    "Gol Kralı": "Top Scorer",
    "Asist Kralı": "Top Assist",
    "Gol Sayısı": "Goals Scored",
    "Asist Sayısı": "Assists Made",
    "Müsabaka Logosu": "Competition Logo",
    "Grup / Lig tablosu bölümünü silmek istediğinize emin misiniz?": "Are you sure you want to delete the Group / League table section?",
    "Eleme Aşamaları bölümünü silmek istediğinize emin misiniz?": "Are you sure you want to delete the Knockout Stages section?",
    "Eleme Aşamaları": "Knockout Stages",
    "Tur Ekle": "Add Round",
    "Henüz eleme maçı eklenmedi.": "No knockout matches added yet.",
    "Bu Bölümü Sil": "Delete This Section",

    // Kariyer Yönetimi (Yeni eklenenler)
    "Kariyer Yönetimi (Kayıt Slotları)": "Career Management (Save Slots)",
    "Farklı takımlarla yeni kariyerlere başlamak için kayıt slotları arasında geçiş yapabilirsiniz.": "You can switch between save slots to start new careers with different teams.",
    "KAYIT SLOTU 1": "SAVE SLOT 1",
    "KAYIT SLOTU 2": "SAVE SLOT 2",
    "KAYIT SLOTU 3": "SAVE SLOT 3",
    "Kayıt Slotu": "Save Slot",
    "Kariyer Slotu 1 yükleniyor...": "Loading Career Slot 1...",
    "Kariyer Slotu 2 yükleniyor...": "Loading Career Slot 2...",
    "Kariyer Slotu 3 yükleniyor...": "Loading Career Slot 3...",
    "Aktif slotunuzdaki TÜM verileriniz kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?": "ALL your data in the active slot will be permanently deleted. Are you sure you want to continue?",
    "Sıfırlama işlemi geri alınamaz! Gerçekten bu kariyeri sıfırlamak istiyor musunuz?": "The reset operation cannot be undone! Do you really want to reset this career?",
    "Kayıt Slotu 1": "Save Slot 1",
    "Kayıt Slotu 2": "Save Slot 2",
    "Kayıt Slotu 3": "Save Slot 3",
    "Kayıt Slotu 1 içindeki tüm veriler kalıcı olarak silinecektir. Emin misiniz?": "All data in Save Slot 1 will be permanently deleted. Are you sure?",
    "Kayıt Slotu 2 içindeki tüm veriler kalıcı olarak silinecektir. Emin misiniz?": "All data in Save Slot 2 will be permanently deleted. Are you sure?",
    "Kayıt Slotu 3 içindeki tüm veriler kalıcı olarak silinecektir. Emin misiniz?": "All data in Save Slot 3 will be permanently deleted. Are you sure?",
    "Slotu Temizle": "Clear Slot",

    // Eksik Kalan Diğer Metinler
    "kullanılıyor.": "used.",
    "Yedek almayı unutmayın.": "Don't forget to take a backup.",
    "Bu sezon için henüz maç kaydı bulunmuyor.": "No match records found for this season yet.",
    "Sağ üstteki \"Maç Ekle\" butonuyla başlayın.": "Start by clicking the \"Add Match\" button on the top right.",
    "Henüz bu sezon için müsabaka tablosu eklenmedi.": "No competition table added for this season yet.",
    "Yukarıdan seçip ekleyebilirsiniz.": "You can select and add from above.",

    // Fikstür ve Avrupa Ligleri Modal Metinleri
    "Sütun Sırası:": "Column Order:",
    "Hafta / Aşama (Opsiyonel)": "Week / Stage (Optional)",
    "Örn: 1": "e.g. 1",
    "Lig, Kupa...": "League, Cup...",
    "Örn: EN, SC, SP, IT (Boş bırakılırsa Yurtiçi sayılır)": "e.g. EN, SC, SP, IT (If blank, considered Domestic)",
    "Hafta / Aşama (Örn: 14. Hafta, Çeyrek Final)": "Week / Stage (e.g. Week 14, Quarter Final)",
    "Örn: 14. Hafta veya Çeyrek Final": "e.g. Week 14 or Quarter Final",
    "Örnek: 1, Süper Lig, Galatasaray, Fenerbahçe, TR, 1. Hafta": "Example: 1, Super League, Galatasaray, Fenerbahce, TR, Week 1",
    "Örnek: 2, UEFA Şampiyonlar Ligi, Juventus, Galatasaray, IT, Çeyrek Final": "Example: 2, UEFAChampions League, Juventus, Galatasaray, IT, Quarter Final",
    "Her satıra bir takım gelecek şekilde, aşağıdaki sıraya göre virgülle ayırarak yapıştırın. Bir ligin ilk 4 satırı sırasıyla 1.-4. sıraya yerleşir.": "Paste with one team per line, separated by commas in the following order. The first 4 lines of a league will be placed in the 1st-4th places respectively.",
    "Lig Adı, Takım Adı, Puan": "League Name, Team Name, Points",
    "Örnek: Premier League, Liverpool, 45 P": "Example: Premier League, Liverpool, 45 P",
    "Örnek: Premier League, Arsenal, 42 P": "Example: Premier League, Arsenal, 42 P",
    "Örnek: La Liga, Real Madrid, 40 P": "Example: La Liga, Real Madrid, 40 P",
    "Geçerli lig adları: Premier League, Süper Lig, Serie A, La Liga, Bundesliga, Ligue 1, Liga Portugal, Eredivisie, Belgian 1A Pro League, Scottish Premiership, Norwegian Eliteserien, Swedish Allsvenskan": "Valid league names: Premier League, Süper Lig, Serie A, La Liga, Bundesliga, Ligue 1, Liga Portugal, Eredivisie, Belgian 1A Pro League, Scottish Premiership, Norwegian Eliteserien, Swedish Allsvenskan",

    // Turnuva ve Aşama İsimleri
    "UEFA Şampiyonlar Ligi": "UEFA Champions League",
    "UEFA Avrupa Ligi": "UEFA Europa League",
    "UEFA Konferans Ligi": "UEFA Conference League",
    "Süper Lig": "Super League",
    "Türkiye Kupası": "Turkish Cup",
    "Türkiye Süper Kupası": "Turkish Super Cup",
    "Dünya Kupası": "World Cup",
    "Avrupa Şampiyonası": "European Championship",
    "Dostluk Maçı": "Friendly Match",
    "Sezon Öncesi Hazırlık": "Pre-Season Friendly",
    "Grup Aşaması": "Group Stage",
    "Son 32": "Round of 32",
    "Son 16": "Round of 16",
    "Çeyrek Final": "Quarter Final",
    "Yarı Final": "Semi Final",
    "Final": "Final",
    "Üçüncülük": "Third Place",

    // --- AYARLAR VE VERİTABANI (SETTINGS) ---
    "Ayarlar ve Veritabanı": "Settings and Database",
    "Tüm kariyer verileriniz anlık olarak tarayıcınıza kaydedilmektedir. Farklı bir tarayıcıya veya cihaza aktarmak için aşağıdaki yedekleme araçlarını kullanın.": "All your career data is saved instantly to your browser. Use the backup tools below to transfer to a different browser or device.",
    "Bulut Senkronizasyonu": "Cloud Synchronization",
    "Bağlı değil": "Not connected",
    "Bu Google hesabıyla giriş yaptığınız her cihazda aynı kariyer verisine ulaşırsınız.": "You will access the same career data on every device you log into with this Google account.",
    "Verilerinizi diğer cihazlarınızdan da görmek için Google hesabınızla giriş yapın.": "Sign in with your Google account to view your data from your other devices.",
    "Hesaptan Çık": "Sign Out",
    "Buluta Bağlan": "Connect to Cloud",
    "Tarayıcı Depolama Kullanımı": "Browser Storage Usage",
    "Verileri Dışa Aktar": "Export Data",
    "Mevcut kariyerinizin yedeğini": "You can download a backup of your current career in",
    "formatında bilgisayarınıza indirebilirsiniz.": "format to your computer.",
    "Yedek İndir (.json)": "Download Backup (.json)",
    "Verileri İçeri Aktar": "Import Data",
    "Daha önce aldığınız veya başka bir cihazdan taşıdığınız yedeği (.json) sisteme yükleyin.": "Load a backup (.json) you previously took or transferred from another device into the system.",
    "Yedekten Yükle (.json)": "Load from Backup (.json)",
    "Kariyeri Sıfırla (Tehlikeli İşlem)": "Reset Career (Dangerous Action)",
    "Tarayıcıdaki tüm kariyer verilerini": "Permanently deletes all career data in the browser",
    "geri dönülemez şekilde": "(irreversibly)",
    "siler. Sıfırlamadan önce yedek aldığınızdan emin olun.": ". Make sure to take a backup before resetting.",
    "Tüm Verileri Sil ve Başa Dön": "Delete All Data and Start Over",

    // --- YÖNETİLEN TAKIM ---
    "Yönetilen Takımları Düzenle": "Edit Managed Teams",
    "Kulüp Takımı": "Club Team",
    "Bulunduğu Ülke Kodu (Örn: TUR, ENG)": "Country Code (e.g. TUR, ENG)",
    "Milli Takım (Opsiyonel)": "National Team (Optional)",
    "Ülke / Milli Takım Adı": "Country / National Team Name",

    // Ortak buton / etiket metinleri
    "Ara": "Search",
    "Ekle": "Add",
    "Toplu Ekle": "Bulk Add",
    "Takım Ekle": "Add Team",
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
    "Sola Taşı": "Move Left",
    "Sağa Taşı": "Move Right",
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
        "Yeni Satır Ekle": "Add New Row",
        "Maçları Ekle": "Add Matches",
        "İç Saha": "Home",
        "Deplasman": "Away",
        "Tarafsız": "Neutral",
        "Hafta / Aşama": "Week / Stage",
        "Satırı Sil": "Delete Row",
        "Maç Sonucu Gir": "Enter Match Result",
        "Metin Ekle": "Text Add",
        "Metin (Virgüllü) ile Toplu Ekle": "Bulk Add (Text / Comma)",
        "Metin ile Toplu Fikstür Ekle": "Bulk Add Fixtures via Text",
        "Her satıra bir maç gelecek şekilde, virgülle ayırarak listeyi yapıştırın.": "Paste the list, separating by commas, one match per line.",
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
    "Altyapıdan Geldi": "From Academy",
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
    "Excel'den kopyaladığınız veya virgülle ayırdığınız maç listesini aşağıya yapıştırın.": "Paste the match list you copied from Excel or separated by commas below.",
    "Toplu Maç Ekle": "Bulk Add Caps",
    "Toplu Milli Maç (Cap) Ekle": "Bulk Add National Caps",
        "Maça çıkan oyuncuların isimlerini her satıra bir isim gelecek şekilde yapıştırın.": "Paste the names of the players who played, one name per line.",
    "Listede eşleşen her oyuncunun forma sayısı (caps) 1 artırılacaktır.": "The caps count of each matched player will be incremented by 1.",
    "Maç Sayılarını Artır": "Increase Caps",

    // --- MAÇ SONUCU MODALI (MATCH RESULT MODAL) ---
    "Diğer": "Other",
    "Henüz olay eklenmedi.": "No events added yet.",
    "Bizim gol": "Our goal",
    "Rakip gol": "Opp. goal",
    "Dk": "Min",
    "⚽ Biz": "⚽ Us",
    "⚽ Rakip": "⚽ Opponent",
    "↩ K.Kalesine": "↩ Own Goal",
    "Gol atan": "Scorer",
    "Asist (opsiyonel)": "Assist (optional)",
    "Skoru gir / düzenle": "Enter / edit score",
        "Geçmiş": "History",
        "Geçmiş yok": "No history",

        // --- Kadro Rolleri (Squad Roles) ---
        "A Takım Adayı": "First Team Candidate",
        "Kiralık Gelişecek": "Develop on Loan",
        "Gelecek Vadeden": "Promising",
        "Yetersiz": "Insufficient",
        "+ Yeni Ekle...": "+ Add New...",
        "Yıldız": "Star Player",
        "Rotasyon": "Rotation",
        "Kadroda": "In Squad",
        "Yedek": "Substitute",
        "Genç Milli": "Youth Int.",
        "İzlemede": "Monitoring",
        "Kupa Görseli (gerçek kupa fotoğrafı) URL / Dosya": "Trophy Image (real trophy photo) URL / File",
        "Renk, seçilen turnuvaya göre otomatik belirlenir.": "Color is set automatically based on the selected tournament.",
        "Turnuva Seç": "Select Tournament",
        "⚠ Katalogda karşılığı olmayan turnuvalar": "⚠ Tournaments not found in the catalog",
        "Bu kayıtlar listelerde ⚠ ile görünür. İlgili alanda doğru turnuvayı seçerek veya \"+ Yeni / Özel Turnuva\" ile ekleyerek düzeltebilirsin.": "These records appear with ⚠ in the lists. Fix them by selecting the correct tournament in the relevant field or by adding it with \"+ New / Custom Tournament\".",
        "Henüz yok": "None yet",
        "Henüz kazanılmış kupa yok.": "No trophies won yet.",
        "kupa": "trophies",
        "farklı turnuva": "different tournaments",
        "kupalı sezon": "seasons with trophies",
        "Kazanılmayanları gizle": "Hide unwon",
        "Kazanılmayanları göster": "Show unwon",
        "Kupa yok": "No trophies",
        "★ SEZON ŞAMPİYONU": "★ SEASON CHAMPION",
        "Zaman Çizelgesi": "Timeline",
        "Tablo": "Table",
        "Kupa Dolabı": "Trophy Cabinet",
        "Rakip": "Opponent",
        "Müsabaka Seç": "Select Competition",
        "Sonuç": "Result",
        "W (Galibiyet)": "W (Win)",
        "L (Mağlup)": "L (Loss)",
        "Gol Detayı Ekle": "Add Goal Detail",
        "Kayıtlı maç bulunmuyor. Yeni maç ekleyin.": "No matches recorded. Add a new match.",
        "Bu kadroda oyuncu bulunmuyor.": "There are no players in this squad.",
        "Maç yok": "No matches",
        "Deplasman Logo": "Away Logo",
        "https://... (boşsa varsayılan altın kupa çizimi)": "https://... (default gold trophy drawing if empty)",
        "Kupa görselini / turnuvayı düzenle": "Edit trophy image / tournament",
        "Gol (Örn: Icardi)": "Goal (e.g. Icardi)",
        "Asist (Örn: Mertens)": "Assist (e.g. Mertens)",
        "Golu Sil": "Delete Goal",
        "Maçı Sil": "Delete Match",
        "Toplu Yaş/OVR Gir": "Bulk Enter Age/OVR",
        "Turnuva Dağılımını Göster / Gizle": "Show / Hide Tournament Breakdown",
        "İç Saha / Home": "Home venue",
        "Deplasman / Away": "Away venue",
        "Tarafsız Saha / Neutral": "Neutral venue",
        "Gol Detayları": "Goal Details",
        "Turnuvayı listeden seçin": "Select a tournament from the list",
        "Mevkiye göre grupla": "Group by position",
        "Tüm oyuncuları toplu sırala": "Sort all players together",
        "Hazırlık Maçı": "Friendly",
        "Avrupa / Kıtalararası": "Europe / Intercontinental",
        "Özel": "Custom",
        "FIFA Kulüpler Dünya Kupası": "FIFA Club World Cup",
        "Kulüpler Dünya Kupası": "Club World Cup",
        "Afrika Uluslar Kupası": "Africa Cup of Nations",
        "Dünya Kupası Elemeleri": "World Cup Qualifiers",
        "Avrupa Şampiyonası Elemeleri": "European Championship Qualifiers",
        "YAZ Transfer Dönemi": "SUMMER Transfer Window",
        "KIŞ Transfer Dönemi": "WINTER Transfer Window",
        "Eylül - Aralık Gelişimi": "Sep - Dec Progress",
        "Pozisyon, İsim Soyisim, Yaş, Reyting, Kulübü, Forma Sayısı": "Position, Full Name, Age, Rating, Club, Caps",
        "Gol Detayı Yok": "No goal details"
    };

// ===================== ÇEVİRİ MOTORU EKİ: kalıp (pattern) çevirileri + alert/confirm/prompt çevirisi =====================
// Sözlükte birebir karşılığı olmayan, içine sezon adı/sayı gibi değişken giren metinler için.
const TR_EN_PATTERNS = [
    { re: /^(.+) Sezonu - Lütfen Yurtiçi veya Uluslararası seçimi yapın\.$/, en: '$1 Season - Please select Domestic or International.', enRe: /^(.+) Season - Please select Domestic or International\.$/, tr: '$1 Sezonu - Lütfen Yurtiçi veya Uluslararası seçimi yapın.' },
    { re: /^(.+) Sezonu -$/, en: '$1 Season -', enRe: /^(.+) Season -$/, tr: '$1 Sezonu -' },
    { re: /^(.+) Sezonu$/, en: '$1 Season', enRe: /^(.+) Season$/, tr: '$1 Sezonu' },
    { re: /^(.+) paneli yapım aşamasında\.\.\.$/, en: '$1 panel is under construction...', enRe: /^(.+) panel is under construction\.\.\.$/, tr: '$1 paneli yapım aşamasında...' },
    { re: /^(.+) İstatistikleri$/, en: '$1 Statistics', enRe: /^(.+) Statistics$/, tr: '$1 İstatistikleri' },
    { re: /^(.+) sezonu için gol\/asist verisi bulunmuyor\.$/, en: 'No goal/assist data for the $1 season.', enRe: /^No goal\/assist data for the (.+) season\.$/, tr: '$1 sezonu için gol/asist verisi bulunmuyor.' },
    { re: /^(\d+) gol$/, en: '$1 goals', enRe: /^(\d+) goals$/, tr: '$1 gol' },
    { re: /^(\d+) oyuncu arasında$/, en: 'among $1 players', enRe: /^among (\d+) players$/, tr: '$1 oyuncu arasında' },
    { re: /^Potansiyele (\d+) puan kaldı$/, en: '$1 points to potential', enRe: /^(\d+) points to potential$/, tr: 'Potansiyele $1 puan kaldı' },
    { re: /^takım payı %(\d+)$/, en: 'team share %$1', enRe: /^team share %(\d+)$/, tr: 'takım payı %$1' },
    { re: /^(\d+) gol · toplamın %(\d+)'i$/, en: '$1 goals · $2% of total', enRe: /^(\d+) goals · (\d+)% of total$/, tr: "$1 gol · toplamın %$2'i" },
    { re: /^(\d\d\/\d\d) sezonu$/, en: '$1 season', enRe: /^(\d\d\/\d\d) season$/, tr: '$1 sezonu' },
    { re: /^(.+) · Toplu Düzenle$/, en: '$1 · Bulk Edit', enRe: /^(.+) · Bulk Edit$/, tr: '$1 · Toplu Düzenle', dictArg: true },
    { re: /^Geliş OVR: (.+)$/, en: 'Joining OVR: $1', enRe: /^Joining OVR: (.+)$/, tr: 'Geliş OVR: $1' },
    { re: /^Geliş Yaşı: (.+)$/, en: 'Joining Age: $1', enRe: /^Joining Age: (.+)$/, tr: 'Geliş Yaşı: $1' },
    { re: /^(.+) ekle$/, en: 'Add $1', enRe: /^Add (.+)$/, tr: '$1 ekle', dictArg: true },
    { re: /^(.+) Takım Ekle$/, en: 'Add team to $1', enRe: /^Add team to (.+)$/, tr: '$1 Takım Ekle' },
    { re: /^Tümü \((.+)\)$/, en: 'All ($1)', enRe: /^All \((.+)\)$/, tr: 'Tümü ($1)' },
    { re: /^%(.+) kullanılıyor\. Yedek almayı unutmayın\.$/, en: '$1% used. Remember to back up.', enRe: /^(.+)% used\. Remember to back up\.$/, tr: '%$1 kullanılıyor. Yedek almayı unutmayın.' },
    { re: /^%(.+) kullanılıyor\. ⚠️ Depolama alanı dolmak üzere! Yedek alıp bazı verileri temizleyin\.$/, en: '$1% used. ⚠️ Storage is almost full! Back up and clear some data.', enRe: /^(.+)% used\. ⚠️ Storage is almost full! Back up and clear some data\.$/, tr: '%$1 kullanılıyor. ⚠️ Depolama alanı dolmak üzere! Yedek alıp bazı verileri temizleyin.' },
    { re: /^Kariyer toplamı · 1 kupa$/, en: 'Career total · 1 trophy', enRe: /^Career total · 1 trophy$/, tr: 'Kariyer toplamı · 1 kupa' },
    { re: /^Kariyer toplamı · (\d+) kupa$/, en: 'Career total · $1 trophies', enRe: /^Career total · (\d+) trophies$/, tr: 'Kariyer toplamı · $1 kupa' },
    { re: /^1 kupa$/, en: '1 trophy', enRe: /^1 trophy$/, tr: '1 kupa' },
    { re: /^(\d+) kupa$/, en: '$1 trophies', enRe: /^(\d+) trophies$/, tr: '$1 kupa' }
];

// İkinci geçiş: birebir sözlük eşleşmesi olmayan metin düğümlerine kalıpları uygular.
function i18nApplyPatterns(root, toEn) {
    if (!root) return;
    const fix = (node) => {
        const raw = node.nodeValue;
        const t = raw && raw.trim();
        if (!t || t.length > 200) return;
        for (const p of TR_EN_PATTERNS) {
            const re = toEn ? p.re : p.enRe;
            const tpl = toEn ? p.en : p.tr;
            const mm = re && tpl ? t.match(re) : null;
            if (!mm) continue;
            const arg = mm[1];
            const d = toEn ? TR_EN : EN_TR;
            if (p.dictArg && !d[arg]) continue; // yalnızca bilinen etiketlerde uygula
            node.nodeValue = raw.replace(t, tpl.replace(/\$(\d)/g, (m, i) => i === '1' ? (d[arg] || arg) : (mm[i] || '')));
            return;
        }
    };
    if (root.nodeType === Node.TEXT_NODE) { fix(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.tagName === 'SCRIPT' || root.tagName === 'STYLE') return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(fix);
}

// Eski i18nTranslateTree adı değiştirildi (i18nTranslateTreeBase); yenisi önce birebir sözlüğü, sonra kalıpları uygular.
function i18nTranslateTree(root, dict) {
    i18nTranslateTreeBase(root, dict);
    i18nApplyPatterns(root, dict === TR_EN);
}

// alert / confirm / prompt DOM'da olmadığı için gözlemci çeviremez; İngilizce modda mesajları burada çeviriyoruz.
const TR_EN_DIALOG = {
    "Lütfen aramak için bir takım adı girin!": "Please enter a team name to search!",
    "Lütfen arama yapmak için oyuncunun adını girin!": "Please enter the player's name to search!",
    "Yedek başarıyla yüklendi! Sistem yenileniyor...": "Backup loaded successfully! Reloading...",
    "Geçersiz veya bozuk yedek dosyası!": "Invalid or corrupted backup file!",
    "Dosya okunurken bir hata oluştu!": "An error occurred while reading the file!",
    "Lütfen en az bir takım bilgisi girin!": "Please enter at least one team!",
    "İşlem sırasında hata oluştu.": "An error occurred during the operation.",
    "Bu kupayı/turnuvayı tablodan silmek istediğinize emin misiniz?": "Are you sure you want to delete this cup/tournament from the table?",
    "Tüm grubu ve içindeki takımları silmek istediğinize emin misiniz?": "Are you sure you want to delete the whole group and its teams?",
    "Lütfen eklenecek verileri girin!": "Please enter the data to add!",
    "Tablo bulunamadı!": "Table not found!",
    "Lütfen eklenecek takım listesini girin!": "Please enter the team list to add!",
    "Lütfen geçerli bir Maç No girin!": "Please enter a valid Match No!",
    "Bu maç kaydını ve (varsa) içindeki skorları silmek istediğinize emin misiniz?": "Are you sure you want to delete this match record and its scores (if any)?",
    "Toplu olarak eklenen TÜM maçları silmek istediğinize emin misiniz?": "Are you sure you want to delete ALL bulk-added matches?",
    "(Tek tek eklenenler silinmeyecektir.)": "(Individually added ones will not be deleted.)",
    "Eklenecek satır bulunamadı!": "No rows found to add!",
    "Geçerli maç bulunamadı. Lütfen Ev Sahibi ve Deplasman alanlarını kontrol edin.": "No valid match found. Please check the Home and Away fields.",
    "Geçerli maç bulunamadı. Lütfen sıralamanın şu formata uyduğundan emin olun:": "No valid match found. Please make sure the order follows this format:",
    "Lütfen eklenecek maçları girin!": "Please enter the matches to add!",
    "Lütfen oyuncu isimlerini girin!": "Please enter the player names!",
    "Listede eşleşen hiçbir oyuncu bulunamadı. İsimleri kontrol edip tekrar deneyin.": "No matching players found in the list. Check the names and try again.",
    "Şu oyuncular kadroda bulunamadı:": "These players were not found in the squad:",
    "oyuncunun milli takım maç sayısı (caps) 1 artırıldı!": "player(s) had their national team caps increased by 1!",
    "Sahada henüz oyuncu bulunmuyor.": "There are no players on the pitch yet.",
    "İlk 11 listesi panoya kopyalandı!": "Starting 11 list copied to clipboard!",
    "İlk 11 Listesi:": "Starting 11 List:",
    "Bu turnuva kartını tamamen silmek istediğinize emin misiniz?": "Are you sure you want to completely delete this tournament card?",
    "Turnuva adını girin (Örn: Hazırlık Kupası, Copa America):": "Enter the tournament name (e.g. Friendly Cup, Copa America):",
    "Eşleşmeyen lig adları (kontrol edin):": "Unmatched league names (please check):",
    "Geçerli lig adları:": "Valid league names:",
    "takım başarıyla eklendi!": "team(s) added successfully!",
    "Geçerli formatta veri bulunamadı. Lütfen": "No data in a valid format found. Please make sure you follow the",
    "formatına uyduğunuzdan emin olun.": "format.",
    "⚠️ Tarayıcı depolama alanı doldu!": "⚠️ Browser storage is full!",
    "Ayarlar > Verileri Dışa Aktar ile yedek alın, ardından sayfayı yenileyip yedeği tekrar yükleyin.": "Take a backup via Settings > Export Data, then refresh the page and load the backup again.",
    "Google hesabınızla ilişkili bulut verisi bulunamadı.": "No cloud data found for your Google account.",
    "Bu cihazdaki mevcut kariyer verinizi hesabınıza yüklemek ister misiniz?": "Do you want to upload the career data on this device to your account?",
    "Bulut bağlantısı kurulamadı. firebase-config.js dosyasını kontrol edin.": "Could not connect to the cloud. Check the firebase-config.js file.",
    "Bu site adresi Firebase'de yetkilendirilmemiş (Authorized domains).": "This site address is not authorized in Firebase (Authorized domains).",
    "Google giriş hatası:": "Google sign-in error:",
    "Giriş hatası:": "Sign-in error:",
    "Kayıt Slotu": "Save Slot",
    "içindeki tüm veriler kalıcı olarak silinecektir. Emin misiniz?": "- all data inside will be permanently deleted. Are you sure?",
    "\"Lig Adı, Takım Adı, Puan\"": "\"League Name, Team Name, Points\"",
    "\"Sıra, Takım Adı, Pld, W, D, L, GF, GA, GD, Puan\"": "\"Rank, Team Name, Pld, W, D, L, GF, GA, GD, Points\"",
    "Emin misiniz?": "Are you sure?",
    "Yeni turnuva adı (kataloğa eklenecek):": "New tournament name (will be added to the catalog):",
    "Lütfen listeden bir turnuva seçin.": "Please select a tournament from the list.",
    "Bu turnuva tabloda zaten var.": "This tournament is already in the table.",
    "Takım adı zorunludur!": "Team name is required!",
    "Bu rakibi/sütunu tablodan tamamen silmek istediğinize emin misiniz?": "Are you sure you want to completely delete this opponent/column from the table?",
    "Lütfen eklenecek oyuncu listesini girin!": "Please enter the list of players to add!",
    "Bu oyuncu artık kadroda kayıtlı değil.": "This player is no longer registered in the squad.",
    "İsim zorunludur!": "Name is required!",
    "Oyuncuyu silmek istediğinize emin misiniz?": "Are you sure you want to delete this player?",
    "Oyuncunun arşiv durumunu değiştirmek istediğinize emin misiniz?": "Are you sure you want to change the player's archive status?",
    "Oyuncuyu As Takıma yükseltmek istediğinize emin misiniz? (Oyuncu Akademi listesinde 'PROMOTED' bölümüne alınır ve As Takım kadrosuna kopyalanır.)": "Are you sure you want to promote the player to the First Team? (The player moves to the 'PROMOTED' section of the Academy list and is copied to the First Team squad.)",
    "Hiçbir oyuncu için yaş veya OVR girilmedi.": "No age or OVR was entered for any player.",
    "Lütfen takım adını girin!": "Please enter the team name!",
    "Lütfen eklenecek takımları girin!": "Please enter the teams to add!",
    "Geçerli veya listede olmayan yeni takım bulunamadı.": "No valid new team (not already in the list) was found.",
    "Bu takımı lig tarihinden kalıcı olarak silmek istediğinize emin misiniz?": "Are you sure you want to permanently delete this team from the league history?",
    "Hiçbir takım için puan girilmedi.": "No points were entered for any team.",
    "Oyuncu adı zorunludur!": "Player name is required!",
    "Bu transfer kaydını silmek istediğinize emin misiniz?": "Are you sure you want to delete this transfer record?",
    "Mevki zorunludur!": "Position is required!",
    "Bu hedefi silmek istediğinize emin misiniz?": "Are you sure you want to delete this target?",
    "Lütfen bir logo URL girin, dosya yükleyin veya arama sonuçlarından seçin!": "Please enter a logo URL, upload a file, or choose from the search results!",
    "Not: Yerel olarak yüklenen büyük logo görselleri depolama alanını hızla doldurabilir. Mümkünse URL ile logo kullanın.": "Note: Large locally uploaded logo images can fill up storage quickly. Use a logo URL if possible.",
    "Maç No, Müsabaka, Home/Away/Neutral, Ev Sahibi, Deplasman, (Hafta), (Ülke)": "Match No, Competition, Home/Away/Neutral, Home Team, Away Team, (Week), (Country)",
    "\"Pozisyon, İsim, Ülke, Yaş, Reyting\"": "\"Position, Name, Country, Age, Rating\""
};
const TR_EN_DIALOG_REGEX = [
    [/"([^"]+)" sezonunu tüm panellerden kalıcı olarak silmek istediğinize emin misiniz\?/, 'Are you sure you want to permanently delete the "$1" season from all panels?'],
    [/(.+) dizilişi ve oyuncuları sıfırlamak istediğinize emin misiniz\?/, 'Are you sure you want to reset the formation and players ($1)?'],
    [/^(\d+) oyuncu ve mevcut yüz fotoğrafları başarıyla kadroya eklendi!/, '$1 players and their existing face photos were successfully added to the squad!'],
    [/Geçerli formatta oyuncu bulunamadı\. Lütfen ("[^"]+") formatına uyduğunuzdan emin olun\./, 'No valid players found. Please make sure you follow the $1 format.']
];
function i18nDialogText(msg) {
    if (typeof currentLang === 'undefined' || currentLang !== 'en' || typeof msg !== 'string') return msg;
    let out = msg;
    TR_EN_DIALOG_REGEX.forEach(([re, rep]) => { out = out.replace(re, rep); });
    Object.keys(TR_EN_DIALOG).sort((a, b) => b.length - a.length).forEach(k => {
        if (out.indexOf(k) !== -1) out = out.split(k).join(TR_EN_DIALOG[k]);
    });
    if (TR_EN[out.trim()]) out = TR_EN[out.trim()];
    return out;
}
if (typeof window !== 'undefined' && !window.__i18nDialogsWrapped) {
    window.__i18nDialogsWrapped = true;
    const _alert = window.alert.bind(window), _confirm = window.confirm.bind(window), _prompt = window.prompt.bind(window);
    window.alert = (m) => _alert(i18nDialogText(m));
    window.confirm = (m) => _confirm(i18nDialogText(m));
    window.prompt = (m, d) => _prompt(i18nDialogText(m), d);
}

const EN_TR = Object.fromEntries(Object.entries(TR_EN).map(([tr, en]) => [en, tr]));

const THEME_FAMILIES = [
    { id: 'red', label: 'Kırmızı', light: '#dc2626', dark: '#7f1d1d' },
    { id: 'yellow', label: 'Sarı', light: '#facc15', dark: '#854d0e' },
    { id: 'blue', label: 'Mavi', light: '#3b82f6', dark: '#1e3a8a' },
    { id: 'orange', label: 'Turuncu', light: '#fb923c', dark: '#9a3412' },
    { id: 'beige', label: 'Bej - Kahve', light: '#e8dcc0', dark: '#5c2e0d' },
    { id: 'gray', label: 'Gri - Antrasit', light: '#cbd5e1', dark: '#1e293b' },
    { id: 'green', label: 'Yeşil', light: '#34d399', dark: '#065f46' }
];

function renderThemeFamilySwatches() {
    const container = document.getElementById('theme-family-swatches');
    if (!container) return;
    const active = localStorage.getItem('fc26_theme_family') || 'green';
    container.innerHTML = THEME_FAMILIES.map(f => `
        <button type="button" onclick="setThemeFamily('${f.id}')" title="${f.label}"
            class="flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${active === f.id ? 'border-emerald-500 bg-slate-800' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}">
            <span class="w-7 h-7 rounded-full block shadow-inner border border-black/20" style="background: linear-gradient(135deg, ${f.light} 50%, ${f.dark} 50%);"></span>
            <span class="text-[9px] font-bold ${active === f.id ? 'text-emerald-400' : 'text-slate-400'} text-center leading-tight">${f.label}</span>
        </button>
    `).join('');
}

function setThemeFamily(familyId) {
    document.body.setAttribute('data-theme-family', familyId);
    localStorage.setItem('fc26_theme_family', familyId);
    renderThemeFamilySwatches();
}

function applyStoredThemeFamily() {
    document.body.setAttribute('data-theme-family', localStorage.getItem('fc26_theme_family') || 'green');
}

let currentLang = localStorage.getItem('fc26_lang') || 'en';
const I18N_ATTRS = ['placeholder', 'title', 'aria-label'];

function i18nTranslateAttrs(el, dict) {
    I18N_ATTRS.forEach(attr => {
        const val = el.getAttribute && el.getAttribute(attr);
        if (val && dict[val]) { el.setAttribute(attr, dict[val]); return; }
        if (val && val.length <= 200) {
            const toEn = dict === TR_EN;
            for (const p of TR_EN_PATTERNS) {
                const re = toEn ? p.re : p.enRe, tpl = toEn ? p.en : p.tr;
                const mm = re && tpl ? val.match(re) : null;
                if (!mm || p.dictArg) continue;
                el.setAttribute(attr, tpl.replace('$1', dict[mm[1]] || mm[1]));
                return;
            }
        }
    });
}

// root: bir DOM elemanı veya metin düğümü. Verilen sözlükle eşleşen tüm metinleri değiştirir.
function i18nTranslateTreeBase(root, dict) {
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
    document.title = 'GloryTrack';
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
        let currentScale = window.innerWidth < 768 ? '0.75' : '1';

        const menuConfig = {
            anasayfa: { title: "Ana Sayfa", submenus: [] },
            kupalar: { title: "Kupalar", submenus: [] },
            maclar: { title: "Maçlar", submenus: [] },
            kadro: { title: "Kadro", submenus: [] },
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
        let fileUploads = { champ: null, runner: null, tournament: null, managed: null, opp: null, setup: null, 'pi-photo': null, 'pi-team': null, cl: null };

        // Trophies State
        let trophyData = {}; 
        let currentModalSeason = null;
        let currentModalTournament = null;
        let editingTournamentId = null;
        let tournamentsList = [
            { id: 'ucl', name: 'UEFA Champions League', logoUrl: 'https://assets.football-logos.cc/logos/tournaments/700x700/uefa-champions-league.c16cec3d.png', colorHex: '#1e3a8a' },
            { id: 'uel', name: 'UEFA Europa League', logoUrl: 'https://assets.football-logos.cc/logos/tournaments/700x700/uefa-europa-league.cec59481.png', colorHex: '#ea580c' },
            { id: 'uecl', name: 'UEFA Europa Conference League', logoUrl: 'https://assets.football-logos.cc/logos/tournaments/700x700/uefa-conference-league.4a977457.png', colorHex: '#16a34a' },
            { id: 'usc', name: 'UEFA Super Cup', logoUrl: 'https://assets.football-logos.cc/logos/tournaments/700x700/uefa-super-cup.73cc7e25.png', colorHex: '#475569' },
            { id: 'slig', name: 'Süper Lig', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/e/e0/Trendyol_S%C3%BCper_Lig_logo.svg', colorHex: '#b91c1c' },
            { id: 'tkupa', name: 'Türkiye Kupası', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/8/86/Ziraat_T%C3%BCrkiye_Kupas%C4%B1_logo.png', colorHex: '#7f1d1d' },
            { id: 'tsup', name: 'Türkiye Süper Kupası', logoUrl: 'https://upload.wikimedia.org/wikipedia/tr/2/28/TFF_S%C3%BCper_Kupa_logo.png', colorHex: '#475569' },
            { id: 'pl', name: 'Premier League', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg', colorHex: '#3730a3' },
            { id: 'laliga', name: 'La Liga', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg', colorHex: '#ef4444' },
            { id: 'bl', name: 'Bundesliga', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg', colorHex: '#dc2626' },
            { id: 'l1', name: 'Ligue 1', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ligue_1_2024_logo.svg', colorHex: '#0f172a' },
            { id: 'ligapt', name: 'Liga Portugal', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Liga_Portugal_logo.png', colorHex: '#14b8a6' },
            { id: 'eredivisie', name: 'Eredivisie', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eredivisie_nieuw_logo_2017-.svg', colorHex: '#1e3a8a' },
            { id: 'belgian', name: 'Belgian 1A Pro League', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Jupiler_Pro_League_Logo.svg', colorHex: '#000000' },
            { id: 'scottish', name: 'Scottish Premiership', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/05/Scottish_Premiership_logo.svg', colorHex: '#1e3a8a' },
            { id: 'norwegian', name: 'Norwegian Eliteserien', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Eliteserien_logo.svg', colorHex: '#1e3a8a' }
        ];

        // Matches State
        let matchContext = null; 
        let managedTeams = {
            kulup: { name: '', logoUrl: '', country: '' },
            milli: { name: '', logoUrl: '', country: '' }
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

        const tournamentOptions = ["Süper Lig", "Türkiye Kupası", "Türkiye Süper Kupası", "UEFA Şampiyonlar Ligi", "Avrupa Ligi", "Konferans Ligi", "UEFA Süper Kupa", "Pre-Season Friendly"];
        let matchDataStore = { kulup: {}, milli: {} };
        let activeOppInfo = { context: null, groupType: null, groupIndex: null, index: null, id: null };
        let activeGroupInfo = { context: null, groupType: null, groupIndex: null };
        let activeMatchInfo = { season: null, oppId: null, oppName: null };
        let activeMatchesTemp = [];
        let matchEditMode = false, matchViewIdx = 0, matchEditSnapshot = '', matchModalFresh = false;
        let formations = { astakim: { ilk11: null, yedek: null, rezerv: null }, milli: { ilk11: null, yedek: null, rezerv: null } };
        let activeFormationType = 'ilk11';
        let tempFormationsAll = { ilk11: null, yedek: null, rezerv: null };
        const KADRO_TYPE_LABELS = { ilk11: 'İlk 11', yedek: 'Yedek', rezerv: 'Rezerv' };

        // Squad State
        let squadContext = 'astakim';
        let playerRoles = {
            astakim: ['Crucial', 'Important', 'Rotation', 'Sporadic', 'Prospect'],
            akademi: ['A Takım Adayı', 'Kiralık Gelişecek', 'Gelecek Vadeden', 'Yetersiz'],
            milli: ['Kadroda', 'Yedek', 'Genç Milli', 'İzlemede']
        };
        let squadData = { astakim: [], akademi: [], milli: [] };
        let squadSort = { field: 'joinOvr', asc: false };
        let squadColumnsCollapsed = window.innerWidth < 768; // Mobilde default kapalı başlasın

        let squadFlatSort = false;
        try { squadFlatSort = localStorage.getItem('squadFlatSort') === '1'; } catch (e) {}
        function toggleSquadFlatSort() {
            squadFlatSort = !squadFlatSort;
            try { localStorage.setItem('squadFlatSort', squadFlatSort ? '1' : '0'); } catch (e) {}
            renderSquadGrid();
        }

        function toggleSquadColumnsCollapse() {
            squadColumnsCollapsed = !squadColumnsCollapsed;
            renderSquadGrid();
        }
        
        let activePlayerId = null;
        let activePlayerSeason = null;
        let activeCellType = '';
        let activeBulkStatSeason = null;
        let activeBulkStatCellKey = null;

        // League History State
        let leagueHistoryData = [];
        let leagueChartInstance = null;
        let activeLeagueTeamId = null;
        let activeLeagueSeason = null;
        let leagueSort = { field: 'total', asc: false };
        let highlightedLeagueTeamId = null;
        let currentSortedLeagueTeams = [];
        let activeBulkLeagueSeason = null;

        // Gol ve Asist State
        let statExpanded = { kulup: {}, milli: {} };

        // Transfer Panel State
        let transferData = { in: [], out: [], shortlist: [] };
        let transferSort = { in: { field: 'season', asc: false }, out: { field: 'season', asc: false } };
        let activeTransferId = null;
        let activeTransferType = 'in';
        let transferActiveTab = 'shortlist'; // Mobil için aktif tab

        function switchTransferTab(tabId) {
            transferActiveTab = tabId;
            ['shortlist', 'in', 'out'].forEach(id => {
                const btn = document.getElementById('trtab-' + id);
                const content = document.getElementById('trcontent-' + id);
                if (!btn || !content) return;
                
                if (id === tabId) {
                    btn.className = 'flex-1 px-4 py-3 text-lg bg-slate-900 text-emerald-400 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center';
                    content.classList.remove('hidden');
                    content.classList.add('flex');
                } else {
                    btn.className = 'flex-1 px-4 py-3 text-lg bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer';
                    content.classList.add('hidden');
                    content.classList.remove('flex');
                }
            });
        }

        // Fixture Panel State
        // fixtureData[season] = [ { id, date, tournament, home, away, homeScore, awayScore, events:[{min,type,scorer,assist}] }, ... ]
        let fixtureData = {};
        let euroLeaguesData = {};
        let euroSlotsData = {};
        let competitionLogos = {};
        let customTournamentsData = {};

        // ===================== TURNUVA KATALOĞU (tek kaynak: ad, kısa ad, renk, logo) =====================
        // g: grup | n: standart ad | s: kısa ad | c: sabit renk | f: logo veritabanındaki ad | a: eski/alternatif yazımlar
        const TOURNAMENT_CATALOG = [
            { g:'Ulusal Ligler', n:'Süper Lig', s:'SL', c:'#b91c1c', a:['Trendyol Süper Lig'] },
            { g:'Ulusal Ligler', n:'Premier League', s:'PL', c:'#3730a3', a:['English Premier League'] },
            { g:'Ulusal Ligler', n:'La Liga', s:'LL', c:'#ef4444', f:'LALIGA EA Sports', a:['LaLiga','LALIGA'] },
            { g:'Ulusal Ligler', n:'Bundesliga', s:'BL', c:'#dc2626' },
            { g:'Ulusal Ligler', n:'Serie A', s:'SA', c:'#1d4ed8' },
            { g:'Ulusal Ligler', n:'Ligue 1', s:'L1', c:'#0f172a' },
            { g:'Ulusal Ligler', n:'Liga Portugal', s:'LP', c:'#14b8a6' },
            { g:'Ulusal Ligler', n:'Eredivisie', s:'ERE', c:'#1e3a8a' },
            { g:'Ulusal Ligler', n:'Belgian 1A Pro League', s:'JPL', c:'#000000', f:'Jupiler Pro League', a:['Jupiler Pro League','Belgian Pro League'] },
            { g:'Ulusal Ligler', n:'Scottish Premiership', s:'SPL', c:'#1e3a8a', f:'Premiership' },
            { g:'Ulusal Ligler', n:'Norwegian Eliteserien', s:'ELI', c:'#1e3a8a', f:'Eliteserien', a:['Eliteserien'] },
            { g:'Ulusal Ligler', n:'EFL Championship', s:'EFC', c:'#b45309' },
            { g:'Ulusal Ligler', n:'MLS', s:'MLS', c:'#0f766e' },
            { g:'Ulusal Ligler', n:'Liga MX', s:'LMX', c:'#15803d' },
            { g:'Ulusal Ligler', n:'EFL League One', s:'EL1', c:'#0369a1', f:'EFL League One' },
            { g:'Ulusal Ligler', n:'EFL League Two', s:'EL2', c:'#a16207', f:'EFL League Two' },
            { g:'Ulusal Ligler', n:'Ligue 2', s:'L2', c:'#1e40af' },
            { g:'Ulusal Ligler', n:'Serie B', s:'SB', c:'#0e7490', f:'Serie BKT', a:['Serie BKT'] },
            { g:'Ulusal Ligler', n:'La Liga 2', s:'LL2', c:'#b91c1c', f:'LALIGA Hypermotion', a:['LaLiga 2','LALIGA Hypermotion','Segunda División'] },
            { g:'Ulusal Ligler', n:'2. Bundesliga', s:'B2', c:'#b91c1c', a:['Bundesliga 2'] },
            { g:'Ulusal Ligler', n:'Allsvenskan', s:'ALL', c:'#1d4ed8' },
            { g:'Ulusal Ligler', n:'Ekstraklasa', s:'EKS', c:'#b91c1c' },
            { g:'Ulusal Ligler', n:'Danish Superliga', s:'DSL', c:'#b91c1c', f:'Danish Super League', a:['Danish Super League','Superliga'] },
            { g:'Ulusal Ligler', n:'A-League', s:'AL', c:'#15803d' },
            { g:'Ulusal Ligler', n:'Liga Profesional', s:'LPA', c:'#0ea5e9' },
            { g:'Ulusal Kupalar', n:'Türkiye Kupası', s:'TK', c:'#7f1d1d' },
            { g:'Ulusal Kupalar', n:'Türkiye Süper Kupası', s:'TSK', c:'#475569' },
            { g:'Ulusal Kupalar', n:'FA Cup', s:'FAC', c:'#991b1b' },
            { g:'Ulusal Kupalar', n:'EFL Cup', s:'EFL', c:'#115e59', a:['EFL Carabao Cup','Carabao Cup','League Cup'] },
            { g:'Ulusal Kupalar', n:'Community Shield', s:'CS', c:'#854d0e' },
            { g:'Ulusal Kupalar', n:'Copa del Rey', s:'CDR', c:'#b45309' },
            { g:'Ulusal Kupalar', n:'DFB-Pokal', s:'DFB', c:'#7f1d1d', a:['DFB Pokal'] },
            { g:'Ulusal Kupalar', n:'Coppa Italia', s:'CI', c:'#1e40af' },
            { g:'Ulusal Kupalar', n:'Coupe de France', s:'CDF', c:'#1d4ed8' },
            { g:'Ulusal Kupalar', n:'Taça de Portugal', s:'TDP', c:'#166534' },
            { g:'Ulusal Kupalar', n:'KNVB Cup', s:'KNV', c:'#c2410c' },
            { g:'Ulusal Kupalar', n:'Vertu Trophy', s:'VT', c:'#0f766e', a:['EFL Trophy','Papa Johns Trophy','Bristol Street Motors Trophy'] },
            { g:'Ulusal Kupalar', n:'DFL-Supercup', s:'DSC', c:'#475569', a:['DFL Supercup'] },
            { g:'Ulusal Kupalar', n:'Supercopa de España', s:'SCE', c:'#b45309', a:['Supercopa de Espana'] },
            { g:'Ulusal Kupalar', n:'Supercoppa Italiana', s:'SCI', c:'#1e40af' },
            { g:'Ulusal Kupalar', n:'Trophée des Champions', s:'TDC', c:'#1d4ed8', a:['Trophee des Champions'] },
            { g:'Avrupa / Kıtalararası', n:'UEFA Şampiyonlar Ligi', s:'UCL', c:'#1e3a8a', f:'UEFA Champions League', a:['UEFA Champions League','Şampiyonlar Ligi','Champions League'] },
            { g:'Avrupa / Kıtalararası', n:'UEFA Avrupa Ligi', s:'UEL', c:'#ea580c', f:'UEFA Europa League', a:['UEFA Europa League','Avrupa Ligi','Europa League'] },
            { g:'Avrupa / Kıtalararası', n:'UEFA Konferans Ligi', s:'UECL', c:'#16a34a', f:'UEFA Europa Conference League', a:['UEFA Europa Conference League','Konferans Ligi','UEFA Conference League','Conference League'] },
            { g:'Avrupa / Kıtalararası', n:'UEFA Süper Kupa', s:'USC', c:'#475569', f:'UEFA Super Cup', a:['UEFA Super Cup'] },
            { g:'Avrupa / Kıtalararası', n:'FIFA Kulüpler Dünya Kupası', s:'CWC', c:'#854d0e', a:['FIFA Club World Cup','Kulüpler Dünya Kupası'] },
            { g:'Avrupa / Kıtalararası', n:'CAF Champions League', s:'CAF', c:'#15803d' },
            { g:'Avrupa / Kıtalararası', n:'AFC Champions League', s:'AFC', c:'#0e7490' },
            { g:'Avrupa / Kıtalararası', n:'CONCACAF Champions Cup', s:'CCC', c:'#1d4ed8' },
            { g:'Milli Takım', n:'Dünya Kupası', s:'DK', c:'#7c2d12', f:'FIFA World Cup', a:['FIFA World Cup','World Cup'] },
            { g:'Milli Takım', n:'UEFA Avrupa Şampiyonası', s:'AŞ', c:'#1d4ed8', f:'UEFA European Championship', a:['Avrupa Şampiyonası','UEFA European Championship','Euro','EURO'] },
            { g:'Milli Takım', n:'UEFA Uluslar Ligi', s:'UNL', c:'#0369a1', a:['UEFA Nations League','Nations League','Uluslar Ligi'] },
            { g:'Milli Takım', n:'Copa America', s:'CA', c:'#15803d', a:['Copa América'] },
            { g:'Milli Takım', n:'Afrika Uluslar Kupası', s:'AFCON', c:'#a16207', a:['Africa Cup of Nations','AFCON'] },
            { g:'Milli Takım', n:'Dünya Kupası Elemeleri', s:'DKE', c:'#9a3412', a:['World Cup Qualifiers','WC Qualifiers'] },
            { g:'Milli Takım', n:'Avrupa Şampiyonası Elemeleri', s:'AŞE', c:'#1e40af', a:['Euro Qualifiers','EURO Qualifiers'] },
            { g:'Milli Takım', n:'Dostluk Maçı', s:'DM', c:'#475569', a:['Friendly','International Friendly','Hazırlık Maçı'] },
            { g:'Diğer', n:'Pre-Season Friendly', s:'PF', c:'#475569', a:['Sezon Öncesi Hazırlık','Preseason Friendly','Pre Season Friendly'] }
        ];
        let customCatalog = [];   // '+ Yeni / Özel Turnuva' ile eklenenler (kayıt dosyasına yazılır)
        let _tourIdx = null, _tourIdxKey = -1;

        function tourNorm(s) { return String(s == null ? '' : s).toLocaleLowerCase('tr').replace(/[^a-z0-9çğıöşüâî]+/g, ''); }
        function tourAll() { return TOURNAMENT_CATALOG.concat(customCatalog); }
        function tourIndex() {
            if (_tourIdx && _tourIdxKey === customCatalog.length) return _tourIdx;
            const m = new Map();
            tourAll().forEach(e => [e.n].concat(e.a || []).forEach(x => { const k = tourNorm(x); if (k && !m.has(k)) m.set(k, e); }));
            _tourIdx = m; _tourIdxKey = customCatalog.length;
            return m;
        }
        function tourFind(name) { return name ? (tourIndex().get(tourNorm(name)) || null) : null; }
        function tourCanon(name) { const e = tourFind(name); return e ? e.n : (name || ''); }
        function tourCatalogLogo(name) {
            const e = tourFind(name);
            if (!e || typeof FC26_TOURNAMENT_DATABASE === 'undefined') return null;
            const keys = [e.f, e.n].concat(e.a || []).filter(Boolean).map(tourNorm);
            const hit = FC26_TOURNAMENT_DATABASE.find(t => t && typeof t === 'object' && t.name && keys.includes(tourNorm(t.name.replace(/:\s*$/, ''))));
            return hit ? hit.logo : null;
        }
        // <option> listesi. scope: 'club' | 'milli' | 'all'. opts.newValue: '+ Yeni' seçeneğinin value'su (null = gösterme)
        function tourSelectOptions(selected, scope, opts) {
            scope = scope || 'all'; opts = opts || {};
            const cur = tourFind(selected);
            const curName = cur ? cur.n : (selected || '');
            const groups = {};
            tourAll().forEach(e => {
                const ok = scope === 'all' || (scope === 'milli' ? e.g === 'Milli Takım' : e.g !== 'Milli Takım') || e.n === curName;
                if (ok) (groups[e.g] = groups[e.g] || []).push(e);
            });
            let html = '';
            Object.keys(groups).forEach(g => {
                html += `<optgroup label="${escapeHtml(g)}">` + groups[g].map(e => `<option value="${escapeHtml(e.n)}"${e.n === curName ? ' selected' : ''}>${escapeHtml(e.n)}</option>`).join('') + `</optgroup>`;
            });
            if (selected && !cur) html += `<optgroup label="Eşlenmemiş"><option value="${escapeHtml(selected)}" selected>⚠ ${escapeHtml(selected)}</option></optgroup>`;
            const nv = opts.newValue === undefined ? '__NEW__' : opts.newValue;
            if (nv) html += `<option value="${nv}">+ Yeni / Özel Turnuva</option>`;
            return html;
        }
        function tourSetSelect(id, value, scope) {
            const el = document.getElementById(id);
            if (!el) return;
            el.innerHTML = '<option value="">Turnuva Seç</option>' + tourSelectOptions(value, scope);
            el.value = value ? tourCanon(value) : '';
            el.dataset.prev = el.value;
        }
        function tourNewCustom() {
            const raw = prompt('Yeni turnuva adı (kataloğa eklenecek):');
            if (!raw || !raw.trim()) return null;
            return tourRegister(raw.trim());
        }
        // Adı katalogda arar; yoksa renk/kısa adı otomatik üretip özel kataloğa ekler. Standart adı döndürür.
        function tourRegister(name) {
            const ex = tourFind(name);
            if (ex) return ex.n;
            const pal = ['#0e7490', '#7c3aed', '#be185d', '#b45309', '#047857', '#4338ca', '#a21caf', '#0369a1'];
            let hs = 0; for (const ch of name) hs = (hs * 31 + ch.charCodeAt(0)) >>> 0;
            customCatalog.push({ g: 'Özel', n: name, s: (name.split(/\s+/).map(w => w.charAt(0)).join('').toUpperCase().slice(0, 4) || name.slice(0, 3).toUpperCase()), c: pal[hs % pal.length], custom: true });
            saveToLocalStorage();
            return name;
        }
        // Dropdown değişince '+ Yeni' seçildiyse yeni turnuvayı oluşturup seçer
        function tourSelChange(sel, scope) {
            if (sel.value === '__NEW__') {
                const n = tourNewCustom();
                const hasPh = !!sel.querySelector('option[value=""]');
                const phText = hasPh ? sel.querySelector('option[value=""]').textContent : '';
                if (n) {
                    sel.innerHTML = (hasPh ? `<option value="">${escapeHtml(phText)}</option>` : '') + tourSelectOptions(n, scope);
                    sel.value = n;
                } else {
                    sel.value = sel.dataset.prev || '';
                }
            }
            sel.dataset.prev = sel.value;
        }
        // Kupalar paneli turnuva penceresi: seçimde logo + sabit renk otomatik gelir
        function tourModalChange(sel) {
            tourSelChange(sel, 'all');
            const e = tourFind(sel.value);
            if (!e) return;
            const logo = tourCatalogLogo(e.n);
            const urlEl = document.getElementById('tour-url-input');
            if (logo && urlEl) {
                urlEl.value = logo;
                fileUploads.tournament = null;
                const b = document.getElementById('tour-upload-btn');
                if (b) b.classList.replace('text-emerald-400', 'text-slate-300');
            }
            const cEl = document.getElementById('tour-color-input');
            if (cEl) cEl.value = e.c;
        }
        // Kayıtlı tüm verilerdeki turnuva adlarını standart ada çevirir; eşleşmeyenleri bildirir
        function tourMigrateAll() {
            const unmatched = new Set();
            const fix = (name) => { if (!name) return name; const e = tourFind(name); if (e) return e.n; unmatched.add(name); return name; };
            const walk = (o, d) => {
                if (!o || typeof o !== 'object' || d > 8) return;
                if (Array.isArray(o)) { o.forEach(x => walk(x, d + 1)); return; }
                for (const k in o) { if (k === 'tournament' && typeof o[k] === 'string') o[k] = fix(o[k]); else walk(o[k], d + 1); }
            };
            walk(matchDataStore, 0); walk(fixtureData, 0);
            Object.values(customTournamentsData || {}).forEach(arr => (arr || []).forEach(t => { if (t && t.type) t.type = fix(t.type); }));
            tournamentsList.forEach(t => {
                const e = tourFind(t.name);
                if (e) { t.name = e.n; t.colorHex = e.c; } else if (t.name && t.name !== 'Yeni Kupa') unmatched.add(t.name);
            });
            Object.keys(competitionLogos || {}).forEach(k => {
                const e = tourFind(k);
                if (e && e.n !== k) { if (!competitionLogos[e.n]) competitionLogos[e.n] = competitionLogos[k]; delete competitionLogos[k]; }
            });
            window.__tourUnmatched = [...unmatched];
            if (unmatched.size) setTimeout(tourNotifyUnmatched, 900);
        }
        // Kart zemini: katalog rengi (varsa sınıf tabanlı renklerin üstüne yazar)
        function tourCardStyle(name) {
            const e = tourFind(name);
            return e ? `style="background-color:${e.c}26;border-color:${e.c}66"` : '';
        }
        // ===================== LOGOLU TURNUVA SEÇİCİ (tüm turnuva dropdown'ları için) =====================
        // Native <select> içine görsel konamadığı için, turnuva select'ine dokunulunca logolu/aramalı bir açılır liste gösterilir.
        // Değer yine select'te tutulur ve 'change' olayı tetiklenir; mevcut onchange kodları aynen çalışır.
        const TOUR_SEL_QUERY = '.tour-sel,#custom-tour-select,#tour-name-input,#fm-tournament,.fb-tournament,[id^="m_tour_"]';
        let _tpEl = null, _tpSel = null, _tpHl = -1;
        function tourIsSel(el) { return !!(el && el.tagName === 'SELECT' && el.matches(TOUR_SEL_QUERY) && !el.disabled); }
        function tourLogoOf(name) { if (!name) return ''; try { return getCompetitionLogo(name) || ''; } catch (e) { return ''; } }
        function tourLogoTile(name, size) {
            const u = tourLogoOf(name), e = tourFind(name), pad = Math.round(size * 0.14);
            const ab = `<b style="font-size:${Math.max(7, Math.round(size * 0.34))}px;color:#334155${u ? ';display:none' : ''}">${escapeHtml(e ? e.s : '')}</b>`;
            const inner = (u ? `<img src="${escapeHtml(u)}" alt="" style="max-width:100%;max-height:100%;object-fit:contain" onerror="this.style.display='none';this.nextSibling.style.display='inline'">` : '') + ab;
            return `<span style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.28)}px;background:#e2e8f0;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;padding:${pad}px">${inner}</span>`;
        }
        // Kapalıyken select'in sol tarafında seçili turnuvanın logosu görünsün
        function tourSyncSelect(sel) {
            if (!tourIsSel(sel) && !(sel && sel.matches && sel.matches(TOUR_SEL_QUERY))) return;
            const u = tourLogoOf(sel.value);
            const st = sel.style;
            const clear = () => { sel.classList.remove('has-logo'); st.backgroundImage = st.backgroundRepeat = st.backgroundSize = st.backgroundOrigin = st.backgroundPosition = st.paddingLeft = ''; };
            if (!u) { clear(); return; }
            // Logoyu 16x16 kutuya orantılı sığdır (geniş logolar bozulmasın, döşenmesin)
            const im = new Image();
            im.onload = () => {
                if (sel.dataset.tlogo !== u) return;
                const nw = im.naturalWidth || 16, nh = im.naturalHeight || 16, k = Math.min(16 / nw, 16 / nh);
                const w = Math.max(1, Math.round(nw * k)), h = Math.max(1, Math.round(nh * k));
                sel.classList.add('has-logo');
                st.backgroundImage = `url("${u.replace(/"/g, '%22')}"), linear-gradient(#e2e8f0,#e2e8f0)`;
                st.backgroundRepeat = 'no-repeat';
                st.backgroundSize = `${w}px ${h}px, 22px 22px`;
                st.backgroundPosition = `${9 + (16 - w) / 2}px center, 6px center`;
                st.paddingLeft = '36px';
            };
            im.onerror = () => { if (sel.dataset.tlogo === u) clear(); };
            sel.dataset.tlogo = u;
            im.src = u;
        }
        function tourClosePicker() {
            if (_tpEl) { _tpEl.remove(); _tpEl = null; }
            if (_tpSel) delete _tpSel.dataset.autoAdd;
            _tpSel = null; _tpHl = -1;
        }
        function tourPick(idx) {
            const sel = _tpSel;
            const auto = sel && sel.dataset.autoAdd;
            tourClosePicker();
            if (!sel || !sel.options[idx]) return;
            sel.selectedIndex = idx;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            tourSyncSelect(sel);
            if (auto && sel.value) addCustomTournament();
        }
        function tourOpenPicker(sel, anchor) {
            if (_tpEl && _tpSel === sel) { tourClosePicker(); return; }
            tourClosePicker();
            _tpSel = sel;
            const items = [];
            Array.from(sel.children).forEach(ch => {
                if (ch.tagName === 'OPTGROUP') {
                    items.push({ g: ch.label });
                    Array.from(ch.children).forEach(o => items.push({ i: o.index, v: o.value, t: o.textContent }));
                } else if (ch.tagName === 'OPTION') {
                    items.push({ i: ch.index, v: ch.value, t: ch.textContent });
                }
            });
            const pop = document.createElement('div');
            pop.id = 'tour-pop';
            pop.innerHTML = `<div class="tp-search"><input type="text" placeholder="Ara" autocomplete="off"></div><div class="tp-list"></div>`;
            document.body.appendChild(pop);
            _tpEl = pop;
            const list = pop.querySelector('.tp-list'), inp = pop.querySelector('input');
            const render = (q) => {
                const nq = tourNorm(q || '');
                let html = '', pendingG = null, shown = 0;
                items.forEach(it => {
                    if (it.g !== undefined) { pendingG = it.g; return; }
                    const isAct = it.v === '__NEW__' || it.v === 'CUSTOM', isPh = it.v === '';
                    if (nq) {
                        if (isPh) return;
                        const e = tourFind(it.v);
                        const hay = tourNorm(it.t) + '|' + (e ? [e.s].concat(e.a || []).map(tourNorm).join('|') : '');
                        if (!isAct && !hay.includes(nq)) return;
                    }
                    if (pendingG !== null) { html += `<div class="tp-g">${escapeHtml(pendingG)}</div>`; pendingG = null; }
                    const sel_ = it.v === sel.value && !isAct;
                    if (isPh) html += `<div class="tp-row tp-ph" data-i="${it.i}">${escapeHtml(it.t)}</div>`;
                    else if (isAct) html += `<div class="tp-row tp-act" data-i="${it.i}"><i class="fa-solid fa-plus"></i>${escapeHtml(it.t.replace(/^\+\s*/, ''))}</div>`;
                    else { const e = tourFind(it.v); html += `<div class="tp-row${sel_ ? ' sel' : ''}" data-i="${it.i}">${tourLogoTile(it.v, 26)}<span class="tp-nm">${escapeHtml(it.t)}</span><span class="tp-ab">${escapeHtml(e ? e.s : '')}</span></div>`; }
                    shown++;
                });
                list.innerHTML = html || `<div class="tp-g">—</div>`;
                _tpHl = -1;
                const selRow = list.querySelector('.tp-row.sel'); if (selRow && !nq) selRow.scrollIntoView({ block: 'center' });
            };
            render('');
            const rows = () => Array.from(list.querySelectorAll('.tp-row'));
            const hl = (n) => { const r = rows(); if (!r.length) return; _tpHl = (n + r.length) % r.length; r.forEach((x, k) => x.classList.toggle('hl', k === _tpHl)); r[_tpHl].scrollIntoView({ block: 'nearest' }); };
            inp.addEventListener('input', () => render(inp.value));
            inp.addEventListener('keydown', ev => {
                if (ev.key === 'ArrowDown') { ev.preventDefault(); hl(_tpHl + 1); }
                else if (ev.key === 'ArrowUp') { ev.preventDefault(); hl(_tpHl - 1); }
                else if (ev.key === 'Enter') { ev.preventDefault(); const r = rows(); const t = r[_tpHl >= 0 ? _tpHl : 0]; if (t) tourPick(parseInt(t.dataset.i)); }
                else if (ev.key === 'Escape') { ev.preventDefault(); tourClosePicker(); }
            });
            list.addEventListener('click', ev => { const row = ev.target.closest('.tp-row'); if (row) tourPick(parseInt(row.dataset.i)); });
            // Konum
            const r = (anchor || sel).getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
            const w = Math.min(Math.max(anchor ? 300 : r.width, 280), vw - 16);
            pop.style.width = w + 'px';
            pop.style.left = Math.min(Math.max(8, anchor ? r.right - w : r.left), vw - w - 8) + 'px';
            const below = vh - r.bottom - 8, above = r.top - 8;
            if (below >= 260 || below >= above) { pop.style.top = (r.bottom + 4) + 'px'; pop.style.maxHeight = Math.min(400, below) + 'px'; }
            else { pop.style.bottom = (vh - r.top + 4) + 'px'; pop.style.maxHeight = Math.min(400, above) + 'px'; }
            if (window.innerWidth > 640) inp.focus();
        }
        function tourPickerInit() {
            if (window.__tourPickerReady) return;
            window.__tourPickerReady = true;
            const down = (e) => {
                const t = e.target;
                if (_tpEl && _tpEl.contains(t)) return;
                if (t && t.closest && t.closest('[data-tour-add]')) return;
                const s = t && t.closest ? t.closest('select') : null;
                if (tourIsSel(s)) { e.preventDefault(); tourOpenPicker(s); }
                else tourClosePicker();
            };
            document.addEventListener('mousedown', down, true);
            document.addEventListener('touchstart', down, { capture: true, passive: false });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && _tpEl) { tourClosePicker(); return; }
                const s = e.target;
                if (tourIsSel(s) && [' ', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); tourOpenPicker(s); }
            }, true);
            document.addEventListener('change', e => { if (tourIsSel(e.target)) tourSyncSelect(e.target); }, true);
            window.addEventListener('resize', tourClosePicker);
            window.addEventListener('scroll', e => { if (_tpEl && !_tpEl.contains(e.target)) tourClosePicker(); }, true);
            const scan = (root) => { if (!root || root.nodeType !== 1) return; if (root.matches && root.matches(TOUR_SEL_QUERY)) tourSyncSelect(root); root.querySelectorAll && root.querySelectorAll(TOUR_SEL_QUERY).forEach(tourSyncSelect); };
            new MutationObserver(ms => ms.forEach(m => {
                if (m.target && m.target.nodeType === 1 && m.target.tagName === 'SELECT') tourSyncSelect(m.target);
                m.addedNodes.forEach(scan);
            })).observe(document.body, { childList: true, subtree: true });
            scan(document.body);
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tourPickerInit); else tourPickerInit();

        function tourNotifyUnmatched() {
            const list = window.__tourUnmatched || [];
            try { if (!list.length || sessionStorage.getItem('tourNoticeShown') === list.join('|')) return; sessionStorage.setItem('tourNoticeShown', list.join('|')); } catch (e) {}
            if (document.getElementById('tour-unmatched-note')) return;
            const d = document.createElement('div');
            d.id = 'tour-unmatched-note';
            d.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:76px;z-index:300;max-width:92vw;width:420px;background:#1e293b;border:1px solid #f59e0b;border-radius:12px;padding:12px 14px;color:#e2e8f0;font-size:12px;box-shadow:0 10px 30px rgba(0,0,0,.5)';
            d.innerHTML = `<div style="font-weight:800;color:#fbbf24;margin-bottom:4px">⚠ Katalogda karşılığı olmayan turnuvalar</div><div style="color:#cbd5e1;margin-bottom:8px">${list.map(escapeHtml).join(', ')}</div><div style="color:#94a3b8;margin-bottom:8px">Bu kayıtlar listelerde ⚠ ile görünür. İlgili alanda doğru turnuvayı seçerek veya "+ Yeni / Özel Turnuva" ile ekleyerek düzeltebilirsin.</div><button onclick="this.parentNode.remove()" style="background:#f59e0b;color:#111827;font-weight:800;padding:4px 12px;border-radius:8px">Tamam</button>`;
            document.body.appendChild(d);
        }
        let activeFixtureSeason = null;
        let activeFixtureMatchId = null;
        let fixtureFilter = { tournament: '' };
        let expandedFixtureMatchIds = new Set(); // Inline açılan (expand edilen) maç satırlarının ID'lerini tutar

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
                euroLeaguesData, euroSlotsData, customTournamentsData, competitionLogos, formations, customCatalog
            };
        }

        let activeSlot = localStorage.getItem('fc26_active_slot') || '1';

        function saveToLocalStorage() {
            try {
                const dataStr = JSON.stringify(getAllData());
                // Warn if approaching the 5MB limit (warn at 4MB)
                if (dataStr.length > 4 * 1024 * 1024) {
                    console.warn('FC26: LocalStorage verisi 4MB sınırına yaklaşıyor. Yedek almanız önerilir.');
                }
                localStorage.setItem('fc26_career_data_' + activeSlot, dataStr);
                if (activeSlot === '1') {
                    localStorage.setItem('fc26_career_data', dataStr); // Sadece Slot 1 için geriye dönük uyumluluk anahtarını tut
                }
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
            if (data.transferData) {
                transferData = data.transferData;
                if (!transferData.shortlist) transferData.shortlist = [];
            }
            if (data.fixtureData) fixtureData = data.fixtureData;
            if (data.euroLeaguesData) euroLeaguesData = data.euroLeaguesData;
            if (data.customTournamentsData) customTournamentsData = data.customTournamentsData;
            if (data.isSetupComplete !== undefined) isSetupComplete = data.isSetupComplete;
            if (data.competitionLogos) competitionLogos = data.competitionLogos;
            if (Array.isArray(data.customCatalog)) customCatalog = data.customCatalog;
            if (data.formations) {
                formations = data.formations;
                ['astakim', 'milli'].forEach(ctx => {
                    if (Array.isArray(formations[ctx])) {
                        // Eski format: doğrudan İlk 11 dizisiydi -> yeni yapıya taşı
                        formations[ctx] = { ilk11: formations[ctx], yedek: null, rezerv: null };
                    } else if (!formations[ctx] || typeof formations[ctx] !== 'object') {
                        formations[ctx] = { ilk11: null, yedek: null, rezerv: null };
                    } else {
                        if (formations[ctx].ilk11 === undefined) formations[ctx].ilk11 = null;
                        if (formations[ctx].yedek === undefined) formations[ctx].yedek = null;
                        if (formations[ctx].rezerv === undefined) formations[ctx].rezerv = null;
                    }
                });
            }

            // Geriye dönük uyumluluk: eski yedeklerde "milli" kadrosu bulunmayabilir
            tourMigrateAll();
            if (!squadData.milli) squadData.milli = [];
            if (!playerRoles.milli) playerRoles.milli = ['Kadroda', 'Yedek', 'Genç Milli', 'İzlemede'];

            // As Takım rol listesi güncellemesi (bir kez uygulanır): Crucial / Important / Rotation / Sporadic / Prospect
            if (!(playerRoles.astakim || []).includes('Crucial')) {
                playerRoles.astakim = ['Crucial', 'Important', 'Rotation', 'Sporadic', 'Prospect'];
                const roleMap = { 'Yıldız': 'Crucial', 'İlk 11': 'Important', 'Rotasyon': 'Rotation', 'Gelecek Vadeden': 'Prospect' };
                (squadData.astakim || []).forEach(p => { if (roleMap[p.role]) p.role = roleMap[p.role]; });
            }

            return true;
        }

        function loadFromLocalStorage() {
            activeSlot = localStorage.getItem('fc26_active_slot') || '1';
            let dataStr = localStorage.getItem('fc26_career_data_' + activeSlot);
            
            // Geriye dönük uyumluluk (Eski veriyi otomatik olarak Slot 1'e taşı)
            if (!dataStr && activeSlot === '1') {
                dataStr = localStorage.getItem('fc26_career_data');
                if (dataStr) localStorage.setItem('fc26_career_data_1', dataStr);
            }

            if (!dataStr) return false;
            try {
                const data = JSON.parse(dataStr);
                return applyLoadedData(data);
            } catch (e) {
                console.error("Veri okuma hatası:", e);
                return false;
            }
        }

        function switchCareerSlot(slotNum) {
            // Mevcut veriyi şu anki slota kaydet
            saveToLocalStorage();
            
            // Yeni slotu belirle
            activeSlot = slotNum.toString();
            localStorage.setItem('fc26_active_slot', activeSlot);
            
            // Arayüzü yeni slot verisiyle baştan yükle
            location.reload();
        }

        async function deleteCareerSlot(slotNum) {
            if(confirm(`Kayıt Slotu ${slotNum} içindeki tüm veriler kalıcı olarak silinecektir. Emin misiniz?`)) {
                localStorage.removeItem('fc26_career_data_' + slotNum);
                if (slotNum === 1) localStorage.removeItem('fc26_career_data'); // Geriye dönük uyumluluk
                
                // Bulut bağlantısı varsa oradan da tamamen sil
                if (currentUser && fbDb) {
                    const docId = slotNum.toString() === '1' ? currentUser.uid : `${currentUser.uid}_slot_${slotNum}`;
                    try { await fbDb.collection('careers').doc(docId).delete(); } catch(e) { console.error('Bulut verisi silinemedi:', e); }
                }
                
                // Eğer silinen slot şu anki aktif slotsa, belleği sıfırlamak için sayfayı yenile
                if (activeSlot === slotNum.toString()) {
                    location.reload();
                } else {
                    // Sadece arayüzü güncelle
                    renderSettingsPanel();
                }
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
            const logo = document.getElementById('sidebar-team-logo');
            if (!logo) return;
            const container = logo.parentElement;

            container.classList.add('transition-all', 'duration-500');
            logo.classList.add('transition-all', 'duration-500');

            // Önceki efektleri temizle
            logo.classList.remove('grayscale', 'opacity-60');
            container.classList.remove('shadow-[0_0_15px_rgba(16,185,129,0.6)]', 'border-emerald-500', 'shadow-[0_0_15px_rgba(250,204,21,0.6)]', 'border-yellow-500', 'shadow-[0_0_15px_rgba(239,68,68,0.6)]', 'border-red-500');

            const map = {
                idle:    { text: msg || 'Bulut' },
                saving:  { text: msg || 'Kaydediliyor...' },
                saved:   { text: msg || 'Kaydedildi' },
                error:   { text: msg || 'Senkronizasyon hatası' },
                offline: { text: msg || 'Çevrimdışı' }
            };
            const s = map[state] || map.idle;
            
            // Mouse ile üzerine gelindiğinde bulut durumunu da göstersin
            container.title = `Takımı Düzenle | Bulut: ${s.text}`;

            if (state === 'saved') {
                container.classList.add('shadow-[0_0_15px_rgba(16,185,129,0.6)]', 'border-emerald-500');
            } else if (state === 'saving') {
                container.classList.add('shadow-[0_0_15px_rgba(250,204,21,0.6)]', 'border-yellow-500');
            } else if (state === 'error') {
                logo.classList.add('grayscale');
                container.classList.add('shadow-[0_0_15px_rgba(239,68,68,0.6)]', 'border-red-500');
            } else {
                // Offline / Idle
                logo.classList.add('grayscale', 'opacity-60');
            }
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

        function signOutOfCloud() {
            if (cloudUnsubscribe) { cloudUnsubscribe(); cloudUnsubscribe = null; }
            cloudDocRef = null;
            currentUser = null;
            if (fbAuth) fbAuth.signOut();
            setSyncStatus('offline');
            rerenderCurrentPanel();
        }

        async function connectToCloud(uid) {
            // Geriye dönük uyumluluk: Slot 1 ana 'uid' dokümanını kullanır, diğerleri slot numarasını ekler
            const docId = activeSlot === '1' ? uid : `${uid}_slot_${activeSlot}`;
            cloudDocRef = fbDb.collection('careers').doc(docId);
            setSyncStatus('saving', 'Veriler alınıyor...');
            try {
                const snap = await cloudDocRef.get();
                if (snap.exists) {
                    applyLoadedData(snap.data());
                    localStorage.setItem('fc26_career_data_' + activeSlot, JSON.stringify(snap.data()));
                    if (activeSlot === '1') localStorage.setItem('fc26_career_data', JSON.stringify(snap.data())); // Yedek anahtar sadece slot 1 için
                } else {
                    let localStr = localStorage.getItem('fc26_career_data_' + activeSlot);
                    if (!localStr && activeSlot === '1') localStr = localStorage.getItem('fc26_career_data'); // Eski yedeği sadece Slot 1 için ara

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
                localStorage.setItem('fc26_career_data_' + activeSlot, JSON.stringify(snap.data()));
                if (activeSlot === '1') localStorage.setItem('fc26_career_data', JSON.stringify(snap.data()));
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
            if (activeMain === 'anasayfa') renderHomePanel();
            else if (activeMain === 'kupalar') renderTrophiesGrid();
            else if (activeMain === 'maclar') renderMatchesGrid();
            else if (activeMain === 'kadro') renderSquadGrid();
            else if (activeMain === 'ligtarihi') renderLeagueHistory();
            else if (activeMain === 'transfer') renderTransferPanel();
            else if (activeMain === 'golasist') renderStatsPanel();
            else if (activeMain === 'sezonlar') renderFixturePanel();
            else if (activeMain === 'ayarlar') renderSettingsPanel();
            renderQuickFixtureBar();
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

        function getSquadDatalistOptions(context) {
            let options = '';
            let allPlayers = context === 'milli' ? (squadData.milli || []) : [...(squadData.astakim || []), ...(squadData.akademi || [])];
            
            const targetSeason = typeof activeFixtureSeason !== 'undefined' && activeFixtureSeason ? activeFixtureSeason : seasonsList[seasonsList.length - 1];
            
            const statsData = typeof getStatsData === 'function' ? getStatsData(context) : { stats: [] };
            const statsMap = {};
            statsData.stats.forEach(s => {
                const g = s.seasons[targetSeason] ? s.seasons[targetSeason].totalGoals : 0;
                const a = s.seasons[targetSeason] ? s.seasons[targetSeason].totalAssists : 0;
                statsMap[s.name.toLowerCase()] = (g * 2) + a; // Goller sıralama ağırlığında 2 katı
            });

            let names = [...new Set(allPlayers.map(p => p.name || p.playerName || p.isim).filter(Boolean))];
            
            names.sort((a, b) => {
                const valA = statsMap[a.toLowerCase()] || 0;
                const valB = statsMap[b.toLowerCase()] || 0;
                if (valA !== valB) return valB - valA;
                return a.localeCompare(b, 'tr'); // Alfabetik
            });

            names.forEach(pName => {
                options += `<option value="${escapeHtml(pName)}"></option>`;
            });
            
            return options;
        }

        let mockPlayers = [];
        function updateMockPlayers() {
            let context = ((activeMain === 'maclar' && matchContext === 'milli') || (activeMain === 'kadro' && squadContext === 'milli') || (activeMain === 'sezonlar' && typeof homeGlobalContext !== 'undefined' && homeGlobalContext === 'milli')) ? 'milli' : 'kulup';
            
            if (typeof activeFixtureMatchId !== 'undefined' && activeFixtureMatchId && typeof fixtureData !== 'undefined') {
                const seasonMatches = fixtureData[activeFixtureSeason || seasonsList[seasonsList.length - 1]] || [];
                const match = seasonMatches.find(m => m.id === activeFixtureMatchId);
                if (match && typeof getFixtureMatchContext === 'function') context = getFixtureMatchContext(match);
            }

            let pool = context === 'milli' ? (squadData.milli || []) : [...(squadData.astakim || []), ...(squadData.akademi || [])];
            let names = [...new Set(pool.map(p => p.name).filter(Boolean))];

            const targetSeason = typeof activeFixtureSeason !== 'undefined' && activeFixtureSeason ? activeFixtureSeason : seasonsList[seasonsList.length - 1];
            
            const statsData = typeof getStatsData === 'function' ? getStatsData(context) : { stats: [] };
            const statsMap = {};
            statsData.stats.forEach(s => {
                const g = s.seasons[targetSeason] ? s.seasons[targetSeason].totalGoals : 0;
                const a = s.seasons[targetSeason] ? s.seasons[targetSeason].totalAssists : 0;
                statsMap[s.name.toLowerCase()] = (g * 2) + a;
            });

            mockPlayers = names.sort((a, b) => {
                const valA = statsMap[a.toLowerCase()] || 0;
                const valB = statsMap[b.toLowerCase()] || 0;
                if (valA !== valB) return valB - valA;
                return a.localeCompare(b, 'tr');
            });
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
            'league-team-modal', 'league-team-bulk-modal', 'league-cell-modal', 'transfer-editor-modal', 'shortlist-modal', 'fixture-match-modal', 'match-result-modal',
            'fixture-bulk-modal', 'fixture-text-bulk-modal', 'squad-bulk-modal', 'tournament-table-bulk-modal', 'national-caps-bulk-modal', 'formation-modal', 'euro-leagues-bulk-modal', 'bulk-stat-modal', 'bulk-league-pts-modal', 'custom-tour-team-modal', 'ko-team-modal', 'top-stat-modal'
        ];
        const MODAL_CLOSE_FNS = {
            'fixture-text-bulk-modal': () => closeFixtureTextBulkModal(),
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
            'shortlist-modal': () => closeShortlistModal(),
            'fixture-match-modal': () => closeFixtureModal(),
            'match-result-modal': () => closeMatchResultModal(),
            'fixture-bulk-modal': () => closeFixtureBulkModal(),
            'squad-bulk-modal': () => closeSquadBulkModal(),
            'tournament-table-bulk-modal': () => closeTournamentTableBulkModal(),
            'national-caps-bulk-modal': () => closeNationalCapsBulkModal(),
            'euro-leagues-bulk-modal': () => closeEuroLeaguesBulkModal(),
            'formation-modal': () => closeFormationModal(),
            'bulk-stat-modal': () => closeBulkStatModal(),
            'bulk-league-pts-modal': () => closeBulkLeaguePtsModal(),
            'custom-tour-team-modal': () => closeCustomTourTeamModal(),
            'ko-team-modal': () => closeKoTeamModal(),
            'top-stat-modal': () => closeTopStatModal()
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
            applyStoredThemeFamily();
            if (loadFromLocalStorage()) {
                if(managedTeams.kulup && managedTeams.kulup.logoUrl) {
                    document.getElementById('sidebar-team-logo').src = managedTeams.kulup.logoUrl;
                    updateSiteFavicon();
                }
            } else {
                // İlk defa giren birini kurulum ekranı yerine direkt içeri al
                isSetupComplete = true;
            }
            selectMainMenu('anasayfa'); // <--- Varsayılan açılış artık Ana Sayfa paneli
            applyStoredLanguage();
            applyQfbCollapsedState();
            renderQuickFixtureBar();
            if (typeof populateGlobalNameDatalists === 'function') populateGlobalNameDatalists();
            
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

        function changeScale(val) {
            currentScale = val;
            if(activeMain === 'kupalar') renderTrophiesGrid();
            if(activeMain === 'maclar') renderMatchesGrid();
            if(activeMain === 'kadro') renderSquadGrid();
        }

        // ===================== ÖLÇEK SEÇİCİ: minimal [ − 75% + ] =====================
        const SCALE_STEPS = ['0.5', '0.75', '1'];
        function stepScale(dir) {
            const i = SCALE_STEPS.indexOf(currentScale);
            const next = SCALE_STEPS[Math.min(SCALE_STEPS.length - 1, Math.max(0, (i === -1 ? SCALE_STEPS.length - 1 : i) + dir))];
            if (next !== currentScale) changeScale(next);
        }
        function getScaleSelectorHtml() {
            return ''; // GİZLENDİ: seçiciyi geri açmak için bu satırı sil
            const i = SCALE_STEPS.indexOf(currentScale);
            const btn = 'w-7 h-7 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed';
            return `
                <div class="flex items-center rounded-lg border border-slate-700 bg-slate-900 overflow-hidden" title="%${Math.round(parseFloat(currentScale) * 100)}">
                    <button onclick="stepScale(-1)" ${i === 0 ? 'disabled' : ''} class="${btn}" title="Küçült" aria-label="Küçült"><i class="fa-solid fa-minus text-[10px]"></i></button>
                    <span class="w-10 text-center text-[11px] font-bold text-slate-300 tabular-nums select-none border-x border-slate-800">${Math.round(parseFloat(currentScale) * 100)}%</span>
                    <button onclick="stepScale(1)" ${i === SCALE_STEPS.length - 1 ? 'disabled' : ''} class="${btn}" title="Büyüt" aria-label="Büyüt"><i class="fa-solid fa-plus text-[10px]"></i></button>
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
                delete euroSlotsData[season];
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
            
            if (menuId === 'anasayfa') {
                renderHomePanel();
            } else if (menuId === 'kupalar') {
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
            if(activeMain !== 'anasayfa' && activeMain !== 'kupalar' && activeMain !== 'maclar' && activeMain !== 'kadro' && activeMain !== 'ligtarihi' && activeMain !== 'transfer' && activeMain !== 'golasist' && activeMain !== 'sezonlar' && activeMain !== 'ayarlar') {
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
                const dataStr = localStorage.getItem('fc26_career_data_' + activeSlot) || localStorage.getItem('fc26_career_data') || '';
                usedBytes = new Blob([dataStr]).size;
            } catch(e) {}
            const usedKB = (usedBytes / 1024).toFixed(1);
            const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
            const maxMB = 5;
            const pct = Math.min(100, ((usedBytes / (maxMB * 1024 * 1024)) * 100)).toFixed(1);
            const barColor = pct >= 80 ? 'bg-red-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-emerald-500';
            const storageDisplay = usedBytes > 1024 * 1024 ? `${usedMB} MB` : `${usedKB} KB`;

            const getSlotData = (slotNum) => {
                let dataStr = localStorage.getItem('fc26_career_data_' + slotNum);
                if (!dataStr && slotNum === 1) dataStr = localStorage.getItem('fc26_career_data');
                return dataStr;
            };

            const getSlotLogo = (slotNum) => {
                try {
                    const dataStr = getSlotData(slotNum);
                    if (dataStr) {
                        const parsed = JSON.parse(dataStr);
                        if (parsed.managedTeams && parsed.managedTeams.kulup && parsed.managedTeams.kulup.logoUrl) {
                            return parsed.managedTeams.kulup.logoUrl;
                        }
                    }
                } catch(e) {}
                return null;
            };

            const has1 = !!getSlotData(1);
            const has2 = !!getSlotData(2);
            const has3 = !!getSlotData(3);

            const logo1 = getSlotLogo(1);
            const logo2 = getSlotLogo(2);
            const logo3 = getSlotLogo(3);

            let html = `
                <div class="w-full max-w-4xl mx-auto flex flex-col h-full">
                    <div class="mb-2 sm:mb-6 px-2 shrink-0">
                        <h3 class="text-lg sm:text-2xl font-bold text-white text-left"><i class="fa-solid fa-gear text-emerald-500 mr-2"></i>Ayarlar ve Veritabanı</h3>
                        <p class="hidden sm:block text-slate-400 text-xs sm:text-sm mt-1 text-left">Tüm kariyer verileriniz anlık olarak tarayıcınıza kaydedilmektedir. Farklı bir tarayıcıya veya cihaza aktarmak için aşağıdaki yedekleme araçlarını kullanın.</p>
                    </div>
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-6 shadow-lg flex-1 overflow-auto hide-scrollbar flex flex-col gap-2 sm:gap-0">
                        
                        <!-- Görünüm ve Dil -->
                        <div class="flex-1 sm:flex-none flex flex-col justify-center sm:block sm:mb-6 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-4">
                            <div class="flex justify-between items-center mb-1.5 sm:mb-4">
                                <span class="text-[10px] sm:text-sm font-bold text-slate-300"><i class="fa-solid fa-palette mr-2 text-purple-400"></i>Arayüz ve Dil</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                                <button onclick="toggleTheme()" class="bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg py-2 px-2 sm:p-3 flex flex-col items-center justify-center gap-1 sm:gap-2 transition-colors h-full">
                                    <i class="fa-solid fa-circle-half-stroke text-base sm:text-2xl text-yellow-500"></i>
                                    <span class="text-[9px] sm:text-xs font-bold text-slate-300 text-center">Tema Değiştir</span>
                                </button>
                                <button onclick="toggleLanguage(); renderSettingsPanel();" class="bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg py-2 px-2 sm:p-3 flex flex-col items-center justify-center gap-1 sm:gap-2 transition-colors h-full">
                                    <i class="fa-solid fa-language text-base sm:text-2xl text-blue-400"></i>
                                    <span class="text-[9px] sm:text-xs font-bold text-slate-300 text-center leading-tight">Dil Değiştir<br><span class="hidden sm:inline">Switch Language</span></span>
                                    <span class="text-[7px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0">ŞU AN: <span id="btn-lang-label" class="text-emerald-400">${currentLang === 'en' ? 'EN' : 'TR'}</span></span>
                                </button>
                            </div>
                        </div>

                        <!-- Cloud Sync Card -->
                        <div class="flex-1 sm:flex-none flex flex-col justify-center sm:block sm:mb-6 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-4">
                            <div class="flex justify-between items-center mb-1.5 sm:mb-2 flex-wrap gap-1 sm:gap-2">
                                <span class="text-[10px] sm:text-sm font-bold text-slate-300"><i class="fa-solid fa-cloud mr-2 text-blue-400"></i>Bulut Senkronizasyonu</span>
                                ${currentUser
                                    ? `<span class="flex items-center gap-1 sm:gap-2 text-[9px] sm:text-xs font-bold text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                                         ${currentUser.photoURL ? `<img src="${currentUser.photoURL}" class="w-3 h-3 sm:w-5 sm:h-5 rounded-full" referrerpolicy="no-referrer">` : ''}
                                         ${currentUser.email || currentUser.displayName || 'Bağlı'}
                                       </span>`
                                    : `<span class="text-[9px] sm:text-xs font-mono font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">Bağlı değil</span>`
                                }
                            </div>
                            <p class="hidden sm:block text-[10px] sm:text-xs text-slate-500 mb-2 sm:mb-3">${currentUser ? 'Bu Google hesabıyla giriş yaptığınız her cihazda aynı kariyer verisine ulaşırsınız.' : 'Verilerinizi diğer cihazlarınızdan da görmek için Google hesabınızla giriş yapın.'}</p>
                            <button onclick="${currentUser ? 'signOutOfCloud()' : 'signInWithGoogle()'}" class="${currentUser ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-600 hover:bg-blue-500'} text-white text-[10px] sm:text-sm font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg transition-colors w-full sm:w-auto mt-1 sm:mt-0">
                                <i class="fa-solid ${currentUser ? 'fa-right-from-bracket' : 'fa-cloud-arrow-up'} mr-1"></i> ${currentUser ? 'Hesaptan Çık' : 'Buluta Bağlan'}
                            </button>
                        </div>
                        
                        <!-- Storage Usage Bar -->
                        <div class="flex-1 sm:flex-none flex flex-col justify-center sm:block sm:mb-6 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-4">
                            <div class="flex justify-between items-center mb-1.5 sm:mb-2">
                                <span class="text-[10px] sm:text-sm font-bold text-slate-300"><i class="fa-solid fa-database mr-2 text-emerald-500"></i>Tarayıcı Depolama Kullanımı</span>
                                <span class="text-[9px] sm:text-sm font-mono font-bold ${pct >= 80 ? 'text-red-400' : pct >= 50 ? 'text-yellow-400' : 'text-emerald-400'}">${storageDisplay} / ${maxMB} MB</span>
                            </div>
                            <div class="w-full bg-slate-700 rounded-full h-1.5 sm:h-2.5">
                                <div class="${barColor} h-1.5 sm:h-2.5 rounded-full transition-all" style="width: ${pct}%"></div>
                            </div>
                            <p class="hidden sm:block text-[9px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2">%${pct} kullanılıyor. ${pct >= 80 ? '⚠️ Depolama alanı dolmak üzere! Yedek alıp bazı verileri temizleyin.' : 'Yedek almayı unutmayın.'}</p>
                        </div>

                        <!-- Kariyer Slotları -->
                        <div class="flex-[1.2] sm:flex-none flex flex-col justify-center sm:block sm:mb-6 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-4">
                            <div class="flex justify-between items-center mb-1.5 sm:mb-4">
                                <span class="text-[10px] sm:text-sm font-bold text-slate-300"><i class="fa-solid fa-folder-open mr-2 text-yellow-400"></i>Kariyer Yönetimi (Kayıt Slotları)</span>
                            </div>
                            <p class="hidden sm:block text-[10px] sm:text-xs text-slate-400 mb-2 sm:mb-3">Farklı takımlarla yeni kariyerlere başlamak için kayıt slotları arasında geçiş yapabilirsiniz.</p>
                            <div class="grid grid-cols-3 gap-2 sm:gap-2 flex-1">
                                <div class="relative group h-full">
                                    <button onclick="switchCareerSlot(1)" class="w-full h-full py-2 sm:py-2 px-1 sm:px-3 rounded-md sm:rounded-lg font-bold border-2 transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 ${activeSlot === '1' ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500/50 hover:text-white'}">
                                        ${logo1 ? `<img src="${logo1}" class="w-5 h-5 sm:w-8 sm:h-8 object-contain drop-shadow-md">` : `<i class="fa-solid fa-1 text-sm sm:text-xl"></i>`}
                                        <span class="text-[8px] sm:text-[10px] uppercase tracking-wider text-center">Kayıt Slotu 1</span>
                                    </button>
                                    ${has1 ? `<button onclick="deleteCareerSlot(1)" class="absolute -top-1 -right-1 sm:top-1 sm:right-1 opacity-100 sm:opacity-0 group-hover:opacity-100 bg-red-900/80 hover:bg-red-500 text-red-200 hover:text-white rounded w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[8px] sm:text-[10px] transition-all z-10 shadow-lg" title="Slotu Temizle"><i class="fa-solid fa-trash"></i></button>` : ''}
                                </div>
                                <div class="relative group h-full">
                                    <button onclick="switchCareerSlot(2)" class="w-full h-full py-2 sm:py-2 px-1 sm:px-3 rounded-md sm:rounded-lg font-bold border-2 transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 ${activeSlot === '2' ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500/50 hover:text-white'}">
                                        ${logo2 ? `<img src="${logo2}" class="w-5 h-5 sm:w-8 sm:h-8 object-contain drop-shadow-md">` : `<i class="fa-solid fa-2 text-sm sm:text-xl"></i>`}
                                        <span class="text-[8px] sm:text-[10px] uppercase tracking-wider text-center">Kayıt Slotu 2</span>
                                    </button>
                                    ${has2 ? `<button onclick="deleteCareerSlot(2)" class="absolute -top-1 -right-1 sm:top-1 sm:right-1 opacity-100 sm:opacity-0 group-hover:opacity-100 bg-red-900/80 hover:bg-red-500 text-red-200 hover:text-white rounded w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[8px] sm:text-[10px] transition-all z-10 shadow-lg" title="Slotu Temizle"><i class="fa-solid fa-trash"></i></button>` : ''}
                                </div>
                                <div class="relative group h-full">
                                    <button onclick="switchCareerSlot(3)" class="w-full h-full py-2 sm:py-2 px-1 sm:px-3 rounded-md sm:rounded-lg font-bold border-2 transition-all flex flex-col items-center justify-center gap-1.5 sm:gap-2 ${activeSlot === '3' ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500/50 hover:text-white'}">
                                        ${logo3 ? `<img src="${logo3}" class="w-5 h-5 sm:w-8 sm:h-8 object-contain drop-shadow-md">` : `<i class="fa-solid fa-3 text-sm sm:text-xl"></i>`}
                                        <span class="text-[8px] sm:text-[10px] uppercase tracking-wider text-center">Kayıt Slotu 3</span>
                                    </button>
                                    ${has3 ? `<button onclick="deleteCareerSlot(3)" class="absolute -top-1 -right-1 sm:top-1 sm:right-1 opacity-100 sm:opacity-0 group-hover:opacity-100 bg-red-900/80 hover:bg-red-500 text-red-200 hover:text-white rounded w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[8px] sm:text-[10px] transition-all z-10 shadow-lg" title="Slotu Temizle"><i class="fa-solid fa-trash"></i></button>` : ''}
                                </div>
                            </div>
                        </div>

                        <!-- Export / Import / Reset -->
                        <div class="flex-1 sm:flex-none grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-6 mt-0">
                            
                            <div class="bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-6 relative overflow-hidden flex flex-col justify-center sm:justify-between items-center sm:items-start h-full">
                                <div class="hidden sm:block absolute -bottom-4 -right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-download text-[150px] text-emerald-500"></i></div>
                                <div class="hidden sm:block mb-0">
                                    <h4 class="text-lg font-bold text-emerald-400 mb-2 relative z-10">Verileri Dışa Aktar</h4>
                                    <p class="text-sm text-slate-400 mb-6 relative z-10 leading-tight">Mevcut kariyerinizin yedeğini <span class="text-emerald-300 font-bold">.json</span> formatında bilgisayarınıza indirebilirsiniz.</p>
                                </div>
                                <button onclick="exportJSON()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 sm:py-3 px-2 sm:px-6 rounded-md sm:rounded-lg w-full text-[10px] sm:text-base transition-colors flex items-center justify-center gap-1.5 sm:gap-2 relative z-10 shadow-sm sm:shadow-lg h-full sm:h-auto">
                                    <i class="fa-solid fa-file-export"></i> <span class="sm:hidden">Dışa Aktar</span><span class="hidden sm:inline">Yedek İndir (.json)</span>
                                </button>
                            </div>

                            <div class="bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl p-2 sm:p-6 relative overflow-hidden flex flex-col justify-center sm:justify-between items-center sm:items-start h-full">
                                <div class="hidden sm:block absolute -bottom-4 -right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-upload text-[150px] text-blue-500"></i></div>
                                <div class="hidden sm:block mb-0">
                                    <h4 class="text-lg font-bold text-blue-400 mb-2 relative z-10">Verileri İçeri Aktar</h4>
                                    <p class="text-sm text-slate-400 mb-6 relative z-10 leading-tight">Daha önce aldığınız veya başka bir cihazdan taşıdığınız yedeği (.json) sisteme yükleyin.</p>
                                </div>
                                <input type="file" id="import-file" class="hidden" accept=".json" onchange="importJSON(event)">
                                <button onclick="document.getElementById('import-file').click()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 sm:py-3 px-2 sm:px-6 rounded-md sm:rounded-lg w-full text-[10px] sm:text-base transition-colors flex items-center justify-center gap-1.5 sm:gap-2 relative z-10 shadow-sm sm:shadow-lg h-full sm:h-auto">
                                    <i class="fa-solid fa-file-import"></i> <span class="sm:hidden">İçeri Aktar</span><span class="hidden sm:inline">Yedekten Yükle (.json)</span>
                                </button>
                            </div>
                            
                            <div class="bg-slate-800 border border-red-900/50 rounded-lg sm:rounded-xl p-2 sm:p-6 relative overflow-hidden col-span-2 flex flex-col justify-center h-full">
                                <div class="hidden sm:block absolute top-1/2 -translate-y-1/2 right-4 p-4 opacity-10 pointer-events-none"><i class="fa-solid fa-triangle-exclamation text-[120px] text-red-500"></i></div>
                                <h4 class="hidden sm:block text-lg font-bold text-red-500 mb-2 relative z-10">Kariyeri Sıfırla (Tehlikeli İşlem)</h4>
                                <p class="hidden sm:block text-sm text-slate-400 mb-6 relative z-10 max-w-xl leading-tight">Tarayıcıdaki tüm kariyer verilerini <span class="text-red-400 font-bold">geri dönülemez şekilde</span> siler. Sıfırlamadan önce yedek aldığınızdan emin olun.</p>
                                <button onclick="resetData()" class="bg-red-900/80 hover:bg-red-700 text-red-100 font-bold py-2 sm:py-3 px-2 sm:px-6 rounded-md sm:rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2 relative z-10 w-full sm:w-fit text-[10px] sm:text-base h-full sm:h-auto">
                                    <i class="fa-solid fa-trash"></i> <span class="sm:hidden">Sıfırla</span><span class="hidden sm:inline">Tüm Verileri Sil ve Başa Dön</span>
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
            link.download = `GloryTrack_${teamName}_Backup.json`;
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
                        localStorage.setItem('fc26_career_data_' + activeSlot, JSON.stringify(parsed));
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
            if(confirm("Aktif slotunuzdaki TÜM verileriniz kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?")) {
                if(confirm("Sıfırlama işlemi geri alınamaz! Gerçekten bu kariyeri sıfırlamak istiyor musunuz?")) {
                    localStorage.removeItem('fc26_career_data_' + activeSlot);
                    if (activeSlot === '1') localStorage.removeItem('fc26_career_data'); // Geriye dönük uyumluluk anahtarını da sil
                    
                    // Buluta bağlıysa, silinen veri geri indirilmesin diye bulut kaydını da temizle
                    if (cloudDocRef) {
                        try { await cloudDocRef.delete(); } catch(e) { console.error('Bulut verisi silinemedi:', e); }
                    }
                    location.reload();
                }
            }
        }

        let homeGlobalContext = 'kulup';
        let homeSquadContext = 'astakim';
        let homeStatsContext = 'kulup';
        let homeFixtureContext = 'both';
        let homeStatsSort = { field: 'goals', asc: false };

        function setHomeGlobalContext(ctx) {
            homeGlobalContext = ctx;
            homeSquadContext = ctx === 'kulup' ? 'astakim' : 'milli';
            homeStatsContext = ctx;
            if (homeFixtureContext !== 'both') homeFixtureContext = ctx;
            renderHomePanel();
        }

        function toggleHomeFixtureBoth() {
            homeFixtureContext = homeFixtureContext === 'both' ? homeGlobalContext : 'both';
            renderHomePanel();
        }

        function renderHomeFirst11(context) {
            const formData = formations && formations[context] ? formations[context].ilk11 : null;
            if (!formData || !Array.isArray(formData) || !formData.some(n => n.name)) {
                return '<div class="text-center text-slate-500 text-sm py-6">Bu kadro için henüz İlk 11 belirlenmedi.<br><span class="text-xs">Kadro panelinden "Kadrolar" ikonuna tıklayarak oluşturabilirsiniz.</span></div>';
            }
            const cards = formData.filter(node => node.name).map(node => {
                const photo = getPlayerPhotoByName(node.name);
                const cur = getPlayerCurrentStatsByName(node.name, context);
                const hasOvr = cur && cur.ovr !== null && cur.ovr !== undefined && cur.ovr !== '';
                const pc = homeXiPosColor(node.pos);
                const photoHtml = photo
                    ? `<img src="${photo}" alt="" class="xi-img">`
                    : `<div class="xi-ph">${escapeHtml((node.name || '?').charAt(0).toUpperCase())}</div>`;
                const left = Math.min(94, Math.max(6, parseFloat(node.x) || 0));
                const top = Math.min(92, Math.max(8, parseFloat(node.y) || 0));
                return `<div class="xi-card" data-l0="${left}" data-t0="${top}" style="--c:${pc};left:${left}%;top:${top}%;">
                    <div class="xi-top"><b class="xi-ovr" style="color:${hasOvr ? mbOvrColor(cur.ovr) : '#64748b'}">${hasOvr ? escapeHtml(String(cur.ovr)) : '-'}</b><span class="xi-pos" style="color:${pc}">${escapeHtml(node.pos || '')}</span></div>
                    <div class="xi-photo">${photoHtml}</div>
                    <div class="xi-name" title="${escapeHtml(node.name)}">${escapeHtml(homeSurname(node.name))}</div>
                </div>`;
            }).join('');
            return `
                <div class="home-xi-container vert" data-ctx="${context}">
                    <svg class="xi-lines" viewBox="0 0 62 100" preserveAspectRatio="none" aria-hidden="true">
                        <g fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.4" vector-effect="non-scaling-stroke">
                            <rect x="3" y="2" width="56" height="96" vector-effect="non-scaling-stroke"/>
                            <line x1="3" y1="50" x2="59" y2="50" vector-effect="non-scaling-stroke"/>
                            <ellipse cx="31" cy="50" rx="12.5" ry="8" vector-effect="non-scaling-stroke"/>
                            <rect x="17" y="2" width="28" height="14" vector-effect="non-scaling-stroke"/>
                            <rect x="17" y="84" width="28" height="14" vector-effect="non-scaling-stroke"/>
                            <rect x="25" y="2" width="12" height="5" vector-effect="non-scaling-stroke"/>
                            <rect x="25" y="93" width="12" height="5" vector-effect="non-scaling-stroke"/>
                        </g>
                    </svg>
                    ${cards}
                </div>
            `;
        }

        function renderHomeFirst11Old(context) {
            const formData = formations && formations[context] ? formations[context].ilk11 : null;
            if (!formData || !Array.isArray(formData) || !formData.some(n => n.name)) {
                return '<div class="text-center text-slate-500 text-sm py-6">Bu kadro için henüz İlk 11 belirlenmedi.<br><span class="text-xs">Kadro panelinden "Kadrolar" ikonuna tıklayarak oluşturabilirsiniz.</span></div>';
            }

            // Kartların pitch kutusunun kendi boyutuna (cqmin = konteynerin en/boy'undan küçük olanı) göre
            // ölçeklenmesi için tüm boyutları container-query birimleriyle (cqmin) veriyoruz.
            const photoSize = 'clamp(32px, 16cqmin, 100px)';
            const badgeFont = 'clamp(5px, 2.3cqmin, 8px)';
            const badgePad = 'clamp(0px, 0.3cqmin, 1.5px) clamp(2px, 0.9cqmin, 5px)';
            const nameFont = 'clamp(5.5px, 2.9cqmin, 11px)';
            const namePad = 'clamp(1px, 0.5cqmin, 2.5px) clamp(2.5px, 1.3cqmin, 7.5px)';

            const nodesHtml = formData.filter(node => node.name).map(node => {
                const photo = getPlayerPhotoByName(node.name);
                const photoHtml = photo
                    ? `<div class="relative flex items-end justify-center shrink-0 overflow-visible" style="width:${photoSize}; height:${photoSize};">
                            <img src="${photo}" class="relative z-10 object-cover object-top pointer-events-none drop-shadow-lg" style="width:100%; height:118%;">
                       </div>`
                    : `<div class="rounded-full bg-slate-700 border-[3px] border-slate-900 flex items-center justify-center font-black text-white shadow-lg shrink-0" style="width:${photoSize}; height:${photoSize}; font-size:clamp(10px, 6.5cqmin, 30px);">${escapeHtml((node.name || '?').charAt(0).toUpperCase())}</div>`;
                return `
                    <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2" style="left:${node.x}%; top:${node.y}%; width:clamp(48px, 18cqmin, 130px);">
                        ${photoHtml}
                        <div class="flex items-center gap-1" style="margin-top:1px;">
                            <span class="pos-${node.pos || ''} bg-slate-950/90 font-black rounded border border-slate-700" style="font-size:${badgeFont}; padding:${badgePad};">${node.pos || ''}</span>
                        </div>
                        <div class="bg-black/80 text-white font-bold rounded whitespace-nowrap border border-white/10" style="font-size:${nameFont}; padding:${namePad}; margin-top:1px;">${escapeHtml(formatShortPlayerName(node.name))}</div>
                    </div>
                `;
            }).join('');

            return `
                <div class="home-pitch-container relative w-full h-full min-h-0 bg-green-800 rounded-lg border-2 border-white/30 overflow-hidden">
                    <div class="absolute inset-0 pointer-events-none border-[2px] border-white/25 m-2 rounded-sm"></div>
                    <div class="absolute top-1/2 left-2 right-2 h-px bg-white/25 -translate-y-1/2"></div>
                    <div class="absolute top-1/2 left-1/2 w-14 h-14 border-[2px] border-white/25 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/35 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="absolute bottom-2 left-1/2 w-28 h-16 border-[2px] border-white/25 -translate-x-1/2 border-b-0"></div>
                    <div class="absolute bottom-2 left-1/2 w-14 h-7 border-[2px] border-white/25 -translate-x-1/2 border-b-0"></div>
                    <div class="absolute top-2 left-1/2 w-28 h-16 border-[2px] border-white/25 -translate-x-1/2 border-t-0"></div>
                    <div class="absolute top-2 left-1/2 w-14 h-7 border-[2px] border-white/25 -translate-x-1/2 border-t-0"></div>
                    ${nodesHtml}
                </div>
            `;
        }

        function homeGetFilteredMatches(context) {
            const clubName = managedTeams.kulup.name || '';
            const nationalName = managedTeams.milli.name || '';
            const all = qfbGetAllMatches();
            if (context === 'both') return all;
            const teamName = context === 'milli' ? nationalName : clubName;
            return all.filter(m => m.home === teamName || m.away === teamName);
        }

        // ===================== ANA SAYFA: MAÇLAR PANELİ (sezon sütunu yok, dar satırlar, Sıradaki Maç daima ortada) =====================
        // Sıradaki Maç'ı panelin tam ortasına hizalar: üst ve alt blokları eşitler, sonra kaydırmayı ortalar.
        // ===================== ANA SAYFA: MAÇLAR PANELİ v7 — paneli dolduran maç listesi, Sıradaki Maç daima ortada, kaydırma yok =====================
        function homeCenterNextMatch() {
            const root = document.getElementById('hcontent-maclar');
            if (!root) return;
            const sc = root.querySelector('.overflow-y-auto');
            const wrap = root.querySelector('[data-hx="wrap"]');
            const top = root.querySelector('[data-hx="top"]');
            const mid = root.querySelector('[data-hx="mid"]');
            const bot = root.querySelector('[data-hx="bot"]');
            if (!sc || !wrap || !top || !mid || !bot || !top.firstElementChild || !bot.firstElementChild) return;
            if (!sc.clientHeight) return; // Mobilde sekme gizliyse ölçülemez; sekme açılınca tekrar çalışır
            const cs = getComputedStyle(sc);
            const inner = sc.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
            const gap = parseFloat(getComputedStyle(wrap).rowGap) || 0;
            const topRows = Array.from(top.querySelectorAll('[data-hxrow]'));
            const botRows = Array.from(bot.querySelectorAll('[data-hxrow]'));
            sc.style.overflowY = 'hidden';
            top.style.minHeight = ''; bot.style.minHeight = ''; wrap.style.minHeight = '';
            wrap.dataset.dense = '';
            wrap.dataset.scaled = '1';
            wrap.style.setProperty('--hxp', '0px'); // önceki çağrıdan kalan iç boşluğu sıfırla
            const MAX_K = 4, MIN_K = 2; // üstte/altta en fazla 4, en az 2 maç
            const maxK = Math.min(MAX_K, Math.max(topRows.length, botRows.length));
            const apply = (k) => {
                topRows.forEach((r, i) => { r.style.display = (i >= topRows.length - k) ? '' : 'none'; });
                botRows.forEach((r, i) => { r.style.display = (i < k) ? '' : 'none'; });
            };
            const total = () => 2 * Math.max(top.firstElementChild.offsetHeight, bot.firstElementChild.offsetHeight) + mid.offsetHeight + 2 * gap;
            const setS = (s) => wrap.style.setProperty('--hxs', String(s));
            // Taban boyutta (s = 1) sığan en büyük k (4..2); hiçbiri sığmıyorsa 2 ile devam edip küçült
            let k = Math.min(MIN_K, maxK);
            for (let c = maxK; c >= Math.min(MIN_K, maxK); c--) {
                apply(c); setS(1);
                if (total() <= inner) { k = c; break; }
            }
            apply(k);
            // Kutuları boş alanı dolduracak şekilde ölçekle (yükseklik ~ doğrusal)
            setS(1); const t1 = total();
            setS(2); const t2 = total();
            let s = t2 > t1 ? 1 + (inner - t1) / (t2 - t1) : 1;
            s = Math.max(0.55, Math.min(1.9, s));
            setS(s.toFixed(3));
            const t3 = total();
            if (t2 > t1 && Math.abs(t3 - inner) > 2) {
                s = Math.max(0.55, Math.min(1.9, s + (inner - t3) / (t2 - t1)));
                setS(s.toFixed(3));
            }
            // Ölçek sınırına ulaşıldıysa kalan boşluğu satır iç boşluklarına (padding) dağıt
            wrap.style.setProperty('--hxp', '0px');
            const tf = total();
            if (tf < inner - 2) {
                const vis = (arr) => arr.filter(r => r.style.display !== 'none').length;
                const kEff = Math.max(vis(topRows), vis(botRows));
                wrap.style.setProperty('--hxp', ((inner - tf) / (2 * (2 * kEff + 1))).toFixed(2) + 'px');
            }
            const need = Math.max(top.firstElementChild.offsetHeight, bot.firstElementChild.offsetHeight);
            top.style.minHeight = need + 'px';
            bot.style.minHeight = need + 'px';
            wrap.style.minHeight = inner + 'px';
            sc.scrollTop = 0;
        }

        function homeCenterNextMatchOld(mode) {
            const root = document.getElementById('hcontent-maclar');
            if (!root) return;
            const sc = root.querySelector('.overflow-y-auto');
            const wrap = root.querySelector('[data-hx="wrap"]');
            const top = root.querySelector('[data-hx="top"]');
            const mid = root.querySelector('[data-hx="mid"]');
            const bot = root.querySelector('[data-hx="bot"]');
            if (!sc || !wrap || !top || !mid || !bot || !top.firstElementChild || !bot.firstElementChild) return;
            if (!sc.clientHeight) return; // Mobilde sekme gizliyse ölçülemez; sekme açılınca tekrar çalışır
            wrap.dataset.dense = (mode === 'dense') ? '1' : ''; // üçer maç sığmıyorsa satırları daha da sıkılaştır
            const cs = getComputedStyle(sc);
            const inner = sc.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
            const gap = parseFloat(getComputedStyle(wrap).rowGap) || 0;
            const topRows = Array.from(top.querySelectorAll('[data-hxrow]'));
            const botRows = Array.from(bot.querySelectorAll('[data-hxrow]'));
            sc.style.overflowY = 'hidden'; // kaydırma yok: maçlar panele sığacak kadar gösterilir
            top.style.minHeight = ''; bot.style.minHeight = ''; wrap.style.minHeight = '';
            // k: Sıradaki Maç'ın altında ve üstünde gösterilecek en fazla satır sayısı
            const apply = (k) => {
                topRows.forEach((r, i) => { r.style.display = (i >= topRows.length - k) ? '' : 'none'; });
                botRows.forEach((r, i) => { r.style.display = (i < k) ? '' : 'none'; });
                return Math.max(top.firstElementChild.offsetHeight, bot.firstElementChild.offsetHeight);
            };
            const maxK = Math.max(topRows.length, botRows.length);
            let bestK = 0;
            for (let k = 1; k <= maxK; k++) {
                const need = apply(k);
                if (2 * need + mid.offsetHeight + 2 * gap > inner) break;
                bestK = k;
            }
            const need = apply(bestK);
            if (bestK < Math.min(3, maxK) && mode !== 'dense') { homeCenterNextMatch('dense'); return; }
            top.style.minHeight = need + 'px';
            bot.style.minHeight = need + 'px';
            wrap.style.minHeight = inner + 'px';
            sc.scrollTop = 0;
        }

        if (typeof window !== 'undefined' && !window.__homeCenterBound) {
            window.__homeCenterBound = true;
            window.addEventListener('resize', () => homeCenterNextMatch());
        }
        // Sekme değişince de (mobil) ortalamayı yenile
        // ===================== ANA SAYFA SAHA: kartların üst üste binmesini önleyen yerleşim =====================
        // Kartları (foto + mevki + isim) ölçer; çakışanları birbirinden uzaklaştırır, gerekirse hepsini biraz küçültür; saha dışına taşmayı engeller.
        function homeFitPitch(box) {
            const W = box.clientWidth, H = box.clientHeight;
            if (!W || !H) return; // gizli sekmede ölçülemez; görünür olunca yeniden çalışır
            const cards = Array.from(box.querySelectorAll(':scope > .absolute.flex.flex-col'));
            if (!cards.length) return;
            const PAD = 5, GAP = 3;

            const nodes = cards.map(c => {
                if (c.dataset.l0 === undefined) { c.dataset.l0 = c.style.left; c.dataset.t0 = c.style.top; }
                c.style.transform = 'translate(-50%, -50%)'; // ölçmeden önce ölçeği sıfırla
                const img = c.querySelector('img');
                const photoBox = c.firstElementChild;
                let w = 0;
                Array.from(c.children).forEach(ch => { w = Math.max(w, ch.offsetWidth); });
                const up = img && photoBox ? Math.max(0, img.offsetHeight - photoBox.offsetHeight) : 0; // foto kutunun üstüne taşar
                return { c, w, h: c.offsetHeight + up, up, x0: parseFloat(c.dataset.l0) / 100 * W, y0: parseFloat(c.dataset.t0) / 100 * H };
            });

            const solve = (k) => {
                const P = nodes.map(n => ({ w: n.w * k, h: n.h * k, x: n.x0, y: n.y0 }));
                const clamp = (p) => {
                    // Kartın görünür kutusu: merkez yatay, dikeyde (üstten taşan foto dahil) h
                    p.x = Math.min(W - PAD - p.w / 2, Math.max(PAD + p.w / 2, p.x));
                    p.y = Math.min(H - PAD - p.h / 2, Math.max(PAD + p.h / 2, p.y));
                };
                P.forEach(clamp);
                for (let it = 0; it < 80; it++) {
                    let moved = false;
                    for (let i = 0; i < P.length; i++) {
                        for (let j = i + 1; j < P.length; j++) {
                            const a = P[i], b = P[j];
                            const ox = (a.w + b.w) / 2 + GAP - Math.abs(a.x - b.x);
                            const oy = (a.h + b.h) / 2 + GAP - Math.abs(a.y - b.y);
                            if (ox <= 0 || oy <= 0) continue;
                            moved = true;
                            if (oy <= ox) { // dikeyde ayır
                                const s = (a.y === b.y ? (i % 2 ? 1 : -1) : Math.sign(a.y - b.y)) * oy / 2;
                                a.y += s; b.y -= s;
                            } else {
                                const s = (a.x === b.x ? (i % 2 ? 1 : -1) : Math.sign(a.x - b.x)) * ox / 2;
                                a.x += s; b.x -= s;
                            }
                            clamp(a); clamp(b);
                        }
                    }
                    if (!moved) break;
                }
                let clash = false;
                for (let i = 0; i < P.length && !clash; i++) for (let j = i + 1; j < P.length; j++) {
                    const a = P[i], b = P[j];
                    if ((a.w + b.w) / 2 - Math.abs(a.x - b.x) > 0.5 && (a.h + b.h) / 2 - Math.abs(a.y - b.y) > 0.5) { clash = true; break; }
                }
                return { P, clash };
            };

            let res = null, kUsed = 1;
            for (let k = 1; k >= 0.5; k -= 0.05) {
                res = solve(k); kUsed = k;
                if (!res.clash) break;
            }
            nodes.forEach((n, i) => {
                const p = res.P[i];
                // p.y görünür kutunun merkezi; kartın kendi merkezi üstten taşan fotoyu çıkarınca aşağıdadır
                const cy = p.y + (n.up * kUsed) / 2;
                n.c.style.left = p.x + 'px';
                n.c.style.top = cy + 'px';
                n.c.style.transform = `translate(-50%, -50%) scale(${kUsed.toFixed(3)})`;
            });
        }

        function homeFitPitches() {
            document.querySelectorAll('.home-pitch-container').forEach(box => {
                homeFitPitch(box);
                if (typeof ResizeObserver !== 'undefined') {
                    if (!window.__homePitchRO) window.__homePitchRO = new ResizeObserver(es => es.forEach(e => homeFitPitch(e.target)));
                    window.__homePitchRO.observe(box); // panel boyutu değişince (pencere, sekme, yan menü) yeniden yerleştirir
                }
            });
            document.querySelectorAll('.home-xi-container').forEach(box => {
                homeFitXI(box);
                if (typeof ResizeObserver !== 'undefined') {
                    if (!window.__homeXiRO) window.__homeXiRO = new ResizeObserver(es => es.forEach(e => homeFitXI(e.target)));
                    window.__homeXiRO.observe(box);
                }
            });
        }

        function switchHomeTab(tabId) {
            switchHomeTabV6(tabId);
            homeFitPitches();
            requestAnimationFrame(homeFitPitches);
        }

        function switchHomeTabV6(tabId) {
            switchHomeTabBase(tabId);
            homeCenterNextMatch();
            requestAnimationFrame(homeCenterNextMatch);
        }

        function renderHomeFixtures(context) {
            const matches = homeGetFilteredMatches(context);
            const hasScore = (m) => m.homeScore !== '' && m.homeScore !== null && m.homeScore !== undefined && m.awayScore !== '' && m.awayScore !== null && m.awayScore !== undefined;
            const played = matches.filter(hasScore);
            const upcoming = matches.filter(m => !hasScore(m));

            // Sınır yok: tüm geçmiş ve gelecek maçlar çizilir, sığmayanlar homeCenterNextMatch ile gizlenir
            const pastList = played;
            const nextMatch = upcoming[0] || null;
            const futureList = upcoming.slice(1);

            const clubName = managedTeams.kulup.name || '';
            const nationalName = managedTeams.milli.name || '';
            const isOurTeam = (name) => name === clubName || name === nationalName;

            const resBadge = (res, sizeCls, glow, title) => {
                const bgClass = res === 'W' ? 'bg-emerald-500' : (res === 'D' ? 'bg-yellow-500' : 'bg-red-500');
                return `<span class="flex items-center justify-center shrink-0 rounded font-black text-white ${sizeCls} ${bgClass} ${glow}" title="${escapeHtml(title)}">${res}</span>`;
            };

            const renderMatchRow = (m, highlight) => {
                const homeLogo = getTeamLogoByName(m.home);
                const awayLogo = getTeamLogoByName(m.away);
                const hs = hasScore(m) ? m.homeScore : '-';
                const as = hasScore(m) ? m.awayScore : '-';
                const tourLogo = getCompetitionLogo(m.tournament);
                const tourHtml = tourLogo
                    ? `<img src="${tourLogo}" alt="${escapeHtml(m.tournament || '')}" title="${escapeHtml(m.tournament || '')}" class="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0">`
                    : `<span class="text-[10px] text-slate-400 truncate min-w-0 max-w-[90px] sm:max-w-[130px]" title="${escapeHtml(m.tournament || '')}">${escapeHtml(m.tournament || '')}</span>`;

                let resultClass = '';
                let ownLetter = '';

                if (hasScore(m)) {
                    const hsNum = parseInt(m.homeScore), asNum = parseInt(m.awayScore);
                    if (!isNaN(hsNum) && !isNaN(asNum)) {
                        if (isOurTeam(m.home)) ownLetter = hsNum > asNum ? 'W' : (hsNum < asNum ? 'L' : 'D');
                        else if (isOurTeam(m.away)) ownLetter = asNum > hsNum ? 'W' : (asNum < hsNum ? 'L' : 'D');
                        if (ownLetter) resultClass = `frow-${ownLetter}`;
                    }
                }

                const oppName = isOurTeam(m.home) ? m.away : m.home;
                const h2hMatches = played.filter(pm => (pm.home === oppName || pm.away === oppName) && pm.id !== m.id).slice(-3).reverse();

                // Bu satırdaki maçın kendi sonucu (oynandıysa) — rozetlerin en solunda
                const ownHtml = ownLetter
                    ? resBadge(ownLetter, 'w-4 h-4 sm:w-5 sm:h-5 text-[8px] sm:text-[10px]', 'shadow-sm', `${m.homeScore}-${m.awayScore}`)
                    : '';

                let h2hHtml = '';
                if (h2hMatches.length > 0) {
                    const badges = h2hMatches.map((hm, idx) => {
                        const h_isUsHome = isOurTeam(hm.home);
                        const h_hs = parseInt(hm.homeScore);
                        const h_as = parseInt(hm.awayScore);
                        let res = 'D';
                        if (h_isUsHome) {
                            if (h_hs > h_as) res = 'W';
                            else if (h_hs < h_as) res = 'L';
                        } else {
                            if (h_as > h_hs) res = 'W';
                            else if (h_as < h_hs) res = 'L';
                        }

                        let badgeGlow = 'shadow-sm';
                        if (idx === 0) {
                            if (res === 'W') badgeGlow = 'shadow-[0_0_8px_rgba(16,185,129,0.9)] scale-110 z-10 border border-white/50';
                            else if (res === 'D') badgeGlow = 'shadow-[0_0_8px_rgba(234,179,8,0.9)] scale-110 z-10 border border-white/50';
                            else if (res === 'L') badgeGlow = 'shadow-[0_0_8px_rgba(239,68,68,0.9)] scale-110 z-10 border border-white/50';
                        }
                        return resBadge(res, 'w-3 h-3 sm:w-4 sm:h-4 text-[7px] sm:text-[9px]', badgeGlow, `${hm.season} | ${hm.homeScore}-${hm.awayScore}`);
                    }).join('');
                    h2hHtml = `<div class="flex items-center justify-start gap-1 sm:gap-1.5 ${ownHtml ? 'pl-1.5 sm:pl-2 border-l border-slate-600/60' : ''}">${badges}</div>`;
                }

                const badgesHtml = (ownHtml || h2hHtml)
                    ? `<div class="flex items-center justify-start gap-1.5 sm:gap-2">${ownHtml}${h2hHtml}</div>`
                    : '<div></div>';

                const borderClass = highlight
                    ? 'shadow-[0_0_15px_rgba(16,185,129,0.4)] border-emerald-500/60 relative z-10'
                    : 'border-slate-700/50';
                // Sıradaki Maç satırı eski yüksekliğini korur; geçmiş/gelecek satırlar logolar küçülmeden daralır
                const padClass = highlight ? 'px-2 py-1.5 sm:px-3 sm:py-2' : 'px-2 py-0.5 sm:px-3 sm:py-0.5';

                const abbr = getRoundAbbr(m.round);
                const glowingPhases = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'R1', 'R2', 'R3', 'R4', 'R5', 'L32', 'L16', 'QF', 'SF', 'F', '3rd', 'PO'];
                const badgeStyle = glowingPhases.includes(abbr)
                    ? 'text-amber-300 bg-amber-900/30 border-amber-600/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                    : 'text-slate-300 bg-slate-800/60 border-slate-700/30 shadow-sm';

                const roundHtml = m.round ? `<span class="inline-flex items-center text-[7px] sm:text-[8px] font-bold rounded px-1 sm:px-1.5 py-[2px] sm:py-[3px] ml-1 sm:ml-1.5 tracking-widest uppercase whitespace-nowrap border shrink-0 ${badgeStyle}" title="${escapeHtml(m.round)}">${escapeHtml(abbr)}</span>` : '';

                return `<div ${highlight ? '' : 'data-hxrow="1"'} onclick="qfbOpenMatch('${m.season}','${m.id}')" class="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-6 ${resultClass || 'bg-slate-900/60'} hover:brightness-125 cursor-pointer border ${borderClass} rounded-lg ${padClass} transition-all" title="Skor / gol-asist girmek için tıklayın">
            <div class="flex items-center justify-start gap-1 sm:gap-2 min-w-0">
                ${tourHtml}
                ${roundHtml}
            </div>
            <div class="flex items-center justify-center gap-2 sm:gap-3">
                <img src="${homeLogo}" class="${highlight ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-5 h-5 sm:w-6 sm:h-6'} object-contain">
                <span class="score-display ${resultClass ? 'score-' + resultClass.replace('frow-', '') : 'text-white'} text-sm sm:text-base font-black w-10 sm:w-14 text-center">${hs}:${as}</span>
                <img src="${awayLogo}" class="${highlight ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-5 h-5 sm:w-6 sm:h-6'} object-contain">
            </div>
            ${badgesHtml}
        </div>`;
            };

            const h5 = () => '';
            const empty = (text) => `<div class="text-center text-slate-500 text-xs py-2">${text}</div>`;

            // Üst blok alta yaslı, alt blok üste yaslı; ikisi eşitlenince Sıradaki Maç tam ortada kalır (bkz. homeCenterNextMatch)
            return `<div data-hx="wrap" class="flex flex-col gap-1 sm:gap-2">
                <div data-hx="top" class="flex-1 flex flex-col justify-end"><div>
                    ${h5('text-slate-400', 'Son Maçlar')}
                    <div class="flex flex-col gap-1">${pastList.length ? pastList.map(m => renderMatchRow(m, false)).join('') : empty('Oynanmış maç yok.')}</div>
                </div></div>
                <div data-hx="mid">
                    ${h5('text-emerald-400', 'Sıradaki Maç')}
                    <div class="flex flex-col gap-1.5">${nextMatch ? renderMatchRow(nextMatch, true) : empty('Planlanmış maç yok.')}</div>
                </div>
                <div data-hx="bot" class="flex-1 flex flex-col justify-start"><div>
                    ${h5('text-slate-400', 'Sonraki Maçlar')}
                    <div class="flex flex-col gap-1">${futureList.length ? futureList.map(m => renderMatchRow(m, false)).join('') : empty('Planlanmış maç yok.')}</div>
                </div></div>
            </div>`;
        }

        let homeActiveTab = 'maclar';

        // ===================== ANA SAYFA: 6 PANELLİ DÜZEN =====================
        let homeSquadSub = 'astakim';   // Kulüp kadrosu alt seçimi: 'astakim' (Ana Takım) | 'akademi' (Altyapı)
        let homeLeagueTourId = null;    // Lig Tablosu panelinde seçili turnuva (null = otomatik seç)
        const HOME_TABS = ['kadro', 'ilk11', 'maclar', 'goller', 'lig', 'turnuva'];
        const HOME_KO_TYPES = ['UEFA Şampiyonlar Ligi', 'UEFA Avrupa Ligi', 'UEFA Konferans Ligi', 'Dünya Kupası', 'UEFA Avrupa Şampiyonası', 'Türkiye Kupası'];

        function setHomeSquadSub(sub) { homeSquadSub = sub; renderHomePanel(); }
        function setHomeLeagueTour(id) { homeLeagueTourId = id || null; renderHomePanel(); }

        function homeIsEn() { return typeof currentLang !== 'undefined' && currentLang === 'en'; }

        function homeOurTeamName() {
            const t = homeGlobalContext === 'milli' ? managedTeams.milli : managedTeams.kulup;
            return ((t && t.name) || '').trim().toLowerCase();
        }

        function homeSameTeam(a, b) {
            return !!a && !!b && String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
        }

        function switchHomeTabBase(tabId) {
            homeActiveTab = tabId;
            HOME_TABS.forEach(id => {
                const btn = document.getElementById('htab-' + id);
                const content = document.getElementById('hcontent-' + id);
                if (!btn || !content) return;

                if (id === tabId) {
                    btn.className = 'flex-1 min-w-0 px-2 py-3 text-base bg-slate-900 text-emerald-400 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center';
                    content.classList.remove('hidden');
                    content.classList.add('flex');
                } else {
                    btn.className = 'flex-1 min-w-0 px-2 py-3 text-base bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer';
                    content.classList.add('hidden');
                    content.classList.remove('flex');
                }
            });
        }

        // --- Panel başlığı: masaüstü + mobil başlık çifti ---
        function homeHeaderHtml(iconHtml, titleHtml, rightHtml, mobileTitleHtml) {
            const right = rightHtml || '';
            return `
                <div class="hidden xl:flex bg-slate-800 border-b border-slate-700 px-3 h-10 shrink-0 justify-between items-center flex-nowrap gap-2">
                    <h4 class="text-sm font-bold text-white">${iconHtml}${titleHtml}</h4>
                    ${right}
                </div>
                <div class="xl:hidden bg-slate-800/50 border-b border-slate-700 p-2 shrink-0 flex justify-between items-center gap-2">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">${mobileTitleHtml || titleHtml}</span>
                    ${right}
                </div>`;
        }

        // --- 1) KADRO PANELİ ---

        // ===================== ANA SAYFA: KADRO (11 + YEDEK + REZERV) VE GOL KRALLARI DETAYI =====================
        const HOME_POS_ORDER = ['GK', 'CB', 'LB', 'RB', 'DM', 'CM', 'LM', 'RM', 'AM', 'LW', 'RW', 'ST'];
        const HOME_POS_ALIAS = { CDM: 'DM', CAM: 'AM', CF: 'ST', LWB: 'LB', RWB: 'RB', SS: 'ST', LF: 'LW', RF: 'RW' };
        let homeSquadEdit = false;          // Kadro panelinde düzenleme modu
        let homeScorerOpen = new Set();     // Gol kralları panelinde açık (detaylı) oyuncular
        let homeScorerShown = [];           // Son çizimde listelenen oyuncu adları

        function homePosCanon(pos) {
            const p = String(pos || '').trim().toUpperCase();
            return HOME_POS_ALIAS[p] || p;
        }
        function homePosRank(pos) {
            const i = HOME_POS_ORDER.indexOf(homePosCanon(pos));
            return i === -1 ? 99 : i;
        }
        function homeLineupCtx() { return homeGlobalContext === 'milli' ? 'milli' : homeSquadSub; }

        function homeEnsureIlk11(fctx) {
            if (!formations) formations = {};
            if (!formations[fctx] || typeof formations[fctx] !== 'object') formations[fctx] = { ilk11: null, yedek: null, rezerv: null };
            if (!Array.isArray(formations[fctx].ilk11)) formations[fctx].ilk11 = JSON.parse(JSON.stringify(defaultFormationFor(fctx)));
            return formations[fctx].ilk11;
        }

        function homeKeepScroll(panelId) {
            const sel = '#' + panelId + ' .overflow-y-auto';
            const el = document.querySelector(sel);
            const st = el ? el.scrollTop : 0;
            renderHomePanel();
            const el2 = document.querySelector(sel);
            if (el2) el2.scrollTop = st;
        }

        function homeToggleSquadEdit() { homeSquadEdit = !homeSquadEdit; renderHomePanel(); }
        function homeSetSlotPos(i, pos) {
            const arr = homeEnsureIlk11(homeLineupCtx());
            if (!arr[i]) return;
            arr[i].pos = homePosCanon(pos);
            saveToLocalStorage();
            homeKeepScroll('hcontent-kadro');
        }
        function homeSetSlotPlayer(i, name) {
            const arr = homeEnsureIlk11(homeLineupCtx());
            if (!arr[i]) return;
            arr[i].name = name || '';
            if (!arr[i].pos) arr[i].pos = 'CM';
            saveToLocalStorage();
            homeKeepScroll('hcontent-kadro');
        }

        function homeSquadEditBtn() {
            const on = homeSquadEdit;
            return `<button onclick="event.stopPropagation(); homeToggleSquadEdit()" title="${on ? 'Düzenlemeyi Bitir' : 'Kadroyu Düzenle'}" class="w-7 h-7 shrink-0 rounded-full border text-[11px] flex items-center justify-center transition-colors ${on ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'}"><i class="fa-solid ${on ? 'fa-check' : 'fa-pen'}"></i></button>`;
        }


        function homeSortLineup(items, fctx) {
            return items.map(n => ({ n, cur: getPlayerCurrentStatsByName(n.name, fctx) }))
                .sort((a, b) => {
                    const r = homePosRank(a.n.pos) - homePosRank(b.n.pos);
                    if (r !== 0) return r;
                    const o = (parseInt(b.cur.ovr) || 0) - (parseInt(a.cur.ovr) || 0);
                    if (o !== 0) return o;
                    return String(a.n.name).localeCompare(String(b.n.name), 'tr');
                }).map(x => x.n);
        }

        function renderHomeSquadEditor(fctx) {
            const arr = homeEnsureIlk11(fctx);
            const pool = (fctx === 'milli' ? (squadData.milli || []) : fctx === 'akademi' ? (squadData.akademi || []) : [...(squadData.astakim || []), ...(squadData.akademi || [])]).filter(p => p && p.name);
            const players = pool.map(p => ({ name: p.name, pos: p.pos || '', ovr: getPlayerCurrentStatsByName(p.name, fctx).ovr }))
                .sort((a, b) => (parseInt(b.ovr) || 0) - (parseInt(a.ovr) || 0) || a.name.localeCompare(b.name, 'tr'));
            const used = (i) => new Set(arr.map((n, j) => (j !== i && n.name) ? n.name.trim().toLowerCase() : null).filter(Boolean));

            const rows = arr.map((node, i) => {
                const cp = homePosCanon(node.pos);
                const posOpts = HOME_POS_ORDER.map(p => `<option value="${p}" ${cp === p ? 'selected' : ''}>${p}</option>`).join('');
                const taken = used(i);
                const nm = (node.name || '').trim().toLowerCase();
                const plOpts = `<option value="">Seç</option>` + players.map(p => {
                    const dis = taken.has(p.name.trim().toLowerCase());
                    const sel = nm && nm === p.name.trim().toLowerCase();
                    return `<option value="${escapeHtml(p.name)}" ${sel ? 'selected' : ''} ${dis ? 'disabled' : ''}>${escapeHtml(p.name)} · ${escapeHtml(homePosCanon(p.pos) || '-')} ${p.ovr !== null && p.ovr !== undefined && p.ovr !== '' ? escapeHtml(String(p.ovr)) : ''}</option>`;
                }).join('');
                return `<div class="flex items-center gap-1.5 shrink-0">
                    <span class="w-4 text-center text-[10px] font-black text-slate-500">${i + 1}</span>
                    <select onchange="homeSetSlotPos(${i}, this.value)" class="pos-${escapeHtml(cp)} w-16 shrink-0 bg-slate-950 border border-slate-700 text-[11px] font-black rounded p-1 outline-none focus:border-emerald-500">${posOpts}</select>
                    <select onchange="homeSetSlotPlayer(${i}, this.value)" class="flex-1 min-w-0 bg-slate-950 border border-slate-700 text-[11px] text-white rounded p-1 outline-none focus:border-emerald-500">${plOpts}</select>
                </div>`;
            }).join('');
            return `<div class="flex flex-col gap-1.5">${rows}</div>`;
        }

                // ===================== KADRO v3: modern rozetler (yaş: küçük pill, OVR: yuvarlak) + masaüstünde 2 sütun =====================
        // ---- Modern rozetler: yaş = yumuşak tonlu etiket, OVR = ilerleme halkası ----
        function mbOvrColor(o) {
            const n = parseInt(o) || 0;
            return n >= 95 ? '#6d8cff' : n >= 90 ? '#3b82f6' : n >= 85 ? '#22c55e' : n >= 80 ? '#4ade80' : n >= 75 ? '#a3e635'
                : n >= 70 ? '#facc15' : n >= 65 ? '#fb923c' : n >= 60 ? '#f26a2e' : n >= 55 ? '#ef4444' : n >= 50 ? '#f87171' : '#a78bfa';
        }
        function mbAge(age) {
            if (age === null || age === undefined || age === '') return '<span class="text-[9px] font-bold text-slate-600">-</span>';
            return `<span class="mb-age" style="--c:${getAgeColor(age)}" title="Yaş">${escapeHtml(String(age))}</span>`;
        }
        function mbOvr(ovr, small) {
            if (ovr === null || ovr === undefined || ovr === '') return '<span class="text-[10px] font-bold text-slate-600">-</span>';
            const n = Math.max(0, Math.min(100, parseInt(ovr) || 0));
            return `<span class="mb-ovr${small ? ' sm' : ''}" style="--c:${mbOvrColor(ovr)};--v:${n}" title="OVR"><i></i><b>${escapeHtml(String(ovr))}</b></span>`;
        }

        function homeBadgeStyle(color) {
            const hex = String(color).replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
            // Sayı rengi her zaman siyah; siyahın okunması için koyu zeminler biraz açılır
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const k = lum < 0.36 ? 0.5 : 0;
            const mix = (v) => Math.round(v + (255 - v) * k);
            const bg = k ? `rgb(${mix(r)},${mix(g)},${mix(b)})` : color;
            const fg = '#000000';
            return `background-color:${bg};color:${fg};box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 1px 3px rgba(0,0,0,.5)`;
        }
        function homeAgeBadge(age) {
            return `<span class="w-6 shrink-0 flex justify-center">${mbAge(age)}</span>`;
            if (age === null || age === undefined || age === '') return '<span class="w-6 shrink-0 text-center text-[9px] font-bold text-slate-600">-</span>';
            return `<span class="w-6 shrink-0 flex justify-center"><span class="w-5 h-[15px] rounded-md flex items-center justify-center text-[9px] font-black tabular-nums leading-none" style="${homeBadgeStyle(getAgeColor(age))}">${escapeHtml(String(age))}</span></span>`;
        }
        function homeOvrBadge(ovr) {
            return `<span class="w-7 shrink-0 flex justify-center">${mbOvr(ovr)}</span>`;
            if (ovr === null || ovr === undefined || ovr === '') return '<span class="w-7 shrink-0 text-center text-[10px] font-bold text-slate-600">-</span>';
            return `<span class="w-7 shrink-0 flex justify-center"><span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black tabular-nums leading-none ring-2 ring-slate-900/80" style="${homeBadgeStyle(getOvrColor(ovr))}">${escapeHtml(String(ovr))}</span></span>`;
        }

        function homeSquadRowHtml(name, pos, fctx, grow) {
            const cur = getPlayerCurrentStatsByName(name, fctx);
            const photo = getPlayerPhotoByName(name);
            const canon = homePosCanon(pos);
            const photoHtml = photo
                ? `<img src="${photo}" class="w-5 h-5 rounded-full object-cover shrink-0">`
                : `<div class="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold shrink-0">${escapeHtml((name || '?').charAt(0))}</div>`;
            const sizeCls = grow ? 'flex-1 basis-0 min-h-[28px] max-h-[40px]' : 'min-h-[28px] py-0.5';
            return `<div class="${sizeCls} flex items-center gap-1.5 bg-slate-900/60 border border-slate-700/50 rounded-md px-1.5">
                <span class="pos-${escapeHtml(canon)} w-8 shrink-0 text-center bg-slate-950/90 font-black rounded border border-slate-700 text-[9px] leading-[14px]">${escapeHtml(canon || '-')}</span>
                ${photoHtml}
                <span class="flex-1 min-w-0 text-[11px] sm:text-xs font-bold text-white truncate text-left" title="${escapeHtml(name)}">${escapeHtml(homeShortName(name))}</span>
                ${homeAgeBadge(cur.age)}
                ${homeOvrBadge(cur.ovr)}
            </div>`;
        }

        function renderHomeSquad(ctx) {
            const fctx = homeLineupCtx();
            if (homeSquadEdit) return renderHomeSquadEditor(fctx);

            const f = (formations && formations[fctx]) ? formations[fctx] : {};
            const named = (list) => (Array.isArray(list) ? list : []).filter(n => n && n.name);
            const starters = homeSortLineup(named(f.ilk11), fctx);
            const subs = homeSortLineup(named(f.yedek), fctx);
            const reserves = homeSortLineup(named(f.rezerv), fctx);

            if (starters.length === 0) {
                return '<div class="text-center text-slate-500 text-sm py-6">İlk 11 henüz seçilmedi.<br><span class="text-xs">Sağ üstteki kalem simgesine tıklayarak oyuncuları ve mevkileri seçin.</span></div>';
            }

            const head = (title) => `<div class="shrink-0 flex items-center gap-1.5 px-1.5 mb-1 text-[9px] font-bold leading-none">
                <span class="flex-1 uppercase tracking-widest text-slate-400">${title}</span>
                <span class="w-6 text-center text-slate-400">Yaş</span><span class="w-7 text-center text-emerald-400">OVR</span>
            </div>`;
            const empty = '<div class="text-center text-slate-600 text-[10px] py-1">Henüz oyuncu seçilmedi.</div>';
            const section = (title, list, mt) => `
                <div class="${mt}">
                    ${head(title)}
                    <div class="flex flex-col gap-1">${list.length ? list.map(n => homeSquadRowHtml(n.name, n.pos, fctx, false)).join('') : empty}</div>
                </div>`;

            const left = `<div class="flex flex-col xl:min-h-0">
                ${head(fctx === 'akademi' ? 'İlk 5' : 'İlk 11')}
                <div class="flex flex-col gap-[3px] flex-1">${starters.map(n => homeSquadRowHtml(n.name, n.pos, fctx, true)).join('')}</div>
            </div>`;
            const right = `<div class="mt-3 xl:mt-0 xl:overflow-y-auto hide-scrollbar xl:min-h-0">
                ${section('Yedek Oyuncular', subs, '')}
                ${section('Rezerv Oyuncular', reserves, 'mt-3')}
            </div>`;
            return `<div class="xl:grid xl:grid-cols-2 xl:gap-4 xl:h-full">${left}${right}</div>`;
        }

        // ---------- GOL KRALLARI: MAÇ BAZLI DETAY ----------

        function homeScorerDetails(name, season, context) {
            const t = context === 'milli' ? managedTeams.milli : managedTeams.kulup;
            const ourName = ((t && t.name) || '').trim();
            const key = String(name || '').trim().toLowerCase();
            const goals = [], assists = [];
            ((fixtureData && fixtureData[season]) || []).forEach(m => {
                if (ourName && !(homeSameTeam(m.home, ourName) || homeSameTeam(m.away, ourName))) return;
                (m.events || []).forEach(ev => {
                    if (!ev || ev.type !== 'US') return;
                    if (String(ev.scorer || '').trim().toLowerCase() === key) goals.push({ m, ev });
                    if (String(ev.assist || '').trim().toLowerCase() === key) assists.push({ m, ev });
                });
            });
            return { goals, assists, ourName };
        }

        // ===================== GOL KRALLARI: SOLDA GOLLER, SAĞDA ASİSTLER =====================
        let homeStatsMobileTab = 'goal';            // Mobilde görünen sütun: 'goal' | 'assist'
        let homeStatsOpen = new Set();              // Açık oyuncu satırları: 'goal|Ad' veya 'assist|Ad'
        let homeStatsShown = { goal: [], assist: [] };

        function homeSetStatsTab(kind) { homeStatsMobileTab = kind; renderHomePanel(); }

        function homeStatsMobileToggle() {
            const b = (k, icon, title) => `<button onclick="event.stopPropagation(); homeSetStatsTab('${k}')" title="${title}" class="w-8 h-6 rounded-full text-[11px] flex items-center justify-center transition-colors ${homeStatsMobileTab === k ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}"><i class="fa-solid ${icon}"></i></button>`;
            return `<div class="xl:hidden flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shrink-0">${b('goal', 'fa-futbol', 'Gol')}${b('assist', 'fa-shoe-prints', 'Asist')}</div>`;
        }

        function homeToggleStatRow(kind, enc) {
            const k = kind + '|' + decodeURIComponent(enc);
            if (homeStatsOpen.has(k)) homeStatsOpen.delete(k); else homeStatsOpen.add(k);
            homeKeepScroll('hcontent-goller');
        }
        function homeToggleStatCol(kind) {
            const names = homeStatsShown[kind] || [];
            const all = names.length > 0 && names.every(n => homeStatsOpen.has(kind + '|' + n));
            names.forEach(n => { if (all) homeStatsOpen.delete(kind + '|' + n); else homeStatsOpen.add(kind + '|' + n); });
            homeKeepScroll('hcontent-goller');
        }

        function homeStatDetailRow(kind, item, ourName) {
            const m = item.m, ev = item.ev;
            const isHome = !ourName || homeSameTeam(m.home, ourName);
            const opp = isHome ? m.away : m.home;
            const hs = m.homeScore, as = m.awayScore;
            const hasScore = [hs, as].every(v => v !== '' && v !== null && v !== undefined);
            const ours = isHome ? hs : as, theirs = isHome ? as : hs;
            let resCls = 'text-slate-400';
            if (hasScore) resCls = (+ours > +theirs) ? 'text-emerald-400' : ((+ours < +theirs) ? 'text-red-400' : 'text-amber-300');
            const tLogo = (typeof getCompetitionLogo === 'function') ? getCompetitionLogo(m.tournament) : '';
            const tAbbr = (typeof getTournamentAbbr === 'function') ? getTournamentAbbr(m.tournament) : (m.tournament || '');
            const roundAbbr = (m.round && typeof getRoundAbbr === 'function') ? getRoundAbbr(m.round) : '';
            const tip = [m.tournament, m.round].filter(Boolean).join(' · ');
            const tHtml = tLogo
                ? `<img src="${tLogo}" alt="" class="w-4 h-4 object-contain shrink-0" title="${escapeHtml(tip)}">`
                : `<span class="text-[8px] font-black text-slate-300 bg-slate-800 border border-slate-700 rounded px-1 shrink-0" title="${escapeHtml(tip)}">${escapeHtml(tAbbr || '-')}</span>`;
            const rHtml = `<span class="w-4 shrink-0 text-center text-[8px] font-bold text-amber-300 whitespace-nowrap">${roundAbbr ? escapeHtml(roundAbbr) : ''}</span>`;
            // Gol satırında asisti, asist satırında golü atanı ikinci satırda göster
            const otherName = kind === 'goal' ? ev.assist : ev.scorer;
            const otherHtml = otherName
                ? `<div class="pl-8 text-[9px] font-bold truncate ${kind === 'goal' ? 'text-blue-400' : 'text-emerald-400'}"><i class="fa-solid ${kind === 'goal' ? 'fa-shoe-prints' : 'fa-futbol'} text-[8px] mr-1"></i>${escapeHtml(formatShortPlayerName(otherName))}</div>`
                : '';
            return `<div class="px-1 py-0.5 min-w-0">
                <div class="flex items-center gap-1.5 text-[10px] sm:text-[11px] min-w-0">
                    <span class="w-7 shrink-0 text-right font-mono text-slate-300">${ev.min ? escapeHtml(String(ev.min)) + "'" : '-'}</span>
                    ${tHtml}${rHtml}
                    <img src="${getTeamLogoByName(opp)}" alt="" class="w-4 h-4 object-contain shrink-0">
                    <span class="flex-1 min-w-0 truncate text-left text-slate-300" title="${escapeHtml(opp)}">${escapeHtml(opp || '-')}</span>
                    <span class="font-black shrink-0 ${resCls}">${hasScore ? escapeHtml(String(ours)) + '-' + escapeHtml(String(theirs)) : '-'}</span>
                </div>
            </div>`;
        }

        // ===================== GOL KRALLARI: TURNUVA SÜTUNLARI + TOPLAM =====================
        function homeTourInitials(t) {
            if (typeof getTournamentAbbr === 'function') {
                const a = getTournamentAbbr(t);
                if (a) return String(a).slice(0, 4);
            }
            const w = String(t || '').trim().split(/\s+/).filter(Boolean);
            const s = (w.length > 1 ? w.map(x => x[0]).join('') : String(t || '').slice(0, 3)).toUpperCase().slice(0, 4);
            return s || '-';
        }

        // ===================== GOL KRALLARI: GENİŞ TEK SÜTUN İÇİN DÜZEN (isim sabit genişlik, sütunlar eşit dağılır, büyük sayılar) =====================

        // ===================== GOL KRALLARI: SIKI MASAÜSTÜ DÜZENİ ("S. Lavery" isimleri, yakın sayı sütunları, küçük ölçek) =====================
        function homeShortName(name) {
            const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
            if (!parts.length) return '';
            if (parts.length === 1) return parts[0];
            let last = parts[parts.length - 1];
            if (last.length > 1 && (last === last.toUpperCase() || /\p{Lu}{3,}/u.test(last))) {
                last = last.toLowerCase().replace(/(^|[-'\u2019])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/^(Mc|Mac(?=\p{L}{4}))(\p{L})/u, (m, a, b) => a + b.toUpperCase());
            }
            return parts[0].charAt(0).toUpperCase() + '. ' + last;
        }

        function homeTourHeadCell3(t) {
            const logo = (typeof getCompetitionLogo === 'function') ? getCompetitionLogo(t) : '';
            const inner = logo
                ? `<img src="${logo}" alt="" class="w-5 h-5 xl:w-3.5 xl:h-3.5 object-contain">`
                : `<span class="text-[9px] sm:text-[10px] xl:text-[7px] font-black text-slate-300 bg-slate-800 border border-slate-700 rounded px-1 xl:px-0.5 leading-[14px] xl:leading-[11px] whitespace-nowrap">${escapeHtml(homeTourInitials(t))}</span>`;
            return `<span class="flex-1 xl:flex-none xl:w-[15px] xl:shrink xl:min-w-[11px] xl:border-l xl:border-slate-700/25 min-w-0 flex items-center justify-center overflow-hidden" title="${escapeHtml(t || '-')}">${inner}</span>`;
        }

        function homeStatColumn(kind, players, season, context) {
            const isGoal = kind === 'goal';
            const field = isGoal ? 'goals' : 'assists';
            const otherField = isGoal ? 'assists' : 'goals';
            const accent = isGoal ? 'text-emerald-400' : 'text-blue-400';
            const icon = isGoal ? 'fa-futbol' : 'fa-shoe-prints';

            const rows = players.filter(p => p[field] > 0)
                .sort((a, b) => (b[field] - a[field]) || (b[otherField] - a[otherField]) || String(a.name).localeCompare(String(b.name), 'tr'));
            homeStatsShown[kind] = rows.map(p => p.name);
            const allOpen = rows.length > 0 && rows.every(p => homeStatsOpen.has(kind + '|' + p.name));
            const vis = homeStatsMobileTab === kind ? 'flex' : 'hidden';
            const borderCls = isGoal ? 'xl:border-r xl:border-slate-700/25 xl:pr-2' : 'xl:pl-2';

            // Her oyuncunun turnuva bazlı gol/asist dağılımı (fikstürdeki olaylardan)
            const detByName = {};
            const present = new Set();
            rows.forEach(p => {
                const d = homeScorerDetails(p.name, season, context);
                const counts = {};
                (isGoal ? d.goals : d.assists).forEach(it => {
                    const t = it.m.tournament || '';
                    counts[t] = (counts[t] || 0) + 1;
                    present.add(t);
                });
                detByName[p.name] = { d, counts };
            });
            const tours = [];
            ((fixtureData && fixtureData[season]) || []).forEach(m => {
                const t = m.tournament || '';
                if (present.has(t) && !tours.includes(t)) tours.push(t);
            });

            // ===== TASARIM 4: Lider kartı + 2 sütun mozaik, renkli turnuva rozetleri =====
            const palette = ['#38bdf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c', '#2dd4bf', '#f87171'];
            const tColor = {};
            tours.forEach((t, i) => { tColor[t] = palette[i % palette.length]; });
            const unit = isGoal ? 'gol' : 'asist';
            const accHex = isGoal ? '#fbbf24' : '#60a5fa';

            // Takımın bu turnuvadaki toplam gol/asisti; tile rozetleri artan sırada (en çok olan en sağda)
            const tourTotal = {};
            tours.forEach(t => { tourTotal[t] = rows.reduce((a, p) => a + (detByName[p.name].counts[t] || 0), 0); });
            const toursAsc = tours.map((t, i) => [t, i]).sort((a, b) => (tourTotal[a[0]] - tourTotal[b[0]]) || (b[1] - a[1])).map(x => x[0]);
            const chipsHtml = (info, big, order) => (order || tours).filter(t => info.counts[t]).map(t => {
                const n = info.counts[t], c = tColor[t];
                return `<span class="inline-flex items-center justify-center rounded-md font-bold leading-none ${big ? 'min-w-[22px] h-[20px] px-1.5 text-[12px]' : 'min-w-[17px] h-[15px] px-1 text-[10px]'}" style="color:${c};background:color-mix(in srgb, ${c} 16%, transparent)" title="${escapeHtml((t || '-') + ' — ' + n + ' ' + unit)}">${n}</span>`;
            }).join('');

            const legendHtml = tours.length ? `<div class="flex items-center gap-1.5 flex-wrap justify-end min-w-0">${tours.map(t => {
                const logo = (typeof getCompetitionLogo === 'function') ? getCompetitionLogo(t) : '';
                const mark = logo ? `<img src="${logo}" alt="" class="w-3.5 h-3.5 object-contain">` : `<span class="text-[8px] font-black text-slate-400">${escapeHtml(homeTourInitials(t))}</span>`;
                return `<span class="inline-flex items-center gap-1 px-1 py-0.5 rounded-md" style="background:color-mix(in srgb, ${tColor[t]} 12%, transparent)" title="${escapeHtml(t || '-')}"><i class="w-1.5 h-1.5 rounded-full inline-block" style="background:${tColor[t]}"></i>${mark}</span>`;
            }).join('')}</div>` : '';

            const head = `<div class="flex items-center justify-between gap-2 px-1 pb-2">
                <div class="flex items-center gap-1.5 shrink-0">
                    <span class="${accent} text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap" style="color:${accHex}"><i class="fa-solid ${icon} mr-1"></i>${isGoal ? 'Gol' : 'Asist'}</span>
                    <button onclick="homeToggleStatCol('${kind}')" title="Tümünü Aç / Kapat" class="text-[10px] text-slate-400 hover:text-white transition-colors"><i class="fa-solid ${allOpen ? 'fa-angles-up' : 'fa-angles-down'}"></i></button>
                </div>
                ${legendHtml}
            </div>`;

            const photoOf = (p, size, radius) => p.photoUrl
                ? `<img src="${p.photoUrl}" class="${size} ${radius} object-cover shrink-0">`
                : `<div class="${size} ${radius} bg-slate-700 flex items-center justify-center font-bold text-slate-300 shrink-0">${escapeHtml((p.name || '?').charAt(0))}</div>`;

            const detailOf = (p, info) => {
                const items = isGoal ? info.d.goals : info.d.assists;
                const missing = Math.max(0, p[field] - items.length);
                const inner = items.map(it => homeStatDetailRow(kind, it, info.d.ourName)).join('')
                    + (missing ? `<div class="text-[10px] text-slate-500 px-1 py-0.5"><span class="font-bold">+${missing}</span> <span>Maç detayı girilmemiş</span></div>` : '');
                return `<div class="mx-1.5 mb-1.5 mt-0.5 pl-2 border-l-2 border-slate-700/60">${inner || '<div class="text-[10px] text-slate-500 py-1">-</div>'}</div>`;
            };

            let body;
            if (rows.length === 0) {
                body = `<div class="text-center text-slate-500 text-xs py-6">${isGoal ? 'Henüz gol yok.' : 'Henüz asist yok.'}</div>`;
            } else {
                const encOf = p => encodeURIComponent(p.name).replace(/'/g, '%27');
                const lead = rows[0];
                const li = detByName[lead.name];
                const lOpen = homeStatsOpen.has(kind + '|' + lead.name);
                const hero = `<div class="rounded-2xl border border-slate-700/50 min-w-0 mb-1.5" style="background:linear-gradient(120deg, color-mix(in srgb, ${accHex} 18%, transparent), transparent 75%);border-color:color-mix(in srgb, ${accHex} 38%, transparent)">
                    <div class="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 cursor-pointer" onclick="homeToggleStatRow('${kind}', '${encOf(lead)}')">
                        <div class="flex items-center gap-3 min-w-0">
                            ${photoOf(lead, 'w-12 h-12 sm:w-14 sm:h-14', 'rounded-2xl')}
                            <div class="min-w-0">
                                <div class="text-[9px] font-bold tracking-[0.16em] uppercase" style="color:${accHex}">Lider</div>
                                <div class="text-sm sm:text-base font-bold text-white truncate" title="${escapeHtml(lead.name)}">${escapeHtml(homeShortName(lead.name))}</div>
                                <div class="flex items-center gap-1 mt-1 flex-wrap">${chipsHtml(li, true)}</div>
                            </div>
                        </div>
                        <span class="font-black leading-none shrink-0 text-3xl sm:text-4xl" style="color:${accHex}">${lead[field]}</span>
                    </div>
                    ${lOpen ? detailOf(lead, li) : ''}
                </div>`;

                const tiles = rows.slice(1).map((p, i) => {
                    const info = detByName[p.name];
                    const open = homeStatsOpen.has(kind + '|' + p.name);
                    const rank = i + 2;
                    const rankCls = rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-orange-400' : 'text-slate-500';
                    return `<div class="min-w-0">
                        <div class="bg-slate-900/60 border border-slate-700/50 rounded-xl px-2 py-1 cursor-pointer hover:bg-slate-800/40 transition-colors min-w-0" onclick="homeToggleStatRow('${kind}', '${encOf(p)}')">
                            <div class="flex items-center gap-1.5 min-w-0">
                                <span class="w-3.5 shrink-0 text-center text-[11px] font-black ${rankCls}">${rank}</span>
                                ${photoOf(p, 'w-6 h-6 text-[10px]', 'rounded-full')}
                                <span class="flex-1 min-w-0 text-xs font-bold text-white truncate text-left" title="${escapeHtml(p.name)}">${escapeHtml(homeShortName(p.name))}</span>
                                <span class="flex items-center gap-1 shrink-0">${chipsHtml(info, false, toursAsc)}</span>
                                <span class="font-black text-base leading-none shrink-0 w-6 text-right" style="color:${accHex}">${p[field]}</span>
                            </div>
                        </div>
                        ${open ? detailOf(p, info) : ''}
                    </div>`;
                }).join('');

                body = hero + `<div class="grid grid-cols-1 gap-1.5">${tiles}</div>`;
            }

            return `<div class="${vis} xl:flex flex-col min-w-0 w-full max-w-xl mx-auto xl:max-w-none xl:mx-0 ${borderCls}">${head}${body}</div>`;
        }

        // (Eski gol/asist sütun düzeni, kullanılmıyor)
        function homeStatColumnOld(kind, players, season, context) {
            const isGoal = kind === 'goal';
            const field = isGoal ? 'goals' : 'assists';
            const otherField = isGoal ? 'assists' : 'goals';
            const accent = isGoal ? 'text-emerald-400' : 'text-blue-400';
            const icon = isGoal ? 'fa-futbol' : 'fa-shoe-prints';

            const rows = players.filter(p => p[field] > 0)
                .sort((a, b) => (b[field] - a[field]) || (b[otherField] - a[otherField]) || String(a.name).localeCompare(String(b.name), 'tr'));
            homeStatsShown[kind] = rows.map(p => p.name);
            const maxVal = Math.max(0, ...rows.map(p => p[field]));
            const allOpen = rows.length > 0 && rows.every(p => homeStatsOpen.has(kind + '|' + p.name));
            const vis = homeStatsMobileTab === kind ? 'flex' : 'hidden';
            const borderCls = isGoal ? 'xl:border-r xl:border-slate-700/25 xl:pr-2' : 'xl:pl-2';

            // Her oyuncunun turnuva bazlı gol/asist dağılımı (fikstürdeki olaylardan)
            const detByName = {};
            const present = new Set();
            rows.forEach(p => {
                const d = homeScorerDetails(p.name, season, context);
                const counts = {};
                (isGoal ? d.goals : d.assists).forEach(it => {
                    const t = it.m.tournament || '';
                    counts[t] = (counts[t] || 0) + 1;
                    present.add(t);
                });
                detByName[p.name] = { d, counts };
            });
            const tours = [];
            ((fixtureData && fixtureData[season]) || []).forEach(m => {
                const t = m.tournament || '';
                if (present.has(t) && !tours.includes(t)) tours.push(t);
            });

            // Başlık ve satırlar AYNI sınıfları paylaşır -> sütunlar alt alta oturur
            // Çok turnuva varsa (5+) masaüstünde foto gizlenir; isimlere yer açılır
            const dense = tours.length > 4;
            const leftW = 'w-36 sm:w-48 xl:w-auto xl:flex-1 min-w-0 shrink-0 xl:shrink';
            const colsW = 'flex-1 xl:flex-none xl:shrink min-w-0 flex items-center';
            const totalW = 'w-12 sm:w-14 xl:w-6 shrink-0 xl:border-l xl:border-slate-700/25';

            const head = `<div class="flex items-center gap-1.5 xl:gap-1 px-[7px] sm:px-[9px] xl:px-1.5 pb-1.5">
                <div class="${leftW} flex items-center gap-1.5 xl:gap-1">
                    <span class="${accent} text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"><i class="fa-solid ${icon} mr-1"></i>${isGoal ? 'Gol' : 'Asist'}</span>
                    <button onclick="homeToggleStatCol('${kind}')" title="Tümünü Aç / Kapat" class="text-[10px] text-slate-400 hover:text-white transition-colors"><i class="fa-solid ${allOpen ? 'fa-angles-up' : 'fa-angles-down'}"></i></button>
                </div>
                <div class="${colsW}">${tours.map(homeTourHeadCell3).join('')}</div>
                <span class="${totalW} text-right text-sm xl:text-[11px] font-black text-slate-400" title="Toplam">Σ</span>
            </div>`;

            const body = rows.length === 0
                ? `<div class="text-center text-slate-500 text-xs py-6">${isGoal ? 'Henüz gol yok.' : 'Henüz asist yok.'}</div>`
                : rows.map((p, idx) => {
                    const rankCls = idx === 0 ? 'text-amber-300' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-orange-400' : 'text-slate-500';
                    const photoHtml = p.photoUrl
                        ? `<img src="${p.photoUrl}" class="w-7 h-7 xl:w-5 xl:h-5 rounded-full object-cover shrink-0 ${dense ? 'xl:hidden' : 'xl:hidden 2xl:block'}">`
                        : `<div class="w-7 h-7 xl:w-5 xl:h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 ${dense ? 'xl:hidden' : 'xl:hidden 2xl:flex'}">${escapeHtml((p.name || '?').charAt(0))}</div>`;
                    const glow = (p[field] > 0 && p[field] === maxVal) ? 'text-glow-max' : '';
                    const open = homeStatsOpen.has(kind + '|' + p.name);
                    const enc = encodeURIComponent(p.name).replace(/'/g, '%27');
                    const info = detByName[p.name];

                    const cells = tours.map(t => {
                        const n = info.counts[t] || 0;
                        return `<span class="flex-1 xl:flex-none xl:w-[15px] xl:shrink xl:min-w-[11px] xl:border-l xl:border-slate-700/25 min-w-0 text-center text-sm xl:text-[11px] ${n ? 'font-bold text-slate-200' : 'text-slate-600'}">${n || '-'}</span>`;
                    }).join('');

                    let detailHtml = '';
                    if (open) {
                        const items = isGoal ? info.d.goals : info.d.assists;
                        const missing = Math.max(0, p[field] - items.length);
                        const inner = items.map(it => homeStatDetailRow(kind, it, info.d.ourName)).join('')
                            + (missing ? `<div class="text-[10px] text-slate-500 px-1 py-0.5"><span class="font-bold">+${missing}</span> <span>Maç detayı girilmemiş</span></div>` : '');
                        detailHtml = `<div class="mx-1.5 mb-1.5 pl-2 border-l-2 border-slate-700/60">${inner || '<div class="text-[10px] text-slate-500 py-1">-</div>'}</div>`;
                    }

                    return `<div class="bg-slate-900/60 border border-slate-700/50 rounded-lg min-w-0">
                        <div class="flex items-center gap-1.5 xl:gap-1 px-1.5 py-1.5 sm:px-2 sm:py-2 xl:py-1 cursor-pointer hover:bg-slate-800/40 rounded-lg transition-colors" onclick="homeToggleStatRow('${kind}', '${enc}')">
                            <div class="${leftW} flex items-center gap-1.5 xl:gap-1">
                                <span class="w-4 xl:w-3 xl:-mr-0.5 shrink-0 text-center text-xs xl:text-[11px] font-black ${rankCls}">${idx + 1}</span>
                                ${photoHtml}
                                <span class="flex-1 min-w-0 text-sm xl:text-[11px] 2xl:text-xs font-bold text-white truncate text-left" title="${escapeHtml(p.name)}">${escapeHtml(homeShortName(p.name))}</span>
                                <i class="fa-solid fa-chevron-down text-[8px] text-slate-500 transition-transform shrink-0 xl:hidden 2xl:inline ${open ? 'rotate-180' : ''}"></i>
                            </div>
                            <div class="${colsW}">${cells}</div>
                            <span class="${totalW} text-base xl:text-xs font-black ${accent} inline-flex items-center justify-end gap-1 xl:gap-0.5 ${glow}"><i class="fa-solid ${icon} text-xs xl:text-[10px]"></i>${p[field]}</span>
                        </div>
                        ${detailHtml}
                    </div>`;
                }).join('');

            // Geniş tek sütunda liste en fazla max-w-xl (576px) olur ve ortalanır; iki sütunlu masaüstünde sınır yok
            return `<div class="${vis} xl:flex flex-col min-w-0 w-full max-w-xl mx-auto xl:max-w-none xl:mx-0 ${borderCls}">${head}<div class="flex flex-col gap-1.5">${body}</div></div>`;
        }

        function renderHomeTopScorers(context) {
            const season = seasonsList[seasonsList.length - 1];
            if (!season) return { headerHtml: '', bodyHtml: '<div class="text-center text-slate-500 text-sm py-6">Kayıtlı sezon bulunmuyor.</div>' };
            const data = getStatsData(context);
            const players = data.stats.map(p => ({
                name: p.name,
                photoUrl: p.photoUrl,
                goals: p.seasons[season] ? p.seasons[season].totalGoals : 0,
                assists: p.seasons[season] ? p.seasons[season].totalAssists : 0
            })).filter(p => p.goals > 0 || p.assists > 0);

            if (players.length === 0) return { headerHtml: '', bodyHtml: `<div class="text-center text-slate-500 text-xs sm:text-sm py-6">${escapeHtml(season)} sezonu için gol/asist verisi bulunmuyor.</div>` };

            const bodyHtml = `<div class="flex flex-col xl:grid xl:grid-cols-2 xl:gap-0">${homeStatColumn('goal', players, season, context)}${homeStatColumn('assist', players, season, context)}</div>`;
            return { headerHtml: '', bodyHtml };
        }

        // --- 2) İLK 11 (YATAY SAHA - sadece masaüstü) ---
        // ===================== İLK 11 (yatay saha): modern saha + eşit boyutlu oyuncu kartları =====================
        function homeXiPosColor(pos) {
            const p = String(pos || '').toUpperCase();
            if (p === 'GK') return '#eab308';
            if (/^(CB|LB|RB|LWB|RWB|SW|DF|D)$/.test(p)) return '#3b82f6';
            if (/^(ST|CF|LW|RW|FW|SS|LF|RF)$/.test(p)) return '#ef4444';
            return '#22c55e';
        }

        function renderHomeFirst11Landscape(context) {
            const formData = formations && formations[context] ? formations[context].ilk11 : null;
            if (!formData || !Array.isArray(formData) || !formData.some(n => n.name)) {
                return '<div class="text-center text-slate-500 text-sm py-6">Bu kadro için henüz İlk 11 belirlenmedi.<br><span class="text-xs">Kadro panelinden "Kadrolar" ikonuna tıklayarak oluşturabilirsiniz.</span></div>';
            }
            const cards = formData.filter(node => node.name).map(node => {
                const photo = getPlayerPhotoByName(node.name);
                const cur = getPlayerCurrentStatsByName(node.name, context);
                const hasOvr = cur && cur.ovr !== null && cur.ovr !== undefined && cur.ovr !== '';
                const pc = homeXiPosColor(node.pos);
                const photoHtml = photo
                    ? `<img src="${photo}" alt="" class="xi-img">`
                    : `<div class="xi-ph">${escapeHtml((node.name || '?').charAt(0).toUpperCase())}</div>`;
                // Dikey sahadaki (x, y) -> yatay saha: kaleci solda, hücum sağa doğru
                const left = Math.min(94, Math.max(6, 100 - (parseFloat(node.y) || 0)));
                const top = Math.min(88, Math.max(12, parseFloat(node.x) || 0));
                return `<div class="xi-card" data-l0="${left}" data-t0="${top}" style="--c:${pc};left:${left}%;top:${top}%;">
                    <div class="xi-top"><b class="xi-ovr" style="color:${hasOvr ? mbOvrColor(cur.ovr) : '#64748b'}">${hasOvr ? escapeHtml(String(cur.ovr)) : '-'}</b><span class="xi-pos" style="color:${pc}">${escapeHtml(node.pos || '')}</span></div>
                    <div class="xi-photo">${photoHtml}</div>
                    <div class="xi-name" title="${escapeHtml(node.name)}">${escapeHtml(homeSurname(node.name))}</div>
                </div>`;
            }).join('');

            return `
                <div class="home-xi-container" data-ctx="${context}">
                    <svg class="xi-lines" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
                        <g fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.4" vector-effect="non-scaling-stroke">
                            <rect x="2" y="3" width="96" height="56" vector-effect="non-scaling-stroke"/>
                            <line x1="50" y1="3" x2="50" y2="59" vector-effect="non-scaling-stroke"/>
                            <ellipse cx="50" cy="31" rx="8" ry="12.5" vector-effect="non-scaling-stroke"/>
                            <rect x="2" y="17" width="14" height="28" vector-effect="non-scaling-stroke"/>
                            <rect x="84" y="17" width="14" height="28" vector-effect="non-scaling-stroke"/>
                            <rect x="2" y="25" width="5" height="12" vector-effect="non-scaling-stroke"/>
                            <rect x="93" y="25" width="5" height="12" vector-effect="non-scaling-stroke"/>
                        </g>
                    </svg>
                    ${cards}
                </div>
            `;
        }

        // Kartlar eşit boyda; oyuncular çizgilere (sütunlara) hizalanır ve üst üste binmez
        // Milli takım İlk 11: kart ölçeği kulüpteki (A Takım) ile aynı; kartlar yalnızca çakışma varsa, en az sapmayla kaydırılır
        function homeXiSolve(pts, w, W, H, vertical) {
            const PAD = 8, GAP = 5, R = 1.42, h = w * R;
            const minX = PAD + w / 2, maxX = W - PAD - w / 2, minY = PAD + h / 2, maxY = H - PAD - h / 2;
            const P = pts.map(p => ({ x: Math.min(maxX, Math.max(minX, p.x)), y: Math.min(maxY, Math.max(minY, p.y)) }));
            const clamp = (p) => { p.x = Math.min(maxX, Math.max(minX, p.x)); p.y = Math.min(maxY, Math.max(minY, p.y)); };
            for (let it = 0; it < 200; it++) {
                let moved = false;
                for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
                    const a = P[i], b = P[j];
                    const ox = w + GAP - Math.abs(a.x - b.x), oy = h + GAP - Math.abs(a.y - b.y);
                    if (ox <= 0 || oy <= 0) continue;
                    moved = true;
                    if (vertical ? !(ox <= oy * 2) : (oy <= ox * 2)) { const sg = (a.y === b.y ? (i % 2 ? 1 : -1) : Math.sign(a.y - b.y)) * oy / 2; a.y += sg; b.y -= sg; }
                    else { const sg = (a.x === b.x ? (i % 2 ? 1 : -1) : Math.sign(a.x - b.x)) * ox / 2; a.x += sg; b.x -= sg; }
                    clamp(a); clamp(b);
                }
                if (!moved) break;
            }
            let clash = false;
            for (let i = 0; i < P.length && !clash; i++) for (let j = i + 1; j < P.length; j++) {
                if (w + GAP - Math.abs(P[i].x - P[j].x) > 0.5 && h + GAP - Math.abs(P[i].y - P[j].y) > 0.5) { clash = true; break; }
            }
            return { P, clash };
        }
        function homeFitXIRef(box) {
            const W = box.clientWidth, H = box.clientHeight;
            const cards = Array.from(box.querySelectorAll(':scope > .xi-card'));
            if (!W || !H || !cards.length) return false;
            const vertical = box.classList.contains('vert');
            const club = formations && formations.astakim && formations.astakim.ilk11;
            const nodes = Array.isArray(club) ? club.filter(n => n && n.name) : [];
            if (!nodes.length) return false;
            // 1) Kulüp (A Takım) formasyonunun bu panel boyutundaki kart genişliği
            const cpts = nodes.map(n => {
                const nx = parseFloat(n.x) || 0, ny = parseFloat(n.y) || 0;
                const left = vertical ? Math.min(94, Math.max(6, nx)) : Math.min(94, Math.max(6, 100 - ny));
                const top = vertical ? Math.min(92, Math.max(8, ny)) : Math.min(88, Math.max(12, nx));
                return { x: left / 100 * W, y: top / 100 * H };
            });
            let w = Math.min(96, (H - 16) / 1.42, (W - 16));
            while (homeXiSolve(cpts, w, W, H, vertical).clash && w > 26) w -= 2;
            // 2) Aynı genişlikte milli kartlarını yerleştir
            const res = homeXiSolve(cards.map(c => ({ x: parseFloat(c.dataset.l0) / 100 * W, y: parseFloat(c.dataset.t0) / 100 * H })), w, W, H, vertical);
            box.style.setProperty('--xw', w.toFixed(1) + 'px');
            cards.forEach((c, i) => {
                c.style.left = res.P[i].x.toFixed(1) + 'px';
                c.style.top = res.P[i].y.toFixed(1) + 'px';
            });
            return true;
        }

        // İlk 11 / İlk 5 sahası (kulüp, akademi, milli — hepsi aynı kural):
        // kart genişliği yalnızca panel boyutundan hesaplanır (bir hatta 4 kart sığacak şekilde), formasyondan etkilenmez.
        // Kartlar formasyondaki koordinatlarında durur; kaydırma/çakışma düzeltmesi YAPILMAZ (sadece saha dışına taşmaz).
        function homeFitXIFixed(box) {
            const W = box.clientWidth, H = box.clientHeight;
            const cards = Array.from(box.querySelectorAll(':scope > .xi-card'));
            if (!W || !H || !cards.length) return false;
            const PAD = 8, GAP = 5, R = 1.42;
            const vertical = box.classList.contains('vert');
            const wA = vertical ? ((W - 2 * PAD) / 4 - GAP) : ((((H - 2 * PAD) / 4) - GAP) / R);   // 4 kart yan yana
            const wB = vertical ? ((((H - 2 * PAD) / 5) - GAP) / R) : (((W - 2 * PAD) / 5) - GAP);   // 5 hat arka arkaya
            const w = Math.max(26, Math.min(96, wA, wB));
            const h = w * R;
            box.style.setProperty('--xw', w.toFixed(1) + 'px');
            const minX = PAD + w / 2, maxX = W - PAD - w / 2, minY = PAD + h / 2, maxY = H - PAD - h / 2;
            const clampP = (p) => { p.x = Math.min(maxX, Math.max(minX, p.x)); p.y = Math.min(maxY, Math.max(minY, p.y)); };
            const P = cards.map(c => ({ x: parseFloat(c.dataset.l0) / 100 * W, y: parseFloat(c.dataset.t0) / 100 * H }));
            P.forEach(clampP);
            // 1) Aynı hattaki kartlar (derinlik ekseninde yakın) bir grup sayılır. Grupta çakışma varsa kartlar
            //    uçlar sabit kalacak şekilde eşit aralıkla (simetrik) dağıtılır; yer yetmezse merkezden açılır.
            const dk = vertical ? 'y' : 'x', ck = vertical ? 'x' : 'y';
            const step = (vertical ? w : h) + GAP;
            const cLo = vertical ? minX : minY, cHi = vertical ? maxX : maxY;
            const order = P.map((p, i) => i).sort((a, b) => P[a][dk] - P[b][dk]);
            const groups = [];
            order.forEach(i => { const g = groups[groups.length - 1]; if (g && P[i][dk] - P[g[g.length - 1]][dk] <= w * 0.75) g.push(i); else groups.push([i]); });
            groups.forEach(g => {
                if (g.length < 2) return;
                g.sort((a, b) => P[a][ck] - P[b][ck]);
                let tight = false;
                for (let k = 1; k < g.length; k++) if (P[g[k]][ck] - P[g[k - 1]][ck] < step - 0.5) tight = true;
                if (!tight) return;
                const lo = P[g[0]][ck], hi = P[g[g.length - 1]][ck], n = g.length;
                let d = (hi - lo) / (n - 1), start = lo;
                if (d < step) { d = step; start = (lo + hi) / 2 - d * (n - 1) / 2; }
                const end = start + d * (n - 1);
                if (start < cLo) start = cLo; else if (end > cHi) start -= end - cHi;
                g.forEach((idx, k) => { P[idx][ck] = start + d * k; });
            });
            P.forEach(clampP);
            // 2) Farklı hatlar arasında kalan çakışmalar: iki kart da eşit miktarda (yarı yarıya) ayrılır
            for (let it = 0; it < 120; it++) {
                let moved = false;
                for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
                    const a = P[i], b = P[j];
                    const ox = w + GAP - Math.abs(a.x - b.x), oy = h + GAP - Math.abs(a.y - b.y);
                    if (ox <= 0 || oy <= 0) continue;
                    moved = true;
                    if (ox < oy) { const sg = (a.x === b.x ? (i % 2 ? 1 : -1) : Math.sign(a.x - b.x)) * ox / 2; a.x += sg; b.x -= sg; }
                    else { const sg = (a.y === b.y ? (i % 2 ? 1 : -1) : Math.sign(a.y - b.y)) * oy / 2; a.y += sg; b.y -= sg; }
                    clampP(a); clampP(b);
                }
                if (!moved) break;
            }
            cards.forEach((c, i) => {
                c.style.left = P[i].x.toFixed(1) + 'px';
                c.style.top = P[i].y.toFixed(1) + 'px';
            });
            return true;
        }

        function homeFitXI(box) {
            if (homeFitXIFixed(box)) return;
            if (box.dataset.ctx === 'milli' && homeFitXIRef(box)) return;
            const W = box.clientWidth, H = box.clientHeight;
            if (!W || !H) return;
            const cards = Array.from(box.querySelectorAll(':scope > .xi-card'));
            if (!cards.length) return;
            const PAD = 8, GAP = 5, R = 1.42; // R: kart yüksekliği / genişliği
            const vertical = box.classList.contains('vert');
            const x0 = cards.map(c => parseFloat(c.dataset.l0) / 100 * W);
            const y0 = cards.map(c => parseFloat(c.dataset.t0) / 100 * H);

            // Verilen kart genişliğinde, orijinal konumlardan en az sapmayla çakışmasız yerleşim ara
            const solve = (w) => {
                const h = w * R;
                const minX = PAD + w / 2, maxX = W - PAD - w / 2, minY = PAD + h / 2, maxY = H - PAD - h / 2;
                const P = cards.map((c, i) => ({ x: Math.min(maxX, Math.max(minX, x0[i])), y: Math.min(maxY, Math.max(minY, y0[i])) }));
                const clamp = (p) => { p.x = Math.min(maxX, Math.max(minX, p.x)); p.y = Math.min(maxY, Math.max(minY, p.y)); };
                for (let it = 0; it < 200; it++) {
                    let moved = false;
                    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
                        const a = P[i], b = P[j];
                        const ox = w + GAP - Math.abs(a.x - b.x);
                        const oy = h + GAP - Math.abs(a.y - b.y);
                        if (ox <= 0 || oy <= 0) continue;
                        moved = true;
                        // Derinlik (x) orijinal formasyondaki gibi kalsın diye önce dikeyde ayır
                        if (vertical ? !(ox <= oy * 2) : (oy <= ox * 2)) {
                            const s = (a.y === b.y ? (i % 2 ? 1 : -1) : Math.sign(a.y - b.y)) * oy / 2;
                            a.y += s; b.y -= s;
                        } else {
                            const s = (a.x === b.x ? (i % 2 ? 1 : -1) : Math.sign(a.x - b.x)) * ox / 2;
                            a.x += s; b.x -= s;
                        }
                        clamp(a); clamp(b);
                    }
                    if (!moved) break;
                }
                let clash = false;
                for (let i = 0; i < P.length && !clash; i++) for (let j = i + 1; j < P.length; j++) {
                    if (w + GAP - Math.abs(P[i].x - P[j].x) > 0.5 && h + GAP - Math.abs(P[i].y - P[j].y) > 0.5) { clash = true; break; }
                }
                return { P, clash };
            };

            let w = Math.min(96, (H - 2 * PAD) / R, (W - 2 * PAD));
            let res = solve(w);
            while (res.clash && w > 26) { w -= 2; res = solve(w); }
            box.style.setProperty('--xw', w.toFixed(1) + 'px');
            cards.forEach((c, i) => {
                c.style.left = res.P[i].x.toFixed(1) + 'px';
                c.style.top = res.P[i].y.toFixed(1) + 'px';
            });
        }

        function homeFitXIv1(box) {
            const W = box.clientWidth, H = box.clientHeight;
            if (!W || !H) return;
            const cards = Array.from(box.querySelectorAll(':scope > .xi-card'));
            if (!cards.length) return;
            const PAD = 8, GAP = 6, R = 1.42; // R: kart yüksekliği / genişliği
            const pts = cards.map(c => ({ c, x: parseFloat(c.dataset.l0) / 100 * W, y: parseFloat(c.dataset.t0) / 100 * H }));

            // Sütunlara ayır (yaklaşık aynı x'teki oyuncular aynı hat)
            const sorted = pts.slice().sort((a, b) => a.x - b.x);
            const cols = [];
            sorted.forEach(p => {
                const col = cols[cols.length - 1];
                if (col && (p.x - col.mean) <= 0.075 * W) { col.items.push(p); col.mean = col.items.reduce((a, q) => a + q.x, 0) / col.items.length; }
                else cols.push({ items: [p], mean: p.x });
            });
            const nMax = Math.max(...cols.map(c => c.items.length));
            let w = Math.min(96,
                (H - 2 * PAD - (nMax - 1) * GAP) / (nMax * R),
                (W - 2 * PAD - (cols.length - 1) * GAP) / cols.length);
            w = Math.max(26, w);
            const h = w * R;
            box.style.setProperty('--xw', w.toFixed(1) + 'px');

            // Sütun x konumları: aralarında en az (w + GAP)
            const xs = cols.map(c => c.mean);
            const minX = PAD + w / 2, maxX = W - PAD - w / 2, step = w + GAP;
            xs.forEach((x, i) => { xs[i] = Math.min(maxX, Math.max(minX, x)); });
            for (let i = 1; i < xs.length; i++) xs[i] = Math.max(xs[i], xs[i - 1] + step);
            for (let i = xs.length - 1; i >= 0; i--) { xs[i] = Math.min(xs[i], (i === xs.length - 1 ? maxX : xs[i + 1] - step)); }
            for (let i = 0; i < xs.length; i++) xs[i] = Math.max(xs[i], i === 0 ? minX : xs[i - 1] + step);

            cols.forEach((col, ci) => {
                const it = col.items.sort((a, b) => a.y - b.y);
                const minY = PAD + h / 2, maxY = H - PAD - h / 2, st = h + GAP;
                const ys = it.map(p => Math.min(maxY, Math.max(minY, p.y)));
                for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + st);
                for (let i = ys.length - 1; i >= 0; i--) ys[i] = Math.min(ys[i], i === ys.length - 1 ? maxY : ys[i + 1] - st);
                for (let i = 0; i < ys.length; i++) ys[i] = Math.max(ys[i], i === 0 ? minY : ys[i - 1] + st);
                it.forEach((p, i) => {
                    p.c.style.left = xs[ci].toFixed(1) + 'px';
                    p.c.style.top = ys[i].toFixed(1) + 'px';
                });
            });
        }

        function renderHomeFirst11LandscapeOld(context) {
            const formData = formations && formations[context] ? formations[context].ilk11 : null;
            if (!formData || !Array.isArray(formData) || !formData.some(n => n.name)) {
                return '<div class="text-center text-slate-500 text-sm py-6">Bu kadro için henüz İlk 11 belirlenmedi.<br><span class="text-xs">Kadro panelinden "Kadrolar" ikonuna tıklayarak oluşturabilirsiniz.</span></div>';
            }

            const photoSize = 'clamp(22px, 11.5cqmin, 84px)';
            const badgeFont = 'clamp(4px, 1.9cqmin, 7px)';
            const badgePad = 'clamp(0px, 0.2cqmin, 1px) clamp(1.5px, 0.7cqmin, 4px)';
            const nameFont = 'clamp(4.5px, 2.35cqmin, 9.5px)';
            const namePad = 'clamp(0.5px, 0.35cqmin, 2px) clamp(2px, 1cqmin, 6px)';

            const nodesHtml = formData.filter(node => node.name).map(node => {
                const photo = getPlayerPhotoByName(node.name);
                const photoHtml = photo
                    ? `<div class="relative flex items-end justify-center shrink-0 overflow-visible" style="width:${photoSize}; height:${photoSize};">
                            <img src="${photo}" class="relative z-10 object-cover object-top pointer-events-none drop-shadow-lg" style="width:100%; height:118%;">
                       </div>`
                    : `<div class="rounded-full bg-slate-700 border-[3px] border-slate-900 flex items-center justify-center font-black text-white shadow-lg shrink-0" style="width:${photoSize}; height:${photoSize}; font-size:clamp(10px, 6.5cqmin, 30px);">${escapeHtml((node.name || '?').charAt(0).toUpperCase())}</div>`;
                // Dikey sahadaki (x, y) -> yatay sahaya 90° döndürülmüş koordinat: kaleci solda, hücum sağa doğru
                const left = Math.min(94, Math.max(6, 100 - (parseFloat(node.y) || 0)));
                const top = Math.min(88, Math.max(12, parseFloat(node.x) || 0));
                return `
                    <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2" style="left:${left}%; top:${top}%; width:clamp(48px, 18cqmin, 130px);">
                        ${photoHtml}
                        <div class="flex items-center gap-1" style="margin-top:1px;">
                            <span class="pos-${node.pos || ''} bg-slate-950/90 font-black rounded border border-slate-700" style="font-size:${badgeFont}; padding:${badgePad};">${node.pos || ''}</span>
                        </div>
                        <div class="bg-black/80 text-white font-bold rounded whitespace-nowrap border border-white/10" style="font-size:${nameFont}; padding:${namePad}; margin-top:1px;">${escapeHtml(formatShortPlayerName(node.name))}</div>
                    </div>
                `;
            }).join('');

            return `
                <div class="home-pitch-container relative w-full h-full min-h-0 bg-green-800 rounded-lg border-2 border-white/30 overflow-hidden">
                    <div class="absolute inset-0 pointer-events-none border-[2px] border-white/25 m-2 rounded-sm"></div>
                    <div class="absolute left-1/2 top-2 bottom-2 w-px bg-white/25 -translate-x-1/2"></div>
                    <div class="absolute top-1/2 left-1/2 w-20 h-20 border-[2px] border-white/25 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/35 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="absolute left-2 top-1/2 w-16 h-32 border-[2px] border-white/25 -translate-y-1/2 border-l-0"></div>
                    <div class="absolute left-2 top-1/2 w-7 h-14 border-[2px] border-white/25 -translate-y-1/2 border-l-0"></div>
                    <div class="absolute right-2 top-1/2 w-16 h-32 border-[2px] border-white/25 -translate-y-1/2 border-r-0"></div>
                    <div class="absolute right-2 top-1/2 w-7 h-14 border-[2px] border-white/25 -translate-y-1/2 border-r-0"></div>
                    ${nodesHtml}
                </div>
            `;
        }

        // --- 3) LİG TABLOSU ---
        function homeTableTours(season) {
            return ((customTournamentsData && customTournamentsData[season]) || []).filter(t =>
                t && t.tableEnabled !== false && Array.isArray(t.table) &&
                t.table.some(r => r && r.name && r.name !== 'Takım Adı')
            );
        }

        function homeTourHasKnockout(t) {
            if (t.knockoutEnabled !== undefined) return !!t.knockoutEnabled;
            return HOME_KO_TYPES.includes(t.type) || !!(t.knockouts && t.knockouts.length > 0);
        }

        function homePickLeagueTour(season) {
            const tours = homeTableTours(season);
            if (!tours.length) return null;
            if (homeLeagueTourId) {
                const sel = tours.find(t => t.id === homeLeagueTourId);
                if (sel) return sel;
            }
            const our = homeOurTeamName();
            const score = (t) => {
                const hasUs = t.table.some(r => r && homeSameTeam(r.name, our));
                return (hasUs ? 2 : 0) + (!homeTourHasKnockout(t) ? 1 : 0);
            };
            return tours.slice().sort((a, b) => score(b) - score(a))[0];
        }

                // ===================== LİG TABLOSU v2: AT/YE sütunları, isme yakın geniş sayı sütunları, temiz yapışkan başlık =====================
        function renderHomeLeagueTable() {
            const season = seasonsList[seasonsList.length - 1];
            const tour = season ? homePickLeagueTour(season) : null;
            if (!tour) return '<div class="text-center text-slate-500 text-sm py-6">Bu sezon için lig tablosu yok.</div>';

            const our = homeOurTeamName();
            const H = homeIsEn() ? ['P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'] : ['O', 'G', 'B', 'M', 'A', 'Y', 'AV', 'P'];
            const num = (v) => (v === undefined || v === null || v === '') ? '0' : escapeHtml(String(v));

            const rows = tour.table.filter(r => r && r.name).map(row => {
                const isUs = our && homeSameTeam(row.name, our);
                const isFirst = String(row.rank) === '1';
                const logo = row.logo || getTeamLogoByName(row.name);
                const rowBg = isUs ? 'bg-emerald-900/30' : '';
                const rankCls = isFirst ? 'text-emerald-400 font-black' : 'text-slate-400 font-bold';
                const nameCls = isUs ? 'text-emerald-300 font-black' : (isFirst ? 'text-white font-black' : 'text-white font-bold');
                const c = `py-1 border-b border-slate-800 ${rowBg}`;
                const n = (v, extra) => `<td class="${c} px-0 sm:px-1 text-center tabular-nums min-w-[1.25rem] sm:min-w-[1.75rem] ${extra || ''}">${num(v)}</td>`;
                return `<tr>
                    <td class="${c} w-7 text-center ${rankCls} first:rounded-l">${num(row.rank)}</td>
                    <td class="${c} w-[1%] pl-1 pr-2 sm:pr-3 whitespace-nowrap">
                        <div class="flex items-center gap-1.5 max-w-[8.25rem] sm:max-w-[10rem]">
                            <img src="${logo}" alt="" class="w-5 h-5 object-contain shrink-0">
                            <span class="truncate min-w-0 ${nameCls}" title="${escapeHtml(row.name)}">${escapeHtml(row.name)}</span>
                        </div>
                    </td>
                    ${n(row.pld)}${n(row.w)}${n(row.d)}${n(row.l)}${n(row.gf)}${n(row.ga)}${n(row.gd)}
                    <td class="${c} px-0 sm:px-1 text-center tabular-nums min-w-[1.5rem] sm:min-w-[2rem] font-black text-white last:rounded-r">${num(row.pts)}</td>
                </tr>`;
            }).join('');

            // Başlık hücreleri: -top-3 + pt-4 -> panelin p-3 üst boşluğunu da kapatır, satırlar başlığın üstünden görünmez
            const th = 'sticky -top-3 z-10 bg-slate-900 pt-4 pb-1 border-b border-slate-700/60 text-center';
            return `
                <div class="w-full max-w-xl mx-auto">
                    <table class="w-full text-[10px] sm:text-[11px] text-slate-300 border-separate border-spacing-0">
                        <thead class="text-[9px] text-slate-500 font-bold uppercase">
                            <tr>
                                <th class="${th} w-7">#</th>
                                <th class="${th} w-[1%] pl-1"></th>
                                ${H.map((h, i) => `<th class="${th} px-0 sm:px-1">${h}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>`;
        }

        // --- 4) TURNUVALAR ---
        function homeTourChampion(tour) {
            let name = '', logo = '';
            const kos = Array.isArray(tour.knockouts) ? tour.knockouts : [];
            const fin = kos.find(k => k.stage === 'Final' || k.stage === 'F');
            if (fin) {
                const hs1 = parseInt(fin.homeScore), as1 = parseInt(fin.awayScore);
                const hs2 = parseInt(fin.homeScore2), as2 = parseInt(fin.awayScore2);
                if (!isNaN(hs1) && !isNaN(as1)) {
                    const hasL2 = !isNaN(hs2) && !isNaN(as2);
                    const hTotal = hs1 + (hasL2 ? as2 : 0);
                    const aTotal = as1 + (hasL2 ? hs2 : 0);
                    if (hTotal > aTotal) { name = fin.home; logo = fin.homeLogo || getTeamLogoByName(fin.home); }
                    else if (aTotal > hTotal) { name = fin.away; logo = fin.awayLogo || getTeamLogoByName(fin.away); }
                }
            }
            if (!name && !homeTourHasKnockout(tour) && Array.isArray(tour.table) && tour.table.length > 0) {
                const top = tour.table.find(t => String(t.rank) === '1') || tour.table[0];
                if (top && top.name && top.name !== 'Takım Adı') { name = top.name; logo = top.logo || getTeamLogoByName(top.name); }
            }
            return { name, logo };
        }

        function renderHomeTournaments() {
            const season = seasonsList[seasonsList.length - 1];
            const tours = season ? ((customTournamentsData && customTournamentsData[season]) || []) : [];
            if (tours.length === 0) return '<div class="text-center text-slate-500 text-sm py-6">Bu sezon için turnuva yok.</div>';

            const our = homeOurTeamName();
            const en = homeIsEn();

            const cards = tours.map(tour => {
                const logo = (typeof getCompetitionLogo === 'function') ? getCompetitionLogo(tour.type) : '';
                const logoHtml = logo
                    ? `<img src="${logo}" alt="" class="w-7 h-7 object-contain shrink-0">`
                    : `<div class="w-7 h-7 rounded bg-slate-800 flex items-center justify-center shrink-0"><i class="fa-solid fa-trophy text-yellow-500 text-xs"></i></div>`;

                const chips = [];
                if (tour.tableEnabled !== false && Array.isArray(tour.table) && our) {
                    const row = tour.table.find(r => r && homeSameTeam(r.name, our));
                    if (row) {
                        chips.push(`<span class="text-emerald-400 font-black">#${escapeHtml(String(row.rank))}</span>`);
                        if (row.pts !== undefined && row.pts !== null && row.pts !== '') {
                            chips.push(`<span>${escapeHtml(String(row.pts))} ${en ? 'pts' : 'P'}</span>`);
                        }
                    }
                }
                const kos = Array.isArray(tour.knockouts) ? tour.knockouts : [];
                const ours = kos.filter(k => our && (homeSameTeam(k.home, our) || homeSameTeam(k.away, our)));
                if (ours.length && ours[ours.length - 1].stage) {
                    chips.push(`<span class="text-amber-300">${escapeHtml(ours[ours.length - 1].stage)}</span>`);
                }
                const chipsHtml = chips.length
                    ? chips.join('<span class="text-slate-600">&middot;</span>')
                    : '<span class="text-slate-500">-</span>';

                const champ = homeTourChampion(tour);
                let champHtml = '';
                if (champ.name) {
                    if (homeSameTeam(champ.name, our)) {
                        champHtml = `<span class="shrink-0 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-full border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.4)] text-[10px] font-black text-yellow-300"><i class="fa-solid fa-trophy"></i><span>Şampiyon</span></span>`;
                    } else {
                        champHtml = `<span class="shrink-0 flex items-center gap-1" title="${escapeHtml(champ.name)}"><i class="fa-solid fa-trophy text-yellow-500 text-[10px]"></i><img src="${champ.logo}" alt="" class="w-5 h-5 object-contain"></span>`;
                    }
                }

                const bg = (typeof getCustomTournamentCardBg === 'function') ? getCustomTournamentCardBg(tour.type) : 'bg-slate-900/60 border-slate-700/50';
                return `<div class="${bg} p-2 rounded-lg border shadow-sm flex items-center gap-2">
                    ${logoHtml}
                    <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm font-bold text-white truncate" title="${escapeHtml(tour.type)}">${escapeHtml(tour.type)}</div>
                        <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 flex-wrap">${chipsHtml}</div>
                    </div>
                    ${champHtml}
                </div>`;
            }).join('');

            return `<div class="space-y-1.5">${cards}</div>`;
        }

        // --- ANA SAYFA: 6 PANEL (masaüstü 3x2 grid, mobil 6 sekme) ---
        function renderHomePanel() {
            const season = seasonsList[seasonsList.length - 1];
            const isClub = homeGlobalContext !== 'milli';
            const squadCtx = isClub ? homeSquadSub : 'milli';
            const pillOn = 'bg-emerald-600 text-white';
            const pillOff = 'text-slate-400 hover:text-white';

            const squadToggle = isClub ? `
                <div class="flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1">
                    <button onclick="event.stopPropagation(); setHomeSquadSub('astakim')" class="px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${homeSquadSub === 'astakim' ? pillOn : pillOff}">As Takım</button>
                    <button onclick="event.stopPropagation(); setHomeSquadSub('akademi')" class="px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${homeSquadSub === 'akademi' ? pillOn : pillOff}">Akademi</button>
                </div>` : '';

            const fixtureToggle = `
                <div class="flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1">
                    <button onclick="event.stopPropagation(); toggleHomeFixtureBoth()" class="px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${homeFixtureContext === 'both' ? pillOn : pillOff}">Tümü</button>
                </div>`;

            const leagueTours = season ? homeTableTours(season) : [];
            const leagueSel = season ? homePickLeagueTour(season) : null;
            const leagueRight = leagueTours.length > 1
                ? `<select onchange="setHomeLeagueTour(this.value)" class="bg-slate-900 border border-slate-600 text-[10px] text-slate-300 rounded p-1 outline-none focus:border-emerald-500 max-w-[150px]">${leagueTours.map(t => `<option value="${escapeHtml(t.id)}" ${leagueSel && leagueSel.id === t.id ? 'selected' : ''}>${escapeHtml(t.type)}</option>`).join('')}</select>`
                : (leagueSel ? `<span class="text-[10px] font-bold text-slate-400 truncate max-w-[55%]">${escapeHtml(leagueSel.type)}</span>` : '');

            const panelCls = 'hidden xl:flex flex-1 flex-col min-h-0 bg-slate-900 border border-slate-700 rounded-b-xl rounded-tr-xl xl:rounded-xl overflow-hidden shadow-lg transition-all duration-300';
            const bodyCls = 'flex-1 overflow-y-auto p-3 min-h-0 hide-scrollbar';
            const tabBtn = (id, icon) => `<button onclick="switchHomeTab('${id}')" id="htab-${id}" class="flex-1 min-w-0 px-2 py-3 text-base bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl flex items-center justify-center cursor-pointer"><i class="fa-solid ${icon}"></i></button>`;

            const html = `
                <div class="w-full h-full flex flex-col min-h-0 overflow-hidden">
                    <!-- Üst Başlık ve Seçici Paneli -->
                    <div class="w-full flex flex-col sm:flex-row sm:justify-between items-center mb-4 px-2 shrink-0 relative gap-3 sm:gap-0">
                        <h3 class="hidden sm:block text-2xl font-bold text-white self-start sm:self-auto" title="Ana Sayfa"><i class="fa-solid fa-house text-emerald-500 mr-2"></i>${escapeHtml(season || '')}</h3>

                        <!-- Ortalanmış Kulüp / Milli Seçici -->
                        <div class="flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shadow-lg z-10 w-max mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                            <button onclick="setHomeGlobalContext('kulup')" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${homeGlobalContext === 'kulup' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Kulüp</button>
                            <button onclick="setHomeGlobalContext('milli')" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${homeGlobalContext === 'milli' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Milli</button>
                        </div>

                        <div class="hidden sm:block"></div>
                    </div>

                    <div class="w-full flex-1 flex flex-col min-h-0 overflow-hidden px-2 pb-4 max-w-3xl xl:max-w-none mx-auto">
                        <!-- Sekmeler (Sadece Mobilde) -->
                        <div class="flex xl:hidden gap-1 overflow-x-auto hide-scrollbar shrink-0 px-2">
                            ${tabBtn('kadro', 'fa-users')}
                            ${tabBtn('ilk11', 'fa-people-group')}
                            ${tabBtn('maclar', 'fa-calendar-days')}
                            ${tabBtn('goller', 'fa-futbol')}
                            ${tabBtn('lig', 'fa-table-list')}
                            ${tabBtn('turnuva', 'fa-trophy')}
                        </div>

                        <!-- Panel İçerikleri (Masaüstü: 3x2 Grid, Mobil: Sekmeli) -->
                        <div class="flex-1 flex flex-col min-h-0 overflow-hidden xl:grid xl:grid-cols-3 xl:grid-rows-2 xl:gap-4 relative z-0">

                            <!-- 1. Kadro -->
                            <div id="hcontent-kadro" class="${panelCls} xl:order-1">
                                ${homeHeaderHtml('<i class="fa-solid fa-users text-emerald-400 mr-1.5"></i>', 'Kadro', `<div class="flex items-center gap-2 shrink-0">${squadToggle}${homeSquadEditBtn()}</div>`)}
                                <div class="${bodyCls}">
                                    ${renderHomeSquad(squadCtx)}
                                </div>
                            </div>

                            <!-- 2. Maçlar -->
                            <div id="hcontent-maclar" class="${panelCls} xl:order-2">
                                ${homeHeaderHtml('<i class="fa-solid fa-calendar-days text-emerald-400 mr-1.5"></i>', 'Maçlar', fixtureToggle, 'Fikstür Özeti')}
                                <div class="${bodyCls}">
                                    ${renderHomeFixtures(homeFixtureContext)}
                                </div>
                            </div>

                            <!-- 3. Gol Kralları -->
                            <div id="hcontent-goller" class="${panelCls} xl:order-5">
                                ${homeHeaderHtml('<i class="fa-solid fa-futbol text-emerald-400 mr-1.5"></i>', 'Gol Kralları', homeStatsMobileToggle(), 'İstatistikler')}
                                <div class="${bodyCls}">
                                    ${(() => { const r = renderHomeTopScorers(homeStatsContext); return r.headerHtml + `<div class="space-y-1.5">${r.bodyHtml}</div>`; })()}
                                </div>
                            </div>

                            <!-- 4. İlk 11 (masaüstünde yatay saha, mobilde dikey saha) -->
                            <div id="hcontent-ilk11" class="${panelCls} xl:order-4">
                                ${homeHeaderHtml('<i class="fa-solid fa-people-group text-emerald-400 mr-1.5"></i>', squadCtx === 'akademi' ? 'İlk 5' : 'İlk 11', '')}
                                <div class="${bodyCls}">
                                    <div class="xl:hidden h-full">${renderHomeFirst11(squadCtx)}</div>
                                    <div class="hidden xl:block h-full">${renderHomeFirst11Landscape(squadCtx)}</div>
                                </div>
                            </div>

                            <!-- 5. Lig Tablosu -->
                            <div id="hcontent-lig" class="${panelCls} xl:order-3">
                                ${homeHeaderHtml('<i class="fa-solid fa-table-list text-emerald-400 mr-1.5"></i>', 'Lig Tablosu', leagueRight)}
                                <div class="${bodyCls}">
                                    ${renderHomeLeagueTable()}
                                </div>
                            </div>

                            <!-- 6. Turnuvalar -->
                            <div id="hcontent-turnuva" class="${panelCls} xl:order-6">
                                ${homeHeaderHtml('<i class="fa-solid fa-trophy text-emerald-400 mr-1.5"></i>', 'Turnuvalar', '')}
                                <div class="${bodyCls}">
                                    ${renderHomeTournaments()}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `;
            updateContentArea(html);

            // Sekme durumunu en son bırakıldığı gibi ayarla
            switchHomeTab(homeActiveTab);
        }

// ===================== KUPA DOLABI (Trophy Cabinet) =====================
let trophyView = 'table';        // 'table' | 'cabinet'
let trophyShowEmpty = false;     // kazanılmayan turnuvaları vitrinde göster

function setTrophyView(v) { trophyView = v; renderTrophiesGrid(); }
let trophyCabTab = 'vitrin';     // dar ekranda: 'vitrin' | 'zaman'
function setTrophyCabTab(t) {
    trophyCabTab = t;
    const sp = document.querySelector('.tc-split');
    if (sp) sp.dataset.tab = t;
    document.querySelectorAll('.tc-subtabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
}
function toggleTrophyEmpty() { trophyShowEmpty = !trophyShowEmpty; renderTrophiesGrid(); }

// Şampiyon takım, yönetilen kulüp/milli takımın adıyla eşleşiyorsa kupa bizimdir
function trophyIsMine(cell) {
    if (!cell || !cell.champion) return false;
    const n = String(cell.champion.name || '').trim().toLowerCase();
    if (!n) return false;
    return ['kulup', 'milli'].some(k => {
        const m = String((managedTeams[k] && managedTeams[k].name) || '').trim().toLowerCase();
        return m && m === n;
    });
}

function trophyCupHtml(t, idx, won, h) {
    if (t.cupUrl) {
        return `<img src="${escapeHtml(t.cupUrl)}" alt="${escapeHtml(t.name)}" style="height:${h}px;max-width:${Math.round(h * 1.3)}px;object-fit:contain;${won ? 'filter:drop-shadow(0 8px 12px rgba(245,158,11,.4))' : 'filter:grayscale(1);opacity:.3'}">`;
    }
    const g = won ? ['#fde68a', '#f59e0b', '#b45309', '#d97706', '#92400e'] : ['#64748b', '#475569', '#334155', '#334155', '#1e293b'];
    const col = escapeHtml(t.colorHex || '#475569');
    const w = Math.round(h * 0.87);
    return `<svg width="${w}" height="${h}" viewBox="0 0 60 69" style="${won ? 'filter:drop-shadow(0 8px 12px rgba(245,158,11,.35))' : 'opacity:.35'}"><defs><linearGradient id="tcg${idx}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".55" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs><path d="M14 6h32v14c0 11-7 19-16 19S14 31 14 20z" fill="url(#tcg${idx})"/><path d="M14 10H5c0 10 4 16 12 18M46 10h9c0 10-4 16-12 18" fill="none" stroke="${g[3]}" stroke-width="3"/><rect x="26" y="38" width="8" height="12" fill="${g[3]}"/><rect x="16" y="50" width="28" height="8" rx="2" fill="${g[2]}"/><rect x="12" y="58" width="36" height="6" rx="2" fill="${g[4]}"/>${won ? `<circle cx="30" cy="22" r="7" fill="${col}" opacity=".9"/>` : ''}<path d="M22 10c3-2 12-2 16 0" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/></svg>`;
}

function renderTrophyCabinet() {
    const esc = (s) => escapeHtml(String(s));
    // Turnuva başına kazanılan sezonlar + sezon başına kazanılan turnuvalar
    const winsByT = {}, winsBySeason = {};
    tournamentsList.forEach(t => { winsByT[t.id] = []; });
    seasonsList.forEach(s => {
        winsBySeason[s] = [];
        tournamentsList.forEach(t => {
            const cell = trophyData[s] && trophyData[s][t.id];
            if (trophyIsMine(cell)) { winsByT[t.id].push(s); winsBySeason[s].push(t); }
        });
    });
    const wonT = tournamentsList.filter(t => winsByT[t.id].length).sort((a, b) => winsByT[b.id].length - winsByT[a.id].length);
    const lostT = tournamentsList.filter(t => !winsByT[t.id].length);
    const total = wonT.reduce((a, t) => a + winsByT[t.id].length, 0);
    const winSeasons = seasonsList.filter(s => winsBySeason[s].length).length;

    // ---- SOL: Cam vitrin ----
    const items = wonT.map(t => ({ t, won: true })).concat(trophyShowEmpty ? lostT.map(t => ({ t, won: false })) : []);
    const idxOf = (t) => tournamentsList.indexOf(t);
    let shelves = '';
    for (let i = 0; i < items.length; i += 3) {
        const row = items.slice(i, i + 3).map(({ t, won }) => {
            const ss = winsByT[t.id];
            const seasonTxt = ss.length > 3 ? ss.slice(0, 3).join(' · ') + ` +${ss.length - 3}` : ss.join(' · ');
            return `<div class="tc-item group" style="opacity:${won ? 1 : .55}">
                <button onclick="openTournamentModal('${t.id}')" class="tc-pen" title="Kupa görselini / turnuvayı düzenle"><i class="fa-solid fa-pen"></i></button>
                <div class="tc-cup">${trophyCupHtml(t, idxOf(t), won, 84)}</div>
                <div class="tc-name" title="${esc(t.name)}">${esc(t.name)}</div>
                ${won ? `<div class="tc-pill">×${ss.length}</div><div class="tc-ss">${esc(seasonTxt)}</div>` : '<div class="tc-ss">Henüz yok</div>'}
            </div>`;
        }).join('');
        shelves += `<div class="tc-shelf"><div class="tc-row">${row}</div><div class="tc-board"></div></div>`;
    }
    if (!items.length) {
        const noName = !(managedTeams.kulup && managedTeams.kulup.name) && !(managedTeams.milli && managedTeams.milli.name);
        shelves = `<div class="text-center text-slate-400 text-sm py-12 px-6">Henüz kazanılmış kupa yok.<br><span class="text-xs text-slate-500">Kupa, tablodaki şampiyon takım kutusuna ${noName ? 'yönettiğiniz takımın adını girdiğinizde (önce takım adını tanımlayın)' : '<b>' + esc(managedTeams.kulup.name || managedTeams.milli.name) + '</b> yazdığınızda'} dolaba eklenir.</span></div>`;
    }
    const left = `
        <div class="tc-col">
            <div class="tc-glass">${shelves}</div>
            <div class="flex items-center justify-between flex-wrap gap-2 mt-3 px-1">
                <div class="flex gap-5 text-xs text-slate-400">
                    <span><b class="text-amber-400 text-lg">${total}</b> kupa</span>
                    <span><b class="text-amber-400 text-lg">${wonT.length}</b> farklı turnuva</span>
                    <span><b class="text-amber-400 text-lg">${winSeasons}</b> kupalı sezon</span>
                </div>
                <button onclick="toggleTrophyEmpty()" class="tc-chip ${trophyShowEmpty ? 'on' : ''}">${trophyShowEmpty ? '<i class="fa-solid fa-eye-slash mr-1"></i>Kazanılmayanları gizle' : '<i class="fa-solid fa-eye mr-1"></i>Kazanılmayanları göster'}</button>
            </div>
        </div>`;

    // ---- SAĞ: Sezon zaman çizgisi ----
    let tl = '';
    seasonsList.slice().reverse().forEach(s => {
        const l = winsBySeason[s];
        tl += `<div class="tc-tl-item"><span class="tc-dot ${l.length ? 'on' : ''}"></span>
            <div class="flex items-center gap-2.5 flex-wrap mb-2">
                <b class="text-white text-base">${esc(s)}</b>
                ${l.length ? `<span class="tc-pill">${l.length} kupa</span>` : '<span class="text-xs text-slate-500">Kupa yok</span>'}
                ${l.length >= 3 ? '<span class="tc-star">★ SEZON ŞAMPİYONU</span>' : ''}
            </div>
            ${l.length ? `<div class="flex flex-wrap gap-2">${l.map(t => `<div class="tc-tile" style="border-color:${esc(t.colorHex || '#475569')};background:linear-gradient(135deg,${esc(t.colorHex || '#475569')}55,rgba(11,19,36,.9))"><span class="tc-tlogo"><img src="${esc(t.logoUrl)}" alt=""></span><b>${esc(t.name)}</b></div>`).join('')}</div>` : ''}
        </div>`;
    });
    const dist = wonT.length ? `
        <div class="mt-2 pt-4 border-t border-slate-700/60">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Kariyer toplamı · ${total} kupa</div>
            <div class="flex h-3 rounded-full overflow-hidden gap-0.5">${wonT.map(t => `<i style="flex:${winsByT[t.id].length};background:${esc(t.colorHex || '#475569')};filter:brightness(1.6)" title="${esc(t.name)}: ${winsByT[t.id].length}"></i>`).join('')}</div>
            <div class="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px]">${wonT.map(t => `<span><b class="text-amber-400">${winsByT[t.id].length}×</b> <span class="text-slate-500">${esc(t.name)}</span></span>`).join('')}</div>
        </div>` : '';
    const right = `<div class="tc-col"><div class="tc-timeline">${tl}</div>${dist}</div>`;

    return `<div class="flex-1 min-h-0 flex flex-col">
        <div class="tc-subtabs">
            <button onclick="setTrophyCabTab('vitrin')" class="${trophyCabTab === 'vitrin' ? 'on' : ''}" data-t="vitrin"><i class="fa-solid fa-trophy mr-1.5"></i>Vitrin</button>
            <button onclick="setTrophyCabTab('zaman')" class="${trophyCabTab === 'zaman' ? 'on' : ''}" data-t="zaman"><i class="fa-solid fa-timeline mr-1.5"></i>Zaman Çizelgesi</button>
        </div>
        <div class="tc-split flex-1 min-h-0" data-tab="${trophyCabTab}">
            <div class="tc-pane tc-pane-v">${left}</div>
            <div class="tc-pane tc-pane-t">${right}</div>
        </div>
    </div>`;
}

        // Turnuva sütunlarını (kare) pencere genişliğine göre ölçekler
        function trophyFitCols() {
            const tbl = document.getElementById('tc-table');
            if (!tbl || !tournamentsList.length) return;
            const wrap = tbl.parentElement;
            const sc = (typeof currentScale === 'number' && currentScale > 0) ? currentScale : 1;
            const avail = wrap.clientWidth / sc - 64 - 4; // 64px: sol sezon sütunu
            const size = Math.max(52, Math.min(140, Math.floor(avail / tournamentsList.length)));
            tbl.style.setProperty('--tcol', size + 'px');
        }
        if (!window.__tcFitBound) {
            window.__tcFitBound = true;
            window.addEventListener('resize', () => trophyFitCols());
        }

        // --- KUPALAR TABLOSU ---
        function renderTrophiesGrid() {
            setTimeout(trophyFitCols, 0);
            let html = `
                <div class="w-full flex flex-wrap justify-between items-center mb-3 px-2 shrink-0 gap-y-2 gap-x-3">
                    <div class="flex items-center gap-3">
                        <h3 class="text-2xl font-bold text-white"><i class="fa-solid fa-trophy text-yellow-500"></i></h3>
                        <div class="tc-tg">
                            <button onclick="setTrophyView('table')" class="${trophyView === 'table' ? 'on' : ''}"><i class="fa-solid fa-table-cells mr-1.5"></i>Tablo</button>
                            <button onclick="setTrophyView('cabinet')" class="${trophyView === 'cabinet' ? 'on' : ''}"><i class="fa-solid fa-trophy mr-1.5"></i>Kupa Dolabı</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        ${trophyView === 'table' ? renderTrophyModes('web') : ''}
                        ${getScaleSelectorHtml()}
                        ${trophyView === 'table' ? `<button onclick="addTournamentColumn()" class="hidden sm:flex items-center justify-center w-7 h-7 rounded-md bg-transparent hover:bg-yellow-400/10 text-yellow-400 hover:text-yellow-300 transition-colors" title="Kupa Ekle"><i class="fa-solid fa-plus text-base"></i></button>` : ''}
                    </div>
                </div>
            `;

            if (trophyView === 'cabinet') {
                html = html.replace(getScaleSelectorHtml(), '');
                html += renderTrophyCabinet();
                updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
                return;
            }

            // --- 1. MASAÜSTÜ GÖRÜNÜMÜ (Orijinal Yön: Satırlar = Sezonlar, Sütunlar = Turnuvalar) ---
            html += `
                ${renderTrophyModes()}<div class="${trophyMobMode === 'grid' ? 'hidden sm:block' : 'hidden'} w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table id="tc-table" class="border-separate border-spacing-0 text-sm origin-top-left" style="--tcol:96px; transform: scale(${currentScale}); transform-origin: top left; width: max-content; table-layout: fixed;">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <th class="p-1 sticky left-0 bg-slate-950 z-[50] border-r border-b border-slate-700 w-16 min-w-[64px] shadow-[2px_0_5px_rgba(0,0,0,0.2)] align-middle">
                                    <i class="fa-solid fa-calendar-days text-slate-500 text-2xl"></i>
                                </th>
            `;
            
            tournamentsList.forEach((t, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === tournamentsList.length - 1;
                html += `
                    <th class="p-1.5 border-r border-b border-slate-700 w-24 min-w-[96px] max-w-[96px] h-24 bg-slate-900 group relative">
                        <div class="flex items-center justify-center h-full w-full mx-auto" title="${t.name}">
                            <div class="logo-spot flex items-center justify-center h-16 w-16 transition-transform group-hover:scale-105">
                                <img src="${t.logoUrl}" alt="${t.name}" class="max-w-full max-h-full object-contain logo-out">
                            </div>
                        </div>
                        <button onclick="openTournamentModal('${t.id}')" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-800 text-white rounded p-1.5 text-xs z-[45] transition-opacity hover:bg-blue-600" title="Turnuvayı Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <div class="absolute bottom-1 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-[45]">
                            <button onclick="moveTournamentColumn('${t.id}', -1)" class="bg-slate-800 hover:bg-emerald-600 text-white rounded px-2 py-0.5 text-[10px] ${isFirst ? 'invisible' : ''}" title="Sola Taşı">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button onclick="moveTournamentColumn('${t.id}', 1)" class="bg-slate-800 hover:bg-emerald-600 text-white rounded px-2 py-0.5 text-[10px] ${isLast ? 'invisible' : ''}" title="Sağa Taşı">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </th>`;
            });

            // (Kupa Ekle butonu artık üst çubukta)

            html += `</tr></thead><tbody>`;

            seasonsList.forEach(season => {
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">
                            <td class="p-1 py-2 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 font-bold text-slate-200 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-16 min-w-[64px] align-middle relative">
                                <span class="text-emerald-500 text-xs">${season}</span>
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
                        <td class="p-0 dynamic-bg relative group h-28 w-28 sm:w-24 sm:min-w-[96px] sm:max-w-[96px] sm:h-24 align-middle" 
                            style="background-color: ${t.colorHex}22; border-color: ${t.colorHex}66;">
                            ${logosHtml}
                            <button onclick="openTrophyModal('${season}', '${t.id}', '${t.name}')" 
                                    class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-800 hover:bg-emerald-500 text-white border border-slate-600 hover:border-emerald-400 rounded-md w-7 h-7 flex items-center justify-center transition-all duration-200 z-[20]"
                                    title="${t.name} Takım Ekle">
                                <i class="fa-solid fa-plus text-xs"></i>
                            </button>
                        </td>
                    `;
                });
                html += `</tr>`;
            });
            
            html += `<tr>
                        <td colspan="100%" class="p-2 text-center bg-slate-900/50">
                            <button onclick="addNewSeason()" class="text-emerald-500 hover:text-white text-xs font-bold py-2 px-4 border border-emerald-600 rounded transition-colors"><i class="fa-solid fa-plus mr-1"></i> Yeni Sezon Ekle</button>
                        </td>
                    </tr>`;

            html += `</tbody></table></div>`;

            // --- 2. MOBİL GÖRÜNÜM (Ters Çevrilmiş Yön: Satırlar = Turnuvalar, Sütunlar = Sezonlar) ---
            html += `
                ${renderTrophyMobile()}<div class="hidden w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-1 min-h-0 relative pb-4">
                    <table class="w-max min-w-full border-separate border-spacing-0 text-sm origin-top-left" style="zoom: ${currentScale}; width: max-content;">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <th class="p-2 sticky left-0 bg-slate-950 z-[50] border-r border-b border-slate-700 w-24 min-w-[96px] shadow-[2px_0_5px_rgba(0,0,0,0.2)] align-middle text-center">
                                    <i class="fa-solid fa-trophy text-slate-500 text-2xl"></i>
                                </th>
            `;
            
            seasonsList.forEach(season => {
                html += `
                    <th class="p-2 border-r border-b border-slate-700 bg-slate-900 text-center font-bold text-emerald-500 min-w-[120px] relative group align-middle">
                        ${season}
                        <button onclick="deleteSeason('${season}')" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                    </th>
                `;
            });

            html += `
                    <th class="p-2 border-r border-b border-slate-700 bg-slate-900 align-middle w-12 min-w-[48px] text-center">
                        <button onclick="addNewSeason()" class="text-emerald-500 hover:text-emerald-400" title="Yeni Sezon Ekle"><i class="fa-solid fa-plus-circle text-lg"></i></button>
                    </th>
                </tr></thead><tbody>
            `;

            tournamentsList.forEach((t, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === tournamentsList.length - 1;
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">`;
                
                // Turnuva Logosu (Sabit Sol Sütun)
                html += `
                    <td class="p-2 py-4 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-24 min-w-[96px] align-middle relative group/tour">
                        <div class="flex items-center justify-center h-16 w-full mx-auto" title="${t.name}">
                            <div class="logo-spot flex items-center justify-center h-14 w-14 transition-transform group-hover/tour:scale-105 mx-auto">
                                <img src="${t.logoUrl}" alt="${t.name}" class="max-w-full max-h-full object-contain logo-out">
                            </div>
                        </div>
                        <button onclick="openTournamentModal('${t.id}')" class="absolute top-1 right-1 opacity-0 group-hover/srow:opacity-100 bg-slate-800 text-white rounded p-1 text-[10px] z-[45] transition-opacity hover:bg-blue-600" title="Turnuvayı Düzenle">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <div class="absolute bottom-1 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover/srow:opacity-100 transition-opacity z-[45]">
                            <button onclick="moveTournamentColumn('${t.id}', -1)" class="bg-slate-800 hover:bg-emerald-600 text-white rounded px-1.5 py-0.5 text-[8px] ${isFirst ? 'invisible' : ''}" title="Yukarı Taşı">
                                <i class="fa-solid fa-chevron-up"></i>
                            </button>
                            <button onclick="moveTournamentColumn('${t.id}', 1)" class="bg-slate-800 hover:bg-emerald-600 text-white rounded px-1.5 py-0.5 text-[8px] ${isLast ? 'invisible' : ''}" title="Aşağı Taşı">
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>
                    </td>
                `;

                // Sezonlardaki Kupalar (Hücreler)
                seasonsList.forEach(season => {
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
                        <td class="p-0 dynamic-bg relative group h-28 w-28 sm:w-24 sm:min-w-[96px] sm:max-w-[96px] sm:h-24 align-middle" 
                            style="background-color: ${t.colorHex}22; border-color: ${t.colorHex}66;">
                            ${logosHtml}
                            <button onclick="openTrophyModal('${season}', '${t.id}', '${t.name}')" 
                                    class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-800 hover:bg-emerald-500 text-white border border-slate-600 hover:border-emerald-400 rounded-md w-7 h-7 flex items-center justify-center transition-all duration-200 z-[20]"
                                    title="${t.name} Takım Ekle">
                                <i class="fa-solid fa-plus text-xs"></i>
                            </button>
                        </td>
                    `;
                });
                
                // Artı (Yeni Sezon) Sütununu Hizalama Boşluğu
                html += `</tr>`;
            });

            html += `
                    <tr>
                        <td colspan="100%" class="p-2 text-center bg-slate-900/50">
                            <button onclick="addTournamentColumn()" class="text-emerald-500 hover:text-white text-xs font-bold py-2 px-4 border border-emerald-600 rounded transition-colors"><i class="fa-solid fa-plus mr-1"></i> Yeni Kupa Ekle</button>
                        </td>
                    </tr>
                </tbody></table></div>
            `;
            
            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        // --- MOBİL KUPALAR: A (sabit ölçekli sıkı ızgara) + D (sezon seçici + kutucuklar) ---
        let trophyMobMode = 'grid';      // 'grid' | 'season'
        let trophyMobSeason = null;
        function setTrophyMobMode(m) { trophyMobMode = m; renderTrophiesGrid(); }
        function setTrophyMobSeason(s) { trophyMobSeason = s; renderTrophiesGrid(); }
        function renderTrophyModes(web) {
            return `<div class="tm-modes${web ? ' tm-modes-web' : ''}">
                <button onclick="setTrophyMobMode('grid')" class="${trophyMobMode === 'grid' ? 'on' : ''}"><i class="fa-solid fa-table-cells mr-1.5"></i>Izgara</button>
                <button onclick="setTrophyMobMode('season')" class="${trophyMobMode === 'season' ? 'on' : ''}"><i class="fa-solid fa-trophy mr-1.5"></i>Sezon</button>
            </div>`;
        }
        function renderTrophyMobile() {
            const q = (v) => String(v == null ? '' : v).replace(/'/g, "\\'").replace(/"/g, '&quot;');
            const cellOf = (season, t) => (trophyData[season] && trophyData[season][t.id]) ? trophyData[season][t.id] : null;
            let h = `<div class="${trophyMobMode === 'grid' ? 'sm:hidden ' : ''}w-full flex-1 min-h-0 flex flex-col">
                <div class="tm-body table-scroll">`;

            if (trophyMobMode === 'grid') {
                h += `<table class="tm-tbl"><thead><tr><th class="tm-corner"><i class="fa-solid fa-trophy"></i></th>`;
                seasonsList.forEach(se => { h += `<th class="tm-sh">${se}</th>`; });
                h += `<th class="tm-add"><button onclick="addNewSeason()"><i class="fa-solid fa-plus-circle"></i></button></th></tr></thead><tbody>`;
                tournamentsList.forEach(t => {
                    h += `<tr><td class="tm-tl" onclick="openTournamentModal('${t.id}')"><div class="tm-tile" title="${q(t.name)}">${t.logoUrl ? `<img src="${t.logoUrl}" alt="">` : ''}</div></td>`;
                    seasonsList.forEach(se => {
                        const c = cellOf(se, t);
                        let inner = '';
                        if (c && c.champion && c.champion.logoUrl) inner += `<img class="tm-champ" src="${c.champion.logoUrl}" title="${q(c.champion.name)}" alt="">`;
                        if (c && c.runnerUp && c.runnerUp.logoUrl) inner += `<img class="tm-ru" src="${c.runnerUp.logoUrl}" title="${q(c.runnerUp.name)}" alt="">`;
                        h += `<td class="tm-c" style="background:${t.colorHex}22;border-color:${t.colorHex}55" onclick="openTrophyModal('${se}','${t.id}','${q(t.name)}')"><div class="tm-cin">${inner}</div></td>`;
                    });
                    h += `<td class="tm-pad"></td></tr>`;
                });
                h += `</tbody></table>`;
            } else {
                if (!trophyMobSeason || !seasonsList.includes(trophyMobSeason)) trophyMobSeason = seasonsList[0];
                h += `<div class="tm-chips">`;
                seasonsList.forEach(se => { h += `<button onclick="setTrophyMobSeason('${se}')" class="${se === trophyMobSeason ? 'on' : ''}">${se}</button>`; });
                h += `<button onclick="addNewSeason()" class="tm-plus"><i class="fa-solid fa-plus"></i></button></div><div class="tm-grid">`;
                tournamentsList.forEach(t => {
                    const c = cellOf(trophyMobSeason, t);
                    const has = c && c.champion && c.champion.logoUrl;
                    h += `<div class="tm-card" style="background:linear-gradient(160deg,${t.colorHex}aa,#0b1220);border-color:${t.colorHex}" onclick="openTrophyModal('${trophyMobSeason}','${t.id}','${q(t.name)}')">
                        <div class="tm-top"><span class="tm-mini">${t.logoUrl ? `<img src="${t.logoUrl}" alt="">` : ''}</span><span class="tm-nm">${escapeHtml(t.name)}</span></div>
                        ${has ? `<img class="tm-big" src="${c.champion.logoUrl}" alt="">` : `<div class="tm-empty">+</div>`}
                        <div class="tm-who">${has ? escapeHtml(c.champion.name || '') : '—'}</div>
                        ${c && c.runnerUp && c.runnerUp.logoUrl ? `<img class="tm-ru2" src="${c.runnerUp.logoUrl}" title="${q(c.runnerUp.name)}" alt="">` : ''}
                    </div>`;
                });
                h += `</div>`;
            }
            h += `<div class="tm-newcup"><button onclick="addTournamentColumn()"><i class="fa-solid fa-plus mr-1"></i> Yeni Kupa Ekle</button></div></div></div>`;
            return h;
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
            
            tourSetSelect('tour-name-input', tObj.name === 'Yeni Kupa' ? '' : tObj.name, 'all');
            document.getElementById('tour-url-input').value = tObj.logoUrl;
            document.getElementById('tour-color-input').value = tObj.colorHex;
            document.getElementById('cup-url-input').value = tObj.cupUrl || '';
            fileUploads.cup = null;
            document.getElementById('cup-file-input').value = '';
            document.getElementById('cup-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            
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
            if (!name || name === '__NEW__') { alert('Lütfen listeden bir turnuva seçin.'); return; }
            if (tournamentsList.some(t => t.id !== editingTournamentId && tourNorm(t.name) === tourNorm(name))) { alert('Bu turnuva tabloda zaten var.'); return; }
            const url = document.getElementById('tour-url-input').value.trim();
            const _ce = tourFind(name);
            const color = _ce ? _ce.c : document.getElementById('tour-color-input').value;
            const finalLogo = fileUploads.tournament || url;

            const tObj = tournamentsList.find(t => t.id === editingTournamentId);
            if (name) tObj.name = name;
            if (finalLogo) tObj.logoUrl = finalLogo;
            if (color) tObj.colorHex = color;
            const cupRaw = document.getElementById('cup-url-input').value.trim();
            tObj.cupUrl = fileUploads.cup || (cupRaw.startsWith('Yerel Dosya') ? (tObj.cupUrl || '') : cupRaw);

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

        function moveTournamentColumn(tourId, direction) {
            const index = tournamentsList.findIndex(t => t.id === tourId);
            if (index === -1) return;
            
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= tournamentsList.length) return;
            
            // Yer değiştir
            const temp = tournamentsList[index];
            tournamentsList[index] = tournamentsList[newIndex];
            tournamentsList[newIndex] = temp;
            
            saveToLocalStorage();
            renderTrophiesGrid();
        }

        // --- MAÇLAR TABLOSU ---
        // ===================== İSTATİSTİK (MAÇLAR) TABLOSU: mobilde dikey düzen (takımlar yukarıdan aşağı, sezonlar soldan sağa) =====================
        function renderMatchesGrid() {
            if (window.innerWidth < 640) renderMatchesGridVertical();
            else renderMatchesGridHorizontal();
        }
        if (typeof window !== 'undefined' && !window.__mgResizeBound) {
            window.__mgResizeBound = true;
            window.__mgMobile = window.innerWidth < 640;
            window.addEventListener('resize', () => {
                const m = window.innerWidth < 640;
                if (m !== window.__mgMobile) {
                    window.__mgMobile = m;
                    if (typeof activeMain !== 'undefined' && activeMain === 'maclar') renderMatchesGrid();
                }
            });
        }

        function matchRecordHtml(oppId) {
            let w = 0, d = 0, l = 0;
            const cd = matchDataStore[matchContext] || {};
            Object.values(cd).forEach(sd => {
                if (sd && sd[oppId]) sd[oppId].forEach(m => {
                    if (!m || !m.result) return;
                    if (m.result === 'W') w++; else if (m.result === 'L') l++; else if (m.result === 'D') d++;
                });
            });
            if (w + d + l === 0) return '-';
            return `<span style="color:#22c55e">${w}</span><span style="color:#64748b">/</span><span style="color:#fbbf24">${d}</span><span style="color:#64748b">/</span><span style="color:#ef4444">${l}</span>`;
        }

        function renderMatchesGridVertical() {
            const team = managedTeams[matchContext];
            const opps = opponentsConfig[matchContext];
            const jsq = (s) => String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');

            const getWinRate = (oppId) => {
                let w = 0, played = 0;
                const contextData = matchDataStore[matchContext] || {};
                Object.values(contextData).forEach(seasonData => {
                    if (seasonData[oppId]) {
                        seasonData[oppId].forEach(match => {
                            if (match && match.result) { played++; if (match.result === 'W') w++; }
                        });
                    }
                });
                if (played === 0) return null;
                return Math.round((w / played) * 100);
            };
            const getWinRateColorClass = (rate) => {
                if (rate === null) return 'text-slate-500';
                if (rate === 100) return 'text-indigo-400';
                if (rate >= 75) return 'text-green-500';
                if (rate >= 50) return 'text-orange-500';
                return 'text-red-500';
            };

            // Takımları ülkelere göre grupla (yatay tablodaki sıralama ile birebir aynı)
            const sortTeamsByCountry = (teamsArr) => {
                const filledTeams = teamsArr.filter(t => t.name && t.name.trim() !== '');
                const countryMap = {};
                filledTeams.forEach(t => {
                    const c = (t.country || '').trim().toUpperCase() || 'BİLİNMEYEN';
                    if (!countryMap[c]) countryMap[c] = [];
                    countryMap[c].push(t);
                });
                const sortedCountries = Object.keys(countryMap).sort((a, b) => {
                    const countDiff = countryMap[b].length - countryMap[a].length;
                    if (countDiff !== 0) return countDiff;
                    if (a === 'BİLİNMEYEN') return 1;
                    if (b === 'BİLİNMEYEN') return -1;
                    return a.localeCompare(b, 'tr', { sensitivity: 'base' });
                });
                let sortedFilled = [];
                sortedCountries.forEach(c => {
                    sortedFilled.push(...countryMap[c].sort((a, b) => a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' })));
                });
                teamsArr.length = 0;
                if (sortedFilled.length === 0) {
                    teamsArr.push({ id: `empty_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`, name: '', logoUrl: '', country: '' });
                } else {
                    teamsArr.push(...sortedFilled);
                }
            };
            sortTeamsByCountry(opps.domestic.teams);
            opps.foreign.forEach(grp => sortTeamsByCountry(grp.teams));

            const colCount = seasonsList.length + 3; // rakip sütunu + sezonlar + (+) sütunu + dolgu sütunu

            let html = `
                <div class="w-full flex flex-nowrap justify-between items-center mb-3 px-2 shrink-0 gap-4 overflow-x-auto hide-scrollbar">
                    <div class="flex items-center shrink-0">
                        <h3 class="text-2xl font-bold text-white"><i class="fa-solid fa-chart-simple text-emerald-500"></i></h3>
                        <div class="hidden sm:flex items-center gap-1 ml-3">${[['all', 'Tümü'], ['domestic', 'Yurt İçi'], ['europe', 'Avrupa']].map(([k, l]) => `<button onclick="matchGridSetFilter('${k}')" class="px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${matchGridFilter === k ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}">${l}</button>`).join('')}</div>
                    </div>
                    <div class="flex flex-nowrap items-center gap-2 shrink-0 ml-auto">
                        <button onclick="addNewForeignGroup()" class="bg-blue-900/50 hover:bg-blue-800 text-blue-300 w-8 h-8 flex items-center justify-center rounded text-xs border border-blue-800 transition-colors shrink-0" title="Yeni Kıta Grubu Ekle"><i class="fa-solid fa-plus"></i></button>
                        <div class="shrink-0 flex items-center">
                            ${getScaleSelectorHtml()}
                        </div>
                        <div class="flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shadow-lg shrink-0 ml-1">
                            <button onclick="matchContext='kulup'; renderMatchesGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${matchContext === 'kulup' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Kulüp</button>
                            <button onclick="matchContext='milli'; renderMatchesGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${matchContext === 'milli' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Milli</button>
                        </div>
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-initial sm:flex-1 min-h-0 relative pb-4">
                    <table class="w-max min-w-full border-separate border-spacing-0 text-sm origin-top-left" style="zoom: ${currentScale}; width: max-content;">
                        <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                            <tr>
                                <th class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-950 z-[60] min-w-[80px] w-20 align-middle shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                                    <div class="relative group cursor-pointer" onclick="openManagedTeamModal()">
                                        <img src="${team.logoUrl}" alt="${escapeHtml(team.name)}" class="w-12 h-12 mx-auto object-contain drop-shadow-lg" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=random&color=fff'">
                                    </div>
                                </th>`;

            // SEZON BAŞLIKLARI (soldan sağa)
            seasonsList.forEach(season => {
                html += `<th class="p-1 border-r border-b border-slate-700 min-w-[64px] w-[64px] max-w-[64px] text-center align-middle cursor-pointer hover:bg-slate-800 transition-colors" onclick="openSeasonStatsModal('${jsq(season)}')" title="Sezon İstatistikleri">
                            <div class="text-xs font-bold tracking-wider text-emerald-500 whitespace-nowrap">${season}</div>
                            <button onclick="event.stopPropagation(); deleteSeason('${jsq(season)}')" class="mt-0.5 text-red-500/60 hover:text-red-400 transition-colors" title="Sezonu Sil"><i class="fa-solid fa-trash text-[9px]"></i></button>
                        </th>`;
            });
            html += `<th class="p-1 border-b border-slate-700 min-w-[48px] bg-slate-950 text-center align-middle">
                        <button onclick="addNewSeason()" class="text-emerald-500 hover:text-emerald-400" title="Yeni Sezon Ekle"><i class="fa-solid fa-plus-circle text-lg"></i></button>
                     </th>
                     <th class="border-b border-slate-700 w-full bg-slate-950"></th></tr></thead><tbody>`;

            const renderMatchCell = (season, opp, grpColor) => {
                if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};
                const cellData = matchDataStore[matchContext][season][opp.id] || [];
                const hasData = cellData.some(m => m && (m.result || m.fixtureId));
                const clickAttr = `onclick="openMatchEditor('${jsq(season)}', '${jsq(opp.id)}', '${jsq(opp.name)}')"`;
                const base = 'p-1 border-r border-b border-slate-700 align-middle cursor-pointer hover:bg-slate-700 transition-colors min-w-[64px] w-[64px] max-w-[64px]';
                if (!hasData) return `<td class="${base}" style="background-color: ${grpColor}15" ${clickAttr}></td>`;
                const boxesHtml = cellData.map(match => {
                    if (!match || (!match.result && !match.fixtureId)) return '';
                    const loc = match.location === 'H' ? 'E' : (match.location === 'A' ? 'D' : 'T');
                    const hasScore = (match.teamScore !== '' && match.teamScore !== undefined && match.oppScore !== '' && match.oppScore !== undefined);
                    const scoreStr = hasScore ? `${match.teamScore}-${match.oppScore}` : '-';
                    const resultClass = match.result ? `match-${match.result}` : 'bg-slate-600 border-slate-500 opacity-70';
                    return `<div class="match-box ${resultClass}" title="${loc} | ${escapeHtml(match.tournament || '')}\nSkor: ${scoreStr}"><span class="score-display">${scoreStr}</span></div>`;
                }).join('');
                return `<td class="${base}" style="background-color: ${grpColor}15" ${clickAttr}>
                            <div class="flex flex-col items-center justify-center gap-1 w-full mx-auto rounded">${boxesHtml}</div>
                        </td>`;
            };

            const renderOpponentCell = (opp, groupType, groupIndex, index, grpColor) => {
                const winRate = opp.name ? getWinRate(opp.id) : null;
                const winRateStr = matchRecordHtml(opp.id);
                const flag = (opp.name && opp.country) ? getFlagIcon(opp.country) : '';
                const logoBox = opp.name
                    ? `<div class="logo-spot relative h-10 w-10 mx-auto">
                            <img src="${getTeamLogoByName(opp.name)}" title="${escapeHtml(opp.name)}" class="w-full h-full object-contain logo-out">
                            ${flag ? `<span class="absolute -bottom-1 -right-1 scale-[0.6] origin-bottom-right drop-shadow">${flag}</span>` : ''}
                       </div>`
                    : `<div class="h-10 w-10 mx-auto rounded border border-dashed border-slate-600 flex items-center justify-center text-slate-500"><i class="fa-solid fa-plus text-xs"></i></div>`;
                return `<td class="p-1 border-r border-b border-slate-700 sticky left-0 bg-slate-950 z-[30] min-w-[80px] w-20 align-middle cursor-pointer hover:bg-slate-800 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.2)]" onclick="handleOpponentClick('${groupType}', ${groupIndex}, ${index})">
                            ${logoBox}
                            <div class="text-[10px] font-bold mt-0.5 text-center ${getWinRateColorClass(winRate)}" title="G / B / M">${winRateStr}</div>
                        </td>`;
            };

            const renderGroup = (grp, groupType, groupIndex) => {
                let g = `<tr><td colspan="${colCount}" class="p-0 border-b border-slate-700" style="background-color: ${grp.color}90">
                            <div class="sticky left-0 w-max flex items-center gap-2 px-2 py-1 text-xs font-bold tracking-widest text-white">
                                <span>${grp.name}</span>
                                <button onclick="openGroupEditorModal('${groupType}', ${groupIndex})" class="bg-slate-800 p-1 rounded text-[10px] text-white" title="Grubu Düzenle/Sil"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="addOpponentColumn('${groupType}', ${groupIndex})" class="bg-emerald-600 p-1 rounded text-[10px] text-white" title="Takım Ekle"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </td></tr>`;
                grp.teams.forEach((opp, i) => {
                    g += `<tr class="hover:bg-slate-800/50 transition-colors">${renderOpponentCell(opp, groupType, groupIndex, i, grp.color)}`;
                    seasonsList.forEach(season => { g += renderMatchCell(season, opp, grp.color); });
                    g += `<td class="border-b border-slate-800 bg-slate-900/10"></td><td class="border-b border-slate-800 bg-slate-900/10 w-full"></td></tr>`;
                });
                return g;
            };

            html += renderGroup(opps.domestic, 'domestic', 0);
            opps.foreign.forEach((grp, gIdx) => { html += renderGroup(grp, 'foreign', gIdx); });
            html += `</tbody></table></div>`;

            updateContentArea(`<div class="w-full flex flex-col h-full min-h-0 overflow-hidden">${html}</div>`);
        }

        let matchGridFilter = 'all';
        function matchGridSetFilter(k) { matchGridFilter = k; renderMatchesGrid(); }

        function seasonRecordHtml(season) {
            let w = 0, d = 0, l = 0;
            const sd = (matchDataStore[matchContext] || {})[season] || {};
            Object.values(sd).forEach(arr => (arr || []).forEach(m => {
                if (!m || !m.result) return;
                if (m.result === 'W') w++; else if (m.result === 'L') l++; else if (m.result === 'D') d++;
            }));
            return `<span style="color:#22c55e">${w}</span><span style="color:#64748b">/</span><span style="color:#fbbf24">${d}</span><span style="color:#64748b">/</span><span style="color:#ef4444">${l}</span>`;
        }

        function matchNetTint(cellData, fallback) {
            let w = 0, d = 0, l = 0;
            cellData.forEach(m => {
                if (!m || !m.result) return;
                if (m.result === 'W') w++; else if (m.result === 'L') l++; else if (m.result === 'D') d++;
            });
            if (w + d + l === 0) return fallback;
            return w > l ? '#4ade80' : (l > w ? '#f87171' : '#fbbf24');
        }

        function renderMatchesGridHorizontal() {
            const team = managedTeams[matchContext];
            const oppsFull = opponentsConfig[matchContext];
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
            sortTeamsByCountry(oppsFull.domestic.teams);
            oppsFull.foreign.forEach(grp => sortTeamsByCountry(grp.teams));
            const opps = {
                domestic: matchGridFilter === 'europe' ? Object.assign({}, oppsFull.domestic, { teams: [] }) : oppsFull.domestic,
                foreign: matchGridFilter === 'domestic' ? [] : oppsFull.foreign
            };
            
            let html = `
                <div class="w-full flex flex-nowrap justify-between items-center mb-3 px-2 shrink-0 gap-4 overflow-x-auto hide-scrollbar">
                    <div class="flex items-center shrink-0">
                        <h3 class="text-2xl font-bold text-white"><i class="fa-solid fa-chart-simple text-emerald-500"></i></h3>
                        <div class="hidden sm:flex items-center gap-1 ml-3">${[['all', 'Tümü'], ['domestic', 'Yurt İçi'], ['europe', 'Avrupa']].map(([k, l]) => `<button onclick="matchGridSetFilter('${k}')" class="px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${matchGridFilter === k ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}">${l}</button>`).join('')}</div>
                    </div>

                    <div class="flex flex-nowrap items-center gap-2 shrink-0 ml-auto">
                        <button onclick="addNewForeignGroup()" class="bg-blue-900/50 hover:bg-blue-800 text-blue-300 w-8 h-8 flex items-center justify-center rounded text-xs border border-blue-800 transition-colors shrink-0" title="Yeni Kıta Grubu Ekle"><i class="fa-solid fa-plus"></i></button>
                        <div class="shrink-0 flex items-center">
                            ${getScaleSelectorHtml()}
                        </div>
                        <div class="flex gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shadow-lg shrink-0 ml-1">
                            <button onclick="matchContext='kulup'; renderMatchesGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${matchContext === 'kulup' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Kulüp</button>
                            <button onclick="matchContext='milli'; renderMatchesGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${matchContext === 'milli' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Milli</button>
                        </div>
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-initial sm:flex-1 min-h-0 relative pb-4">
                    <table class="w-max min-w-full border-separate border-spacing-0 text-sm origin-top-left" style="zoom: ${currentScale}; width: max-content;">
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
            html += `<th ${opps.domestic.teams.length === 0 ? 'hidden' : ''} colspan="${opps.domestic.teams.length}" class="p-1 border-r border-b border-slate-700 text-center font-bold text-xs tracking-widest text-white group relative" style="background-color: ${opps.domestic.color}90">
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
            html += `<th class="border-b border-slate-700 w-full bg-slate-950"></th></tr><tr>`;

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
                    const countryLbl = (matchGridFilter === 'europe' && run.country && run.country !== 'BİLİNMEYEN') ? `<div class="text-[9px] font-bold tracking-wider text-white/80 leading-none mt-0.5 truncate">${run.country}</div>` : '';
                    countryHtml += `<th colspan="${run.count}" class="p-1 border-r border-b border-slate-700 text-center shadow-inner overflow-hidden" style="background-color: ${grpColor}70">${flagContent}${countryLbl}</th>`;
                });
                return countryHtml;
            };

            html += renderCountryRow(opps.domestic.teams, opps.domestic.color);
            opps.foreign.forEach(grp => {
                html += renderCountryRow(grp.teams, grp.color);
            });
            html += `<th class="border-b border-slate-700 w-full bg-slate-950"></th></tr><tr>`;

            // 3. SATIR: TAKIM LOGOLARI
            const renderOpponentHeader = (opp, groupType, groupIndex, index, grpColor) => {
                const winRate = getWinRate(opp.id);
                const winRateStr = matchRecordHtml(opp.id);
                const winRateColor = getWinRateColorClass(winRate);
                return `
                    <th class="p-1 border-r border-b border-slate-700 min-w-[46px] w-[46px] max-w-[46px] relative group cursor-pointer hover:bg-slate-800 transition-colors align-top" style="background-color: ${grpColor}40" onclick="handleOpponentClick('${groupType}', ${groupIndex}, ${index})">
                        <div class="h-9 w-9 mx-auto hover:scale-110 transition-transform">
                            <img src="${getTeamLogoByName(opp.name)}" title="${opp.name}" class="w-full h-full object-contain">
                        </div>
                        <div class="text-[10px] font-bold mt-1 text-center ${winRateColor}" title="G / B / M">${winRateStr}</div>
                    </th>`;
            };

            opps.domestic.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'domestic', 0, i, opps.domestic.color));
            opps.foreign.forEach((grp, gIdx) => {
                grp.teams.forEach((opp, i) => html += renderOpponentHeader(opp, 'foreign', gIdx, i, grp.color));
            });
            html += `<th class="border-b border-slate-700 w-full bg-slate-950"></th></tr></thead><tbody>`;

            // 4. SATIRLAR: MAÇ SONUÇLARI KUTULARI
            seasonsList.forEach((season, sIdx) => {
                html += `<tr class="hover:bg-slate-800/50 transition-colors group/srow">
                            <td class="p-0 py-4 sticky left-0 bg-slate-950 z-[30] border-r border-b border-slate-700 font-bold text-slate-200 text-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] w-24 min-w-[96px] align-middle cursor-pointer hover:bg-slate-800 transition-colors relative" onclick="openSeasonStatsModal('${season}')" title="Sezon İstatistikleri">
                                <div class="mx-auto text-sm tracking-widest whitespace-nowrap text-emerald-500">${season}</div>
                                <div class="mt-1 text-[10px] font-black leading-none">${seasonRecordHtml(season)}</div>
                                <button onclick="event.stopPropagation(); deleteSeason('${season}')" class="absolute top-1 left-1 opacity-0 group-hover/srow:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                            </td>`;

                const renderMatchCell = (opp, grpColor) => {
                    if (!matchDataStore[matchContext][season]) matchDataStore[matchContext][season] = {};
                    let cellData = matchDataStore[matchContext][season][opp.id] || [];
                    
                    let hasData = cellData.some(m => m && (m.result || m.fixtureId)); 
                    
                    if (!hasData) {
                        return `<td class="p-1 border-r border-b border-slate-700 align-top cursor-pointer hover:bg-slate-700 transition-colors min-w-[46px] w-[46px] max-w-[46px]" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')"></td>`;
                    }

                    grpColor = matchNetTint(cellData, grpColor);
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

                    return `<td class="p-1 border-r border-b border-slate-700 align-top cursor-pointer hover:bg-slate-700 transition-colors min-w-[46px] w-[46px] max-w-[46px]" style="background-color: ${grpColor}15" onclick="openMatchEditor('${season}', '${opp.id}', '${opp.name}')">
                                <div class="flex flex-col items-center justify-start gap-1 w-full mx-auto rounded">${boxesHtml}</div>
                            </td>`;
                };

                opps.domestic.teams.forEach(opp => html += renderMatchCell(opp, opps.domestic.color));
                opps.foreign.forEach(grp => {
                    grp.teams.forEach(opp => html += renderMatchCell(opp, grp.color));
                });
                
                html += `<td class="border-b border-slate-800 bg-slate-900/10 w-full"></td></tr>`;
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
            
            renderThemeFamilySwatches();

            const modal = document.getElementById('managed-team-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeManagedTeamModal() {
            document.getElementById('managed-team-modal').classList.add('hidden');
            document.getElementById('managed-team-modal').classList.remove('flex');
        }

        function updateSiteFavicon() {
            const logoUrl = managedTeams && managedTeams.kulup && managedTeams.kulup.logoUrl ? managedTeams.kulup.logoUrl : 'favicon.png';
            let link = document.querySelector("link[rel*='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = logoUrl;
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
                if (leagueHistoryData && leagueHistoryData.length > 0) {
                    leagueHistoryData[0].name = clubName;
                }
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
            updateSiteFavicon();

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
            document.getElementById('opp-url-input').value = (opp.logoUrl && opp.logoUrl.includes('ui-avatars.com')) ? '' : (opp.logoUrl || '');
            
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
            if(logo && logo.includes('ui-avatars.com')) logo = ''; // ui-avatars kaydedilmesini engelle

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
            let isDomestic = false;
            if (!typedContinent) {
                const myCountry = context === 'kulup' ? managedTeams.kulup.country : managedTeams.milli.country;
                // Eğer her iki ülke kodu da aynı bayrağı/simgesi üretiyorsa, bu takımlar aynı ülkedendir.
                if (rawCountry && myCountry && getFlagIcon(rawCountry) === getFlagIcon(myCountry)) {
                    isDomestic = true;
                }
            }

            if (isDomestic || targetContinent.toUpperCase() === opponentsConfig[context].domestic.name.toUpperCase()) {
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

            document.getElementById('stat-opp-logo').src = getTeamLogoByName(opp.name);
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
            matchModalFresh = true;
            document.getElementById('match-editor-subtitle').innerText = currentLang === 'en' ? `${season} Season - ${oppName}` : `${season} Sezonu - ${oppName}`;
            
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
            if (activeMatchesTemp.length > 0 && !document.getElementById('m_res_0')) return; // görüntüleme modunda form yok
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
            if (!matchEditMode) { matchEditSnapshot = JSON.stringify(activeMatchesTemp); matchEditMode = true; }
            matchViewIdx = activeMatchesTemp.length;
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
            if (matchModalFresh) {
                matchModalFresh = false;
                matchViewIdx = 0;
                matchEditMode = !activeMatchesTemp.some(mmHasData);
                matchEditSnapshot = JSON.stringify(activeMatchesTemp);
            }
            mmSyncFooter();
            if (!matchEditMode) { renderMatchViewUI(); return; }
            let html = '';
            const tourScope = matchContext === 'milli' ? 'milli' : 'club';

            activeMatchesTemp.forEach((m, i) => {
                let tourOptionsHtml = tourSelectOptions(m.tournament, tourScope);
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
                            ${mmBadgeHtml(m, i, false, false)}
                            <select id="m_tour_${i}" onchange="tourSelChange(this, '${tourScope}')" class="bg-slate-800 text-xs text-white p-1.5 rounded border border-slate-600 outline-none w-32 focus:border-emerald-500">
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
                            <button onclick="addMatchEvent(${i})" class="mm-addgoal" title="Gol Detayı Ekle"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                `;
            });

            if(activeMatchesTemp.length === 0) {
                html = `<div class="text-center text-slate-500 text-sm py-4">Kayıtlı maç bulunmuyor. Yeni maç ekleyin.</div>`;
            }

            document.getElementById('match-slots-container').innerHTML = html;
        }

        // ===== Maç Sonuçları paneli: görüntüleme (varsayılan) / düzenleme modu =====
        function mmHasData(m) {
            return !!(m && (m.result || m.fixtureId || m.tournament || (m.teamScore !== '' && m.teamScore != null) || (m.events && m.events.length)));
        }
        function mmResultOf(m) {
            if (m.result) return m.result;
            const a = parseInt(m.teamScore), b = parseInt(m.oppScore);
            if (isNaN(a) || isNaN(b)) return '';
            return a > b ? 'W' : (a === b ? 'D' : 'L');
        }
        function mmScoreTxt(m) {
            const f = v => (v === '' || v == null || isNaN(parseInt(v))) ? '–' : parseInt(v);
            return f(m.teamScore) + '–' + f(m.oppScore);
        }
        function mmBadgeHtml(m, i, active, clickable) {
            const r = mmResultOf(m);
            const cls = r === 'W' ? 'w' : (r === 'D' ? 'd' : (r === 'L' ? 'l' : 'n'));
            const inner = `<b>${r || '–'}</b><span>${mmScoreTxt(m)}</span>`;
            return clickable
                ? `<button type="button" class="mm-badge ${cls}${active ? ' on' : ''}" onclick="mmSelect(${i})">${inner}</button>`
                : `<span class="mm-badge ${cls}">${inner}</span>`;
        }
        function mmFindOpp() {
            const o = opponentsConfig[matchContext];
            if (!o) return null;
            const lists = [(o.domestic && o.domestic.teams) || []].concat((o.foreign || []).map(g => g.teams || []));
            for (const l of lists) { const t = l.find(x => x.id === activeMatchInfo.oppId); if (t) return t; }
            return null;
        }
        function mmCrest(url, name) {
            const ini = escapeHtml(String(name || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase());
            if (url && !String(url).includes('ui-avatars.com')) return `<span class="mm-crest"><img src="${escapeHtml(url)}" alt="" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><b style="display:none">${ini}</b></span>`;
            return `<span class="mm-crest"><b>${ini}</b></span>`;
        }
        function mmOppLogo(opp, name) {
            const ok = u => u && typeof u === 'string' && /^(https?:|data:|\/|\.)/.test(u) && !u.includes('ui-avatars.com');
            if (opp && ok(opp.logoUrl)) return opp.logoUrl;
            try { const u = getTeamLogoByName(name); if (ok(u)) return u; } catch (e) {}
            return '';
        }
        function mmTourLogo(name) {
            const u = tourLogoOf(name), e = tourFind(name);
            const ab = `<b style="${u ? 'display:none' : ''}">${escapeHtml(e ? e.s : '')}</b>`;
            return `<span class="mm-tl">${u ? `<img src="${escapeHtml(u)}" alt="" onerror="this.style.display='none';this.nextSibling.style.display='inline'">` : ''}${ab}</span>`;
        }
        function mmSelect(i) { matchViewIdx = i; renderMatchViewUI(); }
        function mmSyncFooter() {
            const set = (id, show) => { const el = document.getElementById(id); if (el) el.classList.toggle('hidden', !show); };
            set('mm-edit', !matchEditMode);
            set('mm-cancel', matchEditMode);
            set('mm-save', matchEditMode);
        }
        function mmEnterEdit() {
            matchEditSnapshot = JSON.stringify(activeMatchesTemp);
            matchEditMode = true;
            renderMatchSlotsUI();
        }
        function matchEditCancel() {
            let prev = [];
            try { prev = JSON.parse(matchEditSnapshot) || []; } catch (e) {}
            if (!prev.some(mmHasData)) { closeMatchEditorModal(); return; }
            activeMatchesTemp = prev;
            matchEditMode = false;
            renderMatchSlotsUI();
        }
        function renderMatchViewUI() {
            const box = document.getElementById('match-slots-container');
            const list = activeMatchesTemp;
            if (!list.length) { box.innerHTML = `<div class="text-center text-slate-500 text-sm py-4">Kayıtlı maç bulunmuyor. Yeni maç ekleyin.</div>`; return; }
            if (matchViewIdx >= list.length || matchViewIdx < 0) matchViewIdx = 0;
            let w = 0, d = 0, l = 0, gf = 0, ga = 0;
            list.forEach(m => {
                const r = mmResultOf(m);
                if (r === 'W') w++; else if (r === 'D') d++; else if (r === 'L') l++;
                const a = parseInt(m.teamScore), b = parseInt(m.oppScore);
                if (!isNaN(a)) gf += a; if (!isNaN(b)) ga += b;
            });
            const stat = (v, label, cls) => `<div class="mm-stat ${cls}"><b>${v}</b><span>${label}</span></div>`;
            const m = list[matchViewIdx];
            const r = mmResultOf(m);
            const rCls = r === 'W' ? 'w' : (r === 'D' ? 'd' : (r === 'L' ? 'l' : 'n'));
            const locTxt = m.location === 'A' ? 'Deplasman' : (m.location === 'N' ? 'Tarafsız' : 'İç Saha');
            const locIco = m.location === 'A' ? 'fa-plane' : (m.location === 'N' ? 'fa-flag' : 'fa-house');
            const mine = managedTeams[matchContext === 'milli' ? 'milli' : 'kulup'] || {};
            const opp = mmFindOpp() || {};
            const oppName = activeMatchInfo.oppName || opp.name || '';
            const tour = m.tournament || '';
            const ev = (m.events || []).map((e, k) => ({ e, k })).sort((a, b) => {
                const x = parseInt(a.e.min), y = parseInt(b.e.min);
                if (isNaN(x) && isNaN(y)) return a.k - b.k;
                if (isNaN(x)) return 1; if (isNaN(y)) return -1;
                return x - y || a.k - b.k;
            }).map(o => o.e);
            const goalsHtml = ev.length ? ev.map(e => {
                const isOpp = e.type === 'OPP';
                const nm = e.scorer ? escapeHtml(e.scorer) : (isOpp ? 'Rakip' : '–');
                return `<div class="mm-goal ${isOpp ? 'opp' : 'us'}"><span class="mm-min">${e.min ? escapeHtml(e.min) + "'" : '–'}</span><span class="mm-dot"></span><div class="mm-gtxt"><i class="fa-solid fa-futbol"></i><b>${nm}</b>${e.assist ? `<small><i class="fa-solid fa-shoe-prints"></i>${escapeHtml(e.assist)}</small>` : ''}</div></div>`;
            }).join('') : `<div class="mm-nogoal">Gol Detayı Yok</div>`;

            box.innerHTML = `
                <div class="mm-stats">
                    ${stat(w, 'Galibiyet', 'w')}${stat(d, 'Beraberlik', 'd')}${stat(l, 'Mağlubiyet', 'l')}${stat(gf + '–' + ga, 'Gol', 'g')}
                </div>
                <div class="mm-rail">${list.map((x, i) => mmBadgeHtml(x, i, i === matchViewIdx, true)).join('')}</div>
                <div class="mm-card">
                    <div class="mm-card-top">
                        <div class="mm-tour">${tour ? mmTourLogo(tour) : ''}<div><b>${escapeHtml(tour || '–')}</b><small><i class="fa-solid ${locIco}"></i>${locTxt}</small></div></div>
                        <span class="mm-res ${rCls}">${r || '–'}</span>
                    </div>
                    <div class="mm-board">
                        <div class="mm-team">${mmCrest(mine.logoUrl, mine.name)}<b>${escapeHtml(mine.name || '–')}</b></div>
                        <div class="mm-score">${mmScoreTxt(m).replace('–', '<i>:</i>')}</div>
                        <div class="mm-team">${mmCrest(mmOppLogo(opp, oppName), oppName)}<b>${escapeHtml(oppName || '–')}</b></div>
                    </div>
                    <div class="mm-goals">${goalsHtml}</div>
                </div>`;
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
            if (diff > 0) return `<span class="text-[10px] font-black text-emerald-400 drop-shadow-md">+${diff}</span>`;
            if (diff < 0) return `<span class="text-[10px] font-black text-red-400 drop-shadow-md">${diff}</span>`;
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

            // Find the longest name in the current roster to set dynamic column width
            let maxNameLength = 10; // Fallback minimum length
            if (players && players.length > 0) {
                players.forEach(p => {
                    if (p.name && p.name.length > maxNameLength) {
                        maxNameLength = p.name.length;
                    }
                });
            }
            // Fotoğraf (24px) + margin/padding boşlukları için sabit ~45px 
            // + Karakter başına ortalama 7px.
            // Ayrıca sütun başlığının ("İsim Soyisim") rahat sığabilmesi için en az 115px sınır.
            // Mobilde isimler "A. MEHMET" biçiminde kısaltılır; sütun genişliği gerçek metin ölçümüyle hesaplanır
            const sqIsMobile = window.innerWidth < 768;
            const sqDispName = (n) => sqIsMobile ? formatShortPlayerName(n) : n;
            // Mobilde kadro tablosu yarı ölçekte (zoom gerçek yerleşimi küçültür, alt kısımda boş kaydırma kalmaz)
            const sqScaleCss = sqIsMobile
                ? ((typeof CSS !== 'undefined' && CSS.supports && CSS.supports('zoom', '0.5')) ? 'zoom: 0.5;' : 'transform: scale(0.5); transform-origin: top left;')
                : `transform: scale(${currentScale}); transform-origin: top left;`;
            let dynamicNameWidth = Math.max(115, Math.floor(45 + (maxNameLength * 7)));
            try {
                const cv = document.createElement('canvas').getContext('2d');
                cv.font = '700 12px ' + (getComputedStyle(document.body).fontFamily || 'sans-serif');
                let maxTxt = 0;
                (players || []).forEach(p => { if (p.name) maxTxt = Math.max(maxTxt, cv.measureText(sqDispName(p.name)).width); });
                // foto (24) + boşluk (6) + metin + pay (16)
                dynamicNameWidth = Math.max(sqIsMobile ? 100 : 115, Math.ceil(46 + maxTxt));
            } catch (e) {}

            const staticCols = [
                { id: 'pos', label: '<i class="fa-solid fa-street-view text-sm"></i>', title: 'Mevki', w: 32, align: 'center' },
                { id: 'name', label: '<div class="flex items-center gap-1.5"><i class="fa-solid fa-font text-sm"></i><span>İsim Soyisim</span></div>', title: 'İsim Soyisim', w: dynamicNameWidth, align: 'left', pl: 'pl-1' }
            ];

            if (!squadColumnsCollapsed) {
                staticCols.push({ id: 'countryCode', label: '<i class="fa-solid fa-globe text-sm"></i>', title: 'Ülke', w: 32, align: 'center' });
                staticCols.push({ id: 'joinAge', label: '<i class="fa-solid fa-user-clock text-sm"></i>', title: 'Yaş', w: 34, align: 'center' });
                staticCols.push({ id: 'joinOvr', label: '<i class="fa-solid fa-star text-sm"></i>', title: 'OVR', w: 36, align: 'center' });
                staticCols.push({ id: 'growth', label: '<i class="fa-solid fa-chart-line text-sm"></i>', title: 'Gelişim (+/-)', w: 42, align: 'center' });

                if (squadContext === 'akademi') {
                    staticCols.push({ id: 'pot', label: '<i class="fa-solid fa-bolt text-sm"></i>', title: 'Potansiyel (POT)', w: 36, align: 'center' });
                } else if (squadContext === 'milli') {
                    staticCols.push({ id: 'teamName', label: '<i class="fa-solid fa-shield-halved text-sm"></i>', title: 'Kulüp', w: 36, align: 'center' });
                    staticCols.push({ id: 'caps', label: '<i class="fa-solid fa-shirt text-sm"></i>', title: 'Forma Sayısı (Caps)', w: 32, align: 'center' });
                }

                if (squadContext !== 'akademi') {
                    staticCols.push({ id: 'totalGoals', label: '<i class="fa-solid fa-futbol text-sm"></i>', title: 'Gol', w: 32, align: 'center' });
                    staticCols.push({ id: 'totalAssists', label: '<i class="fa-solid fa-shoe-prints text-sm"></i>', title: 'Asist', w: 32, align: 'center' });
                }
            }
            
            const lastColId = staticCols[staticCols.length - 1].id;
            let accW = 0;
            staticCols.forEach(c => { c.left = accW; accW += c.w; });
            const btnLeft = accW;
            const btnW = 20;

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
                return mbOvr(ovr, true);
            };

            const renderAgeBadge = (age) => {
                if(!age) return '';
                const n = parseInt(age);
                let colorClass = 'age-t9'; // fallback (36-50)
                
                if (squadContext === 'akademi') {
                    if (n <= 15) colorClass = 'age-acad-1';
                    else if (n <= 17) colorClass = 'age-acad-2';
                    else colorClass = 'age-acad-3';
                } else {
                    if (n <= 15) colorClass = 'age-t1';
                    else if (n <= 18) colorClass = 'age-t2';
                    else if (n <= 21) colorClass = 'age-t3';
                    else if (n <= 24) colorClass = 'age-t4';
                    else if (n <= 26) colorClass = 'age-t5';
                    else if (n <= 29) colorClass = 'age-t6';
                    else if (n <= 32) colorClass = 'age-t7';
                    else if (n <= 35) colorClass = 'age-t8';
                }
                
                const ageHex = { 'age-t1': '#60a5fa', 'age-t2': '#93c5fd', 'age-t3': '#4ade80', 'age-t4': '#86efac', 'age-t5': '#d9f99d', 'age-t6': '#fde047', 'age-t7': '#fdba74', 'age-t8': '#fca5a5', 'age-t9': '#d8b4fe', 'age-acad-1': '#38bdf8', 'age-acad-2': '#3b82f6', 'age-acad-3': '#c084fc' };
                return `<span class="mb-age" style="--c:${ageHex[colorClass] || '#d8b4fe'}">${age}</span>`;
            };

            const getTrBadge = (type, text, logo) => {
                if (type === 'continue' || type === 'none') return '';
                
                // Eğer metin ve logo yoksa normalde rozet çizilmez, ama "academy" seçiliyse tek başına ikon çizilmesine izin veriyoruz
                if (!text && !logo && type !== 'academy') return '';
                
                let bg = 'bg-slate-700 text-slate-300 border-slate-600';
                let icon = '';
                
                if (type === 'in') { bg = 'bg-green-600 text-white border-green-500 shadow-sm'; icon = '<i class="fa-solid fa-arrow-right-to-bracket"></i>'; }
                if (type === 'academy') { bg = 'bg-cyan-600 text-white border-cyan-500 shadow-sm'; icon = '<i class="fa-solid fa-graduation-cap"></i>'; }
                if (type === 'out') { bg = 'bg-red-600 text-white border-red-500 shadow-sm'; icon = '<i class="fa-solid fa-arrow-right-from-bracket"></i>'; }
                if (type === 'renew') { bg = 'bg-purple-600 text-white border-purple-500 shadow-sm'; icon = '<i class="fa-solid fa-file-signature"></i>'; }
                if (type === 'loan_in') { bg = 'bg-blue-600 text-white border-blue-500 shadow-sm'; icon = '<i class="fa-solid fa-handshake-angle"></i>'; }
                if (type === 'loan_out') { bg = 'bg-orange-600 text-white border-orange-500 shadow-sm'; icon = '<i class="fa-solid fa-paper-plane"></i>'; }
                
                let contentHtml = '';
                if (logo) {
                    contentHtml = `<img src="${logo}" title="${escapeHtml(text || '')}" class="h-3 w-auto object-contain bg-white/20 rounded-[2px] px-0.5" style="max-width:24px;">`;
                } else if (text) {
                    contentHtml = `<span>${text}</span>`;
                }

                // inline-flex ve gap-1 kullanıldığı için içerik boş olduğunda (sadece ikon varsa)
                // fazladan boşluk oluşmaz, ikon otomatik olarak mükemmel ortalanır.
                return `<div class="inline-flex items-center gap-1 px-1.5 py-[2px] rounded font-bold border truncate text-[9px] max-w-full ${bg}">${icon}${contentHtml}</div>`;
            };

            const getTdBackground = (type, text, stripColor) => {
                // "none" (Boş) seçeneği haricindeki TÜM işlemlerde veya manuel not girildiğinde şerit rengini uygula
                if (type && type !== 'none') return stripColor;
                if (text && text.trim() !== '') return stripColor;
                return 'bg-transparent';
            };

            let html = `
                <div class="w-full flex flex-wrap justify-between items-center mb-3 px-2 shrink-0 relative gap-y-3">
                    <div class="flex flex-nowrap items-center gap-2 w-max shrink-0 overflow-x-auto hide-scrollbar">
                        ${(squadContext === 'astakim' || squadContext === 'akademi' || squadContext === 'milli') ? `<button onclick="openFormationModal('ilk11')" class="text-sm bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-600 rounded px-2 py-1.5 transition-colors shadow-sm flex items-center justify-center shrink-0 w-8 h-8" title="Kadrolar"><i class="fa-solid fa-people-group"></i></button>` : ''}
                        <button onclick="openPlayerInfoModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0" title="Oyuncu Ekle"><i class="fa-solid fa-user-plus"></i></button>
                        <button onclick="openPlayerBulkEdit()" class="text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0 hover:brightness-110" style="background:${squadContext === 'milli' ? '#f43f5e' : squadContext === 'akademi' ? '#f59e0b' : '#0ea5e9'}" title="Toplu Düzenle"><i class="fa-solid fa-table-list"></i></button>
                        <button onclick="openSquadBulkModal()" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0" title="Toplu Ekle"><i class="fa-solid fa-list-ol"></i></button>
                        <button onclick="toggleSquadFlatSort()" class="${squadFlatSort ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'} px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0" title="${squadFlatSort ? 'Mevkiye göre grupla' : 'Tüm oyuncuları toplu sırala'}"><i class="fa-solid ${squadFlatSort ? 'fa-arrow-down-wide-short' : 'fa-layer-group'}"></i></button>
                        <button onclick="toggleSquadColumnsCollapse()" class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0" title="Ülke/Yaş/OVR/Gelişim/Gol/Asist sütunlarını gizle veya göster">
                            <i class="fa-solid ${squadColumnsCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}"></i>
                        </button>
                        ${squadContext === 'milli' ? `<button onclick="openNationalCapsBulkModal()" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg flex items-center justify-center shrink-0" title="Toplu Maç Ekle"><i class="fa-solid fa-shirt"></i></button>` : ''}
                    </div>

                    <!-- Ortalanmış Kadro Seçici Butonları -->
                    <div class="flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 gap-1 bg-slate-900 rounded-full border border-slate-700 p-1 shadow-lg z-10 w-full sm:w-auto justify-center order-last xl:order-none">
                        <button onclick="squadContext='astakim'; renderSquadGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${squadContext === 'astakim' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">As Takım</button>
                        <button onclick="squadContext='akademi'; renderSquadGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${squadContext === 'akademi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Akademi</button>
                        <button onclick="squadContext='milli'; renderSquadGrid();" class="px-6 py-1.5 rounded-full text-xs font-bold transition-colors ${squadContext === 'milli' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Milli</button>
                    </div>

                    <div class="flex items-center justify-end gap-4 ml-auto xl:ml-0 w-full sm:w-auto">
                        ${getScaleSelectorHtml()}
                    </div>
                </div>
                <div class="w-full overflow-auto table-scroll border border-slate-700 rounded-xl bg-slate-900 flex-initial sm:flex-1 min-h-0 relative pb-4">
                    <table class="w-max min-w-full border-separate border-spacing-0 text-sm origin-top-left" data-sq="1" style="${sqScaleCss} width: max-content;">
                        <thead class="bg-slate-950 sticky top-0 z-[60] shadow-md">
                            <tr>
            `;
            
            staticCols.forEach(c => {
                let borderRight = c.id === lastColId ? 'border-r-2 border-slate-500' : 'border-r border-slate-700';
                html += `<th rowspan="2" class="p-1 ${borderRight} border-b border-slate-700 sticky bg-slate-950 z-[70] text-[10px] font-bold text-slate-400 cursor-pointer hover:text-white transition-colors text-center" onclick="sortSquad('${c.id}')" style="left: ${c.left}px; width: ${c.w}px; min-width: ${c.w}px; max-width: ${c.w}px;" title="${c.title || ''}">
                            <div class="flex items-center justify-center gap-1">${c.label} <i class="fa-solid fa-sort opacity-50 text-[9px]"></i></div>
                        </th>`;
            });

            const seasonActiveColsMap = {};
            squadSeasons.forEach(season => {
                const keys = ['s2', 't2', 's1', 't1'];
                if (!squadColumnsCollapsed) {
                    seasonActiveColsMap[season] = [...keys];
                } else {
                    let foundIndex = keys.length - 1; // Varsayılan olarak en sağdaki (t1) açık kalsın
                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        let hasData = players.some(p => {
                            if (!p.history || !p.history[season]) return false;
                            const sData = p.history[season];
                            return sData[`${key}a`] || sData[`${key}o`] || 
                                   (sData[`${key}Type`] && sData[`${key}Type`] !== 'none') || 
                                   (sData[key] && sData[key].trim() !== '') || 
                                   sData[`${key}_acadPot`];
                        });
                        if (hasData) {
                            foundIndex = i;
                            break;
                        }
                    }
                    // Bulunan en güncel veri sütununu ve onun SAĞINDAKİ tüm sütunları diziye al
                    seasonActiveColsMap[season] = keys.slice(foundIndex);
                }
            });

            squadSeasons.forEach(season => {
                const activeCols = seasonActiveColsMap[season];
                html += `<th colspan="${activeCols.length}" class="p-1 border-r border-b border-slate-700 text-center font-black tracking-widest bg-slate-800 text-emerald-500 relative group/season">
                            ${season}
                            <button onclick="deleteSeason('${season}')" class="absolute top-1 right-1 opacity-0 group-hover/season:opacity-100 text-red-500 hover:text-red-400 transition-opacity" title="Sezonu Sil"><i class="fa-solid fa-trash text-[10px]"></i></button>
                         </th>`;
            });
            html += `<th class="border-b border-slate-700 w-full bg-slate-950"></th></tr><tr>`;

            const bulkStatBtn = (season, cellKey) => `<button onclick="event.stopPropagation(); openBulkStatModal('${season.replace(/'/g,"\\'")}', '${cellKey}')" class="text-slate-400 hover:text-emerald-400 transition-colors" title="Toplu Yaş/OVR Gir"><i class="fa-solid fa-bolt text-[9px]"></i></button>`;

            squadSeasons.forEach(season => {
                const activeCols = seasonActiveColsMap[season];
                if (activeCols.includes('s2')) html += `<th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[125px] w-[125px] max-w-[125px]"><div class="flex items-center justify-center gap-1.5">HAZ-ŞUB ${bulkStatBtn(season, 's2')}</div></th>`;
                if (activeCols.includes('t2')) html += `<th class="p-1 border-r border-b border-slate-700 bg-orange-900/30 text-[9px] font-bold text-orange-300 min-w-[125px] w-[125px] max-w-[125px]"><div class="flex items-center justify-center gap-1.5">KIŞ TR. ${bulkStatBtn(season, 't2')}</div></th>`;
                if (activeCols.includes('s1')) html += `<th class="p-1 border-r border-b border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300 min-w-[125px] w-[125px] max-w-[125px]"><div class="flex items-center justify-center gap-1.5">ARA-EYL ${bulkStatBtn(season, 's1')}</div></th>`;
                if (activeCols.includes('t1')) html += `<th class="p-1 border-r border-b border-slate-700 bg-blue-900/30 text-[9px] font-bold text-blue-300 min-w-[125px] w-[125px] max-w-[125px]"><div class="flex items-center justify-center gap-1.5">YAZ TR. ${bulkStatBtn(season, 't1')}</div></th>`;
            });
            html += `<th class="border-b border-slate-700 w-full bg-slate-950"></th></tr></thead><tbody>`;

            if (players.length === 0) {
                html += `<tr><td colspan="100%" class="p-4 text-center text-slate-500">Kayıtlı oyuncu bulunmuyor.</td></tr>`;
            } else {
                let activePlayers = players.filter(p => !p.isArchived && !p.isPromoted);
                let archivedPlayers = players.filter(p => p.isArchived && !p.isPromoted);
                let promotedPlayers = players.filter(p => p.isPromoted);

                const renderPlayerList = (list, isArchivedSection) => {
                    // Sütunların en yüksek değerlerini bulmak için sayaçlar
                    let maxCaps = 0, maxGoals = 0, maxAssists = 0;

                    // YENİ: Listeyi render etmeden önce her oyuncunun "güncel" yaşını ve OVR'sini geçmişe bakarak hesapla
                    list.forEach(p => {
                        p.currentAge = p.joinAge;
                        p.currentOvr = p.joinOvr;
                        const gs = goalAssistMap[(p.name || '').toLowerCase()];
                        p.totalGoals = gs ? gs.overallGoals : 0;
                        p.totalAssists = gs ? gs.overallAssists : 0;
                        
                        // Geçmişten günümüze (sondan başa) doğru tarama yap (t2 ve t1 eklendi)
                        for (let i = seasonsList.length - 1; i >= 0; i--) {
                            let s = seasonsList[i];
                            if (p.history && p.history[s]) {
                                if (p.history[s].s2o || p.history[s].s2a) {
                                    if (p.history[s].s2a) p.currentAge = p.history[s].s2a;
                                    if (p.history[s].s2o) p.currentOvr = p.history[s].s2o;
                                    break;
                                }
                                if (p.history[s].t2o || p.history[s].t2a) {
                                    if (p.history[s].t2a) p.currentAge = p.history[s].t2a;
                                    if (p.history[s].t2o) p.currentOvr = p.history[s].t2o;
                                    break;
                                }
                                if (p.history[s].s1o || p.history[s].s1a) {
                                    if (p.history[s].s1a) p.currentAge = p.history[s].s1a;
                                    if (p.history[s].s1o) p.currentOvr = p.history[s].s1o;
                                    break;
                                }
                                if (p.history[s].t1o || p.history[s].t1a) {
                                    if (p.history[s].t1a) p.currentAge = p.history[s].t1a;
                                    if (p.history[s].t1o) p.currentOvr = p.history[s].t1o;
                                    break;
                                }
                            }
                        }
                        
                        // Oyuncunun değerlerini kontrol et ve max değerleri güncelle
                        let pCaps = parseInt(p.caps) || 0;
                        if (pCaps > maxCaps) maxCaps = pCaps;
                        if (p.totalGoals > maxGoals) maxGoals = p.totalGoals;
                        if (p.totalAssists > maxAssists) maxAssists = p.totalAssists;
                    });

                    let resultHtml = '';
                    (squadFlatSort ? [{ id: 'ALL' }] : groups).forEach(group => {
                        let groupPlayers = squadFlatSort ? list.slice() : list.filter(p => getGroupForPos(p.pos) === group.id);
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
                                else if(c.id === 'name') content = `<div class="flex items-center justify-start w-full overflow-hidden hover:text-emerald-400 cursor-pointer" onclick="openPlayerInfoModal('${p.id}')" title="Düzenle">${photoHtml}<span class="truncate text-xs font-bold" title="${safeName}">${escapeHtml(sqDispName(p.name))}</span></div>`;
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
                                else if(c.id === 'pot') {
    // En güncel dönemi bulmak için tablodaki sütun sırasına göre sağdan sola tarıyoruz
    let latestPot = '';
    
    // seasonsList (eskiden yeniye doğru sıralı)
    for (let i = seasonsList.length - 1; i >= 0; i--) {
        let s = seasonsList[i];
        if (p.history && p.history[s]) {
            if (p.history[s]['s2_acadPot']) { latestPot = p.history[s]['s2_acadPot']; break; }
            if (p.history[s]['t2_acadPot']) { latestPot = p.history[s]['t2_acadPot']; break; }
            if (p.history[s]['s1_acadPot']) { latestPot = p.history[s]['s1_acadPot']; break; }
            if (p.history[s]['t1_acadPot']) { latestPot = p.history[s]['t1_acadPot']; break; }
        }
    }
    
    // Eğer hiçbir dönemde pot girilmemişse, ilk kayıtlı veya join pot değerini kullan
    if (!latestPot) latestPot = p.joinPot || p.pot || '';
    
    p.pot = latestPot; // Ana objeyi güncelle
                                    content = `<span class="text-[10px] font-bold text-emerald-300">${latestPot || '-'}</span>`;
                                }
                                else if(c.id === 'teamName') {
                                    content = p.teamLogo ? `<img src="${p.teamLogo}" title="${escapeHtml(p.teamName||'')}" class="w-7 h-7 object-contain mx-auto rounded bg-slate-200/10 p-0.5">` : `<span class="text-[9px] text-slate-500">-</span>`;
                                }
                                else if(c.id === 'caps') {
                                    let v = parseInt(p.caps) || 0;
                                    let colorClass = (maxCaps > 0 && v === maxCaps) ? 'text-amber-300 drop-shadow-[0_0_4px_#f59e0b] drop-shadow-[0_0_12px_#f59e0b] brightness-125 font-black' : 'text-blue-300';
                                    content = `<span class="text-[10px] font-bold ${colorClass}">${v}</span>`;
                                }
                                else if(c.id === 'totalGoals') {
                                    let colorClass = (maxGoals > 0 && p.totalGoals === maxGoals) ? 'text-amber-300 drop-shadow-[0_0_4px_#f59e0b] drop-shadow-[0_0_12px_#f59e0b] brightness-125 font-black' : 'text-emerald-400';
                                    content = `<span class="text-[10px] font-bold ${colorClass}">${p.totalGoals}</span>`;
                                }
                                else if(c.id === 'totalAssists') {
                                    let colorClass = (maxAssists > 0 && p.totalAssists === maxAssists) ? 'text-amber-300 drop-shadow-[0_0_4px_#f59e0b] drop-shadow-[0_0_12px_#f59e0b] brightness-125 font-black' : 'text-sky-400';
                                    content = `<span class="text-[10px] font-bold ${colorClass}">${p.totalAssists}</span>`;
                                }
                                
                                let extraClasses = c.id === lastColId ? 'border-r-2 border-slate-500 shadow-[2px_0_5px_rgba(0,0,0,0.4)]' : 'border-r border-slate-700';

                                resultHtml += `<td class="p-1 ${extraClasses} border-b border-slate-700 sticky z-[50] ${rowBgClass} transition-colors text-${c.align} ${c.pl || ''}" style="left: ${c.left}px; width: ${c.w}px; min-width: ${c.w}px; max-width: ${c.w}px;">
                                            ${content}
                                         </td>`;
                            });

                            squadSeasons.forEach(season => {
                                const activeCols = seasonActiveColsMap[season];
                                const sData = (p.history && p.history[season]) ? p.history[season] : {};

                                const getSeasonCellBg = (cellKey) => {
                                    const hasStat = sData[`${cellKey}a`] || sData[`${cellKey}o`];
                                    const hasTrType = sData[`${cellKey}Type`] && sData[`${cellKey}Type`] !== 'none';
                                    const hasTrText = sData[cellKey] && sData[cellKey].trim() !== '';
                                    const hasAcadPot = sData[`${cellKey}_acadPot`];

                                    if (squadContext === 'akademi' && hasAcadPot) {
                                        let macroPos = getMacroGroupForPos(p.pos);
                                        let posBgMap = { GK: 'bg-orange-600/30', DEF: 'bg-blue-600/30', MID: 'bg-green-600/30', FWD: 'bg-red-600/30' };
                                        return posBgMap[macroPos] || group.strip;
                                    }
                                    if (hasStat || hasTrType || hasTrText || hasAcadPot) return group.strip;
                                    return 'bg-transparent';
                                };

                                const renderTrOrAcadBadge = (cellKey) => {
                                    let potHtml = '';
                                    if (squadContext === 'akademi') {
                                        let potVal = sData[`${cellKey}_acadPot`];
                                        if (potVal) potHtml = `<span class="text-[9px] font-black text-emerald-400 bg-slate-950/90 border border-emerald-600/70 px-1.5 py-[1px] rounded shadow-inner">${potVal}</span>`;
                                    }
                                    let trBadge = getTrBadge(sData[`${cellKey}Type`], sData[cellKey], sData[`${cellKey}Logo`]) || '';
                                    return potHtml + (potHtml && trBadge ? ' ' : '') + trBadge;
                                };

                                const renderSeasonCell = (cellKey) => {
                                    const bg = getSeasonCellBg(cellKey);
                                    const age = sData[`${cellKey}a`];
                                    const ovr = sData[`${cellKey}o`];
                                    const prevKey = (cellKey === 't1') ? 's1' : (cellKey === 't2') ? 's2' : cellKey;
                                    const prevOvr = getPrevOvr(p, season, prevKey);
                                    const delta = getDeltaHtml(ovr, prevOvr);
                                    const trBadge = renderTrOrAcadBadge(cellKey);

                                    const content = `
                                        <div class="flex items-center justify-center w-full h-full min-h-[26px] px-1">
                                            <div class="w-[20px] flex justify-end items-center pr-1 shrink-0 scale-75 origin-right">
                                                ${renderAgeBadge(age)}
                                            </div>
                                            <div class="w-[24px] flex justify-center items-center shrink-0">
                                                ${renderOvrBadge(ovr)}
                                            </div>
                                            <div class="flex-1 flex justify-start items-center pl-1.5 shrink-0 min-w-0">
                                                <div class="w-[14px] flex justify-start items-center shrink-0">
                                                    ${delta}
                                                </div>
                                                <div class="flex justify-start items-center shrink-0 min-w-0">
                                                    ${trBadge}
                                                </div>
                                            </div>
                                        </div>`;
                                    return `<td class="p-0 border-r border-b border-slate-700/50 hover:bg-slate-800/80 align-middle cursor-pointer text-center transition-colors min-w-[125px] w-[125px] max-w-[125px] ${bg}" onclick="openPlayerCellModal('${p.id}', '${season}', '${cellKey}')">${content}</td>`;
                                };

                                if (activeCols.includes('s2')) resultHtml += renderSeasonCell('s2');
                                if (activeCols.includes('t2')) resultHtml += renderSeasonCell('t2');
                                if (activeCols.includes('s1')) resultHtml += renderSeasonCell('s1');
                                if (activeCols.includes('t1')) resultHtml += renderSeasonCell('t1');
                            });
                            resultHtml += `<td class="border-b border-slate-700/50 bg-transparent w-full"></td></tr>`;
                        });
                    });
                    return resultHtml;
                };

                html += renderPlayerList(activePlayers, false);

                if (promotedPlayers.length > 0) {
                    html += `
                        <tr>
                            <td colspan="100%" class="h-14 bg-slate-900 border-y-2 border-slate-600 shadow-inner align-middle text-center relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-900/40 to-transparent"></div>
                                <span class="relative z-10 text-sm font-black text-emerald-400 tracking-[0.3em]"><i class="fa-solid fa-arrow-up mr-2"></i>PROMOTED</span>
                            </td>
                        </tr>
                    `;
                    html += renderPlayerList(promotedPlayers, true);
                }

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
            sqFitScale();
        }

        // Kadro tablosu ölçeği: güncel kadro (arşiv/promoted ayracına kadar) tek ekrana sığacak en büyük ölçek (en fazla %100).
        // Ayrılanlar (arşiv) bölümü ekranın altında kalır, kaydırınca görünür. Hem mobil hem web için geçerlidir.
        function sqFitScale() {
            const tbl = document.querySelector('table[data-sq]');
            if (!tbl || !tbl.parentElement) return;
            const wrap = tbl.parentElement;
            const C = wrap.clientHeight;
            if (!C) return;
            const useZoom = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('zoom', '1');
            const apply = (z) => {
                if (useZoom) { tbl.style.transform = ''; tbl.style.zoom = z; }
                else { tbl.style.zoom = ''; tbl.style.transform = `scale(${z})`; tbl.style.transformOrigin = 'top left'; }
            };
            apply(1);
            const sep = tbl.querySelector('td.h-14[colspan]');
            const row = sep ? sep.parentElement : null;
            const H = row ? (row.getBoundingClientRect().top - tbl.getBoundingClientRect().top) : tbl.getBoundingClientRect().height;
            if (!H) return;
            const z = Math.max(0.35, Math.min(1, C / H));
            apply(z.toFixed(3));
        }
        if (!window.__sqFitBound) {
            window.__sqFitBound = true;
            let _sqT = null;
            window.addEventListener('resize', () => { clearTimeout(_sqT); _sqT = setTimeout(sqFitScale, 120); });
        }

        // Toplu Ekleme Modalını Aç
// ===================== TOPLU OYUNCU DÜZENLEME (As Takım / Akademi / Milli) =====================
let pbCtx = null, pbSeason = null, pbDraft = {}, pbOrig = {};
const PB_POS = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'LM', 'RM', 'AM', 'LW', 'RW', 'CF', 'ST'];
const PB_PERIODS = [['t1', 'Yaz'], ['s1', 'Aralık'], ['t2', 'Kış'], ['s2', 'Sezon sonu']];
const PB_NAMES = { astakim: 'As Takım', akademi: 'Akademi', milli: 'Milli Takım' };
const PB_COLORS = { astakim: '#0ea5e9', akademi: '#f59e0b', milli: '#f43f5e' };

function openPlayerBulkEdit() {
    pbCtx = squadContext;
    const list = squadData[pbCtx] || [];
    if (!list.length) { alert('Bu kadroda oyuncu bulunmuyor.'); return; }
    pbDraft = {}; pbOrig = {};
    list.forEach(p => {
        const o = { name: p.name || '', pos: p.pos || '', role: p.role || '', cc: String(p.countryCode || ''), photo: p.photoUrl || '', h: JSON.parse(JSON.stringify(p.history || {})) };
        if (p.isArchived) return;
        pbOrig[p.id] = o;
        pbDraft[p.id] = JSON.parse(JSON.stringify(o));
    });
    pbSeason = seasonsList[seasonsList.length - 1];
    if (!document.getElementById('pb-modal')) {
        document.body.insertAdjacentHTML('beforeend', `<div id="pb-modal" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-[100] backdrop-blur-sm"><div id="pb-box" class="bg-slate-800 rounded-xl border border-slate-600 shadow-2xl relative flex flex-col" style="width:min(1180px,97vw);height:min(88vh,860px)"></div></div>`);
        document.addEventListener('keydown', (e) => {
            const m = document.getElementById('pb-modal');
            if (e.key === 'Escape' && m && !m.classList.contains('hidden')) closePlayerBulkEdit();
        });
    }
    pbRender();
    const m = document.getElementById('pb-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
}

function closePlayerBulkEdit() {
    const m = document.getElementById('pb-modal');
    if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function pbChangedCount() {
    let n = 0;
    Object.keys(pbDraft).forEach(id => {
        const d = pbDraft[id], o = pbOrig[id];
        ['name', 'pos', 'role', 'cc', 'photo'].forEach(f => { if (String(d[f]).trim() !== String(o[f]).trim()) n++; });
        const seas = new Set([...Object.keys(d.h || {}), ...Object.keys(o.h || {})]);
        seas.forEach(s => PB_PERIODS.forEach(([k]) => ['a', 'o'].forEach(x => {
            const dv = String(((d.h || {})[s] || {})[k + x] || '').trim(), ov = String(((o.h || {})[s] || {})[k + x] || '').trim();
            if (dv !== ov) n++;
        })));
    });
    return n;
}

function pbUpdateCount() {
    const el = document.getElementById('pb-count');
    const n = pbChangedCount();
    if (el) el.innerHTML = n ? `<b style="color:#f59e0b">${n}</b> değişiklik` : 'Değişiklik yok';
}

function pbSet(id, f, el) {
    pbDraft[id][f] = el.value;
    el.classList.toggle('pb-chg', String(el.value).trim() !== String(pbOrig[id][f]).trim());
    pbUpdateCount();
}

function pbSetH(id, k, el) {
    const d = pbDraft[id];
    if (!d.h[pbSeason]) d.h[pbSeason] = {};
    const v = el.value.trim();
    if (v === '') delete d.h[pbSeason][k]; else d.h[pbSeason][k] = v;
    const ov = String(((pbOrig[id].h || {})[pbSeason] || {})[k] || '').trim();
    el.classList.toggle('pb-chg', v !== ov);
    pbUpdateCount();
}

function pbSetSeason(s) { pbSeason = s; pbRender(); }

function pbFilter(q) {
    q = q.trim().toLowerCase();
    document.querySelectorAll('#pb-modal tr[data-pb-name]').forEach(tr => {
        tr.style.display = !q || tr.dataset.pbName.includes(q) ? '' : 'none';
    });
}

function pbKey(e, el) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const col = el.dataset.col;
    const all = Array.from(document.querySelectorAll(`#pb-modal [data-col="${col}"]`)).filter(x => x.closest('tr').style.display !== 'none');
    const nx = all[all.indexOf(el) + (e.shiftKey ? -1 : 1)];
    if (nx) { nx.focus(); if (nx.select) nx.select(); }
}

function pbRender() {
    const box = document.getElementById('pb-box');
    const list = squadData[pbCtx] || [];
    const esc = (s) => escapeHtml(String(s));
    const accent = PB_COLORS[pbCtx] || '#0ea5e9';
    const roles = playerRoles[pbCtx] || [];
    const seasonOpts = seasonsList.map(s => `<option value="${esc(s)}" ${s === pbSeason ? 'selected' : ''}>${esc(s)}</option>`).join('');
    const num = (id, k, v) => {
        const cur = ((pbDraft[id].h || {})[pbSeason] || {})[k] || '';
        const orig = String((((pbOrig[id].h || {})[pbSeason]) || {})[k] || '');
        return `<td class="pb-n"><input class="pb-in pb-num ${String(cur).trim() !== orig.trim() ? 'pb-chg' : ''}" data-col="${k}" inputmode="numeric" value="${esc(cur)}" oninput="pbSetH('${id}','${k}',this)" onkeydown="pbKey(event,this)"></td>`;
    };
    const PB_ORDER = ['GK', 'LB', 'LWB', 'CB', 'RB', 'RWB', 'DM', 'CM', 'LM', 'RM', 'AM', 'LW', 'RW', 'CF', 'ST'];
    const pbRank = (x) => PB_ORDER.includes(x) ? PB_ORDER.indexOf(x) : 99;
    const rows = list.filter(p => pbDraft[p.id]).sort((a, b) => pbRank(pbDraft[a.id].pos) - pbRank(pbDraft[b.id].pos)).map(p => {
        const d = pbDraft[p.id], o = pbOrig[p.id];
        const chg = (f) => String(d[f]).trim() !== String(o[f]).trim() ? 'pb-chg' : '';
        const posList = PB_POS.includes(d.pos) || !d.pos ? PB_POS : PB_POS.concat([d.pos]);
        const roleList = roles.includes(d.role) || !d.role ? roles : roles.concat([d.role]);
        const photo = d.photo ? `<img src="${esc(d.photo)}" alt="" class="pb-ph" onerror="this.style.visibility='hidden'">` : `<span class="pb-ph pb-ph0">${esc((d.name || '?').charAt(0).toUpperCase())}</span>`;
        return `<tr data-pb-name="${esc(d.name.toLowerCase())}" class="${p.isArchived ? 'pb-arch' : ''}">
            <td class="pb-id"><div class="flex items-center gap-2">${photo}<input class="pb-in ${chg('name')}" data-col="name" value="${esc(d.name)}" oninput="pbSet('${p.id}','name',this)" onkeydown="pbKey(event,this)" style="min-width:150px"></div></td>
            <td><select class="pb-in ${chg('pos')}" data-col="pos" onchange="pbSet('${p.id}','pos',this)" onkeydown="pbKey(event,this)">${posList.map(x => `<option ${x === d.pos ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></td>
            <td><select class="pb-in ${chg('role')}" data-col="role" onchange="pbSet('${p.id}','role',this)" onkeydown="pbKey(event,this)">${roleList.map(x => `<option ${x === d.role ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></td>
            <td><input class="pb-in ${chg('cc')}" data-col="cc" value="${esc(d.cc)}" placeholder="TR" oninput="pbSet('${p.id}','cc',this)" onkeydown="pbKey(event,this)" style="width:62px;text-transform:uppercase"></td>
            <td><input class="pb-in ${chg('photo')}" data-col="photo" value="${esc(d.photo)}" placeholder="https://..." oninput="pbSet('${p.id}','photo',this)" onkeydown="pbKey(event,this)" style="min-width:170px"></td>
            ${PB_PERIODS.map(([k]) => num(p.id, k + 'a') + num(p.id, k + 'o')).join('')}
        </tr>`;
    }).join('');
    const gHead = PB_PERIODS.map(([k, lab], i) => `<th colspan="2" class="pb-g ${i % 2 ? 'pb-g2' : ''}">${lab}</th>`).join('');
    const sHead = PB_PERIODS.map(([k], i) => `<th class="pb-g ${i % 2 ? 'pb-g2' : ''}">Yaş</th><th class="pb-g ${i % 2 ? 'pb-g2' : ''}">OVR</th>`).join('');
    box.innerHTML = `
        <button onclick="closePlayerBulkEdit()" class="absolute top-3.5 right-4 text-slate-400 hover:text-white z-10"><i class="fa-solid fa-xmark text-xl"></i></button>
        <div class="px-5 pt-4 pb-3 border-b border-slate-700 shrink-0">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 pr-8">
                <h3 class="text-lg font-black text-white flex items-center gap-2"><span class="inline-block w-2.5 h-2.5 rounded-full" style="background:${accent}"></span>${PB_NAMES[pbCtx] || ''} · Toplu Düzenle</h3>
                <label class="flex items-center gap-2 text-xs text-slate-400 font-bold">Sezon (yaş / OVR)
                    <select class="pb-in" style="width:auto" onchange="pbSetSeason(this.value)">${seasonOpts}</select></label>
                <input class="pb-in" style="width:180px" placeholder="Oyuncu ara..." oninput="pbFilter(this.value)">
            </div>
            <p class="text-[11px] text-slate-500 mt-2">Hücreleri doğrudan düzenleyin; Enter alttaki oyuncuya geçer. Değişen hücreler turuncu işaretlenir. Yaş/OVR hücresini boşaltmak o değeri siler. Oyuncu adını değiştirmek geçmiş maç istatistiklerindeki eski adı güncellemez.</p>
        </div>
        <div class="pb-wrap flex-1 min-h-0"><table class="pb">
            <thead><tr><th rowspan="2" class="pb-id pb-h">Oyuncu</th><th rowspan="2" class="pb-h">Mevki</th><th rowspan="2" class="pb-h">Rol</th><th rowspan="2" class="pb-h">Ülke</th><th rowspan="2" class="pb-h">Fotoğraf URL</th>${gHead}</tr><tr>${sHead}</tr></thead>
            <tbody>${rows}</tbody></table></div>
        <div class="flex items-center justify-between gap-3 px-5 py-3 border-t border-slate-700 shrink-0">
            <span id="pb-count" class="text-xs text-slate-400"></span>
            <div class="flex gap-2">
                <button onclick="closePlayerBulkEdit()" class="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm">İptal</button>
                <button onclick="savePlayerBulkEdit()" class="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm">Kaydet</button>
            </div>
        </div>`;
    pbUpdateCount();
}

function savePlayerBulkEdit() {
    const list = squadData[pbCtx] || [];
    if (!pbChangedCount()) { closePlayerBulkEdit(); return; }
    list.forEach(p => {
        const d = pbDraft[p.id];
        if (!d) return;
        const newName = d.name.trim();
        if (newName && newName !== p.name) {
            const old = p.name;
            try {
                Object.values((formations && formations[pbCtx]) || {}).forEach(arr => {
                    if (Array.isArray(arr)) arr.forEach(n => { if (n && n.name === old) n.name = newName; });
                });
            } catch (e) {}
            p.name = newName;
        }
        p.pos = d.pos; p.role = d.role;
        p.countryCode = d.cc.trim().toLowerCase();
        p.photoUrl = d.photo.trim();
        const h = {};
        Object.keys(d.h || {}).forEach(s => { if (d.h[s] && Object.keys(d.h[s]).length) h[s] = d.h[s]; });
        // Bu panelde düzenlenmeyen alanları (ör. goller vb.) koru
        const merged = JSON.parse(JSON.stringify(p.history || {}));
        Object.keys(merged).forEach(s => PB_PERIODS.forEach(([k]) => { delete merged[s][k + 'a']; delete merged[s][k + 'o']; }));
        Object.keys(h).forEach(s => { merged[s] = Object.assign(merged[s] || {}, h[s]); });
        Object.keys(merged).forEach(s => { if (!Object.keys(merged[s]).length) delete merged[s]; });
        p.history = merged;
    });
    saveToLocalStorage();
    closePlayerBulkEdit();
    renderSquadGrid();
}

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
                        role: squadContext === 'astakim' ? 'Rotation' : (playerRoles[squadContext][0] || 'Rotasyon'),
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
                const msg = currentLang === 'en' ? "Enter new role/importance name:" : "Yeni rol/önem adı girin:";
                const newRole = prompt(msg);
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

// ===================== OYUNCU PROFİL KARTI v2: sekmeli (Genel / Gelişim / İstatistik) =====================
let piTab = 'genel';
let piTabHtml = { genel: '', gelisim: '', istatistik: '' };
const PI_PERIODS = [['t1', 'Yaz'], ['s1', 'Aralık'], ['t2', 'Kış'], ['s2', 'Sezon sonu']];

function piSetTab(t) {
    piTab = t;
    const body = document.getElementById('pi-tab-body');
    if (body) body.innerHTML = piTabHtml[t] || '';
    document.querySelectorAll('#pi-tabs .pi-tab').forEach(b => b.classList.toggle('active', b.dataset.t === t));
}

function piRenderProfile(p) {
    const esc = (s) => escapeHtml(String(s));
    const ovrCol = (o) => (typeof mbOvrColor === 'function' ? mbOvrColor(o) : '#facc15');

    // --- Gelişim noktaları (kronolojik): geliş + her sezonun dönemleri ---
    const pts = [{ lab: 'Geliş', sea: '', ovr: parseInt(p.joinOvr) || 0, age: parseInt(p.joinAge) || 0 }];
    const seasonLast = {};
    seasonsList.forEach(s => {
        const h = p.history && p.history[s];
        if (!h) return;
        PI_PERIODS.forEach(([k, lab]) => {
            const o = parseInt(h[k + 'o']), a = parseInt(h[k + 'a']);
            if (!o && !a) return;
            const prev = pts[pts.length - 1];
            pts.push({ lab, sea: s, ovr: o || prev.ovr, age: a || prev.age });
            seasonLast[s] = o || prev.ovr;
        });
    });
    pts.forEach((pt, i) => { pt.d = i === 0 ? null : pt.ovr - pts[i - 1].ovr; });
    const cur = pts[pts.length - 1];
    const seasonCount = Math.max(1, seasonsList.filter(s => p.history && p.history[s] && Object.keys(p.history[s]).length).length);
    const delta = cur.ovr - pts[0].ovr;
    const deltaTxt = (d) => d > 0 ? `<span style="color:#4ade80">▲ ${d}</span>` : d < 0 ? `<span style="color:#f87171">▼ ${Math.abs(d)}</span>` : `<span class="text-slate-600">–</span>`;
    const box = 'bg-slate-900/50 border border-slate-700/50 rounded-xl';

    // OVR rengi + çerçeve rengi
    const ovrEl = document.getElementById('pi-view-current-ovr');
    if (ovrEl) { ovrEl.style.color = ovrCol(cur.ovr); ovrEl.className = 'font-black leading-none drop-shadow-md'; ovrEl.style.fontSize = '28px'; const se = document.getElementById('pi-view-seasons'); if (se) se.innerHTML = `${seasonCount}<span style="font-size:12px;color:#64748b;font-weight:700"> sezon</span>`; }
    const ph = document.getElementById('pi-view-photo');
    if (ph) ph.style.borderColor = typeof homeXiPosColor === 'function' ? homeXiPosColor(p.pos) : '#ef4444';

    // --- İstatistik verisi ---
    const sCtx = squadContext === 'milli' ? 'milli' : 'kulup';
    let sd = { stats: [], seasonsData: {} }, mine = null, teamG = 0, teamA = 0;
    try {
        sd = getStatsData(sCtx);
        sd.stats.forEach(x => { teamG += x.overallGoals; teamA += x.overallAssists; });
        mine = sd.stats.find(x => x.name.toLowerCase() === String(p.name).trim().toLowerCase()) || null;
    } catch (e) {}
    const G = mine ? mine.overallGoals : 0, A = mine ? mine.overallAssists : 0;
    const pct = (a, b) => b > 0 ? Math.round(a / b * 100) : 0;
    const seasonRows = [];
    const tourTot = {};
    if (mine) {
        seasonsList.forEach(s => {
            const ss = mine.seasons[s];
            if (!ss) return;
            seasonRows.push({ s, g: ss.totalGoals, a: ss.totalAssists });
            Object.keys(ss.tournaments).forEach(t => { tourTot[t] = (tourTot[t] || 0) + ss.tournaments[t].goals; });
        });
    }

    // =============== GENEL (Seçenek 2: Öne çıkanlar) ===============
    const isAk = squadContext === 'akademi';
    const potN = parseInt(p.pot) || 0;
    const tile = (lab, val, sub, col, bg) => `<div class="rounded-xl border border-slate-700/50 p-3" style="background:${bg}"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">${lab}</div><div class="font-black leading-none mt-1.5" style="font-size:28px;color:${col}">${val}</div><div class="text-[11px] text-slate-500 mt-1.5">${sub}</div></div>`;
    const hl = (ic, title, val, sub, col) => `<div class="flex items-center gap-2.5 py-2 border-t border-slate-700/40"><div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style="background:${col}22;color:${col}"><i class="fa-solid ${ic}"></i></div><div class="flex-1 min-w-0"><div class="text-[13px] font-extrabold text-white">${title}</div><div class="text-[11px] text-slate-500 truncate">${sub}</div></div><b class="text-[15px] shrink-0" style="color:${col}">${val}</b></div>`;
    const tile2 = isAk && potN
        ? `<div class="rounded-xl border border-slate-700/50 p-3" style="background:linear-gradient(135deg,rgba(34,197,94,.14),rgba(15,23,42,.35))"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Potansiyel</div><div class="font-black leading-none mt-1.5" style="font-size:28px;color:#6ee7b7">${potN}</div><div class="h-1.5 rounded-full bg-slate-900/70 overflow-hidden mt-3"><i style="display:block;height:100%;width:${Math.min(100, pct(cur.ovr, potN))}%;background:#6ee7b7"></i></div></div>`
        : tile('Geliş OVR', pts[0].ovr, `Gelişim ${delta >= 0 ? '+' : ''}${delta}`, ovrCol(pts[0].ovr), 'transparent');
    let hls = '';
    // En golcü sezon
    const bestG = seasonRows.slice().sort((a, b) => b.g - a.g)[0];
    if (bestG && bestG.g > 0) {
        const tt = Object.keys(mine.seasons[bestG.s].tournaments).filter(t => mine.seasons[bestG.s].tournaments[t].goals > 0).map(t => `${esc(t)} ${mine.seasons[bestG.s].tournaments[t].goals}`).join(', ');
        hls += hl('fa-futbol', 'En golcü sezon', `${bestG.g} gol`, `${esc(bestG.s)} · ${tt}`, '#fbbf24');
    }
    // En verimli turnuva
    const bestT = Object.keys(tourTot).sort((a, b) => tourTot[b] - tourTot[a])[0];
    if (bestT && tourTot[bestT] > 0) hls += hl('fa-bullseye', 'En verimli turnuva', esc(bestT).length > 14 ? esc(bestT).slice(0, 13) + '…' : esc(bestT), `${tourTot[bestT]} gol · toplamın %${pct(tourTot[bestT], G)}'i`, '#22c55e');
    // En çok gelişim
    const bySeason = {};
    pts.forEach(pt => { if (pt.sea && pt.d) bySeason[pt.sea] = (bySeason[pt.sea] || 0) + pt.d; });
    const bestD = Object.keys(bySeason).sort((a, b) => bySeason[b] - bySeason[a])[0];
    if (bestD && bySeason[bestD] > 0) hls += hl('fa-arrow-trend-up', 'En çok gelişim', `+${bySeason[bestD]} OVR`, `${esc(bestD)} sezonu`, '#4ade80');
    // Takım OVR sırası
    try {
        const list = (squadData[squadContext] || []).filter(x => !x.isArchived && !x.isPromoted);
        const ovrs = list.map(x => ({ id: x.id, o: parseInt(getPlayerCurrentStatsByName(x.name, squadContext).ovr) || 0 })).sort((a, b) => b.o - a.o);
        const rank = ovrs.findIndex(x => x.id === p.id) + 1;
        if (rank > 0) hls += hl('fa-ranking-star', 'Takım OVR sırası', `#${rank}`, `${ovrs.length} oyuncu arasında`, '#a78bfa');
    } catch (e) {}
    if (isAk && potN) hls += hl('fa-seedling', 'Potansiyel', potN, `Potansiyele ${Math.max(0, potN - cur.ovr)} puan kaldı`, '#6ee7b7');
    if (squadContext === 'milli') hls += hl('fa-flag', 'Milli takım maçı', `${parseInt(p.caps) || 0}`, 'forma sayısı', '#38bdf8');
    if (!hls) hls = '<div class="text-[12px] text-slate-500 py-3 text-center border-t border-slate-700/40">Henüz öne çıkan veri yok.</div>';

    piTabHtml.genel = `<div class="grid grid-cols-2 gap-2" style="display:none">
        ${tile('Güncel OVR', cur.ovr, `Geliş ${pts[0].ovr} · ${deltaTxt(delta)}`, ovrCol(cur.ovr), 'linear-gradient(135deg,rgba(250,204,21,.12),rgba(15,23,42,.35))')}
        ${tile2}
        ${tile('Güncel Yaş', cur.age || '-', `Geliş yaşı ${esc(p.joinAge)}`, 'inherit', 'transparent')}
        ${tile('Takımda', `${seasonCount}<span class="text-sm text-slate-500 font-bold"> sezon</span>`, esc(p.role || ''), 'inherit', 'transparent')}
    </div>
    <div class="${box} px-3 mt-2"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-2.5 pb-1">Kariyer Öne Çıkanlar</div>${hls}</div>`;

    // =============== GELİŞİM (Seçenek 1: Grafik + Tablo) ===============
    const n = pts.length;
    const W = 440, H = 130, X0 = 30, X1 = 410;
    const xs = pts.map((_, i) => n === 1 ? (X0 + X1) / 2 : X0 + (X1 - X0) * i / (n - 1));
    const oMin = Math.min(...pts.map(q => q.ovr)), oMax = Math.max(...pts.map(q => q.ovr));
    const aMin = Math.min(...pts.map(q => q.age)), aMax = Math.max(...pts.map(q => q.age));
    const yOf = (v, mn, mx, top, bot) => mx === mn ? (top + bot) / 2 : bot - (v - mn) / (mx - mn) * (bot - top);
    const oy = pts.map(q => yOf(q.ovr, oMin, oMax, 26, 100));
    const ay = pts.map(q => yOf(q.age, aMin, aMax, 26, 100));
    const line = (ys) => ys.map((y, i) => `${i ? 'L' : 'M'}${xs[i].toFixed(1)} ${y.toFixed(1)}`).join(' ');
    const showLab = n <= 8;
    const dots = pts.map((q, i) => `<circle cx="${xs[i].toFixed(1)}" cy="${oy[i].toFixed(1)}" r="4.5" fill="#facc15"/>` +
        ((showLab || i === 0 || i === n - 1) ? `<text x="${xs[i].toFixed(1)}" y="${(oy[i] - 9).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" class="text-white">${q.ovr}</text>` : '')).join('');
    const shortLab = { 'Yaz': 'Yaz', 'Aralık': 'Aral', 'Kış': 'Kış', 'Sezon sonu': 'Son' };
    const xl = pts.map((q, i) => {
        if (!(showLab || i === 0 || i === n - 1)) return '';
        const newSea = q.sea && (i === 0 || pts[i - 1].sea !== q.sea);
        const t = !q.sea ? 'Geliş' : (newSea ? q.sea : shortLab[q.lab] || q.lab);
        return `<text x="${xs[i].toFixed(1)}" y="126" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b">${esc(t)}</text>`;
    }).join('');
    const area = n > 1 ? `<path d="${line(oy)} L${xs[n - 1].toFixed(1)} 112 L${xs[0].toFixed(1)} 112Z" fill="url(#piG)"/>` : '';
    const rows = pts.map(q => `<tr class="border-t border-slate-700/30"><td class="py-1.5 text-left font-bold">${q.sea ? `<span class="text-slate-500 font-semibold">${esc(q.sea)}</span> ${esc(q.lab)}` : 'Geliş'}</td><td class="font-black" style="color:${ovrCol(q.ovr)}">${q.ovr}</td><td class="font-bold">${q.d === null ? '<span class="text-slate-600">–</span>' : deltaTxt(q.d)}</td><td class="font-bold">${q.age || '-'}</td></tr>`).reverse().join('');
    piTabHtml.gelisim = `<div class="${box} p-3">
        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">OVR &amp; Yaş</span><span class="text-[11px] font-bold"><span style="color:#facc15">● OVR</span> &nbsp;<span class="text-slate-400">● Yaş</span></span></div>
        <svg viewBox="0 0 ${W} ${H}" class="w-full mt-2" aria-hidden="true"><defs><linearGradient id="piG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#facc15" stop-opacity=".3"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/></linearGradient></defs>
        <g stroke="#475569" stroke-opacity=".5" stroke-dasharray="3 4"><line x1="20" y1="26" x2="430" y2="26"/><line x1="20" y1="63" x2="430" y2="63"/><line x1="20" y1="100" x2="430" y2="100"/></g>
        ${area}${n > 1 ? `<path d="${line(ay)}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/><path d="${line(oy)}" fill="none" stroke="#facc15" stroke-width="3" stroke-linejoin="round"/>` : ''}${dots}${xl}</svg></div>
        <div class="${box} px-3 py-1 mt-2 overflow-y-auto" style="max-height:190px"><table class="w-full text-[12px] text-center"><thead><tr class="text-[10px] text-slate-500 uppercase tracking-widest"><th class="py-1.5 text-left font-extrabold">Dönem</th><th class="font-extrabold">OVR</th><th class="font-extrabold">Fark</th><th class="font-extrabold">Yaş</th></tr></thead><tbody>${rows}</tbody></table></div>`;

    // =============== İSTATİSTİK ===============
    const palette = ['#16a34a', '#d97706', '#9333ea', '#0891b2', '#db2777', '#65a30d', '#dc2626'];
    const tKeys = Object.keys(tourTot).filter(t => tourTot[t] > 0).sort((a, b) => tourTot[b] - tourTot[a]);
    const tBar = tKeys.map((t, i) => `<i style="width:${pct(tourTot[t], G)}%;background:${palette[i % palette.length]}" title="${esc(t)}: ${tourTot[t]}"></i>`).join('');
    const tChips = tKeys.map((t, i) => `<span class="text-[11px] font-extrabold px-2 py-0.5 rounded-md text-white" style="background:${palette[i % palette.length]}">${esc(t)} ${tourTot[t]}</span>`).join('');
    const sCards = seasonRows.slice().reverse().map(r => `<div class="${box} p-2.5"><div class="flex justify-between items-center"><b class="text-[13px] text-white">${esc(r.s)}</b>${seasonLast[r.s] ? `<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full border" style="color:${ovrCol(seasonLast[r.s])};border-color:${ovrCol(seasonLast[r.s])}55;background:${ovrCol(seasonLast[r.s])}1f">OVR ${seasonLast[r.s]}</span>` : ''}</div><div class="text-[12px] mt-1.5 text-slate-300"><b style="color:#fbbf24">${r.g}</b> gol · <b style="color:#60a5fa">${r.a}</b> asist</div></div>`).join('');
    piTabHtml.istatistik = (G || A)
        ? `<div class="grid grid-cols-2 gap-2">
            <div class="${box} p-3"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Toplam Gol</div><div class="flex items-baseline gap-1.5 mt-1"><span class="font-black leading-none" style="font-size:26px;color:#fbbf24">${G}</span><span class="text-[11px] text-slate-500">takım payı %${pct(G, teamG)}</span></div></div>
            <div class="${box} p-3"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Toplam Asist</div><div class="flex items-baseline gap-1.5 mt-1"><span class="font-black leading-none" style="font-size:26px;color:#60a5fa">${A}</span><span class="text-[11px] text-slate-500">takım payı %${pct(A, teamA)}</span></div></div></div>
            ${tKeys.length ? `<div class="${box} p-3 mt-2"><div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Turnuvaya Göre Gol</div><div class="flex h-2.5 rounded-full overflow-hidden bg-slate-900/60">${tBar}</div><div class="flex flex-wrap gap-1.5 mt-2">${tChips}</div></div>` : ''}
            <div class="grid grid-cols-2 gap-2 mt-2 overflow-y-auto" style="max-height:150px">${sCards}</div>`
        : `<div class="${box} p-6 text-center text-[13px] text-slate-500">Bu oyuncu için henüz gol/asist verisi yok.</div>`;

    piSetTab('genel');
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
            populateRolesDropdown('pi-role', squadContext === 'akademi' ? 'A Takım Adayı' : (squadContext === 'milli' ? 'Kadroda' : 'Rotation'));
            document.getElementById('pi-name').value = '';
            document.getElementById('pi-photo-url').value = '';
            document.getElementById('pi-country').value = '';
            document.getElementById('pi-age').value = '18';
            document.getElementById('pi-ovr').value = '60';
            if(squadContext === 'akademi') document.getElementById('pi-pot').value = '85';
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
                
                // Oyuncunun geçmişini tarayarak en güncel verilerini bulalım (t2 ve t1 eklendi)
                for (let i = seasonsList.length - 1; i >= 0; i--) {
                    let s = seasonsList[i];
                    if (p.history && p.history[s]) {
                        if (p.history[s].s2a || p.history[s].s2o) {
                            if (p.history[s].s2a) currentAge = p.history[s].s2a;
                            if (p.history[s].s2o) currentOvr = p.history[s].s2o;
                            break;
                        }
                        if (p.history[s].t2a || p.history[s].t2o) {
                            if (p.history[s].t2a) currentAge = p.history[s].t2a;
                            if (p.history[s].t2o) currentOvr = p.history[s].t2o;
                            break;
                        }
                        if (p.history[s].s1a || p.history[s].s1o) {
                            if (p.history[s].s1a) currentAge = p.history[s].s1a;
                            if (p.history[s].s1o) currentOvr = p.history[s].s1o;
                            break;
                        }
                        if (p.history[s].t1a || p.history[s].t1o) {
                            if (p.history[s].t1a) currentAge = p.history[s].t1a;
                            if (p.history[s].t1o) currentOvr = p.history[s].t1o;
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
                piRenderProfile(p);
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
                if (p.isPromoted) {
                    archBtnView.classList.add('hidden');
                } else {
                    archBtnView.classList.remove('hidden');
                    if(p.isArchived) {
                        archBtnView.innerHTML = '<i class="fa-solid fa-box-open mr-1"></i> Arşivden Çıkar';
                        archBtnView.className = 'px-3 py-2.5 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-medium text-xs sm:text-sm flex-1 transition-colors whitespace-nowrap';
                    } else {
                        archBtnView.innerHTML = '<i class="fa-solid fa-box-archive mr-1"></i> Arşive Taşı';
                        archBtnView.className = 'px-3 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium text-xs sm:text-sm flex-1 transition-colors whitespace-nowrap';
                    }
                }
                
                // Yükselt (Promote) butonu durumu
                const promoteBtnView = document.getElementById('btn-view-promote');
                if (squadContext === 'akademi' && !p.isPromoted) {
                    promoteBtnView.classList.remove('hidden');
                } else {
                    promoteBtnView.classList.add('hidden');
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

        function promotePlayer() {
            if(confirm("Oyuncuyu As Takıma yükseltmek istediğinize emin misiniz? (Oyuncu Akademi listesinde 'PROMOTED' bölümüne alınır ve As Takım kadrosuna kopyalanır.)")) {
                let p = squadData[squadContext].find(pl => pl.id === activePlayerId);
                if(p) {
                    p.isPromoted = true;
                    // Kopyasını As Takıma ekle
                    let newPlayer = JSON.parse(JSON.stringify(p));
                    newPlayer.id = 'p_' + Date.now();
                    newPlayer.isPromoted = false;
                    newPlayer.isArchived = false;
                    newPlayer.role = 'Prospect';
                    if (!squadData['astakim']) squadData['astakim'] = [];
                    squadData['astakim'].push(newPlayer);
                    
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

            const acadPotBox = document.getElementById('pc-form-acad-pot');
            const isAcadTransferSlot = (squadContext === 'akademi');

            if (isAcadTransferSlot) {
                if (acadPotBox) acadPotBox.classList.remove('hidden');
                document.getElementById('pc-acad-pot-input').value = sData[`${type}_acadPot`] || '';
            } else {
                if (acadPotBox) acadPotBox.classList.add('hidden');
            }

            // Artık her hücre tipinde (Transfer veya Gelişim) hem Yaş/OVR hem Transfer bilgisi birlikte girilebiliyor
            document.getElementById('pc-form-stat').classList.remove('hidden');
            const prevKey = (type === 't1') ? 's1' : (type === 't2') ? 's2' : type;
            let ageVal = sData[`${type}a`];
            if (!ageVal) ageVal = getExpectedAge(p, season, prevKey);
            document.getElementById('pc-st-age').value = ageVal || '';
            document.getElementById('pc-st-ovr').value = sData[`${type}o`] || '';

            document.getElementById('pc-form-transfer').classList.remove('hidden');
            document.getElementById('pc-tr-type').value = sData[`${type}Type`] || 'none';
            document.getElementById('pc-tr-name-input').value = sData[type] || '';
            document.getElementById('pc-tr-url-input').value = sData[`${type}Logo`] || '';

            fileUploads['pc-tr'] = null;
            document.getElementById('pc-tr-file-input').value = '';
            document.getElementById('pc-tr-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            document.getElementById('pc-tr-logo-results').innerHTML = '';
            document.getElementById('pc-tr-logo-results').classList.add('hidden');

            if (!isAcadTransferSlot) {
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
            const type = activeCellType;
            const isAcadTransferSlot = (squadContext === 'akademi');

            if (isAcadTransferSlot) {
                sData[`${type}_acadPot`] = document.getElementById('pc-acad-pot-input').value.trim();
            }

            // Gelişim (Yaş / OVR) - artık her hücre tipinde kaydedilir
            sData[`${type}a`] = document.getElementById('pc-st-age').value;
            sData[`${type}o`] = document.getElementById('pc-st-ovr').value;

            // Transfer bilgisi - artık her hücre tipinde kaydedilir
            sData[`${type}Type`] = document.getElementById('pc-tr-type').value;
            sData[type] = document.getElementById('pc-tr-name-input').value.trim();
            let urlVal = document.getElementById('pc-tr-url-input').value.trim();
            sData[`${type}Logo`] = fileUploads['pc-tr'] || (urlVal !== "Yerel Dosya Seçildi" && urlVal !== "Yerel Dosya Yüklendi (Sıkıştırıldı)" ? urlVal : null);
            
            saveToLocalStorage();
            closePlayerCellModal();
            renderSquadGrid();
        }

        function openBulkStatModal(season, cellKey) {
            activeBulkStatSeason = season;
            activeBulkStatCellKey = cellKey;

            const titles = { 't1': 'YAZ Transfer Dönemi', 's1': 'Eylül - Aralık Gelişimi', 't2': 'KIŞ Transfer Dönemi', 's2': 'Şubat - Haziran Gelişimi' };
            document.getElementById('bs-modal-title').innerText = 'Toplu Yaş / OVR Girişi';
            document.getElementById('bs-modal-subtitle').innerText = `${season} Sezonu - ${titles[cellKey] || cellKey}`;

            renderBulkStatRows();

            const modal = document.getElementById('bulk-stat-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeBulkStatModal() {
            document.getElementById('bulk-stat-modal').classList.add('hidden');
            document.getElementById('bulk-stat-modal').classList.remove('flex');
        }

        function renderBulkStatRows() {
            const container = document.getElementById('bs-players-container');
            
            // Kaydırma çubuğunu kalıcı olarak gizle
            container.style.scrollbarWidth = 'none';
            container.style.msOverflowStyle = 'none';
            if (!document.getElementById('force-hide-scroll-bulk')) {
                const style = document.createElement('style');
                style.id = 'force-hide-scroll-bulk';
                style.innerHTML = '#bs-players-container::-webkit-scrollbar { display: none; }';
                document.head.appendChild(style);
            }

            const allPlayers = squadData[squadContext] || [];
            const season = activeBulkStatSeason;
            const cellKey = activeBulkStatCellKey;

            if (allPlayers.length === 0) {
                container.innerHTML = `<div class="text-center text-slate-500 text-sm py-6">Bu kadroda oyuncu bulunmuyor.</div>`;
                return;
            }

            // Kadro paneliyle birebir aynı mevkisel sıralama
            const validGroups = ['GK', 'CB', 'LB', 'RB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'];
            const getGroupForPos = (pos) => {
                const upperPos = (pos || '').toUpperCase().trim();
                return validGroups.includes(upperPos) ? upperPos : 'CM';
            };

            const statsCtx = squadContext === 'milli' ? 'milli' : 'kulup';
            const goalAssistMap = {};
            getStatsData(statsCtx).stats.forEach(s => { goalAssistMap[(s.name || '').toLowerCase()] = s; });

            // Güncel Yaş ve OVR hesaplaması (Ana tablo ile eşleşmesi için)
            allPlayers.forEach(p => {
                p.currentAge = p.joinAge;
                p.currentOvr = p.joinOvr;
                const gs = goalAssistMap[(p.name || '').toLowerCase()];
                p.totalGoals = gs ? gs.overallGoals : 0;
                p.totalAssists = gs ? gs.overallAssists : 0;

                for (let i = seasonsList.length - 1; i >= 0; i--) {
                    let s = seasonsList[i];
                    if (p.history && p.history[s]) {
                        if (p.history[s].s2o || p.history[s].s2a) {
                            if (p.history[s].s2a) p.currentAge = p.history[s].s2a;
                            if (p.history[s].s2o) p.currentOvr = p.history[s].s2o;
                            break;
                        }
                        if (p.history[s].t2o || p.history[s].t2a) {
                            if (p.history[s].t2a) p.currentAge = p.history[s].t2a;
                            if (p.history[s].t2o) p.currentOvr = p.history[s].t2o;
                            break;
                        }
                        if (p.history[s].s1o || p.history[s].s1a) {
                            if (p.history[s].s1a) p.currentAge = p.history[s].s1a;
                            if (p.history[s].s1o) p.currentOvr = p.history[s].s1o;
                            break;
                        }
                        if (p.history[s].t1o || p.history[s].t1a) {
                            if (p.history[s].t1a) p.currentAge = p.history[s].t1a;
                            if (p.history[s].t1o) p.currentOvr = p.history[s].t1o;
                            break;
                        }
                    }
                }
            });

            const renderList = (list) => {
                let listHtml = '';
                validGroups.forEach(groupId => {
                    let groupPlayers = list.filter(p => getGroupForPos(p.pos) === groupId);
                    if (groupPlayers.length === 0) return;

                    groupPlayers.sort((a, b) => {
                        let valA = a[squadSort.field]; let valB = b[squadSort.field];
                        if (squadSort.field === 'joinOvr') { valA = Number(a.currentOvr || 0); valB = Number(b.currentOvr || 0); } 
                        else if (squadSort.field === 'joinAge') { valA = Number(a.currentAge || 0); valB = Number(b.currentAge || 0); } 
                        else if (squadSort.field === 'caps') { valA = Number(a.caps || 0); valB = Number(b.caps || 0); } 
                        else if (squadSort.field === 'totalGoals') { valA = Number(a.totalGoals || 0); valB = Number(b.totalGoals || 0); } 
                        else if (squadSort.field === 'totalAssists') { valA = Number(a.totalAssists || 0); valB = Number(b.totalAssists || 0); } 
                        else { valA = (valA || '').toString().toLowerCase(); valB = (valB || '').toString().toLowerCase(); }
                        
                        if (valA < valB) return squadSort.asc ? -1 : 1;
                        if (valA > valB) return squadSort.asc ? 1 : -1;
                        return 0;
                    });

                    listHtml += groupPlayers.map(p => {
                        const sData = (p.history && p.history[season]) ? p.history[season] : {};
                        let ageVal = sData[`${cellKey}a`];
                        if (!ageVal) {
                            const prevKey = (cellKey === 't1') ? 's1' : (cellKey === 't2') ? 's2' : cellKey;
                            ageVal = getExpectedAge(p, season, prevKey);
                        }
                        const ovrVal = sData[`${cellKey}o`] || '';
                        const photoHtml = p.photoUrl
                            ? `<img src="${p.photoUrl}" class="w-8 h-8 rounded-full object-cover bg-slate-800 shrink-0">`
                            : `<div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">${escapeHtml((p.name || '?').charAt(0))}</div>`;

                        return `
                            <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-2" data-player-id="${p.id}">
                                ${photoHtml}
                                <span class="flex-1 text-sm font-bold text-white truncate">${escapeHtml(p.name)}</span>
                                <span class="text-[10px] font-black pos-${p.pos} bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5">${p.pos || ''}</span>
                                <input type="number" class="bs-age-input w-14 bg-slate-950 border border-slate-600 rounded p-1 sm:p-1 sm:p-1 sm:p-1 sm:p-1.5 text-center text-white outline-none focus:border-emerald-500 appearance-none" placeholder="Yaş" value="${ageVal || ''}" autocomplete="off">
                                <input type="number" class="bs-ovr-input w-14 bg-slate-950 border border-slate-600 rounded p-1 sm:p-1 sm:p-1 sm:p-1 sm:p-1.5 text-center text-emerald-400 font-bold outline-none focus:border-emerald-500 appearance-none" placeholder="OVR" value="${ovrVal}" autocomplete="off">
                            </div>
                        `;
                    }).join('');
                });
                return listHtml;
            };

            let activePlayers = allPlayers.filter(p => !p.isArchived && !p.isPromoted);
            let archivedPlayers = allPlayers.filter(p => p.isArchived && !p.isPromoted);
            let promotedPlayers = allPlayers.filter(p => p.isPromoted);

            let html = renderList(activePlayers);
            if (promotedPlayers.length > 0) {
                html += `<div class="text-[10px] font-black text-emerald-400 tracking-widest uppercase mt-4 mb-2 border-b border-slate-700 pb-1"><i class="fa-solid fa-arrow-up mr-1"></i>PROMOTED</div>`;
                html += renderList(promotedPlayers);
            }
            if (archivedPlayers.length > 0) {
                html += `<div class="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-4 mb-2 border-b border-slate-700 pb-1"><i class="fa-solid fa-box-archive mr-1"></i>TAKIMDAN AYRILANLAR / ARŞİV</div>`;
                html += renderList(archivedPlayers);
            }

            container.innerHTML = html;
        }

        function saveBulkStatModal() {
            const season = activeBulkStatSeason;
            const cellKey = activeBulkStatCellKey;
            const rows = document.querySelectorAll('#bs-players-container [data-player-id]');
            let updatedCount = 0;

            rows.forEach(row => {
                const id = row.getAttribute('data-player-id');
                const age = row.querySelector('.bs-age-input').value.trim();
                const ovr = row.querySelector('.bs-ovr-input').value.trim();
                if (!age && !ovr) return;

                const p = squadData[squadContext].find(pl => pl.id === id);
                if (!p) return;
                if (!p.history) p.history = {};
                if (!p.history[season]) p.history[season] = {};
                if (age) p.history[season][`${cellKey}a`] = age;
                if (ovr) p.history[season][`${cellKey}o`] = ovr;
                updatedCount++;
            });

            if (updatedCount > 0) {
                saveToLocalStorage();
                closeBulkStatModal();
                renderSquadGrid();
            } else {
                alert('Hiçbir oyuncu için yaş veya OVR girilmedi.');
            }
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

        // ===================== LİG TARİHİ: mobil sekmeler (Takımlar / Grafik) =====================
        let leagueMobileTab = 'teams'; // 'teams' | 'chart'  (lg altı ekranlarda sekme, geniş ekranda iki panel yan yana)
        function leagueTabClass(active) {
            return active
                ? 'flex-1 min-w-0 px-2 py-3 text-base bg-slate-900 text-emerald-400 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center'
                : 'flex-1 min-w-0 px-2 py-3 text-base bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer';
        }
        function switchLeagueTab(tab) {
            leagueMobileTab = tab;
            const paneT = document.getElementById('lh-pane-teams');
            const paneC = document.getElementById('lh-pane-chart');
            const btnT = document.getElementById('lh-tab-teams');
            const btnC = document.getElementById('lh-tab-chart');
            if (!paneT || !paneC) return;
            const onTeams = tab === 'teams';
            paneT.classList.toggle('hidden', !onTeams); paneT.classList.toggle('flex', onTeams);
            paneC.classList.toggle('hidden', onTeams); paneC.classList.toggle('flex', !onTeams);
            if (btnT) btnT.className = leagueTabClass(onTeams);
            if (btnC) btnC.className = leagueTabClass(!onTeams);
            // Gizliyken ölçüsü 0 kalan grafik, görünür olunca yeniden çizilir
            if (!onTeams && typeof updateLeagueChart === 'function') requestAnimationFrame(() => updateLeagueChart());
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
                    <h3 class="text-xl sm:text-2xl font-bold text-white">Lig Tarihi</h3>
                    <div class="flex items-center gap-2 sm:gap-4">
                        <button onclick="openLeagueTeamBulkModal()" title="Toplu Ekle" aria-label="Toplu Ekle" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-list-ol sm:mr-1"></i><span class="hidden sm:inline">Toplu Ekle</span></button>
                        <button onclick="openLeagueTeamModal()" title="Takım Ekle" aria-label="Takım Ekle" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-lg"><i class="fa-solid fa-plus sm:mr-1"></i><span class="hidden sm:inline">Takım Ekle</span></button>
                    </div>
                </div>
                
                <div class="flex lg:hidden gap-1 shrink-0 px-2">
                        <button onclick="switchLeagueTab('teams')" id="lh-tab-teams" title="TAKIMLAR" aria-label="TAKIMLAR" class="${leagueTabClass(leagueMobileTab === 'teams')}"><i class="fa-solid fa-table-list"></i></button>
                        <button onclick="switchLeagueTab('chart')" id="lh-tab-chart" title="Sıralama Grafiği (1-18)" aria-label="Sıralama Grafiği (1-18)" class="${leagueTabClass(leagueMobileTab === 'chart')}"><i class="fa-solid fa-chart-line"></i></button>
                    </div>
                <div class="w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-0 lg:gap-4 overflow-hidden">
                    
                    <div id="lh-pane-teams" class="w-full lg:w-1/2 ${leagueMobileTab === 'teams' ? 'flex' : 'hidden'} lg:flex flex-col h-full bg-slate-900 border border-slate-700 rounded-b-xl rounded-tr-xl lg:rounded-xl overflow-hidden shadow-lg relative">
                        <div class="w-full overflow-auto table-scroll flex-1 h-full">
                            <table class="w-full border-separate border-spacing-0 text-sm min-w-max">
                                <thead class="bg-slate-950 sticky top-0 z-[40] shadow-md">
                                    <tr>
                                        <th class="p-2 border-r border-b border-slate-700 sticky left-0 bg-slate-900 z-[50] w-12 text-center text-slate-400">#</th>
                                        <th class="p-2 border-r border-b border-slate-700 sticky left-[48px] bg-slate-900 z-[50] text-left text-white min-w-[150px] cursor-pointer hover:text-emerald-400 transition-colors" onclick="sortLeague('name')">TAKIMLAR <i class="fa-solid fa-sort ml-1 opacity-50 text-[10px]"></i></th>
            `;
            
            seasonsList.forEach(season => {
                const safeSeason = season.replace(/'/g,"\\'");
                html += `<th class="p-2 border-r border-b border-slate-700 text-center font-bold text-emerald-400">
                            <div class="flex items-center justify-center gap-1.5">
                                <span class="cursor-pointer hover:text-white transition-colors" onclick="sortLeague('${season}')">${season} <i class="fa-solid fa-sort ml-1 opacity-50 text-[10px]"></i></span>
                                <button onclick="event.stopPropagation(); openBulkLeaguePtsModal('${safeSeason}')" class="text-slate-400 hover:text-emerald-300 transition-colors" title="Toplu Puan Gir"><i class="fa-solid fa-bolt text-[9px]"></i></button>
                            </div>
                         </th>`;
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

                    <div id="lh-pane-chart" class="w-full lg:w-1/2 ${leagueMobileTab === 'chart' ? 'flex' : 'hidden'} lg:flex flex-col h-full bg-slate-900 border border-slate-700 rounded-b-xl rounded-tl-xl lg:rounded-xl overflow-hidden shadow-lg p-4 relative min-h-[300px]">
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

        function openBulkLeaguePtsModal(season) {
            activeBulkLeagueSeason = season;
            document.getElementById('blp-modal-subtitle').innerText = `${season} Sezonu`;
            renderBulkLeaguePtsRows();

            const modal = document.getElementById('bulk-league-pts-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeBulkLeaguePtsModal() {
            document.getElementById('bulk-league-pts-modal').classList.add('hidden');
            document.getElementById('bulk-league-pts-modal').classList.remove('flex');
        }

        function renderBulkLeaguePtsRows() {
            const container = document.getElementById('blp-teams-container');
            const season = activeBulkLeagueSeason;

            if (leagueHistoryData.length === 0) {
                container.innerHTML = `<div class="text-center text-slate-500 text-sm py-6">Kayıtlı takım bulunmuyor.</div>`;
                return;
            }

            const teamsSorted = [...leagueHistoryData].sort((a, b) => a.name.localeCompare(b.name, 'tr'));

            container.innerHTML = teamsSorted.map(team => {
                const ptsVal = (team.history[season] && team.history[season].pts) ? team.history[season].pts : '';
                return `
                    <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1" data-team-id="${team.id}">
                        <div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${team.color}"></div>
                        <span class="flex-1 text-xs font-bold text-white truncate">${escapeHtml(team.name)}</span>
                        <input type="number" class="blp-pts-input w-16 bg-slate-950 border border-slate-600 rounded p-1 text-center text-emerald-400 text-sm font-bold outline-none focus:border-emerald-500 appearance-none" placeholder="Puan" value="${ptsVal}" autocomplete="off">
                    </div>
                `;
            }).join('');
        }

        function saveBulkLeaguePtsModal() {
            const season = activeBulkLeagueSeason;
            const rows = document.querySelectorAll('#blp-teams-container [data-team-id]');
            let updatedCount = 0;

            rows.forEach(row => {
                const id = row.getAttribute('data-team-id');
                const pts = row.querySelector('.blp-pts-input').value.trim();
                if (pts === '') return;

                const team = leagueHistoryData.find(t => t.id === id);
                if (!team) return;
                if (!team.history) team.history = {};
                if (!team.history[season]) team.history[season] = {};
                team.history[season].pts = pts;
                updatedCount++;
            });

            if (updatedCount > 0) {
                saveToLocalStorage();
                closeBulkLeaguePtsModal();
                renderLeagueHistory();
            } else {
                alert('Hiçbir takım için puan girilmedi.');
            }
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
            let balanceColor = netBalance > 0 ? '#4ade80' : (netBalance < 0 ? '#f87171' : '#facc15'); // artı: yeşil, 0: sarı, eksi: kırmızı
            let balanceSign = netBalance > 0 ? '+' : '';

            const getSortIcon = (type, field) => {
                if (transferSort[type].field === field) return transferSort[type].asc ? '<i class="fa-solid fa-chevron-up text-[10px] ml-1 opacity-100"></i>' : '<i class="fa-solid fa-chevron-down text-[10px] ml-1 opacity-100"></i>';
                return '<i class="fa-solid fa-sort text-[10px] ml-1 opacity-30 group-hover:opacity-100 transition-opacity"></i>';
            };

            const renderShortlistList = () => {
                const sData = transferData.shortlist || [];
                if (sData.length === 0) return `<div class="text-center p-4 text-slate-500 text-sm">Kayıtlı hedef bulunmuyor.</div>`;
                
                const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
                const sorted = [...sData].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

                return sorted.map(t => {
                    const rowBgClass = t.priority === 'high' ? 'bg-red-900/20 border-red-500/30 hover:bg-red-900/40' : 
                                       t.priority === 'medium' ? 'bg-orange-900/20 border-orange-500/30 hover:bg-orange-900/40' : 
                                       'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40';
                    
                    return `
                        <div class="flex items-center gap-2 sm:gap-3 px-2 py-1.5 sm:p-3 rounded-lg border transition-colors cursor-pointer group ${rowBgClass}" onclick="openShortlistModal('${t.id}')">
                            <div class="w-7 h-7 sm:w-10 sm:h-10 rounded flex items-center justify-center font-black text-xs sm:text-sm border border-slate-700/50 bg-slate-950 shadow-inner shrink-0 pos-${escapeHtml(t.pos)}">${escapeHtml(t.pos)}</div>
                            <div class="flex-1 min-w-0 text-left">
                                <p class="text-xs text-slate-300 leading-tight whitespace-pre-wrap">${escapeHtml(t.profile)}</p>
                            </div>
                        </div>
                    `;
                }).join('');
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
                        let photoHtml = t.photoUrl ? `<img src="${t.photoUrl}" class="w-7 h-7 rounded-full object-cover shadow-sm bg-slate-800 shrink-0">` : `<div class="w-7 h-7 rounded-full flex items-center justify-center bg-slate-700 font-bold text-xs shadow-sm shrink-0">${t.name.charAt(0)}</div>`;
                        let feeText = t.fee > 0 ? `€${t.fee.toLocaleString('tr-TR')}` : 'Bedelsiz';
                        let feeColor = type === 'in' ? (t.fee > 0 ? 'text-red-400' : 'text-emerald-400') : (t.fee > 0 ? 'text-emerald-400' : 'text-slate-400');
                        
                        listHTML += `
                            <div class="flex items-center gap-2 sm:gap-3 px-2 py-1.5 sm:p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-lg border border-slate-700/50 transition-colors cursor-pointer group" onclick="openTransferModal('${type}', '${t.id}')">
                                ${photoHtml}
                                <div class="flex-1 min-w-0">
                                    <div class="flex justify-between items-start">
                                        <h4 class="font-bold text-white text-sm leading-tight truncate">
                                            <span class="hover:text-emerald-400 transition-colors" data-pname="${escapeHtml(t.name)}" onclick="event.stopPropagation(); openStatsPlayerProfile(this)" title="Profili Görüntüle">${escapeHtml(t.name)}</span> 
                                            <span class="text-[10px] text-slate-400 font-normal ml-1 border border-slate-600 rounded px-1 pointer-events-none">${escapeHtml(t.season)}</span>
                                        </h4>
                                        <span class="font-bold text-sm ${feeColor} whitespace-nowrap">${feeText}</span>
                                    </div>
                                    <div class="flex justify-between items-center mt-0.5 text-[11px] text-slate-400">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold pos-${t.pos}">${t.pos}</span>
                                             
                                            ${mbAge(t.age)}
                                             
                                            ${mbOvr(t.ovr, true)}
                                        </div>
                                        <div class="truncate text-right max-w-[160px]" title="${escapeHtml(t.team || '')}">
                                            ${type === 'in' ? '<i class="fa-solid fa-arrow-right-to-bracket text-emerald-500 mr-1"></i>' : '<i class="fa-solid fa-arrow-right-from-bracket text-red-500 mr-1"></i>'}
                                            ${(() => { const l = t.team ? getTeamLogoByName(t.team) : ''; return l ? `<img src="${l}" alt="" class="w-4 h-4 object-contain inline-block align-middle mr-1" onerror="this.style.display='none'">` : ''; })()}${escapeHtml(t.team || 'Bilinmiyor')}
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
                <div class="w-full flex flex-col h-full overflow-hidden">
                    <!-- Bilanço Kartı -->
                    <div class="bg-slate-900 border border-slate-700 rounded-xl p-2 sm:px-4 sm:py-3 mb-1.5 sm:mb-2 shadow-sm shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3">
                        <div class="text-center sm:text-left">
                            <h3 class="text-sm sm:text-xl font-black text-white tracking-wider flex items-center justify-center sm:justify-start gap-2">
                                <i class="fa-solid fa-money-bill-transfer text-emerald-500"></i>
                                TRANSFER PANELİ
                            </h3>
                            
                        </div>
                        <div class="flex gap-3 sm:gap-6 items-center bg-slate-950 px-2 py-1 sm:px-5 sm:py-2.5 rounded-lg border border-slate-800 w-full sm:w-auto justify-center">
                            <div class="text-center">
                                <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Gider</div>
                                <div class="text-xs sm:text-lg font-black text-red-500">€${totalIn.toLocaleString('tr-TR')}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Gelir</div>
                                <div class="text-xs sm:text-lg font-black text-emerald-500"><span style="color:#4ade80">€${totalOut.toLocaleString('tr-TR')}</span></div>
                            </div>
                            <div class="w-px h-6 sm:h-8 bg-slate-700"></div>
                            <div class="text-center">
                                <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Net Bilanço</div>
                                <div class="text-base sm:text-2xl font-black ${balanceColor}"><span style="color:${balanceColor}">${balanceSign}€${netBalance.toLocaleString('tr-TR')}</span></div>
                            </div>
                        </div>
                    </div>

                    <!-- Sekmeler (Tabs - Sadece Mobilde Görünür) -->
                    <div class="flex lg:hidden gap-1 overflow-x-auto hide-scrollbar shrink-0 px-1 mb-2">
                        <button onclick="switchTransferTab('shortlist')" id="trtab-shortlist" class="flex-1 px-4 py-1.5 sm:py-3 text-base sm:text-lg bg-slate-900 text-blue-400 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center">
                            <i class="fa-solid fa-list-check"></i>
                        </button>
                        <button onclick="switchTransferTab('in')" id="trtab-in" class="flex-1 px-4 py-1.5 sm:py-3 text-base sm:text-lg bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer">
                            <i class="fa-solid fa-arrow-down text-emerald-400"></i>
                        </button>
                        <button onclick="switchTransferTab('out')" id="trtab-out" class="flex-1 px-4 py-1.5 sm:py-3 text-base sm:text-lg bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer">
                            <i class="fa-solid fa-arrow-up text-red-400"></i>
                        </button>
                    </div>

                    <!-- Transfer Listeleri -->
                    <div class="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden relative z-0">
                        
                        <!-- Shortlist -->
                        <div id="trcontent-shortlist" class="flex-1 flex lg:flex flex-col bg-slate-900 border border-slate-700 lg:rounded-xl rounded-b-xl rounded-tr-xl overflow-hidden shadow-lg min-h-0 relative transition-all duration-300">
                            <div class="bg-blue-900/30 border-b border-blue-800 p-3 shrink-0 flex justify-between items-center">
                                <h4 class="font-bold text-blue-400 flex items-center gap-2">
                                    <i class="fa-solid fa-list-check text-sm hidden lg:inline"></i> SHORTLIST
                                </h4>
                                <button onclick="openShortlistModal()" class="ml-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold shadow transition-colors">
                                    <i class="fa-solid fa-plus"></i> EKLE
                                </button>
                            </div>
                            <div class="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 sm:space-y-2 hide-scrollbar">
                                ${renderShortlistList()}
                            </div>
                        </div>

                        <!-- Gelenler -->
                        <div id="trcontent-in" class="hidden lg:flex flex-1 flex-col bg-slate-900 border border-slate-700 lg:rounded-xl rounded-b-xl rounded-tr-xl overflow-hidden shadow-lg min-h-0 relative transition-all duration-300">
                            <div class="bg-emerald-900/30 border-b border-emerald-800 p-3 shrink-0 flex justify-between items-center">
                                <h4 class="font-bold text-emerald-400 flex items-center gap-2">
                                    <i class="fa-solid fa-arrow-down text-sm hidden lg:inline"></i> <span class="hidden lg:inline">GELENLER</span>
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
                            <div class="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 sm:space-y-2 hide-scrollbar">
                                ${renderTransferList('in')}
                            </div>
                        </div>

                        <!-- Gidenler -->
                        <div id="trcontent-out" class="hidden lg:flex flex-1 flex-col bg-slate-900 border border-slate-700 lg:rounded-xl rounded-b-xl rounded-tr-xl overflow-hidden shadow-lg min-h-0 relative transition-all duration-300">
                            <div class="bg-red-900/30 border-b border-red-800 p-2 sm:p-3 shrink-0 flex justify-between items-center">
                                <h4 class="font-bold text-red-400 flex items-center gap-2">
                                    <i class="fa-solid fa-arrow-up text-sm hidden lg:inline"></i> <span class="hidden lg:inline">GİDENLER</span>
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
                            <div class="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 sm:space-y-2 hide-scrollbar">
                                ${renderTransferList('out')}
                            </div>
                        </div>
                        
                    </div>
                </div>
            `;
            updateContentArea(html);
            
            // Sekme durumunu en son bırakıldığı gibi ayarla
            switchTransferTab(transferActiveTab);
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

        let activeShortlistId = null;

        function openShortlistModal(id = null) {
            activeShortlistId = id;
            const modalTitle = document.getElementById('sl-modal-title');
            const deleteBtn = document.getElementById('btn-delete-shortlist');

            if (id) {
                modalTitle.innerText = "Hedefi Düzenle";
                const t = transferData.shortlist.find(x => x.id === id);
                document.getElementById('sl-pos').value = t.pos;
                document.getElementById('sl-profile').value = t.profile;
                document.getElementById('sl-priority').value = t.priority;
                deleteBtn.classList.remove('hidden');
            } else {
                modalTitle.innerText = "Hedef Ekle";
                document.getElementById('sl-pos').value = '';
                document.getElementById('sl-profile').value = '';
                document.getElementById('sl-priority').value = 'medium';
                deleteBtn.classList.add('hidden');
            }

            const modal = document.getElementById('shortlist-modal');
            modal.classList.remove('hidden'); 
            modal.classList.add('flex');
            
            setTimeout(() => document.getElementById('sl-pos').focus(), 50);
        }

        function closeShortlistModal() {
            const modal = document.getElementById('shortlist-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function saveShortlistItem() {
            const pos = document.getElementById('sl-pos').value.trim().toUpperCase();
            const profile = document.getElementById('sl-profile').value.trim();
            const priority = document.getElementById('sl-priority').value;

            if(!pos) { alert("Mevki zorunludur!"); return; }

            if (!transferData.shortlist) transferData.shortlist = [];

            if (activeShortlistId) {
                let t = transferData.shortlist.find(x => x.id === activeShortlistId);
                t.pos = pos;
                t.profile = profile;
                t.priority = priority;
            } else {
                transferData.shortlist.push({
                    id: 'sl_' + Date.now(),
                    pos, profile, priority
                });
            }
            
            saveToLocalStorage();
            closeShortlistModal();
            renderTransferPanel();
        }

        function deleteShortlistItem() {
            if(confirm("Bu hedefi silmek istediğinize emin misiniz?")) {
                transferData.shortlist = transferData.shortlist.filter(x => x.id !== activeShortlistId);
                saveToLocalStorage();
                closeShortlistModal();
                renderTransferPanel();
            }
        }

        // --- GOL VE ASİST PANELİ ---
        function toggleStatsExpand(context, season) {
            if (!statExpanded[context]) statExpanded[context] = {};
            statExpanded[context][season] = !statExpanded[context][season];
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

        let statsActiveTab = 'kulup'; // Mobil için aktif tab
        
                                // ===================== GOL-ASİST v6: takım üst başlıkları + tüm tablolar için tek tip otomatik ölçek =====================
        // Dört tabloyu da aynı yazı boyutuyla çizer; en dar paneli referans alıp ortak boyutu küçültür (web, >=1280px).
        function statsFitTables() {
            const tables = Array.from(document.querySelectorAll('table.stv2'));
            if (!tables.length) return;
            if (!window.matchMedia('(min-width: 1280px)').matches) { tables.forEach(t => { t.style.fontSize = ''; }); return; }
            const MAXFS = 15, MINFS = 10;
            let fs = MAXFS;
            for (let pass = 0; pass < 4; pass++) {
                tables.forEach(t => { t.style.fontSize = fs + 'px'; });
                let ratio = 1;
                tables.forEach(t => {
                    const sc = t.parentElement;
                    if (!sc || !sc.clientWidth) return;
                    const w = t.style.width, mw = t.style.minWidth;
                    t.style.width = 'max-content'; t.style.minWidth = '0';
                    const need = t.offsetWidth;
                    t.style.width = w; t.style.minWidth = mw;
                    if (need > 0) ratio = Math.min(ratio, (sc.clientWidth - 2) / need);
                });
                if (ratio >= 1) break;
                fs = Math.max(MINFS, Math.floor(fs * ratio * 10) / 10);
                if (fs <= MINFS) { tables.forEach(t => { t.style.fontSize = fs + 'px'; }); break; }
            }
        }
        if (!window.__statsFitBound) {
            window.__statsFitBound = true;
            let _t = null;
            window.addEventListener('resize', () => {
                clearTimeout(_t);
                _t = setTimeout(() => { if (typeof activeMain !== 'undefined' && activeMain === 'golasist') statsFitTables(); }, 120);
            });
        }

        function renderStatsPanel() {
            const ctxSel = statsActiveTab === 'milli' ? 'milli' : 'kulup';
            const metric = statsMetricTab === 'assists' ? 'assists' : 'goals';
            const pack = (ctx) => {
                const d = getStatsData(ctx);
                return { ctx, d, goals: d.stats.filter(p => p.overallGoals > 0), assists: d.stats.filter(p => p.overallAssists > 0) };
            };
            const K = pack('kulup'), M = pack('milli');

            const tabOn = 'flex-1 px-4 py-3 text-lg bg-slate-900 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center';
            const tabOff = 'flex-1 px-4 py-3 text-lg bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer';
            const ctxIcon = (id, icon) => {
                const t = (typeof managedTeams !== 'undefined' && managedTeams) ? managedTeams[id] : null;
                const u = t && t.logoUrl;
                return u ? `<img src="${u}" alt="" class="w-6 h-6 object-contain ${ctxSel === id ? '' : 'opacity-50'}">` : `<i class="fa-solid ${icon}"></i>`;
            };
            const ctxTab = (id, icon, ttl, colorOn) => `<button onclick="statsSetContext('${id}')" title="${ttl}" class="${ctxSel === id ? tabOn + ' ' + colorOn : tabOff}">${ctxIcon(id, icon)}</button>`;
            const metTab = (id, icon, ttl, colorOn) => `<button onclick="statsSetMetricTab('${id}')" title="${ttl}" class="${metric === id ? tabOn + ' ' + colorOn : tabOff}"><i class="fa-solid ${icon}"></i></button>`;

            // Takım üst başlığı (yalnızca web): Kulüp / Milli Takım + takım adı
            const groupHead = (ctx) => {
                const isK = ctx === 'kulup';
                const t = (typeof managedTeams !== 'undefined' && managedTeams && managedTeams[ctx]) ? managedTeams[ctx] : null;
                const nm = t && t.name ? String(t.name) : '';
                const logo = nm && typeof getTeamLogoByName === 'function' ? getTeamLogoByName(nm) : '';
                const cls = isK ? 'bg-emerald-900/25 border-emerald-700/50 text-emerald-300' : 'bg-red-900/25 border-red-700/50 text-red-300';
                return `<div class="hidden xl:flex shrink-0 items-center gap-2.5 px-4 py-2.5 mb-3 rounded-xl border ${cls}">
                    ${logo ? `<img src="${logo}" alt="" class="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0">` : `<i class="fa-solid ${isK ? 'fa-shield-halved' : 'fa-flag'}"></i>`}
                    <span class="font-black tracking-[0.18em] uppercase text-sm truncate">${nm ? escapeHtml(nm) : (isK ? 'Kulüp' : 'Milli Takım')}</span>
                     
                </div>`;
            };
            const one = (P, m) => `
                <div class="${(ctxSel === P.ctx && metric === m) ? 'flex' : 'hidden xl:flex'} flex-1 flex-col min-h-0 min-w-0 relative">
                    ${renderStatTableHTML(P.ctx, m === 'goals' ? 'Gol' : 'Asist', m === 'goals' ? P.goals : P.assists, P.d.seasonsData, statSortM[P.ctx][m], m)}
                </div>`;
            const group = (P) => `
                <div class="${ctxSel === P.ctx ? 'flex' : 'hidden xl:flex'} flex-1 flex-col min-h-0 min-w-0">
                    ${groupHead(P.ctx)}
                    ${renderStatCareerHTML(P, metric)}
                </div>`;

            const html = `
                <div class="w-full flex-1 flex flex-col min-h-0 overflow-hidden px-2 pt-2">
                    <!-- Mobil: tek satırlık kompakt geçiş (sol: Kulüp / Milli, sağ: Gol / Asist) -->
                    <div class="flex xl:hidden items-center justify-between gap-2 shrink-0 px-1 mb-2">
                        <div class="inline-flex items-center gap-0.5 p-0.5 rounded-full bg-slate-900 border border-slate-700">
                            ${[['kulup', 'fa-shield-halved', 'Kulüp', 'bg-emerald-500/20 text-emerald-300'], ['milli', 'fa-flag', 'Milli Takım', 'bg-red-500/20 text-red-300']].map(([id, ic, ttl, on]) => {
                                const t = (typeof managedTeams !== 'undefined' && managedTeams) ? managedTeams[id] : null;
                                const u = t && t.logoUrl;
                                const active = ctxSel === id;
                                return `<button onclick="statsSetContext('${id}')" title="${ttl}" class="h-8 min-w-[44px] px-3 rounded-full flex items-center justify-center transition-colors ${active ? on : 'text-slate-400 hover:text-white'}">${u ? `<img src="${u}" alt="" class="w-5 h-5 object-contain ${active ? '' : 'opacity-50'}">` : `<i class="fa-solid ${ic} text-sm"></i>`}</button>`;
                            }).join('')}
                        </div>
                        <div class="inline-flex items-center gap-0.5 p-0.5 rounded-full bg-slate-900 border border-slate-700">
                            ${[['goals', 'fa-futbol', 'Gol', 'bg-amber-400/20 text-amber-300'], ['assists', 'fa-shoe-prints', 'Asist', 'bg-blue-400/20 text-blue-300']].map(([id, ic, ttl, on]) => `<button onclick="statsSetMetricTab('${id}')" title="${ttl}" class="h-8 min-w-[44px] px-3 rounded-full flex items-center justify-center transition-colors ${metric === id ? on : 'text-slate-400 hover:text-white'}"><i class="fa-solid ${ic} text-sm"></i></button>`).join('')}
                        </div>
                    </div>

                    <!-- Web: başlık + Gol/Asist geçişi -->
                    <div class="hidden xl:flex shrink-0 items-center justify-between px-1 mb-3">
                        <h3 class="font-black text-lg text-white tracking-wide">Kariyer İstatistikleri</h3>
                        <div class="inline-flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-slate-700">
                            <button onclick="statsSetMetricTab('goals')" class="px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${metric === 'goals' ? 'bg-amber-400/15 text-amber-300' : 'text-slate-400 hover:text-white'}"><i class="fa-solid fa-futbol mr-1.5"></i>Goller</button>
                            <button onclick="statsSetMetricTab('assists')" class="px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${metric === 'assists' ? 'bg-blue-400/15 text-blue-300' : 'text-slate-400 hover:text-white'}"><i class="fa-solid fa-shoe-prints mr-1.5"></i>Asistler</button>
                        </div>
                    </div>
                    <!-- Web: solda Kulüp, sağda Milli Takım (ısı haritalı kariyer tablosu) -->
                    <div class="flex-1 flex flex-col xl:flex-row gap-6 min-h-0 overflow-hidden relative z-0">
                        ${group(K)}
                        ${group(M)}
                    </div>
                </div>
            `;
            updateContentArea(html);
            statsFitTables();
            requestAnimationFrame(statsFitTables);
            setTimeout(statsFitTables, 400);   // ikon/yazı tipi yüklendikten sonra yeniden ölç
        }

                // ===================== GOL-ASİST TABLOSU v2: sığan sütunlar, tam isimler, büyük masaüstü ölçeği, sade başlık =====================
        function statsV2EnsureCss() {
            if (document.getElementById('stats-v2-css')) return;
            const st = document.createElement('style');
            st.id = 'stats-v2-css';
            st.textContent = `
                .stv2 { font-size: 12px; border-collapse: separate; border-spacing: 0; }
                @media (min-width: 1280px) { .stv2 { font-size: 13px; } }
                @media (min-width: 1700px) { .stv2 { font-size: 14px; } }
                .stv2 th, .stv2 td { box-sizing: border-box; padding: .5em .6em; white-space: nowrap; text-align: center; vertical-align: middle; border-bottom: 1px solid rgba(148,163,184,.12); }
                .stv2 tbody tr:last-child td { border-bottom: none; }
                .stv2 thead th { border-bottom: 1px solid rgba(148,163,184,.25); }
                .stv2 tfoot td { border-top: 2px solid rgba(148,163,184,.3); border-bottom: none; }
                .stv2 .stv2-sep { border-left: 1px solid rgba(148,163,184,.22); }
                .stv2 thead button.group\/th { padding: .25em .7em; }
                .stv2 thead button.group\/th > i { margin-left: 0 !important; }
                .stv2 thead button.group\/th > i.opacity-0 { opacity: .3 !important; }
                .stv2 thead [class*="tracking-[0.15em]"] { letter-spacing: .06em; }
                .stv2 td.stv2-id { padding-right: .6em; }
                .stv2 td.stv2-id > div { gap: .45em; }
                .stv2 td.stv2-id .ml-auto { padding-left: .3em; }
                .stv2 .stv2-id { text-align: left; padding-left: .7em; padding-right: 1em; }
                .stv2 .stv2-idshadow { box-shadow: 6px 0 8px -6px rgba(0,0,0,.55); }
                .stv2 .stats-rank-badge { width: 1.75em; height: 1.75em; font-size: .8em; flex-shrink: 0; }
                .stv2 .stats-pos-pill { display: inline-block; min-width: 2.6em; text-align: center; font-size: .7em; padding: .25em .5em; flex-shrink: 0; }
                .stv2 .stats-chip { min-width: 2.1em; padding: .15em .55em; font-size: .95em; }
                .stv2 .stats-chip-goal-total, .stv2 .stats-chip-assist-total { font-size: 1.05em; min-width: 2.1em; padding: .1em .5em; }
                .stv2 .stats-chip-goal-tour, .stv2 .stats-chip-assist-tour { font-size: .85em; min-width: 1.9em; padding: .1em .45em; }
                body.theme-light .stv2 th, body.theme-light .stv2 td { border-bottom-color: rgba(44,36,32,.1); }
                body.theme-light .stv2 .stv2-sep { border-left-color: rgba(44,36,32,.18); }
                body.theme-light .stv2 tfoot td { border-top-color: rgba(44,36,32,.3); }
            `;
            document.head.appendChild(st);
        }

        function statsChipTier(val, max) {
            if (!val || val <= 0) return 'chip-tier-zero';
            if (max > 0 && val === max) return 'chip-glow-max';
            const ratio = max > 0 ? val / max : 0;
            if (ratio >= 0.7) return 'chip-tier-bright';
            if (ratio >= 0.4) return 'chip-tier-mid';
            return 'chip-tier-dim';
        }

                // ===================== GOL-ASİST v3: Gol / Asist / Tümü ayrımı (önce v2 uygulanmış olmalı) =====================

                // ===================== GOL-ASİST v4: web'de yan yana Gol | Asist tabloları, mobilde Kulüp/Milli + Gol/Asist sekmeleri =====================
        let statsMetricTab = 'goals';   // mobil alt sekme: 'goals' | 'assists'
        let statsToursOpen = new Set();     // turnuva rozetleri AÇIK olan sütunlar: 'kulup|25/26' (varsayılan: hepsi kapalı)
        function statsToggleSeasonTours(ctx, season) {
            const k = ctx + '|' + season;
            if (statsToursOpen.has(k)) statsToursOpen.delete(k); else statsToursOpen.add(k);
            renderStatsPanel();
        }
        let statSortM = {
            kulup: { goals: { field: 'overall_goals', asc: false }, assists: { field: 'overall_assists', asc: false } },
            milli: { goals: { field: 'overall_goals', asc: false }, assists: { field: 'overall_assists', asc: false } }
        };
        function sortStatsM(context, metric, field) {
            const so = statSortM[context][metric];
            if (so.field === field) so.asc = !so.asc;
            else { so.field = field; so.asc = (field === 'name' || field === 'pos' || field === 'countryCode'); }
            renderStatsPanel();
        }
        function statsSetContext(id) { statsActiveTab = id; renderStatsPanel(); }
        function statsSetMetricTab(m) { statsMetricTab = m; renderStatsPanel(); }

        // ===================== GOL-ASİST v7: ısı haritalı kariyer tablosu (podyum + sezon sezon yoğunluk) =====================
        function renderStatCareerHTML(P, metric) {
            statsV2EnsureCss();
            const context = P.ctx;
            const isG = metric !== 'assists';
            const players = (isG ? P.goals : P.assists).slice();
            const seasonsData = P.d.seasonsData;
            const sortInfo = statSortM[context][isG ? 'goals' : 'assists'];
            const acc = isG ? '#fbbf24' : '#60a5fa';
            const totKey = isG ? 'overallGoals' : 'overallAssists';
            const sKey = isG ? 'totalGoals' : 'totalAssists';
            const tKey = isG ? 'goals' : 'assists';
            const mName = isG ? 'goals' : 'assists';

            // Gerçek sıralama (toplama göre) -> rozet ve podyum için
            const byTotal = players.slice().sort((a, b) => (b[totKey] - a[totKey]) || String(a.name).localeCompare(String(b.name), 'tr'));
            const rankOf = {};
            byTotal.forEach((p, i) => { rankOf[p.name] = i + 1; });

            // Tablo sıralaması (kullanıcının seçtiği)
            players.sort((a, b) => {
                let valA = 0, valB = 0;
                const f = sortInfo.field;
                if (f === 'name' || f === 'pos' || f === 'countryCode') {
                    valA = (a[f] || '').toString().toLowerCase();
                    valB = (b[f] || '').toString().toLowerCase();
                } else if (f === 'overall_goals') { valA = a.overallGoals; valB = b.overallGoals; }
                else if (f === 'overall_assists') { valA = a.overallAssists; valB = b.overallAssists; }
                else if (f.startsWith('s_')) {
                    const parts = f.split('_'); const s = parts[1]; const type = parts[2];
                    valA = a.seasons[s] ? a.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                    valB = b.seasons[s] ? b.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                } else if (f.startsWith('t_')) {
                    const parts = f.split('_'); const s = parts[1]; const t = parts[2]; const type = parts[3];
                    valA = a.seasons[s] && a.seasons[s].tournaments[t] ? a.seasons[s].tournaments[t][type] : 0;
                    valB = b.seasons[s] && b.seasons[s].tournaments[t] ? b.seasons[s].tournaments[t][type] : 0;
                }
                if (valA < valB) return sortInfo.asc ? -1 : 1;
                if (valA > valB) return sortInfo.asc ? 1 : -1;
                return 0;
            });

            // Isı haritası için en büyük değer
            let maxS = 0;
            players.forEach(p => seasonsList.forEach(s => {
                const ps = p.seasons[s]; if (!ps) return;
                if (ps[sKey] > maxS) maxS = ps[sKey];
            }));
            const heat = (v, max) => v
                ? `<span class="stv2-heat" style="background:color-mix(in srgb, ${acc} ${Math.round(10 + 38 * (v / (max || 1)))}%, transparent);color:#f8fafc;text-shadow:0 1px 2px rgba(0,0,0,.55);box-shadow:inset 0 0 0 1px color-mix(in srgb, ${acc} ${Math.round(25 + 40 * (v / (max || 1)))}%, transparent);">${v}</span>`
                : '<span class="text-slate-700">-</span>';

            // Turnuva rozetleri: renk sabit (turnuva sırası), dizilim artan toplam (en çok olan en sağda)
            const palette = ['#38bdf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c', '#2dd4bf', '#f87171'];
            const allTours = [];
            seasonsList.forEach(se => (seasonsData[se] || []).forEach(t => { if (!allTours.includes(t)) allTours.push(t); }));
            const tColor = {}, tTot = {};
            allTours.forEach((t, i) => { tColor[t] = palette[i % palette.length]; tTot[t] = 0; });
            players.forEach(p => seasonsList.forEach(se => { const ps = p.seasons[se]; if (!ps) return; allTours.forEach(t => { const pt = ps.tournaments[t]; if (pt) tTot[t] += pt[tKey]; }); }));
            const orderTours = allTours.filter(t => tTot[t] > 0).sort((a, b) => (tTot[a] - tTot[b]) || (allTours.indexOf(b) - allTours.indexOf(a)));
            const unitTxt = isG ? 'gol' : 'asist';
            // Sütun genişliği: açıksa rozet sayısına göre genişler (rozetlerin sayının üstüne binmesini engeller)
            const seasonTours = {};   // o sezonda değeri olan turnuvalar (sıralı) -> her turnuvaya sabit yuva
            seasonsList.forEach(se => { seasonTours[se] = orderTours.filter(t => players.some(p => { const ps = p.seasons[se]; return ps && ps.tournaments[t] && ps.tournaments[t][tKey] > 0; })); });
            const colStyle = {};
            seasonsList.forEach(se => {
                const n = statsToursOpen.has(context + '|' + se) ? seasonTours[se].length : 0;
                const w = (5.8 + n * 1.0).toFixed(1) + 'em';
                colStyle[se] = `width:${w};min-width:${w};`;
            });
            const tcHtml = (season, getV) => {
                if (!statsToursOpen.has(context + '|' + season)) return '';
                const items = (seasonTours[season] || []).map(t => [t, getV(t)]);
                if (!items.length) return '';
                return `<span class="stv2-tc">${items.map(([t, v]) => v > 0
                    ? `<span class="stv2-tchip" style="color:${tColor[t]};background:color-mix(in srgb, ${tColor[t]} 16%, transparent)" title="${escapeHtml((t || '-') + ' — ' + v + ' ' + unitTxt)}">${v}</span>`
                    : `<span class="stv2-tchip stv2-tce">0</span>`).join('')}</span>`;
            };

            // --- Podyum (ilk 3) ---
            const medal = ['#fbbf24', '#cbd5e1', '#d97706'];
            const top = byTotal.slice(0, 3);
            const podium = top.length ? `<div class="grid gap-2 p-3 pb-2 shrink-0" style="grid-template-columns:repeat(${top.length},minmax(0,1fr));align-items:end">${top.map((p, i) => {
                const m = medal[i];
                const ph = p.photoUrl
                    ? `<img src="${p.photoUrl}" class="pd-ph rounded-lg object-cover shrink-0" alt="">`
                    : `<div class="flex pd-ph rounded-lg bg-slate-700 items-center justify-center font-bold text-slate-300 shrink-0">${escapeHtml(p.name.charAt(0))}</div>`;
                return `<div class="flex items-center gap-1.5 sm:gap-2.5 min-w-0 px-2 sm:px-3 pd-box rounded-xl cursor-pointer hover:brightness-125 transition" style="--k:${[1.5, 1.25, 1][i] || 1};background:linear-gradient(120deg, color-mix(in srgb, ${m} 14%, transparent), transparent 85%);border:1px solid color-mix(in srgb, ${m} 38%, transparent)" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="${escapeHtml(p.name)}">
                    ${ph}
                    <div class="min-w-0"><div class="text-[10px] font-black" style="color:${m}">#${i + 1}</div><div class="hidden sm:block font-bold text-sm truncate text-white">${escapeHtml(homeSurname(p.name))}</div></div>
                    <span class="ml-auto font-black text-lg sm:text-2xl leading-none" style="color:${m}">${p[totKey]}</span>
                </div>`;
            }).join('')}</div>` : '';

            // --- Başlık ---
            const sortBtn = (field, inner, cls) => {
                const on = sortInfo.field === field;
                return `<button onclick="sortStatsM('${context}', '${mName}', '${field}')" class="group/th inline-flex items-center justify-center gap-1 font-black tracking-wider transition-colors hover:text-white ${on ? '' : 'text-slate-400'} ${cls || ''}" ${on ? `style="color:${acc}"` : ''}>${inner}${on ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.7em]"></i>` : ''}</button>`;
            };
            const seg = (field, icon, ttl) => {
                const on = sortInfo.field === field;
                return `<button onclick="sortStatsM('${context}', '${mName}', '${field}')" title="${ttl}" class="flex items-center justify-center gap-1 px-2.5 py-1 rounded-md transition-colors ${on ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'}"><i class="fa-solid ${icon}"></i>${on ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.65em]"></i>` : ''}</button>`;
            };
            const topSticky = 'position:sticky;top:0;z-index:30;';
            let head = `<tr><th class="stv2-id stv2-idshadow bg-slate-950" style="position:sticky;left:0;top:0;z-index:40;">
                <div class="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-900 border border-slate-700/60 text-[0.85em]">
                    ${seg('pos', 'fa-street-view', 'Mevkiye Göre Sırala')}
                    ${seg('name', 'fa-font', 'İsme Göre Sırala')}
                </div>
 
                </th>`;
            let totalCols = 1;
            seasonsList.forEach(season => {
                totalCols += 1;
                head += `<th class="stv2-sep bg-slate-900" style="${topSticky}${colStyle[season]}"><div class="stv2-hfit stv2-hrow">${sortBtn('s_' + season + '_' + mName, escapeHtml(season), '')}<button onclick="statsToggleSeasonTours('${context}', '${season}')" title="Turnuva Dağılımını Göster / Gizle" class="stv2-tgl ${statsToursOpen.has(context + '|' + season) ? 'on' : ''}"><i class="fa-solid fa-layer-group"></i></button></div></th>`;
            });
            totalCols += 1;
            head += `<th class="stv2-sep bg-slate-900" style="${topSticky}"><div class="stv2-hfit">${sortBtn('overall_' + mName, '<span class="uppercase">Toplam</span>', '')}</div></th></tr>`;

            // --- Gövde ---
            const sums = { total: 0, seasons: {} };
            let rowsHTML = '';
            if (players.length === 0) {
                rowsHTML = `<tr><td colspan="${totalCols}" class="p-8 text-slate-500" style="text-align:center;padding:2em;">Resmi bir gol veya asist verisi bulunmuyor.</td></tr>`;
            } else players.forEach(p => {
                sums.total += p[totKey];
                const rank = rankOf[p.name];
                const rankCls = rank === 1 ? 'stats-rank-1' : rank === 2 ? 'stats-rank-2' : rank === 3 ? 'stats-rank-3' : '';
                const photoHtml = p.photoUrl
                    ? `<img src="${p.photoUrl}" class="hidden sm:block w-[1.75em] h-[1.75em] rounded-full object-cover shrink-0">`
                    : `<div class="hidden sm:flex w-[1.75em] h-[1.75em] rounded-full items-center justify-center bg-slate-700 text-[0.7em] font-bold shrink-0">${escapeHtml(p.name.charAt(0))}</div>`;
                const posHtml = p.pos === 'UNK' ? '<span class="stats-pos-pill text-slate-600">-</span>' : `<span class="stats-pos-pill pos-${escapeHtml(p.pos)}">${escapeHtml(p.pos)}</span>`;
                const parts = String(p.name).trim().split(/\s+/);
                const fullName = parts.length > 1
                    ? `<span class="font-medium text-slate-300">${escapeHtml(parts.slice(0, -1).join(' '))}</span> <span class="font-bold text-white">${escapeHtml(parts[parts.length - 1])}</span>`
                    : `<span class="font-bold text-white">${escapeHtml(p.name)}</span>`;
                // Mobilde "A. Mehmet" kısa biçimi, sm ve üstünde tam ad
                const nameHtml = `<span class="hidden sm:inline">${fullName}</span><span class="sm:hidden font-bold text-white">${escapeHtml(homeShortName(p.name))}</span>`;

                rowsHTML += `<tr class="group"><td class="stv2-id stv2-idshadow bg-slate-900 group-hover:bg-slate-800 transition-colors" style="position:sticky;left:0;z-index:20;">
                    <div class="flex items-center gap-[0.6em]">
                        <span class="stats-rank-badge ${rankCls}">${rank}</span>
                        ${posHtml}${photoHtml}
                        <span class="text-[0.92em] cursor-pointer hover:text-emerald-400 transition-colors" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="Profili Görüntüle">${nameHtml}</span>
                    </div></td>`;
                seasonsList.forEach(season => {
                    if (!sums.seasons[season]) sums.seasons[season] = { v: 0, tours: {} };
                    const ps = p.seasons[season] || { totalGoals: 0, totalAssists: 0, tournaments: {} };
                    sums.seasons[season].v += ps[sKey];
                    allTours.forEach(t => { const v = ps.tournaments[t] ? ps.tournaments[t][tKey] : 0; sums.seasons[season].tours[t] = (sums.seasons[season].tours[t] || 0) + v; });
                    rowsHTML += `<td class="stv2-sep stv2-mw" style="${colStyle[season]}"><div class="stv2-cell">${tcHtml(season, t => ps.tournaments[t] ? ps.tournaments[t][tKey] : 0)}${heat(ps[sKey], maxS)}</div></td>`;
                });
                rowsHTML += `<td class="stv2-sep stv2-mw"><span class="stv2-total" style="color:${acc}">${p[totKey]}</span></td></tr>`;
            });

            // --- Takım toplamı ---
            const fz = 'position:sticky;bottom:0;z-index:25;';
            let foot = `<tr class="font-black"><td class="stv2-id stv2-idshadow bg-slate-950 text-slate-400 uppercase tracking-wider text-[0.75em]" style="position:sticky;left:0;bottom:0;z-index:35;text-align:left;"><i class="fa-solid fa-trophy text-yellow-500 mr-1"></i><span>Takım Toplamı</span></td>`;
            seasonsList.forEach(season => {
                const sm = sums.seasons[season] || { v: 0, tours: {} };
                foot += `<td class="stv2-sep stv2-mw bg-slate-900 text-slate-300 text-[1.05em]" style="${fz}${colStyle[season]}"><div class="stv2-cell">${tcHtml(season, t => sm.tours[t] || 0)}<span>${sm.v}</span></div></td>`;
            });
            foot += `<td class="stv2-sep stv2-mw bg-slate-950 text-[1.3em]" style="${fz}color:${acc}">${sums.total}</td></tr>`;

            return `
                <div class="flex-1 bg-slate-900 border border-slate-700 xl:rounded-xl rounded-xl flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] min-h-0">
                    ${podium}
                    <div class="flex-1 overflow-auto table-scroll relative min-h-0">
                        <table class="stv2 w-full min-w-max">
                            <thead>${head}</thead>
                            <tbody>${rowsHTML}</tbody>
                            <tfoot>${foot}</tfoot>
                        </table>
                    </div>
                </div>`;
        }

        function renderStatCareerHTMLv1(P, metric) {
            statsV2EnsureCss();
            const context = P.ctx;
            const isKulup = context === 'kulup';
            const isG = metric !== 'assists';
            const players = (isG ? P.goals : P.assists).slice();
            const seasonsData = P.d.seasonsData;
            const sortInfo = statSortM[context][isG ? 'goals' : 'assists'];
            const acc = isG ? '#fbbf24' : '#60a5fa';
            const totKey = isG ? 'overallGoals' : 'overallAssists';
            const sKey = isG ? 'totalGoals' : 'totalAssists';
            const tKey = isG ? 'goals' : 'assists';
            const mName = isG ? 'goals' : 'assists';
            if (!statExpanded[context]) statExpanded[context] = {};

            // Gerçek sıralama (toplama göre) -> rozet ve podyum için
            const byTotal = players.slice().sort((a, b) => (b[totKey] - a[totKey]) || String(a.name).localeCompare(String(b.name), 'tr'));
            const rankOf = {};
            byTotal.forEach((p, i) => { rankOf[p.name] = i + 1; });

            // Tablo sıralaması (kullanıcının seçtiği)
            players.sort((a, b) => {
                let valA = 0, valB = 0;
                const f = sortInfo.field;
                if (f === 'name' || f === 'pos' || f === 'countryCode') {
                    valA = (a[f] || '').toString().toLowerCase();
                    valB = (b[f] || '').toString().toLowerCase();
                } else if (f === 'overall_goals') { valA = a.overallGoals; valB = b.overallGoals; }
                else if (f === 'overall_assists') { valA = a.overallAssists; valB = b.overallAssists; }
                else if (f.startsWith('s_')) {
                    const parts = f.split('_'); const s = parts[1]; const type = parts[2];
                    valA = a.seasons[s] ? a.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                    valB = b.seasons[s] ? b.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                } else if (f.startsWith('t_')) {
                    const parts = f.split('_'); const s = parts[1]; const t = parts[2]; const type = parts[3];
                    valA = a.seasons[s] && a.seasons[s].tournaments[t] ? a.seasons[s].tournaments[t][type] : 0;
                    valB = b.seasons[s] && b.seasons[s].tournaments[t] ? b.seasons[s].tournaments[t][type] : 0;
                }
                if (valA < valB) return sortInfo.asc ? -1 : 1;
                if (valA > valB) return sortInfo.asc ? 1 : -1;
                return 0;
            });

            // Isı haritası için en büyük değerler
            let maxS = 0, maxT = 0;
            players.forEach(p => seasonsList.forEach(s => {
                const ps = p.seasons[s]; if (!ps) return;
                if (ps[sKey] > maxS) maxS = ps[sKey];
                (seasonsData[s] || []).forEach(t => { const pt = ps.tournaments[t]; if (pt && pt[tKey] > maxT) maxT = pt[tKey]; });
            }));
            const heat = (v, max, small) => v
                ? `<span class="stv2-heat${small ? ' stv2-heat-s' : ''}" style="background:color-mix(in srgb, ${acc} ${Math.round(10 + 38 * (v / (max || 1)))}%, transparent);color:#f8fafc;text-shadow:0 1px 2px rgba(0,0,0,.55);box-shadow:inset 0 0 0 1px color-mix(in srgb, ${acc} ${Math.round(25 + 40 * (v / (max || 1)))}%, transparent);">${v}</span>`
                : '<span class="text-slate-700">-</span>';

            // --- Podyum (ilk 3) ---
            const medal = ['#fbbf24', '#cbd5e1', '#d97706'];
            const top = byTotal.slice(0, 3);
            const podium = top.length ? `<div class="grid gap-2 p-3 pb-2 shrink-0" style="grid-template-columns:repeat(${top.length},minmax(0,1fr));align-items:end">${top.map((p, i) => {
                const m = medal[i];
                const ph = p.photoUrl
                    ? `<img src="${p.photoUrl}" class="pd-ph rounded-lg object-cover shrink-0" alt="">`
                    : `<div class="flex pd-ph rounded-lg bg-slate-700 items-center justify-center font-bold text-slate-300 shrink-0">${escapeHtml(p.name.charAt(0))}</div>`;
                return `<div class="flex items-center gap-1.5 sm:gap-2.5 min-w-0 px-2 sm:px-3 pd-box rounded-xl cursor-pointer hover:brightness-125 transition" style="--k:${[1.5, 1.25, 1][i] || 1};background:linear-gradient(120deg, color-mix(in srgb, ${m} 14%, transparent), transparent 85%);border:1px solid color-mix(in srgb, ${m} 38%, transparent)" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="${escapeHtml(p.name)}">
                    ${ph}
                    <div class="min-w-0"><div class="text-[10px] font-black" style="color:${m}">#${i + 1}</div><div class="hidden sm:block font-bold text-sm truncate text-white">${escapeHtml(homeSurname(p.name))}</div></div>
                    <span class="ml-auto font-black text-lg sm:text-2xl leading-none" style="color:${m}">${p[totKey]}</span>
                </div>`;
            }).join('')}</div>` : '';

            // --- Başlık ---
            const sortBtn = (field, inner, cls) => {
                const on = sortInfo.field === field;
                return `<button onclick="sortStatsM('${context}', '${mName}', '${field}')" class="group/th inline-flex items-center justify-center gap-1 font-black tracking-wider transition-colors hover:text-white ${on ? '' : 'text-slate-400'} ${cls || ''}" ${on ? `style="color:${acc}"` : ''}>${inner}${on ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.7em]"></i>` : ''}</button>`;
            };
            const seg = (field, icon, ttl) => {
                const on = sortInfo.field === field;
                return `<button onclick="sortStatsM('${context}', '${mName}', '${field}')" title="${ttl}" class="flex items-center justify-center gap-1 px-2.5 py-1 rounded-md transition-colors ${on ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'}"><i class="fa-solid ${icon}"></i>${on ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.65em]"></i>` : ''}</button>`;
            };
            const topSticky = 'position:sticky;top:0;z-index:30;';
            let head = `<tr><th class="stv2-id stv2-idshadow bg-slate-950" style="position:sticky;left:0;top:0;z-index:40;">
                <div class="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-900 border border-slate-700/60 text-[0.85em]">
                    ${seg('pos', 'fa-street-view', 'Mevkiye Göre Sırala')}
                    ${seg('name', 'fa-font', 'İsme Göre Sırala')}
                    ${isKulup ? seg('countryCode', 'fa-globe', 'Ülkeye Göre Sırala') : ''}
                </div></th>`;
            let totalCols = 1;
            seasonsList.forEach(season => {
                const isExp = statExpanded[context][season];
                const tours = seasonsData[season] || [];
                totalCols += 1 + (isExp ? tours.length : 0);
                head += `<th class="stv2-sep bg-slate-900" style="${topSticky}">
                    <div class="inline-flex items-stretch rounded-full overflow-hidden bg-slate-950/70 border border-slate-700/60 text-[0.85em]">
                        ${sortBtn('s_' + season + '_' + mName, escapeHtml(season), 'px-3 py-1')}
                        <button onclick="toggleStatsExpand('${context}', '${season}')" class="px-2 flex items-center border-l border-slate-700/60 text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors" title="${isExp ? 'Daralt' : 'Turnuva Detayları'}"><i class="fa-solid ${isExp ? 'fa-angle-left' : 'fa-angle-right'} text-[0.8em]"></i></button>
                    </div></th>`;
                if (isExp) tours.forEach((t, i) => {
                    const tLogo = getCompetitionLogo(t);
                    const lab = tLogo
                        ? `<img src="${tLogo}" alt="${escapeHtml(t)}" class="w-[1.3em] h-[1.3em] object-contain">`
                        : `<span class="max-w-[5em] truncate text-slate-300">${escapeHtml(t)}</span>`;
                    head += `<th class="bg-slate-900" style="${topSticky}" title="${escapeHtml(t)}">${sortBtn('t_' + season + '_' + t + '_' + mName, lab, 'text-[0.8em]')}</th>`;
                });
            });
            totalCols += 1;
            head += `<th class="stv2-sep bg-slate-900" style="${topSticky}">${sortBtn('overall_' + mName, '<i class="fa-solid fa-chart-line opacity-70"></i><span class="uppercase tracking-[0.12em]">Toplam</span>', 'text-[0.8em]')}</th></tr>`;

            // --- Gövde ---
            const sums = { total: 0, seasons: {} };
            let rowsHTML = '';
            if (players.length === 0) {
                rowsHTML = `<tr><td colspan="${totalCols}" class="p-8 text-slate-500" style="text-align:center;padding:2em;">Resmi bir gol veya asist verisi bulunmuyor.</td></tr>`;
            } else players.forEach(p => {
                sums.total += p[totKey];
                const rank = rankOf[p.name];
                const rankCls = rank === 1 ? 'stats-rank-1' : rank === 2 ? 'stats-rank-2' : rank === 3 ? 'stats-rank-3' : '';
                const photoHtml = p.photoUrl
                    ? `<img src="${p.photoUrl}" class="hidden sm:block w-[1.75em] h-[1.75em] rounded-full object-cover shrink-0">`
                    : `<div class="hidden sm:flex w-[1.75em] h-[1.75em] rounded-full items-center justify-center bg-slate-700 text-[0.7em] font-bold shrink-0">${escapeHtml(p.name.charAt(0))}</div>`;
                const posHtml = p.pos === 'UNK' ? '<span class="stats-pos-pill text-slate-600">-</span>' : `<span class="stats-pos-pill pos-${escapeHtml(p.pos)}">${escapeHtml(p.pos)}</span>`;
                const flagInner = p.countryCode ? `<img src="https://flagcdn.com/24x18/${escapeHtml(p.countryCode.toLowerCase())}.png" class="h-[1em] w-auto rounded-[2px] shadow-sm" alt="">` : '<span class="text-slate-600">-</span>';
                const flagHtml = isKulup ? `<span class="hidden sm:flex pl-[0.8em] ml-auto items-center shrink-0">${flagInner}</span>` : '';
                const parts = String(p.name).trim().split(/\s+/);
                const fullName = parts.length > 1
                    ? `<span class="font-medium text-slate-300">${escapeHtml(parts.slice(0, -1).join(' '))}</span> <span class="font-bold text-white">${escapeHtml(parts[parts.length - 1])}</span>`
                    : `<span class="font-bold text-white">${escapeHtml(p.name)}</span>`;
                // Mobilde "A. Mehmet" kısa biçimi, sm ve üstünde tam ad
                const nameHtml = `<span class="hidden sm:inline">${fullName}</span><span class="sm:hidden font-bold text-white">${escapeHtml(homeShortName(p.name))}</span>`;

                rowsHTML += `<tr class="group"><td class="stv2-id stv2-idshadow bg-slate-900 group-hover:bg-slate-800 transition-colors" style="position:sticky;left:0;z-index:20;">
                    <div class="flex items-center gap-[0.6em]">
                        <span class="stats-rank-badge ${rankCls}">${rank}</span>
                        ${posHtml}${photoHtml}
                        <span class="text-[0.92em] cursor-pointer hover:text-emerald-400 transition-colors" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="Profili Görüntüle">${nameHtml}</span>
                        ${flagHtml}
                    </div></td>`;
                seasonsList.forEach(season => {
                    if (!sums.seasons[season]) sums.seasons[season] = { v: 0, tours: {} };
                    const ps = p.seasons[season] || { totalGoals: 0, totalAssists: 0, tournaments: {} };
                    sums.seasons[season].v += ps[sKey];
                    rowsHTML += `<td class="stv2-sep">${heat(ps[sKey], maxS)}</td>`;
                    if (statExpanded[context][season]) (seasonsData[season] || []).forEach(t => {
                        const v = ps.tournaments[t] ? ps.tournaments[t][tKey] : 0;
                        sums.seasons[season].tours[t] = (sums.seasons[season].tours[t] || 0) + v;
                        rowsHTML += `<td>${heat(v, maxT, true)}</td>`;
                    });
                });
                rowsHTML += `<td class="stv2-sep stv2-mw"><span class="stv2-total" style="color:${acc}">${p[totKey]}</span></td></tr>`;
            });

            // --- Takım toplamı ---
            const fz = 'position:sticky;bottom:0;z-index:25;';
            let foot = `<tr class="font-black"><td class="stv2-id stv2-idshadow bg-slate-950 text-slate-400 uppercase tracking-wider text-[0.75em]" style="position:sticky;left:0;bottom:0;z-index:35;text-align:left;"><i class="fa-solid fa-trophy text-yellow-500 mr-1"></i><span>Takım Toplamı</span></td>`;
            seasonsList.forEach(season => {
                const sm = sums.seasons[season] || { v: 0, tours: {} };
                foot += `<td class="stv2-sep stv2-mw bg-slate-900 text-slate-300 text-[1.05em]" style="${fz}${colStyle[season]}">${sm.v}</td>`;
                if (statExpanded[context][season]) (seasonsData[season] || []).forEach(t => { foot += `<td class="bg-slate-900 text-slate-400" style="${fz}">${sm.tours[t] || 0}</td>`; });
            });
            foot += `<td class="stv2-sep stv2-mw bg-slate-950 text-[1.3em]" style="${fz}color:${acc}">${sums.total}</td></tr>`;

            return `
                <div class="flex-1 bg-slate-900 border border-slate-700 xl:rounded-xl rounded-xl flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] min-h-0">
                    ${podium}
                    <div class="flex-1 overflow-auto table-scroll relative min-h-0">
                        <table class="stv2 w-full min-w-max">
                            <thead>${head}</thead>
                            <tbody>${rowsHTML}</tbody>
                            <tfoot>${foot}</tfoot>
                        </table>
                    </div>
                </div>`;
        }

        function renderStatTableHTML(context, title, players, seasonsData, sortInfo, metric) {
            statsV2EnsureCss();
            const isKulup = context === 'kulup';
            const metricNow = metric || 'all';   // 'goals' | 'assists' | 'all'
            const showG = metricNow !== 'assists', showA = metricNow !== 'goals';
            const per = (showG ? 1 : 0) + (showA ? 1 : 0);
            const aSep = showG ? '' : 'stv2-sep ';   // yalnız asist gösteriliyorsa grup çizgisi A'da başlar
            if (!statExpanded[context]) statExpanded[context] = {};

            // --- Sıralama ---
            players.sort((a, b) => {
                let valA = 0, valB = 0;
                const f = sortInfo.field;
                if (f === 'name' || f === 'pos' || f === 'countryCode') {
                    valA = (a[f] || '').toString().toLowerCase();
                    valB = (b[f] || '').toString().toLowerCase();
                } else if (f === 'overall_goals') {
                    valA = a.overallGoals; valB = b.overallGoals;
                } else if (f === 'overall_assists') {
                    valA = a.overallAssists; valB = b.overallAssists;
                } else if (f.startsWith('s_')) {
                    const parts = f.split('_'); const s = parts[1]; const type = parts[2];
                    valA = a.seasons[s] ? a.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                    valB = b.seasons[s] ? b.seasons[s][type === 'goals' ? 'totalGoals' : 'totalAssists'] : 0;
                } else if (f.startsWith('t_')) {
                    const parts = f.split('_'); const s = parts[1]; const t = parts[2]; const type = parts[3];
                    valA = a.seasons[s] && a.seasons[s].tournaments[t] ? a.seasons[s].tournaments[t][type] : 0;
                    valB = b.seasons[s] && b.seasons[s].tournaments[t] ? b.seasons[s].tournaments[t][type] : 0;
                }
                if (valA < valB) return sortInfo.asc ? -1 : 1;
                if (valA > valB) return sortInfo.asc ? 1 : -1;
                return 0;
            });

            // Yalnızca aktif sütunda ok göster (kalabalığı azaltır); pasifte hover'da belirir, yer ayrılı
            const arrow = (field) => sortInfo.field === field
                ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.7em] ml-1"></i>`
                : '<i class="fa-solid fa-arrow-down text-[0.7em] ml-1 opacity-0 group-hover/th:opacity-30 transition-opacity"></i>';
            const hBtn = (field, label, colorCls, extra) =>
                `<button onclick="sortStatsM('${context}', '${metricNow}', '${field}')" class="group/th inline-flex items-center justify-center font-black tracking-wider ${colorCls} hover:text-white transition-colors ${extra || ''}">${arrow(field)}</button>`;
            const seg = (field, icon, ttl) => {
                const on = sortInfo.field === field;
                return `<button onclick="sortStatsM('${context}', '${metricNow}', '${field}')" title="${ttl}" class="flex items-center justify-center gap-1 px-2.5 py-1 rounded-md transition-colors ${on ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'}"><i class="fa-solid ${icon}"></i>${on ? `<i class="fa-solid ${sortInfo.asc ? 'fa-arrow-up' : 'fa-arrow-down'} text-[0.65em]"></i>` : ''}</button>`;
            };

            // --- Başlık satırları ---
            const topSticky = 'position:sticky;top:0;z-index:30;height:3em;';
            const row2Sticky = 'position:sticky;top:3em;z-index:30;';
            let th1 = `<tr>
                <th rowspan="2" class="stv2-id stv2-idshadow bg-slate-950" style="position:sticky;left:0;top:0;z-index:40;">
                    <div class="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-900 border border-slate-700/60 text-[0.85em]">
                        ${seg('pos', 'fa-street-view', 'Mevkiye Göre Sırala')}
                        ${seg('name', 'fa-font', 'İsme Göre Sırala')}
                        
                    </div>
                </th>`;
            let th2 = '<tr>';
            let totalCols = 1;

            seasonsList.forEach(season => {
                const isExp = statExpanded[context][season];
                const tours = seasonsData[season] || [];
                const colspan = isExp ? per + (tours.length * per) : per;
                totalCols += colspan;

                th1 += `<th colspan="${colspan}" class="stv2-sep bg-slate-900" style="${topSticky}">
                    <div class="inline-flex items-stretch rounded-full overflow-hidden bg-slate-950/70 border border-slate-700/60 text-[0.85em]">
                        <span class="px-1.5 py-0.5 sm:px-3 sm:py-1 font-black tracking-normal sm:tracking-widest text-[0.8em] sm:text-[1em] text-emerald-300">${season}</span>
                        <button onclick="toggleStatsExpand('${context}', '${season}')" class="px-1 sm:px-2 flex items-center border-l border-slate-700/60 text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors" title="${isExp ? 'Daralt' : 'Turnuva Detayları'}">
                            <i class="fa-solid ${isExp ? 'fa-angle-left' : 'fa-angle-right'} text-[0.8em]"></i>
                        </button>
                    </div>
                </th>`;

                if (showG) th2 += `<th class="stv2-sep bg-slate-900" style="${row2Sticky}">${hBtn('s_' + season + '_goals', 'G', 'text-green-400', 'text-[0.8em]')}</th>`;
                if (showA) th2 += `<th class="${aSep}bg-slate-900" style="${row2Sticky}">${hBtn('s_' + season + '_assists', 'A', 'text-blue-400', 'text-[0.8em]')}</th>`;

                if (isExp) {
                    tours.forEach((t, i) => {
                        const tLogo = getCompetitionLogo(t);
                        const labelHtml = tLogo
                            ? `<img src="${tLogo}" alt="${escapeHtml(t)}" title="${escapeHtml(t)}" class="w-[1.3em] h-[1.3em] object-contain">`
                            : `<span class="font-black text-slate-300 tracking-wide" title="${escapeHtml(t)}">${escapeHtml(String(t).split(/\s+/).filter(Boolean).map(w => Array.from(w)[0]).join('').slice(0, 3).toUpperCase())}</span>`;
                        if (showG) th2 += `<th class="${i === 0 ? 'stv2-sep ' : ''}bg-slate-900" style="${row2Sticky}"><div class="flex flex-col items-center gap-0.5">${labelHtml}${hBtn('t_' + season + '_' + t + '_goals', 'G', 'text-green-400/80', 'text-[0.75em]')}</div></th>`;
                        if (showA) th2 += `<th class="${(i === 0 ? aSep : '')}bg-slate-900" style="${row2Sticky}"><div class="flex flex-col items-center gap-0.5">${labelHtml}${hBtn('t_' + season + '_' + t + '_assists', 'A', 'text-blue-400/80', 'text-[0.75em]')}</div></th>`;
                    });
                }
            });

            totalCols += per;
            th1 += `<th colspan="${per}" class="stv2-sep bg-slate-900" style="${topSticky}">
                    <div class="inline-flex items-center gap-1.5 text-[0.85em] font-black tracking-[0.15em] uppercase text-emerald-400">
                        <i class="fa-solid fa-chart-line opacity-70"></i>
                    </div>
                </th></tr>`;
            if (showG) th2 += `<th class="stv2-sep bg-emerald-950" style="${row2Sticky}">${hBtn('overall_goals', 'G', 'text-green-400', 'text-[0.8em]')}</th>`;
            if (showA) th2 += `<th class="${aSep}bg-emerald-950" style="${row2Sticky}">${hBtn('overall_assists', 'A', 'text-blue-400', 'text-[0.8em]')}</th>`;
            th2 += '</tr>';

            // --- Sütun bazlı en yüksek değerler (parlama için), tek seferde ---
            let maxOverallGoals = 0, maxOverallAssists = 0;
            const maxSeasonGoals = {}, maxSeasonAssists = {}, maxTourGoals = {}, maxTourAssists = {};
            players.forEach(p => {
                if (p.overallGoals > maxOverallGoals) maxOverallGoals = p.overallGoals;
                if (p.overallAssists > maxOverallAssists) maxOverallAssists = p.overallAssists;
                seasonsList.forEach(season => {
                    const ps = p.seasons[season];
                    if (!ps) return;
                    if (!maxSeasonGoals[season] || ps.totalGoals > maxSeasonGoals[season]) maxSeasonGoals[season] = ps.totalGoals;
                    if (!maxSeasonAssists[season] || ps.totalAssists > maxSeasonAssists[season]) maxSeasonAssists[season] = ps.totalAssists;
                    (seasonsData[season] || []).forEach(t => {
                        const pt = ps.tournaments[t];
                        if (!pt) return;
                        if (!maxTourGoals[season]) maxTourGoals[season] = {};
                        if (!maxTourAssists[season]) maxTourAssists[season] = {};
                        if (!maxTourGoals[season][t] || pt.goals > maxTourGoals[season][t]) maxTourGoals[season][t] = pt.goals;
                        if (!maxTourAssists[season][t] || pt.assists > maxTourAssists[season][t]) maxTourAssists[season][t] = pt.assists;
                    });
                });
            });

            // --- Gövde ---
            let rowsHTML = '';
            const sums = { overallGoals: 0, overallAssists: 0, seasons: {} };
            const dash = '<span class="text-slate-700">-</span>';

            if (players.length === 0) {
                rowsHTML = `<tr><td colspan="${totalCols}" class="p-8 text-slate-500" style="text-align:center;padding:2em;">Resmi bir gol veya asist verisi bulunmuyor.</td></tr>`;
            } else {
                players.forEach((p, idx) => {
                    sums.overallGoals += p.overallGoals;
                    sums.overallAssists += p.overallAssists;

                    const photoHtml = p.photoUrl
                        ? `<img src="${p.photoUrl}" class="hidden sm:block w-[1.75em] h-[1.75em] rounded-full object-cover shrink-0">`
                        : `<div class="hidden sm:flex w-[1.75em] h-[1.75em] rounded-full items-center justify-center bg-slate-700 border border-slate-600 text-[0.7em] font-bold shrink-0">${escapeHtml(p.name.charAt(0))}</div>`;
                    const posHtml = p.pos === 'UNK'
                        ? '<span class="stats-pos-pill text-slate-600">-</span>'
                        : `<span class="stats-pos-pill pos-${escapeHtml(p.pos)}">${escapeHtml(p.pos)}</span>`;
                    const flagInner = p.countryCode
                        ? `<img src="https://flagcdn.com/24x18/${escapeHtml(p.countryCode.toLowerCase())}.png" class="h-[1em] w-auto rounded-[2px] shadow-sm" alt="">`
                        : '<span class="text-slate-600">-</span>';
                    const flagHtml = '';
                    const rankCls = idx === 0 ? 'stats-rank-1' : idx === 1 ? 'stats-rank-2' : idx === 2 ? 'stats-rank-3' : '';

                    rowsHTML += `<tr class="group">
                        <td class="stv2-id stv2-idshadow bg-slate-900 group-hover:bg-slate-800 transition-colors" style="position:sticky;left:0;z-index:20;">
                            <div class="flex items-center gap-[0.6em]">
                                <span class="stats-rank-badge ${rankCls}">${idx + 1}</span>
                                ${posHtml}
                                ${photoHtml}
                                <span class="font-bold text-[0.92em] cursor-pointer hover:text-emerald-400 transition-colors" data-pname="${escapeHtml(p.name)}" onclick="openStatsPlayerProfile(this)" title="Profili Görüntüle">${escapeHtml(p.name)}</span>
                                ${flagHtml}
                            </div>
                        </td>`;

                    seasonsList.forEach(season => {
                        if (!sums.seasons[season]) sums.seasons[season] = { goals: 0, assists: 0, tours: {} };
                        const isExp = statExpanded[context][season];
                        const tours = seasonsData[season] || [];
                        const ps = p.seasons[season] || { totalGoals: 0, totalAssists: 0, tournaments: {} };
                        sums.seasons[season].goals += ps.totalGoals;
                        sums.seasons[season].assists += ps.totalAssists;

                        if (showG) rowsHTML += `<td class="stv2-sep bg-green-900/5">${ps.totalGoals ? `<span class="stats-chip stats-chip-goal ${statsChipTier(ps.totalGoals, maxSeasonGoals[season])}">${ps.totalGoals}</span>` : dash}</td>`;
                        if (showA) rowsHTML += `<td class="${aSep}bg-blue-900/5">${ps.totalAssists ? `<span class="stats-chip stats-chip-assist ${statsChipTier(ps.totalAssists, maxSeasonAssists[season])}">${ps.totalAssists}</span>` : dash}</td>`;

                        if (isExp) {
                            tours.forEach((t, i) => {
                                if (!sums.seasons[season].tours[t]) sums.seasons[season].tours[t] = { goals: 0, assists: 0 };
                                const tg = ps.tournaments[t] ? ps.tournaments[t].goals : 0;
                                const ta = ps.tournaments[t] ? ps.tournaments[t].assists : 0;
                                sums.seasons[season].tours[t].goals += tg;
                                sums.seasons[season].tours[t].assists += ta;
                                if (showG) rowsHTML += `<td class="${i === 0 ? 'stv2-sep ' : ''}bg-green-900/5">${tg ? `<span class="stats-chip-goal-tour ${statsChipTier(tg, (maxTourGoals[season] && maxTourGoals[season][t]) || 0)}">${tg}</span>` : dash}</td>`;
                                if (showA) rowsHTML += `<td class="${(i === 0 ? aSep : '')}bg-blue-900/5">${ta ? `<span class="stats-chip-assist-tour ${statsChipTier(ta, (maxTourAssists[season] && maxTourAssists[season][t]) || 0)}">${ta}</span>` : dash}</td>`;
                            });
                        }
                    });

                    if (showG) rowsHTML += `<td class="stv2-sep bg-emerald-900/10"><span class="stats-chip stats-chip-goal-total ${statsChipTier(p.overallGoals, maxOverallGoals)}">${p.overallGoals}</span></td>`;
                    if (showA) rowsHTML += `<td class="${aSep}bg-emerald-900/10"><span class="stats-chip stats-chip-assist-total ${statsChipTier(p.overallAssists, maxOverallAssists)}">${p.overallAssists}</span></td>`;
                    rowsHTML += `</tr>`;
                });
            }

            // --- Alt toplam (her hücre yapışkan) ---
            const fz = 'position:sticky;bottom:0;z-index:25;';
            let footerHTML = `<tr class="font-black">
                <td class="stv2-id stv2-idshadow bg-slate-950 text-emerald-400 uppercase tracking-wider text-[0.8em]" style="position:sticky;left:0;bottom:0;z-index:35;text-align:right;"><i class="fa-solid fa-trophy text-yellow-500 text-[0.9em]"></i></td>`;
            seasonsList.forEach(season => {
                const isExp = statExpanded[context][season];
                const tours = seasonsData[season] || [];
                const sumS = sums.seasons[season] || { goals: 0, assists: 0, tours: {} };
                if (showG) footerHTML += `<td class="stv2-sep bg-slate-900 text-green-500 text-[1.15em]" style="${fz}">${sumS.goals}</td>`;
                if (showA) footerHTML += `<td class="${aSep}bg-slate-900 text-blue-500 text-[1.15em]" style="${fz}">${sumS.assists}</td>`;
                if (isExp) {
                    tours.forEach((t, i) => {
                        const tg = sumS.tours[t] ? sumS.tours[t].goals : 0;
                        const ta = sumS.tours[t] ? sumS.tours[t].assists : 0;
                        if (showG) footerHTML += `<td class="${i === 0 ? 'stv2-sep ' : ''}bg-slate-900 text-green-500/80" style="${fz}">${tg}</td>`;
                        if (showA) footerHTML += `<td class="${(i === 0 ? aSep : '')}bg-slate-900 text-blue-500/80" style="${fz}">${ta}</td>`;
                    });
                }
            });
            if (showG) footerHTML += `<td class="stv2-sep bg-emerald-950 text-green-400 text-[1.25em]" style="${fz}">${sums.overallGoals}</td>`;
            if (showA) footerHTML += `<td class="${aSep}bg-emerald-950 text-blue-400 text-[1.25em]" style="${fz}">${sums.overallAssists}</td>`;
            footerHTML += '</tr>';

            const isAst = metricNow === 'assists';
            const headerBgClass = isAst ? 'bg-blue-900/30 border-blue-800' : 'bg-emerald-900/30 border-emerald-800';
            const headerTextClass = isAst ? 'text-blue-400' : 'text-emerald-400';

            return `
                <div class="flex-1 bg-slate-900 border border-slate-700 xl:rounded-xl rounded-b-xl rounded-tr-xl flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] h-full">
                    <div class="p-3 ${headerBgClass} border-b justify-between items-center shrink-0 hidden xl:flex">
                        <h4 class="font-bold ${headerTextClass} text-base md:text-lg flex items-center gap-2">
                            <i class="fa-solid ${isAst ? 'fa-shoe-prints' : 'fa-futbol'}"></i>
                            ${title}
                        </h4>
                    </div>
                    <div class="flex-1 overflow-auto table-scroll relative">
                        <table class="stv2 w-full min-w-max">
                            <thead>${th1}${th2}</thead>
                            <tbody>${rowsHTML}</tbody>
                            <tfoot>${footerHTML}</tfoot>
                        </table>
                    </div>
                </div>
            `;
        }

        // --- HIZLI FİKSTÜR ŞERİDİ (2. Dikey Bar) ---
function qfbGetAllMatches() {
    let all = [];
    seasonsList.forEach(season => {
        const matches = (fixtureData[season] || []).slice().sort((a, b) => (parseInt(a.matchNo) || 999) - (parseInt(b.matchNo) || 999));
        matches.forEach(m => all.push({ ...m, season }));
    });
    return all;
}

function renderQuickFixtureBar() {
    const container = document.getElementById('qfb-list');
    if (!container) return;

    const teamName = managedTeams.kulup.name || '';
    const nationalTeamName = managedTeams.milli.name || '';
    const isOurTeam = (name) => name === teamName || (nationalTeamName && name === nationalTeamName);

    const allMatches = qfbGetAllMatches();

    if (allMatches.length === 0) {
        container.innerHTML = `<div class="text-center text-slate-600 text-[9px] py-4 px-1">Maç yok</div>`;
        return;
    }

    let lastPlayedIdx = -1;
    container.innerHTML = allMatches.map((m, idx) => {
        const hsDisplay = (m.homeScore !== '' && m.homeScore !== null && m.homeScore !== undefined) ? m.homeScore : '-';
        const asDisplay = (m.awayScore !== '' && m.awayScore !== null && m.awayScore !== undefined) ? m.awayScore : '-';
        const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
        let resultLetter = '';
        if (!isNaN(hs) && !isNaN(as)) {
            lastPlayedIdx = idx;
            const isHome = isOurTeam(m.home), isAway = isOurTeam(m.away);
            if (isHome) resultLetter = hs > as ? 'W' : (hs < as ? 'L' : 'D');
            else if (isAway) resultLetter = as > hs ? 'W' : (as < hs ? 'L' : 'D');
        }
        const scoreBgClass = resultLetter === 'W' ? 'bg-green-800 border-green-700 text-white' :
                              resultLetter === 'D' ? 'bg-yellow-600 border-yellow-500 text-white' :
                              resultLetter === 'L' ? 'bg-red-800 border-red-700 text-white' :
                              'bg-slate-800 border-slate-700 text-slate-400';
        const homeLogo = getTeamLogoByName(m.home);
        const awayLogo = getTeamLogoByName(m.away);

        return `
            <div id="qfb-item-${idx}" class="qfb-item flex flex-row items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 rounded-lg p-1 cursor-pointer border border-slate-800 transition-colors" onclick="qfbOpenMatch('${m.season}','${m.id}')" title="${escapeHtml(m.home)} vs ${escapeHtml(m.away)} (${m.season})">
                <img src="${homeLogo}" class="w-[19px] h-[19px] object-contain shrink-0" alt="">
                <span class="text-[9px] font-black rounded px-1 py-0.5 border ${scoreBgClass} shrink-0 whitespace-nowrap leading-none">${hsDisplay}:${asDisplay}</span>
                <img src="${awayLogo}" class="w-[19px] h-[19px] object-contain shrink-0" alt="">
            </div>
        `;
    }).join('');

    if (!container.dataset.scrollBound) {
        container.addEventListener('scroll', updateQfbFadeMask);
        container.dataset.scrollBound = '1';
    }

    setTimeout(() => {
        const targetIdx = lastPlayedIdx !== -1 ? lastPlayedIdx : allMatches.length - 1;
        const targetEl = document.getElementById(`qfb-item-${targetIdx}`);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'auto', block: 'center' });
        updateQfbFadeMask();
    }, 50);
}

function updateQfbFadeMask() {
    const el = document.getElementById('qfb-list');
    if (!el) return;

    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

    let mask;
    if (atTop && atBottom) {
        mask = 'linear-gradient(to bottom, black 0, black 100%)';
    } else if (atTop) {
        mask = 'linear-gradient(to bottom, black 0, black calc(100% - 60px), transparent 100%)';
    } else if (atBottom) {
        mask = 'linear-gradient(to bottom, transparent 0, black 60px, black 100%)';
    } else {
        mask = 'linear-gradient(to bottom, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)';
    }

    el.style.webkitMaskImage = mask;
    el.style.maskImage = mask;
}

function qfbOpenMatch(season, matchId) {
    // Panel değiştirmeden, kullanıcının o an içinde bulunduğu ekranda kalarak
    // sadece maç sonucu modalını açar. Modal DOM'da global olduğundan
    // hangi panel aktif olursa olsun sorunsuz çalışır.
    openMatchResultModal(season, matchId);
}

function toggleQuickFixtureBar() {
    const bar = document.getElementById('quick-fixture-bar');
    const icon = document.getElementById('qfb-toggle-icon');
    const handle = document.getElementById('qfb-handle');
    
    bar.classList.toggle('qfb-collapsed');
    
    // Mobil için absolute positioning aç/kapa
    if (window.innerWidth < 640) {
        if (bar.classList.contains('-translate-x-full')) {
            bar.classList.remove('-translate-x-full');
            bar.classList.add('translate-x-0');
            if (handle) handle.style.transform = 'translateY(-50%) translateX(87px)';
            if (icon) icon.className = 'fa-solid fa-chevron-left text-[12px]';
        } else {
            bar.classList.add('-translate-x-full');
            bar.classList.remove('translate-x-0');
            if (handle) handle.style.transform = 'translateY(-50%) translateX(0)';
            if (icon) icon.className = 'fa-solid fa-chevron-right text-[12px]';
        }
    } else {
        const collapsed = bar.classList.contains('qfb-collapsed');
        if (icon) icon.className = collapsed ? 'fa-solid fa-chevron-right text-[10px]' : 'fa-solid fa-chevron-left text-[10px]';
        localStorage.setItem('fc26_qfb_collapsed', collapsed ? '1' : '0');
    }
}

function applyQfbCollapsedState() {
    const bar = document.getElementById('quick-fixture-bar');
    const icon = document.getElementById('qfb-toggle-icon');
    const handle = document.getElementById('qfb-handle');
    const shouldBeOpen = localStorage.getItem('fc26_qfb_collapsed') === '0';
    
    if (window.innerWidth < 640) {
         // Mobilde varsayılan olarak kapalı kalsın ve yer kaplamasın
         if(bar) bar.classList.add('qfb-collapsed', '-translate-x-full');
         if(bar) bar.classList.remove('translate-x-0');
         if(handle) handle.style.transform = 'translateX(0)';
         if(icon) icon.className = 'fa-solid fa-chevron-right text-[10px]';
    } else {
         if (bar && !shouldBeOpen) {
             bar.classList.add('qfb-collapsed');
             if(icon) icon.className = 'fa-solid fa-chevron-right text-[10px]';
         } else {
             bar.classList.remove('qfb-collapsed');
             if(icon) icon.className = 'fa-solid fa-chevron-left text-[10px]';
         }
    }
}

        // =====================================================================
        // --- FİKSTÜR PANELİ ---
        // =====================================================================

        let fixtureEventsTemp = [];

        const allTournamentOptions = [
            "Süper Lig", "Türkiye Kupası", "Türkiye Süper Kupası",
            "UEFA Şampiyonlar Ligi", "UEFA Avrupa Ligi", "UEFA Konferans Ligi",
            "UEFA Süper Kupa", "Pre-Season Friendly",
            "Dünya Kupası", "UEFA Avrupa Şampiyonası", "Dostluk Maçı"
        ];

        function getFixtureTournaments() {
            const custom = new Set();
            Object.values(fixtureData).forEach(matches => {
                matches.forEach(m => { if (m.tournament) custom.add(m.tournament); });
            });
            return [...new Set([...allTournamentOptions, ...custom])].sort();
        }

        function getGroundLabel(g) {
            return g === 'home' ? '<span class="text-[10px] text-emerald-400 bg-emerald-900/40 px-1.5 py-0.5 rounded cursor-help" title="İç Saha / Home"><i class="fa-solid fa-house"></i></span>'
                 : g === 'away' ? '<span class="text-[10px] text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded cursor-help" title="Deplasman / Away"><i class="fa-solid fa-plane"></i></span>'
                 : '<span class="text-[10px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded cursor-help" title="Tarafsız Saha / Neutral"><i class="fa-solid fa-location-dot"></i></span>';
        }

        // YENİ: Turnuva isimlerini kısaltmalara çeviren motor (filtre butonlarında yer kazanmak için)
        const TOURNAMENT_ABBR = {
            'Tümü': 'T',
            'Süper Lig': 'SL',
            'Türkiye Kupası': 'TK',
            'Türkiye Süper Kupası': 'TSK',
            'UEFA Şampiyonlar Ligi': 'UCL',
            'UEFA Avrupa Ligi': 'UEL',
            'UEFA Konferans Ligi': 'UCL',
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

                const ROUND_ABBR_MAP = {
            'grup aşaması': 'GA',
            'son 32': 'L32',
            'son 16': 'L16',
            'çeyrek final': 'QF',
            'yarı final': 'SF',
            'final': 'F',
            'üçüncülük': '3rd'
        };

        function getRoundAbbr(round) {
            if (!round) return '';
            const key = round.trim().toLowerCase();
            if (ROUND_ABBR_MAP[key]) return ROUND_ABBR_MAP[key];
            // "14. Hafta" / "14 Hafta" -> "14"
            const weekMatch = round.match(/^(\d+)\s*\.?\s*hafta/i);
            if (weekMatch) return weekMatch[1];
            return round.length > 5 ? round.slice(0, 5) : round;
        }

        function getCompetitionLogo(name) {
            if (!name) return null;
            // 1. Öncelik: Fikstür panelinde özel olarak atanmış logo
            if (competitionLogos && competitionLogos[name]) return competitionLogos[name];
            // 2. Yoksa: Kupalar panelindeki turnuva listesiyle isim eşleşmesi (büyük/küçük harf duyarsız)
            const match = tournamentsList.find(t => t.name.toLowerCase() === name.toLowerCase());
            if (match && match.logoUrl) return match.logoUrl;
            return tourCatalogLogo(name);
        }

let activeCompetitionLogoName = null;

function updateCompetitionLogoPreview() {
    const url = document.getElementById('cl-url-input').value.trim();
    const img = document.getElementById('cl-preview-img');
    const placeholder = document.getElementById('cl-preview-placeholder');
    if (url && url !== "Yerel Dosya Seçildi") {
        img.src = url;
        img.classList.remove('hidden');
        placeholder.classList.add('hidden');
    } else {
        img.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }
}

let activeTopStatInfo = { tourId: null, type: null };

function openTopStatModal(tourId, type) {
    activeTopStatInfo = { tourId, type };
    const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
    if (!tour) return;
    const isScorer = type === 'scorer';

    document.getElementById('tst-title').innerText = isScorer ? 'Gol Kralı' : 'Asist Kralı';
    document.getElementById('tst-subtitle').innerText = tour.type;
    document.getElementById('tst-score-label').innerText = isScorer ? 'Gol Sayısı' : 'Asist Sayısı';
    document.getElementById('tst-name-input').value = isScorer ? (tour.topScorerName || '') : (tour.topAssistName || '');
    document.getElementById('tst-photo-url-input').value = isScorer ? (tour.topScorerPhoto || '') : (tour.topAssistPhoto || '');
    document.getElementById('tst-score-input').value = isScorer ? (tour.topScorerGoals || '') : (tour.topAssistAssists || '');

    fileUploads['tst-photo'] = null;
    document.getElementById('tst-photo-file-input').value = '';
    document.getElementById('tst-photo-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
    document.getElementById('tst-photo-results').innerHTML = '';
    document.getElementById('tst-photo-results').classList.add('hidden');

    const modal = document.getElementById('top-stat-modal');
    modal.classList.remove('hidden'); modal.classList.add('flex');
}

function closeTopStatModal() {
    document.getElementById('top-stat-modal').classList.add('hidden');
    document.getElementById('top-stat-modal').classList.remove('flex');
}

function clearTopStatModal() {
    document.getElementById('tst-name-input').value = '';
    document.getElementById('tst-photo-url-input').value = '';
    document.getElementById('tst-score-input').value = '';
    fileUploads['tst-photo'] = null;
    saveTopStatModal();
}

function saveTopStatModal() {
    const { tourId, type } = activeTopStatInfo;
    const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
    if (!tour) return;

    const name = document.getElementById('tst-name-input').value.trim();
    const urlVal = document.getElementById('tst-photo-url-input').value.trim();
    const photo = fileUploads['tst-photo'] || (urlVal !== "Yerel Dosya Yüklendi (Sıkıştırıldı)" ? urlVal : '');
    const score = document.getElementById('tst-score-input').value.trim();

    if (type === 'scorer') {
        tour.topScorerName = name;
        tour.topScorerPhoto = photo;
        tour.topScorerGoals = score;
    } else {
        tour.topAssistName = name;
        tour.topAssistPhoto = photo;
        tour.topAssistAssists = score;
    }

    saveToLocalStorage();
    closeTopStatModal();
    renderFixturePanel();
}

async function tstSearchPlayerPhotos() {
    const nameInput = document.getElementById('tst-name-input').value.trim();
    const resultsContainer = document.getElementById('tst-photo-results');
    if (!nameInput) { alert('Lütfen arama yapmak için oyuncunun adını girin!'); return; }

    resultsContainer.innerHTML = '<div class="text-xs text-slate-400 w-full text-center"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Facecard Taranıyor...</div>';
    resultsContainer.classList.remove('hidden');

    let results = [];

    try {
        const sdbUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nameInput)}`;
        let sdbRes = await fetch(sdbUrl);
        let sdbData = await sdbRes.json();
        if (sdbData && sdbData.player) {
            sdbData.player.forEach(p => {
                if (p.strCutout) results.push(p.strCutout);
                if (p.strThumb) results.push(p.strThumb);
                if (p.strRender) results.push(p.strRender);
            });
        }
    } catch (e) { console.warn("TheSportsDB oyuncu motoru hata verdi:", e); }

    try {
        const wikiUrl = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nameInput)}`;
        let wikiRes = await fetch(wikiUrl);
        if (wikiRes.ok) {
            let wikiData = await wikiRes.json();
            if (wikiData.thumbnail && wikiData.thumbnail.source) {
                results.push(wikiData.thumbnail.source.replace(/\/\d+px-/, '/300px-'));
            }
        }
    } catch (e) { console.warn("Wikipedia motoru hata verdi:", e); }

    results = [...new Set(results)].slice(0, 15);

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="text-xs text-yellow-500 w-full text-center">Sonuç bulunamadı. İsmi kontrol edip tekrar deneyin veya URL/Dosya ile manuel ekleyin.</div>';
        return;
    }

    resultsContainer.innerHTML = results.map(url => `
        <div class="flex-shrink-0 relative group">
            <img src="${url}" class="w-12 h-14 object-contain bg-slate-200/90 p-1 rounded cursor-pointer hover:scale-110 border-2 border-transparent tst-photo-search-img" onclick="tstSelectSearchedPlayerPhoto('${url}', this)" title="Seç">
        </div>
    `).join('');
}

function tstSelectSearchedPlayerPhoto(url, imgElement) {
    document.querySelectorAll('.tst-photo-search-img').forEach(el => el.classList.remove('border-emerald-500', 'bg-emerald-100'));
    imgElement.classList.add('border-emerald-500', 'bg-emerald-100');
    document.getElementById('tst-photo-url-input').value = url;
    fileUploads['tst-photo'] = null;
    document.getElementById('tst-photo-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
}

function openCompetitionLogoModal(tournamentName) {
    if (!tournamentName) return;
    activeCompetitionLogoName = tournamentName;
    document.getElementById('cl-modal-subtitle').innerText = tournamentName;
    document.getElementById('cl-name-input').value = tournamentName;

    document.getElementById('cl-url-input').value = getCompetitionLogo(tournamentName) || '';

    fileUploads.cl = null;
    document.getElementById('cl-file-input').value = '';
    document.getElementById('cl-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
    document.getElementById('cl-logo-results').innerHTML = '';
    document.getElementById('cl-logo-results').classList.add('hidden');

    updateCompetitionLogoPreview();

    const modal = document.getElementById('competition-logo-modal');
    modal.classList.remove('hidden'); modal.classList.add('flex');
}

function closeCompetitionLogoModal() {
    document.getElementById('competition-logo-modal').classList.add('hidden');
    document.getElementById('competition-logo-modal').classList.remove('flex');
}

function saveCompetitionLogo() {
    if (!activeCompetitionLogoName) return;
    const url = document.getElementById('cl-url-input').value.trim();
    const finalLogo = fileUploads.cl || (url !== "Yerel Dosya Seçildi" ? url : null);

    if (!finalLogo) { alert('Lütfen bir logo URL girin, dosya yükleyin veya arama sonuçlarından seçin!'); return; }

    competitionLogos[activeCompetitionLogoName] = finalLogo;
    saveToLocalStorage();
    closeCompetitionLogoModal();
    renderFixturePanel();
}

function clearCompetitionLogo() {
    if (!activeCompetitionLogoName) return;
    delete competitionLogos[activeCompetitionLogoName];
    saveToLocalStorage();
    closeCompetitionLogoModal();
    renderFixturePanel();
}

// --- YENİ: Turnuva adı girildiğinde veritabanından logoyu otomatik çekme (İnput Alanları İçin) ---
function autoFillTournamentLogo(nameInput, urlInputId) {
    if (!nameInput || !nameInput.value || typeof FC26_TOURNAMENT_DATABASE === 'undefined') return;
    
    const typedName = nameInput.value.trim().toLowerCase();
    const urlInput = document.getElementById(urlInputId);
    if (!urlInput) return;

    const match = FC26_TOURNAMENT_DATABASE.find(t => typeof t === 'object' && t.name && t.name.toLowerCase() === typedName);
    
    if (match && match.logo) {
        urlInput.value = match.logo;
        
        // Dosya yükleme durumunu ve butonunu sıfırla ki çakışma yapmasın
        const typePrefix = urlInputId.replace('-url-input', '').replace('-url', '');
        if (typeof fileUploads !== 'undefined' && fileUploads[typePrefix] !== undefined) {
            fileUploads[typePrefix] = null;
            const uploadBtn = document.getElementById(`${typePrefix}-upload-btn`);
            if (uploadBtn) uploadBtn.classList.replace('text-emerald-400', 'text-slate-300');
        }
    }
}

// --- YENİ: Takım adı girildiğinde veritabanından logoyu otomatik çekme (İnput Alanları İçin) ---
function autoFillTeamLogo(nameInput, urlInputId) {
    if (!nameInput || !nameInput.value || typeof FC26_TEAM_DATABASE === 'undefined') return;
    
    const typedName = nameInput.value.trim().toLowerCase();
    const urlInput = document.getElementById(urlInputId);
    if (!urlInput) return;

    const match = FC26_TEAM_DATABASE.find(t => typeof t === 'object' && t.name && t.name.toLowerCase() === typedName);
    
    if (match && match.logo) {
        urlInput.value = match.logo;
        
        // Dosya yükleme durumunu ve butonunu sıfırla ki çakışma yapmasın
        const typePrefix = urlInputId.replace('-url-input', '').replace('-url', '');
        if (typeof fileUploads !== 'undefined' && fileUploads[typePrefix] !== undefined) {
            fileUploads[typePrefix] = null;
            const uploadBtn = document.getElementById(`${typePrefix}-upload-btn`);
            if (uploadBtn) uploadBtn.classList.replace('text-emerald-400', 'text-slate-300');
        }
    }
}

// Takım isminden logosunu bulan yardımcı motor
        // --- FC26 lisanssız takım adları → gerçek ad + gerçek logo ---
        // Bir yerde "Lombardia FC" yazılsa bile sitede "Inter" ve logosu görünür.
        // "Gerçek Ad (as "Takma Ad")" biçimindeki veritabanı kayıtlarından otomatik öğrenilir.
        // Ek eşleşme gerekirse TEAM_ALIAS_EXTRA'ya  'Takma Ad': 'Gerçek Ad'  satırı ekle.
        const TEAM_ALIASES = {};
        const TEAM_ALIAS_EXTRA = { 'Lombardia FC': 'Inter', 'Lombardia': 'Inter', 'Milano FC': 'Milan', 'Milano': 'Milan', 'Bergamo Calcio': 'Atalanta', 'Bergamo': 'Atalanta', 'Latium': 'Lazio' };
        // Veritabanında logosu olmayan takımlar için (gerçek logo adresi)
        const TEAM_LOGO_OVERRIDES = { 'Atalanta': 'https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg' };
        function teamNorm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim(); }
        function teamCanon(name) { if (!name) return name; return TEAM_ALIASES[teamNorm(name)] || name; }
        function teamAliasInit() {
            if (typeof FC26_TEAM_DATABASE === 'undefined' || FC26_TEAM_DATABASE.__aliased) return;
            Object.keys(TEAM_ALIAS_EXTRA).forEach(a => { TEAM_ALIASES[teamNorm(a)] = TEAM_ALIAS_EXTRA[a]; });
            const db = FC26_TEAM_DATABASE, cleaned = new Set();
            const nm = t => typeof t === 'string' ? t : (t && t.name);
            db.forEach((t, i) => {
                const raw = nm(t), m = raw && String(raw).match(/^(.*?)\s*\(as\s*"?([^")]*)/);
                if (!m) return;
                const base = m[1].trim();
                TEAM_ALIASES[teamNorm(m[2])] = base;
                cleaned.add(teamNorm(base));
                if (typeof t === 'string') db[i] = base; else t.name = base;
            });
            Object.keys(TEAM_LOGO_OVERRIDES).forEach(n => {
                const i = db.findIndex(t => nm(t) === n);
                if (i >= 0 && typeof db[i] === 'string') db[i] = { name: n, logo: TEAM_LOGO_OVERRIDES[n] };
                else if (i < 0) db.push({ name: n, logo: TEAM_LOGO_OVERRIDES[n] });
            });
            // Temizlenen adlardan yinelenenleri ele (logolu olan kalsın)
            const best = new Map();
            db.forEach((t, i) => {
                const n = nm(t); if (!n) return;
                const k = teamNorm(n); if (!cleaned.has(k) && !TEAM_LOGO_OVERRIDES[n]) return;
                const has = !!(t && typeof t === 'object' && t.logo), cur = best.get(k);
                if (!cur || (has && !cur.has)) best.set(k, { i: i, has: has });
            });
            for (let i = db.length - 1; i >= 0; i--) {
                const n = nm(db[i]); if (!n) continue;
                const b = best.get(teamNorm(n)); if (b && b.i !== i) db.splice(i, 1);
            }
            db.__aliased = true;
        }
        function teamAliasDom(root) {
            if (!root || !document.body) return;
            const base = root.nodeType === 3 ? root.parentNode : root;
            if (!base || base.nodeType !== 1) return;
            const w = document.createTreeWalker(base, NodeFilter.SHOW_TEXT), list = [];
            let n; while ((n = w.nextNode())) list.push(n);
            const ae = document.activeElement;
            list.forEach(tn => {
                const v = tn.nodeValue; if (!v || v.length > 40) return;
                const t = v.trim(); if (!t) return;
                const c = TEAM_ALIASES[teamNorm(t)];
                if (!c || c === t) return;
                const p = tn.parentNode; if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return;
                if (ae && ae.isContentEditable && ae.contains(tn)) return; // yazarken bozma
                tn.nodeValue = v.replace(t, c);
            });
        }
        teamAliasInit();
        document.addEventListener('DOMContentLoaded', () => {
            teamAliasInit();
            teamAliasDom(document.body);
            new MutationObserver(ms => ms.forEach(m => {
                if (m.type === 'characterData') teamAliasDom(m.target);
                else m.addedNodes.forEach(x => teamAliasDom(x));
            })).observe(document.body, { childList: true, subtree: true, characterData: true });
        });
        // --- Tüm takım logolarının arkasına çok hafif dairesel ışıma (sınıf: tm-lg) ---
        function tmLogoSet() {
            const s = new Set(), add = u => { if (u && typeof u === 'string') s.add(u); };
            try { (FC26_TEAM_DATABASE || []).forEach(t => t && t.logo && add(t.logo)); } catch (e) {}
            try {
                ['kulup', 'milli'].forEach(c => {
                    add(managedTeams[c] && managedTeams[c].logoUrl);
                    const o = opponentsConfig[c]; if (!o) return;
                    ((o.domestic && o.domestic.teams) || []).forEach(t => add(t.logoUrl));
                    (o.foreign || []).forEach(g => (g.teams || []).forEach(t => add(t.logoUrl)));
                });
            } catch (e) {}
            try { Object.keys(trophyData).forEach(se => Object.keys(trophyData[se] || {}).forEach(id => { const c = trophyData[se][id]; if (c) { add(c.champion && c.champion.logoUrl); add(c.runnerUp && c.runnerUp.logoUrl); } })); } catch (e) {}
            try { Object.keys(customTournamentsData).forEach(se => (customTournamentsData[se] || []).forEach(t => { (t.groups || []).forEach(g => (g.teams || []).forEach(x => add(x.logo))); (t.knockouts || []).forEach(k => { add(k.homeLogo); add(k.awayLogo); }); })); } catch (e) {}
            return s;
        }
        function tmMarkLogos(root, set) {
            const base = root && (root.nodeType === 1 ? root : root.parentNode);
            if (!base || !base.querySelectorAll) return;
            const imgs = base.tagName === 'IMG' ? [base] : base.querySelectorAll('img:not(.tm-lg)');
            imgs.forEach(im => {
                const s = im.getAttribute('src') || ''; if (!s) return;
                if (set.has(s) || /football-logos\.cc\/logos\/(?!tournaments\/)/.test(s)) im.classList.add('tm-lg');
            });
        }
        document.addEventListener('DOMContentLoaded', () => {
            tmMarkLogos(document.body, tmLogoSet());
            new MutationObserver(ms => {
                const set = tmLogoSet();
                ms.forEach(m => { if (m.type === 'attributes') tmMarkLogos(m.target, set); else m.addedNodes.forEach(x => tmMarkLogos(x, set)); });
            }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
        });
        // Giriş alanlarında takma adı gerçek adla değiştir (kayıt işleyicilerinden ÖNCE çalışır)
        document.addEventListener('change', e => {
            const el = e.target;
            if (el && el.tagName === 'INPUT' && /^(text|search)$/.test(el.type || 'text')) { const c = TEAM_ALIASES[teamNorm(el.value)]; if (c) el.value = c; }
        }, true);
        document.addEventListener('blur', e => {
            const el = e.target;
            if (el && el.isContentEditable && el.innerText) { const c = TEAM_ALIASES[teamNorm(el.innerText)]; if (c && c !== el.innerText.trim()) el.innerText = c; }
        }, true);

        function getTeamLogoByName(name) {
            name = teamCanon(name);
            if (!name || name === '-') return '';
            
            // Önce kendi yönettiğimiz takımlara (Kulüp/Milli) bakalım
            if (managedTeams.kulup && managedTeams.kulup.name === name) return managedTeams.kulup.logoUrl;
            if (managedTeams.milli && managedTeams.milli.name === name) return managedTeams.milli.logoUrl;
            
            // Özel yüklenmiş/girilmiş rakip logolarını kontrol et (ui-avatars.com HARİÇ)
            let customLogo = null;
            ['kulup', 'milli'].forEach(ctx => {
                if (opponentsConfig[ctx]) {
                    if (opponentsConfig[ctx].domestic && opponentsConfig[ctx].domestic.teams) {
                        let t = opponentsConfig[ctx].domestic.teams.find(x => x.name === name);
                        if (t && t.logoUrl && !t.logoUrl.includes('ui-avatars.com')) customLogo = t.logoUrl;
                    }
                    if (!customLogo && opponentsConfig[ctx].foreign) {
                        opponentsConfig[ctx].foreign.forEach(grp => {
                            let t = grp.teams.find(x => x.name === name);
                            if (t && t.logoUrl && !t.logoUrl.includes('ui-avatars.com')) customLogo = t.logoUrl;
                        });
                    }
                }
            });

            if (customLogo) return customLogo;

            // FC26 Veritabanından (team-tournament-data.js) genel kontrol et
            if (typeof FC26_TEAM_DATABASE !== 'undefined') {
                const dbMatch = FC26_TEAM_DATABASE.find(t => typeof t === 'object' && t.name && t.name.toLowerCase() === name.toLowerCase());
                if (dbMatch && dbMatch.logo) return dbMatch.logo;
            }
            
            // Eğer hiçbir yerde yoksa, ismin baş harflerinden otomatik bir logo üret
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
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
// "Victor OSIMHEN" / "V. OSIMHEN" -> "Osimhen" (yalnızca soyadı, baş harfleri büyük)
function homeSurname(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    let last = parts[parts.length - 1];
    if (last.length > 1 && (last === last.toUpperCase() || /\p{Lu}{3,}/u.test(last))) {
        last = last.toLowerCase().replace(/(^|[-'\u2019])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/^(Mc|Mac(?=\p{L}{4}))(\p{L})/u, (m, a, b) => a + b.toUpperCase());
    }
    return last;
}

function formatShortPlayerName(name) {
    if (!name) return '';
    // Yazıldığı büyük/küçük harf korunur ("A. Mehmet", "A. McLoughlin"); tamamı büyük yazılmışsa baş harf büyük, kalanı küçük olur
    const fix = (w) => {
        if (w.length < 3 || !/\p{Lu}{2}/u.test(w.slice(1))) return w; // zaten düzgün yazılmış (McLoughlin, DeBruyne) -> dokunma
        return w.toLowerCase().replace(/\u0307/g, '')
            .replace(/(^|[-'’])(\p{L})/gu, (m, p, c) => p + c.toUpperCase())      // Smith-Rowe, O'Brien
            .replace(/^(Mc)(\p{L})/u, (m, p, c) => p + c.toUpperCase())            // McLoughlin, McConnell
            .replace(/^(Mac)(\p{L})/u, (m, p, c) => /^Mac\p{Lu}/u.test(w) ? p + c.toUpperCase() : m); // MacDonald (yalnızca "MacDONALD" yazıldıysa)
    };
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return fix(parts[0]);
    return `${parts[0].charAt(0).toUpperCase()}. ${fix(parts[parts.length - 1])}`;
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
            if (name.includes('uefa şampiyonlar ligi')) return 'bg-blue-950/50 hover:bg-blue-900/70'; // Koyu mavi
            if (name.includes('uefa avrupa ligi')) return 'bg-orange-900/30 hover:bg-orange-800/50'; // Turuncu
            if (name.includes('uefa konferans ligi')) return 'bg-emerald-900/30 hover:bg-emerald-800/50'; // Yeşil
            if (name.includes('uefa süper kupa')) return 'bg-yellow-700/20 hover:bg-yellow-600/40'; // Altın
            if (name.includes('pre-season friendly')) return 'bg-slate-700/30 hover:bg-slate-600/50'; // Gri
            if (name.includes('dünya kupası')) return 'bg-purple-950/50 hover:bg-purple-900/70'; // Koyu mor
            if (name.includes('avrupa şampiyonası')) return 'bg-purple-800/40 hover:bg-purple-700/60'; // Açık mor
            if (name.includes('dostluk maçı')) return 'bg-fuchsia-900/30 hover:bg-fuchsia-800/50'; // Lila
            
            return 'hover:bg-slate-800/80'; // Listede olmayan turnuvalar için varsayılan arka plan
        }

                // Turnuva ismine göre KART arka plan rengini belirleyen fonksiyon
        function getCustomTournamentCardBg(tournamentType) {
            if (!tournamentType) return 'bg-slate-950 border-slate-700';
            const name = tournamentType.toLowerCase();

            if (name.includes('şampiyonlar ligi'))        return 'bg-blue-950/40 border-blue-900/60';      // Mavi
            if (name.includes('avrupa ligi'))             return 'bg-orange-950/40 border-orange-900/60';  // Turuncu
            if (name.includes('konferans ligi'))          return 'bg-emerald-950/40 border-emerald-900/60';// Yeşil
            if (name.includes('süper lig'))               return 'bg-red-950/50 border-red-900/70';       // Koyu kırmızı
            if (name.includes('türkiye kupası'))          return 'bg-red-900/30 border-red-800/60';       // Kırmızı
            if (name.includes('sezon öncesi hazırlık'))   return 'bg-slate-800/40 border-slate-700/60';   // Gri
            if (name.includes('dünya kupası'))            return 'bg-yellow-900/30 border-yellow-700/60'; // Altın
            if (name.includes('avrupa şampiyonası'))      return 'bg-purple-950/50 border-purple-900/70'; // Koyu mor

            return 'bg-slate-950 border-slate-700'; // Varsayılan
        }

        // --- MÜSABAKA & AVRUPA LİGLERİ DÜZENLEME MOTORU ---

        // Tüm panelde (render + toplu ekleme) tek kaynaktan kullanılan lig listesi
        const EURO_LEAGUES_LIST = [
            { name: 'Premier League', flag: 'gb-eng' },
            { name: 'Süper Lig', flag: 'tr' },
            { name: 'Serie A', flag: 'it' },
            { name: 'La Liga', flag: 'es' },
            { name: 'Bundesliga', flag: 'de' },
            { name: 'Ligue 1', flag: 'fr' },
            { name: 'Liga Portugal', flag: 'pt' },
            { name: 'Eredivisie', flag: 'nl' },
            { name: 'Belgian 1A Pro League', flag: 'be' },
            { name: 'Scottish Premiership', flag: 'gb-sct' },
            { name: 'Norwegian Eliteserien', flag: 'no' },
            { name: 'Swedish Allsvenskan', flag: 'se' }
        ];

        // --- Takım adı alanları: veritabanından otomatik tamamlama (tüm takım adı girişlerinde) ---
        let euAcEl = null, euAcActive = null, euAcIdx = -1, euAcMatches = [];
        const EU_AC_SEL = '[data-euro-team], [data-team-ac]';
        function euAcNorm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
        function euAcIsField(el) { return !!(el && el.matches && el.matches(EU_AC_SEL)); }
        function euAcGet(el) { return el.isContentEditable ? el.innerText : el.value; }
        function euAcClose() { if (euAcEl) euAcEl.style.display = 'none'; euAcMatches = []; euAcIdx = -1; }
        function euAcHighlight() {
            if (!euAcEl) return;
            euAcEl.querySelectorAll('.eu-ac-item').forEach((el, i) => el.classList.toggle('bg-emerald-600', i === euAcIdx));
        }
        function euAcPick(i) {
            const t = euAcMatches[i], el = euAcActive;
            if (!t || !el) return;
            if (el.isContentEditable) {
                el.innerText = t.name;
                euAcClose();
                el.blur(); // onblur → kaydeder
            } else {
                el.value = t.name;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
                euAcClose();
            }
        }
        function euAcShow(el) {
            if (typeof FC26_TEAM_DATABASE === 'undefined') return;
            const q = euAcNorm(euAcGet(el));
            let _lt = null;
            if (!q || q === 'takim adi' || q === 'team name') {
                _lt = (el.dataset && el.dataset.euLg) ? euLeagueTeams(el.dataset.euLg) : [];
                if (!_lt.length) { euAcClose(); return; }
            }
            const starts = [], inc = [];
            FC26_TEAM_DATABASE.forEach(t => {
                if (!t || typeof t !== 'object' || !t.name) return;
                const n = euAcNorm(t.name);
                if (n.startsWith(q)) starts.push(t); else if (n.includes(q)) inc.push(t);
            });
            euAcMatches = _lt ? _lt : starts.concat(inc).slice(0, 8);
            if (!euAcMatches.length) { euAcClose(); return; }
            if (!euAcEl) {
                euAcEl = document.createElement('div');
                euAcEl.id = 'euro-team-ac';
                euAcEl.className = 'bg-slate-900 border border-slate-600 rounded-lg shadow-2xl overflow-y-auto text-xs';
                euAcEl.style.cssText = 'position:fixed;z-index:99999;max-height:220px;display:none;';
                euAcEl.addEventListener('mousedown', e => {
                    e.preventDefault();
                    const it = e.target.closest('.eu-ac-item');
                    if (it) euAcPick(parseInt(it.dataset.i, 10));
                });
                document.body.appendChild(euAcEl);
            }
            euAcActive = el;
            euAcIdx = 0;
            euAcEl.innerHTML = euAcMatches.map((t, i) => `<div class="eu-ac-item flex items-center gap-2 px-2.5 py-1.5 cursor-pointer text-slate-200 hover:bg-emerald-600/70" data-i="${i}">${t.logo ? `<img src="${t.logo}" alt="" class="w-4 h-4 object-contain shrink-0" onerror="this.style.visibility='hidden'">` : '<span class="w-4 shrink-0"></span>'}<span class="truncate font-bold">${escapeHtml(t.name)}</span></div>`).join('');
            const r = el.getBoundingClientRect();
            euAcEl.style.left = r.left + 'px';
            euAcEl.style.top = (r.bottom + 2) + 'px';
            euAcEl.style.minWidth = Math.max(r.width, 180) + 'px';
            euAcEl.style.display = 'block';
            euAcHighlight();
        }
        // Takım adı veri listesi bağlı (datalist) tüm girişleri otomatik olarak bu arama kutusuna çevir
        document.addEventListener('focusin', e => {
            const el = e.target;
            if (el && el.matches && el.matches('input[list="global-team-datalist"]')) {
                el.setAttribute('data-team-ac', '1');
                el.removeAttribute('list');
                el.setAttribute('autocomplete', 'off');
            }
        });
        // --- Diğer Ligler: boş takım yerine tıklayınca o ligin takımlarını öner ---
        const EURO_TOP_FLIGHT = {
            'Premier League': ['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Burnley','Chelsea','Crystal Palace','Everton','Fulham','Leeds United','Liverpool','Manchester City','Manchester United','Newcastle United','Nottingham Forest','Sunderland','Tottenham','West Ham','Wolverhampton'],
            'Serie A': ['Bologna','Cagliari','Como','Cremonese','Fiorentina','Genoa','Inter','Juventus','Lazio','Lecce','Milan','Napoli','Parma','Pisa','Roma','Sassuolo','Torino','Udinese'],
            'La Liga': ['Alavés','Athletic Bilbao','Atlético Madrid','FC Barcelona','Celta Vigo','Elche','Espanyol','Getafe','Girona','Levante','Mallorca','Osasuna','Rayo Vallecano','Real Betis','Real Madrid','Real Oviedo','Real Sociedad','Sevilla','Valencia','Villarreal'],
            'Bundesliga': ['Bayern Munich','Borussia Dortmund','RB Leipzig','VfB Stuttgart','Eintracht Frankfurt','Bayer Leverkusen','Borussia Mönchengladbach','VfL Wolfsburg','SC Freiburg','Union Berlin','FC St. Pauli','Werder Bremen','1899 Hoffenheim','FC Augsburg','Mainz 05','1. FC Heidenheim','1. FC Köln','Hamburger SV'],
            'Ligue 1': ['Paris Saint-Germain','Olympique de Marseille','AS Monaco','OGC Nice','LOSC Lille','Olympique Lyonnais','Stade Rennais FC','RC Strasbourg Alsace','Racing Club de Lens','Stade Brestois 29','Toulouse FC','Nantes','Angers SCO','Le Havre','Auxerre','FC Lorient','FC Metz','Paris FC']
        };
        const EURO_LEAGUE_COUNTRY = {
            'Süper Lig':'turkey','Liga Portugal':'portugal','Eredivisie':'netherlands','Belgian 1A Pro League':'belgium','Scottish Premiership':'scotland',
            'Norwegian Eliteserien':'norway','Swedish Allsvenskan':'sweden','Allsvenskan':'sweden','EFL Championship':'england','EFL League One':'england','EFL League Two':'england',
            'MLS':'usa','Liga MX':'mexico','Ligue 2':'france','Serie B':'italy','La Liga 2':'spain','2. Bundesliga':'germany','Ekstraklasa':'poland',
            'Danish Superliga':'denmark','A-League':'australia','Liga Profesional':'argentina'
        };
        function euLeagueTeams(lg) {
            if (typeof FC26_TEAM_DATABASE === 'undefined') return [];
            const db = FC26_TEAM_DATABASE.filter(t => t && typeof t === 'object' && t.name && t.logo && !/national-team/.test(t.logo));
            const canon = (typeof tourCanon === 'function') ? tourCanon(lg) : lg;
            let pool = [];
            if (EURO_TOP_FLIGHT[canon]) {
                const set = new Set(EURO_TOP_FLIGHT[canon].map(euAcNorm));
                pool = db.filter(t => set.has(euAcNorm(t.name)));
            } else if (EURO_LEAGUE_COUNTRY[canon]) {
                pool = db.filter(t => t.logo.includes('/logos/' + EURO_LEAGUE_COUNTRY[canon] + '/'));
            }
            const seen = new Set();
            return pool.filter(t => { const k = euAcNorm(t.name); if (seen.has(k)) return false; seen.add(k); return true; })
                       .sort((a, b) => a.name.localeCompare(b.name));
        }
        document.addEventListener('focusin', e => {
            const el = e.target;
            if (!euAcIsField(el) || !el.dataset.euLg || !el.isContentEditable) return;
            const q = euAcNorm(el.innerText);
            if (q && q !== 'takim adi' && q !== 'team name') return;
            const r = document.createRange(); r.selectNodeContents(el);
            const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
            euAcShow(el);
        });
        document.addEventListener('input', e => { if (euAcIsField(e.target)) euAcShow(e.target); });
        document.addEventListener('focusout', e => { if (euAcIsField(e.target)) euAcClose(); });
        document.addEventListener('keydown', e => {
            const el = e.target;
            if (!euAcIsField(el)) return;
            const open = euAcEl && euAcEl.style.display === 'block' && euAcMatches.length;
            if (e.key === 'ArrowDown' && open) { e.preventDefault(); euAcIdx = (euAcIdx + 1) % euAcMatches.length; euAcHighlight(); }
            else if (e.key === 'ArrowUp' && open) { e.preventDefault(); euAcIdx = (euAcIdx - 1 + euAcMatches.length) % euAcMatches.length; euAcHighlight(); }
            else if (e.key === 'Enter') {
                if (open) { e.preventDefault(); euAcPick(euAcIdx); }
                else if (el.isContentEditable) { e.preventDefault(); el.blur(); }
            }
            else if (e.key === 'Escape') { euAcClose(); }
        });
        window.addEventListener('scroll', e => { if (euAcEl && e.target && euAcEl.contains && euAcEl.contains(e.target)) return; euAcClose(); }, true);
        // Diğer Ligler: Tab / Shift+Tab ile aynı türdeki alanlar arasında (puan→puan, takım→takım) gez
        document.addEventListener('keydown', e => {
            if (e.key !== 'Tab') return;
            const el = e.target;
            if (!el || !el.matches) return;
            const sel = el.matches('[data-euro-team]') ? '[data-euro-team]' : (el.matches('[data-euro-pts]') ? '[data-euro-pts]' : null);
            if (!sel) return;
            const panel = el.closest('.fx-panel') || document;
            const all = [...panel.querySelectorAll(sel)].filter(x => x.offsetParent !== null);
            const idx = all.indexOf(el);
            const next = all[idx + (e.shiftKey ? -1 : 1)];
            if (!next) return;
            e.preventDefault();
            euAcClose();
            el.blur();
            next.focus();
            const r = document.createRange(); r.selectNodeContents(next);
            const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        });
        window.addEventListener('resize', () => euAcClose());

        function updateEuroLeague(season, league, index, field, element) {
            if (!euroLeaguesData[season]) euroLeaguesData[season] = {};
            if (!euroLeaguesData[season][league]) euroLeaguesData[season][league] = [{},{},{},{}];
            euroLeaguesData[season][league][index][field] = element.innerText.trim();
            if (field === 'name') { // satırdaki takım logosunu anında güncelle
                const slot = element.parentElement && element.parentElement.querySelector('.eu-tlogo');
                if (slot) {
                    const url = typeof getTeamLogoByName === 'function' ? getTeamLogoByName(element.innerText.trim()) : '';
                    slot.innerHTML = url ? `<img src="${url}" alt="" class="w-4 h-4 object-contain" onerror="this.style.visibility='hidden'">` : '';
                }
            }
            euroSyncTrophies(season, league);
            saveToLocalStorage(); // Sayfayı yenilemeden sessizce kaydeder (Kullanıcının imleç odağı bozulmaz)
        }

        // --- DİĞER LİGLER: seçilebilir lig kartları + Kupalar bağlantısı ---
        function euroSlots(season) {
            const s = euroSlotsData[season];
            return (Array.isArray(s) && s.length) ? s : EURO_LEAGUES_LIST.map(l => l.name);
        }
        function euroEnsureSlot(season, name) {
            const cur = euroSlots(season).slice();
            if (!cur.includes(name)) { cur.push(name); euroSlotsData[season] = cur; }
        }
        function euroLeagueInfo(name) {
            const f = EURO_LEAGUES_LIST.find(l => l.name === name);
            return { name: name, flag: f ? f.flag : '' };
        }
        function euroFlagHtml(league) {
            if (league.flag) return `<img src="https://flagcdn.com/24x18/${league.flag}.png" class="w-4 h-3 rounded-sm drop-shadow shrink-0">`;
            const u = tourLogoOf(league.name);
            return u ? `<img src="${escapeHtml(u)}" alt="" class="w-4 h-4 object-contain shrink-0">` : '';
        }
        function euroLeagueOptions(selected) {
            const list = tourAll().filter(e => e.g === 'Ulusal Ligler');
            let html = list.map(e => `<option value="${escapeHtml(e.n)}"${e.n === selected ? ' selected' : ''}>${escapeHtml(e.n)}</option>`).join('');
            if (!list.some(e => e.n === selected)) html = `<option value="${escapeHtml(selected)}" selected>${escapeHtml(selected)}</option>` + html;
            return html;
        }
        function setEuroSlot(season, idx, name) {
            const cur = euroSlots(season).slice();
            cur[idx] = name;
            euroSlotsData[season] = cur;
            euroSyncTrophies(season, name);
            saveToLocalStorage();
            renderFixturePanel();
        }
        // Ligin 1. ve 2. sırasındaki takımı Kupalar sekmesindeki ilgili turnuva kutusuna yazar
        function euroSyncTrophies(season, league) {
            const d = euroLeaguesData[season] && euroLeaguesData[season][league];
            if (!d) return;
            const valid = n => (n && String(n).trim() && n !== 'Takım Adı' && n !== 'Team Name') ? String(n).trim() : '';
            const names = { champion: valid(d[0] && d[0].name), runnerUp: valid(d[1] && d[1].name) };
            const canon = tourCanon(league);
            let t = tournamentsList.find(x => tourCanon(x.name) === canon);
            if (!t) {
                if (!names.champion && !names.runnerUp) return;
                const ce = tourFind(league);
                t = { id: 'lg_' + Date.now(), name: canon, logoUrl: tourLogoOf(league) || '', colorHex: ce ? ce.c : '#475569' };
                tournamentsList.push(t);
            }
            if (!trophyData[season]) trophyData[season] = {};
            const cell = trophyData[season][t.id] || { champion: null, runnerUp: null };
            ['champion', 'runnerUp'].forEach(role => {
                const n = names[role], cur = cell[role];
                if (n) {
                    if (!cur || cur.name !== n) {
                        const lg = (typeof getTeamLogoByName === 'function' ? getTeamLogoByName(n) : '') || `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=random&color=fff&bold=true&size=300`;
                        cell[role] = { name: n, logoUrl: lg, auto: true };
                    }
                } else if (cur && cur.auto) {
                    cell[role] = null;
                }
            });
            if (cell.champion || cell.runnerUp) trophyData[season][t.id] = cell;
            else delete trophyData[season][t.id];
        }

        // --- AVRUPA LİGLERİ TOPLU EKLEME ---
        function openEuroLeaguesBulkModal() {
            document.getElementById('el-bulk-subtitle').innerText = activeFixtureSeason + ' Sezonu';
            document.getElementById('el-bulk-input').value = '';
            const modal = document.getElementById('euro-leagues-bulk-modal');
            modal.classList.remove('hidden'); modal.classList.add('flex');
        }

        function closeEuroLeaguesBulkModal() {
            const modal = document.getElementById('euro-leagues-bulk-modal');
            modal.classList.add('hidden'); modal.classList.remove('flex');
        }

        function processEuroLeaguesBulkInput() {
            const text = document.getElementById('el-bulk-input').value;
            if (!text.trim()) { alert('Lütfen eklenecek verileri girin!'); return; }

            if (!euroLeaguesData[activeFixtureSeason]) euroLeaguesData[activeFixtureSeason] = {};
            const seasonData = euroLeaguesData[activeFixtureSeason];

            const lines = text.split('\n');
            let addedCount = 0;
            const unmatchedLeagues = new Set();
            const touchedLeagues = new Set(); // Bu içe aktarmada dokunulan ligleri sıfırdan başlatmak için

            lines.forEach(line => {
                if (!line.trim()) return;
                const parts = line.split(',').map(s => s.trim());
                if (parts.length < 2) return;

                const rawLeague = parts[0];
                const teamName = parts[1];
                const pts = parts[2] || '';
                if (!teamName) return;

                const _el = tourFind(rawLeague);
                const matchedLeague = (_el && _el.g === 'Ulusal Ligler') ? { name: _el.n } : EURO_LEAGUES_LIST.find(l => l.name.toLowerCase() === rawLeague.toLowerCase());
                if (matchedLeague) euroEnsureSlot(activeFixtureSeason, matchedLeague.name);
                if (!matchedLeague) { unmatchedLeagues.add(rawLeague); return; }

                if (!touchedLeagues.has(matchedLeague.name)) {
                    seasonData[matchedLeague.name] = [{}, {}, {}, {}];
                    touchedLeagues.add(matchedLeague.name);
                }

                const slot = seasonData[matchedLeague.name].findIndex(s => !s.name);
                if (slot === -1) return; // Bu lig için zaten 4 takım girilmiş, fazlasını yoksay

                seasonData[matchedLeague.name][slot] = { name: teamName, pts: pts || '0 P' };
                addedCount++;
            });

            if (addedCount > 0) {
                saveToLocalStorage();
                closeEuroLeaguesBulkModal();
                renderFixturePanel();
                touchedLeagues.forEach(n => euroSyncTrophies(activeFixtureSeason, n));
                saveToLocalStorage();
                let msg = `${addedCount} takım başarıyla eklendi!`;
                if (unmatchedLeagues.size > 0) msg += `\n\nEşleşmeyen lig adları (kontrol edin):\n${[...unmatchedLeagues].join(', ')}`;
                alert(msg);
            } else {
                alert('Geçerli formatta veri bulunamadı. Lütfen "Lig Adı, Takım Adı, Puan" formatına uyduğunuzdan emin olun.\n\nGeçerli lig adları:\n' + EURO_LEAGUES_LIST.map(l => l.name).join(', '));
            }
        }

        const KNOCKOUT_DEFAULT_TYPES = ['UEFA Şampiyonlar Ligi', 'UEFA Avrupa Ligi', 'UEFA Konferans Ligi', 'Dünya Kupası', 'UEFA Avrupa Şampiyonası', 'Türkiye Kupası'];

        // + butonu: turnuva seçiciyi butonun altında açar; seçilen turnuva doğrudan eklenir
        function openTourAddPicker(btn) {
            const sel = document.getElementById('custom-tour-select');
            if (!sel) return;
            sel.selectedIndex = -1;
            sel.dataset.autoAdd = '1';
            tourOpenPicker(sel, btn);
        }

        function addCustomTournament() {
            let type = document.getElementById('custom-tour-select').value;
            let isCustom = false;
            
            if (type === 'CUSTOM') {
                type = prompt('Turnuva adını girin (Örn: Hazırlık Kupası, Copa America):');
                if (!type || type.trim() === '') return;
                const _known = !!tourFind(type.trim());
                type = tourRegister(type.trim());
                isCustom = !_known;
            }
            
            if(!customTournamentsData[activeFixtureSeason]) customTournamentsData[activeFixtureSeason] = [];
            
            customTournamentsData[activeFixtureSeason].push({
                id: 'ct_' + Date.now(),
                type: type,
                tableEnabled: true,
                knockoutEnabled: isCustom ? true : KNOCKOUT_DEFAULT_TYPES.includes(type),
                table: [
                    { rank: '1', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' },
                    { rank: '2', name: 'Takım Adı', pld: '0', gd: '0', pts: '0' }
                ],
                knockouts: [] // Sabit alanlar yerine dinamik diziye geçildi
            });
            saveToLocalStorage();
            renderFixturePanel();
        }

        function updateCustomTournamentName(id, element) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === id);
            if (tour) {
                if (element.value === '__NEW__') {
                    const n = tourNewCustom();
                    if (n) tour.type = n;
                } else if (element.value) {
                    tour.type = element.value;
                }
                saveToLocalStorage();
                // Rengin (arka planın) güncellenmesi için tabloyu yeniden çizelim
                renderFixturePanel();
            }
        }

        function deleteCustomTournament(tourId) {
    const msg = currentLang === 'en' 
        ? "Are you sure you want to delete this entire tournament card?" 
        : "Bu turnuva kartını tamamen silmek istediğinize emin misiniz?";
        
    if (confirm(msg)) {
        if (customTournamentsData[activeFixtureSeason]) {
            customTournamentsData[activeFixtureSeason] = customTournamentsData[activeFixtureSeason].filter(t => t.id !== tourId);
            saveToLocalStorage();
            renderFixturePanel();
        }
    }
}

        // --- Lig tablosu görünüm modu: 'closed' | 'slice' (ilk 2 + kendi takımım çevresi, toplam 7) | 'full' ---
        let ltViewModes = {};
        try { ltViewModes = JSON.parse(localStorage.getItem('ltViewModes') || '{}') || {}; } catch (e) { ltViewModes = {}; }
        function ltGetMode(tourId) { return ltViewModes[tourId] || 'slice'; }
        function ltCycleMode(tourId) {
            const order = ['closed', 'slice', 'full'];
            ltViewModes[tourId] = order[(order.indexOf(ltGetMode(tourId)) + 1) % order.length];
            try { localStorage.setItem('ltViewModes', JSON.stringify(ltViewModes)); } catch (e) {}
            renderFixturePanel();
        }
        function ltModeButtonHtml(tourId, mode) {
            const m = { closed: ['fa-eye-slash', 'Kapalı'], slice: ['fa-bullseye', 'Özet'], full: ['fa-table-list', 'Tam'] }[mode];
            return `<button onclick="ltCycleMode('${tourId}')" class="text-[9px] bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-0.5 rounded transition-colors" title="Tablo görünümü: Kapalı / Özet (7 takım) / Tam"><i class="fa-solid ${m[0]} mr-1"></i>${m[1]}</button>`;
        }
        function ltVisibleSet(table, mode) {
            const n = table.length, all = new Set();
            if (mode === 'closed') return all;
            for (let i = 0; i < n; i++) all.add(i);
            if (mode === 'full' || n <= 7) return all;
            const mine = [ (managedTeams.kulup && managedTeams.kulup.name) || '', (managedTeams.milli && managedTeams.milli.name) || '' ]
                .map(x => String(x).trim().toLowerCase()).filter(Boolean);
            let own = table.findIndex(r => mine.includes(String(r.name || '').trim().toLowerCase()));
            if (own === -1) own = 0;
            const start = Math.min(Math.max(own - 2, 2), n - 5);
            const vis = new Set([0, 1]);
            for (let i = start; i < start + 5; i++) vis.add(i);
            return vis;
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

        function moveCustomTournament(id, direction) {
            const list = customTournamentsData[activeFixtureSeason];
            if (!list) return;
            const idx = list.findIndex(t => t.id === id);
            if (idx === -1) return;
            const newIdx = idx + direction;
            if (newIdx < 0 || newIdx >= list.length) return;
            [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
            saveToLocalStorage();
            renderFixturePanel();
        }

        // --- Avrupa Ligleri kartları: aç/kapa (durum bu tarayıcıda saklanır) ---
        let euroCollapsed = {};
        try { euroCollapsed = JSON.parse(localStorage.getItem('euroLeagueCollapsed2') || '{}') || {}; } catch (e) { euroCollapsed = {}; }
        function euroIsCollapsed(name) { return (name in euroCollapsed) ? !!euroCollapsed[name] : window.innerWidth < 768; }
        function toggleEuroLeague(headEl) {
            const card = headEl.closest('.euro-card');
            const name = headEl.dataset.league;
            if (!card || !name) return;
            const next = card.dataset.collapsed !== '1';
            card.dataset.collapsed = next ? '1' : '0';
            euroCollapsed[name] = next;
            try { localStorage.setItem('euroLeagueCollapsed2', JSON.stringify(euroCollapsed)); } catch (e) {}
        }

        function toggleCustomTournamentCollapse(tourId) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if (tour) {
                tour.collapsed = !tour.collapsed;
                saveToLocalStorage();
                
                // Sayfayı yenilemeden (DOM üzerinden) anında gizle/göster
                const contentDiv = document.getElementById(`tour-content-${tourId}`);
                const chevronIcon = document.getElementById(`tour-chevron-${tourId}`);
                
                if (contentDiv) {
                    if (tour.collapsed) {
                        contentDiv.classList.add('hidden');
                    } else {
                        contentDiv.classList.remove('hidden');
                    }
                }
                
                if (chevronIcon) {
                    if (tour.collapsed) {
                        chevronIcon.classList.add('-rotate-90');
                    } else {
                        chevronIcon.classList.remove('-rotate-90');
                    }
                }
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
                    const teamName = parts[1];
                    let teamLogo = '';
                    
                    // 1. FC26 Veritabanından logoyu otomatik bul
                    if (typeof FC26_TEAM_DATABASE !== 'undefined') {
                        const dbMatch = FC26_TEAM_DATABASE.find(t => typeof t === 'object' && t.name && t.name.toLowerCase() === teamName.toLowerCase());
                        if (dbMatch && dbMatch.logo) {
                            teamLogo = dbMatch.logo;
                        }
                    }
                    
                    // 2. Veritabanında yoksa genel takım logo bulucuyu kullan (Rakipler vb.)
                    if (!teamLogo && typeof getTeamLogoByName === 'function') {
                        teamLogo = getTeamLogoByName(teamName);
                    }

                    newRows.push({
                        rank: parts[0],
                        name: teamName,
                        logo: teamLogo, // Logo eşleştirmesi eklendi
                        pld: parts[2],
                        w: parts[3],
                        d: parts[4],
                        l: parts[5],
                        gf: parts[6],
                        ga: parts[7],
                        gd: parts[8],
                        pts: parts[9]
                    });
                }
            });

            if (newRows.length > 0) {
                tour.table = newRows; // Toplu ekleme mevcut tabloyu tamamen yeni listeyle değiştirir
                saveToLocalStorage();
                closeTournamentTableBulkModal();
                renderFixturePanel();
            } else {
                alert('Geçerli formatta veri bulunamadı. Lütfen "Sıra, Takım Adı, Pld, W, D, L, GF, GA, GD, Puan" formatına uyduğunuzdan emin olun.');
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

        let activeCtTourId = null;
        let activeCtTeamIndex = null;

        function openCustomTourTeamModal(tourId, index) {
            activeCtTourId = tourId;
            activeCtTeamIndex = index;
            
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if (!tour) return;
            const teamData = tour.table[index];

            document.getElementById('ct-team-name').value = (teamData.name === 'Takım Adı' || teamData.name === 'Yeni Takım') ? '' : teamData.name;
            document.getElementById('ct-team-url').value = teamData.logo || '';
            
            fileUploads['ct-team'] = null;
            document.getElementById('ct-team-file-input').value = '';
            document.getElementById('ct-team-upload-btn').classList.replace('text-emerald-400', 'text-slate-300');
            
            const resultsDiv = document.getElementById('ct-team-logo-results');
            if (resultsDiv) {
                resultsDiv.innerHTML = '';
                resultsDiv.classList.add('hidden');
            }

            const modal = document.getElementById('custom-tour-team-modal');
            modal.classList.remove('hidden'); 
            modal.classList.add('flex');
        }

        function closeCustomTourTeamModal() {
            const modal = document.getElementById('custom-tour-team-modal');
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
        }

        function saveCustomTourTeam() {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === activeCtTourId);
            if (!tour) return;

            const name = document.getElementById('ct-team-name').value.trim();
            const url = document.getElementById('ct-team-url').value.trim();
            const logo = fileUploads['ct-team'] || (url !== "Yerel Dosya Seçildi" ? url : null);

            tour.table[activeCtTeamIndex].name = name || 'Takım Adı';
            if (logo) {
                tour.table[activeCtTeamIndex].logo = logo;
            } else if (!url) {
                tour.table[activeCtTeamIndex].logo = ''; 
            }

            saveToLocalStorage();
            closeCustomTourTeamModal();
            renderFixturePanel();
        }

        function addKnockoutMatch(tourId) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour) {
                if(!tour.knockouts) tour.knockouts = [];
                tour.knockouts.push({ id: 'ko_' + Date.now(), stage: 'Son 16', home: '', away: '', homeScore: '', awayScore: '' });
                saveToLocalStorage();
                
                // Ekran zıplamasını engellemek için mevcut kaydırma (scroll) pozisyonunu kaydet
                const mainScrollY = window.scrollY;
                const scrollableDiv = document.querySelector('.overflow-y-auto') || document.querySelector('.overflow-auto');
                const divScrollTop = scrollableDiv ? scrollableDiv.scrollTop : 0;

                renderFixturePanel();

                // DOM güncellendikten hemen sonra pozisyonu pürüzsüzce geri yükle
                requestAnimationFrame(() => {
                    window.scrollTo(0, mainScrollY);
                    if (scrollableDiv) scrollableDiv.scrollTop = divScrollTop;
                });
            }
        }

        function removeKnockoutMatch(tourId, koId) {
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                tour.knockouts = tour.knockouts.filter(k => k.id !== koId);
                saveToLocalStorage();
                
                // Ekran zıplamasını engellemek için mevcut kaydırma (scroll) pozisyonunu kaydet
                const mainScrollY = window.scrollY;
                const scrollableDiv = document.querySelector('.overflow-y-auto') || document.querySelector('.overflow-auto');
                const divScrollTop = scrollableDiv ? scrollableDiv.scrollTop : 0;

                renderFixturePanel();

                // DOM güncellendikten hemen sonra pozisyonu pürüzsüzce geri yükle
                requestAnimationFrame(() => {
                    window.scrollTo(0, mainScrollY);
                    if (scrollableDiv) scrollableDiv.scrollTop = divScrollTop;
                });
            }
        }

        function updateKnockoutField(tourId, koId, field, element) {
            const val = element.value;
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if(ko) {
                    ko[field] = val.trim();
                    saveToLocalStorage();
                    
                    // Sayfayı YENİLEMEDEN logoyu ve tooltip yazısını (title) anında değiştiriyoruz
                    if (field === 'home') {
                        const container = element.nextElementSibling;
                        const img = container ? container.querySelector('img') : null;
                        if (img) {
                            img.src = getTeamLogoByName(val.trim());
                            img.style.display = 'block';
                            container.title = val.trim(); // Üzerine gelince görünen ismi güncelle
                        }
                    } else if (field === 'away') {
                        const container = element.previousElementSibling;
                        const img = container ? container.querySelector('img') : null;
                        if (img) {
                            img.src = getTeamLogoByName(val.trim());
                            img.style.display = 'block';
                            container.title = val.trim(); // Üzerine gelince görünen ismi güncelle
                        }
                    }
                }
            }
        }

        let activeKoTeamElement = null;

        function editKnockoutTeam(tourId, koId, side, currentName, element) {
            activeKoTeamElement = element;
            document.getElementById('ko-team-tour-id').value = tourId;
            document.getElementById('ko-team-ko-id').value = koId;
            document.getElementById('ko-team-side').value = side;
            
            document.getElementById('ko-team-name-input').value = currentName || '';
            
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            let currentLogo = '';
            if (tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if (ko) currentLogo = (side === 'home' ? ko.homeLogo : ko.awayLogo) || getTeamLogoByName(currentName);
            }
            document.getElementById('ko-team-url-input').value = currentName ? currentLogo : '';
            
            fileUploads['ko-team'] = null;
            document.getElementById('ko-team-file-input').value = '';
            const uploadBtn = document.getElementById('ko-team-upload-btn');
            if(uploadBtn) uploadBtn.classList.replace('text-emerald-400', 'text-slate-300');
            
            const resultsDiv = document.getElementById('ko-team-logo-results');
            if (resultsDiv) {
                resultsDiv.innerHTML = '';
                resultsDiv.classList.add('hidden');
            }

            const modal = document.getElementById('ko-team-modal');
            modal.classList.remove('hidden'); 
            modal.classList.add('flex');
            
            setTimeout(() => document.getElementById('ko-team-name-input').focus(), 100);
        }

        function closeKoTeamModal() {
            const modal = document.getElementById('ko-team-modal');
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
            activeKoTeamElement = null;
        }

        function saveKoTeam() {
            const tourId = document.getElementById('ko-team-tour-id').value;
            const koId = document.getElementById('ko-team-ko-id').value;
            const side = document.getElementById('ko-team-side').value;
            
            const newName = document.getElementById('ko-team-name-input').value.trim();
            const customUrl = document.getElementById('ko-team-url-input').value.trim();
            const uploadedFile = fileUploads['ko-team'];
            
            const finalLogo = uploadedFile || (customUrl !== "Yerel Dosya Seçildi" ? customUrl : null);

            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if (tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if (ko) {
                    ko[side] = newName;
                    
                    if (finalLogo) {
                        if (side === 'home') ko.homeLogo = finalLogo;
                        else ko.awayLogo = finalLogo;
                    } else {
                        if (side === 'home') delete ko.homeLogo;
                        else delete ko.awayLogo;
                    }

                    saveToLocalStorage();
                    
                    // Sayfayı YENİLEMEDEN DOM'a anında yansıt
                    if (activeKoTeamElement) {
                        const safeName = escapeHtml(newName);
                        activeKoTeamElement.title = safeName;
                        activeKoTeamElement.setAttribute('onclick', `editKnockoutTeam('${tourId}', '${koId}', '${side}', '${safeName}', this)`);
                        
                        if (newName !== '') {
                            const logoSrc = finalLogo || getTeamLogoByName(newName);
                            activeKoTeamElement.innerHTML = `<img src="${logoSrc}" class="w-8 h-8 object-contain drop-shadow-md transition-all duration-300" onerror="this.style.display='none'">`;
                        } else {
                            activeKoTeamElement.innerHTML = `<i class="fa-solid fa-plus text-slate-600 hover:text-emerald-400 text-lg transition-colors"></i>`;
                        }
                    }
                }
            }
            
            closeKoTeamModal();
        }

        function openKoScoreModal(tourId, koId) {
            // Eğer modal HTML içinde yoksa anında yarat
            if (!document.getElementById('ko-score-modal')) {
                const modalHtml = `
                <div id="ko-score-modal" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-[150] fade-in backdrop-blur-sm">
                    <div class="bg-slate-800 p-5 rounded-xl border border-slate-600 w-[90%] max-w-xs shadow-2xl relative text-center">
                        <button onclick="closeKoScoreModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
                        <h3 class="text-sm font-bold mb-4 text-white uppercase tracking-widest text-emerald-400">Skorları Gir</h3>
                        <input type="hidden" id="ko-score-tour-id">
                        <input type="hidden" id="ko-score-ko-id">
                        
                        <div class="space-y-3">
                            <!-- 1. MAÇ -->
                            <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                <label class="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest border-b border-slate-800 pb-1">1. Maç</label>
                                <div class="flex items-center justify-center gap-3">
                                    <img id="ko-score-h1-logo" src="" class="w-6 h-6 object-contain shrink-0 drop-shadow-md">
                                    <div class="flex items-center justify-center gap-2">
                                        <input type="number" id="ko-score-h1" class="w-12 bg-slate-950 text-white font-black text-center outline-none border border-slate-600 focus:border-emerald-500 rounded p-1.5 appearance-none" placeholder="-">
                                        <span class="text-slate-500 font-bold">:</span>
                                        <input type="number" id="ko-score-a1" class="w-12 bg-slate-950 text-white font-black text-center outline-none border border-slate-600 focus:border-emerald-500 rounded p-1.5 appearance-none" placeholder="-">
                                    </div>
                                    <img id="ko-score-a1-logo" src="" class="w-6 h-6 object-contain shrink-0 drop-shadow-md">
                                </div>
                            </div>
                            <!-- 2. MAÇ -->
                            <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                <label class="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest border-b border-slate-800 pb-1">2. Maç (Rövanş)</label>
                                <div class="flex items-center justify-center gap-3">
                                    <img id="ko-score-h2-logo" src="" class="w-6 h-6 object-contain shrink-0 drop-shadow-md">
                                    <div class="flex items-center justify-center gap-2">
                                        <input type="number" id="ko-score-h2" class="w-12 bg-slate-950 text-white font-black text-center outline-none border border-slate-600 focus:border-emerald-500 rounded p-1.5 appearance-none" placeholder="-">
                                        <span class="text-slate-500 font-bold">:</span>
                                        <input type="number" id="ko-score-a2" class="w-12 bg-slate-950 text-white font-black text-center outline-none border border-slate-600 focus:border-emerald-500 rounded p-1.5 appearance-none" placeholder="-">
                                    </div>
                                    <img id="ko-score-a2-logo" src="" class="w-6 h-6 object-contain shrink-0 drop-shadow-md">
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between gap-2 mt-5">
                            <button onclick="closeKoScoreModal()" class="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium text-xs w-full">İptal</button>
                            <button onclick="saveKoScoreModal()" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors w-full">Kaydet</button>
                        </div>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', modalHtml);
            }

            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if(ko) {
                    const hLogo = getTeamLogoByName(ko.home || '');
                    const aLogo = getTeamLogoByName(ko.away || '');

                    document.getElementById('ko-score-tour-id').value = tourId;
                    document.getElementById('ko-score-ko-id').value = koId;
                    document.getElementById('ko-score-h1').value = ko.homeScore !== undefined ? ko.homeScore : '';
                    document.getElementById('ko-score-a1').value = ko.awayScore !== undefined ? ko.awayScore : '';
                    document.getElementById('ko-score-h2').value = ko.homeScore2 !== undefined ? ko.homeScore2 : '';
                    document.getElementById('ko-score-a2').value = ko.awayScore2 !== undefined ? ko.awayScore2 : '';

                    // Logoları dinamik olarak yerleştir (2. maçta ev sahibi ve deplasman yer değiştirir)
                    document.getElementById('ko-score-h1-logo').src = hLogo;
                    document.getElementById('ko-score-a1-logo').src = aLogo;
                    document.getElementById('ko-score-h2-logo').src = aLogo; // Rövanş: Deplasman takımı evinde
                    document.getElementById('ko-score-a2-logo').src = hLogo; // Rövanş: Ev sahibi deplasmanda

                    const modal = document.getElementById('ko-score-modal');
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                }
            }
        }

        function closeKoScoreModal() {
            const modal = document.getElementById('ko-score-modal');
            if(modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }

        function saveKoScoreModal() {
            const tourId = document.getElementById('ko-score-tour-id').value;
            const koId = document.getElementById('ko-score-ko-id').value;
            const tour = customTournamentsData[activeFixtureSeason].find(t => t.id === tourId);
            if(tour && tour.knockouts) {
                const ko = tour.knockouts.find(k => k.id === koId);
                if(ko) {
                    ko.homeScore = document.getElementById('ko-score-h1').value;
                    ko.awayScore = document.getElementById('ko-score-a1').value;
                    ko.homeScore2 = document.getElementById('ko-score-h2').value;
                    ko.awayScore2 = document.getElementById('ko-score-a2').value;
                    saveToLocalStorage();
                    closeKoScoreModal();
                    renderFixturePanel();
                }
            }
        }

        let fixtureActiveTab = 0;

function switchFixtureTab(idx) {
    fixtureActiveTab = idx;
    const activeCls = 'flex-1 px-4 py-3 text-lg bg-slate-900 text-emerald-400 border border-slate-700 border-b-slate-900 rounded-t-xl transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-10 -mb-[1px] flex items-center justify-center';
    const inactiveCls = 'flex-1 px-4 py-3 text-lg bg-slate-800/50 text-slate-400 border border-transparent border-b-slate-700 rounded-t-xl hover:bg-slate-800 hover:text-white transition-colors relative z-0 flex items-center justify-center cursor-pointer';
    document.querySelectorAll('#fx-panels > .fx-panel').forEach((panel, i) => {
        const btn = document.getElementById('ftab-' + i);
        if (i === idx) {
            panel.classList.remove('hidden'); panel.classList.add('flex');
            if (btn) btn.className = activeCls;
        } else {
            panel.classList.add('hidden'); panel.classList.remove('flex');
            if (btn) btn.className = inactiveCls;
        }
    });
}

function fxEventsHtml(m, ourLogo, oppLogo) {
    return m.events.slice().sort((a, b) => (parseInt(a.min) || 0) - (parseInt(b.min) || 0)).map(ev => {
        const isUs = ev.type === 'US';
        const eventTeamLogo = isUs ? ourLogo : oppLogo;
        const scorerPhoto = getPlayerPhotoByName(ev.scorer);
        const scorerImg = scorerPhoto
            ? `<img src="${scorerPhoto}" class="w-8 h-8 rounded-full object-cover shrink-0">`
            : `<div class="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[11px] font-bold shrink-0">${escapeHtml((ev.scorer || '?').charAt(0))}</div>`;

        return `
            <div class="flex items-center gap-2.5 min-w-0 text-left rounded-lg bg-slate-900/70 border border-slate-700/50 border-l-[3px] ${isUs ? 'border-l-emerald-500' : 'border-l-red-500/70'} pl-2 pr-3 py-1.5">
                <span class="w-9 shrink-0 text-center text-xs font-black tabular-nums ${isUs ? 'text-emerald-300' : 'text-red-300'}">${ev.min ? escapeHtml(String(ev.min)) + "'" : '-'}</span>
                ${eventTeamLogo ? `<img src="${eventTeamLogo}" class="w-5 h-5 object-contain shrink-0">` : '<div class="w-5 h-5 shrink-0"></div>'}
                ${scorerImg}
                <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-white truncate leading-tight" title="${escapeHtml(ev.scorer || '')}">${escapeHtml(homeShortName(ev.scorer)) || 'Bilinmiyor'}</div>
                    ${ev.assist ? `<div class="text-[10px] font-semibold text-sky-400 truncate leading-tight mt-0.5" title="${escapeHtml(ev.assist)}"><i class="fa-solid fa-shoe-prints text-[8px] mr-1 opacity-80"></i>${escapeHtml(homeShortName(ev.assist))}</div>` : ''}
                </div>
            </div>`;
    }).join('');
}

function fxEventsHtml(m, ourLogo, oppLogo) {
    return m.events.slice().sort((a, b) => (parseInt(a.min) || 0) - (parseInt(b.min) || 0)).map(ev => {
        const isUs = ev.type === 'US';
        const eventTeamLogo = isUs ? ourLogo : oppLogo;
        const scorerPhoto = getPlayerPhotoByName(ev.scorer);
        const scorerImg = scorerPhoto
            ? `<img src="${scorerPhoto}" class="w-8 h-8 rounded-full object-cover shrink-0">`
            : `<div class="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[11px] font-bold shrink-0">${escapeHtml((ev.scorer || '?').charAt(0))}</div>`;

        return `
            <div class="flex items-center gap-2.5 min-w-0 text-left rounded-lg bg-slate-900/70 border border-slate-700/50 border-l-[3px] ${isUs ? 'border-l-emerald-500' : 'border-l-red-500/70'} pl-2 pr-3 py-1.5">
                <span class="w-9 shrink-0 text-center text-xs font-black tabular-nums ${isUs ? 'text-emerald-300' : 'text-red-300'}">${ev.min ? escapeHtml(String(ev.min)) + "'" : '-'}</span>
                ${eventTeamLogo ? `<img src="${eventTeamLogo}" class="w-5 h-5 object-contain shrink-0">` : '<div class="w-5 h-5 shrink-0"></div>'}
                ${scorerImg}
                <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-white truncate leading-tight" title="${escapeHtml(ev.scorer || '')}">${escapeHtml(homeShortName(ev.scorer)) || 'Bilinmiyor'}</div>
                    ${ev.assist ? `<div class="text-[10px] font-semibold text-sky-400 truncate leading-tight mt-0.5" title="${escapeHtml(ev.assist)}"><i class="fa-solid fa-shoe-prints text-[8px] mr-1 opacity-80"></i>${escapeHtml(homeShortName(ev.assist))}</div>` : ''}
                </div>
            </div>`;
    }).join('');
}

let fxScorersOpen = false; // Mobilde gol detayları sütunu varsayılan kapalı
function toggleFxScorers() {
    fxScorersOpen = !fxScorersOpen;
    document.querySelectorAll('#fx-panels table[data-scorers]').forEach(t => { t.dataset.scorers = fxScorersOpen ? '1' : '0'; });
    document.querySelectorAll('.fx-scorers-btn').forEach(b => { b.dataset.on = fxScorersOpen ? '1' : '0'; });
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

            // Sezonun en farklı galibiyeti ve mağlubiyeti (skor farkı; eşitse atılan gol, sonra en yeni maç)
            let bigW = null, bigL = null;
            filtered.forEach(m => {
                const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
                if (isNaN(hs) || isNaN(as)) return;
                const isHome = isOurTeam(m.home), isAway = isOurTeam(m.away);
                if (!isHome && !isAway) return;
                const us = isHome ? hs : as, them = isHome ? as : hs, diff = us - them;
                if (diff === 0) return;
                const cand = { m, diff: Math.abs(diff), scored: us, date: String(m.date || '') };
                const better = (b) => !b || cand.diff > b.diff || (cand.diff === b.diff && (cand.scored > b.scored || (cand.scored === b.scored && cand.date >= b.date)));
                if (diff > 0) { if (better(bigW)) bigW = cand; } else { if (better(bigL)) bigL = cand; }
            });
            const fxLogo = (n) => {
                const l = getTeamLogoByName(n);
                return l ? `<img src="${l}" alt="" class="w-4 h-4 object-contain shrink-0" title="${escapeHtml(n || '')}">`
                    : `<span class="w-4 h-4 rounded-full bg-slate-700 text-[8px] font-bold flex items-center justify-center shrink-0" title="${escapeHtml(n || '')}">${escapeHtml((n || '?').charAt(0))}</span>`;
            };
            const fxBig = (b, cls) => b
                ? `<span class="inline-flex items-center gap-1 whitespace-nowrap" title="${escapeHtml((b.m.home || '') + ' ' + parseInt(b.m.homeScore) + '-' + parseInt(b.m.awayScore) + ' ' + (b.m.away || ''))}">${fxLogo(b.m.home)}<span class="${cls}">${parseInt(b.m.homeScore)}-${parseInt(b.m.awayScore)}</span>${fxLogo(b.m.away)}</span>`
                : '<span class="text-slate-600 font-normal">-</span>';

            const seasonTabsHtml = seasonsList.map(s => `
                <button onclick="switchFixtureSeason('${s}')"
                    class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border transition-all whitespace-nowrap
                           ${s === activeFixtureSeason ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-white'}">
                    ${s}
                </button>
            `).join('');

            const filterHtml = `
                <button onclick="setFixtureFilter('')" title="Tümü (${matches.length})"
                    class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border transition-all whitespace-nowrap
                        ${!filterTour ? 'bg-slate-500 text-white border-slate-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                T
            </button>
            ${[...new Set(matches.map(m => m.tournament).filter(Boolean))].map(t => {
                const cnt = matches.filter(m => m.tournament === t).length;
                const safeTour = t.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
                const tLogo = getCompetitionLogo(t);
                const labelHtml = tLogo
                    ? `<img src="${tLogo}" alt="${escapeHtml(t)}" class="w-4 h-4 object-contain inline-block align-middle">`
                    : getTournamentAbbr(t);
                return `<button onclick="setFixtureFilter('${safeTour}')" title="${t} (${cnt})"
                    class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-1.5
                        ${filterTour === t ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}">
                    ${labelHtml}
                </button>`;
            }).join('')}
        `;

            let matchRowsHtml = '';
            if (filtered.length === 0) {
                matchRowsHtml = `
                    <tr>
                        <td colspan="9" class="p-10 text-center text-slate-500">
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
                    
                    const scoreBgClass = resultLetter === 'W' ? 'bg-green-800 border-green-700 text-white shadow-sm' : 
                                         resultLetter === 'D' ? 'bg-yellow-600 border-yellow-500 text-white shadow-sm' : 
                                         resultLetter === 'L' ? 'bg-red-800 border-red-700 text-white shadow-sm' : 
                                         'bg-slate-900 border-slate-700 text-slate-400';

                    let scorersList = '';
                    let scorersPlain = '';
                    if (m.events && m.events.length > 0) {
                        const namedGoals = m.events.filter(ev => ev.scorer);
                        if (namedGoals.length) {
                            const groupedGoals = [];
                            namedGoals.forEach(ev => {
                                const shortName = homeSurname(ev.scorer);
                                const existing = groupedGoals.find(g => g.key === ev.scorer && g.type === ev.type);
                                const minuteStr = ev.min ? `${escapeHtml(ev.min)}'` : '';
                                if (existing) {
                                    if (minuteStr) existing.mins.push(minuteStr);
                                } else {
                                    groupedGoals.push({
                                        name: shortName, key: ev.scorer,
                                        type: ev.type,
                                        mins: minuteStr ? [minuteStr] : []
                                    });
                                }
                            });
                            
                            scorersPlain = groupedGoals.map(g => g.name).join(', ');
                            scorersList = groupedGoals.map(g => {
                                const isUs = g.type === 'US';
                                const colorClass = isUs ? 'goal-text' : 'text-red-400';
                                const minsJoined = g.mins.length > 0 ? g.mins.join(', ') : '-';
                                return `<span class="${colorClass} text-[10px] font-bold whitespace-nowrap inline-block"><span class="text-slate-400 font-mono font-normal">${minsJoined}</span>&nbsp;${escapeHtml(g.name)}</span>`;
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

                        eventsListHtml = fxEventsHtml(m, ourLogo, oppLogo);
                        if (false) eventsListHtml = m.events.map(ev => {
                            const eventTeamLogo = ev.type === 'US' ? ourLogo : oppLogo;
                            const scorerPhoto = getPlayerPhotoByName(ev.scorer);
                            const scorerImg = scorerPhoto
                                    ? `<img src="${scorerPhoto}" class="w-6 h-6 rounded-full object-cover shrink-0">`
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

                    const tourLogo = getCompetitionLogo(m.tournament);
                    const safeTourJs = (m.tournament || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
                    const tourCellContent = tourLogo
                        ? `<div class="w-5 h-5 mx-auto flex items-center justify-center"><img src="${tourLogo}" alt="${escapeHtml(m.tournament||'')}" class="w-full h-full object-contain" style="filter:none"></div>`
                        : `<span class="truncate block">${m.tournament || '-'}</span>`;
                    const logoBtnHtml = m.tournament
                        ? `<button onclick="event.stopPropagation(); openCompetitionLogoModal('${safeTourJs}')" class="text-slate-500 hover:text-yellow-400" title="Logo Ekle/Değiştir"><i class="fa-solid fa-image text-[8px]"></i></button>`
                        : '';

                    let roundHtml = '';
                    if (m.round) {
                        const abbr = getRoundAbbr(m.round);
                        const glowingPhases = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'R1', 'R2', 'R3', 'R4', 'R5', 'L32', 'L32', 'L16', 'QF', 'SF', 'F', '3rd', 'PO'];
                        const badgeStyle = glowingPhases.includes(abbr)
                            ? 'text-amber-300 bg-amber-900/30 border-amber-600/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                            : 'text-slate-300 bg-slate-950/80 border-slate-700';
                        roundHtml = `<span class="inline-block text-[9px] font-black rounded px-1 py-0.5 border ${badgeStyle}" title="${escapeHtml(m.round)}">${escapeHtml(abbr)}</span>`;
                    }

                    matchRowsHtml += `
                        <tr id="fx-row-${m.id}" class="fixture-compact-row ${tournamentBg} transition-colors group cursor-pointer border-b border-slate-700/40 ${rowResultClass} ${isExpanded ? 'bg-slate-800/40' : ''}" onclick="toggleFixtureRowExpand('${m.id}')">
                            <td class="p-0.5 text-center w-5">
                                <div class="flex items-center justify-center gap-0.5">
                                    <i id="fx-chevron-${m.id}" class="fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} text-[8px] text-slate-500 group-hover:text-emerald-400 transition-transform"></i>
                                    <span class="text-emerald-500 text-xs font-black">${m.matchNo || '-'}</span>
                                </div>
                            </td>
                            <td class="p-0.5 text-slate-300 text-[10px] font-bold w-9" title="${m.tournament || ''}">
                                <div class="flex items-center justify-center gap-0.5">
                                    ${tourCellContent}
                                    <div class="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        ${logoBtnHtml}
                                        <button onclick="event.stopPropagation(); openFixtureModal('${activeFixtureSeason}', '${m.id}')" class="text-slate-500 hover:text-blue-400" title="Fikstürü Düzenle"><i class="fa-solid fa-pen text-[8px]"></i></button>
                                    </div>
                                </div>
                            </td>
                            <td class="p-0.5 w-8 text-center">${roundHtml}</td>
                            <td class="p-0.5 w-6 text-center">${getGroundLabel(m.ground)}</td>
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
                            <td colspan="8" class="p-3 border-b border-slate-700/60">
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
                <!-- Sezon Rozetleri (en üstte) -->
                <div class="flex gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar shrink-0 px-2 pb-1 sm:pb-2 w-full">
                    ${seasonTabsHtml}
                </div>

                <!-- Sekmeler (Sadece Mobilde) -->
                <div class="flex xl:hidden gap-1 overflow-x-auto hide-scrollbar shrink-0 px-2 w-full">
                    <button onclick="switchFixtureTab(0)" id="ftab-0" class="flex-1 px-4 py-3 text-lg flex items-center justify-center"><i class="fa-solid fa-calendar-days"></i></button>
                    <button onclick="switchFixtureTab(1)" id="ftab-1" class="flex-1 px-4 py-3 text-lg flex items-center justify-center"><i class="fa-solid fa-trophy"></i></button>
                    <button onclick="switchFixtureTab(2)" id="ftab-2" class="flex-1 px-4 py-3 text-lg flex items-center justify-center"><i class="fa-solid fa-globe"></i></button>
                </div>
                <div id="fx-panels" class="w-full flex-1 min-h-0 flex flex-col xl:grid xl:grid-cols-3 xl:gap-6 pb-4 overflow-hidden relative z-0">
                    
                    <!-- 1. SOL PANEL: FİKSTÜR -->
                    <div class="fx-panel hidden xl:flex flex-col bg-slate-900 border border-slate-700 rounded-b-xl rounded-tr-xl xl:rounded-xl overflow-hidden shadow-lg flex-1 min-h-0 xl:h-full relative z-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-1.5 sm:p-3 shrink-0 flex justify-between items-center flex-wrap gap-2">
                            <h3 class="text-sm sm:text-lg font-bold text-white"><i class="fa-solid fa-calendar-days text-emerald-400 mr-2"></i>Fikstür</h3>
                            <div class="flex gap-1.5">
                                <button onclick="openFixtureTextBulkModal('${activeFixtureSeason}')" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs transition-colors shadow flex items-center gap-1.5" title="Metin (Virgüllü) ile Toplu Ekle">
                                    <i class="fa-solid fa-file-lines"></i>
                                </button>
                                <button onclick="openFixtureBulkModal('${activeFixtureSeason}')" title="Toplu Ekle" class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs transition-colors shadow flex items-center gap-1.5">
                                    <i class="fa-solid fa-list-check"></i>
                                </button>
                                <button onclick="toggleFxScorers()" data-on="${fxScorersOpen ? 1 : 0}" class="fx-scorers-btn sm:hidden bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold px-1.5 py-0.5 rounded text-[10px] transition-colors shadow flex items-center" title="Gol Detayları"><i class="fa-solid fa-futbol"></i></button>
                                <button onclick="openFixtureModal('${activeFixtureSeason}', null)" title="Ekle" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs transition-colors shadow flex items-center gap-1.5">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button onclick="deleteBulkFixtures()" class="bg-red-900/50 hover:bg-red-800 text-red-200 font-bold px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs transition-colors" title="Toplu Sil">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex flex-col p-3 h-full overflow-hidden gap-2">

                            <!-- Stats Summary Bar -->
                            ${played > 0 ? `
                            <div class="grid grid-cols-3 gap-2 shrink-0">
                                <div class="bg-slate-950 border border-slate-700 rounded p-1 sm:p-1 sm:p-1 sm:p-1 sm:p-1.5 text-center">
                                    <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">O / G / B / M</div>
                                    <div class="text-xs font-black text-white">${played} / <span class="text-green-400">${wins}</span> / <span class="text-orange-400">${draws}</span> / <span class="text-red-400">${losses}</span></div>
                                </div>
                                <div class="bg-slate-950 border border-slate-700 rounded p-1 sm:p-1 sm:p-1 sm:p-1 sm:p-1.5 text-center">
                                    <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Gol (A/Y)</div>
                                    <div class="text-xs font-black text-white">${gf} <span class="text-slate-500 font-normal">/ ${ga}</span></div>
                                </div>
                                <div class="bg-slate-950 border border-slate-700 rounded p-1 sm:p-1 sm:p-1 sm:p-1 sm:p-1.5 text-center">
                                    <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">En Büyük G / M</div>
                                    <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs font-black">${fxBig(bigW, 'text-green-400')}${fxBig(bigL, 'text-red-400')}</div>
                                </div>
                            </div>` : ''}

                            <!-- Tournament Filter Pills -->
                            <div class="flex gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar shrink-0 pb-0.5 sm:pb-1">
                                ${filterHtml}
                            </div>

                            <!-- Match Table -->
                            <div class="flex-1 overflow-auto table-scroll border border-slate-700 rounded-lg bg-slate-950 min-h-0">
                                <table class="w-full border-separate border-spacing-0 text-xs min-w-[500px]" data-scorers="${fxScorersOpen ? 1 : 0}">
                                    <thead class="bg-slate-900 sticky top-0 z-10">
                                        <tr class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                            <th class="p-0.5 text-center border-b border-slate-700 w-5" title="Maç No">#</th>
                                            <th class="p-0.5 text-center border-b border-slate-700 w-9" title="Müsabaka"><i class="fa-solid fa-trophy"></i></th>
                                            <th class="p-0.5 text-center border-b border-slate-700 w-8" title="Hafta / Aşama"><i class="fa-solid fa-list-ol"></i></th>
                                            <th class="p-0.5 text-center border-b border-slate-700 w-6" title="Zemin"><i class="fa-solid fa-map-pin"></i></th>
                                            <th class="p-2 text-center border-b border-slate-700" title="Ev Sahibi"><i class="fa-solid fa-house"></i></th>
                                            <th class="p-2 text-center border-b border-slate-700 w-16" title="Skor"><i class="fa-solid fa-futbol"></i></th>
                                            <th class="p-2 text-center border-b border-slate-700" title="Deplasman"><i class="fa-solid fa-plane-departure"></i></th>
                                            <th class="p-2 text-center border-b border-slate-700" title="Goller & Asistler"><i class="fa-solid fa-list-ul"></i></th>
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
                    <div class="fx-panel hidden xl:flex flex-col bg-slate-900 border border-slate-700 rounded-b-xl rounded-tr-xl xl:rounded-xl overflow-hidden shadow-lg flex-1 min-h-0 xl:h-full relative z-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-1.5 sm:p-3 shrink-0 flex justify-between items-center">
                            <h3 class="text-sm sm:text-lg font-bold text-white"><i class="fa-solid fa-trophy mr-2 text-yellow-500"></i>Müsabaka Tabloları</h3>
                            
                            <div class="flex gap-2">
                                <select id="custom-tour-select" class="hidden">
                                    ${tourSelectOptions('', 'all', { newValue: null })}
                                    <option value="CUSTOM" class="text-emerald-400 font-bold">+ Yeni / Özel Turnuva</option>
                                </select>
                                <button onclick="openTourAddPicker(this)" data-tour-add="1" title="Ekle" class="bg-emerald-600 hover:bg-emerald-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-4 overflow-y-auto custom-scrollbar h-full flex flex-col gap-6">
                            
                            ${(() => {
                                const cTours = customTournamentsData[activeFixtureSeason] || [];
                                if (cTours.length === 0) return `<div class="text-center text-slate-500 text-sm mt-10">Henüz bu sezon için müsabaka tablosu eklenmedi.<br>Yukarıdan seçip ekleyebilirsiniz.</div>`;
                                
                                return cTours.map((tour, tIdx) => {
                                    // Geriye dönük uyumluluk: eski kayıtlarda bu bayraklar yoksa, mevcut veriye göre makul bir varsayılan uygula
                                    const tableOn = tour.tableEnabled !== false;
                                    const knockoutOn = tour.knockoutEnabled !== undefined
                                        ? tour.knockoutEnabled
                                        : (KNOCKOUT_DEFAULT_TYPES.includes(tour.type) || (tour.knockouts && tour.knockouts.length > 0));

                                    // --- GRUP / LİG TABLOSU BÖLÜMÜ ---
                                    let tableSectionHtml = '';
                                    if (tableOn) {
                                        const ltMode = ltGetMode(tour.id); const ltVis = ltVisibleSet(tour.table || [], ltMode); let ltPrev = -1;
                                        let tableRows = (tour.table || []).map((row, idx) => {
                                            if (!ltVis.has(idx)) return '';
                                            const ltGapHtml = (ltPrev !== -1 && idx - ltPrev > 1) ? `<tr class="lt-gap"><td colspan="10" class="text-center text-[9px] leading-none text-slate-500 py-0.5 select-none">⋯ ${idx - ltPrev - 1}</td></tr>` : '';
                                            ltPrev = idx;
                                            // İlk sıra (Lider/Şampiyon) için daha hafif ve zarif parlama (glow) efekti
                                            const isWinner = (idx === 0);
                                            const textGlow = isWinner ? 'text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] font-black' : 'text-slate-300';
                                            const nameGlow = isWinner ? 'text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] font-black' : 'text-white';
                                            const rankGlow = isWinner ? 'text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.6)] font-black' : 'text-slate-400 font-bold';

                                            return `
                                            ${ltGapHtml}<tr class="border-b border-slate-800 bg-slate-800/20 hover:bg-slate-800/50 transition-colors">
                                                <td class="py-1 px-1.5 w-8 text-center outline-none focus:bg-slate-700 cursor-text rounded ${rankGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'rank', this)">${row.rank}</td>
                                                <td class="py-1 px-1.5 font-bold rounded cursor-pointer hover:bg-slate-700/80 transition-colors group/edit ${nameGlow}" onclick="openCustomTourTeamModal('${tour.id}', ${idx})" title="Takım ve Logoyu Düzenle">
                                                    <div class="flex items-center gap-2">
                                                        <img src="${row.logo || `https://ui-avatars.com/api/?name=\${encodeURIComponent(row.name || '?')}&background=random&color=fff&size=32`}" alt="${row.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(row.name || '?')}&background=random&color=fff&size=32'" class="w-4 h-4 rounded-full object-cover shrink-0">
                                                        <span class="truncate">${row.name}</span>
                                                        <i class="fa-solid fa-pen text-[10px] text-slate-500 opacity-0 group-hover/edit:opacity-100 transition-opacity ml-auto"></i>
                                                    </div>
                                                </td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'pld', this)">${row.pld}</td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'w', this)">${row.w || 0}</td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'd', this)">${row.d || 0}</td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'l', this)">${row.l || 0}</td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'gf', this)">${row.gf || 0}</td>
                                                <td class="py-1 px-1.5 text-center w-8 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'ga', this)">${row.ga || 0}</td>
                                                <td class="py-1 px-1.5 text-center w-10 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'gd', this)">${row.gd}</td>
                                                <td class="py-1 px-1.5 text-center font-black text-[12px] w-10 outline-none focus:bg-slate-700 cursor-text rounded ${textGlow}" contenteditable="true" onblur="updateCustomTournament('${tour.id}', ${idx}, 'pts', this)">${row.pts}</td>
                                            </tr>
                                        `;
                                        }).join('');

                                        tableSectionHtml = `
                                            <div class="mb-1">
                                                <div class="flex justify-between items-center mb-1 gap-2">
                                                    <span class="text-[10px] text-slate-400 font-bold uppercase truncate"><i class="fa-solid fa-table-list mr-1"></i>Grup / Lig Tablosu</span>
                                                    <div class="flex gap-1 shrink-0">
                                                        ${!knockoutOn && tour.type !== 'Süper Lig' ? `<button onclick="toggleTournamentKnockouts('${tour.id}', true)" class="text-[9px] bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 px-2 py-0.5 rounded transition-colors" title="+ Eleme Aşamaları Ekle"><i class="fa-solid fa-sitemap"></i></button>` : ''}
                                                        ${ltModeButtonHtml(tour.id, ltMode)}
                                                        <button onclick="openTournamentTableBulkModal('${tour.id}')" class="text-[9px] bg-indigo-900/50 hover:bg-indigo-800 text-indigo-300 px-2 py-0.5 rounded transition-colors" title="Toplu Ekle"><i class="fa-solid fa-list-ol"></i></button>
                                                        <button onclick="addRowToCustomTournament('${tour.id}')" class="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors" title="Satır Ekle"><i class="fa-solid fa-plus"></i></button>
                                                        <button onclick="toggleTournamentTable('${tour.id}', false)" class="text-[9px] bg-red-900/40 hover:bg-red-800 text-red-300 px-2 py-0.5 rounded transition-colors" title="Bu Bölümü Sil"><i class="fa-solid fa-trash"></i></button>
                                                    </div>
                                                </div>
                                                <table class="lt-table w-full table-fixed text-[10px] sm:text-[11px] text-left text-slate-300 mb-1"><colgroup><col style="width:8.5%"><col><col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:7%"><col style="width:7%"><col style="width:8.5%"><col style="width:8.5%"></colgroup>
                                                    <thead class="text-[9px] text-slate-400 uppercase bg-slate-900">
                                                        <tr>
                                                            <th class="p-1 border-slate-700 text-center">Sıra</th>
                                                            <th class="p-1 border-slate-700">Takım</th>
                                                            <th class="p-1 border-slate-700 text-center">Pl</th>
                                                            <th class="p-1 border-slate-700 text-center">W</th>
                                                            <th class="p-1 border-slate-700 text-center">D</th>
                                                            <th class="p-1 border-slate-700 text-center">L</th>
                                                            <th class="p-1 border-slate-700 text-center">GF</th>
                                                            <th class="p-1 border-slate-700 text-center">GA</th>
                                                            <th class="p-1 border-slate-700 text-center">GD</th>
                                                            <th class="p-1 border-slate-700 text-center font-bold">Pts</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${ltMode === 'closed' ? `<tr class="lt-closed"><td colspan="10" class="text-center text-[10px] text-slate-500 py-1">${(tour.table || []).length}</td></tr>` : tableRows}
                                                    </tbody>
                                                </table>
                                            </div>
                                        `;
                                    } else {
                                        tableSectionHtml = knockoutOn ? '' : `
                                            <button type="button" onclick="event.stopPropagation(); toggleTournamentTable('${tour.id}', true);" class="w-full text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-dashed border-slate-700 rounded py-2 mb-2 transition-colors">
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

                                        // Turnuvaya özel metin ve odak renkleri
                                        let textColorClass = 'text-slate-300';
                                        let focusBorderClass = 'focus:border-slate-400';
                                        const tNameLower = (tour.type || '').toLowerCase();
                                        
                                        if (tNameLower.includes('uefa şampiyonlar ligi')) { textColorClass = 'text-blue-400'; focusBorderClass = 'focus:border-blue-500'; }
                                        else if (tNameLower.includes('uefa avrupa ligi')) { textColorClass = 'text-orange-400'; focusBorderClass = 'focus:border-orange-500'; }
                                        else if (tNameLower.includes('uefa konferans ligi')) { textColorClass = 'text-emerald-400'; focusBorderClass = 'focus:border-emerald-500'; }
                                        else if (tNameLower.includes('süper lig')) { textColorClass = 'text-red-500'; focusBorderClass = 'focus:border-red-600'; }
                                        else if (tNameLower.includes('türkiye kupası')) { textColorClass = 'text-red-400'; focusBorderClass = 'focus:border-red-500'; }
                                        else if (tNameLower.includes('dünya kupası')) { textColorClass = 'text-yellow-500'; focusBorderClass = 'focus:border-yellow-600'; }
                                        else if (tNameLower.includes('avrupa şampiyonası')) { textColorClass = 'text-purple-400'; focusBorderClass = 'focus:border-purple-500'; }

                                        let koRows = tour.knockouts.map(ko => {
                                            const hName = ko.home || '';
                                            const aName = ko.away || '';
                                            const hScore = ko.homeScore !== undefined ? ko.homeScore : '';
                                            const aScore = ko.awayScore !== undefined ? ko.awayScore : '';
                                            const hScore2 = ko.homeScore2 !== undefined ? ko.homeScore2 : '';
                                            const aScore2 = ko.awayScore2 !== undefined ? ko.awayScore2 : '';
                                            const stage = ko.stage || 'Son 16';
                                            
                                            const hLogo = ko.homeLogo || getTeamLogoByName(hName);
                                            const aLogo = ko.awayLogo || getTeamLogoByName(aName);

                                            const hasL1 = hScore !== '' && aScore !== '';
                                            const hasL2 = hScore2 !== '' && aScore2 !== '';

                                            // Final aşaması için altın/sarı parlama efekti sınıfları
                                            const isFinal = stage === 'Final';
                                            const rowStyle = isFinal 
                                                ? 'bg-slate-900 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.25)] z-10' 
                                                : 'bg-slate-900 border-slate-700/50 shadow-sm';

                                            // Kazanan takımın logosunu parlatmak için dinamik sınıflar
                                            let hLogoStyle = "w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md transition-all duration-300";
                                            let aLogoStyle = "w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md transition-all duration-300";
                                            
                                            let matchResultLetter = '';
                                            let scoreBoxClass = 'bg-slate-950 border-slate-700 shadow-inner hover:border-slate-500';
                                            let currentTextColor = textColorClass;

                                            // İki ayaklı maçları destekleyen Toplam (Aggregate) Skor Hesaplaması
                                            if (hasL1) {
                                                // Rövanşta takımlar yer değiştirdiği için aScore2 sol tarafın (1. takımın), hScore2 ise sağ tarafın skorudur.
                                                const hsAgg = parseInt(hScore) + (hasL2 ? parseInt(aScore2) : 0);
                                                const asAgg = parseInt(aScore) + (hasL2 ? parseInt(hScore2) : 0);
                                                if (!isNaN(hsAgg) && !isNaN(asAgg)) {
                                                    if (hsAgg > asAgg) {
                                                        hLogoStyle += " drop-shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110 z-10 relative"; 
                                                    } else if (asAgg > hsAgg) {
                                                        aLogoStyle += " drop-shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110 z-10 relative"; 
                                                    }

                                                    // Eğer bizim takım oynuyorsa maç sonucunu belirle
                                                    if (isOurTeam(hName)) {
                                                        matchResultLetter = hsAgg > asAgg ? 'W' : (hsAgg < asAgg ? 'L' : 'D');
                                                    } else if (isOurTeam(aName)) {
                                                        matchResultLetter = asAgg > hsAgg ? 'W' : (asAgg < hsAgg ? 'L' : 'D');
                                                    }
                                                }
                                            }

                                            // Sonuca göre kutu ve metin renklerini ayarla
                                            if (matchResultLetter === 'W') {
                                                scoreBoxClass = 'bg-green-800 border-green-700 shadow-[0_0_10px_rgba(22,163,74,0.4)] hover:border-green-600';
                                                currentTextColor = 'text-white';
                                            } else if (matchResultLetter === 'D') {
                                                scoreBoxClass = 'bg-yellow-600 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] hover:border-yellow-500';
                                                currentTextColor = 'text-white';
                                            } else if (matchResultLetter === 'L') {
                                                scoreBoxClass = 'bg-red-800 border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.4)] hover:border-red-600';
                                                currentTextColor = 'text-white';
                                            }

                                            // Skor Gösterim Alanı (Yükseklik sabit, içerik değişiyor)
                                            let scoreDisplayHtml = `<span class="${currentTextColor} font-black text-sm tracking-widest">- : -</span>`;
                                            if (hasL1 && hasL2) {
                                                // Ana ekranda sol taraf 1. takım olduğu için 2. maçta aScore2 ve hScore2 yer değiştirilerek yazdırılır
                                                scoreDisplayHtml = `
                                                    <span class="${currentTextColor} font-black text-[10px] leading-tight tracking-wider">${hScore} : ${aScore}</span>
                                                    <span class="${currentTextColor} font-black text-[10px] leading-tight tracking-wider">${aScore2} : ${hScore2}</span>
                                                `;
                                            } else if (hasL1) {
                                                scoreDisplayHtml = `<span class="${currentTextColor} font-black text-sm tracking-widest">${hScore} : ${aScore}</span>`;
                                            }

                                            return `
                                            <div class="flex flex-row justify-between items-center border rounded-lg px-1.5 py-1 sm:p-2 mb-0 sm:mb-2 group/ko relative gap-1.5 sm:gap-3 transition-all ${rowStyle}">
                                                
                                                <!-- Tur Dropdown (Daraltılmış) -->
                                                <select class="ko-stage bg-slate-950 ${textColorClass} font-bold uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-[11px] w-11 sm:w-16 text-center rounded px-0.5 sm:px-1 py-1 sm:py-1.5 border border-slate-800 outline-none ${focusBorderClass} cursor-pointer" data-stage="${stage}" onchange="updateKnockoutField('${tour.id}', '${ko.id}', 'stage', this)">
                                                    <option value="R1" ${stage === 'R1' ? 'selected' : ''}>R1</option>
                                                    <option value="R2" ${stage === 'R2' ? 'selected' : ''}>R2</option>
                                                    <option value="R3" ${stage === 'R3' ? 'selected' : ''}>R3</option>
                                                    <option value="R4" ${stage === 'R4' ? 'selected' : ''}>R4</option>
                                                    <option value="R5" ${stage === 'R5' ? 'selected' : ''}>R5</option>
                                                    <option value="Son 32" ${stage === 'Son 32' ? 'selected' : ''}>32</option>
                                                    <option value="Son 16" ${stage === 'Son 16' ? 'selected' : ''}>16</option>
                                                    <option value="Çeyrek Final" ${stage === 'Çeyrek Final' ? 'selected' : ''}>QF</option>
                                                    <option value="Yarı Final" ${stage === 'Yarı Final' ? 'selected' : ''}>SF</option>
                                                    <option value="Final" ${stage === 'Final' ? 'selected' : ''}>F</option>
                                                    <option value="Üçüncülük" ${stage === 'Üçüncülük' ? 'selected' : ''}>3R</option>
                                                </select>
                                                
                                                <!-- İçerik Paneli -->
                                                <div class="flex-1 flex items-center justify-center gap-2 sm:gap-4 w-full min-w-0">
                                                    
                                                    <!-- Ev Sahibi Logo / Ekle Butonu -->
                                                    <div class="flex items-center justify-end flex-1">
                                                        <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 cursor-pointer transition-transform hover:scale-110" title="${escapeHtml(hName)}" onclick="editKnockoutTeam('${tour.id}', '${ko.id}', 'home', '${escapeHtml(hName)}', this)">
                                                            ${hName ? `<img src="${hLogo}" class="${hLogoStyle}" onerror="this.style.display='none'">` : `<i class="fa-solid fa-plus text-slate-600 hover:text-emerald-400 text-lg transition-colors"></i>`}
                                                        </div>
                                                    </div>

                                                    <!-- Skorlar (Tıklanabilir Sabit Yükseklikli Panel) -->
                                                    <div class="flex flex-col items-center justify-center shrink-0 px-2 sm:px-3 min-w-[54px] sm:min-w-[64px] h-[28px] sm:h-[34px] rounded-lg border z-10 cursor-pointer transition-colors ${scoreBoxClass}" onclick="openKoScoreModal('${tour.id}', '${ko.id}')" title="Skorları Düzenle">
                                                        ${scoreDisplayHtml}
                                                    </div>

                                                    <!-- Deplasman Logo / Ekle Butonu -->
                                                    <div class="flex items-center justify-start flex-1">
                                                        <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 cursor-pointer transition-transform hover:scale-110" title="${escapeHtml(aName)}" onclick="editKnockoutTeam('${tour.id}', '${ko.id}', 'away', '${escapeHtml(aName)}', this)">
                                                            ${aName ? `<img src="${aLogo}" class="${aLogoStyle}" onerror="this.style.display='none'">` : `<i class="fa-solid fa-plus text-slate-600 hover:text-emerald-400 text-lg transition-colors"></i>`}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <!-- Silme Butonu -->
                                                <button onclick="removeKnockoutMatch('${tour.id}', '${ko.id}')" class="text-slate-600 hover:text-red-500 transition-colors p-1 sm:p-1.5 rounded-full sm:absolute sm:-right-2 sm:-top-2 sm:bg-slate-900 sm:border border-slate-700 sm:shadow-lg shrink-0" title="Turu Sil"><i class="fa-solid fa-xmark"></i></button>
                                            </div>
                                        `;
                                        }).join('');

                                        knockoutHtml = `
                                        <div class="bg-slate-950 rounded-lg border border-slate-700 p-2 text-xs mt-3 shadow-inner">
                                            <div class="flex justify-between items-center mb-2 border-b border-slate-800 pb-1 gap-2">
                                                <span class="text-[10px] text-slate-400 font-bold uppercase truncate"><i class="fa-solid fa-sitemap mr-1"></i>Eleme Aşamaları</span>
                                                <div class="flex gap-1 shrink-0">
                                                    ${!tableOn ? `<button type="button" onclick="toggleTournamentTable('\${tour.id}', true)" class="text-[9px] bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 px-2 py-0.5 rounded transition-colors" title="+ Grup / Lig Tablosu Ekle"><i class="fa-solid fa-table-list"></i></button>` : ''}
                                                    <button type="button" onclick="addKnockoutMatch('${tour.id}')" title="Tur Ekle" class="text-[9px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded transition-colors"><i class="fa-solid fa-plus"></i></button>
                                                    <button type="button" onclick="toggleTournamentKnockouts('${tour.id}', false)" class="text-[9px] bg-red-900/40 hover:bg-red-800 text-red-300 px-2 py-0.5 rounded transition-colors" title="Bu Bölümü Sil"><i class="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div class="space-y-2">
                                                ${koRows}
                                                ${tour.knockouts.length === 0 ? '<div class="text-[10px] text-slate-500 italic px-2">Henüz eleme maçı eklenmedi.</div>' : ''}
                                            </div>
                                        </div>`;
                                    } else if (tour.type === 'Süper Lig') {
                                        knockoutHtml = '';
                                    } else {
                                        if (!tableOn) {
                                            knockoutHtml = `
                                                <button onclick="toggleTournamentKnockouts('${tour.id}', true)" class="w-full text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-dashed border-slate-700 rounded py-2 mt-2 transition-colors">
                                                    <i class="fa-solid fa-plus mr-1"></i>Eleme Aşamaları Ekle
                                                </button>
                                            `;
                                        } else {
                                            knockoutHtml = '';
                                        }
                                    }

                                    const isCollapsed = tour.collapsed === true;

                                    const renderTopStatInner = (name, photo, score, icon, emptyLabel) => {
                                        if (!name) {
                                            return `<i class="fa-solid ${icon} text-yellow-400 text-[11px] shrink-0" style="filter: drop-shadow(0 0 4px rgba(250,204,21,0.85));"></i><span class="text-[10px] text-slate-500 italic">${emptyLabel} ekle</span>`;
                                        }
                                        const photoHtml = photo
                                            ? `<img src="${photo}" class="w-5 h-5 rounded-full object-cover bg-slate-800 shrink-0">`
                                            : `<div class="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[9px] font-bold shrink-0">${escapeHtml(name.charAt(0))}</div>`;
                                        return `<i class="fa-solid ${icon} text-yellow-400 text-[11px] shrink-0" style="filter: drop-shadow(0 0 4px rgba(250,204,21,0.85));"></i>${photoHtml}<span class="text-[10px] font-bold text-white truncate">${escapeHtml(homeShortName(name))}</span><span class="text-[10px] font-black text-yellow-400 shrink-0 ml-auto">${escapeHtml(score || '')}</span>`;
                                    };

                                    const topStatsHtml = `
                                        <div class="flex items-center gap-3 mt-2 pt-2 border-t border-slate-800">
                                            <div class="flex-1 flex items-center gap-1.5 min-w-0 cursor-pointer hover:bg-slate-800/60 rounded px-1 py-0.5 transition-colors" onclick="openTopStatModal('${tour.id}', 'scorer')" title="Gol Kralını Düzenle">
                                                ${renderTopStatInner(tour.topScorerName, tour.topScorerPhoto, tour.topScorerGoals, 'fa-futbol', 'Gol Kralı')}
                                            </div>
                                            <div class="w-px self-stretch bg-slate-800"></div>
                                            <div class="flex-1 flex items-center gap-1.5 min-w-0 cursor-pointer hover:bg-slate-800/60 rounded px-1 py-0.5 transition-colors" onclick="openTopStatModal('${tour.id}', 'assist')" title="Asist Kralını Düzenle">
                                                ${renderTopStatInner(tour.topAssistName, tour.topAssistPhoto, tour.topAssistAssists, 'fa-shoe-prints', 'Asist Kralı')}
                                            </div>
                                        </div>
                                    `;

                                    let champHtml = '';
                                    let champName = '';
                                    let champLogo = '';
                                    
                                    if (tour.knockouts && tour.knockouts.length > 0) {
                                        const finalMatch = tour.knockouts.find(k => k.stage === 'Final' || k.stage === 'F');
                                        if (finalMatch) {
                                            const hs1 = parseInt(finalMatch.homeScore);
                                            const as1 = parseInt(finalMatch.awayScore);
                                            const hs2 = parseInt(finalMatch.homeScore2);
                                            const as2 = parseInt(finalMatch.awayScore2);
                                            const hasL1 = !isNaN(hs1) && !isNaN(as1);
                                            const hasL2 = !isNaN(hs2) && !isNaN(as2);
                                            if (hasL1) {
                                                const hTotal = hs1 + (hasL2 ? as2 : 0);
                                                const aTotal = as1 + (hasL2 ? hs2 : 0);
                                                if (hTotal > aTotal) { champName = finalMatch.home; champLogo = finalMatch.homeLogo || getTeamLogoByName(finalMatch.home); }
                                                else if (aTotal > hTotal) { champName = finalMatch.away; champLogo = finalMatch.awayLogo || getTeamLogoByName(finalMatch.away); }
                                            }
                                        }
                                    }
                                    if (!champName && !knockoutOn && tour.table && tour.table.length > 0) {
                                        const topTeam = tour.table.find(t => t.rank == 1 || t.rank === '1') || tour.table[0];
                                        if (topTeam && topTeam.name && topTeam.name !== 'Takım Adı') {
                                            champName = topTeam.name;
                                            champLogo = topTeam.logo || getTeamLogoByName(topTeam.name);
                                        }
                                    }
                                    if (champName) {
                                        const photoTag = champLogo ? `<img src="${champLogo}" class="w-5 h-5 rounded-full object-cover shadow-sm bg-slate-800 border border-slate-700">` : `<div class="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">${champName.charAt(0)}</div>`;
                                        champHtml = `<div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900 px-3 py-0.5 rounded-full border border-yellow-500/50 shadow-[0_0_12px_rgba(234,179,8,0.4)] z-10 pointer-events-none"><i class="fa-solid fa-trophy text-yellow-500 text-xs drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]"></i>${photoTag}</div>`;
                                    }

                                    return `
                                    <div class="relative group/tour ${getCustomTournamentCardBg(tour.type)} p-2 rounded-lg border shadow-sm" ${tourCardStyle(tour.type)}>
                                        <div class="absolute -top-2 -left-2 flex flex-col gap-0.5 opacity-0 group-hover/tour:opacity-100 transition-opacity z-10">
                                            <button onclick="moveCustomTournament('${tour.id}', -1)" ${tIdx === 0 ? 'disabled' : ''} class="bg-slate-700 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center shadow-lg" title="Yukarı Taşı"><i class="fa-solid fa-chevron-up"></i></button>
                                            <button onclick="moveCustomTournament('${tour.id}', 1)" ${tIdx === cTours.length - 1 ? 'disabled' : ''} class="bg-slate-700 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center shadow-lg" title="Aşağı Taşı"><i class="fa-solid fa-chevron-down"></i></button>
                                        </div>
                                        <button onclick="deleteCustomTournament('${tour.id}')" class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover/tour:opacity-100 transition-opacity z-10 shadow-lg" title="Tüm Kartı Sil"><i class="fa-solid fa-times"></i></button>
                                        <h4 class="relative text-sm font-bold text-emerald-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between gap-2">
                                            <div class="flex items-center gap-1 min-w-0">
                                                ${tourLogoOf(tour.type) ? `<img src="${escapeHtml(tourLogoOf(tour.type))}" alt="" class="w-5 h-5 object-contain shrink-0" style="background:none;filter:none">` : ''}
                                                <select onchange="updateCustomTournamentName('${tour.id}', this)" class="tour-title-sel" title="Turnuvayı listeden seçin">${tourSelectOptions(tour.type, 'all')}</select>
                                            </div>
                                            ${champHtml}
                                            <button onclick="toggleCustomTournamentCollapse('${tour.id}')" class="p-1 hover:text-white cursor-pointer relative z-20" title="Daralt/Genişlet">
                                                <i id="tour-chevron-${tour.id}" class="fa-solid fa-chevron-down text-[10px] shrink-0 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}"></i>
                                            </button>
                                        </h4>
                                        <div id="tour-content-${tour.id}" class="transition-all duration-300 ${isCollapsed ? 'hidden' : ''}">
                                            ${tableSectionHtml}${knockoutHtml}${topStatsHtml}
                                        </div>
                                    </div>`;
                                }).join('');
                            })()}

                        </div>
                    </div>

                    <!-- 3. SAĞ PANEL: DİĞER LİGLER (İlk 4) -->
                    <div class="fx-panel hidden xl:flex flex-col bg-slate-900 border border-slate-700 rounded-b-xl rounded-tr-xl xl:rounded-xl overflow-hidden shadow-lg flex-1 min-h-0 xl:h-full relative z-0">
                        <div class="bg-slate-800 border-b border-slate-700 p-1.5 sm:p-3 shrink-0 flex justify-between items-center flex-wrap gap-2">
                            <h3 class="text-sm sm:text-lg font-bold text-white"><i class="fa-solid fa-globe mr-2 text-blue-400"></i>Diğer Ligler</h3>
                            <div class="flex items-center gap-2">
                                <button onclick="openEuroLeaguesBulkModal()" title="Toplu Ekle" class="bg-indigo-600 hover:bg-indigo-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors shadow flex items-center gap-1">
                                    <i class="fa-solid fa-list-ol"></i>
                                </button>
                                
                            </div>
                        </div>
                        <div class="p-2 sm:p-4 overflow-y-auto custom-scrollbar h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-1.5 sm:gap-4 content-start">
                            
                            ${euroSlots(activeFixtureSeason).map((lgName, euroSlotIdx) => {
                                const league = euroLeagueInfo(lgName);
                                const lData = (euroLeaguesData[activeFixtureSeason] && euroLeaguesData[activeFixtureSeason][league.name]) ? euroLeaguesData[activeFixtureSeason][league.name] : [{},{},{},{}];
                                const euChampName = (lData[0] && lData[0].name) ? String(lData[0].name) : '';
                                const euChampLogo = euChampName && typeof getTeamLogoByName === 'function' ? getTeamLogoByName(euChampName) : '';
                                
                                return `
                                <div class="euro-card bg-slate-950 p-2 sm:p-3 rounded-lg border border-slate-700 shadow-sm" data-collapsed="${euroIsCollapsed(league.name) ? 1 : 0}">
                                    <h4 onclick="toggleEuroLeague(this)" data-league="${league.name}" class="euro-head cursor-pointer select-none text-sm font-bold text-slate-200 mb-1 sm:mb-2 flex items-center gap-2 border-b border-slate-800 pb-1 sm:pb-2">
                                        ${euroFlagHtml(league)}<select class="el-sel" onclick="event.stopPropagation()" onchange="setEuroSlot('${activeFixtureSeason}', ${euroSlotIdx}, this.value)" title="Ligi değiştir">${euroLeagueOptions(league.name)}</select><span class="euro-badge ml-auto items-center gap-1.5 shrink-0 min-w-0">${euChampLogo ? `<i class="fa-solid fa-trophy text-yellow-500 text-[10px] drop-shadow-[0_0_4px_rgba(234,179,8,0.7)]"></i><img src="${euChampLogo}" alt="" title="${escapeHtml(euChampName)}" class="w-5 h-5 object-contain" onerror="this.style.display='none'">` : ''}</span><i class="euro-chev fa-solid fa-chevron-down text-[10px] text-slate-500 shrink-0 ${euChampLogo ? 'ml-1.5' : 'ml-auto'}"></i>
                                    </h4>
                                    <div class="euro-body space-y-1">
                                        ${[0,1,2,3].map(i => {
                                            const tName = lData[i].name || 'Takım Adı';
                                            const tPts = String(lData[i].pts || '0').replace(/\s*P$/i, '');
                                            const tLogo = lData[i].name && typeof getTeamLogoByName === 'function' ? getTeamLogoByName(lData[i].name) : '';
                                            const colors = ['emerald', 'blue', 'blue', 'orange'];
                                            return `
                                            <div class="flex justify-between items-center text-xs px-1.5 py-0.5 sm:p-1.5 hover:bg-slate-800 rounded transition-colors border-l-2 border-${colors[i]}-500">
                                                <div class="flex gap-2 items-center w-full min-w-0 pr-2">
                                                    <span class="w-4 text-center text-${colors[i]}-400 font-bold shrink-0">${i+1}</span><span class="eu-tlogo w-4 h-4 shrink-0 flex items-center justify-center">${tLogo ? `<img src="${tLogo}" alt="" class="w-4 h-4 object-contain" onerror="this.style.visibility='hidden'">` : ''}</span>
                                                    <span class="font-bold text-slate-300 w-full text-left outline-none focus:bg-slate-700 px-1 rounded cursor-text truncate" contenteditable="true" onblur="updateEuroLeague('${activeFixtureSeason}', '${league.name}', ${i}, 'name', this)" title="Takım Adını Düzenle" data-euro-team="1" data-eu-lg="${league.name}">${tName}</span>
                                                </div>
                                                <span class="font-bold text-${colors[i]}-400 outline-none focus:bg-slate-700 px-1 rounded cursor-text whitespace-nowrap shrink-0" contenteditable="true" onblur="updateEuroLeague('${activeFixtureSeason}', '${league.name}', ${i}, 'pts', this)" title="Puanı Düzenle" data-euro-pts="1">${tPts}</span>
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

            // Sekme durumunu en son bırakıldığı gibi ayarla
            switchFixtureTab(fixtureActiveTab);

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

            const dl = null; // artık açılır menü (select) kullanılıyor
            if (dl) dl.innerHTML = getFixtureTournaments().map(t => `<option value="${t}">`).join('');

            document.getElementById('fm-modal-subtitle').textContent = season + ' Sezonu';
            const deleteBtn = document.getElementById('fm-delete-btn');

            if (matchId) {
                document.getElementById('fm-modal-title').textContent = 'Fikstürü Düzenle';
                deleteBtn.classList.remove('hidden');
                const match = (fixtureData[season] || []).find(m => m.id === matchId);
                if (match) {
                    document.getElementById('fm-matchno').value = match.matchNo || '';
                    tourSetSelect('fm-tournament', match.tournament || '', 'all');
                    document.getElementById('fm-ground').value = match.ground || 'home';
                    document.getElementById('fm-home').value = match.home || '';
                    document.getElementById('fm-away').value = match.away || '';
                    document.getElementById('fm-opp-country').value = match.oppCountry || '';
                    document.getElementById('fm-round').value = match.round || '';
                }
            } else {
                document.getElementById('fm-modal-title').textContent = 'Fikstür Planla';
                deleteBtn.classList.add('hidden');
                document.getElementById('fm-matchno').value = '';
                tourSetSelect('fm-tournament', '', 'all');
                document.getElementById('fm-ground').value = 'home';
                document.getElementById('fm-home').value = managedTeams.kulup.name || '';
                document.getElementById('fm-away').value = '';
                document.getElementById('fm-opp-country').value = '';
                document.getElementById('fm-round').value = '';
            }

            const modal = document.getElementById('fixture-match-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureModal() {
            document.getElementById('fixture-match-modal').classList.add('hidden');
            document.getElementById('fixture-match-modal').classList.remove('flex');
        }

        // --- YENİ EKLENEN KOD: MÜKERRER HAFTALARI DÜZELTME MOTORU ---
        function autoSequenceTournamentRounds(season) {
            if (!fixtureData[season]) return;
            
            let tourCounters = {};

            fixtureData[season].forEach(m => {
                if (!m.tournament || !m.round) return;

                // Sadece lig usulü rakamlı haftaları yakala (Örn: "25", "25.", "25. Hafta", "Week 25")
                // "Son 16", "Çeyrek Final", "R1" gibi kupa formatlarını ETKİLEMEZ.
                const isLeagueRound = /^\s*(?:week|hafta|matchday)?\s*(\d+)\s*(?:\.|hafta|week)?\s*$/i.exec(m.round);
                
                if (isLeagueRound) {
                    let currentNum = parseInt(isLeagueRound[1]);
                    let tName = m.tournament;

                    if (tourCounters[tName] === undefined) {
                        tourCounters[tName] = currentNum;
                    } else {
                        // Eğer mevcut hafta sayısı, önceki haftadan küçük veya eşitse (Örn: 26'dan sonra 25 veya 26 gelirse)
                        if (currentNum <= tourCounters[tName]) {
                            tourCounters[tName]++;
                            // Metin içindeki rakamı güvenli şekilde güncel sıralı rakamla değiştir
                            m.round = m.round.replace(currentNum.toString(), tourCounters[tName].toString());
                        } else {
                            tourCounters[tName] = currentNum;
                        }
                    }
                }
            });
        }
        // -------------------------------------------------------------

        function saveFixtureMatch() {
            const matchNo = parseInt(document.getElementById('fm-matchno').value);
            const tournament = tourCanon(document.getElementById('fm-tournament').value.trim());
            const ground = document.getElementById('fm-ground').value;
            const home = document.getElementById('fm-home').value.trim();
            const away = document.getElementById('fm-away').value.trim();
            const oppCountry = document.getElementById('fm-opp-country').value.trim().toUpperCase();
            const round = document.getElementById('fm-round').value.trim();

            if (isNaN(matchNo)) { alert('Lütfen geçerli bir Maç No girin!'); return; }
            if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];

            const existingMatches = fixtureData[activeFixtureSeason];
            const isNew = !activeFixtureMatchId;
            const oldMatch = isNew ? null : existingMatches.find(m => m.id === activeFixtureMatchId);
            
            if (isNew || oldMatch.matchNo != matchNo) {
                existingMatches.forEach(m => {
                    if (parseInt(m.matchNo) >= matchNo && m.id !== activeFixtureMatchId) {
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
                    match.round = round;
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
                    round: round,
                    homeScore: '',
                    awayScore: '',
                    events: []
                };
                existingMatches.push(newMatch);
                syncFixtureToMatches(newMatch, activeFixtureSeason);
            }

            // Boşlukları kapatmak ve yeniden sıralamak için otomatik numaralandırma
            existingMatches.sort((a, b) => parseInt(a.matchNo) - parseInt(b.matchNo));
            existingMatches.forEach((m, idx) => {
                m.matchNo = (idx + 1).toString();
            });

            autoSequenceTournamentRounds(activeFixtureSeason); // YENİ
            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
            renderQuickFixtureBar();
        }

        function deleteFixtureMatch() {
            if (!confirm('Bu maç kaydını ve (varsa) içindeki skorları silmek istediğinize emin misiniz?')) return;
            removeFixtureFromMatches(activeFixtureMatchId, activeFixtureSeason);
            if (fixtureData[activeFixtureSeason]) {
                fixtureData[activeFixtureSeason] = fixtureData[activeFixtureSeason].filter(m => m.id !== activeFixtureMatchId);
                
                // Silme işleminden sonra sayısal boşlukları kapat
                fixtureData[activeFixtureSeason].sort((a, b) => parseInt(a.matchNo) - parseInt(b.matchNo));
                fixtureData[activeFixtureSeason].forEach((m, idx) => {
                    m.matchNo = (idx + 1).toString();
                });
            }
            
            autoSequenceTournamentRounds(activeFixtureSeason); // YENİ
            saveToLocalStorage();
            closeFixtureModal();
            renderFixturePanel();
            renderQuickFixtureBar();
        }

        function openMatchResultModal(season, matchId) {
            activeFixtureSeason = season;
            activeFixtureMatchId = matchId;
            
            const match = (fixtureData[season] || []).find(m => m.id === matchId);
            if (!match) return;

            const seasonLabel = escapeHtml(season);
            const tourLogoUrl = getCompetitionLogo(match.tournament);
            const tourLine = tourLogoUrl
                                ? `<img src="${tourLogoUrl}" alt="${escapeHtml(match.tournament || '')}" title="${escapeHtml(match.tournament || '')}" class="h-8 w-8 sm:h-9 sm:w-9 object-contain mt-0 sm:mt-1">`
                : `<span class="block text-[9px] sm:text-[11px] text-slate-400 font-semibold leading-tight">${escapeHtml(match.tournament || 'Diğer')}</span>`;
            document.getElementById('mr-modal-subtitle').innerHTML = `${tourLine}`;
            
            const homeLogo = getTeamLogoByName(match.home);
            const awayLogo = getTeamLogoByName(match.away);
            
            document.getElementById('mr-home-label').innerHTML = `<img src="${homeLogo}" title="${escapeHtml(match.home)}" class="h-16 sm:h-20 w-auto object-contain ml-auto drop-shadow-md">`;
            document.getElementById('mr-away-label').innerHTML = `<img src="${awayLogo}" title="${escapeHtml(match.away)}" class="h-16 sm:h-20 w-auto object-contain mr-auto drop-shadow-md">`;

            document.getElementById('mr-home-score').value = match.homeScore !== '' ? match.homeScore : '';
            document.getElementById('mr-away-score').value = match.awayScore !== '' ? match.awayScore : '';
            
            // Modal açılırken datalist'i, maçın Kulüp mü Milli Takım mı olduğuna göre filtrelenmiş kadroyla doldurur
            const datalist = document.getElementById('squad-players-list');
            if(datalist) datalist.innerHTML = getSquadDatalistOptions(getFixtureMatchContext(match));
            
            fixtureEventsTemp = match.events ? JSON.parse(JSON.stringify(match.events)) : [];
            renderRecentForm(match);
            renderFixtureEvents();

            const modal = document.getElementById('match-result-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            updateMatchResultColor();
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
            rerenderCurrentPanel();
            renderQuickFixtureBar();
        }

        function addFixtureEvent(type) {
            syncFixtureEvents();
            fixtureEventsTemp.push({ min: '', type: type || 'US', scorer: '', assist: '' });
            setTimeout(() => { const el = document.getElementById('fev_min_' + (fixtureEventsTemp.length - 1)); if (el) { el.focus(); el.scrollIntoView({ block: 'nearest' }); } }, 30);
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

            function fevMinKey(e, i) {
            if (e.key !== 'Tab' || e.shiftKey) return;
            e.preventDefault();
            syncFixtureEvents();
            const ev = fixtureEventsTemp[i];
            const n = v => (v === '' || v === undefined || isNaN(parseInt(v))) ? 9999 : parseInt(v);
            fixtureEventsTemp.sort((a, b) => n(a.min) - n(b.min));
            window._fevBusy = true;
            renderFixtureEvents();
            window._fevBusy = false;
            const el = document.getElementById('fev_scorer_' + fixtureEventsTemp.indexOf(ev));
            if (el) el.focus();
        }

        function fevMinChanged() {
            if (window._fevBusy) return;
            syncFixtureEvents();
            const n = v => (v === '' || v === undefined || isNaN(parseInt(v))) ? 9999 : parseInt(v);
            const before = fixtureEventsTemp.slice();
            fixtureEventsTemp.sort((a, b) => n(a.min) - n(b.min));
            if (before.every((e, k) => e === fixtureEventsTemp[k])) return;
            renderFixtureEvents();
        }

        function renderFixtureEvents() {
            const container = document.getElementById('fm-events-container');
            if (!container) return;
            if (fixtureEventsTemp.length === 0) {
                container.innerHTML = '<div class="text-center text-slate-600 text-xs py-4"><i class="fa-solid fa-futbol mr-1"></i>Henüz olay eklenmedi.</div>';
                updateScoreFromEvents();
                return;
            }
            const match = (fixtureData[activeFixtureSeason] || []).find(m => m.id === activeFixtureMatchId);
            let weAreHome = true;
            if (match) {
                const ctx = getFixtureMatchContext(match);
                const ourName = ctx === 'milli' ? (managedTeams.milli.name || '') : (managedTeams.kulup.name || '');
                weAreHome = match.home === ourName;
            }
            const rows = fixtureEventsTemp.map((ev, i) => {
                const cls = ev.type === 'US' ? 'us' : (ev.type === 'OG' ? 'og' : 'opp');
                const left = ev.type === 'US' ? weAreHome : !weAreHome;
                const ph = cls === 'us' ? 'Gol atan' : (cls === 'og' ? 'K.K. oyuncu' : 'Rakip golcü');
                const list = cls === 'opp' ? '' : 'list="squad-players-list"';
                const assist = cls === 'us'
                    ? `<input type="text" id="fev_assist_${i}" value="${escapeHtml(ev.assist || '')}" list="squad-players-list" placeholder="Asist" class="fev-in fev-as" autocomplete="off">`
                    : '';
                const card = `
                    <div class="fev-card ${cls} ${left ? 'l' : 'r'}" style="grid-column:${left ? 1 : 3};grid-row:${i + 1}">
                        <button type="button" tabindex="-1" class="fev-del" onclick="syncFixtureEvents(); removeFixtureEvent(${i})" title="Sil"><i class="fa-solid fa-xmark"></i></button>
                        <div class="fev-fields">
                            <input type="hidden" id="fev_type_${i}" value="${ev.type}">
                            <input type="text" id="fev_scorer_${i}" value="${escapeHtml(ev.scorer || '')}" ${list} placeholder="${ph}" oninput="syncFixtureEvents(); updateScoreFromEvents();" class="fev-in" autocomplete="off">
                            ${assist}
                        </div>
                    </div>`;
                const bub = `<div class="fev-bub ${cls}" style="grid-column:2;grid-row:${i + 1}"><input type="number" id="fev_min_${i}" value="${escapeHtml(String(ev.min ?? ''))}" placeholder="Dk" min="1" max="130" onchange="fevMinChanged()" onkeydown="fevMinKey(event, ${i})"></div>`;
                return bub + card;
            }).join('');
            container.innerHTML = `<div class="fev-tl">${rows}</div>`;
            updateScoreFromEvents();

            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 10);
        }

        function renderFixtureEventsLegacy() {
            const container = document.getElementById('fm-events-container');
            if (!container) return;
            if (fixtureEventsTemp.length === 0) {
                container.innerHTML = '<div class="text-center text-slate-600 text-xs py-4"><i class="fa-solid fa-futbol mr-1"></i>Henüz olay eklenmedi.</div>';
                updateScoreFromEvents();
                return;
            }
            container.innerHTML = fixtureEventsTemp.map((ev, i) => `
                <div class="flex flex-nowrap gap-1 sm:gap-2 items-center bg-slate-900 border border-slate-700 rounded p-1 sm:p-2.5 w-full">
                    <input type="number" id="fev_min_${i}" value="${ev.min}" placeholder="Dk"
                        class="w-8 sm:w-14 shrink-0 bg-slate-950 text-[10px] sm:text-xs text-white p-1 sm:p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500 appearance-none text-center" min="1" max="120">
                    <select id="fev_type_${i}" onchange="syncFixtureEvents(); updateScoreFromEvents();" class="w-12 sm:w-auto shrink-0 bg-slate-950 text-[10px] sm:text-xs text-white p-1 sm:p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500">
                        <option value="US" ${ev.type==='US'?'selected':''}>⚽ Biz</option>
                        <option value="OPP" ${ev.type==='OPP'?'selected':''}>⚽ Rak</option>
                        <option value="OG" ${ev.type==='OG'?'selected':''}>↩ K.K.</option>
                    </select>
                    <div class="flex flex-1 gap-1 min-w-0">
                        <input type="text" id="fev_scorer_${i}" value="${ev.scorer}" list="squad-players-list" placeholder="Gol atan" oninput="syncFixtureEvents(); updateScoreFromEvents();"
                            class="w-1/2 min-w-0 bg-slate-950 text-[10px] sm:text-xs text-white p-1 sm:p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500" autocomplete="off">
                        <input type="text" id="fev_assist_${i}" value="${ev.assist}" list="squad-players-list" placeholder="Asist"
                            class="w-1/2 min-w-0 bg-slate-950 text-[10px] sm:text-xs text-white p-1 sm:p-1.5 rounded border border-slate-600 outline-none focus:border-emerald-500" autocomplete="off">
                    </div>
                    <button onclick="syncFixtureEvents(); removeFixtureEvent(${i})" class="text-slate-500 hover:text-red-500 transition-colors px-1 shrink-0" title="Sil">
                        <i class="fa-solid fa-xmark text-xs sm:text-base"></i>
                    </button>
                </div>
            `).join('');
            updateScoreFromEvents();
            
            // Olay eklendiğinde içeriği görünür yapmak için otomatik en alta kaydır
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 10);
        }

        // Gol & Asist listesindeki olaylara göre skor kutucuklarını otomatik günceller
        function updateScoreFromEvents() {
            const match = (fixtureData[activeFixtureSeason] || []).find(m => m.id === activeFixtureMatchId);
            const homeScoreEl = document.getElementById('mr-home-score');
            const awayScoreEl = document.getElementById('mr-away-score');
            if (!match || !homeScoreEl || !awayScoreEl) return;

            const context = getFixtureMatchContext(match);
            const ourName = context === 'milli' ? (managedTeams.milli.name || '') : (managedTeams.kulup.name || '');
            const weAreHome = match.home === ourName;

            let homeGoals = 0, awayGoals = 0;
            fixtureEventsTemp.forEach(ev => {
                const valid = ev.scorer || ev.type === 'OPP' || ev.type === 'OG';
                if (!valid) return;
                if (ev.type === 'US') { weAreHome ? homeGoals++ : awayGoals++; }
                else if (ev.type === 'OPP') { weAreHome ? awayGoals++ : homeGoals++; }
                else if (ev.type === 'OG') { weAreHome ? awayGoals++ : homeGoals++; }
            });

            homeScoreEl.value = homeGoals;
            awayScoreEl.value = awayGoals;
            
            updateMatchResultColor();
        }

        function updateMatchResultColor() {
            const homeScoreVal = document.getElementById('mr-home-score').value;
            const awayScoreVal = document.getElementById('mr-away-score').value;
            const container = document.getElementById('mr-score-container');
            
            if (!container) return;

            // Önceki renk sınıflarını sıfırla
            container.className = 'flex items-center gap-2 rounded-lg px-3 py-2 border transition-all duration-300';

            // İki tarafta da skor girilmemişse boş (gri) haline döndür
            if (homeScoreVal === '' || awayScoreVal === '') {
                container.classList.add('bg-slate-800', 'border-slate-600');
                return;
            }

            const hs = parseInt(homeScoreVal);
            const as = parseInt(awayScoreVal);
            
            const match = (fixtureData[activeFixtureSeason] || []).find(m => m.id === activeFixtureMatchId);
            if (!match) return;

            const clubName = managedTeams.kulup.name || '';
            const nationalName = managedTeams.milli.name || '';
            const isOurTeam = (name) => name === clubName || (nationalName && name === nationalName);
            
            const isHome = isOurTeam(match.home);
            const isAway = isOurTeam(match.away);
            
            let resultLetter = '';
            if (isHome) resultLetter = hs > as ? 'W' : (hs < as ? 'L' : 'D');
            else if (isAway) resultLetter = as > hs ? 'W' : (as < hs ? 'L' : 'D');

            // Maçın gidişatına göre kutu rengini ve hafif parlama efektini ayarla
            if (resultLetter === 'W') {
                container.classList.add('bg-green-800', 'border-green-700', 'shadow-[0_0_15px_rgba(22,163,74,0.4)]');
            } else if (resultLetter === 'D') {
                container.classList.add('bg-yellow-600', 'border-yellow-500', 'shadow-[0_0_15px_rgba(234,179,8,0.4)]');
            } else if (resultLetter === 'L') {
                container.classList.add('bg-red-800', 'border-red-700', 'shadow-[0_0_15px_rgba(220,38,38,0.4)]');
            } else {
                container.classList.add('bg-slate-800', 'border-slate-600');
            }
        }

                // İki takım arasındaki daha önce oynanmış (skoru girilmiş) maçlardan son N tanesini döndürür (en yeni en sonda)
        function getHeadToHeadMatches(match, limit = 4) {
            if (!match) return [];
            const teamName = managedTeams.kulup.name || '';
            const nationalTeamName = managedTeams.milli.name || '';
            const isOurTeam = (name) => name === teamName || (nationalTeamName && name === nationalTeamName);
            const ourName = isOurTeam(match.home) ? match.home : match.away;
            const oppName = ourName === match.home ? match.away : match.home;
            if (!ourName || !oppName) return [];

            const results = [];
            Object.keys(fixtureData).forEach(season => {
                (fixtureData[season] || []).forEach(m => {
                    if (m.id === match.id) return;
                    if (m.homeScore === '' || m.awayScore === '' || m.homeScore == null || m.awayScore == null) return;
                    const isPair = (m.home === ourName && m.away === oppName) || (m.away === ourName && m.home === oppName);
                    if (!isPair) return;
                    results.push({ ...m, season });
                });
            });

            results.sort((a, b) => {
                const sA = seasonsList.indexOf(a.season), sB = seasonsList.indexOf(b.season);
                if (sA !== sB) return sA - sB;
                return (parseInt(a.matchNo) || 0) - (parseInt(b.matchNo) || 0);
            });

            return results.slice(-limit);
        }

        // Rakiple oynanmış geçmiş maçları, ana Fikstür panelindeki gibi (logo + renkli skor rozeti) küçük satırlar halinde çizer
        function renderRecentForm(match) {
            const container = document.getElementById('mr-recent-form');
            if (!container) return;

            const teamName = managedTeams.kulup.name || '';
            const nationalTeamName = managedTeams.milli.name || '';
            const isOurTeam = (name) => name === teamName || (nationalTeamName && name === nationalTeamName);

            const matches = getHeadToHeadMatches(match);
            if (matches.length === 0) {
                container.innerHTML = '<span class="text-[9px] text-slate-600 font-semibold">Geçmiş yok</span>';
                return;
            }

                        let tw = 0, td = 0, tl = 0;
            matches.forEach(m => {
                const h = parseInt(m.homeScore), a = parseInt(m.awayScore);
                if (isNaN(h) || isNaN(a)) return;
                const us = isOurTeam(m.home) ? h - a : (isOurTeam(m.away) ? a - h : null);
                if (us === null) return;
                if (us > 0) tw++; else if (us < 0) tl++; else td++;
            });
            const en = currentLang === 'en';
            const tallyHtml = `<div class="flex items-center justify-center gap-0.5 text-[8px] sm:text-[10px] font-black leading-none">
                    <span style="color:#22c55e">${tw}</span><span style="color:#64748b">/</span><span style="color:#fbbf24">${td}</span><span style="color:#64748b">/</span><span style="color:#ef4444">${tl}</span></div>`;
            const rowsHtml = matches.map((m, idx) => {
                const isLatest = idx === matches.length - 1;
                const hsDisplay = m.homeScore !== '' && m.homeScore != null ? m.homeScore : '-';
                const asDisplay = m.awayScore !== '' && m.awayScore != null ? m.awayScore : '-';

                let resultLetter = '';
                const hs = parseInt(m.homeScore), as = parseInt(m.awayScore);
                if (!isNaN(hs) && !isNaN(as)) {
                    if (isOurTeam(m.home)) resultLetter = hs > as ? 'W' : (hs < as ? 'L' : 'D');
                    else if (isOurTeam(m.away)) resultLetter = as > hs ? 'W' : (as < hs ? 'L' : 'D');
                }
                const scoreBgClass = resultLetter === 'W' ? 'bg-green-800 border-green-700 text-white' :
                                     resultLetter === 'D' ? 'bg-yellow-600 border-yellow-500 text-white' :
                                     resultLetter === 'L' ? 'bg-red-800 border-red-700 text-white' :
                                     'bg-slate-900 border-slate-700 text-slate-400';
                const glowClass = isLatest ? 'ring-1 ring-white/50 shadow-[0_0_6px_1px_rgba(255,255,255,0.45)]' : '';

                const homeLogo = getTeamLogoByName(m.home);
                const awayLogo = getTeamLogoByName(m.away);

                return `
                    <div class="flex items-center justify-end gap-0.5 sm:gap-1" title="${escapeHtml(m.season)} - ${escapeHtml(m.tournament || '')}${isLatest ? ' (' + (currentLang === 'en' ? 'Most Recent' : 'Son Maç') + ')' : ''}">
                        ${homeLogo ? `<img src="${homeLogo}" alt="${escapeHtml(m.home)}" class="w-3 h-3 sm:w-4 sm:h-4 object-contain shrink-0">` : ''}
                        <span class="inline-flex items-center justify-center font-black text-[7px] sm:text-[9px] rounded px-0.5 py-[1px] sm:px-1 sm:py-0.5 border shrink-0 min-w-[20px] sm:min-w-0 ${scoreBgClass} ${glowClass}">${hsDisplay}:${asDisplay}</span>
                        ${awayLogo ? `<img src="${awayLogo}" alt="${escapeHtml(m.away)}" class="w-3 h-3 sm:w-4 sm:h-4 object-contain shrink-0">` : ''}
                    </div>`;
            }).join('');

            container.innerHTML = `
                <div class="flex flex-col gap-0.5 sm:gap-1">${tallyHtml}${rowsHtml}</div>
            `;
        }

        function openFixtureBulkModal(season) {
            activeFixtureSeason = season;
            document.getElementById('fb-modal-subtitle').textContent = currentLang === 'en' ? 'Season ' + season : season + ' Sezonu';
            document.getElementById('fb-rows-container').innerHTML = ''; // Temizle
            
            // İlk açılışta 3 boş satır ekle
            addFixtureBulkRow();
            addFixtureBulkRow();
            addFixtureBulkRow();
            
            const modal = document.getElementById('fixture-bulk-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureBulkModal() {
            const modal = document.getElementById('fixture-bulk-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        
        function addFixtureBulkRow() {
            const container = document.getElementById('fb-rows-container');
            const rowCount = container.children.length;
            
            // Otomatik sıralı maç numarası belirleme
            const currentMatches = fixtureData[activeFixtureSeason] || [];
            let maxNo = 0;
            currentMatches.forEach(m => {
                const no = parseInt(m.matchNo);
                if (!isNaN(no) && no > maxNo) maxNo = no;
            });
            const defaultMatchNo = maxNo + rowCount + 1;
            
            const row = document.createElement('div');
            row.className = 'fb-row grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-950 p-2 rounded border border-slate-800 relative group';
            row.innerHTML = `
                <div class="col-span-1">
                    <input type="number" class="fb-matchno w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-center text-white focus:border-emerald-500 outline-none" placeholder="No" value="${defaultMatchNo}">
                </div>
                <div class="col-span-2">
                    <select onchange="tourSelChange(this, 'all')" class="fb-tournament w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"><option value="">Müsabaka Seç</option>${tourSelectOptions('', 'all')}</select>
                </div>
                <div class="col-span-2">
                    <select class="fb-ground w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-emerald-500 outline-none">
                        <option value="home">İç Saha</option>
                        <option value="away">Deplasman</option>
                        <option value="neutral">Tarafsız</option>
                    </select>
                </div>
                <div class="col-span-2">
                    <input type="text" list="global-team-datalist" class="fb-home w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-emerald-500 outline-none" placeholder="Ev Sahibi">
                </div>
                <div class="col-span-2">
                    <input type="text" list="global-team-datalist" class="fb-away w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-emerald-500 outline-none" placeholder="Deplasman">
                </div>
                <div class="col-span-2">
                    <input type="text" class="fb-round w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-emerald-500 outline-none" placeholder="Hafta / Aşama">
                </div>
                <div class="col-span-1 pr-6 sm:pr-0">
                    <input type="text" class="fb-country w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-center text-white focus:border-emerald-500 outline-none uppercase" placeholder="TR">
                </div>
                <button onclick="this.parentElement.remove()" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Satırı Sil"><i class="fa-solid fa-trash text-xs"></i></button>
            `;
            container.appendChild(row);
        }

        function deleteBulkFixtures() {
           if(!confirm("Toplu olarak eklenen TÜM maçları silmek istediğinize emin misiniz? (Tek tek eklenenler silinmeyecektir.)")) return;
            if(fixtureData[activeFixtureSeason]) {
                const toRemove = fixtureData[activeFixtureSeason].filter(m => m.id.startsWith('fx_bulk_'));
                toRemove.forEach(m => removeFixtureFromMatches(m.id, activeFixtureSeason));
                fixtureData[activeFixtureSeason] = fixtureData[activeFixtureSeason].filter(m => !m.id.startsWith('fx_bulk_'));
                
                // Silme işleminden sonra boşlukları kapat
                fixtureData[activeFixtureSeason].sort((a, b) => parseInt(a.matchNo) - parseInt(b.matchNo));
                fixtureData[activeFixtureSeason].forEach((m, idx) => {
                    m.matchNo = (idx + 1).toString();
                });
            }
            saveToLocalStorage();
            renderFixturePanel();
            renderQuickFixtureBar();
        }

        function saveBulkFixtures() {
            const rows = document.querySelectorAll('.fb-row');
            if (rows.length === 0) { alert('Eklenecek satır bulunamadı!'); return; }

            const btn = document.querySelector('#fixture-bulk-modal button.bg-blue-600');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Ekleniyor...';
            btn.disabled = true;

            setTimeout(() => {
                let addedCount = 0;
                
                if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];

                rows.forEach(row => {
                    const matchNoStr = row.querySelector('.fb-matchno').value.trim();
                    const matchNo = parseInt(matchNoStr) || 999;
                    const tournament = row.querySelector('.fb-tournament').value.trim();
                    const ground = row.querySelector('.fb-ground').value;
                    const home = row.querySelector('.fb-home').value.trim();
                    const away = row.querySelector('.fb-away').value.trim();
                    const round = row.querySelector('.fb-round').value.trim();
                    const oppCountryRaw = row.querySelector('.fb-country').value.trim();
                    const oppCountry = oppCountryRaw ? normalizeCountryInput(oppCountryRaw) : ''; 
                    
                    if (home && away) {
                        // Yeni eklenen maça yer açmak için aynı veya daha büyük sıradaki mevcut maçları kaydır
                        fixtureData[activeFixtureSeason].forEach(m => {
                            if (parseInt(m.matchNo) >= matchNo) {
                                m.matchNo = (parseInt(m.matchNo) + 1).toString();
                            }
                        });

                        const newMatch = {
                            id: 'fx_bulk_' + Date.now() + '_' + addedCount,
                            matchNo: matchNo.toString(), 
                            tournament: tournament,
                            ground: ground,
                            home: home,
                            away: away,
                            oppCountry: oppCountry, 
                            round: round,
                            homeScore: '',
                            awayScore: '',
                            events: []
                        };
                        fixtureData[activeFixtureSeason].push(newMatch);
                        syncFixtureToMatches(newMatch, activeFixtureSeason);
                        addedCount++;
                    }
                });

                // İşlem sonunda sıralamayı kesinleştir ve boşlukları kapat
                fixtureData[activeFixtureSeason].sort((a, b) => parseInt(a.matchNo) - parseInt(b.matchNo));
                fixtureData[activeFixtureSeason].forEach((m, idx) => {
                    m.matchNo = (idx + 1).toString();
                });

                autoSequenceTournamentRounds(activeFixtureSeason); // YENİ
                btn.innerHTML = originalHtml;
                btn.disabled = false;

                if (addedCount > 0) {
                    saveToLocalStorage();
                    closeFixtureBulkModal();
                    renderFixturePanel();
                    renderQuickFixtureBar();
                } else {
                    alert('Geçerli maç bulunamadı. Lütfen Ev Sahibi ve Deplasman alanlarını kontrol edin.');
                }
            }, 50); 
        }

        function openFixtureTextBulkModal(season) {
            activeFixtureSeason = season;
            document.getElementById('ftb-modal-subtitle').textContent = currentLang === 'en' ? 'Season ' + season : season + ' Sezonu';
            document.getElementById('ftb-textarea').value = '';
            
            const modal = document.getElementById('fixture-text-bulk-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFixtureTextBulkModal() {
            const modal = document.getElementById('fixture-text-bulk-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function saveFixtureTextBulk() {
            const text = document.getElementById('ftb-textarea').value.trim();
            if (!text) { alert('Lütfen eklenecek maçları girin!'); return; }

            const btn = document.querySelector('#fixture-text-bulk-modal button.bg-blue-600');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Ekleniyor...';
            btn.disabled = true;

            setTimeout(() => {
                let addedCount = 0;
                
                if (!fixtureData[activeFixtureSeason]) fixtureData[activeFixtureSeason] = [];

                const lines = text.split('\n');
                lines.forEach(line => {
                    if (!line.trim()) return;
                    // Virgülle ayır, boşlukları temizle
                    const parts = line.split(',').map(s => s.trim());
                    
                    if (parts.length >= 5) {
                        const matchNoStr = parts[0];
                        const matchNo = parseInt(matchNoStr) || 999;
                        const tournament = tourCanon(parts[1] || '');
                        
                        // Zemin (Ground) algılama
                        let rawGround = (parts[2] || '').toLowerCase();
                        let ground = 'neutral';
                        if (rawGround.includes('home') || rawGround.includes('iç')) ground = 'home';
                        else if (rawGround.includes('away') || rawGround.includes('dep')) ground = 'away';
                        
                        const home = parts[3] || '';
                        const away = parts[4] || '';
                        const round = parts[5] || '';
                        const oppCountryRaw = parts[6] || '';
                        const oppCountry = oppCountryRaw ? normalizeCountryInput(oppCountryRaw) : '';
                        
                        if (home && away) {
                            // Yeni eklenen maça yer açmak için aynı veya daha büyük sıradaki mevcut maçları kaydır
                            fixtureData[activeFixtureSeason].forEach(m => {
                                if (parseInt(m.matchNo) >= matchNo) {
                                    m.matchNo = (parseInt(m.matchNo) + 1).toString();
                                }
                            });

                            const newMatch = {
                                id: 'fx_text_' + Date.now() + '_' + addedCount,
                                matchNo: matchNo.toString(), 
                                tournament: tournament,
                                ground: ground,
                                home: home,
                                away: away,
                                oppCountry: oppCountry, 
                                round: round,
                                homeScore: '',
                                awayScore: '',
                                events: []
                            };
                            fixtureData[activeFixtureSeason].push(newMatch);
                            syncFixtureToMatches(newMatch, activeFixtureSeason);
                            addedCount++;
                        }
                    }
                });

                // İşlem sonunda sıralamayı kesinleştir ve boşlukları kapat
                fixtureData[activeFixtureSeason].sort((a, b) => parseInt(a.matchNo) - parseInt(b.matchNo));
                fixtureData[activeFixtureSeason].forEach((m, idx) => {
                    m.matchNo = (idx + 1).toString();
                });

                autoSequenceTournamentRounds(activeFixtureSeason); // YENİ
                btn.innerHTML = originalHtml;
                btn.disabled = false;

                if (addedCount > 0) {
                    saveToLocalStorage();
                    closeFixtureTextBulkModal();
                    renderFixturePanel();
                    renderQuickFixtureBar();
                } else {
                    alert('Geçerli maç bulunamadı. Lütfen sıralamanın şu formata uyduğundan emin olun:\nMaç No, Müsabaka, Home/Away/Neutral, Ev Sahibi, Deplasman, (Hafta), (Ülke)');
                }
            }, 50);
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

        // --- MİLLİ TAKIM TOPLU CAP EKLEME ---
function openNationalCapsBulkModal() {
    document.getElementById('national-caps-bulk-input').value = '';
    const modal = document.getElementById('national-caps-bulk-modal');
    modal.classList.remove('hidden'); 
    modal.classList.add('flex');
}

function closeNationalCapsBulkModal() {
    const modal = document.getElementById('national-caps-bulk-modal');
    modal.classList.add('hidden'); 
    modal.classList.remove('flex');
}

function processNationalCapsBulkInput() {
    const text = document.getElementById('national-caps-bulk-input').value;
    if (!text.trim()) { alert('Lütfen oyuncu isimlerini girin!'); return; }

    const lines = text.split('\n');
    let updatedCount = 0;
    let notFound = [];

    lines.forEach(line => {
        const name = line.trim();
        if (!name) return;
        
        // Milli kadroda ismi bul (büyük/küçük harf duyarsız)
        const player = squadData.milli.find(p => (p.name || '').toLowerCase() === name.toLowerCase());
        if (player) {
            player.caps = (parseInt(player.caps) || 0) + 1;
            updatedCount++;
        } else {
            notFound.push(name);
        }
    });

    if (updatedCount > 0) {
        saveToLocalStorage();
        renderSquadGrid();
        closeNationalCapsBulkModal();
        let msg = `${updatedCount} oyuncunun milli takım maç sayısı (caps) 1 artırıldı!`;
        if (notFound.length > 0) {
            msg += `\n\nŞu oyuncular kadroda bulunamadı:\n${notFound.join(', ')}`;
        }
        alert(msg);
    } else {
        alert('Listede eşleşen hiçbir oyuncu bulunamadı. İsimleri kontrol edip tekrar deneyin.');
    }
}

// --- İLK 11 FORMASYON SİSTEMİ ---
const defaultFormation = [
    { x: 50, y: 88, name: '', pos: 'GK' },
    { x: 20, y: 70, name: '', pos: 'LB' },
    { x: 38, y: 75, name: '', pos: 'CB' },
    { x: 62, y: 75, name: '', pos: 'CB' },
    { x: 80, y: 70, name: '', pos: 'RB' },
    { x: 35, y: 50, name: '', pos: 'CM' },
    { x: 65, y: 50, name: '', pos: 'CM' },
    { x: 20, y: 25, name: '', pos: 'LW' },
    { x: 50, y: 30, name: '', pos: 'CAM' },
    { x: 80, y: 25, name: '', pos: 'RW' },
    { x: 50, y: 12, name: '', pos: 'ST' }
];

function defaultFormationFor(ctx) {
    if (ctx === 'akademi') return [
        { x: 50, y: 85, name: '', pos: 'GK' },
        { x: 15, y: 45, name: '', pos: 'LM' },
        { x: 35, y: 50, name: '', pos: 'CM' },
        { x: 65, y: 50, name: '', pos: 'CM' },
        { x: 85, y: 45, name: '', pos: 'RM' }
    ];
    return defaultFormation;
}
let activeFormationContext = null;
let tempFormation = [];
let isDraggingFormationNode = false;
let draggedNodeIndex = null;
let activeFormationNodeIndex = null;

function closeKadrolarMenu() {
    const dd = document.getElementById('kadrolar-dropdown');
    if (dd) dd.classList.add('hidden');
}
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('kadrolar-menu-wrapper');
    if (wrapper && !wrapper.contains(e.target)) closeKadrolarMenu();
});

function openFormationModal(kadroType = 'ilk11') {
    activeFormationContext = squadContext;
    activeFormationType = kadroType;
    document.getElementById('formation-title').innerText = (squadContext === 'astakim' ? 'As Takım' : (squadContext === 'akademi' ? 'Akademi' : 'Milli Takım')) + ' Kadroları';
    
    if (!formations) formations = { astakim: { ilk11: null, yedek: null, rezerv: null }, milli: { ilk11: null, yedek: null, rezerv: null } };
    if (!formations[activeFormationContext]) formations[activeFormationContext] = { ilk11: null, yedek: null, rezerv: null };

    tempFormationsAll = {
        ilk11: JSON.parse(JSON.stringify(formations[activeFormationContext].ilk11 || defaultFormationFor(activeFormationContext))),
        yedek: JSON.parse(JSON.stringify(formations[activeFormationContext].yedek || defaultFormationFor(activeFormationContext))),
        rezerv: JSON.parse(JSON.stringify(formations[activeFormationContext].rezerv || defaultFormationFor(activeFormationContext)))
    };
    tempFormation = tempFormationsAll[activeFormationType];
    
    // Eski kayıtlarda pozisyon yoksa varsayılanı ata
    tempFormation.forEach((node, idx) => {
        if (node.pos === undefined || node.pos === '') {
            node.pos = defaultFormationFor(activeFormationContext)[idx] ? defaultFormationFor(activeFormationContext)[idx].pos : 'POS';
        }
    });
    
    updateMockPlayers(); 
    renderFormationTabs();
    renderFormationNodes();
    closeFormationSelector();
    
    const modal = document.getElementById('formation-modal');
    modal.classList.remove('hidden'); 
    modal.classList.add('flex');
}

function switchFormationType(type) {
    closeFormationSelector();
    activeFormationType = type;
    tempFormation = tempFormationsAll[type];
    tempFormation.forEach((node, idx) => {
        if (node.pos === undefined || node.pos === '') {
            node.pos = defaultFormationFor(activeFormationContext)[idx] ? defaultFormationFor(activeFormationContext)[idx].pos : 'POS';
        }
    });
    renderFormationTabs();
    renderFormationNodes();
}

function renderFormationTabs() {
    ['ilk11', 'yedek', 'rezerv'].forEach(t => {
        const btn = document.getElementById('ftab-' + t);
        if (!btn) return;
        if (t === activeFormationType) {
            btn.className = 'formation-tab-btn px-3 py-1 rounded-full text-xs font-bold border transition-all bg-emerald-600 text-white border-emerald-500';
        } else {
            btn.className = 'formation-tab-btn px-3 py-1 rounded-full text-xs font-bold border transition-all bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-white';
        }
    });
}

function closeFormationModal() {
    const modal = document.getElementById('formation-modal');
    modal.classList.add('hidden'); 
    modal.classList.remove('flex');
}

function saveFormation() {
    if (!formations[activeFormationContext]) formations[activeFormationContext] = { ilk11: null, yedek: null, rezerv: null };
    formations[activeFormationContext].ilk11 = tempFormationsAll.ilk11;
    formations[activeFormationContext].yedek = tempFormationsAll.yedek;
    formations[activeFormationContext].rezerv = tempFormationsAll.rezerv;
    saveToLocalStorage();
    closeFormationModal();
}

function resetFormation() {
    if(confirm('Bu sekmedeki (' + (KADRO_TYPE_LABELS[activeFormationType] || activeFormationType) + ') dizilişi ve oyuncuları sıfırlamak istediğinize emin misiniz?')) {
        tempFormationsAll[activeFormationType] = JSON.parse(JSON.stringify(defaultFormationFor(activeFormationContext)));
        tempFormation = tempFormationsAll[activeFormationType];
        renderFormationNodes();
        closeFormationSelector();
    }
}

const AGE_TIER_COLORS = [
    { max: 15, color: '#60a5fa' }, { max: 18, color: '#93c5fd' }, { max: 21, color: '#4ade80' },
    { max: 24, color: '#86efac' }, { max: 26, color: '#d9f99d' }, { max: 29, color: '#fde047' },
    { max: 32, color: '#fdba74' }, { max: 35, color: '#fca5a5' }, { max: 999, color: '#d8b4fe' }
];
function getAgeColor(age) {
    const n = parseInt(age) || 0;
    const tier = AGE_TIER_COLORS.find(t => n <= t.max);
    return tier ? tier.color : '#d8b4fe';
}

const OVR_TIER_COLORS = [
    { min: 95, color: '#1e3a8a' }, { min: 90, color: '#3b82f6' }, { min: 85, color: '#15803d' },
    { min: 80, color: '#4ade80' }, { min: 75, color: '#a3e635' }, { min: 70, color: '#facc15' },
    { min: 65, color: '#fb923c' }, { min: 60, color: '#c2410c' }, { min: 55, color: '#ef4444' },
    { min: 50, color: '#7f1d1d' }, { min: 0,  color: '#7e22ce' }
];
function getOvrColor(ovr) {
    const n = parseInt(ovr) || 0;
    const tier = OVR_TIER_COLORS.find(t => n >= t.min);
    return tier ? tier.color : '#7e22ce';
}

// Formasyon panelinde gösterilecek "güncel" yaş/OVR - squad grid'deki aynı mantık
function getPlayerCurrentStatsByName(name, context) {
    if (!name) return { age: null, ovr: null };
    let pool = context === 'milli' ? (squadData.milli || []) : [...(squadData.astakim || []), ...(squadData.akademi || [])];
    const p = pool.find(pl => (pl.name || '').toLowerCase() === name.trim().toLowerCase());
    if (!p) return { age: null, ovr: null };

    let currentAge = p.joinAge;
    let currentOvr = p.joinOvr;
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
    return { age: currentAge, ovr: currentOvr };
}

function renderFormationNodes() {
    const container = document.getElementById('formation-nodes');
    container.innerHTML = '';
    container.classList.add('xi-scope');

    tempFormation.forEach((node, index) => {
        const pc = homeXiPosColor(node.pos);
        const photo = node.name ? getPlayerPhotoByName(node.name) : '';
        const photoHtml = photo
            ? `<img src="${photo}" alt="" class="xi-img" draggable="false">`
            : `<div class="xi-ph">${node.name ? escapeHtml(node.name.charAt(0).toUpperCase()) : '+'}</div>`;
        let ovrHtml = '<b class="xi-ovr" style="color:#64748b">-</b>';
        if (node.name) {
            const cur = getPlayerCurrentStatsByName(node.name, activeFormationContext);
            const hasOvr = cur && cur.ovr !== null && cur.ovr !== undefined && cur.ovr !== '';
            if (hasOvr) ovrHtml = `<b class="xi-ovr" style="color:${mbOvrColor(cur.ovr)}">${escapeHtml(String(cur.ovr))}</b>`;
        }
        const nodeEl = document.createElement('div');
        nodeEl.className = 'xi-card xi-edit group';
        nodeEl.style.setProperty('--c', pc);
        nodeEl.style.left = node.x + '%';
        nodeEl.style.top = node.y + '%';
        nodeEl.innerHTML = `
            <div class="xi-top">${ovrHtml}<span id="node-pos-badge-${index}" class="xi-pos" style="color:${pc}">${escapeHtml(node.pos || 'POS')}</span></div>
            <div class="xi-photo">${photoHtml}</div>
            <div class="xi-name">${node.name ? escapeHtml(homeSurname(node.name)) : 'Seç'}</div>
            <div class="xi-pen" onclick="promptFormationPlayer(${index}, event)" title="Düzenle"><i class="fa-solid fa-pen"></i></div>
        `;
        nodeEl.addEventListener('mousedown', (e) => startDragNode(e, index, nodeEl));
        nodeEl.addEventListener('touchstart', (e) => startDragNode(e.touches[0], index, nodeEl), {passive: false});
        container.appendChild(nodeEl);
    });
}

function renderFormationNodesOld() {
    const container = document.getElementById('formation-nodes');
    container.innerHTML = '';
    
    tempFormation.forEach((node, index) => {
        let pPhoto = '';
        let pNameDisplay = node.name ? escapeHtml(formatShortPlayerName(node.name)) : 'Seç';
        
        if (node.name) pPhoto = getPlayerPhotoByName(node.name);

        let photoHtml = pPhoto 
            ? `<img src="${pPhoto}" class="w-[72px] h-[72px] rounded-full object-cover border-[5px] border-slate-900 bg-slate-900 shadow-lg draggable-none" draggable="false">` 
            : `<div class="w-[72px] h-[72px] rounded-full bg-slate-800 border-[5px] border-slate-600 flex items-center justify-center text-xl font-black text-white shadow-lg">${node.name ? node.name.charAt(0).toUpperCase() : '+'}</div>`;

        let ageOvrHtml = '';
        if (node.name) {
            const stats = getPlayerCurrentStatsByName(node.name, activeFormationContext);
            const ageColor = getAgeColor(stats.age);
            const ovrColor = getOvrColor(stats.ovr);
            ageOvrHtml = `
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-black border-2 border-slate-900 shadow-md shrink-0" style="background-color:${ageColor}" title="Yaş">${stats.age || '-'}</span>
            `;
            var ovrBadgeHtml = `
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-black border-2 border-slate-900 shadow-md shrink-0" style="background-color:${ovrColor}" title="OVR">${stats.ovr || '-'}</span>
            `;
        } else {
            var ovrBadgeHtml = '';
        }

        const nodeEl = document.createElement('div');
        nodeEl.className = 'absolute flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-10 group hover:z-20';
        nodeEl.style.left = node.x + '%';
        nodeEl.style.top = node.y + '%';
        
        nodeEl.innerHTML = `
            ${photoHtml}
            <div class="relative -mt-1 z-40 flex items-center gap-1 pointer-events-none">
                ${ageOvrHtml}
                <div id="node-pos-badge-${index}" class="bg-slate-900 pos-${node.pos || 'POS'} text-[11px] font-black px-2 py-[1px] rounded border border-slate-600 shadow-md tracking-wider">${node.pos || 'POS'}</div>
                ${ovrBadgeHtml}
            </div>
            <div class="mt-0 bg-black/80 text-white text-sm font-bold px-3 py-1 rounded truncate max-w-[150px] border border-white/10 pointer-events-none relative z-30">${pNameDisplay}</div>
            <div class="absolute -top-1 -right-3 bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer shadow-xl transition-opacity z-50" onclick="promptFormationPlayer(${index}, event)" title="Düzenle"><i class="fa-solid fa-pen"></i></div>
        `;

        nodeEl.addEventListener('mousedown', (e) => startDragNode(e, index, nodeEl));
        nodeEl.addEventListener('touchstart', (e) => startDragNode(e.touches[0], index, nodeEl), {passive: false});

        container.appendChild(nodeEl);
    });
}

function promptFormationPlayer(index, event) {
    event.stopPropagation();
    activeFormationNodeIndex = index;
    const selector = document.getElementById('formation-player-selector');
    const input = document.getElementById('formation-player-input');
    const posInput = document.getElementById('formation-pos-input');
    
    input.value = tempFormation[index].name || '';
    posInput.value = tempFormation[index].pos || '';
    
    let x = tempFormation[index].x;
    let y = tempFormation[index].y;
    
    let leftOffset = x < 50 ? 'calc(' + x + '% + 45px)' : 'calc(' + x + '% - 265px)';
    let topOffset = y < 50 ? 'calc(' + y + '% + 25px)' : 'calc(' + y + '% - 115px)';
    
    selector.style.left = leftOffset;
    selector.style.top = topOffset;
    
    selector.classList.remove('hidden');
    
    // Açıldığında doğrudan pozisyona göre öneri yapsın diye manuel tetikliyoruz
    triggerFormationAutocomplete(input.value);
    setTimeout(() => input.focus(), 50);
}

function applyFormationPlayer() {
    if (activeFormationNodeIndex !== null) {
        tempFormation[activeFormationNodeIndex].name = document.getElementById('formation-player-input').value.trim();
        renderFormationNodes();
    }
    closeFormationSelector();
}

function clearFormationPlayer() {
    if (activeFormationNodeIndex !== null) {
        tempFormation[activeFormationNodeIndex].name = '';
        renderFormationNodes();
    }
    closeFormationSelector();
}

function closeFormationSelector() {
    const selector = document.getElementById('formation-player-selector');
    if (selector) selector.classList.add('hidden');
    activeFormationNodeIndex = null;
}

function startDragNode(e, index, nodeEl) {
    if (e.target.closest('.xi-pen') || e.target.closest('button')) return;
    
    isDraggingFormationNode = true;
    draggedNodeIndex = index;
    closeFormationSelector(); 
    
    nodeEl.classList.add('cursor-grabbing');
    nodeEl.classList.remove('cursor-grab');

    const container = document.getElementById('pitch-container');
    const rect = container.getBoundingClientRect();

    function onMove(ev) {
        if (!isDraggingFormationNode) return;
        ev.preventDefault(); 
        
        let clientX = ev.clientX || (ev.touches && ev.touches[0].clientX);
        let clientY = ev.clientY || (ev.touches && ev.touches[0].clientY);
        
        let x = ((clientX - rect.left) / rect.width) * 100;
        let y = ((clientY - rect.top) / rect.height) * 100;
        
        if(x < 2) x = 2; if(x > 98) x = 98;
        if(y < 2) y = 2; if(y > 98) y = 98;

        // Görünmez Grid (Izgara) Snap Sistemi: Kartları 5% adımlarla hizalar
        const GRID_STEP = 5;
        x = Math.round(x / GRID_STEP) * GRID_STEP;
        y = Math.round(y / GRID_STEP) * GRID_STEP;

        tempFormation[draggedNodeIndex].x = x;
        tempFormation[draggedNodeIndex].y = y;
        
        nodeEl.style.left = x + '%';
        nodeEl.style.top = y + '%';

        // Konuma göre dinamik mevki (POS) belirleme motoru
        let newPos = 'POS';
        if (y >= 85) {
            newPos = 'GK';
        } else if (y >= 65) {
            if (x <= 25) newPos = y <= 75 ? 'LWB' : 'LB';
            else if (x >= 75) newPos = y <= 75 ? 'RWB' : 'RB';
            else newPos = 'CB';
        } else if (y >= 35) {
            if (x <= 25) newPos = 'LM';
            else if (x >= 75) newPos = 'RM';
            else if (y >= 55) newPos = 'DM';
            else if (y <= 45) newPos = 'AM';
            else newPos = 'CM';
        } else {
            if (x <= 30) newPos = 'LW';
            else if (x >= 70) newPos = 'RW';
            else if (y >= 20) newPos = 'CF';
            else newPos = 'ST';
        }

        // Mevki değiştiyse anında rozeti (badge) güncelle
        if (tempFormation[draggedNodeIndex].pos !== newPos) {
            tempFormation[draggedNodeIndex].pos = newPos;
            const badge = document.getElementById(`node-pos-badge-${draggedNodeIndex}`);
            if (badge) {
                badge.innerText = newPos;
                badge.style.color = homeXiPosColor(newPos);
                nodeEl.style.setProperty('--c', homeXiPosColor(newPos));
            }
        }
    }

    function onEnd() {
        if (!isDraggingFormationNode) return;
        isDraggingFormationNode = false;
        draggedNodeIndex = null;
        
        nodeEl.classList.remove('cursor-grabbing');
        nodeEl.classList.add('cursor-grab');
        
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, {passive: false});
    document.addEventListener('touchend', onEnd);
}

function showFormationList() {
    // Sadece ismi atanmış olan oyuncuları filtrele
    const players = tempFormation.filter(node => node.name && node.name.trim() !== '');
    
    if (players.length === 0) {
        alert('Sahada henüz oyuncu bulunmuyor.');
        return;
    }
    
    // Numaralı bir liste metni oluştur
    const listText = players.map((node, index) => `${node.name}`).join('\n');
    
    // Panoya (clipboard) kopyala ve kullanıcıya göster
    navigator.clipboard.writeText(listText).then(() => {
        alert(`İlk 11 listesi panoya kopyalandı!\n\n${listText}`);
    }).catch(err => {
        // Eğer tarayıcı panoya kopyalamaya izin vermezse sadece listeyi göster
        alert(`İlk 11 Listesi:\n\n${listText}`);
    });
}

// --- FORMASYON ÖZEL OTOMATİK TAMAMLAMA MOTORU ---
let formationAutocompleteFocusIndex = -1;

function triggerFormationAutocomplete(val) {
    formationAutocompleteFocusIndex = -1;
    const dropdown = document.getElementById('formation-autocomplete-dropdown');
    const posVal = document.getElementById('formation-pos-input').value.trim().toUpperCase();
    
    // Doğru kadroyu çek (Milli vs Kulüp)
    let squadPls = activeFormationContext === 'milli' ? (squadData.milli || []) : activeFormationContext === 'akademi' ? (squadData.akademi || []) : [...(squadData.astakim || []), ...(squadData.akademi || [])];
    squadPls = squadPls.filter(p => p.name);

    let matches = [];

    // Eğer input boşsa, belirtilen mevki ve o mevki grubuna yakın oyuncuları öner
    if (val.trim() === '') {
        const similarPositions = {
            'GK': ['GK'],
            'CB': ['CB', 'LB', 'RB', 'DM'],
            'LB': ['LB', 'LWB', 'CB', 'LM'],
            'RB': ['RB', 'RWB', 'CB', 'RM'],
            'LWB': ['LWB', 'LB', 'LM'],
            'RWB': ['RWB', 'RB', 'RM'],
            'DM': ['DM', 'CM', 'CB'],
            'CM': ['CM', 'DM', 'AM'],
            'AM': ['AM', 'CM', 'LM', 'RM', 'CAM'],
            'CAM': ['CAM', 'AM', 'CM', 'LM', 'RM', 'ST'],
            'LM': ['LM', 'LW', 'LWB', 'RM', 'AM'],
            'RM': ['RM', 'RW', 'RWB', 'LM', 'AM'],
            'LW': ['LW', 'LM', 'RW', 'ST', 'LF', 'CF'],
            'RW': ['RW', 'RM', 'LW', 'ST', 'RF', 'CF'],
            'ST': ['ST', 'CF', 'LW', 'RW'],
            'CF': ['CF', 'ST', 'CAM', 'LW', 'RW']
        };

        let allowedPos = similarPositions[posVal] || [posVal];
        
        matches = squadPls.filter(p => {
            if (!p.pos) return false;
            return allowedPos.includes(p.pos.toUpperCase());
        });

        matches.sort((a, b) => (parseInt(b.joinOvr) || 0) - (parseInt(a.joinOvr) || 0));
        
    } else {
        matches = squadPls.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
        
        // --- YENİ: Eğer kullanıcı tam olarak doğru ismi yazdıysa (veya sildikçe eşleşiyorsa), mevkiyi otomatik güncelle ---
        const exactMatch = matches.find(p => p.name.toLowerCase() === val.toLowerCase().trim());
        if (exactMatch && exactMatch.pos) {
            document.getElementById('formation-pos-input').value = exactMatch.pos;
        }
    }

    if (matches.length === 0) {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('flex');
        return;
    }

    dropdown.innerHTML = matches.map(p => `
        <div class="formation-ac-item px-3 py-2 border-b border-slate-700/50 hover:bg-emerald-600 cursor-pointer transition-colors flex justify-between items-center" data-pname="${escapeHtml(p.name)}" data-ppos="${escapeHtml(p.pos || '')}" onclick="selectFormationAutocomplete(this.dataset.pname, this.dataset.ppos)">
            <span class="font-bold text-xs truncate">${escapeHtml(p.name)}</span>
            <span class="text-[9px] font-black text-slate-300 bg-slate-900/50 px-1.5 py-0.5 rounded border border-slate-700 pos-${p.pos}">${p.pos}</span>
        </div>
    `).join('');
    
    dropdown.classList.remove('hidden');
    dropdown.classList.add('flex');
}

function liveUpdateNodePos(val) {
    if (activeFormationNodeIndex !== null) {
        const badge = document.getElementById(`node-pos-badge-${activeFormationNodeIndex}`);
        if (badge) {
            const upperVal = val.toUpperCase() || 'POS';
            badge.innerText = upperVal;
            badge.className = `relative -mt-1 z-40 bg-slate-900 pos-${upperVal} text-[11px] font-black px-2 py-[1px] rounded border border-slate-600 shadow-md pointer-events-none tracking-wider`;
        }
    }
}

function selectFormationAutocomplete(name, pos) {
    document.getElementById('formation-player-input').value = name;
    if (pos && pos !== 'undefined' && pos !== 'null') {
        document.getElementById('formation-pos-input').value = pos;
        liveUpdateNodePos(pos);
    }
    document.getElementById('formation-autocomplete-dropdown').classList.add('hidden');
    document.getElementById('formation-autocomplete-dropdown').classList.remove('flex');
}

// Menü dışına tıklanınca açılır listeyi kapat
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('formation-autocomplete-dropdown');
    if (dropdown && !e.target.closest('#formation-player-selector')) {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('flex');
    }
});

// --- YENİ: Klavye (Ok Tuşları + Enter) ile Formasyon Pop-up'ında Seçim Yapma Desteği ---
document.addEventListener('keydown', function(e) {
    const dropdown = document.getElementById('formation-autocomplete-dropdown');
    if (!dropdown || dropdown.classList.contains('hidden')) return;

    const items = dropdown.querySelectorAll('.formation-ac-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        formationAutocompleteFocusIndex++;
        if (formationAutocompleteFocusIndex >= items.length) formationAutocompleteFocusIndex = 0;
        highlightFormationAutocompleteItem(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        formationAutocompleteFocusIndex--;
        if (formationAutocompleteFocusIndex < 0) formationAutocompleteFocusIndex = items.length - 1;
        highlightFormationAutocompleteItem(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (formationAutocompleteFocusIndex > -1) {
            items[formationAutocompleteFocusIndex].click();
        } else if (items.length > 0) {
            items[0].click();
        }
    } else if (e.key === 'Escape') {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('flex');
    }
});

function highlightFormationAutocompleteItem(items) {
    items.forEach(i => i.classList.remove('bg-emerald-600', 'text-white'));
    if (formationAutocompleteFocusIndex > -1 && items[formationAutocompleteFocusIndex]) {
        items[formationAutocompleteFocusIndex].classList.add('bg-emerald-600', 'text-white');
        items[formationAutocompleteFocusIndex].scrollIntoView({ block: 'nearest' });
    }
}

// --- KUPA VE TURNUVA OTOMATİK SENKRONİZASYONU ---
function syncTrophiesData() {
    if (typeof customTournamentsData === 'undefined' || typeof trophiesData === 'undefined' || typeof trophyColumns === 'undefined') return;

    for (const season in customTournamentsData) {
        const tours = customTournamentsData[season];
        let trophyRow = trophiesData.find(tr => tr.season === season);
        
        if (!trophyRow) continue; 

        tours.forEach(tour => {
            let champLogo = null;
            const tType = (tour.type || '').toLowerCase();

            // 1. ELEME AŞAMASI MANTIĞI (Final maçını bul)
            if (tour.knockouts && tour.knockouts.length > 0) {
                const finalMatch = tour.knockouts.find(k => k.stage === 'Final' || k.stage === 'F');
                if (finalMatch) {
                    const hs1 = parseInt(finalMatch.homeScore);
                    const as1 = parseInt(finalMatch.awayScore);
                    const hs2 = parseInt(finalMatch.homeScore2);
                    const as2 = parseInt(finalMatch.awayScore2);
                    
                    const hasL1 = !isNaN(hs1) && !isNaN(as1);
                    const hasL2 = !isNaN(hs2) && !isNaN(as2);
                    
                    if (hasL1) {
                        const hTotal = hs1 + (hasL2 ? as2 : 0); 
                        const aTotal = as1 + (hasL2 ? hs2 : 0); 
                        
                        if (hTotal > aTotal) champLogo = finalMatch.homeLogo || getTeamLogoByName(finalMatch.home);
                        else if (aTotal > hTotal) champLogo = finalMatch.awayLogo || getTeamLogoByName(finalMatch.away);
                    }
                }
            }
            
            // 2. LİG / GRUP MANTIĞI
            if (!champLogo && tour.groups && tour.groups.length > 0) {
                const group = tour.groups[0];
                if (group.teams && group.teams.length > 0) {
                    const topTeam = group.teams.find(t => t.rank == 1 || t.rank === '1') || group.teams[0];
                    if (topTeam && topTeam.name && topTeam.name.trim() !== '' && topTeam.name !== 'Takım Adı') {
                        if (parseInt(topTeam.p) > 0 || parseInt(topTeam.pts) > 0) {
                            champLogo = topTeam.logo || getTeamLogoByName(topTeam.name);
                        }
                    }
                }
            }

            if (champLogo) {
                // Sütun eşleştirmesini çok daha esnek hale getiriyoruz
                let matchedCol = trophyColumns.find(c => {
                    const cName = c.name.toLowerCase();
                    const cId = c.id.toLowerCase();
                    
                    if (tType.includes('türkiye kupası') && (cName.includes('türkiye') || cName.includes('kupa') || cId.includes('turkey') || cId.includes('cup') || cId.includes('tc'))) return true;
                    if (tType.includes('şampiyonlar') && (cName.includes('şampiyonlar') || cName.includes('champions') || cId.includes('cl') || cId.includes('ucl'))) return true;
                    if (tType.includes('avrupa ligi') && (cName.includes('avrupa ligi') || cName.includes('europa') || cId.includes('el') || cId.includes('uel'))) return true;
                    if (tType.includes('konferans') && (cName.includes('konferans') || cName.includes('conference') || cId.includes('ecl'))) return true;
                    if (tType.includes('süper lig') && (cName.includes('süper lig') || cName.includes('super lig') || cId.includes('sl'))) return true;
                    if (tType.includes('dünya kupası') && (cName.includes('dünya') || cName.includes('world') || cId.includes('wc'))) return true;
                    
                    return cName.includes(tType) || tType.includes(cName);
                });

                if (matchedCol) {
                    trophyRow[matchedCol.id] = champLogo;
                }
            }
        });
    }
}

// Kod güncellendiğinde mevcut verileri hemen senkronize etmesi için bir kez çalıştırıyoruz
if (typeof syncTrophiesData === 'function') {
    syncTrophiesData();
}

if (!window.isTrophySyncHooked && typeof saveToLocalStorage === 'function') {
    const originalSave = saveToLocalStorage;
    saveToLocalStorage = function() {
        syncTrophiesData(); 
        originalSave();     
    };
    window.isTrophySyncHooked = true;
}