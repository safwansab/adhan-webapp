/**
 * Admin & Mosque Manager Dashboard Controller
 */

class AdminDashboard {
  constructor(appRef) {
    this.app = appRef;
    this.token = localStorage.getItem("admin_token") || null;
    this.bindEvents();
  }

  bindEvents() {
    // Admin Modal Toggles
    document.getElementById("btn-open-admin")?.addEventListener("click", () => this.open());
    document.getElementById("btn-close-admin")?.addEventListener("click", () => this.close());
    
    // Login Form Submit
    document.getElementById("admin-login-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Logout
    document.getElementById("btn-admin-logout")?.addEventListener("click", () => this.logout());

    // Navigation Tabs
    const tabs = document.querySelectorAll(".admin-nav-item");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".admin-tab-pane").forEach(p => p.classList.remove("active"));
        
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-tab");
        document.getElementById(targetId)?.classList.add("active");
      });
    });

    // Profile Form Save
    document.getElementById("form-mosque-profile")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveProfile();
    });

    // Jamaat Form Save
    document.getElementById("form-jamaat-settings")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveJamaatSettings();
    });

    // Add Announcement Form
    document.getElementById("form-add-announcement")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addAnnouncement();
    });

    // Add Override Form
    document.getElementById("form-add-override")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOverride();
    });
  }

  open() {
    const modal = document.getElementById("admin-modal");
    if (!modal) return;
    modal.classList.add("show");

    if (this.token) {
      document.getElementById("admin-auth-view").style.display = "none";
      document.getElementById("admin-portal-view").style.display = "grid";
      this.loadDashboardData();
    } else {
      document.getElementById("admin-auth-view").style.display = "block";
      document.getElementById("admin-portal-view").style.display = "none";
    }
  }

  close() {
    document.getElementById("admin-modal")?.classList.remove("show");
  }

  async handleLogin() {
    const passElem = document.getElementById("admin-password");
    const errElem = document.getElementById("admin-login-error");
    errElem.textContent = "";

    try {
      const resp = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passElem.value })
      });
      const res = await resp.json();
      if (res.success) {
        this.token = res.token;
        localStorage.setItem("admin_token", this.token);
        document.getElementById("admin-auth-view").style.display = "none";
        document.getElementById("admin-portal-view").style.display = "grid";
        passElem.value = "";
        this.loadDashboardData();
      } else {
        errElem.textContent = res.error || "Incorrect admin password";
      }
    } catch (err) {
      errElem.textContent = "Connection error. Is backend server running?";
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("admin_token");
    document.getElementById("admin-auth-view").style.display = "block";
    document.getElementById("admin-portal-view").style.display = "none";
  }

  async loadDashboardData() {
    try {
      const [profResp, jamResp, annResp, ovrResp] = await Promise.all([
        fetch("/api/mosque/profile"),
        fetch("/api/mosque/jamaat"),
        fetch("/api/mosque/announcements"),
        fetch("/api/mosque/overrides")
      ]);

      const profile = await profResp.json();
      const jamaat = await jamResp.json();
      const announcements = await annResp.json();
      const overrides = await ovrResp.json();

      this.populateProfileForm(profile);
      this.populateJamaatForm(jamaat);
      this.renderAnnouncementsList(announcements);
      this.renderOverridesList(overrides);
    } catch (e) {
      console.error("Dashboard data load error:", e);
    }
  }

  populateProfileForm(config) {
    const m = config.mosque || {};
    document.getElementById("prof-name").value = m.name || "";
    document.getElementById("prof-address").value = m.address || "";
    document.getElementById("prof-city").value = m.city || "";
    document.getElementById("prof-country").value = m.country || "";
    document.getElementById("prof-lat").value = m.latitude || "";
    document.getElementById("prof-lng").value = m.longitude || "";
    document.getElementById("prof-phone").value = m.phone || "";
    document.getElementById("prof-email").value = m.email || "";

    const calc = config.calculation || {};
    document.getElementById("prof-method").value = calc.method || "MWL";
    document.getElementById("prof-school").value = calc.school || "Shafi";
  }

  async saveProfile() {
    const data = {
      mosque: {
        name: document.getElementById("prof-name").value,
        address: document.getElementById("prof-address").value,
        city: document.getElementById("prof-city").value,
        country: document.getElementById("prof-country").value,
        latitude: parseFloat(document.getElementById("prof-lat").value),
        longitude: parseFloat(document.getElementById("prof-lng").value),
        phone: document.getElementById("prof-phone").value,
        email: document.getElementById("prof-email").value
      },
      calculation: {
        method: document.getElementById("prof-method").value,
        school: document.getElementById("prof-school").value
      }
    };

    try {
      const resp = await fetch("/api/mosque/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const res = await resp.json();
      if (res.success) {
        alert("Mosque Profile Updated Successfully!");
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Failed to save profile.");
    }
  }

  populateJamaatForm(jamaat) {
    ["fajr", "dhuhr", "asr", "maghrib", "isha"].forEach(p => {
      const item = jamaat[p] || { type: "offset", value: 15 };
      document.getElementById(`jam-${p}-val`).value = item.value;
    });
    if (jamaat.jumuah) {
      document.getElementById("jam-jumuah-val").value = jamaat.jumuah.value || "13:30";
    }
  }

  async saveJamaatSettings() {
    const data = {
      fajr: { type: "offset", value: parseInt(document.getElementById("jam-fajr-val").value) },
      dhuhr: { type: "offset", value: parseInt(document.getElementById("jam-dhuhr-val").value) },
      asr: { type: "offset", value: parseInt(document.getElementById("jam-asr-val").value) },
      maghrib: { type: "offset", value: parseInt(document.getElementById("jam-maghrib-val").value) },
      isha: { type: "offset", value: parseInt(document.getElementById("jam-isha-val").value) },
      jumuah: { type: "fixed", value: document.getElementById("jam-jumuah-val").value }
    };

    try {
      const resp = await fetch("/api/mosque/jamaat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const res = await resp.json();
      if (res.success) {
        alert("Jama'at Settings Updated!");
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Failed to save Jama'at settings.");
    }
  }

  renderAnnouncementsList(list) {
    const container = document.getElementById("admin-announcements-list");
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `<div class="empty-state">No announcements created yet.</div>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="announcement-admin-card">
        <div class="ann-header">
          <span class="badge badge-${item.priority}">${item.priority.toUpperCase()}</span>
          <strong>${item.title}</strong>
          <span class="ann-date">${item.date}</span>
        </div>
        <p class="ann-body">${item.content}</p>
        <button class="btn-sm btn-danger btn-delete-ann" data-id="${item.id}">Delete</button>
      </div>
    `).join("");

    container.querySelectorAll(".btn-delete-ann").forEach(btn => {
      btn.addEventListener("click", () => this.deleteAnnouncement(btn.getAttribute("data-id")));
    });
  }

  async addAnnouncement() {
    const title = document.getElementById("ann-title").value;
    const content = document.getElementById("ann-body").value;
    const priority = document.getElementById("ann-priority").value;

    try {
      const resp = await fetch("/api/mosque/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, priority, active: true })
      });
      const res = await resp.json();
      if (res.success) {
        document.getElementById("form-add-announcement").reset();
        this.renderAnnouncementsList(res.data);
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Error adding announcement.");
    }
  }

  async deleteAnnouncement(id) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const resp = await fetch(`/api/mosque/announcements?id=${id}`, { method: "DELETE" });
      const res = await resp.json();
      if (res.success) {
        this.renderAnnouncementsList(res.data);
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Failed to delete.");
    }
  }

  renderOverridesList(list) {
    const container = document.getElementById("admin-overrides-list");
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `<div class="empty-state">No custom date overrides.</div>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="override-card">
        <div><strong>Date: ${item.date}</strong> - ${item.note || 'Manual Correction'}</div>
        <div class="ovr-times">
          ${item.fajr ? `Fajr: ${item.fajr} ` : ''}
          ${item.dhuhr ? `Dhuhr: ${item.dhuhr} ` : ''}
          ${item.asr ? `Asr: ${item.asr} ` : ''}
          ${item.maghrib ? `Maghrib: ${item.maghrib} ` : ''}
          ${item.isha ? `Isha: ${item.isha}` : ''}
        </div>
        <button class="btn-sm btn-danger btn-delete-ovr" data-id="${item.id}">Remove</button>
      </div>
    `).join("");

    container.querySelectorAll(".btn-delete-ovr").forEach(btn => {
      btn.addEventListener("click", () => this.deleteOverride(btn.getAttribute("data-id")));
    });
  }

  async addOverride() {
    const date = document.getElementById("ovr-date").value;
    const fajr = document.getElementById("ovr-fajr").value;
    const maghrib = document.getElementById("ovr-maghrib").value;
    const note = document.getElementById("ovr-note").value;

    try {
      const resp = await fetch("/api/mosque/overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, fajr, maghrib, note })
      });
      const res = await resp.json();
      if (res.success) {
        document.getElementById("form-add-override").reset();
        this.renderOverridesList(res.data);
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Error adding override.");
    }
  }

  async deleteOverride(id) {
    try {
      const resp = await fetch(`/api/mosque/overrides?id=${id}`, { method: "DELETE" });
      const res = await resp.json();
      if (res.success) {
        this.renderOverridesList(res.data);
        this.app.reloadAllData();
      }
    } catch (e) {
      alert("Failed to remove override.");
    }
  }
}

window.AdminDashboard = AdminDashboard;
