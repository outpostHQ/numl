import Widget from './widget';

export default class MenuBehavior extends Widget {
  init() {
    super.init();

    const { host } = this;

    const parentMenu = host.nuContext.menu;

    if (!parentMenu) {
      host.nuSetContext('menu', this, true);
    }

    this.setContext('submit', (detail) => {
      this.emit('input', detail);
      this.button.set(false);
    });
  }

  submit(value) {
    this.emit('input', value);

    const popup = this.host.nuContext.popup;

    if (popup) {
      popup.close();
    }
  }
}
