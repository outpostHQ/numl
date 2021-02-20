import {
  log,
  extractMods,
  intersection,
  devMode,
  generateId,
  CUSTOM_FUNCS,
  parseAttr,
  warn,
  roundNumToFixed,
} from './helpers';
import {
  findContrastColor,
  mix,
  setPastelSaturation,
  setOpacity,
  hslToRgbaStr,
  getTheBrightest,
  findContrastLightness,
  setSaturation,
  getSaturationRatio,
  hplToRgbaStr,
  getContrastRatio,
  rgbToHsl,
  getOptimalSaturation,
  rgbaStrToRgbValues,
} from './color';
import { extractColor } from './dom-helpers';
import { insertRuleSet, stylesString, removeRulesById } from './css';
import CONTEXT from './context';

export const THEME_ATTR = 'theme';

export const THEME_PROPS_LIST = [
  // theme props
  'text-color',
  'bg-color',
  'border-color',
  'mark-color',
  'outline-color',
  'subtle-color',
  'text-soft-color',
  'text-strong-color',
  'shadow-color',
  'special-color',
  'special-text-color',
  'special-bg-color',
  'special-mark-color',
  'special-shadow-color',
  'dark-color',
  'light-color',
  'input-color',
];
const normalTextLightness = 19.87;
const contrastTextLightness = 12.25;
const darkTextLightness = 88.82;
const darkContrastTextLightness = 94.45;
const normalBaseTextColor = [0, 0, 19.87];
const contrastBaseTextColor = [0, 0, 12.25];
const darkNormalBaseTextColor = [0, 0, 88.82];
const darkContrastBaseTextColor = [0, 0, 94.45];
const baseBgColor = [0, 0, 100];
const normalMinLightness = 12.25;
const contrastMinLightness = 12.25;
const darkNormanBaseBgColor = [0, 0, normalMinLightness];
const darkContrastBaseBgColor = [0, 0, contrastMinLightness];

function createThemeConfig(config = {}) {
  return Object.assign({}, {
    hue: 262,
    saturation: getOptimalSaturation(config.hue || 262),
    pastel: false,
    name: 'main',
    type: 'main',
    contrast: 'normal',
    lightness: 'normal',
    $context: document.body,
    mods: '',
    lazy: true,
  }, config);
}

export const RGB_COLORS = ['text', 'bg', 'subtle', 'special', 'special-text', 'special-bg', 'shadow', 'special-shadow', 'outline', 'dark', 'light'];

/**
 * Get minimal possible contrast ratio between text and foreground.
 * @param type {String}
 * @param highContrast {Boolean}
 * @param darkScheme {Boolean}
 * @returns {Number}
 */
function getMinContrast(type = 'normal', highContrast, darkScheme) {
  if (highContrast) {
    return type === 'strong'
      ? 8.5
      : (type === 'soft'
        ? 4.5
        : 7);
  } else {
    return type === 'strong'
      ? 7
      : (type === 'soft'
        ? (darkScheme ? 3.75 : 3)
        : 4.5);
  }
}

const BG_OFFSET = {
  normal: 9,
  dim: 5,
  bold: 16,
};

/**
 * Get background lightness by params.
 * @param [type] {String}
 * @param [highContrast] {Boolean}
 * @param [darkScheme] {Boolean}
 * @returns {Number}
 */
function getBgLightness(type = 'normal', highContrast, darkScheme) {
  if (darkScheme) {
    return (highContrast ? contrastMinLightness : normalMinLightness) + BG_OFFSET[type] - (darkScheme ? 2 : 0);
  } else {
    return 100 - BG_OFFSET[type];
  }
}

function getBaseTextColor(hue, saturation, highContrast, darkScheme) {
  saturation /= darkScheme ? 4 : 2;

  if (darkScheme) {
    return [hue, saturation, highContrast ? darkContrastTextLightness : darkTextLightness];
  } else {
    return [hue, saturation, highContrast ? contrastTextLightness : normalTextLightness];
  }
}

function getBaseBgColor(highContrast, darkScheme) {
  if (darkScheme) {
    return highContrast ? darkContrastBaseBgColor : darkNormanBaseBgColor;
  } else {
    return baseBgColor;
  }
}

