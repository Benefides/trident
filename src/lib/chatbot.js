import { SITE, whatsappLink } from '../data/site.js';
import { BRANDS } from '../data/brands.js';

/*
  Simple rule-based assistant. Each reply is { text, link?: { label, to? | href? } }.
  `to` = internal route, `href` = external URL.
  To connect a real chat/AI service later, replace getReply() with an API call
  that returns the same shape (it can be made async — ChatWidget awaits it).
*/

export const QUICK_REPLIES = ['Our products', 'Brands we carry', 'Open a trade account', 'Where are you located?', 'Talk to a person'];

export const WELCOME =
  'Hi! Welcome to Trident Exim. I can help with our products, brands, trade accounts and contact details. What are you looking for?';

const importedBrands = BRANDS.filter((b) => !b.featured).map((b) => b.name);
const brandList = `${importedBrands.slice(0, -1).join(', ')} and ${importedBrands.at(-1)}`;

const RULES = [
  {
    test: /whatsapp|human|person|agent|talk|someone|staff/,
    reply: () => ({ text: 'Sure — tap below to chat with our team on WhatsApp.', link: { label: 'Chat on WhatsApp', href: whatsappLink() } }),
  },
  {
    test: /trade|account|customer|wholesale|price|pricing|order|supply|buy/,
    reply: () => ({
      text: 'We supply grocery stores, supermarkets and restaurants. Fill in our short application and our team will send you a price list.',
      link: { label: 'Open a trade account', to: '/become-a-customer' },
    }),
  },
  {
    test: /brand|eastern|double horse|brahmins|triveni|kalan|kpn|elite|pavizham|thejus|malabar|kozhikoden|kitchen/,
    reply: () => ({
      text: `We directly import and distribute ${brandList}, alongside our Tasty Eats range.`,
      link: { label: 'See all brands', to: '/vendor-partners' },
    }),
  },
  {
    test: /product|range|catalog|frozen|puttu|porotta|parotta|idiyappam|coconut|spice|rice|snack|ayurved/,
    reply: () => ({
      text: 'Our Tasty Eats frozen range includes puttu, idiyappam, kozhukatta, kumbilappam, Malabar porotta and grated coconut — plus spices, grains, snacks and Ayurvedic products from our brand partners.',
      link: { label: 'Browse categories', to: '/categories' },
    }),
  },
  {
    test: /where|locat|address|visit|direction|warehouse|office/,
    reply: () => ({ text: `We're at ${SITE.addressLines.join(', ')}.`, link: { label: 'Get directions', href: SITE.mapsUrl } }),
  },
  {
    test: /phone|call|contact|email|number|reach/,
    reply: () => ({
      text: `You can call us on ${SITE.phoneDisplay} or send a message through our contact page.`,
      link: { label: 'Contact us', to: '/contact' },
    }),
  },
  {
    test: /^(hi|hello|hey|hai)\b/,
    reply: () => ({ text: 'Hello! Ask me about our products, brands, trade accounts or where we are.' }),
  },
];

export function getReply(message) {
  const s = message.toLowerCase();
  const rule = RULES.find((r) => r.test.test(s));
  if (rule) return rule.reply();
  return {
    text: `Thanks for your message. For anything specific, our team can help on WhatsApp or by phone at ${SITE.phoneDisplay}.`,
    link: { label: 'Chat on WhatsApp', href: whatsappLink() },
  };
}
