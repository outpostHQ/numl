import {
  getMods,
  convertUnit,
  getParent,
  devMode,
  warn,
  getTheme,
} from '../helpers';
import NUDE from '../nude';
import { hasCSS, injectCSS, attrsQuery, stylesString } from '../css';

const attrsObjs = [];
const plugins = {
  mod: '',
  theme: '',
  cursor: 'cursor',
};

/**
 * @class
 * @abstract
 */
class NuElement extends HTMLElement {
  /**
   * Element tag name.
   * @returns {string}
   */
  static get nuTag() {
    return '';
  }

  /**
   * Element ARIA Role.
   * @returns {string}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Element attributes list.
   * @returns {Object}
   */
  static get nuAttrs() {
    const obj = {...plugins};

    attrsObjs.push(obj);

    return obj;
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

  constructor() {
    super();

    const tabIndexAttr = this.getAttribute('tabindex');

    this.nuThemeStyles = true;
    this.nuThemeProps = true;
    this.nuThemeInvert = false;
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
  }

  /**
   * Calculate the style that needs to be applied based on corresponding attribute.
   * @param {string} name - attribute name
   * @param {string} value - original attribute name
   * @returns {string|Object}
   */
  nuComputeStyle(name, value) {
    const attrValue = this.constructor.nuAttrs[name];

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

  /**
   * Set global modifier to the element (using class).
   * @param {string|array|Object} value
   */
  nuUpdateGlobalMods(value) {
    const mods = getMods(value);

    if (this.nuGlobalMods) {
      for (let cls of this.nuGlobalMods) {
        if (cls.startsWith('-nu-') && !mods.includes(cls)) {
          this.classList.remove(cls);
        }
      }
    }

    this.nuGlobalMods = mods;

    this.classList.add(...mods);
  }

  nuGetQuery(attrs = {}) {
    return `nu-${this.constructor.nuTag}${attrsQuery(attrs)}`;
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

        const themeParent = this.nuGetParent('[theme]:not([theme=""]):not([theme="!"])');

        let parentAttrTheme = themeParent ? themeParent.getAttribute('theme') : 'default';

        theme = getTheme(parentAttrTheme, true);

        this.nuSetMod('theme', theme);
      }, 0); // parent node could no be ready

      return;
    }

    const isCurrent = theme === 'current';
    const themeChange = !!this.nuTheme;

    this.nuSetMod('theme', theme);

    if (isCurrent) {
      if (!this.nuTheme) return;
    } else {
      if (theme.startsWith('!')) {
        theme = theme.slice(1);
        NUDE.CSS.generateTheme(theme);
        invert = true;
      } else {
        NUDE.CSS.generateTheme(theme);
      }
    }

    if (!isCurrent) {
      this.nuTheme = {
        name: theme,
        invert
      };
    } else {
      delete this.nuTheme;
    }

    if (themeChange) {
      [...this.querySelectorAll('[theme="!"]')]
        .forEach(element => element.nuUpdateTheme && element.nuUpdateTheme('!'));
    }
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
   * Emit custom event.
   * @param {string} name
   * @param {*} detail
   */
  nuEmit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: !this.hasAttribute('prevent'),
    }));
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   */
  nuMounted() {
    this.nuSetMod('inverted', this.nuThemeInvert);

    const defaultAttrs = this.constructor.nuDefaultAttrs;

    Object.keys(defaultAttrs)
      .forEach(attr => {
        if (!this.hasAttribute(attr)) {
          this.setAttribute(attr, defaultAttrs[attr]);
          this.nuChanged(attr, undefined, defaultAttrs[attr]);
        }
      });
  }

  /**
   * React to the attribute change.
   * @param {string} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    switch (name) {
      case 'mod':
        this.nuUpdateGlobalMods(value);
        break;
      case 'theme':
        this.nuUpdateTheme(value);
        break;
      default:
        if (value == null) return;

        const computed = this.nuComputeStyle(name, value);

        if (!computed) return;

        const query = `${this.nuGetQuery({[name]: value})}${computed.$children ? '>*' : ''}`;
        const styles = stylesString(computed);

        if (!hasCSS(query)) {
          injectCSS(query, query, `${query}{${styles}}`);
        }
    }
  }

  /**
   * Get parent that satisfies specified selector
   * @param {string} selector
   */
  nuGetParent(selector) {
    return getParent(this, selector);
  }
}

export default NuElement;
