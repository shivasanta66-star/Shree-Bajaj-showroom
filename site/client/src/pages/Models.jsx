import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import { MODELS } from '../data/models';
import { SITE } from '../data/site';

export default function Models() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Our Models</h1>
          <p className="page-sub">
            Ex-showroom prices indicative — call{' '}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a> for on-road quotes.
          </p>
        </div>
      </div>

      <div className="model-rows">
        {MODELS.map((m) => (
          <div className="model-row" key={m.slug}>
            <div className="model-row-media grayscale">
              <ImageSlot id={m.rowSlot} placeholder={m.placeholder} />
            </div>
            <div className="model-row-body">
              <div className="model-row-head">
                <div>
                  <div className="model-row-name">{m.name}</div>
                  <div className="model-row-tag">{m.listTag}</div>
                </div>
                <div>
                  <div className="model-row-price-label">Ex-showroom from</div>
                  <div className="model-row-price">{m.price}</div>
                </div>
              </div>
              <p className="model-row-desc">{m.listDesc}</p>
              <div className="model-specs">
                {m.listSpecs.map((sp) => (
                  <div key={sp.k}>
                    <div className="model-spec-k">{sp.k}</div>
                    <div className="model-spec-v">{sp.v}</div>
                  </div>
                ))}
              </div>
              <div className="model-row-actions">
                <Link to="/booking" className="btn btn-primary btn-sm">Book Test Ride</Link>
                <Link to="/booking" className="btn btn-outline btn-sm">Check EMI</Link>
                <Link to={m.route} className="link-arrow">Full Details →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
