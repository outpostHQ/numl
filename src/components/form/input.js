import './input.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  BLOCK_ATTRS,
  convertUnit
} from '../../helpers';
import NuComponent from '../component';

const inputAttrsList = [
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

class NuInput extends NuComponent {
  static get nuTag() {
    return 'input';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(inputAttrsList);
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
      case 'padding':
        this.style.padding = '';
        this.nuRef.style.padding = convertUnit(value || '');
        break;
      case 'disabled':
        this.nuRef.disabled = value != null;
        this.nuSetFocusable(value != null);
        break;
      case 'value':
        this.nuRef.value = value || '';
        break;
      case 'autofocus':
      case 'placeholder':
      case 'maxlength':
      case 'name':
        this.nuRef.setAttribute(name, value);
        break;
    }
  }

  nuMounted() {
    super.nuMounted();

    this.nuInitRef();

    if (this.getAttribute('placeholder') == null) {
      this.setAttribute('placeholder', '...');
    }

    this.nuSetFocusable();

    // ['input', 'focus', 'click', 'blur'].forEach(eventName => {
    //   this.nuRef.addEventListener(eventName, (evt) => {
    //     this.dispatchEvent(evt);
    //   });
    // });

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
