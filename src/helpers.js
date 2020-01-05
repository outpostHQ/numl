/**
 * Required root element attribute.
 * @type {String}
 */
import { strToHsl } from './color';

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
  'r': 'var(--nu-border-radius)',
  'b': 'var(--nu-border-width)',
  'x': 'var(--nu-indent)',
  'fs': 'var(--nu-font-size)',
  'lh': 'var(--nu-line-height)',
};

export function colorUnit(style, initial) {
  return (color, raw = false) => {
    if (color == null) return;

    if (color.trim() && color.trim() !== 'text' && strToHsl(color)) {
      if (raw) return color;

      return { [style]: color };
    }

    if (!color) color = initial;

    if (color === 'clear') {
      color = 'transparent';
    }

    const match = color.match(/\s(\d+)%/);

    let percent;

    if (match) {
      color = color.replace((/\s\d+%/), '');
      percent = match[1];
    }

    if (percent != null) {
      if (raw) return `rgba(var(--nu-${color}-color-rgb, ${color}) ${percent / 100})`;

      return { [style]: `rgba(var(--nu-${color}-color-rgb, ${color}), ${percent / 100})` };
    }

    if (raw) return `var(--nu-${color}-color, ${color})`;

    return { [style]: `var(--nu-${color}-color, ${color})` };
  };
}

/**
 * Unit conversion for attribute values.
 * @param {String} unit - String for conversion.
 * @returns {string|*}
 */
