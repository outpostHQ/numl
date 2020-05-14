import NuBtn from './btn';

export default class NuMenuitem extends NuBtn {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static get nuStyles() {
    return {
      padding: '1x',
      fill: 'transparent :current[hover]',
      width: '100%',
      flow: 'column',
      gap: '1x',
      content: 'center start',
      items: 'stretch',
      radius: '0',
      border: '0',
      color: ':current[special]',

      '--local-focus-inset': 'inset 0 0',
    };
  }

  static get nuBehaviors() {
    return {
      menuitem: true,
      button: null,
    };
  }
}
