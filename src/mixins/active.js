/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default function ActiveMixin() {
  return {
    connected() {
      if (!this.nuFirstConnect) return;

      this.addEventListener('click', evt => {
        this.nuSetMod('active', false);

        if (this.nuDisabled || evt.nuHandled) return;

        evt.nuHandled = true;

        if (!this.hasAttribute('disabled')) {
          this.nuTap(evt);
        }
      });

      this.addEventListener('keydown', evt => {
        if (this.nuDisabled || evt.nuHandled) return;

        evt.nuHandled = true;

        if (evt.key === 'Enter') {
          this.nuTap(evt);
        } else if (evt.key === ' ') {
          evt.preventDefault();

          if (!this.hasAttribute('disabled') && this.nuHasMod('focusable')) {
            this.nuSetMod('active', true);
          }
        }
      });

      this.addEventListener('keyup', evt => {
        this.nuSetMod('active', false);

        if (this.nuDisabled || evt.nuHandled) return;

        evt.nuHandled = true;

        if (evt.key === ' ') {
          evt.preventDefault();
          this.nuTap(evt);
        }
      });

      this.addEventListener('blur', () => this.nuSetMod('active', false));

      ['mousedown', 'touchstart'].forEach(eventName => {
        this.addEventListener(eventName, () => {
          if (!this.nuDisabled && this.nuHasMod('focusable')) {
            this.nuSetMod('active', true);
          }
        }, { passive: true });
      });

      ['mouseleave', 'mouseup', 'touchend'].forEach(eventName => {
        this.addEventListener(eventName, () => {
          this.nuSetMod('active', false);
        });
      }, { passive: true });
    },
  };
}
