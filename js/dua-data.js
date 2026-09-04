/**
 * Authentic Duas Repository
 * 50 Categorized Duas from the Holy Quran & Sunnah with Arabic, Transliteration & English
 */

const DUA_CATEGORIES = [
  { id: "rabbana", label: "🌟 Rabbana Duas (40 Quranic)" },
  { id: "protection", label: "🛡️ Protection & Refuge" },
  { id: "forgiveness", label: "🤍 Forgiveness & Mercy" },
  { id: "family", label: "👨‍👩‍👧 Parents & Family" },
  { id: "health", label: "🤲 Health & Healing" },
  { id: "guidance", label: "💡 Guidance & Wisdom" }
];

const DUA_COLLECTION = [
  // --- 40 RABBANA DUAS ---
  {
    id: "r1",
    category: "rabbana",
    title: "1. Rabbana - Acceptance of Deeds",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka Antas-Sami'ul-'Alim.",
    translation: "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.",
    source: "Surah Al-Baqarah (2:127)"
  },
  {
    id: "r2",
    category: "rabbana",
    title: "2. Rabbana - Make Us Submissive to You",
    arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbana waj'alna muslimayni laka wa min dhurriyyatina ummatan muslimatan laka...",
    translation: "Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation obedient to You.",
    source: "Surah Al-Baqarah (2:128)"
  },
  {
    id: "r3",
    category: "rabbana",
    title: "3. Rabbana - Goodness in Dunya & Akhirah",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    translation: "Our Lord, grant us good in this world and good in the Hereafter and save us from the punishment of the Fire.",
    source: "Surah Al-Baqarah (2:201)"
  },
  {
    id: "r4",
    category: "rabbana",
    title: "4. Rabbana - Bestow Patience & Steadfastness",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana afrig 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin.",
    translation: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
    source: "Surah Al-Baqarah (2:250)"
  },
  {
    id: "r5",
    category: "rabbana",
    title: "5. Rabbana - Do Not Punish Us If We Forget",
    arabic: "رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
    transliteration: "Rabbana la tu'akhidhna in-nasina aw akhta'na.",
    translation: "Our Lord, do not impose blame upon us if we have forgotten or erred.",
    source: "Surah Al-Baqarah (2:286)"
  },
  {
    id: "r6",
    category: "rabbana",
    title: "6. Rabbana - Do Not Lay Upon Us Heavy Burdens",
    arabic: "رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْراً كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
    transliteration: "Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alalladhina min qablina.",
    translation: "Our Lord, and lay not upon us a burden like that which You laid upon those before us.",
    source: "Surah Al-Baqarah (2:286)"
  },
  {
    id: "r7",
    category: "rabbana",
    title: "7. Rabbana - Pardon Us & Forgive Us",
    arabic: "رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana wa la tuhammilna ma la taqata lana bih, wa'fu 'anna waghfir lana warhamna...",
    translation: "Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us.",
    source: "Surah Al-Baqarah (2:286)"
  },
  {
    id: "r8",
    category: "rabbana",
    title: "8. Rabbana - Let Not Our Hearts Swerve",
    arabic: "رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmatan innaka antal-Wahhab.",
    translation: "Our Lord, let not our hearts swerve after You have guided us and grant us from Yourself mercy.",
    source: "Surah Ali 'Imran (3:8)"
  },
  {
    id: "r9",
    category: "rabbana",
    title: "9. Rabbana - Gathering of Mankind",
    arabic: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لاَّ رَيْبَ فِيهِ إِنَّ اللَّهَ لاَ يُخْلِفُ الْمِيعَادَ",
    transliteration: "Rabbana innaka jaami'un-naasi li-Yawmil laa rayba fiih...",
    translation: "Our Lord, surely You will gather the people for a Day about which there is no doubt.",
    source: "Surah Ali 'Imran (3:9)"
  },
  {
    id: "r10",
    category: "rabbana",
    title: "10. Rabbana - Forgive Our Sins & Save Us From Hell",
    arabic: "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana innana amanna faghfir lana dhunubana wa qina 'adhaban-nar.",
    translation: "Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire.",
    source: "Surah Ali 'Imran (3:16)"
  },
  {
    id: "r11",
    category: "rabbana",
    title: "11. Rabbana - We Believe in What You Revealed",
    arabic: "رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
    transliteration: "Rabbana amanna bima anzalta wattaba'nar-Rasula faktubna ma'ash-shahidin.",
    translation: "Our Lord, we have believed in what You revealed and have followed the messenger, so register us among the witnesses.",
    source: "Surah Ali 'Imran (3:53)"
  },
  {
    id: "r12",
    category: "rabbana",
    title: "12. Rabbana - Forgive Our Transgressions",
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana-ghfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana...",
    translation: "Our Lord, forgive us our sins and the excess in our affairs and plant firmly our feet and give us victory...",
    source: "Surah Ali 'Imran (3:147)"
  },
  {
    id: "r13",
    category: "rabbana",
    title: "13. Rabbana - You Did Not Create This In Vain",
    arabic: "رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلاً سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana ma khalaqta hadha batilan subhanaka faqina 'adhaban-nar.",
    translation: "Our Lord, You did not create this aimlessly; exalted are You [above such a thing]; then protect us from the punishment of the Fire.",
    source: "Surah Ali 'Imran (3:191)"
  },
  {
    id: "r14",
    category: "rabbana",
    title: "14. Rabbana - Whom You Admit to the Fire is Disgraced",
    arabic: "رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ",
    transliteration: "Rabbana innaka man tudkhilin-nara faqad akhzaytah...",
    translation: "Our Lord, indeed whoever You admit to the Fire - You have disgraced him, and for the wrongdoers there are no helpers.",
    source: "Surah Ali 'Imran (3:192)"
  },
  {
    id: "r15",
    category: "rabbana",
    title: "15. Rabbana - We Heard a Caller Calling to Faith",
    arabic: "رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِياً يُنَادِي لِلإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا",
    transliteration: "Rabbana innana sami'na munadiyan yunadi lil-imani an aminu bi-Rabbikum fa-amanna...",
    translation: "Our Lord, indeed we have heard a caller calling to faith, [saying], 'Believe in your Lord,' and we have believed.",
    source: "Surah Ali 'Imran (3:193)"
  },
  {
    id: "r16",
    category: "rabbana",
    title: "16. Rabbana - Remove Our Evil Deeds & Die With Righteous",
    arabic: "رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الأَبْرَارِ",
    transliteration: "Rabbana faghfir lana dhunubana wa kaffir 'anna sayyi'atina wa tawaffana ma'al-abrar.",
    translation: "Our Lord, so forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.",
    source: "Surah Ali 'Imran (3:193)"
  },
  {
    id: "r17",
    category: "rabbana",
    title: "17. Rabbana - Grant Us What You Promised Us",
    arabic: "رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَى رُسُلِكَ وَلاَ تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لاَ تُخْلِفُ الْمِيعَادَ",
    transliteration: "Rabbana wa atina ma wa'adtana 'ala rusulika wa la tukhzina Yawmal-Qiyamah...",
    translation: "Our Lord, and grant us what You promised us through Your messengers and do not disgrace us on the Day of Resurrection.",
    source: "Surah Ali 'Imran (3:194)"
  },
  {
    id: "r18",
    category: "rabbana",
    title: "18. Rabbana - We Have Believed, Write Us With Witnesses",
    arabic: "رَبَّنَا آمَنَّا فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
    transliteration: "Rabbana amanna faktubna ma'ash-shahidin.",
    translation: "Our Lord, we have believed, so register us among the witnesses.",
    source: "Surah Al-Ma'idah (5:83)"
  },
  {
    id: "r19",
    category: "rabbana",
    title: "19. Rabbana - Send Down Table Spread From Heaven",
    arabic: "رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيداً لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ",
    transliteration: "Rabbana anzil 'alayna ma'idatam-minas-sama'i takunu lana 'idal-li-awwalina...",
    translation: "O Allah, our Lord, send down to us a table [spread with food] from the heaven to be for us a festival...",
    source: "Surah Al-Ma'idah (5:114)"
  },
  {
    id: "r20",
    category: "rabbana",
    title: "20. Rabbana - We Have Wronged Ourselves",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana dhalamna anfusana wa il-lam taghfir lana wa tarhamna lanakunanna minal-khasirin.",
    translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    source: "Surah Al-A'raf (7:23)"
  },
  {
    id: "r21",
    category: "rabbana",
    title: "21. Rabbana - Place Us Not With Wrongdoers",
    arabic: "رَبَّنَا لاَ تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
    transliteration: "Rabbana la taj'alna ma'al-qawmidh-dhalimin.",
    translation: "Our Lord, do not place us with the wrongdoing people.",
    source: "Surah Al-A'raf (7:47)"
  },
  {
    id: "r22",
    category: "rabbana",
    title: "22. Rabbana - Decide Between Us in Truth",
    arabic: "رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ",
    transliteration: "Rabbanaftah baynana wa bayna qawmina bil-haqqi wa Anta khayrul-fatihin.",
    translation: "Our Lord, decide between us and our people in truth, and You are the best of those who give decision.",
    source: "Surah Al-A'raf (7:89)"
  },
  {
    id: "r23",
    category: "rabbana",
    title: "23. Rabbana - Pour Patience & Cause Us to Die as Muslims",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Rabbana afrig 'alayna sabran wa tawaffana muslimin.",
    translation: "Our Lord, pour upon us patience and let us die as Muslims [in submission to You].",
    source: "Surah Al-A'raf (7:126)"
  },
  {
    id: "r24",
    category: "rabbana",
    title: "24. Rabbana - Make Us Not Trial for Oppressors",
    arabic: "رَبَّنَا لاَ تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana la taj'alna fitnatal-lil-qawmidh-dhalimin. Wa najjina bi-rahmatika minal-qawmil-kafirin.",
    translation: "Our Lord, make us not [objects of] trial for the wrongdoing people, and save us by Your mercy from the disbelieving people.",
    source: "Surah Yunus (10:85-86)"
  },
  {
    id: "r25",
    category: "rabbana",
    title: "25. Rabbana - You Know What We Conceal & Declare",
    arabic: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ وَمَا يَخْفَى عَلَى اللَّهِ مِن شَيْءٍ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ",
    transliteration: "Rabbana innaka ta'lamu ma nukhfi wa ma nu'lin...",
    translation: "Our Lord, indeed You know what we conceal and what we declare, and nothing is hidden from Allah on the earth or in the heaven.",
    source: "Surah Ibrahim (14:38)"
  },
  {
    id: "r26",
    category: "rabbana",
    title: "26. Rabbana - Make Me & Descendants Establish Prayer",
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    transliteration: "Rabbij-'alni muqimas-salati wa min dhurriyyati Rabbana wa taqabbal du'a.",
    translation: "My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.",
    source: "Surah Ibrahim (14:40)"
  },
  {
    id: "r27",
    category: "rabbana",
    title: "27. Rabbana - Forgive Me & My Parents & Believers",
    arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    transliteration: "Rabbana-ghfir li wa li-walidayya wa lil-mu'minina Yawma yaqumul-hisab.",
    translation: "Our Lord, forgive me and my parents and the believers on the Day the account is established.",
    source: "Surah Ibrahim (14:41)"
  },
  {
    id: "r28",
    category: "rabbana",
    title: "28. Rabbana - Grant Mercy From Yourself",
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَداً",
    transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada.",
    translation: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
    source: "Surah Al-Kahf (18:10)"
  },
  {
    id: "r29",
    category: "rabbana",
    title: "29. Rabbana - Increase Me In Knowledge",
    arabic: "رَّبِّ زِدْنِي عِلْماً",
    transliteration: "Rabbi zidni 'ilma.",
    translation: "My Lord, increase me in knowledge.",
    source: "Surah Taha (20:114)"
  },
  {
    id: "r30",
    category: "rabbana",
    title: "30. Rabbana - We Have Believed So Forgive Us",
    arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ",
    transliteration: "Rabbana amanna faghfir lana warhamna wa Anta khayrur-rahimin.",
    translation: "Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.",
    source: "Surah Al-Mu'minun (23:109)"
  },
  {
    id: "r31",
    category: "rabbana",
    title: "31. Rabbana - Avert From Us Punishment of Hell",
    arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَاماً",
    transliteration: "Rabbanas-rif 'anna 'adhaba Jahannama inna 'adhabaha kana gharama.",
    translation: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is agonizing.",
    source: "Surah Al-Furqan (25:65)"
  },
  {
    id: "r32",
    category: "rabbana",
    title: "32. Rabbana - Grant Us Comfort in Spouse & Children",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَاماً",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
    translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    source: "Surah Al-Furqan (25:74)"
  },
  {
    id: "r33",
    category: "rabbana",
    title: "33. Rabbana - Lord Encompasses All Things in Mercy",
    arabic: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْماً فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ",
    transliteration: "Rabbana wasi'ta kulla shay'ir-rahmatan wa 'ilman faghfir lilladhina tabu...",
    translation: "Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way...",
    source: "Surah Ghafir (40:7)"
  },
  {
    id: "r34",
    category: "rabbana",
    title: "34. Rabbana - Admit Them To Gardens of Eden",
    arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُم وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ",
    transliteration: "Rabbana wa adkhilhum jannati 'adninal-lati wa'adtahum...",
    translation: "Our Lord, and admit them to gardens of perpetual residence which You have promised them and whoever was righteous...",
    source: "Surah Ghafir (40:8)"
  },
  {
    id: "r35",
    category: "rabbana",
    title: "35. Rabbana - Forgive Us & Our Brothers Before Us",
    arabic: "رَبَّنَا اغْفِرْ لَنَا وَلإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالإِيمَانِ وَلاَ تَجْعَلْ فِي قُلُوبِنَا غِلاًّ لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَؤُوفٌ رَّحِيمٌ",
    transliteration: "Rabbana-ghfir lana wa li-ikhwaninal-ladhina sabaquna bil-imani...",
    translation: "Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts resentment toward those who have believed.",
    source: "Surah Al-Hashr (59:10)"
  },
  {
    id: "r36",
    category: "rabbana",
    title: "36. Rabbana - Upon You We Have Relied",
    arabic: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Rabbana 'alayka tawakkalna wa ilayka anabna wa ilaykal-masir.",
    translation: "Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.",
    source: "Surah Al-Mumtahanah (60:4)"
  },
  {
    id: "r37",
    category: "rabbana",
    title: "37. Rabbana - Make Us Not Trial for Disbelievers",
    arabic: "رَبَّنَا لاَ تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ",
    transliteration: "Rabbana la taj'alna fitnatal-lilladhina kafaru waghfir lana Rabbana...",
    translation: "Our Lord, make us not [objects of] trial for the disbelievers and forgive us, our Lord. Indeed, it is You who is the Exalted in Might...",
    source: "Surah Al-Mumtahanah (60:5)"
  },
  {
    id: "r38",
    category: "rabbana",
    title: "38. Rabbana - Perfect For Us Our Light",
    arabic: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Rabbana atmim lana nurana waghfir lana innaka 'ala kulli shay'in qadir.",
    translation: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.",
    source: "Surah At-Tahrim (66:8)"
  },
  {
    id: "r39",
    category: "rabbana",
    title: "39. Rabbana - Build For Me Near You House in Paradise",
    arabic: "رَبِّ ابْنِ لِي عِندَكَ بَيْتَاً فِي الْجَنَّةِ",
    transliteration: "Rabbib-ni li 'indaka baytan fil-jannah.",
    translation: "My Lord, build for me near You a house in Paradise.",
    source: "Surah At-Tahrim (66:11)"
  },
  {
    id: "r40",
    category: "rabbana",
    title: "40. Rabbana - Save Me From Wrongdoing People",
    arabic: "رَبِّ نَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ",
    transliteration: "Rabbi najjini minal-qawmidh-dhalimin.",
    translation: "My Lord, save me from the wrongdoing people.",
    source: "Surah Al-Qasas (28:21)"
  },

  // --- ADDITIONAL CATEGORIZED AUTHENTIC DUAS (41 TO 50) ---
  {
    id: "d41",
    category: "protection",
    title: "41. Sayyidul Istighfar (Master Supplication)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka...",
    translation: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant...",
    source: "Sahih al-Bukhari 6306"
  },
  {
    id: "d42",
    category: "protection",
    title: "42. Protection Against Harm & Distress",
    arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i...",
    translation: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heavens...",
    source: "Sunan Abu Dawud 5088"
  },
  {
    id: "d43",
    category: "health",
    title: "43. Prophet Ayyub's (Job) Dua for Healing",
    arabic: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
    transliteration: "Anni massaniyad-durru wa Anta Arhamur-rahimin.",
    translation: "Indeed, adversity has touched me, and You are the Most Merciful of the merciful.",
    source: "Surah Al-Anbiya (21:83)"
  },
  {
    id: "d44",
    category: "health",
    title: "44. Supplication for Curing Sickness",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَماً",
    transliteration: "Allahumma Rabban-nas, adh-hibil-ba's, ishfi wa Antash-Shafi...",
    translation: "O Allah, Lord of mankind, remove the suffering! Heal, for You are the Healer. There is no cure except Your cure...",
    source: "Sahih al-Bukhari 5743"
  },
  {
    id: "d45",
    category: "guidance",
    title: "45. Prophet Musa's (Moses) Dua for Ease & Speech",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbish-rah li sadri wa yassir li amri wahlul 'uqdatam-mil-lisani yafqahu qawli.",
    translation: "My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.",
    source: "Surah Taha (20:25-28)"
  },
  {
    id: "d46",
    category: "guidance",
    title: "46. Dua for Any Need or Good Provision",
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir.",
    translation: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
    source: "Surah Al-Qasas (28:24)"
  },
  {
    id: "d47",
    category: "forgiveness",
    title: "47. Dua of Prophet Yunus (Jonah in Whale)",
    arabic: "لاَ إِلَهَ إِلاَّ أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minadh-dhalimin.",
    translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    source: "Surah Al-Anbiya (21:87)"
  },
  {
    id: "d48",
    category: "protection",
    title: "48. Refuge From Anxiety & Debt",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani...",
    translation: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, and debt...",
    source: "Sahih al-Bukhari 2893"
  },
  {
    id: "d49",
    category: "family",
    title: "49. Dua for Parents' Forgiveness & Mercy",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيراً",
    transliteration: "Rabbir-hamhuma kama rabbayani saghira.",
    translation: "My Lord, have mercy upon them both as they brought me up [when I was] small.",
    source: "Surah Al-Isra (17:24)"
  },
  {
    id: "d50",
    category: "guidance",
    title: "50. Seeking Firmness on Allah's Religion",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik.",
    translation: "O Turner of the hearts, make my heart firm upon Your religion.",
    source: "Sunan at-Tirmidhi 3522"
  }
];

window.DUA_CATEGORIES = DUA_CATEGORIES;
window.DUA_COLLECTION = DUA_COLLECTION;
