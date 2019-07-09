import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../helpers';
import NuComponent from './component';

const attrsList = [
  ...NuComponent.nuAttrs,
  ...FLEX_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...FLEX_ITEM_ATTRS,
  ...BLOCK_ATTRS
];

const propAttrs = [
  ...NuComponent.nuPropAttrs,
  'flow', 'height', 'width', 'gap',
];

class NuGrid extends NuComponent {
  static get nuTag() {
    return 'flex';
  }

  static get nuAttrs() {
    return attrsList;
  }

  static get nuPropAttrs() {
    return propAttrs;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'gap') {
      const values = value.split(/\s/);

      if (values.length > 1) {
        this.nuSetProp('v-gap', values[0], true);
        this.nuSetProp('h-gap', values[1], true);
      } else {
        this.nuSetProp('v-gap', value, true);
        this.nuSetProp('h-gap', value, true);
      }
    }
  }
}

export default NuGrid;
