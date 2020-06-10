import NuPopup from './popup';

export default class NuPopupListBox extends NuPopup {
  static get nuTag() {
    return 'nu-popuplistbox';
  }

  static get nuRole() {
    return 'listbox';
  }

  static get nuName() {
    return 'listbox';
  }

  static get nuBehaviors() {
    return {
      listbox: true,
      focusable: 'manual',
    };
  }

  static get nuStyles() {
    return {
      padding: '1x 0',
      outline: 'focus',
      height: 'max 16',
      scrollbar: '',
      overflow: 'auto',
    };
  }
}
