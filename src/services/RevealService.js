/**
 * Reveal-on-scroll animations via IntersectionObserver.
 *
 * Replaces the WOW.js + animate.css dependency pair used by the original
 * template with ~40 lines and no third-party code. Elements opt in with the
 * `.reveal` class; siblings inside a `[data-reveal-group]` are staggered.
 */
export class RevealService {
  /**
   * @param {Object} [options]
   * @param {number} [options.threshold]
   * @param {string} [options.rootMargin]
   * @param {number} [options.staggerStep] Delay in ms added per sibling.
   */
  constructor({ threshold = 0.12, rootMargin = "0px", staggerStep = 90 } = {}) {
    this.threshold = threshold;
    this.rootMargin = rootMargin;
    this.staggerStep = staggerStep;
    this.observer = null;
  }

  /** @param {ParentNode} [scope] */
  start(scope = document) {
    const targets = Array.from(scope.querySelectorAll(".reveal"));

    // No observer support, or the visitor prefers reduced motion:
    // show everything immediately rather than leaving it invisible.
    if (!("IntersectionObserver" in window) || this.reducedMotion()) {
      targets.forEach((node) => node.classList.add("is-visible"));
      return this;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.onIntersect(entries),
      { threshold: this.threshold, rootMargin: this.rootMargin }
    );
    targets.forEach((node) => this.observer.observe(node));
    return this;
  }

  /** @private */
  onIntersect(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const node = /** @type {HTMLElement} */ (entry.target);
      node.style.transitionDelay = `${this.delayFor(node)}ms`;
      node.classList.add("is-visible");

      // Reveal once, then stop watching: no work on later scrolls.
      this.observer.unobserve(node);
    }
  }

  /** @private Stagger based on position within the element's reveal group. */
  delayFor(node) {
    const group = node.closest("[data-reveal-group]");
    if (!group) return 0;

    const siblings = Array.from(group.querySelectorAll(".reveal"));
    return Math.min(siblings.indexOf(node), 6) * this.staggerStep;
  }

  /** @private */
  reducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  stop() {
    this.observer?.disconnect();
    this.observer = null;
    return this;
  }
}
