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
    super.setValue(value, silent);

    const popup = this.context.popup;

    if (popup) {
      popup.close();
    }
  }
}
