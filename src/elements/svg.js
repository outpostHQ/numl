import NuBlock from './block';
import { svgElement, warn } from '../helpers';

export default class NuSvg extends NuBlock {
  static get nuTag() {
    return 'nu-svg';
  }

  static get nuRole() {
    return 'img';
  }

  static nuLoader(src) {
    return fetch(src)
      .then(response => response.text());
  }

  static get nuAttrs() {
    return {
      src: '',
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
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
        vertical-align: var(--nu-inline-offset);
      }

      ${tag}[width] > svg {
        min-width: 100%;
        max-width: 100%;
        width: auto;
      }

      ${tag}[height] > svg {
        min-height: 100%;
        max-height: 100%;
        height: auto;
      }

      ${tag} > img {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'src') {
      if (this.querySelector('svg')) {
        this.innerHTML = '';
      }

      value = this.nuGetAttr('src', true);

      if (!value || !value.trim()) return;

      this.constructor.nuLoader(value).then(svg => {
        if (value !== this.getAttribute('src')) return;

        if (!svg) {
          warn('svg not found', JSON.stringify(value));

          return;
        }

        const svgNode = svgElement(svg);
        const width = svgNode.getAttribute('width');
        const height = svgNode.getAttribute('height');
        const viewBox = svgNode.getAttribute('viewBox');

        if (width && height) {
          if (!viewBox) {
            svgNode.setAttribute('viewBox', `0,0,${width},${height}`);
          }
        }

        const text = this.innerText.trim();

        if (text && !this.hasAttribute('label')) {
          this.setAttribute('label', text);
        }

        this.innerHTML = '';
        this.appendChild(svgNode);

        // const img = document.createElement('img');
        //
        // img.setAttribute('role', 'none');
        //
        // img.src = value;
        // img.alt = '';
        //
        // this.appendChild(img);
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
