import { convertUnit, generateId, toCamelCase, toKebabCase, computeStyles } from '../helpers';
import Modifiers, { SIZES } from '../modifiers';
import { hasCSS, injectCSS, removeCSS, attrsQuery, generateCSS, stylesString } from '../css';
import NuBase from '../base';
import { THEME_ATTRS_LIST } from '../attrs';
import { generateTheme, convertThemeName } from '../themes';

const plugins = {
  cursor: 'cursor',
  responsive: ''
};

const RESPONSIVE_ATTR = 'responsive';

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
   * @returns {String}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Element layout type.
   * @returns {String} - `flex` | `grid`.
   */
  static get nuDisplay() {
    return '';
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {
      theme(val) {
        if (!val) val = 'default';

        return THEME_ATTRS_LIST.reduce((obj, name) => {
          obj[`--nu-theme-${name}`] = `var(--nu-${val}-${name})`;

          return obj;
        }, {});
      },
      color(val) {
        if (val == null) return null;

        return {
          color: val
            ? val !== 'special'
              ? val
              : 'var(--nu-theme-special-color)'
            : 'var(--nu-theme-color)'
        };
      },
      background(val) {
        if (val == null) return null;

        return {
          background: val
            ? val !== 'special'
              ? val
              : 'var(--nu-theme-special-color)'
            : 'var(--nu-theme-background-color)'
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
   * @returns {String[]}
   */
  static get nuAttrsList() {
    return Object.keys(this.nuAllAttrs);
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get observedAttributes() {
    return this.nuAttrsList;
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
   * @param {String} name
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
   * @param {String} name
   * @param {*} value
   * @param {*} force - replace current CSS rule
   */
  nuApplyCSS(name, value, force = false) {
    const isResponsive = value.includes('|');

    let query;

    if (isResponsive) {
      query = `${this.nuGetContext(RESPONSIVE_ATTR)}${this.nuGetQuery(
        { [name]: value },
        this.getAttribute(RESPONSIVE_ATTR)
      )}`;
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

        const stls = computeStyles(name, val, this.constructor.nuAllAttrs);

        return generateCSS(query, stls);
      });

      const css = respEl.nuResponsive()(styles);

      if (css) {
        injectCSS(query, query, css);
      }

      return;
    }

    let styles = computeStyles(name, value, this.constructor.nuAllAttrs);

    const css = generateCSS(query, styles);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  /**
   * Calculate the style that needs to be applied based on corresponding attribute.
   * @param {String} name - Attribute name.
   * @param {String} value - Original attribute name.
   * @param {Object} attrs - Map of attribute handlers.
   * @returns {String|Object|Array}
   */
  nuComputeStyle(name, value, attrs) {
    const attrValue = attrs[name];

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
   * @param {String} name
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
    return `${useId ? '' : this.constructor.nuTag}${useId ? `#${this.nuId}` : ''}${attrsQuery(
      attrs
    )}`;
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
  nuMounted() {}

  /**
   * React to the attribute change.
   * @param {String} name
   * @param {*} value
   * @returns {Array}
   */
  nuGenerate(name, value) {
    return computeStyles(name, value, this.constructor.nuAllAttrs);
  }

  nuChanged(name, oldValue, value) {
    switch (name) {
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
      return (this.nuResponsiveDecorator = styles => styles);
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

    return (this.nuResponsiveDecorator = styles => {
      return mediaPoints
        .map((point, i) => {
          let stls;

          if (styles[i]) {
            stls = styles[i];
          } else {
            for (let j = i - 1; j >= 0; j--) {
              if (styles[j]) {
                stls = styles[j];
                break;
              }
            }
          }

          return `${point}{\n${stls || ''}\n}\n`;
        })
        .join('');
    });
  }

  nuGetContext(attrName) {
    let context = '',
      el = this;

    while ((el = el.parentNode)) {
      if (el.getAttribute && el.getAttribute(attrName) && el.nuId) {
        context = `#${el.nuId} ${context}`;
      }
    }

    return context;
  }

  /**
   * Declare theme in current context.
   * @param {String} name – Theme name.
   * @param {Object} props
   */
  nuDeclareTheme(name, props, darkProps = {}) {
    if (this.nuThemes[name]
      && this.nuThemes[name].styleElement
      && this.nuThemes[name].styleElement.parentNode) {
      let el = this.nuThemes[name].styleElement;

      el.parentNode.removeChild(el);
    }

    if (!props) {
      delete this.nuThemes[name];
      this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));

      return;
    }

    if (name !== 'default' && this.nuThemes.default) {
      props = {
        ...({
          ...this.nuThemes.default.light,
          ...this.nuThemes.default.dark,
        }),
        ...props
      };
    }

    generateId(this);

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
      Object.keys(themeProps).forEach(name => {
        if (themeProps[name] && ~themeProps[name].indexOf('var(')) {
          const varName = themeProps[name].trim().slice(4, -1);

          themeProps[name] = parentStyles.getPropertyValue(varName).trim();
        }
      });
    });

    const [lightTheme, darkTheme] = generateTheme(props, darkProps, parentProps);

    const context = this.nuGetContext('nu-themes');
    const baseQuery = `${context} #${this.nuId}`;
    const forceLightStyles = stylesString(convertThemeName(lightTheme, `${name}-light`));
    const forceDarkStyles = stylesString(convertThemeName(darkTheme, `${name}-dark`));
    const lightStyles = stylesString(convertThemeName(lightTheme, name));
    const darkStyles = stylesString(convertThemeName(darkTheme, name));
    const defaultStyles = name === 'default'
      ? stylesString(THEME_ATTRS_LIST.reduce((obj, attr) => {
          obj[`--nu-theme-${attr}`] = `var(--nu-${name}-${attr})`;

          return obj;
        }, {}))
      : '';
    const commonCSS = `
      ${defaultStyles ? `${baseQuery}{${defaultStyles}}` : ''}
      ${baseQuery}{${forceLightStyles}${forceDarkStyles}}
    `;

    let styleElement;

    if (matchMedia('(prefers-color-scheme)').matches) {
      styleElement = injectCSS(
        `theme:${name}:${baseQuery}`,
        baseQuery,
        `
        ${commonCSS}
        @media (prefers-color-scheme: dark) {
          html:not(.nu-prefers-color-scheme-light):not(.nu-prefers-color-scheme-dark) ${baseQuery}{${darkStyles}}
          html.nu-prefers-color-scheme-dark ${baseQuery}{${darkStyles}}
        }
        @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
          html:not(.nu-prefers-color-scheme-light):not(.nu-prefers-color-scheme-dark) ${baseQuery}{${lightStyles}}
          html.nu-prefers-color-scheme-light ${baseQuery}{${lightStyles}}
        }
      `
      ).element;
    } else {
      styleElement = injectCSS(
        `theme:${baseQuery}`,
        baseQuery,
        `
        ${commonCSS}
        html:not(.nu-prefers-color-scheme-dark) ${baseQuery}{${lightStyles}}
        html.nu-prefers-color-scheme-dark ${baseQuery}{${darkStyles}}
      `
      ).element;
    }

    this.nuThemes[name] = {
      light: lightStyles,
      dark: darkStyles,
      styleElement,
    };

    this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));
  }
}
