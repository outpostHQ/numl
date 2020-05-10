import WidgetBehavior from './widget';

export default class MenuBehavior extends WidgetBehavior {
  init() {
    this.options = new Set;

    super.init();

    const parentMenu = this.parentContext.menu;

    if (!parentMenu) {
      this.setContext('menu', this, true);
    }
  }

  setValue(value, silent) {
    this.value = value;

    const popup = this.context.popup;

    if (popup) {
      popup.close();
    }

    if (!silent) {
      this.emit('input', value);
      this.doAction(this.value, 'input');
    }
  }
}
