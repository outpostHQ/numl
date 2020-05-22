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
    delete this.props['link-value'];

    this.linkValue = true;

    super.init();

    this.linkContext('listbox', (menu) => {
      if (this.hasValue) {
        if (this.listbox) {
          this.removeOption();
        }

        if (menu) {
          this.addOption(menu);
        }
      }

      this.listbox = menu;
    }, false);
  }

  disconnected() {
    super.disconnected();

    const menu = this.listbox;

    if (menu && this.hasValue) {
      this.removeOption();
    }
  }

  fromContextValue(value) {
    this.setMod('current', isEqual(value, this.value));
  }

  setValue(value, silent) {
    if (this.listbox && this.hasValue) {
      this.removeOption();
    }

    super.setValue(value, silent);

    if (this.listbox && this.hasValue) {
      this.addOption();
      this.setMod('current', isEqual(this.listbox.value, this.value));
    }
  }

  addOption(menu = this.listbox) {
    this.option = {
      value: this.value,
      item: this,
    };

    menu.addOption(this.option);
  }

  removeOption() {
    if (this.option) {
      this.listbox.removeOption(this.option);
    }
  }
}
