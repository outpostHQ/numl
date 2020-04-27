import Behavior from './behavior';
import { query } from '../helpers';

export default class DebugBehavior extends Behavior {
  constructor(host, value) {
    super(host, value);

    this.debuggerId = value;
  }

  connected() {
    this.connect();

    this.log('connected');
  }

  changed(name, value) {
    this.log('changed', { name, value });
  }

  disconnected() {
    this.log('disconnected');
  }

  connect() {
    const debugEl = this.getDebugger();

    if (!debugEl) return;

    debugEl.nu('component').then(Debug => {
      Debug.componentPromise.then(() => {
        Debug.set({ target: this.host });
      });
    });
  }

  getDebugger() {
    const { host } = this;
    const id = this.debuggerId;

    if (!id) return;

    const debugEl = query(host, `#${id}`);

    if (debugEl && debugEl.nu) return debugEl;
  }

  log(event, detail) {
    const debugEl = this.getDebugger();

    if (!debugEl) return;

    debugEl.nu('component').then(Debug => {
      Debug.componentPromise.then(() => {
        console.log('!', Debug.component);
        Debug.component.log(event, detail);
      });
    });
  }
}
