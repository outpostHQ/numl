import './btn-group.css';
import NuFlex from '../flex';
import { warn } from '../../helpers';

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

  nuChanged(name, oldValue, value) {
    if (name === 'flow' && value && value.includes(' wrap')) {
      warn('btn-group can\'t be wrapped');
      return;
    }

    super.nuChanged(name, oldValue, value);
  }
}
