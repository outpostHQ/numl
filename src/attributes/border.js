import { excludeMod, convertUnit } from '../helpers';

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
  let color = 'var(--nu-border-color)';

  const newVal = excludeMod(val, 'special');

  if (newVal != null) {
    val = newVal;
    color = 'var(--nu-special-text-color)';
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
    ? convertUnit(val, 'var(--nu-border-width)')
    : 'var(--nu-border-width)';

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
        '--nu-local-stroke-shadow': dirs.map(dir => {
          let pos = DIRECTIONS_HANDLERS[dir];

          return `${style !== 'inside' ? pos(val, true) : '0 0'} 0 ${dirs.length ? 0 : val} ${color},
                  inset ${style !== 'outside' ? pos(val) : '0 0'} 0 ${dirs.length ? 0 : val} ${color}`;
        }).join(','),
      };
    }

    return {
      '--nu-local-stroke-shadow': `0 0 0 ${style !== 'inside' ? val : 0} ${color},
            inset 0 0 0 ${style !== 'outside' ? val : 0} ${color}`,
    };
  }

  const border = `${val} ${style} ${color}`;

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
