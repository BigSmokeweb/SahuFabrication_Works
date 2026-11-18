import type { Metadata } from "next";
import Image from "next/image";
import { CTA, PageHeading } from "@/components/common";
import { Check } from "lucide-react";
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Get to know Sahu Fabrication Works and our approach to shutters, gates, aluminium work and general fabrication in Thane.",
};
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="About Us"
        title="Practical metalwork. Personal attention."
        description="Fabrication solutions for the places you call home, and the spaces where you do business."
      />
      <section className="section wrap about-section">
        <div className="about-visual">
          <Image
            src="/images/hero.webp"
            width={760}
            height={700}
            alt="Illustrative rolling shutter facade"
          />
          <div className="visual-caption">
            <strong>Sahu Fabrication Works</strong>
            <span>THANE WEST · MAHARASHTRA</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">WHO WE ARE</p>
          <h2>
            Made around
            <br />
            your requirements.
          </h2>
          <p>
            Sahu Fabrication Works offers rolling shutters, gates, safety doors,
            aluminium windows and general fabrication in Thane West.
          </p>
          <p>
            Our range covers manual and motorised shutter options, sliding
            gates, car parking sheds, awnings and PVC fittings. Each requirement
            starts with a discussion about the site, intended use and the result
            you have in mind.
          </p>
          <p>
            For materials, finishes, installation scope and timelines, speak
            with us about your specific project. We help you explore the
            available options before agreeing the work.
          </p>
        </div>
      </section>
      <section className="section services-section">
        <div className="wrap">
          <p className="eyebrow">WHAT MATTERS</p>
          <h2>A considered approach to fabrication.</h2>
          <div className="approach-grid mt-10">
            <div>
              <h3>Clear requirements</h3>
              <p>
                Measurements, access, operation and finish should all be part of
                the conversation.
              </p>
            </div>
            <div>
              <h3>Suitable choices</h3>
              <p>
                Explore materials and designs in the context of how the finished
                product will be used.
              </p>
            </div>
            <div>
              <h3>Agreed scope</h3>
              <p>
                Confirm the fabrication and installation requirements before the
                work starts.
              </p>
            </div>
          </div>
          <ul className="check-list">
            <li>
              <Check />
              Homes and residential buildings
            </li>
            <li>
              <Check />
              Shops and commercial premises
            </li>
            <li>
              <Check />
              Industrial and construction requirements
            </li>
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
