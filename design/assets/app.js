/* ADC Support Groups — prototype shell + tiny interactions.
   Pages declare:  <body data-shell="member|leader|directorate" data-active="home" data-title="Home" data-back="home.html">
   and put their content inside <main id="page">. */
(function () {
  const NAV = {
    member: {
      bottom: [
        ["home.html", "house", "Home", "home"],
        ["activities.html", "megaphone", "Activities", "activities"],
        ["group.html", "users-round", "My group", "group"],
        ["notifications.html", "bell", "Alerts", "notifications"],
        ["profile.html", "circle-user-round", "Me", "profile"],
      ],
      side: [
        ["", "Menu"],
        ["home.html", "house", "Home", "home"],
        ["activities.html", "megaphone", "Activities", "activities"],
        ["group.html", "users-round", "My group", "group"],
        ["notifications.html", "bell", "Notifications", "notifications", 3],
        ["profile.html", "circle-user-round", "My profile", "profile"],
      ],
    },
    leader: {
      bottom: [
        ["home.html", "house", "Home", "home"],
        ["activities.html", "megaphone", "Activities", "activities"],
        ["group.html", "users-round", "Group", "group"],
        ["payments.html", "wallet", "Payments", "payments"],
        ["more.html", "layout-grid", "More", "more"],
      ],
      side: [
        ["", "Menu"],
        ["home.html", "house", "Home", "home"],
        ["activities.html", "megaphone", "Activities", "activities", 4],
        ["", "My group"],
        ["group.html", "users-round", "Group overview", "group"],
        ["members.html", "contact-round", "Members", "members"],
        ["chapters.html", "network", "Chapters", "chapters"],
        ["payments.html", "wallet", "Payments", "payments"],
        ["messages.html", "send", "Messages", "messages"],
        ["", "Account"],
        ["notifications.html", "bell", "Notifications", "notifications", 3],
        ["profile.html", "circle-user-round", "My profile", "profile"],
      ],
    },
    directorate: {
      bottom: [
        ["admin-dashboard.html", "chart-no-axes-column", "Overview", "dashboard"],
        ["admin-groups.html", "shield-check", "Groups", "groups"],
        ["admin-activities.html", "megaphone", "Activities", "activities"],
        ["admin-payments.html", "banknote", "Money", "payments"],
        ["admin-more.html", "layout-grid", "More", "more"],
      ],
      side: [
        ["", "Directorate"],
        ["admin-dashboard.html", "chart-no-axes-column", "Overview", "dashboard"],
        ["admin-groups.html", "shield-check", "Groups to verify", "groups", 18],
        ["admin-activities.html", "megaphone", "Activities", "activities", 42],
        ["", "Money"],
        ["admin-payments.html", "banknote", "Payments", "payments", 5],
        ["admin-causes.html", "target", "Funding causes", "causes"],
        ["", "Reach"],
        ["admin-messages.html", "send", "Messages", "messages"],
        ["admin-reports.html", "file-spreadsheet", "Reports & export", "reports"],
        ["admin-settings.html", "settings", "Settings", "settings"],
      ],
    },
  };

  const icon = (n, cls = "i") => `<i data-lucide="${n}" class="${cls}"></i>`;
  const brand = (dark) => `
    <a class="brand" href="${dark ? "admin-dashboard.html" : "home.html"}" aria-label="ADC Support Groups home">
      <span class="brand-mark"><b>ADC</b></span>
      <span class="brand-name">Support Groups<small>${dark ? "Campaign Directorate" : "Atiku 2027"}</small></span>
    </a>`;

  function buildShell() {
    const body = document.body;
    const shell = body.dataset.shell;
    if (!shell || !NAV[shell]) return;
    const active = body.dataset.active;
    const title = body.dataset.title || "";
    const back = body.dataset.back;
    const nav = NAV[shell];
    const page = document.getElementById("page");
    const dark = shell === "directorate";
    const user = dark ? ["HB", "Hauwa Bello", "Super admin"] : shell === "leader" ? ["AO", "Amaka Okafor", "Leader · Atiku Women Network"] : ["TY", "Tunde Yusuf", "Member · 2 groups"];

    const side = nav.side.map(([href, ic, label, key, count]) => {
      if (!href) return `<div class="side-section">${ic}</div>`;
      return `<a class="side-link" href="${href}" ${key === active ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span>${count ? `<span class="count">${count}</span>` : ""}</a>`;
    }).join("");

    const bottom = nav.bottom.map(([href, ic, label, key]) =>
      `<a href="${href}" ${key === active ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span></a>`).join("");

    const app = document.createElement("div");
    app.className = "app" + (dark ? " directorate" : "");
    app.innerHTML = `
      <aside class="sidebar" aria-label="Main menu">
        ${brand(dark)}
        <nav>${side}</nav>
        <div class="side-foot">
          <a class="side-link" href="${dark ? "admin-settings.html" : "profile.html"}"><span class="avatar avatar-sm">${user[0]}</span><span style="min-width:0"><span style="display:block;font-weight:700">${user[1]}</span><span class="tiny" style="opacity:.75;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user[2]}</span></span></a>
        </div>
      </aside>
      <div class="app-body">
        <header class="topbar">
          ${back ? `<a class="icon-btn back" href="${back}" aria-label="Go back">${icon("arrow-left", "i i-lg")}</a>` : `<span class="hide-desktop">${brand(dark).replace("Support Groups<small>", "<span class='sr-only'>").replace("</small>", "</span>")}</span>`}
          <div class="topbar-title">${title}</div>
          <a class="icon-btn" href="${dark ? "admin-groups.html" : "notifications.html"}" aria-label="Notifications, 3 new">${icon("bell", "i i-lg")}<span class="badge-dot">3</span></a>
          <a class="icon-btn hide-mobile" href="${dark ? "admin-settings.html" : "profile.html"}" aria-label="My profile"><span class="avatar avatar-sm">${user[0]}</span></a>
        </header>
      </div>
      <nav class="bottomnav" aria-label="Main menu">${bottom}</nav>`;
    page.replaceWith(app);
    app.querySelector(".app-body").appendChild(page);
    page.classList.add("main");
  }

  function interactions() {
    // Tabs: <div class="tabs" data-tabs> <button class="tab" data-tab="x"> ; panels: [data-panel="x"]
    document.querySelectorAll("[data-tabs]").forEach((tabs) => {
      const scope = tabs.closest("[data-tab-scope]") || document;
      tabs.addEventListener("click", (e) => {
        const t = e.target.closest("[data-tab]");
        if (!t) return;
        tabs.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", b === t));
        scope.querySelectorAll("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== t.dataset.tab));
      });
    });
    // Pressed groups (segmented / pills)
    document.querySelectorAll("[data-pressed-group]").forEach((g) => {
      g.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        g.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
        if (b.dataset.show) {
          const scope = g.closest("[data-tab-scope]") || document;
          scope.querySelectorAll("[data-view]").forEach((v) => (v.hidden = v.dataset.view !== b.dataset.show));
        }
      });
    });
    // Dialogs: [data-open="id"], [data-close]
    document.addEventListener("click", (e) => {
      const o = e.target.closest("[data-open]");
      if (o) { e.preventDefault(); document.getElementById(o.dataset.open)?.classList.add("open"); }
      const c = e.target.closest("[data-close]");
      if (c || e.target.classList.contains("dialog-backdrop")) {
        (c ? c.closest(".dialog-backdrop") : e.target).classList.remove("open");
      }
      const t = e.target.closest("[data-toast]");
      if (t) {
        e.preventDefault();
        toast(t.dataset.toast);
        const href = t.getAttribute("href");
        if (href && href !== "#") setTimeout(() => (location.href = href), 900);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") document.querySelectorAll(".dialog-backdrop.open").forEach((d) => d.classList.remove("open"));
    });
    // Wizards: <form data-wizard> with [data-step] sections; [data-next] [data-prev]
    document.querySelectorAll("[data-wizard]").forEach((w) => {
      const steps = [...w.querySelectorAll("[data-step]")];
      const bars = [...w.querySelectorAll(".stepper span")];
      const count = w.querySelector(".step-count");
      let i = 0;
      const show = () => {
        steps.forEach((s, k) => (s.hidden = k !== i));
        bars.forEach((b, k) => { b.className = k < i ? "done" : k === i ? "now" : ""; });
        if (count) count.textContent = `Step ${Math.min(i + 1, steps.length)} of ${steps.length}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      w.addEventListener("click", (e) => {
        if (e.target.closest("[data-next]")) { e.preventDefault(); i = Math.min(i + 1, steps.length - 1); show(); }
        if (e.target.closest("[data-prev]")) { e.preventDefault(); i = Math.max(i - 1, 0); show(); }
      });
      w.addEventListener("submit", (e) => e.preventDefault());
      show();
    });
    // OTP auto-advance
    document.querySelectorAll(".otp").forEach((o) => {
      o.addEventListener("input", (e) => { if (e.target.value && e.target.nextElementSibling) e.target.nextElementSibling.focus(); });
    });
  }

  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = `${icon("circle-check", "i")}<span>${msg}</span>`;
    window.lucide && lucide.createIcons();
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }
  window.toast = toast;

  document.addEventListener("DOMContentLoaded", () => {
    buildShell();
    interactions();
    if (window.lucide) lucide.createIcons();
  });
})();
