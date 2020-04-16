import NuInput from './input';
import { numberFromString } from '../helpers';

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

const ACCEPTABLE_KEYS = '-0123456789,.';

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

  static get nuDefaults() {
    return {
      text: 'center',
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

  static get nuMixins() {
    return {
      focus: true,
    }
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

        this.nuEmit('input', numberFromString(this.nuFixValue(parseFloat(this.nuRef.value))));
      });

      this.nuRef.addEventListener('change', (event) => {
        this.nuGetValueFromRef();

        event.stopPropagation();

        this.nuEmit('change', numberFromString(this.nuFixValue()));
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

          // can trigger error sometimes, ignore
          try {
            this.nuRef.select();
          } catch (e) {
          }
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
          const bool = value != null;

          this.nuRef.disabled = bool;

          this.nuMixin('focus')
            .then(focusMixin => focusMixin.set(bool));
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
   */
  nuSetValue(value) {
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
  }

  nuGetMax() {
    let max = Number.MAX_SAFE_INTEGER;

    if (this.hasAttribute('max')) {
      const parsedMax = numberFromString(this.getAttribute('max'));

      if (parsedMax != null && parsedMax === parsedMax) {
        max = parsedMax;
      }
    }

    return max;
  }

  nuGetMin() {
    let min = Number.MIN_SAFE_INTEGER;

    if (this.hasAttribute('min')) {
      const parsedMin = numberFromString(this.getAttribute('min'));

      if (parsedMin != null && parsedMin === parsedMin) {
        min = parsedMin;
      }
    }

    return min;
  }

  nuFixValue(value) {
    value = (value != null ? value : this.nuValue) || '0';

    const max = this.nuGetMax();
    const min = this.nuGetMin();

    if (numberFromString(value) > max) {
      value = max;
    } else if (numberFromString(value) < min) {
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

    if (!this.nuIsFocus()) {
      if (prefix || suffix) {
        return `${prefix}${value}${suffix}`;
      } else {
        const fixedValue = value
          .replace(/,/g, '');

        return fixedValue === '0' ? '' : fixedValue;
      }
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
    if (this.nuRef.type !== 'number') return;

    let value = parseFloat(this.nuRef.value.replace(',', '.'));

    if (!this.nuIsFocus()) {
      this.nuRef.type = 'text';
    }

    value = value != null
      ? value
      : (this.hasAttribute('min')
        ? this.nuGetMin()
        : 0);

    if (value !== this.nuValue && value === value) { // check for NaN
      this.nuSetValue(value);
    }
  }

  nuIsFocus() {
    return this.nuRef === document.activeElement;
  }

  nuValidateRefValue(event) {
    const selection = window.getSelection();

    if (selection.type === 'Range') return;

    if (event.key === ',' && !this.nuRef.value) {
      event.preventDefault();
    } else if (ACCEPTABLE_KEYS.includes(event.key)
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
    let fixed = value;

    if (precision) {
      fixed = fixed.replace(new RegExp(`(\\.[0-9]{${precision}})[0-9]+$`), (s, s1) => s1);
    }

    fixed = fixed
      .replace(/\..*\./, s => s.slice(0, -1))
      .replace(/^0+/, '0')
      .replace(/^0[1-9]/, s => s.slice(1))
      .replace(/[^^]-/g, s => s.charAt(0));

    fixed = fixed.split(',').slice(0, 2).join(',');

    if (value !== fixed || value.split('.').length > 2) {
      this.nuRef.value = fixed;

      return false;
    }

    return true;
  }
}
