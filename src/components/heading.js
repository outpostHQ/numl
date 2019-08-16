import NuFlex from './flex';
import { SIZES } from '../modifiers';
import { devMode, warn } from '../helpers';

const LEVELS = [1,2,3,4,5,6];

export default class NuHeading extends NuFlex {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuAttrs() {
    return {
      level: '',
    };
  }

  static get nuDefaultLevel() {
    return 1;
  }

  static nuCSS({ nuTag, nuDefaultLevel }) {
    return `
      ${LEVELS.map(level => {
        return `
          ${nuTag}:not([color]){
            color: var(--nu-theme-heading-color);
          }
          ${nuTag}[level="${level}"]:not([size])
          ${level === nuDefaultLevel ? `,${nuTag}:not([level]):not([size])` : ''}{
            font-size: ${SIZES[`h${level}`][0]}rem;
            line-height: ${SIZES[`h${level}`][1]}rem;
          }
          ${nuTag}[level="${level}"]
          ${level === nuDefaultLevel ? `,${nuTag}:not([level])` : ''} {
            font-weight: ${SIZES[`h${level}`][2]};
          }
        `;
      }).join('\n')}
    `;
  }

  get getDefaultLevel() {
    return this.constructor.nuDefaultLevel;
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

  nuMounted() {
    super.nuMounted();

    if (!this.hasAttribute('level')) {
      this.nuChanged('level');
    }
  }
}
