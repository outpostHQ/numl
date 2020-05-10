import NuBtn from './btn';

export default class NuDateInput extends NuBtn {
  static get nuTag() {
    return 'nu-dateinput';
  }

  static get nuStyles() {
    return {
      padding: '1x .5x 1x 2x',
      content: 'stretch',
    };
  }

  static get nuBehaviors() {
    return {
      button: true,
      component: 'dateinput',
    };
  }
}
