import NuDecorator from './decorator';
import { getAllAttrs } from '../base';
import { devMode, log } from '../helpers';

export default class NuStyle extends NuDecorator {
  static get nuTag() {
    return 'nu-attrs';
  }

  static get nuAttrsList() {
    return ['for'].concat(getAllAttrs());
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) {
      return;
    }

    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;
    const id = this.nuGetAttr('for', true);

    if (!parent.nuContext || !id) return;

    const attrs = [...this.attributes];
    const define = [];

    attrs.forEach(attr => {
      const attrName = attr.name;

      if (attrName === 'for'
        || attrName === 'nu'
        || attrName.startsWith('nu-')
        || attrName.startsWith('aria-')) return;

      define.push({
        name: attrName,
        value: this.nuGetAttr(attrName),
      });
    });

    parent.nuSetContext(`attrs:${id}`, define);

    [...parent.querySelectorAll(`[nu-id^="${id}"], [as="${id}"][nu]`)]
      .forEach(el => {
        log('reapply context attrs', { el });

        el.nuSetContextAttrs();
      });
  }

  nuDisconnected() {
    super.nuDisconnected();
  }
}
