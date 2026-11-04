import whitePuttu from '../assets/products/whiteputtu.jpg';
import brownPuttu from '../assets/products/brownputtu.jpg';
import idiyappam from '../assets/products/idiyappam.jpg';
import kozhukatta from '../assets/products/kozhukatta.jpg';
import kumbilappam from '../assets/products/kumbilappam.jpg';
import porotta from '../assets/products/porotta.jpg';
import coconut from '../assets/products/coconut.jpg';

export const IMAGES = { whitePuttu, brownPuttu, idiyappam, kozhukatta, kumbilappam, porotta, coconut };

export const PRODUCTS = [
  { id: 'malabar-porotta', name: 'Malabar Porotta', category: 'Breads', desc: 'Family pack · 12 hand-made pieces', weight: '908 g', image: porotta },
  { id: 'white-puttu', name: 'White Puttu', category: 'Frozen Breakfast', desc: 'Steamed rice cake · Heat & eat', weight: '350 g', image: whitePuttu },
  { id: 'brown-puttu', name: 'Brown Puttu', category: 'Frozen Breakfast', desc: 'Steamed rice cake · Heat & eat', weight: '350 g', image: brownPuttu },
  { id: 'brown-idiyappam', name: 'Brown Idiyappam', category: 'Frozen Breakfast', desc: 'Steamed rice noodle · Heat & eat', weight: '400 g', image: idiyappam },
  { id: 'kozhukatta', name: 'Kozhukatta', category: 'Snacks & Sweets', desc: 'Sweet rice dumplings · Heat & eat', weight: '400 g', image: kozhukatta },
  { id: 'kumbilappam', name: 'Kumbilappam', category: 'Snacks & Sweets', desc: 'Jackfruit dumplings · Heat & eat', weight: '400 g', image: kumbilappam },
  { id: 'grated-coconut', name: 'Grated Coconut', category: 'Essentials', desc: 'Hand grated · Frozen fresh', weight: '454 g', image: coconut },
];

export const PRODUCT_FILTERS = ['All', 'Frozen Breakfast', 'Snacks & Sweets', 'Breads', 'Essentials'];

export const MORE_CATEGORIES = [
  { title: 'Spices & Masalas', text: 'Powders, blends and whole spices for home kitchens and restaurants.', brands: 'Eastern, [ADD BRANDS]', color: 'red', icon: 'flame' },
  { title: 'Rice & Grains', text: 'Kerala rice varieties, flours and grains for everyday cooking.', brands: 'Triveni Grains, [ADD BRANDS]', color: 'green', icon: 'grain' },
  { title: 'Snacks & Chips', text: 'Banana chips, mixtures and teatime snacks from Kerala.', brands: '[ADD BRANDS]', color: 'blue', icon: 'bag' },
  { title: 'Pickles & Condiments', text: 'Traditional pickles, chutneys and ready mixes.', brands: '[ADD BRANDS]', color: 'ink', icon: 'jar' },
  { title: 'Coconut & Oils', text: 'Coconut products and cooking oils, the base of Kerala cuisine.', brands: 'Tasty Eats, [ADD BRANDS]', color: 'red', icon: 'coconut' },
  { title: 'Ayurveda & Wellness', text: 'Traditional Ayurvedic preparations and wellness products.', brands: 'Kalan Ayurveda, KPN Ayurvedics', color: 'green', icon: 'leaf' },
];
