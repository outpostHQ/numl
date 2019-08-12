import { convertUnit, getTheme } from '../helpers';
import Modifiers, { SIZES } from '../modifiers';
import { hasCSS, injectCSS, removeCSS, attrsQuery, generateCSS } from '../css';
import NuBase from '../base';

const attrsObjs = [];
const plugins = {
  mod: '',
  theme: '',
  cursor: 'cursor'
};

/**
 * @class
 * @abstract
 */
class NuElement extends NuBase {
  static get nuTag() {
    return 'nu-element'; // abstract tag
  }

  /**
   * Element ARIA Role.
   * @returns {string}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Element layout type.
   * @returns {string} - `flex` | `grid`.
   */
  static get nuDisplay() {
    return '';
  }

  /**
   * Element default flow. Only for flex and grid layouts.
   * @returns {string} - `row` | `row-reverse` | `column` | `column-reverse`.
   */
  static get nuDefaultFlow() {
    return 'row';
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {
      color: 'color',
      background: 'background',
      cursor(val) {
        return val
          ? {
              cursor: val
            }
          : null;
      },
      size(val) {
        if (!val) return null;

        const tmp = val.trim().split(/\s+/);
        const values = [];

        values[0] = SIZES[tmp[0]] ? String(SIZES[tmp[0]][0]) : tmp[0];

        if (!tmp[1] && SIZES[tmp[0]]) {
          values[1] = String(SIZES[tmp[0]][1]);
        } else {
          values[1] = SIZES[tmp[1]] ? String(SIZES[tmp[1]][1]) : tmp[1];
        }

        return {
          'font-size': convertUnit(values[0]),
          'line-height': convertUnit(values[1] || '1.5')
        };
      },
      ...plugins
    };
  }

  /**
   * @private
   * @returns {string[]}
   */
  static get nuAttrsList() {
    return Object.keys(this.nuAllAttrs);
  }

  /**
   * @private
   * @returns {string[]}
   */
  static get observedAttributes() {
    return this.nuAttrsList;
  }

  constructor() {
    super();

    const tabIndexAttr = this.getAttribute('tabindex');

    this.nuTabIndex = tabIndexAttr != null ? Number(tabIndexAttr) : 0;
    this.nuRef = null;
  }

  /**
   * @private
   */
  connectedCallback() {
    const nuRole = this.constructor.nuRole;

    if (!this.hasAttribute('role') && nuRole) {
      this.setAttribute('role', nuRole);
    }

    this.nuMounted();

    this.nuIsMounted = true;
  }

  /**
   * @private
   * @param {string} name
   * @param {*} oldValue
   * @param {*} value
   */
  attributeChangedCallback(name, oldValue, value) {
    this.nuChanged(name, oldValue, value);

    if (value == null) return;

    this.nuApplyCSS(name, value);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {string} name
   * @param {*} value
   * @param {*} force - replace current CSS rule
   */
  nuApplyCSS(name, value, force = false) {
    let query = this.nuGetQuery({ [name]: value });

    if (hasCSS(query)) {
      if (!force) return;

      removeCSS(query);
    };

    if (value.includes('|')) {
      setTimeout(() => {
        if (value !== this.getAttribute(name)) return;

        const respEl = this.nuInvertQuery('nd-responsive');

        if (!respEl) return;

        const styles = value.split('|').map((val, i) => {
          const stls = this.nuGenerate(name, val);

          return generateCSS(query, stls);
        });

        const css = respEl.nuParse()(styles);

        if (css) {
          injectCSS(query, query, css);
        }
      }, 0);

      return;
    }

    let styles = this.nuGenerate(name, value);

    const css = generateCSS(query, styles);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  /**
   * Calculate the style that needs to be applied based on corresponding attribute.
   * @param {string} name - attribute name
   * @param {string} value - original attribute name
   * @returns {string|Object}
   */
  nuComputeStyle(name, value) {
    const attrValue = this.constructor.nuAllAttrs[name];

    if (!attrValue) return null;

    switch (typeof attrValue) {
      case 'string':
        return value ? { [attrValue]: value } : null;
      case 'function':
        return attrValue(value);
      default:
        return null;
    }
  }

  /**
   * Set aria attribute.
   * @param {string} name
   * @param {*} value
   */
  nuSetAria(name, value) {
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false';
    }

    this.setAttribute(`aria-${name}`, value);
  }

  nuGetQuery(attrs = {}) {
    return `${this.constructor.nuTag}${attrsQuery(attrs)}`;
  }

  /**
   * Update theme of the element.
   * @param {string} attrTheme
   */
  nuUpdateTheme(attrTheme) {
    let invert = false;

    let theme = getTheme(attrTheme);

    if (theme === '!current') {
      setTimeout(() => {
        if (theme !== getTheme(this.getAttribute('theme'))) return;

        const themeParent = this.nuQueryParent('[data-nu-theme]');

        let parentAttrTheme = themeParent ? themeParent.getAttribute('data-nu-theme') : '';

        if (!parentAttrTheme) return;

        theme = getTheme(parentAttrTheme, true);

        this.setAttribute('data-nu-theme', theme);

        this.nuUpdateChildThemes();
      }, 0); // parent node could no be ready

      return;
    }

    if (theme === 'current') {
      this.removeAttribute('data-nu-theme');
    } else {
      this.setAttribute('data-nu-theme', theme);
    }

    this.nuUpdateChildThemes();
  }

  nuUpdateChildThemes() {
    [...this.querySelectorAll('[theme="!"]')].forEach(
      element => element.nuUpdateTheme && element.nuUpdateTheme('!')
    );
  }

  /**
   * Make element focusable or temporarily disable that ability.
   * @param {boolean} bool
   */
  nuSetFocusable(bool) {
    if (bool) {
      (this.nuRef || this).setAttribute('tabindex', this.nuTabIndex);
    } else {
      (this.nuRef || this).removeAttribute('tabindex');
    }

    if (this.hasAttribute('nu-focusable')) return;

    (this.nuRef || this).addEventListener('focus', () => {
      this.nuSetMod('focus', true);
    });

    (this.nuRef || this).addEventListener('blur', () => {
      this.nuSetMod('focus', false);
    });

    this.nuSetMod('focusable', true);
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   */
  nuMounted() {
    const defaultAttrs = this.constructor.nuDefaultAttrs;

    Object.keys(defaultAttrs).forEach(attr => {
      if (!this.hasAttribute(attr)) {
        this.setAttribute(attr, defaultAttrs[attr]);
      }
    });
  }

  /**
   * React to the attribute change.
   * @param {string} name
   * @param {*} value
   * @returns {Array}
   */
  nuGenerate(name, value) {
    switch (name) {
      case 'mod':
        if (!value) return;

        return [Modifiers.get(value)];
      case 'theme':
        this.nuUpdateTheme(value);
        break;
      default:
        if (value == null) return;

        const computed = this.nuComputeStyle(name, value);

        if (!computed) return;

        return Array.isArray(computed) ? computed : [computed];
    }
  }
}

export default NuElement;
