import { MIAMI_BRICKELL_CLINIC } from "../miamiClinic";

/**
 * Config for a single neighborhood DEXA landing page
 * (`/{statePrefix}/{citySlug}/dexascan/{slug}/`).
 *
 * Every field that renders as visible copy must be genuinely specific to the
 * neighborhood (route, transit, landmarks, FAQs, testimonial) — the layout
 * supplies the shared DEXA education sections, so the config is what keeps
 * these pages from being doorway pages.
 */
export interface DexaNeighborhoodFaq {
  question: string;
  answer: string;
}

export interface DexaNeighborhoodTestimonial {
  name: string;
  text: string;
}

export interface DexaNeighborhoodConfig {
  slug: string;
  name: string;
  /** ZIP codes the page claims to serve; also emitted as schema areaServed. */
  zips: string[];
  /** Approximate drive time from the neighborhood to the clinic, e.g. "12 min". */
  driveTime: string;
  /** Approximate distance, e.g. "4 miles". */
  distance: string;
  /** Driving route copy, written from the neighborhood to the clinic. */
  route: string;
  /** Transit option copy (Metrorail / Metromover / trolley), or best alternative. */
  transit: string;
  /** One neighborhood-specific practical tip (timing, traffic, combining trips). */
  localTip: string;
  /** Named local anchors used in visible copy ("5 minutes from Merrick Park"). */
  landmarks: string[];
  /** Hero paragraph — localized, replaces the citywide hero copy. */
  intro: string;
  /** Localized paragraph for the "why DEXA" section. */
  whyLocal: string;
  /** Neighborhood-specific FAQs, appended to the shared parameterized set. */
  faqs: DexaNeighborhoodFaq[];
  testimonial: DexaNeighborhoodTestimonial;
  /** Slugs of adjacent neighborhoods to cross-link. */
  nearby: string[];
}

/** Physical-clinic facts the neighborhood layout needs; structurally satisfied
 *  by MIAMI_BRICKELL_CLINIC and by future city clinic objects. */
export interface DexaClinicInfo {
  readonly name: string;
  readonly streetAddress: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly phone: string;
  readonly phoneTel: string;
  readonly hours: string;
  readonly hoursWeekday: { readonly opens: string; readonly closes: string };
  readonly hoursSaturday: { readonly opens: string; readonly closes: string };
  readonly lat: number;
  readonly lng: number;
  readonly area: string;
  readonly schemaId: string;
}

/**
 * City-level wrapper so the neighborhood template can be replicated for other
 * metros (validated in Miami first, then expanded) by adding one new config +
 * one new dynamic route file — the layout itself stays city-agnostic.
 */
export interface DexaNeighborhoodCity {
  cityName: string;
  citySlug: string;
  statePrefix: string;
  stateAbbr: string;
  stateName: string;
  /** State hub page, if the state has one (e.g. "/fl/"). */
  stateHubPath?: string;
  /** The city DEXA hub these pages nest under, e.g. "/fl/miami/dexascan/". */
  hubPath: string;
  /** City peptide-therapy page for the use-case cross-link. */
  peptidePath?: string;
  /** Short label for the clinic's own neighborhood, e.g. "Brickell". */
  clinicArea: string;
  clinic: DexaClinicInfo;
  neighborhoods: DexaNeighborhoodConfig[];
}

