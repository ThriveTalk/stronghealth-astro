# Page Plan — VO2 Max Testing Miami

**Route:** `/fl/miami/vo2-max-testing/`
**File:** `src/pages/fl/miami/vo2-max-testing.astro`
**Template:** CityPages pattern — self-contained Miami service page, same structure as
`src/pages/fl/miami/dexascan.astro` and `src/pages/fl/miami/stem-cell-therapy.astro`
**Author / Reviewer:** Mahadev Mukherjee / Dr. Angel Rivera, M.D.
**Status:** PLAN — approved-for-build pending clinical sign-off on protocol/pricing copy.

---

## 1. Target keywords & opportunity

| Keyword | US volume | KD | CPC | Intent | Notes |
|---|---|---|---|---|---|
| **vo2 max test miami** (primary) | 40 /mo | 0 | — | local + transactional | Exact local head term; paid ads already on SERP |
| **vo2 max testing near me** | 2,200 /mo | 0 | $0.80 | local + transactional | The real prize — localized page + GBP capture Miami-IP "near me" searches |
| vo2 max test near me | 450 /mo | 3 | $0.80 | local + transactional | Local pack on SERP; parent topic is *body composition scan near me* — pairs naturally with our DEXA page |
| vo2 max testing miami | 10 /mo | — | — | local | Variant, covered by title/H1 phrasing |
| vo2 max test cost | 90 /mo | 1 | $0.45 | commercial + local | Answer directly in FAQ (cost question) |
| metabolic testing miami | 10 /mo | — | — | local | Secondary mention (RMR/metabolic cart language) |
| vo2 max test | 3,700 /mo | 8 | — | informational | National head term — belongs to a future `/vo2-max-test/` pillar guide, not this city page (see §9) |

Source: Ahrefs Keywords Explorer, US, pulled 2026-08-04.

**Why build it:** Local VO2 max SERPs in Miami are thin (KD 0 across the cluster) and
monetized (paid ads on the exact term), meaning commercial intent with almost no organic
competition. The "near me" terms carry local packs and 2,650+ combined monthly searches
nationally — a hyper-localized Miami page with correct `MedicalBusiness` schema and GBP
alignment is how we win the Miami slice of them. It also completes the "longevity testing"
pairing with the existing DEXA page (body composition + cardiorespiratory fitness), which
strengthens the whole `/fl/miami/` cluster.

**Slug decision:** `vo2-max-testing` (not `vo2-max-test`) — matches the highest-volume
local-intent term ("vo2 max testing near me") and reads as a service name, consistent with
`peptide-therapy`, `prp-therapy`, `stem-cell-therapy`.

---

## 2. URL, breadcrumbs & canonical

- URL: `https://www.stronghealth.com/fl/miami/vo2-max-testing/` — same
  `/{state}/{city}/{service}/` structure as every other city page.
- Breadcrumbs (visible + `breadcrumbSchema`):
  `Home → Florida (/fl/) → VO2 Max Testing Miami (/fl/miami/vo2-max-testing/)`
- Canonical: path-based via `BaseLayout` `path` prop, as on the other Miami pages.

---

## 3. Metadata & headings

| Element | Copy |
|---|---|
| `<title>` | `VO2 Max Testing Miami — Cardio Fitness Test` |
| Meta description | `Clinical VO2 max test in Miami at our Brickell clinic. Measure your cardiorespiratory fitness, training zones & metabolic health. Same-week appointments.` |
| H1 | `VO2 Max Testing in Miami.` + gold span: `Know your engine. Train with real numbers.` |
| H2s | Follow the CityPages section pattern (§5) — each H2 works "VO2 max" and "Miami"/"Brickell" naturally, mirroring the DEXA page's keyword placement. |

The phrase "VO2 max test in Miami, FL" should appear verbatim in the hero paragraph and
once in the FAQ copy (the geo-qualified form the user searches).

---

## 4. Structured data (JSON-LD)

Same four-schema stack as the DEXA Miami page, all reading from
`MIAMI_BRICKELL_CLINIC` in `src/data/miamiClinic.ts`:

1. **`MedicalBusiness`** — `@id: …/fl/miami/vo2-max-testing/#clinic`, `branchOf` the
   Brickell clinic node, full NAP, geo, hours, `areaServed: Miami`,
   `medicalSpecialty: ["SportsMedicine", "PreventiveMedicine"]`, and `availableService`:
   - `MedicalProcedure` — "VO2 Max Test — Cardiorespiratory Fitness Assessment"
     (graded exercise test with metabolic gas-exchange analysis; VO2 max, ventilatory
     thresholds, heart-rate training zones).
   - `MedicalProcedure` — "Resting Metabolic Rate (RMR) Test" if clinically offered —
     confirm with clinic before shipping; otherwise omit.
