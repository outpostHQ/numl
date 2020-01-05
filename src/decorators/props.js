import NuDecorator from './decorator';
import { convertUnit, log } from '../helpers';
import { injectCSS } from '../css';

export default class NuProps extends NuDecorator {
  static get nuTag() {
    return 'nu-props';
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
    const context = this.nuParentContext;
    const props = this.nuOwnAttrs;

    if (JSON.stringify(this.nuProps) === JSON.stringify(props)) return;

    this.nuProps = props;

    Object.entries(props).forEach(([varName, varValue]) => {
      const value = varValue.split('|').map(val => `${varName}#${convertUnit(val)}`).join('|');

      const css = parent.nuGetCSS(context, 'prop', value);

      injectCSS(`prop:${varName}:${context}`, context, css);

      log('apply property', { context: parent, name: varName, value: value });
    });

    parent.nuVerifyChildren(true);
  }
}
