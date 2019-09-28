import { convertUnit, unit, sizeUnit } from './helpers';

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
  row: 'grid-row',
  area: 'grid-area',
};

import { THEME_COLOR_ATTRS_LIST } from './helpers';

export { THEME_COLOR_ATTRS_LIST };

export const THEME_SCHEME_ATTRS = [
  ...THEME_COLOR_ATTRS_LIST,
  'shadow-intensity',
  'shadow-opacity',
  'special-shadow-opacity',
];

export const THEME_ATTRS_LIST = [
  ...THEME_COLOR_ATTRS_LIST,
  'border-radius',
  'border-width',
  'shadow-intensity',
  'shadow-opacity',
  'animation-time',
  'special-shadow-opacity',
];
