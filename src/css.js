import { devMode, log, warn, requestIdleCallback, h } from "./helpers";
import scrollbarAttr from './attributes/scrollbar';

export const STYLE_MAP = {};
const testEl = h('div');

[...document.querySelectorAll('style[data-nu-name]')]
  .forEach(element => {
    const name = element.dataset.nuName.replace(/&quot;/g, '"');

    if (!name.includes('#')) {
      STYLE_MAP[name] = {
        element: element,
        css: element.textContent,
        selector: name,
      };
    }
  });

export function injectStyleTag(css, name, root) {
  css = css || '';

  if (devMode) {
    css = beautifyCSS(css);
  }

  const style = h('style');

  if (name) {
    style.dataset.nuName = name;
  }

  style.appendChild(document.createTextNode(css));

  (root || document.head).appendChild(style);

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
        if (style.startsWith('$')) return;
        if (!styles[style]) return;

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
    .reduce((string, style) => !style.startsWith('$') ? `${string}${styles[style] ? `${style}:${styles[style]}` : ''};` : string, '');
}

const TOUCH_REGEXP = /:hover(?!\))/; // |\[nu-active](?!\))
const NON_TOUCH_REGEXP = /:hover(?=\))/;

export function generateCSS(query, styles, universal = false) {
  if (!styles || !styles.length) return;

  const isHost = query.startsWith(':host');

  if (isHost) {
    query = query.replace(':host', '');
  }

  return styles.map(map => {
    let queries = [query];

    const $prefix = map.$prefix;
    const $suffix = map.$suffix;

    if (isHost && ($prefix || !$suffix)) return '';

    // multiple suffixes and prefixes
    [$suffix, $prefix]
      .forEach((add, addIndex) => {
        if (!add) return;

        const multiple = ~add.indexOf(',');
        const list = multiple && add.split(',');
        [...queries].forEach((query, queryIndex) => {
          if (multiple) {
            queries[queryIndex] = addIndex ? `${list[0]} ${query}` : `${query}${list[0]}`;

            list.forEach((ad, adIndex) => {
              if (adIndex) { // skip first suffix
                queries.push(addIndex ? `${ad} ${query}` : `${query}${ad}`);
              }
            });
          } else {
            queries[queryIndex] = addIndex ? `${add} ${query}` : `${query}${add}`;
          }
        });
      });

    if (isHost) {
      for (let i = 0; i < queries.length; i++) {
        const qry = queries[i];

        if (!qry) continue;

        if (qry.includes('>')) {
          const tmp = qry.split('>');

          queries[i] = `:host(${tmp[0].trim()})>${tmp[1]}`;
        } else {
          queries[i] = `:host(${qry})`;
        }
      }
    }

    if (universal) {
      return `${queries.join(',')}{${stylesString(map)}}`;
    }

    const touchQueries = queries.filter(query => query.match(TOUCH_REGEXP));
    const touchCSS = touchQueries.length
      ? `@media (hover: hover){${touchQueries.join(',')}{${stylesString(map)}}}`
      : '';
    const nonTouchQueries = queries.filter(query => query.match(NON_TOUCH_REGEXP));
    const nonTouchCSS = nonTouchQueries.length ? `
      @media (hover: hover){${nonTouchQueries.join(',')}{${stylesString(map)}}}
      @media (hover: none){${nonTouchQueries.join(',').replace(':not(:hover)', '')}{${stylesString(map)}}}
    ` : '';
    const otherQueries = queries.filter(query => !touchQueries.includes(query) && !nonTouchQueries.includes(query));
    const otherCSS = `${otherQueries.join(',')}{${stylesString(map)}}`;

    return [touchCSS, nonTouchCSS, otherCSS].join('\n');
  }).join('\n');
}

window.generateCSS = generateCSS;

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

