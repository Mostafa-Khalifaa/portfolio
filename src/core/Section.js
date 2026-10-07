import { Component } from "./Component.js";
import { el } from "./dom.js";

/**
 * Base class for every page section.
 *
 * Template Method pattern: this class owns the structure shared by all
 * sections (the `<section>` wrapper, container and heading block) and
 * delegates only the part that actually differs to `renderBody()`.
 * Subclasses therefore cannot drift apart structurally, and a change to the
 * shared chrome is made in exactly one place.
 *
 * @abstract
 */
export class Section extends Component {
  /**
   * @param {Object} props
   * @param {string}  props.id        Anchor id, matched by the navigation.
   * @param {string} [props.eyebrow]  Small label above the title.
   * @param {string} [props.title]
   * @param {string} [props.subtitle]
   * @param {string} [props.className] Extra class on the section element.
   */
  constructor(props) {
    super(props);
    if (!props?.id) throw new Error(`${this.constructor.name} requires an id.`);
  }

  /**
   * Build the section's unique content.
   * @abstract
   * @returns {Node|Node[]}
   */
  renderBody() {
    throw new Error(`${this.constructor.name} must implement renderBody().`);
  }

  /** @final */
  render() {
    const { id, eyebrow, title, subtitle, className = "" } = this.props;

    const body = this.renderBody();
    const children = Array.isArray(body) ? body : [body];

    return el(
      "section",
      {
        id,
        className: `section ${className}`.trim(),
        attrs: { "aria-labelledby": title ? `${id}-title` : null },
      },
      [
        el("div", { className: "container" }, [
          title && this.renderHeader({ id, eyebrow, title, subtitle }),
          ...children,
        ]),
      ]
    );
  }

  /** @private */
  renderHeader({ id, eyebrow, title, subtitle }) {
    return el("header", { className: "section__header reveal" }, [
      eyebrow && el("p", { className: "section__eyebrow", text: eyebrow }),
      el("h2", { id: `${id}-title`, className: "section__title", text: title }),
      subtitle && el("p", { className: "section__subtitle", text: subtitle }),
    ]);
  }
}
