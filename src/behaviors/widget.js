import Behavior from "./behavior";
import { devMode, isValidDate, log, toCamelCase } from '../helpers';

const LOCALE_VAR = 'locale';

export const BOOL_TYPE = (val) => val != null;
export const ALIAS_ATTR = (el, name) => {
  return (val) => {
    if (el.hasAttribute(name)) return;

    if (val != null) {
      el.setAttribute(name, val);
    } else {
      el.removeAttribute(name);
    }
  }
};
export const NUMBER_TYPE = (defaultValue) => {
  return (value) => {
    let num = parseFloat(value);

    if (num == null || num !== num) num = defaultValue;

    return num;
  };
};

export default class WidgetBehavior extends Behavior {
  static get params() {
    return {
      /**
       * Tells that it's a widget.
       */
      widget: true,
      /**
       * Widget uses locale (lang attribute or `locale` in context).
       */
      localized: false,
      /**
       * Widget has priority in value linking.
       */
      primary: null,
      /**
       * Widget can be part of a form.
       */
      input: false,
      /**
       * Widget provides input action to the context.
       * So its children can manipulate its value if they have INJECTOR param.
       */
      provider: true,
      /**
       * Widget injects value from parent element with param PROVIDER.
       */
      injector: true,
      /**
       * Widget links host value to its own value.
       */
      link: true,
    };
  }

  constructor(host, params) {
    super(host, params);

    this.props = host.constructor.nuPropsList.reduce((props, name) => {
      props[name] = null;

      return props;
    }, {});

    this.props.value = (val) => this.setValue(val, true);

    Object.assign(this.props, {
      type: 'text',
      disabled: BOOL_TYPE,
    });

    delete this.props.role;

    /**
     * @type {FormBehavior}
     */
    this.form = null;
  }

  init() {
    const { host } = this;
    const localized = this.params.localized;

    if (localized) {
      this.props.lang = (val) => {
        this.setLocale(val);

        return val;
      };
    }

    this.propsList = Object.keys(this.props).reverse();

    for (let prop of this.propsList) {
      const value = host.getAttribute(prop);

      this.fromAttr(prop, value);
    }

    if (localized) {
      this.linkContext('locale', (locale) => {
        if (this.locale !== locale && !host.hasAttribute('lang')) {
          this.setLocale();

          // reapply element (required for formatters and etc)
          if (this.apply) {
            this.apply();
          }

          // trigger locale change (required for components)
          this.changed('locale', this.locale);
        }
      });
    }

    if (this.params.link) {
      this.linkValue();
    }

    if (this.params.injector) {
      this.linkContext('value', (value) => {
        if (value === undefined) return;

        this.linkContextValue(value);
      }, 'parentValue');
    } else {
      this.context.value = null;
    }
  }

  connected() {
    const { host } = this;

    if (this.params.localized) {
      this.setLocale(this.lang);
    }

    // Form support
    if (this.params.input) {
      const id = host.nuId;

      if (id) {
        // reset form context for inner elements
        this.context.form = null;
        this.linkContext('form', (form, oldForm) => {
          if (oldForm && form !== oldForm) {
            this.disconnectForm(oldForm, !!form);
          }

          if (!form) return;

          this.connectForm();
        });
      }

      this.linkContext('group', (group, oldGroup) => {
        if (oldGroup) {
          oldGroup.setMod('invalid', false);
          oldGroup.setMod('valid', false);
        }
      });
    }

    // Nested widget support
    // Bind public value setter to context
    // if value link is active...
    if (this.params.provider) {
      this.bindAction('input', (val) => {
        this.setValue(val);
      });
    } else {
      this.context['action:input'] = null;
    }
  }

  disconnected() {
    if (this.params.input) {
      this.disconnectForm();
    }
  }

  connectForm(form = this.form) {
    const id = this.host.nuId;

    const value = form.value[id];

    form.registerField(id, this);

    if (value != null) {
      this.setByValue(value, true);
    } else {
      // wait for cascade of form to be initialized
      setTimeout(() => {
        const value = form.value[id];

        if (value != null) {
          this.setByValue(value, true);
        } else if (this.emitValue != null) {
          this.setFormValue();
        }
      });
    }
  }

  setByValue(val, silent) {
    this.setValue(val, silent);
  }

  disconnectForm(form = this.form, dontDelete) {
    const id = this.host.nuId;

    this.setFormValue(null, form);
    form.unregisterField(id);

    if (!dontDelete) {
      delete this.form;
    }
  }

  changed(name, value) {
    for (let prop of this.propsList) {
      if (prop === name) {
        this.fromAttr(name, value);
      }
    }
  }

  fromAttr(name, value) {
    const defaults = this.props[name];
    const prop = toCamelCase(name);

    if (typeof defaults === 'function') {
      const val = defaults(value);

      if (val != null) {
        this[prop] = val;
      }
    } else if (value != null || name in this) {
      this[prop] = value;
    } else if (defaults != null) {
      this[prop] = defaults;
    }
  }

