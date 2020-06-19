import NuElement from './element';

export default class NuStatus extends NuElement {
  static get nuTag() {
    return 'nu-status';
  }

  static get nuRole() {
    return 'status';
  }

  static get nuAttrs() {
    return {
      'aria-live': 'polite',
    };
  }
}
