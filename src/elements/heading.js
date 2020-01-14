import NuBlock from './block';
import { SIZES } from '../attributes/size';
import { devMode, warn } from '../helpers';

const LEVELS = [1,2,3,4,5,6];

export default class NuHeading extends NuBlock {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuId() {
    return 'heading';
  }

  static get nuAttrs() {
    return {
      level(val) {
        if (!val || !LEVELS.includes(Number(val))) val = 1;

        const fontSize = `${SIZES[`h${val}`][0]}rem`;
        const lineHeight = `${SIZES[`h${val}`][1]}rem`;

        return [{
          $suffix: ':not([size])',
          'font-size': fontSize,
          'line-height': lineHeight,
          '--nu-font-size': fontSize,
          '--nu-line-height': lineHeight,
        }, {
          $suffix: ':not([text])',
          'font-weight': 700,
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
      color: 'text-soft',
    };
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
