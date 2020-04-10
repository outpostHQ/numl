import NuActiveElement from './activeelement';
import { getFloatFromAttr, numberFromString } from '../helpers';
import OrientMixin, { VERTICAL } from '../mixins/orient';

export default class NuSlider extends NuActiveElement {
  static get nuTag() {
    return 'nu-slider';
  }

  static get nuRole() {
    return 'slider';
  }

  static get nuDefaults() {
    return {
      width: '1.25em',
      height: '1.25em',
      radius: 'round',
      fill: 'special-text',
      border: '1b color(text)',
      space: '.375em + 1b',
      text: 'v-middle',
      move: '--local-rail-move-v --local-rail-move-h',
      orient: 'h',
      opacity: '1',
    };
  }

  static get nuMixins() {
    return {
      orient: OrientMixin({
        aria: true,
        initial() {
          return !this.hasAttribute('orient') && this.nuContext.orientation
            ? (this.nuContext.orientation === VERTICAL ? 'v' : 'h')
            : (this.getAttribute('orient') || 'v');
        },
      }),
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} {
        position: absolute;
      }

      ${tag} {
        top: var(--nu-local-rail-top);
        left: var(--nu-local-rail-left);
        bottom: var(--nu-local-rail-bottom);
      }
    `;
  }

  nuInit() {
    super.nuConnected();

    this.nuSetContextHook('orientation', async (val) => {
      const orient = await this.nuMixin('orient');

      console.log(orient);

      orient.set(val === VERTICAL ? 'v' : 'h');
    });

    this.nuSetContextHook('disabled', (val) => {
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }, true);

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

    this.nuSetValue(this.getAttribute('value'));
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
      case 'value':
        if (!this.nuIsConnected) break;

        this.nuSetValue(this.getAttribute('value'));
        break;
    }
  }

  nuSetValue(value, notify) {
    const minValue = this.nuMinValue;
    const maxValue = this.nuMaxValue;

    if (value < minValue) value = minValue;
    if (value > maxValue) value = maxValue;

    value = getFloatFromAttr(value, minValue);

    super.nuSetValue(value, notify);

    this.style.setProperty('--nu-local-offset', this.nuGetOffset(numberFromString(value)));
    this.nuSetAria('valuemin', minValue);
    this.nuSetAria('valuemax', maxValue);
    this.nuSetAria('valuenow', value);
  }

  get nuMinValue() {
    return getFloatFromAttr(this.getAttribute('min'), 0);
  }

  get nuMaxValue() {
    return getFloatFromAttr(this.getAttribute('max'), 100);
  }

  get nuStep() {
    return getFloatFromAttr(this.getAttribute('step'), 1);
  }

  nuGetOffset(value) {
    let minValue = this.nuMinValue;
    let maxValue = this.nuMaxValue;

    const offset = (value - minValue) / (maxValue - minValue) * 100;

    return `${offset.toFixed(2)}%`;
  }
}
