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

export const reviews: ReviewMeta[] = [];

export function getReview(path: string): ReviewMeta {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const found = reviews.find((r) => r.path === normalized);
  if (!found) {
    throw new Error(`Unknown review path: ${path}`);
  }
  return found;
}
