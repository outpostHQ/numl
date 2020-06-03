import Behavior from './behavior';
import { fixPosition } from '../helpers';

export default class TooltipBehavior extends Behavior {
  connected() {
    const { host } = this;
    const parent = this.parent = this.host.parentNode;

    if (parent && parent.nuElement && !parent.hasAttribute('describedby')) {
      parent.setAttribute('describedby', this.nuId);
    }

    let hover = false;
    let focus = false;

    host.hidden = true;

    this.setMod('tooltip', true);

    const onMouseEnter = () => {
      hover = true;

      if (focus) return;

      this.nu('fixate')
        .then(Fixate => Fixate.start());

      host.hidden = false;
      parent.nuSetMod('tooltip-shown', true);

      setTimeout(() => {
        fixPosition(host);
      });
    };

    const onMouseLeave = () => {
      hover = false;
      focus = false;

      this.nu('fixate')
        .then(Fixate => Fixate.end());

      host.hidden = true;
      parent.nuSetMod('tooltip-shown', false);
    };

    const onFocus = () => {
      focus = true;

      if (hover) return;

      this.nu('fixate')
        .then(Fixate => Fixate.start());

      host.hidden = false;
      parent.nuSetMod('tooltip-shown', true);
    };

    const onBlur = () => {
      focus = false;

      if (hover) return;

      this.nu('fixate')
        .then(Fixate => Fixate.end());

      host.hidden = true;
      parent.nuSetMod('tooltip-shown', false);
    };

    parent.addEventListener('mouseenter', onMouseEnter);
    parent.addEventListener('mouseleave', onMouseLeave);

    this.removeListeners = () => {
      parent.removeEventListener('mouseenter', onMouseEnter);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };

    host.nuSetContextHook('focus', (val) => {
      if (val) {
        onFocus();
      } else {
        onBlur();
      }
    });
  }

  disconnected() {
    const removeListeners = this.removeListeners;

    if (removeListeners) {
      removeListeners();
    }
  }
}
