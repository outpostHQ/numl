import Behavior from './behavior';
import { enableFocus } from '../focus';
import { generateId, query, queryById } from '../helpers';

export default class LabelBehavior extends Behavior {
  init() {
    const { host } = this;

    host.addEventListener('click', () => {
      const element = this.link();

      if (element) {
        element.click();
        element.focus();
        enableFocus();

        console.log('!', element, document.activeElement);
      }
    });
  }

  connected() {
    this.link();
  }

  changed(name) {
    if (name === 'for' && this.isConnected) {
      this.link();
    }
  }

  link() {
    const { host } = this;
    const id = host.getAttribute('for');
    let el;

    if (!this.id) {
      generateId(host);
    }

    if (!id) {
      el = query(host, '[nu-input]');
    } else {
      el = queryById(host, id);
    }

    el = el && el.nuRef || el;

    if (this.linkedEl === el) return el;

    if (this.linkedEl && this.linkedEl.getAttribute('aria-labelledby') === host.id) {
      this.linkedEl.setAttribute('aria-labelledby', '');
    }

    this.linkedEl = el;

    if (el) {
      el.setAttribute('aria-labelledby', host.id);
    }

    return el;
  }
}
