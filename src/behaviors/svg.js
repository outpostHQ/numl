import Behavior from './behavior';
import { error, svgElement } from '../helpers';
import Svg from '../svg';

export default class SvgBehavior extends Behavior {
  connected() {
    const src = this.$host.getAttribute('src');

    if (src) {
      this.inject(src);
    }
  }

  changed(name) {
    if (!this.isConnected) return;

    if (name === 'name') {
      this.apply();
    }
  }

  inject(src) {
    const { $host } = this;

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

      $host.innerHTML = '';
      $host.appendChild(svgNode);
    }).catch(() => {
      error('svg not found:', name);

      return '';
    });
  }
}
