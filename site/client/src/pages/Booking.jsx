import { useMemo, useState } from 'react';
import { SITE, BOOKING_MODEL_OPTIONS } from '../data/site';

const INTEREST_RATE = 10.5; // % p.a., reducing balance — matches the Booking.dc.html default

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

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
  const [submitted, setSubmitted] = useState(null);

  const submit = () => {
    if (!name.trim() || !/^\d{10}$/.test(phone.trim())) {
      setFormError('Please enter your name and a valid 10-digit mobile number.');
      return;
    }
    setFormError('');
    setSubmitted({ name: name.trim(), model });
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
          <button className="success-btn" onClick={resetForm}>Submit another request</button>
        </div>
      ) : (
        <div className="form-fields">
          <div>
            <label className="field-label">Full Name</label>
            <input
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="field-label">Mobile Number</label>
            <input
              className="field-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button className="form-submit" onClick={submit}>Submit Request</button>
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
