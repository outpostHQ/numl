import NuGroup from './group';
import { convertUnit, stripCalc } from '../helpers';

export default class NuBtnGroup extends NuGroup {
  static get nuTag() {
    return 'nu-btngroup';
  }

  static get nuBehaviors() {
    return {
      radiogroup: true,
      control: true,
    };
  }

  static get nuGenerators() {
    return {
      ...NuGroup.nuGenerators,
      border(val) {
        if (val == null) return val;

        const width = val
          ? convertUnit(val)
          : 'var(--nu-border-width)';

        return {
          $suffix: '>:not([border])',
          '--nu-local-border-shadow': `0 0 ${width} var(--nu-border-color)`,
          '--nu-v-gap': `calc(${stripCalc(width)} * -1) !important`,
          '--nu-h-gap': `calc(${stripCalc(width)} * -1) !important`,
        };
      },
    };
  }

  static get nuStyles() {
    return {
      gap: '--nu-border-width * -1',
      radius: '1r',
    };
  }

  static nuCSS({ css, tag }) {
    return [
      ...NuGroup.nuExtractCSS(this, tag),

      `${tag} > *:not([grow]) {
        flex-grow:1;
      }`,
    ];
  }
}
