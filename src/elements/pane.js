import NuFlex from './flex';

export default class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuName() {
    return '';
  }

  static get nuStyles() {
    return {
      items: 'center',
      gap: '',
    };
  }
}
