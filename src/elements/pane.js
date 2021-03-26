import NuFlex from './flex';
import { FLEX_GAP_SUPPORTED } from '../styles/gap';

export default class NuPane extends NuFlex {
  static get nuTag() {
    return 'nu-pane';
  }

  static get nuStyles() {
    return {
      items: 'center',
      gap: '',
    };
  }

  static get nuAttrs() {
    return FLEX_GAP_SUPPORTED ? {} : {
      gap: '',
    };
  }
}