export function injectCSS(name, selector, css, root) {
  const element = injectStyleTag(css, name, root);

  const styleMap = getRootStyleMap(root);

  if (devMode) {
    try {
      testEl.querySelector(selector);
    } catch (e) {
      warn('invalid selector detected', selector, css);
    }
  }

  if (styleMap[name]) {
    const el = styleMap[name].element;

    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  styleMap[name] = {
    selector,
    css,
    element,
  };

  return styleMap[name];
}

export function cleanCSSByPart(selectorPart) {
  log('clean css by part', selectorPart);
  const isRegexp = selectorPart instanceof RegExp;
  const keys = Object.keys(STYLE_MAP).filter(selector => isRegexp
    ? selector.match(selectorPart) : selector.includes(selectorPart));

  function clean() {
    keys.forEach(key => {
      removeCSS(key);
      log('css removed:', key);
    });
  }

  if (!isRegexp && selectorPart.startsWith('#')) {
    requestIdleCallback(clean);
  } else {
    clean();
  }
}

export function removeCSS(name, root) {
  let styleMap = getRootStyleMap(root);

  if (!styleMap[name]) return;

  const el = styleMap[name].element;

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  delete styleMap[name];
}

function getRootStyleMap(root) {
  let styleMap = STYLE_MAP;

  if (root) {
    if (!root.nuStyleMap) {
      root.nuStyleMap = {};
    }

    styleMap = root.nuStyleMap;
  }

  return styleMap;
}

export function hasCSS(name, root) {
  let styleMap = getRootStyleMap(root);

  return !!styleMap[name];
}

export function transferCSS(name, root) {
  const cssMap = STYLE_MAP[name];

  const content = cssMap.element.textContent;

  log('transfer styles to the shadow root:', JSON.stringify(name), root);

  return injectCSS(name, cssMap.selector, content, root);
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

const globalCSS = `
:root {
  --nu-base: 16px;
  --nu-pixel: 1px;

  --nu-radius: 0.5rem;
  --nu-gap: 0.5rem;
  --nu-border-width: 1px;
  --nu-transition-time: 0.08s;
  --nu-inline-offset: -.15em;
  --nu-transition-enabler: 1;

  --nu-font-size: 1rem;
  --nu-line-height: 1.5rem;
  --nu-font-weight: 400;
  --nu-text-font-weight: var(--nu-font-weight);
}

:root:not([data-nu-prevent-reset]) body {
  line-height: 1rem;
}

:root:not([data-nu-prevent-reset]) body > *:not([size]) {
  line-height: 1.5rem;
}

.nu-defaults, :root:not([data-nu-prevent-reset]) body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir Next', 'Avenir', Helvetica, Ubuntu, 'DejaVu Sans', Arial, sans-serif;
  font-size: var(--nu-base);
  color: var(--nu-text-color);
  background-color: var(--nu-subtle-color);
  font-weight: 400;
  word-spacing: calc(1rem / 8);
  min-height: 100vh;
  text-align: left;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color calc(var(--nu-transition-enabler) * var(--nu-transition-time)) linear;
}

.nu-defaults:not(body) {
  line-height: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-nu-scheme="light"]) .nu-dark-invert {
    filter: invert(100%) hue-rotate(180deg);
  }

  :root:not([data-nu-scheme="light"]) .nu-dark-dim, :root:not([data-nu-scheme="light"]) nu-img {
    filter: brightness(0.95);
  }
}

:root[data-nu-scheme="dark"] .nu-dark-invert {
  filter: invert(95%) hue-rotate(180deg);
}

:root[data-nu-scheme="dark"] .nu-dark-dim, :root[data-nu-scheme="dark"] nu-img {
  filter: brightness(0.95);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --nu-transition-enabler: 0;
  }
}

:root[data-nu-reduce-motion] {
  --nu-transition-enabler: 0;
}

[nu-hidden] {
  display: none !important;
}

${generateCSS('body', scrollbarAttr('yes'))}
`;

injectStyleTag(globalCSS, 'nu-defaults');
