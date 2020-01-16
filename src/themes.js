import {
  log, extractMods, intersection, devMode, generateId
} from "./helpers";
import {
  findContrastColor,
  mix,
  setPastelSaturation,
  setOpacity,
  hslToRgbaStr,
  getTheBrightest,
  hslToRgb,
  findContrastLightness, setSaturation,
} from './color';
import { cleanCSSByPart, injectCSS, stylesString } from './css';

export const THEME_ATTR = 'theme';

export const THEME_PROPS_LIST = [
  // theme props
  'text-color',
  'bg-color',
  'border-color',
  'hover-color',
  'focus-color',
  'subtle-color',
  'text-soft-color',
  'text-strong-color',
  'intensity',
  'special-color',
  'special-text-color',
  'special-bg-color',
  'special-intensity',
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
  hue: 252,
  saturation: 80,
  pastel: true,
  name: 'main',
  type: 'main',
  contrast: 'normal',
  lightness: 'normal',
};

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
 * @param [type] {String} – [main] | tint | toned | swap | special
 * @param [contrast] {String} – [normal] | strong | soft
 * @param [lightness] {String} – [normal] | dim | bold
 * @param [darkScheme] {Boolean} - true | false
 * @param [highContrast] {Boolean} - true | false
 * @param [shadowIntensity] {Number} – 0 to 1
 */
