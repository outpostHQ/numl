import { asyncDebounce } from "../helpers";

const CONTROL_REGEXP = /([a-z][a-z0-9-]+)([\s]|$|\[(\.|)([a-z-]+)(:([^)=\]]+)|)(=([^\]]+?)|)])/gi;

export const CONTROL_ATTR = 'controls';

export default class ControlBehavior {
  constructor(host) {
    this.host = host;

    this.apply = asyncDebounce(this.apply, this);
  }

  apply(bool, applyValue, applyOffValue) {
    const { host } = this;
    const value = host.getAttribute(CONTROL_ATTR);

    if (!value) return;

    let token;

    const elements = [];

    while (token = CONTROL_REGEXP.exec(value)) {
      let [s, id, s2, dot, attr, s4, units, s6, val] = token;

      // find controlled node
      const element = host.nuQueryById(id);

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

      let varFlag = false;
      let values = val.split('|')
        .map(vl => {
          if (val.startsWith('@')) {
            vl = vl.slice(1);

            varFlag = true;

            return vl === 'value' || !vl ? applyValue : host.nuGetVar(vl);
          }

          return vl;
        });

      if (!values[1] && varFlag) {
        values[1] = values[0];
      }

      let setValue = `${values[0]}${units ? units : ''}`;
      const isProp = attr.startsWith('--');

      if (!bool) {
        setValue = values[1] == null ? null : `${values[1]}${units ? units : ''}`;
      }

      if (dot) {
        element[attr] = setValue;
      } else {
        if (setValue != null) {
          if (isProp) {
            element.style.setProperty(attr, String(setValue));
          } else {
            element.setAttribute(attr, String(setValue));
          }
        } else {
          if (isProp) {
            element.style.removeProperty(attr);
          } else {
            element.removeAttribute(attr);
          }
        }
      }
    }

    if (elements.length) {
      host.nuSetAria('controls', elements.map(el => el.nuUniqId));
    } else {
      host.nuSetAria('controls', null);
    }
  }
}
