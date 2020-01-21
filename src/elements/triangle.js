import NuElement from './element';
import { convertUnit } from '../helpers';
import DirectionMixin from '../mixins/direction';

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

  static get nuDefaults() {
    return {
      display: 'block',
      dir: 'up',
      color: 'border',
      overflow: 'no',
      text: 'v-middle',
      height: '0',
      width: '0',
      border: '(1fs / 2) color(clear)',
      rotate: `0
        :dir-right[90deg]
        :dir-bottom[180deg]
        :dir-left[270deg]`,
    };
  }

  static get nuMixins() {
    return [DirectionMixin()];
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        font-size: inherit;
        line-height: inherit;
      }
      ${tag}:not([border]):not([border]) {
        border-top: 0;
        border-bottom-color: currentColor;
        border-bottom-width: calc(var(--nu-line-height) / 2);
      }
      ${tag}:not([size]):not([size]) {
        font-size: inherit;
        line-height: inherit;
      }
    `;
  }
}
