import NuAction from './action';

export default class NuBtn extends NuAction {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '1bw :clear[hidden] :hover[1bw] :clear:hover[#mark]',
      radius: '',
      flow: 'column',
      gap: '1x',
      content: 'center :dropdown[stretch]',
      items: 'center stretch',
      mark: 'n :focusable[hover]',
      fill: 'bg :special[special-bg] :clear[clear]',
      text: 'nowrap :special[sb nowrap]',
      inset: 'n :active[#shadow.50] :active:special[#special-shadow.50] :pressed[y] :pressed:special[y special] :active:pressed[#shadow.50] :active:pressed:special[#special-shadow.50]',
      color: 'text :clear[special] :special[special-text] :special:clear[special-text]',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}[special] > :not([theme]) {
        --nu-text-soft-color: var(--nu-special-text-color);
        --nu-text-contrast-color: var(--nu-special-text-color);
        --nu-text-color: var(--nu-special-text-color);
        --nu-special-color: var(--nu-special-text-color);
        --nu-mark-color: var(--nu-special-mark-color);
      }`,
    ];
  }
}
