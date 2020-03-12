import NuActiveElement from './activeelement';
import { setAttrs } from '../helpers';

const CIRCLE_ATTRS = {
  width: 'clamp(initial, --circle-size, --circle-size)',
  height: 'clamp(initial, --circle-size, --circle-size)',
  interactive: 'n',
  transition: 'transform, fill',
  move: '--circle-offset',
  fill: '--circle-bg-color',
  radius: 'round',
  overflow: 'no',
};

export default class NuSwitch extends NuActiveElement {
  static get nuTag() {
    return 'nu-switch';
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
      width: '(--size * 2)',
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
        :pressed[--size]`,
      '--circle-bg-color': `--special-bg-color
        :disabled[rgba(--text-color-rgb, .66)]
        :pressed[--special-text-color]
        :pressed:disabled[--special-text-color]`,
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuCreateCircle();
  }

  nuCreateCircle() {
    let circle = this.querySelector('nu-block');

    if (circle) {
      return;
    }

    circle = document.createElement('nu-block');

    setAttrs(circle, CIRCLE_ATTRS);

    this.appendChild(circle);
  }
}
