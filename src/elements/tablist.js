import NuRadioGroup from './radiogroup';
import combinedAttr from '../attributes/combined';
import { convertUnit, DIRECTIONS } from '../helpers';

const ITEMS_MAP = {
  right: 'center end',
  left: 'center start',
};
const ORIENT_V = ['left', 'right'];

export default class NuTablist extends NuRadioGroup {
  static get nuTag() {
    return 'nu-tablist';
  }

  static get nuRole() {
    return 'tablist';
  }

  static get nuAttrs() {
    return {
      direction(val) {
        let direction = DIRECTIONS.includes(val) ? val : 'bottom';
        const orientV = ORIENT_V.includes(direction);

        return combinedAttr([{
          $suffix: '>[role="tab"]',
          border: `--local-line-width ${direction} inside color(special)`,
        }, {
          flow: orientV ? 'column' : 'row',
        }], NuTablist).concat({
          '--nu-local-tab-items': ITEMS_MAP[direction] || 'center',
          '--nu-local-tab-padding-h': orientV ? convertUnit('2x') : '0',
          '--nu-local-tab-padding-v': orientV ? '0' : convertUnit('1x'),
          '--nu-local-tab-expand-h': orientV ? '0' : '--local-h-gap',
          '--nu-local-tab-expand-v': orientV ? '--local-v-gap' : '0',
          '--nu-local-tab-gap': orientV ? convertUnit('1x') : convertUnit('2x'),
        });
      },
    }
  }

  static get nuDefaults() {
    return {
      direction: 'bottom',
      gap: '--local-tab-gap',
      flow: null,
    };
  }

  static get nuItemRole() {
    return 'tab';
  }

  static get nuMixins() {
    return {
      orient: { aria: true },
    };
  }

  nuInit() {
    super.nuInit();

    this.addEventListener('focusin', async () => {
      (await this.nuMixin('orient'))
        .set(getComputedStyle(this).flexFlow.includes('column') ? 'v' : 'h');
    });
  }
}
