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

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'column',
      padding: '.5x',
      radius: '',
    };
  }
}
