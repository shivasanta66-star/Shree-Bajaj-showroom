import { Link } from 'react-router-dom';
import BikeArt from '../components/BikeArt';
import ImageSlot from '../components/ImageSlot';
import { MODELS } from '../data/models';
import { SITE } from '../data/site';

export default function Models() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Models and prices</h1>
          <p className="page-sub">
            Prices are approximate ex-showroom. For the on-road price, call{' '}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a>.
          </p>
        </div>
      </div>

      <div className="model-rows">
        {MODELS.map((m) => (
          <div className="model-row" key={m.slug}>
            <div className="model-row-media grayscale">
              <ImageSlot id={m.rowSlot} placeholder={m.placeholder} fallback={<BikeArt {...m.art} />} />
            </div>
            <div className="model-row-body">
              <div className="model-row-head">
                <div>
                  <div className="model-row-name">{m.name}</div>
                  <div className="model-row-tag">{m.listTag}</div>
                </div>
                <div>
                  <div className="model-row-price-label">From</div>
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
                <Link to={m.route} className="btn btn-primary btn-sm">Details and variants</Link>
                <Link to="/booking" className="btn btn-outline btn-sm">Book a test ride</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
