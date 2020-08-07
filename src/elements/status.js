import NuElement from './el';

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
