const CONTROL_REGEXP = /([a-z][a-z0-9-]+)([\s]|$|\[([a-z-]+)(\]|=([^\]]+)\]))/g;

export const CONTROL_ATTR = 'controls';

export default class ControlMixin {
  constructor($host) {
    this.$host = $host;
  }

  apply(bool) {
    const { $host } = this;
    const value = $host.getAttribute(CONTROL_ATTR);

    if (!value) return;

    let token;

    const elements = [];

    while(token = CONTROL_REGEXP.exec(value)) {
      let [s, id, s1, attr, s2, val] = token;

      // find controlled node
      const element = $host.nuQueryById(id);

      if (!element) continue;

      elements.push(element);

      // if no attribute specified then just toggle element
      if (!attr) {
        element.hidden = !bool;

        continue;
      }

      if (!bool) {
        element.removeAttribute(attr);

        continue;
      }

      // if no value specified then use default value
      if (val == null) {
        val = '@value';
      }

      if (val.startsWith('@')) {
        val = $host.nuGetVar('value');

        console.log('!', val);

        if (val == null) {
          continue;
        }
      }

      element.setAttribute(attr, val);
    }

    if (elements.length) {
      $host.nuSetAria('controls', elements.map(el => el.nuUniqId));
    } else {
      $host.nuSetAria('controls', null);
    }
  }
}
