import WidgetBehavior from './widget';
import { h, warn } from '../helpers';

export default class ImageBehavior extends WidgetBehavior {
  init() {
    this.props.src = (src) => this.load(src);

    super.init();
  }

  load(src) {
    const { host } = this;

    if (host.querySelector('img')) {
      host.innerHTML = '';
    }

    if (!src || !src.trim()) return;

    const img = h('img');

    img.role = 'none';
    img.src = src;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.setAttribute('role', 'presentation');

    this.ref = img;

    host.appendChild(img);

    img.onerror = () => {
      this.removeChild(img);

      const icon = h('nu-icon');

      icon.setAttribute('name', 'image');

      host.appendChild(icon);

      warn('image not loaded', src);
    };

    return src;
  }
}
