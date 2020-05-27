import NuElement from './element';

export default class NuSection extends NuElement {
  static get nuTag() {
    return 'nu-section';
  }

  static get nuRole() {
    return 'region';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}
