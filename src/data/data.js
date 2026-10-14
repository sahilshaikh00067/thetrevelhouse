import RAWPK from "./packages.json";

export const BRAND = "The Travel House";
export const PHONE = "9580066593";
export const PHONE_INTL = "919580066593";
export const EMAIL = "thetravelh533@gmail.com";
export const ADDRESS = "Baragaon, Babatpur Airport Road, Varanasi, Uttar Pradesh, India";
export const HOURS = "Mon – Sat : 9:00 AM – 8:00 PM";

export const CDN = "https://catalog.wlimg.com";
export const PK = "https://ttw.wlimg.com/package-images/photo-small/dir_32/948530/";
export const ST = "https://static.tourtravelworld.com/images/pkg_catg_images/";

export const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const unslug = (s = "") => s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
export const waLink = (msg) => `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`;
export const inr = (n) => (n > 0 ? "₹" + Number(n).toLocaleString("en-IN") : "On Request");

/* ------------------------------ HERO SLIDES ------------------------------ */
export const HERO = [
  { img: `${CDN}/4/948530/other-images/564045.jpg`, tag: "Explore India & The World", title: ["Journeys", "Crafted For You"], sub: "Premium tour packages, car & coach rental, flights, visas and more — handled end-to-end from Varanasi.", cta: ["Explore Packages", "/tour-packages"] },
  { img: `${CDN}/4/948530/other-images/564046.jpg`, tag: "Beaches & Islands", title: ["Escape To", "Paradise"], sub: "Goa, Andaman, Bali & Dubai holidays at unbeatable prices with handpicked stays.", cta: ["See Beach Tours", "/tours/theme/beaches-and-islands-tours"] },
  { img: `${CDN}/4/948530/other-images/564047.jpg`, tag: "Culture & Heritage", title: ["Discover", "Timeless Wonders"], sub: "Pilgrimage, heritage and spiritual tours guided by passionate local experts.", cta: ["Pilgrimage Tours", "/tours/theme/religious-and-pilgrimage-tours"] },
  { img: `${CDN}/4/948530/other-images/564048.jpg`, tag: "Hills & Valleys", title: ["Mountains", "Are Calling"], sub: "Himachal, Kashmir, Sikkim & Bhutan — handpicked itineraries for every season.", cta: ["Hill Stations", "/tours/theme/hill-stations-and-valleys-tours"] },
  { img: `${CDN}/4/948530/other-images/563484.jpg`, tag: "Honeymoon & Romantic", title: ["Your Story,", "Beautifully Begun"], sub: "Romantic getaways with private transfers, candle-light dinners and premium stays.", cta: ["Honeymoon Packages", "/tour-packages?q=honeymoon"] },
];

