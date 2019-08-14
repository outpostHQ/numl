import NuDecorator from './decorator';
import { stylesString, injectStyleTag, map } from '../css';
import { getLuminance, mixColors } from '../helpers';

/**
   * Generate CSS for the theme with specific name.
   * @param {string} theme
   */
function generateTheme(theme, styles, context) {
  const key = `theme-${theme}-${context}`;

  if (map[key]) {
    const currentEl = map[key].element;

    currentEl.parentNode.removeChild(currentEl);

    delete map[key];
  };

  const shadowOpacity = Number(styles['--nu-theme-shadow-opacity']) || .2;

  delete styles['--nu-theme-shadow-opacity'];

  Object.assign(styles, {
    color: styles['--nu-theme-color'],
    'background-color': styles['--nu-theme-background-color'],
    '--nu-theme-depth-opacity': shadowOpacity + (1 - getLuminance(styles['--nu-theme-background-color'])) * (1 - shadowOpacity),
    '--nu-theme-heading-color': mixColors(styles['--nu-theme-color'], styles['--nu-theme-background-color'], .1),
  });

  const invertedStyles = {
    ...styles,
    color: styles['--nu-theme-background-color'],
    'background-color': styles['--nu-theme-color'],
    '--nu-theme-color': styles['--nu-theme-background-color'],
    '--nu-theme-background-color': styles['--nu-theme-color'],
    '--nu-theme-depth-opacity': shadowOpacity + (1 - getLuminance(styles['--nu-theme-color'])) * (1 - shadowOpacity),
    '--nu-theme-heading-color': mixColors(styles['--nu-theme-background-color'], styles['--nu-theme-color'], .1),
  };

  theme = theme || 'default';

  const css = `
    ${context} [data-nu-theme="${theme}"]
    ${theme === 'default'
      ? `,${context}`
      : ''
    }{${stylesString(styles)}}
    ${context} [data-nu-theme="!${theme}"]{${stylesString(invertedStyles)}}
  `;

  const element = injectStyleTag(css);

  return map[key] = {
    theme,
    element,
    css,
  };
};

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
      'shadow-opacity',
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

    this.nuApply();
  }

  nuApply() {
    const theme = this.getAttribute('name');

    if (!theme) {
      this.parentNode.setAttribute('data-nu-theme', 'default');
    }

    const attrs = this.constructor.nuAttrsList.reduce((obj, attr) => {
      const value = this.getAttribute(attr);

      obj[`--nu-theme-${attr}`] = value;

      return obj;
    }, {});

    attrs['--nu-theme-special-background-color'] = attrs['--nu-theme-background-color'];

    generateTheme(theme, attrs, this.nuParentContext);
  }
}
