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

  get context() {
    return this.host.nuContext;
  }

  get isConnected() {
    return this.host.nuIsConnected;
  }
}
