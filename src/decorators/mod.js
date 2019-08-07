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
    const context = this.nuParentContext;

    if (!name) {
      return error(`modifier name is not specified`, this);
    }

    setTimeout(() => {
      Modifiers.set(name, parseStyles(this.innerText), context);
      [...parent.querySelectorAll(`
        ${context} [mod="${name}"],
        ${context} [mod*=" ${name} "],
        ${context} [mod^="${name} "],
        ${context} [mod$=" ${name}"]
      `)].forEach(el => {
        if (el.nuChanged) {
          el.nuChanged('mod', null, el.getAttribute('mod'), true);
        }
      });
    }, 0);
  }
}
