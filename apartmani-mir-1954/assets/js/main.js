/* =========================================================
   Apartmani MIR 1954 Varaždin — main.js
   Sadržaj se renderira iz JS arraya (lako za uređivanje).
   VAŽNO: bez hrvatskih navodnika unutar JS stringova.
   ========================================================= */

/* ---------- KONFIGURACIJA (uredi ove vrijednosti) ---------- */
const CONFIG = {
  bookingUrl: "https://www.booking.com/hotel/hr/apartmani-mir-varazdin.hr.html?aid=318615&label=New_Croatian_HR_HR_27026355265-J9eRNc4mUmC9pPUbC1qeegS821491954232%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwl-64416066025%3Alp1028862%3Ali%3Adec%3Adm&dest_id=-99351&dest_type=city&group_adults=2&group_children=0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA",
  phone:      "098 370 430",                       // prikazani telefon
  phoneHref:  "+38598370430",                      // telefon za tel: link (međunarodni)
  email:      "apartmanimirvz@gmail.com",          // e-mail
  instagram:  "",                                  // (nemaju)
  facebook:   ""                                   // (nemaju)
};

/* ---------- Jezik ---------- */
let LANG = localStorage.getItem("mir-lang") === "en" ? "en" : "hr";
const t = (hr, en) => (LANG === "en" ? en : hr);

/* ---------- SVG ikone (inline, stroke) ---------- */
const IC = {
  guests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3.3 2.5-5.2 5.5-5.2s5.5 1.9 5.5 5.2"/><path d="M16 5.2a3 3 0 0 1 0 5.8M17.5 13.8c2.4.4 4 2.2 4 5.2"/></svg>',
  area:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 3.5v3M3.5 8h3M17.5 20.5v-3M20.5 16h-3"/></svg>',
  bath:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2Z"/><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4a2.4 2.4 0 0 1 2.3 1.7"/><path d="M9.7 6.4 12 5"/><path d="M7 18l-1 2M17 18l1 2"/></svg>',
  bed:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-8h13a4 4 0 0 1 4 4v4"/><path d="M3 14h17M3 18v2M20 18v2"/><path d="M6.5 10V8.2A1.2 1.2 0 0 1 7.7 7h3.1A1.2 1.2 0 0 1 12 8.2V10"/></svg>',
  wifi:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 9a13 13 0 0 1 16 0M6.7 12.2a9 9 0 0 1 10.6 0M9.4 15.4a5 5 0 0 1 5.2 0"/><circle cx="12" cy="18.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  parking:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.5 16.5v-9h3.2a2.6 2.6 0 0 1 0 5.2H9.5"/></svg>',
  ac:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M12 6.5 9.5 5M12 6.5 14.5 5M12 17.5 9.5 19M12 17.5 14.5 19"/><path d="M3 12h18M6.5 12 5 9.5M6.5 12 5 14.5M17.5 12 19 9.5M17.5 12 19 14.5"/></svg>',
  kitchen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3v6M5 3v3.5A2 2 0 0 0 7 8.5M9 3v3.5A2 2 0 0 1 7 8.5M7 8.5V21"/><path d="M16 3c-1.7 0-3 2-3 4.5S14.3 12 16 12h1V3h-1Z"/><path d="M16.5 12v9"/></svg>',
  terrace:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20h16M6 20v-6M18 20v-6M5 14h14l-2-4H7l-2 4Z"/><path d="M12 10V4M9 4h6"/></svg>',
  tv:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5.5" width="18" height="12" rx="2"/><path d="M8.5 21h7M12 17.5V21"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 9h12v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3.5c-.6.7-.6 1.3 0 2M11.5 3.5c-.6.7-.6 1.3 0 2"/></svg>',
  washer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="13" r="4.2"/><path d="M8 6h.01M11 6h.01"/></svg>',
  sound:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 9v6h3l5 4V5L7 9H4Z"/><path d="M16 9.5a3.5 3.5 0 0 1 0 5"/></svg>',
  shower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 21V8a3 3 0 0 1 3-3h1M10 5V3.5"/><circle cx="15.5" cy="7.5" r="2.5"/><path d="M11 14v.01M14 14v.01M17 14v.01M12.5 17v.01M15.5 17v.01"/></svg>',
  nosmoke:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/><path d="M6 14h8v2H6zM16 14h2v2h-2"/></svg>',
  pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  landmark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20h16M5 20v-8M9 20v-8M15 20v-8M19 20v-8M3.5 12h17L12 5 3.5 12Z"/></svg>',
  cafe:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h1.8a2.2 2.2 0 0 1 0 4.4H17"/><path d="M4 21h13"/></svg>',
  train:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="3.5" width="12" height="13" rx="3"/><path d="M6 11h12"/><circle cx="9" cy="13.6" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13.6" r="1" fill="currentColor" stroke="none"/><path d="M8 16.5 6 20M16 16.5 18 20"/></svg>',
  plane:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.5 13.5 4 15l-1-2 6-3.5V4.5a1.5 1.5 0 0 1 3 0V9.5l6 3.5-1 2-6.5-1.5-1 4 2 1.2v1.3l-3-1-3 1v-1.3l2-1.2-1-4Z"/></svg>',
  clock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  rules:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5h9l3.5 3.5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z"/><path d="M14.5 3.5V7H18M8.5 12l1.5 1.5 3-3M8.5 16.5h6"/></svg>',
  child:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="6" r="2.4"/><path d="M12 8.4v6M8 11h8M9 20l3-5.6L15 20"/></svg>'
};

