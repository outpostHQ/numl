import WidgetBehavior from './widget';
import { isEqual } from '../helpers';

export default class OptionBehavior extends WidgetBehavior {
  static get params() {
    return {
      contextValue: true,
      provideValue: false,
    };
  }

  init() {
    this.forceLinkValue();
    this.host.nuOption = this;

    super.init();

    this.linkContext('listbox', (listbox) => {
      if (this.listbox) {
        this.removeOption();
      }

      this.listbox = listbox;

      if (listbox && this.hasValue) {
        this.addOption(listbox);
        this.setCurrent();
      }
    }, false);

    this.on('click', () => {
      if (this.listbox) {
        this.listbox.setValue(this.value);
      }
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
    this.log('link context value', value);
    if (this.listbox) {
      this.addOption();
      this.setCurrent();
    }
  }

  setValue(value, silent) {
    if (this.listbox && this.hasValue) {
      this.removeOption();
    }

    super.setValue(value, silent);

    if (this.listbox && this.hasValue) {
      this.addOption();
      this.setCurrent();
    }
  }

  addOption(listbox = this.listbox) {
    listbox.addOption(this);
  }

  setCurrent() {
    const bool = this.listbox ? isEqual(this.value, this.listbox.value) : false;

    this.setMod('current', bool);
    this.setAria('selected', bool);

    if (this.listbox && bool) {
      this.listbox.setAria('activedescendant', this.uniqId);
    }
  }

  removeOption() {
    if (this.listbox) {
      this.listbox.removeOption(this);
    }
  }
}
