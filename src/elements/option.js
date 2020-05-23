import NuBtn from './btn';

export default class NuOption extends NuBtn {
  static get nuTag() {
    return 'nu-option';
  }

  static get nuRole() {
    return 'option';
  }

  static get nuBehaviors() {
    return {
      option: true,
      button: null,
    };
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
}
