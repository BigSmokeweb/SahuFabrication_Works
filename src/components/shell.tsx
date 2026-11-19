"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MapPin, Hammer } from "lucide-react";
import { business, phoneLink, whatsappLink } from "@/lib/business";
const links = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/services", "Products & Services"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact Us"],
];
export function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark">
        <Hammer size={28} />
      </span>
      <span>
        <strong>
          SAHU<span> FABRICATION WORKS</span>
        </strong>
        <small>SHUTTERS · GATES · ALUMINIUM</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="topbar">
        <div className="wrap">
          <span>Metalwork for homes, businesses & industry</span>
          <span>
            <MapPin size={13} /> {business.locality}
          </span>
        </div>
      </div>
      <header
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className="wrap nav-wrap">
          <Brand />
          <button
            className="menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="primary-navigation"
            className={open ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              className="button primary nav-cta"
              href="/contact#enquiry"
              onClick={() => setOpen(false)}
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <Brand />
          <p>
            Practical metalwork. Thoughtful fabrication.
            <br />
            Made around your requirements.
          </p>
          <span className="location">
            <MapPin size={16} />
            {business.locality}
          </span>
        </div>
        <div>
          <h2>Explore</h2>
          {links.map(([url, label]) => (
            <Link key={url} href={url}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h2>What we do</h2>
          <Link href="/services/rolling-shutters">Rolling shutters</Link>
          <Link href="/services/gates-and-doors">Gates & safety doors</Link>
          <Link href="/services/aluminium-work">Aluminium work</Link>
          <Link href="/services/sheds-and-awnings">Sheds & awnings</Link>
        </div>
        <div>
          <h2>Let’s talk fabrication.</h2>
          <p>
            Have a requirement in mind?
            <br />
            Tell us about your space.
          </p>
          <Link className="button primary" href="/contact">
            Make an Enquiry
          </Link>
          {business.verifiedPhone && (
            <>
              <a href={phoneLink(business.verifiedPhone)}>Call us</a>
              <a href={whatsappLink(business.verifiedPhone)}>WhatsApp</a>
            </>
          )}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Sahu Fabrication Works. All rights
          reserved.
        </span>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
