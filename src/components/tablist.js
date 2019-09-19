import NuFlex from './flex';

export default class NuTablist extends NuFlex {
  static get nuTag() {
    return 'nu-tablist';
  }

  static get nuRole() {
    return 'tablist';
  }

  static get nuAttrs() {
    return {
      value: '',
    };
  }

  static get nuDefaults() {
    return {
      gap: 1,
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}:not([gap]) > * {
        --nu-flex-gap: 1rem;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsMounted) return;

    switch (name) {
      case 'value':
        this.nuSetValue(value, false);

        break;
    }
  }

  nuMounted() {
    super.nuMounted();

    setTimeout(() => {
      const value = this.nuGetValue();

      if (value) {
        this.nuSetValue(value, false);
      } else {
        setTimeout(() => {
          const el = this.querySelector(`nu-tab[value]:not([disabled]), nu-tab[controls]:not([disabled])`);

          if (el) {
            this.nuSetValue(el.nuGetValue());
          }
        }, 0);
      }
    }, 0);
  }

  nuGetValue() {
    const value = this.getAttribute('value');

    if (value) {
      const el = this.querySelector(`nu-tab[aria-pressed="true"]:not([disabled])`);

      return el ? el.nuGetValue() : value;
    }
  }

  nuSetValue(value, announce = true) {
    setTimeout(() => {
      [...this.childNodes].forEach(el => {
        if (el.tagName !== 'NU-TAB') return;

        if (el.nuGetValue() === value) {
          el.nuSetValue(true);
          el.nuSetAria('selected', true);
          el.nuSetFocusable(false);
        } else {
          el.nuSetValue(false);
          el.nuSetAria('selected', false);
          el.nuSetFocusable(true);
        }
      });

      if (announce) {
        this.nuEmit('input', value);
      }
    }, 0);
  }
}
