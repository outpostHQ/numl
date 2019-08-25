import { convertUnit, generateId, toCamelCase, toKebabCase } from '../helpers';
import Modifiers, { SIZES } from '../modifiers';
import { hasCSS, injectCSS, removeCSS, attrsQuery, generateCSS, stylesString } from '../css';
import NuBase from '../base';
import { THEME_ATTRS_LIST } from '../attrs';
import { generateTheme } from '../themes';

const plugins = {
  theme: '',
  cursor: 'cursor',
  responsive: ''
};

const RESPONSIVE_ATTR = 'responsive';
const THEME_ATTR = 'theme';

/**
 * @class
 * @abstract
 */
export default class NuElement extends NuBase {
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
      color(val) {
        if (val == null) return null;

        return {
          color: val
            ? (val !== 'special' ? val : 'var(--nu-theme-special-color)')
            : 'var(--nu-theme-color)',
        };
      },
      background(val) {
        if (val == null) return null;

        return {
          background: val
            ? (val !== 'special' ? val : 'var(--nu-theme-special-color)')
            : 'var(--nu-theme-background-color)',
        };
      },
      mod(val) {
        if (!val) return;

        return Modifiers.get(val);
      },
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
      hidden(val) {
        if (val !== 'true' && val !== '') return null;

        return { display: 'none !important' };
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

  get nuDefaultFlow() {
    return this.constructor.nuDefaultFlow;
  }

  get nuRole() {
    return this.getAttribute('role') || this.constructor.nuRole;
  }

  set nuRole(value) {
    this.setAttribute('role', value);
  }

  constructor() {
    super();

    this.nuTabIndex = 0;
    this.nuRef = null;
    this.nuThemes = {};
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
    super.attributeChangedCallback(name, oldValue, value);

    if (value == null || !this.constructor.nuAllAttrs[name]) return;

    this.nuApplyCSS(name, value);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {string} name
   * @param {*} value
   * @param {*} force - replace current CSS rule
   */
  nuApplyCSS(name, value, force = false) {
    const isResponsive = value.includes('|');

    let query;

    if (isResponsive) {
      query = `${this.nuGetContext(RESPONSIVE_ATTR)}${this.nuGetQuery({ [name]: value }, this.getAttribute(RESPONSIVE_ATTR))}`;
    } else {
      query = this.nuGetQuery({ [name]: value });
    }

    if (hasCSS(query)) {
      if (!force) return;

      removeCSS(query);
    }

    // responsive attribute
    if (isResponsive) {
      this.nuSetMod(RESPONSIVE_ATTR, true);

      if (value !== this.getAttribute(name)) return;

      let respEl = this;

      while (respEl && (!respEl.getAttribute(RESPONSIVE_ATTR) || !respEl.nuResponsive)) {
        respEl = respEl.parentNode;
      }

      if (!respEl) return;

      const values = value.split('|');
      const styles = values.map((val, i) => {
        // if default value
        if (val && !val.trim()) return;

        // if repeat value
        if (!val) {
          // if first element - nothing to repeat
          if (!i) return;

          for (let j = i - 1; j >= 0; j--) {
            if (values[j]) {
              val = values[j];
              break;
            }
          }

          if (!val) {
            // nothing to repeat;
            return;
          }
        }

        const stls = this.nuGenerate(name, val);

        return generateCSS(query, stls);
      });

      const css = respEl.nuResponsive()(styles);

      if (css) {
        injectCSS(query, query, css);
      }

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

    if (value == null) {
      this.removeAttribute(`aria-${name}`);
    } else {
      this.setAttribute(`aria-${name}`, value);
    }
  }

  nuGetQuery(attrs = {}, useId) {
    return `${useId ? '' : this.constructor.nuTag}${useId ? `#${this.nuId}` : ''}${attrsQuery(attrs)}`;
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

    if (this.nuFocusable) return;

    (this.nuRef || this).addEventListener('focus', () => {
      this.nuSetMod('focus', true);
    });

    (this.nuRef || this).addEventListener('blur', () => {
      this.nuSetMod('focus', false);
    });

    if (document.activeElement === this.nuRef) {
      this.nuSetMod('focus', true);
    }

    this.nuFocusable = true;
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   */
  nuMounted() {

  }

  /**
   * React to the attribute change.
   * @param {string} name
   * @param {*} value
   * @returns {Array}
   */
  nuGenerate(name, value) {
    switch (name) {
      default:
        if (value == null) return;

        const computed = this.nuComputeStyle(name, value);

        if (!computed) return;

        return Array.isArray(computed) ? computed : [computed];
    }
  }

  nuChanged(name, oldValue, value) {
    switch (name) {
      case THEME_ATTR:
        // this.nuUpdateTheme(value);
        break;
      case RESPONSIVE_ATTR:
        generateId(this);

        setTimeout(() => {
          if (this.getAttribute(RESPONSIVE_ATTR) !== value) return;
          /**
           * @type {NuElement[]}
           */
          const elements = this.querySelectorAll('[nu-responsive]');

          [...elements].forEach(el => {
            if (el.nuApplyCSS) {
              [...el.attributes].forEach(({ name, value }) => {
                if (!el.constructor.nuAttrsList.includes(name) || !value.includes('|')) return;

                el.nuApplyCSS(name, value, true);
              });
            }
          });
        }, 0);
        break;
    }
  }

  nuResponsive() {
    const points = this.getAttribute('responsive');

    if (this.nuReponsiveFor === points) return this.nuResponsiveDecorator;

    this.nuReponsiveFor = points;

    if (!points) {
      return this.nuResponsiveDecorator = (styles) => styles;
    }

    const tmpPoints = points.split(/\|/);

    const mediaPoints = tmpPoints.map((point, i) => {
      if (!i) {
        return `@media (min-width: ${point})`;
      }

      const prevPoint = tmpPoints[i - 1];

      return `@media (max-width: calc(${prevPoint} - 1px)) and (min-width: ${point})`;
    });

    mediaPoints.push(`@media (max-width: calc(${tmpPoints.slice(-1)[0]} - 1px))`);

    return (this.nuResponsiveDecorator = (styles) => {
      return mediaPoints
        .map((point, i) => {
          let stls;

          if (styles[i]) {
            return `${point}{\n${styles[i] || ''}\n}\n`;
          }
        })
        .join('');
    });
  }

  nuGetContext(attrName) {
    let context = '', el = this;

    while (el = el.parentNode) {
      if (el.getAttribute && el.getAttribute(attrName) && el.nuId) {
        context = `#${el.nuId} ${context}`;
      }
    };

    return context;
  }

  /**
   * Declare theme in current context.
   * @param {String} name – Theme name.
   * @param {Object} props
   */
  nuDeclareTheme(name, props, darkProps = {}) {
    if (!props) {
      delete this.nuThemes[name];
      this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));

      return;
    }

    if (name !== 'default' && this.nuThemes.default) {
      props = {
        ...this.nuThemes.default,
        ...props,
      };
    }

    generateId(this);

    this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));

    const parentStyles = window.getComputedStyle(this.parentNode);
    const parentProps = THEME_ATTRS_LIST.reduce((map, name) => {
      const propName = `--nu-theme-${toKebabCase(name)}`;
      const value = parentStyles.getPropertyValue(propName);

      if (value) {
        map[toCamelCase(name)] = value;
      }

      return map;
    }, {});

    [props, darkProps].forEach(themeProps => {
      Object.keys(themeProps).forEach((name) => {
        if (themeProps[name] && ~themeProps[name].indexOf('var(')) {
          const varName = themeProps[name].trim().slice(4, -1);

          themeProps[name] = parentStyles.getPropertyValue(varName).trim();
        }
      });
    });

    const [lightTheme, darkTheme] = generateTheme(props, darkProps, parentProps);

    const context = this.nuGetContext('nu-themes');
    const baseQuery = `${context} #${this.nuId}${name === 'default' ? '' : ` [theme="${name}"]`}`;
    const lightStyles = stylesString(lightTheme);
    const darkStyles = stylesString(darkTheme);

    if (matchMedia('(prefers-color-scheme)').matches) {
      injectCSS(`theme:${baseQuery}`, baseQuery, `
        @media (prefers-color-scheme: dark) {
          html:not(.nu-prefers-color-scheme-light) ${baseQuery}:not([light]){${darkStyles}}
          html.nu-prefers-color-scheme-light ${baseQuery}:not([dark]){${lightStyles}}
        }
        @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
          html:not(.nu-prefers-color-scheme-dark) ${baseQuery}:not([dark]){${lightStyles}}
          html.nu-prefers-color-scheme-dark ${baseQuery}:not([light]){${darkStyles}}
        }
        ${baseQuery} [dark]{${darkStyles}}
        ${baseQuery} [light]{${lightStyles}}
      `);
    } else {
      injectCSS(`theme:${baseQuery}`, baseQuery, `
        html:not(.nu-prefers-color-scheme-dark) ${baseQuery}:not([dark]){${lightStyles}}
          html.nu-prefers-color-scheme-dark ${baseQuery}:not([light]){${darkStyles}}
        ${baseQuery} [dark]{${darkStyles}}
        ${baseQuery} [light]{${lightStyles}}
      `);
    }

    this.nuThemes[name] = {
      light: lightStyles,
      dark: darkStyles,
    };

    [...this.querySelectorAll('[nd-theme]')]
      .filter(el => el.parentNode !== this)// || ((name === 'default') && !el.hasAttribute(''))
      .forEach(el => el.nuApply());
  }
}
