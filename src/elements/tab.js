import NuActiveElement from './activeelement';

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
        :focusable:hover[1b]
        :pressed[3b]
        :hover:pressed[3b]
        :focusable:active[2b]
        :focusable:active:hover[2b]`,
    };
  }
}
