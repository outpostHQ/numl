/**
 * Dict for all browser built-in colors.
 * It's included to support such declarations in themes.
 * Without such dict it would be impossible to declare computed color properties in themes.
 * @type {Object}
 */
export const COLORS = {
  indianred: '#CD5C5C',
  lightcoral: '#F08080',
  salmon: '#FA8072',
  darksalmon: '#E9967A',
  lightsalmon: '#FFA07A',
  crimson: '#DC143C',
  red: '#FF0000',
  firebrick: '#B22222',
  darkred: '#8B0000',
  pink: '#FFC0CB',
  lightpink: '#FFB6C1',
  hotpink: '#FF69B4',
  deeppink: '#FF1493',
  mediumvioletred: '#C71585',
  palevioletred: '#DB7093',
  coral: '#FF7F50',
  tomato: '#FF6347',
  orangered: '#FF4500',
  darkorange: '#FF8C00',
  orange: '#FFA500',
  gold: '#FFD700',
  yellow: '#FFFF00',
  lightyellow: '#FFFFE0',
  lemonchiffon: '#FFFACD',
  lightgoldenrodyellow: '#FAFAD2',
  papayawhip: '#FFEFD5',
  moccasin: '#FFE4B5',
  peachpuff: '#FFDAB9',
  palegoldenrod: '#EEE8AA',
  khaki: '#F0E68C',
  darkkhaki: '#BDB76B',
  lavender: '#E6E6FA',
  thistle: '#D8BFD8',
  plum: '#DDA0DD',
  violet: '#EE82EE',
  orchid: '#DA70D6',
  fuchsia: '#FF00FF',
  magenta: '#FF00FF',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  blueviolet: '#8A2BE2',
  darkviolet: '#9400D3',
  darkorchid: '#9932CC',
  darkmagenta: '#8B008B',
  purple: '#800080',
  rebeccapurple: '#663399',
  indigo: '#4B0082',
  mediumslateblue: '#7B68EE',
  slateblue: '#6A5ACD',
  darkslateblue: '#483D8B',
  greenyellow: '#ADFF2F',
  chartreuse: '#7FFF00',
  lawngreen: '#7CFC00',
  lime: '#00FF00',
  limegreen: '#32CD32',
  palegreen: '#98FB98',
  lightgreen: '#90EE90',
  mediumspringgreen: '#00FA9A',
  springgreen: '#00FF7F',
  mediumseagreen: '#3CB371',
  seagreen: '#2E8B57',
  forestgreen: '#228B22',
  green: '#008000',
  darkgreen: '#006400',
  yellowgreen: '#9ACD32',
  olivedrab: '#6B8E23',
  olive: '#808000',
  darkolivegreen: '#556B2F',
  mediumaquamarine: '#66CDAA',
  darkseagreen: '#8FBC8F',
  lightseagreen: '#20B2AA',
  darkcyan: '#008B8B',
  teal: '#008080',
  aqua: '#00FFFF',
  cyan: '#00FFFF',
  lightcyan: '#E0FFFF',
  paleturquoise: '#AFEEEE',
  aquamarine: '#7FFFD4',
  turquoise: '#40E0D0',
  mediumturquoise: '#48D1CC',
  darkturquoise: '#00CED1',
  cadetblue: '#5F9EA0',
  steelblue: '#4682B4',
  lightsteelblue: '#B0C4DE',
  powderblue: '#B0E0E6',
  lightblue: '#ADD8E6',
  skyblue: '#87CEEB',
  lightskyblue: '#87CEFA',
  deepskyblue: '#00BFFF',
  dodgerblue: '#1E90FF',
  cornflowerblue: '#6495ED',
  royalblue: '#4169E1',
  blue: '#0000FF',
  mediumblue: '#0000CD',
  darkblue: '#00008B',
  navy: '#000080',
  midnightblue: '#191970',
  cornsilk: '#FFF8DC',
  blanchedalmond: '#FFEBCD',
  bisque: '#FFE4C4',
  navajowhite: '#FFDEAD',
  wheat: '#F5DEB3',
  burlywood: '#DEB887',
  tan: '#D2B48C',
  rosybrown: '#BC8F8F',
  sandybrown: '#F4A460',
  goldenrod: '#DAA520',
  darkgoldenrod: '#B8860B',
  peru: '#CD853F',
  chocolate: '#D2691E',
  saddlebrown: '#8B4513',
  sienna: '#A0522D',
  brown: '#A52A2A',
  maroon: '#800000',
  white: '#FFFFFF',
  snow: '#FFFAFA',
  honeydew: '#F0FFF0',
  mintcream: '#F5FFFA',
  azure: '#F0FFFF',
  aliceblue: '#F0F8FF',
  ghostwhite: '#F8F8FF',
  whitesmoke: '#F5F5F5',
  seashell: '#FFF5EE',
  beige: '#F5F5DC',
  oldlace: '#FDF5E6',
  floralwhite: '#FFFAF0',
  ivory: '#FFFFF0',
  antiquewhite: '#FAEBD7',
  linen: '#FAF0E6',
  lavenderblush: '#FFF0F5',
  mistyrose: '#FFE4E1',
  gainsboro: '#DCDCDC',
  lightgray: '#D3D3D3',
  lightgrey: '#D3D3D3',
  silver: '#C0C0C0',
  darkgray: '#A9A9A9',
  darkgrey: '#A9A9A9',
  gray: '#808080',
  grey: '#808080',
  dimgray: '#696969',
  dimgrey: '#696969',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  slategray: '#708090',
  slategrey: '#708090',
  darkslategray: '#2F4F4F',
  darkslategrey: '#2F4F4F',
  black: '#000000'
};

