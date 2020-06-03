import NuHeading from './heading';

export default class NuH5 extends NuHeading {
  static get nuTag() {
    return 'nu-h5';
  }

  static get nuAttrs() {
    return {
      level: 5,
    };
  }
}
