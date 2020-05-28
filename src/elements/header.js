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
      fill: 'bg',
      shadow: '0 :sticky[1]',
      width: '100%',
      z: 'front',
      border: 'bottom',
      transition: 'all',
    };
  }
}
