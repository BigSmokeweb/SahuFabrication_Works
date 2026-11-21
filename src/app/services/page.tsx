import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/services";
import { CTA, PageHeading } from "@/components/common";
export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Rolling shutters, safety doors, sliding gates, aluminium windows, sheds and general fabrication for customers in Thane West.",
};
export default function Services() {
  return (
    <>
      <PageHeading
        eyebrow="Products & Services"
        title="The right solution starts here."
        description="Explore our range of shutters, gates, aluminium work and fabrication. Materials, dimensions and finishes are discussed for each requirement."
      />
      <section className="section wrap">
        {categories.map((c) => (
          <article className="category-block" key={c.slug}>
            <div className="category-layout">
              <Link href={"/services/" + c.slug}>
                <Image
                  src={c.image}
                  alt={c.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 700px) 100vw, 45vw"
                />
              </Link>
              <div>
                <p className="eyebrow">{c.short}</p>
                <h2>
                  <Link href={"/services/" + c.slug}>{c.title}</Link>
                </h2>
                <p>{c.description}</p>
                <div className="product-links">
                  {c.products.map((title) => (
                    <Link
                      key={title}
                      href={
                        "/services/" +
                        title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                      }
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
