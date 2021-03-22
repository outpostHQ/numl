import NuEl from './el';

export default class NuOption extends NuEl {
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
      padding: '1x 1.5x',
      fill: '#clear :selected.disabled[#special-bg] :disabled[#local-bg]',
      outline: 'n :current[y focus-outside visible]',
      width: '100%',
      flow: 'column',
      gap: '1x',
      content: 'center start',
      items: 'stretch',
      radius: '.5r',
      border: '0',
      color: '#text',
      transition: 'theme',
      mark: 'hover',
      filter: 'n :disabled[saturate(0.33) contrast(0.88) opacity(var(--disabled-opacity))]',
      cursor: 'pointer :disabled[default]',
      inset: '.75em #shadow.0 :active[.75em #shadow.50] :selected[.75em #shadow.0] :active:selected[.75em #special-shadow.50]',
      text: 'sb nowrap',
    };
  }
}
