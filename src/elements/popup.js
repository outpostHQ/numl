import NuCard from './card';
import placeAttr from '../attributes/place';
import { extractMods, fixPosition } from '../helpers';
import FixateMixin, { FIXATE_ATTR } from '../mixins/fixate';

export default class NuPopup extends NuCard {
  static get nuTag() {
    return 'nu-popup';
  }

  static get nuRole() {
    return 'dialog';
  }

  static get nuId() {
    return 'popup';
  }

  static get nuMixins() {
    return [FixateMixin()];
  }

  static get nuAttrs() {
    return {
      place(val) {
        const { mods } = extractMods(val, ['top', 'bottom']);

        let sideStyle;

        if (mods.includes('top')) {
          sideStyle = 'margin-top'
        } else if (mods.includes('bottom')) {
          sideStyle = 'margin-bottom';
        }

        if (sideStyle) {
          return [{
            $suffix: ':not([space])',
            [sideStyle]: 'calc(var(--nu-indent) * -1)',
          }, placeAttr(val)];
        }

        return placeAttr(val);
      },
    };
  }

  static get nuDefaults() {
    return {
      shadow: '',
      z: 'front',
      opacity: '0 ^:pressed[1]',
      transition: 'opacity',
      border: '1b outside',
      width: 'minmax(100%, 100vw) :drop[clamp(initial, inherit, 100vw)]',
      text: 'wrap w4',
      cursor: 'default',
      place: '',
      drop: 'down',
      // place: 'outside-bottom',
    };
  }

  nuConnected() {
    super.nuConnected();

    if (!this.hasAttribute('place') && !this.hasAttribute(FIXATE_ATTR)) {
      this.setAttribute(FIXATE_ATTR, 'down');
    }

    if (!this.hasAttribute('theme')) {
      this.setAttribute('theme', 'main');
    }

    this.nuSetMod('popup', true);

    this.addEventListener('mousedown', (event) => {
      event.nuPopup = this;

      event.stopPropagation();
      event.preventDefault();
    });

    this.addEventListener('click', (event) => {
      event.nuPopup = this;

      event.stopPropagation();
      event.preventDefault();
    });

    this.nuClose();

    this.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.parentNode.nuSetPressed(false);
        this.parentNode.focus();
        event.stopPropagation();
      }
    });

    this.addEventListener('mouseenter', () => {
      this.parentNode.style.setProperty('--nu-hover-color', 'transparent');
    });

    this.addEventListener('mouseleave', () => {
      this.parentNode.style.removeProperty('--nu-hover-color');
    });

    this.addEventListener('submit', (event) => {
      this.nuClose();

      if (this.getAttribute('role') !== 'menu') {
        event.stopPropagation();
      }
    });
  }

  nuOpen() {
    this.nuFixateStart();

    this.hidden = false;
    this.parentNode.nuSetAria('expanded', true);

    const activeElement = this.querySelector('[tabindex]:not([tabindex="-1"]');

    fixPosition(this);

    if (activeElement) activeElement.focus();
  }

  nuClose() {
    this.nuFixateEnd();

    this.hidden = true;
    this.parentNode.nuSetPressed(false);

    this.style.removeProperty('--nu-transform');
  }
}

function findParentPopup(element) {
  const elements = [];

  do {
    if (element.hasAttribute && element.hasAttribute('aria-haspopup')) {
      elements.push(element.querySelector('[nu-popup]'));
    }
  } while (element = element.parentNode);

  return elements;
}

function handleOutside(event) {
  const popups = event.nuPopup || findParentPopup(event.target);

  [...document.querySelectorAll('[nu-popup]')]
    .forEach((currentPopup) => {
      if (!popups.includes(currentPopup)) {
        currentPopup.parentNode.nuSetPressed(false);
      }
    });
}

window.addEventListener('mousedown', handleOutside);
window.addEventListener('touchstart', handleOutside);
window.addEventListener('focusin', handleOutside);
