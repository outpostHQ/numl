import { DIRECTIONS } from '../helpers';
import { HORIZONTAL, VERTICAL } from './orient';

export const DIRECTION_ATTR = 'direction';

export default function DirectionMixin({ aria, initial } = {}) {
  return {
    connected() {
      this.nuSetDirection = (val) => {
        if (val == null) {
          const attrValue = this.nuGetAttr(DIRECTION_ATTR, true);
          val = attrValue != null ? attrValue : (initial || 'right');
        }

        const orientation = val === 'v' ? VERTICAL : HORIZONTAL;

        this.nuSetAria('orientation', orientation);
        this.nuSetContext('orientation', orientation);
        this.nuOrient = orientation;
      };

      this.nuSetDirection();
    },
    changed(name, oldValue, value) {
      if (name === DIRECTION_ATTR) {
        value = DIRECTIONS.includes(value) ? value : 'bottom';
        oldValue = DIRECTIONS.includes(oldValue) ? oldValue : 'bottom';

        this.nuSetMod(`dir-${oldValue}`, false);
        this.nuSetMod(`dir-${value}`, true);

        const orientation = value === 'top' || value === 'bottom' ? HORIZONTAL : VERTICAL;

        this.nuSetMod(`orient-${orientation === HORIZONTAL ? 'v' : 'h'}`, false);
        this.nuSetMod(`orient-${orientation === HORIZONTAL ? 'h' : 'v'}`, true);

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
