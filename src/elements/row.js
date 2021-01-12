import NuEl from './el';

export default class NuRow extends NuEl {
  static get nuTag() {
    return 'nu-row';
  }

  static get nuRole() {
    return 'row';
  }

  static get nuStyles() {
    return {
      display: 'table-row',
      shadow: '0 1px 0 #border',
    };
  }
}
