import {
  unit,
} from '../helpers';
import NuElement from './element';

export default class NuScroll extends NuElement {
  static get nuTag() {
    return 'nu-scroll';
  }

  static get nuRole() {
    return 'scrollbar';
  }

  static get nuAttrs() {
    return {
      orientation: '',
      size: unit('--nu-line-size'),
      color: '--nu-line-color',
    };
  }

  static get nuDefaults() {
    return {
      display: 'block',
    };
  }

  nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-line-color: var(--nu-special-color);
        --nu-line-size: .25rem;
        --nu-line-offset: 0%;
        --nu-line-length: 0%;

        position: absolute;
        top: 0;
        transform: translate(0, var(--nu-line-offset));
        right: var(--nu-pixel);
        height: var(--nu-line-length);
        width: var(--nu-line-size);
        line-height: 0;
        background-color: var(--nu-line-color);
        opacity: .5;
        transition: opacity var(--nu-animation-time) linear,
          transform calc(var(--nu-animation-time) / 2) ease-out;
        border-radius: .25rem;
        pointer-events: none;
      }

      [data-nu-no-scroll]::-webkit-scrollbar {
        display: none;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'orientation') {
      this.nuSetMod('horizontal', value !== 'horizontal');
      this.nuSetAria('orientation', value === 'horizontal' ? null : 'vertical');
    }
  }

  nuConnected() {
    this.nuUpdate();

    ['wheel', 'scroll'].forEach(eventName => {
      this.parentNode.addEventListener(eventName, () => {
        this.nuUpdate();
      });
    });

    this.parentNode.dataset.nuNoScroll = '';
  }

  nuUpdate() {
    const parent = this.parentNode;

    const offsetHeight = parent.offsetHeight;
    const scrollHeight = parent.scrollHeight;
    const scrollTop = parent.scrollTop;

    if (Math.abs(offsetHeight - scrollHeight) < 2) {
      this.style.setProperty('--line-offset', '');
      this.style.setProperty('--line-length', '');
    } else {
      this.style.setProperty('--line-offset', `calc(${Math.round(scrollTop / scrollHeight * offsetHeight)}px + ${scrollTop}px)`);
      this.style.setProperty('--line-length', `${Math.round(offsetHeight / scrollHeight * 100)}%`);
    }
  }
}
