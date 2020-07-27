/**
 * Required root element attribute.
 * @type {String}
 */
export const ROOT_CONTEXT = ':root';

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'];

export const isTouch = matchMedia('(pointer: coarse)').matches;

const USE_SHADOW = document.querySelector(':root').dataset.nuShadow != null;

/**
 * Custom units dict
 * @type {Object}
 */
export const CUSTOM_UNITS = {
  'r': 'var(--nu-radius)',
  'bw': 'var(--nu-border-width)',
  'ow': 'var(--nu-outline-width)',
  'x': 'var(--nu-gap)',
  'fs': 'var(--nu-font-size)',
  'lh': 'var(--nu-line-height)',
  'rp': 'var(--nu-rem-pixel)',
  // global setting
  'wh': 'var(--nu-window-height)',
};

/**
 * Unit conversion for attribute values.
 * @param {String} unit - String for conversion.
 * @returns {string|*}
 */
export function convertUnit(unit) {
  if (!unit) return unit;

  return parseAttr(unit, 1).value;
}

export function gridUnit(name) {
  const converter = unit(name, { convert: true });

  return (val) => {
    val = val.replace(/[\d]+pr/g, (s) => `minmax(0, ${s.replace('pr', 'fr')})`);

    return converter(val);
  };
}

/**
 * Returns simple unit handler for the attribute.
 * @param {String} name - Attribute name.
 * @param {String} [suffix] - Query suffix for styles.
 * @param {String} [multiplier] - Multiplier option.
 * @param {String} [empty] - Default value if empty value is provided.
 * @param {Boolean|String} [property] - Duplicate style as custom property.
 * @param {Boolean} [convert] - Do unit conversion for value or not.
 * @returns {null|Function}
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

const DEFAULT_MIN_SIZE = 'var(--nu-gap)';
const DEFAULT_MAX_SIZE = '100%';

/**
 * Returns unit handler for dimensional attributes.
 * @param {String} name - Attribute name.
 * @param {String} $suffix - Query suffix for styles.
 * @returns {null|Object}
 */
export function sizeUnit(name, $suffix) {
  const minStyle = `min-${name}`;
  const maxStyle = `max-${name}`;

  return val => {
    const styles = {
      [name]: 'auto',
      [minStyle]: 'auto',
      [maxStyle]: 'initial',
    };

    val.split(',').forEach(value => {
      const { mods, values } = parseAttr(value, 1);

      let flag = false;

      for (let mod of mods) {
        switch (mod) {
          case 'min':
            styles[minStyle] = values[0] || DEFAULT_MIN_SIZE;
            flag = true;
            break;
          case 'max':
            styles[maxStyle] = values[0] || DEFAULT_MAX_SIZE;
            flag = true;
            break;
        }
      }

      if (!flag || !mods.length) {
        if (values.length === 2) {
          styles[minStyle] = values[0];
          styles[maxStyle] = values[1];
        } else if (values.length === 3) {
          styles[minStyle] = values[0];
          styles[name] = values[1];
          styles[maxStyle] = values[2];
        } else {
          styles[name] = values[0] || 'auto';
        }
      }
    });

    return styles;
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
export function query(element, selector) {
  const origElement = element;

  let prevElement = element;

  const closest = element.closest(selector);

  do {
    if (origElement !== element && closest === element) {
      return closest;
    }

    const found = [...element.querySelectorAll(selector)];

    if (found) {
      if (found.includes(prevElement) && prevElement !== origElement) {
        return prevElement;
      }

      const foundEl = found.find(el => el !== origElement);

      if (foundEl) return foundEl;
    }

    prevElement = element;

    element = element.parentNode || element.host
  } while (element);
}

/**
 * Return a closest element that has provided id.
 * @param {Element} element
 * @param {String} id
 * @param {Boolean} [includeNames]
 * @returns {undefined|Element}
 */
export function queryById(element, id, includeNames) {
  if (id === ':prev') {
    return element.previousElementSibling;
  } else if (id === ':next') {
    return element.nextElementSibling;
  }

  return query(element, `[nu-id="${id}"], [id="${id}"]${includeNames && !id.includes('-') ? `, [nu-${id}]` : ''}`);
}

/**
 * Tell if library run in dev mode.
 * @type {Boolean}
 */
export const devMode = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

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

    return new Error([...args].join(' '));
  }
}

