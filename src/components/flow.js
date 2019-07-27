import NuFlex from './flex';

export default class NuFlow extends NuFlex {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuDefaultFlow() {
    return 'column';
  }
}
