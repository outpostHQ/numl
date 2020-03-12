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

    this.addEventListener('tap', (event) => {
      if (event.nuRole !== 'menuitem') return;

      if (this.getAttribute('action') === 'submit') {
        this.nuEmit('submit', event.detail);
      }

      this.nuEmit('input', event.detail, { bubbles: false });
    });
  }
}
