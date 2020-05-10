import Behavior from "./behavior";

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default class ActiveBehavior extends Behavior {
  constructor(host) {
    super(host);

    this.on('click', evt => {
      this.setMod('active', false);

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

        if (!host.nuDisabled && host.nuHasMod('focusable')) {
          this.setMod('active', true);
        }
      }
    });

    this.on('keyup', evt => {
      this.setMod('active', false);

      if (host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        this.tap(evt);
      }
    });

    this.on('blur', () => this.setMod('active', false));

    this.on(['mousedown', 'touchstart'], () => {
      if (!host.nuDisabled && host.nuHasMod('focusable')) {
        this.setMod('active', true);
      }
    }, { passive: true });

    this.on(['mouseleave', 'mouseup', 'touchend'], () => {
      this.setMod('active', false);
    }, { passive: true });
  }

  tap(evt) {
    if (this.is('button')) {
      return this.nu('button')
        .then(button => button.tap(evt));
    }
  }
}
