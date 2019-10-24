import NuCard from './card';
import placeAttr from '../attributes/place';
import { extractMods, fixPosition } from '../helpers';

export default class NuPopup extends NuCard {
  static get nuTag() {
    return 'nu-popup';
  }

  static get nuRole() {
    return 'dialog';
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
            [sideStyle]: 'calc(var(--nu-theme-padding) * -1)',
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
      place: 'outside-bottom',
      border: '1x outside',
      width: '100%',
      text: 'wrap',
      theme: 'default',
    };
  }

  nuConnected() {
    super.nuConnected();

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
    this.hidden = false;
    this.parentNode.nuSetAria('expanded', true);

    const activeElement = this.querySelector('[tabindex]:not([tabindex="-1"]');

    fixPosition(this);

    setTimeout(() => fixPosition(this), 0);

    if (activeElement) activeElement.focus();
  }

  nuClose() {
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
window.addEventListener('focusin', handleOutside);
