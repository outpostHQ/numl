import NuBlock from './block';
import { fixPosition } from '../helpers';

export default class NuTooltip extends NuBlock {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuMixins() {
    return {
      fixate: true,
    };
  }

  static get nuDefaults() {
    return {
      display: 'block',
      shadow: '',
      padding: '.5x 1x',
      z: 'front',
      opacity: '0 :show[1]',
      transition: 'opacity',
      place: 'outside-top',
      drop: '',
      fill: 'bg',
      color: 'text',
      radius: '1r',
      border: '1b outside',
      size: 'xs',
      interactive: 'no',
      text: 'w6 wrap',
      width: 'clamp(min-content, initial, 20rem)',
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

    let hover = false;
    let focus = false;

    const onMouseEnter = async () => {
      hover = true;

      if (focus) return;

      (await this.nuMixin('fixate')).start();

      this.nuSetMod('show', true);
      parent.nuSetMod('tooltip', true);

      setTimeout(() => {
        fixPosition(this);
      });
    };

    const onMouseLeave = async (force) => {
      hover = false;
      focus = false;

      // if (focus) return;

      (await this.nuMixin('fixate')).end();

      this.nuSetMod('show', false);
      parent.nuSetMod('tooltip', false);
    };

    const onFocus = async () => {
      focus = true;

      if (hover) return;

      (await this.nuMixin('fixate')).start();

      this.nuSetMod('show', true);
      parent.nuSetMod('tooltip', true);
    };

    const onBlur = async () => {
      focus = false;

      if (hover) return;

      (await this.nuMixin('fixate')).end();

      this.nuSetMod('show', false);
      parent.nuSetMod('tooltip', false);
    };

    parent.addEventListener('mouseenter', onMouseEnter);
    parent.addEventListener('mouseleave', onMouseLeave);

    this.nuSetDisconnectedHook(() => {
      parent.removeEventListener('mouseenter', onMouseEnter);
      parent.removeEventListener('mouseleave', onMouseLeave);
    });

    this.nuSetContextHook('focus', (val) => {
      if (val) {
        onFocus();
      } else {
        onBlur();
      }
    });
  }
}
