/**
 * Main Application Bootstrap & State Controller
 * Features full Town Selection, Regional Indian Town Presets & Solar Calculations
 */

class AdhanApp {
  constructor() {
    this.presetTowns = [
      { name: "Kumta", country: "India", lat: 14.4777, lng: 74.2206, method: "MWL" },
      { name: "Honnavar", country: "India", lat: 14.2800, lng: 74.4400, method: "MWL" },
      { name: "Bhatkal", country: "India", lat: 13.9800, lng: 74.5700, method: "MWL" },
      { name: "Karwar", country: "India", lat: 14.8100, lng: 74.1300, method: "MWL" },
      { name: "Sirsi", country: "India", lat: 14.6200, lng: 74.8400, method: "MWL" },
      { name: "Ankola", country: "India", lat: 14.6600, lng: 74.3000, method: "MWL" },
      { name: "Mangalore", country: "India", lat: 12.9141, lng: 74.8560, method: "MWL" },
      { name: "Goa", country: "India", lat: 15.4989, lng: 73.8278, method: "MWL" },
      { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, method: "MWL" },
      { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, method: "Karachi" },
      { name: "Makkah", country: "Saudi Arabia", lat: 21.3891, lng: 39.8579, method: "Makkah" },
      { name: "Madinah", country: "Saudi Arabia", lat: 24.5247, lng: 39.5692, method: "Makkah" }
    ];

    // Load saved town from localStorage if present, else default Kumta
    const savedTown = localStorage.getItem("active_town");
    if (savedTown) {
      try {
        this.currentLocation = JSON.parse(savedTown);
      } catch (e) {
        this.currentLocation = { ...this.presetTowns[0] };
      }
    } else {
      this.currentLocation = { ...this.presetTowns[0] };
    }

    this.calculationMethod = this.currentLocation.method || "MWL";
    this.juristicSchool = "Shafi";
    this.prayerTimes = null;
    this.jamaatSettings = null;
    this.mosqueProfile = null;
    this.announcements = [];
    
    this.audioPlayer = new AdhanAudioPlayer();
    this.qiblaCompass = null;
    this.tvMode = null;
    this.adminDashboard = null;
    
    this.timerId = null;
    this.activePrayerKey = null;
    this.nextPrayerInfo = null;

    this.activeDhikrTab = "morning";
    this.dhikrCounts = {};

    this.activeSurahId = "fatiha";
    this.activeDuaCategory = "rabbana";
    this.duaSearchQuery = "";
    this.tasbihCount = parseInt(localStorage.getItem("tasbih_count") || "0", 10);
    this.tasbihPreset = localStorage.getItem("tasbih_preset") || "subhanallah";
    this.lastPlayedAdhanKey = null;

    // 99 Names State
    this.namesSearchQuery = "";
    this.namesViewMode = "grid";
    this.namesCurrentAudioIndex = 0;
    this.namesIsPlayingAll = false;
    this.namesAudioUtterance = null;
    this.flashcardIndex = 0;
    this.flashcardRevealed = false;
    this.activeDetailName = null;
    this.nameTasbihCounts = {};

    // Quran Reader Bookmarks & Reading Progress State
    try {
      this.quranBookmark = JSON.parse(localStorage.getItem("quran_bookmark") || "null");
      this.quranReadVerses = JSON.parse(localStorage.getItem("quran_read_verses") || "{}");
    } catch (e) {
      this.quranBookmark = null;
      this.quranReadVerses = {};
    }

    this.init();
  }

  async init() {
    this.initTheme();
    this.qiblaCompass = new QiblaCompass("qibla-needle", "qibla-heading", "qibla-distance");
    this.qiblaCompass.initDeviceOrientation();

    this.tvMode = new MosqueTvMode("app-tv-container");
    this.adminDashboard = new AdminDashboard(this);

    this.bindEvents();
    this.renderTownChips();
    await this.reloadAllData();
    this.startClockLoop();
  }

  initTheme() {
    const savedTheme = localStorage.getItem("app_theme") || "emerald_gold";
    this.setTheme(savedTheme);
  }

  setTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("app_theme", themeName);
    const sel = document.getElementById("theme-select");
    if (sel) sel.value = themeName;
  }

  bindEvents() {
    // Adhan Stop Button
    document.getElementById("btn-stop-adhan")?.addEventListener("click", () => {
      this.stopAdhanRecitation();
    });
    // Dhikr Modal Listeners
    document.getElementById("btn-open-dhikr")?.addEventListener("click", () => {
      this.openDhikrModal();
    });

    document.getElementById("btn-close-dhikr")?.addEventListener("click", () => {
      this.closeDhikrModal();
    });

    document.querySelectorAll(".dhikr-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.getAttribute("data-tab");
        this.renderDhikrTab(tab);
      });
    });

    // Quran Modal Events
    document.getElementById("btn-open-quran")?.addEventListener("click", () => this.openQuranModal());
    document.getElementById("btn-close-quran")?.addEventListener("click", () => this.closeQuranModal());
    document.getElementById("btn-jump-bookmark")?.addEventListener("click", () => this.jumpToQuranBookmark());
    document.getElementById("quran-surah-select")?.addEventListener("change", (e) => {
      this.renderQuranSurah(e.target.value);
    });
    document.getElementById("quran-search-input")?.addEventListener("input", (e) => {
      this.initQuranSurahDropdown(e.target.value.toLowerCase().trim());
    });
    document.getElementById("btn-prev-surah")?.addEventListener("click", () => {
      const current = parseInt(this.activeSurahNumber || 1, 10);
      const prev = current > 1 ? current - 1 : 114;
      this.renderQuranSurah(prev);
    });
    document.getElementById("btn-next-surah")?.addEventListener("click", () => {
      const current = parseInt(this.activeSurahNumber || 1, 10);
      const next = current < 114 ? current + 1 : 1;
      this.renderQuranSurah(next);
    });

    // Duas Modal Events
    document.getElementById("btn-open-dua")?.addEventListener("click", () => this.openDuaModal());
    document.getElementById("btn-close-dua")?.addEventListener("click", () => this.closeDuaModal());
    document.getElementById("dua-search-input")?.addEventListener("input", (e) => {
      this.duaSearchQuery = e.target.value.toLowerCase().trim();
      this.renderDuas();
    });

    // Tasbih Counter Events
    document.getElementById("btn-open-tasbih")?.addEventListener("click", () => this.openTasbihModal());
    document.getElementById("btn-close-tasbih")?.addEventListener("click", () => this.closeTasbihModal());
    document.getElementById("btn-tasbih-tap")?.addEventListener("click", () => this.incrementTasbih());
    document.getElementById("btn-tasbih-reset")?.addEventListener("click", () => this.resetTasbih());
    document.getElementById("tasbih-preset-select")?.addEventListener("change", (e) => {
      this.tasbihPreset = e.target.value;
      localStorage.setItem("tasbih_preset", this.tasbihPreset);
      this.updateTasbihDisplay();
    });

    // 99 Names Modal Events
    document.getElementById("btn-open-names")?.addEventListener("click", () => this.openNamesModal());
    document.getElementById("btn-close-names")?.addEventListener("click", () => this.closeNamesModal());
    document.getElementById("names-search-input")?.addEventListener("input", (e) => {
      this.namesSearchQuery = e.target.value.toLowerCase().trim();
      this.renderNamesContent();
    });

    document.getElementById("btn-names-view-grid")?.addEventListener("click", () => this.setNamesViewMode("grid"));
    document.getElementById("btn-names-view-list")?.addEventListener("click", () => this.setNamesViewMode("list"));
    document.getElementById("btn-names-view-flashcards")?.addEventListener("click", () => this.setNamesViewMode("flashcards"));

    document.getElementById("btn-names-play-all")?.addEventListener("click", () => this.toggleNamesPlayAll());
    document.getElementById("btn-names-audio-prev")?.addEventListener("click", () => this.playPrevNameAudio());
    document.getElementById("btn-names-audio-pause")?.addEventListener("click", () => this.toggleNamesPlayAll());
    document.getElementById("btn-names-audio-next")?.addEventListener("click", () => this.playNextNameAudio());
    document.getElementById("names-audio-speed")?.addEventListener("change", (e) => {
      if (this.namesAudioUtterance) {
        this.namesAudioUtterance.rate = parseFloat(e.target.value);
      }
    });

    document.getElementById("btn-close-name-detail")?.addEventListener("click", () => this.closeNameDetailModal());
    document.getElementById("btn-ndetail-play-audio")?.addEventListener("click", () => {
      if (this.activeDetailName) {
        this.speakName(this.activeDetailName);
      }
    });
    document.getElementById("btn-ndetail-tasbih-tap")?.addEventListener("click", () => this.incrementNameTasbih());
    document.getElementById("btn-ndetail-tasbih-reset")?.addEventListener("click", () => this.resetNameTasbih());

    // Theme Switcher Event
    document.getElementById("theme-select")?.addEventListener("change", (e) => {
      this.setTheme(e.target.value);
    });

    // Dropdown Location Toggle
    const locDropdown = document.getElementById("btn-location-dropdown");
    const searchResults = document.getElementById("city-search-results");

    locDropdown?.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentDisplay = searchResults.style.display;
      searchResults.style.display = currentDisplay === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
      if (searchResults) searchResults.style.display = "none";
    });

    // City Search & Autocomplete
    const searchInput = document.getElementById("city-search-input");

    searchInput?.addEventListener("click", (e) => e.stopPropagation());
    searchInput?.addEventListener("input", async (e) => {
      const q = e.target.value.trim();
      if (q.length < 1) {
        return;
      }
      try {
        const resp = await fetch(`/api/cities?query=${encodeURIComponent(q)}`);
        const cities = await resp.json();
        this.renderCityDropdown(cities);
      } catch (err) {
        console.warn("City search API error", err);
      }
    });

    // Detect GPS Location Button
    document.getElementById("btn-detect-gps")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.selectTown({
              name: "GPS Location",
              country: "Auto-detected",
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
              method: this.calculationMethod
            });
            searchResults.style.display = "none";
          },
          (err) => alert("Could not fetch GPS position. Please check location permissions.")
        );
      }
    });

    // Custom Town Modal
    document.getElementById("btn-open-custom-town")?.addEventListener("click", (e) => {
      e.stopPropagation();
      searchResults.style.display = "none";
      document.getElementById("custom-town-modal")?.classList.add("show");
    });

    document.getElementById("btn-close-custom-town")?.addEventListener("click", () => {
      document.getElementById("custom-town-modal")?.classList.remove("show");
    });

    document.getElementById("form-custom-town")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("ctown-name").value.trim();
      const country = document.getElementById("ctown-country").value.trim();
      const lat = parseFloat(document.getElementById("ctown-lat").value);
      const lng = parseFloat(document.getElementById("ctown-lng").value);

      const newTown = { name, country, lat, lng, method: this.calculationMethod };
      this.presetTowns.unshift(newTown);
      this.selectTown(newTown);
      this.renderTownChips();
      
      document.getElementById("custom-town-modal")?.classList.remove("show");
      document.getElementById("form-custom-town").reset();
    });

    // Method and School Selectors
    document.getElementById("calc-method-select")?.addEventListener("change", (e) => {
      this.calculationMethod = e.target.value;
      this.updatePrayerTimes();
    });

    document.getElementById("juristic-school-select")?.addEventListener("change", (e) => {
      this.juristicSchool = e.target.value;
      this.updatePrayerTimes();
    });

    // Audio Controls
    document.getElementById("reciter-select")?.addEventListener("change", (e) => {
      this.audioPlayer.setReciter(e.target.value);
    });

    document.getElementById("volume-slider")?.addEventListener("input", (e) => {
      this.audioPlayer.setVolume(parseFloat(e.target.value));
    });

    document.getElementById("btn-test-audio")?.addEventListener("click", () => {
      this.audioPlayer.playAdhanSound();
    });

    // TV Mode Toggle
    document.getElementById("btn-toggle-tv")?.addEventListener("click", () => {
      this.tvMode.toggleFullscreen();
    });

    // Monthly Timetable Modal
    document.getElementById("btn-open-monthly")?.addEventListener("click", () => {
      this.renderMonthlyTimetable();
      document.getElementById("monthly-modal").classList.add("show");
    });

    document.getElementById("btn-close-monthly")?.addEventListener("click", () => {
      document.getElementById("monthly-modal").classList.remove("show");
    });

    document.getElementById("btn-export-csv")?.addEventListener("click", () => {
      this.exportMonthlyCsv();
    });
  }

  renderTownChips() {
    const container = document.getElementById("town-chips-container");
    if (!container) return;

    const localNames = ["Kumta", "Honnavar", "Bhatkal", "Karwar", "Sirsi", "Ankola"];
    const localTowns = this.presetTowns.filter(t => localNames.includes(t.name));
    const regionalTowns = this.presetTowns.filter(t => t.country === "India" && !localNames.includes(t.name));
    const holyCities = this.presetTowns.filter(t => t.country !== "India");

    const renderRowGroup = (label, towns) => `
      <div class="town-row-group">
        <div class="row-label-badge">${label}</div>
        <div class="row-chips-container">
          ${towns.map(town => {
            const isActive = this.currentLocation.name.toLowerCase() === town.name.toLowerCase();
            return `
              <button class="town-chip ${isActive ? 'active-town' : ''}" 
                      data-name="${town.name}" 
                      data-country="${town.country}" 
                      data-lat="${town.lat}" 
                      data-lng="${town.lng}"
                      data-method="${town.method || 'MWL'}">
                📍 ${town.name}
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      ${renderRowGroup("📍 Local Towns", localTowns)}
      ${renderRowGroup("🏢 Regional Hubs", regionalTowns)}
      ${renderRowGroup("🕋 Holy Sanctuaries", holyCities)}
    `;

    container.querySelectorAll(".town-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const selected = {
          name: chip.getAttribute("data-name"),
          country: chip.getAttribute("data-country"),
          lat: parseFloat(chip.getAttribute("data-lat")),
          lng: parseFloat(chip.getAttribute("data-lng")),
          method: chip.getAttribute("data-method") || "MWL"
        };
        this.selectTown(selected);
      });
    });
  }

  selectTown(townObj) {
    this.currentLocation = townObj;
    this.calculationMethod = townObj.method || this.calculationMethod;
    localStorage.setItem("active_town", JSON.stringify(townObj));

    document.getElementById("location-label").textContent = `${townObj.name}, ${townObj.country}`;
    if (document.getElementById("calc-method-select")) {
      document.getElementById("calc-method-select").value = this.calculationMethod;
    }

    this.renderTownChips();
    this.updatePrayerTimes();
  }

  renderCityDropdown(cities) {
    const searchResults = document.getElementById("city-search-results");
    if (!searchResults) return;

    const existingItems = searchResults.querySelectorAll(".dropdown-item");
    existingItems.forEach(el => el.remove());

    if (!cities || cities.length === 0) {
      const noItem = document.createElement("div");
      noItem.className = "dropdown-item";
      noItem.textContent = "No matching towns found";
      searchResults.appendChild(noItem);
    } else {
      cities.forEach(c => {
        const item = document.createElement("div");
        item.className = "dropdown-item";
        item.innerHTML = `<strong>${c.name}</strong> ${c.district ? '(' + c.district + ')' : ''}, ${c.country}`;
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectTown({
            name: c.name,
            country: c.country,
            lat: c.lat,
            lng: c.lng,
            method: c.method || "MWL"
          });
          document.getElementById("city-search-input").value = "";
          searchResults.style.display = "none";
        });
        searchResults.appendChild(item);
      });
    }
  }

  async reloadAllData() {
    try {
      const [profResp, jamResp, annResp] = await Promise.all([
        fetch("/api/mosque/profile"),
        fetch("/api/mosque/jamaat"),
        fetch("/api/mosque/announcements")
      ]);

      this.mosqueProfile = await profResp.json();
      this.jamaatSettings = await jamResp.json();
      this.announcements = await annResp.json();

      if (this.mosqueProfile.mosque) {
        const mName = this.mosqueProfile.mosque.name || "ADHAN Timing";
        const mAddr = this.mosqueProfile.mosque.address || "";
        document.getElementById("mosque-title").textContent = mName;
        const subElem = document.getElementById("mosque-sub");
        if (subElem) {
          if (mAddr && mAddr.trim()) {
            subElem.textContent = mAddr;
          } else {
            subElem.textContent = "Daily Adhan & Jama'at Schedule";
          }
        }
        if (document.getElementById("tv-mosque-title")) {
          document.getElementById("tv-mosque-title").textContent = mName;
        }
        if (document.getElementById("tv-mosque-subtitle")) {
          document.getElementById("tv-mosque-subtitle").textContent = mAddr && mAddr.trim() ? mAddr : "Daily Adhan & Jama'at Timings";
        }
        
        // If mosque lat/lng is configured and user hasn't explicitly selected another town, use mosque location
        if (this.mosqueProfile.mosque.latitude && !localStorage.getItem("active_town")) {
          this.currentLocation.lat = this.mosqueProfile.mosque.latitude;
          this.currentLocation.lng = this.mosqueProfile.mosque.longitude;
          this.currentLocation.name = this.mosqueProfile.mosque.city || "Kumta";
          this.currentLocation.country = this.mosqueProfile.mosque.country || "India";
        }
      }

      document.getElementById("location-label").textContent = `${this.currentLocation.name}, ${this.currentLocation.country}`;
      this.renderPublicAnnouncements();
      this.tvMode.initAnnouncementsTicker(this.announcements);
      this.updatePrayerTimes();
    } catch (err) {
      console.warn("Local API fetch fallback to client engine", err);
      this.updatePrayerTimes();
    }
  }

  updatePrayerTimes() {
    const today = new Date();
    const tzOffset = -today.getTimezoneOffset() / 60.0;

    // Use client astronomical calculation
    this.prayerTimes = AdhanEngine.calculate(
      this.currentLocation.lat,
      this.currentLocation.lng,
      tzOffset,
      today,
      this.calculationMethod,
      this.juristicSchool
    );

    // Approximate Hijri
    const hijriOffset = this.mosqueProfile?.calculation?.hijriOffset ?? 1;
    const hijriText = getApproxHijri(today, hijriOffset);
    document.getElementById("hijri-date-label").textContent = hijriText;
    this.prayerTimes.hijri = hijriText;

    this.qiblaCompass.updateLocation(this.currentLocation.lat, this.currentLocation.lng);
    this.renderPrayerGrid();
    this.calculateNextPrayer();
  }

  renderPrayerGrid() {
    const grid = document.getElementById("today-prayer-grid");
    if (!grid || !this.prayerTimes) return;

    const now = new Date();
    const isFriday = now.getDay() === 5;
    const currMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60.0;

    // Today's All 6 Prayer Options
    const prayers = [
      { key: "Fajr", icon: "🌅", name: "Fajr", arabic: "الفجر", theme: "fajr" },
      { key: "Sunrise", icon: "☀️", name: "Sunrise", arabic: "الشروق", theme: "sunrise" },
      { key: "Dhuhr", icon: "🌤️", name: "Dhuhr", arabic: "الظهر", theme: "dhuhr" },
      { key: "Asr", icon: "🌇", name: "Asr", arabic: "العصر", theme: "asr" },
      { key: "Maghrib", icon: "🌆", name: "Maghrib", arabic: "المغرب", theme: "maghrib" },
      { key: "Isha", icon: "🌙", name: "Isha", arabic: "العشاء", theme: "isha" }
    ];

    grid.innerHTML = prayers.map(p => {
      let displayName = p.name;
      let displayArabic = p.arabic;
      let displayIcon = p.icon;
      let isJummahCard = false;

      if (p.key === "Dhuhr" && isFriday) {
        displayName = "Jummah (Friday)";
        displayArabic = "الجمعة";
        displayIcon = "🕌";
        isJummahCard = true;
      }

      const rawAdhan = this.prayerTimes[p.key.toLowerCase()] || "--:--";
      let rawJamaat = "--";
      if (p.key !== "Sunrise") {
        if (isJummahCard && this.jamaatSettings?.jumuah?.value) {
          rawJamaat = this.jamaatSettings.jumuah.value;
        } else {
          const jamaatOffset = this.jamaatSettings?.[p.key.toLowerCase()]?.value || 15;
          rawJamaat = addMinutesToTimeString(rawAdhan, jamaatOffset);
        }
      }
      
      const adhanMins = timeStringToMinutes(rawAdhan);
      const adhanTime = AdhanEngine.to12Hour(rawAdhan);
      const jamaatTime = p.key === "Sunrise" ? "Sunrise" : AdhanEngine.to12Hour(rawJamaat);
      
      const isNext = this.nextPrayerInfo && (
        this.nextPrayerInfo.name.toLowerCase() === p.key.toLowerCase() ||
        (isJummahCard && this.nextPrayerInfo.name.toLowerCase() === "jummah")
      ) && !this.nextPrayerInfo.overnight;
      const isCompleted = !isNext && adhanMins > 0 && currMins >= adhanMins;

      let statusBadge = ``;
      if (isNext) {
        statusBadge = `<span class="prayer-status-badge status-next">${isJummahCard ? '⚡ JUMMAH PRAYER' : '⚡ NEXT PRAYER'}</span>`;
      } else if (isJummahCard) {
        statusBadge = `<span class="prayer-status-badge status-friday">✨ FRIDAY JUMMAH</span>`;
      } else if (isCompleted) {
        statusBadge = `<span class="prayer-status-badge status-completed">✓ DONE</span>`;
      }

      // Footnote for Jummah on non-Friday days when Dhuhr is shown
      let jummahFootnote = "";
      if (p.key === "Dhuhr" && !isFriday && this.jamaatSettings?.jumuah?.value) {
        const jumuah12 = AdhanEngine.to12Hour(this.jamaatSettings.jumuah.value);
        jummahFootnote = `<div class="jummah-footnote" title="Fixed Friday Prayer Time">🕌 Friday Jummah: ${jumuah12}</div>`;
      }

      return `
        <div class="prayer-card prayer-card-${p.theme} ${isJummahCard ? 'jummah-prayer-card' : ''} ${isNext ? 'active-prayer-card' : ''} ${isCompleted ? 'completed-prayer-card' : ''}" id="card-prayer-${p.key}">
          <div class="prayer-card-header">
            <div class="prayer-name-group">
              <span class="prayer-icon">${displayIcon}</span>
              <span class="prayer-title">${displayName}</span>
              ${isCompleted ? '<span class="completed-check-mark" title="Namaz Done">✓</span>' : ''}
            </div>
            <span class="arabic-text">${displayArabic}</span>
          </div>
          
          <div class="prayer-card-body">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:0.2rem;">
              <span class="adhan-label">ADHAN TIME</span>
              ${statusBadge}
            </div>
            <div class="adhan-value">${adhanTime}</div>

            <div class="jamaat-time-container">
              <span class="jamat-badge-icon">${p.key === 'Sunrise' ? '☀️' : '🕌'}</span>
              <span class="jamat-badge-text">${p.key === 'Sunrise' ? 'Sunrise:' : (isJummahCard ? 'Jummah Jamat:' : 'Jamat:')}</span>
              <span class="jamat-badge-time">${jamaatTime}</span>
            </div>
            ${jummahFootnote}
          </div>
        </div>
      `;
    }).join("");
  }

  calculateNextPrayer() {
    if (!this.prayerTimes) return;

    const now = new Date();
    const isFriday = now.getDay() === 5;
    const currMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60.0;

    const prayerOrder = [
      { name: "Fajr", timeStr: this.prayerTimes.fajr },
      { name: "Sunrise", timeStr: this.prayerTimes.sunrise },
      { name: isFriday ? "Jummah" : "Dhuhr", timeStr: this.prayerTimes.dhuhr, isJummah: isFriday },
      { name: "Asr", timeStr: this.prayerTimes.asr },
      { name: "Maghrib", timeStr: this.prayerTimes.maghrib },
      { name: "Isha", timeStr: this.prayerTimes.isha }
    ];

    let next = null;
    for (let p of prayerOrder) {
      const pMins = timeStringToMinutes(p.timeStr);
      if (pMins > currMins) {
        next = p;
        break;
      }
    }

    if (!next) {
      // Overnight -> Fajr next day
      next = { name: "Fajr", timeStr: this.prayerTimes.fajr, overnight: true };
    }

    const nextMins = timeStringToMinutes(next.timeStr) + (next.overnight ? 24 * 60 : 0);
    const diffSecs = Math.max(0, Math.floor((nextMins - currMins) * 60));

    const hrs = Math.floor(diffSecs / 3600);
    const mins = Math.floor((diffSecs % 3600) / 60);
    const secs = diffSecs % 60;

    const countdownStr = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Jamaat countdown
    let jamaatMins;
    if (next.isJummah && this.jamaatSettings?.jumuah?.value) {
      jamaatMins = timeStringToMinutes(this.jamaatSettings.jumuah.value);
      if (next.overnight) jamaatMins += 24 * 60;
    } else if (next.name === "Sunrise") {
      jamaatMins = nextMins;
    } else {
      const pKey = next.name === "Jummah" ? "dhuhr" : next.name.toLowerCase();
      const jamaatOffset = this.jamaatSettings?.[pKey]?.value || 15;
      jamaatMins = nextMins + jamaatOffset;
    }

    const jDiffSecs = Math.max(0, Math.floor((jamaatMins - currMins) * 60));
    const jHrs = Math.floor(jDiffSecs / 3600);
    const jMins = Math.floor((jDiffSecs % 3600) / 60);
    const jSecs = jDiffSecs % 60;
    const jCountdownStr = `${String(jHrs).padStart(2, '0')}:${String(jMins).padStart(2, '0')}:${String(jSecs).padStart(2, '0')}`;

    this.nextPrayerInfo = {
      name: next.name,
      adhanTime: AdhanEngine.to12Hour(next.timeStr),
      adhanCountdown: countdownStr,
      jamaatCountdown: jCountdownStr
    };

    // Update Main Hero Progress Ring
    document.getElementById("hero-next-prayer-name").textContent = next.name;
    document.getElementById("hero-countdown-timer").textContent = countdownStr;
    document.getElementById("hero-jamaat-time").textContent = `Jama'at in ${jCountdownStr}`;

    // SVG Progress Circle Stroke
    const circle = document.getElementById("progress-ring-circle");
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const totalPeriodSecs = 6 * 3600;
      const progressFraction = 1.0 - (diffSecs / totalPeriodSecs);
      const offset = circumference - (Math.max(0, Math.min(1, progressFraction)) * circumference);
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = offset;
    }

    // Check if current time has reached or passed any Adhan time within 2 minutes
    const todayStr = now.toISOString().split("T")[0];
    for (let p of prayerOrder) {
      if (p.name === "Sunrise") continue;
      const pMins = timeStringToMinutes(p.timeStr);
      const diffInSecs = (currMins - pMins) * 60.0;
      if (diffInSecs >= 0 && diffInSecs < 120) {
        const adhanKey = `${todayStr}_${p.name}`;
        if (this.lastPlayedAdhanKey !== adhanKey) {
          this.lastPlayedAdhanKey = adhanKey;
          this.triggerAdhanRecitation(p.name);
        }
      }
    }

    // Sync with TV Mode
    this.tvMode.updateTimes(this.prayerTimes, this.jamaatSettings, this.nextPrayerInfo);
  }

  triggerAdhanRecitation(prayerName) {
    const isFriday = new Date().getDay() === 5;
    const displayName = (prayerName === "Dhuhr" || prayerName === "Jummah") && isFriday ? "Jummah (Friday Prayer)" : prayerName;

    const banner = document.getElementById("adhan-playback-banner");
    const titleElem = document.getElementById("adhan-banner-title");
    const subElem = document.getElementById("adhan-banner-sub");

    if (banner) banner.style.display = "flex";
    if (titleElem) titleElem.textContent = `🕌 Now Reciting Adhan for ${displayName}`;
    if (subElem) subElem.textContent = `Reciter: ${this.audioPlayer.reciter.toUpperCase()} • Adhan Time Reached`;

    this.audioPlayer.playAdhanSound(() => {
      this.stopAdhanRecitation();
    });
  }

  stopAdhanRecitation() {
    this.audioPlayer.stop();
    const banner = document.getElementById("adhan-playback-banner");
    if (banner) banner.style.display = "none";
  }

  startClockLoop() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      const now = new Date();
      document.getElementById("live-clock-time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      document.getElementById("live-greg-date").textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

      // Automatic Midnight Reset (12:00 AM Day Rollover)
      const todayStr = now.toDateString();
      if (!this.activeDateString) {
        this.activeDateString = todayStr;
      } else if (this.activeDateString !== todayStr) {
        this.activeDateString = todayStr;
        this.updatePrayerTimes();
        return;
      }

      const currentMinute = now.getHours() + ":" + now.getMinutes();
      if (this.lastRenderedMinute !== currentMinute) {
        this.lastRenderedMinute = currentMinute;
        this.renderPrayerGrid();
      }

      this.calculateNextPrayer();
    }, 1000);
  }

  renderPublicAnnouncements() {
    const listElem = document.getElementById("public-announcements-list");
    if (!listElem) return;

    if (!this.announcements || this.announcements.length === 0) {
      listElem.innerHTML = `<div class="announcement-card info"><p>No active announcements currently.</p></div>`;
      return;
    }

    listElem.innerHTML = this.announcements.filter(a => a.active).map(a => `
      <div class="announcement-card ${a.priority}">
        <h4>📢 ${a.title}</h4>
        <p>${a.content}</p>
        <span class="ann-tag">${a.date || 'Active'}</span>
      </div>
    `).join("");
  }

  renderMonthlyTimetable() {
    const tbody = document.getElementById("monthly-timetable-body");
    if (!tbody) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const tzOffset = -now.getTimezoneOffset() / 60.0;
    const jumuahTimeStr = this.jamaatSettings?.jumuah?.value ? AdhanEngine.to12Hour(this.jamaatSettings.jumuah.value) : "1:30 PM";

    let rowsHtml = "";
    for (let day = 1; day <= daysInMonth; day++) {
      const dObj = new Date(year, month, day);
      const times = AdhanEngine.calculate(this.currentLocation.lat, this.currentLocation.lng, tzOffset, dObj, this.calculationMethod, this.juristicSchool);
      const isToday = day === now.getDate();
      const isFriday = dObj.getDay() === 5;

      const dhuhrCell = isFriday 
        ? `<div class="monthly-dhuhr-cell"><span>${AdhanEngine.to12Hour(times.dhuhr)}</span><span class="monthly-jummah-badge" title="Friday Jummah Jama'at">🕌 Jummah (${jumuahTimeStr})</span></div>`
        : AdhanEngine.to12Hour(times.dhuhr);

      rowsHtml += `
        <tr class="${isToday ? 'today-row' : ''} ${isFriday ? 'friday-row' : ''}">
          <td><strong>${day}</strong> ${dObj.toLocaleDateString('en-US', { weekday: 'short' })} ${isFriday ? '✨' : ''}</td>
          <td>${AdhanEngine.to12Hour(times.fajr)}</td>
          <td>${AdhanEngine.to12Hour(times.sunrise)}</td>
          <td>${dhuhrCell}</td>
          <td>${AdhanEngine.to12Hour(times.asr)}</td>
          <td>${AdhanEngine.to12Hour(times.maghrib)}</td>
          <td>${AdhanEngine.to12Hour(times.isha)}</td>
        </tr>
      `;
    }
    tbody.innerHTML = rowsHtml;
  }

  exportMonthlyCsv() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const tzOffset = -now.getTimezoneOffset() / 60.0;

    let csvContent = "data:text/csv;charset=utf-8,Date,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha\n";

    for (let day = 1; day <= daysInMonth; day++) {
      const dObj = new Date(year, month, day);
      const times = AdhanEngine.calculate(this.currentLocation.lat, this.currentLocation.lng, tzOffset, dObj, this.calculationMethod, this.juristicSchool);
      const dateStr = dObj.toISOString().split('T')[0];
      csvContent += `${dateStr},${AdhanEngine.to12Hour(times.fajr)},${AdhanEngine.to12Hour(times.sunrise)},${AdhanEngine.to12Hour(times.dhuhr)},${AdhanEngine.to12Hour(times.asr)},${AdhanEngine.to12Hour(times.maghrib)},${AdhanEngine.to12Hour(times.isha)}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Prayer_Times_${this.currentLocation.name}_${year}_${month + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openDhikrModal() {
    this.renderDhikrTab(this.activeDhikrTab);
    document.getElementById("dhikr-modal")?.classList.add("show");
  }

  closeDhikrModal() {
    document.getElementById("dhikr-modal")?.classList.remove("show");
  }

  renderDhikrTab(tabCategory) {
    this.activeDhikrTab = tabCategory;

    document.querySelectorAll(".dhikr-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabCategory);
    });

    const banner = document.getElementById("tahajjud-banner");
    if (banner) {
      if (tabCategory === "tahajjud") {
        banner.style.display = "flex";
        const maghrib = this.prayerTimes?.maghrib || "06:45 PM";
        const fajr = this.prayerTimes?.fajr || "05:15 AM";
        const windowInfo = calculateTahajjudWindow(maghrib, fajr);
        const timeRangeElem = document.getElementById("tahajjud-time-range");
        if (timeRangeElem) {
          timeRangeElem.textContent = `${windowInfo.startTime}  ➔  ${windowInfo.endTime}  (Duration: ${windowInfo.totalNightHours} hrs night)`;
        }
      } else {
        banner.style.display = "none";
      }
    }

    const container = document.getElementById("dhikr-cards-container");
    if (!container || typeof DHIKR_DATA === "undefined") return;

    const list = DHIKR_DATA[tabCategory] || [];
    container.innerHTML = list.map(item => {
      const currentCount = this.dhikrCounts[item.id] || 0;
      const isCompleted = currentCount >= item.targetCount;

      return `
        <div class="dhikr-card ${isCompleted ? 'dhikr-card-completed' : ''}" id="dhikr-card-${item.id}">
          <div class="dhikr-arabic">${item.arabic}</div>
          <div class="dhikr-translit">${item.transliteration}</div>
          <div class="dhikr-english">${item.english}</div>
          <div class="dhikr-benefit">✨ Benefit: ${item.benefit}</div>

          <div class="dhikr-card-footer">
            <div class="dhikr-count-badge ${isCompleted ? 'badge-completed' : ''}">
              <span class="count-val">${currentCount}</span> / <span class="target-val">${item.targetCount}</span>
              ${isCompleted ? '<span class="completed-check">✓ Done</span>' : ''}
            </div>

            <div class="dhikr-counter-actions">
              <button class="btn-dhikr-count ${isCompleted ? 'completed-btn' : ''}" data-id="${item.id}" data-target="${item.targetCount}">
                📿 Count +1
              </button>
              <button class="btn-dhikr-reset" data-id="${item.id}">
                ↺ Reset
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".btn-dhikr-count").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        this.dhikrCounts[id] = (this.dhikrCounts[id] || 0) + 1;
        this.renderDhikrTab(this.activeDhikrTab);
      });
    });

    container.querySelectorAll(".btn-dhikr-reset").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        this.dhikrCounts[id] = 0;
        this.renderDhikrTab(this.activeDhikrTab);
      });
    });
  }

  // Quran Reader Methods (Complete 114 Surahs)
  openQuranModal() {
    this.activeSurahNumber = this.activeSurahNumber || 1;
    this.initQuranSurahDropdown();
    this.updateQuranBookmarkBanner();
    this.renderQuranSurah(this.activeSurahNumber);
    document.getElementById("quran-modal")?.classList.add("show");
  }

  closeQuranModal() {
    document.getElementById("quran-modal")?.classList.remove("show");
  }

  updateQuranBookmarkBanner() {
    const banner = document.getElementById("quran-bookmark-banner");
    const textElem = document.getElementById("quran-bookmark-text");
    if (!banner || !textElem) return;

    if (this.quranBookmark) {
      banner.style.display = "flex";
      textElem.textContent = `Surah ${this.quranBookmark.surahName} (${this.quranBookmark.surahNumber}) — Ayah ${this.quranBookmark.ayahNumber}`;
    } else {
      banner.style.display = "none";
    }
  }

  toggleVerseBookmark(surahNum, ayahNum, surahName) {
    if (this.quranBookmark && this.quranBookmark.surahNumber === surahNum && this.quranBookmark.ayahNumber === ayahNum) {
      // Remove bookmark
      this.quranBookmark = null;
      localStorage.removeItem("quran_bookmark");
    } else {
      // Set new bookmark
      this.quranBookmark = {
        surahNumber: surahNum,
        ayahNumber: ayahNum,
        surahName: surahName,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("quran_bookmark", JSON.stringify(this.quranBookmark));
    }
    this.updateQuranBookmarkBanner();
    this.renderQuranSurah(surahNum);
  }

  toggleVerseRead(surahNum, ayahNum) {
    const key = `${surahNum}:${ayahNum}`;
    if (this.quranReadVerses[key]) {
      delete this.quranReadVerses[key];
    } else {
      this.quranReadVerses[key] = true;
    }
    localStorage.setItem("quran_read_verses", JSON.stringify(this.quranReadVerses));
    this.renderQuranSurah(surahNum);
  }

  async jumpToQuranBookmark() {
    if (!this.quranBookmark) return;
    const { surahNumber, ayahNumber } = this.quranBookmark;
    await this.renderQuranSurah(surahNumber);

    setTimeout(() => {
      const elem = document.getElementById(`verse-${surahNumber}-${ayahNumber}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }

  initQuranSurahDropdown(filterQuery = "") {
    const sel = document.getElementById("quran-surah-select");
    const list = typeof ALL_114_SURAHS !== "undefined" ? ALL_114_SURAHS : [];
    if (!sel || list.length === 0) return;

    let filtered = list;
    if (filterQuery) {
      filtered = list.filter(s => 
        s.name.toLowerCase().includes(filterQuery) ||
        s.arabicName.includes(filterQuery) ||
        s.number.toString() === filterQuery ||
        s.englishMeaning.toLowerCase().includes(filterQuery)
      );
    }

    if (filtered.length === 0) filtered = list;

    sel.innerHTML = filtered.map(s => {
      const isBm = this.quranBookmark && this.quranBookmark.surahNumber === s.number;
      return `
        <option value="${s.number}" ${parseInt(s.number, 10) === parseInt(this.activeSurahNumber || 1, 10) ? 'selected' : ''}>
          ${isBm ? '🔖 ' : ''}${s.number}. ${s.name} (${s.arabicName})
        </option>
      `;
    }).join("");
  }

  async renderQuranSurah(surahNumber) {
    const surahNum = parseInt(surahNumber, 10) || 1;
    this.activeSurahNumber = surahNum;
    
    // Update Dropdown selection sync
    const sel = document.getElementById("quran-surah-select");
    if (sel && sel.value !== surahNum.toString()) {
      sel.value = surahNum.toString();
    }

    const meta = (typeof ALL_114_SURAHS !== "undefined" ? ALL_114_SURAHS : []).find(s => s.number === surahNum) || {
      number: surahNum,
      name: `Surah ${surahNum}`,
      arabicName: "",
      englishMeaning: "",
      versesCount: 0,
      type: "Meccan"
    };

    document.getElementById("quran-surah-title").textContent = `Surah ${meta.name} (${meta.arabicName})`;
    document.getElementById("quran-surah-meta").textContent = `${meta.englishMeaning} • ${meta.versesCount} Ayahs • ${meta.type}`;

    const container = document.getElementById("quran-verses-container");
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; padding:2rem; font-size:1.1rem; color:var(--accent-emerald);">⏳ Loading Surah ${meta.name} Ayahs...</div>`;

    let surahData = null;
    if (typeof QuranRepository !== "undefined") {
      surahData = await QuranRepository.getSurah(surahNum);
    }

    if (!surahData || !surahData.verses || surahData.verses.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:2rem;">Unable to load Ayahs for Surah ${meta.name}. Please check internet connection.</div>`;
      return;
    }

    // Render Bismillah Header (except Surah 9 At-Tawbah)
    let bismillahHeader = ``;
    if (surahNum !== 9 && surahNum !== 1) {
      bismillahHeader = `<div style="text-align:center; font-family:var(--font-arabic); font-size:1.8rem; color:var(--accent-gold); margin-bottom:1.5rem; text-shadow:0 0 10px var(--accent-gold-glow);">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    }

    const bm = this.quranBookmark;

    container.innerHTML = bismillahHeader + surahData.verses.map(v => {
      const verseKey = `${surahNum}:${v.num}`;
      const isBookmarked = bm && bm.surahNumber === surahNum && bm.ayahNumber === v.num;
      const isRead = !!this.quranReadVerses[verseKey];

      return `
        <div class="quran-verse-card ${isBookmarked ? 'is-bookmarked' : ''} ${isRead ? 'is-read' : ''}" id="verse-${surahNum}-${v.num}">
          <div class="verse-header">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="verse-badge">Ayah ${v.num}</span>
              ${isBookmarked ? '<span class="bookmark-badge">🔖 Last Read Bookmark</span>' : ''}
              ${isRead ? '<span class="read-badge">✓ Read</span>' : ''}
            </div>
            <div class="verse-actions">
              <button class="btn-verse-mark ${isBookmarked ? 'active-bookmark' : ''}" onclick="window.app.toggleVerseBookmark(${surahNum}, ${v.num}, '${meta.name.replace(/'/g, "\\'")}')" title="Mark as Bookmark / Last Read Position">
                🔖 ${isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              <button class="btn-verse-mark ${isRead ? 'active-read' : ''}" onclick="window.app.toggleVerseRead(${surahNum}, ${v.num})" title="Mark Ayah as Read">
                ${isRead ? '✅ Read' : '☑️ Mark Read'}
              </button>
            </div>
          </div>
          <div class="verse-arabic">${v.arabic}</div>
          ${v.transliteration ? `<div class="verse-translit">${v.transliteration}</div>` : ''}
          <div class="verse-translation">${v.translation}</div>
        </div>
      `;
    }).join("");
  }

  // Duas Collection Methods
  openDuaModal() {
    this.renderDuaCategories();
    this.renderDuas();
    document.getElementById("dua-modal")?.classList.add("show");
  }

  closeDuaModal() {
    document.getElementById("dua-modal")?.classList.remove("show");
  }

  renderDuaCategories() {
    const container = document.getElementById("dua-category-chips");
    if (!container || typeof DUA_CATEGORIES === "undefined") return;

    container.innerHTML = DUA_CATEGORIES.map(cat => `
      <button class="dua-chip ${cat.id === this.activeDuaCategory ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join("");

    container.querySelectorAll(".dua-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        this.activeDuaCategory = e.currentTarget.getAttribute("data-cat");
        this.renderDuaCategories();
        this.renderDuas();
      });
    });
  }

  renderDuas() {
    const container = document.getElementById("dua-cards-container");
    if (!container || typeof DUA_COLLECTION === "undefined") return;

    let filtered = DUA_COLLECTION.filter(d => d.category === this.activeDuaCategory);

    if (this.duaSearchQuery) {
      filtered = DUA_COLLECTION.filter(d => 
        d.title.toLowerCase().includes(this.duaSearchQuery) ||
        d.translation.toLowerCase().includes(this.duaSearchQuery) ||
        d.transliteration.toLowerCase().includes(this.duaSearchQuery)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `<div class="dhikr-card"><p>No supplications found matching your search.</p></div>`;
      return;
    }

    container.innerHTML = filtered.map(d => `
      <div class="dua-card">
        <div class="dua-card-header">
          <h4 class="dua-title">${d.title}</h4>
          <span class="dua-source">${d.source}</span>
        </div>
        <div class="dhikr-arabic">${d.arabic}</div>
        <div class="dhikr-translit">${d.transliteration}</div>
        <div class="dhikr-english">${d.translation}</div>
        <button class="btn-copy-dua" data-text="${d.title}\n${d.arabic}\n${d.translation}">
          📋 Copy Dua
        </button>
      </div>
    `).join("");

    container.querySelectorAll(".btn-copy-dua").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const txt = e.currentTarget.getAttribute("data-text");
        navigator.clipboard.writeText(txt);
        e.currentTarget.textContent = "✓ Copied!";
        setTimeout(() => e.currentTarget.textContent = "📋 Copy Dua", 2000);
      });
    });
  }

  // Standalone Digital Tasbih Methods
  openTasbihModal() {
    const sel = document.getElementById("tasbih-preset-select");
    if (sel) sel.value = this.tasbihPreset;
    this.updateTasbihDisplay();
    document.getElementById("tasbih-modal")?.classList.add("show");
  }

  closeTasbihModal() {
    document.getElementById("tasbih-modal")?.classList.remove("show");
  }

  incrementTasbih() {
    this.tasbihCount++;
    localStorage.setItem("tasbih_count", this.tasbihCount);
    this.updateTasbihDisplay();
  }

  resetTasbih() {
    this.tasbihCount = 0;
    localStorage.setItem("tasbih_count", 0);
    this.updateTasbihDisplay();
  }

  updateTasbihDisplay() {
    const display = document.getElementById("tasbih-count-display");
    const targetDisplay = document.getElementById("tasbih-target-display");
    if (display) display.textContent = this.tasbihCount;

    const targets = {
      subhanallah: 33,
      alhamdulillah: 33,
      allahuakbar: 34,
      astaghfirullah: 100,
      la_ilaha_illallah: 100,
      salawat: 100,
      custom: 1000
    };

    const target = targets[this.tasbihPreset] || 33;
    if (targetDisplay) {
      const isComplete = this.tasbihCount >= target;
      targetDisplay.textContent = isComplete ? `✓ Target ${target} Reached!` : `Target Goal: ${target}`;
      targetDisplay.style.color = isComplete ? "var(--accent-emerald)" : "var(--accent-gold)";
    }
  }

  /* ==========================================================================
     99 Names of Allah (Asma-ul-Husna) Module
     ========================================================================== */

  openNamesModal() {
    const modal = document.getElementById("names-modal");
    if (modal) {
      modal.classList.add("show");
      this.renderNamesContent();
    }
  }

  closeNamesModal() {
    const modal = document.getElementById("names-modal");
    if (modal) modal.classList.remove("show");
    this.stopNamesAudio();
  }

  setNamesViewMode(mode) {
    this.namesViewMode = mode;
    
    // Toggle active tab buttons
    ["grid", "list", "flashcards"].forEach(m => {
      const btn = document.getElementById(`btn-names-view-${m}`);
      if (btn) {
        if (m === mode) btn.classList.add("active");
        else btn.classList.remove("active");
      }
    });

    // Toggle container visibility
    const gridCont = document.getElementById("names-grid-container");
    const listCont = document.getElementById("names-list-container");
    const fcCont = document.getElementById("names-flashcards-container");

    if (gridCont) gridCont.style.display = mode === "grid" ? "grid" : "none";
    if (listCont) listCont.style.display = mode === "list" ? "flex" : "none";
    if (fcCont) fcCont.style.display = mode === "flashcards" ? "flex" : "none";

    this.renderNamesContent();
  }

  getFilteredNames() {
    if (typeof NAMES_OF_ALLAH === "undefined") return [];
    if (!this.namesSearchQuery) return NAMES_OF_ALLAH;

    const q = this.namesSearchQuery;
    return NAMES_OF_ALLAH.filter(n => {
      return (
        n.number.toString() === q ||
        n.transliteration.toLowerCase().includes(q) ||
        n.english.toLowerCase().includes(q) ||
        n.arabic.includes(q) ||
        n.meaning.toLowerCase().includes(q)
      );
    });
  }

  renderNamesContent() {
    const filtered = this.getFilteredNames();

    if (this.namesViewMode === "grid") {
      this.renderNamesGrid(filtered);
    } else if (this.namesViewMode === "list") {
      this.renderNamesList(filtered);
    } else if (this.namesViewMode === "flashcards") {
      this.renderNamesFlashcards(filtered);
    }
  }

  renderNamesGrid(names) {
    const container = document.getElementById("names-grid-container");
    if (!container) return;

    if (names.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding:3rem 1rem; color:var(--text-secondary);">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🔍</div>
          <p>No Names found matching "${this.namesSearchQuery}". Try searching for "Merciful", "Rahman", or "1".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = names.map(n => {
      const isReciting = this.namesIsPlayingAll && this.namesCurrentAudioIndex === (n.number - 1);
      return `
        <div class="name-card ${isReciting ? 'active-reciting' : ''}" id="name-card-${n.number}" onclick="window.app.openNameDetailModal(${n.number})">
          <div class="name-card-header">
            <span class="name-number-badge">#${n.number}</span>
            <button class="name-btn-icon" onclick="event.stopPropagation(); window.app.speakNameByNumber(${n.number})" title="Listen Audio">🔊</button>
          </div>
          <div class="name-arabic">${n.arabic}</div>
          <div class="name-translit">${n.transliteration}</div>
          <div class="name-english">${n.english}</div>
          <div class="name-actions">
            <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:600;">Tap for Meaning & Dhikr ➔</span>
          </div>
        </div>
      `;
    }).join("");
  }

  renderNamesList(names) {
    const container = document.getElementById("names-list-container");
    if (!container) return;

    if (names.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-secondary);">No matching names found.</div>`;
      return;
    }

    container.innerHTML = names.map(n => `
      <div class="names-list-row" onclick="window.app.openNameDetailModal(${n.number})">
        <span class="name-number-badge" style="width:fit-content;">#${n.number}</span>
        <div class="names-list-arabic">${n.arabic}</div>
        <div class="names-list-translit">${n.transliteration}</div>
        <div class="names-list-english">${n.english}</div>
        <div style="text-align:right;">
          <button class="name-btn-icon" onclick="event.stopPropagation(); window.app.speakNameByNumber(${n.number})">🔊 Audio</button>
        </div>
      </div>
    `).join("");
  }

  renderNamesFlashcards(names = NAMES_OF_ALLAH) {
    const container = document.getElementById("names-flashcards-container");
    if (!container || !names.length) return;

    if (this.flashcardIndex >= names.length) this.flashcardIndex = 0;
    if (this.flashcardIndex < 0) this.flashcardIndex = names.length - 1;

    const currentName = names[this.flashcardIndex];

    container.innerHTML = `
      <div class="flashcard-box">
        <span class="name-number-badge" style="font-size:0.9rem; padding:0.3rem 0.8rem;">#${currentName.number} of ${names.length}</span>
        <div class="flashcard-arabic">${currentName.arabic}</div>
        
        ${this.flashcardRevealed ? `
          <div class="flashcard-translit">${currentName.transliteration}</div>
          <div style="font-size:1.1rem; color:var(--accent-emerald); font-weight:600; margin-top:0.3rem;">${currentName.english}</div>
          <div class="flashcard-meaning-box">
            <p style="font-size:0.9rem; color:var(--text-primary);">${currentName.meaning}</p>
          </div>
        ` : `
          <button class="btn-glass" style="margin-top:1.5rem; border-color:var(--accent-gold); color:var(--accent-gold);" onclick="window.app.revealFlashcard()">
            👁️ Tap to Reveal Transliteration & Meaning
          </button>
        `}

        <div style="margin-top:1.5rem;">
          <button class="btn-glass-sm" onclick="window.app.speakNameByNumber(${currentName.number})">🔊 Listen Audio</button>
        </div>

        <div class="flashcard-controls">
          <button class="btn-glass" onclick="window.app.prevFlashcard()">⬅️ Prev Card</button>
          <button class="btn-glass" onclick="window.app.nextFlashcard()">Next Card ➡️</button>
        </div>
      </div>
    `;
  }

  revealFlashcard() {
    this.flashcardRevealed = true;
    this.renderNamesFlashcards(this.getFilteredNames());
  }

  prevFlashcard() {
    this.flashcardRevealed = false;
    this.flashcardIndex--;
    this.renderNamesFlashcards(this.getFilteredNames());
  }

  nextFlashcard() {
    this.flashcardRevealed = false;
    this.flashcardIndex++;
    this.renderNamesFlashcards(this.getFilteredNames());
  }

  speakNameByNumber(num) {
    if (typeof NAMES_OF_ALLAH === "undefined") return;
    const found = NAMES_OF_ALLAH.find(n => n.number === num);
    if (found) this.speakName(found);
  }

  speakName(nameObj, onEndCallback = null) {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported in this browser.");
      if (onEndCallback) onEndCallback();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const textToSpeak = `${nameObj.arabic}. ${nameObj.transliteration}. ${nameObj.english}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const speedSelect = document.getElementById("names-audio-speed");
    utterance.rate = speedSelect ? parseFloat(speedSelect.value) : 1.0;
    
    // Find Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.includes("ar"));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error", e);
      if (onEndCallback) onEndCallback();
    };

    this.namesAudioUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  toggleNamesPlayAll() {
    if (this.namesIsPlayingAll) {
      this.stopNamesAudio();
    } else {
      this.startNamesPlayAll();
    }
  }

  startNamesPlayAll() {
    this.namesIsPlayingAll = true;
    const bar = document.getElementById("names-audio-player-bar");
    const playBtnText = document.getElementById("names-play-all-text");
    const playBtnIcon = document.getElementById("names-play-all-icon");
    const pauseBtn = document.getElementById("btn-names-audio-pause");

    if (bar) bar.style.display = "flex";
    if (playBtnText) playBtnText.textContent = "Stop Continuous Audio";
    if (playBtnIcon) playBtnIcon.textContent = "⏹️";
    if (pauseBtn) pauseBtn.textContent = "⏸️ Pause";

    this.playNextSequentialName();
  }

  stopNamesAudio() {
    this.namesIsPlayingAll = false;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const bar = document.getElementById("names-audio-player-bar");
    const playBtnText = document.getElementById("names-play-all-text");
    const playBtnIcon = document.getElementById("names-play-all-icon");

    if (bar) bar.style.display = "none";
    if (playBtnText) playBtnText.textContent = "Play All 99 Names";
    if (playBtnIcon) playBtnIcon.textContent = "▶️";

    this.renderNamesContent();
  }

  playNextSequentialName() {
    if (!this.namesIsPlayingAll || typeof NAMES_OF_ALLAH === "undefined") return;

    if (this.namesCurrentAudioIndex >= NAMES_OF_ALLAH.length) {
      this.namesCurrentAudioIndex = 0; // Loop around or stop
    }

    const currentName = NAMES_OF_ALLAH[this.namesCurrentAudioIndex];
    
    // Update player UI
    const nowPlaying = document.getElementById("names-audio-now-playing");
    const badge = document.getElementById("names-audio-progress-badge");

    if (nowPlaying) nowPlaying.textContent = `Now Reciting: #${currentName.number} ${currentName.transliteration} (${currentName.arabic})`;
    if (badge) badge.textContent = `${currentName.number} / 99`;

    // Highlight active card & auto scroll
    this.renderNamesContent();
    const activeCard = document.getElementById(`name-card-${currentName.number}`);
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Speak current name and trigger next when done
    this.speakName(currentName, () => {
      if (this.namesIsPlayingAll) {
        this.namesCurrentAudioIndex++;
        setTimeout(() => this.playNextSequentialName(), 400);
      }
    });
  }

  playPrevNameAudio() {
    if (this.namesCurrentAudioIndex > 0) {
      this.namesCurrentAudioIndex--;
    } else {
      this.namesCurrentAudioIndex = 98;
    }
    if (this.namesIsPlayingAll) {
      window.speechSynthesis?.cancel();
      this.playNextSequentialName();
    }
  }

  playNextNameAudio() {
    if (this.namesCurrentAudioIndex < 98) {
      this.namesCurrentAudioIndex++;
    } else {
      this.namesCurrentAudioIndex = 0;
    }
    if (this.namesIsPlayingAll) {
      window.speechSynthesis?.cancel();
      this.playNextSequentialName();
    }
  }

  /* Name Detail Modal & Dedicated Tasbih Counter */

  openNameDetailModal(num) {
    if (typeof NAMES_OF_ALLAH === "undefined") return;
    const nameObj = NAMES_OF_ALLAH.find(n => n.number === num);
    if (!nameObj) return;

    this.activeDetailName = nameObj;

    document.getElementById("ndetail-number").textContent = `#${nameObj.number}`;
    document.getElementById("ndetail-translit-header").textContent = nameObj.transliteration;
    document.getElementById("ndetail-arabic").textContent = nameObj.arabic;
    document.getElementById("ndetail-translit").textContent = nameObj.transliteration;
    document.getElementById("ndetail-english").textContent = nameObj.english;
    document.getElementById("ndetail-meaning").textContent = nameObj.meaning;
    document.getElementById("ndetail-quran-ref").textContent = nameObj.quranRef;
    document.getElementById("ndetail-tasbih-name").textContent = nameObj.transliteration;

    const count = this.nameTasbihCounts[nameObj.number] || 0;
    document.getElementById("ndetail-tasbih-count").textContent = count;

    const modal = document.getElementById("name-detail-modal");
    if (modal) modal.classList.add("show");
  }

  closeNameDetailModal() {
    const modal = document.getElementById("name-detail-modal");
    if (modal) modal.classList.remove("show");
  }

  incrementNameTasbih() {
    if (!this.activeDetailName) return;
    const num = this.activeDetailName.number;
    this.nameTasbihCounts[num] = (this.nameTasbihCounts[num] || 0) + 1;
    document.getElementById("ndetail-tasbih-count").textContent = this.nameTasbihCounts[num];
  }

  resetNameTasbih() {
    if (!this.activeDetailName) return;
    const num = this.activeDetailName.number;
    this.nameTasbihCounts[num] = 0;
    document.getElementById("ndetail-tasbih-count").textContent = 0;
  }
}

// Helper time functions
function timeStringToMinutes(tStr) {
  if (!tStr || tStr === "--:--") return 0;
  const parts = tStr.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function addMinutesToTimeString(tStr, minsToAdd) {
  if (!tStr || tStr === "--:--") return "--:--";
  const total = timeStringToMinutes(tStr) + minsToAdd;
  const h = Math.floor((total / 60) % 24);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getApproxHijri(dateObj, offsetDays = 1) {
  const months = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  const targetDate = new Date(dateObj.getTime() + offsetDays * 86400000);
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let day = targetDate.getDate();

  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;

  let l = Math.floor(jd) - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let m = Math.floor((24 * l) / 709);
  let d = l - Math.floor((709 * m) / 24);
  let y = 30 * n + j - 30;

  const monthName = months[m - 1] || "Rabi' al-Awwal";
  return `${d} ${monthName} ${y} AH`;
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new AdhanApp();
});
