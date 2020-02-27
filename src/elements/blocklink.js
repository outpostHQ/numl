import NuLink from './link';

export default class NuBlockLink extends NuLink {
  static get nuTag() {
    return 'nu-blocklink';
  }

  static get nuDefaults() {
    return {
      expand: '',
      radius: '0',
    };
  }
}
