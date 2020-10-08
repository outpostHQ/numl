import NuElement from './el';

export default class NuGroup extends NuElement {
  static get nuTag() {
    return 'nu-group';
  }

  static get nuRole() {
    return 'group';
  }

  static get nuBehaviors() {
    return {
      group: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      'group-radius': '(1r - 1bw)',
      gap: '0',
      radius: '',
      border: '',
      box: 'y',
    };
  }
}
