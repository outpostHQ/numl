import {
  PLACE_ATTRS,
} from '../attrs';
import { unit } from '../helpers';
import NuBlock from './block';

export default class NuGrid extends NuBlock {
  static get nuTag() {
    return 'nu-grid';
  }

  static get nuDisplay() {
    return 'grid';
  }

  static get nuDefaults() {
    return {
      flow: 'row',
    };
  }

  static get nuAttrs() {
    return {
      ...PLACE_ATTRS,
      'template-areas': 'grid-template-areas',
      areas: 'grid-template-areas',
      'auto-flow': 'grid-auto-flow',
      flow: 'grid-auto-flow',
      'template-columns': unit('grid-template-columns'),
      'template-rows': unit('grid-template-rows'),
      cols: unit('grid-template-columns'),
      rows: unit('grid-template-rows'),
      gap: unit('grid-gap'),
    };
  }
}
