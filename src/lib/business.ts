export const business = {
  name: "Sahu Fabrication Works",
  locality: "Thane West, Maharashtra",
  // Phone and establishment year still await owner confirmation.
  verifiedPhone: null as string | null,
  verifiedAddress:
    "Beside New Lucky Auto Parts, near Riddhi Siddhi Apartment, Louis Wadi, Thane West, Thane, Maharashtra 400604, India",
  established: null as number | null,
  siteUrl: process.env.SITE_URL || null,
};
// The owner confirmed the workshop is beside this mapped shop. Use that
// landmark for navigation until Sahu Fabrication Works has its own listing.
export const mapDestination =
  "NEW LUCKY AUTO PARTS, near Riddhi Siddhi Apartment, Louis Wadi, Thane West, Thane, Maharashtra 400604, India";
export const directionsLink =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(mapDestination);
export const mapEmbedLink =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(mapDestination) +
  "&output=embed";
export function phoneLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g, "")}`;
}
export function whatsappLink(phone: string) {
  return `https://wa.me/91${phone.replace(/\D/g, "")}`;
}
