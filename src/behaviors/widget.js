import Behavior from "./behavior";
import {
  devMode,
  isValidDate,
  log,
  toCamelCase,
  setImmediate,
  isEqual,
} from '../helpers';
import NuElement from '../elements/el';


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

export const BASE_PROPS = NuElement.nuPropsList.reduce((props, name) => {
  props[name] = null;

  return props;
}, {});

Object.assign(BASE_PROPS, {
  type: 'text',
  value(val) {
    return this.setValue(val, true);
  },
  disabled: BOOL_TYPE,
  /**
   * If TRUE then trigger control on init.
   */
  trigger: BOOL_TYPE,
  role(role) {
    if (role !== this.role) {
      this.role = role;
    }
  },
  lang(val) {
    if (!this.params.localized) return;

    this.setLocale(val);

    return val;
  },
  ['link-value'](val) {
    const bool = val != null;

    // postpone linking
    setImmediate(() => this.linkContextValue());

    return bool;
  },
  placeholder: '...',
});

delete BASE_PROPS.control;

export let PROPS_LIST;

export function registerProp(name, cb) {
  BASE_PROPS[name] = cb;
}

export default class WidgetBehavior extends Behavior {
  static get params() {
    return {
      /**
       * Tells that it's a widget.
       */
      widget: true,
      /**
       * Default role for the element.
       */
      role: '',
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
       * So its children can manipulate its value if they have linkValue param.
       */
      provideValue: true,
      /**
       * Widget links its own value with context element that has provideValue param.
       * Requires explicit "link-value" to be set.
       */
      linkValue: true,
      /**
       * Widget links host value to its own value.
       */
      linkHostValue: true,
    };
  }

  constructor(host, params) {
    super(host, params);

    this.props = { ...BASE_PROPS };

    /**
     * @type {FormBehavior}
     */
    this.form = null;
    this.validity = true; // valid by default
  }

  init() {
    const { host } = this;
    const localized = this.params.localized;

    if (!this.hasAttr('role') && this.params.role) {
      this.setAttr('role', this.params.role);
    }

    // generate cache of props list
    if (!PROPS_LIST) {
      PROPS_LIST = Object.keys(BASE_PROPS).reverse();
    }

    // get current values of attributes and handle them
    for (let prop of PROPS_LIST) {
      const value = host.getAttribute(prop);

      this.fromAttr(prop, value);
    }

    // link context locale to the element
    if (localized) {
      this.linkContext('locale', (locale) => {
        if (!host.hasAttribute('lang')) {
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

    // link host value with widget's value
    if (this.params.linkHostValue) {
      this.linkHostValue();
    }

    // set input modifier
    if (this.params.input) {
      this.setMod('input', true);
    }

    // link context value with widget's value
    if (this.shouldValueBeLinked) {
      this.linkContextValue();
    }
  }

  connected() {
    const { host } = this;

    // set current locale based on current lang attribute
    if (this.params.localized) {
      this.setLocale(this.lang);
    }

    // link widget with form
    if (this.params.input) {
      const id = host.nuId;

      if (id) {
        // reset form context for inner elements if this is a value provider
        if (this.params.provideValue) {
          this.context.form = null;
        }

        this.linkContext('form', (form, oldForm) => {
          this.oldForm = oldForm;

          if (oldForm && form !== oldForm) {
            // disconnect the old form
            this.disconnectForm(oldForm, !!form);
          }

          if (!form) return;

          // connect a new form
          this.connectForm();
        });
      }

      // link widget with outside group
      // group will inherit widget's validation state
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
    if (this.params.provideValue) {
      this.provideAction('input', (val) => {
        this.valueBubbled = true;

        if (this.toggleOption) {
          this.toggleOption(val);
        } else {
          this.setValue(val);
        }
      });
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

  disconnectForm(form = this.oldForm, dontDelete) {
    const id = this.host.nuId;

    this.setFormValue(null, form);

    if (form) {
      form.unregisterField(id);
    }

    if (!dontDelete) {
      delete this.form;
    }
  }

  changed(some, value) {
    for (let prop of PROPS_LIST) {
      if (prop === some) {
        this.fromAttr(some, value);
      }
    }
  }

  fromAttr(name, value) {
    const defaults = this.props[name];
    const prop = toCamelCase(name);

    if (typeof defaults === 'function') {
      const val = defaults.call(this, value);

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

  control() {
    this.nu('control')
      .then(Control => Control.apply(null, this.getTypedValue(this.emitValue)));
  }

  doAction(action, value) {
    if (!action) {
      action = this.host.getAttribute('action');
    }

    if (action) {
      const actionCallback = this.parentContext[`action:${action}`];

      //getContextOwner(this.host, `action:${action}`)
      log('trigger action', this.host, action, value, actionCallback);

      if (actionCallback) {
        value = value != null ? value : this.getTypedValue(this.emitValue);

        actionCallback(value);

        return true;
      }
    }

    return false;
  }

  doActions(value) {
    if (this.shouldValueBeLinked && this.hasValue) {
      this.doAction('input', value);
    }

    const baseAction = this.host.getAttribute('action');

    if (baseAction) {
      this.doAction(baseAction, value);
    }
  }

  transferAttr(name, ref, defaultValue) {
    if (!ref || this.ref === this.host) return;

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

    if (isEqual(this.value, value)) return;

    this.value = value;

    if (this.params.provideValue) {
      this.setValueToContext();
    }

    if (!silent) {
      this.emit('input', value);
      this.doActions(value);
    }

    if (!silent || this.trigger) {
      this.control();
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
    this.validity = bool;

    if (this.group) {
      this.group.setMod('invalid', !bool);
      this.group.setMod('valid', bool);
    }

    const fieldEl = this.host.closest('[nu-field]');

    if (fieldEl) {
      fieldEl.nuSetMod('invalid', !bool);
      fieldEl.nuSetMod('valid', bool);
    }
  }

  linkHostValue() {
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
  provideAction(name, cb) {
    this.log('provideAction()', name);

    const key = `action:${name}`;
    const context = this.context;

    // allow multiple bindings
    if (context.hasOwnProperty(key) && typeof context[key] === 'function') {
      const prevCb = context[key];
      const currentCb = cb;

      cb = (val) => {
        prevCb(val);
        currentCb(val);
      };
    }

    cb.nuOwner = this;

    context[`action:${name}`] = cb;
  }

  linkContextValue() {
    if (this.contextValueLinked) return;

    this.contextValueLinked = true;

    this.linkContext('value', (value) => {
      if (value === undefined || !this.shouldValueBeLinked) return;

      this.fromContextValue(value);
    }, 'parentValue');
  }

  fromContextValue(value) {
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

  forceLinkValue() {
    delete this.props['link-value'];

    this.linkValue = true;
  }

  get shouldValueBeLinked() {
    return this.params.linkValue && this.linkValue;
  }

  get hasValue() {
    return this.value != null;
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
