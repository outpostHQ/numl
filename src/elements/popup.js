import NuCard from './card';

export default class NuPopup extends NuCard {
  static get nuTag() {
    return 'nu-popup';
  }

  static get nuRole() {
    return 'dialog';
  }

  static get nuId() {
    return 'popup';
  }

  static get nuBehaviors() {
    return {
      fixate: true,
      popup: true,
    };
  }

  static get nuStyles() {
    return {
      display: 'none :popup[block]',
      shadow: '',
      z: 'front',
      opacity: ':hidden[0] 1',
      interactive: 'yes :hidden[no]',
      // scale: '1 :hidden[1 .5]',
      move: '0 0 :hidden[0 4x]',
      transition: 'opacity, transform',
      origin: 'top',
      border: '1bw outside',
      width: '100% 100vw :drop[--fixate-width min-content 100vw]',
      text: 'wrap w4',
      cursor: 'default',
      place: 'outside-bottom',
      drop: '',
      padding: '',
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} {
        user-select: initial;
      }
    `;
  }
}
