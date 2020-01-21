import { DIRECTIONS } from '../helpers';
import { HORIZONTAL, VERTICAL } from './orient';

export default function DirectionMixin({ aria, initial } = {}) {
  return {
    connected() {
      this.nuSetDirection = () => {
        const initialValue = initial ? initial.call(this) : (this.getAttribute('direction') || 'x');

        this.nuChanged('direction', null, initialValue);
      };

      this.nuSetDirection();
    },
    changed(name, oldValue, value) {
      if (name === 'direction') {
        value = DIRECTIONS.includes(value) ? value : 'bottom';
        oldValue = DIRECTIONS.includes(oldValue) ? oldValue : 'bottom';

        this.nuSetMod(`dir-${oldValue}`, false);
        this.nuSetMod(`dir-${value}`, true);

        const orientation = value === 'top' || value === 'bottom' ? HORIZONTAL : VERTICAL;

        this.nuSetMod(`orient-${orientation === HORIZONTAL ? 'y' : 'x'}`, false);
        this.nuSetMod(`orient-${orientation === HORIZONTAL ? 'x' : 'y'}`, true);

        if (aria) {
          this.nuSetAria('orientation', orientation);
        }

        this.nuSetContext('orientation', orientation);
        this.nuSetContext('direction', value);
        this.nuOrient = orientation;
        this.nuDirection = value;
      }
    },
  };
}
