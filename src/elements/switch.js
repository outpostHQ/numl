import NuActiveElement from './activeelement';
import focusable from '../mixins/focusable';
import { bindActiveEvents } from '../helpers';
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
      border: '1x',
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

        --nu-local-depth-shadow: 0 .25rem 1.5rem var(--nu-depth-color);
        --nu-local-bg-color: var(--nu-bg-color);
        --nu-local-active-shadow: 0 0 1rem 0 var(--nu-local-color) inset;

        --nu-size: 2em;
        --nu-circle-padding: calc(var(--nu-padding) / 2);
        --nu-circle-size: calc(var(--nu-size) - var(--nu-circle-padding) * 2);
        --nu-circle-offset: 0;
        --nu-circle-opacity: 1;
        --nu-circle-border-radius: calc(var(--nu-circle-size) / 2);
        --nu-circle-bg-color: var(--nu-special-color);

        position: relative;
        width: calc(var(--nu-size) * 2 - var(--nu-padding));
        max-height: var(--nu-size);
        background-color: var(--nu-local-bg-color) !important;
        cursor: pointer;
        box-shadow: var(--nu-local-depth-shadow),
          var(--nu-local-active-shadow),
          var(--nu-local-stroke-shadow);
        transition: box-shadow var(--nu-animation-time) linear,
          filter var(--nu-animation-time) linear;
        user-select: none;
        vertical-align: middle;
        padding: var(--nu-circle-padding);
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
        --nu-local-bg-color: var(--nu-special-text-color);
        --nu-circle-offset: calc(var(--nu-size) * 2 - var(--nu-circle-size) - var(--nu-padding));
        --nu-circle-opacity: 1;
        --nu-circle-bg-color: var(--nu-special-bg-color);
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
