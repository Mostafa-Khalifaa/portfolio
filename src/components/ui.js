/**
 * Small presentational builders shared by several sections.
 *
 * These are plain functions rather than classes: they hold no state and have
 * no lifecycle, so a class would add ceremony without adding capability.
 */
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";

/**
 * A pill list of short labels.
 * @param {Array<string>} items
 * @param {string} [className]
 */
export function tagList(items, className = "") {
  return el(
    "ul",
    { className: `tags ${className}`.trim() },
    items.map((label) => el("li", { className: "tag", text: label }))
  );
}

/**
 * Anchor styled as a button.
 *
 * @param {Object} options
 * @param {string} options.href
 * @param {string} options.label
 * @param {string} [options.iconName]
 * @param {"primary"|"ghost"|"outline"} [options.variant]
 * @param {string} [options.download] Filename, when the link is a download.
 * @param {boolean} [options.external] Opens in a new tab with safe rel.
 * @param {string} [options.className]
 */
export function linkButton({
  href,
  label,
  iconName,
  variant = "primary",
  download,
  external = false,
  className = "",
}) {
  return el(
    "a",
    {
      className: `btn btn--${variant} ${className}`.trim(),
      attrs: {
        href,
        download: download ?? null,
        target: external ? "_blank" : null,
        rel: external ? "noopener noreferrer" : null,
      },
    },
    [iconName && icon(iconName, { size: 18 }), el("span", { text: label })]
  );
}

/**
 * Icon-only link, used for social profiles.
 *
 * @param {{href: string, iconName: string, label: string}} options
 */
export function iconLink({ href, iconName, label }) {
  return el(
    "a",
    {
      className: "icon-link",
      attrs: {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": label,
        title: label,
      },
    },
    [icon(iconName, { size: 20 })]
  );
}

/**
 * Labelled bullet list.
 * @param {string[]} points
 * @param {string} [className]
 */
export function bulletList(points, className = "") {
  return el(
    "ul",
    { className: `bullets ${className}`.trim() },
    points.map((point) =>
      el("li", {}, [icon("check", { size: 16, className: "bullets__mark" }), el("span", { text: point })])
    )
  );
}
