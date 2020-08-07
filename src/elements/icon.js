import sizeAttr from '../attributes/size';
import NuElement from './el';

export default class NuIcon extends NuElement {
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
        width: var(--nu-font-size);
        height: var(--nu-font-size);
        transform: translate(-50%, -50%);
        transition: opacity calc(var(--nu-transition-enabler) * var(--nu-opacity-transition, var(--nu-transition))) linear;
      }`
    ];
  }
}
