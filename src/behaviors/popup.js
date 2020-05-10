import { PLACE_ATTR } from '../attributes/place';
import { deepQueryAll, fixPosition, resetScroll } from '../helpers';
import { FIXATE_ATTR } from './fixate';
import WidgetBehavior from './widget';

let POPUPS = new Set;

export default class PopupBehavior extends WidgetBehavior {
  static get params() {
    return {
      provider: false,
      injector: false,
    };
  }

  init() {
    super.init();

    const { host } = this;

    if (!this.hasAttr('theme')) {
      this.setAttr('theme', 'main');
    }

    this.setMod('popup', true);

    this.on('mousedown', (event) => {
      event.stopPropagation();
    });

    this.on('click', (event) => {
      event.stopPropagation();
    });

    this.on('keydown', (event) => {
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

    this.on('mouseenter', () => {
      if (!this.button) return;

      this.button.host.style.setProperty('--nu-local-hover-color', 'transparent');
    });

    this.on('mouseleave', () => {
      if (!this.button) return;

      this.button.host.style.removeProperty('--nu-local-hover-color');
    });
  }

  connected() {
    const { host } = this;

    const shadowRoot = host.nuContext.$shadowRoot;

    if (shadowRoot) {
      bindGlobalEvents(shadowRoot);
    }

    this.setContext('popup', this);
    host.nuSetContextHook('button', () => this.linkButton());

    this.linkButton();

    // if (!host.hasAttribute(PLACE_ATTR)
    //   && !host.hasAttribute(FIXATE_ATTR)
    //   && host.nuParentContext.popup) {
    //   host.setAttribute(PLACE_ATTR, 'outside-right top');
    // }

    this.close();

    POPUPS.add(host);
  }

  linkButton() {
    const { host } = this;

    const button = this.button = host.nuContext.button;

    if (button) {
      button.linkPopup(this);
    }
  }

  disconnected() {
    this.close();
    this.button.unlinkPopup(this);

    delete this.button;

    POPUPS.remove(host);
  }

  open() {
    const { host } = this;

    if (!host.hidden) return;

    host.nu('fixate')
      .then(Fixate => Fixate.start());

    host.hidden = false;

    if (this.button) {
      this.button.host.nuSetAria('expanded', true);
    }

    // Select first focusable element
    const activeElement = host.nuDeepQuery('input, [tabindex]:not([tabindex="-1"]):not([disabled])');

    fixPosition(host);

    if (activeElement) activeElement.focus();

    this.emit('open', null);
    this.emit('toggle', null);

    resetScroll(host, true);
  }

  close() {
    const { host } = this;

    if (host.hidden) return;

    host.nu('fixate')
      .then(Fixate => Fixate.end());

    host.hidden = true;

    if (this.button) {
      this.button.set(false);
    }

    host.style.removeProperty('--nu-transform');

    this.emit('close', null);
    this.emit('toggle', null);

    resetScroll(host, true);

    const childPopup = host.nuDeepQuery('[nu-popup]');

    if (childPopup) {
      childPopup.nu('popup').then(Popup => Popup.close());
    }
  }
}

function findParentPopup(element, current) {
  const elements = []

  do {
    if (element) {
      const behaviors = element.nuBehaviors;

      if (behaviors && behaviors.button && behaviors.button.popup) {
        const popupEl = behaviors.button.popup.host;

        if (popupEl) {
          elements.push(popupEl);
        }
      }
    } else {
      break;
    }

    element = element.parentNode || element.host;
  } while (element || !current.has(element));

  return elements;
}

function handleOutside(event) {
  if (event.nuPopupHandled) return;

  const popups = findParentPopup(event.target, POPUPS);

  deepQueryAll(this === window ? document : this, '[nu-popup]')
    .forEach((currentPopup) => {
      if (!popups.includes(currentPopup)) {
        currentPopup.nu('popup').then(popup => popup.close());
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
