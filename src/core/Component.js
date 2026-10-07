/**
 * Base class every renderable unit extends.
 *
 * The contract is deliberately tiny (Interface Segregation): a component
 * only has to know how to produce its own DOM node. Because every subclass
 * honours the same `render(): Node` signature, the renderer can treat them
 * interchangeably (Liskov Substitution).
 *
 * @abstract
 */
export class Component {
  /** @param {Object} [props] Data this component renders. */
  constructor(props = {}) {
    if (new.target === Component) {
      throw new TypeError("Component is abstract and cannot be instantiated.");
    }
    this.props = props;
  }

  /**
   * Build and return this component's DOM node.
   * @abstract
   * @returns {Node}
   */
  render() {
    throw new Error(`${this.constructor.name} must implement render().`);
  }

  /**
   * Render into a parent element. Shared by every subclass, so no component
   * repeats mounting logic.
   *
   * @param {ParentNode} parent
   * @returns {Node} The rendered node.
   */
  mount(parent) {
    const node = this.render();
    parent.appendChild(node);
    return node;
  }
}