/* ---------- PODACI ---------- */
const APARTMENTS = () => [
  {
    img: "assets/img/apartman-2sobe.jpg",
    badge: t("Cijeli apartman", "Entire apartment"),
    name: t("apartman s 2 spavaće sobe", "two-bedroom apartment"),
    specs: [
      { ic: "area", v: "98 m²" },
      { ic: "guests", v: t("do 5 gostiju", "up to 5 guests") },
      { ic: "bed", v: t("2 spavaće sobe", "2 bedrooms") },
      { ic: "bath", v: t("2 kupaonice", "2 bathrooms") }
    ],
    desc: t("Prostran otvoreni prostor s potpuno opremljenom kuhinjom, blagovaonicom i udobnim dnevnim boravkom — idealan za obitelji i manje grupe.",
            "A spacious open-plan layout with a fully equipped kitchen, dining area and comfortable living room — ideal for families and smaller groups."),
    rooms: [
      { l: t("Spavaća soba 1", "Bedroom 1"), v: t("1 iznimno veliki bračni krevet", "1 extra-large double bed") },
      { l: t("Spavaća soba 2", "Bedroom 2"), v: t("1 bračni krevet", "1 double bed") },
      { l: t("Dnevni boravak", "Living room"), v: t("1 kauč na rasklapanje", "1 sofa bed") }
    ],
    tags: [ t("Vlastita kuhinja","Kitchen"), t("Klima-uređaj","Air conditioning"), t("Perilica posuđa","Dishwasher"), "TV", t("Aparat za kavu","Coffee machine"), t("Zvučna izolacija","Soundproof"), "WiFi" ],
    price: "228"
  },
  {
    img: "assets/img/dnevni-3sobe.jpg",
    badge: t("Pogled na grad", "City view"),
    name: t("apartman s 3 spavaće sobe", "three-bedroom apartment"),
    specs: [
      { ic: "area", v: "113 m²" },
      { ic: "guests", v: t("do 6 gostiju", "up to 6 guests") },
      { ic: "bed", v: t("3 spavaće sobe", "3 bedrooms") },
      { ic: "bath", v: t("2 kupaonice", "2 bathrooms") }
    ],
    desc: t("Naš najveći apartman s vlastitom terasom i pogledom na grad. Tri odvojene spavaće sobe pružaju privatnost i prostor za veće društvo.",
            "Our largest apartment with a private terrace and city view. Three separate bedrooms offer privacy and space for larger groups."),
    rooms: [
      { l: t("Spavaća soba 1", "Bedroom 1"), v: t("1 iznimno veliki bračni krevet", "1 extra-large double bed") },
      { l: t("Spavaća soba 2", "Bedroom 2"), v: t("1 veliki bračni krevet", "1 large double bed") },
      { l: t("Spavaća soba 3", "Bedroom 3"), v: t("1 veliki bračni krevet", "1 large double bed") }
    ],
    tags: [ t("Terasa","Terrace"), t("Pogled na grad","City view"), t("Vlastita kuhinja","Kitchen"), t("Klima-uređaj","Air conditioning"), t("Perilica posuđa","Dishwasher"), "TV", t("Aparat za kavu","Coffee machine"), "WiFi" ],
    price: "260"
  }
];

