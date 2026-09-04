/**
 * 99 Names of Allah (Asma-ul-Husna / الأسماء الحسنى) Repository
 * Complete 99 Names with vocalized Arabic text, transliteration, English translation,
 * detailed spiritual meaning/explanation, and Quranic references.
 */

const NAMES_OF_ALLAH = [
  {
    id: 1,
    number: 1,
    arabic: "الرَّحْمَٰنُ",
    transliteration: "Ar-Rahman",
    english: "The Most Gracious",
    meaning: "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.",
    quranRef: "Surah Al-Fatiha 1:1, Surah Ar-Rahman 55:1"
  },
  {
    id: 2,
    number: 2,
    arabic: "الرَّحِيمُ",
    transliteration: "Ar-Raheem",
    english: "The Most Merciful",
    meaning: "The One who has a plenty of mercy for the believers in the worldly life and in the hereafter.",
    quranRef: "Surah Al-Fatiha 1:3, Surah Al-Baqarah 2:163"
  },
  {
    id: 3,
    number: 3,
    arabic: "الْمَلِكُ",
    transliteration: "Al-Malik",
    english: "The King and Owner of All",
    meaning: "The Sovereign Lord, the One with absolute authority over all created existence without any limitation.",
    quranRef: "Surah Al-Hashr 59:23, Surah Al-Mu'minun 23:116"
  },
  {
    id: 4,
    number: 4,
    arabic: "الْقُدُّوسُ",
    transliteration: "Al-Quddus",
    english: "The Absolutely Pure",
    meaning: "The Pure One who is free from any imperfection, error, weakness, or human-like deficiency.",
    quranRef: "Surah Al-Hashr 59:23, Surah Al-Jumu'ah 62:1"
  },
  {
    id: 5,
    number: 5,
    arabic: "السَّلاَمُ",
    transliteration: "As-Salam",
    english: "The Source of Peace",
    meaning: "The One who is free from every flaw and who grants peace, security, and tranquility to His creation.",
    quranRef: "Surah Al-Hashr 59:23, Surah As-Saffat 37:181"
  },
  {
    id: 6,
    number: 6,
    arabic: "الْمُؤْمِنُ",
    transliteration: "Al-Mu'min",
    english: "The Giver of Faith and Security",
    meaning: "The One who witnessed for Himself that no one is God but Him, and who grants faith, calm, and protection from harm.",
    quranRef: "Surah Al-Hashr 59:23, Surah Quraysh 106:4"
  },
  {
    id: 7,
    number: 7,
    arabic: "الْمُهَيْمِنُ",
    transliteration: "Al-Muhaymin",
    english: "The Guardian & Preserver",
    meaning: "The One who watches over and protects all His creatures, knowing their actions, thoughts, and destinies.",
    quranRef: "Surah Al-Hashr 59:23, Surah Al-Ma'idah 5:48"
  },
  {
    id: 8,
    number: 8,
    arabic: "الْعَزِيزُ",
    transliteration: "Al-Aziz",
    english: "The All-Mighty",
    meaning: "The Strong, Invincible, and Unconquerable One who cannot be defeated or restricted by anyone.",
    quranRef: "Surah Al-Hashr 59:23, Surah Al-Imran 3:6"
  },
  {
    id: 9,
    number: 9,
    arabic: "الْجَبَّارُ",
    transliteration: "Al-Jabbar",
    english: "The Compeller & Restorer",
    meaning: "The One who repairs what is broken, completes what is lacking, and enforces His supreme will over all matter.",
    quranRef: "Surah Al-Hashr 59:23"
  },
  {
    id: 10,
    number: 10,
    arabic: "الْمُتَكَبِّرُ",
    transliteration: "Al-Mutakabbir",
    english: "The Supreme & Majestic",
    meaning: "The One who is clear from the attributes of the creatures and rights of pride; supreme above all.",
    quranRef: "Surah Al-Hashr 59:23"
  },
  {
    id: 11,
    number: 11,
    arabic: "الْخَالِقُ",
    transliteration: "Al-Khaliq",
    english: "The Creator",
    meaning: "The One who brings everything from non-existence into existence out of His sole divine decree.",
    quranRef: "Surah Al-Hashr 59:24, Surah Ar-Ra'd 13:16"
  },
  {
    id: 12,
    number: 12,
    arabic: "الْبَارِئُ",
    transliteration: "Al-Bari'",
    english: "The Originator",
    meaning: "The One who creates living beings out of nothingness with exact order, proportion, and distinction.",
    quranRef: "Surah Al-Hashr 59:24, Surah Al-Baqarah 2:54"
  },
  {
    id: 13,
    number: 13,
    arabic: "الْمُصَوِّرُ",
    transliteration: "Al-Musawwir",
    english: "The Fashioner of Forms",
    meaning: "The One who designs and shapes all created forms in unique variations and beautiful details.",
    quranRef: "Surah Al-Hashr 59:24, Surah Al-Infitar 82:7-8"
  },
  {
    id: 14,
    number: 14,
    arabic: "الْغَفَّارُ",
    transliteration: "Al-Ghaffar",
    english: "The All-Forgiving",
    meaning: "The One who repeatedly forgives the sins and faults of His servants who turn to Him in sincere repentance.",
    quranRef: "Surah Taha 20:82, Surah Nuh 71:10"
  },
  {
    id: 15,
    number: 15,
    arabic: "الْقَهَّارُ",
    transliteration: "Al-Qahhar",
    english: "The Subduer & Dominant",
    meaning: "The One who holds complete control over everything and before Whom all creations submit humbly.",
    quranRef: "Surah Ar-Ra'd 13:16, Surah Az-Zumar 39:4"
  },
  {
    id: 16,
    number: 16,
    arabic: "الْوَهَّابُ",
    transliteration: "Al-Wahhab",
    english: "The Continuous Bestower",
    meaning: "The One who gives abundantly without expecting any return or compensation from His creation.",
    quranRef: "Surah Al-Imran 3:8, Surah Sad 38:9"
  },
  {
    id: 17,
    number: 17,
    arabic: "الرَّزَّاقُ",
    transliteration: "Ar-Razzaq",
    english: "The All-Provider",
    meaning: "The One who creates and distributes sustenance, nourishment, and means of life to all living beings.",
    quranRef: "Surah Adh-Dhariyat 51:58"
  },
  {
    id: 18,
    number: 18,
    arabic: "الْفَتَّاحُ",
    transliteration: "Al-Fattah",
    english: "The Supreme Opener & Judge",
    meaning: "The One who opens closed doors of mercy, guidance, and victory, and resolves all disputes with truth.",
    quranRef: "Surah Saba 34:26"
  },
  {
    id: 19,
    number: 19,
    arabic: "الْعَلِيمُ",
    transliteration: "Al-Alim",
    english: "The All-Knowing",
    meaning: "The One whose knowledge embraces everything in the universe—past, present, future, hidden, and manifest.",
    quranRef: "Surah Al-Baqarah 2:158, Surah Al-An'am 6:59"
  },
  {
    id: 20,
    number: 20,
    arabic: "الْقَابِضُ",
    transliteration: "Al-Qabid",
    english: "The Withholder / Restrainer",
    meaning: "The One who tightens, withholds, or reduces provisions and souls according to His divine wisdom.",
    quranRef: "Surah Al-Baqarah 2:245"
  },
  {
    id: 21,
    number: 21,
    arabic: "الْبَاسِطُ",
    transliteration: "Al-Basit",
    english: "The Extender & Expander",
    meaning: "The One who expands, amplifies, and multiplies provisions, knowledge, and joy for whom He wills.",
    quranRef: "Surah Al-Baqarah 2:245"
  },
  {
    id: 22,
    number: 22,
    arabic: "الْخَافِضُ",
    transliteration: "Al-Khafid",
    english: "The Abaser & Humbler",
    meaning: "The One who lowers the arrogant, the unjust, and the transgressors who oppose divine guidance.",
    quranRef: "Surah Al-Waqi'ah 56:3"
  },
  {
    id: 23,
    number: 23,
    arabic: "الرَّافِعُ",
    transliteration: "Ar-Rafi'",
    english: "The Exalter & Elevator",
    meaning: "The One who elevates the righteous, the humble, and the seekers of knowledge in rank and honor.",
    quranRef: "Surah Al-An'am 6:83, Surah Al-Mujadila 58:11"
  },
  {
    id: 24,
    number: 24,
    arabic: "الْمُعِزُّ",
    transliteration: "Al-Mu'izz",
    english: "The Bestower of Honor",
    meaning: "The One who grants dignity, honor, strength, and victory to whomever He pleases.",
    quranRef: "Surah Al-Imran 3:26"
  },
  {
    id: 25,
    number: 25,
    arabic: "الْمُذِلُّ",
    transliteration: "Al-Mudhill",
    english: "The Humiliator of Tyrants",
    meaning: "The One who degrades the oppressors and denies honor to those who seek it in wrongdoing.",
    quranRef: "Surah Al-Imran 3:26"
  },
  {
    id: 26,
    number: 26,
    arabic: "السَّمِيعُ",
    transliteration: "As-Sami'",
    english: "The All-Hearing",
    meaning: "The One who hears every sound, whisper, prayer, and silent thought across the entire creation.",
    quranRef: "Surah Al-Baqarah 2:127, Surah As-Shura 42:11"
  },
  {
    id: 27,
    number: 27,
    arabic: "الْبَصِيرُ",
    transliteration: "Al-Basir",
    english: "The All-Seeing",
    meaning: "The One who sees all things in light and darkness, smallest atom to the grandest universe.",
    quranRef: "Surah Al-Isra 17:1, Surah As-Shura 42:11"
  },
  {
    id: 28,
    number: 28,
    arabic: "الْحَكَمُ",
    transliteration: "Al-Hakam",
    english: "The Impartial Judge",
    meaning: "The Ultimate Arbiter whose rulings are flawless, perfectly just, and never overturned.",
    quranRef: "Surah Al-An'am 6:114"
  },
  {
    id: 29,
    number: 29,
    arabic: "الْعَدْلُ",
    transliteration: "Al-'Adl",
    english: "The Utterly Just",
    meaning: "The One who is purely equitable, free from any injustice or bias in judgment and decree.",
    quranRef: "Surah Al-An'am 6:115"
  },
  {
    id: 30,
    number: 30,
    arabic: "اللَّطِيفُ",
    transliteration: "Al-Latif",
    english: "The Subtle & Gentle",
    meaning: "The One who understands the finest subtle details of all matters and treats His servants with delicate gentleness.",
    quranRef: "Surah Al-An'am 6:103, Surah Luqman 31:16"
  },
  {
    id: 31,
    number: 31,
    arabic: "الْخَبِيرُ",
    transliteration: "Al-Khabir",
    english: "The All-Aware",
    meaning: "The One who knows the inner realities, hidden motives, and secret truths of everything.",
    quranRef: "Surah Al-An'am 6:18, Surah Al-Mulk 67:14"
  },
  {
    id: 32,
    number: 32,
    arabic: "الْحَلِيمُ",
    transliteration: "Al-Halim",
    english: "The Most Forbearing",
    meaning: "The One who does not rush to punish sinners, giving them ample time to repent and rectify themselves.",
    quranRef: "Surah Al-Baqarah 2:225, Surah Al-Isra 17:44"
  },
  {
    id: 33,
    number: 33,
    arabic: "الْعَظِيمُ",
    transliteration: "Al-Azim",
    english: "The Magnificent & Infinite",
    meaning: "The Supreme One whose greatness surpasses human comprehension and description.",
    quranRef: "Surah Al-Baqarah 2:255, Surah Ash-Shura 42:4"
  },
  {
    id: 34,
    number: 34,
    arabic: "الْغَفُورُ",
    transliteration: "Al-Ghafur",
    english: "The Great Pardoner",
    meaning: "The One who completely covers and wipes away sins, concealing them from humiliation.",
    quranRef: "Surah Al-Baqarah 2:173, Surah Al-Hijr 15:49"
  },
  {
    id: 35,
    number: 35,
    arabic: "الشَّكُورُ",
    transliteration: "Ash-Shakur",
    english: "The Most Appreciative",
    meaning: "The One who rewards small good deeds with immense, boundless blessings and eternal reward.",
    quranRef: "Surah Fatir 35:30, Surah Ash-Shura 42:23"
  },
  {
    id: 36,
    number: 36,
    arabic: "الْعَلِيُّ",
    transliteration: "Al-Aliyy",
    english: "The Highest & Exalted",
    meaning: "The One who is high above all creation in attribute, essence, status, and sovereignty.",
    quranRef: "Surah Al-Baqarah 2:255, Surah An-Nisa 4:34"
  },
  {
    id: 37,
    number: 37,
    arabic: "الْكَبِيرُ",
    transliteration: "Al-Kabir",
    english: "The Greatest",
    meaning: "The One who is incomparably great in majesty, beyond all comparison and grandeur.",
    quranRef: "Surah Ar-Ra'd 13:9, Surah Al-Hajj 22:62"
  },
  {
    id: 38,
    number: 38,
    arabic: "الْحَفِيظُ",
    transliteration: "Al-Hafiz",
    english: "The Preserver & Guardian",
    meaning: "The One who protects and preserves the heavens, earth, deeds of mankind, and all living species.",
    quranRef: "Surah Hud 11:57, Surah Saba 34:21"
  },
  {
    id: 39,
    number: 39,
    arabic: "الْمُقِيتُ",
    transliteration: "Al-Muqit",
    english: "The Sustainer & Overseer",
    meaning: "The One who supplies strength, nourishment, and energy needed for physical and spiritual life.",
    quranRef: "Surah An-Nisa 4:85"
  },
  {
    id: 40,
    number: 40,
    arabic: "الْحَسِيبُ",
    transliteration: "Al-Hasib",
    english: "The Reckoner & Sufficient",
    meaning: "The One who suffices for all believers and who keeps exact count of all actions for reckoning.",
    quranRef: "Surah An-Nisa 4:6, Surah Al-Ahzab 33:39"
  },
  {
    id: 41,
    number: 41,
    arabic: "الْجَلِيلُ",
    transliteration: "Al-Jalil",
    english: "The Sublime & Majestic",
    meaning: "The One attributed with greatness, glory, majesty, and perfection of attributes.",
    quranRef: "Surah Ar-Rahman 55:27"
  },
  {
    id: 42,
    number: 42,
    arabic: "الْكَرِيمُ",
    transliteration: "Al-Karim",
    english: "The Most Generous",
    meaning: "The One whose generosity is inexhaustible, giving continuously without measure or asking.",
    quranRef: "Surah An-Naml 27:40, Surah Al-Infitar 82:6"
  },
  {
    id: 43,
    number: 43,
    arabic: "الرَّقِيبُ",
    transliteration: "Ar-Raqib",
    english: "The All-Watchful",
    meaning: "The One who observes everything continuously, never missing a heartbeat or a passing thought.",
    quranRef: "Surah An-Nisa 4:1, Surah Al-Ma'idah 5:117"
  },
  {
    id: 44,
    number: 44,
    arabic: "الْمُجِيبُ",
    transliteration: "Al-Mujib",
    english: "The Ever-Responsive",
    meaning: "The One who answers the prayers, supplications, and needs of those who call upon Him.",
    quranRef: "Surah Hud 11:61"
  },
  {
    id: 45,
    number: 45,
    arabic: "الْوَاسِعُ",
    transliteration: "Al-Wasi'",
    english: "The All-Encompassing",
    meaning: "The One whose mercy, knowledge, capacity, and abundance encompass all creation without limit.",
    quranRef: "Surah Al-Baqarah 2:115, Surah Al-Baqarah 2:268"
  },
  {
    id: 46,
    number: 46,
    arabic: "الْحَكِيمُ",
    transliteration: "Al-Hakim",
    english: "The All-Wise",
    meaning: "The One who places everything in its rightful place with ultimate wisdom, purpose, and accuracy.",
    quranRef: "Surah Al-Baqarah 2:129, Surah Al-An'am 6:18"
  },
  {
    id: 47,
    number: 47,
    arabic: "الْوَدُودُ",
    transliteration: "Al-Wadud",
    english: "The Loving One",
    meaning: "The One who loves His righteous servants and is beloved by the hearts of true believers.",
    quranRef: "Surah Hud 11:90, Surah Al-Buruj 85:14"
  },
  {
    id: 48,
    number: 48,
    arabic: "الْمَجِيدُ",
    transliteration: "Al-Majid",
    english: "The All-Glorious",
    meaning: "The One who is majestic, honorable, abundant in goodness, and supreme in dignity.",
    quranRef: "Surah Hud 11:73, Surah Al-Buruj 85:15"
  },
  {
    id: 49,
    number: 49,
    arabic: "الْبَاعِثُ",
    transliteration: "Al-Ba'ith",
    english: "The Resurrector",
    meaning: "The One who will raise all creatures from death on the Day of Judgment for eternal accountability.",
    quranRef: "Surah Al-Hajj 22:7, Surah Yasin 36:52"
  },
  {
    id: 50,
    number: 50,
    arabic: "الشَّهِيدُ",
    transliteration: "Ash-Shahid",
    english: "The All-Observing Witness",
    meaning: "The One who is present everywhere, witnessing all events, actions, and speech.",
    quranRef: "Surah An-Nisa 4:33, Surah Al-Buruj 85:9"
  },
  {
    id: 51,
    number: 51,
    arabic: "الْحَقُّ",
    transliteration: "Al-Haqq",
    english: "The Absolute Truth",
    meaning: "The One whose existence is unchangeable reality, whose word is truth, and whose promise is certain.",
    quranRef: "Surah Taha 20:114, Surah Al-Hajj 22:6"
  },
  {
    id: 52,
    number: 52,
    arabic: "الْوَكِيلُ",
    transliteration: "Al-Wakil",
    english: "The Ultimate Trustee",
    meaning: "The One who manages all affairs dependably and protects those who put their full trust in Him.",
    quranRef: "Surah Al-Imran 3:173, Surah An-Nisa 4:81"
  },
  {
    id: 53,
    number: 53,
    arabic: "الْقَوِيُّ",
    transliteration: "Al-Qawiyy",
    english: "The All-Strong",
    meaning: "The One possesses total strength, power, and capability without any tiredness or weakness.",
    quranRef: "Surah Al-Anfal 8:52, Surah Al-Hajj 22:40"
  },
  {
    id: 54,
    number: 54,
    arabic: "الْمَتِينُ",
    transliteration: "Al-Matin",
    english: "The Firm & Steadfast",
    meaning: "The One whose strength is steadfast, perfect, and unshakeable in every situation.",
    quranRef: "Surah Adh-Dhariyat 51:58"
  },
  {
    id: 55,
    number: 55,
    arabic: "الْوَلِيُّ",
    transliteration: "Al-Waliyy",
    english: "The Protecting Ally",
    meaning: "The One who supports, guides, aids, and protects the righteous believers in this world and the next.",
    quranRef: "Surah An-Nisa 4:45, Surah As-Shura 42:28"
  },
  {
    id: 56,
    number: 56,
    arabic: "الْحَمِيدُ",
    transliteration: "Al-Hamid",
    english: "The All-Praiseworthy",
    meaning: "The One who alone deserves all praise, adoration, and thanksgiving for His divine attributes.",
    quranRef: "Surah Ibrahim 14:1, Surah Fussilat 41:42"
  },
  {
    id: 57,
    number: 57,
    arabic: "الْمُحْصِي",
    transliteration: "Al-Muhsi",
    english: "The All-Counter & Appraiser",
    meaning: "The One who counts and knows the precise number of every particle, atom, and living creature.",
    quranRef: "Surah Maryam 19:94, Surah Yasin 36:12"
  },
  {
    id: 58,
    number: 58,
    arabic: "الْمُبْدِئُ",
    transliteration: "Al-Mubdi'",
    english: "The Originator",
    meaning: "The One who initiates creation without any prior model, precedent, or material.",
    quranRef: "Surah Yunus 10:4, Surah Al-Buruj 85:13"
  },
  {
    id: 59,
    number: 59,
    arabic: "الْمُعِيدُ",
    transliteration: "Al-Mu'id",
    english: "The Restorer",
    meaning: "The One who recreates and restores all creation after its destruction.",
    quranRef: "Surah Yunus 10:34, Surah Al-Buruj 85:13"
  },
  {
    id: 60,
    number: 60,
    arabic: "الْمُحْيِي",
    transliteration: "Al-Muhyi",
    english: "The Giver of Life",
    meaning: "The One who breathes life into dry earth, bodies, and souls, bestowing vitality and spirit.",
    quranRef: "Surah Ar-Rum 30:50, Surah Fussilat 41:39"
  },
  {
    id: 61,
    number: 61,
    arabic: "الْمُمِيتُ",
    transliteration: "Al-Mumit",
    english: "The Bringer of Death",
    meaning: "The One who decrees death for all living creatures at their appointed time.",
    quranRef: "Surah Al-Baqarah 2:258, Surah Al-Hajj 22:66"
  },
  {
    id: 62,
    number: 62,
    arabic: "الْحَيُّ",
    transliteration: "Al-Hayy",
    english: "The Ever-Living",
    meaning: "The One who lives eternally with continuous life, unaffected by sleep, fatigue, or mortality.",
    quranRef: "Surah Al-Baqarah 2:255, Surah Taha 20:111"
  },
  {
    id: 63,
    number: 63,
    arabic: "الْقَيُّومُ",
    transliteration: "Al-Qayyum",
    english: "The Self-Subsisting Sustainer",
    meaning: "The One who exists independently and sustains the existence of all created entities in the cosmos.",
    quranRef: "Surah Al-Baqarah 2:255, Surah Al-Imran 3:2"
  },
  {
    id: 64,
    number: 64,
    arabic: "الْوَاجِدُ",
    transliteration: "Al-Wajid",
    english: "The Perceiver & Unfailing",
    meaning: "The One who finds whatever He desires, lacking nothing and needing nothing.",
    quranRef: "Surah Ad-Duha 93:7"
  },
  {
    id: 65,
    number: 65,
    arabic: "الْمَاجِدُ",
    transliteration: "Al-Majid",
    english: "The Illustrious & Noble",
    meaning: "The One characterized by boundless glory, nobility, generosity, and magnificent grace.",
    quranRef: "Surah Hud 11:73"
  },
  {
    id: 66,
    number: 66,
    arabic: "الْوَاحِدُ",
    transliteration: "Al-Wahid",
    english: "The Unique One",
    meaning: "The One who is unique in His essence and attributes without any partner, equal, or rival.",
    quranRef: "Surah Al-Baqarah 2:163, Surah Ar-Ra'd 13:16"
  },
  {
    id: 67,
    number: 67,
    arabic: "الأَحَدُ",
    transliteration: "Al-Ahad",
    english: "The Indivisible One",
    meaning: "The One and Only God, indivisible and solitary in His divine perfection.",
    quranRef: "Surah Al-Ikhlas 112:1"
  },
  {
    id: 68,
    number: 68,
    arabic: "الصَّمَدُ",
    transliteration: "As-Samad",
    english: "The Eternal Refuge",
    meaning: "The Self-Sufficient Master upon Whom all creation depends for their needs, while He depends on none.",
    quranRef: "Surah Al-Ikhlas 112:2"
  },
  {
    id: 69,
    number: 69,
    arabic: "الْقَادِرُ",
    transliteration: "Al-Qadir",
    english: "The All-Capable",
    meaning: "The One who has total power to execute whatever He decrees, whenever He decrees.",
    quranRef: "Surah Al-Baqarah 2:20, Surah Al-An'am 6:65"
  },
  {
    id: 70,
    number: 70,
    arabic: "الْمُقْتَدِرُ",
    transliteration: "Al-Muqtadir",
    english: "The Supreme Determiner",
    meaning: "The One whose power is absolute over all destiny, controlling all outcomes with precision.",
    quranRef: "Surah Al-Qamar 54:42, Surah Al-Kahf 18:45"
  },
  {
    id: 71,
    number: 71,
    arabic: "الْمُقَدِّمُ",
    transliteration: "Al-Muqaddim",
    english: "The Expediter & Promoter",
    meaning: "The One who brings forward whatever He wills in accordance with wisdom and timing.",
    quranRef: "Surah Qaf 50:28, Sahih Al-Bukhari 6398"
  },
  {
    id: 72,
    number: 72,
    arabic: "الْمُؤَخِّرُ",
    transliteration: "Al-Mu'akhkhir",
    english: "The Postponer & Delayer",
    meaning: "The One who delays whatever He wills according to His perfect plan and divine order.",
    quranRef: "Surah Nuh 71:4, Sahih Al-Bukhari 6398"
  },
  {
    id: 73,
    number: 73,
    arabic: "الأَوَّلُ",
    transliteration: "Al-Awwal",
    english: "The First (Without Beginning)",
    meaning: "The One who existed before all creation, with no beginning to His existence.",
    quranRef: "Surah Al-Hadid 57:3"
  },
  {
    id: 74,
    number: 74,
    arabic: "الأَخِرُ",
    transliteration: "Al-Akhir",
    english: "The Last (Without End)",
    meaning: "The One who remains after all creation vanishes, with no end to His existence.",
    quranRef: "Surah Al-Hadid 57:3"
  },
  {
    id: 75,
    number: 75,
    arabic: "الظَّاهِرُ",
    transliteration: "Az-Zahir",
    english: "The Manifest & Evident",
    meaning: "The One whose existence is gloriously clear and evident through His signs throughout creation.",
    quranRef: "Surah Al-Hadid 57:3"
  },
  {
    id: 76,
    number: 76,
    arabic: "الْبَاطِنُ",
    transliteration: "Al-Batin",
    english: "The Hidden & Inward",
    meaning: "The One who cannot be seen by physical eyes in this world, yet knows all hidden secrets.",
    quranRef: "Surah Al-Hadid 57:3"
  },
  {
    id: 77,
    number: 77,
    arabic: "الْوَالِي",
    transliteration: "Al-Wali",
    english: "The Governing Master",
    meaning: "The One who governs, manages, and plans all affairs of the universe with supreme authority.",
    quranRef: "Surah Ar-Ra'd 13:11"
  },
  {
    id: 78,
    number: 78,
    arabic: "الْمُتَعَالِي",
    transliteration: "Al-Muta'ali",
    english: "The Most Exalted",
    meaning: "The One who is far above any human thought, defect, or comparison.",
    quranRef: "Surah Ar-Ra'd 13:9"
  },
  {
    id: 79,
    number: 79,
    arabic: "الْبَرُّ",
    transliteration: "Al-Barr",
    english: "The Source of All Goodness",
    meaning: "The One who is infinitely kind, beneficent, and good to His creation, fulfilling His promises.",
    quranRef: "Surah At-Tur 52:28"
  },
  {
    id: 80,
    number: 80,
    arabic: "التَّوَّابُ",
    transliteration: "At-Tawwab",
    english: "The Ever-Relenting",
    meaning: "The One who continuously accepts repentance and guides hearts back toward His forgiveness.",
    quranRef: "Surah Al-Baqarah 2:37, Surah An-Nasr 110:3"
  },
  {
    id: 81,
    number: 81,
    arabic: "الْمُنْتَقِمُ",
    transliteration: "Al-Muntaqim",
    english: "The Avenger of Injustice",
    meaning: "The One who justly punishes persistent oppressors and unrepentant wrongdoers.",
    quranRef: "Surah As-Sajdah 32:22, Surah Az-Zukhruf 43:41"
  },
  {
    id: 82,
    number: 82,
    arabic: "الْعَفُوُّ",
    transliteration: "Al-'Afuww",
    english: "The Supreme Pardoner",
    meaning: "The One who pardons completely, erasing sins as if they were never committed.",
    quranRef: "Surah An-Nisa 4:43, Surah Al-Hajj 22:60"
  },
  {
    id: 83,
    number: 83,
    arabic: "الرَّؤُوفُ",
    transliteration: "Ar-Ra'uf",
    english: "The Most Compassionate",
    meaning: "The One with tender affection, compassion, and pity toward His creation.",
    quranRef: "Surah Al-Baqarah 2:207, Surah Al-Hashr 59:10"
  },
  {
    id: 84,
    number: 84,
    arabic: "مَالِكُ الْمُلْكِ",
    transliteration: "Malik-ul-Mulk",
    english: "Master of All Sovereignty",
    meaning: "The Owner of all dominion, who bestows kingdom and rule to whom He wills.",
    quranRef: "Surah Al-Imran 3:26"
  },
  {
    id: 85,
    number: 85,
    arabic: "ذُو الْجَلاَلِ وَالإِكْرَامِ",
    transliteration: "Dhul-Jalali wal-Ikram",
    english: "Lord of Majesty and Honor",
    meaning: "The Possessor of absolute grandeur, glory, and generous nobility worthy of devotion.",
    quranRef: "Surah Ar-Rahman 55:27, Surah Ar-Rahman 55:78"
  },
  {
    id: 86,
    number: 86,
    arabic: "الْمُقْسِطُ",
    transliteration: "Al-Muqsit",
    english: "The Equitable & Fair",
    meaning: "The One who acts with perfect justice, protecting the oppressed from the oppressor.",
    quranRef: "Surah Al-Imran 3:18, Surah Al-A'raf 7:29"
  },
  {
    id: 87,
    number: 87,
    arabic: "الْجَامِعُ",
    transliteration: "Al-Jami'",
    english: "The Gatherer of All",
    meaning: "The One who will gather all mankind together on the Day of Judgment without doubt.",
    quranRef: "Surah Al-Imran 3:9, Surah An-Nisa 4:140"
  },
  {
    id: 88,
    number: 88,
    arabic: "الْغَنِيُّ",
    transliteration: "Al-Ghaniyy",
    english: "The Self-Sufficient",
    meaning: "The One who is entirely free of any need, holding infinite riches and independence.",
    quranRef: "Surah Al-Baqarah 2:267, Surah Luqman 31:26"
  },
  {
    id: 89,
    number: 89,
    arabic: "الْمُغْنِي",
    transliteration: "Al-Mughni",
    english: "The Enricher",
    meaning: "The One who satisfies the needs of His creation and bestows wealth and contentment.",
    quranRef: "Surah Ad-Duha 93:8, Surah An-Najm 53:48"
  },
  {
    id: 90,
    number: 90,
    arabic: "الْمَانِعُ",
    transliteration: "Al-Mani'",
    english: "The Withholder & Defender",
    meaning: "The One who prevents harm, protects His servants, and stops adversity when He wills.",
    quranRef: "Surah Al-Mulk 67:21"
  },
  {
    id: 91,
    number: 91,
    arabic: "الضَّارُّ",
    transliteration: "Ad-Darr",
    english: "The Distresser (Testing through adversity)",
    meaning: "The One who creates hardship and trials as tests for spiritual growth and wisdom.",
    quranRef: "Surah Al-An'am 6:17, Surah Yunus 10:107"
  },
  {
    id: 92,
    number: 92,
    arabic: "النَّافِعُ",
    transliteration: "An-Nafi'",
    english: "The Benefactor",
    meaning: "The One who creates all benefit, goodness, health, and blessing for His creatures.",
    quranRef: "Surah Al-An'am 6:17, Surah Al-Fath 48:11"
  },
  {
    id: 93,
    number: 93,
    arabic: "النُّورُ",
    transliteration: "An-Nur",
    english: "The Light of the Heavens and Earth",
    meaning: "The One who illuminates the universe and guides hearts through the divine light of faith.",
    quranRef: "Surah An-Nur 24:35"
  },
  {
    id: 94,
    number: 94,
    arabic: "الْهَادِي",
    transliteration: "Al-Hadi",
    english: "The Ultimate Guide",
    meaning: "The One who provides guidance to the straight path of truth, peace, and salvation.",
    quranRef: "Surah Al-Hajj 22:54, Surah Al-Furqan 25:31"
  },
  {
    id: 95,
    number: 95,
    arabic: "الْبَدِيعُ",
    transliteration: "Al-Badi'",
    english: "The Incomparable Originator",
    meaning: "The One who creates marvelous things of unsurpassed beauty without prior example.",
    quranRef: "Surah Al-Baqarah 2:117, Surah Al-An'am 6:101"
  },
  {
    id: 96,
    number: 96,
    arabic: "الْبَاقِي",
    transliteration: "Al-Baqi",
    english: "The Everlasting",
    meaning: "The One who remains forever, unaffected by time, decay, or end of creation.",
    quranRef: "Surah Ar-Rahman 55:27, Surah Taha 20:73"
  },
  {
    id: 97,
    number: 97,
    arabic: "الْوَارِثُ",
    transliteration: "Al-Warith",
    english: "The Supreme Inheritor",
    meaning: "The One to whom all possessions and realms return after all creation ceases to exist.",
    quranRef: "Surah Al-Hijr 15:23, Surah Al-Qasas 28:58"
  },
  {
    id: 98,
    number: 98,
    arabic: "الرَّشِيدُ",
    transliteration: "Ar-Rashid",
    english: "The Righteous Guide",
    meaning: "The One who guides all affairs toward their perfect fulfillment with wisdom and rectitude.",
    quranRef: "Surah Al-Kahf 18:10, Surah Hud 11:87"
  },
  {
    id: 99,
    number: 99,
    arabic: "الصَّبُورُ",
    transliteration: "As-Sabur",
    english: "The Most Patient",
    meaning: "The One who is infinitely patient, never hasty in action, giving every creature time and chance.",
    quranRef: "Surah Al-Baqarah 2:153, Sahih Al-Bukhari 6099"
  }
];
