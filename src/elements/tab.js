import NuActiveElement from './activeelement';
import DirectionMixin from '../mixins/direction';
import { DIRECTIONS } from '../helpers';

export default class NuTab extends NuActiveElement {
  static get nuTag() {
    return 'nu-tab';
  }

  static get nuRole() {
    return 'tab';
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      padding: '1x 0 :orient-v[0 2x]',
      fill: 'transparent',
      radius: '0',
      flow: `column`,
      gap: '1x',
      items: `center
         :dir-right[center end]
         :dir-left[center start]`,
      expand: `0 --local-h-gap :orient-v[--local-v-gap 0]`,
      border: `0
        ${DIRECTIONS.map(dir => `
          :dir-${dir}[--local-line-width ${dir} inside color(special)]`)}`,
      hoverable: null,

      '--local-line-width': `0
        :focusable:hover[1b]
        :pressed[3b]
        :hover:pressed[3b]
        :focusable:active[2b]
        :focusable:active:hover[2b]`,
    };
  }

  static get nuMixins() {
    return [DirectionMixin({
      initial() {
        return this.nuContext.direction
          ? (this.nuContext.direction || 'bottom')
          : 'bottom';
      },
    })]
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContextHook('direction', this.nuSetDirection.bind(this));
  }
}
