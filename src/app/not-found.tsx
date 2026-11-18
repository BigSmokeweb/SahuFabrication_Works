import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap not-found">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>Let’s get you back on track.</h1>
      <p>
        The page you’re looking for may have moved. Explore our fabrication
        services or return home.
      </p>
      <Link href="/" className="button dark">
        Back to Home
      </Link>
    </section>
  );
}