const ID_MAP = {};

/**
 * Return current id of the element and generate it if it's no presented.
 * @param {Element} element
 * @returns {String}
 */
export function generateId(element) {
  if (element.nuIdGenerated) return element.id;

  element.nuIdGenerated = true;

  let name = element.id;

  name = name || element.constructor.nuTag.replace('nu-', '');

  if (name !== 'nu') {
    element.setAttribute('nu-id', name);
  }

  if (!ID_MAP[name]) {
    ID_MAP[name] = 0;
  }

  const id = (ID_MAP[name] += 1);

  element.id = id === 1 && name !== 'nu' ? `${name}` : `${name}--${id}`;

  return element.id;
}

const dim = h('div');

/**
 * Helper to open link.
 * @param {String} href
 * @param {String} target
 */
export function openLink(href, target) {
  const link = h('a');

  link.href = href;

  if (target) {
    link.target = target === true ? '_blank' : target;
  }

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
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
  hover: ':hover',
  'focus-within': ':focus-within',
  themed: '[theme]',
  special: '[special]',
  clear: '[clear]',
  disabled: '[disabled]',
  inline: '[inline]',
  even: ':nth-child(even)',
  odd: ':nth-child(odd)',
  autofill: ':-webkit-autofill',
  checked: '[is-pressed]',
  selected: '[is-pressed]',
  dev: '[data-nu-dev]',
};

function getStateSelector(name) {
  if (name.startsWith('role-')) {
    return `[role="${name.slice(5)}"]`;
  }

  return STATES_MAP[name] || `[is-${name}]`;
}

export function getCombinations(array) {
  let result = [];
  let f = function (prefix = [], array) {
    for (let i = 0; i < array.length; i++) {
      result.push([...prefix, array[i]]);
      f([...prefix, array[i]], array.slice(i + 1));
    }
  }

  f('', array);

  return result;
}

const CONTEXT_START_MAP = {
  'parent': '[nu]',
  'any': '[nu]',
  'root': ':root',
  'host': USE_SHADOW ? ':host(' : '[is-host]',
};
const CONTEXT_END_MAP = {
  'parent': '>',
  'any': '',
  'root': '',
  'host': USE_SHADOW ? ')' : '',
};

/**
 * Extract state values from single value.
 * Example: color="blue :active[red]"
 * Example output: [{ value: 'blue' }, { $suffix: '[is-active]', value: 'red' }}]
 * @param {String} attrValue
 * @returns {Object[]}
 */
export function splitStates(attrValue) {
  const zone = parseAttrStates(attrValue)[0];
  let context = zone.context;
  let contextStart, contextEnd;

  if (context) {
    contextStart = CONTEXT_START_MAP[context] || (context.startsWith('#') ? `[nu-id="${context.replace('#', '')}"]` : `[nu-${context}]`);
    contextEnd = CONTEXT_END_MAP[context] || '';
  }

  let baseValue;

  let stateMaps = Object.entries(zone.states)
    .map(([state, value]) => {
      if (!state) {
        baseValue = value;
      }

      if (isTouch && state.match(/hover(?=($|:))/)) return;

      return {
        states: !state ? [] : state.split(':'),
        notStates: [],
        value,
      };
    }).filter(m => m);

  // create mutually exclusive selectors
  for (let i = 0; i < stateMaps.length; i++) {
    for (let j = i + 1; j < stateMaps.length; j++) {
      if (i === j) continue;

      const map1 = stateMaps[i];
      const map2 = stateMaps[j];

      const diffStates1 = map2.states.filter(s => !map1.states.includes(s));
      const diffStates2 = map1.states.filter(s => !map2.states.includes(s));

      map1.notStates.push(...diffStates1);
      map2.notStates.push(...diffStates2);

      map1.notStates = Array.from(new Set(map1.notStates));
      map2.notStates = Array.from(new Set(map2.notStates));
    }
  }

  // add missing states to fulfill their values
  const allStatesSet = new Set;

  stateMaps.forEach(map => map.states.forEach(state => allStatesSet.add(state)));

  const allStates = Array.from(allStatesSet);

  const allCombinations = getCombinations(allStates).concat([]);

  allCombinations.forEach(states => {
    const notStates = allStates.filter(state => !states.includes(state));

    const similarMap = stateMaps.find((otherMap, j) => {
      return JSON.stringify(otherMap.states.sort()) === JSON.stringify(states.sort())
        && JSON.stringify(otherMap.notStates.sort()) === JSON.stringify(notStates.sort());
    });

    if (similarMap) return;

    stateMaps.push({
      states: [...states],
      notStates: [...notStates],
      value: baseValue,
    });
  });

  stateMaps = stateMaps.map(stateMap => {
    let $prefix, $suffix, $states, value = stateMap.value;

    $states = stateMap.states.map(s => getStateSelector(s)).join('')
      + stateMap.notStates.map(s => `:not(${getStateSelector(s)})`).join('');

    if (context && (stateMap.states.length || stateMap.notStates.length)) {
      $prefix = `${contextStart}${$states}${contextEnd}`;
    } else {
      $suffix = $states;
    }

    return {
      $prefix,
      $suffix,
      value,
    };
  });

  return stateMaps;
}

