import NuDecorator from './decorator';
import { toCamelCase } from '../helpers';
import { THEME_ATTRS_LIST } from '../attrs';

function extractTheme(el) {
  return THEME_ATTRS_LIST.reduce((theme, name) => {
    const attrValue = el.getAttribute(name);

    if (!attrValue) return theme;

    const tmp = attrValue.split('|');

    theme.light[toCamelCase(name)] = tmp[0];
    theme.dark[toCamelCase(name)] = tmp[1];

    return theme;
  }, { light: {}, dark: {} });
}

export default class NdTheme extends NuDecorator {
  static get nuTag() {
    return 'nd-theme';
  }

  static get nuAttrsList() {
    return [
      'color',
      'background-color',
      'border-color',
      'special-color',
      'border-radius',
      'border-width',
      'animation-time',
      'shadow-intensity',
    ];
  }

  nuChanged(name, oldValue, value) {
    if (!this.nuIsMounted) return;

    this.nuApply();
  }

  nuMounted() {
    super.nuMounted();

    // run only once
    if (this.nuIsMounted) return;

    setTimeout(() => this.nuApply());
  }

  nuUnmounted() {
    super.nuUnmounted();

    const name = this.getAttribute('name');

    // remove theme
    this.nuParent.nuDeclareTheme(name || 'default');
  }

  nuApply() {
    const name = this.getAttribute('name');
    let theme = extractTheme(this);

    if (!name) {
      const defaultThemeEl = [...this.parentNode.querySelectorAll('nd-theme:not([name])')]
        .find(el => el.parentNode === this.parentNode);

      if (defaultThemeEl) {
        const defaultTheme = extractTheme(defaultThemeEl);

        theme = {
          light: {
            ...defaultTheme.light,
            ...theme.light,
          },
          dark: {
            ...defaultTheme.dark,
            ...theme.dark,
          },
        };
      }
    }

    this.parentNode.nuDeclareTheme(name || 'default', theme.light, theme.dark);
  }
}
