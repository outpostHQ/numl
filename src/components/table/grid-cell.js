import NuCell from './cell';
import NuGrid from '../grid';
import NuElement from '../element';

export default class NuGridCell extends NuCell {
  static get nuTag() {
    return 'grid-cell';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...NuGrid.nuAttrs,
      'type': '',
    });
  }
}
