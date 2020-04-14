const CONTROL_REGEXP = /([a-z][a-z0-9-]+)([\s]|$|\[([a-z-]+)(\]|=([^\]]+)\]))/g;

export const CONTROL_ATTR = 'controls';

export default class ControlMixin {
  constructor($host) {
    this.$host = $host;
  }

  apply(bool, applyValue) {
    const { $host } = this;
    const value = $host.getAttribute(CONTROL_ATTR);

    if (!value) return;

    let token;

    const elements = [];

    while (token = CONTROL_REGEXP.exec(value)) {
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

      // if no value specified then use default value
      if (val == null) {
        val = '@value';
      }

      let values = val.split('|')
        .map(vl => {
          if (val.startsWith('@')) {
            vl = vl.slice(1);

            return vl === 'value' ? applyValue : $host.nuGetVar(vl);
          }

          return vl;
        });

      if (!bool) {
        if (values.length > 1) {
          element.setAttribute(attr, values[1]);
        } else {
          element.removeAttribute(attr);
        }

        continue;
      }

      element.setAttribute(attr, values[0]);
    }

    if (elements.length) {
      $host.nuSetAria('controls', elements.map(el => el.nuUniqId));
    } else {
      $host.nuSetAria('controls', null);
    }
  }
}
