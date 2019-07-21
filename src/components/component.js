import {
  getMods,
  STYLES_MAP,
  UNIT_ATTRS,
  convertUnit,
  getParent,
  devMode,
  warn,
} from '../helpers';
import NUDE from '../nude';

let FLEX_ELEMENTS = ['NU-FLEX', 'NU-LAYOUT', 'NU-BTN-GROUP'];

// let GRID_ELEMENTS = ['NU-GRID', 'NU-CARD', 'NU-PANE', 'NU-BTN'];

/**
 * @class
 * @abstract
 */
class NuComponent extends HTMLElement {
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
   * @returns {string[]}
   */
  static get nuAttrs() {
    return ['mod', 'theme', 'cursor'];
  }

  /**
   * Element properties list.
   * @returns {string[]}
   */
  static get nuPropAttrs() {
    return [];
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
    return this.nuAttrs.concat(this.nuAttrs);
  }

  /**
   * List of tag names of flex containers.
   * @returns {string[]}
   */
  static get nuFlexParents() {
    return FLEX_ELEMENTS;
  }

  static set nuFlexParents(value) {
    FLEX_ELEMENTS = value;
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
   * Check the parent node and set additional state properties if needed.
   * @returns {Node}
   */
  nuDetectParent() {
    const parent = this.parentNode;

    if (parent && this.nuFlexItem == null) {
      this.nuFlexItem = parent.tagName === 'NU-FLEX';
    }

    return parent;
  }

  /**
   * Calculate the style that needs to be applied based on corresponding attribute.
   * @param {string} name - attribute name
   * @param {string} value - original attribute name
   * @returns {string|Object}
   */
  nuComputeStyle(name, value) {
    if (UNIT_ATTRS.includes(name)) {
      value = convertUnit(value);
    }

    switch (name) {
      case 'basis':
        if (!value || !value.endsWith('%')) break;

        return `calc(${value} - var(--nu-flow-gap))`;
      case 'width':
      case 'height':
        if (value) {
          value = value.trim();

          if (value.startsWith('clamp(')) {
            const values = value.slice(6, -1).split(',');

            return {
              [name]: convertUnit(values[1]),
              [`min-${name}`]: convertUnit(values[0]),
              [`max-${name}`]: convertUnit(values[2])
            };
          } else if (value.startsWith('minmax(')) {
            const values = value.slice(7, -1).split(',');

            return {
              [`min-${name}`]: convertUnit(values[0]),
              [`max-${name}`]: convertUnit(values[1])
            };
          }
        }

        if (!value || !value.endsWith('%')) break;

        this.nuDetectParent();

        if (this.nuFlexItem) {
          return `calc(${value} - var(--nu-${name === 'width' ? 'h' : 'v'}-gap))`;
        } else break;
    }

    return value;
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

  /**
   * Get full theme name from the attribute.
   * @param {string} attr
   * @param {boolean} invert - Set true to retrieve invert theme
   * @returns {string}
   */
  nuGetTheme(attr, invert) {
    let theme = '';

    if (attr == null || attr === '') {
      theme = `${invert ? '!' : ''}current`;
    } else if (attr === '!') {
      theme = `${invert ? '' : '!'}current`;
    } else {
      theme = attr;

      if (invert) {
        if (theme.startsWith('!')) {
          theme = theme.slice(1);
        } else {
          theme = `!${theme}`;
        }
      }
    }

    return theme;
  }

  /**
   * Update theme of the element.
   * @param {string} attrTheme
   */
  nuUpdateTheme(attrTheme) {
    let invert = false;

    let theme = this.nuGetTheme(attrTheme);

    if (theme === '!current') {
      setTimeout(() => {
        if (theme !== this.nuGetTheme(this.getAttribute('theme'))) return;

        const themeParent = this.nuGetParent('[theme]:not([theme=""]):not([theme="!"])');

        let parentAttrTheme = themeParent ? themeParent.getAttribute('theme') : 'default';

        theme = this.nuGetTheme(parentAttrTheme, true);

        this.nuSetMod('theme', theme);
      }, 0); // parent node could no be ready

      return;
    }

    const isCurrent = theme === 'current';
    const themeChange = !!this.nuTheme;

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
        }
      });

    if (devMode) {
      if (FLEX_ELEMENTS.includes(this.tagName)) {
        if (FLEX_ELEMENTS.includes(this.parentNode.tagName)) {
          warn('flex-container can\'t be a flex-item', this);
        }
        // if (GRID_ELEMENTS.includes(this.parentNode.tagName)) {
        //   warn('flex-container element can\'t be a grid-item', this);
        // }
      }
    }
  }

  /**
   * React to the attribute change.
   * @param {string} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    const origValue = value;

    value = value == null ? (this.constructor.nuDefaultAttrs[name] || null) : value;

    switch (name) {
      case 'mod':
        this.nuUpdateGlobalMods(value);
        break;
      case 'theme':
        this.nuUpdateTheme(value);
        break;
      case 'radius':
        value = convertUnit(value).replace(/\*/g, 'var(--border-radius)');

        NUDE.CSS.generateRule(
          this.tagName,
          name,
          origValue,
          '--nu-border-radius',
          value
        );

        break;
      default:
        if (!value) return;

        if (STYLES_MAP[name]) {
          value = this.nuComputeStyle(name, value);

          if (this.constructor.nuPropAttrs.includes(name)) {
            const propValue = value && value[name] ? value[name] : value;

            if (typeof value === 'string') {
              value = {
                [`--nu-${name}`]: propValue,
              }
            } else {
              value[`--nu-${name}`] = propValue;
              delete value[name];
            }
          }

          if (typeof value === 'string') {
            NUDE.CSS.generateRule(
              this.tagName,
              name,
              origValue,
              STYLES_MAP[name],
              value
            );
          } else {
            NUDE.CSS.generateRules(
              this.tagName,
              { [name]: origValue },
              value
            );
          }
        } else if (this.constructor.nuPropAttrs.includes(name)) {
          NUDE.CSS.generateRule(
            this.tagName,
            name,
            origValue,
            `--nu-${name}`,
            UNIT_ATTRS.includes(name) ? convertUnit(value) : value,
          );
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

export default NuComponent;
