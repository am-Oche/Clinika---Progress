/* CLINIKA — BOOKING WIZARD
   service -> location -> date/time -> details -> confirmation
   Minimal data only. Submission is mocked in submitBooking(). */
window.PAGES = window.PAGES || {};
window.PAGES.book = function () {
  const S = window.SITE;
  const { I, eyebrow, accent, crumbs, emergency, svcBySlug, locBySlug, param, $, $$, pad } = window.UI;
  document.title = `Book an Appointment — ${S.brand.name}`;
  const steps = ["Service", "Location", "Date & time", "Your details", "Confirm"];
  const state = { service: param("service") || "", location: param("location") || "", date: "", time: "", first: "", last: "", email: "", phone: "", newPatient: "yes", consent: false };
  let cur = 0;

  // next 10 business days
  const days = [];
  for (let d = new Date(), n = 0; days.length < 10 && n < 30; n++) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  const fmt = (d) => d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
  const iso = (d) => d.toISOString().slice(0, 10);
  const times = ["8:30", "9:15", "10:00", "11:30", "13:00", "14:15", "15:30", "16:45", "18:00"];

  document.getElementById("main").innerHTML = `
  <section class="page-hero light" style="padding-bottom:40px"><div class="container">
    <div data-reveal>${crumbs([{ label: "Home", href: "index.html" }, { label: "Book an Appointment" }])}</div>
    <div data-reveal>${eyebrow("Appointments")}</div>
    <h1 class="h-1" data-reveal style="margin:18px 0 18px">${accent("Book in a few *minutes.*")}</h1>
    <p class="lead" data-reveal>Choose a service, location and time. We'll confirm by email. No medical details needed.</p>
  </div></section>
  <section class="section tight" style="padding-top:24px"><div class="container wizard">
    <ol class="progress" aria-label="Booking progress">${steps.map((s, i) => `<li data-s="${i}"><span class="dotn">${pad(i + 1)}</span>${s}</li>`).join("")}</ol>
    <form id="wiz" novalidate aria-live="polite">
      <div class="bar-prog" aria-hidden="true"><i></i></div>
      <p class="small" id="wiz-count" style="margin:0 0 6px"></p>

      <fieldset class="step" data-step="0" style="border:0;padding:0;margin:0"><legend class="h-3" style="margin-bottom:24px">Which area of care?</legend>
        <div class="opt-grid">${S.services.map((s) => `<label class="opt"><input type="radio" name="service" value="${s.slug}"><b>${s.name}</b><span>${s.short}</span></label>`).join("")}</div>
        <p class="small" style="margin-top:18px">Not sure? Choose General Care and we'll guide you.</p><p class="err-msg" data-err="service"></p></fieldset>

      <fieldset class="step" data-step="1" style="border:0;padding:0;margin:0"><legend class="h-3" style="margin-bottom:24px">Which location?</legend>
        <div class="opt-grid" id="loc-opts"></div><p class="err-msg" data-err="location"></p></fieldset>

      <fieldset class="step" data-step="2" style="border:0;padding:0;margin:0"><legend class="h-3" style="margin-bottom:24px">Preferred date & time</legend>
        <p class="small" style="margin:0 0 12px">Date</p>
        <div class="slots" style="margin-bottom:28px">${days.map((d) => `<label class="slot"><input type="radio" name="date" value="${iso(d)}"><span>${fmt(d)}</span></label>`).join("")}</div>
        <p class="small" style="margin:0 0 12px">Time</p>
        <div class="slots">${times.map((t) => `<label class="slot"><input type="radio" name="time" value="${t}"><span>${t}</span></label>`).join("")}</div>
        <p class="small" style="margin-top:18px">This is a preference — we'll confirm the closest available time.</p><p class="err-msg" data-err="date"></p></fieldset>

      <fieldset class="step" data-step="3" style="border:0;padding:0;margin:0"><legend class="h-3" style="margin-bottom:24px">Your details</legend>
        <div class="form-grid">
          <div class="field"><label for="b-first">First name</label><input class="input" id="b-first" name="first" autocomplete="given-name"><span class="err-msg" data-err="first"></span></div>
          <div class="field"><label for="b-last">Last name</label><input class="input" id="b-last" name="last" autocomplete="family-name"><span class="err-msg" data-err="last"></span></div>
          <div class="field"><label for="b-email">Email</label><input class="input" id="b-email" name="email" type="email" autocomplete="email"><span class="err-msg" data-err="email"></span></div>
          <div class="field"><label for="b-phone">Phone</label><input class="input" id="b-phone" name="phone" type="tel" autocomplete="tel" placeholder="e.g. 416-555-0123"><span class="err-msg" data-err="phone"></span></div>
          <div class="field full"><span style="font-size:14px;font-weight:500">Have you visited Clinika before?</span>
            <div class="slots"><label class="slot"><input type="radio" name="newPatient" value="no"><span>Yes, returning patient</span></label><label class="slot"><input type="radio" name="newPatient" value="yes" checked><span>No, I'm new</span></label></div></div>
          <label class="check full"><input type="checkbox" name="consent"><span>I consent to Clinika collecting and using the information above to schedule and confirm my appointment, as described in the <a href="privacy.html" target="_blank" style="text-decoration:underline">Privacy Policy</a>. <em style="color:var(--muted)">[Consent wording: legal review required — PIPEDA/PHIPA]</em></span></label>
          <p class="err-msg full" data-err="consent"></p>
        </div></fieldset>

      <div class="step" data-step="4"><h2 class="h-3">Review your request</h2><dl class="summary" id="summary"></dl></div>

      <div class="step" data-step="5" id="done-step">
        <div class="success-ico">${I.check}</div>
        <h2 class="h-2" style="margin:24px 0 14px">${accent("Request *received.*")}</h2>
        <p class="lead" id="done-text"></p>
        <div class="hero-actions"><a class="btn btn-teal" href="index.html">Back to home${I.ca()}</a><a class="btn btn-outline" href="locations.html">View locations</a></div>
      </div>

      <div class="wiz-nav" id="wiz-nav">
        <button type="button" class="btn btn-outline" id="back">Back</button>
        <button type="submit" class="btn btn-teal" id="next">Continue${I.ca()}</button>
      </div>
      ${emergency()}
    </form>
  </div></section>`;

  const form = $("#wiz");
  const renderLocs = () => {
    $("#loc-opts").innerHTML = S.locations.map((l) => {
      const ok = !state.service || l.services.includes(state.service);
      return `<label class="opt${ok ? "" : " disabled"}"><input type="radio" name="location" value="${l.slug}" ${ok ? "" : "disabled"} ${state.location === l.slug && ok ? "checked" : ""}><b>${l.city}, ${l.prov}</b><span>${ok ? l.address : "Service not offered here"}</span></label>`;
    }).join("");
    if (state.location && !locBySlug(state.location).services.includes(state.service)) state.location = "";
  };
  // prefill radios
  if (state.service) { const r = form.querySelector(`[name=service][value="${state.service}"]`); if (r) r.checked = true; }

  const read = () => {
    const fd = new FormData(form);
    ["service", "location", "date", "time", "first", "last", "email", "phone", "newPatient"].forEach((k) => fd.has(k) && (state[k] = String(fd.get(k)).trim()));
    state.consent = form.querySelector("[name=consent]").checked;
  };
  const setErr = (k, msg) => { const el = form.querySelector(`[data-err="${k}"]`); if (el) el.textContent = msg || ""; const f = el?.closest(".field"); f && f.classList.toggle("err", !!msg); };
  // Zod-like schema per step
  const validate = (i) => {
    const e = {};
    if (i === 0 && !state.service) e.service = "Please choose a service.";
    if (i === 1 && !state.location) e.location = "Please choose a location.";
    if (i === 2 && (!state.date || !state.time)) e.date = "Please choose a preferred date and time.";
    if (i === 3) {
      if (state.first.length < 1) e.first = "Required.";
      if (state.last.length < 1) e.last = "Required.";
      if (!/^\S+@\S+\.\S+$/.test(state.email)) e.email = "Enter a valid email.";
      if (state.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number.";
      if (!state.consent) e.consent = "Consent is required to book.";
    }
    form.querySelectorAll("[data-err]").forEach((el) => setErr(el.dataset.err, e[el.dataset.err]));
    const firstBad = Object.keys(e)[0];
    if (firstBad) form.querySelector(`[name="${firstBad}"]`)?.focus();
    return !firstBad;
  };

  const show = (i) => {
    cur = i;
    $$(".step", form).forEach((s) => s.classList.toggle("on", +s.dataset.step === i));
    $$(".progress li").forEach((li, k) => { li.classList.toggle("done", k < i); li.classList.toggle("cur", k === i); li.toggleAttribute("aria-current", k === i); });
    $(".bar-prog i").style.transform = `scaleX(${Math.min(i + 1, 5) / 5})`;
    $("#wiz-count").textContent = i < 5 ? `Step ${i + 1} of 5` : "";
    $("#back").style.visibility = i === 0 ? "hidden" : "visible";
    $("#wiz-nav").style.display = i === 5 ? "none" : "";
    $("#next").firstChild.textContent = i === 4 ? "Send request" : "Continue";
    if (i === 1) renderLocs();
    if (i === 4) {
      const s = svcBySlug(state.service), l = locBySlug(state.location);
      $("#summary").innerHTML = [["Service", s.name], ["Location", `${l.city}, ${l.prov} — ${l.address}`], ["Preferred", `${fmt(new Date(state.date + "T12:00"))} at ${state.time}`], ["Name", `${state.first} ${state.last}`], ["Email", state.email], ["Phone", state.phone], ["Patient", state.newPatient === "yes" ? "New" : "Returning"]]
        .map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
    }
    const top = form.getBoundingClientRect().top + scrollY - 120;
    if (scrollY > top) (window.__lenis ? window.__lenis.scrollTo(top) : scrollTo({ top, behavior: "smooth" }));
    setTimeout(() => window.__lenis?.resize(), 50);
  };

  // Mock API — TODO: replace with POST /api/book (Next.js route) → email/EHR integration
  const submitBooking = (data) => new Promise((res) => setTimeout(() => res({ ok: true, ref: "CLK-" + Math.random().toString(36).slice(2, 8).toUpperCase() }), 900));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    read();
    if (cur < 4) { if (validate(cur)) show(cur + 1); return; }
    const nb = $("#next"); nb.disabled = true; nb.firstChild.textContent = "Sending…";
    const r = await submitBooking({ ...state });
    nb.disabled = false;
    if (r.ok) {
      $("#done-text").innerHTML = `Thanks, ${state.first}. Your reference is <strong>${r.ref}</strong>. We'll email ${state.email} to confirm your time at Clinika ${locBySlug(state.location).city}.`;
      show(5);
    }
  });
  form.addEventListener("change", (e) => { read(); if (e.target.name === "service") state.location = ""; });
  $("#back").addEventListener("click", () => cur > 0 && show(cur - 1));
  $$(".progress li").forEach((li, k) => li.addEventListener("click", () => k < cur && show(k)));

  // skip ahead if prefilled
  show(state.service && state.location ? 2 : state.service ? 1 : 0);
};
