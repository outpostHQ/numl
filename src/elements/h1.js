import NuHeading from './heading';

export default class NuH1 extends NuHeading {
  static get nuTag() {
    return 'nu-h1';
  }

  static get nuAttrs() {
    return {
      level: 1,
    };
  }
}
