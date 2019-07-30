import { convertUnit, unit, sizeUnit } from './helpers';

export const PLACE_ATTRS = {
  'place-content': 'place-content',
  'place-items': 'place-items',
  'content': 'place-content',
  'items': 'place-items',
};

export const PLACE_SELF_ATTRS = {
  'place-self': 'place-self',
  'place': 'place-self',
};

export const FLEX_ATTRS = {
  ...PLACE_ATTRS,
  flow: 'flex-direction',
  order: 'order',
  gap: '',
  'items-basis': unit('flex-basis', 'basis'),
  'items-grow'(val) {
    return {
      $children: 'grow',
      'flex-grow': val,
    };
  },
  'items-shrink'(val) {
    return {
      $children: 'shrink',
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

export const BLOCK_ATTRS = {
  width: sizeUnit('width'),
  height: sizeUnit('height'),
  padding: unit('padding'),
  radius: (val) => val != null ? {
    '--nu-border-radius': val
      ? convertUnit(val).replace(/\*/g, 'var(--nu-border-radius, var(--default-border-radius))')
      : 'var(--default-border-radius)',
  } : null,
  border(val) {
    if (val == null) return val;

    const width = val ? convertUnit(val) : 'var(--default-border-width)';

    return {
      '--nu-border-shadow': `0 0 0 ${width} var(--nu-border-color, var(--current-border-color, var(--default-border-color)))`,
    };
  },
  depth(val) {
    if (val == null) return val;

    const depth = convertUnit(val || '1');
    const opacity = (val || 1) && (.075 / Math.pow(parseFloat(val), 1 / 2)) || '.075';

    return {
      '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, ${opacity})`,
    };
  },
};
