import NuBlock from './block';
import { devMode, parseAttr, warn } from '../helpers';
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
      display: null,
      fit(val) {
        const { values, mods } = parseAttr(val);

        if (!mods.length) {
          val = 'contain';
        } else {
          val = mods[0];
        }

        const isAuto = val === 'none';

        if (devMode && !['none', 'contain', 'fill', 'cover', 'scale-down'].includes(val)) {
          warn('nu-img[fit]: incorrect value', JSON.stringify(val));

          val = 'none';
        }

        values[0] = values[0] || mods[1];
        values[1] = values[1] || mods[2];

        const sizing = (!isAuto ? [{
          $suffix: '>img',
          'object-fit': val,
          'max-width': '100%',
          'min-width': '100%',
          'max-height': '100%',
          'min-height': '100%',
        }] : [{
          'object-fit': val,
        }, {
          $suffix: '>img',
          'max-width': '100%',
        }]).concat(values.length > 0 ? [{
          $suffix: '>img',
          'object-position': `${values[0]} ${values[1] || ''}`,
        }] : []);

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
