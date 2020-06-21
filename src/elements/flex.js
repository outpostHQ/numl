import NuElement from './element';

export default class NuFlex extends NuElement {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
    };
  }
}
