import CONTEXT from '../context';
import {
  hasRuleSet,
  attrsQuery,
  generateCSS,
  transferCSS,
  STYLE_MAP,
  insertRuleSet,
  removeRuleSet, removeRulesById,
} from '../css';
import {
  parseThemeAttr,
  applyTheme,
  composeThemeName,
  applyDefaultMods,
  BASE_THEME,
  ALL_THEME_MODS,
  THEME_TYPE_MODS, THEME_ATTR, declareTheme
} from '../themes';
import { generateCSSByZones, RESPONSIVE_ATTR, RESPONSIVE_MOD } from '../responsive';
import {
  getParent,
  query,
  generateId,
  devMode,
  warn,
  log,
  computeStyles,
  queryById,
  error,
  parseAllValues,
  extractMods,
  isResponsiveAttr,
  normalizeAttrStates,
  parseAttrStates,
  deepQuery,
  deepQueryAll,
  queryChildren,
  setImmediate,
  isEqual,
  setBoolAttr,
  setAria,
  decPoint,
  isNoValue,
} from '../helpers';
import { isPropDeclarable, declareProp, GLOBAL_ATTRS } from '../compatibility';
import displayAttr from '../styles/display';
import themeAttr from '../styles/theme';
import propAttr from '../styles/prop';
import combine from '../combinators/index';
import behaviors from '../behaviors';
import { setThemeAttr } from '../dom-helpers';

export const ELEMENTS_MAP = {};

const NAMES_MAP = {};
const GENERATORS_MAP = {};
const STYLES_MAP = {};
const MIXINS_MAP = {};
const COMBINATORS_MAP = {};
const TEMPLATES_MAP = {};
const PROPS_MAP = {};
const ATTRS_MAP = {};
const BEHAVIORS_MAP = {};
const CONTEXT_MAP = {};

