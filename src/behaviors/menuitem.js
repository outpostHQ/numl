import WidgetBehavior from './widget';

export default class MenuItemBehavior extends WidgetBehavior {
  static get params() {
    return {
      injector: true,
    };
  }

  init() {
    super.init();
  }

  linkContextValue(value) {
    this.setMod('current', value === this.value);
  }
}
