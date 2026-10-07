/**
 * Owns the light/dark theme: resolving the initial choice, applying it to
 * the document and persisting it.
 *
 * Dependency Inversion: the service talks to a `storage` object with
 * `get`/`set`, not to `localStorage` directly, so it is trivially testable
 * and degrades gracefully when storage is unavailable (private windows).
 */
export const Theme = Object.freeze({ DARK: "dark", LIGHT: "light" });

/** Safe localStorage wrapper — never throws, even when storage is blocked. */
export const browserStorage = Object.freeze({
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable — the theme simply will not persist */
    }
  },
});

export class ThemeService {
  /**
   * @param {Object} options
   * @param {string} options.storageKey
   * @param {{get: Function, set: Function}} [options.storage]
   * @param {Document} [options.root]
   */
  constructor({ storageKey, storage = browserStorage, root = document }) {
    this.storageKey = storageKey;
    this.storage = storage;
    this.root = root;
    this.listeners = new Set();
    this.current = this.resolveInitialTheme();
  }

  /**
   * A previously chosen theme always wins. Otherwise the site opens on its
   * designed warm-paper theme rather than following the OS, so first-time
   * visitors see the intended look.
   */
  resolveInitialTheme() {
    const stored = this.storage.get(this.storageKey);
    return stored === Theme.LIGHT || stored === Theme.DARK ? stored : Theme.LIGHT;
  }

  /** Apply the current theme to the document and notify subscribers. */
  start() {
    this.apply(this.current);
    return this;
  }

  /** @param {string} theme */
  apply(theme) {
    this.current = theme;
    this.root.documentElement.setAttribute("data-theme", theme);
    this.storage.set(this.storageKey, theme);
    this.listeners.forEach((listener) => listener(theme));
  }

  toggle() {
    this.apply(this.current === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    return this.current;
  }

  /**
   * Subscribe to theme changes.
   * @param {(theme: string) => void} listener
   * @returns {() => void} Unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.current);
    return () => this.listeners.delete(listener);
  }
}
