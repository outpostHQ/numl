import NuBlock from './block';

export default class NuTooltip extends NuBlock {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuDefaults() {
    return {
      shadow: '',
      padding: '.25 .5',
      z: 'front',
      opacity: '0 ^:hover[1]',
      transition: 'opacity',
      place: 'outside-top',
      background: '',
      radius: '1x',
      border: '1x',
      size: 'sm',
      events: 'none',
    };
  }

  nuConnected() {
    super.nuConnected();

    const parent = this.parentNode;

    if (parent && parent.nuElement && !parent.hasAttribute('describedby')) {
      this.parentNode.setAttribute('describedby', this.nuId);
    }
  }
}
