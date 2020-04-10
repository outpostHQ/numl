export const ORIENT_ATTR = 'orient';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export default function OrientMixin($host) {
  return {
    orient: 'h',
    set(val) {
      if (val == null) {
        const attrValue = $host.nuGetAttr(ORIENT_ATTR, true);
        val = attrValue != null ? attrValue : 'h';
      }

      const orientation = val === 'v' ? VERTICAL : HORIZONTAL;

      $host.nuSetAria('orientation', orientation);
      $host.nuSetContext('orientation', orientation);

      this.orient = orientation;
    },
    connected() {
      this.set();
    },
    changed(name) {
      if (name === ORIENT_ATTR) {
        this.set();
      }
    },
  };
}
