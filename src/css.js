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

function invertTheme(theme) {
  if (theme.startsWith('!')) {
    return theme.slice(1);
  } else {
    return `!${theme}`;
  }
}

const CSS = {
  has(name) {
    return !!map[name];
  },

  /**
   * Generate CSS for the theme with specific name.
   * @param {string} theme
   */
  generateTheme(theme) {
    const key = `theme-${theme}`;

    if (map[key]) return;

    const specialColor = `var(--${theme}-special-color, var(--default-special-color))`;
    const borderColor = `var(--${theme}-border-color, var(--default-border-color))`;
    const linkColor = `var(--${theme}-special-color, var(--current-color))`;

    const css = [[
      theme,
      `var(--${theme}-color, var(--default-color))`,
      `var(--${theme}-background-color, var(--default-background-color))`,
    ], [
      `!${theme}`,
      `var(--${theme}-background-color, var(--default-background-color))`,
      `var(--${theme}-color, var(--default-color))`,
    ]].map(([theme, color, backgroundColor]) => {
      return`
        [theme="${theme}"]:not([nu-inverted]),[theme="${invertTheme(theme)}"][nu-inverted],[nu-theme="${theme}"]{
          color:${color};
          background-color:${backgroundColor};
          --current-color:${color};
          --current-background-color:${backgroundColor};
          --current-special-color:${specialColor};
          --current-border-color:${borderColor};
          --current-link-color:${theme.startsWith('!') ? linkColor : specialColor};
        }
      `;
    }).join('');

    const element = inject(css);

    return map[key] = {
      theme,
      element,
      css,
    };
  },
};

export default CSS;
