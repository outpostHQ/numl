import { attrsQuery, stylesString, inject, injectCSS, hasCSS } from './css';
import { getParent, invertQuery } from './helpers';

/**
 * @class
 * @abstract
 */
class NuBase extends HTMLElement {
  /**
   * Element tag name.
   * @returns {string}
   */
  static get nuTag() {
    return '';
  }

  /**
   * Element attributes list.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {};
  }

  static get nuAttrsList() {
    return Object.keys(this.nuAttrs);
  }

  /**
   * Element default attribute values
   * @returns {{}}
   */
  static get nuDefaultAttrs() {
    return {};
  }

  /**
   * @private
   * @returns {string[]}
   */
  static get observedAttributes() {
    return this.nuAttrsList;
  }

  /**
   * Element's default styles
   * @returns {Object}
   */
  static get nuDefaultStyles() {
    return null;
  }

  /**
   * Element initialization logic
   */
  static nuInit() {
    if (!this.nuDefaultStyles) return;

    const tag = this.nuTag;
    const styles = stylesString(this.nuDefaultStyles);

    inject(`${tag}{${styles}}`, tag);
  }

  /**
   * @private
   * @param {string} name
   * @param {*} oldValue
   * @param {*} value
   */
  attributeChangedCallback(name, oldValue, value) {
    this.nuChanged(name, oldValue, value);
  }

  /**
   * @private
   */
  connectedCallback() {
    this.nuMounted();

    this.nuIsMounted = true;
  }

  disconnectedCallback() {
    this.nuDestroyed();
  }

  /**
   * Set a local modifier
   * @param {string} name
   * @param {string|boolean|*} value - TRUE sets attribute without false, FALSE = removes attribute.
   */
  nuSetMod(name, value) {
    const mod = `nu-${name}`;

    if (value === false || value == null) {
      this.removeAttribute(mod);
    } else {
      this.setAttribute(mod, value === true ? '' : value);
    }
  }

  /**
   * Check if element have a local modifier with specific name.
   * @param {string} name
   * @returns {boolean}
   */
  nuHasMod(name) {
    const mod = `nu-${name}`;

    return this.hasAttribute(mod);
  }

  nuGetQuery(attrs = {}) {
    return `${this.constructor.nuTag}${attrsQuery(attrs)}`;
  }

  /**
   * Emit custom event.
   * @param {string} name
   * @param {*} detail
   */
  nuEmit(name, detail = null) {
    this.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: !this.hasAttribute('prevent'),
    }));
  }

  nuChanged(name, oldValue, value) {}

  /**
   * @param {String} name
   * @param {String} value
   * @returns {Object}
   */
  nuGenerate(name, value) {}

  nuMounted() {}

  nuDestroyed() {}

  /**
   * Get parent that satisfies specified selector
   * @param {string} selector
   */
  nuQueryParent(selector) {
    return getParent(this, selector);
  }

  /**
   * Get closest element that satisfies specified selector
   * @param {string} selector
   */
  nuInvertQuery(selector) {
    return invertQuery(this, selector);
  }
}

export default NuBase;
