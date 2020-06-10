/**
 * Make element focusable or temporarily disable that ability.
 */

import Behavior from "./behavior";

export const DISABLED_ATTR = 'disabled';

export default class FocusableBehavior extends Behavior {
  constructor(host, option) {
    super(host);

    if (option === 'manual') {
      this.isManual = true;
    }

    const ref = this.ref;

    ref.addEventListener('focus', () => {
      this.setEffect(true);
    });

    ref.addEventListener('blur', () => {
      this.setEffect(false);
    });

    if (document.activeElement === ref) {
      this.setEffect(true);
    }

    this.linkContext('disabled', (bool) => {
      const contextDisabled = bool === true;

      this.contextDisabled = contextDisabled;

      this.set(contextDisabled ? false : !this.disabled);
    }, false);
  }

  init() {
    this.set(!this.disabled);
  }

  get disabled() {
    return this.host.hasAttribute(DISABLED_ATTR);
  }

  changed(name, value) {
    if (name === DISABLED_ATTR) {
      this.set(value == null);
    }
  }

  setEffect(bool) {
    this.host.nuSetMod('focus', bool);
    this.host.nuSetContext('focus', bool || null);
  }

  set(bool) {
    // @TODO: replace nuTabIndex with more sane approach
    if (bool && !this.isManual) {
      this.ref.setAttribute('tabindex', '0');
    } else if (this.isManual) {
      this.ref.setAttribute('tabindex', '-1');
    } else  {
      this.ref.removeAttribute('tabindex');
    }

    this.host.nuSetMod('focusable', bool || null);
  }
}
