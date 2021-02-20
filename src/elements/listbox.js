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
      padding: '.5x',
      outline: 'n',
      gap: '0 :multiple[1bw]',
      border: 'y :focus[y #special]',
    };
  }
}
