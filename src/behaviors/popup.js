import {
  deepQuery,
  deepQueryAll,
  fixPosition,
  resetScroll,
  scrollParentToChild,
  stackTrace
} from '../helpers';
import WidgetBehavior from './widget';

let POPUPS = new Set;

export default class PopupBehavior extends WidgetBehavior {
  static get params() {
    return {
      provideValue: false,
      contextValue: false,
      linkValue: false,
      linkHostValue: false,
    };
  }

  init() {
    this.host.nuPopup = this;

    super.init();

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
          this.close();
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

    this.provideAction('close', (bool) => {
      this.close();

      if (bool) {
        this.doAction('close');
      }
    });

    this.linkContext('button', (button, oldButton) => {
      if (oldButton) {
        oldButton.unlinkPopup(this);
      }

      if (button) {
        button.linkPopup(this);
      }
    });

    this.close(true);
  }

  disconnected() {
    this.close();

    if (this.button) {
      this.button.unlinkPopup(this);
    }

    delete this.button;
  }

  open() {
    const { host } = this;

    if (this.isOpen) return;

    host.nu('fixate')
      .then(Fixate => Fixate.start());

    this.openEffect(true);

    if (this.button) {
      this.button.host.nuSetAria('expanded', true);
    }

    fixPosition(host);

    this.emit('open', null);
    this.emit('toggle', null);

    resetScroll(host, true);

    // Select element with current value (for menus)
    const currentEl = deepQuery(host, '[is-current]');

    if (currentEl) {
      // currentEl.scrollIntoView({ block: 'center' });
      scrollParentToChild(host, currentEl);
      currentEl.focus();
    } else {
      // Select first focusable element
      const activeElement = host.nuDeepQuery('input, [tabindex]:not([tabindex="-1"]):not([disabled])');

      if (activeElement) activeElement.focus();
    }
  }

  close(silent = false) {
    const { host } = this;

    if (!this.isOpen) return;

    host.nu('fixate')
      .then(Fixate => Fixate.end());

    this.openEffect(false);

    if (silent) return;

    if (this.button) {
      this.button.set(false);
      this.button.host.focus();
    }

    host.style.removeProperty('--nu-transform');

    this.emit('close', null);
    this.emit('toggle', null);

    resetScroll(host, true);

    const childPopup = host.nuDeepQuery('[is-popup]');

    if (childPopup) {
      childPopup.nuPopup.close();
    }
  }

  openEffect(bool) {
    this.host.hidden = !bool;
  }

  get isOpen() {
    return !this.host.hidden;
  }
}

function findParentPopup(element) {
  const elements = [];

  while (element) {
    const nuButton = element.nuButton;

    if (nuButton && nuButton.popup) {
      const popupEl = nuButton.popup.host;

      if (popupEl) {
        elements.push(popupEl);
      }
    }

    element = element.parentNode || element.host;
  }

  return elements;
}

function handleOutside(event) {
  if (event.nuPopupHandled) return;

  const popups = findParentPopup(event.target);

  deepQueryAll(this === window ? document : this, '[is-popup]')
    .forEach((currentPopup) => {
      if (!popups.includes(currentPopup)) {
        if (currentPopup.nuPopup) {
          currentPopup.nuPopup.close();
        }

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
