import NuDefinition from './definition';
import { getAllAttrs, ELEMENTS_MAP } from '../elements/base';

function getSelector(id, oldId) {
  id = id.replace(/^\$+/, '');
  oldId = oldId ? oldId.replace(/^\$+/, '') : null;

  return `* > nu-attrs[for="${id}"], ${(!ELEMENTS_MAP[id] ? `[as*="${id}"], [id="${id}"], [id^="${id}--"], [nu-${id}]` : id)}${
    oldId
      ? `, * > nu-attrs[for="${oldId}"]${(!ELEMENTS_MAP[oldId]
        ? `, [as*="${oldId}"], [id="${oldId}"], [id^="${oldId}--"], [nu-${oldId}]`
        : `, ${oldId}`)}`
      : ''}`;
}

export default class NuAttrs extends NuDefinition {
  static get nuTag() {
    return 'nu-attrs';
  }

  static get nuGeneratorsList() {
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

    this.nuApply();
  }

  nuApply() {
    if (!this.nuIsConnected) {
      return;
    }

    const parent = this.parentNode;
    let id = this.getAttribute('for');

    if (!this.nuContext.allowShadow) {
      id = id.replace(/^\$+/, '');
    }

    // Clear previous declaration
    const oldId = this.nuFor !== id ? this.nuFor : null;

    if (oldId) {
      parent.nuSetContext(`attrs:${oldId}`, null);
    }

    if (!parent.nuContext || !id) return;

    this.nuParent = parent;
    this.nuFor = id;

    const attrs = this.nuOwnAttrs;
    const key = `attrs:${id}`;
    const parentDefine = parent.nuParentContext[key];
    const define = parentDefine ? Object.assign({}, parentDefine) : {};

    delete attrs.for;

    Object.keys(attrs).forEach(name => {
      define[name] = attrs[name];
    });

    define.$shadowRoot = this.nuContext.$shadowRoot;

    parent.nuSetContext(`attrs:${id}`, define);

    const selector = getSelector(id, oldId);
    const shadow = id.startsWith('$') || (oldId && oldId.startsWith('$'));

    parent.nuVerifyChildren({ attrs: selector, shadow, ignore: parent.nuQueryChildren('nu-attrs') });
  }

  // nuGetCriticalCSS() {
  //   const parent = this.parentNode;
  //   const uniqId = parent.nuUniqId;

  //   if (!uniqId || uniqId.includes('--')) return '';

  //   const id = this.getAttribute('for');
  //   const attrs = this.nuOwnAttrs;
  //   const selector = getSelector(id);
  //   const Element = ELEMENTS_MAP[id] || ELEMENTS_MAP['nu-el'];
  //   const context = `#${uniqId}`;

  //   delete attrs.for;

  //   let styles, query, css = '';

  //   Object.keys(attrs).forEach(name => {
  //     const value = attrs[name];

  //     styles = computeStyles(name, value, Element.nuAllGenerators, Element.nuAllStyles);

  //     if (styles) {
  //       selector.split(', ').forEach(sel => {
  //         query = `${context} ${sel}:not([${name}])`;

  //         css += generateCSS(query, styles, true);
  //       });
  //     }
  //   });

  //   return css;
  // }

  nuDisconnected() {
    super.nuDisconnected();

    const parent = this.nuParent;

    if (!parent) return;

    const id = this.getAttribute('for');
    const selector = getSelector(id);
    const shadow = id.startsWith('$');

    parent.nuSetContext(`attrs:${id}`, null);

    parent.nuVerifyChildren({ attrs: selector, shadow });
  }
}

// lgtm [js/mixed-static-instance-this-access]
