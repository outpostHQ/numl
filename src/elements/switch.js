import NuActiveElement from './activeelement';
import { setAttrs } from '../helpers';

const CIRCLE_ATTRS = {
  width: '--circle-size',
  height: '--circle-size',
  interactive: 'n',
  transition: 'transform, background-color',
  move: '--circle-offset 0',
  fill: '--circle-bg-color',
  radius: 'round',
};

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
      radius: '--size / 2',
      focusable: 'y',
      toggle: `0
        :active[.75em]
        :active:pressed[.75em]`,
      transition: 'box-shadow, filter',
      width: '(--size * 2) - 1x',
      height: 'max(--size)',
      fill: `bg
        :pressed[special-bg]
        :pressed:disabled[text 50%]`,
      text: 'v-middle',
      padding: '.5x',
      hoverable: 'y',
      opacity: '1',

      '--size': '2em',
      '--circle-size': '--size - 1x',
      '--circle-offset': `0
        :pressed[--size]`,
      '--circle-bg-color': `--special-bg-color
        :disabled[rgba(--nu-text-color-rgb, .66)]
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
