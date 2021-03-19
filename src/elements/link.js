import NuAction from './action';

export default class NuLink extends NuAction {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      color: '#special',
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
