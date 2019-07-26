import './icon.css';
import {
  convertUnit,
} from '../../helpers';
import {
  GRID_ITEM_ATTRS,
} from '../../attrs';
import Nude from '../../nude';
import NuElement from '../element';

export default class NuIcon extends NuElement {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ITEM_ATTRS,
      size(val) {
        return val ? {
          width: convertUnit(val || ''),
          height: convertUnit(val || ''),
        } : null;
      },
      name: '',
      inline(val) {
        return val != null ? {
          'bottom': '.0675em',
        } : null;
      },
    });
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
