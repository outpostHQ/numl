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
    console.log('! menu set value', value, silent);

    this.value = value;

    const popup = this.context.popup;

    if (popup) {
      popup.close();
    }

    if (silent) return;

    this.emit('input', value);

    console.log('!', this.getTypedValue(this.value), this.type);

    this.doAction(this.getTypedValue(this.value), 'input');
  }
}
