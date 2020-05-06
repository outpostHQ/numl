import NuBlock from './block';
import NuElement from './element';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuGenerators() {
    return {
      border: NuBlock.nuGenerators.border,
      radius: NuBlock.nuGenerators.radius,
      shadow: NuBlock.nuGenerators.shadow,
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      flow: 'column',
      gap: '1x',
      items: 'center',
      padding: '0 .5em',
      radius: 'round',
      text: 'nowrap :special[w5 nowrap]',
      border: '1b',
      fill: 'bg :special[special-bg]',
      color: 'text :special[special-text]',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        line-height: calc(var(--nu-line-height) - 1px);
      }
    `;
  }
}
