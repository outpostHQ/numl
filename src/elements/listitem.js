import NuEl from './el';

export default class NuListItem extends NuEl {
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
