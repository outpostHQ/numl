import NuActiveElement from './activeelement';

export default class NuRadio extends NuActiveElement {
  static get nuTag() {
    return 'nu-radio';
  }

  static get nuRole() {
    return 'radio';
  }

  static get nuTemplate() {
    return `
      <nu-circle
        fill="^host clear :pressed[special] :disabled:pressed[text 50%]"
        transition="fill"
        border="0"></nu-circle>
    `;
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      width: '1em',
      height: '1em',
      border: '1bw color(text) :disabled[1bw color(text 50%)]',
      radius: 'round',
      content: 'stretch',
      items: 'center',
      padding: '1em / 8',
      sizing: 'content',
      cursor: 'default',
      text: 'v-middle',
      mark: ':focusable[.5em hover]',
      inset: '0 :active[.5em] :pressed[0]',
      fill: 'bg',
      expand: '.5em',
    };
  }
}
