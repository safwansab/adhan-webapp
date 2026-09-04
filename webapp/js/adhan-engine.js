/**
 * Adhan Engine - Client-side Astronomical Solar Prayer Time Calculator
 */

const CALC_METHODS = {
  MWL: { name: "Muslim World League", fajr: 18.0, isha: 17.0 },
  ISNA: { name: "ISNA (North America)", fajr: 15.0, isha: 15.0 },
  Egypt: { name: "Egyptian General Authority", fajr: 19.5, isha: 17.5 },
  Makkah: { name: "Umm Al-Qura University, Makkah", fajr: 18.5, isha_offset: 90 },
  Karachi: { name: "Univ. of Islamic Sciences, Karachi", fajr: 18.0, isha: 18.0 },
  Tehran: { name: "Institute of Geophysics, Tehran", fajr: 17.7, isha: 14.0, maghrib: 4.5 },
  Jafari: { name: "Shia Ithna-Ashari (Jafari)", fajr: 16.0, isha: 14.0, maghrib: 4.0 },
  Diyanet: { name: "Diyanet İşleri Başkanlığı (Turkey)", fajr: 18.0, isha: 17.0 },
  Gulf: { name: "Gulf Region", fajr: 19.5, isha_offset: 90 }
};

class AdhanEngine {
  static d2r(d) { return (d * Math.PI) / 180.0; }
  static r2d(r) { return (r * 180.0) / Math.PI; }
  static fixAngle(a) { return a - 360.0 * Math.floor(a / 360.0); }
  static fixHour(h) { return h - 24.0 * Math.floor(h / 24.0); }

  static julianDate(year, month, day) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100.0);
    const B = 2 - A + Math.floor(A / 4.0);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  }

  static sunPosition(jd) {
    const D = jd - 2451545.0;
    const g = this.fixAngle(357.529 + 0.98560028 * D);
    const q = this.fixAngle(280.459 + 0.98564736 * D);
    const L = this.fixAngle(q + 1.915 * Math.sin(this.d2r(g)) + 0.020 * Math.sin(this.d2r(2 * g)));
    const e = 23.439 - 0.00000036 * D;
    let RA = this.r2d(Math.atan2(Math.cos(this.d2r(e)) * Math.sin(this.d2r(L)), Math.cos(this.d2r(L)))) / 15.0;
    RA = this.fixHour(RA);
    const Decl = this.r2d(Math.asin(Math.sin(this.d2r(e)) * Math.sin(this.d2r(L))));
    const EqT = q / 15.0 - RA;
    return { decl: Decl, eqt: EqT };
  }

  static calculate(lat, lng, tzOffset, dateObj, methodKey = "MWL", school = "Shafi") {
    const jd = this.julianDate(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());
    const sun = this.sunPosition(jd);

    let dhuhrTime = 12.0 + tzOffset - lng / 15.0 - sun.eqt;
    dhuhrTime = this.fixHour(dhuhrTime);

    const method = CALC_METHODS[methodKey] || CALC_METHODS.MWL;

    const timeForAngle = (angle, dir = "ccw") => {
      try {
        const cosH = (Math.sin(this.d2r(-angle)) - Math.sin(this.d2r(lat)) * Math.sin(this.d2r(sun.decl))) /
                     (Math.cos(this.d2r(lat)) * Math.cos(this.d2r(sun.decl)));
        if (cosH > 1.0 || cosH < -1.0) return null;
        const h = this.r2d(Math.acos(cosH)) / 15.0;
        return dir === "ccw" ? dhuhrTime - h : dhuhrTime + h;
      } catch (e) {
        return null;
      }
    };

    const sunriseTime = timeForAngle(0.833, "ccw");
    const sunsetTime = timeForAngle(0.833, "cw");
    const fajrTime = timeForAngle(method.fajr || 18.0, "ccw");

    const shadowFactor = school === "Hanafi" ? 2.0 : 1.0;
    let asrTime = null;
    try {
      const asrAlt = this.r2d(Math.atan(1.0 / (shadowFactor + Math.tan(this.d2r(Math.abs(lat - sun.decl))))));
      asrTime = timeForAngle(-asrAlt, "cw");
    } catch (e) {
      asrTime = null;
    }

    const maghribTime = method.maghrib ? timeForAngle(method.maghrib, "cw") : sunsetTime;

    let ishaTime = null;
    if (method.isha_offset) {
      ishaTime = maghribTime ? maghribTime + method.isha_offset / 60.0 : null;
    } else {
      ishaTime = timeForAngle(method.isha || 17.0, "cw");
    }

    let midnightTime = null;
    let qiyamTime = null;
    if (fajrTime && maghribTime) {
      const nightDuration = fajrTime < maghribTime ? (fajrTime + 24.0 - maghribTime) : (fajrTime - maghribTime);
      midnightTime = this.fixHour(maghribTime + nightDuration / 2.0);
      qiyamTime = this.fixHour(fajrTime - nightDuration / 3.0);
    }

    const format = (tVal) => {
      if (tVal === null || tVal === undefined || isNaN(tVal)) return "--:--";
      tVal = this.fixHour(tVal);
      let h = Math.floor(tVal);
      let m = Math.round((tVal - h) * 60);
      if (m >= 60) {
        h += 1;
        m -= 60;
      }
      h = h % 24;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    return {
      fajr: format(fajrTime),
      sunrise: format(sunriseTime),
      dhuhr: format(dhuhrTime),
      asr: format(asrTime),
      maghrib: format(maghribTime),
      isha: format(ishaTime),
      qiyam: format(qiyamTime),
      midnight: format(midnightTime),
      rawTimes: {
        fajr: fajrTime,
        sunrise: sunriseTime,
        dhuhr: dhuhrTime,
        asr: asrTime,
        maghrib: maghribTime,
        isha: ishaTime
      }
    };
  }
  static to12Hour(tStr) {
    if (!tStr || tStr === "--:--" || tStr === "--") return "--:--";
    const parts = tStr.trim().split(":");
    if (parts.length < 2) return tStr;
    let h = parseInt(parts[0], 10);
    let m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m)) return tStr;
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
  }
}

window.AdhanEngine = AdhanEngine;
window.CALC_METHODS = CALC_METHODS;

