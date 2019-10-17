import {
  convertUnit,
  unit,
  generateId,
  toCamelCase,
  toKebabCase,
  computeStyles,
  colorUnit,
  setImmediate,
  excludeMod,
  sizeUnit,
  splitDimensions,
  hasMod, devMode, warn,
} from '../helpers';
import Modifiers, { SIZES } from '../modifiers';
import { hasCSS, injectCSS, removeCSS, attrsQuery, generateCSS, stylesString } from '../css';
import NuBase, { DOUBLE_DISPLAY } from '../base';
import { THEME_ATTRS_LIST, THEME_SCHEME_ATTRS } from '../attrs';
import { generateTheme, convertThemeName, getMainThemeName, isColorScheme } from '../themes';

const Z_MAP = {
  '': '0',
  'below': '-1',
  'above': '1',
  'front': '9999',
  'back': '-9999',
};

export const PLACE_VALUES = [
  'content', 'items', 'self'
].map((name) => {
  return CSS.supports(`place-${name}`, 'stretch stretch')
    ? `place-${name}` : function (val) {
      const values = val && val.trim().split(/\s+/);

      return val ? {
        [`align-${name}`]: values[0],
        [`justify-${name}`]: values[1] || values[0],
      } : null;
    };
});

const PLACE_ABS_OUTSIDE = [
  'outside-top', 'outside-right', 'outside-bottom', 'outside-left',
];

const PLACE_ABS_CENTER = [
  'center-top', 'center-right', 'center-bottom', 'center-left',
];

const PLACE_ABS_CENTER_STYLES = {
  'center-top': { y: '-50%' },
  'center-right': { x: '50%' },
  'center-bottom': { y: '50%' },
  'center-left': { x: '-50%' },
};

export const PLACE_ABS_INSIDE = [
  'top', 'right', 'bottom', 'left',
];

export const PLACE_ABS = [
  'inside',
  'cover',
  'fixed',
  ...PLACE_ABS_INSIDE,
  ...PLACE_ABS_OUTSIDE,
  ...PLACE_ABS_CENTER,
];

export const FLEX_MAP = {
  row: 'margin-right',
  column: 'margin-bottom',
  'row-reverse': 'margin-left',
  'column-reverse': 'margin-top'
};

export const SIZINGS = {
  content: 'content-box',
  border: 'border-box',
};

export const STROKE_STYLES = [
  'inside',
  'center',
  'outside',
];