/* ------------------------------ SEARCH OPTIONS ------------------------------ */
export const STATES = {
  "Andaman & Nicobar": ["Havelock", "Neil Island", "Port Blair", "South Andaman"],
  Assam: ["Guwahati", "Kaziranga"],
  Azerbaijan: ["Baku", "Ganja", "Qabala"],
  Bhutan: ["Paro", "Phuentsholing", "Punakha", "Thimphu"],
  Goa: ["Goa City", "South Goa"],
  Gujarat: ["Ahmedabad", "Bhuj", "Dwarka", "Jamnagar", "Junagadh", "Rajkot", "Somnath"],
  "Himachal Pradesh": ["Dalhousie", "Dharamshala", "Kullu", "Manali", "Shimla"],
  Indonesia: ["Bali"],
  "Jammu & Kashmir": ["Gulmarg", "Pahalgam", "Srinagar"],
  Kerala: ["Alleppey", "Kochi", "Kovalam", "Munnar", "Thekkady", "Trivandrum"],
  Meghalaya: ["Cherrapunji", "Dawki", "Shillong"],
  Sikkim: ["Gangtok"],
  UAE: ["Abu Dhabi", "Dubai"],
  "West Bengal": ["Darjeeling", "Mirik"],
};
export const BUDGETS = [
  { l: "Below ₹5,000", min: 1, max: 4999 },
  { l: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { l: "₹10,001 – ₹15,000", min: 10001, max: 15000 },
  { l: "₹15,001 – ₹25,000", min: 15001, max: 25000 },
  { l: "Above ₹25,000", min: 25001, max: 9999999 },
];
export const NIGHTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* ------------------------------ PACKAGES ------------------------------ */
const REGIONS = [
  ["Andaman", /andaman/i],
  ["Dubai", /dubai/i],
  ["Bhutan", /bhutan/i],
  ["Bali", /bali/i],
  ["Baku", /baku/i],
  ["Kerala", /kerala/i],
  ["Kashmir", /kashmir/i],
  ["Himachal", /himachal|manali|dalhousie/i],
  ["North East", /meghalaya|assam|dooars|east himalayan|queen of the hills/i],
  ["Gujarat", /dwarka|somnath|bhuj|jamnagar|\bgir\b/i],
  ["Goa", /goa|suncity|jw heritage|goldens|silver shell|lambana|lillywoods|lagoa|spazio|sairaj|peninsula|flora residency|amani|ws beach|camelot|tranquil|candolim|village royale/i],
];
export const REGION_NAMES = REGIONS.map((r) => r[0]);
const regionOf = (s) => (REGIONS.find(([, re]) => re.test(s)) || ["India"])[0];
const INTL = ["Dubai", "Bhutan", "Bali", "Baku"];
const cleanName = (t) => {
  let m = t.match(/^(\d+)\s*Days?\s*(\d+)\s*Nights?\s*(.*)$/i);
  if (m) return `${m[3]} (${m[2]}N/${m[1]}D)`.trim();
  m = t.match(/^(\d+)\s*Nights?\s*(\d+)\s*Days?\s*Package for (.*)$/i);
  if (m) return `${m[3]} Package (${m[1]}N/${m[2]}D)`;
  return t
    .replace(/\s*\d+\s*Nights?\s*[-|]\s*\d+\s*Days?\s*(Tour)?\s*$/i, "")
    .replace(/\s*\d+N\s*-?\s*\d+D\s*(Tour)?\s*$/i, "")
    .trim() || t;
};

export const PACKAGES = RAWPK.map(([title, dur, price, dest, acts, themes, img], i) => {
  const nights = parseInt(dur) || 3;
  const region = regionOf(title + " " + dest);
  const stops = dest.split(",").map((x) => x.trim()).filter(Boolean);
  return {
    id: i,
    title,
    name: cleanName(title),
    slug: slugify(title),
    dur,
    nights,
    days: nights + 1,
    price,
    dest,
    stops,
    acts: acts.split(",").map((x) => x.trim()).filter(Boolean),
    themes: themes.split(",").map((x) => x.trim()).filter(Boolean),
    img: img ? PK + img : `${CDN}/4/948530/other-images/564045.jpg`,
    region,
    intl: INTL.includes(region),
    popular: i % 5 === 0 || (price > 0 && price < 7000),
  };
});
export const pkgBySlug = (s) => PACKAGES.find((p) => p.slug === s);

export const INCLUSIONS = [
  "Accommodation in handpicked hotels / resorts",
  "Daily breakfast & selected meals as per plan",
  "Private AC vehicle for all transfers & sightseeing",
  "Airport / railway station pickup & drop",
  "All toll, parking, fuel & driver allowances",
  "24x7 on-trip assistance from our team",
];
export const EXCLUSIONS = [
  "Airfare / train fare to the destination",
  "Personal expenses, tips & laundry",
  "Entry tickets & optional activities",
  "Travel insurance",
  "Anything not mentioned in inclusions",
];
export const POLICIES = [
  ["Booking", "A small advance confirms your booking. The balance is payable before departure via UPI / bank transfer / cash."],
  ["Cancellation", "Charges depend on hotel & airline policy at the time of cancellation. We always share exact terms before you confirm."],
  ["Customisation", "Hotel category, nights, sightseeing, meals and vehicle can all be modified to match your budget and style."],
  ["Documents", "Carry a valid government photo ID for all travellers. International trips need a passport valid for 6+ months."],
];

/* ------------------------------ SERVICES ------------------------------ */
export const SERVICES = [
  {
    t: "Tour Operators", img: "tour-operators5.jpg", icon: "globe", d: `${BRAND} is a leading tour operator in Uttar Pradesh combining tour and travel with a personal touch.`,
    long: `${BRAND} designs complete holiday experiences — from the first call to the last drop. Whether you dream of Goa beaches, Himalayan valleys, a spiritual yatra or an international escape, our team builds a tailor-made itinerary around your dates, budget and style.`,
    features: ["Customised itineraries", "Domestic & international tours", "Group, family & honeymoon packages", "Local guides & private transfers", "Transparent pricing"]
  },
  {
    t: "Car & Coach Rental", img: "car-coach-rental5.jpg", icon: "car", d: "Hire the best car & coach rental services for comfortable rides across India with verified drivers.",
    long: "Travel in comfort with our clean, well-maintained fleet of sedans, SUVs, Tempo Travellers and luxury coaches — all with experienced, verified drivers. Perfect for airport transfers, outstation trips, weddings and group tours.",
    features: ["Sedan, SUV, Innova & Tempo Traveller", "AC coaches for large groups", "Airport & railway transfers", "Local, outstation & multi-day hire", "Verified, courteous drivers"]
  },
  {
    t: "Flight Booking", img: "flight-booking2.jpg", icon: "plane", d: "Best fares, instant support and hassle-free domestic & international flight reservations.",
    long: "Skip the confusion of fluctuating fares. We compare airlines, timings and baggage rules to find you the best-value ticket — domestic or international — and handle changes, cancellations and refunds for you.",
    features: ["Domestic & international tickets", "Best fare comparison", "Group & corporate bookings", "Easy changes & refunds", "Instant e-ticket on WhatsApp"]
  },
  {
    t: "Passport & Visa Services", img: "passport-visa-services5.jpg", icon: "id", d: "New or renewal passport and visa support without waiting in long queues.",
    long: "From fresh passport applications and renewals to tourist, business and e-visas for popular countries — we guide you through documentation, appointments and follow-ups so you never miss a step.",
    features: ["New & renewal passport support", "Tourist, business & e-visa", "Document checklist & verification", "Appointment scheduling", "Fast-track assistance"]
  },
  {
    t: "Travel Insurance Services", img: "travel-insurance-services5.jpg", icon: "shield", d: "Insurance plans that cover the costs and losses of unforeseen situations while travelling.",
    long: "Medical emergencies, lost baggage, flight delays or trip cancellations can ruin a holiday. Our travel insurance plans keep you protected, so you can focus on enjoying the journey.",
    features: ["Medical & hospitalisation cover", "Baggage loss & delay cover", "Trip cancellation protection", "Domestic & international plans", "Quick claim assistance"]
  },
  {
    t: "Event Management", img: "event-management2.jpg", icon: "star", d: "Creative thinking, precise planning and meticulous detail for exceptional events.",
    long: "Destination weddings, corporate offsites, family reunions and celebrations — we plan and execute every detail including venue, travel, stay, décor and entertainment for a flawless event.",
    features: ["Destination weddings", "Corporate trips & MICE", "Family & social events", "Venue, stay & transport", "On-ground event team"]
  },
  {
    t: "Hotel Booking", img: "hotel-booking4.jpg", icon: "bed", d: "Excellent hotel booking with specialists who make selection easy and affordable.",
    long: "From budget stays to five-star resorts, we book hotels that match your comfort and wallet at negotiated rates — with verified reviews and hassle-free cancellations.",
    features: ["Budget to luxury stays", "Negotiated corporate rates", "Verified properties", "Free cancellation options", "Group & bulk bookings"]
  },
].map((s) => ({ ...s, slug: slugify(s.t), pic: `${CDN}/4/948530/other-images/${s.img}` }));

export const FLEET = [
  { n: "Sedan", ex: "Swift Dzire / Etios", seats: "4 + 1", bag: "2 bags", rate: "From ₹11/km", icon: "car" },
  { n: "SUV", ex: "Ertiga / XUV", seats: "6 + 1", bag: "3 bags", rate: "From ₹14/km", icon: "car" },
  { n: "Innova Crysta", ex: "Premium MUV", seats: "6 + 1", bag: "4 bags", rate: "From ₹18/km", icon: "car" },
  { n: "Tempo Traveller", ex: "12 / 17 Seater", seats: "12 – 17", bag: "6+ bags", rate: "From ₹24/km", icon: "users" },
  { n: "Luxury Coach", ex: "Volvo / AC Bus", seats: "35 – 50", bag: "Large boot", rate: "On request", icon: "users" },
];

/* ------------------------------ TILES / CATEGORIES ------------------------------ */
const P = (id) => PK + id;
export const DESTS = [
  { t: "Goa Tours", k: "Goa", img: P("471375.jpeg"), n: "Beaches • Nightlife" },
  { t: "Andaman Tours", k: "Andaman", img: P("469895.jpeg"), n: "Islands • Scuba" },
  { t: "Dubai Tours", k: "Dubai", img: P("470876.jpeg"), n: "Skyline • Desert" },
  { t: "Bhutan Tours", k: "Bhutan", img: P("470519.jpg"), n: "Monasteries • Peaks" },
  { t: "Bali Tours", k: "Bali", img: P("469983.jpeg"), n: "Temples • Honeymoon" },
  { t: "Kashmir Tours", k: "Kashmir", img: P("471543.jpg"), n: "Valleys • Houseboats" },
  { t: "Himachal Tours", k: "Himachal", img: P("471540.jpeg"), n: "Manali • Shimla" },
  { t: "Kerala Tours", k: "Kerala", img: P("474052.jpg"), n: "Backwaters • Munnar" },
  { t: "Gujarat Tours", k: "Dwarka", img: P("471388.jpg"), n: "Dwarka • Somnath • Gir" },
  { t: "Baku Tours", k: "Baku", img: P("469919.jpeg"), n: "Azerbaijan • Flame Towers" },
  { t: "Meghalaya Tours", k: "Meghalaya", img: P("469900.jpg"), n: "Shillong • Dawki" },
  { t: "Darjeeling Tours", k: "Himalayan", img: P("470520.jpeg"), n: "Tea gardens • Toy train" },
];
export const ACTIVITIES = [
  { t: "Sightseeing Tours", k: "Sightseeing", img: `${CDN}/4/948530/other-images/cat-img-6236.jpg` },
  { t: "Beaches Sightseeing Tours", k: "Beaches", img: ST + "beaches-sightseeing.jpg" },
  { t: "Museums Tours", k: "Museums", img: `${CDN}/4/948530/other-images/cat-img-6237.jpg` },
  { t: "Boat Cruise Tours", k: "Boat Cruise", img: ST + "boat_cruise.jpg" },
  { t: "Cable Car Tours", k: "Cable Car", img: `${CDN}/4/948530/other-images/cat-img-6238.jpg` },
  { t: "Desert Safari Tours", k: "Desert", img: ST + "deserts.jpg" },
  { t: "Jungle Safari Tours", k: "Jungle Safari", img: ST + "safari.jpg" },
  { t: "Boat Safari Tours", k: "Boat Safari", img: ST + "boat_safari.jpg" },
  { t: "House Boat Tours", k: "House Boat", img: P("471543.jpg") },
  { t: "Trekking Tours", k: "Trekking", img: P("471540.jpeg") },
];
export const THEMES = [
  { t: "Beaches and Islands Tours", k: "Beaches and Islands", img: ST + "beach_and_islands.jpg" },
  { t: "Culture & Heritage Tours", k: "Culture & Heritage", img: ST + "heritage.jpg" },
  { t: "Religious & Pilgrimage Tours", k: "Religious & Pilgrimage", img: ST + "religious_pilgrimage.jpg" },
  { t: "Hill Stations & Valleys Tours", k: "Hill Stations & Valleys", img: ST + "hill_station.jpg" },
  { t: "Monuments & Historical Places Tours", k: "Monuments", img: `${CDN}/4/948530/other-images/theme-img-6242.jpg` },
  { t: "Architecture & Gardens Tours", k: "Architecture & Gardens", img: `${CDN}/4/948530/other-images/theme-img-6243.jpg` },
  { t: "Wildlife Tours", k: "Wildlife", img: `${CDN}/4/948530/other-images/theme-img-6244.jpeg` },
  { t: "Safari Tours", k: "Safari", img: ST + "safari.jpg" },
].map((x) => x);
export const CATEGORIES = {
  destination: { title: "Tours by Destination", items: DESTS },
  theme: { title: "Tours by Theme", items: THEMES },
  activity: { title: "Tours by Activity", items: ACTIVITIES },
};
CATEGORIES.destination.items.forEach((x) => (x.slug = slugify(x.t)));
CATEGORIES.theme.items.forEach((x) => (x.slug = slugify(x.t)));
CATEGORIES.activity.items.forEach((x) => (x.slug = slugify(x.t)));

export const GALLERY = [
  ...DESTS.map((d) => ({ src: d.img, t: d.t, c: "Destinations" })),
  ...PACKAGES.filter((_, i) => i % 3 === 1).slice(0, 14).map((p) => ({ src: p.img, t: p.name, c: p.intl ? "International" : "India" })),
];

/* ------------------------------ SOCIAL PROOF ------------------------------ */
export const REVIEWS = [
  { n: "Sumi Jaiswal", loc: "Varanasi", r: 5, t: "I was reaching out to hundreds of travel agents in the past one year to get exclusive travel deals. I came in contact with this team and the experience was wonderful — great prices and flawless planning." },
  { n: "Maddi Pawan Kumar", loc: "Lucknow", r: 5, t: "I was in search of a reliable travel agent providing different types of tour packages. On the recommendation of a friend I booked, and everything from hotels to cabs was perfectly arranged." },
  { n: "Happy Traveller", loc: "Prayagraj", r: 5, t: "Being a travel enthusiast, I was searching for a travel agency that can provide exciting travel packages across exotic locations. They exceeded every expectation. Highly recommended!" },
  { n: "Ankit Srivastava", loc: "Gorakhpur", r: 5, t: "Booked a family Goa trip. Hotel, transfers and sightseeing were all on time. The team was reachable on WhatsApp at every step." },
  { n: "Neha Singh", loc: "Patna", r: 4, t: "Very professional service for our Andaman honeymoon. The itinerary was well balanced and the stay was beautiful." },
  { n: "Rakesh Tiwari", loc: "Varanasi", r: 5, t: "Hired a Tempo Traveller for a 6-day pilgrimage with family. Clean vehicle, polite driver and fair pricing. Will book again." },
];

export const FAQS = [
  ["How do I book a tour package?", `Simply call or WhatsApp us on +91 ${PHONE}. Share your destination, dates and budget — we send a customised quote within minutes.`],
  ["Can packages be customised?", "Yes. Every package can be modified — hotel category, number of nights, sightseeing, meals and transport — to fit your needs."],
  ["What payment options are available?", "We accept UPI, bank transfer and cash. A small advance confirms your booking; the balance is due before departure."],
  ["Do you arrange airport / railway pickup?", "Yes. Private pickup and drop at Varanasi airport, railway stations and at your destination are included in most packages."],
  ["What is your cancellation policy?", "Cancellation charges depend on the hotel and airline policy. We always share the exact terms before you confirm."],
  ["Do you help with visa and passport?", "Yes. Our visa desk handles documentation, appointments and follow-up for popular destinations like Dubai, Bhutan, Bali and Azerbaijan."],
];

export const STEPS = [
  { t: "Tell Us Your Plan", d: "Call, WhatsApp or fill the form with destination, dates and budget.", icon: "headset" },
  { t: "Get A Custom Quote", d: "Receive a tailor-made itinerary & transparent price within minutes.", icon: "route" },
  { t: "Confirm & Relax", d: "Pay a small advance — we book hotels, vehicles, tickets and visas.", icon: "wallet" },
  { t: "Travel & Enjoy", d: "Hassle-free journey with 24x7 on-trip support from our team.", icon: "plane" },
];

export const WHY = [
  { t: "Best Price Promise", d: "Direct hotel & vehicle tie-ups mean honest, competitive pricing with zero hidden costs.", icon: "tag" },
  { t: "100% Customisable", d: "Every itinerary is flexible — change hotels, nights, sightseeing & meals freely.", icon: "route" },
  { t: "24x7 Support", d: "A real person on call and WhatsApp before, during and after your trip.", icon: "headset" },
  { t: "Verified Stays & Drivers", d: "Handpicked hotels and background-verified, courteous drivers.", icon: "shield" },
  { t: "One-Stop Travel Desk", d: "Tours, cabs, flights, visas, insurance & events — all under one roof.", icon: "globe" },
  { t: "Easy Payments", d: "UPI, bank transfer or cash with a small advance to confirm.", icon: "wallet" },
];

export const STATS = [
  { n: 5000, s: "+", l: "Happy Travellers" },
  { n: 75, s: "+", l: "Tour Packages" },
  { n: 40, s: "+", l: "Destinations" },
  { n: 10, s: "+", l: "Years Experience" },
];

export const NAV = [
  { t: "Home", to: "/" },
  { t: "About Us", to: "/about-us" },
  { t: "Our Services", to: "/services", sub: SERVICES.map((s) => ({ t: s.t, to: `/services/${s.slug}` })) },
  { t: "Tour Packages", to: "/tour-packages", mega: true },
  { t: "Gallery", to: "/gallery" },
  { t: "Testimonials", to: "/testimonials" },
  { t: "Contact Us", to: "/contact-us" },
];