const SPECIAL_CONTRAST_MAP = {
  3: 2.5,
  4.5: 3.5,
  7: 5.5,
};

/**
 * Generate theme with specific params
 * @param hue {Number} – Reference hue
 * @param saturation {Number} – Reference saturation
 * @param pastel {Boolean} – Use pastel palette
 * @param [type] {String} – [main] | tint | tone | swap | special
 * @param [contrast] {String} – [normal] | strong | soft
 * @param [lightness] {String} – [normal] | dim | bold
 * @param [darkScheme] {Boolean} - true | false
 * @param [highContrast] {Boolean} - true | false
 */
export function generateTheme({ hue, saturation, pastel, type, contrast, lightness, darkScheme, highContrast }) {
  const originalSaturation = saturation;

  if (darkScheme) {
    saturation = getOptimalSaturation(hue, saturation);
  }

  const theme = {};
  const minContrast = getMinContrast(contrast, highContrast, darkScheme);
  const specialContrast = minContrast * (1 - (darkScheme ? 0 : (getSaturationRatio(hue, saturation, pastel) / 4.5)));
  const softContrast = Math.max(minContrast * .8, darkScheme ? 3.75 : 3);
  // const strongContrast = Math.min(minContrast / .8, 7);
  const tonedBgLightness = getBgLightness(lightness, highContrast, darkScheme);
  const textColor = getBaseTextColor(hue, saturation, highContrast, darkScheme);
  const bgColor = getBaseBgColor(highContrast, darkScheme);
  const borderContrastModifier = contrast === 'strong' ? 1.5 : 0;

  const originalContrast = theme['special-text'] = getTheBrightest(textColor, bgColor);
  const originalSpecial = theme['special-bg'] = setSaturation([hue, saturation, findContrastLightness(theme['special-text'][2], type === 'tone' || type === 'swap' ? minContrast : specialContrast)], saturation, pastel);
  // themes with same hue should have outline color with consistent setPastelSaturation saturation

  if (type === 'main' || type === 'tint') {
    theme.subtle = setSaturation([hue, saturation, bgColor[2] + (darkScheme ? 2 : -2)], saturation * (darkScheme ? .5 : 1), true);

    if (darkScheme) {
      theme.input = [0, 0, bgColor[2] - 2];
    } else {
      theme.input = [...bgColor];
    }
  }

  switch (type || 'tint') {
    case 'tint':
      theme.bg = bgColor;
      theme.text = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], minContrast)], saturation, pastel);
      theme['text-strong'] = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], 7)], saturation, pastel);
      break;
    case 'tone':
      theme.bg = setSaturation([hue, saturation, tonedBgLightness], saturation, true);
      theme.text = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, minContrast)], saturation, pastel);
      theme['text-strong'] = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, 7)], saturation, pastel);
      theme.input = [...bgColor];
      break;
    case 'swap':
      theme.bg = setSaturation([hue, saturation, findContrastLightness(tonedBgLightness, minContrast)], saturation, pastel);
      theme.text = setSaturation([hue, saturation, tonedBgLightness], saturation, true);
      // theme.border = setSaturation(findContrastColor(mix(originalSpecial, originalContrast, darkScheme ? 0 : .7), theme.bg[2], (highContrast ? 4.5 : 3) + borderContrastModifier, darkScheme), darkScheme ? 100 : saturation * .75);
      theme['special-bg'] = setSaturation([theme.text[0], saturation, findContrastLightness(theme.bg[2], darkScheme ? SPECIAL_CONTRAST_MAP[minContrast] : minContrast)], saturation, true);
      theme['special-text'] = setSaturation([theme.bg[0], theme.bg[1], findContrastLightness(theme['special-bg'][2], minContrast)], saturation, pastel);
      theme.special = [...bgColor];
      theme['text-soft'] = highContrast ? [...theme.text] : setSaturation([hue, saturation, findContrastLightness(theme.bg[2], minContrast, darkScheme)], saturation, true);
      theme['text-strong'] = [...bgColor];
      break;
    case 'special':
      theme.text = getTheBrightest(textColor, bgColor);
      theme.bg = setSaturation([hue, saturation, findContrastLightness(theme.text[2], minContrast)], saturation, pastel);
      theme.border = setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 4.5 : 2.5) + borderContrastModifier), saturation * .75);
      [theme['special-text'], theme['special-bg']] = [theme['special-bg'], theme['special-text']];
      theme['special-text'] = setSaturation([hue, saturation, findContrastLightness(originalContrast[2], minContrast)], saturation, pastel);
      theme.special = [...originalContrast];
      theme['text-soft'] = [...theme.text];
      theme['text-strong'] = [...theme.text];
      break;
    case 'main':
      theme.bg = bgColor;
      theme.text = textColor;
      theme['text-soft'] = [theme.text[0], theme.text[1] / 2, highContrast ?  theme.text[2] : findContrastLightness(tonedBgLightness, 7)];
      theme['text-strong'] = [0, 0, findContrastLightness(tonedBgLightness, 7)];
  }

  theme.dark = setPastelSaturation(originalSpecial, Math.min(saturation * (darkScheme ? 1.2 : 1), 100));
  theme.dark[2] = darkScheme ? 22 : 30;
  theme.light = [hue, saturation, (darkScheme ? (highContrast ? darkContrastTextLightness : darkTextLightness) : 100) - 4 ];
  theme.outline = setPastelSaturation(mix(theme['special-text'], theme['special-bg']));
  theme.outline[1] = getOptimalSaturation(hue, Math.max(saturation, 75));

  if (type === 'main') {
    theme.border = setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 2 : 1.2) + borderContrastModifier), saturation / (highContrast ? 2 : 1));
  } else {
    theme.border = setPastelSaturation([
      hue,
      saturation,
      (highContrast ? (theme.text[2] * 2 + theme.bg[2]) : (theme.text[2] + theme.bg[2] * 2)) / 3,
    ], originalSaturation);

    if (!theme.subtle) {
      theme.subtle = [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -2 : 2)];
    }

    theme.input = theme.input || [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -8 : 6)];
  }

  if (type === 'main') {
    theme.special = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], specialContrast)], saturation, pastel);
  } else if (!theme.special) {
    const contrastLightness = findContrastLightness(theme.bg[2], specialContrast, darkScheme);
    theme.special = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }

  // in soft variant it's impossible to reduce contrast for headings
  if (!theme['text-soft']) {
    if (highContrast) {
      theme['text-soft'] = [...theme.text];
    } else {
      const contrastLightness = findContrastLightness(theme.bg[2], softContrast, !darkScheme);
      theme['text-soft'] = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
    }
  }

  theme.mark = setOpacity([...theme.special], highContrast ? 0.16 : .08);
  theme['special-mark'] = setOpacity([...theme['special-text']], highContrast ? 0.16 : .08);

  const shadowSaturation = saturation * (type === 'main' ? .66 : 1);
  const specialShadowSaturation = 100;
  const shadowContrastRatio = 1.8 * (highContrast ? 1.5 : 1);
  const specialShadowContrastRatio = (type === 'special' || (!darkScheme && type === 'swap') ? 1.5 : 1) * shadowContrastRatio * (darkScheme ? 1.5 : 1);
  const shadowLightness = findContrastLightness(theme.bg[2], shadowContrastRatio, true);
  const specialShadowLightness = findContrastLightness(theme['special-bg'][2], specialShadowContrastRatio, true);

  theme.shadow = (type !== 'swap' && type !== 'special' ? setPastelSaturation : setSaturation)([originalSpecial[0], shadowSaturation, shadowLightness, 1], shadowSaturation);
  theme['special-shadow'] = setPastelSaturation([originalSpecial[0], saturation, specialShadowLightness, 1], originalSaturation);

  return theme;
}

