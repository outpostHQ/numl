import NuDecorator from './decorator';
import { getAllAttrs } from '../base';

export default class NuAttrs extends NuDecorator {
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
    const id = this.getAttribute('for');
    const attrs = [...this.attributes];

    if (!parent.nuContext || !id) return;

    const define = [];

    attrs.forEach(attr => {
      if (attr.name === 'for') return;

      define.push({
        name: attr.name,
        value: attr.value,
      });
    });

    parent.nuSetContext(`attrs:${id}`, define);
  }

  nuDisconnected() {
    super.nuDisconnected();
  }
}