const AMENITIES = () => [
  { ic: "parking", l: t("Besplatni privatni parking", "Free private parking") },
  { ic: "wifi",    l: t("Besplatni WiFi", "Free WiFi") },
  { ic: "ac",      l: t("Klima-uređaj", "Air conditioning") },
  { ic: "kitchen", l: t("Vlastita kuhinja", "Private kitchen") },
  { ic: "bath",    l: t("Vlastita kupaonica", "Private bathroom") },
  { ic: "terrace", l: t("Terasa", "Terrace") },
  { ic: "tv",      l: t("TV s ravnim ekranom", "Flat-screen TV") },
  { ic: "coffee",  l: t("Aparat za kavu", "Coffee machine") },
  { ic: "washer",  l: t("Perilica posuđa", "Dishwasher") },
  { ic: "sound",   l: t("Zvučna izolacija", "Soundproofing") },
  { ic: "shower",  l: t("Tuš kabina", "Shower") },
  { ic: "nosmoke", l: t("Sobe za nepušače", "Non-smoking rooms") }
];

const GALLERY = () => [
  ["galerija-1.jpg", t("Dnevni boravak i blagovaonica","Living and dining area")],
  ["galerija-9.jpg", t("Dnevni boravak s TV-om","Living room with TV")],
  ["galerija-4.jpg", t("Potpuno opremljena kuhinja","Fully equipped kitchen")],
  ["galerija-6.jpg", t("Spavaća soba","Bedroom")],
  ["galerija-13.jpg", t("Ulazni prostor","Entrance area")],
  ["galerija-12.jpg", t("Stubište s umjetničkim muralom","Staircase with art mural")],
  ["galerija-2.jpg", t("Spavaća soba s TV-om","Bedroom with TV")],
  ["galerija-5.jpg", t("Dnevni boravak s kožnom garniturom","Living room with leather sofa")],
  ["galerija-11.jpg", t("Dnevni boravak","Living room")],
  ["galerija-8.jpg", t("Otvoreni prostor","Open-plan space")],
  ["galerija-7.jpg", t("Kupaonica s tuš kabinom","Bathroom with shower")],
  ["galerija-10.jpg", t("Moderna kupaonica","Modern bathroom")],
  ["galerija-3.jpg", t("Terasa s pogledom","Terrace with a view")]
];

const RATINGS = () => [
  { l: t("Osoblje","Staff"), v: "9,9", p: 99 },
  { l: t("Čistoća","Cleanliness"), v: "10", p: 100 },
  { l: t("Udobnost","Comfort"), v: "10", p: 100 },
  { l: t("Sadržaji","Facilities"), v: "9,8", p: 98 },
  { l: t("Vrijednost za novac","Value for money"), v: "9,7", p: 97 },
  { l: t("Lokacija","Location"), v: "9,3", p: 93 }
];

const REVIEWS = () => [
  { n: "Nevena", c: t("Hrvatska","Croatia"),
    q: t("Izvrstan i komodan apartman, skladno i moderno uređen. Udobni kreveti, lijepa i funkcionalna kuhinja i dvije kupaonice. Domaćini na usluzi, spremni sa korisnim savjetima. Čista desetka, vratit ćemo se opet!",
         "Excellent and comfortable apartment, tastefully and modernly furnished. Comfy beds, a lovely functional kitchen and two bathrooms. Attentive hosts, full of useful tips. A clean ten, we will be back!") },
  { n: "Surać", c: t("Hrvatska","Croatia"),
    q: t("Jako lijep i ugodan apartman, čist i uredan. Vlasnik ljubazan i dostupan, čak nam je očistio auto od snijega prije odlaska. Svaka pohvala!",
         "A very beautiful and pleasant apartment, clean and tidy. The owner was kind and available, he even cleared the snow off our car before departure. Highly recommended!") },
  { n: "Sandra", c: t("Hrvatska","Croatia"),
    q: t("Sve je bilo odlično, apartman je lijepo uređen i nov, potpuno opremljen, parking je ispred kuće, blizina centra, a istovremeno miran dio grada.",
         "Everything was excellent, the apartment is beautifully furnished and new, fully equipped, parking is right in front, close to the centre yet in a quiet part of town.") },
  { n: "Moran", c: t("Hrvatska","Croatia"),
    q: t("Fenomenalan apartman, udoban, ogroman prostor za druženje, velike sobe s televizorima. Dvije kupaonice pružaju dodatan komfor. Kad bude prilika, vraćamo se. Sve za 5!",
         "A phenomenal apartment, comfortable, with a huge space for socialising and large rooms with TVs. Two bathrooms add extra comfort. When we get the chance, we are coming back. Five stars!") },
  { n: "Snjezana", c: t("Hrvatska","Croatia"),
    q: t("Apartman je čist, prostran i moderno uređen. Kreveti su udobni. Domaćini ljubazni i gostoljubivi. Svaka soba ima svoju kupaonicu. Za svaku preporuku.",
         "The apartment is clean, spacious and modern. The beds are comfortable. The hosts are kind and hospitable. Every room has its own bathroom. Highly recommended.") },
  { n: "Ana", c: t("Hrvatska","Croatia"),
    q: t("Apartman je jako uredan i odlično opremljen. Preporučujem!",
         "The apartment is very tidy and well equipped. Recommended!") }
];

