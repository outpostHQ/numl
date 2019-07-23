import './table.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit,
  unit,
} from '../../helpers';;
import NuComponent from '../component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  padding: unit('--nu-cell-padding'),
});

export default class NuTable extends NuComponent {
  static get nuTag() {
    return 'table';
  }

  static get nuRole() {
    return 'grid';
  }

  static get nuAttrs() {
    return attrs;
  }

  constructor(props) {
    super(props);

    this.nuThemeStyles = false;
  }

  nuMounted() {
    super.nuMounted();
  }
}
