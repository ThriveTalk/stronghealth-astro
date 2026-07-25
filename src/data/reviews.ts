export type ReviewStructuredDataType = "product" | "competitor";

export interface ReviewMeta {
  path: string;
  title: string;
  /** Optional shorter title used for the <title> tag so the final string + brand suffix stays ≤60 chars. Falls back to `title`. */
  seoTitle?: string;
  /** Short label used in compact UI (e.g. footer link columns). */
  shortTitle: string;
  blurb: string;
  badge: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  structuredDataType: ReviewStructuredDataType;
}

export const reviews: ReviewMeta[] = [
  {
    path: "/reviews/low-t-center/",
    title:
      "Low T Center vs. Strong Health: An Honest Comparison of TRT Providers",
    seoTitle: "Low T Center vs. Strong Health: TRT Review",
    shortTitle: "Low T Center",
    blurb:
      "A fair, evidence-based comparison of the Low T Center franchise model and Strong Health's physician-supervised approach to testosterone replacement therapy.",
    badge: "Competitor Comparison",
    datePublished: "2025-11-15",
    dateModified: "2026-03-15",
    readTime: "12 min read",
    structuredDataType: "competitor",
  },
];

export function getReview(path: string): ReviewMeta {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const found = reviews.find((r) => r.path === normalized);
  if (!found) {
    throw new Error(`Unknown review path: ${path}`);
  }
  return found;
}
