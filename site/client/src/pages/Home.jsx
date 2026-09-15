import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import { MODELS } from '../data/models';
import { WHY_US, SERVICES_OFFERED } from '../data/site';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="kicker">Authorized Bajaj Dealership</span>
            <h1 className="hero-title">Your trusted Bajaj showroom in Umerkote</h1>
            <p className="hero-desc">
              Sales, service, genuine spares and easy finance — the complete Bajaj range from
              Pulsar to Chetak EV, right here in Nabarangpur district.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">Book a Test Ride</Link>
              <Link to="/models" className="btn btn-outline">Explore Models</Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">6+</div>
                <div className="stat-label">Model lines</div>
              </div>
              <div>
                <div className="stat-num">100%</div>
                <div className="stat-label">Genuine spares</div>
              </div>
              <div>
                <div className="stat-num">Easy</div>
                <div className="stat-label">EMI finance</div>
              </div>
            </div>
          </div>
          <div className="hero-media grayscale">
            <ImageSlot id="hero-bike" placeholder="Drop a showroom / hero bike photo" />
          </div>
        </div>
      </section>
      <hr className="hr" />

      <section className="section">
        <span className="kicker">Model Range</span>
        <div className="section-head">
          <h2 className="section-title">Popular at our showroom</h2>
          <Link to="/models" className="link-arrow">View all models →</Link>
        </div>
        <div className="model-grid">
          {MODELS.map((m) => (
            <div className="model-card" key={m.slug}>
              <div className="model-card-media grayscale">
                <ImageSlot id={m.cardSlot} placeholder={m.placeholder} />
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
        <div className="why-band-inner">
          <span className="kicker">Why Us</span>
          <h2 className="section-title-sm">Everything you need, sorted</h2>
          <div className="why-grid">
            {WHY_US.map((s) => (
              <div key={s.title}>
                <div className="why-title">{s.title}</div>
                <div className="why-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="services-head">
          <span className="kicker">At Your Service</span>
          <h2>Services We Offer</h2>
          <p>Everything you need to buy, run and maintain your Bajaj, all under one roof.</p>
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
          <span className="kicker">Offers</span>
          <h2 className="section-title">Festive offers running now</h2>
          <p className="split-band-desc">
            Low down payments, exchange bonuses and special EMI schemes on select models. Visit
            the showroom or check current offers online.
          </p>
          <Link to="/offers" className="btn btn-primary">See Current Offers</Link>
        </div>
        <div className="split-media grayscale">
          <ImageSlot id="offers-banner" placeholder="Drop an offers banner image" />
        </div>
      </section>
    </>
  );
}
