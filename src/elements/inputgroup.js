import NuGroup from './group';
import { DEFAULT_STROKE_SHADOW } from '../attributes/border';

export default class NuInputGroup extends NuGroup {
  static get nuTag() {
    return 'nu-inputgroup';
  }

  static get nuBehaviors() {
    return {
      inputgroup: true,
    };
  }

  static get nuStyles() {
    return {
      fill: 'input',
      outline: 'focus-inside intrusive',
      cursor: 'text',
    };
  }

  static nuCSS({ css, tag }) {
    return [
      ...css,

      `${tag} [nu-input]:not([border]) {
        border: 0 !important;
        --nu-local-stroke-shadow: ${DEFAULT_STROKE_SHADOW} !important;
      }`,

      `${tag} [nu-input]:not([border]) {
        background-color: transparent !important;
      }`,

      `${tag} [nu-icon]:not([padding]) {
        padding-left: var(--nu-gap);
        padding-right: var(--nu-gap);
      }`,

      `${tag} [nu-icon]:not([grow]) {
        flex-grow: 0;
      }`,
    ];
  }
}
