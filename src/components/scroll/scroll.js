import './scroll.css';
import {
  unit,
} from '../../helpers';
import {
  GRID_ATTRS,
  GRID_ITEM_ATTRS,
} from '../../attrs';
import NuElement from '../element';

export default class NuScroll extends NuElement {
  static get nuTag() {
    return 'nu-scroll';
  }

  static get nuRole() {
    return 'scrollbar';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...GRID_ATTRS,
      ...GRID_ITEM_ATTRS,
      orientation: '',
      size: unit('--nu-line-size'),
      color: '--nu-line-color',
    });
  }

  constructor() {
    super();
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

    this.parentNode.dataset.nuNoScroll = '';
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