const INFO = () => [
  { ic: "clock", h: t("Prijava i odjava","Check-in & check-out"), items: [
    [t("Prijava","Check-in"), "14:00 – 18:00"],
    [t("Odjava","Check-out"), "07:00 – 10:00"],
    ["", t("Molimo najavite vrijeme dolaska.","Please let us know your arrival time in advance.")],
    ["", t("Uvjeti otkazivanja ovise o odabranim datumima.","Cancellation terms depend on your chosen dates.")]
  ]},
  { ic: "rules", h: t("Pravila objekta","House rules"), items: [
    ["", t("Pušenje nije dozvoljeno.","Smoking is not allowed.")],
    ["", t("Zabave i događanja nisu dozvoljeni.","Parties and events are not allowed.")],
    ["", t("Boravak kućnih ljubimaca nije dozvoljen.","Pets are not allowed.")],
    ["", t("Za prijavu nema dobne granice.","No age restriction for check-in.")]
  ]},
  { ic: "child", h: t("Djeca i kreveti","Children & beds"), items: [
    ["", t("Djeca svih dobi su dobrodošla.","Children of all ages are welcome.")],
    [t("Dječji krevetić","Baby cot"), t("20 € po djetetu / noćenju","20 € per child / night")],
    ["", t("Dostupno na zahtjev (0–3 g).","Available on request (ages 0–3).")],
    ["", t("Pomoćni ležajevi nisu dostupni.","Extra beds are not available.")]
  ]}
];

const FAQ = () => [
  { q: t("Koliko gostiju može boraviti u apartmanima?","How many guests can stay?"),
    a: t("Ovisno o odabranoj jedinici, apartmani mogu primiti do 6 odnosno do 5 gostiju.","Depending on the unit, the apartments can accommodate up to 6 or up to 5 guests.") },
  { q: t("Koliko spavaćih soba imaju apartmani?","How many bedrooms do the apartments have?"),
    a: t("Nudimo dvije jedinice: jednu s 3 spavaće sobe i jednu s 2 spavaće sobe.","We offer two units: one with 3 bedrooms and one with 2 bedrooms.") },
  { q: t("Ima li apartman terasu?","Is there a terrace?"),
    a: t("Da, apartman s 3 spavaće sobe ima vlastitu terasu s pogledom na grad.","Yes, the three-bedroom apartment has its own terrace with a city view.") },
  { q: t("Koje je vrijeme prijave i odjave?","What are the check-in and check-out times?"),
    a: t("Prijava je od 14:00 do 18:00, a odjava od 07:00 do 10:00.","Check-in is from 14:00 to 18:00, and check-out from 07:00 to 10:00.") },
  { q: t("Koliko su apartmani udaljeni od centra?","How far is it from the centre?"),
    a: t("Apartmani se nalaze na samo 1,7 km od centra Varaždina, u mirnom dijelu grada s besplatnim privatnim parkingom.","The apartments are just 1.7 km from the centre of Varaždin, in a quiet part of town with free private parking.") },
  { q: t("Jesu li apartmani pogodni za obitelji?","Are the apartments family-friendly?"),
    a: t("Da, apartmani su vrlo popularni među gostima koji putuju s obitelji.","Yes, the apartments are very popular with guests travelling as a family.") },
  { q: t("Koliko stoji boravak?","How much does a stay cost?"),
    a: t("Cijene ovise o odabranim datumima i duljini boravka. Unesite datume na Booking.com-u za točan izračun.","Prices depend on your dates and length of stay. Enter your dates on Booking.com for an exact quote.") }
];

