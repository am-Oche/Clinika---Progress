/* CLINIKA — HOME PAGE */
window.PAGES = window.PAGES || {};
window.PAGES.home = function () {
  const S = window.SITE, H = S.home;
  const { I, accent, btn, eyebrow, img, pad, accordion, ctaPanel, $, $$, RM } = window.UI;
  const main = $("#main");

  const hero = `
  <section class="hero on-dark" aria-labelledby="hero-title">
    <div class="hero-bg"></div><div class="hero-glow"></div><div class="hero-glow g2"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="stagger" style="--d:.1s"><span class="glass-badge"><i></i>${H.hero.badge}</span></div>
        <h1 id="hero-title" class="h-display">
          <span class="line"><span>${H.hero.title}</span></span>
          <span class="line" style="--x:1"><span style="transition-delay:.12s"><span class="accent">${H.hero.accent}</span></span></span>
        </h1>
        <div class="stagger" style="--d:.9s">
          <p class="lead" style="max-width:40ch;--i:0">${H.hero.sub}</p>
          <div class="hero-actions" style="--i:1">
            ${btn(H.hero.primary.label, H.hero.primary.href, "white", { magnetic: true })}
            ${btn(H.hero.secondary.label, H.hero.secondary.href, "glass", { icon: false })}
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="false">
        <div class="orbit" aria-hidden="true">
          <svg viewBox="0 0 560 560" fill="none"><circle cx="280" cy="280" r="270" stroke="rgba(255,255,255,.14)" stroke-dasharray="1 0"/><circle cx="280" cy="280" r="200" stroke="rgba(255,255,255,.07)"/>
            <g class="dot"><circle cx="550" cy="280" r="5" fill="#8FE3D4"/><circle cx="550" cy="280" r="14" fill="#8FE3D4" opacity=".18"/></g></svg>
        </div>
        <div class="doctor" data-parallax="14">${img("hero", "", true)}</div>
        <div class="float-card c1" data-parallax="26"><div><div class="glass-card">
          <div class="gc-top"><span>${H.hero.card.label}</span><span>${H.hero.card.count}</span></div>
          <p>${H.hero.card.text}</p>
          <div class="chips">${S.services.map((s) => `<a class="chip" href="service.html?s=${s.slug}">${s.name}</a>`).join("")}</div>
        </div></div></div>
        <div class="float-card c2" data-parallax="-18"><div><div class="white-card">
          <span class="lbl">${I.pin}${H.hero.locCard.label}</span>
          <a href="${H.hero.locCard.href}">${H.hero.locCard.link} <span>→</span></a>
        </div></div></div>
      </div>
    </div>
  </section>`;

  const strip = `
  <div class="container"><nav class="strip" aria-label="Areas of care" data-reveal>
    ${S.services.map((s, i) => `<a href="service.html?s=${s.slug}"><span class="num">${pad(i + 1)}</span>${s.name}</a>`).join("")}
  </nav></div>`;

  const A = H.approach;
  const approach = `
  <section class="section" id="approach" aria-labelledby="ap-t"><div class="container split">
    <div class="img-reveal approach-img">${img("approach")}</div>
    <div data-reveal-group>
      <div data-reveal>${eyebrow(A.eyebrow)}</div>
      <h2 id="ap-t" class="h-1" style="margin:22px 0 26px" data-reveal>${accent(A.title)}</h2>
      <p class="lead" data-reveal>${A.body}</p>
      <div class="steps">${A.steps.map((s, i) => `<div data-reveal style="--i:${i + 3}"><div class="rule" style="--i:${i}"></div><span class="kick">${s.kicker}</span><h3>${s.title}</h3><p>${s.text}</p></div>`).join("")}</div>
    </div>
  </div></section>`;

  const V = H.services;
  const services = `
  <section class="section" id="services" aria-labelledby="sv-t" style="padding-top:0"><div class="container">
    <div class="svc-head"><div data-reveal-group><div data-reveal>${eyebrow(V.eyebrow)}</div><h2 id="sv-t" class="h-1" style="margin-top:22px" data-reveal>${accent(V.title)}</h2></div><p class="small" data-reveal>${V.helper}</p></div>
    <div class="svc">
      <ul class="svc-list" role="list" data-reveal-group>
        ${S.services.map((s, i) => `<li class="svc-row${i === 0 ? " is-active" : ""}" data-i="${i}" data-reveal>
          <a href="service.html?s=${s.slug}" aria-describedby="svc-d${i}"><span class="num">${pad(i + 1)}</span>
          <span><span class="name">${s.name}</span><span class="desc" id="svc-d${i}">${s.short}</span></span>${I.ca("ca-line")}</a></li>`).join("")}
      </ul>
      <div class="svc-media" data-reveal>
        <div class="svc-frame">
          <span class="pill-label"><span class="swap" id="svc-label">01 — ${S.services[0].name}</span></span>
          ${S.services.map((s, i) => img(s.img, i === 0 ? "on" : "")).join("")}
        </div>
        <div class="svc-foot"><p><span class="swap" id="svc-cap">${S.services[0].caption}</span></p>
          <a class="btn btn-book" id="svc-book" href="book.html?service=${S.services[0].slug}">Book${I.ca()}</a></div>
      </div>
    </div>
  </div></section>`;

  const W = H.why;
  const why = `
  <section class="section tight" aria-labelledby="wy-t"><div class="container"><div class="panel panel-grad why" data-reveal>
    <div data-reveal-group><div data-reveal>${eyebrow(W.eyebrow)}</div><h2 id="wy-t" class="h-1" style="margin:22px 0 24px" data-reveal>${accent(W.title)}</h2><p class="body" style="max-width:40ch" data-reveal>${W.body}</p></div>
    <ol class="nlist" data-reveal-group>${W.items.map((it, i) => `<li data-reveal><span class="num">${pad(i + 1)}</span><h3>${it.title}</h3><p>${it.text}</p></li>`).join("")}</ol>
  </div></div></section>`;

  const R = H.areas, [first, ...rest] = S.services;
  const areas = `
  <section class="section" id="areas" aria-labelledby="ar-t"><div class="container">
    <div data-reveal-group><div data-reveal>${eyebrow(R.eyebrow)}</div><h2 id="ar-t" class="h-1" style="margin-top:22px;max-width:16ch" data-reveal>${accent(R.title)}</h2></div>
    <div class="areas">
      <div class="img-reveal areas-img">${img("areas")}<p class="glass-cap" style="margin:0">${R.caption}</p></div>
      <div data-reveal-group>
        <a class="feat" href="service.html?s=${first.slug}" data-reveal><div class="top"><span>${R.featuredLabel}</span><span>01</span></div><h3>${first.name}</h3><p>${first.card}</p></a>
        <div class="connector" data-reveal>${I.down}${R.connector}</div>
        <div class="mini-grid">${rest.map((s, i) => `<a class="mini" href="service.html?s=${s.slug}" data-reveal style="--i:${i + 2}"><span class="num">${pad(i + 2)}</span><h4>${s.name}</h4><p>${s.card}</p></a>`).join("")}</div>
      </div>
    </div>
  </div></section>`;

  const F = H.faq;
  const faq = `
  <section class="section" id="faq" aria-labelledby="fq-t" style="padding-top:0"><div class="container faq">
    <div data-reveal-group><div data-reveal>${eyebrow("FAQ")}</div><h2 id="fq-t" class="h-1" style="margin:22px 0 22px" data-reveal>${accent(F.title)}</h2><p class="body" style="max-width:34ch" data-reveal>${F.body}</p></div>
    <div data-reveal>${accordion(S.faq, "home-faq")}</div>
  </div></section>`;

  main.innerHTML = hero + strip + approach + services + why + areas + faq + ctaPanel();

  /* --- Services active state + image crossfade --- */
  const rows = $$(".svc-row"), imgs = $$(".svc-frame img"), label = $("#svc-label"), cap = $("#svc-cap"), book = $("#svc-book");
  let cur = 0, swapT;
  const setActive = (i) => {
    if (i === cur) return;
    cur = i;
    rows.forEach((r, k) => r.classList.toggle("is-active", k === i));
    imgs.forEach((im, k) => im.classList.toggle("on", k === i));
    [label, cap].forEach((el) => el.classList.add("out"));
    clearTimeout(swapT);
    swapT = setTimeout(() => {
      label.textContent = `${pad(i + 1)} — ${S.services[i].name}`;
      cap.textContent = S.services[i].caption;
      book.href = `book.html?service=${S.services[i].slug}`;
      [label, cap].forEach((el) => el.classList.remove("out"));
    }, 220);
  };
  rows.forEach((r, i) => {
    r.addEventListener("mouseenter", () => setActive(i));
    r.querySelector("a").addEventListener("focus", () => setActive(i));
    // touch: first tap activates, second follows link
    r.querySelector("a").addEventListener("click", (e) => {
      if (matchMedia("(hover: none)").matches && cur !== i) { e.preventDefault(); setActive(i); }
    });
  });

  /* --- Hero parallax (mouse + scroll), paused off-screen --- */
  if (!RM) {
    const heroEl = $(".hero"), par = $$("[data-parallax]", heroEl);
    let mx = 0, my = 0, sy = 0, raf;
    const apply = () => {
      raf = null;
      par.forEach((el) => {
        const k = +el.dataset.parallax;
        const x = mx * k, y = my * k - sy * (k / 120);
        if (el.classList.contains("doctor")) { el.style.setProperty("--px", x + "px"); el.style.setProperty("--py", y + "px"); }
        else { const inner = el.firstElementChild; inner.style.setProperty("--cx", x + "px"); inner.style.setProperty("--cy", y + "px"); }
      });
    };
    const req = () => raf || (raf = requestAnimationFrame(apply));
    if (matchMedia("(hover: hover)").matches) heroEl.addEventListener("mousemove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; req(); });
    window.__onScroll = window.__onScroll || [];
    window.__onScroll.push((y) => { if (y < innerHeight * 1.2) { sy = y; req(); } });
    new IntersectionObserver(([en]) => heroEl.classList.toggle("paused", !en.isIntersecting)).observe(heroEl);
  }
};
