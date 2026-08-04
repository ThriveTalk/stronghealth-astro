/**
 * Call/text CTA constants for the MRI local pages.
 *
 * MRI pages share the DEXA funnel's tracked line (see src/data/dexaCta.ts) —
 * do NOT introduce a new number here. Re-exporting keeps every visible phone
 * number, `tel:` link, and `sms:` link on the MRI pages resolving to
 * (786) 420-6630 while giving the MRI funnel its own pre-filled SMS body.
 * Clinic NAP / JSON-LD `telephone` still uses STRONG_HEALTH_PHONE_* from
 * `miamiClinic.ts` so the site-wide NAP stays consistent.
 */
import {
  DEXA_CTA_PHONE_DISPLAY,
  DEXA_CTA_PHONE_HREF,
  DEXA_CTA_PHONE_TEL,
} from "./dexaCta";

export const MRI_CTA_PHONE_DISPLAY = DEXA_CTA_PHONE_DISPLAY;
export const MRI_CTA_PHONE_TEL = DEXA_CTA_PHONE_TEL;
export const MRI_CTA_PHONE_HREF = DEXA_CTA_PHONE_HREF;

/** Pre-filled booking text. "?&body=" is the form that fills on both iOS and Android. */
export const MRI_BOOKING_SMS_BODY = "I would like to book an MRI with Strong Health";
export const MRI_BOOKING_SMS_HREF = `sms:${MRI_CTA_PHONE_TEL}?&body=${encodeURIComponent(
  MRI_BOOKING_SMS_BODY,
)}`;
