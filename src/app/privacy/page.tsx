import type { Metadata } from "next";
import { PageHeading } from "@/components/common";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How enquiry information is handled by the Sahu Fabrication Works website.",
};
export default function Privacy() {
  return (
    <>
      <PageHeading
        eyebrow="Privacy Policy"
        title="Your information, handled with care."
      />
      <article className="section wrap prose">
        <p className="notice">
          This notice describes the implemented enquiry flow. The business must
          confirm its contact channel, retention schedule and applicable privacy
          obligations before public launch.
        </p>
        <h2>Information you choose to share</h2>
        <p>
          The enquiry form asks for your name, phone number, required service
          and message. Email is optional. Please do not include sensitive
          personal information, identity documents or payment details.
        </p>
        <h2>How your enquiry is used</h2>
        <p>
          When delivery is enabled, your details are used to understand and
          respond to your fabrication enquiry. The form does not create an
          account, subscribe you to marketing or accept file uploads.
        </p>
        <h2>Delivery and service providers</h2>
        <p>
          Configured enquiries are transmitted to the business by Resend, an
          email delivery provider. The website is prepared for Vercel hosting. A
          hashed network address is used by Upstash Redis to enforce temporary
          abuse limits. The application does not log your message or contact
          information.
        </p>
        <h2>When delivery is unavailable</h2>
        <p>
          The form reports that an enquiry has not been sent or cannot be
          confirmed. You can copy your enquiry to your device. Drafts are not
          saved in browser storage by this website. Email acceptance does not
          guarantee that an email has reached the recipient’s inbox.
        </p>
        <h2>Retention and requests</h2>
        <p>
          Enquiries delivered to the business remain in its email system. The
          owner must establish and publish a retention and deletion schedule
          before launch. A verified contact for access, correction and deletion
          requests will be added with the business contact details. Do not
          submit personal information until that setup is complete.
        </p>
        <h2>Cookies and external services</h2>
        <p>
          No advertising cookies or analytics are installed by this application.
          The embedded Google Map loads from Google and may send Google your
          network address and browser information or use cookies under its own
          privacy terms. Get Directions opens Google Maps, where you can choose
          a starting point or allow Google to use your location. This website
          does not request or store your current location. Call and WhatsApp
          links remain unavailable until the business confirms its phone number.
        </p>
        <h2>Your choice</h2>
        <p>
          Only submit details you want the business to use for this enquiry.
          Consent is required before submission. You can choose not to submit
          the form.
        </p>
      </article>
    </>
  );
}
