import { GRID_ITEM_ATTRS, FLEX_ITEM_ATTRS } from '../attrs';
import { sizeUnit } from '../helpers';
import NuElement from './element';

export default class NuBlock extends NuElement {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuDefaults() {
    return {
      display: 'block',
    };
  }
}
