import NuBase from '../base';
import { THEME_ATTR } from '../themes';
import { RESPONSIVE_ATTR } from '../responsive';

export default class NuDecorator extends NuBase {
  static get nuTag() {
    return 'nu-decorator'; // abstract tag
  }

  static get nuDefaults() {
    return {
      display: 'none',
    };
  }

  static get nuAttrs() {
    return {
      [THEME_ATTR]: null,
      responsive: null,
      as: null,
    };
  }

  get nuParentContext() {
    return `#${this.parentNode.nuId}`;
  }

  nuSetMod(name, value) {
    if (name !== RESPONSIVE_ATTR) {
      super.nuSetMod(name, value);
    }
  }
}
