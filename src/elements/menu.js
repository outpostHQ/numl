import NuFlow from './flow';

export default class NuMenu extends NuFlow {
  static get nuTag() {
    return 'nu-menu';
  }

  static get nuRole() {
    return 'menu';
  }

  nuConnected() {
    super.nuConnected();

    this.addEventListener('submit', (event) => {
      this.nuEmit('input', event.detail, { bubbles: false });
    });
  }
}
