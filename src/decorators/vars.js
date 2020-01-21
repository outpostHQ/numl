import NuDecorator from './decorator';
import { error, log } from '../helpers';
import { injectCSS } from '../css';

const IGNORE_ATTRS = ['id', 'class', 'nu'];

export default class NuVars extends NuDecorator {
  static get nuTag() {
    return 'nu-vars';
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
    const parent = this.parentNode;

    const vars = this.nuOwnAttrs;

    if (JSON.stringify(this.nuVars) === JSON.stringify(vars)) return;

    if (this.nuVars) {
      Object.keys(this.nuVars).forEach((varName) => {
        parent.nuRemoveVar(varName);
      });
    }

    this.nuVars = vars;

    Object.entries(vars).forEach(([varName, varValue]) => {
      parent.nuSetVar(varName, varValue, this);
    });

    parent.nuVerifyChildren(true);
  }
}
