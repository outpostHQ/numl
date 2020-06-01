import NuActiveElement from './activeelement';

export default class NuLink extends NuActiveElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      color: 'special',
      text: 'nowrap u bold',
      cursor: 'pointer',
      radius: '.5r',
      transition: 'shadow, fill, color',
      mark: '.25em hover',
      selectable: 'y',
      box: 'y',
    };
  }
}
