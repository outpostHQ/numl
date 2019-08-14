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

  static nuCSS({ nuTag }) {
    return `
      ${LEVELS.map(level => {
        return `
          ${nuTag},
          h${level}{
            color: var(--nu-theme-heading-color);
          }
          ${nuTag}[level="${level}"]:not([size]),
          [data-nu-root] h${level}{
            font-size: ${SIZES[`h${level}`][0]}rem;
            line-height: ${SIZES[`h${level}`][1]}rem;
          }
          ${nuTag}[level="${level}"],
          [data-nu-root] h${level}{
            font-weight: ${SIZES[`h${level}`][2]};
          }
          [data-nu-root] h${level}{
            display: block;
            margin: 0;
            padding: 0;
          }
        `;
      }).join('\n')}
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'level':
        if (devMode && !LEVELS.includes(Number(value))) {
          return warn('invalid heading level', value);
        }

        this.nuSetAria('level', value);
        break;
    }
  }
}
