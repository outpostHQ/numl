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
      transition: 'opacity, height',
      color: '#danger',
    };
  }

  nuInit() {
    this.style.maxHeight = '0';
  }
}
