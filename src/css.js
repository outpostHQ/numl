import { devMode, log, warn } from "./helpers";
import { h } from './dom-helpers';
import scrollbarAttr from './styles/scrollbar';
import { USE_HIDDEN_STYLES, SCROLLBAR } from './settings';

export const STYLE_MAP = {};
const HEAD = document.head;
const STYLE = h('style');
const RULE_SETS = {};

STYLE.dataset.numl = '';

HEAD.appendChild(STYLE);

const SHEET = STYLE.sheet;

// [...document.querySelectorAll('style[data-nu-name]')]
//   .forEach(element => {
//     const name = element.dataset.nuName.replace(/&quot;/g, '"');
//
//     if (!name.includes('#')) {
//       STYLE_MAP[name] = {
//         element: element,
//         css: element.textContent,
//         selector: name,
//       };
//     }
//   });

function getRootNode(root) {
  return root || HEAD;
}

function getSheet(root) {
  if (!root) return SHEET;

  if (root.nuSheet) {
    return root.nuSheet;
  }

  const style = h('style');

  root.appendChild(style);

  style.dataset.numl = '';

  root.nuSheet = style.sheet;

  return root.nuSheet;
}

/**
 * Insert a set of rules into style sheet.
 * @param {String} css
 * @param {CSSStyleSheet} sheet
 * @param {String} id
 * @return {CSSRule}
 */
export function insertRule(css, sheet, id) {
  css = css || '';

  if (devMode) {
    css = beautifyCSS(css);
  }

  const index = sheet.insertRule(css);
  const rule = sheet.cssRules[index];

  if (id) {
    rule.nuId = id;
  }

  return rule;
}

/**
 * Insert CSS Rule Set.
 * @param {String} id
 * @param {Array<String>} arr
 * @param {Undefined|ShadowRoot} [root]
 * @param {Boolean} [force]
 */
export function insertRuleSet(id, arr, root, force = false) {
  if (id && hasRuleSet(id, root)) {
    if (force) {
      removeRuleSet(id, root);
    } else {
      return;
    }
  }

  const ruleMap = getRuleMap(root);

  const ruleSet = ruleMap[id] = {
    raw: arr,
    rules: [],
  };

  if (!root) {
    RULE_SETS[id] = ruleSet;
  }

  if (USE_HIDDEN_STYLES) {
    const sheet = getSheet(root);

    for (let i = 0; i < arr.length; i++) {
      const rule = arr[i];

      const cssRule = insertRule(rule, sheet, id);

      ruleSet.rules.push(cssRule);
    }
  } else {
    const rootNode = getRootNode(root);
    const style = h('style');

    style.dataset.numl = id || '';

    ruleSet.element = style;

    style.appendChild(document.createTextNode(arr.join('\n')));

    rootNode.appendChild(style);
  }
}

export function removeRuleSet(id, root) {
  const ruleMap = getRuleMap(root);

  if (USE_HIDDEN_STYLES) {
    const sheet = getSheet(root);

    while (removeRule(id, sheet)) {}
  } else {
    const ruleSet = ruleMap[id];

    if (ruleSet) {
      const element = ruleSet.element;

      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }


  if (!root) {
    delete ruleMap[name];
  }
}

/**
 * Remove the CSS rule from a style sheet.
 * @param {String} id
 * @param {CSSStyleSheet} sheet
 * @return {boolean}
 */
export function removeRule(id, sheet) {
  const rules = sheet.cssRules;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule.nuId === id) {
      sheet.deleteRule(i);
      return true;
    }
  }

  return false;
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

export function generateCSS(query, styles, universal = false) {
  if (!styles || !styles.length) return [];

  const isHost = query.startsWith(':host');

  if (isHost) {
    query = query.replace(':host', '');
  }

  return styles.reduce((arr, map) => {
    let queries = [query];

    const $prefix = map.$prefix;
    const $suffix = map.$suffix;

    if (isHost && ($prefix || !$suffix)) return arr;

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
      arr.push(`${queries.join(',')}{${stylesString(map)}}`);

      return arr;
    }

    const css = queries.length ? `${queries.join(',')}{${stylesString(map)}}` : '';

    if (css) {
      arr.push(css);
    }

    return arr;
  }, []);
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

/**
 * Remove CSS rules by element ID. Like garbage collector of deleted elements.
 * @param {String} id - id of the element.
 * @param {String} [namespace] - Remove all rules in namespace. Used for themes.
 */
export function removeRulesById(id, namespace) {
  log('clean css rules by element id', id);

  const regex = new RegExp(`${namespace ? `${namespace}:` : ''}#${id}${!namespace ? '(?![a-z0-9-])' : ''}`, 'i');

  const keys = Object.keys(RULE_SETS)
    .filter(ruleId => {
      if (namespace) {
        return ruleId.match(regex);
      }

      return ruleId.split('"')
        .find((s, i) =>  i % 2 === 0 && s.match(regex));
    });

  keys.forEach(key => {
    removeRuleSet(key);
    log('css removed:', key);
  });
}

function getRuleMap(root) {
  let styleMap = RULE_SETS;

  if (root) {
    if (!root.nuRuleMap) {
      root.nuRuleMap = {};
    }

    styleMap = root.nuRuleMap;
  }

  return styleMap;
}

