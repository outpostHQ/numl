import NuBlock from './block';

export default class NuListItem extends NuBlock {
  static get nuTag() {
    return 'nu-listitem';
  }

  static get nuRole() {
    return 'listitem';
  }

  static get nuId() {
    return 'listitem';
  }

  static get nuDefaults() {
    return {
      display: 'list-item',
    };
  }
}
