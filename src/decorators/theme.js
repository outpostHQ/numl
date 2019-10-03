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

export default class NuTheme extends NuDecorator {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuAttrsList() {
    return THEME_ATTRS_LIST;
  }

  nuChanged(name, oldValue, value) {
    if (!this.nuIsMounted) return;

    this.nuApply();
  }

  nuConnected() {
    super.nuConnected();

    // run only once
    if (this.nuIsMounted) return;

    setTimeout(() => this.nuApply());
  }

  nuDisconnected() {
    super.nuDisconnected();

    const name = this.getAttribute('name');

    // remove theme
    if (this.nuParent) {
      this.nuParent.nuDeclareTheme(name || 'default');
    }
  }

  nuApply() {
    const name = this.getAttribute('name');
    let theme = extractTheme(this);

    if (!name) {
      const defaultThemeEl = [...this.parentNode.querySelectorAll('nu-theme:not([name])')]
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
