import { svg } from "./dom.js";

/**
 * SVG icon registry.
 *
 * Each entry is a list of child shapes. Components reference icons by name
 * only, so swapping an icon set never touches a component.
 *
 * @type {Object<string, {fill?: boolean, shapes: Array<[string, Object]>}>}
 */
const ICONS = {
  mail: {
    shapes: [
      ["rect", { x: 2, y: 4, width: 20, height: 16, rx: 2 }],
      ["polyline", { points: "22,6 12,13 2,6" }],
    ],
  },
  whatsapp: {
    fill: true,
    shapes: [
      [
        "path",
        {
          d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413",
        },
      ],
    ],
  },
  github: {
    shapes: [
      [
        "path",
        {
          d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
        },
      ],
    ],
  },
  linkedin: {
    shapes: [
      [
        "path",
        { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" },
      ],
      ["rect", { x: 2, y: 9, width: 4, height: 12 }],
      ["circle", { cx: 4, cy: 4, r: 2 }],
    ],
  },
  pin: {
    shapes: [
      ["path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }],
      ["circle", { cx: 12, cy: 10, r: 3 }],
    ],
  },
  phone: {
    shapes: [
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
        },
      ],
    ],
  },
  code: {
    shapes: [
      ["polyline", { points: "16 18 22 12 16 6" }],
      ["polyline", { points: "8 6 2 12 8 18" }],
    ],
  },
  layout: {
    shapes: [
      ["rect", { x: 3, y: 3, width: 18, height: 18, rx: 2 }],
      ["line", { x1: 3, y1: 9, x2: 21, y2: 9 }],
      ["line", { x1: 9, y1: 21, x2: 9, y2: 9 }],
    ],
  },
  server: {
    shapes: [
      ["rect", { x: 2, y: 2, width: 20, height: 8, rx: 2 }],
      ["rect", { x: 2, y: 14, width: 20, height: 8, rx: 2 }],
      ["line", { x1: 6, y1: 6, x2: 6.01, y2: 6 }],
      ["line", { x1: 6, y1: 18, x2: 6.01, y2: 18 }],
    ],
  },
  spark: {
    shapes: [["path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }]],
  },
  database: {
    shapes: [
      ["ellipse", { cx: 12, cy: 5, rx: 9, ry: 3 }],
      ["path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }],
      ["path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" }],
    ],
  },
  tool: {
    shapes: [
      [
        "path",
        {
          d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        },
      ],
    ],
  },
  blocks: {
    shapes: [
      ["rect", { x: 3, y: 3, width: 7, height: 7, rx: 1 }],
      ["rect", { x: 14, y: 3, width: 7, height: 7, rx: 1 }],
      ["rect", { x: 14, y: 14, width: 7, height: 7, rx: 1 }],
      ["rect", { x: 3, y: 14, width: 7, height: 7, rx: 1 }],
    ],
  },
  users: {
    shapes: [
      ["path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: 9, cy: 7, r: 4 }],
      ["path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }],
      ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }],
    ],
  },
  download: {
    shapes: [
      ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
      ["polyline", { points: "7 10 12 15 17 10" }],
      ["line", { x1: 12, y1: 15, x2: 12, y2: 3 }],
    ],
  },
  external: {
    shapes: [
      ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }],
      ["polyline", { points: "15 3 21 3 21 9" }],
      ["line", { x1: 10, y1: 14, x2: 21, y2: 3 }],
    ],
  },
  arrowDown: {
    shapes: [
      ["line", { x1: 12, y1: 5, x2: 12, y2: 19 }],
      ["polyline", { points: "19 12 12 19 5 12" }],
    ],
  },
  send: {
    shapes: [
      ["line", { x1: 22, y1: 2, x2: 11, y2: 13 }],
      ["polygon", { points: "22 2 15 22 11 13 2 9 22 2" }],
    ],
  },
  sun: {
    shapes: [
      ["circle", { cx: 12, cy: 12, r: 5 }],
      ["line", { x1: 12, y1: 1, x2: 12, y2: 3 }],
      ["line", { x1: 12, y1: 21, x2: 12, y2: 23 }],
      ["line", { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }],
      ["line", { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }],
      ["line", { x1: 1, y1: 12, x2: 3, y2: 12 }],
      ["line", { x1: 21, y1: 12, x2: 23, y2: 12 }],
      ["line", { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }],
      ["line", { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }],
    ],
  },
  moon: {
    shapes: [["path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }]],
  },
  menu: {
    shapes: [
      ["line", { x1: 3, y1: 6, x2: 21, y2: 6 }],
      ["line", { x1: 3, y1: 12, x2: 21, y2: 12 }],
      ["line", { x1: 3, y1: 18, x2: 21, y2: 18 }],
    ],
  },
  close: {
    shapes: [
      ["line", { x1: 18, y1: 6, x2: 6, y2: 18 }],
      ["line", { x1: 6, y1: 6, x2: 18, y2: 18 }],
    ],
  },
  check: {
    shapes: [["polyline", { points: "20 6 9 17 4 12" }]],
  },
  alert: {
    shapes: [
      ["circle", { cx: 12, cy: 12, r: 10 }],
      ["line", { x1: 12, y1: 8, x2: 12, y2: 12 }],
      ["line", { x1: 12, y1: 16, x2: 12.01, y2: 16 }],
    ],
  },
  briefcase: {
    shapes: [
      ["rect", { x: 2, y: 7, width: 20, height: 14, rx: 2 }],
      ["path", { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }],
    ],
  },
  graduation: {
    shapes: [
      ["path", { d: "M22 10 12 5 2 10l10 5 10-5z" }],
      ["path", { d: "M6 12v5c3 2.5 9 2.5 12 0v-5" }],
      ["line", { x1: 22, y1: 10, x2: 22, y2: 16 }],
    ],
  },
  trophy: {
    shapes: [
      ["path", { d: "M6 3h12v6a6 6 0 0 1-12 0V3z" }],
      ["path", { d: "M6 5H3a3 3 0 0 0 3 3M18 5h3a3 3 0 0 1-3 3" }],
      ["line", { x1: 12, y1: 15, x2: 12, y2: 19 }],
      ["path", { d: "M8 21h8" }],
    ],
  },
};

/**
 * Build an icon element.
 *
 * @param {string} name   Key from the registry.
 * @param {Object} [opts]
 * @param {number} [opts.size=20]
 * @param {string} [opts.className]
 * @returns {SVGElement}
 */
export function icon(name, { size = 20, className = "" } = {}) {
  const spec = ICONS[name];
  if (!spec) throw new Error(`[icons] Unknown icon "${name}"`);

  const presentation = spec.fill
    ? { fill: "currentColor", stroke: "none" }
    : {
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.8,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      };

  return svg(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      class: `icon ${className}`.trim(),
      "aria-hidden": "true",
      focusable: "false",
      ...presentation,
    },
    spec.shapes.map(([tag, attrs]) => svg(tag, attrs))
  );
}

/** Names available in the registry — used by the data layer's validation. */
export const iconNames = Object.freeze(Object.keys(ICONS));
