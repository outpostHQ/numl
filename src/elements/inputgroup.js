import NuGroup from './group';
import { DEFAULT_STROKE_SHADOW } from '../attributes/border';

export default class NuInputGroup extends NuGroup {
  static get nuTag() {
    return 'nu-inputgroup';
  }

  static get nuStyles() {
    return {
      fill: 'input',
      focus: 'inside input',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} nu-input:not([border]) {
        border: 0 !important;
        --nu-local-stroke-shadow: ${DEFAULT_STROKE_SHADOW};
      }
      ${tag} nu-icon:not([padding]) {
        padding-left: var(--nu-gap);
        padding-right: var(--nu-gap);
      }
      ${tag} nu-icon:not([grow]) {
        flex-grow: 0;
      }
    `;
  }
}
