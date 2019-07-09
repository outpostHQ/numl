import './scroll.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  convertUnit
} from '../../helpers';
import NuComponent from '../component';

const attrsList = [
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
];

export default class NuScroll extends NuComponent {
  static get nuTag() {
    return 'scroll';
  }

  static get nuRole() {
    return 'scrollbar';
  }

  static get nuAttrs() {
    return NuComponent.nuAttrs.concat(attrsList, ['orientation', 'size', 'color']);
  }

  constructor(props) {
    super(props);

    this.nuThemeProps = false;
    this.nuThemeInvert = true;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'orientation':
        this.nuSetMod('horizontal', value !== 'horizontal');
        this.nuSetAria('orientation', value === 'horizontal' ? null : 'vertical');
        break;
      case 'color':
        this.style.setProperty('--line-color', value || '');
        break;
    }
  }

  nuMounted() {
    this.nuUpdate();

    ['wheel', 'scroll'].forEach(eventName => {
      this.parentNode.addEventListener(eventName, () => {
        this.nuUpdate();
      });
    });

    this.parentNode.classList.add('-nu-no-scrollbar');
  }

  nuUpdate() {
    const parent = this.parentNode;

    const offsetHeight = parent.offsetHeight;
    const scrollHeight = parent.scrollHeight;
    const scrollTop = parent.scrollTop;

    if (offsetHeight === scrollHeight) {
      this.style.setProperty('--line-offset', '');
      this.style.setProperty('--line-length', '');
    } else {
      this.style.setProperty('--line-offset', `calc(${Math.round(scrollTop / scrollHeight * offsetHeight)}px + ${scrollTop}px)`);
      this.style.setProperty('--line-length', `${Math.round(offsetHeight / scrollHeight * 100)}%`);
    }
  }
}
