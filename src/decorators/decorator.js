import { generateId } from '../helpers';
import NuBase from '../base';

export default class NuDecorator extends NuBase {
  static get nuDisplay() {
    return 'none';
  }

  nuConnected() {
    super.nuConnected();

    if (!this.parentNode) return;
  }

  get nuParentContext() {
    return `#${this.parentNode.nuId}`;
  }
}
