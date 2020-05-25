import NuActiveElement from './activeelement';

export default class NuTab extends NuActiveElement {
  static get nuTag() {
    return 'nu-tab';
  }

  static get nuRole() {
    return 'tab';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      fill: 'transparent',
      radius: '0',
      flow: 'column',
      gap: '1x',
      items: '--local-tab-items',
      padding: '--local-tab-padding-v --local-tab-padding-h',
      border: '0',
      expand: '--local-tab-expand-v --local-tab-expand-h',
      hoverable: null,

      '--local-line-width': `0
        :focusable:hover[1bw]
        :pressed[1sw]
        :hover:pressed[1sw]
        :focusable:active[1sw - 1bw]
        :focusable:active:hover[1sw - 1bw]`,
    };
  }
}
