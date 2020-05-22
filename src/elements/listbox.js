import NuFlow from './flow';

export default class NuListBox extends NuFlow {
  static get nuTag() {
    return 'nu-listbox';
  }

  static get nuRole() {
    return 'listbox';
  }

  static get nuBehaviors() {
    return {
      listbox: true
    };
  }
}
