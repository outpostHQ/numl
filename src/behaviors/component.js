import { toCamelCase } from '../helpers';
import LocalizedWidgetBehavior from './localized-widget';
import Components from '../components/index';

export default class ComponentBehavior extends LocalizedWidgetBehavior {
  constructor($host, value) {
    super($host, value);

    const loader = Components[value];

    if (loader) {
      this.componentPromise = loader();
    }
  }

  init() {
    super.init();

    const { $host } = this;

    if (!$host.hasAttribute('type')) {
      $host.setAttribute('type', 'date');
    }

    this.componentPromise
      .then(Component => {
        const target = this.context.useShadow ? $host.attachShadow({ mode: 'open' }) : this;

        this.Component = Component;

        this.component = new Component({
          target,
          props: this.componentProps,
        });

        this.component.$on('input', (event) => {
          $host.nuEmitInput(event.detail);
        });
      });
  }

  get componentProps() {
    const prototype = this.Component.prototype;

    return this.propsList
      .reduce((data, attr) => {
        if (attr in prototype) {
          data[toCamelCase(attr)] = this[attr];
        }

        return data;
      }, {});
  }

  changed(name, value) {
    super.changed(name, value);

    if (name === 'lang') {
      name = 'locale';
    }

    if (this.component) {
      this.component.$set({ [name]: this[name] });
    }
  }
}
