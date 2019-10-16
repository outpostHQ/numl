import NuCard from './card';

export default class NuPopup extends NuCard {
  static get nuTag() {
    return 'nu-popup';
  }

  static get nuRole() {
    return 'dialog';
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
      mod: 'wrap no-overflow',
      theme: 'default',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetMod('popup', true);
    this.parentNode.setAttribute('haspopup', this.nuId);

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
  }

  nuOpen() {
    this.style.display = this.getAttribute('display')
      || this.constructor.nuAllDefaults.display;
  }

  nuClose() {
    this.style.display = 'none';
  }
}

function findParentPopup(element) {
  do {
    if (element.nuHasMod && element.hasAttribute('haspopup')) {
      return element.querySelector('[nu-popup]');
    }
  } while (element = element.parentNode);
}

function handleOutside(event) {
  const popup = event.nuPopup || findParentPopup(event.target);

  [...document.querySelectorAll('[nu-popup]')]
    .forEach((currentPopup) => {
      if (currentPopup !== popup && currentPopup.parentNode.nuSetPressed) {
        currentPopup.parentNode.nuSetPressed(false);
      }
    });
}

window.addEventListener('mousedown', handleOutside);
window.addEventListener('focusin', handleOutside);