export function themeToProps(name, theme) {
  const prefix = name ? `--${name}-` : '--';

  const map = Object.keys(theme).reduce((map, color) => {
    if (!Array.isArray(theme[color])) {
      const key = `${prefix}${color}`;

      map[key] = theme[color];
    } else {
      const key = `${prefix}${color}-color`;
      const hsl = theme[color];

      map[key] = hslToRgbaStr(hsl);
    }

    return map;
  }, {});

  RGB_COLORS.forEach(clr => {
    map[`${prefix}${clr}-color-rgb`] = rgbaStrToRgbValues(map[`${prefix}${clr}-color`]);
  });

  return map;
}

const CONTRAST_MODS = [
  'strong',
  'soft',
];
const LIGHTNESS_MODS = [
  'dim',
  'bold',
];
export const THEME_TYPE_MODS = [
  'tint',
  'tone',
  'swap',
  'special',
];
export const ALL_THEME_MODS = [
  ...CONTRAST_MODS,
  ...LIGHTNESS_MODS,
  ...THEME_TYPE_MODS,
];

function incorrectTheme(prop, value) {
  log(`incorrect '${prop}' value in theme attribute`, value);
}

export function parseThemeAttr(attr) {
  let { value, mods } = extractMods(attr, ALL_THEME_MODS);
  let contrast, lightness, type;

  const contrastMods = intersection(mods, CONTRAST_MODS);

  if (devMode && contrastMods.length > 2) {
    incorrectTheme('contrast', attr);
    return;
  } else if (contrastMods.length === 1) {
    contrast = contrastMods[0];
  } else {
    contrast = 'normal';
  }

  const lightnessMods = intersection(mods, LIGHTNESS_MODS);

  if (devMode && lightnessMods.length > 2) {
    incorrectTheme('lightness', attr);
    return;
  } else if (lightnessMods.length === 1) {
    lightness = lightnessMods[0];
  } else {
    lightness = 'normal';
  }

  const typeMods = intersection(mods, THEME_TYPE_MODS);

  if (devMode && typeMods.length > 2) {
    incorrectTheme('type', attr);
    return;
  } else if (typeMods.length === 1) {
    type = typeMods[0];
  }

  if (value.length && !value.match(/^[a-z0-9-]+$/i)) {
    incorrectTheme('name', attr);
  }

  if (!type) {
    type = 'main';
  }

  if (!value) {
    value = 'main';
  }

  return {
    name: value,
    type,
    contrast,
    lightness,
  };
}

