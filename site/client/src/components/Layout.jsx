import { NavLink, Outlet } from 'react-router-dom';
import {
  SITE,
  NAV_LINKS,
  FOOTER_MOTORCYCLES,
  FOOTER_ELECTRIC,
  FOOTER_SERVICES,
  FOOTER_QUICK_LINKS,
} from '../data/site';

export default function Layout() {
  return (
    <div className="site">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-name">SHREE BAJAJ MOTORS</span>
          <span className="brand-loc">{SITE.location}</span>
        </NavLink>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/booking" className="nav-cta">
            Book a Test Ride
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="footer-col-title">{title}</div>
      <div className="footer-links">
        {links.map((l, i) => (
          <NavLink key={i} to={l.to} className="footer-link">
            {l.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner">
        <FooterCol title="Motorcycles" links={FOOTER_MOTORCYCLES} />
        <div>
          <FooterCol title="Electric Scooters" links={FOOTER_ELECTRIC} />
          <div style={{ marginTop: 28 }}>
            <FooterCol title="Services" links={FOOTER_SERVICES} />
          </div>
        </div>
        <FooterCol title="Quick Links" links={FOOTER_QUICK_LINKS} />
        <div>
          <div className="footer-col-title">Showroom</div>
          <div className="footer-brand-name">{SITE.name}</div>
          <div className="footer-address">
            {SITE.addressLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < SITE.addressLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="footer-hours">
            {SITE.hours.map((h) => (
              <div className="footer-hours-row" key={h.day}>
                <span>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-strip">
        <div className="footer-strip-inner">
          <div>
            <div className="footer-strip-label">Contact</div>
            <a className="footer-phone" href={`tel:${SITE.phone}`}>{SITE.phoneFormatted}</a>
          </div>
          <div>
            <div className="footer-strip-label">Email</div>
            <a className="footer-email" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div>
            <div className="footer-strip-label">Need Help Choosing?</div>
            <div className="footer-strip-note">Call or WhatsApp us — sales, service and finance enquiries</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div>© {SITE.name}, {SITE.location}. All Rights Reserved.</div>
          <div>Authorized Bajaj Dealership · Sales · Service · Spares</div>
        </div>
      </div>
    </div>
  );
}
