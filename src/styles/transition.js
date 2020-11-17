import { devMode, isNoValue, parseAttr, toCamelCase, warn } from '../helpers';
import { h } from '../dom-helpers';

const MAP = {
  move: ['transform'],
  rotate: ['transform'],
  scale: ['transform'],
  place: ['transform', 'top', 'right', 'bottom', 'left'],
  transform: ['transform'],
  fill: ['background-color'],
  border: ['border', 'box-shadow'],
  drop: ['transform'],
  filter: ['filter', 'backdrop-filter'],
  radius: ['border-radius'],
  shadow: ['box-shadow'],
  size: ['font-size', 'line-height'],
  text: ['font-weight', 'text-decoration-color'],
  theme: ['color', 'background-color', 'box-shadow', 'border', 'border-radius'],
  space: ['margin'],
  inset: ['box-shadow'],
  mark: ['box-shadow'],
  width: ['max-width', 'min-width', 'width'],
  height: ['max-height', 'min-height', 'height'],
  gap: ['gap', 'margin'],
  z: ['z-index'],
  image: ['background-image', 'background-position', 'background-size'],
};

export const DEFAULT_TIMING = 'calc(var(--transition-enabler) * var(--transition))';
const DEFAULT_EASING = 'linear';

function getTiming(name) {
  return `calc(var(--transition-enabler) * var(--${name}-transition, var(--transition)))`;
}

const tmp = h('div').style;

function isStyle(style) {
  return toCamelCase(style) in tmp;
}

export default function transitionAttr(val) {
  if (val == null || isNoValue(val)) return;

  const transitions = val.split(',');
  const map = {};

  transitions.forEach(transition => {
    const { values, mods } = parseAttr(transition);
    const name = mods[0];
    const easing = mods[1];
    const timing = values[0];

    const styles = MAP[name] || (isStyle(name) ? [name] : null);

    if (!styles) {
      if (devMode) {
        warn('[transition] incorrect name: ', JSON.stringify(name));
      }
    }

    styles.forEach(style => {
      map[style] = [timing, easing, name];
    });
  });

  const result = Object.entries(map)
    .map(([style, [timing, easing, name]]) => {
      return `${style} ${timing || getTiming(name)} ${easing || DEFAULT_EASING}`;
    }).join(', ');

  return { transition: result };
}
