import { Link } from 'react-router-dom';
import BikeArt from '../components/BikeArt';
import ImageSlot from '../components/ImageSlot';
import { MODELS } from '../data/models';
import { SITE, SERVICES_OFFERED } from '../data/site';

const HERO_ART = MODELS[0].detail.variants.find((v) => v.slot === 'variant-pulsarns200').art;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1 className="hero-title">Bajaj bikes and scooters in Umerkote</h1>
            <p className="hero-desc">
              New bikes, servicing, genuine spares and finance, all at one showroom. Come in for a
              test ride, or just to have a look around.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">Book a test ride</Link>
              <Link to="/models" className="btn btn-outline">See the bikes</Link>
            </div>
            <p className="hero-call">
              Or call us on <a href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a>
            </p>
          </div>
          <div className="hero-media grayscale">
            <ImageSlot
              id="hero-bike"
              placeholder="Drop a showroom / hero bike photo"
              fallback={<BikeArt {...HERO_ART} label="Pulsar NS200" />}
            />
          </div>
        </div>
      </section>
      <hr className="hr" />

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">What we sell</h2>
          <Link to="/models" className="link-arrow">All models and prices →</Link>
        </div>
        <div className="model-grid">
          {MODELS.map((m) => (
            <div className="model-card" key={m.slug}>
              <div className="model-card-media grayscale">
                <ImageSlot id={m.cardSlot} placeholder={m.placeholder} fallback={<BikeArt {...m.art} />} />
              </div>
              <Link to={m.route} className="model-card-body">
                <div className="model-card-name">{m.name}</div>
                <div className="model-card-tag">{m.homeTag}</div>
                <div className="model-card-footer">
                  <div className="model-card-price">From {m.price}</div>
                  <div className="model-card-details">Details →</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="about-band">
          <h2 className="section-title-sm">Buying from us</h2>
          <div className="about-text">
            <p>
              We sell the whole Bajaj range, from the Platina to the Chetak, and we service what we
              sell. Genuine spares are kept in stock, so most repairs don't mean waiting for parts.
            </p>
            <p>
              If you need a loan, we'll sort out the finance paperwork with you. If you have an old
              bike, bring it along and we'll give you a price for it. Registration and RTO work is
              handled here too, so there's no running around.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">After you buy</h2>
        </div>
        <div className="services-grid">
          {SERVICES_OFFERED.map((sv) => (
            <div className="service-card" key={sv.slot}>
              <div className="service-body">
                <div className="service-title">{sv.title}</div>
                <div className="service-desc">{sv.desc}</div>
              </div>
              <div className="service-media grayscale">
                <ImageSlot id={sv.slot} placeholder={sv.placeholder} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="hr" />

      <section className="split-band">
        <div>
          <h2 className="section-title">This month's offers</h2>
          <p className="split-band-desc">
            A low down payment on commuters, an exchange bonus for your old bike, and cashback on
            some Pulsars.
          </p>
          <Link to="/offers" className="btn btn-primary">See the offers</Link>
        </div>
        <div className="split-media grayscale">
          <ImageSlot id="offers-banner" placeholder="Drop an offers banner image" />
        </div>
      </section>
    </>
  );
}