export const BORDER_STYLES = [
  ...STROKE_STYLES,
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'];
export const DIRECTIONS_HANDLERS = {
  top(val, outside) {
    return `0 calc(${val} * ${outside ? -1 : 1})`;
  },
  right(val, outside) {
    return `calc(${val} * ${outside ? 1 : -1}) 0`;
  },
  bottom(val, outside) {
    return `0 calc(${val} * ${outside ? 1 : -1})`;
  },
  left(val, outside) {
    return `calc(${val} * ${outside ? -1 : 1}) 0`;
  },
};

const plugins = {
  cursor: 'cursor',
  responsive: ''
};

const RESPONSIVE_ATTR = 'responsive';
const backgroundUnit = colorUnit('background-color', 'background');
const baseColorUnit = colorUnit('color', 'text');

/**
 * @class
 * @abstract
 */
export default class NuElement extends NuBase {
  static get nuTag() {
    return 'nu-element'; // abstract tag
  }

  /**
   * Element ARIA Role.
   * @returns {String}
   */
  static get nuRole() {
    return '';
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {
      /**
       * Handler to declare custom properties.
       * @private
       * @param {String} val - String that contains name and value of the property.
       * @returns {null|Object}
       */
      var(val) {
        if (!val) return null;

        const tmp = val.split(':');

        return { [tmp[0]]: convertUnit(tmp[1]) };
      },
      width: sizeUnit('width'),
      height: sizeUnit('height'),
      sizing(val) {
        val = SIZINGS[val];

        if (!val) return null;

        return { 'box-sizing': val };
      },
      radius: unit('border-radius', {
        multiplier: 'var(--nu-theme-border-radius)',
        empty: 'var(--nu-theme-border-radius)',
        property: true,
        convert: true,
      }),
      'items-radius': unit('border-radius', {
        suffix: '>:not([radius])',
        multiplier: 'var(--nu-theme-border-radius)',
        empty: 'var(--nu-theme-border-radius)',
        property: true,
        convert: true,
      }),
      padding: unit('padding', {
        multiplier: 'var(--nu-theme-padding)',
        empty: 'var(--nu-theme-padding)',
        convert: true,
      }),
      'items-padding': unit('padding', {
        suffix: '>:not[padding]',
        multiplier: 'var(--nu-theme-padding)',
        empty: 'var(--nu-theme-padding)',
        convert: true,
      }),
      space(val) {
        if (!val) return;

        val = convertUnit(val, 'var(--nu-theme-padding)');

        if (val.startsWith('calc(')) {
          val = val.slice(5, -1);
        }

        const spaces = splitDimensions(val).map(sp =>
          !sp.match(/^0[^\.]/) ? `calc(${sp || val} * -1)` : ''
        );

        return {
          'margin-top': spaces[0],
          'margin-right': spaces[1],
          'margin-bottom': spaces[2],
          'margin-left': spaces[3]
        };
      },
      border(val) {
        if (val == null) return val;

        let style = 'solid';
        let dirs = [];
        let color = 'var(--nu-theme-border-color)';

        const newVal = excludeMod(val, 'special');

        if (newVal != null) {
          val = newVal;
          color = 'var(--nu-theme-special-color)';
        }

        for (let s of BORDER_STYLES) {
          const newVal = excludeMod(val, s);

          if (newVal != null) {
            val = newVal;
            style = s;
          }
        }

        for (let s of DIRECTIONS) {
          const newVal = excludeMod(val, s);

          if (newVal != null) {
            val = newVal;
            dirs.push(s);
          }
        }

        val = val
          ? convertUnit(val, 'var(--nu-theme-border-width)')
          : 'var(--nu-theme-border-width)';

        if (style === 'center') {
          val = `calc(${val} / 2)`;
        }

        if (style === 'hidden') {
          style = 'solid';
          color = 'transparent';
        }

        if (STROKE_STYLES.includes(style)) {
          if (dirs.length) {
            return {
              '--nu-stroke-shadow': dirs.map(dir => {
                let pos = DIRECTIONS_HANDLERS[dir];

                return `${style !== 'inside' ? pos(val, true) : '0 0'} 0 ${dirs.length ? 0 : val} ${color},
                  inset ${style !== 'outside' ? pos(val) : '0 0'} 0 ${dirs.length ? 0 : val} ${color}`;
              }).join(','),
            };
          }

          return {
            '--nu-stroke-shadow': `0 0 0 ${style !== 'inside' ? val : 0} ${color},
            inset 0 0 0 ${style !== 'outside' ? val : 0} ${color}`,
          };
        }

        const border = `${val} ${style} ${color}`;

        if (dirs.length) {
          return dirs.reduce((styles, dir) => {
            styles[`border-${dir}`] = border;

            return styles;
          }, {});
        }

        return { border };
      },
      shadow(val) {
        if (val == null) return val;

        const depth = val === '' ? '1rem' : convertUnit(val, '.5rem');

        return {
          '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, calc(var(--nu-theme-shadow-opacity) / ${(Number(val) ||
            1) * 2}))`,
        };
      },
      /**
       * CSS Flow value. Used for flex and grid layouts.
       * @param val
       * @returns {*[]}
       */
      flow(val, defaults) {
        if (!val) return;

        const flexValue = `${val} nowrap`;
        const isFlexByDefault = defaults.display.endsWith('flex');
        const isGridByDefault = defaults.display.endsWith('grid');
        const isGridValue = CSS.supports('grid-auto-flow', val);
        const isFlexValue = CSS.supports('flex-flow', flexValue);

        const dirStyle = FLEX_MAP[val];
        const arr = [];

        if (isGridValue) {
          if (isGridByDefault) {
            arr.push({
              $suffix: ':not([display])',
              'grid-auto-flow': val,
            });
          }

          arr.push({
            $suffix: '[display$="grid"]',
            'grid-auto-flow': val,
          });
        }

        if (isFlexValue) {
          if (isFlexByDefault) {
            arr.push({
              $suffix: ':not([display])',
              'flex-flow': flexValue,
            }, {
              $suffix: `:not([display])>:not(:last-child)`,
              [dirStyle]: 'var(--nu-flex-gap)',
            });
          }

          arr.push({
            $suffix: '[display$="flex"]',
            'flex-flow': flexValue,
          }, {
            $suffix: `[display$="flex"]>:not(:last-child)`,
            [dirStyle]: 'var(--nu-flex-gap)',
          });
        }

        return arr;
      },
      /**
       * CSS Gap value. Used for flex and grid layouts.
       * @param val
       * @returns {*}
       */
      gap(val, defaults) {
        if (val == null) return;

        val = convertUnit(val || '1x', 'var(--nu-theme-padding)');

        const isFlexByDefault = defaults.display.endsWith('flex');
        const isGridByDefault = defaults.display.endsWith('grid');

        const arr = [{
          $suffix: '[display$="grid"]',
          'grid-gap': val,
        }, {
          $suffix: `[display$="flex"]>*`,
          '--nu-flex-gap': val,
        }];

        if (isGridByDefault) {
          arr.push({
            $suffix: ':not([display])',
            'grid-gap': val,
          });
        }

        if (isFlexByDefault) {
          arr.push({
            $suffix: `:not([display])>*`,
            '--nu-flex-gap': val,
          });
        }

        return arr;
      },
      order: 'order',
      grow: 'flex-grow',
      shrink: 'flex-shrink',
      basis: unit('flex-basis', { convert: true }),
      'items-basis': unit('flex-basis', { suffix: '>:not([basis])', convert: true }),
      'items-grow': unit('flex-grow', { suffix: '>:not([grow])' }),
      'items-shrink': unit('flex-shrink', { suffix: '>:not([shrink])' }),
      'place-content': PLACE_VALUES[0],
      'place-items': PLACE_VALUES[1],
      'content': PLACE_VALUES[0],
      'items': PLACE_VALUES[1],
      'template-areas': 'grid-template-areas',
      areas: 'grid-template-areas',
      'auto-flow': 'grid-auto-flow',
      'template-columns': unit('grid-template-columns', { convert: true }),
      'template-rows': unit('grid-template-rows', { convert: true }),
      columns: unit('grid-template-columns', { convert: true }),
      rows: unit('grid-template-rows', { convert: true }),
      column: 'grid-column',
      row: 'grid-row',
      area: 'grid-area',
      place(val) {
        if (!val) return;

        let pos = '';

        if (hasMod(val, 'relative')) {
          val = excludeMod(val, 'relative');

          pos = 'relative';
        }

        const abs = PLACE_ABS.find(place => hasMod(val, place));

        if (abs) {
          const styles = {
            position: hasMod(val, 'fixed') ? 'fixed' : 'absolute',
          };
          let transX = 0;
          let transY = 0;

          if (val.trim() === 'cover') {
            return {
              ...styles,
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            };
          }

          PLACE_ABS_CENTER.forEach((place, i) => {
            if (!hasMod(val, place)) return;

            styles[PLACE_ABS_INSIDE[PLACE_ABS_CENTER.indexOf(place)]] = '0';
            delete styles[PLACE_ABS_INSIDE[(PLACE_ABS_CENTER.indexOf(place) + 2) % 4]];

            if (PLACE_ABS_CENTER_STYLES[place].x) {
              transX = PLACE_ABS_CENTER_STYLES[place].x;
            }

            if (PLACE_ABS_CENTER_STYLES[place].y) {
              transY = PLACE_ABS_CENTER_STYLES[place].y;
            }

            if (i % 2 && !styles.top && !styles.bottom) {
              styles.top = '50%';
            }

            if (i % 2 === 0 && !styles.left && !styles.right) {
              styles.left = '50%';
            }
          });

          PLACE_ABS_INSIDE.forEach((place, i) => {
            if (!hasMod(val, place)) return;

            styles[place] = '0';
            delete styles[PLACE_ABS_INSIDE[(PLACE_ABS_INSIDE.indexOf(place) + 2) % 4]];

            if (i % 2 && !styles.top && !styles.bottom) {
              styles.top = '50%';
            }

            if (i % 2 === 0 && !styles.left && !styles.right) {
              styles.left = '50%';
            }
          });

          PLACE_ABS_OUTSIDE.forEach((place, i) => {
            if (!hasMod(val, place)) return;

            styles[PLACE_ABS_INSIDE[(PLACE_ABS_OUTSIDE.indexOf(place) + 2) % 4]] = '100%';
            delete styles[PLACE_ABS_INSIDE[PLACE_ABS_OUTSIDE.indexOf(place)]];

            if (i % 2 && !styles.top && !styles.bottom) {
              styles.top = '50%';
            }

            if (i % 2 === 0 && !styles.left && !styles.right) {
              styles.left = '50%';
            }
          });

          if (hasMod(val, 'inside')) {
            if (!styles.left) {
              styles.left = '50%';
            }

            if (!styles.top) {
              styles.top = '50%';
            }
          }

          if (styles.left === '50%') {
            transX = '-50%';
          }

          if (styles.top === '50%') {
            transY = '-50%';
          }

          styles.transform = `translate(${transX}, ${transY})`;

          return styles;
        }

        if (pos) {
          return typeof (PLACE_VALUES[2]) === 'string'
            ? { [PLACE_VALUES[2]]: val, position: pos }
            : { ...PLACE_VALUES[2](val), position: pos };
        } else {
          return typeof (PLACE_VALUES[2]) === 'string'
            ? { [PLACE_VALUES[2]]: val }
            : PLACE_VALUES[2](val);
        }
      },
      z(val) {
        if (val == null) return;

        return {
          'z-index': Z_MAP[val] || val,
        };
      },
      events(val) {
        if (val == null) return;

        return {
          'pointer-events': val === 'none' ? val : 'auto',
        };
      },
      /**
       * Apply theme to the element by providing specific custom properties.
       * @param {String} val - Theme name.
       * @returns {*}
       */
      theme(val) {
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
          $suffix: ':not([color])',
          color: themeStyles['--nu-theme-color'],
        }];
      },
      color(val) {
        if (val == null) return;

        if (val.includes(' ')) {
          const tmp = val.split(' ');

          return {
            ...baseColorUnit(tmp[0]),
            ...backgroundUnit(tmp[1]),
          };
        }

        return baseColorUnit(val);
      },
      background(val) {
        if (val && (val.includes('url(') || val.includes('gradient'))) {
          return {
            'background': val,
            'background-color': 'var(--nu-theme-background-color)',
          };
        }

        return backgroundUnit(val);
      },
      transform(val) {
        return val ? { 'transform': val } : null;
      },
      /**
       * Apply modifier styles.
       * @param {String} val - String that contains modifiers separated by space.
       */
      mod(val) {
        if (!val) return;

        return Modifiers.get(val);
      },
      cursor(val) {
        return val
          ? {
            cursor: val
          }
          : null;
      },
      size(val) {
        if (!val) return null;

        const tmp = val.trim().split(/\s+/);
        const values = [];

        values[0] = SIZES[tmp[0]] ? String(SIZES[tmp[0]][0]) : tmp[0];

        if (!tmp[1] && SIZES[tmp[0]]) {
          values[1] = String(SIZES[tmp[0]][1]);
        } else {
          values[1] = SIZES[tmp[1]] ? String(SIZES[tmp[1]][1]) : tmp[1];
        }

        return {
          'font-size': convertUnit(values[0]),
          'line-height': convertUnit(values[1] || '1.5')
        };
      },
      hidden(val) {
        if (val !== 'true' && val !== 'y' && val !== '') return null;

        return { display: 'none !important' };
      },
      opacity(val) {
        if (val == null) return;

        return { opacity: val };
      },
      transition(val) {
        if (val == null) return;

        val = val.split(',').map(s => `${s} var(--nu-theme-animation-time) linear`).join(',');

        return { transition: val };
      },
      ...plugins,
      controls: '',
      label: '',
      labelledby: '',
      describedby: '',
      valuemin: '',
      valuemax: '',
      valuenow: '',
      setsize: '',
      posinset: '',
      expanded: '',
      owns: '',
      flowto: '',
      haspopup: '',
      activedescendant: ''
    };
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get nuAttrsList() {
    return Object.keys(this.nuAllAttrs);
  }

  /**
   * Element default attribute values.
   * They are used only to generate initial CSS for elements.
   */
  static get nuDefaults() {
    return {
      display: 'inline-block',
      sizing: 'border',
    };
  }

  /**
   * Element initialization logic
   */
  static nuCSS({ nuTag }) {
    return `
      ${nuTag}[nu-hidden] {
        display: none !important;
      }
      ${nuTag}{
        --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-stroke-shadow: 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-toggle-shadow: 0 0 0 0 rgba(0, 0, 0, 0) inset;

        box-shadow: var(--nu-stroke-shadow),
          var(--nu-toggle-shadow),
          var(--nu-depth-shadow);
      }
    `;
  }

  /**
   * @private
   * @returns {String[]}
   */
  static get observedAttributes() {
    return this.nuAttrsList;
  }

  get nuRole() {
    return this.getAttribute('role') || this.constructor.nuRole;
  }

  set nuRole(value) {
    this.setAttribute('role', value);
  }

  constructor() {
    super();

    this.nuTabIndex = 0;
    this.nuRef = null;
    this.nuThemes = {};
  }

  /**
   * @private
   */
  connectedCallback() {
    const nuRole = this.constructor.nuRole;

    if (!this.hasAttribute('role') && nuRole) {
      this.setAttribute('role', nuRole);
    }

    this.nuConnected();

    this.nuIsMounted = true;
  }

  /**
   * @private
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  attributeChangedCallback(name, oldValue, value) {
    super.attributeChangedCallback(name, oldValue, value);

    if (value == null || !this.constructor.nuAllAttrs[name]) return;

    this.nuApplyCSS(name, value);
  }

  /**
   * Generate CSS for specific query, attribute and its value.
   * Is used as separate method to provide API for decorators.
   * @param {String} query - CSS query to apply styles.
   * @param {String} name - attribute (handler) name.
   * @param {String} value - attribute value (handler argument).
   * @returns {undefined|String} - output css
   */
  nuGetCSS(query, name, value) {
    const isResponsive = value.includes('|');

    if (isResponsive) {
      this.nuSetMod(RESPONSIVE_ATTR, true);

      // if (value !== this.getAttribute(name)) return;

      let respEl = this;

      while (respEl && (!respEl.getAttribute || !respEl.getAttribute(RESPONSIVE_ATTR) || !respEl.nuResponsive)) {
        respEl = respEl.parentNode;
      }

      if (!respEl) {
        setTimeout(() => {
          const newValue = this.getAttribute(name);

          if (value !== newValue) return;

          this.nuApplyCSS(name, value);
        }, 100);

        return;
      }

      const values = value.split('|');
      const styles = values.map((val, i) => {
        // if default value
        if (val && !val.trim()) return;

        // if repeat value
        if (!val) {
          // if first element - nothing to repeat
          if (!i) return;

          for (let j = i - 1; j >= 0; j--) {
            if (values[j]) {
              val = values[j];
              break;
            }
          }

          if (!val) {
            // nothing to repeat;
            return;
          }
        }

        const stls = computeStyles(name, val, this.constructor.nuAllAttrs, this.constructor.nuAllDefaults);

        return generateCSS(query, stls);
      });

      return respEl.nuResponsive()(styles);
    }

    let styles = computeStyles(name, value, this.constructor.nuAllAttrs, this.constructor.nuAllDefaults);

    return generateCSS(query, styles);
  }

  /**
   * Create and apply CSS based on element's attributes.
   * @param {String} name
   * @param {*} value
   * @param {*} force - replace current CSS rule
   */
  nuApplyCSS(name, value, force = false) {
    // do not handle [var] attribute, it's for nu-var purposes.
    if (name === 'var') return;

    const isResponsive = value.includes('|');

    let query;

    if (isResponsive) {
      query = `${this.nuGetContext(RESPONSIVE_ATTR)}${this.nuGetQuery(
        { [name]: value },
        this.getAttribute(RESPONSIVE_ATTR)
      )}`;
    } else {
      query = this.nuGetQuery({ [name]: value });
    }

    if (hasCSS(query)) {
      if (!force) return;

      removeCSS(query);
    }

    const css = this.nuGetCSS(query, name, value);

    if (css) {
      injectCSS(query, query, css);
    }
  }

  /**
   * Set aria attribute.
   * @param {String} name
   * @param {Boolean|String} value
   */
  nuSetAria(name, value) {
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false';
    }

    if (value == null) {
      this.removeAttribute(`aria-${name}`);
    } else {
      this.setAttribute(`aria-${name}`, value);
    }
  }

  /**
   * Build a query with current tag name and provided attribute value.
   * @param {Object} attrs - dict of attributes with their values.
   * @param {Boolean} useId - add ID to the query.
   * @returns {string}
   */
  nuGetQuery(attrs = {}, useId) {
    return `${useId ? '' : this.constructor.nuTag}${useId ? `#${this.nuId}` : ''}${attrsQuery(
      attrs
    )}`;
  }

  /**
   * Make element focusable or temporarily disable that ability.
   * @param {boolean} bool
   */
  nuSetFocusable(bool) {
    if (bool) {
      (this.nuRef || this).setAttribute('tabindex', this.nuTabIndex);
    } else {
      (this.nuRef || this).removeAttribute('tabindex');
    }

    if (this.nuFocusable) return;

    (this.nuRef || this).addEventListener('focus', () => {
      this.nuSetMod('focus', true);
    });

    (this.nuRef || this).addEventListener('blur', () => {
      this.nuSetMod('focus', false);
    });

    if (document.activeElement === this.nuRef) {
      this.nuSetMod('focus', true);
    }

    this.nuFocusable = true;
  }

  /**
   * Called when element is connected to the DOM.
   * Can be called twice or more.
   * While using frameworks this method can be fired without element having parentNode.
   */
  nuConnected() {
    this.setAttribute('nu', '');
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case RESPONSIVE_ATTR:
        generateId(this);

        setTimeout(() => {
          if (this.getAttribute(RESPONSIVE_ATTR) !== value) return;
          /**
           * @type {NuElement[]}
           */
          const elements = this.querySelectorAll('[nu-responsive]');

          [...elements].forEach(el => {
            if (el.nuApplyCSS) {
              [...el.attributes].forEach(({ name, value }) => {
                if (!el.constructor.nuAttrsList.includes(name) || !value.includes('|')) return;

                el.nuApplyCSS(name, value, true);
              });
            }
          });
        }, 0);
        break;
      case 'label':
      case 'valuemin':
      case 'valuemax':
      case 'valuenow':
      case 'setsize':
      case 'posinset':
      case 'expanded':
      case 'haspopup':
        this.nuSetAria(name, value);
        break;
      case 'controls':
      case 'labelledby':
      case 'describedby':
      case 'owns':
      case 'flowto':
      case 'activedescendant':
        setImmediate(() => {
          const ariaValue = value.split(/\s+/g).map((id) => {
            const link = this.nuInvertQueryById(id);

            if (!link) return '';

            return generateId(link);
          }).join(' ');

          if (ariaValue.trim()) {
            this.nuSetAria(name, ariaValue);
          }
        });
        break;
    }
  }

  /**
   * Return responsive decorator for the styles set.
   * @returns {*}
   */
  nuResponsive() {
    const points = this.getAttribute('responsive');

    if (this.nuReponsiveFor === points) return this.nuResponsiveDecorator;

    this.nuReponsiveFor = points;

    if (!points) {
      return (this.nuResponsiveDecorator = styles => styles);
    }

    const tmpPoints = points.split(/\|/);

    const mediaPoints = tmpPoints.map((point, i) => {
      if (!i) {
        return `@media (min-width: ${point})`;
      }

      const prevPoint = tmpPoints[i - 1];

      return `@media (max-width: calc(${prevPoint} - 1px)) and (min-width: ${point})`;
    });

    mediaPoints.push(`@media (max-width: calc(${tmpPoints.slice(-1)[0]} - 1px))`);

    return (this.nuResponsiveDecorator = styles => {
      return mediaPoints
        .map((point, i) => {
          let stls;

          if (styles[i]) {
            stls = styles[i];
          } else {
            for (let j = i - 1; j >= 0; j--) {
              if (styles[j]) {
                stls = styles[j];
                break;
              }
            }
          }

          return `${point}{\n${stls || ''}\n}\n`;
        })
        .join('');
    });
  }

  /**
   * Get query context of the current element.
   * It find all parent elements with provided attribute and built sequence with their ids.
   * @param {String} attrName
   * @returns {String} - CSS query
   */
  nuGetContext(attrName) {
    let context = '',
      el = this;

    while ((el = el.parentNode)) {
      if (el.getAttribute && el.getAttribute(attrName) && el.nuId) {
        context = `#${el.nuId} ${context}`;
      }
    }

    return context;
  }

  /**
   * Scroll to element.
   * @param id
   */
  nuScrollTo(id) {
    if (!id) return;

    const element = this.nuInvertQueryById(id);

    if (element) {
      scrollTo(0, element.getBoundingClientRect().y + window.pageYOffset);
    }
  }

  /**
   * Declare theme in current context.
   * @param {String} name – Theme name.
   * @param {Object} props - Light theme props.
   * @param {Object} props - Dark theme props.
   */
  nuDeclareTheme(name, props, darkProps = {}) {
    if (
      this.nuThemes[name] &&
      this.nuThemes[name].styleElement &&
      this.nuThemes[name].styleElement.parentNode
    ) {
      let el = this.nuThemes[name].styleElement;

      el.parentNode.removeChild(el);
    }

    if (!props) {
      delete this.nuThemes[name];
      this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));

      return;
    }

    if (name !== 'default' && this.nuThemes.default) {
      props = {
        ...{
          ...this.nuThemes.default.light,
          ...this.nuThemes.default.dark
        },
        ...props
      };
    }

    generateId(this);

    const parentStyles = window.getComputedStyle(this.parentNode);
    const parentProps = THEME_ATTRS_LIST.reduce((map, name) => {
      const themeName = toKebabCase(name);
      const propName = `--nu-default-${themeName}`;
      const value = parentStyles.getPropertyValue(propName);

      if (value) {
        map[toCamelCase(name)] = value;
      }

      return map;
    }, {});

    [props, darkProps].forEach(themeProps => {
      Object.keys(themeProps).forEach(name => {
        if (themeProps[name] && ~themeProps[name].indexOf('var(')) {
          const varName = themeProps[name].trim().slice(4, -1);

          themeProps[name] = parentStyles.getPropertyValue(varName).trim();
        }
      });
    });

    const [lightTheme, darkTheme] = generateTheme(props, darkProps, parentProps);

    const baseQuery = `#${this.nuId}`;
    const forceLightStyles = stylesString(convertThemeName(lightTheme, `${name}-light`));
    const forceDarkStyles = stylesString(convertThemeName(darkTheme, `${name}-dark`));
    const lightStyles = stylesString(convertThemeName(lightTheme, name));
    const darkStyles = stylesString(convertThemeName(darkTheme, name));
    const defaultStyles =
      name === 'default'
        ? stylesString(
        THEME_ATTRS_LIST.reduce((obj, attr) => {
          obj[`--nu-theme-${attr}`] = `var(--nu-${name}-${attr})`;

          return obj;
        }, {})
        )
        : '';
    const commonCSS = `
      ${defaultStyles ? `${baseQuery}{${defaultStyles}}` : ''}
      ${baseQuery}{${forceLightStyles}${forceDarkStyles}}
    `;

    let styleElement;

    if (matchMedia('(prefers-color-scheme)').matches) {
      styleElement = injectCSS(
        `theme:${name}:${baseQuery}`,
        baseQuery,
        `
        ${commonCSS}
        @media (prefers-color-scheme: dark) {
          html.nu-prefers-color-scheme ${baseQuery}{${darkStyles}}
          html.nu-prefers-color-scheme-dark ${baseQuery}{${darkStyles}}
          html.nu-prefers-color-scheme-light ${baseQuery}{${lightStyles}}
        }
        @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
          html.nu-prefers-color-scheme ${baseQuery}{${lightStyles}}
          html.nu-prefers-color-scheme-light ${baseQuery}{${lightStyles}}
          html.nu-prefers-color-scheme-dark ${baseQuery}{${darkStyles}}
        }
        html:not(.nu-prefers-color-scheme):not(.nu-prefers-color-scheme-light):not(.nu-prefers-color-scheme-dark) ${baseQuery}{${lightStyles}}
      `
      ).element;
    } else {
      styleElement = injectCSS(
        `theme:${baseQuery}`,
        baseQuery,
        `
        ${commonCSS}
        html:not(.nu-prefers-color-scheme-dark) ${baseQuery}{${lightStyles}}
        html.nu-prefers-color-scheme-dark ${baseQuery}{${darkStyles}}
      `
      ).element;
    }

    this.nuThemes[name] = {
      light: lightStyles,
      dark: darkStyles,
      styleElement
    };

    this.nuSetMod(`themes`, Object.keys(this.nuThemes).join(' '));
  }
}
