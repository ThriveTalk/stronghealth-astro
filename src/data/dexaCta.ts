/**
 * Call/text CTA number for the DEXA scan pages only.
 *
 * The DEXA funnel routes to its own line so calls and texts from
 * /dexa-scan-family pages are attributable separately from the main
 * Strong Health number in `miamiClinic.ts`. Every visible phone number,
 * `tel:` link, and `sms:` link on a DEXA page reads from here; the clinic
 * NAP (address block schema, Organization/MedicalBusiness `telephone`)
 * still uses STRONG_HEALTH_PHONE_* so the site-wide NAP stays consistent.
 */
export const DEXA_CTA_PHONE_DISPLAY = "(786) 420-6630";
export const DEXA_CTA_PHONE_TEL = "+17864206630";
export const DEXA_CTA_PHONE_HREF = `tel:${DEXA_CTA_PHONE_TEL}`;

/**
 * Pre-filled booking text, named for the page's location so the clinic knows
 * where the lead came from. "?&body=" is the form that fills on both iOS and
 * Android.
 */
export function dexaBookingSmsBody(location: string): string {
  return `I would like to book a DEXA scan in ${location} with Strong Health`;
}

export function dexaBookingSmsHref(location: string): string {
  return `sms:${DEXA_CTA_PHONE_TEL}?&body=${encodeURIComponent(dexaBookingSmsBody(location))}`;
}
