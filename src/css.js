import { devMode, log, warn } from "./helpers";

export const map = {};
const testEl = document.createElement('div');

export function injectStyleTag(css, name) {
  css = css || '';

  if (devMode) {
    css = beautifyCSS(css);
  }

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

export function stylesString(styles) {
  if (devMode) {
    Object.keys(styles)
      .forEach(style => {
        const value = String(styles[style]);

        if (value
          && !style.startsWith('-')
          && !CSS.supports(style, value.replace('!important', ''))
          && !value.endsWith('-reverse')) {
          warn('unsupported style detected:', `{ ${style}: ${value}; }`);
        }
      });
  }

  return Object.keys(styles)
    .reduce((string, style) => `${string}${styles[style] ? `${style}:${styles[style]}` : ''};`, '');
}

export function generateCSS(query, styles, context = '') {
  if (!styles || !styles.length) return;

  return styles.map(map => {
    let currentQuery = query;

    if (map.$suffix) {
      currentQuery += map.$suffix;
    }

    if (map.$prefix) {
      if (currentQuery.startsWith('#')) {
        const index = currentQuery.indexOf(' ');

        currentQuery = `${currentQuery.slice(0, index)} ${map.$prefix} ${currentQuery.slice(index)}`;
      } else {
        currentQuery = `${map.$prefix} ${currentQuery}`;
      }
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
    try {
      testEl.querySelector(selector);
    } catch (e) {
      warn('invalid selector detected', selector, css);
    }
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

export function cleanCSSByPart(selectorPart) {
  log('clean css by part', selectorPart);
  const keys = Object.keys(map).filter(selector => selector.includes(selectorPart));

  keys.forEach(key => {
    removeCSS(key);
    log('css removed:', key)
  });
}

export function removeCSS(name) {
  if (!map[name]) return;

  const el = map[name].element;

  el.parentNode.removeChild(el);

  delete map[name];
}

export function hasCSS(name) {
  return !!map[name];
}

/**
 * Very fast css beautification without parsing.
 * Do not support media queries
 * Use in Dev Mode only!
 * @param css
 * @returns {string}
 */
export function beautifyCSS(css) {
  let flag = false;

  return css.replace(/[{;}](?!$)/g, s => s + '\n')
    .split(/\n/g)
    .map(s => s.trim())
    .filter(s => s)
    .map(s => {
      if (!s.includes('{') && !s.includes('}') && flag) {
        if (s.includes(':')) {
          s = s.replace(/:(?!\s)(?!not\()(?!:)/, ': ');
          return `  ${s}`;
        }

        return `    ${s}`;
      }

      if (s.includes('{')) {
        flag = true;
      } else if (s.includes('}')) {
        flag = false;
      }

      return s;
    }).join('\n');
}
