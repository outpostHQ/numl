import NuFlex from './flex';

export default class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuDefaults() {
    return {
      content: 'stretch space-between',
      items: 'center',
      gap: .5,
      width: '100%',
    };
  }
}
