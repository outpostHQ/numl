import NuElement from './element';

export default class NuFormatter extends NuElement {
  static get nuTag() {
    return 'nu-formatter';
  }

  /**
   * @abstract
   * @param value
   * @param locale
   */
  static nuFormat(value, locale) {}

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
      this.nuSetContextHook('locale', () => this.nuApply());
    }
  }

  nuApply() {
    const data = Object.keys(this.constructor.nuAttrs)
      .reduce((data, attr) => {
        data[attr] = this.getAttribute(attr);

        return data;
      }, {});

    const locale = data.locale || this.nuGetVar('locale') || 'en';

    this.innerHTML = this.constructor.nuFormat(data.value, locale, data);
  }
}
