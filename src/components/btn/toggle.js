import './toggle.css';
import {
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../helpers';
import NuComponent from '../component';
import NuBtn from './btn';

const nuAttrs = NuComponent.nuAttrs;

Object.assign(nuAttrs, {
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  disabled: '',
  value: '',
});

export default class NuToggle extends NuBtn {
  static get nuTag() {
    return 'toggle';
  }

  static get nuAttrs() {
    return nuAttrs;
  }

  constructor() {
    super();

    this.nuThemeStyles = false;
  }

  nuTap() {
    this.nuSetMod('toggled', !this.nuHasMod('toggled'))

    this.nuEmit('tap');
  }
}
