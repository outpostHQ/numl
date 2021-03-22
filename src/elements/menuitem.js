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
      padding: '1x 1.5x',
      border: '0',
      radius: '.5r',
      flow: 'column',
      gap: '1x',
      content: 'stretch',
      items: 'center stretch',
      mark: 'hover',
      fill: '#clear',
      text: 'sb nowrap :special[sb nowrap]',
      inset: 'n :active[#shadow.50]',
    };
  }
}
