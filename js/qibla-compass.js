/**
 * High-Precision Qibla Compass Controller & Live Sensor Engine
 * Features:
 * 1. High-Accuracy Continuous GPS Geolocation Tracking (watchPosition)
 * 2. Great-Circle Spherical Trigonometry for Exact Mecca Bearing & Distance
 * 3. 3D Tilt-Compensated Gyroscope & Magnetometer Orientation Engine
 * 4. iOS Safari webkitCompassHeading + W3C DeviceOrientationAbsolute support
 * 5. Visual & Haptic Alignment Feedback when pointing to Kaaba
 * 6. Touch/Mouse Drag Simulation for Desktop Browsers
 */

class QiblaCompass {
  static MECCA_LAT = 21.422487;
  static MECCA_LNG = 39.826206;

  static calculateBearing(lat, lng) {
    const lat1 = (lat * Math.PI) / 180;
    const lng1 = (lng * Math.PI) / 180;
    const lat2 = (this.MECCA_LAT * Math.PI) / 180;
    const lng2 = (this.MECCA_LNG * Math.PI) / 180;

    const dLng = lng2 - lng1;
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  }

  static calculateDistance(lat, lng) {
    const R = 6371; // Earth radius in km
    const dLat = ((this.MECCA_LAT - lat) * Math.PI) / 180;
    const dLng = ((this.MECCA_LNG - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((this.MECCA_LAT * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  constructor(needleElemId, compassHeadingElemId, distanceElemId) {
    this.needleElem = document.getElementById(needleElemId);
    this.compassHeadingElem = document.getElementById(compassHeadingElemId);
    this.distanceElem = document.getElementById(distanceElemId);
    this.dialElem = document.querySelector(".compass-dial");
    this.statusBadgeElem = document.getElementById("qibla-live-status");

    this.deviceHeading = 0;
    this.qiblaBearing = 0;
    this.currentRotation = 0;
    this.userLat = null;
    this.userLng = null;
    this.isDragging = false;
    this.startAngle = 0;
    this.watchPositionId = null;
    this.hasVibrated = false;
    this.sensorActive = false;
  }

  updateLocation(lat, lng) {
    this.userLat = lat;
    this.userLng = lng;
    this.qiblaBearing = QiblaCompass.calculateBearing(lat, lng);
    const dist = QiblaCompass.calculateDistance(lat, lng);

    if (this.distanceElem) {
      this.distanceElem.textContent = `${dist.toLocaleString()} km to Makkah`;
    }

    if (this.compassHeadingElem) {
      this.compassHeadingElem.textContent = `${Math.round(this.qiblaBearing)}° (${this.getDirectionName(this.qiblaBearing)})`;
    }

    this.render();
  }

  getDirectionName(degree) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degree % 360) / 22.5) % 16;
    return directions[index];
  }

  startLiveGPSTracking(onLocationChange) {
    if ("geolocation" in navigator) {
      this.watchPositionId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          this.updateLocation(lat, lng);
          if (onLocationChange && typeof onLocationChange === "function") {
            onLocationChange({ lat, lng, accuracy: pos.coords.accuracy });
          }
        },
        (err) => {
          console.warn("GPS tracking warning:", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    }
  }

  initDeviceOrientation() {
    const btnCompass = document.getElementById("btn-enable-compass");

    const handleEvent = (event) => this.handleOrientation(event);

    const activateCompassListeners = () => {
      if ("ondeviceorientationabsolute" in window) {
        window.addEventListener("deviceorientationabsolute", handleEvent, true);
      }
      window.addEventListener("deviceorientation", handleEvent, true);
      this.sensorActive = true;
      if (btnCompass) btnCompass.textContent = "✓ Compass Active";
    };

    if (btnCompass) {
      btnCompass.addEventListener("click", () => {
        // Request iOS 13+ DeviceOrientation permission
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
          DeviceOrientationEvent.requestPermission()
            .then((response) => {
              if (response === "granted") {
                activateCompassListeners();
              } else {
                alert("Permission denied. Live compass requires motion sensor access.");
              }
            })
            .catch((err) => console.error(err));
        } else {
          activateCompassListeners();
        }

        // Also trigger high accuracy GPS request
        this.requestGPSLocation();
      });
    }

    // Auto-listen if permission is already granted / non-iOS
    if (typeof DeviceOrientationEvent === "undefined" || typeof DeviceOrientationEvent.requestPermission !== "function") {
      activateCompassListeners();
    }

    window.addEventListener("orientationchange", () => this.render());

    // Interactive Drag & Touch Rotation for Desktop/Laptop machines
    this.initDesktopDragRotation();

    // Start background high accuracy continuous GPS tracking
    this.startLiveGPSTracking();
  }

  requestGPSLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.updateLocation(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => console.warn("GPS request failed:", err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }

  handleOrientation(event) {
    let heading = null;

    if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
      // iOS Safari (Direct magnetic compass heading)
      heading = event.webkitCompassHeading;
    } else if (event.absolute || event.type === "deviceorientationabsolute") {
      // Android / W3C Absolute orientation
      if (event.alpha !== null) {
        heading = (360 - event.alpha) % 360;
      }
    } else if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      // 3D Tilt-compensated Heading Calculation
      heading = this.computeTiltCompensatedHeading(event.alpha, event.beta, event.gamma);
    }

    if (heading !== null && !isNaN(heading)) {
      // Low-pass exponential smoothing filter for smooth needle movement
      let diff = (heading - this.deviceHeading + 540) % 360 - 180;
      this.deviceHeading = (this.deviceHeading + diff * 0.25 + 360) % 360;
      this.sensorActive = true;
      this.render();
    }
  }

  computeTiltCompensatedHeading(alpha, beta, gamma) {
    const _x = (beta * Math.PI) / 180;   // Pitch
    const _y = (gamma * Math.PI) / 180;  // Roll
    const _z = (alpha * Math.PI) / 180;  // Yaw

    const cX = Math.cos(_x), sX = Math.sin(_x);
    const cY = Math.cos(_y), sY = Math.sin(_y);
    const cZ = Math.cos(_z), sZ = Math.sin(_z);

    const Vx = -cZ * sY - sZ * sX * cY;
    const Vy = -sZ * sY + cZ * sX * cY;

    let heading = (Math.atan2(Vx, Vy) * 180) / Math.PI;
    if (heading < 0) heading += 360;
    return heading;
  }

  initDesktopDragRotation() {
    if (!this.dialElem) return;

    const getAngle = (e) => {
      const rect = this.dialElem.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rad = Math.atan2(clientY - centerY, clientX - centerX);
      let deg = (rad * 180) / Math.PI + 90;
      return (deg + 360) % 360;
    };

    const startDrag = (e) => {
      this.isDragging = true;
      this.startAngle = getAngle(e) - this.deviceHeading;
    };

    const doDrag = (e) => {
      if (!this.isDragging) return;
      this.deviceHeading = (getAngle(e) - this.startAngle + 360) % 360;
      this.render();
    };

    const stopDrag = () => {
      this.isDragging = false;
    };

    this.dialElem.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    this.dialElem.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("touchmove", doDrag, { passive: true });
    window.addEventListener("touchend", stopDrag);
  }

  render() {
    if (!this.needleElem) return;

    // Adjust for screen orientation angle if on mobile landscape
    const screenAngle = screen.orientation ? (screen.orientation.angle || 0) : (window.orientation || 0);
    const effectiveHeading = (this.deviceHeading + screenAngle) % 360;

    // Rotation angle for needle to point to Mecca relative to device top
    const targetRotation = (this.qiblaBearing - effectiveHeading + 360) % 360;

    // Shortest path interpolation to avoid 360-degree spin wrap
    let diff = (targetRotation - (this.currentRotation % 360) + 540) % 360 - 180;
    this.currentRotation += diff;

    this.needleElem.style.transform = `rotate(${this.currentRotation}deg)`;

    // Rotate compass dial to match machine direction
    if (this.dialElem) {
      this.dialElem.style.transform = `rotate(${-effectiveHeading}deg)`;
    }

    // Check alignment with Mecca (within +-4 degrees)
    const alignDiff = Math.abs((targetRotation + 540) % 360 - 180);
    const isAligned = alignDiff < 4.0;

    if (isAligned) {
      this.needleElem.classList.add("aligned");
      if (this.statusBadgeElem) {
        this.statusBadgeElem.classList.add("aligned");
        this.statusBadgeElem.textContent = "🟢 ALIGNED WITH KAABA! 🕋";
      }
      if (!this.hasVibrated) {
        if ("vibrate" in navigator) {
          navigator.vibrate([70, 40, 70]);
        }
        this.hasVibrated = true;
      }
    } else {
      this.needleElem.classList.remove("aligned");
      if (this.statusBadgeElem) {
        this.statusBadgeElem.classList.remove("aligned");
        this.statusBadgeElem.textContent = this.sensorActive ? "✨ Live Sensor Compass Active" : "✨ Live Directional Tracking";
      }
      this.hasVibrated = false;
    }
  }
}

window.QiblaCompass = QiblaCompass;
