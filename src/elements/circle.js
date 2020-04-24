import NuElement from './element';
import combinedAttr from '../attributes/combined';

export default class NuCircle extends NuElement {
  static get nuTag() {
    return 'nu-circle';
  }

  static get nuAttrs() {
    return {
      size(val) {
        if (!val) val = '1em';

        val = `minmax(${val}, ${val})`;

        return combinedAttr([{
          width: val,
          height: val,
        }], NuCircle);
      }
    }
  }

  static get nuDefaults() {
    return {
      display: 'block',
      size: '1em',
      radius: 'round',
      border: '',
    };
  }
}
