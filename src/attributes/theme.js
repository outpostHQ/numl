import { composeThemeName, parseThemeAttr, THEME_PROPS_LIST } from '../themes';

/**
 * Apply theme to the element by providing specific custom properties.
 * @param {String} val - Theme name.
 * @returns {*}
 */
export default function themeAttr(val) {
  if (val == null) return;

  const theme = parseThemeAttr(val);

  if (!theme) return;

  const themeName = composeThemeName(theme);

  const styles = [THEME_PROPS_LIST.reduce((map, prop) => {
    if (theme.name !== 'main' && prop === 'subtle-color') return map;

    map[`--nu-${prop}`] = `var(--nu-${themeName}-${prop})`;

    return map;
  }, {})];

  styles.push({
    $suffix: ':not([color])',
    color: 'var(--nu-text-color)',
  });

  return styles;
}
