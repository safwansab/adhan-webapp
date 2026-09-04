/**
 * Daily Adhkar & Tahajjud Data Repository & Calculator
 */

const DHIKR_DATA = {
  morning: [
    {
      id: "m1",
      arabic: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ...",
      transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum...",
      english: "Ayat al-Kursi: Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.",
      targetCount: 1,
      benefit: "Protected from Jinns & evil until evening."
    },
    {
      id: "m2",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah...",
      english: "We have reached the morning and at this very time unto Allah belongs all sovereignty...",
      targetCount: 1,
      benefit: "Declaring Allah's ultimate sovereignty every morning."
    },
    {
      id: "m3",
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu wa ilaykan-nushur.",
      english: "O Allah, by Your leave we have reached the morning and by Your leave we reach the evening...",
      targetCount: 1,
      benefit: "Prophetic morning declaration."
    },
    {
      id: "m4",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
      transliteration: "Subhan-Allahi wa bihamdihi: 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatihi.",
      english: "Glory be to Allah and praise Him, according to the number of His creation...",
      targetCount: 3,
      benefit: "Heavy in reward, equivalent to hours of continuous remembrance."
    },
    {
      id: "m5",
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      transliteration: "Astaghfirullaha wa atubu ilayh.",
      english: "I seek the forgiveness of Allah and repent to Him.",
      targetCount: 100,
      benefit: "Clears sins, opens doors of sustenance and peace."
    }
  ],

  evening: [
    {
      id: "e1",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Amsayna wa-amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah.",
      english: "We have reached the evening and at this very time unto Allah belongs all sovereignty...",
      targetCount: 1,
      benefit: "Evening protection and gratitude."
    },
    {
      id: "e2",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.",
      english: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      targetCount: 3,
      benefit: "Protection against all harm, poisons & evil creatures at night."
    },
    {
      id: "e3",
      arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim.",
      english: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heavens...",
      targetCount: 3,
      benefit: "Guarantees no unexpected affliction or harm will touch you."
    },
    {
      id: "e4",
      arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      transliteration: "Allahumma salli wa sallim 'ala nabiyyina Muhammad.",
      english: "O Allah, send peace and blessings upon our Prophet Muhammad.",
      targetCount: 10,
      benefit: "Earns the intercession of Prophet Muhammad (ﷺ) on Judgment Day."
    }
  ],

  sleep: [
    {
      id: "s1",
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا...",
      transliteration: "Bismika Rabbi wada'tu janbi wa bika arfa'uh, fa-in amsakta nafsi farhamha...",
      english: "In Your name my Lord, I lie down and in Your name I rise...",
      targetCount: 1,
      benefit: "Protection of the soul during sleep."
    },
    {
      id: "s2",
      arabic: "سُبْحَانَ اللَّهِ (٣٣) ، اَلْحَمْدُ لِلَّهِ (٣٣) ، اَللَّهُ أَكْبَرُ (٣٤)",
      transliteration: "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x)",
      english: "Tasbeeh of Fatima (RA): 33x SubhanAllah, 33x Alhamdulillah, 34x Allahu Akbar.",
      targetCount: 100,
      benefit: "Gives spiritual energy superior to physical rest."
    },
    {
      id: "s3",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      transliteration: "Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas (Recite into hands & wipe over body 3x)",
      english: "Recite the 3 Quls into cupped hands, blow gently, and wipe over your body starting from head.",
      targetCount: 3,
      benefit: "Complete body protection against nightmares & evil eye."
    }
  ],

  tahajjud: [
    {
      id: "t1",
      arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالأَرْضِ...",
      transliteration: "Allahumma lakal-hamdu Anta nurus-samawati wal-ardi wa man fihinna...",
      english: "O Allah, to You belongs all praise! You are the Light of the heavens and the earth and all that is within them...",
      targetCount: 1,
      benefit: "The Prophet's (ﷺ) authentic Tahajjud opening du'a."
    },
    {
      id: "t2",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
      english: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
      targetCount: 3,
      benefit: "Comprehensive supplication for this life and the next."
    },
    {
      id: "t3",
      arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
      transliteration: "Rabbana-ghfir li wa li-walidayya wa lil-mu'minina yawma yaqumul-hisab.",
      english: "Our Lord, forgive me and my parents and the believers on the Day the account is established.",
      targetCount: 3,
      benefit: "Supplication for parents and all believers in the blessed night."
    }
  ]
};

/**
 * Calculates the Last Third of the Night (Tahajjud window) based on Maghrib & Fajr times
 */
function calculateTahajjudWindow(maghribStr, fajrStr) {
  if (!maghribStr || !fajrStr || maghribStr === "--:--" || fajrStr === "--:--") {
    return { startTime: "01:30 AM", endTime: "04:30 AM", durationMins: 180 };
  }

  const maghribMins = parseTimeToMinutes(maghribStr);
  let fajrMins = parseTimeToMinutes(fajrStr);

  if (fajrMins <= maghribMins) {
    fajrMins += 24 * 60;
  }

  const totalNightMins = fajrMins - maghribMins;
  const oneThirdMins = totalNightMins / 3.0;

  const tahajjudStartMins = fajrMins - oneThirdMins;
  const tahajjudEndMins = fajrMins - 10;

  const startTime12 = formatMinutesTo12h(tahajjudStartMins);
  const endTime12 = formatMinutesTo12h(tahajjudEndMins);

  return {
    startTime: startTime12,
    endTime: endTime12,
    totalNightHours: (totalNightMins / 60.0).toFixed(1)
  };
}

function parseTimeToMinutes(tStr) {
  if (!tStr) return 0;
  const isPM = tStr.toLowerCase().includes("pm");
  const isAM = tStr.toLowerCase().includes("am");
  let clean = tStr.replace(/am|pm/gi, "").trim();
  const parts = clean.split(":");
  let h = parseInt(parts[0], 10);
  let m = parseInt(parts[1], 10);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  return h * 60 + m;
}

function formatMinutesTo12h(totalMins) {
  let mins = Math.floor(totalMins) % (24 * 60);
  if (mins < 0) mins += 24 * 60;
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

window.DHIKR_DATA = DHIKR_DATA;
window.calculateTahajjudWindow = calculateTahajjudWindow;
