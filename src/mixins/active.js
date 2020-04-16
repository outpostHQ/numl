/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default class ActiveMixin {
  constructor($host) {
    $host.addEventListener('click', evt => {
      $host.nuSetMod('active', false);

      if ($host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (!$host.hasAttribute('disabled')) {
        $host.nuTap(evt);
      }
    });

    $host.addEventListener('keydown', evt => {
      if ($host.nuDisabled || evt.nuHandled) return;

      evt.nuHandled = true;

      if (evt.key === 'Enter') {
        $host.nuTap(evt);
      } else if (evt.key === ' ') {
        evt.preventDefault();

        if (!$host.hasAttribute('disabled') && $host.nuHasMod('focusable')) {
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
        $host.nuTap(evt);
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
