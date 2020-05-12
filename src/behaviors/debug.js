import Behavior from './behavior';
import { generateId, query } from '../helpers';

let counter = 0;

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

    debugEl.nu('debugger').then(Debug => {
      Debug.componentPromise.then(() => {
        const { host } = this;

        if (!host.nuDebugId) {
          const debugId = ++counter;

          window[`el${debugId}`] = host;

          Object.keys(host.nuBehaviors || {})
            .forEach(name => {
              window[`${name}${counter}`] = host.nuBehaviors[name];
            });

          host.nuDebugId = debugId;
        }

        Debug.set({ target: host });
      });
    });
  }

  getDebugger() {
    const { host } = this;
    let id = this.debuggerId;

    if (this.debugger && this.debugger.nuId === id) {
      return this.debugger;
    }

    if (!id) {
      const debugEl = query(host, 'nu-debug');

      if (debugEl) {
        generateId(debugEl);

        this.debuggerId = debugEl.nuId;

        this.debugger = debugEl;

        return debugEl;
      } else {
        return;
      }
    }

    const debugEl = query(host, `#${id}`);

    if (debugEl && debugEl.nu) {
      this.debugger = debugEl;

      return debugEl;
    }
  }

  log(event, detail) {
    const debugEl = this.getDebugger();

    if (!debugEl) return;

    debugEl.nu('debugger').then(Debug => {
      Debug.componentPromise.then(() => {
        Debug.component.log(event, detail);
      });
    });
  }
}
