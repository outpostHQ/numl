import WidgetBehavior from './widget';
import { setAttr, warn } from '../helpers';
import { h } from '../dom-helpers';

export default class ImageBehavior extends WidgetBehavior {
  init() {
    this.props.src = (src) => {
      this.load(src);
    };

    this.props.loading = (value) => {
      if (this.ref) {
        setAttr(this.ref, 'loading', value);
      }
    };

    super.init();
  }

  load(src) {
    const { host } = this;

    if (!src || !src.trim()) return;

    if (host.querySelector('img')) {
      host.innerHTML = '';
    }

    const img = h('img');

    img.role = 'none';
    setAttr(img, 'loading', host.getAttribute('loading'));
    img.src = src;
    img.alt = '';

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
