import './input.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit,
  unit,
} from '../../helpers';
import NuComponent from '../component';

const attrsList = NuComponent.nuAttrs;

Object.assign(attrsList, {
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  autofocus: '',
  disabled: '',
  value: '',
  maxlength: '',
  name: '',
  padding: unit('--nu-padding'),
});

class NuInput extends NuComponent {
  static get nuTag() {
    return 'input';
  }

  static get nuAttrs() {
    return attrsList;
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

    if (this.nuTheme && !this.nuTheme.invert) {
      this.style.color = '';
    }
  }
}

export default NuInput;
