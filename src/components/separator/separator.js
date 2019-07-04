import './separator.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  convertUnit
} from '../../helpers';
import NuComponent from '../component';

const attrsList = [
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
];

export default class NuSeparator extends NuComponent {
  static get nuTag() {
    return 'separator';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(attrsList, ['orientation', 'size', 'color']);
  }

  constructor(props) {
    super(props);

    this.nuThemeProps = false;
    this.nuThemeInvert = true;
  }


  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'orientation':
        this.nuSetMod('vertical', value === 'vertical');
        this.nuSetAria('orientation', value === 'vertical' ? 'vertical' : null);
        break;
      case 'size':
        this.style.setProperty('--line-size', convertUnit(value || ''));
        break;
      case 'color':
        this.style.setProperty('--line-color', value || '');
        break;
    }
  }
}
