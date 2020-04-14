import NuFlex from './flex';

export default class NuRadioGroup extends NuFlex {
  static get nuTag() {
    return 'nu-radiogroup';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  static get nuItemRole() {
    return 'radio';
  }

  static get nuAttrs() {
    return {
      value: '',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'value':
        this.nuSetValue(value, false);

        break;
    }
  }

  nuInit() {
    super.nuInit();

    if (!this.hasAttribute('value')) {
      this.setAttribute('value', '0');
    }

    this.nuSetRadioGroupContext();
  }

  nuSetRadioGroupContext() {
    this.nuSetContext('radiogroup', {
      value: this.nuValue,
      context: this,
      itemRole: this.constructor.nuItemRole,
    });
  }

  nuSetValue(value) {
    let announce;

    if (this.nuValue === undefined) {
      announce = value !== this.getAttribute('value');
    } else {
      announce = this.nuValue !== value;
    }

    this.nuValue = value;

    if (announce) {
      this.nuEmitInput(value);

      this.nuSetRadioGroupContext();
    }
  }
}
