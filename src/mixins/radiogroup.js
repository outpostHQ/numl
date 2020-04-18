import WidgetMixin from "./widget";

export default class RadioGroupMixin extends WidgetMixin {
  constructor($host, options) {
    super($host, options);

    this.itemRole = options.itemRole;

    // uncontrolled behaviour
    if (!$host.hasAttribute('value')) {
      $host.setAttribute('value', '0');
    }

    this.setContext();
  }

  changed(name, value) {
    if (name === 'value') {
      this.set(value);
    }
  }

  setContext() {
    const { $host, itemRole } = this;

    $host.nuSetContext('radiogroup', {
      value: this.value,
      host: $host,
      mixin: this,
      itemRole: itemRole,
    });
  }

  set(value) {
    const { $host } = this;

    let announce;

    if (this.value === undefined) {
      announce = value !== $host.getAttribute('value');
    } else {
      announce = this.value !== value;
    }

    this.value = value;

    if (announce) {
      this.emitInput(value);

      this.setContext();
    }

    if (this.nuIsConnected) {
      $host.nuMixin('control')
        .then(controlMixin => controlMixin.apply(true, value));
    }
  }
}
