# Mostafa Khalifa — Portfolio

Personal portfolio site: a single page covering the hero, about, skills,
projects, journey and contact sections.

Built as a **static site with no build step and no runtime dependencies** —
plain ES modules, plain CSS. Open it with any static server and it runs.

---

## Running it

The site uses ES modules, so it must be served over HTTP (opening
`index.html` from the filesystem will not work).

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploying is a straight file copy: GitHub Pages, Netlify, Vercel and any
static host serve it as-is.

---

## Project structure

```
.
├── index.html                  Shell: metadata, fonts, loader, #app mount point
├── assets/                     Everything the browser downloads
│   ├── files/                  CV download
│   └── images/                 Portrait, logo, favicon and project covers
│       └── projects/           One cover per project, named <project-id>
└── src/
    ├── main.js                 Composition root — wires everything together
    ├── data/                   All content lives here; no copy in components
    │   ├── profile.js          Name, contacts, summary, headlines
    │   ├── projects.js
    │   ├── experience.js       Education, internships, leadership
    │   ├── skills.js
    │   ├── navigation.js
    │   └── config.js           Endpoints and tunable numbers
    ├── core/                   Framework-ish primitives
    │   ├── dom.js              el() / svg() / qs() helpers
    │   ├── Component.js        Abstract base: render() → Node
    │   ├── Section.js          Template Method base for page sections
    │   └── icons.js            SVG icon registry
    ├── components/             One module per section
    │   ├── NavBar.js  Hero.js  About.js  Skills.js
    │   ├── Projects.js  Journey.js  Contact.js  Footer.js
    │   └── ui.js               Shared builders (buttons, tags, bullets)
    ├── services/               Long-running behaviour
    │   ├── ThemeService.js     Light/dark, persisted
    │   ├── TypewriterService.js
    │   ├── RevealService.js    Scroll reveals (replaces WOW.js)
    │   ├── ScrollSpyService.js Active nav link
    │   └── contact/
    │       ├── Submitter.js    Transport abstraction + implementations
    │       └── validation.js   Pure validation rules
    └── styles/
        ├── main.css            Entry point, imports the layers below
        ├── base/               tokens, reset, layout, ui primitives
        └── components/         One sheet per section
```

---

## How the SOLID principles show up here

**Single responsibility.** Content lives in `src/data/`, presentation in
`src/components/`, behaviour in `src/services/`, and appearance in
`src/styles/`. Changing a project description touches one data file;
changing how projects look touches one stylesheet.

**Open/closed.** Adding a project means appending an object to
`data/projects.js` — including its repository links, which are a list, so a
project split across a client and an API repo just lists both. Adding a skill means appending to `data/skills.js`.
Adding a whole section means adding a class and one entry in the section
list in `main.js`. No existing module is edited to extend any of these.

**Liskov substitution.** Every component extends `Component` and honours the
same `render(): Node` contract, so `main.js` mounts them all identically
without knowing which is which. `Section` subclasses are likewise
interchangeable.

**Interface segregation.** The contracts are deliberately small:
`Component` requires only `render()`, `Section` only `renderBody()`, and
`Submitter` only `submit(payload)`. Nothing is forced to implement methods
it does not use.

**Dependency inversion.** The contact form depends on the abstract
`Submitter`, not on `fetch` or on Formspree; `createSubmitter()` picks the
concrete transport at startup. `ThemeService` depends on a `{get, set}`
storage object rather than on `localStorage` directly, so blocked storage
degrades gracefully instead of throwing.

---

## Things you will want to change

| What | Where |
|---|---|
| Name, email, phone, social links | `src/data/profile.js` |
| LinkedIn URL (currently a guess) | `src/data/profile.js` → `contacts` |
| Project repo / live URLs | `src/data/projects.js` → `links` |
| Skills and proficiency levels | `src/data/skills.js` |
| Contact form endpoint | `src/data/config.js` → `formEndpoint` |
| Colours, fonts, spacing | `src/styles/base/tokens.css` |
| Photo, logo, favicon | replace the file in `assets/images/` |
| Project cover | replace `assets/images/projects/<project-id>.webp` |

### Contact form

With `config.formEndpoint` empty, the form falls back to opening the
visitor's mail client, so it is never a dead end. To receive messages
properly, create a free form at [formspree.io](https://formspree.io) and
paste its URL into `formEndpoint` — the form then posts as JSON with no
other change.


---

## Accessibility and performance notes

- Semantic landmarks, a skip link, and `aria-current` on the active nav link.
- The logo is decorative markup, so the brand link carries the accessible name.
- Images are committed ready-to-serve, so a clone needs no tooling to run.
- The skill filter uses `role="tablist"` and marks hidden cards `inert`, so
  they leave the tab order and the accessibility tree.
- Form errors are tied to inputs with `aria-describedby`; status messages
  use `role="status"`.
- `prefers-reduced-motion` is respected: reveals show immediately and the
  typewriter renders statically.
- No framework, no jQuery, no Bootstrap, no WOW.js. The only network
  dependency is Google Fonts; everything else is local.