/**
 * Calculate the style that needs to be applied based on corresponding attribute.
 * @param {String} name - Attribute name.
 * @param {String} value - Original attribute value.
 * @param {Object} attrs - Map of attribute handlers.
 * @param {Object} defaults - Default values of attributes. (see static getter nuStyles)
 * @returns {String|Object|Array}
 */
export function computeStyles(name, value, attrs, defaults) {
  if (value == null) return;

  const isProp = name.startsWith('--');

  if (name !== 'before' && name !== 'after') {
    value = value.trim();
  }

  // Style splitter for states system
  if (value.match(/^\^/) || value.includes(':')) {
    // split values between states
    const states = splitStates(value);

    const allStyles = states.reduce((arr, state) => {
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

    return allStyles;
  }

  const attrValue = isProp ? (val) => {
    return [{
      [name.replace('--', '--nu-')]: parseAttr(val).value,
    }];
  } : attrs[name];

  if (!attrValue) return null;

  switch (typeof attrValue) {
    case 'string':
      return [{ [attrValue]: value ? parseAttr(value, 2).value : 'initial' }];
    case 'function':
      const styles = attrValue(value, defaults);

      if (!styles) return null;

      // normalize to array and clone incoming styles
      return (Array.isArray(styles) ? styles : [styles]).map(stls => { return { ...stls }; });
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

export function parseAllValues(value) {
  const zones = parseAttrStates(value);

  return zones
    .reduce((list, zone) => {
      Object.values(zone.states).forEach(val => {
        if (!list.includes(val)) {
          list.push(val);
        }
      });

      return list;
    }, []);
}

export function svgElement(svgText) {
  dim.innerHTML = svgText;

  const svgNode = dim.querySelector('svg');

  if (svgNode) {
    dim.removeChild(svgNode);

    return svgNode;
  }
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

export function extractStyleFuncs(val) {
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

const ATTR_REGEXP = /('[^'|]*')|([a-z]+\()|(#[a-z0-9.-]{2,}(?![a-f0-9\[-]))|(--[a-z0-9-]+)|([a-z][a-z0-9-]*)|(([0-9]+(?![0-9.])|[0-9.]{2,}|[0-9-]{2,}|[0-9.-]{3,})([a-z%]{0,3}))|([*\/+-])|([()])|(,)/ig;

const ATTR_CACHE = new Map;
const ATTR_CACHE_AUTOCALC = new Map;
const ATTR_CACHE_REM = new Map;
const ATTR_CACHE_IGNORE_COLOR = new Map;
const MAX_CACHE = 10000;
const ATTR_CACHE_MODE_MAP = [
  ATTR_CACHE_AUTOCALC,
  ATTR_CACHE_REM,
  ATTR_CACHE,
  ATTR_CACHE_IGNORE_COLOR,
];

function prepareNuVar(name) {
  const isNu = name.startsWith('--nu-');

  if (!isNu) {
    const nuName = name.replace('--', '--nu-');

    return `var(${nuName}, var(${name}))`;
  } else {
    return `var(${name})`;
  }
}

const IGNORE_MODS = ['auto', 'max-content', 'min-content', 'none', 'subgrid', 'initial'];
const PREPARE_REGEXP = /calc\((\d*)\)/ig;
const CUSTOM_PROPS_REGEX = /(^|var\(|)--([a-z0-9-]+)/ig;
const COLOR_FUNCS = ['rgb', 'rgba', 'hsl', 'hsla'];

export const CUSTOM_FUNCS = {};

let CUSTOM_FUNCS_REGEX;

export function convertCustomProperties(val) {
  return val.replace(CUSTOM_PROPS_REGEX, (s, s1, s2) => s1 === 'var(' ? s : `${s1}var(--nu-${s2}, var(--${s2}))`);
}

export function convertCustomFuncs(str, options) {
  if (!CUSTOM_FUNCS_REGEX) {
    CUSTOM_FUNCS_REGEX = new RegExp(`(^|[\\s])(${Object.keys(CUSTOM_FUNCS).join('|')})\\(([^)]+)\\)`, 'g');
  }

  return str.replace(CUSTOM_FUNCS_REGEX, (s, s1, s2, s3) => `${s1}${CUSTOM_FUNCS[s2](s3, options)}`);
}

function prepareParsedValue(val) {
  return val.trim().replace(PREPARE_REGEXP, (s, inner) => inner);
}

/**
 *
 * @param {String} value
 * @param {Integer} mode
 * @returns {Object<String,String|Array>}
 */
export function parseAttr(value, mode = 0) {
  const CACHE = ATTR_CACHE_MODE_MAP[mode];

  if (!CACHE.has(value)) {
    if (CACHE.size > MAX_CACHE) {
      CACHE.clear();
    }

    const mods = [];
    const all = [];
    const values = [];
    const insertRem = mode === 1;
    const autoCalc = mode !== 2;

    let currentValue = '';
    let calc = -1;
    let counter = 0;
    let parsedValue = '';
    let color = '';
    let currentFunc = '';
    let usedFunc = '';
    let token;

    ATTR_REGEXP.lastIndex = 0;

    value = convertCustomFuncs(value, { explicitColor: true });

    while (token = ATTR_REGEXP.exec(value)) {
      let [s, quoted, func, hashColor, prop, mod, unit, unitVal, unitMetric, operator, bracket, comma] = token;

      if (quoted) {
        currentValue += `${quoted} `;
      } else if (func) {
        currentFunc = func.slice(0, -1);
        currentValue += func;
        counter++;
      } else if (hashColor) {
        // currentValue += `${hashColor} `;
        if (mode === 3) {
          color = hashColor;
        } else {
          color = parseColor(hashColor, false, true).color;
        }
      } else if (mod) {
        // ignore mods inside brackets
        if (counter || IGNORE_MODS.includes(mod)) {
          currentValue += `${mod} `;
        } else {
          mods.push(mod);
          all.push(mod);
          parsedValue += `${mod} `;
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

        if (bracket === ')' && !counter) {
          usedFunc = currentFunc;
          currentFunc = '';
        }

        currentValue += `${bracket}${bracket === ')' ? ' ' : ''}`;
      } else if (operator) {
        if (!~calc && autoCalc) {
          if (currentValue) {
            if (currentValue.includes('(')) {
              const index = currentValue.lastIndexOf('(');

              currentValue = `${currentValue.slice(0, index)}(calc(${currentValue.slice(index + 1)}`;

              calc = counter;
              counter++;
            }
          } else if (values.length) {
            parsedValue = parsedValue.slice(0, parsedValue.length - values[values.length - 1].length - 1);

            let tmp = values.splice(values.length - 1, 1)[0];

            all.splice(values.length - 1, 1);

            if (tmp) {
              if (tmp.startsWith('calc(')) {
                tmp = tmp.slice(4);
              }

              calc = counter;
              counter++;
              currentValue = `calc((${tmp}) `;
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
        } else if (insertRem && !unitMetric && !counter) {
          currentValue += `${unit}rem `;
        } else {
          currentValue += `${unit} `;
        }
      } else if (prop) {
        if (currentFunc !== 'var') {
          currentValue += `${prepareNuVar(prop)} `;
        } else {
          currentValue += `${prop} `;
        }
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
        let prepared = prepareParsedValue(currentValue);

        if (COLOR_FUNCS.includes(usedFunc)) {
          color = prepared;
        } else if (prepared.startsWith('color(')) {
          prepared = prepared.slice(6, -1);

          color = parseColor(prepared).color;
        } else {
          if (prepared !== ',') {
            values.push(prepared);
            all.push(prepared);
          }

          parsedValue += `${prepared} `;
        }

        currentValue = '';
      }
    }

    if (counter) {
      let prepared = prepareParsedValue(`${currentValue.trim()}${')'.repeat(counter)}`);

      if (prepared.startsWith('color(')) {
        prepared = prepared.slice(6, -1);

        color = parseColor(prepared).color;
      } else {
        if (prepared !== ',') {
          values.push(prepared);
          all.push(prepared);
        }

        parsedValue += prepared;
      }
    }

    CACHE.set(value, {
      values,
      mods,
      all,
      value: `${parsedValue} ${color}`.trim(),
      color,
    });
  }

  return CACHE.get(value);
}

export function filterMods(mods, allowedMods) {
  return mods.filter(mod => allowedMods.includes(mod));
}

// const STATE_TYPE_REGEXP = /\[[^\]]*\|/;
const STATE_REGEXP = /(\|)|(\[)|(])|(\^((#|)[a-z][a-z0-9-]*|))|:([a-z0-9:\.-]+)(?=\[)|('[^']*'|[(#a-z0-9,.-][^'\]\[|:]*(?!:))/gi;

function requireZone(zones, index, parent = '') {
  while (zones[index] == null) {
    const prevZone = zones[index - 1];

    if (prevZone && !zones[index - 1].touched) {
      const prevPrevZone = zones[index - 2];

      if (prevPrevZone) {
        zones[index - 1] = prevPrevZone;
      }
    }

    zones.push({
      parent,
      states: {
        '': '', // base state is always presented
      },
      touched: false,
    });
  }

  return zones[index];
}

/**
 * Parse state information from raw attribute value.
 * @param val
 * @returns {[]}
 */
export function parseAttrStates(val) {
  let currentState = '';
  let zones = [];
  let zoneIndex = 0;
  let stateZoneIndex = 0;
  let opened = false;
  let responsiveState = false;
  let zone;
  let currentContext;
  let token;
  let orOperator = false;

  STATE_REGEXP.lastIndex = 0;

  function requireState() {
    if (!zone.states[currentState]) {
      zone.states[currentState] = '';
    }
  }

  while (token = STATE_REGEXP.exec(val)) {
    let [s, delimiter, open, close, rawContext, context, hash, state, value] = token;

    zone = requireZone(zones, zoneIndex);
    currentContext = zone.context;

    if (opened) {
      if (responsiveState) {
        zone = requireZone(zones, stateZoneIndex, currentContext);
      } else {
        zone = requireZone(zones, zoneIndex, currentContext);
      }
    }

    if (rawContext) {
      zone.context = context || 'parent';
      zone.rawContext = rawContext;
      zone.touched = true;
    } else if (delimiter) {
      if (opened) {
        if (zoneIndex) {
          warn('incorrect state', JSON.stringify(val));
        }

        responsiveState = true;
        stateZoneIndex++;
      } else {
        zoneIndex++;
      }
    } else if (open) {
      opened = true;

      requireState();
    } else if (close) {
      opened = false;

      currentState = '';
      stateZoneIndex = 0;

      requireState();
    } else if (state) {
      currentState = state;

      if (state.includes('.')) {
        orOperator = true;
      }

      requireState();
    } else if (value) {
      if (zone.states[currentState]) {
        zone.states[currentState] = `${zone.states[currentState]}${value}`.trim();
      } else {
        zone.states[currentState] = value.trim();
      }
      zone.touched = true;
    }
  }

  if (orOperator) {
    zones.forEach((zone) => {
      Object.entries(zone.states)
        .forEach(([state, value]) => {
          if (!state.includes('.')) return;

          const combinations = getCombinations(state.split('.'));

          combinations.forEach((comb) => {
            const state = comb.join(':');

            if (zone.states[state] == null) {
              zone.states[state] = value;
            }
          });

          delete zone.states[state];
        });
    });
  }

  // restore responsive values
  // zones.forEach((zone, zoneIndex) => {
  //   if (!zoneIndex) return;
  //
  //   Object.entries(zone.states).forEach(([state, value]) => {
  //     const prevZone = zones[zoneIndex - 1];
  //
  //     if (!value && prevZone && prevZone.states[state] != null) {
  //       zone.states[state] = prevZone.states[state];
  //     }
  //   });
  // });

  return zones;
}

export function normalizeAttrStates(val, firstValueOnly = false) {
  let zones = Array.isArray(val) ? val : parseAttrStates(val);

  if (firstValueOnly) {
    zones = zones.slice(0, 1);
  }

  return zones.map((zone, zoneIndex) => {
    return `${zone.rawContext || ''} ${
      Object.entries(zone.states).map(([state, value]) => {
        if (state) {
          value = `:${state}[${value}]`;
        } else if (!value && zoneIndex) {
          value = zones[zoneIndex - 1].states[''];
        }

        return value;
      }).join(' ')
    }`.trim();
  }).join('|');
}

export function numberFromString(num) {
  if (typeof num === 'number') return num;

  if (typeof num !== 'string') return null;

  let value = Number(num);

  if (value !== value) return null;

  return value;
}

export function getIntFromAttr(value, defaultValue = 0) {
  let num = parseInt(value);

  if (num == null || num !== num) num = defaultValue;

  return num;
}

export function getFloatFromAttr(value, defaultValue = 0) {
  let num = parseFloat(value);

  if (num == null || num !== num) num = defaultValue;

  return num;
}

export function setAttrs(el, attrs) {
  Object.entries(attrs).forEach(([name, value]) => {
    setAttr(el, name, value);
  });
}

export function setBoolAttr(el, name, val) {
  if (val != null && val !== false) {
    el.setAttribute(name, '');
  } else {
    el.removeAttribute(name);
  }
}

export function setAttr(el, name, value) {
  if (value != null && value !== false) {
    el.setAttribute(name, value === true ? '' : value);
  } else {
    el.removeAttribute(name);
  }
}

const COLOR_NAME_LIST = [
  'text',
  'bg',
  'border',
  'mark',
  'outline',
  'subtle',
  'text-soft',
  'text-strong',
  'shadow',
  'special',
  'special-text',
  'special-bg',
  'special-shadow',
  'special-invert',
  'input',
  'diff', // additional
  'local', // additional
  'inherit', // inherit color from parent
  'current', // current color
];

/**
 *
 * @param {String} val
 * @param {Boolean} ignoreError
 * @param {Boolean} [shortSyntax]
 * @return {{color}|{color: string, name: *, opacity: *}|{}|{color: string, name: string, opacity: (number|number)}|{color: string, name: *}}
 */
export function parseColor(val, ignoreError = false, shortSyntax = false) {
  val = val.trim();

  if (!val) return {};

  if (shortSyntax && val.startsWith('#')) {
    val = val.slice(1);

    const tmp = val.split('.');

    let opacity = 100;

    if (tmp.length > 0) {
      opacity = Number(tmp[1]);

      if (opacity !== opacity) {
        opacity = 100;
      }
    }

    const name = tmp[0];

    let color;

    if (name === 'current') {
      color = 'currentColor';
    } else {
      if (opacity > 100) {
        opacity = 100;
      } else if (opacity < 0) {
        opacity = 0;
      }

      color = opacity !== 100
        ? `rgba(var(--nu-${name}-color-rgb), ${opacity / 100})`
        : `var(--nu-${name}-color, var(--${name}-color, #${name}))`;
    }

    return {
      color,
      name,
      opacity: opacity != null ? opacity : 100,
    };
  }

  let { values, mods, color } = parseAttr(val, 0);

  let name, opacity;

  if (color) {
    return { color };
  }

  values.forEach(token => {
    if (token.match(/^((var|rgb|rgba|hsl|hsla)\(|#[0-9a-f]{3,6})/)) {
      color = token;
    } else if (token.endsWith('%')) {
      opacity = parseInt(token);
    }
  });

  mods.forEach(mod => {
    if (COLOR_NAME_LIST.includes(mod)) {
      name = mod;
    } else if (mod === 'transparent' || mod === 'clear') {
      color = 'transparent';
    }
  });

  if (color) {
    return { color };
  }

  name = name || mods[0];

  if (!name) {
    if (!ignoreError && devMode) {
      warn('incorrect color value:', val);
    }

    return {};
  }

  if (!opacity) {
    let color;

    if (name === 'current') {
      color = 'currentColor';
    } else if (name === 'inherit') {
      color = 'inherit';
    } else {
      color = `var(--nu-${name}-color)`;
    }

    return {
      name,
      color,
    }
  }

  return {
    color: `rgba(var(--nu-${name}-color-rgb), ${opacity / 100})`,
    name,
    opacity,
  };
}

export function isDefined(tag) {
  return !!customElements.get(tag);
}

/**
 * Reset scroll on the element.
 * @param el {HTMLElement}
 * @param affectChildren
 */
export function resetScroll(el, affectChildren = false) {
  if (el.scrollTop) {
    el.scrollTop = 0;
  }

  if (el.scrollLeft) {
    el.scrollLeft = 0;
  }

  if (affectChildren) {
    [...deepQueryAll(el, '[overflow]')]
      .forEach(resetScroll);
  }
}

export function deepQuery(element, selector) {
  if (element.nuShadow) {
    const shadowEl = deepQuery(element.nuShadow, selector);

    if (shadowEl) {
      return shadowEl;
    }
  }

  const el = element.querySelector(selector);

  if (el) return el;

  let foundEl;

  return [...element.querySelectorAll('[shadow-root]')]
    .find(shadowEl => {
      const root = shadowEl.nuShadow;

      foundEl = deepQuery(root, selector);

      return root && foundEl;
    }) && foundEl;
}

export function deepQueryAll(element, selector) {
  const found = [];

  if (element.nuShadow) {
    found.push(...deepQueryAll(element.nuShadow, selector));
  }

  found.push(...element.querySelectorAll(selector));

  [...element.querySelectorAll('[shadow-root]')]
    .forEach(shadowEl => {
      const root = shadowEl.nuShadow;

      if (root) {
        found.push(...deepQueryAll(root, selector));
      }
    });

  return found;
}

export function queryChildren(element, selector) {
  const children = [...element.querySelectorAll(selector)];

  return children.filter(el => el.parentNode === element);
}

export function isValidDate(date) {
  return !date || !date.getTime || !isNan(date.getTime());
}

export function isNan(val) {
  return val !== val;
}

export function requestIdleCallback(cb) {
  const ric = window.requestIdleCallback;

  return ric
    ? ric(cb)
    : setTimeout(cb, 100);
}

export function asyncDebounce(cb, context) {
  const timers = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (timers[key]) {
      return;
    }

    cb.apply(context, args);

    timers[key] = setTimeout(() => {
      delete timers[key];
    }, 0);
  };
}

export function h(tag) {
  return document.createElement(tag);
}

export function extractModule(promise) {
  return promise.then(module => module.default || module);
}

// export function debugProp(instance, prop) {
//   Object.assign(instance, {
//     set [prop](val) {
//       try {
//         throw '';
//       } catch (e) {
//         console.error('prop changed', instance, {
//           [prop]: value,
//         });
//       }
//
//       this[`_${prop}`] = val;
//     },
//     get [prop]() {
//       return this[`_${prop}`];
//     }
//   });
// }

const NO_VALUES = ['n', 'no', 'false'];
const YES_VALUES = ['y', 'yes', 'true'];

/**
 * Check for "no" value.
 * @param {string} value - original attribute value.
 * @return {boolean}
 */
export function isNoValue(value) {
  return NO_VALUES.includes(value);
}

/**
 * Check for "yes" value.
 * @param {string} value - original attribute value.
 * @return {boolean}
 */
export function isYesValue(value) {
  return YES_VALUES.includes(value);
}

/**
 * Check for "no" value in modifiers.
 * @param mods {Array<String>} - original attribute value.
 * @return {boolean}
 */
export function hasNoMod(mods) {
  return !!NO_VALUES.find(val => mods.includes(val));
}

/**
 * Check for "yes" value in modifiers.
 * @param mods {Array<String>} - original attribute value.
 * @return {boolean}
 */
export function hasYesMod(mods) {
  return !!YES_VALUES.find(val => mods.includes(val));
}

/**
 * Set timeout based on local transition time.
 * @param host {HTMLElement}
 * @param cb {Function}
 * @param multiplier {Number}
 */
export function setTransitionTimeout(host, cb, multiplier = 1) {
  const style = getComputedStyle(host);
  const styleValue = style.getPropertyValue('--nu-transition').trim();
  const transition = style.transition;
  const time = transition ? parseTime(styleValue) * multiplier : 0;

  if (!time) {
    cb();
  } else {
    setTimeout(() => {
      setTimeout(cb, time);
    }, 0);
  }
}

/**
 * Parse time in milliseconds from style value.
 * @param value {String}
 * @return {Number}
 */
export function parseTime(value) {
  const multiplier = value.match(/\ds$/) ? 1000 : 1;
  return parseFloat(value) * multiplier;
}

export function getRealHeight(el) {
  Object.assign(el.style, {
    position: 'absolute',
    height: 'initial',
    maxHeight: 'initial',
  });

  const height = el.offsetHeight;

  Object.assign(el.style, {
    position: '',
    height: '',
    maxHeight: '',
  });

  return height;
}

export function getType(value) {
  if (typeof value === 'boolean') {
    return 'bool';
  } else if (typeof value === 'string') {
    return 'text';
  } else if (typeof value === 'number') {
    return 'num';
  } else if (value instanceof Date) {
    return 'date';
  } else if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
    return 'daterange';
  }
}

export function isEqual(val1, val2) {
  const type1 = getType(val1);
  const type2 = getType(val2);

  if (type1 !== type2) {
    return false;
  } else if (type1 === 'date') {
    return val1.getTime() === val2.getTime();
  } else if (type1 === 'daterange') {
    return val1[0].getTime() === val2[0].getTime()
      && val1[1].getTime() === val2[1].getTime();
  } else {
    return val1 === val2;
  }
}

export function getContextOwner(element, name) {
  let context = element.nuContext;

  while (!context.hasOwnProperty(name)) {
    context = Object.getPrototypeOf(context);
  }

  while (element.nuContext !== context) {
    element = element.parentNode || element.host;
  }

  return element;
}

// @see https://stackoverflow.com/questions/45408920/plain-javascript-scrollintoview-inside-div
export function scrollParentToChild(parent, child) {
  // Where is the parent on page
  const parentRect = parent.getBoundingClientRect();
  // What can you see?
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };

  // Where is the child
  const childRect = child.getBoundingClientRect();
  // Is the child viewable?
  const isViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height - childRect.height);

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // scroll by offset relative to parent
    parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top - (parentRect.height / 2) + (childRect.height / 2);
  }
}

export function getHost(element) {
  const root = element.getRootNode();

  if (root !== document) {
    return root.host;
  }
}

export function stackTrace(...args) {
  try {
    throw '';
  } catch (e) {
    console.error(...args, e);
  }
}

export function isFocusable(el) {
  const tabindex = el.getAttribute('tabindex');

  return tabindex && !el.hasAttribute('disabled');
}

/**
 * Set ARIA reference to other elements.
 * @param el
 * @param attr {String}
 */
export function setAriaRef(el, attr) {
  let value = el.getAttribute(attr) || '';

  const innerRef = getInnerRef(el, attr);

  if (innerRef) {
    value = `${innerRef} ${value}`;
  }

  log('set aria ref', attr, value, innerRef);

  const ariaValue = value.split(/\s+/g).map((id) => {
    let link;

    link = queryById(el, id, true);

    if (!link) return '';

    return generateId(link);
  }).join(' ');

  if (ariaValue.trim()) {
    setAria(el, attr, ariaValue);
  }
}

export function getInnerRef(el, name) {
  return el.nuRefs && el.nuRefs[name];
}

/**
 * Set inner ref.
 * @param el
 * @param name {String}
 * @param value {String}
 */
export function setInnerRef(el, name, value) {
  if (!el.nuRefs) {
    el.nuRefs = {};
  }

  el.nuRefs[name] = value;
}

export function removeInnerRef(el, name) {
  if (el.nuRefs) {
    delete el.nuRefs[name];
  }
}

/**
 * Set aria attribute.
 * @param el
 * @param {String} name
 * @param {Boolean|String|Number} value
 */
export function setAria(el, name, value) {
  if (typeof value === 'boolean') {
    value = value ? 'true' : 'false';
  }

  if (value == null) {
    (el.nuRef || el).removeAttribute(`aria-${name}`);
  } else {
    (el.nuRef || el).setAttribute(`aria-${name}`, value);
  }
}

const POINT_REGEX = /([\d.]+)/;

/**
 * Decrease responsive point value.
 * @param {String} val
 * @return {String}
 */
export function decPoint(val) {
  return val.replace(POINT_REGEX, (num) => `${Number(num) - 0.01}`);
}
