import Behavior from "./behavior";

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default class ActiveBehavior extends Behavior {
  constructor(host) {
    super(host);

    const root = document.documentElement;

    const setActive = (bool) => {
      this.setMod('active', bool);

      if ('webkitUserSelect' in root.style) {
        root.style.webkitUserSelect = bool ? 'none' : '';
      } else {
        root.style.userSelect = bool ? 'none' : '';
      }
    }

    this.on('click', evt => {
      setActive(false);

      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      this.tap(evt);
    });

    this.on('keydown', evt => {
      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        this.tap(evt);
      } else if (evt.key === ' ') {
        evt.preventDefault();

        if (!host.nuDisabled) {
          setActive(true);
        }
      }
    });

    this.on('keyup', evt => {
      setActive(false);

      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        this.tap(evt);
      }
    });

    this.on('blur', () => setActive(false));

    this.on(['mousedown', 'touchstart'], () => {
      // checking for focusable also && host.nuHasMod('focusable')
      // doesn't for nu-option
      if (!host.nuDisabled) {
        setActive(true);
      }
    }, { passive: true });

    this.on(['mouseleave', 'mouseup', 'touchend'], () => {
      setActive(false);
    }, { passive: true });
  }

  tap(evt) {
    const button = this.host.NuAction;

    if (button) {
      button.tap(evt);
    }
  }
}
