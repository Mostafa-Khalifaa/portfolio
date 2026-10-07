import { Section } from "../core/Section.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";
import { tagList } from "./ui.js";

/**
 * Narrative summary, availability, spoken languages and credentials.
 *
 * Deliberately has no portrait: the photograph appears once, in the hero,
 * so repeating it here would only dilute it.
 */
export class About extends Section {
  renderBody() {
    const { profile } = this.props;

    return el("div", { className: "about", attrs: { "data-reveal-group": "" } }, [
      el("p", { className: "about__summary reveal", text: profile.summary }),
      el("div", { className: "about__cards" }, [
        this.renderAvailability(profile.availability),
        this.renderLanguages(profile.languages),
      ]),
      el("div", { className: "about__facts" }, this.renderCredentials(profile)),
    ]);
  }

  /** @private */
  renderAvailability(availability) {
    return el("div", { className: "about__card reveal" }, [
      el("h3", { className: "about__card-title" }, [
        el("span", { className: "status-dot", attrs: { "aria-hidden": "true" } }),
        el("span", { text: "Available for" }),
      ]),
      tagList(availability),
    ]);
  }

  /** @private */
  renderLanguages(languages) {
    return el("div", { className: "about__card reveal" }, [
      el("h3", { className: "about__card-title", text: "Languages" }),
      el(
        "ul",
        { className: "about__languages" },
        languages.map(({ name, level }) =>
          el("li", {}, [
            el("strong", { text: name }),
            el("span", { text: level }),
          ])
        )
      ),
    ]);
  }

  /** @private */
  renderCredentials(profile) {
    const entries = [
      { icon: "graduation", label: "BSc Computer Science", value: "Excellent with Honors" },
      { icon: "pin", label: "Based in", value: profile.location },
      { icon: "briefcase", label: "Military status", value: profile.militaryStatus },
    ];

    return entries.map((entry) =>
      el("div", { className: "about__fact reveal" }, [
        el("span", { className: "about__fact-icon" }, [icon(entry.icon, { size: 18 })]),
        el("div", {}, [
          el("span", { className: "about__fact-label", text: entry.label }),
          el("strong", { text: entry.value }),
        ]),
      ])
    );
  }
}
