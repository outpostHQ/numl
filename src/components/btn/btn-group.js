import './btn-group.css';
import NuFlex from '../flex';
import {
  FLEX_ATTRS,
  FLEX_ITEM_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../attrs';
import {
  unit,
  convertUnit,
} from '../../helpers';
import NuElement from '../element';
import { inject } from '../../css';

const defaultAttrs = {
  gap: 'calc(var(--nu-theme-border-width) * -1)',
  flow: 'row',
  'items-grow': 1,
};

export default class NuBtnGroup extends NuFlex {
  static get nuTag() {
    return 'nu-btn-group';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...FLEX_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      padding: '',
      'items-padding': unit('padding', true),
      border(val) {
        if (val == null) return val;

        const width = val ? convertUnit(val) : 'var(--nu-theme-border-width)';

        return {
          $suffix: ':not([border])',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
          '--nu-flex-gap': `calc(${width} * -1)`,
        };
      },
    });
  }

  static get nuDefaultAttrs() {
    return defaultAttrs;
  }

  nuGenerate(name, value) {
    let styles = super.nuGenerate(name, value) || [];

    if (name === 'border') {
      value = value ? `calc(${convertUnit(value)} * -1)` : defaultAttrs.gap;

      styles.push(...this.nuGenerate('gap', value));
    }

    return styles;
  }
}
