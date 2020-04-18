import Widget from './widget';

export default class MenuMixin extends Widget {
  init() {
    super.init();

    const { $host } = this;

    const parentMenu = $host.nuContext.menu;

    if (!parentMenu) {
      $host.nuSetContext('menu', this);
    }
  }

  submit(value) {
    this.emit('input', value);

    const popup = this.$host.nuContext.popup;

    if (popup) {
      popup.close();
    }
  }
}
