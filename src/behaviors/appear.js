import { deepQueryAll } from '../helpers';
import Behavior from './behavior';

export default class AppearBehavior extends Behavior {
  connected() {
    this.threshold = parseInt(this.params.threshold);
    this.timeout = parseInt(this.params.timeout) || 0;

    if (isNaN(this.threshold)) {
      this.threshold = 50;
    }

    setTimeout(() => this.apply());
  }

  apply() {
    const { host } = this;
    const rect = host.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (rect.y < 0 && rect.y + rect.height > 0) {
      this.setByThreshold((rect.y + rect.height) / rect.height);
    } else if (rect.y + rect.height > screenHeight && rect.y < screenHeight) {
      this.setByThreshold((screenHeight - rect.y) / rect.height);
    } else if (rect.y >= 0 && rect.y + rect.height <= screenHeight) {
      this.setByThreshold(1);
    } else {
      this.setByThreshold(0);
    }
  }

  setByThreshold(value) {
    const { threshold } = this;

    setTimeout(() => {
      console.log('! timeout');
      this.set((threshold / 100) <= value);
    }, this.timeout);
  }

  set(bool) {
    if (bool) {
      this.setMod('appear', bool);
    } else if (this.params.toggle) {
      this.setMod('appear', bool);
    } else if (this.hasMod('appear')) {
      this.host.removeAttribute('nx-appear');
    }
  }
}

function onPositionChange() {
  const els = deepQueryAll(document.body, '[nx-appear]');

  els.forEach(el => {
    el.nuBehaviors.appear.apply();
  });
}

['scroll', 'resize', 'wheel', 'touchmove', 'tap'].forEach(eventName => {
  window.addEventListener(eventName, onPositionChange, { passive: true });
});
