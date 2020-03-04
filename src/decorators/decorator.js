import NuBase from '../base';
import { THEME_ATTR } from '../themes';
import { RESPONSIVE_ATTR } from '../responsive';

const IGNORE_ATTRS = ['id', 'class', 'nu', 'for'];

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

  static get nuCombinators() {
    return {};
  }

  static nuCSS({ tag, css }) {
    return `${tag} { display: none !important; }`;
  }

  get nuParentContext() {
    return `#${this.parentNode.nuUniqId}`;
  }

  nuSetMod(name, value) {
    if (name !== RESPONSIVE_ATTR) {
      super.nuSetMod(name, value);
    }
  }

  get nuOwnAttrs() {
    return [...this.attributes].reduce((map, { name, value }) => {
      if (IGNORE_ATTRS.includes(name) || name.startsWith('nu-') || name.startsWith('aria-')) return map;

      map[name] = value;

      return map;
    }, {});
  }
}
