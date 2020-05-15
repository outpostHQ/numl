import Behavior from './behavior';
import { error, parseAllValues, svgElement } from '../helpers';
import Icons from '../icons';

export default class IconBehavior extends Behavior {
  init() {
    this.setMod('icon', true);
  }

  connected() {
    this.host.nuSetAria('hidden', true);

    this.apply();
  }

  changed(name) {
    if (!this.isConnected) return;

    if (name === 'name' || name === 'type') {
      this.apply();
    }
  }

  apply() {
    const { host } = this;

    const value = this.host.nuGetAttr('name');
    const type = this.host.getAttribute('type') || 'outline';

    // empty tag
    this.innerHTML = '';

    if (!value) return;

    const names = parseAllValues(value);

    names.forEach(name => {
      if (host.querySelector(`svg[name="${name}"]`)) return;

      Icons.load(name, type).then(svg => {
        if (!svg) return;

        const svgNode = svgElement(svg);

        svgNode.setAttribute('name', name);
        svgNode.style.opacity = '0';

        host.appendChild(svgNode);
      }).catch(() => {
        error('icon not found:', name);

        return '';
      });
    });
  }
}
