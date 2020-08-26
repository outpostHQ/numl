import Behavior from './behavior';
import { error, svgElement } from '../helpers';
import Svg from '../svg';
import { fixSafariInvisibleContents } from '../browser-fixes';

export default class SvgBehavior extends Behavior {
  connected() {
    const src = this.host.getAttribute('src');

    if (src) {
      this.inject(src);
    }
  }

  changed(name, value) {
    if (!this.isConnected) return;

    if (name === 'src') {
      this.inject(value);
    }
  }

  inject(src) {
    const { host } = this;

    host.innerHTML = '';

    if (!src || !src.trim()) return;

    Svg.load(src).then(svg => {
      const svgNode = svgElement(svg);
      const width = svgNode.getAttribute('width');
      const height = svgNode.getAttribute('height');
      const viewBox = svgNode.getAttribute('viewBox');

      if (width && height) {
        if (!viewBox) {
          svgNode.setAttribute('viewBox', `0,0,${width},${height}`);
        }
      }

      host.innerHTML = '';
      host.appendChild(svgNode);

      fixSafariInvisibleContents(host);
    }).catch(() => {
      error('svg not loaded:', name);

      return '';
    });
  }
}
