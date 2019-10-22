import NuRadioGroup from './radiogroup';
import NuGroup from './group';
import { convertUnit } from '../helpers';

export default class NuBtnGroup extends NuRadioGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuAttrs() {
    return {
      padding: '',
      value: '',
      ...NuGroup.nuAttrs,
      border(val) {
        if (val == null) return val;

        const width = val ? convertUnit(val) : 'var(--nu-theme-border-width)';

        return {
          $suffix: '>:not([border])',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
          '--nu-gap': `calc(${width} * -1)`
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

  static nuCSS({ nuTag }) {
    return `
      ${NuGroup.nuCSS({ nuTag })}
      
      ${nuTag} > *:not([grow]) {
        flex-grow:1;
      }
    `;
  }
}
