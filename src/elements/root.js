import NuElement from './element';

export default class NuRoot extends NuElement {
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
