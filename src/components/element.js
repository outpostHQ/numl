import { convertUnit, getTheme, error, generateNuId } from '../helpers';
import Modifiers, { SIZES } from '../modifiers';
import { hasCSS, injectCSS, removeCSS, attrsQuery, generateCSS } from '../css';
import NuBase from '../base';

const attrsObjs = [];
const plugins = {
  mod: '',
  theme: '',
  cursor: 'cursor',
  responsive: ''
};

const RESPONSIVE_ATTR = 'responsive';
const THEME_ATTR = 'theme';
const IGNORE_ATTRS_CSS = [THEME_ATTR, RESPONSIVE_ATTR];

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

    if (value == null || IGNORE_ATTRS_CSS.includes(name)) return;

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
    }

    // responsive attribute
    if (value.includes('|')) {
      this.nuSetMod(RESPONSIVE_ATTR, true);

      if (value !== this.getAttribute(name)) return;

      let respEl = this;

      while (respEl && (!respEl.getAttribute(RESPONSIVE_ATTR) || !respEl.nuResponsive)) {
        respEl = respEl.parentNode;
      }

      if (!respEl) return;

      const queryContext = this.nuGetQueryContext();

      const styles = value.split('|').map((val, i) => {
        const stls = this.nuGenerate(name, val);

        if (queryContext.endsWith(' ')) {
          return generateCSS(query, stls, queryContext);
        } else {
          return generateCSS(queryContext, stls);
        }
      });

      const css = respEl.nuResponsive()(styles);

      if (css) {
        injectCSS(`${queryContext}${query}`, query, css);
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
        if (theme !== getTheme(this.getAttribute(THEME_ATTR))) return;

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
        this.nuUpdateTheme(value);
        break;
      case RESPONSIVE_ATTR:
        generateNuId(this);

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

    return (this.nuResponsiveDecorator = function(styles) {
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

  nuGetQueryContext() {
    if (this.dataset.nuId) {
      return `[data-nu-id="${this.dataset.nuId}"]`;
    }

    let context = '', el = this;

    while (el.parentNode) {
      if (el.dataset.nuId) {
        context = `[data-nu-id="${el.dataset.nuId}"] ${context}`;
      }

      el = el.parentNode;
    }

    return context;
  }
}

export default NuElement;
