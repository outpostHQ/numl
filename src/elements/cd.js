import NuCode from './code';

export default class NuCd extends NuCode {
  static get nuTag() {
    return 'nu-cd';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      padding: '.125rem .25em',
      fill: 'hue(0 0 0) :special[#dark]',
    };
  }

  static get nuName() {
    return 'cd -code';
  }
}
