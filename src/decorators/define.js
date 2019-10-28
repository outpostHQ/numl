import NuDecorator from './decorator';

export default class NuDefine extends NuDecorator {
  static get nuTag() {
    return 'nu-define';
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
    const attrs = [...this.attributes];
    const context = parent.nuContext;

    if (!context || !name) return;

    const define = [];

    attrs.forEach(attr => {
      if (attr.name === 'name') return;

      define.push({
        name: attr.name,
        value: attr.value,
      });
    });

    context[`define:${name}`] = define;
  }
}
