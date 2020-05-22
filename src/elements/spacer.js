import NuBlock from './block';
import combinedAttr from '../attributes/combined';

export default class NuSpacer extends NuBlock {
  static get nuTag() {
    return 'nu-spacer';
  }

  static get nuGenerators() {
    return {
      size(val) {
        if (!val) val = '1x';

        val = `min ${val}`;

        return combinedAttr([{
          width: val,
          height: val,
          basis: val,
        }], NuSpacer);
      },
    };
  }

  static get nuStyles() {
    return {
      basis: '1x',
      size: '1x',
    };
  }
}
