import NuAction from './action';
import { h } from '../dom-helpers';

const BACKDROP_FILTER_SUPPORT = CSS.supports('backdrop-filter', 'none');

export default class NuBtn extends NuAction {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      padding: '1x 2x',
      border: '1bw :clear[#clear] :hover[1bw] :clear:hover[#mark] :special[#clear] :special:hover[#clear]',
      radius: '',
      flow: 'column',
      gap: '1x',
      content: 'center :dropdown[stretch]',
      items: 'center stretch',
      mark: 'n :focusable[hover]',
      text: 'sb nowrap',
      inset: '#clear :active[#shadow.50] :active:special[#special-shadow.50] :pressed[y] :pressed:special[#special-shadow] :active:pressed[#shadow.50] :active:special[#special-shadow.50] :active:pressed:special[#special-shadow.50]',
      fill: `#bg :disabled[#bg] :special.disabled[#special-bg] :clear[#clear] :clear:disabled[${BACKDROP_FILTER_SUPPORT ? '#clear' : '#local-bg'}]`,
      color: '#text :clear[#special] :special[#special-text] :special:clear[#special-text]',
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

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'loading') {
      this.disabled = value;

      let loadingEl = this.querySelector('nu-spin');

      if (typeof value === 'string') {
        if (loadingEl) {
          loadingEl.hidden = false;
        } else {
          loadingEl = h('nu-spin');
          loadingEl.hidden = true;

          this.prepend(loadingEl);

          loadingEl.offsetHeight; // trigger re-flow

          loadingEl.hidden = false;
        }
      } else {
        if (loadingEl) {
          loadingEl.hidden = true;
        }
      }
    }
  }
}
