import { Component } from "../core/Component.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";
import { iconLink, linkButton } from "./ui.js";

/**
 * Landing section: greeting, rotating headline, tagline, calls to action,
 * social links, key figures and the portrait.
 *
 * The rotating headline is not animated here — this component only marks
 * the target with `data-typewriter`, and `TypewriterService` drives it. That
 * keeps presentation and behaviour separable.
 */
export class Hero extends Component {
  /**
   * @param {Object} props
   * @param {Object} props.profile
   * @param {Array<Object>} props.contacts
   */
  render() {
    const { profile, contacts } = this.props;

    return el("section", { id: "home", className: "hero" }, [
      el("div", { className: "hero__glow", attrs: { "aria-hidden": "true" } }),
      el("div", { className: "container hero__inner" }, [
        this.renderCopy(profile, contacts),
        this.renderPortrait(profile),
      ]),
    ]);
  }

  /** @private */
  renderCopy(profile, contacts) {
    return el("div", { className: "hero__copy", attrs: { "data-reveal-group": "" } }, [
      el("p", { className: "hero__greeting reveal", text: "Hello, I’m" }),

      el("h1", { className: "hero__name reveal", text: profile.name }),

      el("p", { className: "hero__role reveal" }, [
        el("span", { className: "hero__typed", attrs: { "data-typewriter": "" } }),
        el("span", { className: "hero__caret", attrs: { "aria-hidden": "true" } }),
      ]),

      el("p", { className: "hero__tagline reveal", text: profile.tagline }),

      el("div", { className: "hero__socials reveal" },
        contacts
          .filter((contact) => contact.social)
          .map((contact) =>
            iconLink({ href: contact.href, iconName: contact.icon, label: contact.label })
          )
      ),

      el("div", { className: "hero__actions reveal" }, [
        linkButton({
          href: profile.cvPath,
          label: "Download CV",
          iconName: "download",
          download: profile.cvFileName,
        }),
        linkButton({
          href: "#contact",
          label: "Hire me",
          iconName: "send",
          variant: "outline",
        }),
      ]),

      this.renderHighlights(profile.highlights),
    ]);
  }

  /** @private */
  renderHighlights(highlights) {
    return el(
      "dl",
      { className: "hero__stats reveal" },
      highlights.flatMap(({ value, label }) => [
        el("div", { className: "hero__stat" }, [
          el("dt", { className: "hero__stat-value", text: value }),
          el("dd", { className: "hero__stat-label", text: label }),
        ]),
      ])
    );
  }

  /** @private */
  renderPortrait(profile) {
    return el("div", { className: "hero__portrait reveal" }, [
      el("div", { className: "hero__portrait-ring", attrs: { "aria-hidden": "true" } }),
      el("img", {
        className: "hero__portrait-img",
        attrs: {
          src: profile.heroImage,
          alt: `${profile.name}, ${profile.role}`,
          width: 436,
          height: 1200,
          loading: "eager",
          decoding: "async",
        },
      }),
      el("a", {
        className: "hero__scroll",
        attrs: { href: "#about", "aria-label": "Scroll to about section" },
      }, [icon("arrowDown", { size: 18 })]),
    ]);
  }
}
