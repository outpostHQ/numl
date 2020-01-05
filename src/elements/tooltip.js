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
      padding: '.5x 1x',
      z: 'front',
      opacity: '0 ^:hover[1]',
      transition: 'opacity',
      place: 'outside-top',
      fill: 'bg',
      color: 'text',
      radius: '1r',
      border: '1b outside',
      size: 'sm',
      interactive: 'no',
      text: 'wrap',
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

    const onMouseEnter = () => {
      fixPosition(this);
    };

    parent.addEventListener('mouseenter', onMouseEnter);

    this.nuSetDisconnectedHook(() => {
      parent.removeEventListener('mouseenter', onMouseEnter);
    });

    if (!this.hasAttribute('width')) {
      const width = `min(${Math.min(Math.ceil(this.innerText.length / 2), 15)}em)`;

      this.setAttribute('width', width);
    }
  }
}
