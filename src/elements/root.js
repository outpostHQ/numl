import NuEl from './el';

export default class NuRoot extends NuEl {
  static get nuTag() {
    return 'nu-root';
  }

  static get nuStyles() {
    return {
      display: 'block',
      text: 'n',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.style.opacity = '';
  }
}
