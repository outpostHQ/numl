import NuElement from './element';

export default class NuAside extends NuElement {
  static get nuTag() {
    return 'nu-aside';
  }

  static get nuRole() {
    return 'complementary';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}
