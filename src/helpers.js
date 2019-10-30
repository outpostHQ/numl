/**
 * Dict for all browser built-in colors.
 * It's included to support such declarations in themes.
 * Without such dict it would be impossible to declare computed color properties in themes.
 * @type {Object}
 */
export const THEME_COLOR_ATTRS_LIST = [
  'color',
  'background-color',
  'special-color',
  'border-color',
  'shadow-color',
  'heading-color',
  'hover-color',
  'special-hover-color',
  'special-contrast-color',
  'focus-color',
  'minor-color',
  'minor-background-color',
  'special-minor-color',
  'subtle-color',
];

/**
 * Required root element attribute.
 * @type {String}
 */
export const ROOT_CONTEXT = 'html';

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'];

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
  'p': 'var(--nu-theme-padding)',
};

export const COLOR_MAP = THEME_COLOR_ATTRS_LIST.reduce((map, color) => {
  if (color === 'color') {
    map['text'] = map['color'] = color;
  } else {
    map[color.replace('-color', '')] = color;
  }

  return map;
}, {});

COLOR_MAP['!'] = COLOR_MAP['background'];
COLOR_MAP['!minor'] = COLOR_MAP['minor-background'];
COLOR_MAP['!special'] = COLOR_MAP['special-contrast'];

export function colorUnit(style, initial) {
  return (color) => {
    if (color == null) return;

    color = color.trim() || initial;

    if (!COLOR_MAP[color]) return { [style]: color };

    return { [style]: `var(--nu-theme-${COLOR_MAP[color]})` };
  };
}

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
  }

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
 * @param {String} [suffix] - Query suffix for styles.
 * @param {String} [multiplier] - Multiplier option.
 * @param {String} [empty] - Default value if empty value is provided.
 * @param {Boolean|String} [property] - Duplicate style as custom property.
 * @param {Boolean} [convert] - Do unit conversion for value or not.
 * @returns {null|Object}
 */
export function unit(name, { suffix, multiplier, empty, property, convert } = {}) {
  const propertyName = !property
    ? null
    : typeof property === 'boolean'
      ? `--nu-${name}`
      : property;
  const propertyUsage = `var(${propertyName})`;

  if (suffix && property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty, multiplier) : val || empty;

      return {
        $suffix: suffix,
        [name]: propertyUsage,
        [propertyName]: val,
      };
    };
  } else if (suffix) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty, multiplier) : val || empty;

      return {
        $suffix: suffix,
        [name]: val,
      };
    };
  } else if (property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty, multiplier) : val || empty;

      return {
        [name]: propertyUsage,
        [propertyName]: val,
      };
    };
  }

  return function (val) {
    if (val == null) return null;

    if (!val && !empty) return null;

    val = convert ? convertUnit(val || empty, multiplier) : val || empty;

    return { [name]: val };
  };
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

  while ((element = element.parentNode) && !elements.includes(element)) {
  }

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
  const origElement = element;

  let prevElement = element;

  do {
    const found = [...element.querySelectorAll(selector)];

    if (found) {
      if (found.includes(prevElement) && prevElement !== origElement) {
        return prevElement;
      }

      const foundEl = found.find(el => el !== origElement);

      if (foundEl) return foundEl;
    }

    prevElement = element;
  } while (element = element.parentNode);
}

/**
 * Return a closest element that has provided id.
 * @param {Element} element
 * @param {String} id
 * @returns {undefined|Element}
 */
