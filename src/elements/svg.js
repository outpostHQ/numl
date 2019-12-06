import NuBlock from './block';
import { svgElement, warn } from '../helpers';

export default class NuSvg extends NuBlock {
  static get nuTag() {
    return 'nu-svg';
  }

  static get nuRole() {
    return 'img';
  }

  static nuLoader() {
    return Promise.resolve();
  }

  static get nuAttrs() {
    return {
      name: '',
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      text: 'middle',
      sizing: 'content',
      width: 'min(1fs)',
      height: 'min(1fs)',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }

      ${tag} > svg {
        min-width: 100%;
        min-height: 100%;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }

      ${tag} > div {
        // padding-top: calc(100% / var(--nu-local-ratio));
        display: none;
      }

      ${tag}[inline] {
        bottom: 0.0675em;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'name') {
      if (this.querySelector('svg')) {
        this.innerHTML = '';
      }

      this.constructor.nuLoader(value).then(svg => {
        if (!svg) {
          warn('svg not found', JSON.stringify(value));

          return;
        }

        const svgNode = svgElement(svg);
        const width = svgNode.getAttribute('width');
        const height = svgNode.getAttribute('height');
        const viewBox = svgNode.getAttribute('viewBox');
        const hasWidth = this.hasAttribute('width');
        const hasHeight = this.hasAttribute('height');

        if (width && height) {
          if (!viewBox) {
            svgNode.setAttribute('viewBox', `0,0,${width},${height}`);
          }

          if (!hasWidth && !hasHeight) {
            this.setAttribute('width', `${width}px`);
            this.setAttribute('height', `${height}px`);
          }

          this.style.setProperty('--nu-local-ratio', Number(width) / Number(height));
        }

        const text = this.innerText.trim();

        if (text && !this.hasAttribute('label')) {
          this.setAttribute('label', text);
        }

        this.innerHTML = '';
        this.appendChild(svgNode);
      });
    }
  }

  nuConnected() {
    super.nuConnected();

    if (this.hasAttribute('label')) {
      this.innerHTML = this.getAttribute('label');
    }
  }
}
