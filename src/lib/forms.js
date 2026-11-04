/*
  Form submission. Set VITE_FORM_ENDPOINT in a .env file to any endpoint that accepts
  a JSON POST (e.g. Formspree, Getform, Web3Forms or your own API).
  Without it, submissions are only logged to the console so the UI can be tested.
*/
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export async function submitForm(formName, data) {
  if (!ENDPOINT) {
    console.info(`[${formName}] no VITE_FORM_ENDPOINT set — submission not sent`, data);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form: formName, ...data }),
  });
  if (!res.ok) throw new Error(`Submission failed (${res.status})`);
  return { ok: true };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** rules: { field: 'required' | 'email' | 'phone' } */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, rule]) => {
    const v = String(values[field] ?? '').trim();
    if (!v) errors[field] = 'This field is required.';
    else if (rule === 'email' && !EMAIL_RE.test(v)) errors[field] = 'Please enter a valid email address.';
    else if (rule === 'phone' && v.replace(/\D/g, '').length < 7) errors[field] = 'Please enter a valid phone number.';
  });
  return errors;
}
