import './table.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit
} from '../../helpers';;
import NuComponent from '../component';

const tableAttrsList = [
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
];

export default class NuTable extends NuComponent {
  static get nuTag() {
    return 'table';
  }

  static get nuRole() {
    return 'grid';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(tableAttrsList);
  }

  constructor(props) {
    super(props);

    this.nuThemeStyles = false;
  }

  nuMounted() {
    super.nuMounted();

    if (this.getAttribute('theme') == null) {
      this.style.setProperty('--current-color', 'var(--minor-color)');
      this.style.setProperty('--current-background-color', 'var(--minor-background-color)');
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'padding') {
      this.style.padding = '';
      this.style.setProperty('--cell-padding', convertUnit(value) || '');
    }
  }
}
