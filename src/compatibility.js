import { log } from './helpers';

const ALL_ELEMENT_PROPS = Object.keys(HTMLElement.prototype).concat(Object.keys(Element.prototype));

export const GLOBAL_ATTRS = ['accesskey', 'autocapitalize', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'itemprop', 'lang', 'slot', 'spellcheck', 'style', 'tabindex', 'title', 'translate'];

const MAP = {};

export function checkPropIsDeclarable(name) {
  if (MAP[name] != null) return MAP[name];

  let result = true;

  if (GLOBAL_ATTRS.includes(name)) {
    result = false;
  } else if (ALL_ELEMENT_PROPS.includes(name)) {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, name) || Object.getOwnPropertyDescriptor(Element.prototype, name);

    if (descriptor) {
      if (descriptor.value && typeof descriptor.value === 'function') {
        result = false;
      }
    }
  } else {
    return false;
  }

  MAP[name] = result;

  return result;
}

export function declareProp(Element, name) {
  log(`compatibility mode for ${Element.nuTag}[${name}]`);
  Object.defineProperty(Element.prototype, name, {
    enumerable: false,
    set: function(val) {
      this.setAttribute(name, val);
    },
    get: function() {
      return this.getAttribute(name);
    }
  });
}
