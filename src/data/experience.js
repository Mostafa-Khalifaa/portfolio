/**
 * Timeline entries. `kind` selects the badge shown on the card, so a new
 * category can be introduced without touching the Timeline component.
 */

/**
 * @typedef {Object} TimelineEntry
 * @property {string}   id
 * @property {"education"|"internship"|"leadership"} kind
 * @property {string}   title        Institution or company.
 * @property {string}   subtitle     Degree or job title.
 * @property {string}   period
 * @property {string}  [location]
 * @property {string[]} points
 */

/** @type {ReadonlyArray<TimelineEntry>} */
export const education = Object.freeze([
  {
    id: "iti",
    kind: "education",
    title: "Information Technology Institute (ITI)",
    subtitle: "9-Month Professional Diploma — Open Source Track",
    period: "Oct 2025 — Aug 2026",
    location: "Cairo, Egypt",
    points: [
      "Graduated Aug 2026 from the 9-month intensive Open Source Track.",
      "Covered open-source web development, Linux, Docker and DevOps practices.",
    ],
  },
  {
    id: "pharos",
    kind: "education",
    title: "Pharos University",
    subtitle: "BSc in Computer Science — GPA 3.6/4.0 (Excellent with Honors)",
    period: "Sep 2021 — Jul 2025",
    location: "Alexandria, Egypt",
    points: [
      "Graduation project: Solving Sphere, a competitive programming platform (Grade: A+).",
      "Coursework focused on data structures, OOP, databases and software architecture.",
    ],
  },
]);

/** @type {ReadonlyArray<TimelineEntry>} */
export const internships = Object.freeze([
  {
    id: "almadrasa",
    kind: "internship",
    title: "Almadrasa",
    subtitle: "Front-End Web Development Intern",
    period: "Jul 2024 — Dec 2024",
    location: "Online",
    points: [
      "Engineered and deployed 20+ interactive web projects across JavaScript, HTML5, CSS3 and Python.",
      "Managed the full frontend lifecycle from design handoff to deployment, focusing on responsive UIs.",
    ],
  },
  {
    id: "rmztech",
    kind: "internship",
    title: "RMZtech",
    subtitle: "Front-End Development Intern",
    period: "Jul 2023 — Aug 2023",
    location: "Alexandria, Egypt",
    points: [
      "Built responsive UIs using Vue.js, Tailwind CSS and Bootstrap.",
      "Followed accessibility standards to ensure cross-device usability.",
      "Enhanced front-end modularity by introducing reusable UI components.",
    ],
  },
]);

/** @type {ReadonlyArray<TimelineEntry>} */
export const leadership = Object.freeze([
  {
    id: "icpc",
    kind: "leadership",
    title: "International Collegiate Programming Contest (ICPC)",
    subtitle: "Participant & Student Mentor",
    period: "University years",
    points: [
      "Competed in regional contests with a focus on algorithms and clean architectural patterns.",
      "Mentored junior student teams on core programming logic and collaborative development.",
    ],
  },
  {
    id: "student-union",
    kind: "leadership",
    title: "Student Union — Pharos University",
    subtitle: "Head of Committee",
    period: "Two consecutive years",
    points: [
      "Led a student committee managing campus-wide events and academic initiatives.",
      "Directed cross-functional collaboration to enhance student experience and community impact.",
    ],
  },
]);