export function composeThemeName({ name, type, contrast, lightness }) {
  let themeName = name;
  let suffix = '';

  type = type || 'main';

  if (type !== 'main') {
    suffix += type[0] + type[1];
  }

  if (suffix || contrast !== 'normal') {
    suffix += contrast[0] + contrast[1];
  }

  if (suffix || lightness !== 'normal') {
    suffix += lightness[0];
  }

  if (suffix) {
    themeName += `-${suffix}`;
  }

  return themeName;
}

/**
 * Declare theme on element.
 * @param el – Element to remove theme
 * @param name {String} – Name of theme
 * @param hue {Number} – Reference hue of theme
 * @param saturation {Number} – Reference saturation of theme
 * @param pastel {Boolean} - Use pastel palette
 * @param defaultMods {String} – List of default modifiers
 */
export function declareTheme(el, name, hue, saturation, pastel, defaultMods) {
  log('declare theme', { element: el, name, hue, saturation, pastel, defaultMods });

  if (devMode && !el.nuContext) {
    log('element context not found');
    return;
  }

  const isGlobal = el === document.body;
  const key = `theme:${name}`;
  const theme = applyDefaultMods(BASE_THEME, defaultMods);

  const contextTheme = {
    mods: defaultMods,
    ...theme,
    hue,
    saturation,
    pastel,
    name,
    $context: el,
  };

  if (!isGlobal) {
    generateId(el);

    if (!el.hasAttribute('theme') && name === 'main') {
      el.setAttribute('theme', 'main');
    }

    el.nuSetContext(key, contextTheme);
  }

  applyTheme(el, {
    ...theme,
    name,
    hue,
    saturation,
    pastel,
  }, name);
}

/**
 * Apply default mods to theme.
 * @param theme
 * @param defaultMods {String}
 */
export function applyDefaultMods(theme, defaultMods) {
  theme = { ...theme };

  const { mods } = extractMods(defaultMods, ALL_THEME_MODS);
  const lightnessMod = mods.find(mod => LIGHTNESS_MODS.includes(mod));
  const contrastMod = mods.find(mod => CONTRAST_MODS.includes(mod));
  const typeMod = mods.find(mod => THEME_TYPE_MODS.includes(mod));

  if (lightnessMod) {
    if (theme.lightness === 'normal') {
      theme.lightness = lightnessMod;
    } else if (theme.lightness !== lightnessMod) {
      theme.lightness = 'normal';
    }
  }

  if (contrastMod) {
    if (theme.contrast === 'normal') {
      theme.contrast = contrastMod;
    } else if (theme.contrast !== contrastMod) {
      theme.contrast = 'normal';
    }
  }

  if (typeMod) {
    theme.type = typeMod;
  }

  theme.mods = `${theme.type !== 'main' ? theme.type : ''} ${theme.lightness !== 'normal' ? theme.lightness : ''} ${theme.contrast !== 'normal' ? theme.contrast : ''}`;

  return theme;
}

