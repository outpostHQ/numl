import NuFlex from './flex';

export default class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuStyles() {
    return {
      items: 'center',
    };
  }

  static get nuAttrs() {
    return {
      gap: '',
    };
  }
}
