import NuBlock from './block';
import NuElement from './element';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuAttrs() {
    return {
      border: NuBlock.nuAttrs.border,
      radius: NuBlock.nuAttrs.radius,
      shadow: NuBlock.nuAttrs.shadow,
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      flow: 'column',
      gap: '1x',
      items: 'center',
      padding: '0 .5em',
      radius: 'round',
      text: 'nowrap',
      border: '1b',
      fill: 'bg',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        line-height: calc(var(--nu-line-height) - 1px);
      }
      ${tag}[special]:not([fill]), ${tag}[special][special]:not([fill]) {
        background-color: var(--nu-special-bg-color);
      }
      ${tag}[special]:not([color]), ${tag}[special][special]:not([color]) {
        color: var(--nu-special-text-color);
      }
      ${tag}[special]:not([text]), ${tag}[special][special]:not([text]) {
        font-weight: 500;
      }
    `;
  }
}
