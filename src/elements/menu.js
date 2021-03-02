import NuEl from './el';

export default class NuMenu extends NuEl {
  static get nuTag() {
    return 'nu-menu';
  }

  static get nuRole() {
    return 'menu';
  }

  static get nuBehaviors() {
    return {
      menu: true,
    };
  }

  static get nuContext() {
    return {
      'attrs:popup': {
        width: '(100% + 1x) 100vw :drop[--fixate-width min-content 100vw]',
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'column',
      padding: '.5x',
      radius: '',
    };
  }
}
