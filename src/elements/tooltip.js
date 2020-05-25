import NuBlock from './block';

export default class NuTooltip extends NuBlock {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuBehaviors() {
    return {
      fixate: true,
      tooltip: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'block',
      shadow: '',
      padding: '.5x 1x',
      z: 'front',
      opacity: '0 :show[1]',
      transition: 'opacity',
      place: 'outside-top',
      drop: '',
      fill: 'bg',
      color: 'text',
      radius: '1r',
      border: '1bw outside',
      size: 'xs',
      interactive: 'no',
      text: 'w6 wrap',
      width: 'min-content initial 20rem',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        margin: 0 !important;
      }
    `
  }
}
