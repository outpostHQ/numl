import NuRadioGroup from './radiogroup';
import NuFlex from './flex';
import { convertUnit } from '../helpers';

const FLOW_ATTR = NuFlex.nuAllAttrs.flow;

export default class NuBtnGroup extends NuRadioGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  static get nuAttrs() {
    return {
      padding: '',
      value: '',
      flow(val, defaults) {
        if (!val) return;

        return [
          ...FLOW_ATTR(val, defaults),
          {
            $suffix: `:not([gap]) > :first-child:not(:last-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? 'var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius) !important'
              : 'var(--nu-item-border-radius) var(--nu-item-border-radius) 0 0 !important'
          },
          {
            $suffix: `:not([gap]) > :last-child:not(:first-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? '0 var(--nu-item-border-radius) var(--nu-item-border-radius) 0 !important'
              : '0 0 var(--nu-item-border-radius) var(--nu-item-border-radius) !important'
          }
        ];
      },
      border(val) {
        if (val == null) return val;

        const width = val ? convertUnit(val) : 'var(--nu-theme-border-width)';

        return {
          $suffix: ':not([border])',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
          '--nu-flex-gap': `calc(${width} * -1)`
        };
      },
    };
  }

  static get nuDefaults() {
    return {
      flow: 'row',
      gap: 'calc(var(--nu-theme-border-width) * -1)',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-item-border-radius: var(--nu-border-radius);

        border-radius: var(--nu-border-radius, .5rem);
      }
      ${nuTag} > * {
        --nu-flex-gap: calc(var(--nu-theme-border-width) * -1);

        flex-grow:1;
      }
      ${nuTag}:not([gap]) > * {
        --nu-flex-gap: calc(var(--nu-theme-border-width) * -1);
      }
      ${nuTag}:not([gap]) > :not(:last-child):not(:first-child) {
        --nu-border-radius: 0 !important;
      }
      ${nuTag}:not([gap]) > :last-child:first-child {
        --nu-border-radius: inherit !important;
      }
    `;
  }
}
