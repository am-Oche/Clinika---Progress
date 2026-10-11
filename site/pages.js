/* CLINIKA — INNER PAGES (one renderer per data-page) */
window.PAGES = window.PAGES || {};
(function () {
  const P = window.PAGES;
  const S = () => window.SITE;
  const U = () => window.UI;
  const setMain = (html) => (document.getElementById("main").innerHTML = html);
  const setTitle = (t, d) => {
    document.title = `${t} — ${S().brand.name}`;
    if (d) { let m = document.querySelector('meta[name="description"]'); if (m) m.content = d; let og = document.querySelector('meta[property="og:title"]'); if (og) og.content = document.title; }
  };
  const pageHero = ({ crumbs, eyebrow, title, lead, dark = false, extra = "" }) => {
    const { eyebrow: eb, accent, crumbs: cr } = U();
    return `<section class="page-hero ${dark ? "dark on-dark" : "light"}"><div class="container">
      <div data-reveal>${cr(crumbs)}</div>
      ${eyebrow ? `<div data-reveal>${eb(eyebrow)}</div>` : ""}
      <h1 class="h-1" data-reveal style="max-width:18ch">${accent(title)}</h1>
      ${lead ? `<p class="lead" data-reveal>${lead}</p>` : ""}${extra}
    </div></section>`;
  };
  const home = { label: "Home", href: "index.html" };

  /* ---------- Services overview ---------- */
  P.services = () => {
    const { img, pad, I, ctaPanel } = U();
    setTitle("Services", "Five connected areas of care across Canada.");
    setMain(
      pageHero({ crumbs: [home, { label: "Services" }], eyebrow: "Services", title: "Five areas of care, designed to work *together.*", lead: "Start with General Care, and move seamlessly to the specialist you need — with one shared record and one team around you." }) +
      `<section class="section tight"><div class="container grid-3" data-reveal-group>${S().services.map((s, i) => `
        <a class="card" href="service.html?s=${s.slug}" data-reveal><div class="media">${img(s.img)}</div>
        <div class="cb"><span class="num">${pad(i + 1)}</span><h3>${s.name}</h3><p>${s.short}</p><div class="row"><span class="small">${s.treats.length} common reasons to visit</span>${I.ca("ca-line")}</div></div></a>`).join("")}
      </div></section>` + ctaPanel()
    );
  };

  /* ---------- Service detail ---------- */
  P.service = () => {
    const { img, pad, I, eyebrow, accent, btn, accordion, ctaPanel, svcBySlug, param } = U();
    const svc = svcBySlug(param("s")) || S().services[0];
    const idx = S().services.indexOf(svc);
    setTitle(svc.name, svc.intro);
    const team = S().team.filter((t) => t.service === svc.slug);
    const locs = S().locations.filter((l) => l.services.includes(svc.slug));
    const faqs = [
      { q: `Do I need a referral for ${svc.name}?`, a: svc.slug === "general-care" ? "No referral is needed. General Care is the starting point for most visits." : "A referral is not always required, but your General Care provider can refer you to make sure your visit is coordinated. Some provincial plans or insurers may require one — check with your provider." },
      { q: "What should I bring to my appointment?", a: "Your provincial health card, a list of current medications, and any relevant previous results. Arrive about 10 minutes early to check in." },
      { q: `Which locations offer ${svc.name}?`, a: `${svc.name} is currently available at ${locs.map((l) => l.city).join(", ")}.` },
    ];
    const related = S().services.filter((s) => s !== svc);
    setMain(`
      <section class="page-hero dark on-dark"><div class="container split" style="align-items:end">
        <div>
          <div data-reveal>${U().crumbs([home, { label: "Services", href: "services.html" }, { label: svc.name }])}</div>
          <div data-reveal>${eyebrow(`${pad(idx + 1)} — Area of care`)}</div>
          <h1 class="h-display" data-reveal style="margin:20px 0 22px">${svc.name.split(" ").length > 1 ? `${svc.name.split(" ")[0]} <span class="accent">${svc.name.split(" ").slice(1).join(" ")}</span>` : `<span class="accent">${svc.name}</span>`}</h1>
          <p class="lead" data-reveal>${svc.intro}</p>
          <div class="hero-actions" data-reveal>${btn("Book " + svc.name, "book.html?service=" + svc.slug, "white", { magnetic: true })}${btn("Find a location", "locations.html", "glass", { icon: false })}</div>
        </div>
        <div class="img-reveal" style="aspect-ratio:4/3.6">${img(svc.img, "", true)}</div>
      </div></section>

      <section class="section"><div class="container split" style="align-items:start">
        <div data-reveal-group><div data-reveal>${eyebrow("What we treat")}</div><h2 class="h-2" style="margin-top:20px" data-reveal>Common reasons people <span class="accent">visit.</span></h2>
          <p class="small" style="margin-top:20px;max-width:40ch" data-reveal>Not sure if this is the right service? Book with General Care and we'll guide you.</p></div>
        <ul class="tick-list" data-reveal>${svc.treats.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div></section>

      <section class="section tight"><div class="container"><div class="panel">
        <div data-reveal>${eyebrow("How a visit works")}</div>
        <h2 class="h-2" style="margin:20px 0 48px" data-reveal>Simple, from start to <span class="accent">follow-up.</span></h2>
        <ol class="visit" style="padding:0;margin:0" data-reveal-group>${S().visitSteps.map((v, i) => `<li data-reveal><div class="rule" style="--i:${i}"></div><span class="n">${pad(i + 1)}</span><h3>${v.title}</h3><p>${v.text}</p></li>`).join("")}</ol>
      </div></div></section>

      ${team.length ? `<section class="section"><div class="container">
        <div data-reveal>${eyebrow("Your team")}</div><h2 class="h-2" style="margin:20px 0 40px" data-reveal>Meet the ${svc.name} <span class="accent">team.</span></h2>
        <div class="grid-4 team" data-reveal-group>${team.map(memberCard).join("")}</div></div></section>` : ""}

      <section class="section" style="padding-top:0"><div class="container faq">
        <div><div data-reveal>${eyebrow("FAQ")}</div><h2 class="h-2" style="margin-top:20px" data-reveal>Questions, <span class="accent">answered.</span></h2></div>
        <div data-reveal>${accordion(faqs, "svc-faq")}</div></div></section>

      ${ctaPanel()}

      <section class="section tight"><div class="container">
        <div data-reveal>${eyebrow("Related services")}</div>
        <div class="grid-4" style="margin-top:28px" data-reveal-group>${related.map((s) => `<a class="mini" href="service.html?s=${s.slug}" data-reveal><span class="num">${pad(S().services.indexOf(s) + 1)}</span><h4>${s.name}</h4><p>${s.short}</p></a>`).join("")}</div>
      </div></section>`);
  };

  const memberCard = (m) => {
    const { locBySlug, svcBySlug } = U();
    const initials = m.name.replace("Dr. ", "").split(" ").map((x) => x[0]).join("");
    return `<article class="member" data-reveal data-service="${m.service}"><div class="portrait"><span class="ph">${initials}</span><span class="tag">Replace with client photo</span></div>
      <h3>${m.name}</h3><p>${m.role} · ${locBySlug(m.loc).city}</p></article>`;
  };

  /* ---------- Approach / About ---------- */
  P.approach = () => {
    const { img, eyebrow, accent, pad, ctaPanel } = U();
    const A = S().home.approach, W = S().home.why;
    setTitle("Our approach", A.body);
    setMain(
      pageHero({ crumbs: [home, { label: "Our approach" }], eyebrow: "Our approach", title: A.title, lead: A.body, dark: true }) +
      `<section class="section"><div class="container split">
        <div class="img-reveal" style="aspect-ratio:4/4.4">${img("about")}</div>
        <div data-reveal-group><div data-reveal>${eyebrow("How we work")}</div><h2 class="h-2" style="margin:20px 0 10px" data-reveal>Three steps, every <span class="accent">visit.</span></h2>
        ${A.steps.map((s, i) => `<div data-reveal style="margin-top:32px"><div class="rule"></div><div style="display:grid;grid-template-columns:110px 1fr;gap:20px;padding-top:18px"><span class="small">${s.kicker}</span><div><h3 class="h-3">${s.title}</h3><p class="body" style="margin:8px 0 0">${s.text}</p></div></div></div>`).join("")}</div>
      </div></section>
      <section class="section tight"><div class="container"><div class="panel panel-grad why">
        <div><div data-reveal>${eyebrow(W.eyebrow)}</div><h2 class="h-1" style="margin:22px 0 24px" data-reveal>${accent(W.title)}</h2><p class="body" data-reveal>${W.body}</p></div>
        <ol class="nlist" data-reveal-group>${W.items.map((it, i) => `<li data-reveal><span class="num">${pad(i + 1)}</span><h3>${it.title}</h3><p>${it.text}</p></li>`).join("")}</ol>
      </div></div></section>
      <section class="section"><div class="container split">
        <div><div data-reveal>${eyebrow("Our team")}</div><h2 class="h-2" style="margin:20px 0" data-reveal>Experienced people, one <span class="accent">coordinated</span> team.</h2>
        <p class="body" data-reveal>Physicians, dentists, specialists and technologists who share notes, not just a building.</p>
        <div data-reveal style="margin-top:28px">${U().btn("Meet the team", "team.html", "teal")}</div></div>
        <div class="img-reveal" style="aspect-ratio:16/11">${img("interior")}</div>
      </div></section>` + ctaPanel()
    );
  };

  /* ---------- Team ---------- */
  P.team = () => {
    const { eyebrow } = U();
    setTitle("Our team", "Meet Clinika's physicians and specialists.");
    setMain(
      pageHero({ crumbs: [home, { label: "Team" }], eyebrow: "Our team", title: "The people behind your *care.*", lead: "Placeholder profiles — replace with client team photos, names and credentials before launch." }) +
      `<section class="section tight"><div class="container">
        <div class="filters" role="group" aria-label="Filter by service"><button class="filter" aria-pressed="true" data-f="all">All</button>${S().services.map((s) => `<button class="filter" aria-pressed="false" data-f="${s.slug}">${s.name}</button>`).join("")}</div>
        <div class="grid-4 team" id="team-grid" data-reveal-group>${S().team.map(memberCard).join("")}</div>
      </div></section>` + U().ctaPanel()
    );
    const btns = U().$$(".filter");
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-pressed", x === b));
      U().$$("#team-grid .member").forEach((m) => {
        const show = b.dataset.f === "all" || m.dataset.service === b.dataset.f;
        m.style.display = show ? "" : "none";
      });
      window.__lenis?.resize();
    }));
  };

  /* ---------- Locations ---------- */
  const mapPos = { vancouver: [12, 52], calgary: [27, 50], toronto: [68, 70], ottawa: [74, 60], montreal: [80, 56] };
  const mapSvg = () => `<svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true">
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" x2="100" y1="${i * 5}" y2="${i * 5}" stroke="rgba(27,90,99,.08)" stroke-width=".15"/>`).join("")}
    ${Array.from({ length: 20 }, (_, i) => `<line y1="0" y2="70" x1="${i * 5}" x2="${i * 5}" stroke="rgba(27,90,99,.08)" stroke-width=".15"/>`).join("")}
    <path d="M12 36 C30 30 50 41 68 49 S 80 39 80 39" stroke="rgba(27,90,99,.35)" stroke-width=".25" fill="none" stroke-dasharray="1 1"/></svg>`;
  P.locations = () => {
    const { eyebrow, btn, svcBySlug, I } = U();
    setTitle("Locations", "Clinika clinics in Toronto, Vancouver, Calgary, Ottawa and Montreal.");
    setMain(
      pageHero({ crumbs: [home, { label: "Locations" }], eyebrow: "Locations", title: "Care, close to *home.*", lead: `${S().locations.length} clinics across Canada, each with its own team and shared standards.` }) +
      `<section class="section tight"><div class="container">
        <div class="map" data-reveal role="img" aria-label="Map placeholder showing clinic cities">${mapSvg()}
          ${S().locations.map((l) => { const [x, y] = mapPos[l.slug] || [50, 50]; return `<a class="pin" href="location.html?l=${l.slug}" style="left:${x}%;top:${(y / 70) * 100}%"><span>${l.city}</span><b></b></a>`; }).join("")}
          <span class="small" style="position:absolute;left:20px;bottom:16px">Map placeholder — embed Google Maps / Mapbox here.</span>
        </div>
        <div style="margin-top:56px" data-reveal-group>${S().locations.map((l) => `
          <div class="loc-row" data-reveal><h3>${l.city}, ${l.prov}</h3><p class="small" style="margin:0;font-size:15px">${l.address}<br>${l.city}, ${l.prov} ${l.postal}</p>
          <p class="small" style="margin:0">${l.services.map((s) => svcBySlug(s).name).join(" · ")}</p>
          <a class="btn btn-outline btn-sm no-icon" href="location.html?l=${l.slug}">View location</a></div>`).join("")}<div class="rule in"></div></div>
      </div></section>` + U().ctaPanel()
    );
  };

  P.location = () => {
    const { eyebrow, btn, svcBySlug, locBySlug, param, img, I } = U();
    const l = locBySlug(param("l")) || S().locations[0];
    setTitle(`${l.city}, ${l.prov}`, `Clinika ${l.city}: address, hours and services.`);
    setMain(
      pageHero({ crumbs: [home, { label: "Locations", href: "locations.html" }, { label: l.city }], eyebrow: `Clinika ${l.city}`, title: `${l.city}, *${l.prov}.*`, lead: `${l.address}, ${l.city}, ${l.prov} ${l.postal}`, dark: true,
        extra: `<div class="hero-actions" data-reveal>${btn("Book here", "book.html?location=" + l.slug, "white", { magnetic: true })}<a class="btn btn-glass" href="tel:${l.phone.replace(/\D/g, "")}">Call ${l.phone}</a></div>` }) +
      `<section class="section"><div class="container split" style="align-items:start">
        <div class="img-reveal" style="aspect-ratio:4/3.4">${img("interior")}</div>
        <div>
          <div data-reveal>${eyebrow("Hours")}</div>
          <table class="hours" style="margin:20px 0 48px" data-reveal><tbody>${l.hours.map((h) => `<tr><td>${h[0]}</td><td>${h[1]}</td></tr>`).join("")}</tbody></table>
          <div data-reveal>${eyebrow("Services available")}</div>
          <div class="mini-grid" style="margin-top:20px" data-reveal-group>${l.services.map((s) => { const v = svcBySlug(s); return `<a class="mini" href="service.html?s=${s}" data-reveal><h4>${v.name}</h4><p>${v.short}</p></a>`; }).join("")}</div>
          <div class="map" style="min-height:220px;margin-top:20px" data-reveal>${mapSvg()}<span class="pin" style="left:50%;top:55%"><span>${l.address}</span><b></b></span></div>
        </div>
      </div></section>` + U().ctaPanel()
    );
  };

  /* ---------- Resources ---------- */
  P.resources = () => {
    const { img, I } = U();
    setTitle("Resources", "Plain-language health articles from the Clinika team.");
    const [lead, ...rest] = S().posts;
    setMain(
      pageHero({ crumbs: [home, { label: "Resources" }], eyebrow: "Resources", title: "Health, in plain *language.*", lead: "General information only — not a substitute for advice from your healthcare provider." }) +
      `<section class="section tight"><div class="container">
        <a class="card" href="article.html?p=${lead.slug}" data-reveal style="display:grid;grid-template-columns:1.2fr 1fr"><div class="media" style="aspect-ratio:auto;min-height:360px">${img(lead.img)}</div>
          <div class="cb" style="padding:40px;align-self:center"><span class="num">${lead.cat} · ${lead.read}</span><h3 style="font-size:34px">${lead.title}</h3><p>${lead.excerpt}</p><div class="row"><span class="small">${lead.date}</span>${I.ca("ca-line")}</div></div></a>
        <div class="grid-3" style="margin-top:20px" data-reveal-group>${rest.map((p) => `<a class="card" href="article.html?p=${p.slug}" data-reveal><div class="media">${img(p.img)}</div><div class="cb"><span class="num">${p.cat} · ${p.read}</span><h3>${p.title}</h3><p>${p.excerpt}</p></div></a>`).join("")}</div>
      </div></section>` + U().ctaPanel()
    );
    if (matchMedia("(max-width:720px)").matches) document.querySelector(".card").style.gridTemplateColumns = "1fr";
  };

  P.article = () => {
    const { img, param, eyebrow } = U();
    const p = S().posts.find((x) => x.slug === param("p")) || S().posts[0];
    setTitle(p.title, p.excerpt);
    setMain(
      `<section class="page-hero light"><div class="container" style="max-width:880px">
        <div data-reveal>${U().crumbs([home, { label: "Resources", href: "resources.html" }, { label: p.cat }])}</div>
        <div data-reveal>${eyebrow(p.cat)}</div><h1 class="h-1" style="margin:18px 0" data-reveal>${p.title}</h1>
        <p class="small" data-reveal>${p.date} · ${p.read} read · Reviewed by Clinika clinical team (placeholder)</p></div></section>
      <div class="container" style="max-width:1100px"><div class="img-reveal" style="aspect-ratio:16/8">${img(p.img, "", true)}</div></div>
      <section class="section tight"><div class="container"><article class="prose" style="margin:0 auto" data-reveal>
        <p><strong>${p.excerpt}</strong></p>
        <p>This article template is a placeholder. Replace this copy with content written or reviewed by a licensed clinician. Keep language plain, avoid guarantees or treatment claims, and link to authoritative sources where relevant.</p>
        <h2>Before your visit</h2><p>Bring your provincial health card, a list of current medications, and any questions you'd like to ask. Writing them down beforehand helps make the most of your time.</p>
        <h2>During your visit</h2><p>Your provider will listen, examine and explain what they find. You're always welcome to ask for clarification or a written summary.</p>
        <h2>After your visit</h2><p>Results and next steps are shared securely. If something changes or you have new concerns, contact your clinic.</p>
        <p class="small">This information is general in nature and is not medical advice. ${S().brand.emergency}</p>
      </article></div></section>` + U().ctaPanel()
    );
  };

  /* ---------- FAQ ---------- */
  P.faq = () => {
    const { accordion, accent, eyebrow } = U();
    setTitle("FAQ", "Answers to common questions about Clinika.");
    const extra = [
      { q: "Is my health information kept private?", a: "Yes. We collect, use and disclose personal health information only as permitted under applicable Canadian privacy law (PIPEDA and provincial laws such as PHIPA). See our <a href='privacy.html'>Privacy Policy</a>." },
      { q: "What should I do in an emergency?", a: S().brand.emergency + " Clinika clinics are not emergency departments." },
      { q: "Can I cancel or reschedule?", a: "Yes — please let us know at least 24 hours in advance by replying to your confirmation email or calling your clinic." },
    ];
    setMain(
      pageHero({ crumbs: [home, { label: "FAQ" }], eyebrow: "FAQ", title: S().home.faq.title, lead: "Everything you need to know about visiting Clinika." }) +
      `<section class="section tight"><div class="container faq"><div><p class="body" data-reveal style="max-width:32ch">${S().home.faq.body}</p></div><div data-reveal>${accordion(S().faq.concat(extra), "faq")}</div></div></section>` + U().ctaPanel()
    );
  };

  /* ---------- Contact ---------- */
  P.contact = () => {
    const { eyebrow, emergency } = U();
    setTitle("Contact", "Get in touch with Clinika.");
    setMain(
      pageHero({ crumbs: [home, { label: "Contact" }], eyebrow: "Contact", title: "We're glad to *help.*", lead: "For general questions only. Please don't include medical details — to discuss your health, book an appointment." }) +
      `<section class="section tight"><div class="container split" style="align-items:start">
        <div data-reveal-group>
          <div data-reveal><div class="rule"></div><p class="small" style="margin:14px 0 4px">Phone</p><p class="h-3" style="margin:0">${S().brand.phone}</p></div>
          <div data-reveal style="margin-top:32px"><div class="rule"></div><p class="small" style="margin:14px 0 4px">Email</p><p class="h-3" style="margin:0"><a href="mailto:${S().brand.email}">${S().brand.email}</a></p></div>
          <div data-reveal style="margin-top:32px"><div class="rule"></div><p class="small" style="margin:14px 0 4px">Clinics</p><p class="body" style="margin:0"><a href="locations.html" style="text-decoration:underline">See all ${S().locations.length} locations →</a></p></div>
          <div data-reveal>${emergency()}</div>
        </div>
        <form class="panel" id="contact-form" novalidate data-reveal style="padding:clamp(28px,4vw,48px)">
          <div class="form-grid">
            <div class="field"><label for="c-name">Name</label><input class="input" id="c-name" name="name" autocomplete="name" required><span class="err-msg" aria-live="polite"></span></div>
            <div class="field"><label for="c-email">Email</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required><span class="err-msg" aria-live="polite"></span></div>
            <div class="field full"><label for="c-topic">Topic</label><select class="select" id="c-topic" name="topic"><option>General question</option><option>Appointments & billing</option><option>Feedback</option><option>Careers</option></select></div>
            <div class="field full"><label for="c-msg">Message</label><textarea class="textarea" id="c-msg" name="message" required maxlength="800"></textarea><span class="hint">Please don't include health information.</span><span class="err-msg" aria-live="polite"></span></div>
            <label class="check full"><input type="checkbox" name="consent" required> <span>I agree to Clinika using this information to respond to my inquiry, as described in the <a href="privacy.html" style="text-decoration:underline">Privacy Policy</a>.</span></label>
            <div class="full"><button class="btn btn-teal" type="submit">Send message${U().I.ca()}</button><p class="small" id="c-status" role="status" style="margin:12px 0 0"></p></div>
          </div>
        </form>
      </div></section>`
    );
    const f = document.getElementById("contact-form");
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      f.querySelectorAll(".field").forEach((fl) => {
        const inp = fl.querySelector("[required]"); if (!inp) return;
        const bad = !inp.value.trim() || (inp.type === "email" && !/^\S+@\S+\.\S+$/.test(inp.value));
        fl.classList.toggle("err", bad); fl.querySelector(".err-msg").textContent = bad ? (inp.type === "email" ? "Enter a valid email." : "This field is required.") : ""; if (bad) ok = false;
      });
      const c = f.querySelector('[name="consent"]');
      if (!c.checked) { ok = false; document.getElementById("c-status").textContent = "Please confirm consent to continue."; }
      if (ok) { document.getElementById("c-status").textContent = "Thanks — we'll reply within 1–2 business days. (Demo: not sent. TODO connect email service.)"; f.reset(); }
    });
  };

  /* ---------- Legal ---------- */
  const legal = (title, sections) => {
    setTitle(title.replace(/\*/g, ""));
    setMain(
      pageHero({ crumbs: [home, { label: title.replace(/\*/g, "") }], title, lead: "Last updated: October 2026", extra: `<div data-reveal style="margin-top:20px"><span class="legal-note">Draft — requires legal review before launch</span></div>` }) +
      `<section class="section tight"><div class="container"><article class="prose" data-reveal>${sections.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join("")}</article></div></section>`
    );
  };
  P.privacy = () => legal("Privacy *Policy*", [
    ["Our commitment", "Clinika respects your privacy. This policy explains how we collect, use, disclose and safeguard personal information, including personal health information, in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial legislation such as Ontario's Personal Health Information Protection Act (PHIPA), Alberta's HIA, BC's PIPA and Québec's Law 25."],
    ["What we collect online", "When you book or contact us through this website we collect only what's needed to respond: your name, contact details, preferred service, location and time. We do not ask for medical details through web forms."],
    ["How we use it", "To schedule and confirm appointments, respond to inquiries, and operate and improve our services. We do not sell personal information."],
    ["Consent", "By submitting a form you consent to this use. You may withdraw consent at any time, subject to legal or contractual restrictions, by contacting our Privacy Officer."],
    ["Safeguards & retention", "Information is protected with administrative, technical and physical safeguards and retained only as long as necessary or as required by law."],
    ["Analytics & cookies", "With your consent, we may use privacy-respecting analytics to understand site usage. No health information is sent to analytics providers."],
    ["Your rights", `You may request access to or correction of your personal information. Contact our Privacy Officer at ${S().brand.email}.`],
  ]);
  P.terms = () => legal("Terms of *Use*", [
    ["Acceptance", "By using this website you agree to these terms. If you do not agree, please do not use the site."],
    ["Not medical advice", "Content on this site is for general information only and is not a substitute for professional medical advice, diagnosis or treatment. " + S().brand.emergency],
    ["Appointments", "Online booking requests are subject to confirmation. A request is not a confirmed appointment until you receive confirmation from Clinika."],
    ["Intellectual property", "All content, trademarks and logos are owned by or licensed to Clinika and may not be used without permission."],
    ["Limitation of liability", "To the extent permitted by law, Clinika is not liable for damages arising from use of this website."],
    ["Governing law", "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein."],
  ]);

  /* ---------- 404 ---------- */
  P.notfound = () => {
    setTitle("Page not found");
    setMain(`<section class="page-hero dark on-dark" style="min-height:80vh;display:grid;align-items:center"><div class="container">
      <div data-reveal>${U().eyebrow("Error 404")}</div>
      <h1 class="h-display" style="margin:22px 0" data-reveal>This page has <span class="accent">moved on.</span></h1>
      <p class="lead" data-reveal>The page you're looking for doesn't exist or has been moved.</p>
      <div class="hero-actions" data-reveal>${U().btn("Back to home", "index.html", "white")}${U().btn("Explore services", "services.html", "glass", { icon: false })}</div></div></section>`);
  };
})();
