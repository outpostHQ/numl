import NuFlow from './flow';

export default class NuMenu extends NuFlow {
  static get nuTag() {
    return 'nu-menu';
  }

  static get nuRole() {
    return 'menu';
  }
}
