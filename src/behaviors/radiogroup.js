import WidgetBehavior from "./widget";

export default class RadioGroupBehavior extends WidgetBehavior {
  constructor($host, options) {
    super($host, options);

    this.itemRole = options.itemRole || 'radio';
  }

  init() {
    this.props.value = (val) => {
      this.set(val, true);
    };

    super.init();

    // uncontrolled behaviour
    if (!this.value) {
      this.set('0');
    }
  }

  connected() {
    const { $host } = this;

    $host.nuSetContext('radiogroup', this, true);
  }

  set(value, silent) {
    const { $host } = this;

    if (this.value === value) return;

    this.value = value;

    if (!silent) {
      this.emit('input', value);
    }

    $host.nuSetContext('radiogroup', this, true);

    if (this.nuIsConnected) {
      $host.nu('control')
        .then(Control => Control.apply(true, value));
    }
  }
}
