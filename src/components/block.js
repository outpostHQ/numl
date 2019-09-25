import { GRID_ITEM_ATTRS, FLEX_ITEM_ATTRS } from '../attrs';
import { unit, sizeUnit, convertUnit, splitDimensions, excludeMod } from '../helpers';
import NuElement from './element';

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
  top(val, outside) { return `0 calc(${val} * ${outside ? -1 : 1})`;},
  right(val, outside) { return `calc(${val} * ${outside ? 1 : -1}) 0`;},
  bottom(val, outside) { return `0 calc(${val} * ${outside ? 1 : -1})`;},
  left(val, outside) { return `calc(${val} * ${outside ? -1 : 1}) 0`;},
};

export default class NuBlock extends NuElement {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuDefaults() {
    return {
      display: 'block',
    };
  }

  static get nuAttrs() {
    return {
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      width: sizeUnit('width'),
      height: sizeUnit('height'),
      padding: unit('padding'),
      space(val) {
        if (!val) return;

        val = convertUnit(val);

        const spaces = splitDimensions(val).map(sp =>
          !sp.match(/^0[^\.]/) ? `calc(${sp} * -1)` : ''
        );

        return {
          'margin-top': spaces[0],
          'margin-right': spaces[1],
          'margin-bottom': spaces[2],
          'margin-left': spaces[3]
        };
      },
      radius: val =>
        val != null
          ? {
              '--nu-border-radius': val
                ? convertUnit(val, 'var(--nu-theme-border-radius)')
                : 'var(--nu-theme-border-radius)'
            }
          : null,
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
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}{
        --nu-border-radius: 0rem;
        --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        --nu-stroke-shadow: 0 0 0 0 var(--nu-theme-border-color), inset 0 0 0 0 var(--nu-theme-border-color);

        box-shadow: var(--nu-stroke-shadow), var(--nu-depth-shadow);
        border-radius: var(--nu-border-radius);
        box-sizing: border-box;
      }
    `;
  }
}
