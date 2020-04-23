import NuElement from './element';

export default class NuNum extends NuElement {
  static get nuTag() {
    return 'nu-num';
  }

  static get nuAttrs() {
    return {
      value: '',
      lang: '',
      type: '',
      code: '',
      sign: '',
      unit: '',
      notation: '',
      fallback: '',
      significant: '',
      integer: '',
      decimal: '',
    };
  }

  static get nuBehaviors() {
    return {
      number: true,
    };
  }
}
