import NuBase from '../base';

export default class NuDecorator extends NuBase {
  static get nuTag() {
    return 'nu-decorator'; // abstract tag
  }

  static get nuDefaults() {
    return {
      display: 'none',
    };
  }

  get nuParentContext() {
    return `#${this.parentNode.nuId}`;
  }
}
