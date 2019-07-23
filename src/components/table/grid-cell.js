import NuCell from './cell';
import NuGrid from '../grid';
import NuComponent from '../component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...NuGrid.nuAttrs,
  'type': '',
});

export default class NuGridCell extends NuCell {
  static get nuTag() {
    return 'grid-cell';
  }

  static get nuAttrs() {
    return attrs;
  }
}
