import NuCard from './card';

export default class NuDebug extends NuCard {
  static get nuTag() {
    return 'nu-debug';
  }

  static get nuBehaviors() {
    return {
      debugger: true,
    };
  }

  static get nuShadowRoot() {
    return false;
  }

  static get nuStyles() {
    return {
      gap: '1x',
    };
  }
}