export function invertQueryById(element, id) {
  return invertQuery(element, `[id^="${id}--"], [id="${id}"]`);
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

const ID_MAP = {};

/**
 * Return current id of the element and generate it if it's no presented.
 * @param {Element} el
 * @returns {String}
 */
export function generateId(element) {
  let name = element.id;

  if (name && name.includes('--')) return name;

  name = name || 'nu';

  if (name !== 'nu') {
    element.setAttribute('nu-id', name);
  }

  if (!ID_MAP[name]) {
    ID_MAP[name] = 0;
  }

  const id = (ID_MAP[name] += 1);

  element.id = `${name}--${id}`;

  return element.id;
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
  dimStyle.color = (window.HTML_COLORS && window.HTML_COLORS[color.toLowerCase()]) || color;

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
export function contrastRatio(clr1, clr2) {
  return Math.abs(getLuminance(clr1) - getLuminance(clr2));
}

/**
 * Split style into 4 directions. For example padding.
 * @param {String} style
 * @returns {String[]}
 */
export function splitDimensions(style) {
  const split = splitStyleValue(style);

  return [
    split[0],
    split[1] || split[0],
    split[2] || split[0],
    split[3] || split[1] || split[0],
  ];
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
  pressed: '[nu-pressed]',
  disabled: '[disabled]',
  active: '[nu-active]',
  sticky: '[nu-sticky]',
  even: ':nth-child(even)',
  odd: ':nth-child(odd)',
};

/**
 * Extract state values from single value.
 * Example: "blue :active[red]"
 * Example output: [{ '': 'blue' }, { 'active': 'red' }}]
 * @param {String} attrValue
 * @returns {Object[]}
 */
export function splitStates(attrValue) {
  const tmp = attrValue.replace(/\^:/g, '#--parent--:').split(/[\s^]+(?=[\:#])/g);

  let id;

  let stateMaps = tmp
    .map(val => {
      if (!val) return;

      /**
       * If true then val applies on element state.
       * If false then val applies on parent state.
       * @type {Boolean}
       */
      const idMatch = val.match(/^#([a-z\-]+)/);

      if (idMatch && idMatch[1] && id && idMatch[1] !== id) {
        return warn('too complex state (skipped):', `"${attrValue}"`);
      }

      id = idMatch ? idMatch[1] : null;

      const tmp2 = val.replace(/.*?\:/, '').split(/\[|\]/g);

      if (tmp2.length === 1) {
        return {
          states: [],
          parentStates: [],
          notStates: [],
          parentNotStates: [],
          value: val
        };
      }

      const states = tmp2[0].split(':');

      if (devMode) {
        const notFound = states.find(s => !STATES_MAP[s]);

        if (notFound) {
          warn('state not found:', notFound);
        }
      }

      return {
        states: !id ? states : [],
        parentStates: id ? states : [],
        notStates: [],
        parentNotStates: [],
        value: tmp2[1].trim(),
      };
    })
    .filter(val => val);

  for (let i = 0; i < stateMaps.length; i++) {
    for (let j = i + 1; j < stateMaps.length; j++) {
      const map1 = stateMaps[i];
      const map2 = stateMaps[j];

      [['states', 'notStates'], ['parentStates', 'parentNotStates']].forEach(([sKey, nKey]) => {
        const diffStates1 = map2[sKey].filter(s => !map1[sKey].includes(s));
        const diffStates2 = map1[sKey].filter(s => !map2[sKey].includes(s));

        map1[nKey].push(...diffStates1);
        map2[nKey].push(...diffStates2);
      });
    }
  }

  const isParent = (id === '--parent--');

  return stateMaps.map(stateMap => {
    return {
      $prefix: id && (stateMap.parentStates.length || stateMap.parentNotStates.length)
        ? (isParent ? '[nu]' : `[nu-id="${id}"]`)
        + stateMap.parentStates.map(s => STATES_MAP[s]).join('')
        + stateMap.parentNotStates.map(s => `:not(${STATES_MAP[s]})`).join('')
        + (isParent ? '>' : '')
        : null,
      $suffix: stateMap.states.map(s => STATES_MAP[s]).join('')
        + stateMap.notStates.map(s => `:not(${STATES_MAP[s]})`).join(''),
      value: stateMap.value,
    };
  });
}

/**
 * Calculate the style that needs to be applied based on corresponding attribute.
 * @param {String} name - Attribute name.
 * @param {String} value - Original attribute name.
 * @param {Object} attrs - Map of attribute handlers.
 * @returns {String|Object|Array}
 */
export function computeStyles(name, value, attrs, defaults) {
  if (value == null) return;

  // Style splitter for states system
  if (value.match(/[\:\#\^][a-z0-9\-\:]+\[/)) {
    // split values between states
    const states = splitStates(value);

    const arr = states.reduce((arr, state) => {
      const styles = (computeStyles(name, state.value, attrs, defaults) || []).map(stls => {
        /**
         * @TODO: review that function
         */
        if (state.$suffix) {
          stls.$suffix = `${state.$suffix}${stls.$suffix || ''}`;
        }

        if (state.$prefix) {
          stls.$prefix = `${stls.$prefix || ''}${state.$prefix}`;
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
      const styles = attrValue(value, defaults);

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
    new RegExp(`[0-9\.]+${unit}(?![a-z])`, 'gi'),
    s => `calc(${multiplier} * ${s.slice(0, -unit.length)})`
  );
}

export function hasMod(str, mod) {
  const regexp = new RegExp(`(^|[^a-z\-])${mod}([^a-z\-]|$)`);

  return str.match(regexp, 'i');
}

export function excludeMod(str, mod) {
  const regexp = new RegExp(`(^|[^a-z\-])${mod}([^a-z\-]|$)`);

  if (str.match(regexp, 'i')) {
    return str.replace(regexp, s => s.replace(mod, '')).trim();
  }

  return;
}

export function parseAllValues(value) {
  return value
    ? value.split('|').reduce((arr, value) => {
      splitStates(value).forEach(state => arr.push(state.value));

      return arr;
    }, [])
    : [];
}

export function svgElement(svgText) {
  dim.innerHTML = svgText;

  const svgNode = dim.childNodes[0];

  dim.removeChild(svgNode);

  return svgNode;
}

export function arrayDiff(arrA, arrB) {
  return arrA
    .filter(x => !arrB.includes(x))
    .concat(arrB.filter(x => !arrA.includes(x)));
}

const TASKS = [];
const TASK_EVENT = 'nude:task';

export function setImmediate(callback) {
  TASKS.push(callback);

  window.postMessage(TASK_EVENT, '*');
}

window.addEventListener('message', function (event) {
  if (event.data !== TASK_EVENT) return;

  for (let task of TASKS) {
    task();
  }

  TASKS.splice(0);
});

export function extractMods(val, modList) {
  const arr = val.split(/\s+/g);
  const mods = [];

  const value = arr.filter(mod => {
    if (modList.includes(mod)) {
      mods.push(mod);

      return false;
    }

    return true;
  }).join(' ');

  return { value, mods };
}

export function stripCalc(val) {
  val = val.trim();

  val = val.startsWith('calc(') ? val.slice(5, -1) : val;

  return val.replace(/calc\(([^)]+)\)/g, (s, s1) => s1);
}

export function splitStyleValue(val) {
  return val.split(/\s+(?![^(.]+\))/);
}

export function fixPosition(element) {
  element.style.removeProperty('--nu-transform');

  const { x, width } = element.getBoundingClientRect();
  const maxW = window.innerWidth;

  if (x + width > maxW) {
    const offset = -parseInt(x + width - maxW + 1);

    element.style.setProperty('--nu-transform', `translate(${offset}px, 0)`);

    if (!element.hasAttribute('transform')) {
      element.setAttribute('transform', '');
    }
  } else if (x < 0) {
    const offset = -x;

    element.style.setProperty('--nu-transform', `translate(${offset}px, 0)`);

    if (!element.hasAttribute('transform')) {
      element.setAttribute('transform', '');
    }
  }
}
