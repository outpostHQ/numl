/**
 * @TODO Add flexible color support | Use parseAttr() method to parse value.
 */

import { stripCalc, parseAttr } from '../helpers';

export const DEFAULT_STROKE_SHADOW = '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)';

const STROKE_STYLES = [
  'inside',
  'center',
  'outside',
];

const BORDER_STYLES = [
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

const DIRECTIONS = ['top', 'right', 'bottom', 'left'];
const DIRECTIONS_HANDLERS = {
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

export default function borderAttr(val) {
  if (val == null) return val;

  let style = 'solid';
  let dirs = [];

  let { values, mods, color } = parseAttr(val);

  color = color || 'var(--nu-local-border-color, var(--nu-border-color))';

  for (let s of BORDER_STYLES) {
    if (mods.includes(s)) {
      style = s;
    }
  }

  for (let s of DIRECTIONS) {
    if (mods.includes(s)) {
      dirs.push(s);
    }
  }

  let size = values[0] || 'var(--nu-border-width)';

  if (style === 'center') {
    size = `calc((${stripCalc(size)}) / 2)`;
  }

  if (style === 'hidden') {
    style = 'solid';
    color = 'transparent';
  }

  if (STROKE_STYLES.includes(style)) {
    if (dirs.length) {
      return {
        '--nu-local-stroke-shadow': dirs.map(dir => {
          let pos = DIRECTIONS_HANDLERS[dir];

          return `${style !== 'inside' ? pos(size, true) : '0 0'} 0 ${dirs.length ? 0 : size} ${color},
                  inset ${style !== 'outside' ? pos(size) : '0 0'} 0 ${dirs.length ? 0 : size} ${color}`;
        }).join(','),
      };
    }

    return {
      '--nu-local-stroke-shadow': `0 0 0 ${style !== 'inside' ? size : 0} ${color},
            inset 0 0 0 ${style !== 'outside' ? size : 0} ${color}`,
    };
  }

  const border = `${size} ${style} ${color}`;

  if (dirs.length) {
    return dirs.reduce((styles, dir) => {
      styles[`border-${dir}`] = border;

      return styles;
    }, {
      '--nu-local-stroke-shadow': DEFAULT_STROKE_SHADOW,
    });
  }

  return { border, '--nu-local-stroke-shadow': DEFAULT_STROKE_SHADOW };
}
