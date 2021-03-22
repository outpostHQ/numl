import NuBtn from './btn';

export default class NuItemBtn extends NuBtn {
  static get nuTag() {
    return 'nu-itembtn';
  }

  static get nuStyles() {
    return {
      display: 'grid',
      padding: '',
      radius: '0',
      border: '0',
      fill: '#clear',
    };
  }
}
