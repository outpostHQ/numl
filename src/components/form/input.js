import './input.css';
import {
  unit,
} from '../../helpers';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  FLEX_ITEM_ATTRS,
  BLOCK_ATTRS,
} from '../../attrs';
import NuElement from '../element';

class NuInput extends NuElement {
  static get nuTag() {
    return 'nu-input';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      ...FLEX_ITEM_ATTRS,
      ...BLOCK_ATTRS,
      autofocus: '',
      disabled: '',
      value: '',
      maxlength: '',
      name: '',
      padding: unit('--nu-padding'),
    });
  }

  nuInitRef() {
    this.nuRef = this.querySelector('input');
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'disabled':
        this.nuInitRef();

        if (this.nuRef) {
          this.nuRef.disabled = value != null;
          this.nuSetFocusable(value != null);
        }

        break;
    }
  }

  nuMounted() {
    super.nuMounted();

    setTimeout(() => {
      this.nuChanged('disabled', '', this.getAttribute('disabled'));

      if (this.nuRef && !this.nuRef.hasAttribute('placeholder')) {
        this.nuRef.setAttribute('placeholder', '...');
      }
    });
  }

  nuUpdateTheme(theme) {
    super.nuUpdateTheme(theme);
  }
}

export default NuInput;
