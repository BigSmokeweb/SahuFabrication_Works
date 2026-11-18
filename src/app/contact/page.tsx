import type { Metadata } from "next";
import { PageHeading } from "@/components/common";
import { EnquiryForm } from "@/components/enquiry-form";
import { business, phoneLink, whatsappLink } from "@/lib/business";
export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Discuss your rolling shutter, gate, aluminium window or fabrication requirement with Sahu Fabrication Works in Thane West.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const enabled =
    [
      "RESEND_API_KEY",
      "ENQUIRY_TO_EMAIL",
      "ENQUIRY_FROM_EMAIL",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "RATE_LIMIT_SALT",
      "SITE_URL",
    ].every((k) => !!process.env[k]) && process.env.VERCEL === "1";
  return (
    <>
      <PageHeading
        eyebrow="Contact Us"
        title="Let’s talk about your project."
        description="A new shutter, a better entrance, or something built from scratch. Start with what you have in mind."
      />
      <section className="section wrap contact-layout">
        <div className="contact-info">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>
            Good work starts
            <br />
            with a conversation.
          </h2>
          <p>
            Include your site location, approximate dimensions and preferred
            service so we can understand your requirements.
          </p>
          <div className="contact-item">
            <h3>Our location</h3>
            <p>{business.locality}</p>
            {business.verifiedAddress ? (
              <>
                <p>{business.verifiedAddress}</p>
                <a
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(business.verifiedAddress)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </>
            ) : (
              <p>
                Workshop address and directions will be added after
                confirmation.
              </p>
            )}
          </div>
          <div className="contact-item">
            <h3>Call & WhatsApp</h3>
            {business.verifiedPhone ? (
              <p>
                <a href={phoneLink(business.verifiedPhone)}>
                  {business.verifiedPhone}
                </a>
                <br />
                <a href={whatsappLink(business.verifiedPhone)}>
                  Chat on WhatsApp
                </a>
              </p>
            ) : (
              <p>
                Our direct contact details are being confirmed. Online enquiry
                delivery will open after setup.
              </p>
            )}
          </div>
          <div className="contact-item">
            <h3>Helpful details to share</h3>
            <p>
              Opening measurements · Site location · Manual or motorised
              operation · Finish preferences · Installation requirements
            </p>
          </div>
        </div>
        <EnquiryForm service={service} enabled={enabled} />
      </section>
    </>
  );
}
