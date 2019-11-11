import NuBlock from './block';
import NuElement from './element';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-badge';
  }

  static get nuAttrs() {
    return {
      border: NuBlock.nuAttrs.border,
      radius: NuBlock.nuAttrs.radius,
      shadow: NuBlock.nuAttrs.shadow,
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      flow: 'column',
      gap: '1x',
      items: 'center',
      padding: '0 .5em',
      radius: 'round',
      text: 'middle nowrap',
      border: '1x',
      fill: 'bg',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'special' && value != null && !this.hasAttribute('theme')) {
      this.setAttribute('theme', 'special');
    }
  }
}
