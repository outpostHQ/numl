import ButtonBehavior from './button';
import { isEqual } from '../helpers';

export default class MenuItemBehavior extends ButtonBehavior {
  static get params() {
    return {
      contextValue: true,
      provideValue: false,
    };
  }

  init() {
    super.init();

    this.linkContext('menu', (menu) => {
      if (this.hasValue) {
        if (this.menu) {
          this.removeOption();
        }

        if (menu) {
          this.addOption(menu);
        }
      }

      this.menu = menu;
    }, false);
  }

  disconnected() {
    super.disconnected();

    const menu = this.menu;

    if (menu && this.hasValue) {
      this.removeOption();
    }
  }

  fromContextValue(value) {
    this.setMod('current', isEqual(value, this.value));
  }

  setValue(value, silent) {
    if (this.menu && this.hasValue) {
      this.removeOption();
    }

    super.setValue(value, silent);

    if (this.menu && this.hasValue) {
      this.addOption();
      this.setMod('current', isEqual(this.menu.value, this.value));
    }
  }

  addOption(menu = this.menu) {
    this.option = {
      value: this.value,
      item: this,
    };

    menu.addOption(this.option);
  }

  removeOption() {
    if (this.option) {
      this.menu.removeOption(this.option);
    }
  }
}
