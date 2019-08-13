import { getLuminance, devMode, warn } from "./helpers";

const map = {};
const testEl = document.createElement('div');

export function injectStyleTag(css, name) {
  css = css || '';

  const style = document.createElement('style');

  if (name) {
    style.dataset.nuName = name;
  }

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

export function stylesString(styles, important) {
  if (devMode) {
    Object.keys(styles)
      .forEach(style => {
        const value = String(styles[style]);

        if (value && !CSS.supports(style, value.replace('!important', ''))) {
          warn('unsupported style detected:', `{ ${style}: ${value}; }`);
        }
      });
  }

  return Object.keys(styles)
    .reduce((string, style) => `${string}${styles[style] ? `${style}:${styles[style]}${important ? ' !important' : ''}` : ''};`, '');
}

export function generateCSS(query, styles, context = '') {
  if (!styles || !styles.length) return;

  return styles.map(map => {
    let currentQuery = query;

    if (map.$suffix) {
      currentQuery += map.$suffix;
    }

    if (map.$prefix) {
      currentQuery = `${map.$prefix} ${currentQuery}`;
    }

    delete map.$suffix;
    delete map.$prefix;

    return `${context}${currentQuery}{${stylesString(map)}}`;
  }).join('\n');
}

export function parseStyles(str) {
  return str
  .split(/;/g)
  .map(s => s.trim())
  .filter(s => s)
  .map(s => s.split(':'))
  .reduce((st, s) => {
    st[s[0]] = s[1].trim();
    return st;
  }, {});
}

export function injectCSS(name, selector, css) {
  const element = injectStyleTag(css, name);

  if (devMode) {
    selector.split(',')
      .forEach(sel => {
        try {
          testEl.querySelector(sel);
        } catch(e) {
          warn('invalid selector detected', sel);
        }
      });
  }

  if (map[name]) {
    const el = map[name].element;

    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  map[name] = {
    selector,
    css,
    element,
  };

  return map[name];
}

export function removeCSS(name) {
  if (!map[name]) return;

  const el = map[name].element;

  el.parentNode.removeChild(el);
}

export function hasCSS(name) {
  return !!map[name];
}

const css = {
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

    const element = injectStyleTag(css);

    return map[key] = {
      theme,
      element,
      css,
    };
  },
};

export default css;
