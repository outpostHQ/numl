import {
  log, extractMods, intersection, devMode, generateId, parseColor, CUSTOM_FUNCS, parseAttr, warn
} from "./helpers";
import {
  findContrastColor,
  mix,
  setPastelSaturation,
  setOpacity,
  hslToRgbaStr,
  getTheBrightest,
  hslToRgb,
  findContrastLightness,
  setSaturation,
  strToHsl,
  getSaturationRatio,
  hplToRgbaStr,
  getContrastRatio,
} from './color';
import { removeRulesByPart, insertRuleSet, stylesString, withMediaQuery } from './css';

export const THEME_ATTR = 'theme';

export const THEME_PROPS_LIST = [
  // theme props
  'text-color',
  'bg-color',
  'border-color',
  'mark-color',
  'focus-color',
  'subtle-color',
  'text-soft-color',
  'text-strong-color',
  'intensity',
  'special-color',
  'special-text-color',
  'special-bg-color',
  'special-intensity',
  'special-mark-color',
  'input-color',
];
const normalBaseTextColor = [0, 0, 19.87];
const contrastBaseTextColor = [0, 0, 12.25];
const darkNormalBaseTextColor = [0, 0, 88.82];
const darkContrastBaseTextColor = [0, 0, 94.45];
const baseBgColor = [0, 0, 100];
const normalMinLightness = 12.25;
const contrastMinLightness = 12.25;
const darkNormanBaseBgColor = [0, 0, normalMinLightness];
const darkContrastBaseBgColor = [0, 0, contrastMinLightness];

export const BASE_THEME = {
  hue: 0,
  saturation: 0,
  pastel: true,
  name: 'main',
  type: 'main',
  contrast: 'normal',
  lightness: 'normal',
};

export const RGB_COLORS = ['text', 'bg', 'subtle', 'special', 'special-text', 'special-bg'];

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
      ? 7
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

function getBaseTextColor(highContrast, darkScheme) {
  if (darkScheme) {
    return highContrast ? darkContrastBaseTextColor : darkNormalBaseTextColor;
  } else {
    return highContrast ? contrastBaseTextColor : normalBaseTextColor;
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
 * @param [shadowIntensity] {Number} – 0 to 1
 */
export function generateTheme({ hue, saturation, pastel, type, contrast, lightness, darkScheme, highContrast, shadowIntensity }) {
  const theme = {};
  const minContrast = getMinContrast(contrast, highContrast, darkScheme);
  const specialContrast = minContrast * (1 - (darkScheme ? 0 : (getSaturationRatio(hue, saturation, pastel) / 4.5)));
  const softContrast = Math.max(minContrast * .8, darkScheme ? 3.75 : 3);
  // const strongContrast = Math.min(minContrast / .8, 7);
  const tonedBgLightness = getBgLightness(lightness, highContrast, darkScheme);
  const textColor = getBaseTextColor(highContrast, darkScheme);
  const bgColor = getBaseBgColor(highContrast, darkScheme);
  const borderContrastModifier = contrast === 'strong' ? 1.5 : 0;

  const originalContrast = theme['special-text'] = getTheBrightest(textColor, bgColor);
  const originalSpecial = theme['special-bg'] = setSaturation([hue, saturation, findContrastLightness(theme['special-text'][2], type === 'tone' || type === 'swap' ? minContrast : specialContrast)], saturation, pastel);
  // themes with same hue should have focus color with consistent setPastelSaturation saturation

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
      theme.border = setPastelSaturation(findContrastColor(mix(originalSpecial, originalContrast, darkScheme ? 0 : .7), theme.bg[2], (highContrast ? 4.5 : 3) + borderContrastModifier, darkScheme), darkScheme ? 100 : saturation * .75);
      theme['special-bg'] = setSaturation([theme.text[0], saturation, findContrastLightness(theme.bg[2], darkScheme ? SPECIAL_CONTRAST_MAP[minContrast] : minContrast)], saturation, true);
      theme['special-text'] = setSaturation([theme.bg[0], theme.bg[1], findContrastLightness(theme['special-bg'][2], minContrast)], saturation, pastel);
      theme.special = [...bgColor];
      theme['text-soft'] = setSaturation([hue, saturation, findContrastLightness(theme.bg[2], minContrast, darkScheme)], saturation, true);
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
      theme['text-soft'] = [0, 0, findContrastLightness(tonedBgLightness, 7)];
      theme['text-strong'] = [0, 0, findContrastLightness(tonedBgLightness, 7)];
  }

  theme.focus = setPastelSaturation(mix(theme['special-text'], theme['special-bg']));

  if (type === 'main' || type === 'tint') {
    theme.border = setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 2 : 1.2) + borderContrastModifier), saturation / (highContrast ? 2 : 1));
  } else {
    theme.border = theme.border || setPastelSaturation(findContrastColor(originalSpecial, theme.bg[2], (highContrast ? 3 : 1.5) + borderContrastModifier), darkScheme ? 100 : saturation * .75);

    theme.subtle = [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -2 : 2)];

    theme.input = theme.input || [theme.bg[0], theme.bg[1], theme.bg[2] + (theme.bg[2] < theme.text[2] ? -4 : 4)];
  }

  if (type === 'main') {
    theme.special = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], specialContrast)], saturation, pastel);
  } else if (!theme.special) {
    const contrastLightness = findContrastLightness(theme.bg[2], specialContrast, darkScheme);
    theme.special = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }

  // in soft variant it's impossible to reduce contrast for headings
  if (!theme['text-soft']) {
    const contrastLightness = findContrastLightness(theme.bg[2], softContrast, !darkScheme);
    theme['text-soft'] = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }

  theme.mark = setOpacity([...theme.special], highContrast ? 0.16 : .08);
  theme['special-mark'] = setOpacity([...theme['special-text']], highContrast ? 0.16 : .08);
  theme.intensity = getShadowIntensity(theme.bg[2], shadowIntensity, darkScheme);
  theme['special-intensity'] = getShadowIntensity(theme['special-bg'][2], shadowIntensity, darkScheme);

  if (highContrast) {
    theme.intensity = Math.sqrt(theme.intensity);
    theme['special-intensity'] = Math.sqrt(theme['special-intensity']);
  }

  // If special-bg color is brighter than background we need to compensate it in shadow intensity
  if (theme['special-intensity'] < theme['intensity']) {
    theme['special-intensity'] = Math.sqrt(theme['intensity'] * theme['special-intensity']);
  }

  return theme;
}

