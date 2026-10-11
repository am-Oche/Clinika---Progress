/* =====================================================================
   CLINIKA — SITE CONFIG
   Edit everything the client might change here. Components read from
   window.SITE. Accent words in headings are wrapped in *asterisks* and
   render as the italic serif.
   ===================================================================== */
window.SITE = {
  brand: {
    name: "Clinika",
    tagline: "Modern healthcare across Canada, designed around you.",
    country: "Canada",
    phone: "1-800-555-0142",
    email: "hello@clinika.example",
    emergency: "If this is a medical emergency, call 911 or go to your nearest emergency department.",
    copyright: "© 2026 Clinika Health Inc. All rights reserved.",
  },

  /* Header navigation — add/remove/reorder freely. `children` creates a dropdown. */
  nav: [
    { label: "Services", href: "services.html", children: "services" },
    { label: "Our approach", href: "approach.html" },
    { label: "Areas of care", href: "index.html#areas" },
    { label: "Locations", href: "locations.html" },
    { label: "FAQ", href: "faq.html" },
  ],
  cta: { label: "Book an Appointment", href: "book.html" },

  footer: [
    { title: "Clinika", links: [
      { label: "Services", href: "services.html" },
      { label: "About", href: "approach.html" },
      { label: "Our team", href: "team.html" },
      { label: "Locations", href: "locations.html" } ] },
    { title: "Support", links: [
      { label: "Resources", href: "resources.html" },
      { label: "Contact", href: "contact.html" },
      { label: "FAQ", href: "faq.html" },
      { label: "Book an Appointment", href: "book.html" } ] },
    { title: "Locations", links: "locations" },
  ],
  legal: [
    { label: "Privacy Policy", href: "privacy.html" },
    { label: "Terms of Use", href: "terms.html" },
  ],

  /* Image registry — swap `src` to client files in /images. */
  images: {
    hero:        { src: "images/hero-doctor.jpg", alt: "Physician in a white coat, thoughtful expression", focal: "50% 30%", credit: "Public Domain Pictures", license: "Public domain (CC0)", status: "verify before launch" },
    approach:    { src: "images/approach-consultation.jpg", alt: "Doctor holding a patient's hands during a warm consultation", focal: "35% 50%", credit: "PxHere", license: "CC0", status: "verify before launch" },
    general:     { src: "images/service-general.jpg", alt: "Physician with clipboard at a bright clinic desk", focal: "40% 40%", credit: "Easy-Peasy.AI (AI-generated)", license: "CC0 per source", status: "verify before launch" },
    dental:      { src: "images/location-interior.jpg", alt: "Bright clinic reception and waiting area", focal: "50% 50%", credit: "Easy-Peasy.AI (AI-generated)", license: "CC0 per source", status: "placeholder — replace with dentist & patient photo" },
    dermatology: { src: "images/service-dermatology.jpg", alt: "Dermatologist examining a patient's arm with a dermatoscope", focal: "45% 45%", credit: "Easy-Peasy.AI (AI-generated)", license: "CC0 per source", status: "verify before launch" },
    pediatrics:  { src: "images/service-pediatrics.jpg", alt: "Pediatrician gently examining a smiling child with her mother", focal: "45% 45%", credit: "Flickr", license: "CC per source", status: "verify before launch" },
    diagnostics: { src: "images/service-diagnostics.jpg", alt: "Laboratory specialist reviewing a sample beside a microscope", focal: "50% 40%", credit: "PxHere", license: "CC0", status: "verify before launch" },
    areas:       { src: "images/areas-blood-pressure.jpg", alt: "Clinician measuring a patient's blood pressure", focal: "50% 35%", credit: "Pixnio", license: "CC0", status: "verify before launch" },
    about:       { src: "images/about-consult.jpg", alt: "Doctor explaining options to a patient", focal: "60% 40%", credit: "Easy-Peasy.AI (AI-generated)", license: "CC0 per source", status: "verify before launch" },
    interior:    { src: "images/location-interior.jpg", alt: "Calm clinic waiting room with mint seating", focal: "50% 50%", credit: "Easy-Peasy.AI (AI-generated)", license: "CC0 per source", status: "verify before launch" },
  },

  home: {
    hero: {
      badge: "Healthcare across Canada",
      title: "Care that feels",
      accent: "personal.",
      sub: "Modern healthcare designed around you, from everyday care to specialized treatment.",
      primary: { label: "Book an Appointment", href: "book.html" },
      secondary: { label: "Explore Services", href: "services.html" },
      card: { label: "One team around you", count: "05", text: "Five areas of care, connected." },
      locCard: { label: "Care, close to home", link: "Find a location", href: "locations.html" },
    },
    approach: {
      eyebrow: "Our approach",
      title: "Healthcare that starts with *listening.*",
      body: "We believe better care begins with understanding the person behind every appointment. Clinika brings together experienced professionals, modern facilities, and thoughtful care tailored to your needs.",
      steps: [
        { kicker: "First", title: "We listen", text: "Time to talk through what brought you in, in your own words." },
        { kicker: "Then", title: "We explain", text: "Clear information about your options, without the jargon." },
        { kicker: "Together", title: "We plan", text: "Next steps shaped around your needs, schedule and goals." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Five areas of care, designed to work *together.*",
      helper: "Select a service to learn more. Each one connects to the others, so your care stays coordinated.",
    },
    why: {
      eyebrow: "Why Clinika",
      title: "What it feels like to be a Clinika *patient.*",
      body: "Good care is more than a diagnosis. It is the whole experience — from booking your visit to knowing what comes next.",
      items: [
        { title: "Patient-first care", text: "Appointments with room to ask questions, and follow-ups that actually follow up." },
        { title: "Experienced professionals", text: "Licensed physicians, dentists and specialists who work as one coordinated team." },
        { title: "Modern facilities", text: "Bright, accessible clinics with on-site diagnostics at most locations." },
        { title: "Convenient appointments", text: "Online booking, evening and weekend hours, and reminders that fit your day." },
      ],
    },
    areas: {
      eyebrow: "Areas of care",
      title: "One place for everyday and *specialized* care.",
      caption: "Many visits begin with General Care — and continue with a specialist when you need one.",
      featuredLabel: "Your starting point",
      connector: "Connected specialties",
    },
    faq: {
      title: "Questions, *answered.*",
      body: "Can't find what you're looking for? <a href='contact.html'>Contact our team</a> and we'll be glad to help.",
    },
    cta: {
      eyebrow: "Appointments",
      title: "Ready when *you are.*",
      body: "Book online in a few minutes, or find the Clinika location closest to you.",
      primary: { label: "Book an Appointment", href: "book.html" },
      secondary: { label: "Find a location", href: "locations.html" },
    },
  },

  services: [
    { slug: "general-care", name: "General Care", short: "Everyday healthcare for you and your family.",
      caption: "Checkups, ongoing care and a first point of contact for any health concern.",
      card: "Everyday health for you and your family, and a clear path to the right specialty.",
      img: "general",
      intro: "Your family physician team for checkups, ongoing conditions, prescriptions and referrals — the place most Clinika journeys begin.",
      treats: ["Annual physicals & checkups", "Chronic condition follow-up", "Prescriptions & renewals", "Vaccinations", "Minor illness & injury", "Referrals to specialists"] },
    { slug: "dental", name: "Dental", short: "Preventive and restorative dental care.",
      caption: "Cleanings, checkups and restorative treatment in a calm, modern setting.",
      card: "Checkups, cleanings and restorative care.",
      img: "dental",
      intro: "Preventive and restorative dentistry for all ages, coordinated with your Clinika health record.",
      treats: ["Exams & cleanings", "Fillings & restorations", "Crowns & bridges", "Children's dentistry", "Gum care", "Night guards"] },
    { slug: "dermatology", name: "Dermatology", short: "Personalized care for healthy skin.",
      caption: "Assessment and care for skin, hair and nail concerns, from routine to complex.",
      card: "Care for routine and ongoing skin concerns.",
      img: "dermatology",
      intro: "Assessment and management of skin, hair and nail conditions, with clear explanations at every step.",
      treats: ["Skin checks & mole mapping", "Acne & rosacea", "Eczema & psoriasis", "Rashes & allergies", "Hair & nail concerns", "Minor procedures"] },
    { slug: "pediatrics", name: "Pediatrics", short: "Thoughtful care for growing families.",
      caption: "Well-child visits, vaccinations and gentle care from newborn to teen.",
      card: "Gentle care from newborns to teens.",
      img: "pediatrics",
      intro: "Care for children from newborn to teen, delivered with patience and plenty of time for parents' questions.",
      treats: ["Well-baby & well-child visits", "Immunizations", "Growth & development", "Common childhood illness", "School & sports forms", "Teen health"] },
    { slug: "diagnostics", name: "Diagnostics", short: "Clear answers through modern diagnostic services.",
      caption: "On-site lab work and imaging so you get answers sooner, closer to home.",
      card: "Lab work and imaging, close to home.",
      img: "diagnostics",
      intro: "On-site laboratory testing and imaging, with results shared securely with your care team.",
      treats: ["Blood & urine tests", "ECG", "Ultrasound", "X-ray", "Allergy testing", "Results review"] },
  ],

  visitSteps: [
    { title: "Book", text: "Choose a service, location and time online or by phone." },
    { title: "Check in", text: "Arrive a few minutes early; bring your provincial health card." },
    { title: "Your visit", text: "Time to talk, examine and agree on next steps together." },
    { title: "Follow-up", text: "Results, referrals and reminders shared securely afterwards." },
  ],

  locations: [
    { slug: "toronto", city: "Toronto", prov: "ON", address: "220 King St W, Suite 400", postal: "M5H 1K4", phone: "416-555-0110", hours: [["Mon–Fri", "8:00 – 20:00"], ["Saturday", "9:00 – 16:00"], ["Sunday", "Closed"]], services: ["general-care","dental","dermatology","pediatrics","diagnostics"] },
    { slug: "vancouver", city: "Vancouver", prov: "BC", address: "1055 W Georgia St, Level 2", postal: "V6E 3P3", phone: "604-555-0120", hours: [["Mon–Fri", "8:00 – 19:00"], ["Saturday", "9:00 – 15:00"], ["Sunday", "Closed"]], services: ["general-care","dermatology","pediatrics","diagnostics"] },
    { slug: "calgary", city: "Calgary", prov: "AB", address: "333 7 Ave SW, Suite 900", postal: "T2P 2Z1", phone: "403-555-0130", hours: [["Mon–Fri", "8:00 – 18:00"], ["Saturday", "9:00 – 14:00"], ["Sunday", "Closed"]], services: ["general-care","dental","diagnostics"] },
    { slug: "ottawa", city: "Ottawa", prov: "ON", address: "150 Elgin St, Suite 210", postal: "K2P 1L4", phone: "613-555-0140", hours: [["Mon–Fri", "8:00 – 19:00"], ["Saturday", "9:00 – 15:00"], ["Sunday", "Closed"]], services: ["general-care","pediatrics","dermatology"] },
    { slug: "montreal", city: "Montreal", prov: "QC", address: "1250 Boul René-Lévesque O", postal: "H3B 4W8", phone: "514-555-0150", hours: [["Lun–Ven", "8:00 – 19:00"], ["Samedi", "9:00 – 15:00"], ["Dimanche", "Fermé"]], services: ["general-care","dental","dermatology","pediatrics","diagnostics"] },
  ],

  /* Team — placeholder names. Replace with client team photos & bios. */
  team: [
    { name: "Dr. Amelia Hart", role: "Family Physician", service: "general-care", loc: "toronto" },
    { name: "Dr. Daniel Okafor", role: "Family Physician", service: "general-care", loc: "calgary" },
    { name: "Dr. Priya Raman", role: "Dermatologist", service: "dermatology", loc: "vancouver" },
    { name: "Dr. Lucas Bernier", role: "Dentist", service: "dental", loc: "montreal" },
    { name: "Dr. Mei Chen", role: "Pediatrician", service: "pediatrics", loc: "ottawa" },
    { name: "Dr. Sofia Alvarez", role: "Radiologist", service: "diagnostics", loc: "toronto" },
    { name: "Dr. Noah Tremblay", role: "Pediatrician", service: "pediatrics", loc: "montreal" },
    { name: "Dr. Hannah Kim", role: "Dentist", service: "dental", loc: "calgary" },
  ],

  faq: [
    { q: "What services does Clinika provide?", a: "Clinika offers five connected areas of care: General Care, Dental, Dermatology, Pediatrics and Diagnostics. Services vary by location — each location page lists what's available there." },
    { q: "How do I book an appointment?", a: "Use the Book an Appointment button anywhere on this site to choose a service, location and preferred time. You can also call your nearest clinic. You'll receive a confirmation by email once a time is confirmed." },
    { q: "Can I choose a specific healthcare professional?", a: "Yes. You can mention a preferred professional when you book, and we'll do our best to accommodate. Availability depends on their schedule and location." },
    { q: "Which Clinika locations are available?", a: "We currently have clinics in Toronto, Vancouver, Calgary, Ottawa and Montreal. Visit our Locations page for addresses, hours and the services offered at each." },
    { q: "Do I need an appointment for diagnostics?", a: "Most diagnostic services require a requisition from a healthcare provider and a booked time. Some locations accept walk-ins for routine lab work — check your location page or call ahead." },
  ],

  posts: [
    { slug: "first-visit", title: "What to expect at your first Clinika visit", cat: "Getting started", date: "Sep 22, 2026", read: "4 min", img: "about", excerpt: "From check-in to follow-up, here's how a first appointment works — and what to bring." },
    { slug: "skin-checks", title: "Why an annual skin check is worth your time", cat: "Dermatology", date: "Aug 30, 2026", read: "5 min", img: "dermatology", excerpt: "A short, simple appointment that helps you understand your skin and spot changes early." },
    { slug: "kids-checkups", title: "Making checkups easier for little ones", cat: "Pediatrics", date: "Aug 12, 2026", read: "3 min", img: "pediatrics", excerpt: "Small, practical ideas to help children feel calm and curious at the clinic." },
    { slug: "lab-results", title: "Understanding your lab results", cat: "Diagnostics", date: "Jul 28, 2026", read: "6 min", img: "diagnostics", excerpt: "A plain-language guide to common blood tests and how we share results with you." },
  ],
};
