import { Link } from 'react-router-dom';
import { SITE, OFFERS } from '../data/site';

export default function Offers() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Current Offers</h1>
          <p className="page-sub">
            Offers valid this month at the Umerkote showroom. Terms apply — call{' '}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a> to confirm.
          </p>
        </div>
      </div>

      <div className="offers-grid">
        {OFFERS.map((o) => (
          <div className="offer-card" key={o.title}>
            <div className="offer-card-head">
              <div className="offer-title">{o.title}</div>
              <div className="offer-badge">{o.badge}</div>
            </div>
            <p className="offer-desc">{o.desc}</p>
            <div className="offer-fine">{o.fine}</div>
          </div>
        ))}
      </div>

      <div className="cta-wrap">
        <div className="cta-banner">
          <div>
            <div className="cta-banner-title">Want the exact on-road price with offers applied?</div>
            <div className="cta-banner-sub">Book a visit or call us — we'll work out your best deal on the spot.</div>
          </div>
          <div className="cta-actions">
            <Link to="/booking" className="btn btn-on-dark btn-sm">Book Now</Link>
            <a href={`tel:${SITE.phone}`} className="btn btn-outline-on-accent btn-sm">Call {SITE.phoneFormatted}</a>
          </div>
        </div>
      </div>
    </>
  );
}
