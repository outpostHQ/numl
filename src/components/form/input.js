import './input.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit
} from '../../helpers';
import NuComponent from '../component';

const attrsList = [
  ...NuComponent.nuAttrs,
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  ...BLOCK_ATTRS,
  'autofocus',
  'disabled',
  'value',
  'placeholder',
  'maxlength',
  'name',
];

const propAttrs = [
  ...NuComponent.nuPropAttrs,
  'padding',
];

class NuInput extends NuComponent {
  static get nuTag() {
    return 'input';
  }

  static get nuAttrs() {
    return attrsList;
  }

  static get nuPropAttrs() {
    return propAttrs;
  }

  constructor() {
    super();
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
