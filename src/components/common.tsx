import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/services";
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
        <div>
          <p className="eyebrow">LET’S BUILD SOMETHING THAT FITS</p>
          <h2>Good work starts with a conversation.</h2>
          <p>Share your measurements, your idea, or simply what you need.</p>
        </div>
        <Link className="button white" href="/contact#enquiry">
          Request a Quote
        </Link>
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
              alt={`${c.title} product illustration`}
              width={640}
              height={440}
            />
            <span className="small-label">PRODUCT ILLUSTRATION</span>
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
