import { devMode, h, parseAttr, toCamelCase, warn } from '../helpers';

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
  text: ['font-weight'],
  theme: ['color', 'background-color', 'box-shadow', 'border', 'border-radius'],
  space: ['margin'],
  toggle: ['box-shadow'],
  width: ['max-width', 'min-width', 'width'],
  height: ['max-height', 'min-height', 'height'],
  gap: ['gap', 'margin'],
  z: ['z-index'],
};

export const DEFAULT_TIMING = 'calc(var(--nu-transition-enabler) * var(--nu-transition-time))';
const DEFAULT_EASING = 'linear';

function getTiming(name) {
  return `calc(var(--nu-transition-enabler) * var(--nu-${name}-transition-time, var(--nu-transition-time)))`;
}

const tmp = h('div').style;

function isStyle(style) {
  return toCamelCase(style) in tmp;
}

export default function transitionAttr(val) {
  if (val == null) return;

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
