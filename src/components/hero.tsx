"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
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
    image: "/images/products/gates-and-doors.webp",
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
    image: "/images/products/aluminium-work.webp",
    link: "/services/aluminium-work",
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const s = slides[active];
  const stage = useRef<HTMLDivElement>(null);
  const motion = useRef({ x: 0, velocity: 0, frame: 0 });
  const gesture = useRef<{
    pointer: number;
    x: number;
    y: number;
    offset: number;
    horizontal: boolean;
    samples: { x: number; time: number }[];
  } | null>(null);

  useEffect(() => {
    const state = motion.current;
    return () => cancelAnimationFrame(state.frame);
  }, []);

  function present(x: number) {
    motion.current.x = x;
    stage.current?.style.setProperty("--hero-drag", `${x}px`);
  }

  // A critically damped spring starts at the presentation value and can
  // be grabbed again at any point. Gesture velocity is carried into release.
  function settle(velocity = 0) {
    const state = motion.current;
    cancelAnimationFrame(state.frame);
    state.velocity = Math.max(-1200, Math.min(1200, velocity));
    let previous = performance.now();
    const tick = (now: number) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        present(0);
        state.velocity = 0;
        return;
      }
      const dt = Math.min((now - previous) / 1000, 0.032);
      previous = now;
      state.velocity +=
        (-300 * state.x - 2 * Math.sqrt(300) * state.velocity) * dt;
      present(state.x + state.velocity * dt);
      if (Math.abs(state.x) < 0.1 && Math.abs(state.velocity) < 1) {
        present(0);
        state.velocity = 0;
        return;
      }
      state.frame = requestAnimationFrame(tick);
    };
    state.frame = requestAnimationFrame(tick);
  }

  function onDown(e: PointerEvent<HTMLElement>) {
    if (
      !e.isPrimary ||
      e.button !== 0 ||
      (e.target as HTMLElement).closest("a,button")
    )
      return;
    cancelAnimationFrame(motion.current.frame);
    gesture.current = {
      pointer: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      offset: motion.current.x,
      horizontal: false,
      samples: [{ x: e.clientX, time: e.timeStamp }],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (e.pointerType === "mouse") e.preventDefault();
  }

  function onMove(e: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    if (!start || start.pointer !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (!start.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      if (Math.abs(dx) <= Math.abs(dy) * 1.5) {
        gesture.current = null;
        settle();
        return;
      }
      start.horizontal = true;
    }
    start.samples.push({ x: e.clientX, time: e.timeStamp });
    start.samples = start.samples.filter(
      (sample) => e.timeStamp - sample.time <= 100,
    );
    const distance = start.offset + dx;
    const edge = 80;
    const overshoot = Math.max(0, Math.abs(distance) - edge);
    const resistance = (overshoot * 120 * 0.55) / (120 + overshoot * 0.55);
    present(
      Math.sign(distance) * (Math.min(Math.abs(distance), edge) + resistance),
    );
    e.preventDefault();
  }

  function onUp(e: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.pointer !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const recent = start.samples.find(
      (sample) => e.timeStamp - sample.time <= 100,
    );
    const velocity = recent
      ? (e.clientX - recent.x) /
        Math.max((e.timeStamp - recent.time) / 1000, 0.016)
      : 0;
    // Project the flick with exponential deceleration, then select its direction.
    const projected = dx + ((velocity / 1000) * 0.99) / (1 - 0.99);
    if (
      Math.abs(dx) > 10 &&
      Math.abs(dx) > Math.abs(dy) * 1.5 &&
      Math.abs(projected) > 50
    ) {
      setActive(
        (current) =>
          (current + (projected < 0 ? 1 : slides.length - 1)) % slides.length,
      );
    }
    settle(start.horizontal ? velocity : 0);
  }

  function onCancel() {
    gesture.current = null;
    settle();
  }
  return (
    <>
      <section
        className={"hero slide-" + active}
        aria-roledescription="carousel"
        aria-label="Featured services"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
      >
        <div className="hero-stage" ref={stage}>
          <Image
            className="hero-image"
            src={s.image}
            alt={active === 0 ? "Steel rolling shutter in a workshop" : s.tag}
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-content" aria-live="polite">
          <p className="eyebrow">{s.tag}</p>
          <h1>{s.title}</h1>
          <p className="hero-text">{s.text}</p>
          <div className="hero-actions">
            <Link className="button primary" href={s.link}>
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
