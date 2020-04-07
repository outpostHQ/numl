import NuFormatter from './formatter';

export default class NuNum extends NuFormatter {
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

  static get nuFormatter() {
    return import('../formatters/number');
  }
}
