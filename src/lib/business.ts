export const business = {
  name: "Sahu Fabrication Works",
  locality: "Thane West, Maharashtra",
  // Owner confirmation is required before enabling these fields.
  verifiedPhone: null as string | null,
  verifiedAddress: null as string | null,
  established: null as number | null,
  siteUrl: process.env.SITE_URL || null,
};
export function phoneLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g, "")}`;
}
export function whatsappLink(phone: string) {
  return `https://wa.me/91${phone.replace(/\D/g, "")}`;
}
