import { Button } from '../components/ui.jsx';
import { PageBanner } from '../components/sections.jsx';
import { IMAGES } from '../data/products.js';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageBanner title="Page not found" text="The page you're looking for doesn't exist or has moved." image={IMAGES.coconut} />
      <section className="section">
        <div className="container btn-row">
          <Button to="/" icon="arrowRight">Back to Home</Button>
          <Button to="/contact" variant="outline">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
