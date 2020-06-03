import NuHeading from './heading';

export default class NuH4 extends NuHeading {
  static get nuTag() {
    return 'nu-h4';
  }

  static get nuAttrs() {
    return {
      level: 4,
    };
  }
}