/**
 * Remove declaration of theme on element.
 * @param el – Element to remove theme
 * @param name {String} – Name of theme
 * @param customProps {Array<String>} – All custom properties of theme
 */
export function removeTheme(el, name, customProps) {
  if (devMode && !el.nuContext) {
    log('element context not found');
    return;
  }

  const key = `theme:${name}`;

  Object.keys(el.nuContext)
    .forEach(prop => {
      if (prop.startsWith(key)) {
        delete el.nuContext[prop];
        removeRulesById(el.nuUniqId, prop);
      }
    });
}

export function applyTheme(element, { name, hue, saturation, pastel, type, contrast, lightness }, themeName) {
  const lightNormalTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness,
  });
  const lightContrastTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, highContrast: true,
  });
  const darkNormalTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, darkScheme: true,
  });
  const darkContrastTheme = generateTheme({
    hue, saturation, pastel, type, contrast, lightness, highContrast: true, darkScheme: true,
  });

  themeName = themeName || composeThemeName({ name, type, contrast, lightness });
  const lightNormalProps = stylesString(themeToProps(themeName, lightNormalTheme));
  const lightContrastProps = stylesString(themeToProps(themeName, lightContrastTheme));
  const darkNormalProps = stylesString(themeToProps(themeName, darkNormalTheme));
  const darkContrastProps = stylesString(themeToProps(themeName, darkContrastTheme));

  log('apply theme', { element, themeName, hue, saturation, pastel, type, contrast, lightness });

  const baseQuery = element === document.body ? 'body' : `#${element.nuUniqId}`;
  const ruleSetId = `theme:${themeName}:${baseQuery}`;

  // const prefersContrastSupport = matchMedia('(prefers-contrast)').matches;

  const cssRules = generateSchemeCSS(baseQuery, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]);

  insertRuleSet(
    ruleSetId,
    cssRules,
    null,
    true,
  );

  if (themeName === name) return;

  const theme = {
    name,
    hue,
    saturation,
    pastel,
    type,
    contrast,
    lightness,
    $context: element
  };

  if (element.nuSetContext) {
    element.nuSetContext(`theme:${themeName}`, theme);
  } else {
    CONTEXT[`theme:${themeName}`] = theme;
  }
}

export function generateSchemeCSS(query, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]) {
  const cssRules = [];

  cssRules.push(
    `html[data-nu-scheme-is="light"][data-nu-contrast-is="low"] ${query} {${lightNormalProps}}`,
    `html[data-nu-scheme-is="dark"][data-nu-contrast-is="low"] ${query} {${darkNormalProps}}`,
    `html[data-nu-scheme-is="light"][data-nu-contrast-is="high"] ${query} {${lightContrastProps}}`,
    `html[data-nu-scheme-is="dark"][data-nu-contrast-is="high"] ${query} {${darkContrastProps}}`,
  );

  return cssRules;
}

