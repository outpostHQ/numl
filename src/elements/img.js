import NuBlock from './block';
import { warn } from '../helpers';
import combinedAttr from '../attributes/combined';

export default class NuImg extends NuBlock {
  static get nuTag() {
    return 'nu-img';
  }

  static get nuRole() {
    return 'img';
  }

  static get nuAttrs() {
    return {
      src: '',
      fit(val) {
        const isAuto = val === 'auto';
        const fit = isAuto ? 'none' : val;

        const sizing = !isAuto ? [{
          'object-fit': fit,
          $suffix: '>img',
          'max-width': '100%',
          'min-width': '100%',
          'max-height': '100%',
          'min-height': '100%',
        }] : [{
          'object-fit': fit,
        }, {
          $suffix: '>img',
          'max-width': '100%',
        }];

        return combinedAttr({
          display: !isAuto ? 'inline-grid' : 'block',
          width: isAuto ? 'max(100%)' : '',
        }, NuImg).concat(sizing);
      }
    };
  }

  static get nuDefaults() {
    return {
      display: null,
      fit: 'auto',
      sizing: 'content',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        vertical-align: var(--nu-inline-offset);
      }

      ${tag} > img {
        display: block;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'src') {
      if (this.querySelector('img')) {
        this.innerHTML = '';
      }

      value = this.nuGetAttr('src', true);

      if (!value || !value.trim()) return;

      const img = document.createElement('img');

      img.role = 'none';
      img.src = value;
      img.alt = this.getAttribute('label') || 'Image';

      this.appendChild(img);

      img.onerror = () => {
        this.removeChild(img);

        const icon = document.createElement('nu-icon');

        icon.setAttribute('name', 'image');

        if (this.hasAttribute('label')) {
          icon.setAttribute('label', this.getAttribute('label'));
        }

        this.appendChild(icon);

        warn('image not found', value);
      };
    }
  }

  nuConnected() {
    super.nuConnected();
  }
}
