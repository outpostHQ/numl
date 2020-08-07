import NuElement from './el';

export default class NuNum extends NuElement {
  static get nuTag() {
    return 'nu-num';
  }

  static get nuBehaviors() {
    return {
      number: true,
    };
  }
}
