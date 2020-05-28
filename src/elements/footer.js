import NuRegion from './region';

export default class NuArticle extends NuRegion {
  static get nuTag() {
    return 'nu-footer';
  }

  static get nuRole() {
    return 'contentinfo';
  }
}
