import { attrsQuery } from './css';
import { getParent, invertQuery, generateId, devMode, warn, log } from './helpers';

export const DOUBLE_DISPLAY = ['block', 'table', 'flex', 'grid'];

export const ATTRS_MAP = {};
export const DEFAULTS_MAP = {};

/**
 * @class
 * @abstract
 */
export default class NuBase extends HTMLElement {
  /**
   * Element tag name.
   * @returns {String}
   */
  static get nuTag() {
    return '';
  }

  /**
   * Default display style
   */
  static get nuDisplay() {
    return 'inline';
  }

  /**
   * Parent element
   */
  static get nuParent() {
    return Object.getPrototypeOf(this);
  }

  /**
   * @private
   */
  static get nuAllAttrs() {
    return (
      ATTRS_MAP[this.nuTag] ||
      (ATTRS_MAP[this.nuTag] = {
        ...(this.nuParent.nuAllAttrs || {}),
        ...this.nuAttrs
      })
    );
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {};
  }

  /**
   * List of attributes.
   * @returns {Array}
   */
  static get nuAttrsList() {
    return [];
  }

  /**
   * Element default attribute values.
   * They are used only to generate initial CSS for elements.
   */
  static get nuDefaults() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllDefaults() {
    return (
      DEFAULTS_MAP[this.nuTag] ||
      (DEFAULTS_MAP[this.nuTag] = {
        ...(this.nuParent.nuAllDefaults || {}),
        ...this.nuDefaults,
      })
    );
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get observedAttributes() {
    return this.nuAttrsList;
  }

  /**
   * Element initialization logic
   */
  static nuCSS({ nuTag, nuDisplay }) {
    return `
      ${
        DOUBLE_DISPLAY.includes(nuDisplay)
          ? `
          ${nuTag}:not([inline]){display:${nuDisplay};}
          ${nuTag}[inline]{display:inline-${nuDisplay};}
        `
          : `${nuTag}{display:${nuDisplay};}`
      }
      ${nuTag}[nu-hidden] {
        display: none;
      }
    `;
  }

  /**
   * @private
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  attributeChangedCallback(name, oldValue, value) {
    if (devMode) {
      if (this.hasAttribute('debug')) {
        this.nuDebug('attribute changed', { name, oldValue, value });
      }
    }

    this.nuChanged(name, oldValue, value);
  }

  /**
   * @private
   */
  connectedCallback() {
    this.nuMounted();

    this.nuIsMounted = true;
  }

  /**
   * @private
   */
  disconnectedCallback() {
    this.nuUnmounted();
  }

  /**
   * Get ID of the element. Generate it if it's not presented.
   * @returns {String}
   */
  get nuId() {
    return this.id || generateId(this);
  }

  /**
   * Set a local modifier.
   * @param {String} name
   * @param {String|boolean|*} value - TRUE sets attribute without false, FALSE = removes attribute.
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
   * @param {String} name
   * @returns {boolean}
   */
  nuHasMod(name) {
    const mod = `nu-${name}`;

    return this.hasAttribute(mod);
  }

  /**
   * Emit custom event.
   * @param {String} name
   * @param {*} detail
   */
  nuEmit(name, detail = null) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: !this.hasAttribute('prevent')
      })
    );
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {}

  /**
   * Called when element is connected to the DOM.
   * Can be called more than once.
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuMounted() {
    setTimeout(() => (this.nuParent = this.parentNode));
  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuUnmounted() {}

  /**
   * Get parent that satisfies specified selector
   * @param {String} selector
   */
  nuQueryParent(selector) {
    return getParent(this, selector);
  }

  /**
   * Get closest element that satisfies specified selector
   * @param {String} selector
   */
  nuInvertQuery(selector) {
    return invertQuery(this, selector);
  }

  /**
   * Write message to the console.
   * Works only if `debug` attribute is presented on the element.
   * @param args
   */
  nuDebug(...args) {
    if (devMode) {
      if (this.hasAttribute('debug')) {
        log({ $: this }, ...args);
      }
    } else {
      warn('forgot nuDebug() call in production');
    }
  }
}
