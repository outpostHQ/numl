import NuHeading from './heading';

export default class NuH3 extends NuHeading {
  static get nuTag() {
    return 'nu-h3';
  }

  static get nuAttrs() {
    return {
      level: 3,
    };
  }
}
