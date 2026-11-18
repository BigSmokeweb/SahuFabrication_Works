import Image from "next/image";
import Link from "next/link";
import { Check, Ruler, Layers, Wrench } from "lucide-react";
import { Hero } from "@/components/hero";
import { CTA, ServiceCards } from "@/components/common";
export default function Home() {
  return (
    <>
      <Hero />
      <section className="section wrap about-section">
        <div className="about-visual">
          <div className="dot-pattern" />
          <Image
            src="/images/hero.webp"
            alt="Illustrative steel shutter showing slatted fabrication details"
            width={760}
            height={700}
          />
          <div className="visual-caption">
            <strong>Built around your needs.</strong>
            <span>METAL. CRAFT. PURPOSE.</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT COMPANY</p>
          <h2>
            A practical approach.
            <br />
            <span className="muted">A lasting impression.</span>
          </h2>
          <p>
            Sahu Fabrication Works brings together rolling shutters, gates,
            safety doors and aluminium work for homes, businesses and industrial
            spaces in Thane.
          </p>
          <p>
            Every opening and every site is different. We start with your
            requirements, then discuss the materials, operating options and
            finish that suit your space.
          </p>
          <ul className="check-list">
            <li>
              <Check />
              Residential & commercial fabrication
            </li>
            <li>
              <Check />
              Manual & motorised shutter and gate options
            </li>
            <li>
              <Check />
              Aluminium windows, sheds & custom metalwork
            </li>
          </ul>
          <Link className="button dark" href="/about">
            More About Us
          </Link>
        </div>
      </section>
      <section className="section services-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR PRODUCTS & SERVICES</p>
              <h2>Crafted for everyday demands.</h2>
            </div>
            <Link className="text-link" href="/services">
              View all products & services
            </Link>
          </div>
          <ServiceCards />
        </div>
      </section>
      <section className="section wrap approach">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR APPROACH</p>
            <h2>Details make the difference.</h2>
          </div>
          <p>
            Clear requirements. Considered materials.
            <br />
            Practical solutions for your space.
          </p>
        </div>
        <div className="approach-grid">
          {[
            {
              icon: Ruler,
              title: "Understand the space",
              text: "Tell us how you use the space, the opening size and what matters to you.",
            },
            {
              icon: Layers,
              title: "Explore the options",
              text: "Discuss materials, finishes and manual or motorised operation to suit your needs.",
            },
            {
              icon: Wrench,
              title: "Plan the work",
              text: "Agree the scope and installation requirements before fabrication begins.",
            },
          ].map((x) => (
            <div key={x.title}>
              <x.icon />
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="gallery-teaser">
        <div className="wrap">
          <div>
            <p className="eyebrow">EXPLORE THE POSSIBILITIES</p>
            <h2>
              Find the right fit
              <br />
              for your next project.
            </h2>
            <p>
              Browse our illustrated product collection, from shutters and
              entrance gates to aluminium windows.
            </p>
            <Link className="button dark" href="/gallery">
              Explore the Gallery
            </Link>
          </div>
          <div className="teaser-images">
            <Image
              src="/images/gate.svg"
              alt="Fabricated gate concept illustration"
              width={620}
              height={440}
            />
            <Image
              src="/images/window.svg"
              alt="Aluminium window concept illustration"
              width={620}
              height={440}
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
