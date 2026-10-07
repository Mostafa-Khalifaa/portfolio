/**
 * Contact-form transport abstraction.
 *
 * `ContactFormService` depends on this interface, never on a concrete
 * transport (Dependency Inversion). Adding, say, an EmailJS or custom-API
 * transport means adding a class here — the form component is untouched.
 *
 * @abstract
 */
export class Submitter {
  /**
   * @param {{name: string, email: string, message: string}} payload
   * @returns {Promise<{ok: boolean, message: string}>}
   */
  // eslint-disable-next-line no-unused-vars
  async submit(payload) {
    throw new Error(`${this.constructor.name} must implement submit().`);
  }
}

/** Posts the message to a Formspree endpoint as JSON. */
export class FormspreeSubmitter extends Submitter {
  /** @param {string} endpoint */
  constructor(endpoint) {
    super();
    if (!endpoint) throw new Error("[Formspree] An endpoint URL is required.");
    this.endpoint = endpoint;
  }

  async submit(payload) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Form service responded with ${response.status}`);
    }
    return { ok: true, message: "Thanks! Your message has been sent." };
  }
}

/**
 * Fallback transport: opens the visitor's mail client with the message
 * pre-filled. Used while no form endpoint is configured, so the contact
 * form is never a dead end.
 */
export class MailtoSubmitter extends Submitter {
  /** @param {string} address */
  constructor(address) {
    super();
    this.address = address;
  }

  async submit({ name, email, message }) {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${this.address}?subject=${subject}&body=${body}`;

    return { ok: true, message: "Opening your email app…" };
  }
}

/**
 * Pick a transport from configuration.
 *
 * @param {{endpoint: string, fallbackEmail: string}} options
 * @returns {Submitter}
 */
export function createSubmitter({ endpoint, fallbackEmail }) {
  return endpoint
    ? new FormspreeSubmitter(endpoint)
    : new MailtoSubmitter(fallbackEmail);
}