export function getAllAttrs() {
  return Object.keys(GENERATORS_MAP).reduce((arr, tag) => {
    const map = GENERATORS_MAP[tag];

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
 * @typedef NudeContext
 * @property allowShadow {boolean}
 * @property $shadowRoot {HTMLFragment}
 * @property $parentShadowRoot {HTMLFragment}
 */

/**
 * @typedef NudeMixin
 * @method [init]
 * @method [connected]
 * @method [disconnected]
 * @method [changed]
 * @method [set]
 */

/**
 * @class
 * @abstract
 * @property nuContext {NudeContext}
 * @property nuParent {HTMLElement}
 * @property nuParentContext {NudeContext}
 * @property nuBehaviors {Array<NudeMixin>}
 */
export default class NuAbstract extends HTMLElement {
  /**
   * Element tag name.
   * @returns {String}
   */
  static get nuTag() {
    return 'nu-abstract'; // abstract tag
  }

  /**
   * In case the tag has `display: contents` transfer all styles to the child.
   * @return {string}
   */
  static get nuContents() {
    return '';
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
   * @protected
   * @param Element {Object} - NuAbstract (HTMLElement)
   * @param tag {String} - tag name
   * @returns {Array<String>}
   */
  static nuExtractCSS(Element, tag) {
    const _this = this;

    return this.nuCSS({
      tag: tag || Element.nuTag,
      get css() {
        return _this.nuGetParentCSS(Element, tag);
      },
      shadow: tag === ':host',
    });
  }

  /**
   * Parent element
   */
  static get nuParentClass() {
    const parent = Object.getPrototypeOf(this);

    if (parent.nuTag != null) return parent;
  }

  /**
   * Method to generate parent CSS with current element context.
   * @param Element
   * @param tag {String}
   * @returns {Array<String>}
   */
  static nuGetParentCSS(Element, tag) {
    let parent = this;

    do {
      parent = parent.nuParentClass;
    } while (parent && parent.nuCSS && parent.nuCSS === this.nuCSS);

    if (parent && parent.nuCSS) {
      return parent.nuExtractCSS(Element, tag);
    }

    return [];
  }

  /**
   * Static css generation method for an element.
   * @param tag - current tag name
   * @param css - current css
   * @returns {Array}
   */
  static nuCSS({ tag, css }) {
    return [];
  }

  static get nuName() {
    return '';
  }

  static get nuNames() {
    let name = this.hasOwnProperty('nuName') ? this.nuName : this.nuTag.replace(/^nu-/, '');

    const ignoreNames = name.split(/\s+/g).filter((nm) => {
      return nm.startsWith('-');
    }).map(nm => nm.replace('-', ''));

    const names = (
      NAMES_MAP[this.nuTag]
      || (NAMES_MAP[this.nuTag]
        = [...(name ? name.split(/\s+/g) : []), ...(this.nuParentClass && this.nuParentClass.nuNames || [])].reverse())
    );

    return names.filter(nm => !ignoreNames.includes(nm) && !ignoreNames.includes(nm.replace(/^-/, '')));
  }

  /**
   * @private
   */
  static get nuAllGenerators() {
    return (
      GENERATORS_MAP[this.nuTag]
      || (GENERATORS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllGenerators || {}),
        ...this.nuGenerators
      })
    );
  }

  /**
   * Static template declaration
   * @return {string}
   */
  static get nuTemplate() {
    return '';
  }

  /**
   * @private
   */
  static get nuCachedTemplate() {
    return TEMPLATES_MAP[this.nuTag] || (TEMPLATES_MAP[this.nuTag] = this.nuTemplate);
  }

  /**
   * Allow Shadow DOM usage on the element
   * @return {boolean|null}
   */
  static get nuShadowRoot() {
    return null; // use global setting
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuGenerators() {
    return {
      id: '',
      /**
       * CSS Display value.
       * @param val
       */
      display: displayAttr,
      responsive: '',
      as: '',
      theme: themeAttr,
      prop: propAttr,
    };
  }

  /**
   * List of attributes.
   * @returns {Array}
   */
  static get nuGeneratorsList() {
    return Object.keys(this.nuAllGenerators);
  }

  /**
   * A list of attributes that are used as props or helpers
   * @return {Array<String>}
   */
  static get nuPropsList() {
    const tag = this.nuTag;
    const baseAttrs = NuAbstract.nuAllGenerators;

    return (PROPS_MAP[tag]
      || (PROPS_MAP[tag] = Object
        .entries(this.nuAllGenerators)
        .reduce((list, entry) => {
          const name = entry[0];

          if (!entry[1]
            && !name.startsWith('nu-')
            && !name.startsWith('use-')
            && !(name in baseAttrs)) {
            list.push(name);
          }

          return list;
        }, []))
    );
  }

  /**
   * Initial attribute values of the Element.
   */
  static get nuAttrs() {
    return {};
  }

  /**
   * Default styles of the Element.
   * They are used only to generate initial CSS for elements.
   */
  static get nuStyles() {
    return {
      display: 'none',
    };
  }

  /**
   * Initial attribute values of the Element.
   */
  static get nuContext() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllContext() {
    return (
      CONTEXT_MAP[this.nuTag] ||
      (CONTEXT_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllContext || {}),
        ...(this.nuContext || {}),
      })
    );
  }

  /**
   * @private
   */
  static get nuAllStyles() {
    return (
      STYLES_MAP[this.nuTag] ||
      (STYLES_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllStyles || {}),
        ...(this.nuStyles || {}),
      })
    );
  }

  /**
   * @private
   */
  static get nuAllAttrs() {
    if (this.nuTag in ATTRS_MAP) {
      return ATTRS_MAP[this.nuTag];
    }

    const allAttrs = {
      ...(this.nuParentClass && this.nuParentClass.nuAllAttrs || {}),
      ...(this.nuAttrs || {}),
    };

    if (!Object.keys(allAttrs)) {
      ATTRS_MAP[this.nuTag] = null;
      return;
    }

    ATTRS_MAP[this.nuTag] = allAttrs;

    return allAttrs;
  }

  /**
   * Element behaviors.
   * They are used to inject reusable logic into elements.
   */
  static get nuBehaviors() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllBehaviors() {
    return (
      MIXINS_MAP[this.nuTag] ||
      (MIXINS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllBehaviors || {}),
        ...(this.nuBehaviors || {}),
      })
    );
  }

  /**
   * Element combinators.
   * They are used to generate initial CSS for elements.
   */
  static get nuCombinators() {
    return {};
  }

  /**
   * @private
   */
  static get nuAllCombinators() {
    return (
      COMBINATORS_MAP[this.nuTag] ||
      (COMBINATORS_MAP[this.nuTag] = {
        ...(this.nuParentClass && this.nuParentClass.nuAllCombinators || {}),
        ...(this.nuCombinators || {}),
      })
    );
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get observedAttributes() {
    return this.nuGeneratorsList;
  }

  static nuInit() {
    const tag = this.nuTag;

    if (!tag || TAG_LIST.includes(tag)) return;

    TAG_LIST.push(tag);

    if (!ELEMENTS_MAP[tag]) {
      ELEMENTS_MAP[tag] = this;
    }

    // Generate default styles on first attributeChangeCallback() instead.
    this.nuGenerateDefaultStyle();
  }

  static get nuBehaviorList() {
    const tag = this.nuTag;

    return (
      BEHAVIORS_MAP[tag]
      || (BEHAVIORS_MAP[tag] = Object
        .keys(this.nuAllBehaviors)
        .filter(name => this.nuAllBehaviors[name] != null))
    );
  }

  static nuGenerateDefaultStyle(isHost = false, dontInject = false) {
    let tag = this.nuTag;

    const cssName = isHost ? `${tag}:host` : tag;

    // already declared
    if (STYLE_MAP[cssName] && !dontInject) return;

    if (isHost) {
      tag = ':host';
    }

    log('default style generated', tag);

    let el = this;

    let css = el.nuExtractCSS(el) || [];

    const allAttrs = this.nuAllGenerators;
    const allStyles = this.nuAllStyles;
    const transferChild = this.nuContents;
    const combinators = Object.values(this.nuAllCombinators);

    const globalAttrs = Object.keys(allAttrs).filter(attr => GLOBAL_ATTRS.includes(attr) && allAttrs[attr]);

    if (globalAttrs.length) {
      error('incorrect declaration of nuGenerators, global attributes are used for styling:', globalAttrs.join(','));

      return;
    }

    Object.keys(allAttrs).forEach(attr => {
      if (!NuAbstract.prototype.hasOwnProperty(attr) && isPropDeclarable(attr)) {
        declareProp(NuAbstract, attr);
      }
    });

    if (!isHost) {
      combinators.forEach(combinator => {
        const styles = combine(combinator, allStyles);

        if (styles.length) {
          if (transferChild) {
            styles.forEach(map => {
              map.$suffix += `>${transferChild}`;
            });
          }

          css.push(...generateCSS(tag, styles, false));
        }
      });
    }

    Object.keys(allStyles)
      .forEach(name => {
        let value = allStyles[name];

        if (value == null) return;

        value = String(value).replace(/\n\s+/g, ' ');

        let styles;

        const isProp = name.startsWith('--');

        styles = computeStyles(name, value, allAttrs, allStyles);

        if (!styles) return;

        let query = `${tag}${name !== 'text' && !isProp ? `:not([${name}])` : ''}`;

        if (transferChild) {
          css.push(...generateCSS(`${query}:not(:empty) > ${transferChild}`, styles, true));
          css.push(...generateCSS(`${query}:empty`, styles, true));
        } else {
          css.push(...generateCSS(query, styles, true));
        }
      });

    if (transferChild) {
      css.push(...generateCSS(tag, [{ display: 'contents' }], true));
    }

    if (!dontInject) {
      insertRuleSet(tag, css);
    } else {
      return css.join('\n');
    }
  }

  constructor() {
    super();

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
    if (!ELEMENTS_MAP[this.constructor.nuTag]) {
      this.constructor.nuInit();
    }

    const origValue = value;

    // ignore attribute to declare custom properties
    if (devMode && name === 'prop' && this.hasAttribute('prop')) {
      warn('unable to use private "prop" attribute.');

      return;
    }

    let varAttr;

    if (name === 'nu') return;

    if (name.startsWith('use-')) {
      name = name.replace('use-', '');

      if (behaviors.has(name)) {
        this.nuUse(name, value);
      }

      return;
    }

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

        this.nuVerifyChildren({
          responsive: true,
          shadow: true,
        });

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

    // if dynamic attr
    if (isResponsiveAttr(value)) {
      varAttr = this.nuGetDynamicAttr(name, value);

      value = varAttr.value;
    }

    this.nuAttrValues[name] = value;

    if (devMode && !name.startsWith('attr-') && name !== 'control') {
      if (value !== origValue || isResponsiveAttr(value)) {
        this.setAttribute(`attr-${name}`, normalizeAttrStates(value));
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

    if (value == null || !this.constructor.nuAllGenerators[name]) return;

    this.nuApplyCSS(name, varAttr);
  }

  /**
   * @private
   */
  connectedCallback() {
    // the flag tells that it's a sync phase of element connection.
    // it's used to detect whether or not apply a transition to hiding effect.
    this.nuInitial = true;

    if (!ELEMENTS_MAP[this.constructor.nuTag]) {
      this.constructor.nuInit();
    }

    if (this.nuFirstConnect == null) {
      this.nuFirstConnect = true;
    }

    let parent = this.parentNode;

    // cache parent to have reference in onDisconnected callback
    this.nuParent = parent;

    this.nuCreateContext();

    if (!this.id) {
      if (this.constructor.nuId) {
        this.id = this.constructor.nuId;
      }
    } else {
      generateId(this);
    }

    if (this.constructor.nuRole && !this.hasAttribute('role')) {
      this.setAttribute('role', this.constructor.nuRole);
    }

    this.nuIsConnected = true;

    this.nuSetContextAttrs();

    if (this.nuContext.$shadowRoot) {
      if (!hasRuleSet(this.constructor.nuTag, this.nuContext.$shadowRoot)) {
        if (!hasRuleSet(this.constructor.nuTag)) {
          this.constructor.nuGenerateDefaultStyle();
        }

        transferCSS(this.constructor.nuTag, this.nuContext.$shadowRoot);
      }

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

    this.setAttribute('nu', '');

    if (this.constructor.nuContents) {
      this.setAttribute('nu-contents', '');
    }

    // on first connect (init)
    if (this.nuFirstConnect) {
      this.nuRender();
      this.nuInit();

      const names = this.constructor.nuNames;

      names.forEach(name => {
        this.setAttribute(`nu-${name}`, '');
      });

      const behaviorList = this.constructor.nuBehaviorList;

      if (behaviorList.length) {
        for (let name of behaviorList) {
          this.nuUse(name);
        }
      }

      const allAttrs = this.constructor.nuAllAttrs;

      if (allAttrs) {
        this.nuAutoAttrs = {};

        setTimeout(() => {
          Object.entries(allAttrs)
            .forEach(([attr, value]) => {
              if (value != null && !this.hasAttribute(attr)) {
                this.setAttribute(attr, String(value) || '');
                this.nuAutoAttrs[attr] = this.getAttribute(attr);
              }
            });
        });
      }

      const nuAllContext = this.constructor.nuAllContext;

      Object.keys(nuAllContext)
        .forEach(key => {
          const value = nuAllContext[key];

          // if it's `attrs` declaration then add Shadow Root flag
          if (key.startsWith('attrs:')) {
            value.$shadowRoot = this.nuContext.$shadowRoot;
          }

          this.nuSetContext(key, value);
        });
    }

    if (this.hasAttribute(THEME_ATTR)) {
      setTimeout(() => {
        this.nuEnsureThemes();
      }, 0);
    }

    this.nuConnected();

    this.nuBehaviorCall('connected');

    this.nuFirstConnect = false;
    this.nuIsConnectionComplete = true;

    setTimeout(() => {
      delete this.nuInitial;
    });
  }

  /**
   * @private
   */
  disconnectedCallback() {
    delete this.nuIsConnected;

    this.nuDisconnected();

    if (this.nuDisconnectedHooks) {
      this.nuDisconnectedHooks.forEach(cb => cb());
      delete this.nuDisconnectedHooks;

      log('disconnected hooks', { el: this });
    }

    if (this.id) {
      setTimeout(() => {
        removeRulesById(this.id);
      });
    }
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
    generateId(this);

    return this.getAttribute('nu-id');
  }

  /**
   * Get the unique ID of the element. Generate it if it's not presented.
   * @returns {String}
   */
  get nuUniqId() {
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
   * Is used as separate method to provide API for definition elements.
   * @param {String} query - CSS query to apply styles.
   * @param {String} name - attribute (handler) name.
   * @param {String} value - attribute exact value (handler argument).
   * @param {Boolean} skipContents - private attribute to skip CONTENTS check.
   * @returns {undefined|Array} - output css
   */
  nuGetCSS(query, name, value, skipContents) {
    const transferChild = this.constructor.nuContents;

    if (!skipContents && transferChild) {
      return (this.nuGetCSS(`${query}:not(:empty) > ${transferChild}`, name, value, true) || [])
        .concat(this.nuGetCSS(`${query}:empty`, name, value, true) || []);
    }

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

    let styles = computeStyles(name, value, this.constructor.nuAllGenerators, this.constructor.nuAllStyles);

    return generateCSS(query, styles, true);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {String} name - attribute name.
   * @param {*} [varAttr] - prepared value.
   * @param {Boolean} force - replace current CSS rule.
   * @param {Boolean} isHost
   */
  nuApplyCSS(name, varAttr, force = false, isHost = false) {
    if (!isHost && this.nuShadow) {
      this.nuApplyCSS(name, varAttr, force, true);
    }

    let attrValue = this.getAttribute(name);

    if (attrValue == null) return;

    const attrs = { [name]: attrValue };

    let value;

    if (isResponsiveAttr(attrValue)) {
      if (!varAttr) {
        varAttr = this.nuGetDynamicAttr(name, attrValue);
      }

      value = varAttr.value;
      Object.assign(attrs, varAttr.context);
    } else {
      value = attrValue;
    }

    const query = this.nuGetQuery(attrs, isHost);
    const cssRoot = isHost ? this.nuShadow : this.nuContext && this.nuContext.$shadowRoot;

    if (hasRuleSet(query, cssRoot)) {
      if (!force) return;

      removeRuleSet(query, cssRoot);
    } else if (hasRuleSet(query)) {
      transferCSS(query, cssRoot);

      return;
    }

    const css = this.nuGetCSS(query, name, value) || [''];

    insertRuleSet(query, css);

    if (cssRoot) {
      transferCSS(query, cssRoot);
    }
  }

  nuGetAttr(attr, firstValueOnly) {
    let value = this.getAttribute(attr);

    if (value == null) return value;

    if (!value) return value;

    const isResponsive = isResponsiveAttr(value);

    if (firstValueOnly) {
      if (isResponsive) {
        return parseAttrStates(value)[0].states[''];
      }

      return value;
    }

    if (isResponsive) {
      value = this.nuGetDynamicAttr(attr, value).value;
    }

    if (firstValueOnly && isResponsiveAttr(value)) {
      return parseAttrStates(value)[0].states[''];
    }

    return value;
  }

  nuGetDynamicAttr(attr, value) {
    const context = {};

    if (!this.nuContext) {
      this.nuApplyAttr(attr);

      if (value.includes('|')) {
        context[`is-${RESPONSIVE_MOD}`] = null; // :not(...

        if (!value.includes('@')) {
          value = normalizeAttrStates(value, true);
        }
      }

      return {
        oldValue: this.nuAttrValues[attr],
        value,
        context,
      };
    }

    value = value == null ? this.getAttribute(attr) : value;

    const responsive = this.nuContext && this.nuContext.responsive && this.nuContext.responsive;
    const contextIds = new Set;
    const contextMod = `${attr}-ctx`;
    const contextModAttr = `is-${contextMod}`;
    const oldValue = this.nuAttrValues && this.nuAttrValues[attr];

    value = normalizeAttrStates(value);

    if (responsive && value.includes('|')) {
      context[`is-${RESPONSIVE_MOD}`] = responsive.context.nuUniqId;

      this.nuSetMod(RESPONSIVE_MOD, responsive.context.nuUniqId);
    }

    if (contextIds.size) {
      context[contextModAttr] = Array.from(contextIds).join(' ');

      this.nuSetMod(contextMod, context[contextModAttr]);
    }

    return {
      oldValue, value: value || '', context,
    };
  }

  /**
   * Set aria attribute.
   * @param {String} name
   * @param {Boolean|String|Number} value
   */
  nuSetAria(name, value) {
    setAria(this, name, value);
  }

  nuHasAria(name) {
    return (this.nuRef || this).hasAttribute(`aria-${name}`);
  }

  /**
   * Set a local modifier.
   * @param {String} name
   * @param {String|boolean|*} value - TRUE sets attribute without false, FALSE = removes attribute.
   */
  nuSetMod(name, value) {
    const mod = `is-${name}`;

    if (!this.nuMods) {
      this.nuMods = {};
    }

    const nuMods = this.nuMods;

    if (value === false || value == null) {
      this.removeAttribute(mod);

      delete nuMods[name];
    } else {
      this.setAttribute(mod, value === true ? '' : value);

      nuMods[name] = value;
    }
  }

  /**
   * Check if element have a local modifier with specific name.
   * @param {String} name
   * @returns {boolean}
   */
  nuHasMod(name) {
    const mod = `is-${name}`;

    return this.hasAttribute(mod);
  }

  nuSetName(name) {
    return this.setAttribute(`nu-${name}`, '');
  }

  nuHasName(name) {
    const mod = `nu-${name}`;

    return this.hasAttribute(mod);
  }

  /**
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} isHost - host declaration for Shadow DOM.
   * @returns {string}
   */
  nuGetQuery(attrs = {}, isHost = false) {
    return `${isHost ? ':host' : this.constructor.nuTag}${attrsQuery(attrs)}`;
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    if (value === undefined) {
      value = this.getAttribute(name);
    }

    this.nuBehaviorCall('changed', [name, value]);

    switch (name) {
      case 'id':
      case 'as':
        this.nuSetContextAttrs();
        break;
      case 'lang':
        this.nuSetContext('locale', value);
        break;
      case 'warning':
      case 'danger':
      case 'success':
        setThemeAttr(this, name, value != null);
        return;
    }
  }

  /**
   * Called when element is first connected to the DOM.
   * Just before nuConnected().
   * Called only once during element life-cycle.
   */
  nuInit() {
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuConnected() {
  }

  /**
   * Called when element is disconnected from the DOM.
   * Can be called more than once.
   */
  nuDisconnected() {
    this.nuBehaviorCall('disconnected');
  }

  /**
   * Trigger behavior hooks
   * @param {String} method
   * @param {Array} args
   */
  nuBehaviorCall(method, args= []) {
    const behaviors = this.nuBehaviors;

    if (!behaviors) return;

    Object.values(behaviors).forEach(behavior => {
      if (behavior[method]) {
        behavior[method](...args);
      }
    });
  }

  /**
   *
   * @param {Boolean} force
   * @param {Array<String>} [ignoreList]
   * @return {*}
   */
  nuEnsureThemes(force, ignoreList = []) {
    const values = parseAllValues(this.nuGetAttr(THEME_ATTR, true) || '');

    values.forEach((val) => {
      if (ignoreList.includes(val)) return;

      ignoreList.push(val);

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

      if (baseTheme && (!this.nuContext[key] || baseTheme.lazy || force)) {
        if (baseTheme.lazy) {
          declareTheme(baseTheme.$context, theme.name, baseTheme.hue, baseTheme.saturation, baseTheme.pastel, baseTheme.mods || '');
        }
        baseTheme.lazy = false;
        applyTheme(baseTheme.$context, {
          hue: baseTheme.hue,
          saturation: baseTheme.saturation,
          pastel: baseTheme.pastel,
          ...theme,
        }, themeName);
      }
    });

    return values;
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
  nuQuery(selector) {
    return query(this, selector);
  }

  /**
   * Get closest element that satisfies specified selector
   * @param {String} id
   * @param {Boolean} [includeNames]
   */
  nuQueryById(id, includeNames) {
    return queryById(this, id, includeNames);
  }

  /**
   * Called when element parent changed its context.
   */
  nuContextChanged(name) {
    const hooks = this.nuContextHooks;

    if (!hooks || !hooks[name]) return;

    hooks[name](this.nuParentContext[name]);

    log('hook fired', {
      el: this,
      hook: name,
    });
  }

  nuSetContext(name, value, force) {
    if (!this.nuContext) {
      if (!this.nuContextTemp) {
        this.nuContextTemp = {};
      }

      this.nuContextTemp[name] = value;

      return;
    } else {
      const oldValue = this.nuContext[name];

      if (value == null) {
        if (name in this.nuContext) {
          delete this.nuContext[name];
        } else if (!force) {
          return;
        }
      } else if (!isEqual(oldValue, value) || force) {
        this.nuContext[name] = value;
      } else {
        return;
      }

      const elements = this.nuDeepQueryAll('[nu]');

      elements.forEach(el => el.nuContextChanged(name));
    }

    log('context changed', {
      el: this,
      name, value,
    });
  }

  nuSetContextHook(name, hook, runOnInit) {
    if (!hook) return;

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    if (!this.nuContextHooks) {
      this.nuContextHooks = {};
    }

    const cache = this.nuParentContext && this.nuParentContext[name];

    if (runOnInit) {
      hook(cache);
    }

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
   * @typedef VerifyOptions
   * @property vars {boolean}
   * @property responsive {boolean}
   * @property attrs {string}
   * @property shadow {boolean}
   * @property ignore {null|Array<string>}
   */

  /**
   *
   * @param options {null|VerifyOptions}
   */
  nuVerifyChildren(options) {
    const selectors = ['[shadow-root]'];

    const force = options === true;
    const { vars, responsive, attrs, shadow } = options;
    const ignore = options.ignore;

    if (!this.nuIsConnectionComplete) return;

    if (force) {
      selectors.push('[nu]', '[shadow-root]');
    } else {
      if (responsive) {
        selectors.push(`[is-${RESPONSIVE_MOD}="${this.nuUniqId}"]`);
      }

      if (attrs) {
        selectors.push(attrs);
      }

      if (shadow) {
        selectors.push('[shadow-root]');
      }
    }

    const selector = selectors.join(', ');
    const elements = this.querySelectorAll(selector);

    log('verify children', { vars, responsive, attrs, shadow, selector });

    [this, ...elements].forEach(el => {
      if (ignore && ignore.includes(el)) return;

      if (el.nuApplyCSS) {
        [...el.attributes].forEach(({ name, value }) => {
          if (name === RESPONSIVE_ATTR) return;

          if (vars || responsive) {
            el.attributeChangedCallback(name, null, value, true);
          }
        });
      }

      if (attrs && el.nuSetContextAttrs) {
        log('apply context attrs', { el });

        if (this !== el && el.nuApply) {
          el.nuApply();
        }

        if (el.nuSetContextAttrs) el.nuSetContextAttrs();
      }

      if (shadow && el.nuShadow) {
        el.nuShadow.nuVerifyChildren(options);
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
   * Return responsive definition for the styles set.
   * @returns {*}
   */
  nuResponsive() {
    const points = this.getAttribute(RESPONSIVE_ATTR);

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

      return `@media (max-width: ${decPoint(prevPoint)}) and (min-width: ${point})`;
    });

    mediaPoints.push(`@media (max-width: ${decPoint(tmpPoints.slice(-1)[0])})`);

    return (this.nuResponsiveDecorator = styles => {
      return mediaPoints
        .reduce((arr, point, i) => {
          const stls = styles[i];

          if (!stls) return arr;

          stls.forEach(rule => {
            if (rule) {
              arr.push(`${point}{\n${rule || ''}\n}\n`);
            }
          });

          return arr;
        }, []);
    });
  }

  /**
   * Scroll to element.
   * @param id
   */
  nuScrollTo(id) {
    if (!id) return;

    const element = this.nuQueryById(id);

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

  nuReapplyCSS() {
    if (!this.nuIsConnected) return;

    [...this.attributes].forEach(({ name, value }) => {
      if (value == null || !this.constructor.nuAllGenerators[name]) return;

      this.nuApplyCSS(name);
    });
  }

  attachShadow() {
    const shadow = HTMLElement.prototype.attachShadow.call(this, { mode: 'open' });

    this.nuShadow = shadow;

    Object.assign(shadow, {
      nuContext: Object.create(this.nuContext),
      nuSetContext: this.nuSetContext,
      nuVerifyChildren: this.nuVerifyChildren,
      nuDeepQuery: this.nuDeepQuery,
      nuDeepQueryAll: this.nuDeepQueryAll,
      nuIsConnectionComplete: true,
      nuIsConnected: true,
    });

    Object.assign(shadow.nuContext, {
      $shadowRoot: this.nuShadow,
      $parentShadowRoot: this.nuContext.$shadowRoot || null,
    });

    this.setAttribute('shadow-root', '');

    setImmediate(() => {
      this.nuAttachShadowCSS();
    });

    return shadow;
  }

  nuSetContextAttrs() {
    if (!this.nuIsConnected || this.constructor.nuNames.includes('definition')) return;

    if (!this.nuContextAttrs) {
      this.nuContextAttrs = new Set;
    }

    const context = this.nuParentContext;
    const as = this.getAttribute('as');
    const id = this.getAttribute('nu-id');

    /**
     * @type {Set<String>}
     */
    const contextAttrs = this.nuContextAttrs;
    const keys = [`attrs:${this.constructor.nuTag}`];
    const $shadowRoot = context.$shadowRoot;
    const $parentShadowRoot = context.$parentShadowRoot;
    const names = this.constructor.nuNames;

    if (as) {
      as.split(/\s+/g).forEach(name => {
        keys.push(`attrs:${name}`);
      });
    }

    if (names.length) {
      names.forEach(name => {
        keys.push(`attrs:${name}`);
      });
    }

    if (id) {
      keys.push(`attrs:${id}`);
    }

    const attrSets = keys.map(key => context[key]).filter(set => set);

    const attrs = {};

    attrSets.forEach(set => {
      if ($shadowRoot && $shadowRoot !== set.$shadowRoot) return;

      Object.assign(attrs, set);
    });

    if ($shadowRoot && id) {
      const shadowAttrs = context[`attrs:$${id}`];

      if (shadowAttrs && shadowAttrs.$shadowRoot === $parentShadowRoot) {
        Object.assign(attrs, shadowAttrs);
      }

      const deepShadowAttrs = context[`attrs:$$${id}`];

      if (deepShadowAttrs && deepShadowAttrs.$shadowRoot !== $shadowRoot) {
        Object.assign(attrs, deepShadowAttrs);
      }
    }

    delete attrs.$shadowRoot;

    if (!Object.keys(attrs).length && !contextAttrs.size) {
      return;
    }

    const clearAttrs = new Set(contextAttrs);

    Object.keys(attrs).forEach(name => {
      if (name.startsWith('$')) return;

      let value = attrs[name];

      const force = value && value.startsWith('!');

      if (force) {
        value = value.slice(1);
      }

      if ((!this.hasAttribute(name)) || force) {
        if (!contextAttrs.has(name)) {
          contextAttrs.add(name);
        }

        this.setAttribute(name, value);
      } else if (contextAttrs.has(name)) {
        this.setAttribute(name, value);
      }

      clearAttrs.delete(name);
    });

    clearAttrs.forEach(name => {
      this.removeAttribute(name);
    });
  }

  nuCreateContext() {
    let parent = this.parentNode;

    while (parent && !parent.nuContext && parent !== document.body) {
      parent = parent.parentNode;
    }

    if (this.nuContext) {
      this.nuContextTemp = this.nuContext;
    }

    if (parent && parent.nuContext) {
      const temp = this.nuContext;

      this.nuParentContext = parent.nuContext;

      this.nuContext = Object.create(parent.nuContext);

      if (temp) {
        Object.assign(this.nuContext, temp);
      }

      this.nuSetMod('root', false);
    } else {
      this.nuContext = Object.create(CONTEXT);
      this.nuSetMod('root', true);

      this.nuParentContext = CONTEXT;

      applyTheme(this, BASE_THEME, 'main');
    }

    if (this.nuContextTemp) {
      Object.assign(this.nuContext, this.nuContextTemp);
    }

    delete this.nuContextTemp;
  }

  nuDeepQuery(selector) {
    return deepQuery(this, selector);
  }

  nuDeepQueryAll(selector) {
    return deepQueryAll(this, selector);
  }

  nuQueryChildren(selector) {
    return queryChildren(this, selector);
  }

  /** Behavior System **/

  /**
   * Require behavior
   * @param name {String} - Behavior name
   * @param [value] {String} - Options string
   * @return {null|Behavior}
   */
  nuUse(name, value) {
    const allBehaviors = this.constructor.nuAllBehaviors;

    const attrValue = this.getAttribute(`use-${name}`);

    if (isNoValue(attrValue)) return Promise.resolve();

    let options = `${allBehaviors[name] || ''} ${value || ''}`;

    if (options === true) {
      options = undefined;
    }

    if (!this.nuBehaviors) {
      this.nuBehaviors = {};
    }

    if (!this.nuBehaviorPromises) {
      this.nuBehaviorPromises = {};
    }

    // search among behavior instances
    let behavior = this.nuBehaviors[name];

    if (behavior) return Promise.resolve(behavior);

    // search among behavior promises
    let behaviorPromise = this.nuBehaviorPromises[name];

    if (behaviorPromise) return behaviorPromise;

    // request Mixin class and create new instance
    return this.nuBehaviorPromises[name] = behaviors.get(name).then(Behavior => {
      if (!Behavior) {
        throw error('behavior not found', Behavior);
      }

      behavior = new Behavior(this, options);

      this.nuBehaviors[name] = behavior;

      behavior.$$name = name;

      // call hooks
      if (behavior.init) {
        behavior.init();
      }

      if (this.nuIsConnected && behavior.connected) {
        behavior.connected();
      }

      return behavior;
    });
  }

  nuRender() {
    const template = this.constructor.nuCachedTemplate;

    if (!template) return;

    let host = this;

    if (this.nuIsShadowAllowed) {
      host = this.attachShadow({ mode: 'open' });
    } else {
      this.nuSetMod('host', true);
    }

    host.innerHTML = template;
  }

  get nuIsShadowAllowed() {
    const allowGlobal = !!HTMLElement.prototype.attachShadow;
    const allowContext = this.nuContext.allowShadow;
    const allowOption = this.constructor.nuShadowRoot;
    const shadowRootAttr = this.getAttribute('shadow-root');
    const allowAttr = !['n', 'no'].includes(shadowRootAttr);

    if (!allowGlobal) return;

    return allowContext
      && (allowOption || allowOption == null || (allowOption === false && allowAttr));
  }

  nuAttachShadowCSS() {
    if (!this.nuShadow) return;

    const shadowCSS = this.constructor.nuExtractCSS(this.constructor, ':host');
    const tag = this.constructor.nuTag;

    if (shadowCSS) {
      insertRuleSet(
        `shadow:${tag}`,
        shadowCSS,
        this.nuShadow,
      );
    }

    insertRuleSet(
      `shadow:${tag}:outline`,
      [`:host([is-outline]) [nu], :host([is-outline]) [nu-contents] > *, :host([is-outline][nu-contents]) > * { outline: var(--border-width, 1px) solid var(--outline-color) !important; }`],
      this.nuShadow,
    );

    const hostCSSName = `${tag}:host`;

    if (!hasRuleSet(hostCSSName)) {
      this.constructor.nuGenerateDefaultStyle(true);
    }

    transferCSS(hostCSSName, this.nuShadow);

    const generators = this.constructor.nuAllGenerators;

    [...this.attributes].forEach(({ name, value }) => {
      if (!generators[name]) return;

      this.nuApplyCSS(name, null, false, true);
    });
  }

  get nuDisabled() {
    return this.hasAttribute('disabled');
  }

  set value(val) {
    if (this.nuSetValue) {
      this.nuSetValue(val, true);
    } else {
      this._value = val;
    }
  }

  get value() {
    return this.nuGetValue ? this.nuGetValue() : this._value;
  }

  set assert(val) {
    if (this.nuSetAssert) {
      this.nuSetAssert(val);
    } else {
      this._assert = val;
    }
  }

  get assert() {
    return this.nuGetAssert ? this.nuGetAssert() : this._assert;
  }

  set hidden(val) {
    setBoolAttr(this, 'hidden', val);
  }

  get hidden() {
    return this.hasAttribute('hidden');
  }

  set pressed(val) {
    setBoolAttr(this, 'pressed', val);
  }

  get pressed() {
    return this.hasAttribute('pressed');
  }

  set checked(val) {
    this.pressed = val;
  }

  get checked() {
    return this.pressed;
  }

  set selected(val) {
    this.pressed = val;
  }

  get selected() {
    return this.pressed;
  }

  focus() {
    const ref = this.nuRef || this;

    HTMLElement.prototype.focus.call(ref);
  }

  blur() {
    const ref = this.nuRef || this;

    HTMLElement.prototype.blur.call(ref);
  }

  select() {
    if (this.nuRef && this.nuRef.select) {
      this.nuRef.select();
    }
  }

  // get asList() {
  //   if (!this._asList) {
  //     const host = this;
  //
  //     this._asList = {
  //       values() {
  //         let attr = host.getAttribute('as');
  //
  //         if (attr) {
  //           attr = attr.trim();
  //         }
  //
  //         return attr ? attr.split(/\s+/g) : [];
  //       },
  //       contains(name) {
  //         return this.values().includes(name);
  //       },
  //       add(name) {
  //         const names = this.values();
  //
  //         if (!names.includes(name)) {
  //           names.push(name);
  //
  //           host.setAttribute('as', names.join(' '));
  //         }
  //       },
  //       remove(name) {
  //         const names = this.values();
  //
  //         if (names.includes(name)) {
  //           names.splice(names.indexOf(name), 1);
  //
  //           host.setAttribute('as', names.join(' '));
  //         }
  //       },
  //     };
  //   }
  //
  //   return this._asList;
  // }
}
