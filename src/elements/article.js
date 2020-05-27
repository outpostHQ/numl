import NuSection from './section';

export default class NuArticle extends NuSection {
  static get nuTag() {
    return 'nu-article';
  }

  static get nuRole() {
    return 'article';
  }
}
