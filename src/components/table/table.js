import './table.css';
import {
  unit,
} from '../../helpers';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../attrs';
import NuElement from '../element';

export default class NuTable extends NuElement {
  static get nuTag() {
    return 'table';
  }

  static get nuRole() {
    return 'grid';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      padding: unit('--nu-cell-padding'),
    });
  }

  constructor(props) {
    super(props);

    this.nuThemeStyles = false;
  }

  nuMounted() {
    super.nuMounted();
  }
}
