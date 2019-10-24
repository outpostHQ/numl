import { isColorScheme, getMainThemeName } from '../themes';
import { THEME_ATTRS_LIST, THEME_SCHEME_ATTRS } from '../attrs';

/**
 * Apply theme to the element by providing specific custom properties.
 * @param {String} val - Theme name.
 * @returns {*}
 */
export default function themeAttr(val, defaults) {
  if (val == null) return;

  if (!val) val = 'default';

  const colorScheme = isColorScheme(val);
  const mainThemeName = getMainThemeName(val);

  const themeStyles = THEME_ATTRS_LIST.reduce((obj, name) => {
    if (colorScheme && THEME_SCHEME_ATTRS.includes(name)) {
      obj[`--nu-theme-${name}`] = `var(--nu-${mainThemeName}-${name})`;
    } else {
      obj[`--nu-theme-${name}`] = `var(--nu-${val}-${name})`;
    }

    return obj;
  }, {});

  return [themeStyles, {
    $suffix: ':not([special]):not([color])',
    color: themeStyles['--nu-theme-color'],
  }];
}
