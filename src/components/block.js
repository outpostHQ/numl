import { GRID_ITEM_ATTRS, FLEX_ITEM_ATTRS } from '../attrs';
import { sizeUnit } from '../helpers';
import NuElement from './element';

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
