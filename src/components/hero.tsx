"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Ruler,
  Wrench,
} from "lucide-react";
const slides = [
  {
    tag: "ROLLING SHUTTERS & METAL FABRICATION",
    title: (
      <>
        Strength in every detail.
        <br />
        <em>Built for your space.</em>
      </>
    ),
    text: "From rolling shutters to entrance gates, practical fabrication for the spaces you work and live in.",
    image: "/images/hero.webp",
    link: "/services/rolling-shutters",
  },
  {
    tag: "GATES & SAFETY DOORS",
    title: (
      <>
        Make an entrance.
        <br />
        <em>Made around you.</em>
      </>
    ),
    text: "Manual and motorised sliding gates, fabricated gates and safety doors for your property.",
    image: "/images/gate.svg",
    link: "/services/gates-and-doors",
  },
  {
    tag: "ALUMINIUM WINDOWS & FABRICATION",
    title: (
      <>
        A clearer outlook.
        <br />
        <em>A considered finish.</em>
      </>
    ),
    text: "Aluminium sliding windows and fabrication solutions for homes and commercial spaces.",
    image: "/images/window.svg",
    link: "/services/aluminium-work",
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const s = slides[active];
  return (
    <>
      <section
        className={"hero slide-" + active}
        aria-roledescription="carousel"
        aria-label="Featured services"
      >
        <Image
          className="hero-image"
          src={s.image}
          alt={
            active === 0
              ? "Illustrative steel rolling shutter in a workshop"
              : "Illustrative " + s.tag.toLowerCase()
          }
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="wrap hero-content" aria-live="polite">
          <p className="eyebrow">{s.tag}</p>
          <h1>{s.title}</h1>
          <p className="hero-text">{s.text}</p>
          <div className="hero-actions">
            <Link className="button red" href={s.link}>
              Explore Our Services
            </Link>
            <Link className="button outline" href="/contact">
              Discuss Your Project
            </Link>
          </div>
          <div className="hero-bottom">
            <span>
              SAHU FABRICATION WORKS <span className="hero-dot">·</span> THANE
              WEST
            </span>
            <div className="slider-controls">
              <button
                aria-label="Previous service"
                onClick={() => setActive((active + 2) % 3)}
              >
                <ChevronLeft size={18} />
              </button>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={i === active ? "slide-dot selected" : "slide-dot"}
                  aria-label={`Show service ${i + 1}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
              <button
                aria-label="Next service"
                onClick={() => setActive((active + 1) % 3)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <span className="hero-disclosure">Illustrative product visual</span>
      </section>
      <section className="trust-strip">
        <div className="wrap">
          <div>
            <ShieldCheck />
            <span>
              <strong>Purposeful protection</strong>
              <small>Shutters, gates & safety doors</small>
            </span>
          </div>
          <div>
            <Ruler />
            <span>
              <strong>Made for your requirements</strong>
              <small>Thoughtful material & finish options</small>
            </span>
          </div>
          <div>
            <Wrench />
            <span>
              <strong>From idea to installation</strong>
              <small>Let’s discuss your fabrication needs</small>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
