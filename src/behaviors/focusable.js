/**
 * Make element focusable or temporarily disable that ability.
 */

import Behavior from "./behavior";
import { setAttr } from '../helpers';

export const DISABLED_ATTR = 'disabled';

export default class FocusableBehavior extends Behavior {
  constructor(host, option) {
    super(host);

    if (option === 'manual') {
      this.isManual = true;
    }

    const ref = this.ref;

    const transferChild = host.constructor.nuContents;

    if (transferChild) {
      this.contentsRef = host.querySelector(transferChild);
    }

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

    if (this.contentsRef) {
      setAttr(this.contentsRef, 'is-focus', bool);
    }
  }

  set(param) {
    if ((this.isManual && param !== 'auto') || param === 'manual') {
      this.isManual = true;
      this.ref.setAttribute('tabindex', '-1');
    } else if (param) {
      this.isManual = false;
      this.ref.setAttribute('tabindex', '0');
    } else {
      this.isManual = false;
      this.ref.removeAttribute('tabindex');
    }

    this.host.nuSetMod('focusable', param || null);
  }
}
