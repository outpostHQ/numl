import NuElement from './element';

export default class NuValue extends NuElement {
  static get nuTag() {
    return 'nu-value';
  }

  static get nuBehaviors() {
    return {
      value: true,
    };
  }
}
