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
  'padding',
  'shadow-intensity',
  'shadow-opacity',
  'animation-time',
  'special-shadow-opacity',
];
