import NuBase from '../elements/base';
import { THEME_ATTR } from '../themes';
import { RESPONSIVE_ATTR } from '../responsive';

export const IGNORE_ATTRS = ['id', 'class', 'nu', 'for'];

export default class NuDefinition extends NuBase {
  static get nuTag() {
    return 'nu-definition'; // abstract tag
  }

  static get nuStyles() {
    return {
      display: 'none',
    };
  }

  static get nuGenerators() {
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
    return [`${tag} { display: none !important; }`];
  }

  get nuParentSelector() {
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

  nuConnected() {
    super.nuConnected();

    this.nuDefinition = true;
  }
}
