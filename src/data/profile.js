/**
 * Personal identity, contact channels and the hero copy.
 * Single source of truth: edit here, never inside a component.
 */
export const profile = Object.freeze({
  name: "Mostafa Khalifa",
  role: "Full-Stack Software Engineer",
  location: "Alexandria, Egypt",
  militaryStatus: "Exempted",
  cvPath: "assets/files/Mostafa-Khalifa-CV.pdf",
  cvFileName: "Mostafa-Khalifa-CV.pdf",
  /**
   * The logo is an alpha mask, not a picture: the nav tints it with
   * `currentColor`, so one file works on both the paper and the ink theme.
   * Replace either file in `assets/images/` to change them.
   */
  logo: "assets/images/logo.png",
  heroImage: "assets/images/hero-portrait.webp",

  /** Rotated by the typewriter in the hero. */
  headlines: [
    "Full-Stack Engineer.",
    "Python & FastAPI Developer.",
    "React & TypeScript Developer.",
    "Laravel & Vue Developer.",
  ],

  tagline:
    "I build full-stack web applications, RESTful APIs and containerized microservices — " +
    "from clean, typed React and Vue front-ends to scalable Python and Laravel back-ends.",

  summary:
    "Software Engineer, Computer Science graduate (Excellent with Honors) and ITI Open Source Track graduate. " +
    "Experienced in building full-stack web applications, RESTful APIs and containerized microservices using " +
    "Python (FastAPI, Django), React, TypeScript and Docker. Focused on clean architecture, scalable " +
    "data-driven services and cloud integration.",

  availability: ["Full-time roles", "Freelance projects"],

  highlights: [
    { value: "3.6", label: "GPA / 4.0 (Excellent)" },
    { value: "10+", label: "Full-stack projects" },
    { value: "2", label: "Development internships" },
  ],

  languages: [
    { name: "Arabic", level: "Native proficiency" },
    { name: "English", level: "Very good reading & writing" },
  ],
});

/**
 * Contact channels. `primary: true` entries are surfaced as contact cards;
 * `social: true` entries are rendered as icon links in the hero and footer.
 */
export const contacts = Object.freeze([
  {
    id: "email",
    label: "Email",
    value: "mostafa.khalifa.m22@gmail.com",
    href: "mailto:mostafa.khalifa.m22@gmail.com",
    icon: "mail",
    primary: true,
    social: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+20 155 976 7177",
    href: "https://wa.me/201559767177",
    icon: "whatsapp",
    primary: true,
    social: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "Mostafa-Khalifaa",
    href: "https://github.com/Mostafa-Khalifaa",
    icon: "github",
    primary: true,
    social: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Mostafa Khalifa",
    // TODO: replace with your exact LinkedIn vanity URL.
    href: "https://www.linkedin.com/in/mostafa-khalifa",
    icon: "linkedin",
    primary: true,
    social: true,
  },
  {
    id: "location",
    label: "Location",
    value: "Alexandria, Egypt",
    href: "https://maps.google.com/?q=Alexandria,Egypt",
    icon: "pin",
    primary: false,
    social: false,
  },
]);
