/**
 * Make element focusable or temporarily disable that ability.
 */

import Mixin from "./mixin";

export default class FocusMixin extends Mixin {
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

  setEffect(bool) {
    this.$host.nuSetMod('focus', bool);
    this.$host.nuSetContext('focus', bool || null);
  }

  set(bool) {
    if (bool) {
      this.$ref.setAttribute('tabindex', this.$host.nuTabIndex);
    } else {
      this.$ref.removeAttribute('tabindex');
    }

    this.$host.nuSetMod('focusable', bool || null);
  }
}
