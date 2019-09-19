import { attrsQuery, generateCSS, injectStyleTag } from './css';
import {
  getParent,
  invertQuery,
  generateId,
  devMode,
  warn,
  log,
  computeStyles,
  invertQueryById
} from './helpers';

export const DOUBLE_DISPLAY = ['block', 'table', 'flex', 'grid'];

export const ATTRS_MAP = {};
export const DEFAULTS_MAP = {};

/**
 * List of all Nude tags.
 * @type {String[]}
 */
export const TAG_LIST = [];
/**
 * List of all Nude tags that are inline.
 * @type {String[]}
 */
export const INLINE_TAG_LIST = [];
/**
 * List of all Nude tags that are not inline.
 * @type {String[]}
 */
export const BLOCK_TAG_LIST = [];

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
    return {
      id: '',
    };
  }

  /**
   * List of attributes.
   * @returns {Array}
   */
  static get nuAttrsList() {
    return Object.keys(this.nuAllAttrs);
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

  static nuInit() {
    const tag = this.nuTag;

    if (!tag || TAG_LIST.includes(tag)) return;

    TAG_LIST.push(tag);

    [this.nuDisplay.startsWith('inline') ? INLINE_TAG_LIST : BLOCK_TAG_LIST].push(tag);

    let el = this,
      css = '';

    do {
      if (!el.nuCSS) break;
      if (el.nuCSS === (el.nuParent && el.nuParent.nuCSS)) continue;

      css = `${el.nuCSS(this)}${css}`;
    } while ((el = el.nuParent));

    const allAttrs = this.nuAllAttrs;
    const allDefaults = this.nuAllDefaults;

    let defaultsCSS = '';

    Object.keys(allDefaults)
      .forEach(name => {
        const value = allDefaults[name];

        if (value == null) return;

        const styles = computeStyles(name, String(value), allAttrs);

        if (!styles) return;

        const query = name === 'mod' ? tag : `${tag}:not([${name}])`;

        defaultsCSS += generateCSS(query, styles);
      });

    injectStyleTag(`${css}${defaultsCSS}`, tag);

    customElements.define(tag, this);

    log('custom element registered', tag);

    return tag;
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
      ${nuTag}{
        box-sizing: border-box;
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
    if (this.id && this.id.includes('--')) return this.id;

    return generateId(this);
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
  nuChanged(name, oldValue, value) {
    if (name === 'id') {
      return this.nuId;
    }
  }

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
  nuUnmounted() {
  }

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
   * Get closest element that satisfies specified selector
   * @param {String} id
   */
  nuInvertQueryById(id) {
    return invertQueryById(this, id);
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
