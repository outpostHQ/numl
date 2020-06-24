import Behavior from './behavior';
import { setTransitionTimeout } from '../helpers';

export default class OffsetBehavior extends Behavior {
  connected() {
    const { host, params } = this;
    const { name } = params;
    const xProp = `--nu${name ? `-${name}` : ''}-offset-x`;
    const yProp = `--nu${name ? `-${name}` : ''}-offset-y`;

    this.on('mousemove', (event) => {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const offsetX = (x / rect.width * 2) - 1;
      const offsetY = (y / rect.height * 2) - 1;

      host.style.setProperty(xProp, String(offsetX));
      host.style.setProperty(yProp, String(offsetY));
    });

    this.on('mouseover', () => {
      setTransitionTimeout(host, () => {
        this.setMod('offset', true);
      });
    });

    this.on('mouseout', () => {
      this.setMod('offset', false);

      setTimeout(() => {
        host.style.setProperty(xProp, '0');
        host.style.setProperty(yProp, '0');
      });
    });
  }
}
