import NuElement from './el';

export default class NuMenu extends NuElement {
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
    };
  }
}
