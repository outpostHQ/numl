import NuGrid from './grid';

export default class NuBanner extends NuGrid {
  static get nuTag() {
    return 'layout';
  }

  static get nuRole() {
    return 'banner';
  }
}
