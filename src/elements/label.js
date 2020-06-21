import NuElement from './element';

export default class NuLabel extends NuElement {
  static get nuTag() {
    return 'nu-label';
  }

  static get nuStyles() {
    return {
      display: 'block',
      text: 'w6',
      cursor: 'default',
      transition: 'theme, transform',
    };
  }

  static get nuBehaviors() {
    return {
      label: true,
    };
  }
}
