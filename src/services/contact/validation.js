/**
 * Pure validation rules for the contact form.
 *
 * Kept free of DOM access so the rules can be unit-tested and reused by any
 * future form without dragging the UI along.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** @type {Object<string, Array<{test: (v: string) => boolean, message: string}>>} */
const RULES = {
  name: [
    { test: (v) => v.trim().length > 0, message: "Please enter your name." },
    { test: (v) => v.trim().length >= 2, message: "Name is too short." },
  ],
  email: [
    { test: (v) => v.trim().length > 0, message: "Please enter your email." },
    { test: (v) => EMAIL_PATTERN.test(v.trim()), message: "That email looks invalid." },
  ],
  message: [
    { test: (v) => v.trim().length > 0, message: "Please write a message." },
    { test: (v) => v.trim().length >= 10, message: "Message must be at least 10 characters." },
  ],
};

/**
 * Validate one field.
 * @returns {string} Error message, or an empty string when valid.
 */
export function validateField(field, value) {
  const failed = (RULES[field] ?? []).find((rule) => !rule.test(value ?? ""));
  return failed ? failed.message : "";
}

/**
 * Validate a whole payload.
 * @param {Object<string, string>} values
 * @returns {{valid: boolean, errors: Object<string, string>}}
 */
export function validateForm(values) {
  const errors = {};
  for (const field of Object.keys(RULES)) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
