import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../helpers';
import Nude, { splitDimensions } from '../nude';
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

  nuSetFlexFlow() {
    const flowAttr = this.getAttribute('flow');

    this.nuFlexFlow = flowAttr && flowAttr.startsWith('column') ? 'column' : 'row';
    this.nuFlexWrap = flowAttr && flowAttr.includes(' wrap');
    this.nuFlexReverse = flowAttr && flowAttr.includes('-reverse');

    const gapAttr = this.getAttribute('gap');
    const gap = this.nuComputeStyle('gap', gapAttr);

    const values = splitDimensions(gap || '');
    const hGap = values[1] || gap, vGap = values[0] || gap;

    this.nuSetMod('flow', this.nuFlexFlow);
    this.nuSetMod('wrap', this.nuFlexWrap);
    this.nuSetMod('reverse', this.nuFlexReverse);

    Nude.CSS.generateRules(this.tagName, {
      flow: flowAttr,
      gap: gapAttr,
    }, {
      'flex-flow': flowAttr,
      '--nu-flow-gap': this.nuFlexFlow === 'column' ? 'var(--nu-v-gap)' : 'var(--nu-h-gap)',
      '--nu-h-gap': this.nuFlexWrap || this.nuFlexFlow === 'row' ? hGap : '',
      '--nu-v-gap': this.nuFlexWrap || this.nuFlexFlow === 'column' ? vGap : '',
    });
  }

  nuChanged(name, oldValue, value) {
    if (name === 'gap' || name === 'flow') {
      this.nuSetFlexFlow();
    } else {
      super.nuChanged(name, oldValue, value);
    }
  }

  nuMounted() {
    super.nuMounted();

    if (!this.hasAttribute('flow') && !this.hasAttribute('gap')) {
      this.nuSetFlexFlow();
    }
  }
}

export default NuGrid;
