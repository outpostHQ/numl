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

    this.linkContext('listbox', (listbox) => {
      if (this.hasValue) {
        if (this.listbox) {
          this.removeOption();
        }

        if (listbox) {
          this.addOption(listbox);
        }
      }

      this.listbox = listbox;
    }, false);

    this.on('focus', () => {
      if (!this.listbox) return;

      this.listbox.setActiveDescendant(this);
    });
  }

  disconnected() {
    super.disconnected();

    const listbox = this.listbox;

    if (listbox && this.hasValue) {
      this.removeOption();
    }
  }

  fromContextValue(value) {
    this.setCurrent(isEqual(value, this.value));
  }

  setValue(value, silent) {
    if (this.listbox && this.hasValue) {
      this.removeOption();
    }

    super.setValue(value, silent);

    if (this.listbox && this.hasValue) {
      this.addOption();
      this.setCurrent(isEqual(this.listbox.value, this.value))
    }
  }

  setCurrent(bool) {
    this.setMod('current', bool);
    this.setAria('aria-selected', bool);
  }

  addOption(listbox = this.listbox) {
    this.option = {
      value: this.value,
      item: this,
    };

    listbox.addOption(this.option);
  }

  removeOption() {
    if (this.option) {
      this.listbox.removeOption(this.option);
    }
  }
}
