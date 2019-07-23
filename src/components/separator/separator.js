import './separator.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  convertUnit,
  unit,
} from '../../helpers';
import NuComponent from '../component';

const nuAttrs = NuComponent.nuAttrs;

Object.assign(nuAttrs, {
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...FLEX_ITEM_ATTRS,
  orientation: '',
  size: unit('--nu-line-size'),
  color: '--nu-line-color',
});

export default class NuSeparator extends NuComponent {
  static get nuTag() {
    return 'separator';
  }

  static get nuRole() {
    return 'separator';
  }

  static get nuAttrs() {
    return nuAttrs;
  }

  constructor(props) {
    super(props);

    this.nuThemeProps = false;
    this.nuThemeInvert = true;
  }


  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'orientation') {
      this.nuSetMod('vertical', value === 'vertical');
      this.nuSetAria('orientation', value === 'vertical' ? 'vertical' : null);
    }
  }
}
