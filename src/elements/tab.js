import NuActiveElement from './activeelement';
import DirectionMixin from '../mixins/direction';

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
      padding: '1x 0 :orient-y[0 2x]',
      fill: 'transparent',
      radius: '0',
      flow: `column`,
      gap: '1x',
      items: `center
         :dir-right[center end]
         :dir-left[center start]`,
      border: `0
        :dir-bottom:focusable:hover[1b bottom inside color(special)]
        :dir-bottom:pressed[3b bottom inside color(special)]
        :dir-bottom:hover:pressed[3b bottom inside color(special)]
        :dir-bottom:focusable:active[2b bottom inside color(special)]
        :dir-bottom:focusable:active:hover[2b bottom inside color(special)]

        :dir-right:focusable:hover[1b right inside color(special)]
        :dir-right:pressed[3b right inside color(special)]
        :dir-right:hover:pressed[3b right inside color(special)]
        :dir-right:focusable:active[2b right inside color(special)]
        :dir-right:focusable:active:hover[2b right inside color(special)]

        :dir-top:focusable:hover[1b top inside color(special)]
        :dir-top:pressed[3b top inside color(special)]
        :dir-top:hover:pressed[3b top inside color(special)]
        :dir-top:focusable:active[2b top inside color(special)]
        :dir-top:focusable:active:hover[2b top inside color(special)]

        :dir-left:focusable:hover[1b left inside color(special)]
        :dir-left:pressed[3b left inside color(special)]
        :dir-left:hover:pressed[3b left inside color(special)]
        :dir-left:focusable:active[2b left inside color(special)]
        :dir-left:focusable:active:hover[2b left inside color(special)]`,
      hoverable: null,
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
