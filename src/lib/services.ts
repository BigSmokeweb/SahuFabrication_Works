export const categories = [
  {
    slug: "rolling-shutters",
    title: "Rolling Shutters",
    short: "Security that rolls into place.",
    description:
      "Practical shutter solutions for shops, garages, warehouses and everyday commercial spaces. Explore manual and motorised options to suit your opening and how you use it.",
    image: "/images/shutter.svg",
    icon: "shutter",
    products: [
      "Gear rolling shutters",
      "Motorised rolling shutters",
      "Polycarbonate rolling shutters",
      "Steel rolling shutters",
      "Aluminium rolling shutters",
      "Powder-coated rolling shutters",
      "Perforated rolling shutters",
      "Motorised aluminium rolling shutters",
    ],
    features: [
      "Manual and motorised options",
      "A choice of shutter materials and finishes",
      "Planned around opening size and daily use",
    ],
    applications: ["Shopfronts", "Garages", "Warehouses"],
  },
  {
    slug: "gates-and-doors",
    title: "Gates & Safety Doors",
    short: "A stronger welcome, made for you.",
    description:
      "Fabricated entrance gates and safety doors designed around your property. Discuss the layout, access needs and finish for a practical, considered entrance.",
    image: "/images/gate.svg",
    icon: "gate",
    products: [
      "Safety doors",
      "Motorised sliding gates",
      "Manual sliding gates",
      "Fabricated gates",
      "MS gates",
    ],
    features: [
      "Sliding and fabricated gate options",
      "Designs for residential and commercial entrances",
      "Finish and operating method discussed before fabrication",
    ],
    applications: ["Homes", "Housing societies", "Commercial entrances"],
  },
  {
    slug: "aluminium-work",
    title: "Aluminium Fabrication",
    short: "Clean lines. Everyday function.",
    description:
      "Aluminium sliding windows and fabrication for homes, offices and commercial spaces. Choose a layout that makes sense for your space and ventilation needs.",
    image: "/images/window.svg",
    icon: "window",
    products: [
      "Aluminium sliding windows",
      "Aluminium fabrication",
      "Aluminium window installation",
    ],
    features: [
      "Sliding window configurations",
      "Site-specific measurements",
      "Fabrication and installation requirements reviewed together",
    ],
    applications: ["Homes", "Offices", "Retail spaces"],
  },
  {
    slug: "sheds-and-awnings",
    title: "Sheds & Awnings",
    short: "Make more of your outdoor space.",
    description:
      "Car parking sheds and awnings planned around the available area, access and everyday use. Dimensions, supports and materials are discussed for each site.",
    image: "/images/shed.svg",
    icon: "shed",
    products: ["Car parking sheds", "Awnings"],
    features: [
      "Parking and outdoor cover options",
      "Site-specific layouts",
      "Materials and supports subject to site assessment",
    ],
    applications: ["Parking areas", "Building entrances", "Outdoor work areas"],
  },
  {
    slug: "general-fabrication",
    title: "General Fabrication",
    short: "Your requirement. Our craft.",
    description:
      "General and construction-related metal fabrication for practical building needs. Share your drawing, measurements or idea to discuss a suitable way forward.",
    image: "/images/fabrication.svg",
    icon: "fabrication",
    products: ["General fabrication", "Construction-related fabrication"],
    features: [
      "Fabrication to discussed requirements",
      "Residential and commercial work",
      "Material and finish selection for the intended use",
    ],
    applications: ["Buildings", "Commercial premises", "Custom metalwork"],
  },
  {
    slug: "pvc-fittings",
    title: "PVC Fittings",
    short: "The details that bring it together.",
    description:
      "PVC divider and corner fittings for finishing and joining requirements. Discuss the profile, dimensions and intended application before ordering.",
    image: "/images/pvc.svg",
    icon: "pvc",
    products: ["PVC divider fittings", "PVC corner fittings"],
    features: [
      "Divider and corner profiles",
      "Dimensions checked for compatibility",
      "Selection based on intended application",
    ],
    applications: ["Partitions", "Panel junctions", "Interior finishing"],
  },
] as const;
export const services = categories.flatMap((c) =>
  c.products.map((title) => ({
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: c,
  })),
);
export function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}
