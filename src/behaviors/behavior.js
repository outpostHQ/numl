import { setAttr, toCamelCase } from '../helpers';

const PARAMS_MAP = new Map;

export default class Behavior {
  static get params() {
    return {};
  }

  static get allParams() {
    const parent = Object.getPrototypeOf(this);

    if (!PARAMS_MAP.get(this)) {
      PARAMS_MAP.set(this, {
        ...(parent && parent.allParams || {}),
        ...(this.params || {}),
      });
    }

    return PARAMS_MAP.get(this);
  }

  constructor(host, _params) {
    this.host = host;
    this.ref = host.nuRef || host;
    const params = Object.create(this.constructor.allParams);

    if (_params && typeof _params === 'string') {
      _params.split(/\s+/g).forEach(param => {
        param = param.trim();

        if (!param || params[param] === false) return;

        if (param.includes(':')) {
          const tmp = param.split(':');

          params[toCamelCase(tmp[0])] = tmp[1] === 'no' ? false : tmp[1];
        } else {
          params[toCamelCase(param)] = true;
        }
      });
    }

    this.params = params;
  }

  /**
   * Require other behavior
   * @param name
   * @returns {undefined|Promise<Behavior>}
   */
  nu(name) {
    return this.host.nu(name);
  }

  is(name) {
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

  hasMod(name) {
    return this.host.nuHasMod(name);
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

  hasParam(param) {
    return this._params.includes(param);
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
