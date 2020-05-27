import NuRegion from './region';

export default class NuMain extends NuRegion {
  static get nuTag() {
    return 'nu-main';
  }

  static get nuRole() {
    return 'main';
  }
}
