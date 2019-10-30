import NuElement from './element';

const FLOW_ATTR = NuElement.nuAllAttrs.flow;

export default class NuGroup extends NuElement {
  static get nuTag() {
    return 'nu-group';
  }

  static get nuRole() {
    return 'group';
  }

  static get nuAttrs() {
    return {
      flow(val, defaults) {
        if (!val) return;

        return [
          ...FLOW_ATTR(val, defaults),
          {
            $suffix: `:not([gap]) > :first-child:not(:last-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? 'var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius) !important'
              : 'var(--nu-item-border-radius) var(--nu-item-border-radius) 0 0 !important'
          },
          {
            $suffix: `:not([gap]) > :last-child:not(:first-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? '0 var(--nu-item-border-radius) var(--nu-item-border-radius) 0 !important'
              : '0 0 var(--nu-item-border-radius) var(--nu-item-border-radius) !important'
          }
        ];
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
      radius: '0',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        --nu-item-border-radius: var(--nu-border-radius);
        
        border-radius: calc(var(--nu-border-radius, 0) + 1px) !important;
      }
      ${tag}:not([gap]) > :not(:last-child):not(:first-child) {
        --nu-border-radius: 0 !important;
      }
      ${tag}:not([gap]) > :last-child:first-child {
        --nu-border-radius: inherit !important;
      }
    `;
  }
}
