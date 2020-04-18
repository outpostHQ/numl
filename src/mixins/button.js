import WidgetMixin from "./widget";
import Routing from '../routing';

export default class ButtonMixin extends WidgetMixin {
  init() {
    this.props.to = null;

    super.init();

    const { $host } = this;

    $host.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $host.nuHasAria('expanded')) {
        this.set(false);
      }
    });

    $host.addEventListener('tap', (event) => {
      if (!event.nuRole && this.role) {
        event.nuRole = this.role;
      }
    });
  }

  connected() {
    super.connected();

    const { $host } = this;

    this.verifyRadioGroup();
    $host.nuSetContextHook('radiogroup', () => this.verifyRadioGroup());

    if (this.role === 'button') {
      if (this.to) {
        this.setRole('link');
      }
    }

    if (this.isToggle()) {
      this.set(this.pressed);
    }

    this.control(this.pressed, this.value);
    this.createLink();

    $host.nuSetContext('button', this);
  }

  changed(name, value) {
    super.changed(name, value);

    const { $host } = this;

    switch (name) {
      case 'selected':
      case 'checked':
        if (value != null) {
          this.setAttribute('pressed', '');
        } else {
          this.removeAttribute('pressed');
        }

        break;
      case 'pressed':
        value = value != null;

        this.set(value);

        break;
      case 'value':
        this.setValue(value);

        break;
      case 'to':
        if (value && value.length) {
          this.newTab = value.startsWith('!');
          this.href = value.replace(/^!/, '');
        } else {
          this.newTab = false;
          this.href = '';
        }

        this.createLink();

        const { $link } = this;

        if ($link) {
          $link.href = this.href;
          $link.target = this.newTab ? '_blank' : '_self';
        }
    }
  }

  verifyRadioGroup() {
    const { $host } = this;

    const radioGroupContext = $host.nuContext.radiogroup;

    if (!radioGroupContext) return;

    const radioGroup = this.radioGroup = radioGroupContext.mixin;

    this.setRole(radioGroup.itemRole);

    if (!$host.hasAttribute('value')) {
      if (!radioGroup.counter) radioGroup.counter = 0;

      $host.setAttribute('value', radioGroup.counter++);
    }

    if (this.pressed) {
      radioGroup.set(this.value);
    } else if (radioGroup.value === this.value) {
      $host.setAttribute('pressed', '');
    } else {
      $host.removeAttribute('pressed');
    }
  }

  linkPopup(popup) {
    const { $host } = this;

    this.popup = popup;
    $host.nuSetAria('haspopup', true);
    $host.nuSetAria('expanded', this.pressed || false);
    this.setRole('button');
  }

  unlinkPopup() {
    const { $host } = this;

    delete this.popup;
    $host.nuSetAria('haspopup', null);
    $host.nuSetAria('expanded', null);
    this.setRole(this.$host.constructor.nuRole);
  }

  createLink() {
    const { $host } = this;

    let $link;

    if (!this.to) {
      if (this.$link) {
        delete this.$link;
        $host.removeChild(this.$link);
      }

      return;
    }

    if (!this.$link) {
      $link = document.createElement('a');

      $link.href = this.href;
      $link.target = this.newTab ? '_blank' : '_self';
      $link.setAttribute('tabindex', '-1');
      $link.setAttribute('aria-labelledby', $host.nuUniqId);

      this.$link = $link;

      setTimeout(() => $host.appendChild(this.$link));

      this.$link.addEventListener('click', (evt) => {
        if (this.disabled) {
          evt.preventDefault();
          return;
        }

        if (evt.button === 0 && !this.disabled) {
          this.tap(evt);
        }

        evt.stopPropagation();
      });
    }

    if (($link && $link.href || this.href || '').includes('//')) {
      this.$link.setAttribute('rel', 'noreferrer');
    } else {
      this.$link.removeAttribute('rel');
    }
  }

  tap(evt) {
    const { $host } = this;

    if (this.to && evt.target !== this.$link) {
      this.$link.click();

      return;
    }

    if (this.disabled
      || $host.getAttribute('tabindex') === '-1') return;

    if (this.scrollto) {
      $host.nuScrollTo(this.scrollto);
    }

    if (this.to) {
      const to = this.to;
      const href = to.replace(/^!/, '');
      const openNewTab = to.startsWith('!') || evt.metaKey || evt.shiftKey;
      const useLink = Routing.route(href, openNewTab);

      if (!useLink) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    }

    setTimeout(() => {
      this.emit('tap', this.value);
    }, 0);

    this.toggle();
    this.control(this.pressed, this.value);

    const value = (this.pressed && this.value) || this.pressed;

    if (this.isCheckbox()) {
      this.emit('pressed', this.pressed);
      this.emit('input', value);
    }

    const action = this.$host.getAttribute('action');

    if (action) {
      const actionCallback = this.$host.nuContext[action];

      if (actionCallback) {
        actionCallback(value);
      }
    }
  }

  toggle() {
    if (!this.isToggle()) return;

    if (this.pressed && !this.isUnpressable()) {
      return;
    }

    this.set(!this.pressed);
  }

  set(pressed) {
    if (pressed === this.pressed) return;

    if (!this.isToggle()) return;

    const { $host } = this;

    pressed = pressed || false;

    this.pressed = pressed;

    if (this.isRadio()) {
      $host.nuMixin('focus')
        .then(focusMixin => focusMixin.set(!pressed && !this.disabled));
    }

    if (this.radioGroup) {
      $host.nuSetAria('expanded', pressed);
    } else if (this.isCheckbox()) {
      $host.nuSetAria('checked', pressed);
    } else if (this.isSelectable()) {
      $host.nuSetAria('selected', pressed);
    } else {
      $host.nuSetAria('pressed', pressed);
    }

    $host.nuSetMod('pressed', pressed);

    this.control(this.pressed, this.value);

    if (pressed) {
      const radioGroupContext = this.nuContext && this.nuContext.radiogroup;

      if (radioGroupContext) {
        const radioGroup = radioGroupContext.mixin;

        radioGroup.set(this.value);
      }
    }

    const innerPopup = $host.nuDeepQuery('[nu-popup]');

    if (innerPopup) {
      innerPopup.nuMixin('popup')
        .then(popupMixin => popupMixin[this.pressed ? 'open' : 'close']());
    }
  }

  setValue(value) {
    if (value === this.value) return;

    this.value = value;

    setTimeout(() => {
      this.control(this.pressed, this.value);

      if (notify) {
        this.emit('input', value);
      }
    }, 0);
  }

  isToggle() {
    const { $host } = this;

    return $host.nuHasAria('pressed')
      || $host.nuHasAria('expanded')
      || $host.nuHasAria('checked')
      || $host.nuHasAria('selected')
      || ['checkbox', 'radio', 'tab', 'switch'].includes(this.role);
  }

  isUnpressable() {
    return !['radio', 'tab'].includes(this.role);
  }

  isRadio() {
    return ['radio', 'tab'].includes(this.role);
  }

  isSelectable() {
    return ['tab'].includes(this.role);
  }

  isCheckbox() {
    return ['radio', 'checkbox', 'switch'].includes(this.role);
  }
}
