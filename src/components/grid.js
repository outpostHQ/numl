import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../helpers';
import NuComponent from './component';

const gridAttrsList = [
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS
];

class NuGrid extends NuComponent {
  static get nuTag() {
    return 'grid';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(gridAttrsList);
  }
}

export default NuGrid;
