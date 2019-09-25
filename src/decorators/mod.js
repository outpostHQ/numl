import NuDecorator from './decorator';
import Modifiers from '../modifiers';
import { error } from '../helpers';
import { parseStyles } from '../css';

export default class NuMod extends NuDecorator {
  static get nuTag() {
    return 'nu-mod';
  }

  static get nuAttrsList() {
    return ['name'];
  }

  nuConnected() {
    super.nuConnected();

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
        if (el.nuApplyCSS) {
          el.nuApplyCSS('mod', el.getAttribute('mod'), true);
        }
      });
    }, 0);
  }
}
