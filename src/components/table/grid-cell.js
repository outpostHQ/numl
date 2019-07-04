import NuCell from './cell';
import NuGrid from '../grid';

export default class NuGridCell extends NuCell {
  static get nuTag() {
    return 'grid-cell';
  }

  static get nuAttrs() {
    return NuGrid.nuAttrs.concat(['type']);
  }
}
