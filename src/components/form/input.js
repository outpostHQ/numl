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

    if (!this.nuRef) {
      this.nuRef = document.createElement('input');

      this.appendChild(this.nuRef);
    }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuRef) this.nuInitRef();

    switch (name) {
      case 'disabled':
        this.nuRef.disabled = value != null;
        this.nuSetFocusable(value != null);
        break;
      case 'value':
        // ignore
        break;
      case 'autofocus':
      case 'placeholder':
      case 'maxlength':
      case 'name':
        this.nuRef.setAttribute(name, value);
        break;
    }
  }

  set value(value) {
    this.nuRef.value = value || '';
  }

  get value() {
    return this.nuRef.value;
  }

  nuMounted() {
    super.nuMounted();

    this.nuInitRef();

    if (!this.hasAttribute('placeholder')) {
      this.setAttribute('placeholder', '...');
    }

    this.nuSetFocusable();

    this.nuRef.addEventListener('input', (evt) => {
      this.nuEmit('input', this.value);
    });

    this.value = this.getAttribute('value');

    // const padding = this.getAttribute('padding');
    // const value = this.getAttribute('value');
    // const disabled = this.getAttribute('disabled');
  }

  nuUpdateTheme(theme) {
    super.nuUpdateTheme(theme);

    if (this.nuTheme && !this.nuTheme.invert) {
      this.style.color = '';
    }
  }
}

export default NuInput;
