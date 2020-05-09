import WidgetBehavior from './widget';

export default class MenuItemBehavior extends WidgetBehavior {
  init() {
    super.init();

    this.on('tap', () => {
      if (this.value != null) {
        this.doAction(this.value, 'submit');
      }
    });

    this.linkValue();
    this.linkContext('value', (val) => {
      this.setMod('current', val === this.value);
    }, 'parentValue');
  }

  submit(value) {
    this.emit('input', value);
  }
}
