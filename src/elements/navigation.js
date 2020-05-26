import NuPane from './pane';

export default class Navigation extends NuPane {
  static get nuTag() {
    return 'nu-navigation';
  }

  static get nuRole() {
    return 'navigation';
  }
}
