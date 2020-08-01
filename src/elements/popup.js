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

  static get nuAttrs() {
    return {
      effect: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'none :popup[block]',
      shadow: '',
      z: 'front',
      opacity: ':hidden[0] 1',
      interactive: 'yes :hidden[no]',
      transition: 'opacity, transform',
      origin: 'top',
      border: '1bw outside',
      width: '100% 100vw :drop[--fixate-width min-content 100vw]',
      text: 'n wrap',
      cursor: 'default',
      place: 'outside-bottom',
      drop: '',
      padding: '',
      selectable: 'y',
      sizing: 'content',
    };
  }
}
