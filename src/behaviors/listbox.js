/**
 * @see https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
 */

import WidgetBehavior from './widget';
import { deepQueryAll, isEqual, scrollParentToChild } from '../helpers';

export default class ListBoxBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      provideValue: true,
    };
  }

  init() {
    this.isPopup = this.host.hasAttribute('nu-popup');

    if (this.isPopup) {
      this.forceLinkValue();
    }

    this.host.nuListBox = this;
    this.options = [];

    super.init();

    this.setName('listbox');
    this.setContext('listbox', this, true);

    // this.on('blur', () => {
    // Clear active descendant
    // this.setActive();
    // });

    this.linkContext('button', (button) => {
      if (button && this.linkValue) {
        button.listbox = this;

        if (button.popup) {
          button.setAria('haspopup', 'listbox');
        }
      }
    });

    this.on('keydown', (evt) => this.onKeyDown(evt));
  }

  setValue(value, silent) {
    if (value === this.value) return;

    super.setValue(value, silent);

    setTimeout(() => {
      const activeOption = this.activeOption;

      if (activeOption) {
        scrollParentToChild(this.host, activeOption.host);
      }
    });

    // const popup = this.context.popup;
    //
    // if (popup) {
    //   popup.close();
    // }
  }

  onKeyDown(evt) {
    const options = this.orderedOptions;
    const activeOption = this.activeOption;

    if (!options.length || (activeOption && !options.includes(activeOption))) return;

    const index = options.indexOf(activeOption);

    let newValue;

    switch (evt.key) {
      case 'Home':
        if (!this.isEdgeMoveAllowed()) return;

        newValue = options[0].value;

        break;
      case 'End':
        if (!this.isEdgeMoveAllowed()) return;

        newValue = options.slice(-1)[0].value;

        break;
      case 'ArrowUp':
        if (index > 0) {
          newValue = options[index - 1].value;
        } else if (index === -1) {
          newValue = options.slice(-1)[0].value;
        } else {
          return;
        }

        this.openPopup();

        break;
      case 'ArrowDown':
        if (index < options.length - 1) {
          newValue = options[index + 1].value;
        } else if (index === -1) {
          newValue = options[0].value;
        } else {
          return;
        }

        this.openPopup();

        break;
      default:
        return;
    }

    this.setValue(newValue);

    evt.preventDefault();
  }

  isEdgeMoveAllowed() {
    if (!this.isPopup) return true;

    const popup = this.host.nuPopup;

    if (popup) {
      return popup.isOpen;
    }

    return true;
  }

  openPopup() {
    if (!this.isPopup) return;

    const popup = this.host.nuPopup;

    if (!popup || popup.isOpen) return;

    if (this.button) {
      this.button.set(true, true);
    }
  }

  addOption(option) {
    if (!this.options.includes(option)) {
      this.options.push(option);
    }
  }

  get orderedOptions() {
    const ownHosts = this.options.map(option => option.host);

    return deepQueryAll(this.host, '[nu-option]')
      .filter(host => ownHosts.includes(host))
      .map(host => this.options.find(option => option.host === host))
      .filter(option => option);
  }

  get activeOption() {
    return this.options.find(option => option.value === this.value);
  }

  removeOption(option) {
    if (!this.options.includes(option)) {
      this.options.splice(this.options.indexOf(option), 1);
    }
  }

  getOptionByValue(value) {
    return this.options.find(option => isEqual(option.value, value));
  }
}
