import NuElement from './element';

export default class NuRegion extends NuElement {
  static get nuTag() {
    return 'nu-region';
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
