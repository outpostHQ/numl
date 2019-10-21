import NuBlock from './block';
import { SIZES } from '../attributes/text';
import { devMode, warn } from '../helpers';

const LEVELS = [1,2,3,4,5,6];

export default class NuHeading extends NuBlock {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuAttrs() {
    return {
      level(val) {
        if (!val || !LEVELS.includes(Number(val))) val = 1;

        return [{
          $suffix: ':not([size])',
          'font-size': `${SIZES[`h${val}`][0]}rem`,
          'line-height': `${SIZES[`h${val}`][1]}rem`,
        }, {
          'font-weight': `${SIZES[`h${val}`][2]}`,
        }];
      },
    };
  }

  static get nuDefaultLevel() {
    return 1;
  }

  static get nuDefaults() {
    return {
      level: 1,
      color: 'var(--nu-theme-heading-color)',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        position: relative;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'level':
        if (!value) value = 1;

        if (devMode && !LEVELS.includes(Number(value))) {
          return warn('invalid heading level', value);
        }

        this.nuSetAria('level', value);
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    if (!this.hasAttribute('level')) {
      this.nuChanged('level');
    }
  }
}
