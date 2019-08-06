import { getLuminance } from "./helpers";

const map = {};

export function inject(css) {
  css = css || '';

  const style = document.createElement('style');

  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);

  return style;
}

export function attrsQuery(attrs) {
  return Object.keys(attrs)
    .reduce((query, attr) => {
      const val = attrs[attr];

      return `${query}${val != null ? `[${attr}="${val}"]` : `:not([${attr}])`}`
    }, '');
}

export function stylesString(styles) {
  return Object.keys(styles)
    .reduce((string, style) => `${string}${styles[style] ? `${style}:${styles[style]}` : ''};`, '');
}

export function injectCSS(name, selector, css) {
  const element = inject(css);

  if (map[name]) {
    const el = map[name];

    el.parentNode.removeChild(el);
  }

  map[name] = {
    selector,
    css,
    element,
  };

  return map[name];
}

export function hasCSS(name) {
  return !!map[name];
}

const CSS = {
  has(name) {
    return !!map[name];
  },

  /**
   * Generate CSS for the theme with specific name.
   * @param {string} theme
   */
  generateTheme(theme, styles, context) {
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
    });

    const invertedStyles = {
      ...styles,
      color: styles['--nu-theme-background-color'],
      'background-color': styles['--nu-theme-color'],
      '--nu-theme-color': styles['--nu-theme-background-color'],
      '--nu-theme-background-color': styles['--nu-theme-color'],
      '--nu-theme-depth-opacity': shadowOpacity + (1 - getLuminance(styles['--nu-theme-color'])) * (1 - shadowOpacity),
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

    const element = inject(css);

    return map[key] = {
      theme,
      element,
      css,
    };
  },
};

export default CSS;
