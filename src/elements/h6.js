import NuHeading from './heading';

export default class NuH6 extends NuHeading {
  static get nuTag() {
    return 'nu-h6';
  }

  static get nuAttrs() {
    return {
      level: 6,
    };
  }
}