/* ---------- RENDER ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

function renderApartments() {
  $("#apartmentList").innerHTML = APARTMENTS().map((a) => `
    <article class="apartment reveal">
      <div class="apt-media">
        <img src="${a.img}" alt="${esc(a.name)}" loading="lazy">
        <span class="apt-badge">${esc(a.badge)}</span>
      </div>
      <div class="apt-body">
        <h3>${esc(a.name)}</h3>
        <ul class="apt-specs">
          ${a.specs.map((s) => `<li>${IC[s.ic]}<span>${esc(s.v)}</span></li>`).join("")}
        </ul>
        <p class="apt-desc">${esc(a.desc)}</p>
        <ul class="apt-rooms">
          ${a.rooms.map((r) => `<li><span><b>${esc(r.l)}:</b> ${esc(r.v)}</span></li>`).join("")}
        </ul>
        <div class="apt-tags">${a.tags.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
        <div class="apt-foot">
          <div class="apt-price">
            <span class="from">${t("od","from")}</span>
            <span class="amount">${a.price} € <small>/ ${t("noćenju","night")}</small></span>
          </div>
          <a class="btn btn-gold" href="${CONFIG.bookingUrl}" target="_blank" rel="noopener">${t("Rezerviraj","Book now")}</a>
        </div>
      </div>
    </article>`).join("");
}

function renderAmenities() {
  $("#amenityGrid").innerHTML = AMENITIES().map((a) => `
    <li class="amenity reveal">${IC[a.ic]}<span>${esc(a.l)}</span></li>`).join("");
}

function renderGallery() {
  const html = GALLERY().map(([src, alt], i) => `
    <figure class="gallery-item${i >= 6 ? " extra hidden" : ""}">
      <img src="assets/img/${src}" alt="${esc(alt)}" loading="lazy">
    </figure>`).join("");
  $("#galleryGrid").innerHTML = html;
}

function renderRatings() {
  $("#ratingBars").innerHTML = RATINGS().map((r) => `
    <li class="rating-bar">
      <div class="rb-top"><span>${esc(r.l)}</span><strong>${esc(r.v)}</strong></div>
      <div class="rating-track"><span class="rating-fill" data-p="${r.p}"></span></div>
    </li>`).join("");
}

function renderReviews() {
  $("#reviewCards").innerHTML = REVIEWS().map((r) => `
    <article class="review-card">
      <p class="review-quote">${esc(r.q)}</p>
      <div class="review-stars" aria-label="5/5">★★★★★</div>
      <div class="review-who">
        <span class="review-avatar" aria-hidden="true">${esc(r.n.charAt(0))}</span>
        <span><span class="rn">${esc(r.n)}</span><br><span class="rl">${esc(r.c)}</span></span>
      </div>
    </article>`).join("");
}

function renderInfo() {
  $("#infoGrid").innerHTML = INFO().map((c) => `
    <div class="info-card reveal">
      <div class="ic-icon">${IC[c.ic]}</div>
      <h3>${esc(c.h)}</h3>
      <ul>${c.items.map((it) => `<li>${it[0] ? `<strong>${esc(it[0])}:</strong> ` : ""}${esc(it[1])}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderFaq() {
  $("#faqList").innerHTML = FAQ().map((f) => `
    <div class="faq-item">
      <button class="faq-q" type="button" aria-expanded="false">
        <span>${esc(f.q)}</span><span class="faq-ico" aria-hidden="true"></span>
      </button>
      <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
    </div>`).join("");
  bindFaq();
}

function renderDynamic() {
  renderApartments();
  renderAmenities();
  renderGallery();
  renderRatings();
  renderReviews();
  renderInfo();
  renderFaq();
  applyGalleryState();
  observeReveals();
}

/* ---------- INTERAKCIJE ---------- */

