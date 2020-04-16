import NuElement from './element';
import { VAR_MOD } from '../variables';

export default class NuFormatter extends NuElement {
  static get nuTag() {
    return 'nu-formatter';
  }

  /**
   * @abstract
   * @param value
   * @param locale
   */
  static nuFormatter(value, locale) { }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) return;

    if (Object.keys(this.constructor.nuAttrs).includes(name)) {
      this.nuApply();
    }
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();

    if (this.nuFirstConnect) {
      this.nuSetContextHook('var:locale', (contextLocale) => {
        if (this.nuLocale !== contextLocale.value && !this.hasAttribute('lang')) {
          this.nuApply();
        }
      });
      this.nuSetMod(VAR_MOD, true);
    }
  }

  nuApply() {
    this.constructor.nuFormatter.then(module => module.default)
      .then(formatter => {
        const data = Object.keys(this.constructor.nuAttrs)
          .reduce((data, attr) => {
            data[attr] = this.getAttribute(attr);

            return data;
          }, {});

        const locale = data.locale || this.nuGetVar('locale') || 'en';

        this.nuLocale = locale;

        this.innerHTML = formatter(data.value, locale, data);
      });
  }
}
