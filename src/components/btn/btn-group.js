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
          $children: 'border',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
        };
      },
    });
  }

  static get nuDefaultAttrs() {
    return defaultAttrs;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'border') {
      value = value ? `calc(${convertUnit(value)} * -1)` : defaultAttrs.gap;

      this.setAttribute('gap', value);
    }
  }
}
