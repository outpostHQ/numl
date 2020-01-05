import {
  hasCSS,
  injectCSS,
  removeCSS,
  attrsQuery,
  generateCSS,
  cleanCSSByPart,
  injectStyleTag,
} from './css';
import {
  parseThemeAttr,
  applyTheme,
  composeThemeName,
  applyDefaultMods,
  BASE_THEME,
  ALL_THEME_MODS,
  THEME_TYPE_MODS, THEME_ATTR
} from './themes';
import { generateCSSByZones, RESPONSIVE_ATTR, RESPONSIVE_MOD } from './responsive';
import { composeVarsValue, getVarsList, VAR_MOD } from './variables';
import {
  getParent,
  invertQuery,
  generateId,
  devMode,
  warn,
  log,
  computeStyles,
  invertQueryById, error, parseAllValues, extractMods, isVariableAttr, isResponsiveAttr,
} from './helpers';
import transformMixin from './mixins/transform';
import backgroundMixin from './mixins/background';
import shadowMixin from './mixins/shadow';
import { checkPropIsDeclarable, declareProp, GLOBAL_ATTRS } from './compatibility';
import displayAttr from './attributes/display';
import themeAttr from './attributes/theme';
import propAttr from './attributes/prop';

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
   * Element ARIA Role.
   * @returns {String}
   */
  static get nuRole() {
    return '';
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
      responsive: '',
      as: '',
      special: '',
      theme: themeAttr,
      prop: propAttr,
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
      if (!NuBase.prototype.hasOwnProperty(attr) && checkPropIsDeclarable(attr)) {
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

  constructor() {
    super();

    this.nuTabIndex = 0;
    this.nuRef = null;
    this.nuThemes = {};
  }

  /**
   * @private
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   * @param {Boolean} force - Reapply CSS.
   */
  attributeChangedCallback(name, oldValue, value, force) {
    // ignore attribute to declare custom properties
    if (devMode && name === 'prop' && this.hasAttribute('prop')) {
      warn('unable to use private "prop" attribute.');

      return;
    }

    let varAttr;

    if (name === 'nu' || name.startsWith('nu-')) return;

    if (name === 'id') {
      return this.nuId; // trigger id generation
    }

    switch (name) {
      case RESPONSIVE_ATTR:
        generateId(this);

        if (!this.nuIsConnected) return;

        this.nuSetContext('responsive', {
          context: this,
          zones: value.split('|'),
        });

        this.nuVerifyChildren(true, true);

        return;
      case THEME_ATTR:
        if (!this.nuIsConnected) {
          this.nuApplyAttr(THEME_ATTR);

          return;
        }

        this.nuEnsureThemes();
    }

    if (!this.nuAttrValues) {
      this.nuAttrValues = {};
    }

    this.nuChanged(name, oldValue, value);

    if (this.nuAttrValues[name]) {
      oldValue = this.nuAttrValues[name];
    }

    // if styled attribute and contains variables
    if (isVariableAttr(value) || isResponsiveAttr(value)) {
      varAttr = this.nuGetDynamicAttr(name, value);

      value = varAttr.value;
    }

    this.nuAttrValues[name] = value;

    if (devMode) {
      if (this.hasAttribute('debug')) {
        this.nuDebug('attribute changed', {
          name,
          oldValue,
          value: this.getAttribute(name),
          computedValue: value,
        });
      }
    }

    if (value == null || !this.constructor.nuAllAttrs[name]) return;

    this.nuApplyCSS(name, varAttr, force);
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
      this.nuContext = { $root: this };
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
      const key = `attrs:${as}`;
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

    this.nuIsConnected = true;

    if (this.nuApplyAttrs) {
      this.nuApplyAttrs.forEach(attr => {
        this.attributeChangedCallback(attr, null, this.getAttribute(attr), true);
      });

      this.nuApplyAttrs = [];
    }

    if (this.hasAttribute(RESPONSIVE_ATTR)) {
      this.attributeChangedCallback(RESPONSIVE_ATTR, null, this.getAttribute(RESPONSIVE_ATTR), true);
    }

    this.nuConnected();
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

  get nuRole() {
    return this.getAttribute('role') || this.constructor.nuRole;
  }

  set nuRole(value) {
    this.setAttribute('role', value);
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
   * Generate CSS for specific query, attribute and its value.
   * Is used as separate method to provide API for decorators.
   * @param {String} query - CSS query to apply styles.
   * @param {String} name - attribute (handler) name.
   * @param {String} value - attribute exact value (handler argument).
   * @returns {undefined|String} - output css
   */
  nuGetCSS(query, name, value) {
    const isResponsive = value.includes('|');

    if (isResponsive) {
      const respContext = this.nuContext && this.nuContext.responsive && this.nuContext.responsive.context;

      if (respContext) {
        const zones = ['max'].concat(respContext.getAttribute(RESPONSIVE_ATTR).split('|'));
        const styles = generateCSSByZones(this.constructor, query, name, value, zones);

        return respContext.nuResponsive()(styles);
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
  nuApplyCSS(name, varAttr, force = false) {
    let attrValue = this.getAttribute(name);

    if (attrValue == null) return;

    const attrs = { [name]: attrValue };

    let value;

    if (isVariableAttr(attrValue) || isResponsiveAttr(attrValue)) {
      if (!varAttr) {
        varAttr = this.nuGetDynamicAttr(name, attrValue);
      }

      value = varAttr.value;
      Object.assign(attrs, varAttr.context);
    } else {
      value = attrValue;
    }

    const query = this.nuGetQuery(attrs);

    if (hasCSS(query)) {
      if (!force) return;

      removeCSS(query);
    }

    const css = this.nuGetCSS(query, name, value);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  nuGetAttr(attr, firstValueOnly) {
    let value = this.getAttribute(attr);

    if (value == null) return value;

    if (!value) return value;

    const isVariable = isVariableAttr(value);
    const isResponsive = isResponsiveAttr(value);

    if (firstValueOnly && !isVariable) {
      if (isResponsive) {
        return value.split('|')[0];
      }

      return value;
    }

    const isVariableOrResponsive = isVariable || isResponsive;

    if (isVariableOrResponsive) {
      value = this.nuGetDynamicAttr(attr, value).value;
    }

    if (firstValueOnly && isResponsiveAttr(value)) {
      return value.split('|')[0];
    }

    return value;
  }

  nuGetDynamicAttr(attr, value) {
    const context = {};

    if (!this.nuContext) {
      this.nuApplyAttr(attr);

      if (value.includes('|')) {
        context[`nu-${RESPONSIVE_MOD}`] = null;
        value = value.split('|')[0];
      }

      if (value.includes('@')) {
        context[`nu-${VAR_MOD}`] = null;
        value = '';
      }

      return {
        oldValue: this.nuAttrValues[attr],
        value,
        context,
      };
    }

    value = value == null ? this.getAttribute('value') : value;

    const responsive = this.nuContext && this.nuContext.responsive && this.nuContext.responsive;
    const varsList = getVarsList(value);
    const contextIds = new Set;
    const contextMod = `${attr}-ctx`;
    const contextModAttr = `nu-${contextMod}`;
    const oldValue = this.nuAttrValues && this.nuAttrValues[attr];

    varsList.forEach(varName => {
      const varData = this.nuContext[`var:${varName}`];

      if (!varData) return;

      const nuId = varData.context.nuId;

      contextIds.add(nuId);
    });

    value = composeVarsValue(value, this.nuContext, responsive ? responsive.zones.length + 1 : 1);

    if (responsive && value.includes('|')) {
      context[`nu-${RESPONSIVE_MOD}`] = responsive.context.nuId;

      this.nuSetMod(RESPONSIVE_MOD, responsive.context.nuId);
    }

    if (contextIds.size) {
      context[contextModAttr] = Array.from(contextIds).join(' ');

      this.nuSetMod(contextMod, context[contextModAttr]);
      this.nuSetMod(VAR_MOD, true);
    }

    return {
      oldValue, value: value || '', context,
    };
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
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} useId - add ID to the query.
   * @returns {string}
   */
  nuGetQuery(attrs = {}, useId = false) {
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
   * Emit custom event.
   * @param {String} name
   * @param {*} detail
   */
  nuEmit(name, detail = null, options = {}) {
    log('emit', { element: this, name, detail, options });

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

  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuConnected() {
    this.setAttribute('nu', '');

    if (this.hasAttribute(THEME_ATTR)) {
      setTimeout(() => {
        this.nuEnsureThemes();
      }, 0);
    }
  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuDisconnected() {
  }

  nuEnsureThemes(force) {
    const values = parseAllValues(this.nuGetAttr(THEME_ATTR, true) || '');

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

  nuVerifyChildren(vars, responsive) {
    const selectors = [];

    if (vars) {
      selectors.push(`[nu-${VAR_MOD}]`);
    }

    if (responsive) {
      selectors.push(`[nu-${RESPONSIVE_MOD}="${this.nuId}"]`);
    }

    const selector = selectors.join(', ');
    const elements = this.querySelectorAll(selector);

    log('verify children', { vars, responsive, selector });

    [this, ...elements].forEach(el => {
      if (el.nuApplyCSS) {
        [...el.attributes].forEach(({ name, value }) => {
          if (name === RESPONSIVE_ATTR) return;

          el.attributeChangedCallback(name, null, value, true);
        });
      }
    });
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

  nuApplyAttr(attrName) {
    if (!this.nuApplyAttrs) {
      this.nuApplyAttrs = [];
    }

    if (!this.nuApplyAttrs.includes(attrName)) {
      this.nuApplyAttrs.push(attrName);
    }
  }
}

