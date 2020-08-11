import NuInput from './input';

export default class NuSearch extends NuInput {
  static get nuTag() {
    return 'nu-search';
  }

  static get nuBehaviors() {
    return {
      input: 'type(search)',
    };
  }
}
