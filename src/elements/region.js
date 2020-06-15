import NuFlow from './flow';

export default class NuRegion extends NuFlow {
  static get nuTag() {
    return 'nu-region';
  }

  static get nuRole() {
    return 'region';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}
