import NuPopup from './popup';
import NuMenu from './menu';

export default class NuPopupMenu extends NuPopup {
  static get nuTag() {
    return 'nu-popupmenu';
  }

  static get nuRole() {
    return 'menu';
  }

  static get nuDefaults() {
    return {
      flow: 'column',
      padding: '.5 0',
    };
  }

  nuConnected() {
    super.nuConnected();

    NuMenu.prototype.nuConnected.call(this);
  }
}
