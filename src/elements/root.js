import NuElement from './element';

export default class NuRoot extends NuElement {
  static get nuTag() {
    return 'nu-root';
  }

  static get nuDefaults() {
    return {
      display: 'block',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.style.opacity = '';
  }
}
