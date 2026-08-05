/**
 * Registry behind the /diagnostics/ hub page. Every live diagnostic city page
 * (DEXA, VO2 max, RMR, MRI) is listed here, grouped by test category.
 *
 * When a new diagnostic city page ships:
 *  - DEXA pages appear automatically — locations are derived from
 *    ALL_PEPTIDE_CITIES, the same `/dexascan/` cross-link signal
 *    DexaLocationsBlock uses, so the list can't drift from the live pages.
 *  - MRI / VO2 max / RMR pages must be added to the category's `locations`
 *    array below (these pages live outside cityPeptideConfig).
 *
 * Peptide-therapy city pages do NOT belong here — this hub is diagnostics only.
 */
import { ALL_PEPTIDE_CITIES } from "./cityPeptideConfig";

export interface DiagnosticLocation {
  /** Human-readable city, e.g. "Miami" */
  cityName: string;
  /** Two-letter state abbreviation, e.g. "FL" */
  state: string;
  href: string;
}

export interface DiagnosticCategory {
  key: "dexa" | "vo2max" | "rmr" | "mri";
  name: string;
  /** One-line "what it measures / why it matters" shown under the name. */
  tagline: string;
  /** Lucide icon name (must exist in shared/lucideIcons.ts). */
  icon: string;
  /** Optional national guide page for the test itself. */
  guide?: { label: string; href: string };
  /** Live city pages. Empty array renders as "coming soon" on the hub. */
  locations: DiagnosticLocation[];
}

const DEXA_LOCATIONS: DiagnosticLocation[] = ALL_PEPTIDE_CITIES.flatMap((c) => {
  const dexaService = c.relatedServices.find((s) => s.href.includes("/dexascan/"));
  if (!dexaService) return [];
  return [{ cityName: c.cityName, state: c.clinic.state, href: dexaService.href }];
});

export const DIAGNOSTIC_CATEGORIES: DiagnosticCategory[] = [
  {
    key: "dexa",
    name: "DEXA Scan",
    tagline:
      "Gold-standard body composition and bone density: lean mass, body fat %, visceral fat, and bone mineral density in one scan.",
    icon: "bone",
    guide: { label: "What is a DEXA scan?", href: "/dexa-scan/" },
    locations: DEXA_LOCATIONS,
  },
  {
    key: "vo2max",
    name: "VO2 Max Testing",
    tagline:
      "Cardiorespiratory fitness measured directly — the single strongest lab predictor of longevity and endurance capacity.",
    icon: "heart-pulse",
    locations: [],
  },
  {
    key: "rmr",
    name: "RMR Testing",
    tagline:
      "Resting metabolic rate: how many calories your body actually burns at rest, so nutrition targets are built on data instead of formulas.",
    icon: "zap",
    locations: [],
  },
  {
    key: "mri",
    name: "MRI",
    tagline:
      "Physician-ordered MRI through accredited partner imaging centers, with the report reviewed with you by a Strong Health physician.",
    icon: "brain",
    locations: [
      { cityName: "Miami", state: "FL", href: "/fl/miami/mri/" },
      { cityName: "Fort Lauderdale", state: "FL", href: "/fl/fort-lauderdale/mri/" },
      { cityName: "New York", state: "NY", href: "/ny/new-york/mri/" },
      { cityName: "Houston", state: "TX", href: "/tx/houston/mri/" },
    ],
  },
];
