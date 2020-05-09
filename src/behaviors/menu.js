import WidgetBehavior from './widget';

export default class MenuBehavior extends WidgetBehavior {
  init() {
    this.options = new Set;

    super.init();

    const parentMenu = this.parentContext.menu;

    if (!parentMenu) {
      this.setContext('menu', this, true);
    }

    this.bindAction('submit', (val) => this.submit(val));

    this.linkValue();
  }

  submit(value) {
    this.emit('input', value);

    this.value = value;

    const popup = this.context.popup;

    if (popup) {
      popup.close();
    }

    console.log('!', this.getTypedValue(this.value), this.type);

    this.doAction(this.getTypedValue(this.value), 'submit');
  }
}
