import NuEl from './el';

export default class NuProgressBar extends NuEl {
  static get nuTag() {
    return 'nu-progressbar';
  }

  static get nuRole() {
    return 'progressbar';
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
      fill: '#bg',
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
        width: calc(var(--value) * 100%);
        top: 0;
        bottom: 0;
        background: var(--special-color);
        border-radius: var(--border-width);
      }`,

      `${tag}::after {
        content: '';
        position: absolute;
        left: 0;
        width: calc(var(--value) * 100%);
        top: 0;
        bottom: 0;
        background-color: transparent;
        border-radius: var(--border-width);
        background-image: linear-gradient(to bottom, rgba(var(--dark-color-rgb), 0), rgba(var(--dark-color-rgb), .2)), linear-gradient(135deg, rgba(var(--special-text-color-rgb), .6) 0%, rgba(var(--special-text-color-rgb), .6) 34%, var(--special-bg-color) 40%, var(--special-bg-color) 70%, rgba(var(--special-text-color-rgb), .6) 76%, rgba(var(--special-text-color-rgb), .6) 100%), linear-gradient(to bottom, var(--special-bg-color), var(--special-bg-color));
        background-repeat: repeat;
        background-size: 3em;
        animation: nu-progressbar-animation calc(var(--progressbar-animation-time) * var(--transition-enabler)) linear infinite;
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
