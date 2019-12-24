import {
  convertUnit,
  unit,
  generateId,
  computeStyles,
  setImmediate,
  sizeUnit,
  log, parseAllValues, extractMods,
} from '../helpers';
import textAttr from '../attributes/text';
import {
  hasCSS,
  injectCSS,
  removeCSS,
  attrsQuery,
  generateCSS,
  cleanCSSByPart
} from '../css';
import NuBase from '../base';
import {
  parseThemeAttr,
  applyTheme, composeThemeName, applyDefaultMods, BASE_THEME, ALL_THEME_MODS, THEME_TYPE_MODS
} from '../themes';
import placeAttr, { PLACE_VALUES } from '../attributes/place';
import borderAttr from '../attributes/border';
import shadowAttr from '../attributes/shadow';
import flowAttr from '../attributes/flow';
import gapAttr from '../attributes/gap';
import zAttr from '../attributes/z';
import interactiveAttr from '../attributes/interactive';
import themeAttr from '../attributes/theme';
import sizingAttr from '../attributes/sizing';
import sizeAttr from '../attributes/size';
import transitionAttr from '../attributes/transition';
import colorAttr from '../attributes/color';
import fillAttr from '../attributes/fill';
import transformAttr from '../attributes/transform';
import spaceAttr from '../attributes/space';
import radiusAttr from '../attributes/radius';
import overflowAttr from '../attributes/overflow';
import hideAttr from '../attributes/hide';
import imageAttr from '../attributes/image';
import paddingAttr from '../attributes/padding';
import beforeAttr from '../attributes/before';
import afterAttr from '../attributes/after';
import scrollbarAttr from '../attributes/scrollbar';
import filterAttr from '../attributes/filter';

const plugins = {
  responsive: '',
  as: '',
  special: '',
};

const RESPONSIVE_ATTR = 'responsive';

/**
 * @class
 * @abstract
 */
export default class NuElement extends NuBase {
  static get nuTag() {
    return 'nu-el'; // abstract tag
  }

  /**
   * Element ARIA Role.
   * @returns {String}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {
      /**
       * Handler to declare custom properties.
       * @private
       * @param {String} val - String that contains name and value of the property.
       * @returns {null|Object}
       */
      var(val) {
        if (!val) return null;

        const tmp = val.split(':');

        return { [tmp[0]]: convertUnit(tmp[1]) };
      },
      width: sizeUnit('width'),
      height: sizeUnit('height'),
      sizing: sizingAttr,
      radius: radiusAttr,
      'items-radius': unit('border-radius', {
        suffix: '>:not([radius])',
        multiplier: 'var(--nu-border-radius)',
        empty: 'var(--nu-border-radius)',
        property: true,
        convert: true,
      }),
      padding: paddingAttr,
      'items-padding': unit('padding', {
        suffix: '>:not([padding])',
        multiplier: 'var(--nu-padding)',
        empty: 'var(--nu-padding)',
        convert: true,
      }),
      overflow: overflowAttr,
      space: spaceAttr,
      border: borderAttr,
      shadow: shadowAttr,
      flow: flowAttr,
      gap: gapAttr,
      order: 'order',
      grow: 'flex-grow',
      shrink: 'flex-shrink',
      basis: unit('flex-basis', { convert: true }),
      'items-basis': unit('flex-basis', { suffix: '>:not([basis])', convert: true }),
      'items-grow': unit('flex-grow', { suffix: '>:not([grow])' }),
      'items-shrink': unit('flex-shrink', { suffix: '>:not([shrink])' }),
      'place-content': PLACE_VALUES[0],
      'place-items': PLACE_VALUES[1],
      'content': PLACE_VALUES[0],
      'items': PLACE_VALUES[1],
      'template-areas': 'grid-template-areas',
      areas: 'grid-template-areas',
      'auto-flow': 'grid-auto-flow',
      'template-columns': unit('grid-template-columns', { convert: true }),
      'template-rows': unit('grid-template-rows', { convert: true }),
      columns: unit('grid-template-columns', { convert: true }),
      rows: unit('grid-template-rows', { convert: true }),
      column: 'grid-column',
      row: 'grid-row',
      area: 'grid-area',
      place: placeAttr,
      z: zAttr,
      interactive: interactiveAttr,
      theme: themeAttr,
      color: colorAttr,
      fill: fillAttr,
      filter: filterAttr,
      image: imageAttr,
      transform: transformAttr,
      text: textAttr,
      cursor: 'cursor',
      size: sizeAttr,
      hide: hideAttr,
      opacity: 'opacity',
      transition: transitionAttr,
      scrollbar: scrollbarAttr,
      before: beforeAttr,
      after: afterAttr,
      ...plugins,
      controls: '',
      label: '',
      level: '',
      labelledby: '',
      describedby: '',
      valuemin: '',
      valuemax: '',
      valuenow: '',
      setsize: '',
      posinset: '',
      expanded: '',
      owns: '',
      flowto: '',
      haspopup: '',
      activedescendant: ''
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
   * Element default attribute values.
   * They are used only to generate initial CSS for elements.
   */
  static get nuDefaults() {
    return {
      display: 'inline-block',
      sizing: 'border',
    };
  }

