/**
 * Quran Data Repository — Complete 114 Surahs Index & Dynamic Ayah Fetcher
 */

const ALL_114_SURAHS = [
  { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", englishMeaning: "The Opening", versesCount: 7, type: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", englishMeaning: "The Cow", versesCount: 286, type: "Medinan" },
  { number: 3, name: "Ali 'Imran", arabicName: "آل عمران", englishMeaning: "Family of Imran", versesCount: 200, type: "Medinan" },
  { number: 4, name: "An-Nisa", arabicName: "النساء", englishMeaning: "The Women", versesCount: 176, type: "Medinan" },
  { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", englishMeaning: "The Table Spread", versesCount: 120, type: "Medinan" },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام", englishMeaning: "The Cattle", versesCount: 165, type: "Meccan" },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف", englishMeaning: "The Heights", versesCount: 206, type: "Meccan" },
  { number: 8, name: "Al-Anfal", arabicName: "الأنفال", englishMeaning: "The Spoils of War", versesCount: 75, type: "Medinan" },
  { number: 9, name: "At-Tawbah", arabicName: "التوبة", englishMeaning: "The Repentance", versesCount: 129, type: "Medinan" },
  { number: 10, name: "Yunus", arabicName: "يونس", englishMeaning: "Jonah", versesCount: 109, type: "Meccan" },
  { number: 11, name: "Hud", arabicName: "هود", englishMeaning: "Hud", versesCount: 123, type: "Meccan" },
  { number: 12, name: "Yusuf", arabicName: "يوسف", englishMeaning: "Joseph", versesCount: 111, type: "Meccan" },
  { number: 13, name: "Ar-Ra'd", arabicName: "الرعد", englishMeaning: "The Thunder", versesCount: 43, type: "Medinan" },
  { number: 14, name: "Ibrahim", arabicName: "إبراهيم", englishMeaning: "Abraham", versesCount: 52, type: "Meccan" },
  { number: 15, name: "Al-Hijr", arabicName: "الحجر", englishMeaning: "The Rocky Tract", versesCount: 99, type: "Meccan" },
  { number: 16, name: "An-Nahl", arabicName: "النحل", englishMeaning: "The Bee", versesCount: 128, type: "Meccan" },
  { number: 17, name: "Al-Isra", arabicName: "الإسراء", englishMeaning: "The Night Journey", versesCount: 111, type: "Meccan" },
  { number: 18, name: "Al-Kahf", arabicName: "الكهف", englishMeaning: "The Cave", versesCount: 110, type: "Meccan" },
  { number: 19, name: "Maryam", arabicName: "مريم", englishMeaning: "Mary", versesCount: 98, type: "Meccan" },
  { number: 20, name: "Ta-Ha", arabicName: "طه", englishMeaning: "Ta-Ha", versesCount: 135, type: "Meccan" },
  { number: 21, name: "Al-Anbiya", arabicName: "الأنبياء", englishMeaning: "The Prophets", versesCount: 112, type: "Meccan" },
  { number: 22, name: "Al-Hajj", arabicName: "الحج", englishMeaning: "The Pilgrimage", versesCount: 78, type: "Medinan" },
  { number: 23, name: "Al-Mu'minun", arabicName: "المؤمنون", englishMeaning: "The Believers", versesCount: 118, type: "Meccan" },
  { number: 24, name: "An-Nur", arabicName: "النور", englishMeaning: "The Light", versesCount: 64, type: "Medinan" },
  { number: 25, name: "Al-Furqan", arabicName: "الفرقان", englishMeaning: "The Criterion", versesCount: 77, type: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", arabicName: "الشعراء", englishMeaning: "The Poets", versesCount: 227, type: "Meccan" },
  { number: 27, name: "An-Naml", arabicName: "النمل", englishMeaning: "The Ant", versesCount: 93, type: "Meccan" },
  { number: 28, name: "Al-Qasas", arabicName: "القصص", englishMeaning: "The Stories", versesCount: 88, type: "Meccan" },
  { number: 29, name: "Al-'Ankabut", arabicName: "العنكبوت", englishMeaning: "The Spider", versesCount: 69, type: "Meccan" },
  { number: 30, name: "Ar-Rum", arabicName: "الروم", englishMeaning: "The Romans", versesCount: 60, type: "Meccan" },
  { number: 31, name: "Luqman", arabicName: "لقمان", englishMeaning: "Luqman", versesCount: 34, type: "Meccan" },
  { number: 32, name: "As-Sajdah", arabicName: "السجدة", englishMeaning: "The Prostration", versesCount: 30, type: "Meccan" },
  { number: 33, name: "Al-Ahzab", arabicName: "الأحزاب", englishMeaning: "The Combined Forces", versesCount: 73, type: "Medinan" },
  { number: 34, name: "Saba", arabicName: "سبأ", englishMeaning: "Sheba", versesCount: 54, type: "Meccan" },
  { number: 35, name: "Fatir", arabicName: "فاطر", englishMeaning: "Originator", versesCount: 45, type: "Meccan" },
  { number: 36, name: "Ya-Sin", arabicName: "يس", englishMeaning: "Ya-Sin", versesCount: 83, type: "Meccan" },
  { number: 37, name: "As-Saffat", arabicName: "الصافات", englishMeaning: "Those Who Set The Ranks", versesCount: 182, type: "Meccan" },
  { number: 38, name: "Sad", arabicName: "ص", englishMeaning: "The Letter Sad", versesCount: 88, type: "Meccan" },
  { number: 39, name: "Az-Zumar", arabicName: "الزمر", englishMeaning: "The Troops", versesCount: 75, type: "Meccan" },
  { number: 40, name: "Ghafir", arabicName: "غافر", englishMeaning: "The Forgiver", versesCount: 85, type: "Meccan" },
  { number: 41, name: "Fussilat", arabicName: "فصلت", englishMeaning: "Explained in Detail", versesCount: 54, type: "Meccan" },
  { number: 42, name: "Ash-Shura", arabicName: "الشورى", englishMeaning: "The Consultation", versesCount: 53, type: "Meccan" },
  { number: 43, name: "Az-Zukhruf", arabicName: "الزخرف", englishMeaning: "The Ornaments of Gold", versesCount: 89, type: "Meccan" },
  { number: 44, name: "Ad-Dukhan", arabicName: "الدخان", englishMeaning: "The Smoke", versesCount: 59, type: "Meccan" },
  { number: 45, name: "Al-Jathiyah", arabicName: "الجاثية", englishMeaning: "The Crouching", versesCount: 37, type: "Meccan" },
  { number: 46, name: "Al-Ahqaf", arabicName: "الأحقاف", englishMeaning: "The Wind-Curved Sandhills", versesCount: 35, type: "Meccan" },
  { number: 47, name: "Muhammad", arabicName: "محمد", englishMeaning: "Muhammad", versesCount: 38, type: "Medinan" },
  { number: 48, name: "Al-Fath", arabicName: "الفتح", englishMeaning: "The Victory", versesCount: 29, type: "Medinan" },
  { number: 49, name: "Al-Hujurat", arabicName: "الحجرات", englishMeaning: "The Rooms", versesCount: 18, type: "Medinan" },
  { number: 50, name: "Qaf", arabicName: "ق", englishMeaning: "The Letter Qaf", versesCount: 45, type: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", arabicName: "الذاريات", englishMeaning: "The Winnowing Winds", versesCount: 60, type: "Meccan" },
  { number: 52, name: "At-Tur", arabicName: "الطور", englishMeaning: "The Mount", versesCount: 49, type: "Meccan" },
  { number: 53, name: "An-Najm", arabicName: "النجم", englishMeaning: "The Star", versesCount: 62, type: "Meccan" },
  { number: 54, name: "Al-Qamar", arabicName: "القمر", englishMeaning: "The Moon", versesCount: 55, type: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", englishMeaning: "The Beneficent", versesCount: 78, type: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", englishMeaning: "The Inevitable", versesCount: 96, type: "Meccan" },
  { number: 57, name: "Al-Hadid", arabicName: "الحديد", englishMeaning: "The Iron", versesCount: 29, type: "Medinan" },
  { number: 58, name: "Al-Mujadila", arabicName: "المجادلة", englishMeaning: "The Pleading Woman", versesCount: 22, type: "Medinan" },
  { number: 59, name: "Al-Hashr", arabicName: "الحشر", englishMeaning: "The Exile", versesCount: 24, type: "Medinan" },
  { number: 60, name: "Al-Mumtahanah", arabicName: "الممتحنة", englishMeaning: "She That Is To Be Examined", versesCount: 13, type: "Medinan" },
  { number: 61, name: "As-Saff", arabicName: "الصف", englishMeaning: "The Ranks", versesCount: 14, type: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", arabicName: "الجمعة", englishMeaning: "Friday", versesCount: 11, type: "Medinan" },
  { number: 63, name: "Al-Munafiqun", arabicName: "المنافقون", englishMeaning: "The Hypocrites", versesCount: 11, type: "Medinan" },
  { number: 64, name: "At-Taghabun", arabicName: "التغابن", englishMeaning: "Mutual Disillusion", versesCount: 18, type: "Medinan" },
  { number: 65, name: "At-Talaq", arabicName: "الطلاق", englishMeaning: "Divorce", versesCount: 12, type: "Medinan" },
  { number: 66, name: "At-Tahrim", arabicName: "التحريم", englishMeaning: "Prohibition", versesCount: 12, type: "Medinan" },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", englishMeaning: "The Dominion", versesCount: 30, type: "Meccan" },
  { number: 68, name: "Al-Qalam", arabicName: "القلم", englishMeaning: "The Pen", versesCount: 52, type: "Meccan" },
  { number: 69, name: "Al-Haqqah", arabicName: "الحاقة", englishMeaning: "The Inevitable Reality", versesCount: 52, type: "Meccan" },
  { number: 70, name: "Al-Ma'arij", arabicName: "المعارج", englishMeaning: "The Ascending Stairways", versesCount: 44, type: "Meccan" },
  { number: 71, name: "Nuh", arabicName: "نوح", englishMeaning: "Noah", versesCount: 28, type: "Meccan" },
  { number: 72, name: "Al-Jinn", arabicName: "الجن", englishMeaning: "The Jinn", versesCount: 28, type: "Meccan" },
  { number: 73, name: "Al-Muzzammil", arabicName: "المزمل", englishMeaning: "The Enshrouded One", versesCount: 20, type: "Meccan" },
  { number: 74, name: "Al-Muddaththir", arabicName: "المدثر", englishMeaning: "The Cloaked One", versesCount: 56, type: "Meccan" },
  { number: 75, name: "Al-Qiyamah", arabicName: "القيامة", englishMeaning: "The Resurrection", versesCount: 40, type: "Meccan" },
  { number: 76, name: "Al-Insan", arabicName: "الإنسان", englishMeaning: "Man", versesCount: 31, type: "Medinan" },
  { number: 77, name: "Al-Mursalat", arabicName: "المرسلات", englishMeaning: "Those Sent Forth", versesCount: 50, type: "Meccan" },
  { number: 78, name: "An-Naba", arabicName: "النبأ", englishMeaning: "The Tidings", versesCount: 40, type: "Meccan" },
  { number: 79, name: "An-Nazi'at", arabicName: "النازعات", englishMeaning: "Those Who Drag Forth", versesCount: 46, type: "Meccan" },
  { number: 80, name: "'Abasa", arabicName: "عبس", englishMeaning: "He Frowned", versesCount: 42, type: "Meccan" },
  { number: 81, name: "At-Takwir", arabicName: "التكوير", englishMeaning: "The Overthrowing", versesCount: 29, type: "Meccan" },
  { number: 82, name: "Al-Infitar", arabicName: "الانفطار", englishMeaning: "The Cleaving", versesCount: 19, type: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", arabicName: "المطففين", englishMeaning: "Defrauding", versesCount: 36, type: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", arabicName: "الانشقاق", englishMeaning: "The Splitting Open", versesCount: 25, type: "Meccan" },
  { number: 85, name: "Al-Buruj", arabicName: "البروج", englishMeaning: "The Mansions of the Stars", versesCount: 22, type: "Meccan" },
  { number: 86, name: "At-Tariq", arabicName: "الطارق", englishMeaning: "The Morning Star", versesCount: 17, type: "Meccan" },
  { number: 87, name: "Al-A'la", arabicName: "الأعلى", englishMeaning: "The Most High", versesCount: 19, type: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", arabicName: "الغاشية", englishMeaning: "The Overwhelming", versesCount: 26, type: "Meccan" },
  { number: 89, name: "Al-Fajr", arabicName: "الفجر", englishMeaning: "The Dawn", versesCount: 30, type: "Meccan" },
  { number: 90, name: "Al-Balad", arabicName: "البلد", englishMeaning: "The City", versesCount: 20, type: "Meccan" },
  { number: 91, name: "Ash-Shams", arabicName: "الشمس", englishMeaning: "The Sun", versesCount: 15, type: "Meccan" },
  { number: 92, name: "Al-Layl", arabicName: "الليل", englishMeaning: "The Night", versesCount: 21, type: "Meccan" },
  { number: 93, name: "Ad-Duha", arabicName: "الضحى", englishMeaning: "The Morning Hours", versesCount: 11, type: "Meccan" },
  { number: 94, name: "Ash-Sharh", arabicName: "الشرح", englishMeaning: "The Relief", versesCount: 8, type: "Meccan" },
  { number: 95, name: "At-Tin", arabicName: "التين", englishMeaning: "The Fig", versesCount: 8, type: "Meccan" },
  { number: 96, name: "Al-'Alaq", arabicName: "العلق", englishMeaning: "The Clot", versesCount: 19, type: "Meccan" },
  { number: 97, name: "Al-Qadr", arabicName: "القدر", englishMeaning: "The Power", versesCount: 5, type: "Meccan" },
  { number: 98, name: "Al-Bayyinah", arabicName: "البينة", englishMeaning: "The Clear Proof", versesCount: 8, type: "Medinan" },
  { number: 99, name: "Az-Zalzalah", arabicName: "الزلزلة", englishMeaning: "The Earthquake", versesCount: 8, type: "Medinan" },
  { number: 100, name: "Al-'Adiyat", arabicName: "العاديات", englishMeaning: "The Courser", versesCount: 11, type: "Meccan" },
  { number: 101, name: "Al-Qari'ah", arabicName: "القارعة", englishMeaning: "The Calamity", versesCount: 11, type: "Meccan" },
  { number: 102, name: "At-Takathur", arabicName: "التكاثر", englishMeaning: "Rivalry in World Increase", versesCount: 8, type: "Meccan" },
  { number: 103, name: "Al-'Asr", arabicName: "العصر", englishMeaning: "The Declining Day", versesCount: 3, type: "Meccan" },
  { number: 104, name: "Al-Humazah", arabicName: "الهمزة", englishMeaning: "The Traducer", versesCount: 9, type: "Meccan" },
  { number: 105, name: "Al-Fil", arabicName: "الفيل", englishMeaning: "The Elephant", versesCount: 5, type: "Meccan" },
  { number: 106, name: "Quraysh", arabicName: "قريش", englishMeaning: "Quraysh", versesCount: 4, type: "Meccan" },
  { number: 107, name: "Al-Ma'un", arabicName: "المواعون", englishMeaning: "Small Kindnesses", versesCount: 7, type: "Meccan" },
  { number: 108, name: "Al-Kawthar", arabicName: "الكوثر", englishMeaning: "Abundance", versesCount: 3, type: "Meccan" },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون", englishMeaning: "The Disbelievers", versesCount: 6, type: "Meccan" },
  { number: 110, name: "An-Nasr", arabicName: "النصر", englishMeaning: "Divine Support", versesCount: 3, type: "Medinan" },
  { number: 111, name: "Al-Masad", arabicName: "المسد", englishMeaning: "The Palm Fiber", versesCount: 5, type: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", englishMeaning: "Sincerity", versesCount: 4, type: "Meccan" },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", englishMeaning: "The Daybreak", versesCount: 5, type: "Meccan" },
  { number: 114, name: "An-Nas", arabicName: "الناس", englishMeaning: "Mankind", versesCount: 6, type: "Meccan" }
];

const PRELOADED_SURAHS = [
  {
    number: 1,
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    englishMeaning: "The Opening",
    versesCount: 7,
    verses: [
      { num: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
      { num: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "[All] praise is [due] to Allah, Lord of the worlds -" },
      { num: 3, arabic: "الرَّحْمَنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful," },
      { num: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense." },
      { num: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help." },
      { num: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -" },
      { num: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلاَ الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
    ]
  },
  {
    number: 112,
    name: "Al-Ikhlas",
    arabicName: "الإخلاص",
    englishMeaning: "Sincerity",
    versesCount: 4,
    verses: [
      { num: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One," },
      { num: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge." },
      { num: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born," },
      { num: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُواً أَحَدٌ", translation: "Nor is there to Him any equivalent.'" }
    ]
  },
  {
    number: 113,
    name: "Al-Falaq",
    arabicName: "الفلق",
    englishMeaning: "The Daybreak",
    versesCount: 5,
    verses: [
      { num: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Say, 'I seek refuge in the Lord of daybreak" },
      { num: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "From the evil of that which He created" },
      { num: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "And from the evil of darkness when it settles" },
      { num: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", translation: "And from the evil of the blowers in knots" },
      { num: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "And from the evil of an envier when he envies.'" }
    ]
  },
  {
    number: 114,
    name: "An-Nas",
    arabicName: "الناس",
    englishMeaning: "Mankind",
    versesCount: 6,
    verses: [
      { num: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind," },
      { num: 2, arabic: "مَلِكِ النَّاسِ", translation: "The Sovereign of mankind," },
      { num: 3, arabic: "إِلَهِ النَّاسِ", translation: "The God of mankind," },
      { num: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "From the evil of the retreating whisperer -" },
      { num: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "Who whispers [evil] into the breasts of mankind -" },
      { num: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "From among the jinn and mankind.'" }
    ]
  }
];

window.quranCache = window.quranCache || {};

class QuranRepository {
  static async getSurah(surahNumber) {
    const num = parseInt(surahNumber, 10);
    const meta = ALL_114_SURAHS.find(s => s.number === num) || ALL_114_SURAHS[0];

    // Check preloaded array
    const local = PRELOADED_SURAHS.find(s => s.number === num);
    if (local) {
      return local;
    }

    // Check memory cache
    if (window.quranCache[num]) {
      return window.quranCache[num];
    }

    // Fetch live from Al-Quran API
    try {
      const resp = await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,en.sahih`);
      const json = await resp.json();
      if (json.code === 200 && json.data && json.data.length >= 2) {
        const arabicAyahs = json.data[0].ayahs;
        const englishAyahs = json.data[1].ayahs;

        const verses = arabicAyahs.map((a, i) => ({
          num: a.numberInSurah,
          arabic: a.text,
          translation: englishAyahs[i] ? englishAyahs[i].text : ""
        }));

        const fullSurah = {
          number: num,
          name: meta.name,
          arabicName: meta.arabicName,
          englishMeaning: meta.englishMeaning,
          versesCount: meta.versesCount,
          type: meta.type,
          verses: verses
        };

        window.quranCache[num] = fullSurah;
        return fullSurah;
      }
    } catch (err) {
      console.warn("Error fetching Quran Surah API", err);
    }

    return {
      number: num,
      name: meta.name,
      arabicName: meta.arabicName,
      englishMeaning: meta.englishMeaning,
      versesCount: meta.versesCount,
      verses: [
        { num: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." }
      ]
    };
  }
}

window.ALL_114_SURAHS = ALL_114_SURAHS;
window.QuranRepository = QuranRepository;
