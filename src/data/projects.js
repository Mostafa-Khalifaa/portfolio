/**
 * Project catalogue.
 *
 * Open/Closed: adding a project means appending an object here —
 * no component, template or stylesheet needs to change.
 *
 * @typedef {Object} ProjectLink
 * @property {string} label
 * @property {string} href
 * @property {"github"|"external"} icon
 *
 * @typedef {Object} Project
 * @property {string}   id        Stable slug, also the cover image filename.
 * @property {string}   title
 * @property {string}   summary   One-line pitch shown under the title.
 * @property {string[]} highlights Bullet points describing the work.
 * @property {string[]} stack     Technology tags.
 * @property {string}   image     Path to the cover image.
 * @property {boolean} [featured] Featured cards span two columns.
 * @property {ProjectLink[]} links Rendered in order; an empty list renders none.
 */

/** @type {ReadonlyArray<Project>} */
export const projects = Object.freeze([
  {
    id: "manikan",
    title: "Manikan — Virtual Try-On Platform",
    summary:
      "Fashion e-commerce platform where shoppers get their size and preview garments before buying.",
    highlights: [
      "Engineered a microservices platform with the backend services built in Python and FastAPI.",
      "Built the size-assistant and recommendation services on a RAG and LangGraph pipeline.",
      "Developed the storefront in Next.js and React, integrating the measurement and try-on APIs.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "RAG", "Next.js", "PostgreSQL"],
    image: "assets/images/projects/manikan.webp",
    featured: true,
    links: [
      { label: "Code", href: "https://github.com/Mostafa-Khalifaa/monorepo", icon: "github" },
    ],
  },
  {
    id: "iti-attendance",
    title: "ITI Attendance & Grading Platform",
    summary:
      "Academic portal for tracking intake rosters, attendance, grades and at-risk students.",
    highlights: [
      "Collaborated in a 5-member team on an academic management system with complex hierarchical data.",
      "Developed a Laravel REST API with strict Role-Based Access Control via Sanctum.",
      "Built a modular Vue 3 + TypeScript SPA with QR-code attendance and real-time analytics.",
    ],
    stack: ["Vue 3", "TypeScript", "Laravel 11", "PostgreSQL", "Docker"],
    image: "assets/images/projects/iti-attendance.webp",
    featured: false,
    links: [
      {
        label: "Client",
        href: "https://github.com/Mostafa-Khalifaa/intake45-attendance-client",
        icon: "github",
      },
      {
        label: "API",
        href: "https://github.com/Mostafa-Khalifaa/intake46-attendance-api",
        icon: "github",
      },
    ],
  },
  {
    id: "fundly",
    title: "Fundly Crowdfunding",
    summary:
      "Crowdfunding platform for browsing campaigns by category and backing them.",
    highlights: [
      "Contributed to both the UI implementation and the backend API integration.",
      "Integrated a Django REST Framework backend with threaded comments and live donation tracking.",
      "Implemented protected routing and JWT authentication, deployed on Vercel.",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Zustand", "Django"],
    image: "assets/images/projects/fundly.webp",
    featured: false,
    links: [
      {
        label: "Frontend",
        href: "https://github.com/Mostafa-Khalifaa/fundly-frontend",
        icon: "github",
      },
      {
        label: "Backend",
        href: "https://github.com/Mostafa-Khalifaa/Fundly-Backend",
        icon: "github",
      },
    ],
  },
  {
    id: "solving-sphere",
    title: "Solving Sphere — Graduation Project",
    summary:
      "Competitive programming platform graded A+, with live judge scraping and debugging hints.",
    highlights: [
      "Built the platform with Laravel and React (Inertia.js): role-based access, roadmaps and blogs.",
      "Developed a Python/FastAPI microservice using Selenium to scrape live HackerEarth data.",
      "Integrated the Ollama API for debugging hints; CI/CD via GitHub Actions and Pest.",
    ],
    stack: ["Laravel", "React", "Inertia.js", "FastAPI", "Selenium", "Ollama"],
    image: "assets/images/projects/solving-sphere.webp",
    featured: true,
    links: [
      {
        label: "Code",
        href: "https://github.com/Mostafa-Khalifaa/SolvingSphere",
        icon: "github",
      },
    ],
  },
]);
