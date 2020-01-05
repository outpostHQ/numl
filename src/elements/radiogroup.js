import NuFlex from './flex';

export default class NuRadioGroup extends NuFlex {
  static get nuTag() {
    return 'nu-radiogroup';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'value':
        this.nuSetValue(value, false);

        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    this.addEventListener('value', (event) => {
      const value = event.detail;

      if (value === this.nuValue) {
        this.nuSetValue(value);
      }
    });

    this.addEventListener('pressed', (event) => {
      const pressed = event.detail;

      if (pressed) {
        this.nuSetValue(event.target.nuValue);
      }
    });
  }

  nuSetValue(value, announce = true) {
    if (this.nuValue === value) announce = false;

    this.nuValue = value;

    setTimeout(() => {
      if (this.nuValue !== value) return;

      [...this.childNodes].forEach(el => {
        if (!el.nuSetPressed) return;

        el.nuSetPressed(el.nuValue === value, true);
      });

      if (announce) {
        this.nuEmit('input', value);
      }
    }, 0);
  }
}