// Header scroll
const header = $("#siteHeader");
function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobilni izbornik
const menuToggle = $("#menuToggle");
const mobileMenu = $("#mobileMenu");
function setMenu(open) {
  menuToggle.classList.toggle("active", open);
  mobileMenu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
  menuToggle.setAttribute("aria-label", open ? t("Zatvori izbornik","Close menu") : t("Otvori izbornik","Open menu"));
  document.body.classList.toggle("menu-open", open);
}
menuToggle.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
$$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Galerija: prikaži sve / manje
let galleryOpen = false;
const galleryToggle = $("#galleryToggle");
function applyGalleryState() {
  $$(".gallery-item.extra").forEach((el) => el.classList.toggle("hidden", !galleryOpen));
}
galleryToggle.addEventListener("click", () => {
  galleryOpen = !galleryOpen;
  applyGalleryState();
  const key = galleryOpen ? (LANG === "en" ? "data-less-en" : "data-less") : (LANG === "en" ? "data-more-en" : "data-more");
  galleryToggle.textContent = galleryToggle.getAttribute(key);
  observeReveals();
});

// FAQ akordeon
function bindFaq() {
  $$("#faqList .faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.height = open ? a.scrollHeight + "px" : "0px";
    });
  });
}

// Reveal na scroll + punjenje rating barova
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          if (en.target.id === "ratingBars") {
            $$(".rating-fill", en.target).forEach((f) => { f.style.width = f.dataset.p + "%"; });
          }
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  }
  $$(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
  const rb = $("#ratingBars");
  if (rb) revealObserver.observe(rb);
}

// Jezik
function applyStaticLang() {
  document.documentElement.lang = LANG;
  $$("[data-en]").forEach((el) => {
    if (!el.hasAttribute("data-hr")) el.setAttribute("data-hr", el.innerHTML);
    el.innerHTML = LANG === "en" ? el.getAttribute("data-en") : el.getAttribute("data-hr");
  });
  // gumb galerije
  const key = galleryOpen ? (LANG === "en" ? "data-less-en" : "data-less") : (LANG === "en" ? "data-more-en" : "data-more");
  if (galleryToggle) galleryToggle.textContent = galleryToggle.getAttribute(key);
  // lang gumbi
  $$(".lang-switch button").forEach((b) => {
    const active = b.dataset.lang === LANG;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });
}
function setLang(lang) {
  if (lang === LANG) return;
  LANG = lang === "en" ? "en" : "hr";
  localStorage.setItem("mir-lang", LANG);
  applyStaticLang();
  renderDynamic();
}
$$(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

// Config primjena na statične linkove
function applyConfig() {
  $$("#bookingBtn, #bookingBtnFoot").forEach((el) => { el.href = CONFIG.bookingUrl; });
  $$('a[href^="tel:"]').forEach((el) => { el.href = "tel:" + CONFIG.phoneHref; });
  $$('a[href^="mailto:"]').forEach((el) => { el.href = "mailto:" + CONFIG.email; el.textContent = CONFIG.email; });
  $$('[data-social="booking"]').forEach((el) => { el.href = CONFIG.bookingUrl; });
  const footPhone = $(".footer-contact a[href^='tel:']");
  if (footPhone) footPhone.textContent = CONFIG.phone;
}

// Kuglica koja prati kursor (samo miš / fini pokazivač)
function initCursorDot() {
  const dot = $("#cursorDot");
  if (!dot) return;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!fine) { dot.remove(); return; }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, x = mx, y = my, shown = false;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!shown) { shown = true; dot.style.opacity = "1"; }
    if (reduce) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
  }, { passive: true });
  // namjerno bez skrivanja na mouseleave: kad kursor izađe iz prozora i vrati se,
  // kuglica ostaje i nastavlja pratiti (ne nestaje).
  document.addEventListener("mouseover", (e) => { if (e.target.closest("a, button, .faq-q, .gallery-item")) dot.classList.add("big"); });
  document.addEventListener("mouseout", (e) => { if (e.target.closest("a, button, .faq-q, .gallery-item")) dot.classList.remove("big"); });
  if (!reduce) {
    (function loop() {
      x += (mx - x) * 0.18; y += (my - y) * 0.18;
      dot.style.left = x + "px"; dot.style.top = y + "px";
      requestAnimationFrame(loop);
    })();
  }
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initCursorDot();
  $("#year").textContent = new Date().getFullYear();
  const addr = $(".addr-icon");
  if (addr) addr.innerHTML = IC.pin;
  applyStaticLang();
  renderDynamic();
  applyConfig();
});
