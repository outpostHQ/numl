import NuElement from './elements/element';

const staticBind = {
  id: 'nuId',
  tag: 'nuTag',
  role: 'nuRole',
  attrs: 'nuAttrs',
  styles: 'nuStyles',
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
      Element.prototype[prototypeBind[key]] = val;
    }
  });

  if (!skipDefine) {
    customElements.define(tag, Element);
  }

  return Element;
}
