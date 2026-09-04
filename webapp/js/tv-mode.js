/**
 * Fullscreen Mosque TV Wall Display Mode Controller
 */

class MosqueTvMode {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isFullscreen = false;
    this.tickerElem = null;
    this.tickerIndex = 0;
    this.tickerInterval = null;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.isFullscreen = true;
        this.container.classList.add("tv-active");
      }).catch(err => {
        console.warn("Fullscreen request error:", err);
        // Fallback CSS full window view
        this.container.classList.toggle("tv-active");
      });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
        this.container.classList.remove("tv-active");
      });
    }
  }

  initAnnouncementsTicker(announcements) {
    this.tickerElem = document.getElementById("tv-marquee-content");
    if (!this.tickerElem || !announcements || announcements.length === 0) return;

    const activeAnns = announcements.filter(a => a.active);
    if (activeAnns.length === 0) return;

    const text = activeAnns.map(a => `📢 ${a.title}: ${a.content}`).join("   ❖   ");
    this.tickerElem.textContent = text;
  }

  updateTimes(prayerData, jamaatData, nextPrayerInfo) {
    const clockElem = document.getElementById("tv-live-clock");
    const dateElem = document.getElementById("tv-live-date");
    const hijriElem = document.getElementById("tv-live-hijri");
    const nextPrayerNameElem = document.getElementById("tv-next-prayer-name");
    const nextCountdownElem = document.getElementById("tv-next-countdown");
    const jamaatCountdownElem = document.getElementById("tv-jamaat-countdown");

    const now = new Date();
    if (clockElem) {
      clockElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }
    if (dateElem) {
      dateElem.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (hijriElem && prayerData?.hijri) {
      hijriElem.textContent = prayerData.hijri;
    }

    if (nextPrayerInfo) {
      if (nextPrayerNameElem) nextPrayerNameElem.textContent = nextPrayerInfo.name;
      if (nextCountdownElem) nextCountdownElem.textContent = nextPrayerInfo.adhanCountdown;
      if (jamaatCountdownElem) jamaatCountdownElem.textContent = nextPrayerInfo.jamaatCountdown || "Jama'at Soon";
    }

    // Render TV grid prayer cards
    const tvGrid = document.getElementById("tv-prayer-cards-grid");
    if (!tvGrid || !prayerData) return;

    const prayers = [
      { key: "Fajr", label: "Fajr / الفجر", icon: "🌅" },
      { key: "Sunrise", label: "Sunrise / الشروق", icon: "☀️" },
      { key: "Dhuhr", label: "Dhuhr / الظهر", icon: "🌤️" },
      { key: "Asr", label: "Asr / العصر", icon: "🌇" },
      { key: "Maghrib", label: "Maghrib / المغرب", icon: "🌆" },
      { key: "Isha", label: "Isha / العشاء", icon: "🌙" }
    ];

    const currMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60.0;

    const isFriday = now.getDay() === 5;

    tvGrid.innerHTML = prayers.map(p => {
      let label = p.label;
      let icon = p.icon;
      let isJummahCard = false;

      if (p.key === "Dhuhr" && isFriday) {
        label = "Jummah / الجمعة";
        icon = "🕌";
        isJummahCard = true;
      }

      const pKey = p.key.toLowerCase();
      const rawAdhan = prayerData[pKey] || (prayerData.times ? prayerData.times[p.key] : "--:--");
      
      let rawJamaat = "--";
      if (p.key !== "Sunrise" && rawAdhan && rawAdhan !== "--:--") {
        if (isJummahCard && jamaatData?.jumuah?.value) {
          rawJamaat = jamaatData.jumuah.value;
        } else {
          const jamaatVal = jamaatData?.[pKey]?.value || 15;
          rawJamaat = typeof addMinutesToTimeString === 'function' ? addMinutesToTimeString(rawAdhan, jamaatVal) : rawAdhan;
        }
      }

      const adhanMins = typeof timeStringToMinutes === 'function' ? timeStringToMinutes(rawAdhan) : 0;
      const adhanTime = typeof AdhanEngine !== 'undefined' ? AdhanEngine.to12Hour(rawAdhan) : rawAdhan;
      const jamaatTime = p.key === "Sunrise" ? "Sunrise" : (typeof AdhanEngine !== 'undefined' ? AdhanEngine.to12Hour(rawJamaat) : rawJamaat);
      const isNext = nextPrayerInfo && (
        nextPrayerInfo.name.toLowerCase() === pKey ||
        (isJummahCard && nextPrayerInfo.name.toLowerCase() === "jummah")
      ) && !nextPrayerInfo.overnight;
      const isCompleted = !isNext && adhanMins > 0 && currMins >= adhanMins;

      return `
        <div class="tv-prayer-card ${isJummahCard ? 'tv-jummah-card' : ''} ${isNext ? 'tv-prayer-card-next' : ''} ${isCompleted ? 'tv-prayer-card-completed' : ''}">
          <div class="tv-prayer-header">
            <span class="tv-prayer-icon">${icon}</span>
            <span class="tv-prayer-name">${label} ${isCompleted ? '<span style="color:#10b981; font-weight:800; margin-left:0.3rem;">✓</span>' : ''}</span>
          </div>
          <div class="tv-prayer-body">
            <div class="tv-adhan-block">
              <span class="tv-adhan-label">ADHAN</span>
              <span class="tv-adhan-time">${adhanTime}</span>
            </div>
            <div class="tv-jamaat-badge">
              <span class="tv-jamaat-label">${p.key === 'Sunrise' ? '☀️' : (isJummahCard ? '🕌 Jummah Jamat:' : '🕌 Jamat:')}</span>
              <span class="tv-jamaat-time">${jamaatTime}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.MosqueTvMode = MosqueTvMode;
