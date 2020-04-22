import Widget from './widget';

export default class MenuItemBehavior extends Widget {
  init() {
    super.init();

    const { $host } = this;

    $host.addEventListener('tap', (event) => {
      const menu = $host.nuContext.menu;

      if (menu && this.role !== 'checkbox' && !$host.nuHasAria('expanded')) {
        menu.submit(event.detail);
      }
    });
  }

  submit(value) {
    this.emit('input', value);
  }
}
