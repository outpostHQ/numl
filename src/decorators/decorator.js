import { generateId } from '../helpers';
import NuBase from '../base';

export default class NuDecorator extends NuBase {
  static get nuDisplay() {
    return 'none';
  }

  nuMounted() {
    if (!this.parentNode) return;

    this.nuParentId = generateId(this.parentNode);
  }

  get nuParentContext() {
    return `#${this.nuParentId}`;
  }
}
