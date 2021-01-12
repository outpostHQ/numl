import NuEl from './el';

export default class NuDescription extends NuEl {
  static get nuTag() {
    return 'nu-description';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }

  nuConnected() {
    super.nuConnected();

    const region = this.closest('[nu-region]');

    if (region && !region.nuHasAria('describedby') && !region.hasAttribute('labelledby')) {
      region.nuSetAria('describedby', this.nuUniqId);
    }
  }
}
