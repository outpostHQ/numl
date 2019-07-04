import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../helpers';
import NuComponent from './component';

const blockAttrsList = [
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS
];

class NuBlock extends NuComponent {
  static get nuTag() {
    return 'block';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(blockAttrsList);
  }
}

export default NuBlock;
