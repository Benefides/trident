import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import Field from '../components/Field.jsx';
import Icon from '../components/Icon.jsx';
import { Button, Eyebrow, IconChip } from '../components/ui.jsx';
import { PageBanner } from '../components/sections.jsx';
import { SITE } from '../data/site.js';
import { IMAGES } from '../data/products.js';
import { submitForm, validate } from '../lib/forms.js';
import usePageTitle from '../hooks/usePageTitle.js';

const TOPICS = ['Product enquiry', 'Pricing & orders', 'Become a vendor partner', 'Other'];
const EMPTY = { name: '', company: '', email: '', topic: TOPICS[0], message: '' };
const RULES = { name: 'required', email: 'email', message: 'required' };

export default function Contact() {
  usePageTitle('Contact Us');
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, RULES);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setStatus('sending');
    try {
      await submitForm('contact', values);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const cards = [
    { icon: 'phone', color: 'red', label: 'Call us', value: SITE.phoneDisplay, href: SITE.phoneHref },
    SITE.email
      ? { icon: 'mail', color: 'green', label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` }
      : { icon: 'whatsapp', color: 'green', label: 'WhatsApp', value: 'Message our team', href: `https://wa.me/${SITE.whatsappNumber}`, external: true },
    { icon: 'pin', color: 'blue', label: 'Visit us', value: SITE.addressLines.join(', '), href: SITE.mapsUrl, external: true },
    { icon: 'clock', color: 'ink', label: 'Business hours', value: SITE.hours || '[DAYS · HOURS]', dark: true },
  ];

  return (
    <>
      <PageBanner
        title="Get in Touch"
        crumb="Contact Us"
        text="Questions about products, pricing or partnerships? Our team is here to help."
        image={IMAGES.porotta}
        bars={['var(--sky)', 'var(--green)']}
      />

      <div className="container">
        <section className="contact-cards" aria-label="Contact details">
          {cards.map((c, i) => {
            const inner = (
              <div>
                <IconChip name={c.icon} color={c.dark ? 'red' : c.color} size={22} />
                <span className="contact-card__label">{c.label}</span>
                <span className="contact-card__value">{c.value}</span>
              </div>
            );
            const cls = `contact-card para para--soft lift${c.dark ? ' contact-card--dark' : ''}`;
            return (
              <Reveal key={c.label} delay={i * 100}>
                {c.href ? (
                  <a className={cls} href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </section>
      </div>

      <section className="section" style={{ paddingTop: 96, paddingBottom: 120 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'stretch' }}>
          <Reveal dir="left" className="stack" style={{ flex: '1.2 1 460px', minWidth: 0, gap: 24, alignItems: 'stretch' }}>
            <div className="stack" style={{ gap: 14 }}>
              <Eyebrow color="red">Send a Message</Eyebrow>
              <h2 className="h-section" style={{ fontSize: 'clamp(38px, 4vw, 54px)' }}>We'd love to hear from you</h2>
            </div>
            {status === 'sent' ? (
              <div role="status" className="stack" style={{ padding: 40, background: 'var(--paper)', gap: 14 }}>
                <h3 className="h-section" style={{ fontSize: 32 }}>Message sent</h3>
                <p className="body-muted" style={{ fontSize: 17 }}>Thanks for reaching out. We'll reply to your email shortly.</p>
                <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Send another</Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="stack" style={{ gap: 18, alignItems: 'stretch' }}>
                <div className="form__grid">
                  <Field id="name" label="Your name" required autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
                  <Field id="company" label="Company" autoComplete="organization" value={values.company} onChange={set('company')} />
                  <Field id="email" label="Email" type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
                  <Field id="topic" label="Topic" as="select" value={values.topic} onChange={set('topic')}>
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </Field>
                </div>
                <Field id="message" label="Message" as="textarea" rows={6} required value={values.message} onChange={set('message')} error={errors.message} />
                {status === 'error' && (
                  <p className="field__error" role="alert">Something went wrong sending your message. Please try again or call us.</p>
                )}
                <div>
                  <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                    <span>
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                      <Icon name="arrowRight" size={18} strokeWidth={2.4} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal dir="right" style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="map-frame" style={{ flexGrow: 1 }}>
              <iframe title="Map showing Trident Exim's location in Mount Prospect, Illinois" src={SITE.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <Button href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" variant="dark" icon="arrowRight" size="sm" style={{ alignSelf: 'flex-start', marginLeft: 12 }}>
              Get Directions
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
