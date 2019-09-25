import NuDecorator from './decorator';
import { error } from '../helpers';
import { parseStyles, injectCSS } from '../css';

export default class NuVar extends NuDecorator {
  static get nuTag() {
    return 'nu-var';
  }

  static get nuAttrsList() {
    return ['name', 'value'];
  }

  nuConnected() {
    super.nuConnected();

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
      const fullValue = value
        .split('|')
        .map(val => `${name}:${val}`)
        .join('|')
        .replace(/\[.+?\]/gi, s => `[${name}:${s.slice(1, -1)}]`);
      const css = parent.nuGetCSS(context, 'var', fullValue);

      injectCSS(`var:${name}:${context}`, context, css);
    }, 0);
  }
}
