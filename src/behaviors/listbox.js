import WidgetBehavior from './widget';
import { deepQueryAll, isEqual } from '../helpers';

export default class ListBoxBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      provideValue: true,
    };
  }

  init() {
    // delete this.props['link-value'];

    // this.linkValue = true;
    this.host.nuMenu = this;
    this.options = [];

    super.init();

    this.setName('listbox');
    this.setContext('listbox', this, true);

    // this.on('blur', () => {
      // Clear active descendant
      // this.setActive();
    // });

    this.on('keydown', (evt) => {
      const options = this.orderedOptions;
      const activeOption = this.activeOption;

      if (!options.length || !options.includes(activeOption)) return;

      const index = options.indexOf(activeOption);

      let newValue;

      switch (evt.key) {
        case 'Home':
          newValue = options[0].value;

          break;
        case 'End':
          newValue = options.slice(-1)[0].value;

          break;
        case 'ArrowUp':
          if (index > 0) {
            newValue = options[index - 1].value;
          } else {
            return;
          }

          break;
        case 'ArrowDown':
          if (index < options.length - 1) {
            newValue = options[index + 1].value;
          } else {
            return;
          }

          break;
        default:
          return;
      }

      this.setValue(newValue);

      evt.preventDefault();
    });
  }

  setValue(value, silent) {
    if (value === this.value) return;

    super.setValue(value, silent);

    const popup = this.context.popup;

    if (popup) {
      popup.close();
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
