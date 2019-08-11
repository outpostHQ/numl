import './btn.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../attrs';
import NuElement from '../element';
import NuCard from '../card/card';

class NuBtn extends NuElement {
  static get nuTag() {
    return 'nu-btn';
  }

  static get nuRole() {
    return 'button';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      disabled: '',
      value: '',
      href: '',
      target: '',
    });
  }

  nuMounted() {
    super.nuMounted();

    if (!this.hasAttribute('role')) {
      if (!this.constructor.nuAttrs.includes('href')
        || !this.hasAttribute('href')) {
        this.setAttribute('role', 'button');
      } else {
        this.setAttribute('role', 'link');
      }
    }

    if (!this.hasAttribute('value')) {
      this.nuSetAria('pressed', false);
    }

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    this.addEventListener('click', (evt) => {
      if (evt.nuHandled) return;

      evt.nuHandled = true;

      if (!this.hasAttribute('disabled')) {
        this.nuTap();
      }
    });

    this.addEventListener('keydown', evt => {
      if (this.hasAttribute('disabled') || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        this.nuTap();
      } else if (evt.key === ' ') {
        evt.preventDefault();
        this.nuSetMod('active', true);
      }
    });

    this.addEventListener('keyup', evt => {
      if (this.hasAttribute('disabled') || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        this.nuSetMod('active', false);
        this.nuTap();
      }
    });

    this.addEventListener('blur', evt => this.nuSetMod('active', false));

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
      this.nuEmit('route', href);
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

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
