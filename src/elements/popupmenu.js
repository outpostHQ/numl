import NuPopup from './popup';

export default class NuPopupMenu extends NuPopup {
  static get nuTag() {
    return 'nu-popupmenu';
  }

  static get nuRole() {
    return 'menu';
  }

  static get nuDefaults() {
    return {
      display: 'flex',
      flow: 'column',
      padding: '.5 0',
    };
  }
}
