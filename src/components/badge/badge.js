import './badge.css';
import NuComponent from '../component';

export default class NuBadge extends NuComponent {
  static get nuTag() {
    return 'badge';
  }

  constructor() {
    super();

    // this.nuThemeInvert = true;
  }

  nuMounted() {
    // if (this.getAttribute('theme') == null) {
    //   super.nuUpdateTheme('!current');
    // }
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    // if (name === 'theme' && value == null) {
    //   this.nuUpdateTheme('!current');
    // }
  }
}
