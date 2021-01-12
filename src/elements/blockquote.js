import NuEl from './el';

export default class NuBlockQuote extends NuEl {
  static get nuTag() {
    return 'nu-blockquote';
  }

  static get nuRole() {
    return 'blockquote';
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: 'right',
      border: '(1x / 2) left #special',
      fill: 'diff',
      text: 'i',
      padding: '2x',
      size: 'lg',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuSetContext('attrs:code', {
      fill: 'bg',
    });

    this.nuSetContext('attrs:mark', {
      fill: 'bg',
    });
  }
}
