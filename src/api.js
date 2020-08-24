import NuElement from './elements/el';
import { log, warn } from './helpers';

const OBJ_ASSIGN = ['attrs', 'styles', 'generators', 'behaviors', 'combinators'];

const staticBind = {
  id: 'nuId',
  tag: 'nuTag',
  role: 'nuRole',
  attrs: 'nuAttrs',
  styles: 'nuStyles',
  context: 'nuContext',
  css: 'nuCSS',
  generators: 'nuGenerators',
  name: 'nuName',
  template: 'nuTemplate',
  behaviors: 'nuBehaviors',
  combinators: 'nuCombinators',
};

const prototypeBind = {
  connected: 'nuConnected',
  disconnected: 'nuDisconnected',
  changed: 'nuChanged',
};

export function define(tag, options, skipDefine) {
  const Parent = options.parent || NuElement;

  const Element = class Element extends Parent {};

  options.tag = tag;

  Object.keys(staticBind).forEach(key => {
    const val = options[key];

    if (val != null) {
      Object.defineProperty(Element, staticBind[key], {
        value: val,
      });
    }
  });

  Object.keys(prototypeBind).forEach(key => {
    const val = options[key];

    if (val != null) {
      const method = prototypeBind[key];

      Element.prototype[method] = function(...args) {
        const parentFunc = Element.nuParentClass.prototype[method];

        if (parentFunc) {
          parentFunc.apply(this, args);
        }

        val.apply(this, args);
      };
    }
  });

  if (!skipDefine) {
    customElements.define(tag, Element);
  }

  return Element;
}

export function assign(element, options, elements = {}) {
  Object.keys(options)
    .forEach(option => {
      assignOption(element, option, options[option], elements);
    });
}

export function assignOption(element, prop, value, elements = {}) {
  if (!(prop in staticBind)) {
    warn('assign: Property not found');

    return;
  }

  if (typeof element === 'string') {
    element = Object.values(elements).find(el => el.nuTag === element);

    if (!element) {
      warn('assign: Element not found', JSON.stringify(element));
      return;
    }
  }

  const propName = staticBind[prop];
  const oldValue = element[propName];

  let newValue = value;

  if (OBJ_ASSIGN.includes(prop)) {
    newValue = Object.assign(oldValue || {}, newValue);
  }

  Object.defineProperty(element, propName, {
    value: newValue,
  });

  log('property assigned:', `${element.nuTag}.${prop}:`, newValue);
}
