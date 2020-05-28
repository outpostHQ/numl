import NuRegion from './region';

export default class NuArticle extends NuRegion {
  static get nuTag() {
    return 'nu-article';
  }

  static get nuRole() {
    return 'article';
  }
}
