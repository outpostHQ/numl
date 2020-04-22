import NuActiveElement from './activeelement';

export default class NuSwitch extends NuActiveElement {
  static get nuTag() {
    return 'nu-switch';
  }

  static get nuRole() {
    return 'switch';
  }

  static get nuTemplate() {
    return `
      <nu-circle
        size="--circle-size"
        interactive="n"
        transition="transform, fill"
        move="--circle-offset"
        fill="--circle-bg-color"
        overflow="no"
        border="0"></nu-circle>
    `;
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
      focusable: 'y',
      toggle: `0
        :active[.5em]
        :active:pressed[.5em]`,
      transition: 'shadow',
      width: '(--size * 2 + --circle-gap * 2)',
      fill: `bg
        :pressed[special-bg]
        :pressed:disabled[text 50%]`,
      text: 'v-middle',
      hoverable: 'n :focusable[y]',
      padding: '--circle-gap',

      '--size': '1em + --circle-gap',
      '--circle-gap': '.125em + 1b',
      '--circle-size': '--size',
      '--circle-offset': `0
        :pressed[--size - 1b]`,
      '--circle-bg-color': `--special-bg-color
        :disabled[rgba(--text-color-rgb, .66)]
        :pressed[--special-text-color]
        :pressed:disabled[--special-text-color]`,
    };
  }
}