/**
 * Required root element attribute.
 * @type {String}
 */
export const ROOT_CONTEXT = '[data-nu-root]';

/**
 * Script injection.
 * @param {String} src
 * @returns {Promise<*>}
 */
export function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;

    document.body.appendChild(script);
  });
}

/**
 * Custom units dict
 * @type {Object}
 */
export const CUSTOM_UNITS = {
  'br': 'var(--nu-theme-border-radius)',
  'bw': 'var(--nu-theme-border-width)',
};

/**
 * Unit conversion for attribute values.
 * @param {String} unit - String for conversion.
 * @param {String} [multiplier] - If presented then use multiply custom unit (for example `2x`).
 * @returns {string|*}
 */
export function convertUnit(unit, multiplier) {
  if (!unit) return unit;

  if (!unit.includes('(')) {
    unit = unit
      .replace(/\d+\/\d+/g, val => {
        const tmp = val.split('/');
        return ((Number(tmp[0]) / Number(tmp[1])) * 100).toFixed(4) + '%';
      })
      .replace(/([\d.]+)([^a-z\d%.]|$)/gi, (s, s2, s3) => `${s2}rem${s3}`);
  };

  if (multiplier) {
    unit = convertCustomUnit(unit, 'x', multiplier);
  }

  for (let customUnit of Object.keys(CUSTOM_UNITS)) {
    unit = convertCustomUnit(unit, customUnit, CUSTOM_UNITS[customUnit]);
  }

  return unit;
}

/**
 * Returns simple unit handler for the attribute.
 * @param {String} name - Attribute name.
 * @param {String} $suffix - Query suffix for styles.
 * @returns {null|Object}
 */
export function unit(name, $suffix) {
  return val =>
    val
      ? {
          $suffix,
          [name]: convertUnit(val)
        }
      : null;
}

/**
 * Returns unit handler for dimensional attributes.
 * @param {String} name - Attribute name.
 * @param {String} $suffix - Query suffix for styles.
 * @returns {null|Object}
 */
export function sizeUnit(name, $suffix) {
  return val => {
    if (val) {
      if (val.startsWith('clamp(')) {
        const values = val.slice(6, -1).split(',');

        return {
          $suffix,
          [name]: convertUnit(values[1]),
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[2])
        };
      } else if (val.startsWith('minmax(')) {
        const values = val.slice(7, -1).split(',');

        return {
          $suffix,
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[1])
        };
      } else if (val.startsWith('min(')) {
        return {
          $suffix,
          [`min-${name}`]: convertUnit(val.slice(4, -1))
        };
      } else if (val.startsWith('max(')) {
        return {
          $suffix,
          [`max-${name}`]: convertUnit(val.slice(4, -1))
        };
      }

      return {
        $suffix,
        [name]: convertUnit(val)
      };
    }

    return val;
  };
}

/**
 * Return a parent element that satisfy to provided selector.
 * @param {Element} element
 * @param {String} selector
 * @returns {undefined|Element}
 */
export function getParent(element, selector) {
  const elements = [...document.querySelectorAll(selector)];

  while ((element = element.parentNode) && !elements.includes(element)) {}

  return element;
}

/**
 * Return a closest element that satisfy to provided selector.
 * @TODO: improve search algorithm.
 * @param {Element} element
 * @param {String} selector
 * @returns {undefined|Element}
 */
export function invertQuery(element, selector) {
  do {
    const found = element.querySelector(selector);

    if (found) return found;
  } while ((element = element.parentNode));
}

/**
 * Tell if library run in dev mode.
 * @type {Boolean}
 */
export const devMode = process.env.NODE_ENV === 'development';

/**
 * Write log to console.
 * @param args
 */
export function log(...args) {
  if (devMode) {
    console.log('nude:', ...args);
  }
}

/**
 * Write warning to console
 * @param args
 */
