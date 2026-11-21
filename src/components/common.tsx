import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/services";
import { business, directionsLink, mapEmbedLink } from "@/lib/business";
import { ArrowUpRight, MapPin } from "lucide-react";
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="page-heading">
      <div className="wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta-enquiry">
          <div>
            <p className="eyebrow">LET’S BUILD SOMETHING THAT FITS</p>
            <h2>Good work starts with a conversation.</h2>
            <p>Share your measurements, your idea, or simply what you need.</p>
          </div>
          <Link className="button white" href="/contact#enquiry">
            Request a Quote
          </Link>
        </div>
        <div className="cta-visit">
          <p className="eyebrow">COME SAY HELLO</p>
          <h2>Visit us for a better understanding.</h2>
          <p>
            Let’s discuss your ideas, materials and the right fit for your space
            in person.
          </p>
          <a
            className="button white"
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className="visit-help">
            Our workshop is beside New Lucky Auto Parts, the landmark shown in
            Google Maps. Choose your starting point for directions.
          </p>
          <span className="visit-arrow" aria-hidden="true">
            <svg className="visit-arrow-wide" viewBox="0 0 280 108">
              <path d="M8 38H190V10L270 54L190 98V70H8Z" />
            </svg>
            <svg className="visit-arrow-down" viewBox="0 0 108 124">
              <path d="M38 8H70V68H98L54 116L10 68H38Z" />
            </svg>
          </span>
        </div>
        <div className="visit-map">
          <iframe
            title="Sahu Fabrication Works location, beside New Lucky Auto Parts in Louis Wadi"
            src={mapEmbedLink}
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
          <div className="visit-location">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>{business.name}</strong>
              <p>{business.verifiedAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ServiceCards({ limit = 6 }: { limit?: number }) {
  return (
    <div className="service-grid">
      {categories.slice(0, limit).map((c) => (
        <Link
          className="service-card"
          key={c.slug}
          href={"/services/" + c.slug}
        >
          <div className="service-image">
            <Image
              src={c.image}
              alt={`${c.title} illustrative product visual`}
              width={1200}
              height={800}
              sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
            <span className="small-label">ILLUSTRATIVE VISUAL</span>
          </div>
          <div className="service-copy">
            <h3>{c.title}</h3>
            <p>{c.short}</p>
            <span className="text-link">Explore {c.title.toLowerCase()}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
