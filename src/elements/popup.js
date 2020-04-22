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

  static get nuDefaults() {
    return {
      display: 'block',
      shadow: '',
      z: 'front',
      opacity: '^ 0 :pressed[1]',
      transition: 'opacity',
      border: '1b outside',
      width: 'minmax(100%, 100vw) :drop[clamp(--fixate-width, min-content, 100vw)]',
      text: 'wrap w4',
      cursor: 'default',
      place: 'outside-bottom',
      drop: '',
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
