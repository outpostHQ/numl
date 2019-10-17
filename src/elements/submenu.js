import NuPopupMenu from './popupmenu';

export default class NuSubMenu extends NuPopupMenu {
  static get nuTag() {
    return 'nu-submenu';
  }

  static get nuDefaults() {
    return {
      padding: '.5 0',
      space: '.5 0 0 0',
      place: 'outside-right top',
    };
  }
}
