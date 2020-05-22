import WidgetBehavior from './widget';
import { deepQueryAll, isEqual } from '../helpers';

export default class MenuBehavior extends WidgetBehavior {
  init() {
    this.host.nuMenu = this;
    this.options = [];

    super.init();

    const parentMenu = this.parentContext.menu;

    this.setName('listbox');

    if (!parentMenu) {
      this.setContext('listbox', this, true);
    }

    this.on('blur', () => {
      // Clear active descendant
      this.setActiveDescendant();
    });

    this.on('keydown', (evt) => {
      const optionHosts = this.optionHosts;
      const activeOption = document.activeElement;

      if (!optionHosts.length || !optionHosts.includes(activeOption)) return;

      const index = optionHosts.indexOf(activeOption);

      switch (evt.key) {
        case 'Home':
          optionHosts[0].focus();

          break;
        case 'End':
          optionHosts.slice(-1)[0].focus();

          break;
        case 'ArrowUp':
          if (index > 0) {
            optionHosts[index - 1].focus();
          }

          break;
        case 'ArrowDown':
          if (index < optionHosts.length - 1) {
            optionHosts[index + 1].focus();
          }

          break;
        default:
          return;
      }

      evt.preventDefault();
    });
  }

  setValue(value, silent) {
    super.setValue(value, silent);

    const popup = this.context.popup;

    if (popup) {
      popup.close();
    }
  }

  setActiveDescendant(option) {
    this.setAria('activedescendant', option ? option.uniqId : null);
  }

  addOption(option) {
    this.options.push(option);
  }

  get optionHosts() {
    const ownHosts = this.options.map(option => option.item.host);

    return deepQueryAll(this.host, '[nu-option]')
      .filter(host => ownHosts.includes(host));
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
