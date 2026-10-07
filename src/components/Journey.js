import { Section } from "../core/Section.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";

/** Badge and icon per entry kind. Adding a kind needs no component change. */
const KIND_META = Object.freeze({
  education: { label: "Education", icon: "graduation" },
  internship: { label: "Experience", icon: "briefcase" },
  leadership: { label: "Leadership", icon: "trophy" },
});

/**
 * Combined timeline of education, internships and leadership roles.
 *
 * Takes pre-grouped tracks so the ordering is a data decision rather than
 * something hard-coded into the markup.
 */
export class Journey extends Section {
  /**
   * @param {Object} props
   * @param {Array<{title: string, entries: Array<Object>}>} props.tracks
   */
  renderBody() {
    const { tracks } = this.props;

    return el(
      "div",
      { className: "journey", attrs: { "data-reveal-group": "" } },
      tracks.map((track) => this.renderTrack(track))
    );
  }

  /** @private */
  renderTrack({ title, entries }) {
    return el("div", { className: "journey__track reveal" }, [
      el("h3", { className: "journey__track-title", text: title }),
      el("ol", { className: "timeline" }, entries.map((entry) => this.renderEntry(entry))),
    ]);
  }

  /** @private */
  renderEntry(entry) {
    const meta = KIND_META[entry.kind] ?? KIND_META.education;

    return el("li", { className: "timeline__item reveal" }, [
      el("span", { className: "timeline__marker", attrs: { "aria-hidden": "true" } }, [
        icon(meta.icon, { size: 16 }),
      ]),
      el("div", { className: "timeline__content" }, [
        el("div", { className: "timeline__top" }, [
          el("h4", { className: "timeline__title", text: entry.title }),
          el("span", { className: "timeline__period", text: entry.period }),
        ]),
        el("p", { className: "timeline__subtitle", text: entry.subtitle }),
        entry.location &&
          el("p", { className: "timeline__location" }, [
            icon("pin", { size: 14 }),
            el("span", { text: entry.location }),
          ]),
        el(
          "ul",
          { className: "timeline__points" },
          entry.points.map((point) => el("li", { text: point }))
        ),
      ]),
    ]);
  }
}
