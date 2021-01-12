import NuEl from './el';

export default class NuNum extends NuEl {
  static get nuTag() {
    return 'nu-num';
  }

  static get nuBehaviors() {
    return {
      number: true,
    };
  }
}
