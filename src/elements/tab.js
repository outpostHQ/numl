import NuAction from './action';

export default class NuTab extends NuAction {
  static get nuTag() {
    return 'nu-tab';
  }

  static get nuRole() {
    return 'tab';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      fill: '#clear',
      flow: 'column',
      gap: '1x',
      items: '@local-tab-items',
      padding: '@local-tab-padding-v @local-tab-padding-h',
      border: '--local-line-width ${direction} bottom inside #special',
      expand: '@local-tab-expand-v @local-tab-expand-h',
      mark: null,
      text: 'sb nowrap',
      transition: 'border, color',
      color: '#text :pressed[#special]',

      '@local-line-width': `0
        :hover[1bw]
        :pressed[1ow]
        :active[1ow - 1bw]
        :active:hover[1ow - 1bw]
        :pressed:hover[1ow]
        :pressed:active.hover[1ow]`,
    };
  }
}