  /**
   * Element initialization logic
   */
  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag}[hidden] {
        display: none !important;
      }
    `;
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
    let parent = this.parentNode;

    // cache parent to have reference in onDisconnected callback
    this.nuParent = parent;

    while (!parent.nuContext && parent !== document.body) {
      parent = parent.parentNode;
    }

    if (parent.nuContext) {
      this.nuContext = Object.create(parent.nuContext);
    } else {
      this.nuContext = { $root: this, $responsiveRoot: this };
      applyTheme(this, BASE_THEME, 'main');
    }

    if (!this.id) {
      const nuId = this.constructor.nuId;

      if (nuId) {
        this.id = nuId;
      }
    }

    const nuRole = this.constructor.nuRole;

    if (nuRole && !this.hasAttribute('role')) {
      this.setAttribute('role', nuRole);
    }

    const as = this.getAttribute('as') || this.getAttribute('nu-id');

    if (as) {
      const key = `$attrs:${as}`;
      const define = this.nuContext[key];

      if (define) {
        const ignoreAttrs = [];
        const changeAttrs = [];

        define.forEach(attr => {
          const attrName = attr.name;

          if (!this.hasAttribute(attrName)) {
            this.setAttribute(attrName, attr.value);

            changeAttrs.push(attrName);
          } else {
            ignoreAttrs.push(attrName);
          }
        });

        if (!this.nuHasContextHook(key)) {
          this.nuSetContextHook(key, () => {
            const define = this.nuContext[key];
            const attrs = define.map(attr => attr.name);

            changeAttrs.forEach(attr => {
              if (!attrs.includes(attr)) {
                define.push({
                  name: attr,
                  value: null,
                });
              }
            });

            define.forEach(attr => {
              const attrName = attr.name;

              if (ignoreAttrs.includes(attrName)) return;

              if (attr.value != null) {
                this.setAttribute(attrName, attr.value);
              } else {
                this.removeAttribute(attrName);
              }

              if (!changeAttrs.includes(attrName)) {
                changeAttrs.push(attrName);
              }
            });
          });
        }
      }
    }

    this.nuConnected();

    this.nuIsConnected = true;
  }

  /**
   * @private
   */
  disconnectedCallback() {
    this.nuDisconnected();

    if (this.nuDisconnectedHooks) {
      this.nuDisconnectedHooks.forEach(cb => cb());
      delete this.nuDisconnectedHooks;

      log('disconnected hooks', { el: this });
    }

    if (this.id) {
      cleanCSSByPart(this.id);
    }

    delete this.nuIsConnected;
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
   * Generate CSS for specific query, attribute and its value.
   * Is used as separate method to provide API for decorators.
   * @param {String} query - CSS query to apply styles.
   * @param {String} name - attribute (handler) name.
   * @param {String} value - attribute value (handler argument).
   * @returns {undefined|String} - output css
   */
  nuGetCSS(query, name, value) {
    const isResponsive = value.includes('|');

    if (isResponsive) {
      this.nuSetMod(RESPONSIVE_ATTR, true);

      let respEl = this;

      while (respEl && (!respEl.getAttribute || !respEl.getAttribute(RESPONSIVE_ATTR) || !respEl.nuResponsive)) {
        respEl = respEl.parentNode;
      }

      if (!respEl) {
        const respValue = value;

        setTimeout(() => {
          const newValue = this.getAttribute(name);

          if (respValue !== newValue) return;

          this.nuApplyCSS(name, respValue);
        }, 100);

        // use first value as temporarily fallback
        value = value.split('|')[0];
      } else {
        const zones = ['max'].concat(respEl.getAttribute(RESPONSIVE_ATTR).split('|'));
        const values = value.split('|');
        const styles = zones.map((zone, i) => {
          let val = values[i] || '';
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

          const stls = computeStyles(name, val, this.constructor.nuAllAttrs, this.constructor.nuAllDefaults);

          return generateCSS(query, stls);
        });

        return respEl.nuResponsive()(styles);
      }
    }

    let styles = computeStyles(name, value, this.constructor.nuAllAttrs, this.constructor.nuAllDefaults);

    return generateCSS(query, styles);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {String} name
   * @param {*} value
   * @param {*} force - replace current CSS rule
   */
  nuApplyCSS(name, value, force = false) {
    // do not handle [var] attribute, it's for nu-var purposes.
    if (name === 'var') return;

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

    const css = this.nuGetCSS(query, name, value);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  /**
   * Set aria attribute.
   * @param {String} name
   * @param {Boolean|String} value
   */
  nuSetAria(name, value) {
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false';
    }

    if (value == null) {
      (this.nuRef || this).removeAttribute(`aria-${name}`);
    } else {
      (this.nuRef || this).setAttribute(`aria-${name}`, value);
    }
  }

  /**
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} useId - add ID to the query.
   * @returns {string}
   */
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
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuConnected() {
    this.setAttribute('nu', '');

    if (this.hasAttribute('theme')) {
      setTimeout(() => {
        this.nuEnsureThemes();
      }, 0);
    }
  }

  nuEnsureThemes(force) {
    const values = parseAllValues(this.getAttribute('theme') || '');

    values.forEach((val) => {
      let theme = parseThemeAttr(val);
      const themeName = composeThemeName(theme);
      const key = `theme:${themeName}`;
      const baseTheme = this.nuContext[`theme:${theme.name}`];
      const defaultType = theme.type;

      if (!baseTheme) return;

      if (baseTheme.mods) {
        const { mods } = extractMods(baseTheme.mods || '', ALL_THEME_MODS);

        const typeMod = mods.find(mod => THEME_TYPE_MODS.includes(mod));

        theme = applyDefaultMods(theme, baseTheme.mods);

        if (typeMod) {
          theme.type = defaultType !== 'main' ? defaultType : baseTheme.type;
        }
      }

      if (baseTheme && (!this.nuContext[key] || force)) {
        applyTheme(baseTheme.$context, {
          hue: baseTheme.hue,
          saturation: baseTheme.saturation,
          pastel: baseTheme.pastel,
          ...theme,
        }, themeName);
      }
    });
  }

  /**
   * Called when element parent changed its context.
   */
  nuContextChanged(name) {
    const hooks = this.nuContextHooks;

    if (!hooks || !hooks[name]) return;

    hooks[name]();

    log('hook fired', {
      el: this,
      hook: name,
    });
  }

  nuSetContext(name, value) {
    if (value == null) {
      delete this.nuContext[name];
    } else if (this.nuContext[name] !== value) {
      this.nuContext[name] = value;
    } else {
      return;
    }

    log('context changed', {
      el: this,
      name, value,
    });

    const elements = this.querySelectorAll('[nu]');

    elements.forEach(el => el.nuContextChanged(name));
  }

  nuSetContextHook(name, hook) {
    if (!hook) return;

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    hook.nuCache = this.nuContext && this.nuContext[name];

    this.nuContextHooks[name] = hook;
  }

  nuSetDisconnectedHook(hook) {
    if (!hook) return;

    if (!this.nuDisconnectedHooks) {
      this.nuDisconnectedHooks = [];
    }

    this.nuDisconnectedHooks.push(hook);
  }

  nuHasContextHook(name) {
    return this.nuContextHooks && this.nuContextHooks[name];
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

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
      case 'theme':
        if (!this.nuIsConnected) break;

        this.nuEnsureThemes();

        break;
      // case 'special':
      //   if (this.hasAttribute('theme')) break;
      //
      //   this.setAttribute('theme', 'special');
      //
      //   break;
      case 'label':
      case 'level':
      case 'valuemin':
      case 'valuemax':
      case 'valuenow':
      case 'setsize':
      case 'posinset':
      case 'expanded':
      case 'haspopup':
        this.nuSetAria(name, value);
        break;
      case 'controls':
      case 'labelledby':
      case 'describedby':
      case 'owns':
      case 'flowto':
      case 'activedescendant':
        setImmediate(() => {
          const ariaValue = value.split(/\s+/g).map((id) => {
            let link;

            link = this.nuInvertQueryById(id);

            if (!link) return '';

            return generateId(link);
          }).join(' ');

          if (ariaValue.trim()) {
            this.nuSetAria(name, ariaValue);
          }
        });
        break;
    }
  }

  /**
   * Return responsive decorator for the styles set.
   * @returns {*}
   */
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
          const stls = styles[i];

          if (!stls) return;

          return `${point}{\n${stls || ''}\n}\n`;
        })
        .join('');
    });
  }

  /**
   * Get query context of the current element.
   * It find all parent elements with provided attribute and built sequence with their ids.
   * @param {String} attrName
   * @returns {String} - CSS query
   */
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
   * Scroll to element.
   * @param id
   */
  nuScrollTo(id) {
    if (!id) return;

    const element = this.nuInvertQueryById(id);

    if (element) {
      scrollTo(0, element.getBoundingClientRect().y + window.pageYOffset);
    }
  }
}
