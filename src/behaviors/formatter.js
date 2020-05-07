import WidgetBehavior from './widget';

export default class FormatterBehavior extends WidgetBehavior {
  static get formatter() {}
  static get localized() {
    return true;
  }

  init() {
    super.init();

    this.linkValue((val) => {
      this.value = val;
      this.apply();
    });
  }

  connected() {
    super.connected();

    this.apply();
  }

  changed(name, value) {
    super.changed(name, value);

    if (name in this.props) {
      if (this.isConnected) {
        this.apply();
      }
    }
  }

  apply() {
    if (!this.locale) {
      this.setLocale(this.lang);
    }

    this.host.innerHTML = this.constructor.formatter(this.value, this.locale, this);
  }
}
