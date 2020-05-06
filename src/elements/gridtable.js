import { unit } from '../helpers';
import NuGrid from './grid';

export default class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-gridtable';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuAttrs() {
    return {
      padding: unit('--nu-cell-padding', {
        convert: true,
      }),
    };
  }

  static get nuDefaults() {
    return {
      gap: '1b',
      color: '',
      overflow: 'auto',
      fill: 'border',
      padding: '1x',
    };
  }
}
