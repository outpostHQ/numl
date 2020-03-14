import NuElement from './element';

export default class NuProgressBar extends NuElement {
  static get nuTag() {
    return 'nu-progressbar';
  }

  static get nuAttrs() {
    return {
      value: '',
      min: '',
      max: '',
    };
  }

  static get nuDefaults() {
    return {
      display: 'block',
      transition: 'opacity',
      radius: '.5r',
      border: '',
      fill: 'bg',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    this.nuSetValue();
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetValue();
  }

  nuSetValue() {
    let value = this.hasAttribute('value') ? Number(this.getAttribute('value')) : 0;
    const max = this.hasAttribute('max') ? Number(this.getAttribute('max')) : 100;
    const min = this.hasAttribute('min') ? Number(this.getAttribute('min')) : 0;

    if (min > max) {
      return;
    }

    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    const propValue = (value - min) / (max - min);

    this.style.setProperty('--nu-value', Number(propValue.toFixed(4)));
  }

  nuApply() {
    setTimeout(() => {
      this.setAttribute('opacity', '1');
    }, 0);
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        min-height: .5em;
        overflow: hidden;
      }

      ${tag}::before {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--nu-value) * 100%);
        top: 0;
        bottom: 0;
        background: var(--nu-special-color);
        border-radius: var(--nu-border-width);
      }

      ${tag}::after {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--nu-value) * 100%);
        top: 0;
        bottom: 0;
        opacity: .2;
        background-color: transparent;
        border-radius: var(--nu-border-width);
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5)), linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 36%, rgb(0, 0, 255) 38%, rgb(0, 0, 255) 72%, rgb(255, 255, 255) 74%, rgb(255, 255, 255) 100%);
        background-repeat: repeat;
        background-size: 3em;
        animation: nu-progressbar-animation calc(var(--nu-transition-time) * 10 - 0.01s) linear infinite;
      }

      @keyframes nu-progressbar-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 3em 0;
        }
      }
    `;
  }
}
