import NuElement from './element';

export default class NuProgressBar extends NuElement {
  static get nuTag() {
    return 'nu-progressbar';
  }

  static get nuBehaviors() {
    return {
      progressbar: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      transition: 'opacity',
      radius: '.5r',
      border: '',
      fill: 'bg',
      box: 'y',
      height: 'min .5em',
      overflow: 'no',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag}::before {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--nu-value) * 100%);
        top: 0;
        bottom: 0;
        background: var(--nu-special-color);
        border-radius: var(--nu-border-width);
      }`,

      `${tag}::after {
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
      }`,

      `@keyframes nu-progressbar-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 3em 0;
        }
      }`,
    ];
  }
}
