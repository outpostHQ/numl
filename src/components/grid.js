import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../attrs';
import NuElement from './element';

class NuGrid extends NuElement {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuLayout() {
    return 'grid';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS
    });
  }
}

export default NuGrid;
