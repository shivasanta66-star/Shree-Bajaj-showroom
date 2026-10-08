import { Link } from 'react-router-dom';
import { SITE, OFFERS } from '../data/site';

export default function Offers() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Offers</h1>
          <p className="page-sub">
            Running this month at the Umerkote showroom. Terms apply, so call{' '}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a> before you come in.
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
        <div className="cta-strip">
          <div>
            <div className="cta-strip-title">What will it cost you on the road?</div>
            <div className="cta-strip-sub">Tell us the bike and we'll work out the price with the offers taken off.</div>
          </div>
          <div className="cta-actions">
            <Link to="/booking" className="btn btn-primary btn-sm">Send a request</Link>
            <a href={`tel:${SITE.phone}`} className="btn btn-outline btn-sm">Call {SITE.phoneFormatted}</a>
          </div>
        </div>
      </div>
    </>
  );
}
