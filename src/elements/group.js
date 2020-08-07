import NuElement from './el';

const FLOW_ATTR = NuElement.nuAllGenerators.flow;

export default class NuGroup extends NuElement {
  static get nuTag() {
    return 'nu-group';
  }

  static get nuRole() {
    return 'group';
  }

  static get nuBehaviors() {
    return {
      group: true,
    };
  }

  static get nuGenerators() {
    return {
      flow(val, defaults) {
        if (!val) return;

        return [
          ...FLOW_ATTR(val, defaults),
          {
            $suffix: `:not([gap]) > :first-child:not(:last-child)`,
            '--nu-local-radius': val.startsWith('row')
              ? 'var(--nu-item-radius) 0 0 var(--nu-item-radius) !important'
              : 'var(--nu-item-radius) var(--nu-item-radius) 0 0 !important'
          },
          {
            $suffix: `:not([gap]) > :last-child:not(:first-child)`,
            '--nu-local-radius': val.startsWith('row')
              ? '0 var(--nu-item-radius) var(--nu-item-radius) 0 !important'
              : '0 0 var(--nu-item-radius) var(--nu-item-radius) !important'
          }
        ];
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
      radius: '',
      border: '',
      box: 'y',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} {
        --nu-item-radius: var(--nu-local-radius);

        border-radius: calc(var(--nu-local-radius, 0) + 1px) !important;
      }`,

      `${tag}:not([gap]) > :not(:last-child):not(:first-child) {
        --nu-local-radius: 0 !important;
      }`,

      `${tag}:not([gap]) > :last-child:first-child {
        --nu-local-radius: inherit !important;
      }`,
    ];
  }
}
