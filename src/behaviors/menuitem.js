import ButtonBehavior from './button';

export default class MenuItemBehavior extends ButtonBehavior {
  static get params() {
    return {
      contextValue: true,
      provideValue: false,
    };
  }

  fromContextValue(value) {
    this.setMod('current', value === this.value);
  }
}
