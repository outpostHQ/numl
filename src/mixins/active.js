/**
 * Event bindings for active elements.
 * Enable focus and active states.
 * Should be bind to the element before call.
 */
export default function ActiveMixin() {
  return {
    connected() {
      this.addEventListener('click', evt => {
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
        if (this.nuDisabled || evt.nuHandled) return;

        evt.nuHandled = true;

        if (evt.key === ' ') {
          evt.preventDefault();
          this.nuSetMod('active', false);
          this.nuTap(evt);
        }
      });

      this.addEventListener('blur', () => this.nuSetMod('active', false));

      this.addEventListener('mousedown', () => {
        if (!this.nuDisabled && this.nuHasMod('focusable')) {
          this.nuSetMod('active', true);
        }
      });

      ['mouseleave', 'mouseup'].forEach(eventName => {
        this.addEventListener(eventName, () => {
          this.nuSetMod('active', false);
        });
      });
    },
  };
}
