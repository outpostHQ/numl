import NuCard from './card';

export default class NuDebug extends NuCard {
  static get nuTag() {
    return 'nu-debug';
  }

  static get nuBehaviors() {
    return {
      component: 'debug',
    };
  }

  static get nuAllowShadow() {
    return false;
  }

  static get nuDefaults() {
    return {
      gap: '1x',
    };
  }
}
