import { devMode, DIRECTIONS, parseAttr, stripCalc } from '../helpers';
import TransformCombinator from '../combinators/transform';

export const PLACE_ATTR = 'place';

export const PLACE_VALUES = [
  'content', 'items', 'self'
].map((name) => {
  return CSS.supports(`place-${name}`, 'stretch stretch')
    ? function (val) {
      return {
        [`place-${name}`]: val,
      };
    } : function (val) {
      const values = val && val.split(/\s+/);

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

const PLACE_ABS_INSIDE = [
  'top', 'right', 'bottom', 'left',
];

const PLACE_ABS = [
  'inside',
  'cover',
  'fixed',
  ...PLACE_ABS_INSIDE,
  ...PLACE_ABS_OUTSIDE,
  ...PLACE_ABS_CENTER,
];

const FILL_STYLES = [{
  'width': '100%',
  'height': '100%',
  'align-self': 'stretch',
  'justify-self': 'stretch',
  '--nu-local-focus-inset': 'inset 0 0',
}, {
  $suffix: ':not([radius])',
  '--nu-local-radius': '0',
}, {
  $suffix: ':not([border])',
  'border': 'none',
  '--nu-local-border-shadow': 'inset 0 0 0 0 var(--nu-border-color)',
}];

const COVER_STYLES = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
};

const OTHER_ATTRS = TransformCombinator().attrs.filter(attr => attr !== PLACE_ATTR);
const DEFAULT_STYLES = { '--nu-transform-place': 'translate(0, 0)' };
const NOT_OTHER_SELECTOR = OTHER_ATTRS.map(attr => `:not([${attr}])`).join('');
const SECONDARY_DEFAULT_STYLES = [{
  $suffix: NOT_OTHER_SELECTOR,
  '--nu-transform-place': 'none',
}, ...OTHER_ATTRS.map(attr => {
  return {
    $suffix: `[${attr}]`,
    ...DEFAULT_STYLES,
  };
})];

function getEmptyTransform(defaults) {
  const defaultAttr = OTHER_ATTRS.find(attr => defaults[attr] != null);

  if (defaultAttr) {
    return [DEFAULT_STYLES];
  }

  return SECONDARY_DEFAULT_STYLES.map(styles => ({ ...styles }));
}

export default function placeAttr(val, defaults) {
  if (!val) return getEmptyTransform(defaults);

  let { mods, values } = parseAttr(val, true);

  let pos = '';

  if (mods.includes('sticky')) {
    const directions = mods.filter(mod => DIRECTIONS.includes(mod));
    const size = values[0] || '0';

    return [{
      position: 'sticky',
      ...directions.reduce((map, dir) => {
        map[dir] = size;

        return map;
      }, {}),
    }, ...getEmptyTransform(defaults)];
  }

  const abs = PLACE_ABS.find(place => mods.includes(place));


  if (mods.includes('relative')) {
    pos = 'relative';

    mods = mods.filter(mod => mod !== 'relative');
  }

  if (mods.includes('fill')) {
    if (devMode && mods.length > 1) {
      warn('[place] fill modifier can\'t be combined with others', val);
    }

    // copy FILL_STYLES
    return [
      FILL_STYLES[0],
      { ...FILL_STYLES[1] },
      { ...FILL_STYLES[2] },
      ...getEmptyTransform(defaults),
    ];
  }

  if (abs) {
    const styles = {
      position: mods.includes('fixed') ? 'fixed' : 'absolute',
    };
    let transX = 0;
    let transY = 0;

    if (mods.includes('cover')) {
      return {
        ...styles,
        ...COVER_STYLES,
      };
    }

    PLACE_ABS_INSIDE.forEach((place, i) => {
      if (!mods.includes(place)) return;

      styles[place] = values[0] || '0';
      delete styles[PLACE_ABS_INSIDE[(PLACE_ABS_INSIDE.indexOf(place) + 2) % 4]];

      if (i % 2 && !styles.top && !styles.bottom) {
        styles.top = '50%';
      }

      if (i % 2 === 0 && !styles.left && !styles.right) {
        styles.left = '50%';
      }
    });

    PLACE_ABS_OUTSIDE.forEach((place, i) => {
      if (!mods.includes(place)) return;

      styles[PLACE_ABS_INSIDE[(PLACE_ABS_OUTSIDE.indexOf(place) + 2) % 4]] = values[0] ? `calc(100% + ${stripCalc(values[0])})` : '100%';
      delete styles[PLACE_ABS_INSIDE[PLACE_ABS_OUTSIDE.indexOf(place)]];

      if (i % 2 && !styles.top && !styles.bottom) {
        styles.top = '50%';
      }

      if (i % 2 === 0 && !styles.left && !styles.right) {
        styles.left = '50%';
      }
    });

    PLACE_ABS_CENTER.forEach((place, i) => {
      if (!mods.includes(place)) return;

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

    if (mods.includes('inside')) {
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

    styles['--nu-transform-place'] = `translate(${transX}, ${transY})`;

    return [styles];
  }

  let styles = [];
  let placeVal = mods.join(' ');

  if (placeVal) {
    styles = [PLACE_VALUES[2](placeVal)];
  }

  if (pos) {
    styles.push({
      position: pos,
    });
  }

  styles.push(...getEmptyTransform(defaults));

  return styles;
};
