import type { Metadata } from "next";
import { PageHeading, CTA } from "@/components/common";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = {
  title: "Product & Project Gallery",
  description:
    "Explore illustrated shutter, gate, aluminium window and fabrication concepts from the Sahu Fabrication Works product range.",
};
export default function GalleryPage() {
  return (
    <>
      <PageHeading
        eyebrow="Gallery"
        title="Explore the possibilities."
        description="A closer look at our product categories. Select an illustration to explore the details."
      />
      <section className="section wrap">
        <p className="notice">
          Product concepts, clearly illustrated. Verified project photography is
          awaiting owner approval.
        </p>
        <Gallery />
      </section>
      <CTA />
    </>
  );
}
