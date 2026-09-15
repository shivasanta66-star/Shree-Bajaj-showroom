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
  hours: [
    { day: 'Mon – Sat', time: '9:00 AM – 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 2:00 PM' },
  ],
};

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
  { label: 'Easy Finance & EMI', to: '/booking' },
  { label: 'Exchange Bonus', to: '/offers' },
  { label: 'Authorized Service', to: '/contact' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Models', to: '/models' },
  { label: 'Current Offers', to: '/offers' },
  { label: 'Book a Test Ride', to: '/booking' },
  { label: 'EMI Calculator', to: '/booking' },
  { label: 'Contact & Directions', to: '/contact' },
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
    title: 'Low Down Payment Scheme',
    badge: 'Finance',
    desc: 'Ride home a new Platina or CT 110 with a down payment starting at just ₹4,999. Balance on easy monthly EMI.',
    fine: '*Subject to financier approval and documentation.',
  },
  {
    title: 'Exchange Bonus up to ₹5,000',
    badge: 'Exchange',
    desc: 'Trade in your old two-wheeler of any brand and get an extra exchange bonus over the market valuation.',
    fine: '*Valuation done at showroom; bonus varies by model.',
  },
  {
    title: 'Pulsar Festive Cashback',
    badge: 'Limited',
    desc: 'Special cashback of up to ₹3,000 on select Pulsar variants booked this month.',
    fine: '*On select variants, while stocks last.',
  },
  {
    title: 'Chetak EV Charger Offer',
    badge: 'Electric',
    desc: 'Free home charger installation assistance with every Chetak EV delivery this month.',
    fine: '*Standard installation within Umerkote town limits.',
  },
];

export const WHY_US = [
  { title: 'New Vehicle Sales', desc: 'Full Bajaj range on display with on-road price quotes and quick delivery.' },
  { title: 'Authorized Service', desc: 'Trained mechanics, genuine Bajaj spares and free-service support.' },
  { title: 'Easy Finance', desc: 'Tie-ups with leading financiers — low down payment, fast approval.' },
  { title: 'Exchange & RTO', desc: 'Old-vehicle exchange valuation and complete registration assistance.' },
];

export const SERVICES_OFFERED = [
  { title: 'Free Service Camps', desc: 'Periodic free-service camps for all Bajaj owners at the showroom.', slot: 'service-free-camps', placeholder: 'Free service camp photo' },
  { title: 'Periodic & General Servicing', desc: 'Routine maintenance and repairs by trained Bajaj technicians.', slot: 'service-general-servicing', placeholder: 'Servicing photo' },
  { title: 'Genuine Spare Parts', desc: 'Only genuine Bajaj parts and accessories, always in stock.', slot: 'service-spare-parts', placeholder: 'Spare parts photo' },
  { title: 'Insurance Renewal', desc: 'On-the-spot two-wheeler insurance issue and renewal support.', slot: 'service-insurance', placeholder: 'Insurance renewal photo' },
  { title: 'Accessories Fitting', desc: 'Fitment of genuine accessories — guards, saddle bags, and more.', slot: 'service-accessories', placeholder: 'Accessories fitting photo' },
  { title: 'Battery Check-up (EV)', desc: 'Health check and diagnostics for Chetak EV batteries.', slot: 'service-battery-checkup', placeholder: 'Battery check-up photo' },
  { title: 'Exchange / Old Bike Valuation', desc: 'Fair valuation of your old bike towards a new purchase.', slot: 'service-exchange-valuation', placeholder: 'Exchange valuation photo' },
];
