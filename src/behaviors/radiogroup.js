import WidgetBehavior from "./widget";

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
  }
}