2. **`medicalWebPageSchema`** — reviewed by `DR_ANGEL_RIVERA`.
3. **`articleSchema`** — author `MAHADEV_MUKHERJEE`, reviewer `DR_ANGEL_RIVERA`.
4. **`faqPageSchema`** — the 10 FAQs in §6.

Plus `breadcrumbSchema`. Schema key order and structure copied from
`dexascan.astro:196-261` to stay consistent.

---

## 5. Page sections (CityPages template order)

Reuses the shared component system: `BaseLayout`, `PageShell`, `JsonLd`, `FadeIn`,
`Btn`, `Tag`, `Icon`, `AuthorByline`. Booking CTA is the standard SMS deep link
(`+17542636026`) with body: `"I would like to book a VO2 Max test in Miami with Strong Health"`,
using the same `?&body=` form as the other pages. All phone/address copy reads from
`miamiClinic.ts` — no hardcoded NAP.

1. **Breadcrumbs** — as §2.
2. **Hero** — 4.9★ Miami reviews line; Tag: `Miami VO2 Max Testing · Brickell Clinic ·
   Same-Week Appointments`; H1 per §3; hero paragraph: physician-supervised VO2 max test
   in Miami, FL at the Brickell clinic — measure aerobic capacity (ml/kg/min), ventilatory
   thresholds, and personalized heart-rate training zones. Sub-CTA line: "45-min visit ·
   Same-week appointments · No referral needed".
3. **AuthorByline** — Mahadev Mukherjee, reviewed by Dr. Angel Rivera.
4. **Why VO2 max in Miami** (mirrors "WhyDexa") — angle: your watch estimates VO2 max;
   a metabolic cart measures it. Wearable estimates can be off by 10%+; a true graded
   exercise test with breath-by-breath gas exchange is the clinical gold standard, and
   VO2 max is one of the strongest known predictors of longevity and all-cause mortality.
   Proof points list: gold-standard direct measurement vs. wrist estimates; VT1/VT2
   ventilatory thresholds for zone training; percentile vs. your age/sex cohort;
   physician-supervised, safe protocol; repeatable for trend data.
5. **ClinicDetails** — identical layout to DEXA page: Google Maps embed, NAP, hours,
   parking/Metrorail directions. "What to expect" card, VO2-specific: (1) check-in, health
   screen, resting baseline; (2) mask fit on treadmill or bike ergometer; (3) 10–15 min
   graded ramp to volitional max, physician-supervised; (4) cool-down + results review:
   VO2 max, thresholds, and training zones before you leave. Note: arrive rested, skip
   caffeine 3 hours and hard training 24 hours before; bring running shoes.
6. **WhatYouGet** (6 report cards) — VO2 Max Score (ml/kg/min + METs); Age/Sex Percentile
   ("fitness age"); Ventilatory Thresholds VT1 & VT2; Personalized HR Training Zones
   (Z1–Z5 anchored to *your* thresholds, not 220-minus-age); Calorie Burn & Fuel
   Utilization (fat vs. carb crossover point); Trend Tracking (re-test every 4–6 months).
