import NuDecorator from './decorator';
import { error } from '../helpers';
import { parseStyles, injectCSS } from '../css';

export default class NdVar extends NuDecorator {
  static get nuTag() {
    return 'nd-var';
  }

  static get nuAttrsList() {
    return ['name', 'value'];
  }

  nuMounted() {
    super.nuMounted();

    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;
    const name = this.getAttribute('name');
    const value = this.getAttribute('value');
    const context = this.nuParentContext;

    if (!name || !value) {
      return error(`modifier name or value is not specified`, this);
    }

    setTimeout(() => {
      const fullValue = value.split('|').map(val => `${name}:${val}`).join('|');
      const css = parent.nuGetCSS(context, 'var', fullValue);

      injectCSS(`var:${name}:${context}`, context, css);
    }, 0);
  }
}
