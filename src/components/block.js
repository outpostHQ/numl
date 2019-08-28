import { GRID_ITEM_ATTRS, FLEX_ITEM_ATTRS } from '../attrs';
import { unit, sizeUnit, convertUnit, splitDimensions } from '../helpers';
import NuElement from './element';

export const BORDER_STYLES = [
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

export default class NuBlock extends NuElement {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuDisplay() {
    return 'block';
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

        BORDER_STYLES.forEach(s => {
          if (val.includes(s)) {
            val = val.replace(s, '');
            style = s;
          }
        });

        val = val
          ? convertUnit(val, 'var(--nu-theme-border-width)')
          : 'var(--nu-theme-border-width)';

        return {
          'border': `${val} ${style} var(--nu-theme-border-color)`,
        };
      },
      outline(val) {
        if (val == null) return val;

        val = val
          ? convertUnit(val, 'var(--nu-theme-outline-width)')
          : 'var(--nu-theme-outline-width)';

        return {
          '--nu-outline-width': val,
        };
      },
      shadow(val) {
        if (val == null) return val;

        const depth = val === '' ? '1rem' : convertUnit(val);

        return {
          '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, calc(var(--nu-theme-shadow-intensity) / ${(Number(val) ||
            1) * 2}))`
        };
      }
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}{
        --nu-border-radius: 0rem;
        --nu-outline-width: 0;
        --nu-outline-inset: 0 0;
        --nu-outline-shadow: var(--nu-outline-inset) 0 var(--nu-outline-width) var(--nu-theme-outline-color);
        --nu-depth-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

        box-shadow: var(--nu-outline-shadow), var(--nu-depth-shadow);
        border-radius: var(--nu-border-radius);
        box-sizing: border-box;
      }
    `;
  }
}
