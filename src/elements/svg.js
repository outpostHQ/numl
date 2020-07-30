import NuElement from './element';
import { h } from '../helpers';
import { requireChild } from '../dom-helpers';

export default class NuSvg extends NuElement {
  static get nuTag() {
    return 'nu-svg';
  }

  static get nuContents() {
    return 'svg';
  }

  static get nuBehaviors() {
    return {
      svg: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      sizing: 'content',
      width: 'min 1fs',
      height: 'min 1fs',
      box: 'y',
      text: 'v-middle',
    };
  }

  nuConnected() {
    super.nuConnected();

    requireChild(this, 'svg');
  }
}
