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
    this.props.disabled = (val) => {
      const bool = val != null;

      if (bool) {
        this.unlinkListBox();
      } else {
        this.linkListBox();
      }

      return bool;
    };

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
      this.doAction('input', this.value);
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
    this.unlinkListBox();

    super.setValue(value, silent);

    this.linkListBox();
  }

  linkListBox() {
    if (this.listbox && this.hasValue && !this.disabled) {
      this.addOption();
      this.setCurrent();
    }
  }

  unlinkListBox() {
    if (this.listbox && this.hasValue) {
      this.removeOption();
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
