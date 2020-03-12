import NuElement from './element';
import NuBadge from './badge';

export default class NuMark extends NuElement {
  static get nuTag() {
    return 'nu-mark';
  }

  static get nuDefaults() {
    return {
      text: 'nowrap',
      padding: '0 .25em',
      space: '0 .25em',
      radius: '1r',
      fill: 'hover :special[special-bg] :themed[bg] :special:themed[special-bg]',
      color: 'text :special[special-text]',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${NuBadge.nuCSS({ css, tag })}
      ${tag}:not([text]) {
        font-weight: var(--nu-local-font-weight, 600);
      }
    `;
  }
}
