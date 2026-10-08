import { Link, Navigate, useParams } from 'react-router-dom';
import BikeArt from '../components/BikeArt';
import ImageSlot from '../components/ImageSlot';
import { SITE } from '../data/site';
import { getModelBySlug } from '../data/models';

export default function ModelDetail() {
  const { slug } = useParams();
  const model = getModelBySlug(slug);
  if (!model) return <Navigate to="/models" replace />;
  const d = model.detail;

  return (
    <>
      <div className="hero">
        <div className="detail-hero-inner">
          <div>
            <Link to="/models" className="back-link">← All models</Link>
            <h1 className="detail-title">{d.title}</h1>
            <div className="detail-price">From {model.price} ex-showroom</div>
            <p className="detail-desc">{d.desc}</p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">Book a test ride</Link>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline">Call for on-road price</a>
            </div>
          </div>
          <div className="detail-media grayscale">
            <ImageSlot id={d.heroSlot} placeholder={d.heroPlaceholder} fallback={<BikeArt {...model.art} />} />
          </div>
        </div>
      </div>
      <hr className="hr" />

      <section className="section">
        <h2 className="section-title-sm">Specifications</h2>
        <div className="spec-grid">
          {d.specs.map((sp) => (
            <div className="spec-card" key={sp.k}>
              <div className="spec-k">{sp.k}</div>
              <div className="spec-v">{sp.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="section">
          <h2 className="section-title-sm">Variants</h2>
          <div className="variants-grid">
            {d.variants.map((v) => (
              <div className="variant-card" key={v.name}>
                <div className="variant-media grayscale">
                  <ImageSlot id={v.slot} placeholder={v.placeholder} fallback={<BikeArt {...v.art} label={v.name} />} />
                </div>
                <div className="variant-body">
                  <div className="variant-name">{v.name}</div>
                  <div className="variant-price">{v.price}</div>
                  <div className="variant-desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="variants-note">
            *Approximate ex-showroom prices. Call {SITE.phoneFormatted} for the on-road price in Umerkote.
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title-sm">Good to know</h2>
        <ul className="notes">
          {d.highlights.map((h) => (
            <li key={h.title}>
              <strong>{h.title}.</strong> {h.desc}
            </li>
          ))}
        </ul>
      </section>

      <div className="cta-wrap">
        <div className="cta-strip">
          <div>
            <div className="cta-strip-title">{d.ctaTitle}</div>
            <div className="cta-strip-sub">We have test bikes at the showroom. Book a slot, or just call first.</div>
          </div>
          <div className="cta-actions">
            <Link to="/booking" className="btn btn-primary btn-sm">Book a test ride</Link>
            <a href={`tel:${SITE.phone}`} className="btn btn-outline btn-sm">Call {SITE.phoneFormatted}</a>
          </div>
        </div>
      </div>
    </>
  );
}
