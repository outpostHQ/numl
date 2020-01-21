const ORIENT_X_MOD = 'orient-x';
const ORIENT_Y_MOD = 'orient-y';

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

        if (aria) {
          this.nuSetAria('orientation', value === 'y' ? 'vertical' : 'horizontal');
        }

        this.nuSetContext('orientation', value);
        this.nuOrient = value;
      }
    },
  };
}
