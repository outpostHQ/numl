import NuFlex from './flex';
import { unit, convertUnit } from '../helpers';

const FLOW_ATTR = NuFlex.nuAttrs.flow;

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
      gap: '',
      value: '',
      'items-padding': unit('padding', true),
      flow(val) {
        if (!val) return;

        return [
          ...FLOW_ATTR(val),
          {
            $suffix: ` > :first-child:not(:last-child)`,
            '--nu-border-radius': val.startsWith('row')
              ? 'var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius)'
              : 'var(--nu-item-border-radius) var(--nu-item-border-radius) 0 0'
          },
          {
            $suffix: ` > :last-child:not(:first-child)`,
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
      ${nuTag} > *:not(:last-child):not(:first-child) {
        --nu-border-radius: 0;
      }
      ${nuTag} > *:last-child:first-child {
        --nu-border-radius: inherit;
      }
      ${nuTag}:not([flow]) > :first-child:not(:last-child) {
        --nu-border-radius: var(--nu-item-border-radius) 0 0 var(--nu-item-border-radius);
      }
      ${nuTag}:not([flow]) > :last-child:not(:first-child) {
        --nu-border-radius: 0 var(--nu-item-border-radius) var(--nu-item-border-radius) 0;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'value':
        if (oldValue !== value) {
          this.nuSetValue(value, false);
        }

        break;
    }
  }

  nuMounted() {
    super.nuMounted();

    const value = this.getAttribute('value');

    if (value) {
      this.nuSetValue(value, false);
    } else {
      setTimeout(() => {
        const el = this.querySelector(`nu-btn[value]`);

        if (el) {
          this.nuSetValue(el.value);
        }
      }, 0);
    }
  }

  get value() {
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

        if (el.getAttribute('value') === value) {
          el.nuSetAria('checked', true);
          el.nuSetFocusable(false);
          el.nuSetValue(true);
        } else {
          el.nuSetAria('checked', false);
          el.nuSetFocusable(true);
          el.nuSetValue(value);
        }
      });

      if (announce) {
        this.nuEmit('input', value);
      }
    }, 0);
  }
}
