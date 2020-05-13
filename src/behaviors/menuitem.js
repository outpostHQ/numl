import WidgetBehavior from './widget';

export default class MenuItemBehavior extends WidgetBehavior {
  static get params() {
    return {
      contextValue: true,
      linkHostValue: false,
    };
  }

  fromContextValue(value) {
    this.setMod('current', value === this.value);
  }
}
