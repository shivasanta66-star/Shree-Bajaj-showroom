import { Link, Navigate, useParams } from 'react-router-dom';
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
            <span className="detail-kicker">{d.kicker}</span>
            <h1 className="detail-title">{d.title}</h1>
            <p className="detail-desc">{d.desc}</p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">Book a Test Ride</Link>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline">Call for Price</a>
            </div>
          </div>
          <div className="detail-media grayscale">
            <ImageSlot id={d.heroSlot} placeholder={d.heroPlaceholder} />
          </div>
        </div>
      </div>
      <hr className="hr" />

      <section className="section">
        <span className="kicker">Specifications</span>
        <h2 className="section-title-sm">Key Specifications</h2>
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
          <span className="kicker">Line-up</span>
          <h2 className="section-title-sm">Variants</h2>
          <div className="variants-grid">
            {d.variants.map((v) => (
              <div className="variant-card" key={v.name}>
                <div className="variant-media grayscale">
                  <ImageSlot id={v.slot} placeholder={v.placeholder} />
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
            *Indicative ex-showroom prices; call {SITE.phoneFormatted} for the exact on-road price in Umerkote.
          </div>
        </div>
      </section>

      <section className="section">
        <span className="kicker">Why It Works</span>
        <h2 className="section-title-sm">Why riders choose the {model.name}</h2>
        <div className="highlights-grid">
          {d.highlights.map((h) => (
            <div className="highlight-card" key={h.title}>
              <div className="highlight-title">{h.title}</div>
              <div className="highlight-desc">{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-wrap">
        <div className="cta-banner">
          <div>
            <div className="cta-banner-title">{d.ctaTitle}</div>
            <div className="cta-banner-sub">Test rides available at the Umerkote showroom — book yours today.</div>
          </div>
          <div className="cta-actions">
            <Link to="/booking" className="btn btn-on-dark btn-sm">Book Test Ride</Link>
            <a href={`tel:${SITE.phone}`} className="btn btn-outline-on-accent btn-sm">Call {SITE.phoneFormatted}</a>
          </div>
        </div>
      </div>
    </>
  );
}
