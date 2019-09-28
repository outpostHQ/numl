import NuFlex from './flex';
import { unit, convertUnit } from '../helpers';

const FLOW_ATTR = NuFlex.nuAllAttrs.flow;

export default class NuBtnGroup extends NuFlex {
  static get nuTag() {
    return 'nu-btn-group';
  }

  static get nuRole() {
    return 'radiogroup';
  }

  static get nuAttrs() {
    return {
      padding: '',
      value: '',
      flow(val, defaults) {
        if (!val) return;

        return [
          ...FLOW_ATTR(val, defaults),
          {
            $suffix: `:not([gap]) > :first-child:not(:last-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? 'var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius)'
              : 'var(--nu-item-border-radius) var(--nu-item-border-radius) 0 0'
          },
          {
            $suffix: `:not([gap]) > :last-child:not(:first-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? '0 var(--nu-item-border-radius) var(--nu-item-border-radius) 0'
              : '0 0 var(--nu-item-border-radius) var(--nu-item-border-radius)'
          }
        ];
      },
      border(val) {
        if (val == null) return val;

        const width = val ? convertUnit(val) : 'var(--nu-theme-border-width)';

        return {
          $suffix: ':not([border])',
          '--nu-border-shadow': `var(--nu-border-inset, 0 0) 0 ${width} var(--nu-theme-border-color)`,
          '--nu-flex-gap': `calc(${width} * -1)`
        };
      }
    };
  }

  static get nuDefaults() {
    return {
      gap: 'calc(var(--nu-theme-border-width) * -1)',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-border-radius: var(--nu-theme-border-radius);
        --nu-item-border-radius: var(--nu-border-radius);

        border-radius: var(--nu-border-radius, .5rem);
      }
      ${nuTag} > * {
        --nu-flex-gap: calc(var(--nu-theme-border-width) * -1);

        flex-grow:1;
      }
      ${nuTag}:not([gap]) > * {
        --nu-flex-gap: calc(var(--nu-theme-border-width) * -1);
      }
      ${nuTag}:not([gap]) > *:not(:last-child):not(:first-child) {
        --nu-border-radius: 0;
      }
      ${nuTag}:not([gap]) > *:last-child:first-child {
        --nu-border-radius: inherit;
      }
      ${nuTag}:not([gap]):not([flow]) > :first-child:not(:last-child) {
        --nu-border-radius: var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius);
      }
      ${nuTag}:not([gap]):not([flow]) > :last-child:not(:first-child) {
        --nu-border-radius: 0 var(--nu-item-border-radius) var(--nu-item-border-radius) 0;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'value':
        this.nuSetValue(value, false);

        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    const value = this.getAttribute('value');

    if (value) {
      this.nuSetValue(value, false);
    } else {
      setTimeout(() => {
        const el = this.querySelector(`nu-btn[value]`);

        if (el) {
          this.nuSetValue(el.nuGetValue());
        }
      }, 0);
    }
  }

  nuGetValue() {
    const value = this.getAttribute('value');

    if (value) {
      const el = this.querySelector(`nu-btn[aria-pressed="true"]`);

      if (el) {
        return el.getAttribute('value');
      } else {
        return value;
      }
    }
  }

  nuSetValue(value, announce = true) {
    setTimeout(() => {
      [...this.childNodes].forEach(el => {
        if (el.tagName !== 'NU-BTN') return;

        // if (el.hasAttribute('disabled')) return;

        if (el.getAttribute('value') === value) {
          el.nuSetAria('checked', true);
          el.nuSetFocusable(false);
          el.nuSetValue(true);
        } else {
          el.nuSetAria('checked', false);
          el.nuSetFocusable(true);
          el.nuSetValue(false);
        }
      });

      if (announce) {
        this.nuEmit('input', value);
      }
    }, 0);
  }
}
