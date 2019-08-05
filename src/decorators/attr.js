import NuDecorator from './decorator';
import { error } from '../helpers';

export default class NuTheme extends NuDecorator {
  static get nuTag() {
    return 'nd-attr';
  }

  static get nuAttrsList() {
    return ['name'];
  }

  nuMounted() {
    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;
    const name = this.getAttribute('name');

    if (!name) {
      return error(`attribute name is not specified`, this);
    }

    if (parent.hasAttribute(name)) {
      return warn(`parent already has the attribute '${name}'`, this);
    }

    setTimeout(() => parent.setAttribute(name, this.innerText.trim()), 0);
  }
}
