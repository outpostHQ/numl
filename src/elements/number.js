import NuInput from './input';

export function stripZeros(val) {
  return val.replace(/\.([0-9]*[^0]|)0+($|%)/, (s, s1, s2) => !`${s1}${s2}`.match(/^(%|)$/) ? `.${s1}${s2}` : '');
}

function toFixed(num, precision) {
  return stripZeros(numberFromString(num).toFixed(precision));
}

function numberFromString(num) {
  if (typeof num === 'number') return num;

  if (typeof num !== 'string') return null;

  let value = Number(num.replace(/,/g, ''));

  if (value !== value) return null;

  return value;
}

const ACCEPTABLE_KEYS = '0123456789.';

export default class SsNumber extends NuInput {
  static get nuTag() {
    return 'nu-number';
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
    `;
  }

  nuGetRef() {
    const isNewRef = !this.nuRef;

    this.nuRef = this.querySelector('input');

    if (!this.nuRef) {
      const input = document.createElement('input');

      input.type = 'tel';

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

      this.nuRef.addEventListener('focus', () => {
        this.nuReset();
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
        this.nuSetValue(value);

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
      case 'type':
        this.nuSetType(value);

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

  nuSetValue(value, force) {
    this.nuGetRef();

    if (value == null
      || (value && String(Number(value)) !== value.replace(/\.[0]*$/, '').replace(/^0*/, ''))) {
      value = this.nuValue;
    } else {
      value = value ? String(value) : '0';
    }

    if (value !== value) return; // NaN check

    value = this.nuFixValue(value);

    this.nuValue = value;

    const formattedValue = this.nuGetFormattedValue(value);

    if (formattedValue !== this.nuRef.value) {
      this.nuRef.value = formattedValue;
    }

    if (!force) {
      this.nuEmit('input', Number(this.nuFixValue()));
    }
  }

  nuFixValue(value) {
    value = (value != null ? value : this.nuValue) || '0';

    value = this.nuFixValueLimit(value);

    return toFixed(String(value), this.getAttribute('precision') || 2);
  }

  nuFixValueLimit(value) {
    value = numberFromString(value);

    const max = numberFromString(this.getAttribute('max'));
    const min = numberFromString(this.getAttribute('min'));

    if (max != null && value > max) {
      value = max;
    } else if (min != null && value < min) {
      value = min;
    }

    return value;
  }

  nuGetFormattedValue(value) {
    if (value == null) {
      value = this.nuValue;
    }

    const prefix = this.getAttribute('prefix') || '';
    const suffix = this.getAttribute('suffix') || '';

    if (this.nuRef !== document.activeElement && (prefix || suffix)) {
      return `${prefix}${value}${suffix}`;
    } else {
      return value;
    }
  }

  nuReset() {
    setTimeout(() => {
      this.nuSetValue(null);
    });
  }

  nuGetValueFromRef() {
    const value = this.nuRef.value;

    if (value !== this.nuValue) {
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
    const precision = this.getAttribute('precision') || 2;
    const fixed = this.nuFixValueLimit(value
      .replace(new RegExp(`(\\.[0-9]{${precision}})[0-9]+$`), (s, s1) => s1)
      .replace(/\..*\./, s => s.slice(0, -1))
      .replace(/^0+/, ''));

    if (value !== fixed || value.split('.').length > 2) {
      this.nuRef.value = fixed;

      return false;
    }

    return true;
  }
}
