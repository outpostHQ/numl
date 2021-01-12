import NuEl from './el';

export default class NuCheck extends NuEl {
  static get nuTag() {
    return 'nu-check';
  }

  static get nuBehaviors() {
    return {
      validator: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      opacity: ':invalid[1] 0',
      interactive: ':invalid[yes] no',
      size: 'sm',
      text: 'b',
      // height: ':invalid[max(1lh)] max(1px)',
      transition: 'opacity, height',
    }
  }

  nuInit() {
    this.style.maxHeight = '0';
  }
}
