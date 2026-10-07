import { Section } from "../core/Section.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";
import { levels } from "../data/skills.js";

const ALL = "all";

/**
 * Skills section: four capability statements, then a filterable grid of
 * technologies.
 *
 * Proficiency is shown as three dots against a named level rather than a
 * percentage, because an invented percentage is not something you can
 * defend in an interview.
 *
 * Filtering toggles a class instead of re-rendering, so the cards keep
 * their DOM identity and CSS can animate between states.
 */
export class Skills extends Section {
  /**
   * @param {Object} props
   * @param {Array<Object>} props.skills
   * @param {Array<{id: string, label: string}>} props.categories
   * @param {Array<Object>} props.capabilities
   */
  constructor(props) {
    super(props);
    this.cardNodes = [];
    this.filterNodes = new Map();
    this.activeFilter = ALL;
  }

  renderBody() {
    return [
      this.renderCapabilities(),
      this.renderFilters(),
      this.renderGrid(),
      this.renderLegend(),
    ];
  }

  /** @private */
  renderCapabilities() {
    const { capabilities } = this.props;

    return el(
      "div",
      { className: "capabilities", attrs: { "data-reveal-group": "" } },
      capabilities.map((capability) =>
        el("article", { className: "capability reveal" }, [
          el("span", { className: "capability__icon" }, [icon(capability.icon, { size: 20 })]),
          el("h3", { className: "capability__title", text: capability.title }),
          el("p", { className: "capability__body", text: capability.body }),
        ])
      )
    );
  }

  /** @private */
  renderFilters() {
    const { categories, skills } = this.props;

    const options = [
      { id: ALL, label: "All", count: skills.length },
      ...categories.map((category) => ({
        ...category,
        count: skills.filter((skill) => skill.category === category.id).length,
      })),
    ];

    return el(
      "div",
      {
        className: "filters reveal",
        attrs: { role: "tablist", "aria-label": "Filter skills by category" },
      },
      options.map((option) => this.renderFilter(option))
    );
  }

  /** @private */
  renderFilter({ id, label, count }) {
    const button = el("button", {
      className: `filter${id === this.activeFilter ? " is-active" : ""}`,
      attrs: {
        type: "button",
        role: "tab",
        "aria-selected": String(id === this.activeFilter),
      },
      on: { click: () => this.applyFilter(id) },
    }, [
      el("span", { text: label }),
      el("span", { className: "filter__count", text: String(count) }),
    ]);

    this.filterNodes.set(id, button);
    return button;
  }

  /** @private */
  renderGrid() {
    const { skills } = this.props;

    // Strongest skills first, then alphabetically, so the grid opens well.
    const ordered = [...skills].sort(
      (a, b) =>
        levels[b.level].weight - levels[a.level].weight ||
        a.name.localeCompare(b.name)
    );

    this.gridNode = el(
      "div",
      { className: "skills__grid", attrs: { "data-reveal-group": "" } },
      ordered.map((skill) => this.renderCard(skill))
    );

    return this.gridNode;
  }

  /** @private */
  renderCard(skill) {
    const level = levels[skill.level];
    const monogram = skill.short ?? skill.name.slice(0, 2);

    const card = el("article", {
      className: "skill reveal",
      dataset: { category: skill.category },
      // Tints the tile and its glow without a per-skill CSS rule.
      style: { "--skill-color": skill.color },
    }, [
      el("span", { className: "skill__tile", attrs: { "aria-hidden": "true" }, text: monogram }),
      el("div", { className: "skill__text" }, [
        el("h4", { className: "skill__name", text: skill.name }),
        el("span", { className: "skill__level", text: level.label }),
      ]),
      this.renderDots(level, skill.name),
    ]);

    this.cardNodes.push(card);
    return card;
  }

  /** @private Three dots, `level.dots` of them filled. */
  renderDots(level, skillName) {
    return el(
      "span",
      {
        className: "skill__dots",
        attrs: { role: "img", "aria-label": `${skillName}: ${level.label}` },
      },
      [1, 2, 3].map((position) =>
        el("span", {
          className: `skill__dot${position <= level.dots ? " is-filled" : ""}`,
        })
      )
    );
  }

  /** @private */
  renderLegend() {
    return el(
      "p",
      { className: "skills__legend reveal" },
      Object.values(levels)
        .sort((a, b) => b.weight - a.weight)
        .map((level) =>
          el("span", { className: "skills__legend-item" }, [
            el("span", { className: "skill__dots" },
              [1, 2, 3].map((position) =>
                el("span", {
                  className: `skill__dot${position <= level.dots ? " is-filled" : ""}`,
                })
              )
            ),
            el("span", { text: level.label }),
          ])
        )
    );
  }

  /** @private */
  applyFilter(categoryId) {
    this.activeFilter = categoryId;

    for (const [id, button] of this.filterNodes) {
      const isActive = id === categoryId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }

    for (const card of this.cardNodes) {
      const matches = categoryId === ALL || card.dataset.category === categoryId;
      card.classList.toggle("is-filtered-out", !matches);
      // Keep hidden cards out of the tab order and the accessibility tree.
      card.toggleAttribute("inert", !matches);
    }
  }
}
