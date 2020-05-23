import { asyncDebounce, setAttr } from "../helpers";
import { ROOT } from '../context';

const CONTROL_REGEXP = /((|:)[a-z][a-z0-9-]+)([\s]|$|\[(!|)(\.|)([a-z-]+)(:([^)=\]]+)|)(=([^\]]+?)|)])/gi;

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
      let [s, id, special, s3, invert, dot, attr, s7, units, s9, val] = token;
      let element;

      invert = !!invert;

      // console.log('!', this.host.nuUniqId, invert, isBool, state);

      if (invert && isBool) {
        state = !state;
      }

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
          element.collapsed = !state;
        } else {
          element.collapsed = !element.collapsed;
        }

        continue;
      }

      // if no value specified
      if (val == null && !applyValue) {
        setAttr(element, attr, state);
      } else {
        let firstValue, secondValue;

        if (val == null) {
          firstValue = secondValue = applyValue;
        } else {
          // if no value specified then use default value
          [firstValue, secondValue] = val.split('|')
            .map(vl => {
              if (vl.startsWith('@')) {
                vl = vl.slice(1);

                return vl === 'value' || !vl ? applyValue : host.nuGetVar(vl);
              }

              return vl;
            });

          secondValue = secondValue != null ? secondValue : firstValue;
        }

        let setValue = firstValue;

        const isProp = attr.startsWith('--');

        if (state === false) {
          if (firstValue == null) {
            setValue = null;
          } else if (units) {
            setValue = `${secondValue}${units ? units : ''}`;
          } else {
            setValue = secondValue;
          }
        } else if (units) {
          setValue = `${firstValue}${units ? units : ''}`;
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
    }

    if (elements.length) {
      host.nuSetAria('controls', elements.map(el => el.nuUniqId).filter(id => id).join(' '));
    } else {
      host.nuSetAria('controls', null);
    }
  }
}
