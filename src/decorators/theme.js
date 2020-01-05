import NuDecorator from './decorator';
import { declareTheme, removeTheme } from '../themes';
import { convertUnit, error, warn } from '../helpers';
import { getOptimalSaturation, strToHsl } from '../color';

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'pastel',
  'from',
  'mod',
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

    this.nuParent = this.parentNode;

    setTimeout(() => this.nuApply(true));
  }

  nuDisconnected() {
    super.nuDisconnected();

    // remove theme
    if (this.nuParent && this.nuName) {
      removeTheme(this.nuParent, this.nuName, this.nuProps || {});
    }

    delete this.nuParent;
  }

  nuApply(initial = false) {
    const attrs = [...this.attributes].reduce((map, attr) => {
      if (attr.name === 'pastel') {
        map[attr.name] = this.hasAttribute('pastel');
      } else {
        map[attr.name] = this.nuGetAttr(attr.name, true);
      }

      return map;
    }, {});

    let { name = 'main', hue, saturation, pastel, from, mod, ...props } = attrs;

    pastel = !!pastel;

    if (from) {
      const color = strToHsl(from);

      if (!color) {
        error('wrong reference color', from);
        return;
      }

      hue = color[0];

      saturation = saturation === 'auto' ? (pastel ? 100 : getOptimalSaturation(hue)) : (saturation != null ? saturation : color[1]);
    } else {
      hue = hue != null ? Number(hue) : null;
      saturation = saturation == null || saturation === 'auto' ? (pastel ? 100 : getOptimalSaturation(hue)) : Number(saturation);
    }

    const defaultMods = mod || '';

    this.nuName = name;
    this.nuHue = hue;
    this.nuFrom = from;
    this.nuSaturation = saturation;
    this.nuPastel = pastel;
    this.nuMods = defaultMods;

    if (!initial) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);
    }

    if (!hue || hue !== hue || saturation !== saturation) {
      warn('incorrect theme', {
        decorator: this,
        name,
        hue,
        from,
        saturation,
        pastel,
      });

      return;
    }

    declareTheme(this.nuParent, name, hue, saturation, pastel, defaultMods || '');

    if (!initial) {
      setTimeout(() => {
        const selector = name === 'main' ? '[nu][theme]' : `[nu][theme*="${name}"]`;

        [...this.nuParent.querySelectorAll(selector)]
          .forEach(el => {
            el.nuEnsureThemes(true);
          });
      }, 0);
    }
  }
}