export function warn(...args) {
  if (devMode) {
    console.warn('nude:', ...args);
  }
}

/**
 * Write error to console.
 * @param args
 */
export function error(...args) {
  if (devMode) {
    console.error('nude:', ...args);
  }
}

let globalId = 0;

/**
 * Return current id of the element and generate it if it's no presented.
 * @param {Element} el
 * @returns {String}
 */
export function generateId(el) {
  if (el.id) return el.id;

  globalId += 1;

  return (el.id = `nu-${globalId}`);
}

const dim = document.createElement('div');
const dimStyle = dim.style;

/**
 * Extract rgba channels for color.
 * @param {String} color – CSS color string.
 * @returns {Number[]} – Array with values: Red channel, Green channel, Blue channel, Alpha channel.
 */
export function extractColor(color, ignoreAlpha = false) {
  if (typeof color !== 'string') return null;

  dimStyle.color = '';
  dimStyle.color = COLORS[color.toLowerCase()] || color;

  const arr = !dimStyle.color
    ? null // incorrect color
    : dimStyle.color
        .slice(dimStyle.color.indexOf('(') + 1, -1)
        .split(', ')
        .map(Number);

  if (!arr) return arr;

  if (ignoreAlpha) {
    return arr.slice(0, 3);
  }

  arr[3] = arr[3] || 1;

  return arr;
}

/**
 * Set alpha channel to the color.
 * @param {String|Array} color
 * @param {Number} alpha
 * @returns {String}
 */
export function setAlphaChannel(color, alpha = 1) {
  const rgba = typeof color === 'string' ? extractColor(color) : color;

  if (!rgba) return rgba;

  return colorString(...rgba.slice(0, 3), alpha);
}

/**
 * Generate RGBA color string.
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @param {Number} alpha
 * @returns {String}
 */
export function colorString(red, green, blue, alpha = 1) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/**
 * Convert color to RGBA declaration.
 * @param {String|Array} color
 * @param {Boolean} ignoreAlpha
 * @returns {undefined|String}
 */
export function generalizeColor(color, ignoreAlpha = false) {
  if (!color) return color;

  const rgba = extractColor(color, ignoreAlpha);

  if (!rgba) return;

  return colorString(...rgba, 1);
}

/**
 * Smart color inversion.
 * @param {String|Array} color
 * @param {Number} min - minimal value for color channel
 * @param {Number} max - maximum value for color channel
 * @returns {String}
 */
export function invertColor(color, min = 0, max = 255) {
  const rgba = extractColor(color);

  return colorString(
    ...hueRotate(
      rgba.map((v, i) => {
        if (i === 3) return v;

        const inv = 255 - v;

        return Math.round((inv * (max - min)) / max + min);
      })
    )
  );
}

/**
 * Rotate color hue. It is used in dark theme generation.
 * @param {String|Array} color
 * @param {Number} angle
 * @returns {Array}
 */
export function hueRotate(color, angle = 180) {
  const rgba = typeof color === 'string' ? extractColor(color) : color;
  const hsl = rgbToHsl(...rgba);

  hsl[0] = (hsl[0] + angle / 360) % 1;

  const rotated = hslToRgb(...hsl).concat([rgba[3]]);

  return rotated;
}

/**
 * Get luminance of the color.
 * @param {String|Array} color
 * @returns {Number} - Float value from 0 to 1.
 */
export function getLuminance(color) {
  color = extractColor(color, true).map(n => n / 255);

  const [r, g, b] = color;

  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
}

/**
 * Calculate middle color.
 * @param {String|Array} clr1
 * @param {String|Array} clr2
 * @param {Number} pow - middle color distance from clr1 (0) to clr2 (1).
 * @returns {String}
 */
export function mixColors(clr1, clr2, pow = 0.5) {
  const color1 = extractColor(clr1, true);
  const color2 = extractColor(clr2, true);

  const color = color1.map((c, i) => parseInt((color2[i] - c) * pow + c));

  return colorString(color[0], color[1], color[2], 1);
}

/**
 * Calculate contrast ratio between 2 colors.
 * Uses luminance formula.
 * @param {String|Array} clr1
 * @param {String|Array} clr2
 * @returns {Number} - contrast ratio between 0 and 1.
 */
export function contastRatio(clr1, clr2) {
  return Math.abs(getLuminance(clr1) - getLuminance(clr2));
}

/**
 * Split style into 4 directions. For example padding.
 * @param {String} style
 * @returns {String[]}
 */
export function splitDimensions(style) {
  dimStyle.padding = '';
  dimStyle.padding = style;

  return dimStyle.padding
    ? [dimStyle.paddingTop, dimStyle.paddingRight, dimStyle.paddingBottom, dimStyle.paddingLeft]
    : null;
}

