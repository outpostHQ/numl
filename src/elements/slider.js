import NuActiveElement from './activeelement';
import { getIntFromAttr, numberFromString } from '../helpers';
import OrientMixin, { VERTICAL } from '../mixins/orient';

export default class NuSlider extends NuActiveElement {
  static get nuTag() {
    return 'nu-slider';
  }

  static get nuId() {
    return 'slider';
  }

  static get nuRole() {
    return 'slider';
  }

  static get nuDefaults() {
    return {
      width: '1em',
      height: '1em',
      radius: 'round',
      fill: 'special-text',
      border: '1b color(text)',
      space: '.25em + 1b',
      text: 'v-middle',
      move: ':orient-h[-.25em 0] :orient-v[0 .25em]'
    };
  }

  static get nuMixins() {
    return [OrientMixin({
      aria: true,
      initial() {
        return !this.hasAttribute('orient') && this.nuContext.orientation
          ? (this.nuContext.orientation === VERTICAL ? 'v' : 'h')
          : (this.getAttribute('orient') || 'v');
      },
    })]
  }

  static nuCSS({ css, tag}) {
    return `
      ${css}
      ${tag} {
        position: absolute;
      }

      ${tag}[nu-orient-h] {
        top: 0;
        left: var(--nu-local-offset);
      }

      ${tag}[nu-orient-y] {
        left: 0;
        bottom: var(--nu-local-offset);
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContextHook('orientation', this.nuSetOrient.bind(this));
    this.nuSetContextHook('sliderValue', () => {
      const value = this.nuContext.sliderValue;

      if (value != null) {
        const minValue = this.nuMinValue;
        const maxValue = this.nuMaxValue;
        const step = this.nuStep;

        this.nuSetValue(Math.round(value * (maxValue - minValue) / step) * step + minValue, true);
      }
    });

    this.nuInitEvents();
  }

  nuInitEvents() {
    if (this.nuEventsBinded) return;

    this.nuEventsBinded = true;

    this.addEventListener('keydown', (evt) => {
      const step = this.nuStep * (evt.shiftKey ? 10 : 1);

      switch (evt.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          this.nuSetValue(this.nuValue + step, true);
          break;
        case 'ArrowDown':
        case 'ArrowLeft':
          this.nuSetValue(this.nuValue - step, true);
          break;
        default:
          return;
      }

      evt.preventDefault();
    });
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'min':
      case 'max':
        this.nuSetValue(this.getAttribute('value'));
        break;
    }
  }

  nuSetValue(value, notify) {
    const minValue = this.nuMinValue;
    const maxValue = this.nuMaxValue;

    if (value < minValue) value = minValue;
    if (value > maxValue) value = maxValue;

    value = getIntFromAttr(value, minValue);

    super.nuSetValue(value, notify);

    this.style.setProperty('--nu-local-offset', this.nuGetOffset(numberFromString(value)));
    this.nuSetAria('valuemin', minValue);
    this.nuSetAria('valuemax', maxValue);
    this.nuSetAria('valuenow', value);
  }

  get nuMinValue() {
    return getIntFromAttr(this.getAttribute('min'), 0);
  }

  get nuMaxValue() {
    return getIntFromAttr(this.getAttribute('max'), 100);
  }

  get nuStep() {
    return getIntFromAttr(this.getAttribute('step'), 1);
  }

  nuGetOffset(value) {
    let minValue = this.nuMinValue;
    let maxValue = this.nuMaxValue;

    const offset = (value - minValue) / (maxValue - minValue) * 100;

    return `${offset.toFixed(2)}%`;
  }
}
