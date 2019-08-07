import NuDecorator from './decorator';
import Modifiers from '../modifiers';
import { error } from '../helpers';
import { parseStyles } from '../css';

export default class NdMod extends NuDecorator {
  static get nuTag() {
    return 'nd-mod';
  }

  static get nuAttrsList() {
    return ['name'];
  }

  nuMounted() {
    super.nuMounted();

    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;
    const name = this.getAttribute('name');

    if (!name) {
      return error(`modifier name is not specified`, this);
    }

    setTimeout(() => Modifiers.set(name, parseStyles(this.innerText), this.nuParentContext), 0);
  }
}
