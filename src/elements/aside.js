import NuRegion from './region';

export default class NuAside extends NuRegion {
  static get nuTag() {
    return 'nu-aside';
  }

  static get nuRole() {
    return 'complementary';
  }
}
