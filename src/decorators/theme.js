import NuDecorator from './decorator';
import { declareTheme, removeTheme, ALL_THEME_MODS, hueFromString, THEME_ATTR } from '../themes';
import { devMode, error, warn } from '../helpers';
import { getOptimalSaturation, strToHsl } from '../color';

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'pastel',
  'from',
  'mod',
];

const NAME_STOP_LIST = [
  'text',
  'bg',
  'border',
  'hover',
  'focus',
  'subtle',
  'text',
  'special',
  'input',
  'diff',
  'local',
  'main',
  'tint',
  'tone',
  'swap',
];

const SELECTOR = '[nu][theme]';

const VERIFY_MAP = new Map;

/**
 * @class
 * @property nuParent
 */
export default class NuTheme extends NuDecorator {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuAttrs() {
    return ATTRS_LIST.reduce((attrs, attr) => {
      attrs[attr] = '';

      return attrs;
    }, {});
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

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

    let { name = '', hue, saturation, pastel, from, mod } = attrs;

    if (hue && !parseInt(hue) && hue !== '0') {
      hue = hueFromString(hue);
    }

    pastel = !!pastel;
    name = name.trim();

    if (NAME_STOP_LIST.includes(name)) {
      warn('[nu-theme] reserved name used:', JSON.stringify(name));

      return;
    }

    name = name || 'main';

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

    if (hue > 359 || hue < 0) {
      warn('[nu-theme] hue is out of range [0..359]:', JSON.stringify(hue));

      return;
    }

    if (saturation > 100 || saturation < 0) {
      warn('[nu-theme] saturation is out of range [0..100]:', JSON.stringify(saturation));

      return;
    }

    const defaultMods = mod || '';

    // check modifiers
    if (devMode) {
      const mods = defaultMods.split(/\s+/g);

      mods.forEach(md => {
        if (md && !ALL_THEME_MODS.includes(md)) {
          warn('[nu-theme] unsupported modifier:', JSON.stringify(md));
        }
      });
    }

    this.nuName = name;
    this.nuHue = hue;
    this.nuFrom = from;
    this.nuSaturation = saturation;
    this.nuPastel = pastel;
    this.nuMods = defaultMods;

    if (!initial) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);
    }

    if (hue == null || hue !== hue || saturation !== saturation) {
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

    // if (!initial) {
    const parent = this.nuParent;

    if (!VERIFY_MAP.has(parent)) {
      VERIFY_MAP.set(parent, setTimeout(() => {
        VERIFY_MAP.delete(parent);
        [...parent.querySelectorAll(SELECTOR)]
          .forEach(el => {
            el.nuEnsureThemes(true);
          });
      }));
    }
    // }
  }
}
