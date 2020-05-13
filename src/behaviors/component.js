import { toCamelCase } from '../helpers';
import WidgetBehavior, { PROPS_LIST } from './widget';
import Components from '../components/index';

export default class ComponentBehavior extends WidgetBehavior {
  static get params() {
    return {
      primary: true,
      provideValue: false,
    };
  }

  constructor(host, params) {
    super(host, params);

    const loader = Components[this.params.component || params.split(/\s/)[0]];

    if (loader) {
      this.componentPromise = loader();
    }
  }

  init() {
    this.props.type = 'date';

    super.init();

    const { host } = this;

    this.componentPromise
      .then(Component => {
        const target = this.isShadowAllowed
          ? host.attachShadow({ mode: 'open' }) : host;

        this.Component = Component;

        this.component = new Component({
          target,
          props: this.componentProps,
        });

        this.component.$on('input', (event) => {
          this.setValue(event.detail, true);
          this.emit('input', event.detail);
          this.doActions(event.detail);
        });
      });
  }

  get componentProps() {
    const prototype = this.Component.prototype;

    const props = [...PROPS_LIST, 'host']
      .reduce((data, attr) => {
        if (attr === 'lang') {
          attr = 'locale';
        }

        if (attr in prototype) {
          data[toCamelCase(attr)] = this[attr];
        }

        return data;
      }, {});

    return props;
  }

  changed(name, value) {
    super.changed(name, value);

    if (name === 'lang') {
      name = 'locale';
    }

    if (this.component) {
      const prototype = this.Component.prototype;

      if (name in prototype) {
        this.set({ [name]: this[name] });
      }
    }
  }

  set(data) {
    if (typeof data === 'object' && this.component) {
      this.component.$set(data);

      return true;
    } else {
      return false;
    }
  }

  setValue(value, silent) {
    if (value === this.value) return;

    super.setValue(value, silent || !this.component);

    this.set({ value });
  }
}
