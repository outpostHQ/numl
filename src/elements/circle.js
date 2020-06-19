import NuElement from './element';
import combinedAttr from '../attributes/combined';

export default class NuCircle extends NuElement {
  static get nuTag() {
    return 'nu-circle';
  }

  static get nuGenerators() {
    return {
      size(val) {
        if (!val) val = '1em';

        val = `${val} ${val}`;

        return combinedAttr([{
          width: val,
          height: val,
        }], NuCircle);
      }
    }
  }

  static get nuStyles() {
    return {
      display: 'block',
      size: '1em',
      radius: 'round',
      border: '',
      fill: 'bg :special[special]',
    };
  }
}
