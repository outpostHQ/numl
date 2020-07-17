import NuAction from './action';

export default class NuMenuItem extends NuAction {
  static get nuTag() {
    return 'nu-menuitem';
  }

  static get nuRole() {
    return 'menuitem';
  }

  static get nuBehaviors() {
    return {
      menuitem: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '0',
      flow: 'column',
      gap: '1x',
      content: 'stretch',
      items: 'center stretch',
      mark: ':focusable[hover]',
      fill: 'clear',
      text: 'nowrap :special[sb nowrap]',
      inset: 'n :active:focusable[y] :pressed:focusable[y] :pressed[y] :pressed:active[y]',
    };
  }
}
