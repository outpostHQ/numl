import { setAttr, parseParams, log } from '../helpers';

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
      parseParams(_params, params);
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

  setName(name) {
    this.host.nuSetName(name);
  }

  hasName(name) {
    return this.host.nuHasName(name);
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

  linkContext(name, cb, localName) {
    if (!localName && localName !== false) {
      localName = name;
    }

    if (!this.host.nuHasContextHook(name)) {
      this.host.nuSetContextHook(name, (data) => {
        const oldValue = this[localName];

        if (localName) {
          this[localName] = data;
        }

        cb(data, oldValue);
      });
    }

    const value = this.parentContext[name];

    if (value != null) {
      if (localName) {
        this[localName] = value || null;
      }

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

  get uniqId() {
    return this.host.nuUniqId;
  }

  doAction(action, value) {
    if (!action) {
      action = this.host.getAttribute('action');
    }

    if (action) {
      const actionCallback = this.parentContext[`action:${action}`];

      log('trigger action', this.host, action, value, actionCallback);

      if (actionCallback) {
        actionCallback(value);

        return true;
      }
    }

    return false;
  }

  get hasPopup() {
    return !!this.host.nuDeepQuery('[is-popup]');
  }
}
