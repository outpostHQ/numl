import './toggle.css';
import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../attrs';
import NuElement from '../element';
import NuBtn from './btn';

export default class NuToggle extends NuBtn {
  static get nuTag() {
    return 'nu-toggle';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      disabled: '',
      value: '',
    });
  }

  constructor() {
    super();
  }

  nuTap() {
    this.nuSetMod('toggled', !this.nuHasMod('toggled'))

    this.nuEmit('tap');
  }
}