export function convertUnit(unit) {
  if (!unit) return unit;

  return parseAttr(unit).values.join(' ');
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
export function unit(name, { suffix, empty, property, convert } = {}) {
  const propertyName = !property
    ? null
    : typeof property === 'boolean'
      ? `--nu-local-${name}`
      : property;
  const propertyUsage = `var(${propertyName})`;

  if (suffix && property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty) : val || empty;

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

      val = convert ? convertUnit(val || empty) : val || empty;

      return {
        $suffix: suffix,
        [name]: val,
      };
    };
  } else if (property) {
    return function (val) {
      if (val == null) return null;

      if (!val && !empty) return null;

      val = convert ? convertUnit(val || empty) : val || empty;

      return {
        [name]: propertyUsage,
        [propertyName]: val,
      };
    };
  }

  return function (val) {
    if (val == null) return null;

    if (!val && !empty) return null;

    val = convert ? convertUnit(val || empty) : val || empty;

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
      this.nuTap(evt);
    }
  });

  this.addEventListener('keydown', evt => {
    if (this.hasAttribute('disabled') || evt.nuHandled) return;

    evt.nuHandled = true;

    if (evt.key === 'Enter') {
      this.nuTap(evt);
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
      this.nuTap(evt);
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
 * @param {String} str
 * @returns {String}
 */
export function toCamelCase(str) {
  return str.replace(/-[a-z]/g, s => s.slice(1).toUpperCase());
}

/**
 * Camel to kebab case conversion.
 * @param {String} str
 * @returns {String}
 */
export function toKebabCase(str) {
  return str.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`).replace(/^\-/, '');
}

/**
 * Dict of element`s states with their selectors.
 * @type {Object}
 */
export const STATES_MAP = {
  focus: '[nu-focus]',
  hover: ':hover',
  themed: '[theme]',
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
      const idMatch = val.match(/^#([a-z\d-]+)/);

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
 * @param {String} value - Original attribute value.
 * @param {Object} attrs - Map of attribute handlers.
 * @param {Object} defaults - Default values of attributes. (see static getter nuDefaults)
 * @returns {String|Object|Array}
 */
export function computeStyles(name, value, attrs, defaults) {
  if (value == null) return;

  if (name !== 'before' && name !== 'after') {
    value = value.trim();
  }

  // Style splitter for states system
  if (value.match(/[:#^][a-z\d:-]+\[/)) {
    // split values between states
    const states = splitStates(value);

    return states.reduce((arr, state) => {
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

  return !!str.match(regexp, 'i');
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

export function intersection(arr1, arr2) {
  return arr1.filter(i => arr2.includes(i));
}

export function isVariableAttr(value) {
  if (!value) return false;

  return value.includes('@');
}

export function isResponsiveAttr(value) {
  if (!value) return false;

  return value.includes('|');
}

const ATTR_REGEXP = /([a-z]+\()|(--[a-z-]+)|([a-z-]{2,})|(([0-9]+(?![0-9.])|[0-9.]{2,}|[0-9-]{2,}|[0-9.-]{3,})([a-z%]{0,3}))|([*\/+-])|([()])|(,)/g;

const ATTR_CACHE = new Map;
const MAX_CACHE = 10000;

function prepareNuVar(name) {
  const isNu = name.startsWith('--nu-');

  if (!isNu) {
    const nuName = name.replace('--', '--nu-');

    return `var(${nuName}, var(${name}))`;
  } else {
    return `var(${name})`;
  }
}

const IGNORE_MODS = ['auto', 'max-content', 'min-content', 'none', 'subgrid'];

/**
 *
 * @param {String} value
 * @returns {Object<String,String|Array>}
 */
export function parseAttr(value) {
  if (!ATTR_CACHE.has(value)) {
    if (ATTR_CACHE.size > MAX_CACHE) {
      ATTR_CACHE.clear();
    }

    const mods = [];

    let currentValue = '';
    let calc = -1;
    let values = [];
    let counter = 0;

    value.replace(
      ATTR_REGEXP,
      (s, func, prop, mod, unit, unitVal, unitMetric, operator, bracket, comma) => {
        if (func) {
          currentValue += func;
          counter++;
        } else if (mod) {
          // ignore mods inside brackets
          if (counter || IGNORE_MODS.includes(mod)) {
            currentValue += `${mod} `;
          } else {
            mods.push(mod);
          }
        } else if (bracket) {
          if (bracket === '(') {
            if (!~calc) {
              calc = counter;
              currentValue += 'calc';
            }

            counter++;
          }

          if (bracket === ')' && counter) {
            currentValue = currentValue.trim();

            if (counter > 0) {
              counter--;
            }

            if (counter === calc) {
              calc = -1;
            }
          }

          currentValue += `${bracket}${bracket === ')' ? ' ' : ''}`;
        } else if (operator) {
          if (!~calc) {
            if (currentValue) {
               if (currentValue.includes('(')) {
                 const index = currentValue.lastIndexOf('(');

                 currentValue = `${currentValue.slice(0, index)}(calc(${currentValue.slice(index + 1)}`;
                 calc = counter;
                 counter++;
               }
            } else {
              let tmp = values.splice(values.length - 1, 1)[0];

              if (tmp) {
                if (tmp.startsWith('calc(')) {
                  tmp = tmp.slice(4);
                }

                calc = counter;
                counter++;
                currentValue = `calc(${tmp} `;
              }
            }
          }

          currentValue += `${operator} `;
        } else if (unit) {
          if (unitMetric && CUSTOM_UNITS[unitMetric]) {
            if (unitVal === '1') {
              currentValue += `${CUSTOM_UNITS[unitMetric]} `;
            } else {
              if (!~calc) {
                currentValue += 'calc';
              }

              currentValue += `(${unitVal} * ${CUSTOM_UNITS[unitMetric]}) `;
            }
          } else if (!unitMetric && !counter) {
            currentValue += `${unit}rem `;
          } else {
            currentValue += `${unit} `;
          }
        } else if (prop) {
          currentValue += `${prepareNuVar(prop)} `;
        } else if (comma) {
          if (~calc) {
            calc = -1;
            counter--;
            currentValue = `${currentValue.trim()}), `;
          } else {
            currentValue = `${currentValue.trim()}, `;
          }
        }

        if (currentValue && !counter) {
          values.push(currentValue.trim());
          currentValue = '';
        }
      },
    );

    if (counter) {
      values.push(`${currentValue.trim()}${')'.repeat(counter)}`);
    }

    ATTR_CACHE.set(value, { values, mods });
  }

  return ATTR_CACHE.get(value);
}

export function filterMods(mods, allowedMods) {
  return mods.filter(mod => allowedMods.includes(mod));
}

window.parseAttr = parseAttr;
