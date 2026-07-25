/**
 * Site-wide client runtime, loaded once from BaseLayout as a single shared
 * (hashed, cacheable) module instead of four per-page inline <script> blocks
 * (Phase 8 payload reduction). Behavior is unchanged; each section guards on
 * the elements it needs so the module is safe on every page.
 *
 * Sections:
 *  1. Mobile nav drawer toggle (was inline in shared/Nav.astro)
 *  2. Scroll fade-in observer   (was inline in shared/FadeIn.astro)
 *  3. GA4 lead tracking         (was inline in BaseLayout; port of lib/gtag.ts)
 *  4. LeadConnector chat loader (was inline in BaseLayout; port of
 *     lib/loadChatWidget.ts — inject on scroll ≥ 300px or after 8s)
 */

/* 1 — Mobile nav drawer (toggle visibility, lock body scroll, close on
       Escape/backdrop; replaces the React portal implementation). */
(function mobileNav() {
  const toggle = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  if (!toggle || !drawer || !backdrop) return;
  const iconMenu = toggle.querySelector(".nav-icon-menu")!;
  const iconClose = toggle.querySelector(".nav-icon-close")!;
  let open = false;

  function setOpen(next: boolean) {
    open = next;
    toggle!.setAttribute("aria-expanded", String(open));
    toggle!.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer!.setAttribute("aria-hidden", String(!open));
    drawer!.classList.toggle("translate-x-full", !open);
    drawer!.classList.toggle("translate-x-0", open);
    backdrop!.classList.toggle("hidden", !open);
    iconMenu.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setOpen(!open));
  backdrop.addEventListener("click", () => setOpen(false));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
})();

/* 2 — Scroll fade-in (progressive enhancement: server HTML ships fully
       visible; below-the-fold .sh-fade elements are hidden and faded in on
       intersect. No-JS and reduced-motion users see everything immediately). */
(function fadeIn() {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const els = document.querySelectorAll<HTMLElement>(".sh-fade");
  if (els.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0", "md:translate-y-8");
          el.classList.add("opacity-100", "md:translate-y-0");
          observer.unobserve(el);
        }
      }
    },
    { threshold: 0.1 },
  );
  for (const el of els) {
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) continue;
    el.classList.add("transition-all", "duration-1000", "ease-out");
    const delay = el.dataset.fadeDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.remove("opacity-100", "md:translate-y-0");
    el.classList.add("opacity-0", "md:translate-y-8");
    observer.observe(el);
  }
})();

/* 3 — Lead tracking: every CTA carrying data-track-lead fires, via one
       delegated click listener,
        - GA4  `generate_lead`
        - PostHog `book_assessment_cta_clicked` with the page and the CTA's
          placement (data-cta-placement, set per CTA site) so clicks can be
          broken down by page × placement.
       PostHog's stub (BaseLayout head) queues capture() calls made before
       array.js finishes loading, so no readiness check is needed. */
document.addEventListener("click", (e) => {
  const t = e.target as Element | null;
  const el = t && t.closest ? t.closest<HTMLElement>("[data-track-lead]") : null;
  if (!el) return;
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", {
      event_category: "cta",
      event_label: "book_free_assessment",
    });
  }
  const posthog = (window as any).posthog;
  if (posthog && typeof posthog.capture === "function") {
    posthog.capture("book_assessment_cta_clicked", {
      placement: el.dataset.ctaPlacement || "unspecified",
      cta_text: (el.textContent || "").replace(/\s+/g, " ").trim(),
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
});

/* 4 — Chat widget loader: inject the LeadConnector bubble once the user
       scrolls past the hero (300px) or after 8s, whichever comes first. */
(function chatWidget() {
  const SRC = "https://widgets.leadconnectorhq.com/loader.js";

  /* Below md (768px) the sticky mobile CTA bar (StickyMobileCta.astro, 72px
     + iOS safe area) owns the bottom edge, and the widget's default
     bottom:20px bubble lands on top of its button, blocking taps. Lift the
     bubble (and the prompt/chat-box container, so the prompt keeps riding
     above the bubble) clear of the bar with a 12px gap. The widget positions
     itself via inline styles inside an open shadow root, so this stylesheet
     is appended to the shadow root and needs !important to win. The
     full-screen open-chat state on mobile (.lc_text-widget--mobile) and
     embedded/inline placements are left untouched. */
  const OFFSET_STYLE_ID = "sh-chat-widget-offset";
  const OFFSET_CSS = `
@media (max-width: 767px) {
  .lc_text-widget--bubble:not(.inline) {
    bottom: calc(84px + env(safe-area-inset-bottom, 0px)) !important;
  }
  .lc_text-widget:not(.lc_text-widget--mobile):not(.lc_text-widget--inline) {
    bottom: calc(84px + env(safe-area-inset-bottom, 0px)) !important;
  }
}`;

  function applyOffset(): boolean {
    const root = document.querySelector("chat-widget")?.shadowRoot;
    if (!root) return false;
    if (!root.getElementById(OFFSET_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = OFFSET_STYLE_ID;
      style.textContent = OFFSET_CSS;
      root.appendChild(style);
    }
    return true;
  }

  /* The widget element (and its shadow root) appears some time after the
     loader script runs; poll briefly until it does. */
  function watchForWidget() {
    if (applyOffset()) return;
    let tries = 0;
    const poll = window.setInterval(() => {
      if (applyOffset() || ++tries >= 120) window.clearInterval(poll);
    }, 250);
  }

  let injected = false;
  function inject() {
    if (injected || document.querySelector(`script[src="${SRC}"]`)) return;
    injected = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC;
    s.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    );
    s.setAttribute("data-widget-id", "69fcc800d663de762a50e94d");
    s.setAttribute("data-source", "WEB_USER");
    document.body.appendChild(s);
    watchForWidget();
  }
  let timer: number | undefined;
  function cleanup() {
    window.removeEventListener("scroll", onScroll);
    if (timer !== undefined) window.clearTimeout(timer);
  }
  function onScroll() {
    if (window.scrollY >= 300) {
      cleanup();
      inject();
    }
  }
  if (window.scrollY >= 300) {
    inject();
    return;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  timer = window.setTimeout(() => {
    cleanup();
    inject();
  }, 8000);
})();
