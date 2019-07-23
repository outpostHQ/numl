import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  FLEX_ITEM_ATTRS,
} from '../helpers';
import NuComponent from './component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  ...FLEX_ITEM_ATTRS,
});

class NuBlock extends NuComponent {
  static get nuTag() {
    return 'block';
  }

  static get nuAttrs() {
    return attrs;
  }
}

export default NuBlock;