7. **UseCases** (4 cards, each with an internal link):
   - *Runners & triathletes* — Rickenbacker Causeway cyclists, Key Biscayne triathletes,
     Miami Marathon & Half training → link `/fl/miami/dexascan/` ("Pair it with a DEXA
     scan →").
   - *Longevity & healthspan* — VO2 max as a top mortality predictor → link
     `/fl/miami/peptide-therapy/`.
   - *GLP-1 & weight loss* — verify cardio fitness is improving as weight drops → link
     `/peptides-for-weight-loss/`.
   - *Energy & performance protocols* — baseline and re-test on peptide/TRT protocols →
     link `/peptides-for-energy/`.
8. **HowItWorks** (4 numbered steps, same card style/colors) — Book Your Miami Test →
   The 10–15 Minute Ramp Test → Same-Day Results Review → Re-Test & Track (every 4–6
   months).
9. **Testimonials** (3, Miami neighborhoods) — e.g. Brickell runner training for the
   Miami Marathon whose watch overestimated VO2 max; Coral Gables patient using zones
   to train smarter in Miami heat/humidity; Coconut Grove cyclist pacing Rickenbacker
   intervals off VT2. Follow the DEXA page's "Verified Patient" card format.
10. **Neighborhoods / Serving Miami-Dade** — reuse the `MIAMI_DEXA_NEIGHBORHOODS` names
    as **non-linked pills** ("VO2 max testing near Brickell", "…near Coral Gables", …).
    Do NOT link to child pages yet — those don't exist for VO2 max (see §9). Keeps the
    hyper-local footprint without creating 404s.
11. **FAQ** — §6, wrapped in `faqPageSchema`.
12. **FinalCTA** — gold-gradient section, phone + SMS booking button:
    "Book your VO2 max test in Miami".

Hyper-localization checklist (must appear in visible copy): Brickell / 1000 Brickell
Plaza; Metrorail Brickell station + validated parking; I-95 access; Rickenbacker
Causeway; Key Biscayne; Miami Marathon & Half; training in Miami heat & humidity (why
threshold-based zones matter more here); at least 3 named neighborhoods in testimonials.

---

## 6. FAQs (drafted question set → target queries)

1. Where can I get a VO2 max test in Miami? → "vo2 max test miami", "near me"
2. How much does a VO2 max test cost in Miami? → "vo2 max test cost" (state transparent
   direct-pay pricing; exact number pending clinic confirmation)
3. What does a VO2 max test measure? → definitional PAA
4. How accurate is a VO2 max test vs. my Apple Watch or Garmin? → wearable-comparison PAA
5. How long does the test take at your Brickell clinic? → logistics
6. How should I prepare for a VO2 max test? → prep PAA
7. Do I need to be fit to take a VO2 max test? / Is it safe? → objection handling,
   physician supervision
8. What is a good VO2 max for my age? → high-volume PAA (9,900 /mo head term); answer
   briefly with percentile framing, defer depth to the future pillar guide
9. Can I do a VO2 max test and a DEXA scan on the same visit? → cross-sell, links
   `/fl/miami/dexascan/`
10. How often should I re-test my VO2 max? → cadence (every 4–6 months on a protocol)

Each answer 40–90 words, includes the Brickell address or phone where natural, written
to be quotable by AI Overviews (the exact-term SERP already shows one).

---

## 7. Internal linking (inbound)

- `src/pages/fl/index.astro` — add VO2 max entry to the `FL_SERVICES` array
  (name/desc/href/cta, matching existing entries) **and** add the link under the Miami
  city card next to the existing DEXA/PRP links (~line 240).
- `src/pages/fl/miami/dexascan.astro` — add/adjust a `useCases` card or FAQ cross-link
  ("Pair your DEXA with a VO2 max test →") so the two testing pages link both ways.
- `src/pages/fl/miami/peptide-therapy.astro` and `stem-cell-therapy.astro` — one
  contextual link each where testing/verification is mentioned.
- Anchor text variants: "VO2 max testing in Miami", "Miami VO2 max test", "VO2 max test
  at our Brickell clinic" — vary, never sitewide-identical.

Off-page (not code, but required for the "near me" win): add "VO2 Max Testing" as a
service on the Strong Health Miami Google Business Profile so the page can feed the
local pack that shows on "vo2 max test near me".

---

## 8. E-E-A-T & compliance

- Author/reviewer bylines + `medicalWebPageSchema.lastReviewed`, consistent with the
  other Miami pages.
- Claims discipline: VO2 max as a mortality/longevity predictor is well-supported
  (cite the way the DEXA page frames accuracy claims — measured, no disease-treatment
  promises). No guarantees of performance outcomes.
- Confirm with the clinic before build: exact pricing, whether RMR testing is offered,
  treadmill vs. bike ergometer availability, and true visit duration. Placeholder
  numbers must not ship (see the D4 remediation note pattern in `dexascan.astro`).

---

## 9. Follow-ups (separate efforts, not this page)

1. **National pillar:** `/vo2-max-test/` educational guide targeting "vo2 max test"
   (3,700 /mo), "what is a good vo2 max" (9,900 /mo), "how to improve vo2 max"
   (13,000 /mo) — mirrors the `/dexa-scan/` (pillar) ↔ `/fl/miami/dexascan/` (local)
   relationship. The city page links up to it once it exists.
2. **Neighborhood child pages:** `/fl/miami/vo2-max-testing/{neighborhood}/` via the
   same config-driven pattern as `dexaNeighborhoods.ts` + `[neighborhood].astro` —
   only after the city page indexes and shows traction.
3. Add the service to other city pages' related-service blocks if/when offered outside
   Miami.

---

## 10. Acceptance checklist

- [ ] Page builds at `/fl/miami/vo2-max-testing/` with trailing-slash canonical
- [ ] Title ≤ 60 chars, description ≤ 155 chars, H1 contains "VO2 Max Testing in Miami"
- [ ] All 5 JSON-LD blocks validate (Rich Results test): MedicalBusiness,
      MedicalWebPage, Article, FAQPage, BreadcrumbList
- [ ] NAP + hours read from `miamiClinic.ts` only — zero hardcoded phone/address
- [ ] SMS + tel CTAs use `+17542636026` with `?&body=` form; `trackLead` placements
      `hero` and `final_cta`
- [ ] 10 FAQs render inside `faqPageSchema`
- [ ] Inbound links live from `/fl/` and `/fl/miami/dexascan/`
- [ ] No links to non-existent neighborhood child pages
- [ ] Pricing/protocol copy confirmed by clinic before publish
