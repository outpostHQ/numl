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
      padding: '1x 0',
      fill: 'transparent',
      radius: '0',
      flow: 'column',
      gap: '1x',
      items: 'center',
      border: `0
        :hover[1b bottom inside color(special)]
        :pressed[3b bottom inside color(special)]
        :hover:pressed[3b bottom inside color(special)]
        :active:pressed[3b bottom inside color(special)]
        :active:hover[2b bottom inside color(special)]`,
      hoverable: null,
    };
  }
}
