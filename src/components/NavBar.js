import { Component } from "../core/Component.js";
import { el, qsa } from "../core/dom.js";
import { icon } from "../core/icons.js";

/**
 * Sticky navigation: brand, anchor links, theme toggle and CV download.
 *
 * Owns only navigation concerns. It is handed a `themeService` rather than
 * reaching for one, so the bar can be rendered in a test with a stub.
 */
export class NavBar extends Component {
  /**
   * @param {Object} props
   * @param {Array<{id: string, label: string}>} props.items
   * @param {{name: string, cvPath: string, cvFileName: string}} props.profile
   * @param {import("../services/ThemeService.js").ThemeService} props.themeService
   */
  constructor(props) {
    super(props);
    this.linkNodes = new Map();
    this.menuOpen = false;
  }

  render() {
    const { items, profile } = this.props;

    this.listNode = el(
      "ul",
      { className: "nav__list", id: "primary-navigation" },
      items.map((item) => this.renderLink(item))
    );

    this.toggleNode = this.renderMenuToggle();

    return el("header", { className: "nav", attrs: { "data-nav": "" } }, [
      el("div", { className: "container nav__inner" }, [
        this.renderBrand(profile.name, profile.logo),
        el("nav", { attrs: { "aria-label": "Primary" } }, [this.listNode]),
        el("div", { className: "nav__actions" }, [
          this.renderThemeToggle(),
          el("a", {
            className: "btn btn--outline nav__cv",
            attrs: { href: profile.cvPath, download: profile.cvFileName },
          }, [icon("download", { size: 18 }), el("span", { text: "Resume" })]),
          this.toggleNode,
        ]),
      ]),
    ]);
  }

  /**
   * The monogram is drawn as a CSS mask rather than an <img>, so it picks
   * up the current text colour and needs no separate dark-theme file. That
   * leaves it with no accessible name of its own, hence the label on the
   * link, which also covers narrow screens where the name is hidden.
   *
   * @private
   */
  renderBrand(name, logo) {
    return el("a", {
      className: "nav__brand",
      attrs: { href: "#home", "aria-label": `${name} — back to top` },
    }, [
      el("span", {
        className: "nav__mark",
        attrs: { "aria-hidden": "true" },
        // Resolved against the document before it reaches CSS: a relative
        // url() inside a custom property is resolved against the stylesheet
        // that consumes it, which would look for the file next to nav.css.
        style: { "--logo": `url("${new URL(logo, document.baseURI).href}")` },
      }),
      el("span", { className: "nav__brand-name", text: name }),
    ]);
  }

  /** @private */
  renderLink({ id, label }) {
    const link = el("a", {
      className: "nav__link",
      text: label,
      attrs: { href: `#${id}` },
      on: { click: () => this.closeMenu() },
    });

    this.linkNodes.set(id, link);
    return el("li", {}, [link]);
  }

  /** @private */
  renderThemeToggle() {
    const { themeService } = this.props;

    const button = el("button", {
      className: "icon-btn",
      attrs: { type: "button", "aria-label": "Toggle colour theme" },
      on: { click: () => themeService.toggle() },
    });

    // Re-render the glyph whenever the theme changes, including on start-up.
    themeService.subscribe((theme) => {
      button.replaceChildren(icon(theme === "dark" ? "sun" : "moon", { size: 20 }));
      button.setAttribute(
        "title",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });

    return button;
  }

  /** @private */
  renderMenuToggle() {
    return el("button", {
      className: "icon-btn nav__burger",
      attrs: {
        type: "button",
        "aria-label": "Toggle menu",
        "aria-expanded": "false",
        "aria-controls": "primary-navigation",
      },
      on: { click: () => this.toggleMenu() },
    }, [icon("menu", { size: 22 })]);
  }

  /** @private */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.listNode.classList.toggle("is-open", this.menuOpen);
    this.toggleNode.setAttribute("aria-expanded", String(this.menuOpen));
    this.toggleNode.replaceChildren(
      icon(this.menuOpen ? "close" : "menu", { size: 22 })
    );
  }

  /** @private */
  closeMenu() {
    if (this.menuOpen) this.toggleMenu();
  }

  /**
   * Highlight the link for `id`. Called by the scroll-spy service.
   * @param {string} id
   */
  setActive(id) {
    for (const [linkId, node] of this.linkNodes) {
      const isActive = linkId === id;
      node.classList.toggle("is-active", isActive);
      if (isActive) node.setAttribute("aria-current", "true");
      else node.removeAttribute("aria-current");
    }
  }

  /** Add a shadow/background once the page is scrolled. */
  bindScrollState(root = document) {
    const nav = root.querySelector("[data-nav]");
    const update = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return this;
  }
}
