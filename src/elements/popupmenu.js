import NuPopup from './popup';

export default class NuPopupMenu extends NuPopup {
  static get nuTag() {
    return 'nu-popupmenu';
  }

  static get nuRole() {
    return 'menu';
  }

  static get nuName() {
    return 'menu'; // popup name is inherited
  }

  static get nuStyles() {
    return {
      flow: 'column',
      padding: '1x 0',
    };
  }

  static get nuBehaviors() {
    return {
      menu: true,
    };
  }
}
