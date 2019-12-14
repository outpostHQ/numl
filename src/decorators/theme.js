import NuDecorator from './decorator';
import { declareTheme, removeTheme } from '../themes';
import { convertUnit, error } from '../helpers';
import { strToHsl } from '../color';

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'pastel',
  'from',
  'mods',
  'border-radius',
  'border-width',
  'padding',
  'animation-time',
];

/**
 * @class
 * @property nuParent
 */
export default class NuTheme extends NuDecorator {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuAttrsList() {
    return [...ATTRS_LIST];
  }

  nuChanged(name, oldValue, value) {
    if (!this.nuIsConnected) return;

    this.nuApply();
  }

  nuConnected() {
    super.nuConnected();

    // run only once
    if (this.nuIsConnected) return;

    this.nuParent = this.parentNode;

    setTimeout(() => this.nuApply(true));
  }

  nuDisconnected() {
    super.nuDisconnected();

    // remove theme
    if (this.nuParent && this.nuName) {
      removeTheme(this.nuParent, this.nuName, this.nuProps || {});
    }
  }

  nuApply(initial = false) {
    const attrs = [...this.attributes].reduce((map, attr) => {
      map[attr.name] = attr.value;

      return map;
    }, {});

    let { name = 'main', hue, saturation, pastel, from, mods, ...props } = attrs;

    pastel = pastel != null;

    const autoSaturation = (pastel ? 100 : 75);

    if (from) {
      const color = strToHsl(from);

      if (!color) {
        error('wrong reference color', from);
        return;
      }

      hue = color[0];

      saturation = saturation === 'auto' ? autoSaturation : (saturation != null ? saturation : color[1]);
    } else {
      hue = hue != null ? Number(hue) : null;
      saturation = saturation == null || saturation === 'auto' ? autoSaturation : Number(saturation);
    }

    const defaultMods = mods || '';

    const customProps = Object.keys(props || {})
      .reduce((map, prop) => {
        if (!ATTRS_LIST.includes(prop)) return map;

          map[`--nu-${prop}`] = convertUnit(props[prop]);

        return map;
      }, {});

    this.nuName = name;
    this.nuProps = customProps;
    this.nuHue = hue;
    this.nuFrom = from;
    this.nuSaturation = saturation;
    this.nuPastel = pastel;
    this.nuMods = defaultMods;

    if (!initial) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);
    }

    declareTheme(this.nuParent, name, hue, saturation, pastel, customProps, defaultMods || '');

    if (!initial) {
      setTimeout(() => {
        [...this.nuParent.querySelectorAll('[nu][theme]')]
          .forEach(el => {
            el.nuEnsureThemes(true);
          });
      }, 0);
    }
  }
}
