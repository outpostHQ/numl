import NuGroup from './group';
import { DEFAULT_STROKE_SHADOW } from '../styles/border';

export default class NuInputGroup extends NuGroup {
  static get nuTag() {
    return 'nu-inputgroup';
  }

  static get nuBehaviors() {
    return {
      inputgroup: true,
    };
  }

  static get nuStyles() {
    return {
      fill: 'input',
      outline: 'focus-inside',
      cursor: 'text',
    };
  }

  static get nuContext() {
    return {
      'attrs:icon': {
        grow: '0',
      },
      'attrs:input': {
        border: '0',
        grow: '1',
      },
      'attrs:btn': {
        padding: '',
        border: 'n',
      },
    };
  }
}
