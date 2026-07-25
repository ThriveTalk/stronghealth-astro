// Single source of truth for the site-wide "book your assessment" CTA.
// Every booking CTA opens the visitor's SMS app pre-filled to text Strong Health.
// The "?&body=" form is used because it reliably pre-fills the message on both
// iOS and Android (matches the working Miami DEXA "Book" buttons).
export const BOOKING_SMS_NUMBER = "+17542636026";
export const BOOKING_SMS_BODY =
  "I would like to book a free assessment with Strong Health";
export const BOOKING_SMS_HREF = `sms:${BOOKING_SMS_NUMBER}?&body=${encodeURIComponent(
  BOOKING_SMS_BODY,
)}`;

// ---------------------------------------------------------------------------
// Sticky mobile footer CTA (site-wide). The pre-filled SMS names what the
// visitor was reading: "peptide therapy in Miami, Florida" on a city page,
// the page topic ("peptides for weight loss", "BPC-157") everywhere else.
// ---------------------------------------------------------------------------

export const STICKY_CTA_LABEL = "👉 Book a Free Peptide Therapy Assessment";

/** Default SMS context when a page has no city or topic of its own. */
export const STICKY_CTA_DEFAULT_CONTEXT = "peptide therapy";

export function stickyCtaSmsHref(context: string): string {
  return `sms:${BOOKING_SMS_NUMBER}?&body=${encodeURIComponent(
    `I would like to learn more about ${context}`,
  )}`;
}

/** Full state names for the /{statePrefix}/{city-slug}/… local pages. */
const STATE_NAMES: Record<string, string> = {
  fl: "Florida",
  ny: "New York",
  ca: "California",
  nv: "Nevada",
  ga: "Georgia",
  tx: "Texas",
  nc: "North Carolina",
  ok: "Oklahoma",
  wa: "Washington",
  ut: "Utah",
  mo: "Missouri",
};

/** Site chrome / policy slugs whose titles make no sense as an SMS topic. */
const GENERIC_SLUGS = new Set([
  "",
  "404",
  "about",
  "author",
  "blog",
  "careers",
  "editorial-guidelines",
  "hipaa-policy",
  "peptide-therapy",
  "peptides",
  "privacy-policy",
  "terms-of-use",
]);

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Derive the SMS context from a page path when the page doesn't provide one.
 *  - "/fl/miami/dexascan/"        → "peptide therapy in Miami, Florida"
 *  - "/fl/"                       → "peptide therapy in Florida"
 *  - "/peptides-for-weight-loss/" → "peptides for weight loss"
 *  - "/", "/about/", …            → "peptide therapy"
 */
export function stickyCtaContextFromPath(path: string): string {
  const segments = path.split("/").filter(Boolean);
  const stateName = segments.length > 0 ? STATE_NAMES[segments[0]] : undefined;
  if (stateName) {
    if (segments.length === 1) return `${STICKY_CTA_DEFAULT_CONTEXT} in ${stateName}`;
    return `${STICKY_CTA_DEFAULT_CONTEXT} in ${titleCaseSlug(segments[1])}, ${stateName}`;
  }
  const slug = segments[segments.length - 1] ?? "";
  if (segments[0] === "author" || GENERIC_SLUGS.has(slug)) return STICKY_CTA_DEFAULT_CONTEXT;
  return slug.replace(/-/g, " ");
}
