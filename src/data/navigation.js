/**
 * Navigation model. Each item's `id` must match a section id rendered by
 * the section registry in `src/main.js`, which is what the scroll-spy
 * observes to highlight the active link.
 */
export const navItems = Object.freeze([
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
]);
