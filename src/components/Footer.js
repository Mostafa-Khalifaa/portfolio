import { Component } from "../core/Component.js";
import { el } from "../core/dom.js";
import { iconLink } from "./ui.js";

/** Closing bar: brand, quick links, social icons and the copyright line. */
export class Footer extends Component {
  render() {
    const { profile, contacts, navItems } = this.props;

    return el("footer", { className: "footer" }, [
      el("div", { className: "container footer__inner" }, [
        el("div", { className: "footer__brand" }, [
          el("p", { className: "footer__name", text: profile.name }),
          el("p", { className: "footer__role", text: profile.role }),
        ]),

        el("nav", { className: "footer__nav", attrs: { "aria-label": "Footer" } },
          navItems.map((item) =>
            el("a", { text: item.label, attrs: { href: `#${item.id}` } })
          )
        ),

        el("div", { className: "footer__socials" },
          contacts
            .filter((contact) => contact.social)
            .map((contact) =>
              iconLink({ href: contact.href, iconName: contact.icon, label: contact.label })
            )
        ),
      ]),

      el("div", { className: "container footer__bottom" }, [
        el("p", {
          text: `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`,
        }),
        el("p", { className: "footer__built", text: "Built with vanilla JavaScript — no framework." }),
      ]),
    ]);
  }
}