export const MIAMI_DEXA_NEIGHBORHOODS: DexaNeighborhoodConfig[] = [
  {
    slug: "brickell",
    name: "Brickell",
    zips: ["33129", "33130", "33131"],
    driveTime: "2 min",
    distance: "0.2 miles",
    route:
      "We're on Brickell Plaza at SE 10th Street, one block west of Brickell Avenue — a 5-minute walk from Brickell City Centre and most of the Brickell office towers. If you're driving from south Brickell, head north on Brickell Avenue and turn left on SE 10th Street.",
    transit:
      "Metromover: Tenth Street/Promenade station is 2 blocks away. Metrorail: Brickell station is a 6-minute walk (0.3 mi) via SW 10th Street.",
    localTip:
      "Most Brickell patients book a lunch-hour slot — check-in to walk-out is usually under 30 minutes, so you can be back at your desk within the hour.",
    landmarks: ["Brickell City Centre", "Mary Brickell Village", "Simpson Park", "Brickell Key"],
    intro:
      "Strong Health's DEXA clinic is in the heart of Brickell — at 1000 Brickell Plaza, a short walk from Brickell City Centre, Mary Brickell Village, and the office towers along Brickell Avenue. No causeway, no highway: if you live or work in Brickell, this is your neighborhood scan.",
    whyLocal:
      "Brickell runs on data — and your body composition deserves better numbers than a gym InBody scale. Residents of the condo towers along Brickell Bay Drive and workers from the financial district walk in, scan in 15 minutes, and get research-grade lean mass, body fat, and bone density numbers the same week.",
    faqs: [
      {
        question: "Is there a DEXA scan clinic in Brickell?",
        answer:
          "Yes — Strong Health's Miami DEXA clinic is located in Brickell itself, at 1000 Brickell Plaza (SE 10th Street), Miami, FL 33131. It's a 5-minute walk from Brickell City Centre and 2 blocks from the Tenth Street/Promenade Metromover station. Walk-ins are welcome and same-week appointments are typically available.",
      },
      {
        question: "Can I get a DEXA scan on my lunch break in Brickell?",
        answer:
          "Yes. The scan itself takes 10–15 minutes and the full visit is about 30 minutes door to door. Patients from the Brickell office towers routinely book late-morning or lunch-hour slots and are back at work within the hour. Wear metal-free clothing to work that day and you won't even need to change.",
      },
      {
        question: "Where do I park for a DEXA scan at 1000 Brickell Plaza?",
        answer:
          "Validated parking is available at the Brickell Plaza garage attached to the building. If you're walking from Brickell City Centre, Mary Brickell Village, or the Metromover, no parking is needed — most Brickell patients arrive on foot.",
      },
    ],
    testimonial: {
      name: "Carlos M.",
      text: "I've been on TRT for eight months. The scale only moved 6 lbs but my DEXA showed I gained 14 lbs of lean mass and lost 20 lbs of fat. I would have given up without that data. The clinic is five minutes from my condo on Brickell Bay Drive.",
    },
    nearby: ["downtown", "edgewater", "coconut-grove"],
  },
  {
    slug: "downtown",
    name: "Downtown Miami",
    zips: ["33128", "33131", "33132"],
    driveTime: "6 min",
    distance: "1.5 miles",
    route:
      "From Flagler Street or Biscayne Boulevard, head south on SE 2nd Avenue across the Miami River onto Brickell Avenue, then turn right on SE 10th Street. The clinic is at 1000 Brickell Plaza, one block in.",
    transit:
      "Metromover is the easiest option: ride the Brickell Loop from Bayfront Park or Government Center directly to Tenth Street/Promenade — the clinic is 2 blocks from the station.",
    localTip:
      "If you're near the courthouse or Government Center, the Metromover beats driving — you'll skip the Brickell Avenue bridge openings that can add 10 minutes at rush hour.",
    landmarks: ["Bayside Marketplace", "Kaseya Center", "Flagler Street", "Bayfront Park"],
    intro:
      "Working near Flagler Street, Government Center, or the arena? Strong Health's DEXA clinic is one Metromover loop away in Brickell — 6 minutes by car, or a direct ride to the Tenth Street/Promenade station. Gold-standard body composition without leaving the urban core.",
    whyLocal:
      "Downtown Miami professionals track everything — billables, markets, macros. A DEXA scan closes the loop on the one dataset that matters most: what your body is actually made of. Skip the guesswork of gym scales and get clinical numbers a bridge-crossing away from your office.",
    faqs: [
      {
        question: "Where can I get a DEXA scan near Downtown Miami?",
        answer:
          "The closest DEXA clinic to Downtown Miami is Strong Health's Brickell location at 1000 Brickell Plaza — about 1.5 miles from Flagler Street, 6 minutes by car or a direct Metromover ride to Tenth Street/Promenade. Same-week appointments are typically available and walk-ins are welcome.",
      },
      {
        question: "Can I take the Metromover to my DEXA scan from Downtown?",
        answer:
          "Yes. Board the Metromover at Bayfront Park, First Street, or Government Center and ride the Brickell Loop to Tenth Street/Promenade. The clinic is a 2-block walk from the station, making the total trip from most of Downtown about 15 minutes — often faster than driving and parking.",
      },
      {
        question: "How long will a DEXA scan visit take if I work Downtown?",
        answer:
          "Plan about 30 minutes at the clinic — check-in, a 10–15 minute scan, and a brief review of highlights. With the Metromover ride each way, most Downtown patients are away from the office for under an hour. Your full PDF report is emailed within 24 hours.",
      },
    ],
    testimonial: {
      name: "Denise R.",
      text: "I work at a firm on Flagler and took the Metromover down on a Thursday lunch. Scanned, back at my desk by 1:15, full report in my inbox the next morning. My visceral fat number was the wake-up call the bathroom scale never gave me.",
    },
    nearby: ["brickell", "edgewater", "little-havana"],
  },
  {
    slug: "wynwood",
    name: "Wynwood",
    zips: ["33127"],
    driveTime: "12 min",
    distance: "3.5 miles",
    route:
      "From the Wynwood Arts District, take NW 2nd Avenue south to NE 5th Street, then Biscayne Boulevard south across the river to Brickell Avenue; turn right on SE 10th Street to 1000 Brickell Plaza. I-95 south to exit 1A works too when Biscayne is jammed.",
    transit:
      "Ride the Miami Trolley (Wynwood route) or a quick rideshare to Brickell; from the Adrienne Arsht Metromover station it's a direct ride to Tenth Street/Promenade, 2 blocks from the clinic.",
    localTip:
      "Weekday mornings are the move — Wynwood-to-Brickell traffic is light before 11 AM, and you'll beat both the gallery crowds and the lunch rush.",
    landmarks: ["Wynwood Walls", "NW 2nd Avenue arts district", "Wynwood Marketplace"],
    intro:
      "Wynwood takes fitness seriously — the neighborhood is packed with CrossFit boxes, climbing gyms, and studios. Strong Health's Brickell DEXA clinic is 12 minutes down Biscayne, giving Wynwood athletes the same body composition data pro sports teams use.",
    whyLocal:
      "If you train in Wynwood, you've probably stood on an InBody scale at your gym and gotten three different body fat numbers in a week. DEXA ends that: 1–2% precision, limb-by-limb lean mass, and visceral fat — real numbers you can program against.",
    faqs: [
      {
        question: "Is there a DEXA scan near Wynwood?",
        answer:
          "The nearest DEXA clinic to Wynwood is Strong Health's Brickell location at 1000 Brickell Plaza — about 3.5 miles south, a 12-minute drive down Biscayne Boulevard or I-95. Same-week appointments are typically available, and Saturday morning walk-ins work well for Wynwood's gym crowd.",
      },
      {
        question: "Should I scan before or after training at my Wynwood gym?",
        answer:
          "Scan before you train, ideally in a consistent state — morning, normally hydrated, no intense exercise the night before. A hard WOD before your scan can shift hydration enough to nudge lean-mass readings. For trend tracking, repeat the same conditions each visit and use the same scanner.",
      },
      {
        question: "How often do Wynwood athletes typically re-scan?",
        answer:
          "Every 3–6 months on an active recomposition, strength, or peptide protocol. That's enough time for real lean-mass changes to register outside the scan's 1–2% margin of error. Scanning more often than every 90 days rarely shows meaningful change.",
      },
    ],
    testimonial: {
      name: "Tyler B.",
      text: "My box in Wynwood has an InBody and it told me a different number every Monday. One DEXA at Strong Health settled it — 16.8% body fat, 2 lbs more muscle in my right leg from an old injury compensation. Now I actually know what to fix.",
    },
    nearby: ["midtown", "design-district", "edgewater"],
  },
  {
    slug: "midtown",
    name: "Midtown Miami",
    zips: ["33137"],
    driveTime: "13 min",
    distance: "4 miles",
    route:
      "From The Shops at Midtown Miami, take North Miami Avenue or Biscayne Boulevard south, cross the river onto Brickell Avenue, and turn right on SE 10th Street to 1000 Brickell Plaza.",
    transit:
      "A rideshare down Biscayne takes about 13 minutes; or catch the Metromover at Adrienne Arsht (School Board) and ride directly to Tenth Street/Promenade, 2 blocks from the clinic.",
    localTip:
      "Pair your scan with errands: patients from the Midtown towers often book 9 AM slots and are back at The Shops at Midtown before the stores open.",
    landmarks: ["The Shops at Midtown Miami", "Midtown 5 towers", "Wynwood border at NW 29th St"],
    intro:
      "Midtown Miami residents are 13 minutes down Biscayne from Strong Health's Brickell DEXA clinic. Whether you train at the neighborhood's boutique studios or you're tracking a GLP-1 or TRT protocol, this is the closest clinical-grade body composition scan to Midtown.",
    whyLocal:
      "Between Equinox-style studios and the Wynwood gym scene next door, Midtown is full of people training hard on estimated numbers. A DEXA scan replaces estimates with limb-level lean mass, regional fat, visceral fat, and bone density — measured, not guessed.",
    faqs: [
      {
        question: "Where's the closest DEXA scan to Midtown Miami?",
        answer:
          "Strong Health's Brickell clinic at 1000 Brickell Plaza is the closest DEXA location to Midtown — about 4 miles, a 13-minute drive down Biscayne Boulevard or North Miami Avenue. Walk-ins are welcome and same-week appointments are typically available.",
      },
      {
        question: "Can I track my GLP-1 progress with DEXA scans from Midtown?",
        answer:
          "Yes — that's one of the most common reasons Midtown patients book. On semaglutide or tirzepatide, a DEXA every 3–6 months verifies you're losing fat rather than muscle, which total scale weight can't tell you. Many patients pair the scan with a physician consult to adjust protein and training targets.",
      },
      {
        question: "Is parking easy for Midtown patients driving to the scan?",
        answer:
          "Yes — validated parking is available at the Brickell Plaza garage attached to the clinic, so the 13-minute drive from Midtown doesn't end with a parking hunt. Off-peak (mid-morning or early afternoon) the door-to-door round trip is usually under an hour.",
      },
    ],
    testimonial: {
      name: "Priya S.",
      text: "Six months of tirzepatide and I was terrified I'd lost muscle. The DEXA showed 91% of my loss was fat. I drove down from Midtown on a Saturday morning, parked in the garage, and was home before brunch.",
    },
    nearby: ["wynwood", "design-district", "edgewater"],
  },
  {
    slug: "edgewater",
    name: "Edgewater",
    zips: ["33132", "33137"],
    driveTime: "10 min",
    distance: "3 miles",
    route:
      "Head south on Biscayne Boulevard from Margaret Pace Park, continue across the river onto Brickell Avenue, then turn right on SE 10th Street to 1000 Brickell Plaza. It's a straight shot down one road.",
    transit:
      "From the Adrienne Arsht Center Metromover station (Omni Loop), transfer to the Brickell Loop and ride to Tenth Street/Promenade — 2 blocks from the clinic. Total trip from most of Edgewater: about 20 minutes.",
    localTip:
      "Edgewater's Biscayne corridor moves fast outside rush hour — a mid-morning appointment means a 10-minute drive each way and a garage spot waiting.",
    landmarks: ["Margaret Pace Park", "Biscayne Boulevard corridor", "Paraiso district"],
    intro:
      "From the condo towers along Margaret Pace Park and the Paraiso district, Strong Health's Brickell DEXA clinic is a 10-minute straight shot down Biscayne Boulevard. Clinical body composition — lean mass, body fat, visceral fat, bone density — without crossing a single causeway.",
    whyLocal:
      "Edgewater's waterfront running paths and tower gyms keep the neighborhood moving, but treadmill miles don't tell you what you're made of. A 15-minute DEXA scan does — with the precision to show whether your training and nutrition are actually changing your body.",
    faqs: [
      {
        question: "How far is the DEXA clinic from Edgewater?",
        answer:
          "About 3 miles — a 10-minute drive straight down Biscayne Boulevard from the Margaret Pace Park area to 1000 Brickell Plaza in Brickell. By Metromover, ride from Adrienne Arsht Center to Tenth Street/Promenade in about 20 minutes door to door.",
      },
      {
        question: "Do Edgewater patients need a referral for a body composition scan?",
        answer:
          "No referral is needed for a body composition DEXA scan. Book online or by phone, walk in, scan, and get your full PDF report within 24 hours. If you're on a Strong Health TRT, peptide, or weight-loss protocol, your physician folds the results into your treatment plan.",
      },
      {
        question: "What's the best first scan for someone new to tracking, from Edgewater?",
        answer:
          "A baseline body composition DEXA. It captures your starting lean mass, regional body fat, visceral fat, and bone density in one 15-minute scan. From there, re-scan every 3–6 months — the trend between scans, on the same machine, is where the insight lives.",
      },
    ],
    testimonial: {
      name: "Jonas K.",
      text: "I run the Margaret Pace loop every morning and thought I was lean. DEXA said 24% body fat with most of it visceral. Eight months later I'm at 17% and my bone density is up. Ten minutes down Biscayne — no excuse not to know.",
    },
    nearby: ["downtown", "midtown", "wynwood"],
  },
  {
    slug: "design-district",
    name: "Design District",
    zips: ["33137"],
    driveTime: "14 min",
    distance: "4.5 miles",
    route:
      "From Palm Court, take NE 2nd Avenue south to NE 36th Street, join Biscayne Boulevard southbound, continue onto Brickell Avenue across the river, and turn right on SE 10th Street to 1000 Brickell Plaza.",
    transit:
      "Rideshare is simplest (about 14 minutes down Biscayne). Transit riders can catch the Metromover at Adrienne Arsht and ride the Brickell Loop to Tenth Street/Promenade, 2 blocks from the clinic.",
    localTip:
      "Weekday mornings before the shops open (most open at 11 AM) are the quietest window — scan at 9, coffee in Palm Court by 10.",
    landmarks: ["Palm Court", "ICA Miami", "Buena Vista"],
    intro:
      "The Design District curates everything carefully — your health data should get the same treatment. Strong Health's Brickell DEXA clinic, 14 minutes south on Biscayne, delivers the gold-standard body composition scan: lean mass, regional fat, visceral fat, and bone density in one 15-minute visit.",
    whyLocal:
      "Design District and Buena Vista residents already invest in longevity — trainers, nutrition, recovery. DEXA is the measurement layer that shows whether that investment is working, with 1–2% precision no boutique gym scale can match.",
    faqs: [
      {
        question: "Where do Design District residents go for a DEXA scan?",
        answer:
          "The closest clinical DEXA scan to the Design District is Strong Health's Brickell clinic at 1000 Brickell Plaza — about 4.5 miles, a 14-minute drive down Biscayne Boulevard. Same-week appointments are typical, and Saturday morning walk-ins are available.",
      },
      {
        question: "Is a DEXA scan worth it if I already work with a personal trainer?",
        answer:
          "Especially then. A baseline DEXA gives your trainer limb-by-limb lean mass, regional fat distribution, and left-right symmetry data to program against, and follow-up scans every 3–6 months prove whether the programming works. Many Design District patients bring their PDF report straight to their trainer.",
      },
      {
        question: "Can I combine my scan with a physician consultation?",
        answer:
          "Yes. Every scan includes a brief review of highlights, and you can add an optional 20-minute physician consultation to set baselines, interpret visceral fat and bone density scores, and plan a re-scan cadence. Results are also reviewed via telehealth if you prefer.",
      },
    ],
    testimonial: {
      name: "Isabelle F.",
      text: "My trainer in Buena Vista kept asking for real numbers instead of my smart-scale readings. One DEXA later, we rebuilt my whole program around an 8-pound lean mass gap between my legs. The drive from the District took twelve minutes.",
    },
    nearby: ["midtown", "wynwood", "edgewater"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    zips: ["33114", "33134", "33146"],
    driveTime: "15 min",
    distance: "6 miles",
    route:
      "From Miracle Mile, take Coral Way east about 4 miles, turn right on SW 3rd Avenue toward Brickell, then left on SW 10th Street to 1000 Brickell Plaza. From Merrick Park, US-1 north to SW 13th Street is usually faster.",
    transit:
      "Metrorail is a direct ride: board at Douglas Road or University station, exit at Brickell station, and walk 6 minutes to the clinic. About 25 minutes door to door from most of the Gables.",
    localTip:
      "Skip US-1 between 4 and 7 PM — take Coral Way east instead, or ride Metrorail from Douglas Road and avoid the traffic entirely.",
    landmarks: ["Miracle Mile", "Shops at Merrick Park", "Biltmore Hotel", "University of Miami"],
    intro:
      "From Miracle Mile or Merrick Park, Strong Health's Brickell DEXA clinic is 15 minutes east — or one direct Metrorail ride from Douglas Road station. Coral Gables patients get the clinical gold standard for body composition: lean mass, body fat, visceral fat, and bone density, physician-supervised.",
    whyLocal:
      "Coral Gables patients tend to think long-term — estate plans, education, health span. Bone density is where DEXA earns its keep here: the same 15-minute scan that maps your body composition also screens hip and spine density, catching osteopenia years before it becomes osteoporosis.",
    faqs: [
      {
        question: "Is there a DEXA scan in Coral Gables?",
        answer:
          "The nearest walk-in DEXA clinic to Coral Gables is Strong Health's Brickell location at 1000 Brickell Plaza — about 6 miles east via Coral Way or US-1, a 15-minute drive from Miracle Mile, or a direct Metrorail ride from Douglas Road station to Brickell. Same-week appointments are typically available.",
      },
      {
        question: "Does the DEXA scan include bone density for osteoporosis screening?",
        answer:
          "Yes. Every Strong Health DEXA includes bone mineral density with T-scores and Z-scores for hip and spine — the same measurement used for osteoporosis screening. Many Coral Gables patients in their 50s and 60s book specifically for this, and bone-density scans may be covered by insurance for eligible patients.",
      },
      {
        question: "Can University of Miami students and staff get scanned?",
        answer:
          "Absolutely — the clinic is one Metrorail stop chain away (University station to Brickell station, no transfer). Student athletes use DEXA for limb-level lean mass and symmetry data; no referral is needed for a body composition scan, and direct-pay pricing keeps it under $200 for most patients.",
      },
    ],
    testimonial: {
      name: "Andrea P.",
      text: "I was on tirzepatide and worried I was losing muscle. Strong Health's DEXA confirmed I'd kept almost all my lean mass while losing 32 lbs of fat. I ride Metrorail from Douglas Road — easier than parking anywhere near the Mile.",
    },
    nearby: ["coconut-grove", "south-miami", "little-havana"],
  },
  {
    slug: "coconut-grove",
    name: "Coconut Grove",
    zips: ["33133"],
    driveTime: "12 min",
    distance: "4 miles",
    route:
      "From CocoWalk, take Main Highway/McFarlane Road to South Bayshore Drive, follow it north past Vizcaya onto Brickell Avenue, then turn left on SE 10th Street to 1000 Brickell Plaza. A scenic 12 minutes along the bay.",
    transit:
      "Metrorail from Coconut Grove station to Brickell station is one direct ride (about 8 minutes), then a 6-minute walk to the clinic.",
    localTip:
      "The Bayshore Drive route past Vizcaya is both the prettiest and usually the fastest — save US-1 for days when a Grove event closes Bayshore.",
    landmarks: ["CocoWalk", "Vizcaya Museum & Gardens", "Peacock Park", "Dinner Key Marina"],
    intro:
      "Coconut Grove lives outdoors — sailing off Dinner Key, running Kennedy Park, cycling Old Cutler. Strong Health's Brickell DEXA clinic is 12 minutes up Bayshore Drive, putting research-grade body composition data within a bayfront drive of the Grove.",
    whyLocal:
      "Grove athletes log serious volume, but endurance training can quietly cost you muscle and bone if nutrition lags. DEXA catches both: limb-level lean mass to spot losses, and hip/spine bone density that runners and cyclists in particular should track yearly.",
    faqs: [
      {
        question: "How far is the DEXA clinic from Coconut Grove?",
        answer:
          "About 4 miles — a 12-minute drive up South Bayshore Drive from CocoWalk to 1000 Brickell Plaza in Brickell, or one direct Metrorail ride from Coconut Grove station to Brickell station plus a 6-minute walk. Walk-ins are welcome and same-week appointments are typical.",
      },
      {
        question: "Why should Grove runners and cyclists get a DEXA scan?",
        answer:
          "Two reasons: lean mass and bone density. High-volume endurance training with inadequate protein can erode muscle, and low-impact sports like cycling don't load bone — DEXA tracks both with clinical precision. A yearly scan catches downward trends while they're still easy to reverse.",
      },
      {
        question: "Can I book a Saturday scan after a morning at the Grove farmers market?",
        answer:
          "Yes — the Brickell clinic accepts Saturday walk-ins from 9 AM to 1 PM. It's a 12-minute drive up Bayshore Drive, so plenty of Grove patients pair a Saturday market or Kennedy Park workout with their scan. Just avoid intense exercise right before scanning for the cleanest numbers.",
      },
    ],
    testimonial: {
      name: "Marco T.",
      text: "I've used InBody scales at my gym for years and the numbers were all over the place. The DEXA report I got from Strong Health was on a different level — broken down by arm, leg, trunk, plus visceral fat and bone density. Twelve minutes up Bayshore from the Grove.",
    },
    nearby: ["coral-gables", "brickell", "south-miami"],
  },
  {
    slug: "little-havana",
    name: "Little Havana",
    zips: ["33125", "33135"],
    driveTime: "8 min",
    distance: "2.5 miles",
    route:
      "From Calle Ocho (SW 8th Street), drive east about 2 miles, continue past I-95 into Brickell, turn right on SW 1st Avenue and left on SW 10th Street to 1000 Brickell Plaza.",
    transit:
      "The Route 8 Metrobus runs straight down SW 8th Street into Brickell; exit at Brickell Avenue and walk 3 blocks south. From the west end, Metrorail from Culmer or a quick rideshare works too.",
    localTip:
      "Calle Ocho traffic builds after 5 PM and on festival weekends — a weekday morning scan is an easy 8-minute hop east.",
    landmarks: ["Calle Ocho", "Domino Park (Máximo Gómez)", "Ball & Chain", "Cuban Memorial Boulevard"],
    intro:
      "Little Havana is 8 minutes from Strong Health's Brickell DEXA clinic — straight east down Calle Ocho. One 15-minute scan measures lean muscle, body fat, visceral fat, and bone density with clinical precision, no referral needed.",
    whyLocal:
      "Type 2 diabetes and heart disease run through too many Little Havana families, and visceral fat — the fat around your organs — is the earliest measurable warning sign. A DEXA scan isolates it precisely, so you can act on a number instead of a family history.",
    faqs: [
      {
        question: "Where can I get a DEXA scan near Little Havana?",
        answer:
          "Strong Health's Brickell clinic at 1000 Brickell Plaza is about 2.5 miles east of Domino Park — an 8-minute drive down SW 8th Street, or a Route 8 Metrobus ride into Brickell. Walk-ins are welcome, and direct-pay pricing keeps body composition scans under $200 for most patients.",
      },
      {
        question: "Why does visceral fat matter for Little Havana patients?",
        answer:
          "Visceral fat — fat stored around the organs — is the strongest body-composition predictor of type 2 diabetes and cardiovascular risk, both of which disproportionately affect Cuban-American and broader Hispanic communities. DEXA measures it directly, separately from the subcutaneous fat you can pinch, so you and your physician can track real metabolic risk.",
      },
      {
        question: "Do I need insurance for a DEXA scan?",
        answer:
          "No. Body composition DEXA scans at Strong Health are direct-pay with transparent pricing — no insurance, referral, or prior authorization needed. Most patients pay under $200 per scan. Bone-density scans for osteoporosis screening may be covered by insurance for eligible patients.",
      },
    ],
    testimonial: {
      name: "Rafael G.",
      text: "My father and both uncles are diabetic. My DEXA showed my visceral fat was already in the warning zone at 34 — nobody could see it, I'm not heavy. A year of work later it's down 40%. Eight minutes from my place off Calle Ocho. Best money I've spent on my health.",
    },
    nearby: ["brickell", "downtown", "coral-gables"],
  },
  {
    slug: "miami-beach",
    name: "Miami Beach",
    zips: ["33139", "33140", "33141"],
    driveTime: "15 min",
    distance: "5.5 miles",
    route:
      "From South Beach, take 5th Street to the MacArthur Causeway (I-395), merge onto I-95 south, exit at 1A (Brickell), and follow SE 10th Street to 1000 Brickell Plaza. From Mid-Beach or North Beach, the Julia Tuttle Causeway (I-195) to I-95 south is usually faster.",
    transit:
      "The Miami Beach Airport Flyer or Route 119/120 buses connect to Downtown; transfer to the Metromover Brickell Loop and exit at Tenth Street/Promenade, 2 blocks from the clinic.",
    localTip:
      "Causeway traffic peaks 8–10 AM and 4–7 PM heading off the Beach — an 11 AM or early-afternoon appointment usually means a smooth 15-minute run over MacArthur.",
    landmarks: ["Ocean Drive", "Lincoln Road", "Flamingo Park", "Mount Sinai Medical Center"],
    intro:
      "Miami Beach bodies are built in Flamingo Park, Muscle Beach, and the studios off Lincoln Road — but the mirror can't measure visceral fat or bone density. Strong Health's Brickell DEXA clinic is one causeway away: 15 minutes over MacArthur for the most accurate body composition scan in South Florida.",
    whyLocal:
      "Beach physiques deserve better data than mirror checks and gym scales. DEXA gives you limb-by-limb lean mass, regional body fat, and visceral fat with 1–2% precision — the difference between looking lean and verifiably being lean.",
    faqs: [
      {
        question: "Is there a DEXA scan on Miami Beach?",
        answer:
          "The closest walk-in DEXA clinic to Miami Beach is Strong Health's Brickell location at 1000 Brickell Plaza — a 15-minute drive over the MacArthur Causeway from South Beach, or via Julia Tuttle from Mid-Beach. Same-week appointments are typical, with validated parking at the Brickell Plaza garage.",
      },
      {
        question: "When's the best time to drive from the Beach for a scan?",
        answer:
          "Late morning or early afternoon. Causeway traffic off the Beach peaks 8–10 AM and 4–7 PM; an 11 AM appointment usually means 15 minutes door to door over MacArthur. Saturday mornings (walk-ins 9 AM–1 PM) are also light on the causeways.",
      },
      {
        question: "Can DEXA help with contest prep or a photoshoot cut?",
        answer:
          "Yes — it's the standard tool for it. DEXA tracks exactly how much of your cut is fat versus muscle, region by region, so you can adjust calories and training before you lose hard-won lean mass. Physique competitors typically scan at the start of prep, mid-prep, and peak week.",
      },
    ],
    testimonial: {
      name: "Sofia L.",
      text: "Training for my first bikini competition out of a South Beach gym, I was cutting blind. Two DEXA scans eight weeks apart showed I'd dropped 9 lbs of fat and kept every ounce of muscle. Fifteen minutes over the causeway, worth every one.",
    },
    nearby: ["edgewater", "downtown", "brickell"],
  },
  {
    slug: "key-biscayne",
    name: "Key Biscayne",
    zips: ["33149"],
    driveTime: "16 min",
    distance: "7 miles",
    route:
      "Take Crandon Boulevard north off the Key, cross the Rickenbacker Causeway, and merge onto Brickell Avenue northbound; turn left on SE 10th Street to 1000 Brickell Plaza. The clinic is the first neighborhood you reach off the causeway.",
    transit:
      "Route 102 (B) Metrobus runs from the Key across the Rickenbacker to Brickell station, a 6-minute walk from the clinic — though most Key Biscayne patients drive.",
    localTip:
      "Combine the trip with your Rickenbacker ride — cyclists coming off the bridge loop are 5 minutes from the clinic, and Saturday walk-in hours (9 AM–1 PM) fit right after a morning ride.",
    landmarks: ["Crandon Park", "Bill Baggs Cape Florida State Park", "Rickenbacker Causeway", "Key Biscayne Village Green"],
    intro:
      "Key Biscayne is one causeway from clinical-grade body composition: Strong Health's Brickell DEXA clinic sits just off the Rickenbacker exit, 16 minutes from the Village Green. Lean mass, body fat, visceral fat, and bone density — measured, not estimated.",
    whyLocal:
      "The Key's cyclists, paddlers, and tennis players train year-round, and Brickell is literally the first stop off the island. A DEXA baseline plus a yearly re-scan tracks whether all those Rickenbacker miles are building the body they should — including the bone density cycling alone won't protect.",
    faqs: [
      {
        question: "How far is the DEXA clinic from Key Biscayne?",
        answer:
          "About 7 miles — 16 minutes via Crandon Boulevard and the Rickenbacker Causeway to 1000 Brickell Plaza, the first exit area off the causeway. It's the closest clinical DEXA scan to the Key, with validated parking at the Brickell Plaza garage.",
      },
      {
        question: "Why do Key Biscayne cyclists need bone density scans?",
        answer:
          "Cycling is non-impact, so it builds fitness without loading bone — studies consistently show competitive cyclists have lower bone density than runners. If the Rickenbacker loop is your main training, a yearly DEXA tracks hip and spine T-scores so you can add resistance training before low density becomes osteopenia.",
      },
      {
        question: "Can my family get scanned together?",
        answer:
          "Yes — back-to-back appointments are easy to book, and each scan takes only 10–15 minutes. Key Biscayne families often book two or three consecutive Saturday slots. DEXA is FDA-approved and ultra-low radiation (about 1/10th of a chest X-ray), appropriate for adults of all ages.",
      },
    ],
    testimonial: {
      name: "Felipe A.",
      text: "I ride the Rickenbacker four mornings a week and figured I was in perfect shape. DEXA said otherwise — great body fat, but my hip T-score was borderline. Two years of lifting later it's back in the normal range. The clinic is literally on my way home off the bridge.",
    },
    nearby: ["brickell", "downtown", "coconut-grove"],
  },
  {
    slug: "doral",
    name: "Doral",
    zips: ["33122", "33166", "33172", "33178"],
    driveTime: "22 min",
    distance: "13 miles",
    route:
      "Take NW 41st Street or NW 25th Street east to the Dolphin Expressway (SR-836) eastbound, follow 836 to I-95 south, exit at 1A (Brickell), and continue to SE 10th Street and 1000 Brickell Plaza.",
    transit:
      "Drive or rideshare is the practical option from Doral. Transit riders can take Route 36 or the Doral Trolley to Metrorail (Palmetto station), then ride the Green Line direct to Brickell station.",
    localTip:
      "836 eastbound is smooth outside 7–9 AM — Doral patients who book 10 AM slots consistently make it in 22 minutes. Pair the trip with any Brickell errand to make the drive count double.",
    landmarks: ["CityPlace Doral", "Downtown Doral", "Trump National Doral", "Doral Central Park"],
    intro:
      "Doral trains hard — the neighborhood's gyms, golf, and running clubs are packed. Strong Health's Brickell DEXA clinic is a straight 836 run east: 22 minutes to the most accurate body composition scan in Miami, with same-week appointments and validated parking.",
    whyLocal:
      "Doral's fitness culture runs on numbers — pace, handicap, PRs. DEXA adds the number that underlies them all: exactly how much lean muscle, fat, and bone you're carrying, limb by limb, with 1–2% clinical precision.",
    faqs: [
      {
        question: "Is there a DEXA scan in Doral?",
        answer:
          "The nearest walk-in DEXA clinic to Doral is Strong Health's Brickell location at 1000 Brickell Plaza — about 13 miles east via SR-836, a 22-minute drive outside rush hour. Same-week appointments are typically available, and the scan plus check-in takes about 30 minutes total.",
      },
      {
        question: "Is the drive from Doral worth it versus a gym InBody scale?",
        answer:
          "For anything you'll make decisions on, yes. InBody and other BIA scales swing 5–8% with hydration; DEXA's margin of error is 1–2% with limb-level detail and visceral fat isolation. One accurate scan every 3–6 months beats weekly numbers you can't trust — and it's a 22-minute drive, not a commitment.",
      },
      {
        question: "Can Doral golfers use DEXA to check muscle imbalances?",
        answer:
          "Yes — DEXA's left-right symmetry analysis is built for rotational athletes. A golf swing loads one side asymmetrically, and the scan quantifies lean-mass differences between arms and legs in pounds. Several Doral golfers re-scan seasonally to confirm their gym work is keeping both sides balanced.",
      },
    ],
    testimonial: {
      name: "Alejandro V.",
      text: "I play off a 6 handicap at Doral and lift three days a week. The DEXA found almost 5 lbs more muscle on my trail side — explained the back tightness my trainer couldn't figure out. Twenty minutes down 836. We fixed the imbalance in one offseason.",
    },
    nearby: ["hialeah", "little-havana", "coral-gables"],
  },
  {
    slug: "kendall",
    name: "Kendall",
    zips: ["33156", "33173", "33176"],
    driveTime: "25 min",
    distance: "12 miles",
    route:
      "Take US-1 (South Dixie Highway) north from the Dadeland area, continue about 11 miles to Brickell, turn right on SW 13th Street and left onto Brickell Plaza. Or take SR-874/826 to SR-836 east when US-1 is heavy.",
    transit:
      "Metrorail is the Kendall cheat code: park free at Dadeland North or Dadeland South and ride the direct line to Brickell station — about 25 minutes, no traffic, then a 6-minute walk.",
    localTip:
      "Skip US-1 entirely during rush hour — the Dadeland Metrorail park-and-ride gets you to the clinic's neighborhood faster than driving between 4 and 7 PM.",
    landmarks: ["Dadeland Mall", "Baptist Hospital", "The Falls", "Dadeland Metrorail stations"],
    intro:
      "Kendall to Brickell is one Metrorail line — park at Dadeland, ride 25 minutes, and walk into Strong Health's DEXA clinic for the most accurate body composition scan in Miami. Lean mass, body fat, visceral fat, and bone density, physician-supervised, no referral needed.",
    whyLocal:
      "Kendall families juggle a lot, and health tracking usually gets the leftovers. DEXA is efficient by design: one 15-minute scan a couple of times a year replaces months of unreliable scale readings — and the Metrorail ride from Dadeland makes it a half-morning errand, not a day trip.",
    faqs: [
      {
        question: "What's the easiest way to get a DEXA scan from Kendall?",
        answer:
          "Ride Metrorail: park free at Dadeland North or Dadeland South and take the direct line to Brickell station — about 25 minutes — then walk 6 minutes to 1000 Brickell Plaza. Driving via US-1 takes about the same outside rush hour. Same-week appointments are typically available.",
      },
      {
        question: "Should both parents in a Kendall family get baseline scans?",
        answer:
          "It's a common booking. A baseline DEXA for each adult captures lean mass, visceral fat, and bone density — three numbers that drive most midlife health decisions. Women approaching menopause especially benefit from an early bone-density baseline, since post-menopausal bone loss is fastest in the first few years.",
      },
      {
        question: "How much does a DEXA scan cost for Kendall patients?",
        answer:
          "The same transparent direct-pay pricing as all Strong Health scans — most patients pay under $200, with bundle pricing if you plan follow-up scans across the year. No referral or insurance needed for body composition scans; bone-density screening may be insurance-eligible for qualifying patients.",
      },
    ],
    testimonial: {
      name: "Maritza D.",
      text: "My husband and I booked back-to-back Saturday scans and rode Metrorail up from Dadeland South. His visceral fat and my bone density both needed work — we overhauled dinner and joined a gym together. Re-scanned six months later: both numbers moved the right way.",
    },
    nearby: ["pinecrest", "south-miami", "coral-gables"],
  },
  {
    slug: "pinecrest",
    name: "Pinecrest",
    zips: ["33156"],
    driveTime: "22 min",
    distance: "10 miles",
    route:
      "Take US-1 (South Dixie Highway) north from the Pinecrest Gardens area, continue about 9 miles into Brickell, turn right on SW 13th Street and left onto Brickell Plaza to number 1000.",
    transit:
      "Drive to the Dadeland South Metrorail park-and-ride (5 minutes from most of Pinecrest) and ride direct to Brickell station — about 25 minutes, then a 6-minute walk.",
    localTip:
      "Mid-morning US-1 is forgiving; pair the scan with a Brickell lunch and you've turned a checkup into an outing. School-hours appointments are quietest for Pinecrest parents.",
    landmarks: ["Pinecrest Gardens", "The Falls", "Suniland Shops", "Evelyn Greer Park"],
    intro:
      "Pinecrest invests in the long game — schools, gardens, health. Strong Health's Brickell DEXA clinic, 22 minutes up US-1 or a direct Metrorail ride from Dadeland South, delivers the clinical baseline that longevity planning should start with: lean mass, visceral fat, and bone density in one 15-minute scan.",
    whyLocal:
      "For Pinecrest patients in their 40s and 50s, DEXA answers the two questions that matter most for the next thirty years: is your muscle mass holding (the strongest predictor of healthy aging), and is your bone density on track? One scan a year keeps both honest.",
    faqs: [
      {
        question: "Where do Pinecrest residents get DEXA scans?",
        answer:
          "Strong Health's Brickell clinic at 1000 Brickell Plaza — about 10 miles north via US-1, a 22-minute drive from Pinecrest Gardens, or Metrorail from the Dadeland South park-and-ride direct to Brickell station. Walk-ins are welcome and same-week appointments are typical.",
      },
      {
        question: "At what age should I start tracking bone density?",
        answer:
          "Earlier than most people think. Peak bone mass arrives around 30 and declines after — for women, sharply after menopause. A baseline DEXA in your 40s gives you a personal reference point, so later scans show your trend rather than comparing you only to population averages. Pinecrest patients often make it part of their annual physical rhythm.",
      },
      {
        question: "Is DEXA appropriate for teenagers in competitive sports?",
        answer:
          "For older teen athletes it can be, with physician guidance — the scan is ultra-low radiation (about 1/10th of a chest X-ray) and gives useful lean mass and symmetry data for injury-prone sports. Call the clinic first; our physicians will advise whether a scan makes sense for your athlete's age and situation.",
      },
    ],
    testimonial: {
      name: "Catherine W.",
      text: "I turned 50 and wanted real numbers, not reassurance. The scan took fifteen minutes and gave me a spine T-score I could actually act on. I drive up US-1 from Pinecrest every January now — it's my yearly report card.",
    },
    nearby: ["kendall", "south-miami", "coral-gables"],
  },
  {
    slug: "south-miami",
    name: "South Miami",
    zips: ["33143"],
    driveTime: "18 min",
    distance: "8 miles",
    route:
      "From Sunset Drive, take US-1 (South Dixie Highway) north about 7 miles into Brickell, turn right on SW 13th Street, then left onto Brickell Plaza to number 1000.",
    transit:
      "Board Metrorail at South Miami station (next to Sunset Place) and ride direct to Brickell station — about 20 minutes, no transfer — then walk 6 minutes to the clinic.",
    localTip:
      "The South Miami Metrorail station is the easiest play: no US-1 traffic, and you step off one line at Brickell. Hospital-district workers can be scanned and back within a long lunch.",
    landmarks: ["Shops at Sunset Place", "South Miami Hospital", "Sunset Drive", "South Miami Metrorail station"],
    intro:
      "South Miami sits one direct Metrorail ride from Strong Health's Brickell DEXA clinic — board at Sunset Place, step off at Brickell, and get the clinical gold standard for body composition: lean mass, body fat, visceral fat, and bone density in a 15-minute scan.",
    whyLocal:
      "With South Miami Hospital anchoring the neighborhood, locals know the difference between wellness marketing and clinical measurement. DEXA is the latter — the same dual-energy X-ray technology used in research, with numbers precise enough to base real decisions on.",
    faqs: [
      {
        question: "How do I get to the DEXA clinic from South Miami?",
        answer:
          "Easiest: Metrorail from South Miami station (at Sunset Place) direct to Brickell station, about 20 minutes, then a 6-minute walk to 1000 Brickell Plaza. Driving up US-1 takes about 18 minutes outside rush hour, with validated parking at the Brickell Plaza garage.",
      },
      {
        question: "Can healthcare workers from the hospital district book around shifts?",
        answer:
          "Yes — the clinic is open 8 AM to 6 PM weekdays and Saturday mornings 9 AM to 1 PM, and the full visit takes about 30 minutes. Nurses and staff from the South Miami Hospital area often book post-shift morning slots or Saturday walk-ins. Your PDF report arrives within 24 hours.",
      },
      {
        question: "How does DEXA compare to the body fat testing at local gyms?",
        answer:
          "Gym methods — BIA scales, handheld devices, calipers — carry 5–8% error and swing with hydration. DEXA's margin is 1–2%, with regional breakdowns (arms, legs, trunk), visceral fat isolation, and bone density that no gym test provides. It's the difference between an estimate and a measurement.",
      },
    ],
    testimonial: {
      name: "Naomi H.",
      text: "I'm an RN near South Miami Hospital and I've seen what bad metabolic health does. Took the Metrorail up after a night shift, scanned in fifteen minutes. My visceral fat was higher than my BMI suggested — exactly the early warning I preach to patients.",
    },
    nearby: ["coral-gables", "coconut-grove", "pinecrest"],
  },
  {
    slug: "aventura",
    name: "Aventura",
    zips: ["33160", "33180"],
    driveTime: "30 min",
    distance: "17 miles",
    route:
      "Take Biscayne Boulevard (US-1) south or I-95 south to exit 1A (Brickell), then follow SE 10th Street to 1000 Brickell Plaza. I-95 with the express lanes is usually the faster run from Aventura.",
    transit:
      "The Brightline from Aventura station to MiamiCentral is the traffic-proof option — 20 minutes to Downtown, then a Metromover Brickell Loop ride to Tenth Street/Promenade, 2 blocks from the clinic.",
    localTip:
      "Brightline from Aventura station turns the worst drive on this list into the easiest trip — many Aventura patients ride down, scan, lunch in Brickell, and ride back before school pickup.",
    landmarks: ["Aventura Mall", "Turnberry Isle", "Founders Park", "Aventura Brightline station"],
    intro:
      "Aventura to Brickell is 30 minutes on I-95 — or a 20-minute Brightline ride from Aventura station. Either way, Strong Health's DEXA clinic delivers what no scale in an Aventura gym can: clinical-grade lean mass, body fat, visceral fat, and bone density, physician-supervised.",
    whyLocal:
      "Aventura's fitness scene skews serious — personal training studios, pilates, longevity clinics. DEXA is the measurement those programs should be built on: a 15-minute scan twice a year that tells you, with 1–2% precision, whether the investment is producing muscle, losing fat, and protecting bone.",
    faqs: [
      {
        question: "Is the trip from Aventura worth it for a DEXA scan?",
        answer:
          "For a scan you act on 2–4 times a year, yes. Strong Health's Brickell clinic is 30 minutes down I-95 or a 20-minute Brightline ride from Aventura station — and DEXA's 1–2% precision, visceral fat isolation, and bone density make it categorically different from any body composition testing available near Aventura Mall.",
      },
      {
        question: "Can I take the Brightline to my scan from Aventura?",
        answer:
          "Yes, and it's the best route: Brightline from Aventura station to MiamiCentral takes about 20 minutes, then ride the Metromover Brickell Loop to Tenth Street/Promenade — the clinic is 2 blocks from the station. Total door-to-door is about 45 minutes with zero traffic risk.",
      },
      {
        question: "How often should Aventura patients re-scan?",
        answer:
          "Every 3–6 months on an active protocol (TRT, GLP-1 weight loss, serious training blocks); once a year for general health and bone-density tracking. Book your follow-ups at the same clinic — same-scanner consistency is what makes the trend data reliable.",
      },
    ],
    testimonial: {
      name: "Gabrielle N.",
      text: "I train five days a week at a studio near Aventura Mall and still had no real numbers. Took the Brightline down on a Tuesday — the whole trip was easier than crossing 826 at rush hour. My report showed exactly where two years of pilates put muscle on me.",
    },
    nearby: ["miami-beach", "edgewater", "design-district"],
  },
  {
    slug: "hialeah",
    name: "Hialeah",
    zips: ["33010", "33012", "33013", "33016"],
    driveTime: "22 min",
    distance: "10 miles",
    route:
      "Take Okeechobee Road (US-27) southeast to SR-112 east, merge onto I-95 south, exit at 1A (Brickell), and follow SE 10th Street to 1000 Brickell Plaza.",
    transit:
      "Metrorail runs from Hialeah and Okeechobee stations direct to Brickell station on the Green Line — about 30 minutes, then a 6-minute walk to the clinic. No transfers.",
    localTip:
      "The Metrorail Green Line from Hialeah station goes straight to Brickell — for most of Hialeah it beats fighting 112 and I-95, and the park-and-ride is free.",
    landmarks: ["Hialeah Park Racing & Casino", "Amelia Earhart Park", "Westland Mall", "Leah Arts District"],
    intro:
      "Hialeah is a direct Metrorail Green Line ride from Strong Health's Brickell DEXA clinic — or 22 minutes via 112 and I-95. One 15-minute scan measures lean muscle, body fat, visceral fat, and bone density with clinical precision, direct-pay, no referral needed.",
    whyLocal:
      "Hialeah works hard and eats well — and type 2 diabetes quietly runs through too many of its families. Visceral fat is the earliest measurable warning, and DEXA is the only common test that isolates it precisely. One scan turns family history into a number you can track and beat.",
    faqs: [
      {
        question: "Where can Hialeah residents get a DEXA scan?",
        answer:
          "Strong Health's Brickell clinic at 1000 Brickell Plaza — a direct Metrorail Green Line ride from Hialeah or Okeechobee stations to Brickell station (about 30 minutes), or a 22-minute drive via SR-112 and I-95. Direct-pay pricing keeps body composition scans under $200 for most patients, no insurance needed.",
      },
      {
        question: "Why is visceral fat the number Hialeah patients should watch?",
        answer:
          "Visceral fat — fat around the organs — is the strongest body-composition predictor of type 2 diabetes and heart disease, both of which affect Hispanic communities at above-average rates. You can carry high visceral fat at a normal weight, and no scale or mirror will show it. DEXA measures it directly, so you can track it down with diet and training.",
      },
      {
        question: "Is the scan available without a doctor's order?",
        answer:
          "Yes. Body composition DEXA scans at Strong Health require no referral, no insurance, and no prior authorization — book by phone or text, walk in, and your full PDF report arrives within 24 hours. If results warrant it, you can add a physician consultation to go through them in detail.",
      },
    ],
    testimonial: {
      name: "Osmany P.",
      text: "Took the Metrorail from Hialeah station on my day off. I'm 42, normal weight my whole life, and my visceral fat came back high — same pattern as my mother before her diagnosis. A year of changes later I re-scanned and it dropped by half. That train ride may have saved me.",
    },
    nearby: ["doral", "little-havana", "wynwood"],
  },
];

export const MIAMI_DEXA_CITY: DexaNeighborhoodCity = {
  cityName: "Miami",
  citySlug: "miami",
  statePrefix: "fl",
  stateAbbr: "FL",
  stateName: "Florida",
  stateHubPath: "/fl/",
  hubPath: "/fl/miami/dexascan/",
  peptidePath: "/fl/miami/peptide-therapy/",
  clinicArea: MIAMI_BRICKELL_CLINIC.area,
  clinic: MIAMI_BRICKELL_CLINIC,
  neighborhoods: MIAMI_DEXA_NEIGHBORHOODS,
};

export function getDexaNeighborhood(
  city: DexaNeighborhoodCity,
  slug: string,
): DexaNeighborhoodConfig | undefined {
  return city.neighborhoods.find((hood) => hood.slug === slug);
}
