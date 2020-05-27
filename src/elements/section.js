import NuRegion from './region';

export default class NuSection extends NuRegion {
  static get nuTag() {
    return 'nu-section';
  }

  static get nuRole() {
    return 'section';
  }
}
