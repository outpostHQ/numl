import './btn.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../helpers';
import NuComponent from '../component';
import NuCard from '../card/card';

const btnAttrsList = [
  ...NuComponent.nuAttrs,
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  'disabled', 'value', 'href', 'target'
];

class NuBtn extends NuComponent {
  static get nuTag() {
    return 'btn';
  }

  static get nuAttrs() {
    return btnAttrsList;
  }

  nuMounted() {
    if (this.getAttribute('role') == null) {
      if (!this.constructor.nuAttrs.includes('href')
        || this.getAttribute('href') == null) {
        this.setAttribute('role', 'button');
      } else {
        this.setAttribute('role', 'link');
      }
    }

    if (this.getAttribute('value') == null) {
      this.nuSetAria('pressed', false);
    }

    this.nuSetFocusable(this.getAttribute('disabled') == null);

    this.addEventListener('click', () => {
      if (this.getAttribute('disabled') == null) {
        this.nuTap();
      }
    });

    this.addEventListener('keydown', evt => {
      if ((evt.key === 'Enter' || evt.key === 'Space')
        && this.getAttribute('disabled') == null) {
        this.nuTap();
      }
    });

    this.addEventListener('mousedown', () => {
      this.nuSetMod('active', true);
    });

    ['mouseleave', 'mouseup'].forEach(eventName => {
      this.addEventListener(eventName, () => {
        this.nuSetMod('active', false);
      });
    });
  }

  nuTap() {
    const href = this.getAttribute('href');

    this.nuEmit('tap');

    if (href) {
      this.nuEmit('route', this.href);
    }
  }

  nuChanged(name, oldValue, value) {
    switch (name) {
      case 'disabled':
        this.nuSetMod('disabled', value != null);
        this.nuSetFocusable(value == null);
        break;
      case 'value':
        this.nuSetMod('toggled', value != null);
        this.nuSetAria('pressed', value != null);
    }
  }

  nuUpdateTheme(theme) {
    NuCard.prototype.nuUpdateTheme.call(this, theme);
  }
}

export default NuBtn;
