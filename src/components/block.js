import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  FLEX_ITEM_ATTRS,
} from '../helpers';
import NuComponent from './component';

const attrsList = [
  ...NuComponent.nuAttrs,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  ...FLEX_ITEM_ATTRS,
];

class NuBlock extends NuComponent {
  static get nuTag() {
    return 'block';
  }

  static get nuAttrs() {
    return attrsList;
  }
}

export default NuBlock;