  /**
   * Emit custom event.
   * @param {String} name
   * @param {*} detail
   * @param {Object} options
   */
  emit(name, detail = null, options = {}) {
    if (name === 'input') {
      detail = this.getTypedValue(detail);

      if (this.params.input) {
        this.setFormValue(detail);
      }

      this.nu('control')
        .then(Control => Control.apply(true, detail));
    }

    if (name !== 'log') {
      log('emit', { element: this, name, detail, options });
    }

    const event = new CustomEvent(name, {
      detail,
      bubbles: false,
      ...options,
    });

    event.nuTarget = this.host;

    this.host.dispatchEvent(event);
  }

  getTypedValue(value) {
    const notNull = value != null;

    switch (this.type) {
      case 'int':
        if (value instanceof Date) {
          value = value.getTime();
        } else {
          value = notNull ? parseInt(value, 10) : null;
        }

        break;
      case 'number':
      case 'num':
      case 'float':
        value = notNull ? parseFloat(value) : null;

        const precision = parseInt(this.precision);

        if (value != null && precision === precision) {
          value = parseFloat(value.toFixed(precision));
        }

        break;
      case 'bool':
        value = notNull;

        break;
      case 'date':
        if (!isValidDate(value)) {
          value = null;
        } else {
          value = new Date(value);
        }

        break;
      case 'daterange':
        if (!Array.isArray(value)) {
          value = null;
        } else {
          value = [new Date(value[0]), new Date(value[1])];
        }

        break
      case 'array':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (!Array.isArray(value)) {
          value = null;
        }

        break;
      case 'object':
        try {
          value = JSON.parse(value);
        } catch (e) {
        }

        if (typeof value !== 'object' && !Array.isArray(value)) {
          value = null;
        }

        break;
    }

    return value;
  }

  set role(role) {
    this.host.setAttribute('role', role);
  }

  get role() {
    return this.host.getAttribute('role');
  }

  control(bool, value) {
    this.nu('control')
      .then(Control => Control.apply(!!bool, value));
  }

  doAction(value, action) {
    // if action provided then check attribute action first
    if (action) {
      if (this.doAction(value)) {
        // if attribute action is performed then skip requested action
        return;
      }
    } else {
      // if no action provided then just check attribute action
      action = this.host.getAttribute('action');
    }

    if (action) {
      const actionCallback = this.parentContext[`action:${action}`];

      if (actionCallback) {
        value = value != null ? value : this.getTypedValue(this.emitValue);

        actionCallback(value);

        return true;
      }
    }

    return false;
  }

  transferAttr(name, ref, defaultValue) {
    if (!ref) return;

    let value = this.host.getAttribute(name);

    value = value != null ? value : defaultValue;

    if (value != null) {
      ref.setAttribute(name, value);
    } else {
      ref.removeAttribute(name);
    }

    return value;
  }

  setValue(value, silent) {
    this.log('set value', value, silent);

    if (this.value === value) return;

    this.value = value;

    this.setValueToContext();

    if (!silent) {
      this.emit('input', value);
      this.doAction(value);
    }
  }

  setFormValue(detail = this.getTypedValue(this.emitValue), form = this.form) {
    const { host } = this;
    const id = host.nuId;

    if (id && form) {
      form.setFieldValue(id, detail);
    }
  }

  get emitValue() {
    return this.value;
  }

  setLocale(val) {
    const context = this.context;

    this.locale = val ? val : (context[LOCALE_VAR] && context[LOCALE_VAR] || 'en');
  }

  setValidity(bool) {
    this.setMod('invalid', !bool);
    this.setMod('valid', bool);

    if (this.group) {
      this.group.setMod('invalid', !bool);
      this.group.setMod('valid', bool);
    }
  }

  linkValue() {
    const { host } = this;

    const set = this.fromHostValue.bind(this);
    const get = this.toHostValue.bind(this);

    if (host._value != null) {
      set(host.value);

      delete host._value;
    }

    if (host.nuSetValue) {
      const setValue = host.nuSetValue;

      host.nuSetValue = (val) => {
        setValue.call(host, val);
        set(val, true);
      };

      if (this.params.primary) {
        host.nuGetValue = get;
      }
    } else {
      host.nuSetValue = (val) => set(val, true);
      host.nuGetValue = get;
    }
  }

  /**
   * Declare action in context so children can invoke it if needed.
   * @param name {String} - name of action.
   * @param cb {Function} - action logic.
   */
  bindAction(name, cb) {
    this.log('bindAction()', name);

    const key = `action:${name}`;
    const context = this.context;

    console.log('! bind action', key in context);

    // allow multiple bindings
    if (key in context && typeof context[key] === 'function') {
      const prevCb = context[key];
      const currentCb = cb;

      cb = (val) => {
        prevCb(val);
        currentCb(val);
      };
    }

    context[`action:${name}`] = cb;
  }

  linkContextValue(value) {
    this.log('link context value', value);
    this.setValue(value, true);
  }

  fromHostValue(value) {
    this.setValue(value, true);
  }

  toHostValue() {
    return this.value;
  }

  setValueToContext() {
    this.setContext('value', this.value);
    this.setContext('typedValue', this.getTypedValue(this.emitValue));
  }

  /**
   * Log anything to nu-debug element.
   * @param args
   */
  log(...args) {
    if (!devMode) return;

    this.emit('log', args);
  }
}
