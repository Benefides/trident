import { whatsappLink } from '../data/site.js';
import Icon from './Icon.jsx';

// Fixed bottom-left. Swap the icon for WhatsApp's official logo (from their brand resources) before launch.
export default function WhatsAppButton() {
  return (
    <a className="fab fab--wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Trident Exim on WhatsApp">
      <span className="fab__icon"><Icon name="whatsapp" size={20} /></span>
      <span className="fab__text">
        <small>Message us on</small>
        <strong>WhatsApp</strong>
      </span>
    </a>
  );
}
