import NuAction from './action';

export default class NuCheckbox extends NuAction {
  static get nuTag() {
    return 'nu-checkbox';
  }

  static get nuRole() {
    return 'checkbox';
  }

  static get nuTemplate() {
    return `
      <nu-icon
        name="check checkmark"
        size="1em"
        height="1em"
        opacity="--icon-opacity"
        transition="opacity"></nu-icon>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      width: '1em',
      height: '1em',
      border: '1bw #text :disabled[1bw #text.50]',
      radius: '.25em',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      color: 'special :disabled[text 66%]',
      fill: 'bg',
      cursor: 'default',
      text: 'v-middle',
      inset: '0 :active[.5em] :pressed[0] :active:pressed[.5em]',
      mark: ':focusable[.5em hover]',
      expand: '.5em',

      '--icon-opacity': ':pressed[1] 0',
    };
  }
}
