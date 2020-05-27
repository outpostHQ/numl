import NuSection from './section';

export default class NuMain extends NuSection {
  static get nuTag() {
    return 'nu-main';
  }

  static get nuRole() {
    return 'main';
  }
}
