import NuBlock from './block';

export default class NuFlex extends NuBlock {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
    };
  }
}
