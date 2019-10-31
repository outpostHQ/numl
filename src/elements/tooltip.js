import NuBlock from './block';
import { fixPosition } from '../helpers';

export default class NuTooltip extends NuBlock {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuDefaults() {
    return {
      shadow: '',
      padding: '.25 .5',
      z: 'front',
      opacity: '0 ^:hover[1]',
      transition: 'opacity',
      place: 'outside-top',
      fill: 'subtle',
      color: 'minor',
      radius: '1x',
      border: '1x outside',
      size: 'sm',
      interactive: 'no',
      text: 'wrap',
      width: 'min(15)',
    };
  }

  nuConnected() {
    super.nuConnected();

    const parent = this.parentNode;

    this.nuParent = parent;

    if (parent && parent.nuElement && !parent.hasAttribute('describedby')) {
      this.parentNode.setAttribute('describedby', this.nuId);
    }

    this.nuSetAria('hidden', true);

    this.nuOnMouseEnter = () => {
      fixPosition(this);
    };

    parent.addEventListener('mouseenter', this.nuOnMouseEnter);
  }

  nuDisconnected() {
    super.nuDisconnected();

    if (this.nuOnMouseEnter) {
      this.nuParent.removeEventListener('mouseenter', this.nuOnMouseEnter);
    }
  }
}
