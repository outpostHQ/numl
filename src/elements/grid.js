import NuEl from './el';

export default class NuGrid extends NuEl {
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
