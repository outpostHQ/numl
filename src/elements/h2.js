import NuHeading from './heading';

export default class NuH2 extends NuHeading {
  static get nuTag() {
    return 'nu-h2';
  }

  static get nuAttrs() {
    return {
      level: 2,
    };
  }
}