export function hueFromString(str) {
  if (str.match(/^(#|(rgb|rgba|hsl)\()/)) {
    const extColor = extractColor(str);

    return rgbToHsl(extColor)[0];
  }

  return str.split('').reduce((sum, ch) => sum + ch.charCodeAt(0) * 69, 0) % 360;
}

const COLORS = {};
const LIGHT_MAX_CONTRAST = getContrastRatio(baseBgColor, normalBaseTextColor);
const LIGHT_HIGH_MAX_CONTRAST = getContrastRatio(baseBgColor, contrastBaseTextColor);
const DARK_MAX_CONTRAST = getContrastRatio(darkNormanBaseBgColor, darkNormalBaseTextColor);
const DARK_HIGH_MAX_CONTRAST = getContrastRatio(darkContrastBaseBgColor, darkContrastBaseTextColor);

function convertContrast(contrast, darkScheme, highContrast) {
  let maxContrast;

  switch (contrast) {
    case 'auto':
      return highContrast ? 7 : 4.5;
    case 'high':
      return highContrast ? 8.5 : 7;
    case 'low':
      return highContrast ? 4.5 : 3;
  }

  if (darkScheme) {
    if (highContrast) {
      maxContrast = DARK_HIGH_MAX_CONTRAST
    } else {
      maxContrast = DARK_MAX_CONTRAST;
    }
  } else {
    if (highContrast) {
      maxContrast = LIGHT_HIGH_MAX_CONTRAST
    } else {
      maxContrast = LIGHT_MAX_CONTRAST;
    }
  }

  if (highContrast && contrast) {
    contrast = 100 - ((100 - contrast) * (1 - (contrast / 100) * .85));
  }

  let relativeContrast = ((maxContrast - 1) * contrast / 100) + 1;

  if (relativeContrast > maxContrast) {
    relativeContrast = maxContrast;
  }

  return relativeContrast;
}

/**
 *
 * @param {{saturation: number, special: boolean, pastel: boolean, contrast: <string,number>, alpha: number, hue: number}} color
 * @param {String|Boolean} [name]
 * @return {String|{prop:string, light: string, lightContrast: string, dark: string, darkContrast: string }}
 */
export function requireHue(color, name) {
  let { hue, saturation, contrast, alpha, special, pastel } = color;

  const prop = name ? `--${name}-color` : `--h-${hue}-s-${saturation}-c-${contrast}-a-${(alpha)}${pastel ? '-p' : ''}${special ? '-s' : ''}-color`
    .replace(/\s/g, '').replace(/\./g, '-');
  const rgbProp = `${prop}-rgb`;
  const onlyReturn = name === false;
  const darkSaturation = getOptimalSaturation(hue, saturation);

  // convert alpha to decimal value
  alpha /= 100;

  if (!COLORS[prop] || name) {
    const light = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast)), alpha]);
    const lightContrast = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast, false, true)), alpha]);
    const dark = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, darkSaturation, findContrastLightness((!special ? darkNormanBaseBgColor : darkNormalBaseTextColor)[2], convertContrast(contrast, true), special), alpha]);
    const darkContrast = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, darkSaturation, findContrastLightness((!special ? darkContrastBaseBgColor : darkContrastBaseTextColor)[2], convertContrast(contrast, true, true), special), alpha]);

    const props = [light, lightContrast, dark, darkContrast]
      .map(value => `${prop}: ${value};${rgbProp ? `${rgbProp}: ${rgbaStrToRgbValues(value)}` : ''}`);

    if (!onlyReturn) {
      COLORS[prop] = props;

      const cssRules = generateSchemeCSS('body', props);

      insertRuleSet(prop, cssRules, null, !!name);
    } else {
      return {
        prop,
        light,
        lightContrast,
        dark,
        darkContrast,
      };
    }
  }

  return prop;
}

const CONTRAST_MODES = ['auto', 'low', 'high'];

/**
 *
 * @param {String} val
 * @return {{saturation: number, special: boolean, pastel: boolean, contrast: string, alpha: number, hue: number}|undefined}
 */
