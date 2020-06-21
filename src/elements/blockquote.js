import NuElement from './element';

export default class NuBlockQuote extends NuElement {
  static get nuTag() {
    return 'nu-blockquote';
  }

  static get nuRole() {
    return 'blockquote';
  }

  static get nuStyles() {
    return {
      display: 'block',
      border: '(1x / 2) left color(special)',
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
