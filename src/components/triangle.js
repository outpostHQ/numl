import NuElement from './element';
import { convertUnit } from '../helpers';

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';
const TOP = 'top';
const BOTTOM = 'bottom';

export const DIR_MAP = {
  [UP]: BOTTOM,
  [RIGHT]: LEFT,
  [DOWN]: TOP,
  [LEFT]: RIGHT,
};

export const DIR_MAP_ZERO = {
  [UP]: TOP,
  [RIGHT]: RIGHT,
  [DOWN]: BOTTOM,
  [LEFT]: LEFT,
};

export default class NuTriangle extends NuElement {
  static get nuTag() {
    return 'nu-triangle';
  }

  static get nuDisplay() {
    return 'block';
  }

  static get nuAttrs() {
    return {
      dir(val) {
        val = val || 'up';

        const zeroSide = DIR_MAP_ZERO[val];

        if (!zeroSide) return;

        const mainSide = DIR_MAP[val];

        return {
          border: 'calc(var(--nu-triangle-basis) / 2) solid transparent',
          [`border-${zeroSide}`]: '0',
          [`border-${mainSide}-color`]: 'currentColor',
          [`border-${mainSide}-width`]: 'var(--nu-triangle-height)',
        };
      },
      size(val) {
        if (!val) return;

        const tmp = val.split(/\s+/);

        return {
          '--nu-triangle-basis': convertUnit(tmp[1] || String(tmp[0] * 2)),
          '--nu-triangle-height': convertUnit(tmp[0]),
        };
      },
    };
  }

  static get nuDefaults() {
    return {
      dir: 'up',
      size: '.5em 1em',
      color: 'border',
      mod: 'no-overflow',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        width: 0;
        height: 0;
        vertical-align: middle;
      }
      ${nuTag}[inline] {
        position: relative;
        bottom: 0.0675em;
      }
    `;
  }
}
