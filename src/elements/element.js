import {
  convertUnit,
  unit,
  generateId,
  computeStyles,
  setImmediate,
  sizeUnit,
  log, parseAllValues, extractMods, isVariableAttr, devMode,
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
import { generateCSSByZones } from '../responsive';
import { composeVarsValue, extractVars, getVarsList } from '../variables';

const plugins = {
  responsive: '',
  as: '',
  special: '',
};

const RESPONSIVE_ATTR = 'responsive';
const RESPONSIVE_MOD = 'nu-responsive';
const VAR_ATTR = 'var';
const VAR_MOD = 'nu-var';

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
      [VAR_ATTR]: '',
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

    this.nuIsConnected = true;

    if (this.nuApplyAttrs) {
      this.nuApplyAttrs.forEach(attr => {
        this.nuApplyCSS(attr);
      });

      this.nuApplyAttrs = [];
    }

    if (this.hasAttribute(RESPONSIVE_ATTR)) {
      this.nuChanged(RESPONSIVE_ATTR, null, this.getAttribute(RESPONSIVE_ATTR));
    }

    if (this.hasAttribute(VAR_ATTR)) {
      this.nuChanged(VAR_ATTR, null, this.getAttribute(VAR_ATTR));
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

  /**
   * @private
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  attributeChangedCallback(name, oldValue, value) {
    let varAttr;

    if (!this.nuAttrValues) {
      this.nuAttrValues = {};
    }

    if (this.nuAttrValues[name]) {
      oldValue = this.nuAttrValues[name];
    }

    if (isVariableAttr(value)) {
      varAttr = this.nuGetVariableAttr(name, value);

      value = varAttr.value;
    }

    this.nuAttrValues[name] = value;

    // use "!=" cause null and undefined should return true in comparison.
    if (oldValue != value) {
      super.attributeChangedCallback(name, oldValue, value);
    }

    if (value == null || !this.constructor.nuAllAttrs[name]) return;

    this.nuApplyCSS(name, varAttr);
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

    if (isVariableAttr(attrValue)) {
      if (!varAttr) {
        varAttr = this.nuGetVariableAttr(name, attrValue);
      }

      value = varAttr.value;
      Object.assign(attrs, varAttr.context);
    } else {
      value = attrValue;
    }

    const query = this.nuGetQuery(attrs);

    this.nuDebug('nuApplyCSS', name, value, query);

    if (hasCSS(query)) {
      if (!force) return;

      removeCSS(query);
    }

    const css = this.nuGetCSS(query, name, value);

    this.nuDebug('nuApplyCSS', query, css);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  nuGetAttr(attr) {
    let value = this.getAttribute(attr);

    if (value == null) return value;

    if (!value) return value;

    const isVariable = isVariableAttr(value);

    if (isVariable) {
      return this.nuGetVariableAttr(attr, value).value;
    }

    return value;
  }

  nuGetVariableAttr(attr, value) {
    const context = {};

    if (!this.nuContext) {
      if (!this.nuApplyAttrs) {
        this.nuApplyAttrs = [];
      }

      if (!this.nuApplyAttrs.includes(attr)) {
        this.nuApplyAttrs.push(attr);
      }

      if (value.includes('|')) {
        context[RESPONSIVE_MOD] = null;
        value = value.split('|')[0];
      }

      if (value.includes('@')) {
        context[VAR_MOD] = null;
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
    const contextMod = `nu-${attr}-ctx`;
    const oldValue = this.nuAttrValues[attr];

    varsList.forEach(varName => {
      const varData = this.nuContext[`var:${varName}`];

      if (!varData) return;

      const nuId = varData.context.nuId;

      contextIds.add(nuId);
    });

    value = composeVarsValue(value, this.nuContext, responsive ? responsive.zones.length + 1 : 1);

    if (responsive && value.includes('|')) {
      context[RESPONSIVE_MOD] = responsive.context.nuId;

      this.setAttribute(RESPONSIVE_MOD, responsive.context.nuId);
    }

    if (contextIds.size) {
      context[contextMod] = Array.from(contextIds).join(' ');

      this.setAttribute(contextMod, context[contextMod]);
      this.setAttribute(VAR_MOD, '');
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
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} useId - add ID to the query.
   * @returns {string}
   */
  nuGetQuery(attrs = {}, useId= false) {
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

  nuVerifyChild() {
    const elements = this.querySelectorAll(`[${RESPONSIVE_MOD}], [${VAR_MOD}]`);

    [this, ...elements].forEach(el => {
      if (el.nuApplyCSS) {
        [...el.attributes].forEach(({ name, value }) => {
          if (!el.constructor.nuAttrsList.includes(name)
            || !(value.includes('|') || value.includes('@'))) return;

          el.nuApplyCSS(name, null, true);
        });
      }
    });
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
      case VAR_ATTR:
        // if (!this.nuIsConnected) return;
        //
        // if (oldValue) {
        //   const oldVars = extractVars(value);
        //
        //   Object.keys(oldVars).forEach((varName) => {
        //     delete this.nuContext[`var:${varName}`];
        //   });
        // }
        //
        // const vars = extractVars(value);
        //
        // Object.entries(vars).forEach(([varName, varValue]) => {
        //   this.nuContext[`var:${varName}`] = {
        //     context: this,
        //     value: varValue,
        //   };
        // });
        //
        // this.nuVerifyChild();

        break;
      case RESPONSIVE_ATTR:
        generateId(this);

        if (!this.nuIsConnected) return;

        this.nuContext.responsive = {
          context: this,
          zones: value.split('|'),
        };

        this.nuVerifyChild();

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
