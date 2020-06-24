import NuElement from './element';

export default class NuFlow extends NuElement {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}
