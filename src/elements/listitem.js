import NuBlock from './block';

export default class NuListItem extends NuBlock {
  static get nuTag() {
    return 'nu-listitem';
  }

  static get nuRole() {
    return 'listitem';
  }

  static get nuStyles() {
    return {
      display: 'list-item',
    };
  }
}
