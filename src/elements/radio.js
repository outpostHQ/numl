import NuActiveElement from './activeelement';

export default class NuRadio extends NuActiveElement {
  static get nuTag() {
    return 'nu-radio';
  }

  static get nuRole() {
    return 'radio';
  }

  static get nuAttrs() {
    return {
      fill: null,
    };
  }

  static get nuTemplate() {
    return `
      <nu-circle
        fill="^host clear :pressed[special] :disabled:pressed[text 50%]"
        transition="fill"
        border="0"></nu-circle>
    `;
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      width: '1em',
      height: '1em',
      border: '1b color(text) :disabled[1b color(text 50%)]',
      radius: 'round',
      content: 'stretch',
      items: 'center',
      padding: '1em / 8',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      hoverable: 'n :focusable[.5em]',
      toggle: '0 :active[.5em] :pressed[0]',
      fill: 'bg',
      expand: '.5em',
    };
  }
}
