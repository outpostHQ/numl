import LocalizedWidgetBehavior from './localized-widget';

export default class FormatterBehavior extends LocalizedWidgetBehavior {
  static get formatter() {}

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

    this.$host.innerHTML = this.constructor.formatter(this.value || Date(), this.locale, this);
  }
}
