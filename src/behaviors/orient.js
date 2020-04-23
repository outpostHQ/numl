import Behavior from "./behavior";

export const ORIENT_ATTR = 'orient';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

export default class OrientBehavior extends Behavior {
  constructor($host, value) {
    super($host);

    const mods = value.split(/\s+/g);

    this.aria = !mods.includes('no-aria');

    this.orient = mods.includes('v') ? 'v' : 'h';

    if (mods.includes('dynamic')) {
      $host.addEventListener('focusin', () => {
        this.set(getComputedStyle($host).flexFlow.includes('column') ? 'v' : 'h');
      }, { passive: true });
    }
  }

  set(val) {
    const { $host } = this;

    if (val == null) {
      const attrValue = $host.nuGetAttr(ORIENT_ATTR, true);
      val = attrValue != null ? attrValue : 'h';
    }

    const orientation = val === 'v' ? VERTICAL : HORIZONTAL;

    $host.nuSetAria('orientation', orientation);
    $host.nuSetContext('orientation', orientation);

    this.orient = orientation;
  }

  connected() {
    this.set();
  }

  changed(name) {
    if (name === ORIENT_ATTR) {
      this.set();
    }
  }
}
