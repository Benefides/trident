// Company details used across the site. Update here and every page follows.
export const SITE = {
  name: 'Trident Exim LLC',
  tagline: 'Connecting World with Foods',
  phoneDisplay: '+1 (847) 420-7665',
  phoneHref: 'tel:+18474207665',
  whatsappNumber: '18474207665',
  whatsappGreeting: 'Hello Trident Exim, I would like to know more about your products.',
  email: '', // TODO: add the client's email address, e.g. sales@tridentexim.com
  addressLines: ['900 E Business Center Dr, Ste B', 'Mt Prospect, IL 60056, USA'],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=900+E+Business+Center+Dr+Ste+B+Mt+Prospect+IL+60056',
  mapEmbedUrl:
    'https://www.google.com/maps?q=900+E+Business+Center+Dr+Ste+B+Mt+Prospect+IL+60056&output=embed',
  hours: '', // TODO: add business hours, e.g. "Mon–Fri · 9:00 AM – 5:00 PM"
  brochureUrl: '', // TODO: link to the brochure PDF once available
};

export const whatsappLink = () =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappGreeting)}`;

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/categories', label: 'Categories' },
  { to: '/vendor-partners', label: 'Vendor Partners' },
  { to: '/contact', label: 'Contact Us' },
];