export function hasRuleSet(id, root) {
  let ruleMap = getRuleMap(root);

  return !!ruleMap[id];
}

export function transferCSS(id, root) {
  const ruleMap = getRuleMap(); // get document rule map
  const ruleSet = ruleMap[id];

  if (!ruleSet) return;

  const css = ruleSet.raw;

  log('transfer styles to the shadow root:', JSON.stringify(id), root);

  return insertRuleSet(id, css, root);
}

/**
 * Very fast css beautification without parsing.
 * Do not support media queries
 * Use in Dev Mode only!
 * @param {Array|String} css
 * @returns {Array|String}
 */
export function beautifyCSS(css) {
  if (Array.isArray(css)) {
    return css.map(beautifyCSS);
  }

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

// export function splitIntoRules(css) {
//   if (Array.isArray(css)) return css;
//
//   const arr = css.split('}').map(s => `${s}}`);
//
//   return arr.slice(0, -1);
// }

/* System font stack is used https://css-tricks.com/snippets/css/system-font-stack/ */

const globalRules = [`
:root {
  font-size: 16px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  --rem-pixel: calc(1rem / 16);

  --radius: 0.5rem;
  --gap: 0.5rem;
  --border-width: 1px;
  --outline-width: calc(1rem / 16 * 3);
  --transition: 0.08s;
  --skeleton-animation-time: 1.4s;
  --skeleton-animation-size: calc(((90rem * 2) + 100vw) / 3);
  --progressbar-animation-time: .8s;
  --spin-animation-time: .8s;
  --inline-offset: -.15em;
  --transition-enabler: 1;
  --icon-size: 1.5em;
  --disabled-opacity: .5;
  --skeleton-opacity: .18;
  --leaf-sharp-radius: 0;

  --font-size: 1rem;
  --line-height: 1.5rem;
  --font-weight: 400;
  --text-font-weight: var(--font-weight);
  --light-font-weight: 200;
  --normal-font-weight: 400;
  --bold-font-weight: 600;
  --semi-bold-font-weight: 500;
  --heading-font-weight: 700;
  --font-weight-step: 200;

  --system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Avenir Next", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  --font: var(--system-font);
  --base-monospace-font: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --monospace-font: var(--base-monospace-font);

  --clear-color: transparent;
  --system-black-color: rgba(0, 0, 0, 1);
  --system-black-color-rgb: 0, 0, 0;
  --system-white-color: rgba(255, 255, 255, 1);
  --system-white-color-rgb: 255, 255, 255;

  --invalid-color: transparent;

  --xxs: .25rem;
  --xs: .5rem;
  --sm: .75rem;
  --md: 1rem;
  --lg: 1.5rem;
  --xl: 2rem;
  --xxl: 3rem;
}`,

`:root:not([data-nu-prevent-reset]) body {
  line-height: 1rem;
}`,

`:root:not([data-nu-prevent-reset]) body > *:not([size]) {
  line-height: 1.5rem;
}`,

`.nu-defaults, :root:not([data-nu-prevent-reset]) body {
  margin: 0;
  padding: 0;
  font-family: var(--font);
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--subtle-color);
  font-weight: var(--normal-font-weight);
  word-spacing: calc(1rem / 8);
  min-height: 100vh;
  text-align: left;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  transition: background-color calc(var(--transition-enabler) * var(--transition)) linear;
}`,

`.nu-defaults:not(body) {
  line-height: 1.5rem;
}`,

`@media (prefers-color-scheme: dark) {
  :root:not([data-nu-scheme="light"]) .nu-dark-invert {
    filter: invert(100%) hue-rotate(180deg);
  }
}`,

`@media (prefers-color-scheme: dark) {
  :root:not([data-nu-scheme="light"]) .nu-dark-dim, :root:not([data-nu-scheme="light"]) nu-img {
    filter: brightness(0.95);
  }
}`,

`:root[data-nu-scheme="dark"] .nu-dark-invert {
  filter: invert(95%) hue-rotate(180deg);
}`,

`:root[data-nu-scheme="dark"] .nu-dark-dim, :root[data-nu-scheme="dark"] nu-img {
  filter: brightness(0.95);
}`,

`@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-enabler: 0;
  }
}`,

`:root[data-nu-reduce-motion] {
  --transition-enabler: 0;
}`,

`:root[data-nu-outline] [nu], :root[data-nu-outline] [nu-contents] > * {
  outline: var(--border-width, 1px) solid var(--outline-color) !important;
}`,

`:root:not([data-nu-outline]) [nu], :root:not([data-nu-outline]) [nu-contents] > * {
  outline: none !important;
}`,

`[nu-hidden] {
  display: none !important;
}`,

`.ionicon-fill-none {
  fill: none;
}`,

`.ionicon-stroke-width {
  --local-stroke-width: var(--icon-stroke-width, 2px);
  stroke-width: calc(var(--local-stroke-width) * 16);
}`,

...(SCROLLBAR ? generateCSS('body', scrollbarAttr('yes'), false) : [])];

insertRuleSet('global', globalRules);
