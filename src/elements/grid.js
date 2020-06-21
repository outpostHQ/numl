import NuElement from './element';

export default class NuGrid extends NuElement {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      flow: 'grid-row',
    };
  }
}
