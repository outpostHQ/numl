import NuDefinition from './definition';
import { declareTheme, removeTheme, ALL_THEME_MODS, hueFromString } from '../themes';
import { devMode, warn } from '../helpers';
import { getOptimalSaturation } from '../color';

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'pastel',
  'mod',
];

const NAME_STOP_LIST = [
  'text',
  'bg',
  'border',
  'mark',
  'outline',
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
export default class NuTheme extends NuDefinition {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuGenerators() {
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

    let { name = '', hue, saturation, pastel, mod } = attrs;

    const cache = JSON.stringify({ name, hue, saturation, pastel, mod });

    if (this.nuCache === cache) return;

    this.nuCache= cache;

    if (hue && hue !== '0' && isNaN(Number(hue))) {
      hue = hueFromString(hue);
    }

    pastel = !!pastel;
    name = name.trim();

    if (NAME_STOP_LIST.includes(name)) {
      warn('[nu-theme] reserved name used:', JSON.stringify(name));

      return;
    }

    name = name || 'main';

    hue = hue != null ? Number(hue) : null;
    saturation = saturation == null || saturation === 'auto' ? (pastel ? 100 : getOptimalSaturation(hue)) : Number(saturation);

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
    this.nuSaturation = saturation;
    this.nuPastel = pastel;
    this.nuMods = defaultMods;

    if (!initial) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);
    }

    if (hue == null || hue !== hue || saturation !== saturation) {
      warn('incorrect theme', {
        definition: this,
        name,
        hue,
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
        const values = [];

        VERIFY_MAP.delete(parent);
        [...parent.querySelectorAll(SELECTOR)]
          .forEach(el => {
            values.push(...el.nuEnsureThemes(true, values));
          });
      }));
    }
    // }
  }
}
