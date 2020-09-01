import NuCard from './card';

export default class NuListBox extends NuCard {
  static get nuTag() {
    return 'nu-listbox';
  }

  static get nuRole() {
    return 'listbox';
  }

  static get nuBehaviors() {
    return {
      listbox: true,
      focus: true,
    };
  }

  static get nuStyles() {
    return {
      padding: '1x 0',
      outline: 'n',
      gap: '1bw',
      border: 'y :focus[y #special]',
    };
  }
}
