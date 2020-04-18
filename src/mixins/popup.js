import { PLACE_ATTR } from '../attributes/place';
import { deepQueryAll, fixPosition, resetScroll } from '../helpers';
import { FIXATE_ATTR } from './fixate';
import Widget from './widget';

let CURRENT_POPUPS = new Set;

export default class PopupMixin extends Widget {
  init() {
    super.init();

    const { $host } = this;

    if (!$host.hasAttribute('theme')) {
      $host.setAttribute('theme', 'main');
    }

    $host.nuSetMod('popup', true);

    $host.addEventListener('mousedown', (event) => {
      CURRENT_POPUPS.add($host);

      event.stopPropagation();
    });

    $host.addEventListener('click', (event) => {
      CURRENT_POPUPS.add($host);

      event.stopPropagation();
    });

    $host.addEventListener('keydown', (event) => {
      const { button } = this;

      if (event.key === 'Escape') {
        if (button) {
          button.set(false);
          button.focus();
        }
        event.stopPropagation();
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation();
      }
    });

    $host.addEventListener('mouseenter', () => {
      if (!this.button) return;

      this.button.$host.style.setProperty('--nu-local-hover-color', 'transparent');
    });

    $host.addEventListener('mouseleave', () => {
      if (!this.button) return;

      this.button.$host.style.removeProperty('--nu-local-hover-color');
    });

    $host.nuSetContext('submit', (detail) => {
      this.emit('input', detail);
      this.button.set(false);
    });
  }

  connected() {
    const { $host } = this;

    const shadowRoot = $host.nuContext.$shadowRoot;

    if (shadowRoot) {
      bindGlobalEvents(shadowRoot);
    }

    $host.nuSetContext('popup', this);
    $host.nuSetContextHook('button', () => this.linkButton());

    this.linkButton();

    if (!$host.hasAttribute(PLACE_ATTR)
      && !$host.hasAttribute(FIXATE_ATTR)
      && $host.nuParentContext.popup) {
      $host.setAttribute(PLACE_ATTR, 'outside-right top');
    }

    this.close();
  }

  linkButton() {
    const { $host } = this;

    const button = this.button = $host.nuContext.button;

    if (button) {
      button.linkPopup(this);
    }
  }

  disconnected() {
    this.close();
    this.button.unlinkPopup(this);

    delete this.button;
  }

  open() {
    const { $host } = this;

    if (!$host.hidden) return;

    $host.nuMixin('fixate')
      .then(fixateMixin => fixateMixin.start());

    $host.hidden = false;

    if (this.button) {
      this.button.$host.nuSetAria('expanded', true);
    }

    // Select first focusable element
    const activeElement = $host.nuDeepQuery('input, [tabindex]:not([tabindex="-1"]):not([disabled])');

    fixPosition($host);

    if (activeElement) activeElement.focus();

    this.emit('open', null);
    this.emit('toggle', null);

    resetScroll($host, true);
  }

  close() {
    const { $host } = this;

    if ($host.hidden) return;

    $host.nuMixin('fixate')
      .then(fixateMixin => fixateMixin.end());

    $host.hidden = true;

    if (this.button) {
      this.button.set(false);
    }

    $host.style.removeProperty('--nu-transform');

    this.emit('close', null);
    this.emit('toggle', null);

    resetScroll($host, true);

    const childPopup = $host.nuDeepQuery('[nu-popup]');

    if (childPopup) {
      childPopup.nuMixin('popup').then(popupMixin => popupMixin.close());
    }
  }
}

function findParentPopup(element) {
  const elements = []

  do {
    if (element) {
      const mixins = element.nuMixins;

      if (mixins && mixins.button && mixins.button.popup) {
        const popupEl = mixins.button.popup.$host;

        if (popupEl) {
          elements.push(popupEl);
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
    setTimeout(() => {
      CURRENT_POPUPS.clear();
    }, 100);
  }

  deepQueryAll(this === window ? document : this, '[nu-popup]')
    .forEach((currentPopup) => {
      if (!CURRENT_POPUPS.has(currentPopup)) {
        currentPopup.nuMixin('popup').then(popup => popup.close());
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
