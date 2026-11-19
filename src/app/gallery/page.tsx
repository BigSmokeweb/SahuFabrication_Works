import type { Metadata } from "next";
import { PageHeading, CTA } from "@/components/common";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = {
  title: "Product & Project Gallery",
  description:
    "Explore shutter, gate, aluminium window and fabrication product visuals from the Sahu Fabrication Works range.",
};
export default function GalleryPage() {
  return (
    <>
      <PageHeading
        eyebrow="Gallery"
        title="Explore the possibilities."
        description="A closer look at our product categories. Select an image to explore the details."
      />
      <section className="section wrap">
        <p className="notice">
          AI-generated product visuals for illustration. Verified project
          photography is awaiting owner approval.
        </p>
        <Gallery />
      </section>
      <CTA />
    </>
  );
}
