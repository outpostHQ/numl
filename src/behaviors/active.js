import Behavior from "./behavior";

/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default class ActiveBehavior extends Behavior {
  constructor($host) {
    super($host);

    let button;

    this.nu('button').then(_button => button = _button);

    $host.addEventListener('click', evt => {
      $host.nuSetMod('active', false);

      if ($host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      button && button.tap(evt);
    });

    $host.addEventListener('keydown', evt => {
      if ($host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        button && button.tap(evt);
      } else if (evt.key === ' ') {
        evt.preventDefault();

        if (!$host.nuDisabled && $host.nuHasMod('focusable')) {
          $host.nuSetMod('active', true);
        }
      }
    });

    $host.addEventListener('keyup', evt => {
      $host.nuSetMod('active', false);

      if ($host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === ' ') {
        evt.preventDefault();
        button && button.tap(evt);
      }
    });

    $host.addEventListener('blur', () => $host.nuSetMod('active', false));

    ['mousedown', 'touchstart'].forEach(eventName => {
      $host.addEventListener(eventName, () => {
        if (!$host.nuDisabled && $host.nuHasMod('focusable')) {
          $host.nuSetMod('active', true);
        }
      }, { passive: true });
    });

    ['mouseleave', 'mouseup', 'touchend'].forEach(eventName => {
      $host.addEventListener(eventName, () => {
        $host.nuSetMod('active', false);
      });
    }, { passive: true });
  }
}
