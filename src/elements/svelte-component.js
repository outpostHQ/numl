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

  nuConnected() {
    super.nuConnected();

    if (!this.nuFirstConnect) return;

    this.constructor.nuComponent.then(module => module.default || module)
      .then(Component => {
        const target = this.nuContext.useShadow ? this.attachShadow({ mode: 'open' }) : this;

        this.nuComponent = new Component({
          target,
          props: this.nuProps,
        });

        this.nuComponent.$on('input', (event) => {
          this.nuEmitInput(event.detail);
        });

        this.nuSetContextHook('var:locale', () => {
          this.nuComponent.$set(this.nuProps);
        });
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

    data.locale = data.locale || this.nuGetVar('locale');

    return data;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (this.nuComponent) {
      this.nuComponent.$set(this.nuProps);
    }
  }
}
