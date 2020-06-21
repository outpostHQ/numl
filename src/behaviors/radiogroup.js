import WidgetBehavior from "./widget";
import MenuBehavior from './menu';

const Menu = MenuBehavior.prototype;

export default class RadioGroupBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      provideValue: true,
      itemRole: 'radio',
      contextValue: true,
    };
  }

  init() {
    super.init();

    // Set default value if it's not set
    if (this.value == null) {
      this.setValue('0');
    }

    this.setContext('radiogroup', this);

    this.items = [];

    this.on('keydown', this.onKeyDown.bind(this));
  }

  addItem(item) {
    Menu.addItem.call(this, item);
  }

  removeItem(item) {
    Menu.removeItem.call(this, item);
  }

  setCurrent(item) {
    Menu.setCurrent.call(this, item);
  }

  getItemsInOrder() {
    return Menu.getItemsInOrder.call(this, '[nu-action]', 'nuButton');
  }

  onKeyDown(event) {
    Menu.onKeyDown.call(this, event);
  }
}
