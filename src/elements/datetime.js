import NuEl from './el';

export default class NuDateTime extends NuEl {
  static get nuTag() {
    return 'nu-datetime';
  }

  static get nuBehaviors() {
    return {
      datetime: true,
    };
  }
}
