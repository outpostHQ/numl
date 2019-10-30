import NuElement from './element';
import { unit } from '../helpers';

const borderAttr = NuElement.nuAttrs.border;

export default class NuCell extends NuElement {
  static get nuTag() {
    return 'nu-cell';
  }

  static get nuRole() {
    return 'cell';
  }

  static get nuId() {
    return 'cell';
  }

  static get nuAttrs() {
    return {
      radius: unit('border-radius', {
        multiplier: 'var(--nu-border-radius)',
        empty: 'var(--nu-border-radius)',
        convert: true,
      }),
      border(val) {
        if (val == null) return;

        if (!val) {
          return { border: 'var(--nu-border-width)'};
        }

        return borderAttr(val);
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'table-cell',
      padding: 'var(--nu-padding)',
      // border: '',
    };
  }
}
