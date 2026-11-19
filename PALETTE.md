# Sahu Fabrication Works — monochrome palette

The complete website uses the nine colors supplied by the owner. Shared tokens in `src/app/globals.css` control every page and UI state.

| Token     | Hex       | Role                                            |
| --------- | --------- | ----------------------------------------------- |
| Snow      | `#F8F9FA` | Page/card surfaces and text on dark backgrounds |
| Platinum  | `#E9ECEF` | Alternate sections and muted light text         |
| Alabaster | `#DEE2E6` | Subtle separators and light surfaces            |
| Silver    | `#CED4DA` | Image backgrounds and borders                   |
| Slate     | `#ADB5BD` | Supporting detail on dark surfaces              |
| Gray      | `#6C757D` | Secondary graphics and control outlines         |
| Iron      | `#495057` | Body text, secondary text and hover states      |
| Gunmetal  | `#343A40` | Primary actions and dark panels                 |
| Charcoal  | `#212529` | Headings, navigation, hero overlays and footer  |

UI contrast determines which colors can be paired: smaller body text uses Iron or Charcoal on Snow, rather than low-contrast light grays. Focus uses a two-tone light/dark ring. Error and success messages use explicit wording and border treatment instead of relying on colored status cues.

The product visuals use photorealistic AI-generated monochrome images, with provenance and prompts in ASSETS.md. Original SVG illustration sources and the favicon use the same palette. Existing hero photography is displayed in grayscale through CSS. The hero, services, detail pages, gallery, contact, privacy, mobile navigation and 404 share this theme. Apple-inspired rounded controls, immediate press feedback, interruptible swipe feedback, and accessibility preference fallbacks remain in place.

## Verified for this update

- Production build, ESLint and strict TypeScript passed.
- All 27 unit/integration tests passed.
- All 21 Playwright checks passed across Chromium, Firefox and WebKit (7 checks per browser).
- No horizontal overflow at 320, 375, 390, 768, 1024, 1440 and 1920px.
- No axe violations for the tested WCAG AA tags on the representative pages and mobile homepage.
- All main and category/product routes and their images loaded in the browser suite; navigation, hero swipes, gallery controls, form validation and response headers passed.
- Source audit of the shared stylesheet and six SVG illustrations found zero base colors outside the nine supplied palette colors. Alpha variants are used for overlays and shadows.
- Desktop homepage, product cards, contact and gallery, plus the mobile homepage, were visually reviewed. Local screenshots are in `reports/palette/`.

No dependency or backend behavior changes were needed for the palette update. Real enquiry delivery remains unconfigured pending owner-approved contact information and provider credentials. No production deployment was performed. Earlier Lighthouse scores describe earlier revisions; Lighthouse was not rerun for this palette change.
