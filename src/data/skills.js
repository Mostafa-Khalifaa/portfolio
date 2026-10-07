/**
 * Skill catalogue.
 *
 * Deliberately avoids percentage bars: a number like "Python 87%" is not
 * measurable and reads as filler. Each skill instead carries a qualitative
 * level, which is defensible in an interview.
 */

/** Proficiency levels, ordered strongest first. `weight` drives the sort. */
export const levels = Object.freeze({
  advanced: { label: "Advanced", dots: 3, weight: 3 },
  proficient: { label: "Proficient", dots: 2, weight: 2 },
  familiar: { label: "Working knowledge", dots: 1, weight: 1 },
});

/**
 * Filter categories. `id: "all"` is injected by the component, so this list
 * holds only the real groupings.
 */
export const skillCategories = Object.freeze([
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Front-End" },
  { id: "backend", label: "Back-End" },
  { id: "ai", label: "AI & Data" },
  { id: "data", label: "Databases" },
  { id: "devops", label: "Tools & Cloud" },
]);

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {string} category  Must match a `skillCategories` id.
 * @property {keyof levels} level
 * @property {string} color     Brand colour used for the monogram tile.
 * @property {string} [short]   Overrides the auto-generated monogram.
 */

/** @type {ReadonlyArray<Skill>} */
export const skills = Object.freeze([
  // Languages
  { name: "JavaScript", category: "languages", level: "advanced", color: "#f7df1e", short: "JS" },
  { name: "TypeScript", category: "languages", level: "advanced", color: "#3178c6", short: "TS" },
  { name: "Python", category: "languages", level: "advanced", color: "#3776ab", short: "Py" },
  { name: "PHP", category: "languages", level: "proficient", color: "#777bb4" },
  { name: "SQL", category: "languages", level: "proficient", color: "#e38c00" },
  { name: "HTML5", category: "languages", level: "advanced", color: "#e34f26" },
  { name: "CSS3", category: "languages", level: "advanced", color: "#1572b6" },

  // Front-End
  { name: "React", category: "frontend", level: "advanced", color: "#61dafb" },
  { name: "Vue 3", category: "frontend", level: "advanced", color: "#4fc08d" },
  { name: "Next.js", category: "frontend", level: "proficient", color: "#8a93a6", short: "N" },
  { name: "Tailwind CSS", category: "frontend", level: "advanced", color: "#06b6d4", short: "TW" },
  { name: "Zustand", category: "frontend", level: "proficient", color: "#b4682f", short: "Zu" },
  { name: "RxJS", category: "frontend", level: "familiar", color: "#b7178c", short: "Rx" },
  { name: "Vite", category: "frontend", level: "proficient", color: "#9b5de5", short: "Vi" },

  // Back-End
  { name: "FastAPI", category: "backend", level: "advanced", color: "#009688", short: "FA" },
  { name: "Laravel", category: "backend", level: "advanced", color: "#ff2d20", short: "La" },
  { name: "Django", category: "backend", level: "proficient", color: "#2b8c6e", short: "Dj" },
  { name: "Node.js", category: "backend", level: "proficient", color: "#5fa04e", short: "No" },
  { name: "REST APIs", category: "backend", level: "advanced", color: "#6c8cff", short: "API" },
  { name: "JWT Auth", category: "backend", level: "advanced", color: "#d63aff", short: "JWT" },

  // AI & Data
  { name: "LangChain", category: "ai", level: "proficient", color: "#2fae8f", short: "LC" },
  { name: "LangGraph", category: "ai", level: "proficient", color: "#4e9f6e", short: "LG" },
  { name: "RAG", category: "ai", level: "proficient", color: "#22d3ee" },
  { name: "Agentic AI", category: "ai", level: "proficient", color: "#8b5cf6", short: "AI" },
  { name: "Pandas", category: "ai", level: "proficient", color: "#9d63d4", short: "Pd" },
  { name: "NumPy", category: "ai", level: "proficient", color: "#4dabcf", short: "Np" },
  { name: "Scikit-Learn", category: "ai", level: "familiar", color: "#f7931e", short: "Sk" },
  { name: "Matplotlib", category: "ai", level: "familiar", color: "#11a0a5", short: "Mp" },

  // Databases
  { name: "PostgreSQL", category: "data", level: "advanced", color: "#4169e1", short: "Pg" },
  { name: "MySQL", category: "data", level: "proficient", color: "#4479a1", short: "My" },

  // Tools & Cloud
  { name: "Git", category: "devops", level: "advanced", color: "#f05032" },
  { name: "GitHub", category: "devops", level: "advanced", color: "#8a93a6", short: "GH" },
  { name: "Docker", category: "devops", level: "proficient", color: "#2496ed", short: "Dk" },
  { name: "Linux", category: "devops", level: "proficient", color: "#fcc624", short: "Lx" },
  { name: "AWS", category: "devops", level: "familiar", color: "#ff9900" },
  { name: "Vercel", category: "devops", level: "proficient", color: "#8a93a6", short: "Vc" },
  { name: "Postman", category: "devops", level: "proficient", color: "#ff6c37", short: "Pm" },
  { name: "n8n", category: "devops", level: "familiar", color: "#ea4b71" },
  { name: "Figma", category: "devops", level: "proficient", color: "#f24e1e", short: "Fi" },
  { name: "Power BI", category: "devops", level: "familiar", color: "#f2c811", short: "BI" },
]);

/**
 * Short capability statements shown above the grid. These say what the
 * skills are actually used for, which a tag cloud never communicates.
 */
export const capabilities = Object.freeze([
  {
    icon: "layout",
    title: "Product front-ends",
    body: "Typed, component-driven SPAs in React and Vue 3 — accessible, responsive and state-managed.",
  },
  {
    icon: "server",
    title: "APIs & services",
    body: "REST APIs in FastAPI, Laravel and Django with RBAC, JWT auth and PostgreSQL behind them.",
  },
  {
    icon: "spark",
    title: "AI features, integrated",
    body: "RAG and LangGraph pipelines wired into product features — part of the stack, not the whole job.",
  },
  {
    icon: "tool",
    title: "Ship & operate",
    body: "Dockerised services, GitHub Actions CI/CD and deployments on Vercel and AWS.",
  },
]);
