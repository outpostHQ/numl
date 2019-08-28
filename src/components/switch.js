import NuBlock from './block';
import focusable from '../mixins/focusable';
import { bindActiveEvents } from '../helpers';

export default class NuSwitch extends NuBlock {
  static get nuTag() {
    return 'nu-switch';
  }

  static get nuDisplay() {
    return 'inline-block';
  }

  static get nuRole() {
    return 'switch';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      checked: '',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-depth-color: transparent;
        --nu-border-radius: calc(var(--nu-size) / 2);
        --nu-switch-color: rgba(0, 0, 0, 0);

        --nu-border-shadow: inset 0 0 0 var(--nu-theme-border-width) var(--nu-theme-border-color);
        --nu-depth-shadow: 0 .25rem 1.5rem var(--nu-depth-color);
        --nu-background-color: var(--nu-theme-background-color);
        --nu-switch-shadow: 0 0 1rem 0 var(--nu-switch-color) inset;

        --nu-size: 2em;
        --nu-circle-padding: calc(var(--nu-theme-border-width) * 4);
        --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
        --nu-circle-offset: var(--nu-circle-padding);
        --nu-circle-opacity: 1;
        --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);
        --nu-circle-background-color: var(--nu-theme-color);

        position: relative;
        width: calc(var(--nu-size) * 2);
        height: var(--nu-size);
        border-radius: var(--nu-border-radius);
        background-color: var(--nu-background-color);
        cursor: pointer;
        box-shadow: var(--nu-depth-shadow),
          var(--nu-switch-shadow),
          var(--nu-border-shadow);
        transition: box-shadow var(--nu-theme-animation-time) linear,
        filter var(--nu-theme-animation-time) linear;
        user-select: none;
        vertical-align: middle;
      }

      ${nuTag}::after {
        content: "";
        position: absolute;
        display: block;
        width: var(--nu-circle-size);
        height: var(--nu-circle-size);
        pointer-events: none;
        left: 0;
        top: var(--nu-circle-padding);
        transform: translate(var(--nu-circle-offset), 0);
        transition: transform var(--nu-theme-animation-time) linear,
          opacity var(--nu-theme-animation-time) linear,
          background-color var(--nu-theme-animation-time) linear;
        background-color: var(--nu-circle-background-color);
        border-radius: var(--nu-circle-border-radius);
        /*box-shadow: var(--nu-border-shadow);*/
        opacity: var(--nu-circle-opacity);
      }

      ${nuTag}[disabled] {
        opacity: .5;
        cursor: default;
      }

      ${nuTag}[aria-checked="true"] {
        --nu-background-color: var(--nu-theme-special-color);
        --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-padding) - var(--nu-circle-size));
        --nu-circle-opacity: 1;
        --nu-circle-background-color: var(--nu-theme-background-color);
      }

      ${nuTag}[nu-active]:not([disabled]):not([aria-checked="true"]) {
        --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-shadow-intensity));
      }
      
      ${nuTag}[nu-active][aria-checked="true"]:not([disabled]) {
        --nu-switch-color: rgba(0, 0, 0, var(--nu-theme-special-shadow-intensity));
      }

      ${focusable(nuTag)}
    `;
  }

  constructor() {
    super();
  }

  nuMounted() {
    super.nuMounted();

    this.nuSetValue(this.getAttribute('checked'));

    this.nuSetFocusable(!this.hasAttribute('disabled'));

    bindActiveEvents.call(this);
  }

  get value() {
    return this.getAttribute('aria-checked') === 'true';
  }

  nuTap() {
    this.nuToggle();

    this.nuEmit('tap');
  }

  nuSetValue(value) {
    if (value) {
      this.nuSetAria('checked', true);
    } else {
      this.nuSetAria('checked', false);
    }
  }

  nuToggle() {
    this.nuSetValue(!this.value);
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'disabled':
        this.nuSetMod('disabled', value != null);
        this.nuSetFocusable(value == null);
        break;
      case 'checked':
        this.nuSetValue(value != null);
        break;
    }
  }
}
