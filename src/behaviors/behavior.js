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

  getVar(name) {
    return this.host.nuGetVar(name);
  }

  bindContext(name, cb) {
    if (!this.host.nuHasContextHook(name)) {
      this.host.nuSetContextHook(name, (data) => {
        this[name] = data;

        cb(data);
      });
    }

    const value = this.parentContext[name];

    if (value != null) {
      this[name] = value || null;

      cb(value);
    }
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
}
