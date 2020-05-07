import NuElement from './element';

export default class NuDateTime extends NuElement {
  static get nuTag() {
    return 'nu-datetime';
  }

  static get nuBehaviors() {
    return {
      datetime: true,
    };
  }
}
