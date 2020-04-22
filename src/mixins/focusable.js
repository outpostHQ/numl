/**
 * Make element focusable or temporarily disable that ability.
 */

import Mixin from "./mixin";

export const DISABLED_ATTR = 'disabled';

export default class FocusableMixin extends Mixin {
  constructor($host) {
    super($host);

    const ref = this.$ref;

    ref.addEventListener('focus', () => {
      this.setEffect(true);
    });

    ref.addEventListener('blur', () => {
      this.setEffect(false);
    });

    if (document.activeElement === ref) {
      this.setEffect(true);
    }
  }

  init() {
    this.set(this.$host.getAttribute(DISABLED_ATTR) == null);
  }

  changed(name, value) {
    if (name === DISABLED_ATTR) {
      this.set(value == null);
    }
  }

  setEffect(bool) {
    this.$host.nuSetMod('focus', bool);
    this.$host.nuSetContext('focus', bool || null);
  }

  set(bool) {
    // @TODO: replace nuTabIndex with more sane approach
    if (bool) {
      this.$ref.setAttribute('tabindex', this.$host.nuTabIndex);
    } else {
      this.$ref.setAttribute('tabindex', '-1');
    }

    this.$host.nuSetMod('focusable', bool || null);
  }
}
