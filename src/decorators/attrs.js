import NuDecorator from './decorator';
import { getAllAttrs, ELEMENTS_MAP } from '../base';
import { computeStyles, log } from '../helpers';
import { generateCSS } from '../css';

function getSelector(id) {
  const isTag = !!ELEMENTS_MAP[id];

  if (isTag) {
    return id;
  }

  return `[as*="${id}"], [id="${id}"], [id^="${id}--"]`;
}

export default class NuAttrs extends NuDecorator {
  static get nuTag() {
    return 'nu-attrs';
  }

  static get nuAttrsList() {
    return ['for'].concat(getAllAttrs());
  }

  nuConnected() {
    super.nuConnected();

    setTimeout(() => {
      this.nuApply();
    });
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) {
      return;
    }

    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;
    const id = this.getAttribute('for');

    if (!parent.nuContext || !id) return;

    const attrs = this.nuOwnAttrs;
    const define = {};

    delete attrs.for;

    Object.keys(attrs).forEach(name => {
      define[name] = attrs[name];
    });

    define.$shadowRoot = this.nuContext.$shadowRoot;

    parent.nuSetContext(`attrs:${id}`, define);

    const selector = getSelector(id);
    const shadow = id.startsWith('$');

    parent.nuVerifyChildren({ attrs: selector, shadow });
  }

  nuGetCriticalCSS() {
    const parent = this.parentNode;
    const uniqId = parent.nuUniqId;

    if (!uniqId || uniqId.includes('--')) return '';

    const id = this.getAttribute('for');
    const attrs = this.nuOwnAttrs;
    const selector = getSelector(id);
    const Element = ELEMENTS_MAP[id] || ELEMENTS_MAP['nu-el'];
    const context = `#${uniqId}`;

    delete attrs.for;

    let styles, query, css = '';

    Object.keys(attrs).forEach(name => {
      const value = attrs[name];

      styles = computeStyles(name, value, Element.nuAllAttrs, Element.nuAllDefaults);

      if (styles) {
        selector.split(', ').forEach(sel => {
          query = `${context} ${sel}:not([${name}])`;

          css += generateCSS(query, styles, '', true);
        });
      }
    });

    return css;
  }

  nuDisconnected() {
    super.nuDisconnected();
  }
}
