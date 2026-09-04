#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adhan Timing & Mosque Management Backend Server
Runs on Python 3 standard library with zero external dependencies.
Provides static asset serving and a complete REST API for Prayer Calculations, Qibla, and Admin Dashboard.
"""

import http.server
import socketserver
import json
import math
import datetime
import urllib.parse
import os
import sys

PORT = int(os.environ.get("PORT", 8000))
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Mecca Coordinates
MECCA_LAT = 21.4225
MECCA_LNG = 39.8262

# Preset Towns & Cities Database
PRESET_CITIES = [
  # Local & Regional Towns (Karnataka, Goa, Maharashtra, South India)
  {"name": "Kumta", "district": "Uttara Kannada", "country": "India", "lat": 14.4777, "lng": 74.2206, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Honnavar", "district": "Uttara Kannada", "country": "India", "lat": 14.2800, "lng": 74.4400, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Bhatkal", "district": "Uttara Kannada", "country": "India", "lat": 13.9800, "lng": 74.5700, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Karwar", "district": "Uttara Kannada", "country": "India", "lat": 14.8100, "lng": 74.1300, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Sirsi", "district": "Uttara Kannada", "country": "India", "lat": 14.6200, "lng": 74.8400, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Ankola", "district": "Uttara Kannada", "country": "India", "lat": 14.6600, "lng": 74.3000, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Udupi", "district": "Udupi", "country": "India", "lat": 13.3400, "lng": 74.7400, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Mangalore", "district": "Dakshina Kannada", "country": "India", "lat": 12.9141, "lng": 74.8560, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Goa (Panaji)", "district": "North Goa", "country": "India", "lat": 15.4989, "lng": 73.8278, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Bangalore", "district": "Karnataka", "country": "India", "lat": 12.9716, "lng": 77.5946, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Hubli", "district": "Dharwad", "country": "India", "lat": 15.3647, "lng": 75.1240, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Belgaum", "district": "Belagavi", "country": "India", "lat": 15.8497, "lng": 74.4977, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Mysore", "district": "Karnataka", "country": "India", "lat": 12.2958, "lng": 76.6394, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Mumbai", "district": "Maharashtra", "country": "India", "lat": 19.0760, "lng": 72.8777, "tz": "Asia/Kolkata", "method": "Karachi"},
  {"name": "Pune", "district": "Maharashtra", "country": "India", "lat": 18.5204, "lng": 73.8567, "tz": "Asia/Kolkata", "method": "Karachi"},
  {"name": "Hyderabad", "district": "Telangana", "country": "India", "lat": 17.3850, "lng": 78.4867, "tz": "Asia/Kolkata", "method": "Karachi"},
  {"name": "Chennai", "district": "Tamil Nadu", "country": "India", "lat": 13.0827, "lng": 80.2707, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Delhi", "district": "NCR", "country": "India", "lat": 28.6139, "lng": 77.2090, "tz": "Asia/Kolkata", "method": "Karachi"},
  {"name": "Kochi", "district": "Kerala", "country": "India", "lat": 9.9312, "lng": 76.2673, "tz": "Asia/Kolkata", "method": "MWL"},
  {"name": "Ahmedabad", "district": "Gujarat", "country": "India", "lat": 23.0225, "lng": 72.5714, "tz": "Asia/Kolkata", "method": "Karachi"},
  
  # Global Islamic & World Cities
  {"name": "Makkah", "country": "Saudi Arabia", "lat": 21.3891, "lng": 39.8579, "tz": "Asia/Riyadh", "method": "Makkah"},
  {"name": "Madinah", "country": "Saudi Arabia", "lat": 24.5247, "lng": 39.5692, "tz": "Asia/Riyadh", "method": "Makkah"},
  {"name": "Jerusalem", "country": "Palestine", "lat": 31.7683, "lng": 35.2137, "tz": "Asia/Jerusalem", "method": "MWL"},
  {"name": "London", "country": "United Kingdom", "lat": 51.5074, "lng": -0.1278, "tz": "Europe/London", "method": "MWL"},
  {"name": "New York", "country": "United States", "lat": 40.7128, "lng": -74.0060, "tz": "America/New_York", "method": "ISNA"},
  {"name": "Dubai", "country": "United Arab Emirates", "lat": 25.2048, "lng": 55.2708, "tz": "Asia/Dubai", "method": "Gulf"},
  {"name": "Cairo", "country": "Egypt", "lat": 30.0444, "lng": 31.2357, "tz": "Africa/Cairo", "method": "Egypt"},
  {"name": "Istanbul", "country": "Turkey", "lat": 41.0082, "lng": 28.9784, "tz": "Europe/Istanbul", "method": "Diyanet"},
  {"name": "Karachi", "country": "Pakistan", "lat": 24.8607, "lng": 67.0011, "tz": "Asia/Karachi", "method": "Karachi"},
  {"name": "Dhaka", "country": "Bangladesh", "lat": 23.8103, "lng": 90.4125, "tz": "Asia/Dhaka", "method": "Karachi"},
  {"name": "Kuala Lumpur", "country": "Malaysia", "lat": 3.1390, "lng": 101.6869, "tz": "Asia/Kuala_Lumpur", "method": "MWL"},
  {"name": "Jakarta", "country": "Indonesia", "lat": -6.2088, "lng": 106.8456, "tz": "Asia/Jakarta", "method": "MWL"}
]

# Calculation Angle Definitions
CALC_METHODS = {
  "MWL": {"fajr": 18.0, "isha": 17.0},
  "ISNA": {"fajr": 15.0, "isha": 15.0},
  "Egypt": {"fajr": 19.5, "isha": 17.5},
  "Makkah": {"fajr": 18.5, "isha_offset": 90},
  "Karachi": {"fajr": 18.0, "isha": 18.0},
  "Tehran": {"fajr": 17.7, "isha": 14.0, "maghrib": 4.5},
  "Jafari": {"fajr": 16.0, "isha": 14.0, "maghrib": 4.0},
  "Diyanet": {"fajr": 18.0, "isha": 17.0},
  "Gulf": {"fajr": 19.5, "isha_offset": 90}
}

# --- Astronomical Calculation Helper Functions ---
def fix_angle(angle):
  return angle - 360.0 * math.floor(angle / 360.0)

def fix_hour(hour):
  return hour - 24.0 * math.floor(hour / 24.0)

def d2r(d):
  return d * math.pi / 180.0

def r2d(r):
  return r * 180.0 / math.pi

def julian_date(year, month, day):
  if month <= 2:
    year -= 1
    month += 12
  A = math.floor(year / 100.0)
  B = 2 - A + math.floor(A / 4.0)
  return math.floor(365.25 * (year + 4716)) + math.floor(30.6001 * (month + 1)) + day + B - 1524.5

def sun_position(jd):
  D = jd - 2451545.0
  g = fix_angle(357.529 + 0.98560028 * D)
  q = fix_angle(280.459 + 0.98564736 * D)
  L = fix_angle(q + 1.915 * math.sin(d2r(g)) + 0.020 * math.sin(d2r(2 * g)))
  e = 23.439 - 0.00000036 * D
  RA = r2d(math.atan2(math.cos(d2r(e)) * math.sin(d2r(L)), math.cos(d2r(L)))) / 15.0
  RA = fix_hour(RA)
  Decl = r2d(math.asin(math.sin(d2r(e)) * math.sin(d2r(L))))
  EqT = q / 15.0 - RA
  return Decl, EqT

def compute_prayer_times(lat, lng, tz_offset, date_obj, method_key="MWL", school="Shafi"):
  """Calculates accurate solar prayer times for a specific date & location."""
  jd = julian_date(date_obj.year, date_obj.month, date_obj.day)
  decl, eqt = sun_position(jd)
  
  # Solar Noon (Dhuhr)
  dhuhr_time = 12.0 + tz_offset - lng / 15.0 - eqt
  dhuhr_time = fix_hour(dhuhr_time)

  method = CALC_METHODS.get(method_key, CALC_METHODS["MWL"])
  
  # Helper for Sun Elevation Angle
  def time_for_angle(angle, direction="ccw"):
    try:
      cos_h = (math.sin(d2r(-angle)) - math.sin(d2r(lat)) * math.sin(d2r(decl))) / (math.cos(d2r(lat)) * math.cos(d2r(decl)))
      if cos_h > 1.0 or cos_h < -1.0:
        return None
      h = r2d(math.acos(cos_h)) / 15.0
      return dhuhr_time - h if direction == "ccw" else dhuhr_time + h
    except Exception:
      return None

  # Sunrise & Sunset (Standard refraction angle 0.833°)
  sunrise_time = time_for_angle(0.833, "ccw")
  sunset_time = time_for_angle(0.833, "cw")

  # Fajr
  fajr_angle = method.get("fajr", 18.0)
  fajr_time = time_for_angle(fajr_angle, "ccw")

  # Asr
  shadow_factor = 2.0 if school == "Hanafi" else 1.0
  try:
    asr_alt = r2d(math.atan(1.0 / (shadow_factor + math.tan(d2r(abs(lat - decl))))))
    asr_time = time_for_angle(-asr_alt, "cw")
  except Exception:
    asr_time = None

  # Maghrib
  if "maghrib" in method:
    maghrib_time = time_for_angle(method["maghrib"], "cw")
  else:
    maghrib_time = sunset_time

  # Isha
  if "isha_offset" in method:
    isha_time = maghrib_time + method["isha_offset"] / 60.0 if maghrib_time else None
  else:
    isha_angle = method.get("isha", 17.0)
    isha_time = time_for_angle(isha_angle, "cw")

  # Qiyam / Suhoor / Midnight calculations
  if fajr_time and maghrib_time:
    night_duration = (fajr_time + 24.0 - maghrib_time) if fajr_time < maghrib_time else (fajr_time - maghrib_time)
    midnight_time = fix_hour(maghrib_time + night_duration / 2.0)
    qiyam_time = fix_hour(fajr_time - night_duration / 3.0)
  else:
    midnight_time = None
    qiyam_time = None

  def format_time(t_val):
    if t_val is None:
      return "--:--"
    t_val = fix_hour(t_val)
    hours = int(t_val)
    minutes = int(round((t_val - hours) * 60))
    if minutes >= 60:
      hours += 1
      minutes -= 60
    hours = hours % 24
    return f"{hours:02d}:{minutes:02d}"

  # Approximate Hijri Date
  hijri_date = get_approx_hijri_date(date_obj)

  return {
    "date": date_obj.strftime("%Y-%m-%d"),
    "hijri": hijri_date,
    "method": method_key,
    "school": school,
    "times": {
      "Fajr": format_time(fajr_time),
      "Sunrise": format_time(sunrise_time),
      "Dhuhr": format_time(dhuhr_time),
      "Asr": format_time(asr_time),
      "Maghrib": format_time(maghrib_time),
      "Isha": format_time(isha_time),
      "Qiyam": format_time(qiyam_time),
      "Midnight": format_time(midnight_time)
    }
  }

def get_approx_hijri_date(greg_date, offset_days=1):
  """Tabular Hijri calendar calculation with day offset."""
  target_date = greg_date + datetime.timedelta(days=offset_days)
  jd = julian_date(target_date.year, target_date.month, target_date.day)
  l = int(jd) - 1948440 + 10632
  n = int((l - 1) / 10631)
  l = l - 10631 * n + 354
  j = (int((10985 - l) / 5316)) * (int((50 * l) / 17719)) + (int(l / 5670)) * (int((43 * l) / 15238))
  l = l - (int((30 - j) / 15)) * (int((17719 * j) / 50)) - (int(j / 16)) * (int((15238 * j) / 43)) + 29
  m = int((24 * l) / 709)
  d = l - int((709 * m) / 24)
  y = 30 * n + j - 30
  
  months = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ]
  month_name = months[m - 1] if 1 <= m <= 12 else ""
  return f"{d} {month_name} {y} AH"

def compute_qibla(lat, lng):
  """Calculates bearing from location to Mecca and distance in kilometers."""
  lat_r = d2r(lat)
  lng_r = d2r(lng)
  m_lat_r = d2r(MECCA_LAT)
  m_lng_r = d2r(MECCA_LNG)
  
  d_lng = m_lng_r - lng_r
  
  y = math.sin(d_lng) * math.cos(m_lat_r)
  x = math.cos(lat_r) * math.sin(m_lat_r) - math.sin(lat_r) * math.cos(m_lat_r) * math.cos(d_lng)
  bearing = r2d(math.atan2(y, x))
  bearing = (bearing + 360.0) % 360.0
  
  # Haversine distance
  R = 6371.0 # Earth radius km
  d_lat = m_lat_r - lat_r
  a = math.sin(d_lat / 2.0)**2 + math.cos(lat_r) * math.cos(m_lat_r) * math.sin(d_lng / 2.0)**2
  c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
  distance_km = R * c
  
  # Cardinal direction string
  dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  dir_index = int((bearing + 11.25) / 22.5) % 16
  
  return {
    "mecca": {"lat": MECCA_LAT, "lng": MECCA_LNG},
    "bearing": round(bearing, 2),
    "direction": dirs[dir_index],
    "distance_km": round(distance_km, 1)
  }

# --- JSON Data Helper Functions ---
def read_json_file(filename, default_val):
  path = os.path.join(DATA_DIR, filename)
  if not os.path.exists(path):
    return default_val
  try:
    with open(path, "r", encoding="utf-8") as f:
      return json.load(f)
  except Exception:
    return default_val

def write_json_file(filename, data):
  os.makedirs(DATA_DIR, exist_ok=True)
  path = os.path.join(DATA_DIR, filename)
  with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

# --- HTTP Request Handler ---
class AdhanAppRequestHandler(http.server.SimpleHTTPRequestHandler):
  def do_GET(self):
    parsed = urllib.parse.urlparse(self.path)
    path = parsed.path
    params = urllib.parse.parse_qs(parsed.query)

    # API Routes
    if path == "/api/prayer-times":
      self.handle_api_prayer_times(params)
    elif path == "/api/qibla":
      self.handle_api_qibla(params)
    elif path == "/api/cities":
      self.handle_api_cities(params)
    elif path == "/api/mosque/profile":
      self.send_json(read_json_file("mosque_config.json", {}))
    elif path == "/api/mosque/jamaat":
      config = read_json_file("mosque_config.json", {})
      self.send_json(config.get("jamaat", {}))
    elif path == "/api/mosque/announcements":
      self.send_json(read_json_file("announcements.json", []))
    elif path == "/api/mosque/overrides":
      self.send_json(read_json_file("overrides.json", []))
    else:
      # Serve static files
      if path in ["/", ""]:
        self.path = "/index.html"
      super().do_GET()

  def do_POST(self):
    parsed = urllib.parse.urlparse(self.path)
    path = parsed.path
    content_length = int(self.headers.get("Content-Length", 0))
    body_bytes = self.rfile.read(content_length)
    
    try:
      body_data = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
    except Exception:
      body_data = {}

    if path == "/api/admin/login":
      config = read_json_file("mosque_config.json", {})
      correct_pass = config.get("admin", {}).get("password_hash", "admin123")
      provided_pass = body_data.get("password", "")
      if provided_pass == correct_pass:
        self.send_json({"success": True, "token": "admin-session-token-987"})
      else:
        self.send_json({"success": False, "error": "Invalid password"}, status=401)

    elif path == "/api/mosque/profile":
      config = read_json_file("mosque_config.json", {})
      if "mosque" in body_data:
        config["mosque"] = body_data["mosque"]
      if "calculation" in body_data:
        config["calculation"] = body_data["calculation"]
      if "audio" in body_data:
        config["audio"] = body_data["audio"]
      if "tvMode" in body_data:
        config["tvMode"] = body_data["tvMode"]
      write_json_file("mosque_config.json", config)
      self.send_json({"success": True, "data": config})

    elif path == "/api/mosque/jamaat":
      config = read_json_file("mosque_config.json", {})
      config["jamaat"] = body_data
      write_json_file("mosque_config.json", config)
      self.send_json({"success": True, "data": config["jamaat"]})

    elif path == "/api/mosque/announcements":
      announcements = read_json_file("announcements.json", [])
      if "id" not in body_data or not body_data["id"]:
        body_data["id"] = f"ann-{int(datetime.datetime.now().timestamp())}"
      body_data["date"] = datetime.datetime.now().strftime("%Y-%m-%d")
      
      # Update or Insert
      idx = next((i for i, a in enumerate(announcements) if a["id"] == body_data["id"]), -1)
      if idx >= 0:
        announcements[idx] = body_data
      else:
        announcements.insert(0, body_data)
        
      write_json_file("announcements.json", announcements)
      self.send_json({"success": True, "data": announcements})

    elif path == "/api/mosque/overrides":
      overrides = read_json_file("overrides.json", [])
      if "id" not in body_data or not body_data["id"]:
        body_data["id"] = f"ovr-{int(datetime.datetime.now().timestamp())}"
      idx = next((i for i, o in enumerate(overrides) if o["id"] == body_data["id"]), -1)
      if idx >= 0:
        overrides[idx] = body_data
      else:
        overrides.append(body_data)
      write_json_file("overrides.json", overrides)
      self.send_json({"success": True, "data": overrides})

    else:
      self.send_json({"error": "Endpoint not found"}, status=404)

  def do_DELETE(self):
    parsed = urllib.parse.urlparse(self.path)
    path = parsed.path
    params = urllib.parse.parse_qs(parsed.query)

    if path == "/api/mosque/announcements":
      ann_id = params.get("id", [""])[0]
      announcements = read_json_file("announcements.json", [])
      announcements = [a for a in announcements if a["id"] != ann_id]
      write_json_file("announcements.json", announcements)
      self.send_json({"success": True, "data": announcements})
    elif path == "/api/mosque/overrides":
      ovr_id = params.get("id", [""])[0]
      overrides = read_json_file("overrides.json", [])
      overrides = [o for o in overrides if o["id"] != ovr_id]
      write_json_file("overrides.json", overrides)
      self.send_json({"success": True, "data": overrides})
    else:
      self.send_json({"error": "Endpoint not found"}, status=404)

  def handle_api_prayer_times(self, params):
    try:
      lat = float(params.get("lat", [51.5074])[0])
      lng = float(params.get("lng", [-0.1278])[0])
      method = params.get("method", ["MWL"])[0]
      school = params.get("school", ["Shafi"])[0]
      tz_offset = float(params.get("tz", [0.0])[0])
      
      date_str = params.get("date", [""])[0]
      if date_str:
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
      else:
        date_obj = datetime.date.today()

      res = compute_prayer_times(lat, lng, tz_offset, date_obj, method_key=method, school=school)
      
      # Check if manual override exists for date
      overrides = read_json_file("overrides.json", [])
      for ovr in overrides:
        if ovr.get("date") == date_obj.strftime("%Y-%m-%d"):
          for prayer_key in ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]:
            if ovr.get(prayer_key.lower()):
              res["times"][prayer_key] = ovr[prayer_key.lower()]
          res["override_applied"] = True

      self.send_json(res)
    except Exception as e:
      self.send_json({"error": str(e)}, status=400)

  def handle_api_qibla(self, params):
    try:
      lat = float(params.get("lat", [51.5074])[0])
      lng = float(params.get("lng", [-0.1278])[0])
      qibla_res = compute_qibla(lat, lng)
      self.send_json(qibla_res)
    except Exception as e:
      self.send_json({"error": str(e)}, status=400)

  def handle_api_cities(self, params):
    q = params.get("query", [""])[0].lower()
    if not q:
      self.send_json(PRESET_CITIES[:16])
    else:
      matched = [
        c for c in PRESET_CITIES 
        if q in c["name"].lower() or q in c["country"].lower() or q in c.get("district", "").lower()
      ]
      self.send_json(matched)


  def send_json(self, data, status=200):
    self.send_response(status)
    self.send_header("Content-Type", "application/json")
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Content-Type")
    self.end_headers()
    self.wfile.write(json.dumps(data).encode("utf-8"))

  def do_OPTIONS(self):
    self.send_response(200)
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Content-Type")
    self.end_headers()

if __name__ == "__main__":
  base_dir = os.path.dirname(os.path.abspath(__file__))
  if os.path.exists(os.path.join(base_dir, "index.html")):
    os.chdir(base_dir)
  elif os.path.exists(os.path.join(base_dir, "webapp", "index.html")):
    os.chdir(os.path.join(base_dir, "webapp"))
  else:
    os.chdir(base_dir)
  socketserver.TCPServer.allow_reuse_address = True
  with socketserver.TCPServer(("", PORT), AdhanAppRequestHandler) as httpd:
    print(f"Adhan App Backend Server running on port {PORT}")
    try:
      httpd.serve_forever()
    except KeyboardInterrupt:
      print("\nServer shutting down.")
