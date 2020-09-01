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
      focus: 'manual',
    };
  }

  static get nuStyles() {
    return {
      padding: '1x 0',
      outline: 'n',
      height: 'max 16',
      scrollbar: '',
      overflow: 'auto',
      place: 'top :multiple[outside-bottom]',
      gap: '1bw',
      border: 'y :focus[y #special]',
      shadow: 'special',
    };
  }
}