export function parseHue(val) {
  val = val.replace(',', ' ');

  let { all: values } = parseAttr(val, 2);

  // copy values
  values = [...values];

  let contrast = 'auto';
  let special = false;
  let pastel = false;
  let modContrast = false;

  for (let i = 0; i < values.length;) {
    const value = values[i];

    if (CONTRAST_MODES.includes(value)) {
      contrast = value;
      modContrast = true;
    } else {
      switch (value) {
        case 's':
        case 'special':
          special = true;
          break;
        case 'p':
        case 'pastel':
          pastel = true;
          break;
        default:
          i += 1;
          continue;
      }
    }

    values.splice(i, 1);
  }

  if (!values[0]) {
    if (devMode) {
      warn('hue(): 1 argument required.')
    }

    return;
  }

  const hue = parseInt(values[0]);

  if (isNaN(hue) || hue < 0 || hue > 359) {
    if (devMode) {
      warn('hue(): incorrect first `hue` argument. Should be an integer between 0 and 359. Provided value:', JSON.stringify(values[0]));
    }

    return;
  }

  let alpha = 100;
  let saturation = 100;

  if (values[1] != null) {
    const tmpSat = parseInt(values[1]);

    if (!isNaN(tmpSat) || tmpSat < 0 || tmpSat > 100) {
      saturation = tmpSat;
    } else if (devMode) {
      warn('hue(): incorrect second `saturation` value. Should be an integer between 0 and 100. Provided value:', JSON.stringify(values[1]));
    }
  }

  const alphaIndex = modContrast ? 2 : 3;

  if (!modContrast && values[2] != null) {
    const tmpCont = roundNumToFixed(parseInt(values[2]), 1);

    if (!isNaN(tmpCont)) {
      contrast = tmpCont;
    } else if (devMode) {
      warn('hue(): incorrect third `contrast` value. Should be an integer between 0 and 100 or one of the following shorthands: `auto`, `low`, and `high`. Provided value:', JSON.stringify(values[2]));
    }
  }

  if (values[alphaIndex] != null) {
    const tmpAlpha = roundNumToFixed(parseInt(values[alphaIndex]), 1);

    if (!isNaN(tmpAlpha)) {
      alpha = tmpAlpha;
    } else if (devMode) {
      warn('hue(): incorrect fourth `alpha` value. Should be a percent value between 0% and 100%. Provided value:', JSON.stringify(values[alphaIndex]));
    }
  }

  return { hue, saturation, contrast, alpha, special, pastel };
}

function parseHSL(val) {
  const values = val.split(',');

  return [...values.slice(0, 3).map(i => parseInt(i)), parseFloat(values[3])];
}

Object.assign(CUSTOM_FUNCS, {
  hue(val, { explicitColor } = {}) {
    const parsedHue = parseHue(val);

    if (!parsedHue) return 'var(--invalid-color)';

    return `${explicitColor ? 'color(' : ''}var(${requireHue(parsedHue)})${explicitColor ? ')' : ''}`;
  },
  hsluv(val) {
    return hslToRgbaStr(parseHSL(val));
  },
  hpluv(val) {
    return hplToRgbaStr(parseHSL(val));
  },
});

[
  ['white', '0'],
  ['grey', 'auto'],
  ['darkgrey', 'high'],
  ['lightgrey', 'low'],
  ['black', '100'],
]
  .forEach(([name, contrast]) => {
    requireHue({
      hue: 0,
      saturation: 0,
      contrast: String(contrast),
      alpha: 100,
      special: true,
      pastel: false,
    }, name);
  });

export function hue(val, dark, contrast) {
  const clr = requireHue(parseHue(val), false);

  let rgba;

  if (dark) {
    if (contrast) {
      rgba = clr.darkContrast;
    } else {
      rgba = clr.dark;
    }
  } else {
    if (contrast) {
      rgba = clr.lightContrast;
    } else {
      rgba = clr.light;
    }
  }

  return rgba;
}

export const BASE_THEME = createThemeConfig({ saturation: 0 });
export const SUCCESS_THEME = createThemeConfig({
  name: 'success',
  hue: 134,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
});
export const DANGER_THEME = createThemeConfig({
  name: 'danger',
  hue: 12,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
  saturation: 75,
});
export const WARNING_THEME = createThemeConfig({
  name: 'warning',
  hue: 45,
  type: 'tone',
  lightness: 'dim',
  mods: 'tone dim',
});
export const COLOR_THEMES = [
  ['blue', 262],
  ['cyan', 192],
  ['green', 134],
  ['yellow', 75, 100],
  ['orange', 45],
  ['red', 12, 75],
  ['purple', 312],
  ['violet', 282],
].reduce((map, [name, hue, saturation]) => {
  map[name] = createThemeConfig({
    name, hue, saturation: saturation != null ? saturation : getOptimalSaturation(hue),
    type: 'tone',
    lightness: 'dim',
    mods: 'tone dim',
  });

  requireHue({
    hue: hue,
    saturation: saturation != null ? saturation : getOptimalSaturation(hue),
    contrast: 'auto',
    alpha: 100,
    pastel: false,
  }, name);

  return map;
}, {});
export const THEME_MAP = {
  success: SUCCESS_THEME,
  danger: DANGER_THEME,
  warning: WARNING_THEME,
  ...COLOR_THEMES,
  base: BASE_THEME,
};
