import NuAction from './action';

export default class NuBtn extends NuAction {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '1bw :clear[hidden] :hover[1bw] :clear:hover[#mark] :special[#clear] :special:hover[#clear]',
      radius: '',
      flow: 'column',
      gap: '1x',
      content: 'center :dropdown[stretch]',
      items: 'center stretch',
      mark: 'n :focusable[hover]',
      fill: 'bg :special[special-bg] :clear[clear]',
      text: 'nowrap :special[sb nowrap]',
      inset: '#clear :active[#shadow.50] :active:special[#special-shadow.50] :pressed[y] :pressed:special[y special] :active:pressed[#shadow.50] :active:pressed:special[#special-shadow.50]',
      color: 'text :clear[special] :special[special-text] :special:clear[special-text]',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}[special] {
        --shadow-color: var(--special-shadow-color);
        --shadow-color-rgb: var(--special-shadow-color-rgb);
      }`,

      `${tag}[special] > :not([theme]) {
        --text-soft-color: var(--special-text-color);
        --text-contrast-color: var(--special-text-color);
        --text-color: var(--special-text-color);
        --special-color: var(--special-text-color);
        --mark-color: var(--special-mark-color);
      }`,
    ];
  }
}
