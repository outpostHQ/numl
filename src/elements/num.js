import NuElement from './element';

export const NUM_NOTATIONS = [
  'standard', 'scientific', 'engineering', 'compact',
];
export const NUM_TYPES = [
  'default', 'currency', 'percent', 'unit',
];
export const NUM_SIGN_OPTIONS = [
  'auto', 'always', 'never', 'exceptZero',
];
export const NUM_UNITS = [
  // angle
  'degree',
  // area
  'acre', 'hectare',
  //concentration
  'percent',
  //digital
  'digital: bit', 'byte', 'kilobit', 'kilobyte', 'megabit', 'megabyte', 'gigabit', 'gigabyte', 'terabit', 'terabyte', 'petabyte',
  // duration
  'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year',
  // length
  'millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile', 'mile-scandinavian',
  // mass
  'gram', 'kilogram', 'ounce', 'pound', 'stone',
  // temperature
  'celsius', 'fahrenheit',
  // volume
  'liter', 'milliliter', 'gallon', 'fluid-ounce',
];

function getInList(val, list) {
  if (list.includes(val)) return val;
}

export default class NuNum extends NuElement {
  static get nuTag() {
    return 'nu-num';
  }

  static get nuAttrs() {
    return {
      type: '',
      code: '',
      sign: '',
      notation: '',
      value: '',
      signification: '',
      integer: '',
      decimal: '',
      locale: '',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) return;

    if (Object.keys(this.constructor.nuAttrs).includes(name)) {
      this.nuApply();
    }
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();
  }

  nuApply() {
    const typeAttr = this.getAttribute('type');
    const notationAttr = (this.getAttribute('notation') || '').split(/\s+/);
    const unitAttr = (this.getAttribute('unit') || '').split(/\s+/);
    const fractionAttr = (this.getAttribute('decimal') || '').split(/\s+/);
    const integerAttr = this.getAttribute('integer');
    const significantAttr = (this.getAttribute('significant') || '').split(/\s+/);
    const type = getInList(typeAttr, NUM_TYPES);
    const code = this.getAttribute('code');
    const notation = getInList(notationAttr[0], NUM_NOTATIONS);
    const unit = getInList(unitAttr[0], NUM_UNITS);
    const notationDisplay = notationAttr[1];
    const unitDisplay = unitAttr[1];
    const signAttr = (this.getAttribute('sign') || '').split(/\s+/);
    const sign = getInList(signAttr[0], NUM_SIGN_OPTIONS);
    const isAccounting = signAttr.includes('accounting');
    const valueNum = Number(this.getAttribute('value'));
    const value = valueNum === valueNum ? valueNum : this.getAttribute('nanValue') || '0';
    const locale = this.getAttribute('locale') || this.nuGetVar('locale') || 'en';

    const options = {};

    if (fractionAttr[0]) {
      if (fractionAttr[1]) {
        options.minimumFractionDigits = Number(fractionAttr[0]);
        options.maximumFractionDigits = Number(fractionAttr[1]);
      } else {
        options.minimumFractionDigits = options.maximumFractionDigits = Number(fractionAttr[0]);
      }
    }

    if (integerAttr) {
      options.minimumIntegerDigits = Number(integerAttr);
    }

    if (significantAttr[0]) {
      if (significantAttr[1]) {
        options.minimumSignificantDigits = Number(significantAttr[0]);
        options.maximumSignificantDigits = Number(significantAttr[1]);
      } else {
        options.minimumSignificantDigits = options.maximumSignificantDigits = significantAttr[0];
      }
    }

    if (sign) {
      options.signDisplay = sign;
    }

    if (isAccounting) {
      options.currencySign = 'accounting';
    }

    if (code) {
      options.currency = code;
    }

    if (type) {
      options.style = type;
    }

    if (unitDisplay) {
      options.unitDisplay = unitDisplay;
    }

    if (notation) {
      options.notation = notation;

      if (notation === 'compact' && notationDisplay) {
        options.notationDisplay = notationDisplay;
      }
    }

    if (unit) {
      options.unit = unit;
    }

    const formatter = new Intl.NumberFormat(locale, options);

    this.innerHTML = formatter.format(value);
  }
}
