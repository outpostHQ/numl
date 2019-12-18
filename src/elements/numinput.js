import NuInput from './input';

export function stripZeros(val) {
  return val.replace(/\.([0-9]*[^0]|)0+($|%)/, (s, s1, s2) => !`${s1}${s2}`.match(/^(%|)$/) ? `.${s1}${s2}` : s2);
}

function toFormat(num, precision = 2) {
  num = num.replace(/,/g, '');

  if (precision) {
    num = (Number(num).toFixed(precision));
  } else {
    num = String(parseInt(num, 10));
  }

  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numberFromString(num) {
  if (typeof num === 'number') return num;

  if (typeof num !== 'string') return null;

  let value = Number(num.replace(/,/g, ''));

  if (value !== value) return null;

  return value;
}

const ACCEPTABLE_KEYS = '-0123456789.,';

export default class NuNumInput extends NuInput {
  static get nuTag() {
    return 'nu-numinput';
  }

  static get nuAttrs() {
    return {
      prefix: '',
      suffix: '',
      precision: '',
      type: '',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} input {
        text-align: inherit;
      }
      ${tag} input::-webkit-inner-spin-button, ${tag} input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `;
  }

  nuGetRef() {
    const isNewRef = !this.nuRef;

    this.nuRef = this.querySelector('input');

    if (!this.nuRef) {
      const input = document.createElement('input');

      input.type = 'text';
      input.inputMode = 'decimal';

      this.appendChild(input);

      this.nuRef = input;
    }

    if (isNewRef) {
      this.nuRef.addEventListener('input', (event) => {
        event.stopPropagation();
      });

      this.nuRef.addEventListener('change', (event) => {
        this.nuGetValueFromRef();

        event.stopPropagation();
      });

      this.nuRef.addEventListener('keydown', (event) => {
        this.nuValidateRefValue(event);

        if (event.key === 'Enter') {
          this.nuGetValueFromRef();

          this.nuReset();
        }
        if (!event.metaKey && event.key.length === 1 && !ACCEPTABLE_KEYS.includes(event.key)) {
          event.preventDefault();
        }
      });

      this.nuRef.addEventListener('focus', (evt) => {
        this.nuRef.type = 'number';
        this.nuReset();

        evt.preventDefault();

        setTimeout(() => {
          this.nuRef.focus();
          this.nuReset();
        }, 50);
      });

      this.nuRef.addEventListener('blur', () => {
        this.nuGetValueFromRef();

        this.nuReset();
      });
    }

    return this.nuRef;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'value':
        this.nuSetValue(Number(value));

        break;
      case 'placeholder':
        break;
      case 'disabled':
        this.nuGetRef();

        if (this.nuRef) {
          this.nuRef.disabled = value != null;
          this.nuSetFocusable(value != null);
        }

        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    setTimeout(() => {
      this.nuChanged('disabled', '', this.getAttribute('disabled'));

      if (this.nuRef && !this.nuRef.hasAttribute('placeholder')) {
        this.nuRef.setAttribute('placeholder', '...');
      }

      this.nuReset();
    });
  }

  /**
   *
   * @param {Number} value
   * @param {Boolean} force
   */
  nuSetValue(value, force = false) {
    this.nuGetRef();

    if (value == null) {
      value = this.nuValue;
    } else {
      value = value ? value : 0;
    }

    value = this.nuFixValue(value);

    if (value !== value) return; // NaN check

    this.nuValue = value;

    const formattedValue = this.nuGetFormattedValue(value);

    if (formattedValue !== this.nuRef.value) {
      this.nuRef.value = formattedValue;
    }

    if (!force) {
      this.nuEmit('input', numberFromString(this.nuFixValue()));
    }
  }

  nuFixValue(value) {
    value = (value != null ? value : this.nuValue) || '0';

    const max = numberFromString(this.getAttribute('max'));
    const min = numberFromString(this.getAttribute('min'));

    if (max != null && numberFromString(value) > max) {
      value = max;
    } else if (min != null && numberFromString(value) < min) {
      value = min;
    }

    return toFormat(String(value), this.nuGetPrecision());
  }

  nuGetPrecision() {
    return Number(this.getAttribute('precision')) || 0;
  }

  nuGetFormattedValue(value) {
    if (value == null) {
      value = this.nuValue;
    }

    const prefix = this.getAttribute('prefix') || '';
    const suffix = this.getAttribute('suffix') || '';

    if (this.nuRef !== document.activeElement && (prefix || suffix)) {
      return `${prefix}${value}${suffix}`;
    } else if (value) {
      return value.replace(/,/g, '');
    } else {
      return '';
    }
  }

  nuReset() {
    setTimeout(() => {
      this.nuSetValue(null);
    });
  }

  nuGetValueFromRef() {
    const value = Number(this.nuRef.value.replace(',', '.'));

    if (value !== this.nuValue && value === value) { // check for NaN
      this.nuRef.type = 'text';
      this.nuSetValue(value);
    }
  }

  nuValidateRefValue(event) {
    const selection = window.getSelection();

    if (selection.type === 'Range') return;

    if (ACCEPTABLE_KEYS.includes(event.key)
      && this.nuRef.selectionStart === this.nuRef.value.length) {
      if (!this.nuValidateRefValuePrivate(this.nuRef.value + event.key)) {
        event.preventDefault();
      }
    }

    setTimeout(() => {
      this.nuValidateRefValuePrivate(this.nuRef.value);
    });
  }

  nuValidateRefValuePrivate(value) {
    const precision = this.nuGetPrecision();
    const fixed = value
      .replace(new RegExp(`(\\.[0-9]{${precision}})[0-9]+$`), (s, s1) => s1)
      .replace(/\..*\./, s => s.slice(0, -1))
      .replace(/^0+/, '')
      .replace(/[^^]-/g, s => s.charAt(0));

    if (value !== fixed || value.split('.').length > 2) {
      this.nuRef.value = fixed;

      return false;
    }

    return true;
  }
}
