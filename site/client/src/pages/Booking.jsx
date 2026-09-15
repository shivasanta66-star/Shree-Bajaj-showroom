import { useMemo, useState } from 'react';
import { SITE, BOOKING_MODEL_OPTIONS } from '../data/site';

const INTEREST_RATE = 10.5; // % p.a., reducing balance — matches the Booking.dc.html default

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

const encodeForm = (data) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');

const whatsappHref = ({ name, phone, model }) => {
  const lines = ['Hi Shree Bajaj Motors, I would like to book a test ride.'];
  if (name.trim()) lines.push(`Name: ${name.trim()}`);
  if (phone.trim()) lines.push(`Mobile: ${phone.trim()}`);
  lines.push(`Model: ${model}`);
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
};

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16-.35.22-.65.07a8.1 8.1 0 0 1-2.38-1.47 8.96 8.96 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.2h-.01a9.2 9.2 0 0 1-4.67-1.28l-.33-.2-3.47.9.93-3.38-.22-.35a9.15 9.15 0 0 1-1.4-4.88c0-5.06 4.13-9.18 9.2-9.18a9.13 9.13 0 0 1 9.17 9.2c0 5.05-4.12 9.17-9.2 9.17M20.5 3.49A11.07 11.07 0 0 0 12.04.5C5.9.5.92 5.48.92 11.6c0 1.96.51 3.87 1.49 5.56L.83 23l6-1.57a11.1 11.1 0 0 0 5.21 1.32h.01c6.13 0 11.11-4.98 11.12-11.1a11.04 11.04 0 0 0-3.25-7.85" />
    </svg>
  );
}

export default function Booking() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Book a Test Ride</h1>
          <p className="page-sub">
            Fill the form and we'll call you back to confirm — or estimate your monthly EMI below.
          </p>
        </div>
      </div>

      <div className="booking-grid">
        <BookingForm />
        <EmiCalculator />
      </div>
    </>
  );
}

function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState(BOOKING_MODEL_OPTIONS[0]);
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  // Posts to Netlify Forms via public/__forms.html, which declares this form
  // for the build bot. Netlify only handles this on the deployed site —
  // locally the post 404s and the WhatsApp fallback shows.
  const submit = async () => {
    if (!name.trim() || !/^\d{10}$/.test(phone.trim())) {
      setFormError('Please enter your name and a valid 10-digit mobile number.');
      return;
    }
    setFormError('');
    setSending(true);
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'booking',
          name: name.trim(),
          phone: phone.trim(),
          model,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted({ name: name.trim(), phone: phone.trim(), model });
    } catch {
      setFormError(
        `Sorry, that didn't go through. Please WhatsApp or call us on ${SITE.phoneFormatted}.`
      );
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSubmitted(null);
    setName('');
    setPhone('');
    setFormError('');
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Test Ride / Booking Request</h2>
      {submitted ? (
        <div className="success-box">
          <div className="success-title">✓ Request received!</div>
          <div className="success-body">
            Thank you, {submitted.name}. Our team will call you shortly on the number provided to
            confirm your {submitted.model} test ride.
          </div>
          <div className="success-actions">
            <a
              className="btn btn-primary btn-sm btn-whatsapp"
              href={whatsappHref(submitted)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Message us on WhatsApp
            </a>
            <button className="success-btn" onClick={resetForm}>Submit another request</button>
          </div>
        </div>
      ) : (
        <div className="form-fields">
          <div>
            <label className="field-label">Full Name</label>
            <input
              className="field-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormError('');
              }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="field-label">Mobile Number</label>
            <input
              className="field-input"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setFormError('');
              }}
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <label className="field-label">Interested Model</label>
            <select className="field-input" value={model} onChange={(e) => setModel(e.target.value)}>
              {BOOKING_MODEL_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {formError && <div className="form-error">{formError}</div>}
          <button className="form-submit" onClick={submit} disabled={sending}>
            {sending ? 'Sending…' : 'Submit Request'}
          </button>
          <div className="form-or">or</div>
          <a
            className="btn btn-outline btn-whatsapp btn-block-link"
            href={whatsappHref({ name, phone, model })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Send on WhatsApp
          </a>
          <div className="form-note">
            This is a request only — we'll confirm by phone at {SITE.phoneFormatted}.
          </div>
        </div>
      )}
    </div>
  );
}

function EmiCalculator() {
  const [price, setPrice] = useState(95000);
  const [down, setDown] = useState(15000);
  const [tenure, setTenure] = useState(24);

  const { emi, loan, interest } = useMemo(() => {
    const loanAmt = Math.max(price - down, 0);
    const r = INTEREST_RATE / 12 / 100;
    const emiAmt = loanAmt > 0
      ? (loanAmt * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1)
      : 0;
    return {
      emi: emiAmt,
      loan: loanAmt,
      interest: Math.max(emiAmt * tenure - loanAmt, 0),
    };
  }, [price, down, tenure]);

  return (
    <div className="panel">
      <h2 className="panel-title">EMI Calculator</h2>
      <div className="emi-fields">
        <div>
          <div className="emi-row-head">
            <label>Vehicle Price (on-road)</label>
            <span>{inr(price)}</span>
          </div>
          <input
            type="range" min={60000} max={200000} step={1000} value={price}
            onChange={(e) => {
              const v = +e.target.value;
              setPrice(v);
              setDown((d) => Math.min(d, v));
            }}
          />
        </div>
        <div>
          <div className="emi-row-head">
            <label>Down Payment</label>
            <span>{inr(down)}</span>
          </div>
          <input
            type="range" min={0} max={100000} step={1000} value={down}
            onChange={(e) => setDown(Math.min(+e.target.value, price))}
          />
        </div>
        <div>
          <div className="emi-row-head">
            <label>Tenure</label>
            <span>{tenure} months</span>
          </div>
          <input
            type="range" min={6} max={48} step={6} value={tenure}
            onChange={(e) => setTenure(+e.target.value)}
          />
        </div>
        <div className="emi-result">
          <div>
            <div className="emi-result-label">Monthly EMI</div>
            <div className="emi-result-value">{inr(emi)}/mo</div>
          </div>
          <div className="emi-lines">
            <div className="emi-line"><span>Loan amount</span><span>{inr(loan)}</span></div>
            <div className="emi-line"><span>Total interest</span><span>{inr(interest)}</span></div>
          </div>
        </div>
        <div className="emi-note">
          Estimate at {INTEREST_RATE}% p.a. reducing balance. Actual EMI depends on the financier's terms.
        </div>
      </div>
    </div>
  );
}
