import { PLACE_ATTR } from '../attributes/place';
import { deepQueryAll, fixPosition, resetScroll } from '../helpers';
import { FIXATE_ATTR } from './fixate';

let CURRENT_POPUPS = new Set;

export default class PopupMixin {
  constructor($host) {
    this.$host = $host;

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
      const { container } = this;

      if (event.key === 'Escape') {
        if (container) {
          container.nuSetPressed(false);
          container.focus();
        }
        event.stopPropagation();
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation();
      }
    });

    $host.addEventListener('mouseenter', () => {
      if (!this.container) return;

      this.container.style.setProperty('--nu-local-hover-color', 'transparent');
    });

    $host.addEventListener('mouseleave', () => {
      if (!this.container) returrn;

      this.container.style.removeProperty('--nu-local-hover-color');
    });

    $host.addEventListener('submit', (event) => {
      this.close();

      if ($host.getAttribute('role') !== 'menu') {
        event.stopPropagation();
      }
    });
  }

  connected() {
    const { $host } = this;

    const shadowRoot = $host.nuContext.$shadowRoot;

    if (shadowRoot) {
      bindGlobalEvents(shadowRoot);
    }

    $host.nuSetContext('popup', this);

    const container = this.container = $host.nuContext.active;

    if (container) {
      container.nuLinkPopup($host);
    }

    if (!$host.hasAttribute(PLACE_ATTR)
      && !$host.hasAttribute(FIXATE_ATTR)
      && container && container.nuContext.popup) {
      $host.setAttribute(PLACE_ATTR, 'outside-right top');
    }

    this.close();
  }

  disconnected() {
    this.close();
    this.container.nuUnlinkPopup($host);

    delete this.container;
  }

  async open() {
    const { $host } = this;

    if (!$host.hidden) return;

    (await $host.nuMixin('fixate')).start();

    $host.hidden = false;

    if (this.container) {
      this.container.nuSetAria('expanded', true);
    }

    const activeElement = $host.nuDeepQuery('input, [tabindex]:not([tabindex="-1"]');

    fixPosition($host);

    if (activeElement) activeElement.focus();

    $host.nuEmit('open', null, { bubbles: false });
    $host.nuEmit('toggle', null, { bubbles: false });

    resetScroll($host, true);
  }

  async close() {
    const { $host } = this;

    if ($host.hidden) return;

    (await $host.nuMixin('fixate')).end();

    $host.hidden = true;

    if (this.container) {
      this.container.nuSetPressed(false);
    }

    $host.style.removeProperty('--nu-transform');

    $host.nuEmit('close', null, { bubbles: false });
    $host.nuEmit('toggle', null, { bubbles: false });

    resetScroll($host, true);
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
