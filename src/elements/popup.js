import NuCard from './card';
import placeAttr, { PLACE_ATTR } from '../attributes/place';
import { deepQueryAll, extractMods, fixPosition } from '../helpers';
import FixateMixin, { FIXATE_ATTR } from '../mixins/fixate';

let CURRENT_POPUPS = new Set;

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
    return {
      fixate: FixateMixin(),
    };
  }

  static get nuAttrs() {
    return {
      place(val, defaults) {
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
            [sideStyle]: 'calc(var(--nu-gap) * -1)',
          }, ...placeAttr(val, defaults)];
        }

        return placeAttr(val, defaults);
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'block',
      shadow: '',
      z: 'front',
      opacity: '^ 0 :pressed[1]',
      transition: 'opacity',
      border: '1b outside',
      width: 'minmax(100%, 100vw) :drop[clamp(--fixate-width, min-content, 100vw)]',
      text: 'wrap w4',
      cursor: 'default',
      place: 'outside-bottom',
      drop: '',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} {
        user-select: initial;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    const shadowRoot = this.nuContext.$shadowRoot;

    if (shadowRoot) {
      bindGlobalEvents(shadowRoot);
    }

    this.nuSetContext('popup', this);

    this.nuActive = this.nuContext.active;

    this.nuActive.nuLinkPopup(this);

    if (!this.nuFirstConnect) return;

    if (!this.hasAttribute(PLACE_ATTR)
      && !this.hasAttribute(FIXATE_ATTR)
      && this.nuActive && this.nuActive.nuContext.popup) {
      this.setAttribute(PLACE_ATTR, 'outside-right top');
    }

    if (!this.hasAttribute('theme')) {
      this.setAttribute('theme', 'main');
    }

    this.nuSetMod('popup', true);

    this.addEventListener('mousedown', (event) => {
      CURRENT_POPUPS.add(this);

      event.stopPropagation();
    });

    this.addEventListener('click', (event) => {
      CURRENT_POPUPS.add(this);

      event.stopPropagation();
    });

    this.nuClose();

    this.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.nuActive) {
          this.nuActive.nuSetPressed(false);
          this.nuActive.focus();
        }
        event.stopPropagation();
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation();
      }
    });

    this.addEventListener('mouseenter', () => {
      if (!this.nuActive) return;

      this.nuActive.style.setProperty('--nu-local-hover-color', 'transparent');
      // this.style.setProperty('--nu-local-hover-color', 'var(--nu-hover-color)');
    });

    this.addEventListener('mouseleave', () => {
      if (!this.nuActive) returrn;

      this.nuActive.style.removeProperty('--nu-local-hover-color');
      // this.style.removeProperty('--nu-local-hover-color');
    });

    this.addEventListener('submit', (event) => {
      this.nuClose();

      if (this.getAttribute('role') !== 'menu') {
        event.stopPropagation();
      }
    });
  }

  nuDisconnected() {
    super.nuDisconnected();

    this.nuClose();
    this.nuActive.nuUnlinkPopup(this);

    delete this.nuActive;
  }

  async nuOpen() {
    (await this.nuMixin('fixate')).start();

    this.hidden = false;

    if (this.nuActive) {
      this.nuActive.nuSetAria('expanded', true);
    }

    const activeElement = this.querySelector('input, [tabindex]:not([tabindex="-1"]');

    fixPosition(this);

    if (activeElement) activeElement.focus();

    this.nuEmit('open', null, { bubbles: false });
    this.nuEmit('toggle', null, { bubbles: false });

    this.nuResetScroll(true);
  }

  async nuClose() {
    (await this.nuMixin('fixate')).end();

    this.hidden = true;

    if (this.nuActive) {
      this.nuActive.nuSetPressed(false);
    }

    this.style.removeProperty('--nu-transform');

    this.nuEmit('close', null, { bubbles: false });
    this.nuEmit('toggle', null, { bubbles: false });

    this.nuResetScroll(true);
  }
}

function findParentPopup(element) {
  const elements = []

  do {
    if (element) {
      if (element.nuChildPopup) {
        const popup = element.nuChildPopup;

        if (popup) {
          elements.push(popup);
        }
      }
    } else {
      break;
    }
  } while (element = element.parentNode || element.host);

  return elements;
}

function handleOutside(event) {
  if (event.nuPopupHandled) return;

  const popups = findParentPopup(event.target);

  popups.forEach(popup => CURRENT_POPUPS.add(popup));

  if (CURRENT_POPUPS) {
    setInterval(() => {
      CURRENT_POPUPS.clear();
    }, 0);
  }

  deepQueryAll(this === window ? document : this, '[nu-popup]')
    .forEach((currentPopup) => {
      if (!CURRENT_POPUPS.has(currentPopup)) {
        currentPopup.nuClose();
        event.nuPopupHandled = true;
      }
    });
}

function bindGlobalEvents(root) {
  if (root.nuPopupEventsBinded) return;

  ['mousedown', 'touchstart', 'focusin'].forEach(eventName => {
    root.addEventListener(eventName, handleOutside.bind(root), { passive: true });

    root.nuPopupEventsBinded = true;
  });
}

bindGlobalEvents(window);
