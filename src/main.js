/**
 * Composition root.
 *
 * This is the only module that knows how the application is assembled:
 * it reads the data layer, constructs components and services, injects
 * their dependencies and starts them. Every other module stays unaware of
 * the wider application, which is what keeps the pieces independently
 * testable and replaceable.
 */
import { el, qs } from "./core/dom.js";

import { config } from "./data/config.js";
import { contacts, profile } from "./data/profile.js";
import { navItems } from "./data/navigation.js";
import { projects } from "./data/projects.js";
import { capabilities, skillCategories, skills } from "./data/skills.js";
import { education, internships, leadership } from "./data/experience.js";

import { NavBar } from "./components/NavBar.js";
import { Hero } from "./components/Hero.js";
import { About } from "./components/About.js";
import { Skills } from "./components/Skills.js";
import { Projects } from "./components/Projects.js";
import { Journey } from "./components/Journey.js";
import { Contact } from "./components/Contact.js";
import { Footer } from "./components/Footer.js";

import { ThemeService } from "./services/ThemeService.js";
import { TypewriterService } from "./services/TypewriterService.js";
import { RevealService } from "./services/RevealService.js";
import { ScrollSpyService } from "./services/ScrollSpyService.js";
import { createSubmitter } from "./services/contact/Submitter.js";

/**
 * The page's sections, in render order.
 *
 * Reordering or adding a section is an edit to this list plus an entry in
 * `data/navigation.js` — no other file is involved.
 *
 * @param {{submitter: import("./services/contact/Submitter.js").Submitter}} deps
 */
function createSections({ submitter }) {
  return [
    new Hero({ profile, contacts }),

    new About({
      id: "about",
      eyebrow: "Who I am",
      title: "About me",
      profile,
    }),

    new Skills({
      id: "skills",
      eyebrow: "What I work with",
      title: "Skills & tools",
      subtitle:
        "What I build, and the stack I build it with \u2014 filter by the area you care about.",
      capabilities,
      categories: skillCategories,
      skills,
    }),

    new Projects({
      id: "projects",
      eyebrow: "Selected work",
      title: "Projects",
      subtitle:
        "Full-stack products and platforms I have designed, built and shipped.",
      items: projects,
    }),

    new Journey({
      id: "journey",
      eyebrow: "Background",
      title: "My journey",
      subtitle: "Education, hands-on experience and the teams I have led.",
      tracks: [
        { title: "Education", entries: education },
        { title: "Experience", entries: internships },
        { title: "Leadership", entries: leadership },
      ],
    }),

    new Contact({
      id: "contact",
      eyebrow: "Say hello",
      title: "Get in touch",
      subtitle:
        "Open to full-time roles and freelance work. The fastest reply is by email or WhatsApp.",
      contacts,
      submitter,
    }),
  ];
}

/** Start the long-running behaviours once the DOM exists. */
function startServices({ navBar }) {
  new TypewriterService({
    target: qs("[data-typewriter]"),
    phrases: profile.headlines,
    ...config.typewriter,
  }).start();

  new RevealService(config.reveal).start();

  new ScrollSpyService({
    sections: navItems.map((item) => document.getElementById(item.id)),
    onChange: (id) => navBar.setActive(id),
  }).start();
}

/** Reveal the page once the first paint is ready. */
function dismissLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  loader.classList.add("is-hidden");

  // `transitionend` does not fire when the transition is skipped (reduced
  // motion, background tabs), so a timer guarantees the node is removed.
  const remove = () => loader.remove();
  loader.addEventListener("transitionend", remove, { once: true });
  setTimeout(remove, 800);
}

function bootstrap() {
  const root = qs("#app");

  // Theme first, so the page never paints in the wrong palette.
  const themeService = new ThemeService({
    storageKey: config.themeStorageKey,
  }).start();

  const submitter = createSubmitter({
    endpoint: config.formEndpoint,
    fallbackEmail: contacts.find((contact) => contact.id === "email").value,
  });

  const navBar = new NavBar({ items: navItems, profile, themeService });
  navBar.mount(root);
  navBar.bindScrollState();

  const main = el("main", { id: "content" });
  createSections({ submitter }).forEach((section) => section.mount(main));
  root.appendChild(main);

  new Footer({ profile, contacts, navItems }).mount(root);

  startServices({ navBar });
  dismissLoader();
}

document.addEventListener("DOMContentLoaded", bootstrap);
