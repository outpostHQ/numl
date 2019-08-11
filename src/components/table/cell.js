import NuBlock from '../block';
import NuElement from '../element';

export default class NuCell extends NuBlock {
  static get nuTag() {
    return 'nu-cell';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...NuBlock.nuAttrs,
    });
  }
}
