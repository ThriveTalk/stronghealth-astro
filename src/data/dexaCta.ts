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

/** Pre-filled booking text. "?&body=" is the form that fills on both iOS and Android. */
export const DEXA_BOOKING_SMS_BODY = "I would like to book a Dexascan with Strong Health";
export const DEXA_BOOKING_SMS_HREF = `sms:${DEXA_CTA_PHONE_TEL}?&body=${encodeURIComponent(
  DEXA_BOOKING_SMS_BODY,
)}`;
