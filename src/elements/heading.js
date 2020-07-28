import NuBlock from './block';
import { SIZES } from '../attributes/size';
import { devMode, warn } from '../helpers';
import NuElement from './element';

const LEVELS = [1, 2, 3, 4, 5, 6];

export default class NuHeading extends NuElement {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuGenerators() {
    return {
      level(val) {
        if (!val || !LEVELS.includes(Number(val))) val = 1;

        const fontSize = `var(--nu-h${val}-font-size)`;
        const lineHeight = `var(--nu-h${val}-line-height)`;

        return [{
          $suffix: ':not([size])',
          'font-size': fontSize,
          'line-height': lineHeight,
          '--nu-font-size': fontSize,
          '--nu-line-height': lineHeight,
        }];
      },
    };
  }

  static get nuAttrs() {
    return {
      level: 2,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      level: this.nuAttrs.level,
      color: 'var(--nu-local-text-color, var(--nu-text-soft-color))',
      text: 'heading',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'level':
        if (!value) value = this.constructor.nuAttrs.level;

        if (devMode && !LEVELS.includes(Number(value))) {
          return warn('invalid heading level', value);
        }

        this.nuSetAria('level', value);
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    const region = this.closest('[nu-region]');

    if (region && !region.nuHasAria('labelledby') && !region.hasAttribute('labelledby')) {
      region.nuSetAria('labelledby', this.nuUniqId);
    }

    const previous = this.previousElementSibling;
    const parent = this.parentNode;
  }
}
