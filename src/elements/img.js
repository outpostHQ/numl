import { h, parseAttr } from '../helpers';
import NuElement from './element';
import { requireChild } from '../dom-helpers';

export default class NuImg extends NuElement {
  static get nuTag() {
    return 'nu-img';
  }

  static get nuContents() {
    return 'img';
  }

  static get nuBehaviors() {
    return {
      image: true,
    };
  }

  static get nuGenerators() {
    return {
      fit(val) {
        const { values, mods } = parseAttr(val);

        if (!mods.length) {
          val = 'none';
        } else {
          val = mods[0];
        }

        values[0] = values[0] || mods[1];
        values[1] = values[1] || mods[2];

        return {
          'object-fit': val,
          'object-position': `${values[0] || 'initial'} ${values[1] || ''}`,
        };
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      fit: 'contain',
      sizing: 'content',
      box: 'y',
      text: 'v-middle',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} > img {
        display: block;
      }`,
    ];
  }

  nuConnected() {
    super.nuConnected();

    requireChild(this, 'img');
  }
}
