import NuRegion from './region';

export default class NuHeader extends NuRegion {
  static get nuTag() {
    return 'nu-header';
  }

  static get nuRole() {
    return 'banner';
  }

  static get nuStyles() {
    return {
      fill: '#bg',
      z: 'front',
      transition: 'all',
    };
  }
}
