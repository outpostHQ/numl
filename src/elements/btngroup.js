import NuRadioGroup from './radiogroup';
import NuGroup from './group';
import { convertUnit, stripCalc } from '../helpers';

export default class NuBtnGroup extends NuRadioGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuId() {
    return 'btngroup';
  }

  static get nuAttrs() {
    return {
      padding: '',
      value: '',
      ...NuGroup.nuAttrs,
      border(val) {
        if (val == null) return val;

        const width = val
          ? convertUnit(val, 'var(--nu-theme-border-width)')
          : 'var(--nu-theme-border-width)';

        return {
          $suffix: '>:not([border])',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
          '--nu-v-gap': `calc(${stripCalc(width)} * -1) !important`,
          '--nu-h-gap': `calc(${stripCalc(width)} * -1) !important`,
        };
      },
    };
  }

  static get nuDefaults() {
    return {
      gap: 'calc(var(--nu-theme-border-width) * -1)',
      radius: '1x',
    };
  }

  static nuCSS({ tag }) {
    return `
      ${NuGroup.nuExtractCSS(this)}
      
      ${tag} > *:not([grow]) {
        flex-grow:1;
      }
    `;
  }
}
