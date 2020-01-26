import NuBlock from './block';
import { fixPosition } from '../helpers';
import FixateMixin from '../mixins/fixate';

export default class NuTooltip extends NuBlock {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuMixins() {
    return [FixateMixin()];
  }

  static get nuDefaults() {
    return {
      shadow: '',
      padding: '.5x 1x',
      z: 'front',
      opacity: '0 :show[1]',
      transition: 'opacity',
      place: '',
      drop: 'up',
      fill: 'bg',
      color: 'text',
      radius: '1r',
      border: '1b outside',
      size: 'inherit',
      interactive: 'no',
      text: 'wrap',
      width: 'minmax(min-content, 100vw) :drop[clamp(min-content, initial, 100vw)]',
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
      this.nuFixateStart();
      this.nuSetMod('show', true);

      setTimeout(() => {
        fixPosition(this);
      });
    };

    const onMouseLeave = (force) => {
      this.nuFixateEnd();
      this.nuSetMod('show', false);
    };

    parent.addEventListener('mouseenter', onMouseEnter);
    parent.addEventListener('mouseleave', onMouseLeave);

    this.nuSetDisconnectedHook(() => {
      parent.removeEventListener('mouseenter', onMouseEnter);
      parent.removeEventListener('mouseleave', onMouseLeave);
    });

    this.nuSetContextHook('focus', (val) => {
      if (val) {
        onMouseEnter();
      } else {
        onMouseLeave();
      }
    });

    if (!this.hasAttribute('width')) {
      const width = `min(${Math.min(Math.ceil(this.innerText.length / 2), 15)}em)`;

      this.setAttribute('width', width);
    }
  }
}
