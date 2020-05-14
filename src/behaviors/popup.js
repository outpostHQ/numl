import { deepQuery, deepQueryAll, fixPosition, resetScroll } from '../helpers';
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
    host.nuSetContextHook('button', () => this.linkButton());

    this.linkButton();

    // if (!host.hasAttribute(PLACE_ATTR)
    //   && !host.hasAttribute(FIXATE_ATTR)
    //   && host.nuParentContext.popup) {
    //   host.setAttribute(PLACE_ATTR, 'outside-right top');
    // }

    this.close();
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

    const currentEl = deepQuery(host, '[nu-current]');

    if (currentEl) {
      currentEl.scrollIntoView({ block: 'center' });
    }
  }

  close() {
    const { host } = this;

    if (host.hidden) return;

    host.nu('fixate')
      .then(Fixate => Fixate.end());

    host.hidden = true;

    if (this.button) {
      this.button.set(false);
      this.button.host.focus();
    }

    host.style.removeProperty('--nu-transform');

    this.emit('close', null);
    this.emit('toggle', null);

    resetScroll(host, true);

    const childPopup = host.nuDeepQuery('[nu-popup]');

    if (childPopup) {
      childPopup.nuPopup.close();
    }
  }
}

function findParentPopup(element) {
  const elements = [];

  do {
    if (element) {
      const nuButton = element.nuButton;

      if (nuButton && nuButton.popup) {
        const popupEl = nuButton.popup.host;

        if (popupEl) {
          elements.push(popupEl);
        }
      }
    } else {
      break;
    }

    element = element.parentNode || element.host;
  } while (element);

  return elements;
}

function handleOutside(event) {
  if (event.nuPopupHandled) return;
  const popups = findParentPopup(event.target);

  deepQueryAll(this === window ? document : this, '[nu-popup]')
    .forEach((currentPopup) => {
      if (!popups.includes(currentPopup)) {
        currentPopup.nuPopup.close();
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
