import { Section } from "../core/Section.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";
import { bulletList, tagList } from "./ui.js";

/**
 * Project showcase.
 *
 * Renders whatever the data layer provides: a project with no `live` URL
 * simply does not get a live button, so half-finished entries degrade
 * gracefully instead of rendering dead links.
 */
export class Projects extends Section {
  renderBody() {
    const { items } = this.props;

    return el(
      "div",
      { className: "projects__grid", attrs: { "data-reveal-group": "" } },
      items.map((project) => this.renderCard(project))
    );
  }

  /** @private */
  renderCard(project) {
    const className = `project reveal${project.featured ? " project--featured" : ""}`;

    return el("article", { className }, [
      this.renderCover(project),
      el("div", { className: "project__body" }, [
        el("h3", { className: "project__title", text: project.title }),
        el("p", { className: "project__summary", text: project.summary }),
        bulletList(project.highlights, "project__points"),
        tagList(project.stack, "project__stack"),
        this.renderLinks(project.links),
      ]),
    ]);
  }

  /** @private */
  renderCover(project) {
    return el("div", { className: "project__cover" }, [
      el("img", {
        attrs: {
          src: project.image,
          alt: `${project.title} cover`,
          width: 800,
          height: 450,
          loading: "lazy",
          decoding: "async",
        },
      }),
    ]);
  }

  /**
   * Renders whatever links the project declares, in order. A project split
   * across several repositories simply lists more of them, and one with
   * none renders no link row at all.
   *
   * @private
   */
  renderLinks(links = []) {
    if (links.length === 0) return null;

    return el(
      "div",
      { className: "project__links" },
      links.map(({ label, href, icon: iconName = "github" }) =>
        el("a", {
          className: "project__link",
          attrs: { href, target: "_blank", rel: "noopener noreferrer" },
        }, [icon(iconName, { size: 17 }), el("span", { text: label })])
      )
    );
  }
}
