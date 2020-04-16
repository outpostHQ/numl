import NuElement from './element';
import { toCamelCase } from '../helpers';

const BaseAttrs = NuElement.nuAllAttrs;

/**
 * @class
 * @abstract
 */
export default class NuWidget extends NuElement {
  static get nuTag() {
    return 'nu-abstract-widget';
  }

  static get nuAttrs() {
    return {
      value: '',
      locale: '',
    };
  }

  /**
   * @abstract
   */
  static get nuWidget() {}

  /**
   * @abstract
   */
  static get nuTemplate() {}

  nuConnected() {
    super.nuConnected();

    const template = this.constructor.nuTemplate;

    if (this.nuFirstConnect && template) {
      const useShadow = this.getContext('useShadow');

      this.nuRoot = useShadow ? this.attachShadow({ mode: 'open' }) : this;

      this.nuRoot.innerHTML = template;
    }

    return Promise.resolve()
      .then(() => {
        if (!this.nuWidget) {
          return this.constructor.nuWidget
            .then(Component => {
              this.nuWidget = new Component(this, this.nuProps);
            });
        }
      }).then(() => {
        this.nuWidget.connected();
      });
  }

  nuDisconnected() {
    const widget = this.nuWidget;

    if (widget) {
      widget.disconnected();
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    const nuAttrs = this.constructor.nuAllAttrs;

    if (nuAttrs[name] || name in BaseAttrs) return;

    name = toCamelCase(name);

    if (!this.nuProps) {
      this.nuProps = {};
    }

    if (name === 'locale') {
      oldValue = this.nuWidget ? this.nuWidget.locale : null;
      value = value || this.nuGetVar('locale') || 'en';
    }

    this.nuProps[name] = value;

    if (!this.nuWidget) return;

    this.nuWidget.changed(name, oldValue, value);
  }
}
