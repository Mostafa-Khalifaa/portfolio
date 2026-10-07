import { Section } from "../core/Section.js";
import { el } from "../core/dom.js";
import { icon } from "../core/icons.js";
import { validateField, validateForm } from "../services/contact/validation.js";

/** Field definitions — adding a field here renders and validates it. */
const FIELDS = Object.freeze([
  { name: "name", label: "Your name", type: "text", placeholder: "Jane Doe", autocomplete: "name" },
  { name: "email", label: "Your email", type: "email", placeholder: "jane@company.com", autocomplete: "email" },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about the role or project…" },
]);

/**
 * Contact section: direct channels plus a validated message form.
 *
 * The component knows how to collect and validate input, but nothing about
 * where the message goes — that is the injected `submitter`'s job.
 */
export class Contact extends Section {
  /**
   * @param {Object} props
   * @param {Array<Object>} props.contacts
   * @param {import("../services/contact/Submitter.js").Submitter} props.submitter
   */
  constructor(props) {
    super(props);
    this.inputs = new Map();
    this.errorNodes = new Map();
    this.submitting = false;
  }

  renderBody() {
    return el("div", { className: "contact__grid", attrs: { "data-reveal-group": "" } }, [
      this.renderChannels(),
      this.renderForm(),
    ]);
  }

  /** @private */
  renderChannels() {
    const { contacts } = this.props;

    return el("div", { className: "contact__channels reveal" },
      contacts
        .filter((contact) => contact.primary)
        .map((contact) =>
          el("a", {
            className: "contact-card",
            attrs: {
              href: contact.href,
              target: contact.href.startsWith("http") ? "_blank" : null,
              rel: contact.href.startsWith("http") ? "noopener noreferrer" : null,
            },
          }, [
            el("span", { className: "contact-card__icon" }, [icon(contact.icon, { size: 20 })]),
            el("span", { className: "contact-card__text" }, [
              el("span", { className: "contact-card__label", text: contact.label }),
              el("strong", { className: "contact-card__value", text: contact.value }),
            ]),
          ])
        )
    );
  }

  /** @private */
  renderForm() {
    this.statusNode = el("p", {
      className: "form__status",
      attrs: { role: "status", "aria-live": "polite" },
    });

    this.submitNode = el("button", {
      className: "btn btn--primary form__submit",
      attrs: { type: "submit" },
    }, [icon("send", { size: 18 }), el("span", { text: "Send message" })]);

    this.formNode = el("form", {
      className: "form reveal",
      attrs: { novalidate: true },
      on: { submit: (event) => this.onSubmit(event) },
    }, [
      ...FIELDS.map((field) => this.renderField(field)),
      this.submitNode,
      this.statusNode,
    ]);

    return this.formNode;
  }

  /** @private */
  renderField(field) {
    const inputId = `contact-${field.name}`;
    const errorId = `${inputId}-error`;

    const shared = {
      id: inputId,
      className: "form__control",
      attrs: {
        name: field.name,
        placeholder: field.placeholder,
        autocomplete: field.autocomplete ?? null,
        "aria-describedby": errorId,
        required: true,
      },
      // Clear a field's error as soon as the visitor fixes it.
      on: { blur: () => this.validateOne(field.name), input: () => this.clearError(field.name) },
    };

    const control =
      field.type === "textarea"
        ? el("textarea", { ...shared, attrs: { ...shared.attrs, rows: 5 } })
        : el("input", { ...shared, attrs: { ...shared.attrs, type: field.type } });

    const error = el("p", { className: "form__error", id: errorId });

    this.inputs.set(field.name, control);
    this.errorNodes.set(field.name, error);

    return el("div", { className: "form__field" }, [
      el("label", { className: "form__label", text: field.label, attrs: { for: inputId } }),
      control,
      error,
    ]);
  }

  /** @private Current values, keyed by field name. */
  readValues() {
    return Object.fromEntries(
      Array.from(this.inputs, ([name, input]) => [name, input.value])
    );
  }

  /** @private */
  validateOne(name) {
    const message = validateField(name, this.inputs.get(name).value);
    this.showError(name, message);
    return message === "";
  }

  /** @private */
  showError(name, message) {
    const input = this.inputs.get(name);
    this.errorNodes.get(name).textContent = message;
    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  /** @private */
  clearError(name) {
    if (this.errorNodes.get(name).textContent) this.showError(name, "");
  }

  /** @private */
  async onSubmit(event) {
    event.preventDefault();
    if (this.submitting) return;

    const values = this.readValues();
    const { valid, errors } = validateForm(values);

    for (const field of this.inputs.keys()) {
      this.showError(field, errors[field] ?? "");
    }
    if (!valid) {
      this.setStatus("Please fix the highlighted fields.", "error");
      this.inputs.get(Object.keys(errors)[0])?.focus();
      return;
    }

    this.setBusy(true);
    try {
      const result = await this.props.submitter.submit(values);
      this.setStatus(result.message, "success");
      this.formNode.reset();
    } catch (error) {
      console.error("[Contact] submission failed:", error);
      this.setStatus(
        "Something went wrong. Please email me directly instead.",
        "error"
      );
    } finally {
      this.setBusy(false);
    }
  }

  /** @private */
  setBusy(busy) {
    this.submitting = busy;
    this.submitNode.disabled = busy;
    this.submitNode.classList.toggle("is-busy", busy);
    this.submitNode.lastChild.textContent = busy ? "Sending…" : "Send message";
  }

  /** @private */
  setStatus(message, tone) {
    this.statusNode.textContent = message;
    this.statusNode.className = `form__status form__status--${tone}`;
  }
}
