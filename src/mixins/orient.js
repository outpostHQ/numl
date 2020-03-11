export const ORIENT_ATTR = 'orient';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export default function OrientMixin({ aria, initial } = {}) {
  return {
    connected() {
      this.nuSetOrient = (val) => {
        if (val == null) {
          const attrValue = this.nuGetAttr(ORIENT_ATTR, true);
          val = attrValue != null ? attrValue : (initial || 'h');
        }

        const orientation = val === 'v' ? VERTICAL : HORIZONTAL;

        this.nuSetAria('orientation', orientation);
        this.nuSetContext('orientation', orientation);
        this.nuOrient = orientation;
      };

      this.nuSetOrient();
    },
    changed(name) {
      if (name === ORIENT_ATTR && this.nuSetOrient) {
        this.nuSetOrient();
      }
    },
  };
}
