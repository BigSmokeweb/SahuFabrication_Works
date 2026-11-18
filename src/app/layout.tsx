import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import "./globals.css";
import { headers } from "next/headers";
const origin = process.env.SITE_URL;
export const metadata: Metadata = {
  title: {
    default: "Sahu Fabrication Works | Shutters, Gates & Aluminium in Thane",
    template: "%s | Sahu Fabrication Works",
  },
  description:
    "Explore rolling shutters, fabricated gates, safety doors, aluminium windows and custom fabrication in Thane West. Discuss your requirements with Sahu Fabrication Works.",
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    title: "Sahu Fabrication Works",
    description: "Shutters, gates and aluminium fabrication in Thane West.",
    type: "website",
    locale: "en_IN",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await headers();
  return (
    <html lang="en-IN">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
