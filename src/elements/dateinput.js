import NuBtn from './btn';

export default class NuDateInput extends NuBtn {
  static get nuTag() {
    return 'nu-dateinput';
  }

  static get nuStyles() {
    return {
      padding: '1x .5x 1x 1x',
      content: 'stretch',
      height: 'min (1lh + 2b + 2x)',
    };
  }

  static get nuBehaviors() {
    return {
      button: true,
      dateinput: true,
    };
  }
}
