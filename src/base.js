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
  invertQueryById,
  error,
  parseAllValues,
  extractMods,
  isVariableAttr,
  isResponsiveAttr,
  normalizeAttrStates,
  parseAttr, isDefined,
} from './helpers';
import { checkPropIsDeclarable, declareProp, GLOBAL_ATTRS } from './compatibility';
import displayAttr from './attributes/display';
import themeAttr from './attributes/theme';
import propAttr from './attributes/prop';
import combine from './combinators/index';
import TransformCombinator from './combinators/transform';
import ShadowCombinator from './combinators/shadow';

export const ATTRS_MAP = {};
export const DEFAULTS_MAP = {};
export const MIXINS_MAP = {};
export const COMBINATORS_MAP = {};

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
      t: '',
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
   * Element mixins.
   * They are used to inject reusable logic into elements.
   */
  static get nuMixins() {
    return [];
  }

  /**
   * @private
   */
  static get nuAllMixins() {
    return (
      MIXINS_MAP[this.nuTag] ||
      (MIXINS_MAP[this.nuTag] = Array.from(new Set([
        ...(this.nuParent && this.nuParent.nuAllMixins || []),
        ...(this.nuMixins || []),
      ])))
    );
  }

  /**
   * Element combinators.
   * They are used to generate initial CSS for elements.
   */
  static get nuCombinators() {
    return {
      transform: TransformCombinator(),
      shadow: ShadowCombinator(),
    };
  }

  /**
   * @private
   */
  static get nuAllCombinators() {
    return (
      COMBINATORS_MAP[this.nuTag] ||
      (COMBINATORS_MAP[this.nuTag] = {
        ...(this.nuParent && this.nuParent.nuAllCombinators || {}),
        ...(this.nuCombinators || {}),
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

    if (isDefined(tag)) {
      if (devMode) {
        warn('already defined: ', JSON.stringify(tag));
      }

      return;
    }

    if (!tag || TAG_LIST.includes(tag)) return;

    TAG_LIST.push(tag);

    this.nuGenerateDefaultStyle();

    customElements.define(tag, this);

    log('custom element registered', tag);

    return tag;
  }

  static nuGenerateDefaultStyle(root) {
    const tag = this.nuTag;

    log('default style generated', tag);

    let el = this;

    let css = el.nuExtractCSS(el);

    const allAttrs = this.nuAllAttrs;
    const allDefaults = this.nuAllDefaults;
    const combinators = Object.values(this.nuAllCombinators);

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

    combinators.forEach(combinator => {
      const styles = combine(combinator, allDefaults);

      if (styles.length) {
        defaultsCSS += generateCSS(tag, styles);
      }
    });

    Object.keys(allDefaults)
      .forEach(name => {
        let value = allDefaults[name];

        if (value == null) return;

        value = String(value).replace(/\n\s+/g, ' ');

        let styles;

        const isProp = name.startsWith('--');

        if (isProp) {
          styles = computeStyles(name, value, {
            [name]: (val) => {
              return [{
                [name.replace('--', '--nu-')]: parseAttr(val).value,
              }]
            },
          }, {});
        } else {
          styles = computeStyles(name, value, allAttrs, allDefaults);
        }

        if (!styles) return;

        const query = `${tag}${name !== 'text' && !isProp ? `:not([${name}])` : ''}`;

        defaultsCSS += generateCSS(query, styles);
      });

    injectStyleTag(`${css}${defaultsCSS}`, tag, root);
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
    const origValue = value;

    // ignore attribute to declare custom properties
    if (devMode && name === 'prop' && this.hasAttribute('prop')) {
      warn('unable to use private "prop" attribute.');

      return;
    }

    let varAttr;

    if (name === 'nu' || name.startsWith('nu-')) return;

    if (name === 'id') {
      generateId(this); // trigger id generation

      return;
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
      if (value !== origValue || isVariableAttr(value) || isResponsiveAttr(value)) {
        this.setAttribute(`nu-mirror-${name}`, normalizeAttrStates(value));
      }

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
    if (this.nuFirstConnect == null) {
      this.nuFirstConnect = true;
    }

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

    if (this.nuContextTemp) {
      Object.assign(this.nuContext, this.nuContextTemp);

      delete this.nuContextTemp;
    }

    if (!this.id && this.constructor.nuId) {
      this.id = this.constructor.nuId;
    }

    if (this.constructor.nuRole && !this.hasAttribute('role')) {
      this.setAttribute('role', this.constructor.nuRole);
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

    if (this.nuContext.$shadowRoot) {
      this.constructor.nuGenerateDefaultStyle(this.nuContext.$shadowRoot);
      this.nuReapplyCSS();
    }

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

    this.nuFirstConnect = false;
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
   * Get the NUDE ID of the element. Also generate unique id if it's not presented.
   * @returns {String}
   */
  get nuId() {
    if (!this.id || !this.id.includes('--')) {
      generateId(this);
    }

    return this.getAttribute('nu-id');
  }

  /**
   * Get the unique ID of the element. Generate it if it's not presented.
   * @returns {String}
   */
  get nuUniqId() {
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
      value = normalizeAttrStates(value);

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
   * @param {String} name - attribute name.
   * @param {*} [varAttr] - prepared value.
   * @param {*} force - replace current CSS rule.
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
    const cssRoot = this.nuContext && this.nuContext.$shadowRoot; // or null

    if (hasCSS(query, cssRoot)) {
      if (!force) return;

      removeCSS(query, cssRoot);
    }

    const css = this.nuGetCSS(query, name, value);

    if (css) {
      injectCSS(query, query, css, cssRoot);
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
        context[`nu-${RESPONSIVE_MOD}`] = true;
        value = value.split('|')[0];
      }

      if (value.includes('@')) {
        context[`nu-${VAR_MOD}`] = true;
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

      const nuId = varData.context.nuUniqId;

      contextIds.add(nuId);
    });

    value = composeVarsValue(value, this.nuContext, responsive ? responsive.zones.length + 1 : 1);

    if (responsive && value.includes('|')) {
      context[`nu-${RESPONSIVE_MOD}`] = responsive.context.nuUniqId;

      this.nuSetMod(RESPONSIVE_MOD, responsive.context.nuUniqId);
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
    return `${useId ? '' : this.constructor.nuTag}${useId ? `#${this.nuUniqId}` : ''}${attrsQuery(
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

    this.nuSetMod('focusable', bool);

    if (this.nuFocusable) return;

    (this.nuRef || this).addEventListener('focus', () => {
      this.nuSetMod('focus', true);
      this.nuSetContext('focus', true);
    });

    (this.nuRef || this).addEventListener('blur', () => {
      this.nuSetMod('focus', false);
      this.nuSetContext('focus', null);
    });

    if (document.activeElement === this.nuRef) {
      this.nuSetMod('focus', true);
      this.nuSetContext('focus', true);
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
    this.nuMixinCall('changed', [name, oldValue, value]);
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

    this.nuMixinCall('connected');
  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuDisconnected() {
    this.nuMixinCall('disconnected');
  }

  nuMixinCall(method, args = []) {
    const mixins = this.constructor.nuAllMixins;

    mixins.forEach(mixin => {
      if (mixin[method]) {
        mixin[method].apply(this, args);
      }
    });
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

    hooks[name](this.nuContext[name]);

    log('hook fired', {
      el: this,
      hook: name,
    });
  }

  nuSetContext(name, value) {
    if (!this.nuContext) {
      if (!this.nuContextTemp) {
        this.nuContextTemp = {};
      }

      this.nuContextTemp[name] = value;

      return;
    } else {
      if (value == null) {
        delete this.nuContext[name];
      } else if (this.nuContext[name] !== value) {
        this.nuContext[name] = value;
      } else {
        return;
      }

      const elements = this.querySelectorAll('[nu]');

      elements.forEach(el => el.nuContextChanged(name));
    }

    log('context changed', {
      el: this,
      name, value,
    });
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
      selectors.push(`[nu-${RESPONSIVE_MOD}="${this.nuUniqId}"]`);
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

      // if (el.nuShadow) {
      //   [...el.nuShadow.querySelector(selector)].forEach(shadowEl => {
      //     shadowEl.nuVerifyChildren(vars, responsive);
      //   });
      // }
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

  nuEmitInput(value) {
    if (!this.nuIsConnected) return;

    const notNull = value != null;

    switch (this.getAttribute('type')) {
      case 'int':
        value = notNull ? parseInt(value, 10) : null;

        break;
      case 'float':
        value = notNull ? parseFloat(value) : null;

        break;
      case 'bool':
        value = notNull;

        break;
      case 'date':
        value = notNull ? new Date(value) : null;

        break;
      case 'array':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (!Array.isArray(value)) {
          value = null;
        }

        break;
      case 'object':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (typeof value !== 'object' && !Array.isArray(value)) {
          value = null;
        }

        break;
    }

    this.nuEmit('input', value, { bubbles: false });
  }

  nuSetVar(name, value, decorator) {
    this.nuContext[`var:${name}`] = {
      context: this,
      decorator,
      value: value,
    };

    this.nuVerifyChildren(true);

    log('set variable', { context: this, name, value });
  }

  nuRemoveVar(name) {
    delete this.nuContext[`var:${name}`];

    setTimeout(() => {
      if (!this.nuContext.hasOwnProperty(`var:${name}`)) {
        this.nuVerifyChildren(true);
      }
    });

    log('remove variable', { context: this, name });
  }

  nuReapplyCSS() {
    if (!this.nuIsConnected) return;

    [...this.attributes].forEach(({ name, value }) => {
      if (value == null || !this.constructor.nuAllAttrs[name]) return;

      this.nuApplyCSS(name);
    });
  }

  nuAttachShadow() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.nuShadow = shadow;

    shadow.nuContext = Object.create(this.nuContext);
    shadow.nuContext = { $shadowRoot: this.nuShadow };

    return shadow;
  }
}
