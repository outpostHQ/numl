import { asyncDebounce, setAttr } from "../helpers";
import { ROOT } from '../context';

const CONTROL_REGEXP = /((|:)[a-z][a-z0-9-]+)([\s]|$|\[(\.|)([a-z-]+)(:([^)=\]]+)|)(=([^\]]+?)|)])/gi;

export const CONTROL_ATTR = 'control';

export default class ControlBehavior {
  constructor(host) {
    this.host = host;

    this.apply = asyncDebounce(this.apply, this);
  }

  changed(name, value) {
    if (name === CONTROL_ATTR && value) {
      this.apply(this.state, this.applyValue);
    }
  }

  apply(state, applyValue) {
    this.state = state;
    this.applyValue = applyValue;

    const isBool = typeof state === 'boolean';

    const { host } = this;
    const value = host.getAttribute(CONTROL_ATTR);

    if (!value) return;

    let token;

    const elements = [];

    while (token = CONTROL_REGEXP.exec(value)) {
      let [s, id, special, s3, dot, attr, s7, units, s9, val] = token;
      let element;

      // find controlled node

      if (special) {
        if (id === ':root') {
          element = ROOT;
        } else if (id === ':self') {
          element = host;
        } else {
          continue;
        }
      } else {
        element = host.nuQueryById(id);
      }

      if (!element) continue;

      elements.push(element);

      // if no attribute specified then just toggle element
      if (!attr) {
        if (isBool) {
          element.hidden = !state;
        } else {
          element.hidden = !element.hidden;
        }

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

      if (values[1] == null && varFlag) {
        values[1] = values[0];
      }

      let setValue = values[0];

      const isProp = attr.startsWith('--');

      if (state === false) {
        if (values[1] == null) {
          setValue = null;
        } else if (units) {
          setValue = `${values[1]}${units ? units : ''}`;
        } else {
          setValue = values[1];
        }
      } else if (units) {
        setValue = `${values[0]}${units ? units : ''}`;
      }

      if (dot) {
        element[attr] = setValue;
      } else {
        if (isProp) {
          if (setValue != null && setValue !== false) {
            element.style.setProperty(attr, String(setValue));
          } else {
            element.style.removeProperty(attr);
          }
        } else {
          setAttr(element, attr, setValue);
        }
      }
    }

    if (elements.length) {
      host.nuSetAria('controls', elements.map(el => el.nuUniqId).filter(id => id).join(' '));
    } else {
      host.nuSetAria('controls', null);
    }
  }
}
