// Site-wide constants. Contact details are the dealership's real ones;
// prices elsewhere are still the indicative Delhi ex-showroom figures from
// the Claude Design export, pending confirmed Umerkote rates.
export const SITE = {
  name: 'Shree Bajaj Motors',
  location: 'Umerkote',
  phone: '9937601505',
  phoneFormatted: '99376 01505',
  // wa.me needs the country code and no punctuation.
  whatsapp: '919937601505',
  email: 'shivasanta66@gmail.com',
  addressLines: ['Main Road, Umerkote', 'Dist. Nabarangpur, Odisha — 764073'],
  // What Google searches for when placing the map pin and starting
  // directions. This is an address lookup, so the pin is approximate —
  // replace it with the showroom's own Google Maps place link once the
  // business listing is confirmed.
  mapQuery: 'Shree Bajaj Motors, Main Road, Umerkote, Nabarangpur, Odisha 764073',
  hours: [
    { day: 'Mon – Sat', time: '9:00 AM – 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 2:00 PM' },
  ],
};

// Both endpoints are keyless, so the map works with no Google API account.
export const mapEmbedSrc = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;

export const mapDirectionsHref = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`;

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/models', label: 'Models' },
  { to: '/offers', label: 'Offers' },
  { to: '/contact', label: 'Contact' },
];

export const FOOTER_MOTORCYCLES = [
  { label: 'Pulsar 125', to: '/models/pulsar' },
  { label: 'Pulsar N125', to: '/models/pulsar' },
  { label: 'Pulsar NS200', to: '/models/pulsar' },
  { label: 'Platina 110', to: '/models/platina' },
  { label: 'CT 110X', to: '/models/ct110' },
  { label: 'Avenger Street 160', to: '/models/avenger' },
  { label: 'Avenger Cruise 220', to: '/models/avenger' },
  { label: 'Freedom 125 CNG', to: '/models/freedom-125' },
];

export const FOOTER_ELECTRIC = [
  { label: 'Chetak 3501', to: '/models/chetak' },
  { label: 'Chetak 3502', to: '/models/chetak' },
  { label: 'Chetak 3503', to: '/models/chetak' },
];

export const FOOTER_SERVICES = [
  { label: 'Finance and EMI', to: '/booking' },
  { label: 'Exchange your old bike', to: '/offers' },
  { label: 'Servicing', to: '/contact' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Models and prices', to: '/models' },
  { label: 'Offers', to: '/offers' },
  { label: 'Book a test ride', to: '/booking' },
  { label: 'EMI calculator', to: '/booking' },
  { label: 'Find us', to: '/contact' },
];

export const BOOKING_PURPOSE_OPTIONS = ['Test Ride', 'Booking'];

export const BOOKING_MODEL_OPTIONS = [
  'Pulsar Series',
  'Platina 100 / 110',
  'CT 110',
  'Avenger',
  'Freedom 125 CNG',
  'Chetak EV',
];

export const OFFERS = [
  {
    title: 'Low down payment',
    badge: 'Finance',
    desc: 'Take home a new Platina or CT 110 for a down payment from ₹4,999 and pay the rest monthly.',
    fine: '*Subject to financier approval and documentation.',
  },
  {
    title: 'Exchange bonus up to ₹5,000',
    badge: 'Exchange',
    desc: 'Bring in your old two-wheeler, any brand. We value it and add a bonus on top.',
    fine: '*Valuation done at showroom; bonus varies by model.',
  },
  {
    title: 'Pulsar festive cashback',
    badge: 'Limited',
    desc: 'Up to ₹3,000 back on some Pulsar variants if you book this month.',
    fine: '*On select variants, while stocks last.',
  },
  {
    title: 'Chetak charger installation',
    badge: 'Electric',
    desc: "Buy a Chetak this month and we'll help get the charger installed at your home for free.",
    fine: '*Standard installation within Umerkote town limits.',
  },
];

export const SERVICES_OFFERED = [
  { title: 'Free service camps', desc: 'Every so often we hold a free service day at the showroom for Bajaj owners.', slot: 'service-free-camps', placeholder: 'Free service camp photo' },
  { title: 'Servicing and repairs', desc: 'Regular services and repairs, done by Bajaj-trained mechanics.', slot: 'service-general-servicing', placeholder: 'Servicing photo' },
  { title: 'Genuine spares', desc: 'We only fit genuine Bajaj parts, and keep the common ones in stock.', slot: 'service-spare-parts', placeholder: 'Spare parts photo' },
  { title: 'Insurance', desc: 'New policies and renewals, done at the counter while you wait.', slot: 'service-insurance', placeholder: 'Insurance renewal photo' },
  { title: 'Accessories', desc: 'Crash guards, saddle bags, seat covers and the like, fitted here.', slot: 'service-accessories', placeholder: 'Accessories fitting photo' },
  { title: 'Chetak battery check', desc: 'Battery health check and diagnostics for Chetak owners.', slot: 'service-battery-checkup', placeholder: 'Battery check-up photo' },
  { title: 'Old bike exchange', desc: 'Bring your old bike in and we will give you a price for it against a new one.', slot: 'service-exchange-valuation', placeholder: 'Exchange valuation photo' },
];
