import NuBlock from './block';
import { devMode, warn } from '../helpers';
import combinedAttr from '../attributes/combined';

export default class NuImg extends NuBlock {
  static get nuTag() {
    return 'nu-img';
  }

  static get nuBehaviors() {
    return {
      image: true,
    };
  }

  static get nuRole() {
    return 'img';
  }

  static get nuGenerators() {
    return {
      fit(val) {
        val = val || 'contain';

        const isAuto = val === 'none';

        if (devMode && !['none', 'contain', 'fill', 'cover', 'scale-down'].includes(val)) {
          warn('nu-img[fit]: incorrect value', JSON.stringify(val));

          val = 'none';
        }

        const sizing = !isAuto ? [{
          'object-fit': val,
          $suffix: '>img',
          'max-width': '100%',
          'min-width': '100%',
          'max-height': '100%',
          'min-height': '100%',
        }] : [{
          'object-fit': val,
        }, {
          $suffix: '>img',
          'max-width': '100%',
        }];

        return combinedAttr({
          display: !isAuto ? 'inline-grid' : 'block',
          width: isAuto ? 'max 100%' : '',
        }, NuImg).concat(sizing);
      }
    };
  }

  static get nuStyles() {
    return {
      display: null,
      fit: 'none',
      sizing: 'content',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        position: relative;
        vertical-align: var(--nu-inline-offset);
      }

      ${tag} > img {
        display: block;
      }
    `;
  }
}
