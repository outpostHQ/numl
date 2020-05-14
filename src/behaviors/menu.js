import WidgetBehavior from './widget';

export default class MenuBehavior extends WidgetBehavior {
  init() {
    this.host.nuMenu = this;
    this.options = [];

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

  addOption(option) {
    this.options.push(option);
  }

  removeOption(option) {
    if (!this.options.includes(option)) {
      this.options.splice(this.options.indexOf(option), 1);
    }
  }

  getOptionByValue(value) {
    return this.options.find(option => option.value === value);
  }
}
