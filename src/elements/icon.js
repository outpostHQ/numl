import {
  parseAllValues, svgElement, injectScript,
} from '../helpers';
import NuBlock from './block';

let featherPromise;

export default class NuIcon extends NuBlock {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuRole() {
    return 'img';
  }

  static nuLoader(name) {
    return (
      featherPromise ||
      (featherPromise = !window.feather
        ? injectScript('https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.22.1/feather.js')
        : Promise.resolve())
    ).then(() => window.feather.icons[name].toSvg());
  }

  static get nuAttrs() {
    return {
      name(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            opacity: `1 !important`,
          } : null;
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      width: 'min(1fs)',
      height: 'min(1fs)',
      sizing: 'content',
      transition: 'transform',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        vertical-align: var(--nu-inline-offset);
      }

      ${tag} > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--nu-font-size);
        height: var(--nu-font-size);
        transform: translate(-50%, -50%);
        transition: opacity var(--nu-animation-time) linear;
      }

      ${tag} > :not(svg) {
        display: none;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'name') {
      value = this.nuGetAttr(name);

      const names = parseAllValues(value);

      // empty tag
      this.innerHTML = '';

      names.forEach(name => {
        if (this.querySelector(`svg[name="${name}"]`)) return;

        this.constructor.nuLoader(name).then(svg => {
          const svgNode = svgElement(svg);

          svgNode.setAttribute('name', name);
          svgNode.style.opacity = '0';

          this.appendChild(svgNode);
        });
      });
    }
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetAria('hidden', false);
  }
}
