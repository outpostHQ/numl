import NuGrid from './grid';

export default class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-gridtable';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuStyles() {
    return {
      width: 'min-content',
      color: '',
      overflow: 'auto',
      padding: '1x',
    };
  }

  static get nuContext() {
    return {
      'attrs:cell': {
        shadow: '0 1bw 0 #border',
      },
    };
  }
}
