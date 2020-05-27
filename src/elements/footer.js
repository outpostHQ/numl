import NuSection from './section';

export default class NuArticle extends NuSection {
  static get nuTag() {
    return 'nu-footer';
  }

  static get nuRole() {
    return 'contentinfo';
  }
}
