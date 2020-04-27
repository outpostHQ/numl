import NuFlex from './flex';

export default class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuDefaults() {
    return {
      items: 'center',
      gap: '',
    };
  }
}
