import { generateId } from '../helpers';
import NuBase from '../base';

export default class NuDecorator extends NuBase {
  static get nuDisplay() {
    return 'none';
  }

  nuMounted() {
    super.nuMounted();

    if (!this.parentNode) return;
  }

  get nuParentContext() {
    return `#${this.parentNode.nuId}`;
  }
}
