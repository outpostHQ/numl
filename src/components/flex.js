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
  ...BLOCK_ATTRS,
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

  nuSetFlowGap() {
    const flowAttr = this.getAttribute('flow');

    this.nuFlexFlow = 'row';
    this.nuFlexWrap = false;

    if (flowAttr && flowAttr.startsWith('column')) {
      this.nuFlexFlow = 'column';
      this.nuSetProp('flow-gap', 'var(--nu-v-gap)');
    } else {
      this.nuSetProp('flow-gap', 'var(--nu-h-gap)');
    }

    if (flowAttr && flowAttr.includes(' wrap')) {
      this.nuFlexWrap = true;
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'gap' || name === 'flow') {
      const gap = this.nuComputeStyle('gap', this.getAttribute('gap'));
      const values = (gap || '').split(/\s/);

      let hGap = values[1] || gap, vGap = values[0];

      this.nuSetFlowGap();
      this.nuSetProp('h-gap', this.nuFlexWrap || this.nuFlexFlow === 'row' ? hGap : '', true);
      this.nuSetProp('v-gap', this.nuFlexWrap || this.nuFlexFlow === 'column' ? vGap : '', true);
    }
  }

  nuMounted() {
    super.nuMounted();

    this.nuSetFlowGap();
  }
}

export default NuGrid;
