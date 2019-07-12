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

let FLEX_ELEMENTS = ['NU-FLEX', 'NU-LAYOUT'];
// let GRID_ELEMENTS = ['NU-GRID', 'NU-CARD', 'NU-PANE', 'NU-BTN'];

/**
 * @class
 * @abstract
 */
class NuComponent extends HTMLElement {
  static get nuTag() {
    return '';
  }

  static get nuRole() {
    return '';
  }

  static get nuAttrs() {
    return ['mod', 'theme', 'cursor'];
  }

  static get nuPropAttrs() {
    return [];
  }

  static get nuDefaultAttrs() {
    return {};
  }

  static get observedAttributes() {
    return this.nuAttrs.concat(this.nuAttrs);
  }

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

  connectedCallback() {
    const nuRole = this.constructor.nuRole;

    if (!this.hasAttribute('role') && nuRole) {
      this.setAttribute('role', nuRole);
    }

    this.nuMounted();

    this.nuIsMounted = true;
  }

  attributeChangedCallback(name, oldValue, value) {
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

        this.nuSetProp('border-radius', value);
      default:
        if (this.constructor.nuPropAttrs.includes(name)) {
          this.nuSetProp(name, value, UNIT_ATTRS.includes(name));
        } else if (STYLES_MAP[name]) {
          value = this.nuComputeStyle(name, value);

          this.style[STYLES_MAP[name]] = value;
        }
    }

    this.nuChanged(name, oldValue, value);
  }

  nuDetectParent() {
    const parent = this.parentNode;

    if (parent && this.nuFlexItem == null) {
      this.nuFlexItem = parent.tagName === 'NU-FLEX';
    }

    return parent;
  }

  nuComputeStyle(name, value) {
    if (UNIT_ATTRS.includes(name)) {
      value = convertUnit(value);
    }

    switch (name) {
      case 'basis':
        if (!value || !value.endsWith('%')) break;

        return `calc(${value} - var(--nu-flow-gap))`;
      case 'width':
        if (!value || !value.endsWith('%')) break;

        this.nuDetectParent();

        if (this.nuFlexItem) {
          return `calc(${value} - var(--nu-h-gap))`;
        } else break;
      case 'height':
        if (!value || !value.endsWith('%')) break;

        this.nuDetectParent();

        if (this.nuFlexItem) {
          return `calc(${value} - var(--nu-v-gap))`;
        } else break;
    }

    return value;
  }

  nuSetProp(name, value, convert) {
    const propName = `--nu-${name}`;

    if (value) {
      this.style.setProperty(propName, convert ? convertUnit(value) : value);
    } else {
      this.style.removeProperty(propName);
    }
  }

  nuSetChildrenProp(name, value, convert) {
    this.childNodes.forEach(
      node => node.nuSetProp && node.nuSetProp(name, value, convert),
    );
  }

  nuSetMod(name, value) {
    const mod = `nu-${name}`;

    if (value === false || value == null) {
      this.removeAttribute(mod);
    } else {
      this.setAttribute(mod, value);
    }
  }

  nuHasMod(name) {
    const mod = `nu-${name}`;

    return this.hasAttribute(mod);
  }

  nuSetAria(name, value) {
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false';
    }

    this.setAttribute(`aria-${name}`, value);
  }

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

  nuSetFocusable(bool) {
    if (bool) {
      this.setAttribute('tabindex', this.nuTabIndex);
    } else {
      this.removeAttribute('tabindex');
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

  nuEmit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: !this.hasAttribute('prevent'),
    }));
  }

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

  nuChanged() {
  }

  nuGetParent(selector) {
    return getParent(this, selector);
  }
}

export default NuComponent;
