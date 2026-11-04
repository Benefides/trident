import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import Field from '../components/Field.jsx';
import Icon from '../components/Icon.jsx';
import { Button, Eyebrow, IconChip, Stripe } from '../components/ui.jsx';
import { PageBanner } from '../components/sections.jsx';
import { IMAGES } from '../data/products.js';
import { IMPORTED_BRAND_COUNT } from '../data/brands.js';
import { submitForm, validate } from '../lib/forms.js';
import usePageTitle from '../hooks/usePageTitle.js';

const BUSINESS_TYPES = ['Grocery store', 'Supermarket', 'Restaurant / Caterer', 'Distributor', 'Other'];
const INTERESTS = ['Frozen foods', 'Spices & masalas', 'Rice & grains', 'Snacks', 'Ayurveda & wellness'];
const EMPTY = { business: '', name: '', email: '', phone: '', type: BUSINESS_TYPES[0], city: '', interests: [], message: '' };
const RULES = { business: 'required', name: 'required', email: 'email', phone: 'phone', city: 'required' };

const BENEFITS = [
  { icon: 'list', color: 'red', title: `${IMPORTED_BRAND_COUNT} brands, one order`, text: 'Frozen foods, spices, grains and more on a single invoice.' },
  { icon: 'dollar', color: 'green', title: 'Wholesale pricing', text: 'Trade prices and case quantities for registered businesses.' },
  { icon: 'calendar', color: 'blue', title: 'Scheduled deliveries', text: 'A regular delivery day so you can plan stock with confidence.' },
];

export default function BecomeCustomer() {
  usePageTitle('Become a Customer');
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const toggleInterest = (item) =>
    setValues((v) => ({ ...v, interests: v.interests.includes(item) ? v.interests.filter((x) => x !== item) : [...v.interests, item] }));

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
      await submitForm('trade-account', values);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageBanner
        title="Become a Customer"
        text="Open a trade account for your store or restaurant in a few simple steps."
        image={IMAGES.brownPuttu}
        bars={['var(--red)', 'var(--blue)']}
      />

      <section className="section" style={{ paddingTop: 96, paddingBottom: 120 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'flex-start' }}>
          <div className="stack" style={{ flex: '1 1 380px', minWidth: 0, gap: 40 }}>
            <Reveal className="stack" style={{ gap: 16 }}>
              <Eyebrow color="red">Why Buy From Us</Eyebrow>
              <h2 className="h-section" style={{ fontSize: 'clamp(38px, 4vw, 54px)' }}>One supplier for your Kerala aisle</h2>
            </Reveal>
            <div className="stack" style={{ gap: 18 }}>
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 100} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <IconChip name={b.icon} color={b.color} size={22} />
                  <div className="stack" style={{ gap: 4 }}>
                    <h3 className="h-card" style={{ fontSize: 23 }}>{b.title}</h3>
                    <p className="small-muted" style={{ fontSize: 16 }}>{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal style={{ width: '100%' }}>
              <div className="lift" style={{ padding: 32, background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 className="h-card" style={{ fontSize: 28, fontWeight: 800 }}>How it works</h3>
                {[
                  ['1', 'Apply', 'send us your business details using the form.'],
                  ['2', 'Review', 'our team contacts you within [X] business days.'],
                  ['3', 'Order', 'receive your price list and place your first order.'],
                ].map(([n, t, d]) => (
                  <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span className="num-chip para" style={{ background: 'var(--ink)', fontSize: 20, padding: '4px 14px', flex: 'none' }}><span>{n}</span></span>
                    <span style={{ fontSize: 17 }}><strong>{t}</strong> — {d}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal dir="right" style={{ flex: '1.3 1 480px', minWidth: 0 }}>
            <div className="form-card">
              <Stripe />
              {status === 'sent' ? (
                <div className="form-success" role="status">
                  <IconChip name="check" color="green" size={34} />
                  <h2 className="h-section" style={{ fontSize: 40 }}>Application received</h2>
                  <p className="body-muted" style={{ maxWidth: 460 }}>
                    Thank you. A member of our team will contact you within [X] business days with your price list.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Submit another</Button>
                </div>
              ) : (
                <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="form-h">
                  <div className="stack" style={{ gap: 6 }}>
                    <h2 id="form-h" className="h-section" style={{ fontSize: 36 }}>Trade account application</h2>
                    <p className="small-muted">Fields marked * are required.</p>
                  </div>
                  <div className="form__grid">
                    <Field id="business" label="Business name" required autoComplete="organization" value={values.business} onChange={set('business')} error={errors.business} />
                    <Field id="name" label="Contact person" required autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
                    <Field id="email" label="Email" type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
                    <Field id="phone" label="Phone" type="tel" required autoComplete="tel" value={values.phone} onChange={set('phone')} error={errors.phone} />
                    <Field id="type" label="Business type" as="select" required value={values.type} onChange={set('type')}>
                      {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </Field>
                    <Field id="city" label="City / State" required autoComplete="address-level2" value={values.city} onChange={set('city')} error={errors.city} />
                  </div>
                  <fieldset className="field">
                    <legend style={{ marginBottom: 10 }}>Interested in</legend>
                    <div className="checks">
                      {INTERESTS.map((item) => (
                        <label key={item}>
                          <input type="checkbox" checked={values.interests.includes(item)} onChange={() => toggleInterest(item)} />
                          {item}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <Field id="message" label="Anything else we should know?" as="textarea" rows={4} value={values.message} onChange={set('message')} />
                  {status === 'error' && (
                    <p className="field__error" role="alert">Something went wrong sending your application. Please try again or call us.</p>
                  )}
                  <div className="row-between" style={{ alignItems: 'center' }}>
                    <span className="small-muted" style={{ fontSize: 14, maxWidth: 300 }}>We use your details only to process this application.</span>
                    <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                      <span>
                        {status === 'sending' ? 'Sending…' : 'Submit Application'}
                        <Icon name="arrowRight" size={18} strokeWidth={2.4} />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
