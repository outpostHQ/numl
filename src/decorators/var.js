import NuDecorator from './decorator';
import { error } from '../helpers';
import { injectCSS } from '../css';

const IGNORE_ATTRS = ['id', 'class'];

export default class NuVar extends NuDecorator {
  static get nuTag() {
    return 'nu-var';
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();

    if (this.nuObserve) return;

    const observer = new MutationObserver(() => this.nuApply());

    observer.observe(this, {
      characterData: false,
      attributes: true,
      childList: false,
      subtree: false
    });
  }

  nuApply() {
    console.log('var apply!');
    const parent = this.parentNode;

    const vars = {};

    [...this.attributes].map(({ name, value }) => {
      if (IGNORE_ATTRS.includes(name)) return;

      vars[name] = value;
    });

    if (this.nuVars) {
      Object.keys(this.nuVars).forEach((varName) => {
        delete parent.nuContext[`var:${varName}`];
      });
    }

    this.nuVars = vars;

    Object.entries(vars).forEach(([varName, varValue]) => {
      parent.nuContext[`var:${varName}`] = {
        context: parent,
        value: varValue,
      };
    });

    parent.nuVerifyChild();
  }
}
