import NuElement from './el';

export default class NuOption extends NuElement {
  static get nuTag() {
    return 'nu-option';
  }

  static get nuRole() {
    return 'option';
  }

  static get nuBehaviors() {
    return {
      option: true,
      active: true,
      hover: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'grid',
      padding: '1x 2x',
      fill: 'transparent :selected[special-bg]',
      outline: 'n :current[y focus-outside visible]',
      width: '100%',
      flow: 'column',
      gap: '1x',
      content: 'center start',
      items: 'stretch',
      radius: '0',
      border: '0',
      color: 'text',
      transition: 'theme',
      mark: 'hover :current[n]',
      opacity: '1 :disabled[--disabled-opacity]',
      cursor: 'pointer :disabled[default]',
      inset: 'n :active[y]',

      '--local-outline-inset': 'inset 0 0',
    };
  }
}
