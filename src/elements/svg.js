import NuEl from './el';
import { h } from '../helpers';
import { requireChild } from '../dom-helpers';

export default class NuSvg extends NuEl {
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
      display: 'block',
      sizing: 'content',
      width: '1fs 100%',
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
