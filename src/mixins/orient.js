const ORIENT_X_MOD = 'orient-x';
const ORIENT_Y_MOD = 'orient-y';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export default function OrientMixin({ aria, initial } = {}) {
  return {
    connected() {
      this.nuSetOrient = () => {
        const initialValue = initial ? initial.call(this) : (this.getAttribute('orient') || 'x');

        this.nuChanged('orient', null, initialValue);
      };

      this.nuSetOrient();
    },
    changed(name, oldValue, value) {
      if (name === 'orient') {
        value = value === 'y' ? 'y' : 'x';

        [ORIENT_X_MOD, ORIENT_Y_MOD]
          .forEach(attr => this.nuSetMod(attr, false));

        this.nuSetMod(value === 'y' ? ORIENT_Y_MOD : ORIENT_X_MOD, true);

        const orientation = value === 'y' ? VERTICAL : HORIZONTAL;

        if (aria) {
          this.nuSetAria('orientation', orientation);
        }

        this.nuSetContext('orientation', orientation);
        this.nuOrient = orientation;
      }
    },
  };
}
