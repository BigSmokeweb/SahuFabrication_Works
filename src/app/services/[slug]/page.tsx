import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, services, findService } from "@/lib/services";
import { PageHeading, CTA } from "@/components/common";
import { Check } from "lucide-react";
export function generateStaticParams() {
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...services
      .filter((s) => !categories.some((c) => c.slug === s.slug))
      .map((s) => ({ slug: s.slug })),
  ];
}
function resolve(slug: string) {
  const category = categories.find((c) => c.slug === slug);
  const service = findService(slug);
  return category
    ? { category, title: category.title }
    : service
      ? { category: service.category, title: service.title }
      : null;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = resolve((await params).slug);
  return p
    ? {
        title: `${p.title} in Thane`,
        description: `Explore ${p.title.toLowerCase()} from Sahu Fabrication Works in Thane West. Discuss materials, dimensions, finishes and installation requirements.`,
      }
    : {};
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = resolve((await params).slug);
  if (!p) notFound();
  const { category: c, title } = p;
  return (
    <>
      <PageHeading
        eyebrow="Products & Services"
        title={title}
        description={c.short}
      />
      <section className="section wrap detail-layout">
        <article>
          <Image
            src={c.image}
            alt={`${title} illustrative product concept`}
            width={800}
            height={550}
          />
          <p className="notice">
            Illustrative product concept. Final design, specifications and
            availability are confirmed for your requirement.
          </p>
          <h2>{title} for your space</h2>
          <p>
            {title === c.title
              ? c.description
              : `${title} are part of our ${c.title.toLowerCase()} range. ${c.description}`}
          </p>
          <h2>What to discuss</h2>
          <ul className="check-list">
            {c.features.map((f) => (
              <li key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
          <h2>Typical applications</h2>
          <div className="pill-list">
            {c.applications.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
          <h2>Planning your requirement</h2>
          <p>
            Share the opening dimensions, site location, preferred operation and
            any finish or design references. A site assessment may be needed
            before confirming the scope and quotation.
          </p>
          <Link
            className="button primary"
            href={"/contact?service=" + encodeURIComponent(title) + "#enquiry"}
          >
            Enquire About {title}
          </Link>
        </article>
        <aside>
          <h2>Explore this range</h2>
          {c.products.map((t) => (
            <Link
              key={t}
              href={"/services/" + t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            >
              {t}
            </Link>
          ))}
          <h2 className="mt-8">Other services</h2>
          {categories
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link key={x.slug} href={"/services/" + x.slug}>
                {x.title}
              </Link>
            ))}
          <Link className="button dark" href="/contact">
            Discuss Your Project
          </Link>
        </aside>
      </section>
      <CTA />
    </>
  );
}
