import './icon.css';
import {
  convertUnit,
  GRID_ITEM_ATTRS,
} from '../../helpers';
import Nude from '../../nude';
import NuComponent from '../component';

const attrsList = NuComponent.nuAttrs;

Object.assign(attrsList, {
  ...GRID_ITEM_ATTRS,
  size(val) {
    return val ? {
      width: convertUnit(val || ''),
      height: convertUnit(val || ''),
    } : null;
  },
  name: '',
  inline(val) {
    return val ? {
      'margin-top': '-0.125em',
    } : null;
  },
});

export default class NuIcon extends NuComponent {
  static get nuTag() {
    return 'icon';
  }

  static get nuAttrs() {
    return attrsList;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'name') {
      Nude.iconLoader(value).then(svg => this.innerHTML = svg);
    }
  }

  nuUpdateTheme(attrTheme) {
    super.nuUpdateTheme(attrTheme);
  }
}
