import NuRegion from './region';

export default class NuCard extends NuRegion {
  static get nuTag() {
    return 'nu-card';
  }

  static get nuId() {
    return 'card';
  }

  static get nuStyles() {
    return {
      padding: '2x',
      fill: 'bg :clear[clear]',
      color: 'text :clear[current]',
      border: '1bw :clear[hidden]',
      radius: '1r',
      transition: 'theme, radius',
      shadow: '0 :clear[1.5]',
      box: 'y',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContext('radiogroup', null); // remove radiogroup context
  }
}
