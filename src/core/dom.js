/**
 * Minimal DOM construction helpers.
 *
 * Everything is built with `document.createElement` and `textContent`, so
 * content coming from the data layer can never be interpreted as markup.
 */

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Create an element.
 *
 * @param {string} tag
 * @param {Object} [props]
 * @param {string}  [props.className]
 * @param {string}  [props.id]
 * @param {string}  [props.text]     Sets textContent (escaped by the DOM).
 * @param {Object}  [props.attrs]    Plain attributes; null/undefined are skipped.
 * @param {Object}  [props.dataset]  data-* attributes.
 * @param {Object}  [props.on]       Event listeners keyed by event name.
 * @param {Object}  [props.style]    Inline style properties.
 * @param {Array<Node|string|null|false|undefined>} [children]
 * @returns {HTMLElement}
 */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  applyProps(node, props);
  append(node, children);
  return node;
}

/**
 * Create an SVG element. SVG needs its own namespace, so it cannot share
 * the `el` implementation.
 *
 * @param {string} tag
 * @param {Object<string, string|number>} [attrs]
 * @param {Array<Node>} [children]
 * @returns {SVGElement}
 */
export function svg(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== null && value !== undefined) {
      node.setAttribute(key, String(value));
    }
  }
  children.filter(Boolean).forEach((child) => node.appendChild(child));
  return node;
}

/**
 * Append children, skipping falsy entries so callers can write
 * `[condition && node]` inline.
 *
 * @param {Node} parent
 * @param {Array<Node|string|null|false|undefined>|Node|string} children
 */
export function append(parent, children) {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    parent.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  }
  return parent;
}

/** Remove every child of `node`. */
export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
  return node;
}

/**
 * Query a single element, throwing when it is missing so a broken mount
 * point fails loudly at startup instead of silently rendering nothing.
 *
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {HTMLElement}
 */
export function qs(selector, scope = document) {
  const found = scope.querySelector(selector);
  if (!found) throw new Error(`[dom] No element matches "${selector}"`);
  return /** @type {HTMLElement} */ (found);
}

/** Query all matching elements as a real array. */
export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/**
 * Apply inline styles.
 *
 * Custom properties (`--x`) must go through `setProperty`: assigning them
 * on the style object is silently ignored, which would make any token a
 * component sets per-instance quietly do nothing.
 *
 * @private
 */
function applyStyle(node, style) {
  for (const [property, value] of Object.entries(style)) {
    if (value === null || value === undefined) continue;
    if (property.startsWith("--")) node.style.setProperty(property, String(value));
    else node.style[property] = value;
  }
}

/** @private */
function applyProps(node, props) {
  const { className, id, text, attrs, dataset, on, style } = props;

  if (className) node.className = className;
  if (id) node.id = id;
  if (text !== undefined) node.textContent = String(text);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      node.setAttribute(key, value === true ? "" : String(value));
    }
  }
  if (dataset) {
    for (const [key, value] of Object.entries(dataset)) {
      if (value !== null && value !== undefined) node.dataset[key] = String(value);
    }
  }
  if (on) {
    for (const [event, handler] of Object.entries(on)) {
      node.addEventListener(event, handler);
    }
  }
  if (style) applyStyle(node, style);
}
