import { convertUnit, unit, sizeUnit } from './helpers';
import { SIZES } from './modifiers';

const PLACE_VALUES = [
  'content', 'items', 'self'
].map((name) => {
  return CSS.supports(`place-${name}`, 'stretch stretch')
    ? `place-${name}` : function(val) {
      const values = val && val.trim().split(/\s+/);

      return val ? {
        [`align-${name}`]: values[0],
        [`justify-${name}`]: values[1] || values[0],
      } : null;
    };
});

export const PLACE_ATTRS = {
  'place-content': PLACE_VALUES[0],
  'place-items': PLACE_VALUES[1],
  'content': PLACE_VALUES[0],
  'items': PLACE_VALUES[1],
};

export const PLACE_SELF_ATTRS = {
  'place-self': PLACE_VALUES[2],
  'place': PLACE_VALUES[2],
};

const FLEX_MAP = {
  row: 'margin-right',
  column: 'margin-bottom',
  'row-reverse': 'margin-left',
  'column-reverse': 'margin-top',
}

export const FLEX_ATTRS = {
  ...PLACE_ATTRS,
  flow(val) {
    if (!val) return;

    const dirStyle = FLEX_MAP[val];

    return [
      { 'flex-flow': `${val} nowrap` },
      {
        $suffix: '>:not(:last-child)',
        [dirStyle]: 'var(--nu-flex-gap)',
      },
    ];
  },
  gap(val) {
    val = val || '0rem';

    return { $suffix: '>*', '--nu-flex-gap': convertUnit(val) };
  },
  order: 'order',
  'items-basis': unit('flex-basis', 'basis'),
  'items-grow'(val) {
    return {
      $suffix: ':not([grow])',
      'flex-grow': val,
    };
  },
  'items-shrink'(val) {
    return {
      $suffix: ':not([shrink])',
      'flex-shrink': val,
    };
  },
};

export const FLEX_ITEM_ATTRS = {
  ...PLACE_SELF_ATTRS,
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: unit('flex-basis'),
  'flex-grow': 'flex-grow',
  'flex-shrink': 'flex-shrink',
  'flex-basis': unit('flex-basis'),
};

export const GRID_ITEM_ATTRS = {
  ...PLACE_SELF_ATTRS,
  column: 'grid-column',
  col: 'grid-column',
  row: 'grid-row',
  area: 'grid-area',
};

export const GRID_ATTRS = {
  ...PLACE_ATTRS,
  'template-areas': 'grid-template-areas',
  areas: 'grid-template-areas',
  'auto-flow': 'grid-auto-flow',
  flow: 'grid-auto-flow',
  'template-columns': unit('grid-template-columns'),
  'template-rows': unit('grid-template-rows'),
  cols: unit('grid-template-columns'),
  rows: unit('grid-template-rows'),
  gap: unit('grid-gap'),
};

export const BASE_ATTRS = {
  color: 'color',
  background: 'background',
  pointer(val) {
    return val ? {
      pointer: val,
    } : null;
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
      'line-height': convertUnit(values[1] || '1.5'),
    };
  },
};

export const BLOCK_ATTRS = {
  width: sizeUnit('width'),
  height: sizeUnit('height'),
  padding: unit('padding'),
  radius: (val) => val != null ? {
    '--nu-border-radius': val
      ? convertUnit(val).replace(/\*/g, 'var(--nu-theme-border-radius)')
      : 'var(--nu-theme-border-radius)',
  } : null,
  border(val) {
    if (val == null) return val;

    const width = val ? convertUnit(val) : 'var(--nu-theme-border-width)';

    return {
      '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
    };
  },
  shadow(val) {
    if (val == null) return val;

    const depth = convertUnit(val || '1');
    const opacity = (val || 1) && (.075 / Math.pow(parseFloat(val), 1 / 2)) || '.075';

    return {
      '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, calc(${opacity} * 5 * var(--nu-theme-depth-opacity)))`,
    };
  },
  ...BASE_ATTRS,
};
