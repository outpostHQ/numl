import NuElement from './element';
import { toCamelCase } from '../helpers';

const BaseAttrs = NuElement.nuAllAttrs;

export default class NuSvelteComponent extends NuElement {
  static get nuTag() {
    return 'nu-abstract-sveltecomponent';
  }

  static get nuAttrs() {
    return {
      value: '',
      locale: '',
    };
  }

  async nuConnected() {
    super.nuConnected();

    if (!this.nuFirstConnect) return;

    const Component = await this.constructor.nuComponent;

    const target = this.hasAttribute('shadow-root') ? this.attachShadow({ mode: 'open' }) : this;

    this.nuComponent = new Component({
      target,
      props: this.nuProps,
    });

    this.nuComponent.$on('input', (event) => {
      this.nuEmitInput(event.detail);
    });
  }

  get nuProps() {
    const nuAttrs = this.constructor.nuAllAttrs;

    const data = Object.keys(nuAttrs)
      .reduce((data, attr) => {
        if (nuAttrs[attr] || attr in BaseAttrs) return data;

        data[toCamelCase(attr)] = this.getAttribute(attr);

        return data;
      }, {});

    data.locale = data.locale || this.nuGetVar('locale') || 'en';

    return data;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (this.nuComponent) {
      this.nuComponent.$set(this.nuProps);
    }
  }
}
