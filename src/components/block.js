import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  FLEX_ITEM_ATTRS,
} from '../attrs';
import NuElement from './element';

class NuBlock extends NuElement {
  static get nuTag() {
    return 'block';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      ...FLEX_ITEM_ATTRS,
    });
  }
}

export default NuBlock;
