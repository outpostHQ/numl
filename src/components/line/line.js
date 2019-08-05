import './line.css';
import {
  unit,
} from '../../helpers';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
} from '../../attrs';
import NuElement from '../element';

export default class NuLine extends NuElement {
  static get nuTag() {
    return 'nu-line';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      orientation: '',
      size: unit('--nu-line-size'),
      color: '--nu-line-color',
    });
  }

  constructor() {
    super();
  }


  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'orientation') {
      this.nuSetMod('vertical', value === 'vertical');
      this.nuSetAria('orientation', value === 'vertical' ? 'vertical' : null);
    }
  }
}
