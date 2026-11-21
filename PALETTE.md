# Sahu Fabrication Works — company brand palette

The website follows the owner's photographed business card: a red-and-white fabric awning above the company name in warm orange. These are digital interpretations of the photographed colors, rather than calibrated print color values. Shared tokens in `src/app/globals.css` apply the theme across every page.

| Color          | Hex                                        | Role                                                       |
| -------------- | ------------------------------------------ | ---------------------------------------------------------- |
| Fabric red     | `#BE2631`                                  | Alternating stripes in the awning logo                     |
| White          | `#FFFFFF`                                  | Fabric stripes, header, cards and page surfaces            |
| Action red     | `#B5222A`                                  | Primary buttons, active navigation, icons and CTA sections |
| Deep red       | `#921B22`                                  | Button hover state                                         |
| Warm orange    | `#A85021`                                  | Company name below the awning                              |
| Light orange   | `#F0B187`                                  | Company name on the dark footer                            |
| Warm off-white | `#F7F4F1`                                  | Alternate light sections                                   |
| Warm neutrals  | `#E8DED5`, `#D6C8BC`, `#B9ACA1`, `#7C7168` | Borders, surfaces and supporting details                   |
| Dark neutrals  | `#51453D`, `#3B302A`, `#27201C`            | Readable text, dark panels and footer                      |

The red and orange brand colors replace the earlier monochrome UI. Illustrative product photographs remain grayscale. Explicit status wording, visible focus indicators, reduced-motion fallbacks and responsive controls remain in place.

## Verification

Production build, ESLint and strict TypeScript passed. All 21 Playwright checks passed across Chromium, Firefox and WebKit for this branding update, covering pages and images, navigation, gallery, forms, responsive layouts, accessibility and response headers. The final mobile logo typography was checked again with the responsive and accessibility browser tests. Desktop and mobile screenshots are saved locally in `reports/brand/`.

No dependency or enquiry-backend changes were made. Contact details from the card were not imported; verified contact configuration remains pending. No production deployment was performed.
