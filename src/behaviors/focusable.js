/**
 * Make element focusable or temporarily disable that ability.
 */

import Behavior from "./behavior";

export const DISABLED_ATTR = 'disabled';

export default class FocusableBehavior extends Behavior {
  constructor(host) {
    super(host);

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
    if (bool) {
      this.ref.setAttribute('tabindex', '0');
    } else {
      this.ref.setAttribute('tabindex', '-1');
    }

    this.host.nuSetMod('focusable', bool || null);
  }
}
