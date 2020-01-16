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
      padding: '1x 0',
    };
  }

  nuConnected() {
    super.nuConnected();

    if (!this.hasAttribute('action')) {
      this.setAttribute('action', 'submit');
    }

    NuMenu.prototype.nuConnected.call(this);
  }
}
