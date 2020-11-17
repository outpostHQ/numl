import { composeThemeName, parseThemeAttr, RGB_COLORS, THEME_PROPS_LIST } from '../themes';
import { BASE_COLOR, SPECIAL_BASE_COLOR } from './color';
import { isNoValue } from '../helpers';

/**
 * Apply theme to the element by providing specific custom properties.
 * @param {String} val - Theme name.
 * @param {Object} defaults - Element default attribute values.
 * @returns {*}
 */
export default function themeAttr(val, defaults = {}) {
  if (val == null) val = '';

  if (isNoValue(val)) {
    return [];
  }

  const theme = parseThemeAttr(val);
  const themeName = composeThemeName(theme);

  const styles = [THEME_PROPS_LIST.reduce((map, prop) => {
    if (themeName === 'main') {
      map[`--${prop}`] = `var(--${themeName}-${prop})`;
    } else {
      map[`--${prop}`] = `var(--${themeName}-${prop}, var(--main-${prop}))`;
    }

    return map;
  }, {
    '--local-border-color': 'var(--border-color)',
    '--local-mark-color': 'var(--mark-color)',
    '--local-shadow-color': 'var(--shadow-color)',
  })];

  // rgb colors
  RGB_COLORS.forEach(clr => {
    styles[0][`--${clr}-color-rgb`] = `var(--${themeName}-${clr}-color-rgb, var(--main-${clr}-color-rgb))`;
  });

  styles.push({
    $suffix: ':not([color])',
    '--local-text-color': 'initial',
  }, {
    $suffix: ':not([color]):not([special])',
    color: BASE_COLOR,
  }, {
    $suffix: ':not([color])[special]',
    color: SPECIAL_BASE_COLOR,
  });

  return styles;
}
