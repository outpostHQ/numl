import NuSection from './section';

export default class NuHeader extends NuSection {
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
