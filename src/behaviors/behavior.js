import { setAttr } from '../helpers';

export default class Behavior {
  constructor(host) {
    this.host = host;
    this.$ref = host.nuRef || host;
  }

  /**
   * Require other behavior
   * @param name
   * @returns {undefined|Promise<Behavior>}
   */
  nu(name) {
    return this.host.nu(name);
  }

  has(name) {
    return !!this.host.nuBehaviors[name];
  }

  /**
   * Require other behaviors
   * @param behaviors
   */
  require(...behaviors) {
    behaviors.forEach(name => {
      this.host.nu(name);
    });
  }

  setContext(name, value, force) {
    this.host.nuSetContext(name, value, force);
  }

  setMod(name, value) {
    this.host.nuSetMod(name, value);
  }

  setAria(name, value) {
    this.host.nuSetAria(name, value);
  }

  setAttr(name, value) {
    setAttr(this.host, name, value);
  }

  hasAttr(name) {
    return this.host.hasAttribute(name);
  }

  getVar(name) {
    return this.host.nuGetVar(name);
  }

  linkContext(name, cb, localName) {
    if (!localName) {
      localName = name;
    }

    if (!this.host.nuHasContextHook(name)) {
      this.host.nuSetContextHook(name, (data) => {
        const oldValue = this[localName];

        this[localName] = data;

        cb(data, oldValue);
      });
    }

    const value = this.parentContext[name];

    if (value != null) {
      this[localName] = value || null;

      cb(value);
    }
  }

  on(eventName, cb, options) {
    if (Array.isArray(eventName)) {
      for (let name of eventName) {
        this.on(name, cb, options);
      }

      return () => {
        for (let name of eventName) {
          this.off(name, cb);
        }
      };
    }

    this.host.addEventListener(eventName, cb, options);

    return () => {
      this.off(eventName, cb);
    };
  }

  off(eventName, cb) {
    this.host.removeEventListener(eventName, cb);
  }

  get context() {
    return this.host.nuContext;
  }

  get parentContext() {
    return this.host.nuParentContext;
  }

  get isConnected() {
    return this.host.nuIsConnected;
  }

  get isShadowAllowed() {
    return this.host.nuIsShadowAllowed;
  }
}