/**
 * Helper to open link.
 * @param {String} href
 * @param {String} target
 */
export function openLink(href, target) {
  const link = document.createElement('a');

  link.href = href;

  if (target) {
    link.target = target === true ? '_blank' : target;
  }

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export function bindActiveEvents() {
  this.addEventListener('click', evt => {
    if (evt.nuHandled) return;

    evt.nuHandled = true;

    if (!this.hasAttribute('disabled')) {
      this.nuTap();
    }
  });

  this.addEventListener('keydown', evt => {
    if (this.hasAttribute('disabled') || evt.nuHandled) return;

    evt.nuHandled = true;

    if (evt.key === 'Enter') {
      this.nuTap();
    } else if (evt.key === ' ') {
      evt.preventDefault();
      this.nuSetMod('active', true);
    }
  });

  this.addEventListener('keyup', evt => {
    if (this.hasAttribute('disabled') || evt.nuHandled) return;

    evt.nuHandled = true;

    if (evt.key === ' ') {
      evt.preventDefault();
      this.nuSetMod('active', false);
      this.nuTap();
    }
  });

  this.addEventListener('blur', evt => this.nuSetMod('active', false));

  this.addEventListener('mousedown', () => {
    this.nuSetMod('active', true);
  });

  ['mouseleave', 'mouseup'].forEach(eventName => {
    this.addEventListener(eventName, () => {
      this.nuSetMod('active', false);
    });
  });
}

/**
 * Kebab to camel case conversion.
 * @param {String str
 * @returns {string}
 */
export function toCamelCase(str) {
  return str.replace(/\-[a-z]/g, s => s.slice(1).toUpperCase());
}

/**
 * Camel to kebab case conversion.
 * @param {String} str
 * @returns {String}
 */
export function toKebabCase(str) {
  return str.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`).replace(/^\-/, '');
}

/* colors */
export function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}

export function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Dict of element`s states with their selectors.
 * @type {Object}
 */
export const STATES_MAP = {
  focus: '[nu-focus]',
  hover: ':hover',
  pressed: '[aria-pressed="true"]',
  active: '[nu-active]',
  sticky: '[nu-sticky]',
};

/**
 * Extract state values from single value.
 * Example: "blue :active[red]"
 * Example output: [{ '': 'blue' }, { 'actiive': 'red' }}]
 * @param {String} attrValue
 * @returns {Object[]}
 */
export function splitStates(attrValue) {
  const tmp = attrValue.split(/\s+\:/g);

  return tmp
    .map(val => {
      if (!val) return;

      const tmp2 = val.replace(/^\:/, '').split(/\[|\]/g);

      if (tmp2.length === 1) {
        return { $suffix: '', value: val };
      }

      const state = STATES_MAP[tmp2[0]];

      return state ? { $suffix: state, value: tmp2[1] } : null;
    })
    .filter(val => val);
}

/**
 * Calculate the style that needs to be applied based on corresponding attribute.
 * @param {String} name - Attribute name.
 * @param {String} value - Original attribute name.
 * @param {Object} attrs - Map of attribute handlers.
 * @returns {String|Object|Array}
 */
export function computeStyles(name, value, attrs) {
  if (value == null) return;

  // Style splitter for states system
  if (value.match(/\:[a-z0-9\-]+\[/)) {
    // split values between states
    const states = splitStates(value);

    const arr = states.reduce((arr, state) => {
      const styles = (computeStyles(name, state.value, attrs) || []).map(stls => {
        if (state.$suffix) {
          stls.$suffix = `${state.$suffix}${stls.suffix || ''}`;
        }

        return stls;
      });

      if (styles.length) {
        arr.push(...styles);
      }

      return arr;
    }, []);

    return arr;
  }

  const attrValue = attrs[name];

  if (!attrValue) return null;

  switch (typeof attrValue) {
    case 'string':
      return value ? [{ [attrValue]: value }] : null;
    case 'function':
      const styles = attrValue(value);

      if (!styles) return null;

      // normalize to array
      return Array.isArray(styles) ? styles : [styles];
    default:
      return null;
  }
}

/**
 * Convert single custom unit.
 * @param {String} value - Input string.
 * @param {String} unit - Unit string.
 * @param {String} multiplier - Multiplier string.
 * @returns {String}
 */
export function convertCustomUnit(value, unit, multiplier) {
  return value.replace(
    new RegExp(`[0-9\.]+${unit}`, 'gi'),
    s => `calc(${multiplier} * ${s.slice(0, -unit.length)})`
  );
}

export function excludeMod(str, mod) {
  const regexp = new RegExp(`(^|[^a-z])${mod}([^a-z]|$)`);
  if (str.match(regexp, 'i')) {
    return str.replace(regexp, s => s.replace(mod, '')).trim();
  }

  return;
}
