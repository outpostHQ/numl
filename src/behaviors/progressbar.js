import WidgetBehavior, { NUMBER_TYPE } from './widget';

export default class ProgressBarBehavior extends WidgetBehavior {
  init() {
    this.props.value = NUMBER_TYPE(0);
    this.props.min = NUMBER_TYPE(0);
    this.props.max = NUMBER_TYPE(100);

    super.init();
  }

  connected() {
    super.connected();

    this.apply();
  }

  changed(name, value) {
    super.changed(name, value);

    if (this.isConnected) {
      this.apply();
    }
  }

  apply() {
    let { min, max, value, host } = this;

    if (min > max) {
      max = min;
    }

    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    const propValue = (value - min) / (max - min);

    host.style.setProperty('--nu-value', String(Number(propValue.toFixed(4))));
  }

  fromHostValue(value, silent) {
    this.value = value;
    this.apply();
  }
}
