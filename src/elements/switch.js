import NuActiveElement from './activeelement';
import focusable from '../mixins/focusable';
import NuElement from './element';

export default class NuSwitch extends NuActiveElement {
  static get nuTag() {
    return 'nu-switch';
  }

  static get nuRole() {
    return 'switch';
  }

  static get nuId() {
    return 'btn';
  }

  static get nuAttrs() {
    return {
      disabled: '',
      checked: '',
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      border: '1b',
      sizing: 'content',
      radius: 'round',
    };
  }

  static nuCSS({ tag }) {
    return `
      ${NuElement.nuExtractCSS(this)}
      ${tag} {
        --nu-local-depth-color: transparent;
        --nu-local-border-radius: calc(var(--nu-size) / 2);
        --nu-local-color: rgba(0, 0, 0, 0);

        --nu-local-depth-shadow: 0 .25rem 1.5rem var(--nu-local-depth-color);
        --nu-local-bg-color: var(--nu-bg-color);
        --nu-local-active-shadow: 0 0 calc(var(--nu-size) / 2) 0 var(--nu-local-color) inset;

        --nu-size: 2em;
        --nu-circle-padding: calc(var(--nu-indent) / 2);
        --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
        --nu-circle-offset: 0;
        --nu-circle-opacity: 1;
        --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);

        position: relative;
        width: calc(var(--nu-size) * 2 - var(--nu-indent));
        max-height: var(--nu-size);
        background-color: var(--nu-local-bg-color) !important;
        cursor: pointer;
        box-shadow: var(--nu-local-depth-shadow),
          var(--nu-local-active-shadow),
          var(--nu-local-stroke-shadow);
        transition: box-shadow var(--nu-animation-time) linear,
          filter var(--nu-animation-time) linear;
        user-select: none;
        vertical-align: var(--nu-inline-offset);
        padding: var(--nu-circle-padding);
      }

      ${tag}:not([disabled]) {
        --nu-circle-bg-color: var(--nu-special-bg-color);
      }

      ${tag}[disabled] {
        --border-color: rgba(var(--nu-text-color-rgb), .66);
        --nu-circle-bg-color: rgba(var(--nu-text-color-rgb), .66);
      }

      ${tag}::after {
        content: "";
        display: block;
        width: var(--nu-circle-size);
        height: var(--nu-circle-size);
        pointer-events: none;
        transform: translate(var(--nu-circle-offset), 0);
        transition: transform var(--nu-animation-time) linear,
          opacity var(--nu-animation-time) linear,
          background-color var(--nu-animation-time) linear;
        background-color: var(--nu-circle-bg-color);
        border-radius: var(--nu-circle-border-radius);
        opacity: var(--nu-circle-opacity);
      }

      ${tag}[disabled] {
        opacity: .5;
        cursor: default;
      }

      ${tag}[nu-pressed] {
        --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-size) - var(--nu-indent));
        --nu-circle-opacity: 1;
        --nu-circle-bg-color: var(--nu-special-text-color);
      }

      ${tag}[nu-pressed]:not([disabled]) {
        --nu-local-bg-color: var(--nu-special-bg-color);
      }

      ${tag}[nu-pressed][disabled] {
        --nu-local-bg-color: rgba(var(--nu-text-color-rgb), .5);
      }

      ${tag}[nu-active]:not([disabled]):not([nu-pressed]) {
        --nu-local-color: rgba(0, 0, 0, var(--nu-intensity));
      }

      ${tag}[nu-active][nu-pressed]:not([disabled]) {
        --nu-local-color: rgba(0, 0, 0, var(--nu-special-intensity));
      }

      ${focusable(tag)}
    `;
  }
}
