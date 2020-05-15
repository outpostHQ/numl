import NuBlock from './block';

export default class NuGrid extends NuBlock {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      flow: 'grid-row',
    };
  }
}
