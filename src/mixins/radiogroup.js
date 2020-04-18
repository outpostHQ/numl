import WidgetMixin from "./widget";

export default class RadioGroupMixin extends WidgetMixin {
  constructor($host, options) {
    super($host, options);

    this.itemRole = options.itemRole;
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
      console.log('! radiogroup', this.value, value);

      this.emit('input', value);
    }

    $host.nuSetContext('radiogroup', this, true);

    if (this.nuIsConnected) {
      $host.nuMixin('control')
        .then(controlMixin => controlMixin.apply(true, value));
    }
  }
}
