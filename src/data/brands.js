import tastyEats from '../assets/logos/tastyeats.png';
import kozhikodens from '../assets/brands/kozhikodens.jpg';
import doubleHorse from '../assets/brands/doublehorse.jpg';
import pavizham from '../assets/brands/pavizham.jpg';
import kitchenTreasures from '../assets/brands/kitchentreasures.jpg';
import brahmins from '../assets/brands/brahmins.jpg';
import eastern from '../assets/brands/eastern.jpg';
import elite from '../assets/brands/elite.jpg';
import kalan from '../assets/brands/kalan.jpg';
import thejus from '../assets/brands/thejus.jpg';
import malabar from '../assets/brands/malabar.jpg';
import triveni from '../assets/brands/triveni.jpg';

// `logo: null` shows a text tile until the logo file is supplied.
export const BRANDS = [
  { name: 'Tasty Eats', logo: tastyEats, featured: true },
  { name: 'Double Horse', logo: doubleHorse },
  { name: 'Eastern', logo: eastern },
  { name: 'Elite', logo: elite },
  { name: 'Brahmins', logo: brahmins },
  { name: 'Kitchen Treasures', logo: kitchenTreasures },
  { name: 'Pavizham', logo: pavizham },
  { name: 'Thejus', logo: thejus },
  { name: 'Triveni Grains', logo: triveni },
  { name: "Kozhikoden's", logo: kozhikodens },
  { name: 'Malabar Choice', logo: malabar },
  { name: 'Kalan Ayurveda', logo: kalan },
  { name: 'KPN Ayurvedics', logo: null },
];

export const IMPORTED_BRAND_COUNT = BRANDS.filter((b) => !b.featured).length;
