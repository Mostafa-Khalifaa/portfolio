/**
 * Runtime configuration. Everything environment-specific lives here so the
 * rest of the codebase never hard-codes an endpoint or a magic number.
 */
export const config = Object.freeze({
  /**
   * Formspree endpoint for the contact form.
   * Create a free form at https://formspree.io and paste its URL here.
   * While this is empty the form falls back to opening the visitor's mail
   * client (see `MailtoSubmitter` in src/services/contact/`).
   */
  formEndpoint: "",

  /** Typewriter timings in milliseconds. */
  typewriter: {
    typeSpeed: 95,
    deleteSpeed: 45,
    holdDuration: 1600,
    restartDelay: 400,
  },

  /** Reveal-on-scroll tuning. */
  reveal: {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
    staggerStep: 90,
  },

  /** localStorage key for the chosen theme. */
  themeStorageKey: "mk-portfolio-theme",
});
