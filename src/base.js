import { beautifyCSS, generateCSS, injectStyleTag } from './css';
import {
  getParent,
  invertQuery,
  generateId,
  devMode,
  warn,
  log,
  computeStyles,
  invertQueryById, error
} from './helpers';
import transformMixin from './mixins/transform';
import backgroundMixin from './mixins/background';
import shadowMixin from './mixins/shadow';
import { checkPropIsDeclarable, declareProp, GLOBAL_ATTRS } from './compatibility';
import displayAttr from './attributes/display';

export const ATTRS_MAP = {};
export const DEFAULTS_MAP = {};

export function getAllAttrs() {
  return Object.keys(ATTRS_MAP).reduce((arr, tag) => {
    const map = ATTRS_MAP[tag];

    Object.keys(map)
      .forEach(attr => {
        if (!arr.includes(attr)) {
          arr.push(attr);
        }
      });

    return arr;
  }, []);
}

/**
 * List of all Nude tags.
 * @type {String[]}
 */
const TAG_LIST = [];

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
    return 'nu-base'; // abstract tag
  }

  /**
   * Auto-id applied to element.
   * @returns {string}
   */
  static get nuId() {
    return '';
  }

  /**
   * Method to extract element css with current element context.
   * @private
   * @param cls
   * @returns {string}
   */
  static nuExtractCSS(cls) {
    const _this = this;

    return this.nuCSS({
      tag: cls.nuTag,
      get css() {
        return _this.nuParentCSS(cls);
      },
    });
  }

  /**
   * Parent element
   */
  static get nuParent() {
    const parent = Object.getPrototypeOf(this);

    if (parent.nuTag != null) return parent;

    return;
  }

  /**
   * Method to generate parent CSS with current element context.
   * @private
   * @param cls
   * @returns {string}
   */
  static nuParentCSS(cls) {
    let parent = this;

    do {
      parent = parent.nuParent;
    } while (parent && parent.nuCSS && parent.nuCSS === this.nuCSS);

    if (parent && parent.nuCSS) {
      return parent.nuExtractCSS(cls);
    }

    return '';
  }

  /**
   * Static css generation method for an element.
   * @param tag - current tag name
   * @param css - current css
   * @returns {string}
   */
  static nuCSS({ tag, css }) {
    return '';
  }

  /**
   * @private
   */
  static get nuAllAttrs() {
    return (
      ATTRS_MAP[this.nuTag] ||
      (ATTRS_MAP[this.nuTag] = {
        ...(this.nuParent && this.nuParent.nuAllAttrs || {}),
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
      /**
       * CSS Display value.
       * @param val
       */
      display: displayAttr,
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
    return {
      display: 'none',
    };
  }

  /**
   * @private
   */
  static get nuAllDefaults() {
    return (
      DEFAULTS_MAP[this.nuTag] ||
      (DEFAULTS_MAP[this.nuTag] = {
        ...(this.nuParent && this.nuParent.nuAllDefaults || {}),
        ...(this.nuDefaults || {}),
      })
    );
  }

  /**
   * Element's mixins to share styles between attributes
   */
  static get nuMixins() {
    return {
      background: backgroundMixin,
      shadow: shadowMixin,
      transform: transformMixin,
    };
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

    let el = this;

    let css = el.nuExtractCSS(el);

    const allAttrs = this.nuAllAttrs;
    const allDefaults = this.nuAllDefaults;

    const globalAttrs = Object.keys(allAttrs).filter(attr => GLOBAL_ATTRS.includes(attr) && allAttrs[attr]);

    if (globalAttrs.length) {
      error('incorrect declaration of nuAttrs, global attributes are used for styling:', globalAttrs.join(','));

      return;
    }

    Object.keys(allAttrs).forEach(attr => {
      if (checkPropIsDeclarable(attr)) {
        declareProp(NuBase, attr);
      }
    });

    let defaultsCSS = '';

    const mixins = this.nuMixins;
    const mixinList = Object.keys(mixins);

    mixinList.forEach(mixinName => {
      const mixin = mixins[mixinName]();
      const attrs = Object.keys(mixin.fallbacks);
      const optionalAttrs = attrs.filter(attr => allDefaults[attr] == null);
      const styles = [];

      styles.push({
        $suffix: optionalAttrs.map(attr => `[${attr}]`).join(''),
        ...mixin.shared,
      });

      styles.push(...optionalAttrs.map(attr => {
        const conditionSelector = optionalAttrs
          .filter(attr2 => attr2 !== attr)
          .map(attr2 => `[${attr2}]`).join('');

        return {
          $suffix: `${conditionSelector}:not([${attr}])`,
          ...mixin.fallbacks[attr],
        };
      }));

      styles.forEach((stls) => {
        defaultsCSS += generateCSS(tag, [stls]);
      });
    });

    Object.keys(allDefaults)
      .forEach(name => {
        const value = allDefaults[name];

        if (value == null) return;

        const styles = computeStyles(name, String(value), allAttrs, allDefaults);

        if (!styles) return;

        const query = `${tag}${name !== 'text' ? `:not([${name}])` : ''}`;

        defaultsCSS += generateCSS(query, styles);
      });

    injectStyleTag(`${css}${defaultsCSS}`, tag);

    customElements.define(tag, this);

    log('custom element registered', tag);

    return tag;
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
    this.nuConnected();

    this.nuIsConnected = true;
  }

  /**
   * @private
   */
  disconnectedCallback() {
    this.nuDisconnected();

    delete this.nuIsConnected;
  }

  /**
   * Get ID of the element. Generate it if it's not presented.
   * @returns {String}
   */
  get nuId() {
    if (this.id && this.id.includes('--')) {
      return this.id;
    }

    return generateId(this);
  }

  /**
   * Simple getter to tell others that it's a NUDE Element.
   * @returns {boolean}
   */
  get nuElement() {
    return true;
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
  nuEmit(name, detail = null, options = {}) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        ...options,
      }),
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
  nuConnected() {

  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuDisconnected() {
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
    if (id === ':prev') {
      return this.previousElementSibling;
    } else if (id === ':next') {
      return this.nextElementSibling;
    }

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
