import './scroll.css';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
  convertUnit,
  unit,
} from '../../helpers';
import NuComponent from '../component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...GRID_ATTRS,
  ...GRID_ITEM_ATTRS,
  orientation: '',
  size: unit('--nu-line-size'),
  color: '--nu-line-color',
});

export default class NuScroll extends NuComponent {
  static get nuTag() {
    return 'scroll';
  }

  static get nuRole() {
    return 'scrollbar';
  }

  static get nuAttrs() {
    return attrs;
  }

  constructor(props) {
    super(props);

    this.nuThemeProps = false;
    this.nuThemeInvert = true;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'orientation') {
      this.nuSetMod('horizontal', value !== 'horizontal');
      this.nuSetAria('orientation', value === 'horizontal' ? null : 'vertical');
    }
  }

  nuMounted() {
    this.nuUpdate();

    ['wheel', 'scroll'].forEach(eventName => {
      this.parentNode.addEventListener(eventName, () => {
        this.nuUpdate();
      });
    });

    this.parentNode.dataset.dataNuNoScroll = '';
  }

  nuUpdate() {
    const parent = this.parentNode;

    const offsetHeight = parent.offsetHeight;
    const scrollHeight = parent.scrollHeight;
    const scrollTop = parent.scrollTop;

    if (Math.abs(offsetHeight - scrollHeight) < 2) {
      this.style.setProperty('--line-offset', '');
      this.style.setProperty('--line-length', '');
    } else {
      this.style.setProperty('--line-offset', `calc(${Math.round(scrollTop / scrollHeight * offsetHeight)}px + ${scrollTop}px)`);
      this.style.setProperty('--line-length', `${Math.round(offsetHeight / scrollHeight * 100)}%`);
    }
  }
}
