import NuPane from './pane';

export default class NuNav extends NuPane {
  static get nuTag() {
    return 'nu-nav';
  }

  static get nuRole() {
    return 'navigation';
  }
}
