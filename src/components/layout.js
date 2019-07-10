import NuFlex from './flex';

const defaultAttrs = {
  gap: '1',
  flow: 'column',
};

export default class NuLayout extends NuFlex {
  static get nuTag() {
    return 'layout';
  }

  static get nuDefaultAttrs() {
    return defaultAttrs;
  }
}
