import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import { SITE } from '../data/site';

export default function Contact() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-title">Contact &amp; Directions</h1>
          <p className="page-sub">Visit us on Main Road, Umerkote — or call and we'll help you over the phone.</p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-card-label">Call / WhatsApp</div>
            <a className="contact-phone" href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a>
            <div className="contact-sub">Sales, service &amp; finance enquiries</div>
          </div>
          <div className="contact-card">
            <div className="contact-card-label">Showroom Address</div>
            <div className="contact-address">
              {SITE.name}
              <br />
              {SITE.addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < SITE.addressLines.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-label">Opening Hours</div>
            <div>
              {SITE.hours.map((h) => (
                <div className="contact-hours-row" key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="contact-media-col">
          <div className="contact-media grayscale">
            <ImageSlot id="contact-map" placeholder="Drop a map screenshot or showroom photo" />
          </div>
          <div className="contact-cta">
            <div className="contact-cta-title">Prefer we call you?</div>
            <div className="contact-cta-sub">Leave your details on the booking page and our team will get in touch.</div>
            <Link to="/booking" className="btn btn-on-dark btn-sm">Request a Call Back</Link>
          </div>
        </div>
      </div>
    </>
  );
}
