import './btn-group.css';
import NuFlex from './../flex';

const defaultAttrs = {
  gap: 'calc(var(--pixel) * -1)',
};

export default class NuBtnGroup extends NuFlex {
  static get nuTag() {
    return 'btn-group';
  }

  static get nuDefaultAttrs() {
    return defaultAttrs;
  }
}
