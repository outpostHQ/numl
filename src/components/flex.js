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
      this.nuSetChildrenProp('flow-gap', 'var(--nu-v-gap)');
    } else {
      this.nuSetChildrenProp('flow-gap', 'var(--nu-h-gap)');
    }

    if (flowAttr && flowAttr.includes(' wrap')) {
      this.nuFlexWrap = true;
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'flow') {
      this.nuSetFlowGap();
    } else if (name === 'gap') {
      const values = (value || '').split(/\s/);

      let hGap, vGap;

      this.nuSetFlowGap();

      if (values.length > 1) {
        hGap = this.nuFlexWrap || this.nuFlexFlow === 'row' ? values[1] : '';
        vGap = this.nuFlexWrap || this.nuFlexFlow === 'column' ? values[0] : '';
      } else {
        hGap = this.nuFlexWrap || this.nuFlexFlow === 'row' ? value : '';
        vGap = this.nuFlexWrap || this.nuFlexFlow === 'column' ? value : '';
      }

      this.nuSetProp('h-gap', hGap, true);
      this.nuSetProp('v-gap', vGap, true);
      this.nuSetChildrenProp('item-h-gap', hGap, true);
      this.nuSetChildrenProp('item-v-gap', vGap, true);
    }
  }

  nuMounted() {
    super.nuMounted();

    this.nuSetFlowGap();
  }
}

export default NuGrid;
