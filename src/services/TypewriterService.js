/**
 * Types and deletes a rotating list of phrases into a target element.
 *
 * Implemented as a small state machine driven by `setTimeout`; it respects
 * `prefers-reduced-motion` by rendering the first phrase statically.
 */
export class TypewriterService {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.target
   * @param {string[]} options.phrases
   * @param {number} [options.typeSpeed]
   * @param {number} [options.deleteSpeed]
   * @param {number} [options.holdDuration]
   * @param {number} [options.restartDelay]
   */
  constructor({
    target,
    phrases,
    typeSpeed = 95,
    deleteSpeed = 45,
    holdDuration = 1600,
    restartDelay = 400,
  }) {
    if (!target) throw new Error("[Typewriter] A target element is required.");
    if (!phrases?.length) throw new Error("[Typewriter] phrases cannot be empty.");

    this.target = target;
    this.phrases = phrases;
    this.speeds = { typeSpeed, deleteSpeed, holdDuration, restartDelay };

    this.phraseIndex = 0;
    this.charCount = 0;
    this.isDeleting = false;
    this.timer = null;
  }

  start() {
    if (prefersReducedMotion()) {
      this.target.textContent = this.phrases[0];
      return this;
    }
    this.tick();
    return this;
  }

  stop() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    return this;
  }

  /** @private One step of the type/delete cycle. */
  tick() {
    const phrase = this.phrases[this.phraseIndex % this.phrases.length];
    this.charCount += this.isDeleting ? -1 : 1;
    this.target.textContent = phrase.slice(0, this.charCount);

    this.timer = setTimeout(() => this.tick(), this.nextDelay(phrase));
  }

  /** @private Decide how long to wait, flipping direction at the edges. */
  nextDelay(phrase) {
    const { typeSpeed, deleteSpeed, holdDuration, restartDelay } = this.speeds;

    if (!this.isDeleting && this.charCount === phrase.length) {
      this.isDeleting = true;
      return holdDuration;
    }
    if (this.isDeleting && this.charCount === 0) {
      this.isDeleting = false;
      this.phraseIndex += 1;
      return restartDelay;
    }
    return this.isDeleting ? deleteSpeed : typeSpeed;
  }
}

/** @private */
function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
