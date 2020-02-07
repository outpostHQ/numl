import NuBlock from './block';

export default class NuList extends NuBlock {
  static get nuTag() {
    return 'nu-list';
  }

  static get nuRole() {
    return 'list';
  }

  static get nuId() {
    return 'list';
  }

  static get nuDefaults() {
    return {
      flow: 'column',
      gap: '1x',
    };
  }
}
