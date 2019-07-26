import './link.css';
import NuElement from '../element';
import NuBtn from '../btn/btn';

export default class NuBadge extends NuElement {
  static get nuTag() {
    return 'nu-link';
  }

  static get nuRole() {
    return 'link';
  }

  nuTap() {
    NuBtn.prototype.nuTap.call(this);
  }

  nuMounted() {
    super.nuMounted();

    this.setAttribute('tabindex', '0');

    this.addEventListener('click', () => {
      this.nuTap();
    });
  }
}
