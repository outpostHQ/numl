import NuAction from './action';

export default class NuSwitch extends NuAction {
  static get nuTag() {
    return 'nu-switch';
  }

  static get nuRole() {
    return 'switch';
  }

  static get nuShadowRoot() {
    return false;
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

  static get nuStyles() {
    return {
      display: 'inline-block',
      border: '1bw',
      sizing: 'content',
      radius: 'round',
      outline: 'focus visible',
      inset: `0 :active[.5em #shadow.50]`,
      transition: 'shadow',
      width: '(--size * 2)',
      fill: `bg
        :pressed[special-bg]
        :pressed:disabled[text 50%]`,
      text: 'middle',
      mark: ':focusable[hover]',
      padding: '--circle-gap',

      '--size': '1em + --circle-gap',
      '--circle-gap': '.125em + 1bw',
      '--circle-size': '--size',
      '--circle-offset': `0
        :pressed[--size - 1bw]`,
      '--circle-bg-color': `--special-bg-color
        :disabled[rgba(--text-color-rgb, .66)]
        :pressed[--special-text-color]
        :pressed:disabled[--special-text-color]`,
    };
  }
}
