export const business = {
  name: "Sahu Fabrication Works",
  locality: "Thane West, Maharashtra",
  // Phone and establishment year still await owner confirmation.
  verifiedPhone: null as string | null,
  verifiedAddress:
    "Eastern Express Highway, near Riddhi Siddhi Building, Louise Wadi, Thane West, Maharashtra 400604",
  established: null as number | null,
  siteUrl: process.env.SITE_URL || null,
};
// Route to the named landmark on the confirmed card. An exact workshop pin
// has not been supplied, and free-text searches can return other businesses.
export const mapDestination =
  "Riddhi Siddhi CHS, Louis Wadi, Thane West, Maharashtra 400604";
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
