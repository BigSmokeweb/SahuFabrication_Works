import { z } from "zod";
import { categories, services } from "./services";
export const serviceOptions = [
  ...new Set([
    ...categories.map((c) => c.title),
    ...services.map((s) => s.title),
    "Other fabrication requirement",
  ]),
];
export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name (at least 2 characters).")
      .max(80, "Use 80 characters or fewer.")
      .regex(
        /^[\p{L}\p{M} .’'\-]+$/u,
        "Use letters, spaces, apostrophes or hyphens.",
      ),
    phone: z
      .string()
      .trim()
      .regex(
        /^(?:\+91[ -]?)?[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number.",
      ),
    email: z.union([
      z.literal(""),
      z.email("Enter a valid email address.").max(254),
    ]),
    service: z
      .string()
      .refine((s) => serviceOptions.includes(s), "Choose a service."),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters).")
      .max(2000, "Use 2,000 characters or fewer."),
    consent: z.literal(true, { error: "Please agree to the privacy notice." }),
    website: z.string().max(0),
  })
  .strict();
export type Enquiry = z.infer<typeof enquirySchema>;
export function formatEnquiry(d: Enquiry) {
  return `Fabrication enquiry\n\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "Not provided"}\nService: ${d.service}\n\n${d.message}`;
}
