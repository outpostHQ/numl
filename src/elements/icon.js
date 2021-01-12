import sizeAttr from '../styles/size';
import NuEl from './el';

export default class NuIcon extends NuEl {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuBehaviors() {
    return {
      icon: true,
    };
  }

  static get nuRole() {
    return 'img';
  }

  static get nuGenerators() {
    return {
      name(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            opacity: `1 !important`,
          } : null;
      },
      size(val) {
        return sizeAttr(val, {}, true);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      width: 'min 1fs',
      height: 'min 1lh',
      sizing: 'content',
      size: '--icon-size',
      transition: 'transform',
      box: 'y',
      text: 'middle',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} svg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--font-size);
        height: var(--font-size);
        transform: translate(-50%, -50%);
        transition: opacity calc(var(--transition-enabler) * var(--opacity-transition, var(--transition))) linear;
      }`,

      `${tag}[is-provider="eva"] svg, ${tag}[is-provider="ion"] svg {
        fill: currentColor;
      }`,

      `${tag}[is-provider="feather"] svg {
        stroke-width: var(--icon-stroke-width, calc(1rem / 8));
      }`
    ];
  }
}
