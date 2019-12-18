import NuBlock from './block';

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
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      text: 'middle',
      sizing: 'content',
      width: 'min(1fs)',
      height: 'min(1fs)',
      content: 'center',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }

      ${tag} > img {
        display: block;
      }

      ${tag}[width] > img {
        min-width: 100%;
        max-width: 100%;
        width: auto;
      }

      ${tag}[height] > img {
        min-height: 100%;
        max-height: 100%;
        height: auto;
      }

      ${tag}[width][height] > img {
        position: absolute;
      }

      ${tag}[inline] {
        bottom: 0.0675em;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'src') {
      if (this.querySelector('img')) {
        this.innerHTML = '';
      }

      const img = document.createElement('img');

      img.role = 'none';
      img.src = value;
      img.alt = this.getAttribute('label');

      this.appendChild(img);

      console.log(img);

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
