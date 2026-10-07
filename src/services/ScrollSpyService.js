/**
 * Highlights the navigation link matching the section currently in view,
 * and toggles a `is-scrolled` class on the navbar once the page moves.
 */
export class ScrollSpyService {
  /**
   * @param {Object} options
   * @param {HTMLElement[]} options.sections  Observed section elements.
   * @param {(id: string) => void} options.onChange Called with the active id.
   * @param {number} [options.topOffset] Height of the sticky navbar in px.
   */
  constructor({ sections, onChange, topOffset = 80 }) {
    this.sections = sections.filter(Boolean);
    this.onChange = onChange;
    this.topOffset = topOffset;
    this.observer = null;
    this.activeId = null;
  }

  start() {
    if (!("IntersectionObserver" in window) || this.sections.length === 0) {
      return this;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.onIntersect(entries),
      {
        // A band just below the navbar: the section crossing it is "active".
        rootMargin: `-${this.topOffset}px 0px -55% 0px`,
        threshold: 0,
      }
    );
    this.sections.forEach((section) => this.observer.observe(section));
    return this;
  }

  /** @private */
  onIntersect(entries) {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (visible.length === 0) return;

    // When several sections qualify, prefer the topmost one on screen.
    const topMost = visible.reduce((best, entry) =>
      entry.boundingClientRect.top < best.boundingClientRect.top ? entry : best
    );

    if (topMost.target.id !== this.activeId) {
      this.activeId = topMost.target.id;
      this.onChange(this.activeId);
    }
  }

  stop() {
    this.observer?.disconnect();
    this.observer = null;
    return this;
  }
}
