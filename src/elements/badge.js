import NuElement from './el';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuStyles() {
    return {
      display: 'inline-grid',
      flow: 'column',
      gap: '1x',
      items: 'center',
      padding: '0 .5em',
      radius: '',
      border: '1bw :special[1bw hidden]',
      text: 'nowrap :special[sb nowrap]',
      fill: 'bg :special[special-bg]',
      color: 'text :special[special-text]',
      box: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        line-height: calc(var(--line-height) - 1px);
      }`,
    ];
  }
}