/**
 * Get shadow intensity based on theme and user custom intensity param
 * @param bgLightness – background lightness
 * @param shadowIntensity – User-specified intensity
 * @param darkScheme – User-specified intensity
 * @returns {Number} – 0 to 1
 */
export function getShadowIntensity(bgLightness, shadowIntensity = .2, darkScheme) {
  return (1 - bgLightness / 100) * ((darkScheme ? .9 : .8) - shadowIntensity) + shadowIntensity;
}

export function themeToProps(name, theme) {
  const map = Object.keys(theme).reduce((map, color) => {
    if (!Array.isArray(theme[color])) {
      const key = `--nu-${name}-${color}`;

      map[key] = theme[color];
    } else {
      const key = `--nu-${name}-${color}-color`;
      const hsl = theme[color];

      map[key] = hslToRgbaStr(hsl);
    }

    return map;
  }, {});

  RGB_COLORS.forEach(clr => {
    map[`--nu-${name}-${clr}-color-rgb`] = hslToRgb(theme[clr]);
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

  generateId(el);

  const key = `theme:${name}`;
  const theme = applyDefaultMods(BASE_THEME, defaultMods);

  el.nuSetContext(key, {
    mods: defaultMods,
    ...theme,
    hue,
    saturation,
    pastel,
    $context: el,
  });

  if (!el.hasAttribute('theme') && name === 'main') {
    el.setAttribute('theme', 'main');
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
        removeRulesByPart(`${prop}:#${el.nuUniqId}`);
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

  const cssRules = generateMediaCSS(baseQuery, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]);

  insertRuleSet(
    ruleSetId,
    cssRules,
    null,
    true,
  );

  if (themeName === name) return;

  element.nuSetContext(`theme:${themeName}`, {
    name,
    hue,
    saturation,
    pastel,
    type,
    contrast,
    lightness,
    $context: element
  });
}

export function generateMediaCSS(query, [lightNormalProps, lightContrastProps, darkNormalProps, darkContrastProps]) {
  const prefersColorSchemeSupport = matchMedia('(prefers-color-scheme)').matches;
  const cssRules = [];
  const noNoQuery = generateThemeQuery(query, 'no', 'no');

  // if (prefersContrastSupport && prefersColorSchemeSupport) {
  // @TODO
  // } else
  if (prefersColorSchemeSupport) {
    const noHighQuery = generateThemeQuery(query, 'no', 'high');
    const noLowQuery = generateThemeQuery(query, 'no', 'low');
    const lightNoQuery = generateThemeQuery(query, 'light', 'no');
    const darkNoQuery = generateThemeQuery(query, 'dark', 'no');

    cssRules.push(
      withMediaQuery('(prefers-color-scheme: dark)', noHighQuery, darkContrastProps),
      withMediaQuery('(prefers-color-scheme: dark)', [noLowQuery, noNoQuery].join(), darkNormalProps),
      withMediaQuery('(prefers-color-scheme: light), (prefers-color-scheme: no-reference)', noHighQuery, lightContrastProps),
      withMediaQuery('(prefers-color-scheme: light), (prefers-color-scheme: no-reference)', [noLowQuery, noNoQuery].join(), lightNormalProps),
      `${lightNoQuery}{${lightNormalProps}}`,
      `${darkNoQuery}{${darkNormalProps}}`,
    );
  } else {
    cssRules.push(`${noNoQuery}{${lightNormalProps}}`);
  }

  cssRules.push(
    `${generateThemeQuery(query, 'light', 'low')}{${lightNormalProps}}`,
    `${generateThemeQuery(query, 'light', 'high')}{${lightContrastProps}}`,
    `${generateThemeQuery(query, 'dark', 'low')}{${darkNormalProps}}`,
    `${generateThemeQuery(query, 'dark', 'high')}{${darkContrastProps}}`,
  );

  return cssRules;
}

const notContrastClass = ':not([data-nu-contrast="low"]):not([data-nu-contrast="high"])';
const notSchemeClass = ':not([data-nu-scheme="light"]):not([data-nu-scheme="dark"])';

export function generateThemeQuery(query, scheme = '', contrast = '') {
  if (scheme) {
    if (scheme === 'light') {
      scheme = '[data-nu-scheme="light"]';
    } else if (scheme === 'dark') {
      scheme = '[data-nu-scheme="dark"]';
    } else {
      scheme = notSchemeClass;
    }
  }

  if (contrast) {
    if (contrast === 'low') {
      contrast = '[data-nu-contrast="low"]';
    } else if (contrast === 'high') {
      contrast = '[data-nu-contrast="high"]';
    } else {
      contrast = notContrastClass;
    }
  }

  return `:root${scheme}${contrast} ${query}`;
}

export function hueFromString(str) {
  const { color } = parseColor(str, true);

  if (color) {
    const hsl = strToHsl(color);

    if (hsl) {
      return hsl[0];
    }
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

  switch(contrast) {
    case 'auto':
      return highContrast ? 7 : 4.5;
    case 'high':
      return 7;
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

  let relativeContrast = (maxContrast - 1) * (contrast * (highContrast ? 1.5 : 1)) / 100 + 1;

  if (relativeContrast > maxContrast) {
    relativeContrast = maxContrast;
  }

  return relativeContrast;
}

export function requireHue(color) {
  let { hue, saturation, contrast, alpha, special, pastel } = color;

  const prop = `--nu-h-${hue}-s-${saturation}-c-${contrast}-a-${(alpha)}${pastel ? '-p' : ''}${special ? '-s' : ''}`;

  // convert alpha to decimal value
  alpha /= 100;

  if (!COLORS[prop]) {
    const lightValue = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast)), alpha]);
    const lightContrastValue = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness(baseBgColor[2], convertContrast(contrast, false, true)), alpha]);
    const darkValue = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness((!special ? darkNormanBaseBgColor : darkNormalBaseTextColor)[2], convertContrast(contrast, true), special), alpha]);
    const darkContrastValue = (pastel ? hplToRgbaStr : hslToRgbaStr)([hue, saturation, findContrastLightness((!special ? darkContrastBaseBgColor : darkContrastBaseTextColor)[2], convertContrast(contrast, true, true), special), alpha]);

    const props = [lightValue, lightContrastValue, darkValue, darkContrastValue]
      .map(value => `${prop}: ${value};`);

    COLORS[prop] = props;

    const cssRules = generateMediaCSS('body', props);

    insertRuleSet(prop, cssRules);
  }

  return prop;
}

const CONTRAST_MODES = ['auto', 'low', 'high'];

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
      switch(value) {
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
    const tmpCont = parseInt(values[2]);

    if (!isNaN(tmpCont)) {
      contrast = tmpCont;
    } else if (devMode) {
      warn('hue(): incorrect third `contrast` value. Should be an integer between 0 and 100 or one of the following shorthands: `auto`, `low`, and `high`. Provided value:', JSON.stringify(values[2]));
    }
  }

  if (values[alphaIndex] != null) {
    const tmpAlpha = parseInt(values[alphaIndex]);

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
    return `${explicitColor ? 'color(' : ''}var(${requireHue(parseHue(val))})${explicitColor ? ')' : ''}`;
  },
  hsluv(val) {
    return hslToRgbaStr(parseHSL(val));
  },
  hpluv(val) {
    return hplToRgbaStr(parseHSL(val));
  },
});
