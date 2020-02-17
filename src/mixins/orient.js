const ORIENT_X_MOD = 'orient-h';
const ORIENT_Y_MOD = 'orient-v';
export const ORIENT_ATTR = 'orient';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export default function OrientMixin({ aria, initial } = {}) {
  return {
    connected() {
      this.nuSetOrient = () => {
        const initialValue = initial ? initial.call(this) : (this.getAttribute('orient') || 'h');

        this.nuChanged('orient', null, initialValue);
      };

      this.nuSetOrient();
    },
    changed(name, oldValue, value) {
      if (name === ORIENT_ATTR) {
        value = this.nuGetAttr(ORIENT_ATTR, true) === 'v' ? 'v' : 'h';

        [ORIENT_X_MOD, ORIENT_Y_MOD]
          .forEach(attr => this.nuSetMod(attr, false));

        this.nuSetMod(value === 'v' ? ORIENT_Y_MOD : ORIENT_X_MOD, true);

        const orientation = value === 'v' ? VERTICAL : HORIZONTAL;

        if (aria) {
          this.nuSetAria('orientation', orientation);
        }

        this.nuSetContext('orientation', orientation);
        this.nuOrient = orientation;
      }
    },
  };
}
