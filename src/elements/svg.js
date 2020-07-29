import NuElement from './element';

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

  static get nuRole() {
    return 'img';
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
}
