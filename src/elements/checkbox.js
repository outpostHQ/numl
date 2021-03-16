import NuAction from './action';

export default class NuCheckbox extends NuAction {
  static get nuTag() {
    return 'nu-checkbox';
  }

  static get nuRole() {
    return 'checkbox';
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuTemplate() {
    return `
      <nu-icon
        name="check checkmark"
        size="1em"
        height="1em"
        width="1em"
        color="^ #clear :pressed[#special-text]"
        fill="^ #bg :pressed[#special-bg]"
        transition="fill, color, opacity, inset"
        transition="opacity"
        inset="^ 0 :active[.5em] :pressed[0] :active:pressed[.5em]"></nu-icon>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      width: '1em',
      height: '1em',
      border: '#text :disabled.pressed[#text.50] :pressed[#special-bg]',
      radius: '.25em',
      content: 'stretch',
      items: 'center',
      padding: '0',
      overflow: 'n',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      mark: '.5em hover :disabled[n]',
      expand: '.5em',
      inset: 'n',
    };
  }
}
