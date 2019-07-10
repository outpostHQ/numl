import {
  getMods,
  STYLES_MAP,
  UNIT_ATTRS,
  convertUnit,
  getParent,
} from '../helpers';

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
    return ['mod', 'theme'];
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
    switch (name) {
      case 'mod':
        this.nuUpdateGlobalMods(value);
        break;
      case 'theme':
        this.nuUpdateTheme(value);
        break;
      case 'radius':
        value = convertUnit(value).replace('*', 'var(--border-radius)');
        this.nuSetProp('border-radius', value);
      default:
        if (this.constructor.nuPropAttrs.includes(name)) {
          this.nuSetProp(name, value, UNIT_ATTRS.includes(name));
        } else if (STYLES_MAP[name]) {
          value = this.nuComputeStyle(name, value);

          if (UNIT_ATTRS.includes(name)) {
            this.style[STYLES_MAP[name]] =
              convertUnit(value || '');
          } else {
            this.style[STYLES_MAP[name]] =
              value || '';
          }
        }
    }

    this.nuChanged(name, oldValue, value);
  }

  nuDetectParent() {
    const parent = this.parentNode;

    if (parent && this.nuFlexItem == null) {
      this.nuFlexItem = parent.tagName === 'NU-FLEX';
      this.nuFlexFlow = 'row';

      const parentFlow = parent.getAttribute('flow');

      if (parentFlow && parentFlow.startsWith('column')) {
        this.nuFlexFlow = 'column';
      }
    }

    return parent;
  }

  nuComputeStyle(name, value) {
    value = convertUnit(value);

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

  nuSetMod(name, bool) {
    const mod = `nu-${name}`;

    if (bool) {
      this.setAttribute(mod, '');
    } else {
      this.removeAttribute(mod);
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
    let color, backgroundColor, specialColor, borderColor, invert = false;

    let theme = this.nuGetTheme(attrTheme);

    if (theme === '!current') {
      setTimeout(() => {
        if (theme !== this.nuGetTheme(this.getAttribute('theme'))) return;

        const themeParent = this.nuGetParent('[theme]:not([theme=""]):not([theme="!"])');

        let parentAttrTheme = themeParent ? themeParent.getAttribute('theme') : 'default';

        theme = this.nuGetTheme(parentAttrTheme, true);

        this.nuUpdateTheme(theme);
      }, 0); // parent node could no be ready

      return;
    }

    const isCurrent = theme === 'current';
    const themeChange = !!this.nuTheme;

    if (theme === 'current') {
      color = '';
      backgroundColor = '';
      specialColor = '';
      borderColor = '';

      if (!this.nuTheme) return;
    } else {
      if (theme.startsWith('!')) {
        theme = theme.slice(1);
        invert = true;

        color = `var(--${theme}-background-color, var(--default-background-color))`;
        backgroundColor = `var(--${theme}-color, var(--default-color))`;
      } else {
        color = `var(--${theme}-color, var(--default-color))`;
        backgroundColor = `var(--${theme}-background-color, var(--default-background-color))`;
      }

      specialColor = `var(--${theme}-special-color, var(--current-color, var(--default-special-color)))`;
      borderColor = `var(--${theme}-border-color, var(--current-color, var(--default-border-color)))`;
    }

    if (this.nuThemeProps) {
      this.style.setProperty('--current-color', isCurrent ? '' : color);
      this.style.setProperty('--current-background-color', isCurrent ? '' : backgroundColor);
      this.style.setProperty('--current-special-color', isCurrent ? '' : specialColor);
      this.style.setProperty('--current-border-color', isCurrent ? '' : borderColor);
    }

    if (this.nuThemeInvert) {
      [color, backgroundColor] = [backgroundColor, color];
    }

    if (this.nuThemeStyles) {
      this.style.color = color;
      this.style.backgroundColor = backgroundColor;
    }

    if (!isCurrent) {
      this.nuTheme = {
        name: theme,
        color,
        backgroundColor,
        specialColor,
        borderColor,
        invert
      };
      this.nuSetMod('inverted', this.nuTheme.invert);
    } else {
      delete this.nuTheme;
      this.nuSetMod('inverted', false);
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
  }

  nuChanged() {
  }

  nuGetParent(selector) {
    return getParent(this, selector);
  }
}

export default NuComponent;
