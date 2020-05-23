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
    };
  }

  static get nuStyles() {
    return {
      padding: '1x 0',
      focusable: 'n',
      height: 'max 10',
      scrollbar: '',
      overflow: 'auto',
    };
  }
}
