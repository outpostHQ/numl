import NuEl from './el';

export default class NuTable extends NuEl {
  static get nuTag() {
    return 'nu-table';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuStyles() {
    return {
      display: 'table',
      gap: '0',
    };
  }
}
