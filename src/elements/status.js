import NuEl from './el';

export default class NuStatus extends NuEl {
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
