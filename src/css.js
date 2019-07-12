export function inject(css) {
  css = css || '';

  const style = document.createElement('style');

  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);

  return style;
}

export function generateCSS(rules) {
  return rules.map(([selector, styles]) => {
    if (Array.isArray(selector)) {
      selector = selector.join(',');
    }

    if (typeof styles === 'object') {
      styles = Object.keys(styles)
        .reduce((total, key) => {
          return total + `${key}:${styles[key]};`;
        }, '');
    }

    return `${selector}{${styles}}`;
  }).join('');
}

function invertTheme(theme) {
  if (theme.startsWith('!')) {
    return theme.slice(1);
  } else {
    return `!${theme}`;
  }
}

const map = {};

const CSS = {
  has(name) {
    return !!map[name];
  },

  generateRules(tag, attrs, styles) {
    tag = tag.toLowerCase();

    const attrsQuery = Object.keys(attrs)
      .reduce((query, attr) => `${query}${attrs[attr] ? `[${attr}="${attrs[attr]}"]` : `:not([${attr}])`}`, '');
    const stylesString = Object.keys(styles)
      .reduce((string, style) => `${string}${styles[style] ? `${style}:${styles[style]}` : ''};`, '');
    const key = `${tag}${attrsQuery}`;

    if (map[key]) return;

    const css = generateCSS([[key, stylesString]]);

    const element = inject(css);

    return map[key] = {
      element,
      css
    };
  },

  generateRule(tag, attr, attrValue, style, styleValue) {
    tag = tag.toLowerCase();

    const key = `${tag}[${attr}="${attrValue}"]`;

    if (map[key]) return;

    const css = generateCSS([[key, `${style}:${styleValue};`]]);

    const element = inject(css);

    return map[key] = {
      element,
      css
    };
  },

  generateTheme(theme) {
    const key = `theme-${theme}`;

    if (map[key]) return;

    const specialColor = `var(--${theme}-special-color, var(--current-color, var(--default-special-color)))`;
    const borderColor = `var(--${theme}-border-color, var(--current-color, var(--default-border-color)))`;

    const rules = [[
      theme,
      `var(--${theme}-color, var(--default-color))`,
      `var(--${theme}-background-color, var(--default-background-color))`,
      specialColor,
      borderColor,
    ], [
      `!${theme}`,
      `var(--${theme}-background-color, var(--default-background-color))`,
      `var(--${theme}-color, var(--default-color))`,
      specialColor,
      borderColor
    ]].map(([theme, color, backgroundColor, specialColor, borderColor]) => {
      return [
        `[theme="${theme}"]:not([nu-inverted]),[theme="${invertTheme(theme)}"][nu-inverted],[nu-theme="${theme}"]`,
        `
          color:${color};
          background-color:${backgroundColor};
          --current-color:${color};
          --current-background-color:${backgroundColor};
          --current-special-color:${specialColor};
          --current-border-color:${borderColor};
        `];
    });

    const css = generateCSS(rules);

    const element = inject(css);

    return map[key] = {
      theme,
      element,
      css,
      rules,
    };
  },
};

export default CSS;
