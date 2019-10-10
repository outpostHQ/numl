import NuElement from './element';
import { unit } from '../helpers';

const gapAttr = unit('border-spacing', {
  convert: true,
  multiplier: 'var(--nu-theme-border-width)',
  empty: 'var(--nu-theme-border-width)',
});

const borderAttr = NuElement.nuAttrs.border;

export default class NuTable extends NuElement {
  static get nuTag() {
    return 'nu-table';
  }

  static get nuRole() {
    return 'table';
  }

  static get nuAttrs() {
    return {
      gap(val) {
        if (val == null) return;

        if (!val) {
          return {
            'border-collapse': 'collapse',
          };
        }

        return {
          'border-collapse': 'separate',
          ...gapAttr(val),
        };
      },
      border(val) {
        const styles = borderAttr(val);

        return [
          {
            ...styles,
            $suffix: ' nu-cell:not([border])',
          },
          {
            ...styles,
            $suffix: ' nu-columnheader:not([border])',
          },
        ];
      },
      padding: unit('--nu-padding', {
        multiplier: 'var(--nu-theme-padding)',
        empty: 'var(--nu-theme-padding)',
        convert: true,
      }),
      radius: null,
    };
  }

  static get nuDefaults() {
    return {
      display: 'table',
      gap: '',
      border: '1x',
      padding: '',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}{ overflow: hidden; }
      
      ${nuTag} >  nu-rowgroup:first-child >  nu-row:first-child > * {
        border-top: 0 !important;
      }
      
      ${nuTag} >  nu-rowgroup:last-child >  nu-row:last-child > * {
        border-bottom: 0 !important;
      }
      
      ${nuTag} >  nu-rowgroup >  nu-row > *:first-child {
        border-left: 0 !important;
      }
      
      ${nuTag} > nu-rowgroup > nu-row > *:last-child {
        border-right: 0 !important;
      }
    `;
  }
}
