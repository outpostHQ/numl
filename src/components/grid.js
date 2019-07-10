import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../helpers';
import NuComponent from './component';

const attrsList = [
  ...NuComponent.nuAttrs,
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...FLEX_ITEM_ATTRS,
  ...BLOCK_ATTRS
];

class NuGrid extends NuComponent {
  static get nuTag() {
    return 'grid';
  }

  static get nuAttrs() {
    return attrsList;
  }
}

export default NuGrid;
