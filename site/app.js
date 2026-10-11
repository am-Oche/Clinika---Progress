/* =====================================================================
   CLINIKA — SHARED RUNTIME
   Header, footer, icons, motion utilities, accordion, page transitions.
   ===================================================================== */
(function () {
  const S = window.SITE;
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Icons ---------- */
  const arrowSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  const I = {
    arrow: arrowSvg,
    ca: (cls = "") => `<span class="ca ${cls}" aria-hidden="true">${arrowSvg}${arrowSvg}</span>`,
    pin: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 14.5s5-4.3 5-8.2A5 5 0 0 0 3 6.3c0 3.9 5 8.2 5 8.2Z"/><circle cx="8" cy="6.3" r="1.8"/></svg>',
    down: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4"/></svg>',
    chev: '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg>',
    alert: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 6v5M10 14v.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17 19 7"/></svg>',
    logo: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M16 8.8A5 5 0 1 0 16 15.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
  };

  /* ---------- Helpers ---------- */
  // "Healthcare that starts with *listening.*" -> sans + italic serif accent
  const accent = (t) => t.replace(/\*(.+?)\*/g, '<span class="accent">$1</span>');
  const btn = (label, href, variant = "teal", opts = {}) =>
    `<a class="btn btn-${variant}${opts.icon === false ? " no-icon" : ""}${opts.sm ? " btn-sm" : ""}" href="${href}"${opts.magnetic ? " data-magnetic" : ""}>${label}${opts.icon === false ? "" : I.ca()}</a>`;
  const eyebrow = (t) => `<span class="eyebrow">${t}</span>`;
  const img = (key, cls = "", eager = false) => {
    const m = S.images[key] || {};
    return `<img src="${m.src}" alt="${m.alt || ""}" style="object-position:${m.focal || "50% 50%"}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" class="${cls}">`;
  };
  const svcBySlug = (s) => S.services.find((x) => x.slug === s);
  const locBySlug = (s) => S.locations.find((x) => x.slug === s);
  const pad = (n) => String(n).padStart(2, "0");
  const param = (k) => new URLSearchParams(location.search).get(k);
  const crumbs = (items) =>
    `<nav class="crumbs" aria-label="Breadcrumb">${items
      .map((it, i) => (i < items.length - 1 ? `<a href="${it.href}">${it.label}</a><span aria-hidden="true">/</span>` : `<span aria-current="page" style="opacity:1">${it.label}</span>`))
      .join("")}</nav>`;
  const accordion = (items, id = "acc") =>
    `<div class="acc">${items
      .map(
        (f, i) => `<div class="acc-item${i === 0 ? " open" : ""}">
      <h3><button class="acc-btn" aria-expanded="${i === 0}" aria-controls="${id}-p${i}" id="${id}-b${i}">${f.q}<span class="acc-ico" aria-hidden="true"></span></button></h3>
      <div class="acc-panel" id="${id}-p${i}" role="region" aria-labelledby="${id}-b${i}"><div><p>${f.a}</p></div></div></div>`
      )
      .join("")}</div>`;
  const ctaPanel = (c = S.home.cta) => `
    <section class="section tight"><div class="container"><div class="cta on-dark" data-reveal>
      <i class="ring"></i><i class="ring r2"></i>
      ${eyebrow(c.eyebrow)}
      <div class="cta-row"><div><h2 class="h-display" style="font-size:clamp(44px,6.4vw,92px)">${accent(c.title)}</h2>
      <p class="lead" style="max-width:44ch">${c.body}</p></div>
      <div class="hero-actions" style="margin:0">${btn(c.primary.label, c.primary.href, "white", { magnetic: true })}${btn(c.secondary.label, c.secondary.href, "glass", { icon: false })}</div></div>
    </div></div></section>`;
  const emergency = () => `<div class="emerg" role="note">${I.alert}<span>${S.brand.emergency}</span></div>`;

  /* ---------- Header ---------- */
  function renderHeader() {
    const host = $("#site-header");
    if (!host) return;
    const theme = document.body.dataset.header || "light";
    const here = location.pathname.split("/").pop() || "index.html";
    const items = S.nav
      .map((n) => {
        const cur = n.href.split("#")[0] === here && !n.href.includes("#") ? ' aria-current="page"' : "";
        if (n.children === "services") {
          const dd = S.services
            .map((s) => `<a href="service.html?s=${s.slug}"><b>${s.name}</b><span>${s.short}</span></a>`)
            .join("");
          return `<li><a class="nav-link" href="${n.href}"${cur} aria-haspopup="true">${n.label} ${I.chev}</a>
            <div class="dropdown" role="menu">${dd}<a class="all" href="${n.href}">All services <span>→</span></a></div></li>`;
        }
        return `<li><a class="nav-link" href="${n.href}"${cur}>${n.label}</a></li>`;
      })
      .join("");
    host.className = `site-header theme-${theme}`;
    host.innerHTML = `<div class="container bar">
        <a class="logo" href="index.html" aria-label="${S.brand.name} home">${I.logo}${S.brand.name}</a>
        <nav aria-label="Primary"><ul class="nav">${items}</ul></nav>
        <div class="header-cta">${btn(S.cta.label, S.cta.href, "white", { sm: true })}
          <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i></i><i></i></button></div>
      </div><span class="hairline"></span>`;
    // mobile menu
    const mm = document.createElement("div");
    mm.className = "mobile-menu";
    mm.id = "mobile-menu";
    mm.setAttribute("aria-hidden", "true");
    mm.innerHTML = `<ul>${S.nav
      .concat([{ label: "Team", href: "team.html" }, { label: "Contact", href: "contact.html" }])
      .map((n, i) => `<li><a href="${n.href}" style="--i:${i}" tabindex="-1">${n.label}<span aria-hidden="true">→</span></a></li>`)
      .join("")}</ul>
      <div class="mm-foot">${btn(S.cta.label, S.cta.href, "white")}<p class="small" style="color:rgba(255,255,255,.7);margin:0">${S.brand.phone} · ${S.brand.email}</p></div>`;
    document.body.appendChild(mm);
    const burger = $(".burger", host);
    const toggle = (open) => {
      document.documentElement.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mm.setAttribute("aria-hidden", !open);
      $$("a", mm).forEach((a) => (a.tabIndex = open ? 0 : -1));
      if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
      if (open) setTimeout(() => $("a", mm)?.focus(), 300);
    };
    burger.addEventListener("click", () => toggle(!document.documentElement.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => e.key === "Escape" && document.documentElement.classList.contains("menu-open") && (toggle(false), burger.focus()));
    $$("a", mm).forEach((a) => a.addEventListener("click", () => toggle(false)));

    // scroll state: frosted + hide on down / show on up
    let last = 0;
    const onScroll = (y) => {
      host.classList.toggle("is-scrolled", y > 24);
      if (!document.documentElement.classList.contains("menu-open")) host.classList.toggle("is-hidden", y > 400 && y > last + 2);
      if (y < last - 2) host.classList.remove("is-hidden");
      last = y;
    };
    window.__onScroll = window.__onScroll || [];
    window.__onScroll.push(onScroll);
    host.addEventListener("focusin", () => host.classList.remove("is-hidden"));
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;
    const cols = S.footer
      .map((c) => {
        const links = c.links === "locations" ? S.locations.map((l) => ({ label: `${l.city}, ${l.prov}`, href: `location.html?l=${l.slug}` })) : c.links;
        return `<div><h4>${c.title}</h4><ul>${links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul></div>`;
      })
      .join("");
    host.className = "site-footer";
    host.innerHTML = `<div class="container">
      <div class="foot-grid">
        <div><a class="logo" href="index.html">${I.logo}${S.brand.name}</a>
          <p class="small" style="max-width:30ch;margin:18px 0 22px;font-size:15px">${S.brand.tagline}</p>
          <p class="small" style="margin:0">${S.brand.phone}<br><a href="mailto:${S.brand.email}">${S.brand.email}</a></p></div>
        ${cols}
      </div>
      ${emergency()}
      <div class="foot-bottom"><span>${S.brand.copyright}</span><nav aria-label="Legal">${S.legal.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</nav></div>
    </div>`;
  }

  /* ---------- Motion ---------- */
  function initLenis() {
    if (RM || !window.Lenis) {
      window.addEventListener("scroll", () => (window.__onScroll || []).forEach((f) => f(window.scrollY)), { passive: true });
      return;
    }
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    lenis.on("scroll", ({ scroll }) => (window.__onScroll || []).forEach((f) => f(scroll)));
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // smooth anchors
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const t = document.querySelector(url.hash);
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); }
    });
  }

  function initReveal(root = document) {
    const els = $$("[data-reveal], .img-reveal, .rule, .stagger:not(.hero .stagger), [data-reveal-group]", root);
    if (RM || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    // Fallback (IO can be throttled in background frames): geometric check on scroll + load
    const check = () => {
      const h = window.innerHeight;
      els.forEach((e) => { if (!e.classList.contains("in")) { const r = e.getBoundingClientRect(); if (r.top < h * 0.94 && r.bottom > 0) e.classList.add("in"); } });
    };
    setTimeout(check, 120);
    window.__onScroll = window.__onScroll || [];
    window.__onScroll.push(check);
    window.addEventListener("scroll", check, { passive: true });
    // auto stagger index for groups
    $$("[data-reveal-group]", root).forEach((g) => $$("[data-reveal]", g).forEach((c, i) => c.style.setProperty("--i", i)));
  }

  function initAccordions(root = document) {
    $$(".acc-btn", root).forEach((b) => {
      if (b.__wired) return;
      b.__wired = true;
      b.addEventListener("click", () => {
        const item = b.closest(".acc-item");
        const open = !item.classList.contains("open");
        item.classList.toggle("open", open);
        b.setAttribute("aria-expanded", open);
        setTimeout(() => window.__lenis?.resize(), 600);
      });
    });
  }

  function initMagnetic() {
    if (RM || matchMedia("(hover: none)").matches) return;
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  function initPageTransitions() {
    const veil = document.createElement("div");
    veil.className = "page-veil";
    document.body.appendChild(veil);
    setTimeout(() => document.documentElement.classList.add("is-ready"), 30);
    if (RM) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.protocol.startsWith("mailto") || (url.pathname === location.pathname && url.search === location.search)) return;
      e.preventDefault();
      document.documentElement.classList.add("is-leaving");
      setTimeout(() => (location.href = a.href), 320);
    });
    window.addEventListener("pageshow", (e) => e.persisted && document.documentElement.classList.remove("is-leaving"));
  }

  /* ---------- JSON-LD ---------- */
  function jsonLd() {
    const data = {
      "@context": "https://schema.org", "@type": "MedicalOrganization", name: S.brand.name, telephone: S.brand.phone, email: S.brand.email,
      department: S.locations.map((l) => ({ "@type": "MedicalClinic", name: `${S.brand.name} ${l.city}`, telephone: l.phone,
        address: { "@type": "PostalAddress", streetAddress: l.address, addressLocality: l.city, addressRegion: l.prov, postalCode: l.postal, addressCountry: "CA" } })),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Boot ---------- */
  window.UI = { I, accent, btn, eyebrow, img, svcBySlug, locBySlug, pad, param, crumbs, accordion, ctaPanel, emergency, initReveal, initAccordions, RM, $, $$ };

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    const page = document.body.dataset.page;
    if (window.PAGES && window.PAGES[page]) window.PAGES[page]();
    initLenis();
    initReveal();
    initAccordions();
    initMagnetic();
    initPageTransitions();
    jsonLd();
    setTimeout(() => document.documentElement.classList.add("is-loaded"), 80);
  });
})();