export function generateTheme({ hue, saturation, pastel, type, contrast, lightness, darkScheme, highContrast, shadowIntensity }) {
  const theme = {};
  const minContrast = getMinContrast(contrast, highContrast, darkScheme);
  const softContrast = Math.max(minContrast * .8, darkScheme ? 3.75 : 3);
  const strongContrast = Math.min(minContrast / .8, 7);
  const tonedBgLightness = getBgLightness(lightness, highContrast, darkScheme);
  const textColor = getBaseTextColor(highContrast, darkScheme);
  const bgColor = getBaseBgColor(highContrast, darkScheme);
  const borderContrastModifier = contrast === 'strong' ? 1.5 : 0;

  const originalContrast = theme['special-text'] = getTheBrightest(textColor, bgColor);
  const originalSpecial = theme['special-bg'] = setSaturation([hue, saturation, findContrastLightness(theme['special-text'][2], type === 'toned' || type === 'swap' ? (softContrast + minContrast) / 2 : softContrast)], saturation, pastel);
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
    case 'toned':
      // @TODO Check bg saturation
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
    theme.special = setSaturation([hue, saturation, findContrastLightness(theme.subtle[2], softContrast)], saturation, pastel);
  } else if (!theme.special) {
    const contrastLightness = findContrastLightness(theme.bg[2], softContrast, darkScheme);
    theme.special = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }

  // in soft variant it's impossible to reduce contrast for headings
  if (!theme['text-soft']) {
    const contrastLightness = findContrastLightness(theme.bg[2], softContrast, !darkScheme);
    theme['text-soft'] = contrastLightness ? setSaturation([hue, saturation, contrastLightness], saturation, pastel) : [...theme.text];
  }
  theme.hover = setOpacity([hue, saturation, findContrastLightness(theme.bg[2], highContrast ? 2.2 : 1.6)], .15);
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
  return (1 - Math.pow(bgLightness / 100, 1)) * ((darkScheme ? .9 : .8) - shadowIntensity) + shadowIntensity;
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

  map[`--nu-${name}-text-color-rgb`] = hslToRgb(theme.text);
  map[`--nu-${name}-bg-color-rgb`] = hslToRgb(theme.bg);

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
  'toned',
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

  if (!el.nuContext[key]) {
    el.nuContext[key] = {
      mods: defaultMods,
      ...theme,
      hue,
      saturation,
      pastel,
      $context: el,
    };
  }

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

  const { value, mods } = extractMods(defaultMods, ALL_THEME_MODS);
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
        cleanCSSByPart(`${prop}:#${el.nuUniqId}`);
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
  const styleTagName = `theme:${themeName}:${baseQuery}`;

  const prefersContrastSupport = matchMedia('(prefers-contrast)').matches;
  const prefersColorSchemeSupport = matchMedia('(prefers-color-scheme)').matches;

  if (prefersContrastSupport && prefersColorSchemeSupport) {
    injectCSS(
      styleTagName,
      baseQuery,
      `
        @media (prefers-color-scheme: dark) and (prefers-contrast: high) {
          html.nu-prefers-color-scheme.nu-prefers-contrast ${baseQuery}{${darkContrastProps}}
        }
        @media (prefers-color-scheme: dark) and (prefers-contrast: low), @media (prefers-color-scheme: dark) and (prefers-contrast: no-reference) {
          html.nu-prefers-color-scheme.nu-prefers-contrast ${baseQuery}{${darkNormalProps}}
        }
        @media @media (prefers-color-scheme: light) and (prefers-contrast: high), @media (prefers-color-scheme: no-reference)  and (prefers-contrast: high) {
          html.nu-prefers-color-scheme.nu-prefers-contrast ${baseQuery}{${lightContrastProps}}
        }
        @media @media (prefers-color-scheme: light) and (prefers-contrast: low), @media (prefers-color-scheme: no-reference)  and (prefers-contrast: low), @media @media (prefers-color-scheme: light) and (prefers-contrast: no-reference), @media (prefers-color-scheme: no-reference)  and (prefers-contrast: no-reference) {
          html.nu-prefers-color-scheme.nu-prefers-contrast ${baseQuery}{${lightNormalProps}}
        }

        @media (prefers-contrast: high) {
          html.nu-prefers-color-scheme-dark.nu-prefers-contrast ${baseQuery}{${darkContrastProps}}
          html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-dark).nu-prefers-contrast ${baseQuery}{${lightContrastProps}}
        }

        @media (prefers-color-scheme: light), @media (prefers-color-scheme: no-reference) {
          html.nu-prefers-color-scheme-dark.nu-prefers-contrast ${baseQuery}{${darkNormalProps}}
          html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-dark).nu-prefers-contrast ${baseQuery}{${lightNormalProps}}
        }

        @media (prefers-color-scheme: dark) {
          html.nu-prefers-color-scheme.nu-prefers-contrast-high ${baseQuery}{${darkContrastProps}}
          html.nu-prefers-color-scheme:(.nu-prefers-contrast):not(.nu-prefers-contrast-high) ${baseQuery}{${darkNormalProps}}
        }
        @media (prefers-color-scheme: light), @media (prefers-color-scheme: no-reference) {
          html.nu-prefers-color-scheme.nu-prefers-contrast-high ${baseQuery}{${lightContrastProps}}
          html.nu-prefers-color-scheme:not(.nu-prefers-contrast):not(.nu-prefers-contrast-high) ${baseQuery}{${lightNormalProps}}
        }

        html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-dark):not(.nu-prefers-contrast):not(.nu-prefers-contrast-high) ${baseQuery}{${lightNormalProps}}
      `
    );
  } else if (prefersColorSchemeSupport) {
    injectCSS(
      styleTagName,
      baseQuery,
      `
        @media (prefers-color-scheme: dark) {
          html.nu-prefers-color-scheme.nu-prefers-contrast-high ${baseQuery}{${darkContrastProps}}
          html.nu-prefers-color-scheme:not(.nu-prefers-contrast-high) ${baseQuery}{${darkNormalProps}}
        }
        @media (prefers-color-scheme: light), @media (prefers-color-scheme: no-reference) {
          html.nu-prefers-color-scheme.nu-prefers-contrast-high ${baseQuery}{${lightContrastProps}}
          html.nu-prefers-color-scheme:not(.nu-prefers-contrast-high) ${baseQuery}{${lightNormalProps}}
        }

        html.nu-prefers-color-scheme-dark.nu-prefers-contrast-high ${baseQuery}{${darkContrastProps}}
        html.nu-prefers-color-scheme-dark:not(.nu-prefers-contrast-high) ${baseQuery}{${darkNormalProps}}
        html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-dark).nu-prefers-contrast-high ${baseQuery}{${lightContrastProps}}
        html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-dark):not(.nu-prefers-contrast-high) ${baseQuery}{${lightNormalProps}}
      `
    );
  } else {
    injectCSS(
      styleTagName,
      baseQuery,
      `
        html:not(.nu-prefers-color-scheme-dark):not(.nu-prefers-contrast-high) ${baseQuery}{${lightNormalProps}}
        html.nu-prefers-color-scheme-dark:not(.nu-prefers-contrast-high) ${baseQuery}{${darkNormalProps}}
        html.nu-prefers-contrast-high:not(.nu-prefers-color-scheme-dark) ${baseQuery}{${lightContrastProps}}
        html.nu-prefers-contrast-high.nu-prefers-color-scheme-dark ${baseQuery}{${darkContrastProps}}
      `
    );
  }

  if (themeName === name) return;

  element.nuContext[`theme:${themeName}`] = {
    name,
    hue,
    saturation,
    pastel,
    type,
    contrast,
    lightness,
    $context: element
  };
}
